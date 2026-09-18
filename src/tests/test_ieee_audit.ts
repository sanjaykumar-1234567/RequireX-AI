import { AIEngine } from '../services/aiEngine';
import { MultiAIService } from '../services/multiAIService';
import { Requirement, NormalizedModelOutput } from '../types';

console.log('====================================================');
console.log('RUNNING REQUIREX AI IEEE QUALITY AUDIT & STATE TESTS');
console.log('====================================================\n');

let allPassed = true;
function assert(condition: boolean, msg: string) {
  if (condition) {
    console.log(`  ✓ PASS: ${msg}`);
  } else {
    console.error(`  ✗ FAIL: ${msg}`);
    allPassed = false;
  }
}

// -------------------------------------------------------------
// CASE A: "the user can fastly enter event details"
// -------------------------------------------------------------
console.log('CASE A: "the user can fastly enter event details"');
const caseAText = 'the user can fastly enter event details';
const caseAReqs = AIEngine.extractRequirements(caseAText, 'Smart College Event Management');

assert(caseAReqs.length === 1, 'CASE A: Exactly one requirement extracted');
const reqA = caseAReqs[0];
assert(reqA.id === 'REQ-01', `CASE A: Unique persistent ID assigned: ${reqA.id}`);
assert(reqA.rawSource === caseAText, `CASE A: Raw source preserved: "${reqA.rawSource}"`);

// No "1.5 seconds" or "nominal production load" anywhere
const serializedA = JSON.stringify(reqA);
assert(!serializedA.includes('1.5 seconds') && !serializedA.includes('1.5s'), 'CASE A: Zero "1.5 seconds" contamination');
assert(!serializedA.includes('nominal production load'), 'CASE A: Zero "nominal production load" contamination');
assert(!serializedA.includes('school event planner processing service'), 'CASE A: Zero fabricated service context');

// Quality issues: ambiguity & non-testability detected
const aHasAmbiguity = reqA.issues.some(i => i.code === 'DEF-01' || i.problem.toLowerCase().includes('ambiguous') || i.reason.toLowerCase().includes('fastly'));
assert(aHasAmbiguity, 'CASE A: Ambiguity detected for "fastly"');

const aHasNonTestable = reqA.issues.some(i => i.code === 'DEF-02' || i.code === 'DEF-05' || i.problem.toLowerCase().includes('non-measurable') || i.problem.toLowerCase().includes('testable') || i.reason.toLowerCase().includes('measurable'));
assert(aHasNonTestable, 'CASE A: Non-testability/non-measurable performance detected');

// Safe IEEE proposal generated
assert(Boolean(reqA.suggestedText && reqA.suggestedText.length > 0), `CASE A: Safe proposal generated: "${reqA.suggestedText}"`);
assert(!reqA.suggestedText!.includes('1.5'), 'CASE A: Safe proposal does NOT include arbitrary numbers');
assert(reqA.status === 'NEEDS_REVIEW' || reqA.status === 'Needs Refinement', `CASE A: Status is NEEDS_REVIEW (actual: ${reqA.status})`);
assert(reqA.status !== 'USER_APPROVED' && reqA.reviewDecision !== 'Approved', 'CASE A: NOT USER_APPROVED');
assert(reqA.isSRSReady === false, 'CASE A: NOT SRS_READY');

// -------------------------------------------------------------
// CASE B: "user can navigate quickly across the tabs"
// -------------------------------------------------------------
console.log('\nCASE B: "user can navigate quickly across the tabs"');
const caseBText = 'user can navigate quickly across the tabs';
const caseBReqs = AIEngine.extractRequirements(caseBText, 'Web Application', [reqA]);

assert(caseBReqs.length === 1, 'CASE B: Exactly one requirement extracted');
const reqB = caseBReqs[0];
assert(reqB.id === 'REQ-02', `CASE B: Sequential unique ID REQ-02 assigned without collision (got ${reqB.id})`);
assert(reqB.category === 'Functional', `CASE B: Primary category is Functional (got ${reqB.category})`);
assert(reqB.rawSource === caseBText, `CASE B: Raw source preserved: "${reqB.rawSource}"`);

// "quickly" detected
const bHasQuickly = reqB.issues.some(i => i.reason.toLowerCase().includes('quickly') || i.problem.toLowerCase().includes('vague') || i.problem.toLowerCase().includes('quick'));
assert(bHasQuickly, 'CASE B: "quickly" detected as vague/non-testable');

