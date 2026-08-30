export type LLMProvider = 'OpenAI' | 'Google' | 'Anthropic' | 'Meta' | 'Mistral' | 'Custom';

export interface LLMModelConfig {
  id: string;
  name: string;
  provider: LLMProvider;
  modelId: string;
  apiStatus: 'Connected' | 'Demo / Mock Evaluation Mode';
  apiKey?: string;
  contextWindow: number; // in K tokens
  costPer1kPrompt: number; // in USD
  costPer1kCompletion: number; // in USD
  speedRating: 'Fast' | 'Medium' | 'Slow';
  color: string; // for charts and badges
  borderColor: string;
  glowColor: string;
  isCustom?: boolean;
}

export type LLMEvalTaskId = 
  | 'extraction'
  | 'classification'
  | 'ambiguity'
  | 'missing'
  | 'completeness'
  | 'conflict'
  | 'stories'
  | 'acceptance'
  | 'usecases'
  | 'testcases'
  | 'risks'
  | 'srs'
  | 'structured';

export interface LLMEvalTaskMeta {
  id: LLMEvalTaskId;
  label: string;
  category: 'Analysis' | 'Quality & Verification' | 'Synthesis & Agile' | 'Reliability';
  description: string;
  academicMetric: string;
  defaultWeight: number; // in %
}

export interface ConfusionMatrixData {
  labels: string[];
  matrix: number[][]; // actual vs predicted
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
}

export interface AmbiguityDetectedItem {
  phrase: string;
  reason: string;
  suggestedClarification: string;
  isGroundTruthMatch: boolean;
}

export interface MissingReqDetectedItem {
  feature: string;
  relevance: 'High' | 'Medium' | 'Low';
  reason: string;
  isHallucination: boolean;
}

export interface ConflictDetectedItem {
  reqAId: string;
  reqBId: string;
  severity: 'High' | 'Medium' | 'Low';
  explanation: string;
  suggestedResolution: string;
  isGroundTruthMatch: boolean;
}

export interface ModelTaskOutput {
  taskId: LLMEvalTaskId;
  score: number; // 0 - 100
  rawOutputText: string;
  jsonOutput?: any;
  isStructuredJsonValid: boolean;
  accuracy?: number;
  precision?: number;
  recall?: number;
  f1Score?: number;
  latencyMs: number;
  tokensUsed: number;
  estimatedCostUsd: number;
  evaluationMode: 'Objective Ground-Truth' | 'AI-Assisted Evaluation' | 'Deterministic Benchmark';
  details: {
    correctCount?: number;
    missingCount?: number;
    incorrectCount?: number;
    confusionMatrix?: ConfusionMatrixData;
    ambiguities?: AmbiguityDetectedItem[];
    missingReqs?: MissingReqDetectedItem[];
    conflicts?: ConflictDetectedItem[];
    completenessBreakdown?: {
      missingConstraints: number;
      missingActors: number;
      missingConditions: number;
      missingCriteria: number;
    };
    userStoriesPreview?: { asA: string; iWant: string; soThat: string; points: number }[];
    testCasesPreview?: { id: string; type: string; inputs: string; expected: string }[];
    risksPreview?: { id: string; title: string; probability: string; impact: string; mitigation: string }[];
  };
}

export interface ModelEvaluationResult {
  modelId: string;
  modelName: string;
  provider: LLMProvider;
  color: string;
  glowColor: string;
  taskOutputs: Record<LLMEvalTaskId, ModelTaskOutput>;
  overallScore: number; // Weighted RequireX Evaluation Score
  radarScores: {
    extraction: number;
    classification: number;
    ambiguity: number;
    completeness: number;
    conflict: number;
    testing: number;
    risk: number;
    structured: number;
  };
  totalTokens: number;
  totalCostUsd: number;
  avgLatencyMs: number;
  structuredReliabilityRate: number; // %
  strengths: string[];
  weaknesses: string[];
  bestTasks: string[];
  weakestTasks: string[];
  recommendedRole: string;
}

export interface GroundTruthBenchmark {
  domain: string;
  domainName: string;
  description: string;
  rawInputDocument: string;
  expectedRequirements: {
    id: string;
    title: string;
    description: string;
    category: 'Functional' | 'Non-functional' | 'Business' | 'System' | 'User' | 'Technical';
    isAmbiguous?: boolean;
    ambiguityReason?: string;
  }[];
  knownAmbiguities: { phrase: string; targetReqId: string; clarification: string }[];
  knownMissingRequirements: { title: string; category: string; justification: string }[];
  knownConflicts: { reqAId: string; reqBId: string; reason: string; resolution: string; severity: 'High' | 'Medium' }[];
  expectedTestTypes: string[];
}

export interface BenchmarkRun {
  id: string;
  timestamp: string;
  domain: string;
  projectName: string;
  modelsTested: LLMModelConfig[];
  tasksRun: LLMEvalTaskId[];
  results: Record<string, ModelEvaluationResult>; // keyed by modelId
  weights: Record<LLMEvalTaskId, number>;
  topModelId: string;
  bestAnalysisModelId: string;
  bestTestingModuleId: string;
  bestStructuredModelId: string;
  fastestModelId: string;
  bestValueModelId: string;
  isDemoMode: boolean;
  recommendationSummary: {
    recommendedForAnalysis: { modelName: string; reason: string };
    recommendedForTesting: { modelName: string; reason: string };
    recommendedForCost: { modelName: string; reason: string };
    overallConclusion: string;
  };
}
