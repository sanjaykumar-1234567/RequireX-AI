export type RequirementCategory = 
  | 'Functional' 
  | 'Non-functional' 
  | 'Business' 
  | 'System' 
  | 'User' 
  | 'Technical';

export type PriorityLevel = 'High' | 'Medium' | 'Low' | 'Critical';
export type SeverityLevel = 'High' | 'Medium' | 'Low' | 'Critical';
export type IssueType = 
  | 'Ambiguous word' 
  | 'Ambiguity'
  | 'Ambiguity / Vagueness'
  | 'Vague / Subjective Words'
  | 'Subjective Terminology'
  | 'Incomplete statement' 
  | 'Incomplete Requirement'
  | 'Missing Object / Unclear Action'
  | 'Weak requirement' 
  | 'Missing Non-Functional Requirement'
  | 'Non-testable requirement' 
  | 'Non-Verifiable / Non-Testable'
  | 'Conflicting requirement' 
  | 'Inconsistency / Contradiction'
  | 'Cross-Requirement Contradiction'
  | 'Duplicate requirement' 
  | 'Duplicate / Redundant Requirement'
  | 'Compound / Non-Atomic Requirement'
  | 'Non-Atomic Requirement'
  | 'Missing actor' 
  | 'Missing Actor / Stakeholder'
  | 'Missing Condition / Trigger'
  | 'Missing Inputs and Outputs'
  | 'Undefined Quantity'
  | 'Optional / Mandatory Ambiguity'
  | 'Pronoun / Reference Ambiguity'
  | 'Missing Acceptance Criteria'
  | 'Traceability Gap'
  | 'Missing constraint' 
  | 'Unclear Quantitative Constraint'
  | 'Security Gap'
  | 'Performance Gap'
  | 'Feasibility / Unrealistic Constraint'
  | 'Missing Business Rule'
  | 'Missing Error / Exception Handling'
  | 'Dependency Detection'
  | 'Requirement Classification'
  | 'Priority Detection'
  | 'Missing assumption';

export interface QualityIssue {
  id: string;
  type: IssueType;
  category?: string;
  problem: string;
  problematicPhrase?: string;
  explanation?: string;
  reason: string;
  suggestedCorrection: string;
  suggestedImprovement?: string;
  confidenceScore: number;
  severity: SeverityLevel;
  code?: string;
  requirementId?: string;
  categoryBadge?: string;
  missingElements?: string[];
  relatedReqId?: string;
  suggestedDecomposition?: string[];
  ieeeRewrite?: string;
}

export type RequirementLifecycleStatus = 
  | 'RAW' 
  | 'ANALYZED' 
  | 'NEEDS_REVIEW' 
  | 'AI_SUGGESTION' 
  | 'USER_EDITED' 
  | 'USER_APPROVED' 
  | 'REJECTED'
  // Backward compatibility:
  | 'Draft'
  | 'Needs Refinement'
  | 'Under Review'
  | 'Approved';

export type ReviewDecision = 'Pending' | 'Approved' | 'Rejected' | 'Modified';

export interface Requirement {
  id: string;                         // Persistent unique ID, e.g. "REQ-01"
  title: string;
  description: string;                // Current active requirement text
  rawSource: string;                  // Pristine original user input (NEVER overwritten)
  originalRawText?: string;           // Backward-compatible alias for rawSource
  currentText?: string;               // Explicit alias for description
  suggestedText?: string;             // Safe IEEE rewrite proposal (no arbitrary numbers)
  improvedText?: string;              // Backward-compatible alias for suggestedText
  approvedText?: string;              // User-approved text (strictly set upon explicit human approval)
  optionalRefinement?: string;        // Optional performance refinement tagged [AI Suggested Value]
  category: RequirementCategory;      // Primary classification
  priority: PriorityLevel;
  status: RequirementLifecycleStatus;
  reviewDecision: ReviewDecision;
  isSRSReady: boolean;
  issues: QualityIssue[];
  tags?: string[];                    // Semantic tags (e.g. ['Performance', 'Ambiguity'])
  domain: string;
  version: number;
  createdAt: string;
  isImprovedAccepted?: boolean;
  rejectionReason?: string;
  reviewedAt?: string;
}