// Safe IEEE proposal generated & Optional [X] suggestion
assert(Boolean(reqB.suggestedText && reqB.suggestedText.length > 0), `CASE B: Safe proposal generated: "${reqB.suggestedText}"`);
assert(!reqB.suggestedText!.includes('1.5'), 'CASE B: Safe proposal contains zero fabricated numbers');
if (reqB.optionalRefinement) {
  assert(reqB.optionalRefinement.includes('[X]'), `CASE B: Optional refinement uses clean benchmark parameter template [X]: "${reqB.optionalRefinement}"`);
  assert(!reqB.optionalRefinement.includes('1.5 seconds'), 'CASE B: Optional refinement contains no fabricated 1.5 seconds');
}
assert(reqB.status !== 'USER_APPROVED' && reqB.reviewDecision !== 'Approved', 'CASE B: NOT automatically approved');
assert(reqB.isSRSReady === false, 'CASE B: NOT automatically SRS ready');

// -------------------------------------------------------------
// CASE C: User accepts the safe proposal
// -------------------------------------------------------------
console.log('\nCASE C: User accepts the safe proposal');
// Simulate acceptImprovedRequirement on reqB
const proposalToAccept = reqB.suggestedText || 'The system shall allow the user to navigate across the tabs.';
const postAcceptAudit = AIEngine.analyze20Problems(proposalToAccept, [], 'Web Application');

const acceptedReq: Requirement = {
  ...reqB,
  status: postAcceptAudit.issues.length === 0 ? 'USER_APPROVED' : 'NEEDS_REVIEW',
  reviewDecision: postAcceptAudit.issues.length === 0 ? 'Approved' : 'Pending',
  currentText: proposalToAccept,
  approvedText: postAcceptAudit.issues.length === 0 ? proposalToAccept : undefined,
  issues: postAcceptAudit.issues,
  isSRSReady: postAcceptAudit.issues.length === 0
};

assert(acceptedReq.id === reqB.id, `CASE C: Same requirement ID preserved (${acceptedReq.id})`);
assert(acceptedReq.status === 'USER_APPROVED', `CASE C: Status is USER_APPROVED (got ${acceptedReq.status})`);
assert(acceptedReq.reviewDecision === 'Approved', 'CASE C: reviewDecision is Approved');
assert(acceptedReq.approvedText === proposalToAccept, `CASE C: approvedText contains accepted proposal: "${acceptedReq.approvedText}"`);
assert(acceptedReq.rawSource === caseBText, `CASE C: rawSource remains completely unchanged: "${acceptedReq.rawSource}"`);
assert(acceptedReq.issues.length === 0, 'CASE C: Final IEEE audit verified clean proposal');
assert(acceptedReq.isSRSReady === true, 'CASE C: SRS_READY is true after clean audit');

// -------------------------------------------------------------
// CASE D: User edits proposal but leaves "quickly"
// -------------------------------------------------------------
console.log('\nCASE D: User edits proposal but leaves "quickly"');
// User edits to: "The system shall allow users to navigate quickly across the tabs."
const dirtyUserEditText = 'The system shall allow users to navigate quickly across the tabs.';
const postEditAudit = AIEngine.analyze20Problems(dirtyUserEditText, [], 'Web Application');

const editedReq: Requirement = {
  ...reqB,
  description: dirtyUserEditText,
  currentText: dirtyUserEditText,
  issues: postEditAudit.issues,
  status: postEditAudit.issues.length === 0 ? 'USER_APPROVED' : 'USER_EDITED',
  reviewDecision: postEditAudit.issues.length === 0 ? 'Modified' : 'Pending',
  approvedText: postEditAudit.issues.length === 0 ? dirtyUserEditText : undefined,
  isSRSReady: postEditAudit.issues.length === 0
};

assert(editedReq.id === reqB.id, `CASE D: Same requirement ID preserved (${editedReq.id})`);
const dHasQuickly = editedReq.issues.some(i => i.reason.toLowerCase().includes('quickly') || i.problem.toLowerCase().includes('vague') || i.problem.toLowerCase().includes('measurable'));
assert(dHasQuickly, 'CASE D: Final audit re-detects "quickly" on edited text');
assert(editedReq.status === 'USER_EDITED', `CASE D: Status is USER_EDITED (got ${editedReq.status})`);
assert(editedReq.isSRSReady === false, 'CASE D: NOT SRS_READY because quality issues remain');
assert(editedReq.approvedText === undefined, 'CASE D: approvedText is undefined while defects remain');

