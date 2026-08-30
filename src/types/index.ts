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
  | 'Incomplete statement' 
  | 'Weak requirement' 
  | 'Duplicate requirement' 
  | 'Conflicting requirement' 
  | 'Non-testable requirement' 
  | 'Missing constraint' 
  | 'Missing actor' 
  | 'Missing assumption';

export interface QualityIssue {
  id: string;
  type: IssueType;
  problem: string;
  reason: string;
  suggestedCorrection: string;
  confidenceScore: number;
  severity: SeverityLevel;
}

export interface Requirement {
  id: string;
  title: string;
  description: string;
  category: RequirementCategory;
  priority: PriorityLevel;
  status: 'Draft' | 'Analyzed' | 'Improved' | 'Approved';
  issues: QualityIssue[];
  improvedText?: string;
  isImprovedAccepted?: boolean;
  domain: string;
  version: number;
  createdAt: string;
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