export interface NormalizedModelOutput {
  providerId: string;
  providerName: string;
  modelId: string;
  actualModelId?: string;
  fallbackUsed?: boolean;
  primaryModelAttempted?: string;
  status: 'success' | 'error' | 'not_configured' | 'rate_limited' | 'timeout';
  latencyMs: number;
  inputTokens?: number;
  outputTokens?: number;
  costEstimate?: string;
  classification: RequirementCategory;
  detectedVagueTerms: string[];
  defectCodes?: string[];
  issues: {
    code?: string;
    type: string;
    problem: string;
    reason: string;
    severity: SeverityLevel;
  }[];
  isTestable: boolean;
  testabilityAssessment: string;
  safeRewrite: string;
  optionalRefinement?: string;
  suggestedAcceptanceCriteria: string[];
  rawOutput?: string;
  errorMessage?: string;
}

export interface ModelAgreementAnalysis {
  totalEvaluated: number;
  classificationConsensus: {
    category: RequirementCategory;
    percentage: number;
    agreementLevel: 'High Agreement' | 'Partial Agreement' | 'Disagreement';
  };
  vagueTermsIdentified: {
    term: string;
    modelsAgreeing: string[];
  }[];
  testabilityConsensus: {
    isTestable: boolean;
    percentage: number;
  };
  sharedDefectCodes?: {
    code: string;
    name: string;
    modelsAgreeing: string[];
  }[];
  modelSpecificDefectCodes?: {
    code: string;
    name: string;
    model: string;
  }[];
  defectAgreementRate?: number;
  safeRewritePresentCount?: number;
  acceptanceCriteriaPresentCount?: number;
  rewriteAlignmentScore: number;
  overallConsensusLevel: 'Strong Agreement' | 'Moderate Consensus' | 'Significant Divergence' | 'Insufficient Models';
}

export interface RecommendedRequirement {
  id: string;
  category: RequirementCategory;
  title: string;
  description: string;
  domain: string;
  selected: boolean;
}

export interface UserStory {
  id: string;
  requirementId?: string;
  asA: string;
  iWantTo: string;
  soThat: string;
  priority: PriorityLevel;
  storyPoints: number;
  acceptanceCriteria: string[];
  definitionOfDone: string[];
  gherkinScenario?: string;
}

export interface UseCase {
  id: string;
  requirementId?: string;
  title: string;
  actors: string[];
  preconditions: string[];
  postconditions: string[];
  mainFlow: string[];
  alternativeFlow: string[];
  exceptions: string[];
  relationships: string[];
}

export interface TestCase {
  id: string;
  requirementId: string;
  category: 'Positive' | 'Negative' | 'Boundary' | 'Validation' | 'Security' | 'Performance';
  description: string;
  inputData: string;
  expectedOutput: string;
  priority: PriorityLevel;
  status: 'Passed' | 'Pending' | 'Failed' | 'Draft';
}

export interface RiskItem {
  id: string;
  title: string;
  category: 'Requirement Risk' | 'Project Risk' | 'Requirement Volatility' | 'Complexity' | 'Dependency Issue';
  impact: 'High' | 'Medium' | 'Low';
  probability: 'High' | 'Medium' | 'Low';
  mitigation: string;
  affectedRequirementIds: string[];
}

export interface RTMRow {
  requirementId: string;
  requirementTitle: string;
  category: RequirementCategory;
  useCaseId: string;
  testCaseIds: string[];
  status: 'Covered' | 'Partial' | 'Uncovered';
  priority: PriorityLevel;
}

export interface ComplianceCheck {
  id: string;
  criterion: string;
  description: string;
  score: number; // 0 - 100
  status: 'Passed' | 'Warning' | 'Failed';
  recommendation: string;
}

export interface VersionSnapshot {
  id: string;
  versionNumber: number;
  timestamp: string;
  description: string;
  requirements: Requirement[];
  userStories: UserStory[];
  useCases: UseCase[];
  testCases: TestCase[];
  risks: RiskItem[];
}