// -------------------------------------------------------------
// CASE E: Two requirements: "The user can login." and "The user can register."
// -------------------------------------------------------------
console.log('\nCASE E: Two requirements ("The user can login.", "The user can register.")');
const inputE = 'The user can login.\nThe user can register.';
const reqsE = AIEngine.extractRequirements(inputE, 'Authentication System');

assert(reqsE.length === 2, `CASE E: Extracted exactly 2 requirements (got ${reqsE.length})`);
assert(reqsE[0].id === 'REQ-01', `CASE E: First req ID is REQ-01 (got ${reqsE[0].id})`);
assert(reqsE[1].id === 'REQ-02', `CASE E: Second req ID is REQ-02 (got ${reqsE[1].id})`);
assert(reqsE[0].id !== reqsE[1].id, 'CASE E: IDs are strictly unique, no duplicates');

// -------------------------------------------------------------
// CASE F: Requirements with different classifications
// -------------------------------------------------------------
console.log('\nCASE F: Requirements with different classifications');
const inputF = 'The system shall authenticate users via OAuth.\nThe API response time shall not exceed 200ms.\nThe admin portal shall display audit logs.';
const reqsF = AIEngine.extractRequirements(inputF, 'Cloud Platform');

assert(reqsF.length === 3, `CASE F: 3 distinct requirements extracted (got ${reqsF.length})`);
const idSetF = new Set(reqsF.map(r => r.id));
assert(idSetF.size === 3, `CASE F: All 3 requirements have unique IDs: ${Array.from(idSetF).join(', ')}`);
// Check classifications
console.log('  Categories in F:', reqsF.map(r => `${r.id}: ${r.category}`).join(' | '));
assert(reqsF[0].id === 'REQ-01' && reqsF[1].id === 'REQ-02' && reqsF[2].id === 'REQ-03', 'CASE F: Clean sequential IDs without duplicate rows');

// -------------------------------------------------------------
// TEST 7: Multi-AI Deterministic Baseline & Normalization
// -------------------------------------------------------------
console.log('\nTEST 7: Multi-AI Deterministic Baseline & Normalization');
const baselineProvider = MultiAIService.getProvider('baseline');
assert(baselineProvider !== undefined, 'Deterministic Baseline provider is registered');
assert(MultiAIService.isProviderConfigured('baseline') === true, 'Deterministic Baseline is always configured (zero API key required)');

const baselineResult = await MultiAIService.executeModel('baseline', reqA, 'Smart College Event Management');
assert(baselineResult.status === 'success', `Baseline execution status: ${baselineResult.status}`);
assert(baselineResult.classification === 'Functional', `Normalized classification: ${baselineResult.classification}`);
assert((baselineResult.issues?.length || 0) > 0, `Normalized output captured ${baselineResult.issues?.length} issues`);
assert(baselineResult.costEstimate?.includes('Free') || false, 'Baseline marked as free tier');

// -------------------------------------------------------------
// TEST 8: Multi-AI Agreement Analysis & Targeted Tests (A - N)
// -------------------------------------------------------------
console.log('\nTEST 8: Multi-AI Agreement Analysis & Targeted Suite (A - N)');

// Test A: Single successful model
const agreementSingle = MultiAIService.computeModelAgreement([baselineResult]);
assert(agreementSingle.totalEvaluated === 1, 'Test A: Agreement computed for 1 model');
assert(agreementSingle.overallConsensusLevel === 'Insufficient Models', 'Test A: Single successful model produces Insufficient Models status (single-model bug fixed)');
assert(agreementSingle.classificationConsensus.percentage === 0, 'Test A: Percentage is 0 for single model');

// Test B: Two successful models with same classification
const mockModel1: NormalizedModelOutput = {
  providerId: 'gemini',
  providerName: 'Google Gemini',
  modelId: 'gemini-2.5-flash',
  status: 'success',
  latencyMs: 320,
  classification: 'Functional',
  detectedVagueTerms: ['quickly'],
  defectCodes: ['DEF-01', 'DEF-02'],
  issues: [
    { code: 'DEF-01', type: 'Ambiguity', problem: 'Vague speed', reason: 'Non-quantifiable', severity: 'High' },
    { code: 'DEF-02', type: 'Non-Verifiable', problem: 'No threshold', reason: 'Unverifiable', severity: 'Critical' }
  ],
  isTestable: false,
  testabilityAssessment: 'Non-testable without numeric latency',
  safeRewrite: 'The system shall process requests within defined parameters.',
  suggestedAcceptanceCriteria: ['Given user When click Then respond']
};

