import { AIEngine } from '../services/aiEngine';
import { Requirement } from '../types';

console.log('====================================================');
console.log('RUNNING REQUIREX AI DOMAIN-AGNOSTIC VERIFICATION TEST');
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
// TEST 5: Completely new domain - Drone Fleet Maintenance
// -------------------------------------------------------------
console.log('TEST 5: Custom Domain: "Drone Fleet Maintenance Management"');
const droneDomain = 'Drone Fleet Maintenance Management';
const droneText = `
1. Drone operators shall register drones before deployment.
2. Maintenance staff shall schedule periodic inspections.
3. The system shall notify operators when inspections are overdue.
4. The system shall maintain maintenance history for each drone.
5. The system shall support at least 100 active drones.
6. Unauthorized users shall not modify maintenance records.
`;

const droneReqs = AIEngine.extractRequirements(droneText, droneDomain);
assert(droneReqs.length === 6, `Extracted ${droneReqs.length} requirements (expected 6)`);
assert(droneReqs.every(r => r.domain === droneDomain), 'All extracted requirements have custom domain');

// User stories
const droneStories = AIEngine.generateUserStories(droneReqs);
assert(droneStories.length === 6, `Generated ${droneStories.length} user stories`);
const actors = droneStories.map(s => s.asA.toLowerCase());
console.log('  Inferred Actors:', actors);
assert(actors.some(a => a.includes('drone') || a.includes('operator')), 'Inferred drone operator actor');
assert(actors.some(a => a.includes('maintenance') || a.includes('staff')), 'Inferred maintenance staff actor');
assert(!actors.some(a => a.includes('passenger')), 'No passenger or railway actor present');

// Domain recommendations
const droneRecs = AIEngine.getDomainRecommendations(droneDomain, droneReqs);
assert(droneRecs.length > 0, `Generated ${droneRecs.length} domain recommendations`);
const recTitles = droneRecs.map(r => r.title);
console.log('  Dynamic Recommendations for Drone Fleet:', recTitles);
assert(!recTitles.some(t => t.toLowerCase().includes('tatkal') || t.toLowerCase().includes('berth') || t.toLowerCase().includes('pnr')), 'No Railway recommendations for Drone Fleet');

// Conflict detector
const droneConflicts = AIEngine.detectConflictsAndDuplicates(droneReqs, droneDomain);
assert(Array.isArray(droneConflicts), 'detectConflictsAndDuplicates returned array');
assert(!droneConflicts.some(c => c.titleA?.includes('Tatkal') || c.explanation?.includes('Tatkal')), 'No Railway Tatkal conflict fallback');

// Semantic clusters
const droneClusters = AIEngine.generateSemanticClusters(droneReqs);
assert(droneClusters.length > 0, `Generated ${droneClusters.length} semantic clusters`);
const clusterReqIds = droneClusters.flatMap(c => c.requirements.map(r => r.id));
assert(clusterReqIds.length > 0 && clusterReqIds.every(id => droneReqs.some(r => r.id === id)), 'Semantic clusters strictly use actual requirement IDs (no REQ-AUTH-01)');

// Test cases & Risk heatmap
const testCases = AIEngine.generateTestCases(droneReqs);
const droneRisks = AIEngine.generateRiskHeatmap(droneReqs);
console.log(`  Generated ${droneRisks.length} dynamic risk items`);
assert(!droneRisks.some(r => r.title.toLowerCase().includes('tatkal') || r.title.toLowerCase().includes('berth')), 'Risk heatmap contains zero Railway/Tatkal fallback data');

// Refinement challenges
const droneChallenges = AIEngine.generateRefinementChallenges(droneReqs, droneDomain);
console.log(`  Generated ${droneChallenges.length} refinement challenges`);
assert(!droneChallenges.some(c => c.flawedText.toLowerCase().includes('tatkal')), 'Refinement challenges do not show Railway Tatkal text');

// Testing matrix
const matrixRows = AIEngine.generateTestingMatrix(droneReqs, testCases);
assert(matrixRows.length === 6, `Testing matrix has ${matrixRows.length} rows matching 6 requirements`);
const overallCoverage = Math.round(matrixRows.reduce((acc, r) => acc + r.overallCoverage, 0) / matrixRows.length);
assert(typeof overallCoverage === 'number' && !isNaN(overallCoverage), `Testing matrix computed real dynamic coverage: ${overallCoverage}%`);

// -------------------------------------------------------------
// TEST 4: Smart College Event Management
// -------------------------------------------------------------
console.log('\nTEST 4: Custom Domain: "Smart College Event Management"');
const collegeDomain = 'Smart College Event Management';
const collegeText = `
1. Students should register for events.
2. Organizers should approve registrations.
3. Students should receive notifications.
4. The system should support 500 concurrent users.
`;
const collegeReqs = AIEngine.extractRequirements(collegeText, collegeDomain);
assert(collegeReqs.length === 4, `Extracted ${collegeReqs.length} college requirements`);
const collegeStories = AIEngine.generateUserStories(collegeReqs);
const collegeActors = collegeStories.map(s => s.asA.toLowerCase());
console.log('  Inferred College Actors:', collegeActors);
assert(collegeActors.some(a => a.includes('student')), 'Inferred student actor');
assert(collegeActors.some(a => a.includes('organizer')), 'Inferred organizer actor');

const collegeRecs = AIEngine.getDomainRecommendations(collegeDomain, collegeReqs);
assert(!collegeRecs.some(r => r.title.toLowerCase().includes('tatkal')), 'Zero railway recommendations for College Event Management');

// -------------------------------------------------------------
// TEST 1, 2, 3: Predefined Domains
// -------------------------------------------------------------
console.log('\nTESTS 1, 2, 3: Predefined Domains (Railway, Hospital, E-Commerce)');
const railwayRecs = AIEngine.getDomainRecommendations('Railway Reservation', []);
assert(railwayRecs.length > 0, 'Railway demo recommendations still work when explicitly requested');

const hospitalRecs = AIEngine.getDomainRecommendations('Hospital Management', []);
assert(hospitalRecs.length > 0, 'Hospital demo recommendations still work when explicitly requested');

const ecommerceRecs = AIEngine.getDomainRecommendations('E-Commerce', []);
assert(ecommerceRecs.length > 0, 'E-Commerce demo recommendations still work when explicitly requested');

console.log('\n====================================================');
if (allPassed) {
  console.log('ALL DOMAIN-AGNOSTIC VERIFICATION TESTS PASSED SUCCESSFULLY! 🎉');
  process.exit(0);
} else {
  console.error('ONE OR MORE TESTS FAILED! ❌');
  process.exit(1);
}