export interface Project {
  id: string;
  name: string;
  domain: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  requirements: Requirement[];
  recommendedRequirements: RecommendedRequirement[];
  userStories: UserStory[];
  useCases: UseCase[];
  testCases: TestCase[];
  risks: RiskItem[];
  complianceChecks?: ComplianceCheck[];
  history: VersionSnapshot[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  actionButtons?: { label: string; tabTarget: string }[];
}

export interface StakeholderCoverage {
  stakeholder: string;
  count: number;
  coveragePercent: number;
  status: 'Complete' | 'Partial' | 'Incomplete';
  missingAspects: string[];
}

export interface RequirementConflict {
  id: string;
  reqAId: string;
  reqBId: string;
  titleA: string;
  titleB: string;
  conflictType: 
    | 'Business Rule' 
    | 'Time Limit' 
    | 'Security Policy' 
    | 'Performance Window' 
    | 'Access Level'
    | 'Policy Conflict'
    | 'Feasibility'
    | 'Algorithm Logic'
    | 'Security vs Performance'
    | 'Workflow Authority'
    | 'Data Availability'
    | 'Race Condition';
  explanation: string;
  severity: 'High' | 'Medium' | 'Low';
  suggestedResolution: string;
}

export interface WhatIfScenarioResult {
  scenarioPrompt: string;
  impactRating: 'High' | 'Medium' | 'Low';
  affectedRequirements: string[];
  affectedStories: string[];
  affectedUseCases: string[];
  affectedTestCases: string[];
  riskDelta: string;
  complexityDelta: string;
  aiExplanation: string;
  proposedModifications: string[];
}

export interface PersonaReview {
  persona: 'Business Analyst' | 'Software Developer' | 'QA Engineer' | 'Security Analyst' | 'Project Manager';
  score: number;
  summary: string;
  recommendations: string[];
  risksIdentified: string[];
}

export interface QualityHeatmapRow {
  reqId: string;
  title: string;
  completeness: number;
  clarity: number;
  testability: number;
  verifiability: number;
  traceability: number;
  consistency: number;
  overallScore: number;
  volatility: 'LOW' | 'MEDIUM' | 'HIGH';
}

export interface UserSession {
  username: string;
  email: string;
  role: string;
  pin?: string;
  isLoggedIn: boolean;
}

export interface RiskHeatmapItem {
  id: string;
  title: string;
  probability: 'High' | 'Medium' | 'Low';
  impact: 'High' | 'Medium' | 'Low';
  score: number; // 0 - 10
  category: string;
  affectedRequirementIds: string[];
  affectedTestCaseIds: string[];
  mitigation: string;
  color: 'green' | 'amber' | 'red';
}

export interface TraceabilityNodeItem {
  reqId: string;
  reqTitle: string;
  storyId: string;
  criteriaId: string;
  useCaseId: string;
  testCaseId: string;
  status: 'PASS' | 'PENDING' | 'FAIL';
}

export interface RoadmapReleaseItem {
  release: 'Release 1 (MVP)' | 'Release 2 (Enhanced)' | 'Release 3 (Advanced)';
  moscow: 'Must Have' | 'Should Have' | 'Could Have' | "Won't Have";
  timeline: string;
  requirements: string[];
  totalStoryPoints: number;
  readiness: number;
}

export interface SprintPlanProposal {
  sprint: string;
  capacityPoints: number;
  assignedPoints: number;
  requirements: { id: string; title: string; points: number }[];
  dependencies: string[];
  riskRating: 'Low' | 'Medium' | 'High';
}

export interface SemanticSimilarityGroup {
  clusterName: string;
  icon: string;
  requirements: { id: string; title: string; similarityScore: number }[];
  primaryInsight: string;
}

export interface ArchitectureImpactChain {
  reqId: string;
  reqTitle: string;
  microservice: string;
  databaseTable: string;
  downstreamServices: string[];
  affectedTests: string[];
  impactSeverity: 'Low' | 'Medium' | 'High' | 'Critical';
}

export interface TestingMatrixCoverageRow {
  reqId: string;
  reqTitle: string;
  unitTest: boolean;
  integrationTest: boolean;
  systemTest: boolean;
  securityTest: boolean;
  performanceTest: boolean;
  overallCoverage: number; // %
  hasGaps: boolean;
}

export interface PowerInterestStakeholderItem {
  name: string;
  role: string;
  power: 'High' | 'Low';
  interest: 'High' | 'Low';
  quadrant: 'Key Players' | 'Keep Satisfied' | 'Keep Informed' | 'Minimal Effort';
  priorityRequirements: string[];
  engagementStrategy: string;
}

export interface RefinementGameItem {
  id: string;
  domain: string;
  flawedText: string;
  defectReasons: string[];
  originalScore: number;
  referenceIdealText: string;
}