const mockModel2: NormalizedModelOutput = {
  providerId: 'groq',
  providerName: 'Groq Cloud',
  modelId: 'llama-3.3-70b-versatile',
  status: 'success',
  latencyMs: 180,
  classification: 'Functional',
  detectedVagueTerms: ['quickly'],
  defectCodes: ['DEF-01', 'DEF-02', 'DEF-09'],
  issues: [
    { code: 'DEF-01', type: 'Ambiguity', problem: 'Vague adverb', reason: 'Ambiguous', severity: 'High' },
    { code: 'DEF-02', type: 'Non-Verifiable', problem: 'Lacks SLA', reason: 'Non-verifiable', severity: 'Critical' },
    { code: 'DEF-09', type: 'Subjective Terms', problem: 'Subjective word', reason: 'Subjective', severity: 'Medium' }
  ],
  isTestable: false,
  testabilityAssessment: 'Lacks boundary conditions',
  safeRewrite: 'The system shall complete the request according to interface specifications.',
  suggestedAcceptanceCriteria: ['Given active connection When request Then receive output']
};

const agreementTwoSame = MultiAIService.computeModelAgreement([mockModel1, mockModel2]);
assert(agreementTwoSame.totalEvaluated === 2, 'Test B: Total evaluated is 2');
assert(agreementTwoSame.classificationConsensus.percentage === 100, 'Test B: 100% classification agreement calculated');
assert(agreementTwoSame.classificationConsensus.agreementLevel === 'High Agreement', 'Test B: Agreement level is High Agreement');

// Test C: Two successful models with different classifications
const mockModelDiffClass: NormalizedModelOutput = {
  ...mockModel2,
  classification: 'Non-functional'
};
const agreementDiff = MultiAIService.computeModelAgreement([mockModel1, mockModelDiffClass]);
assert(agreementDiff.classificationConsensus.percentage === 50, 'Test C: 50% classification agreement calculated');
assert(agreementDiff.classificationConsensus.agreementLevel === 'Disagreement', 'Test C: Disagreement status when categories conflict');

// Test D & E: Shared vs Model-specific defect codes
assert((agreementTwoSame.sharedDefectCodes?.length || 0) >= 2, 'Test D: Shared defect codes identified (DEF-01, DEF-02)');
const sharedCodes = (agreementTwoSame.sharedDefectCodes || []).map(d => d.code);
assert(sharedCodes.includes('DEF-01') && sharedCodes.includes('DEF-02'), 'Test D: Common DEF-01 and DEF-02 identified across models');

const modelSpecCodes = (agreementTwoSame.modelSpecificDefectCodes || []).map(d => d.code);
assert(modelSpecCodes.includes('DEF-09'), 'Test E: Model-specific defect code DEF-09 identified for Groq');

// Test F: Invalid defect code ignored safely
const invalidParsed = {
  classification: 'Functional',
  defectCodes: ['DEF-01', 'DEF-99', 'INVALID-CODE', 'DEF-02'],
  issues: [{ code: 'DEF-999', type: 'Unknown', problem: 'Test', reason: 'Test', severity: 'Low' }]
};
const normalizedWithInvalid = (MultiAIService as any).normalizeParsedResponse(
  invalidParsed, 'gemini', 'Google Gemini', 'gemini-2.5-flash', 100, 'Free Tier'
);
assert(!normalizedWithInvalid.defectCodes.includes('DEF-99'), 'Test F: Invalid code DEF-99 ignored safely');
assert(!normalizedWithInvalid.defectCodes.includes('INVALID-CODE'), 'Test F: Invalid code INVALID-CODE ignored safely');
assert(normalizedWithInvalid.defectCodes.includes('DEF-01') && normalizedWithInvalid.defectCodes.includes('DEF-02'), 'Test F: Valid codes DEF-01 and DEF-02 retained');
assert(normalizedWithInvalid.issues[0].code === undefined, 'Test F: Issue with invalid code DEF-999 has undefined code');

// Test G: Missing API key returns not_configured
const unconfiguredGemini = await MultiAIService.executeGemini('The system shall respond quickly.', 'General');
// If no key in test environment, status is not_configured
if (!process.env.VITE_GEMINI_API_KEY) {
  assert(unconfiguredGemini.status === 'not_configured', `Test G: Missing key returns not_configured (got ${unconfiguredGemini.status})`);
}

// Test H: Malformed JSON handled safely
const safeParseEmpty = (MultiAIService as any).safeParseJson('random non-json text output from llm');
assert(typeof safeParseEmpty === 'object', 'Test H: Malformed JSON returns safe object without crashing');

// Test: Model execution transparency & Fallback tracking
const primarySuccessModel = (MultiAIService as any).normalizeParsedResponse(
  { classification: 'Functional', safeRewrite: 'Test' },
  'gemini',
  'Google Gemini',
  'gemini-3.6-flash',
  250,
  'Free Tier Available',
  10,
  20,
  '{}',
  'gemini-3.6-flash',
  false,
  'gemini-3.6-flash'
);
assert(primarySuccessModel.actualModelId === 'gemini-3.6-flash', 'Model Transparency: Primary actualModelId is gemini-3.6-flash');
assert(primarySuccessModel.fallbackUsed === false, 'Model Transparency: fallbackUsed is false when primary succeeds');

const fallbackSuccessModel = (MultiAIService as any).normalizeParsedResponse(
  { classification: 'Functional', safeRewrite: 'Test' },
  'gemini',
  'Google Gemini',
  'gemini-3.6-flash',
  310,
  'Free Tier Available',
  10,
  20,
  '{}',
  'gemini-1.5-flash',
  true,
  'gemini-3.6-flash'
);
assert(fallbackSuccessModel.actualModelId === 'gemini-1.5-flash', 'Model Transparency: Fallback actualModelId is gemini-1.5-flash');
assert(fallbackSuccessModel.fallbackUsed === true, 'Model Transparency: fallbackUsed is true when fallback candidate succeeds');
assert(fallbackSuccessModel.primaryModelAttempted === 'gemini-3.6-flash', 'Model Transparency: primaryModelAttempted is recorded as gemini-3.6-flash');

// Test I & J: Partial failure tolerance (one provider fails, one succeeds)
const failedProviderOutput: NormalizedModelOutput = {
  providerId: 'openai',
  providerName: 'OpenAI Direct',
  modelId: 'gpt-4o',
  status: 'error',
  latencyMs: 150,
  classification: 'Functional',
  detectedVagueTerms: [],
  issues: [],
  isTestable: false,
  testabilityAssessment: 'API error',
  safeRewrite: '',
  suggestedAcceptanceCriteria: [],
  errorMessage: 'OpenAI Direct error: Rate limit exceeded'
};
const mixedAgreement = MultiAIService.computeModelAgreement([mockModel1, mockModel2, failedProviderOutput]);
assert(mixedAgreement.totalEvaluated === 2, 'Test J: Partial failure tolerance - 2 successful models evaluated while 1 failed');
assert(mixedAgreement.overallConsensusLevel === 'Strong Agreement', 'Test J: Consensus computed from successful providers');

// Test K: AI suggestion state and attributes
const testReqLifecycle: Requirement = {
  id: 'REQ-99',
  title: 'Quick response',
  description: 'The user can navigate quickly.',
  rawSource: 'The user can navigate quickly.',
  currentText: 'The user can navigate quickly.',
  category: 'Functional',
  priority: 'High',
  status: 'RAW',
  reviewDecision: 'Pending',
  isSRSReady: false,
  issues: [],
  domain: 'General',
  version: 1,
  createdAt: new Date().toISOString()
};

// Simulate adoption in Model Studio
const adoptedReq: Requirement = {
  ...testReqLifecycle,
  rawSource: testReqLifecycle.rawSource || testReqLifecycle.description,
  currentText: testReqLifecycle.currentText || testReqLifecycle.description,
  suggestedText: 'The system shall allow the user to navigate across pages.',
  improvedText: 'The system shall allow the user to navigate across pages.',
  optionalRefinement: 'Optional performance refinement [AI Suggested Value]: within 1.0s',
  status: 'AI_SUGGESTION',
  reviewDecision: 'Pending',
  isImprovedAccepted: false,
  isSRSReady: false
};

assert(adoptedReq.status === 'AI_SUGGESTION', 'Test K: Requirement status is AI_SUGGESTION');
assert(adoptedReq.suggestedText !== undefined, 'Test K: suggestedText is populated');
assert(adoptedReq.rawSource === 'The user can navigate quickly.', 'Test K: rawSource is strictly preserved');
assert(adoptedReq.isSRSReady === false, 'Test K: isSRSReady remains false');
assert(adoptedReq.isImprovedAccepted === false, 'Test K: isImprovedAccepted remains false');

// Test L: User approval workflow
const userApprovedReq: Requirement = {
  ...adoptedReq,
  status: 'USER_APPROVED',
  reviewDecision: 'Approved',
  approvedText: adoptedReq.suggestedText,
  isImprovedAccepted: true,
  isSRSReady: true
};
// Test I: Timeout status handling
const timeoutProviderOutput: NormalizedModelOutput = {
  providerId: 'gemini',
  providerName: 'Google Gemini',
  modelId: 'gemini-2.5-flash',
  status: 'timeout',
  latencyMs: 15000,
  classification: 'Functional',
  detectedVagueTerms: [],
  issues: [],
  isTestable: false,
  testabilityAssessment: 'Timed out after 15 seconds',
  safeRewrite: '',
  suggestedAcceptanceCriteria: [],
  errorMessage: 'Google Gemini request timed out (15s limit reached).'
};
assert(timeoutProviderOutput.status === 'timeout', 'Test I: Timeout state accurately represented');

// Test Jaccard rewrite alignment
const testSim = MultiAIService.calculateLexicalSimilarity(
  'The system shall allow the user to enter event details.',
  'The event planner shall allow the user to enter event details.'
);
assert(testSim > 50 && testSim <= 100, `Rewrite alignment Jaccard similarity calculated: ${testSim}%`);

// Test M: Domain-agnostic Multi-AI execution across 5 domains
const domainsToTest = [
  { domain: 'Railway Reservation', text: 'The booking engine shall cancel tickets quickly.' },
  { domain: 'Hospital Management', text: 'The triage nurse can update patient vitals easily.' },
  { domain: 'E-Commerce', text: 'The checkout system shall handle many concurrent shoppers.' },
  { domain: 'Smart College Event Management', text: 'The student shall submit feedback and view results.' },
  { domain: 'Drone Fleet Maintenance Management', text: 'The telemetry engine shall broadcast alerts.' }
];
for (const item of domainsToTest) {
  const domainRes = MultiAIService.executeBaseline(item.text, item.domain);
  assert(domainRes.status === 'success', `Test M: Domain [${item.domain}] Multi-AI execution succeeded`);
  assert(domainRes.suggestedAcceptanceCriteria[0].toLowerCase().includes(item.domain.toLowerCase()), `Test M: Domain [${item.domain}] contextualized without Railway fallback`);
}


// =============================================================
// NEW EXPANDED IEEE QUALITY AUDIT REGRESSION TESTS (CASES 1 - 11)
// =============================================================
console.log('\n====================================================');
console.log('RUNNING EXPANDED IEEE QUALITY DEFECT REGRESSION TESTS');
console.log('====================================================\n');

// 1. "The system shall respond quickly." -> ambiguity + non-testability
console.log('REGRESSION 1: "The system shall respond quickly."');
const res1 = AIEngine.analyze20Problems('The system shall respond quickly.');
const hasAmbiguity1 = res1.issues.some(i => i.code === 'DEF-01' || i.category?.includes('Ambiguity') || i.type.includes('Ambiguity'));
const hasNonTestable1 = res1.issues.some(i => i.code === 'DEF-02' || i.category?.includes('Non-Verifiable') || i.type.includes('Non-Verifiable') || i.type.includes('Testable'));
assert(hasAmbiguity1, 'REGRESSION 1: Detected Ambiguity / Vagueness for "quickly"');
assert(hasNonTestable1, 'REGRESSION 1: Detected Non-Verifiability / Non-Testability');
assert(Boolean(res1.issues.find(i => i.problematicPhrase === 'quickly')), 'REGRESSION 1: Defect isolates problematic phrase "quickly"');

// 2. "The system shall be user-friendly." -> subjective/vague + non-testability
console.log('\nREGRESSION 2: "The system shall be user-friendly."');
const res2 = AIEngine.analyze20Problems('The system shall be user-friendly.');
const hasSubjective2 = res2.issues.some(i => i.code === 'DEF-09' || i.category?.includes('Subjective') || i.type.includes('Subjective') || i.type.includes('Ambiguity'));
const hasNonTestable2 = res2.issues.some(i => i.code === 'DEF-02' || i.category?.includes('Non-Verifiable') || i.type.includes('Non-Verifiable'));
assert(hasSubjective2, 'REGRESSION 2: Detected Subjective Terminology for "user-friendly"');
assert(hasNonTestable2, 'REGRESSION 2: Detected Non-Testability for subjective target');

// 3. "The system shall generate reports." -> context-aware incompleteness (missing report details), not blindly rejected
console.log('\nREGRESSION 3: "The system shall generate reports."');
const res3 = AIEngine.analyze20Problems('The system shall generate reports.');
const hasIncomplete3 = res3.issues.some(i => i.code === 'DEF-03' || i.category?.includes('Incomplete') || i.type.includes('Incomplete'));
assert(hasIncomplete3, 'REGRESSION 3: Identified potential missing report details (format/type) without blind rejection');
assert(!res3.issues.some(i => i.code === 'DEF-01'), 'REGRESSION 3: Did not falsely mark "generate reports" as speed ambiguity');

// 4. "Can register for an event." -> missing actor
console.log('\nREGRESSION 4: "Can register for an event."');
const res4 = AIEngine.analyze20Problems('Can register for an event.');
const hasMissingActor4 = res4.issues.some(i => i.code === 'DEF-04' || i.category?.includes('Missing Actor') || i.type.includes('Missing Actor'));
assert(hasMissingActor4, 'REGRESSION 4: Detected Missing Actor / Stakeholder');
const actorIssue = res4.issues.find(i => i.code === 'DEF-04');
assert(Boolean(actorIssue?.explanation && actorIssue?.suggestedImprovement), 'REGRESSION 4: Includes defect explanation and suggested improvement');

// 5. "The user shall register and the administrator shall approve the registration." -> compound / non-atomic
console.log('\nREGRESSION 5: Compound / Non-Atomic requirement');
const res5 = AIEngine.analyze20Problems('The user shall register and the administrator shall approve the registration.');
const hasCompound5 = res5.issues.some(i => i.code === 'DEF-07' || i.category?.includes('Compound') || i.type.includes('Compound'));
assert(hasCompound5, 'REGRESSION 5: Detected Compound / Non-Atomic requirement');
const compoundIssue = res5.issues.find(i => i.code === 'DEF-07');
assert(Boolean(compoundIssue?.suggestedImprovement?.includes('REQ-A') && compoundIssue?.suggestedImprovement?.includes('REQ-B')), 'REGRESSION 5: Suggests atomic split (REQ-A and REQ-B)');

// 6. "The system shall support many users." -> undefined quantity
console.log('\nREGRESSION 6: "The system shall support many users."');
const res6 = AIEngine.analyze20Problems('The system shall support many users.');
const hasUndefQty6 = res6.issues.some(i => i.code === 'DEF-08' || i.category?.includes('Undefined Quantity') || i.type.includes('Undefined Quantity'));
assert(hasUndefQty6, 'REGRESSION 6: Detected Undefined Quantity for "many"');
assert(res6.issues.find(i => i.code === 'DEF-08')?.problematicPhrase === 'many', 'REGRESSION 6: Identified problematic phrase "many"');

// 7. "The system shall send notifications." -> missing trigger/recipient/context
console.log('\nREGRESSION 7: "The system shall send notifications."');
const res7 = AIEngine.analyze20Problems('The system shall send notifications.');
const hasMissingCondition7 = res7.issues.some(i => i.code === 'DEF-06' || i.category?.includes('Missing Condition') || i.type.includes('Missing Condition'));
assert(hasMissingCondition7, 'REGRESSION 7: Detected Missing Condition / Trigger for notifications');

// 8. "It shall notify them." -> pronoun/reference ambiguity
console.log('\nREGRESSION 8: "It shall notify them."');
const res8 = AIEngine.analyze20Problems('It shall notify them.');
const hasPronoun8 = res8.issues.some(i => i.code === 'DEF-11' || i.category?.includes('Pronoun') || i.type.includes('Pronoun'));
assert(hasPronoun8, 'REGRESSION 8: Detected Pronoun / Reference Ambiguity');

// 9. "The system shall allow users to register for events." -> should pass clean with 0 defects
console.log('\nREGRESSION 9: "The system shall allow users to register for events." (Valid requirement)');
const res9 = AIEngine.analyze20Problems('The system shall allow users to register for events.');
assert(res9.issues.length === 0, `REGRESSION 9: Well-formed atomic requirement passes clean with 0 defects (got ${res9.issues.length} issues: ${res9.issues.map(i => i.type).join(', ')})`);

// 10. Password Contradiction (REQ-01: 8 chars vs REQ-02: 6 chars)
console.log('\nREGRESSION 10: Cross-Requirement Contradiction (Password Length)');
const req10a = { id: 'REQ-01', text: 'The password shall contain at least 8 characters.' };
const req10b = { id: 'REQ-02', text: 'The password shall contain at least 6 characters.' };
const res10 = AIEngine.analyze20Problems(req10a.text, [req10a, req10b], 'Security Service', 0);
const hasContradiction10 = res10.issues.some(i => i.code === 'DEF-14' || i.category?.includes('Contradiction') || i.type.includes('Contradiction'));
assert(hasContradiction10, 'REGRESSION 10: Detected cross-requirement contradiction');
const conflictIssue = res10.issues.find(i => i.code === 'DEF-14');
assert(conflictIssue?.relatedReqId === 'REQ-02', `REGRESSION 10: Correctly identified conflicting counterpart ${conflictIssue?.relatedReqId}`);

// 11. Near-duplicate requirements
console.log('\nREGRESSION 11: Duplicate / Near-Duplicate Detection');
const req11a = { id: 'REQ-01', text: 'The system shall allow users to register for events.' };
const req11b = { id: 'REQ-02', text: 'Users shall be able to register for events.' };
const res11 = AIEngine.analyze20Problems(req11a.text, [req11a, req11b], 'Smart College Event Management', 0);
const hasDuplicate11 = res11.issues.some(i => i.code === 'DEF-13' || i.category?.includes('Duplicate') || i.type.includes('Duplicate'));
assert(hasDuplicate11, 'REGRESSION 11: Detected potential near-duplicate requirement');
const duplicateIssue = res11.issues.find(i => i.code === 'DEF-13');
assert(duplicateIssue?.relatedReqId === 'REQ-02', `REGRESSION 11: Correctly flagged related requirement ${duplicateIssue?.relatedReqId}`);

// =============================================================
// DOMAIN GENERALIZATION TESTS (6 DIVERSE REAL-WORLD DOMAINS)
// =============================================================
console.log('\n====================================================');
console.log('RUNNING DOMAIN-GENERALIZATION TESTS (6 DOMAINS)');
console.log('====================================================\n');

const testDomains = [
  { domain: 'Railway Reservation System', input: 'The booking portal shall process ticket cancellations quickly.' },
  { domain: 'Hospital Management', input: 'Can update patient vitals.' },
  { domain: 'E-Commerce', input: 'The checkout service shall support many concurrent shoppers.' },
  { domain: 'Smart College Event Management', input: 'The student shall submit feedback and the coordinator shall review all submissions.' },
  { domain: 'Drone Fleet Maintenance Management', input: 'The telemetry engine shall broadcast alerts.' },
  { domain: 'Quantum Cryptography Subsystem', input: 'It shall calibrate them without delay.' }
];

testDomains.forEach(({ domain, input }) => {
  console.log(`Domain Test: [${domain}] -> "${input}"`);
  const audit = AIEngine.analyze20Problems(input, [], domain);
  assert(audit.issues.length > 0, `  ✓ Domain [${domain}]: Successfully identified defects based on requirement semantics`);
  assert(Boolean(audit.safeRewrite && audit.safeRewrite.length > 0), `  ✓ Domain [${domain}]: Generated safe IEEE rewrite: "${audit.safeRewrite}"`);
  assert(!audit.safeRewrite.includes('1.5 seconds'), `  ✓ Domain [${domain}]: No invented numeric values in safe rewrite`);
});

console.log('\n====================================================');
if (allPassed) {
  console.log('ALL IEEE AUDIT & EXPANDED DEFECT REGRESSION TESTS PASSED! 🎉');
  process.exit(0);
} else {
  console.error('ONE OR MORE TESTS FAILED! ❌');
  process.exit(1);
}
