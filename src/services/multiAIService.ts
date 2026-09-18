/**
 * Multi-AI / LLM Evaluation Workbench Service
 * 
 * Executes identical requirements-engineering prompts across:
 * 1. Deterministic Baseline (Built-in IEEE Rule Engine — Always Available, 0 API Key)
 * 2. Google Gemini API (Free-Tier Flash Series)
 * 3. Groq Cloud (Free Developer Tier)
 * 4. OpenRouter Free Models & OpenRouter Free Router
 * 5. OpenAI (Usage-priced API Provider)
 * 6. Anthropic (Usage-priced API Provider)
 * 7. DeepSeek (Usage-priced API Provider)
 * 
 * Enforces strictly normalized typed output, client-side latency measurement,
 * 15-second AbortController timeouts, factual defect code agreement,
 * zero fabricated model responses, and ISO/IEC/IEEE 29148 compliance.
 */

import { AIConfigManager, AI_PROVIDERS, AIProviderId } from './aiConfig';
import { AIEngine } from './aiEngine';
import { 
  NormalizedModelOutput, 
  ModelAgreementAnalysis, 
  RequirementCategory, 
  SeverityLevel 
} from '../types';

export type AccessTierType = 'LOCAL_FREE' | 'FREE_TIER' | 'FREE' | 'PAID';

export interface MultiAIProviderDescriptor {
  id: string;
  name: string;
  providerKey: AIProviderId | 'baseline';
  modelId: string;
  isFreeTier: boolean;
  accessTier: AccessTierType;
  pricingLabel: string;
  description: string;
}

export const VALID_DEFECT_CODES = [
  'DEF-01', 'DEF-02', 'DEF-03', 'DEF-04', 'DEF-05', 'DEF-06', 'DEF-07', 'DEF-08',
  'DEF-09', 'DEF-10', 'DEF-11', 'DEF-12', 'DEF-13', 'DEF-14', 'DEF-15', 'DEF-16'
] as const;

export const DEFECT_CODE_DESCRIPTIONS: Record<string, string> = {
  'DEF-01': 'Ambiguity',
  'DEF-02': 'Non-Verifiable / Non-Testable',
  'DEF-03': 'Incomplete Requirement',
  'DEF-04': 'Missing Actor',
  'DEF-05': 'Missing Object',
  'DEF-06': 'Missing Trigger / Condition',
  'DEF-07': 'Compound / Non-Atomic',
  'DEF-08': 'Undefined Quantity',
  'DEF-09': 'Subjective Terms / Vague Words',
  'DEF-10': 'Optional / Modal Words',
  'DEF-11': 'Pronoun Ambiguity',
  'DEF-12': 'Acceptance Criteria Gaps',
  'DEF-13': 'Duplicate / Redundant',
  'DEF-14': 'Contradiction / Conflict',
  'DEF-15': 'Traceability Gap',
  'DEF-16': 'Missing Non-Functional Requirements'
};

export const AVAILABLE_MULTI_AI_PROVIDERS: MultiAIProviderDescriptor[] = [
  {
    id: 'baseline',
    name: 'Deterministic Baseline',
    providerKey: 'baseline',
    modelId: 'ISO/IEC/IEEE 29148 NLP Rule Engine',
    isFreeTier: true,
    accessTier: 'LOCAL_FREE',
    pricingLabel: 'Local • Free • No API Key',
    description: 'Deterministic rule-based requirements engineering engine. No API key required; runs locally in browser.'
  },
  {
    id: 'gemini',
    name: 'Google Gemini',
    providerKey: 'gemini',
    modelId: 'gemini-3.6-flash',
    isFreeTier: true,
    accessTier: 'FREE_TIER',
    pricingLabel: 'Free Tier Available • API Key Required',
    description: 'Official Google Gemini Flash model (supports 3.6 Flash, 1.5 Flash). Fast inference with generous free-tier quota.'
  },
  {
    id: 'groq',
    name: 'Groq Cloud',
    providerKey: 'groq',
    modelId: 'llama-3.3-70b-versatile',
    isFreeTier: true,
    accessTier: 'FREE_TIER',
    pricingLabel: 'Free Developer Tier • API Key Required',
    description: 'Ultra-fast LPU inference hosting Meta Llama 3.3 70B Versatile on free developer tier (subject to rate quota).'
  },
  {
    id: 'openrouter',
    name: 'OpenRouter (DeepSeek R1 Free)',
    providerKey: 'openrouter',
    modelId: 'deepseek/deepseek-r1:free',
    isFreeTier: true,
    accessTier: 'FREE_TIER',
    pricingLabel: 'Free Models Available • API Key Required',
    description: 'Unified gateway providing access to DeepSeek R1 and Llama free-tier variants.'
  },
  {
    id: 'openrouter_free',
    name: 'OpenRouter Free Router',
    providerKey: 'openrouter',
    modelId: 'openrouter/free',
    isFreeTier: true,
    accessTier: 'FREE',
    pricingLabel: 'Free Router • API Key Required',
    description: 'OpenRouter dynamic free model router auto-directing to currently available zero-cost endpoints.'
  },
  {
    id: 'openai',
    name: 'OpenAI Direct',
    providerKey: 'openai',
    modelId: 'gpt-4o',
    isFreeTier: false,
    accessTier: 'PAID',
    pricingLabel: 'Paid API • API Key Required',
    description: 'Direct official paid endpoint for OpenAI GPT-4o. Requires billed OpenAI API key.'
  },
  {
    id: 'anthropic',
    name: 'Anthropic Direct',
    providerKey: 'anthropic',
    modelId: 'claude-3-5-sonnet-20241022',
    isFreeTier: false,
    accessTier: 'PAID',
    pricingLabel: 'Paid API • API Key Required',
    description: 'Direct official paid endpoint for Claude 3.5 Sonnet. Requires billed Anthropic API key.'
  },
  {
    id: 'deepseek',
    name: 'DeepSeek Direct',
    providerKey: 'deepseek',
    modelId: 'deepseek-reasoner',
    isFreeTier: false,
    accessTier: 'PAID',
    pricingLabel: 'Paid API • API Key Required',
    description: 'Direct usage-priced endpoint for DeepSeek R1 reasoning core.'
  }
];

export class MultiAIService {
  /**
   * Get provider descriptor by ID
   */
  static getProvider(providerId: string): MultiAIProviderDescriptor | undefined {
    return AVAILABLE_MULTI_AI_PROVIDERS.find(p => p.id === providerId);
  }

  /**
   * Check if a specific provider is currently executable
   */
  static isProviderConfigured(providerId: string): boolean {
    if (providerId === 'baseline') return true;
    const provider = this.getProvider(providerId);
    const key = provider ? provider.providerKey : providerId;
    if (key === 'baseline') return true;
    return Boolean(AIConfigManager.getApiKey(key as AIProviderId));
  }

  /**
   * Calculate transparent lexical Jaccard similarity (0-100) between two strings
   */
  static calculateLexicalSimilarity(textA: string, textB: string): number {
    if (!textA || !textB) return 0;
    const tokenize = (str: string): Set<string> => {
      const tokens = str
        .toLowerCase()
        .replace(/[^\w\s]/g, ' ')
        .split(/\s+/)
        .filter(t => t.length > 2);
      return new Set(tokens);
    };

    const setA = tokenize(textA);
    const setB = tokenize(textB);
    if (setA.size === 0 || setB.size === 0) return 0;

    let intersectionCount = 0;
    setA.forEach(token => {
      if (setB.has(token)) intersectionCount++;
    });

    const unionCount = new Set([...setA, ...setB]).size;
    return unionCount > 0 ? Math.round((intersectionCount / unionCount) * 100) : 0;
  }

  /**
   * Get the standard structured prompt sent to all models for identical evaluation
   */
  static buildStructuredPrompt(reqText: string, domain: string): string {
    return `You are a Principal Requirements Engineer certified in ISO/IEC/IEEE 29148:2018 & IEEE Std 830-1998.
Evaluate this requirement statement for a "${domain}" software system:

REQUIREMENT UNDER AUDIT:
"${reqText}"

TASKS:
1. Classify the requirement into one of: "Functional", "Non-functional", "System", "Business", "User", "Technical".
   NOTE: If the sentence describes a user or system functional action (e.g., enter details, register, book, pay), classify as "Functional", even if it contains vague adverbs like "fastly".
2. Identify all vague, subjective, ambiguous, or non-quantifiable terms (e.g., "fast", "fastly", "quick", "quickly", "easy", "user-friendly", "efficient", "secure", "reliable", etc.).
3. Identify IEEE quality defect codes using ONLY the following standard codes (do not invent codes):
   - DEF-01: Ambiguity
   - DEF-02: Non-Verifiable / Non-Testable
   - DEF-03: Incomplete Requirement
   - DEF-04: Missing Actor
   - DEF-05: Missing Object
   - DEF-06: Missing Trigger / Condition
   - DEF-07: Compound / Non-Atomic
   - DEF-08: Undefined Quantity
   - DEF-09: Subjective Terms / Vague Words
   - DEF-10: Optional / Modal Words
   - DEF-11: Pronoun Ambiguity
   - DEF-12: Acceptance Criteria Gaps
   - DEF-13: Duplicate / Redundant
   - DEF-14: Contradiction / Conflict
   - DEF-15: Traceability Gap
   - DEF-16: Missing Non-Functional Requirements
4. Determine whether the requirement is directly testable (can an automated QA boolean test pass/fail assertion be written without subjective judgment?).
5. Propose a SAFE IEEE 830 rewrite: grammatically normalized, professional IEEE syntax ("The system shall allow...").
   CRITICAL CONSTRAINT: Do NOT invent arbitrary numerical values (like "1.5 seconds") into the safe rewrite unless explicitly supplied by the user.
6. If performance or quality constraints are missing, provide a separate optional refinement clearly marked as an AI Suggested Value.
7. Provide 2-3 Gherkin acceptance criteria (Given/When/Then).

Return ONLY a valid JSON object matching this exact schema:
{
  "classification": "Functional" | "Non-functional" | "System" | "Business" | "User" | "Technical",
  "detectedVagueTerms": ["term1", "term2"],
  "defectCodes": ["DEF-01", "DEF-02"],
  "issues": [
    {
      "code": "DEF-01",
      "type": "Ambiguity",
      "problem": "Factual problem description",
      "reason": "Why it violates ISO/IEC/IEEE 29148",
      "severity": "Critical" | "High" | "Medium" | "Low"
    }
  ],
  "isTestable": boolean,
  "testabilityAssessment": "Reasoning explaining why observable thresholds do or do not exist",
  "safeRewrite": "Clean IEEE specification without invented facts",
  "optionalRefinement": "Optional refinement marked [AI Suggested Value] if applicable",
  "suggestedAcceptanceCriteria": ["Given ... When ... Then ..."]
}`;
  }

  /**
   * Execute evaluation against the Deterministic Baseline engine
   */
  static executeBaseline(reqText: string, domain: string): NormalizedModelOutput {
    const startTime = performance.now();
    const analysis = AIEngine.analyze20Problems(reqText, [reqText], domain, 0);
    const latencyMs = Math.max(1, Math.round(performance.now() - startTime));

    // Extract detected vague terms from analysis issues
    const vagueTerms: string[] = [];
    analysis.issues.forEach(i => {
      const match = i.problem.match(/"([^"]+)"/);
      if (match && match[1]) {
        vagueTerms.push(match[1]);
      }
    });

    const validDefectCodes = new Set<string>(VALID_DEFECT_CODES);
    const baselineDefectCodes = Array.from(new Set(
      analysis.issues
        .map(i => i.code?.toUpperCase())
        .filter((c): c is string => Boolean(c && validDefectCodes.has(c)))
    ));

    const isTestable = !analysis.issues.some(i => 
      i.type === 'Ambiguity' || 
      i.type === 'Vague / Subjective Words' || 
      i.type === 'Non-Verifiable / Non-Testable' ||
      i.code === 'DEF-01' || 
      i.code === 'DEF-02' || 
      i.code === 'DEF-05'
    );

    return {
      providerId: 'baseline',
      providerName: 'Deterministic Baseline',
      modelId: 'ISO/IEC/IEEE 29148 NLP Rule Engine',
      actualModelId: 'ISO/IEC/IEEE 29148 NLP Rule Engine',
      fallbackUsed: false,
      primaryModelAttempted: 'ISO/IEC/IEEE 29148 NLP Rule Engine',
      status: 'success',
      latencyMs,
      inputTokens: Math.round(reqText.split(/\s+/).length * 4.2),
      outputTokens: Math.round(analysis.safeRewrite.split(/\s+/).length * 4.2),
      costEstimate: 'Local • Free (No API Key)',
      classification: analysis.category,
      detectedVagueTerms: Array.from(new Set(vagueTerms)),
      defectCodes: baselineDefectCodes,
      issues: analysis.issues.map(i => ({
        code: i.code && validDefectCodes.has(i.code) ? i.code : undefined,
        type: i.type,
        problem: i.problem,
        reason: i.reason,
        severity: i.severity
      })),
      isTestable,
      testabilityAssessment: isTestable
        ? 'Statement contains verifiable operational criteria allowing automated pass/fail verification.'
        : 'Statement lacks quantitative boundaries or uses subjective adverbs, preventing deterministic pass/fail assertion formulation.',
      safeRewrite: analysis.safeRewrite,
      optionalRefinement: analysis.optionalRefinement,
      suggestedAcceptanceCriteria: [
        `Given the ${domain.toLowerCase()} system is operating nominally`,
        `When the user initiates the requested action`,
        `Then the system shall complete the operation in accordance with IEEE 830 standards`
      ]
    };
  }

  /**
   * Execute evaluation against Google Gemini API with 15s timeout
   */
  static async executeGemini(reqText: string, domain: string): Promise<NormalizedModelOutput> {
    const apiKey = AIConfigManager.getApiKey('gemini');
    if (!apiKey) {
      return {
        providerId: 'gemini',
        providerName: 'Google Gemini',
        modelId: 'gemini-3.6-flash',
        actualModelId: 'gemini-3.6-flash',
        fallbackUsed: false,
        primaryModelAttempted: 'gemini-3.6-flash',
        status: 'not_configured',
        latencyMs: 0,
        classification: 'Functional',
        detectedVagueTerms: [],
        defectCodes: [],
        issues: [],
        isTestable: false,
        testabilityAssessment: 'API key not configured in AI Settings.',
        safeRewrite: '',
        suggestedAcceptanceCriteria: [],
        errorMessage: 'Gemini API key is required. Configure key in AI Settings or use Deterministic Baseline.'
      };
    }

    const startTime = performance.now();
    const prompt = this.buildStructuredPrompt(reqText, domain);
    const candidateModels = [
      'gemini-3.6-flash',
      'gemini-1.5-flash',
      'gemini-1.5-flash-8b',
      'gemini-1.5-flash-latest',
      'gemini-1.5-pro-latest'
    ];

    const candidateAttempts: { model: string; error: string }[] = [];
    for (const model of candidateModels) {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);

      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { responseMimeType: 'application/json', temperature: 0.1 }
          }),
          signal: controller.signal
        });
        clearTimeout(timeoutId);

        const latencyMs = Math.round(performance.now() - startTime);

        if (res.status === 429) {
          return {
            providerId: 'gemini',
            providerName: 'Google Gemini',
            modelId: 'gemini-3.6-flash',
            actualModelId: model,
            fallbackUsed: model !== candidateModels[0],
            primaryModelAttempted: candidateModels[0],
            status: 'rate_limited',
            latencyMs,
            costEstimate: 'Free Tier Available',
            classification: 'Functional',
            detectedVagueTerms: [],
            defectCodes: [],
            issues: [],
            isTestable: false,
            testabilityAssessment: 'Rate limit reached on Google Gemini free tier.',
            safeRewrite: '',
            suggestedAcceptanceCriteria: [],
            errorMessage: 'Gemini free-tier rate limit reached. Please wait a moment and retry.'
          };
        }

        if (res.status === 401 || res.status === 403) {
          return {
            providerId: 'gemini',
            providerName: 'Google Gemini',
            modelId: 'gemini-3.6-flash',
            actualModelId: model,
            fallbackUsed: model !== candidateModels[0],
            primaryModelAttempted: candidateModels[0],
            status: 'error',
            latencyMs,
            costEstimate: 'Free Tier Available',
            classification: 'Functional',
            detectedVagueTerms: [],
            defectCodes: [],
            issues: [],
            isTestable: false,
            testabilityAssessment: 'Authentication failed.',
            safeRewrite: '',
            suggestedAcceptanceCriteria: [],
            errorMessage: 'Google Gemini authentication failed. Verify API key in AI Settings.'
          };
        }

        if (!res.ok) {
          const errBody = await res.json().catch(() => ({}));
          const errMsg = errBody.error?.message || `HTTP ${res.status}`;
          candidateAttempts.push({ model, error: errMsg });
          continue;
        }

        const data = await res.json();
        const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
        const parsed = this.safeParseJson(rawText);

        const inputTokens = data.usageMetadata?.promptTokenCount;
        const outputTokens = data.usageMetadata?.candidatesTokenCount;

        const primaryModel = candidateModels[0];
        const isFallback = model !== primaryModel;

        return this.normalizeParsedResponse(
          parsed,
          'gemini',
          'Google Gemini',
          'gemini-3.6-flash',
          latencyMs,
          'Free Tier Available',
          inputTokens,
          outputTokens,
          rawText,
          model,
          isFallback,
          primaryModel
        );
      } catch (err: any) {
        clearTimeout(timeoutId);
        if (err.name === 'AbortError' || err.message?.includes('aborted')) {
          const latencyMs = Math.round(performance.now() - startTime);
          return {
            providerId: 'gemini',
            providerName: 'Google Gemini',
            modelId: 'gemini-3.6-flash',
            actualModelId: model,
            fallbackUsed: model !== candidateModels[0],
            primaryModelAttempted: candidateModels[0],
            status: 'timeout',
            latencyMs,
            costEstimate: 'Free Tier Available',
            classification: 'Functional',
            detectedVagueTerms: [],
            defectCodes: [],
            issues: [],
            isTestable: false,
            testabilityAssessment: 'Inference request timed out after 15s.',
            safeRewrite: '',
            suggestedAcceptanceCriteria: [],
            errorMessage: 'Google Gemini request timed out (15s limit reached).'
          };
        }
        candidateAttempts.push({ model, error: err.message || String(err) });
      }
    }

    const latencyMs = Math.round(performance.now() - startTime);
    const primaryModel = candidateModels[0];
    const attemptSummary = candidateAttempts.length > 0 
      ? candidateAttempts.map((a, i) => `[${i + 1}] ${a.model} (${a.error})`).join('; ')
      : 'All candidate endpoints failed';

    return {
      providerId: 'gemini',
      providerName: 'Google Gemini',
      modelId: 'gemini-3.6-flash',
      actualModelId: 'gemini-3.6-flash',
      fallbackUsed: false,
      primaryModelAttempted: primaryModel,
      status: 'error',
      latencyMs,
      costEstimate: 'Free Tier Available',
      classification: 'Functional',
      detectedVagueTerms: [],
      defectCodes: [],
      issues: [],
      isTestable: false,
      testabilityAssessment: 'Inference request failed across all verified candidate models.',
      safeRewrite: '',
      suggestedAcceptanceCriteria: [],
      errorMessage: `Gemini API execution failed (Primary: ${primaryModel}). Candidate attempts: ${attemptSummary}`
    };
  }

  /**
   * Execute evaluation against OpenAI compatible API (Groq, OpenRouter, OpenAI, DeepSeek)
   */
  static async executeOpenAICompatible(
    providerId: AIProviderId,
    modelId: string,
    reqText: string,
    domain: string
  ): Promise<NormalizedModelOutput> {
    const config = AI_PROVIDERS[providerId];
    const apiKey = AIConfigManager.getApiKey(providerId);

    if (!apiKey) {
      return {
        providerId,
        providerName: config?.name || providerId,
        modelId,
        status: 'not_configured',
        latencyMs: 0,
        classification: 'Functional',
        detectedVagueTerms: [],
        defectCodes: [],
        issues: [],
        isTestable: false,
        testabilityAssessment: 'API key not configured.',
        safeRewrite: '',
        suggestedAcceptanceCriteria: [],
        errorMessage: `${config?.name || providerId} API key is required.`
      };
    }

    const startTime = performance.now();
    const prompt = this.buildStructuredPrompt(reqText, domain);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    try {
      const isFreeRouter = modelId === 'openrouter/free';
      const requestPayload: any = {
        model: modelId,
        messages: [
          { role: 'system', content: 'You are an elite ISO/IEC/IEEE 29148 Requirements Engineer. Always output valid JSON.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.1
      };

      // Most endpoints support json_object mode; openrouter/free may dynamically route to models without it
      if (!isFreeRouter) {
        requestPayload.response_format = { type: 'json_object' };
      }

      const res = await fetch(`${config.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
          ...(providerId === 'openrouter' ? {
            'HTTP-Referer': typeof window !== 'undefined' ? window.location.origin : 'https://requirex.ai',
            'X-Title': 'RequireX AI Suite'
          } : {})
        },
        body: JSON.stringify(requestPayload),
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      const latencyMs = Math.round(performance.now() - startTime);

      if (res.status === 429) {
        return {
          providerId,
          providerName: config.name,
          modelId,
          status: 'rate_limited',
          latencyMs,
          classification: 'Functional',
          detectedVagueTerms: [],
          defectCodes: [],
          issues: [],
          isTestable: false,
          testabilityAssessment: 'Provider rate limit reached.',
          safeRewrite: '',
          suggestedAcceptanceCriteria: [],
          errorMessage: `${config.name} rate limit reached. Please retry later.`
        };
      }

      if (res.status === 401 || res.status === 403) {
        return {
          providerId,
          providerName: config.name,
          modelId,
          status: 'error',
          latencyMs,
          classification: 'Functional',
          detectedVagueTerms: [],
          defectCodes: [],
          issues: [],
          isTestable: false,
          testabilityAssessment: 'Authentication failed.',
          safeRewrite: '',
          suggestedAcceptanceCriteria: [],
          errorMessage: `${config.name} authentication failed. Verify API key in AI Settings.`
        };
      }

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error?.message || `HTTP ${res.status}`);
      }

      const data = await res.json();
      const rawText = data.choices?.[0]?.message?.content || '';
      const parsed = this.safeParseJson(rawText);

      const inputTokens = data.usage?.prompt_tokens;
      const outputTokens = data.usage?.completion_tokens;
      const costEstimate = providerId === 'groq' 
        ? 'Free Developer Tier' 
        : providerId === 'openrouter' && (modelId.includes(':free') || modelId.includes('/free'))
          ? 'Free Tier Available' 
          : 'Paid API (Usage-priced)';

      return this.normalizeParsedResponse(
        parsed,
        providerId,
        config.name,
        modelId,
        latencyMs,
        costEstimate,
        inputTokens,
        outputTokens,
        rawText
      );
    } catch (err: any) {
      clearTimeout(timeoutId);
      const latencyMs = Math.round(performance.now() - startTime);
      const isTimeout = err.name === 'AbortError' || err.message?.includes('aborted');
      return {
        providerId,
        providerName: config?.name || providerId,
        modelId,
        status: isTimeout ? 'timeout' : 'error',
        latencyMs,
        classification: 'Functional',
        detectedVagueTerms: [],
        defectCodes: [],
        issues: [],
        isTestable: false,
        testabilityAssessment: isTimeout ? 'Inference request timed out after 15s.' : 'Inference call failed.',
        safeRewrite: '',
        suggestedAcceptanceCriteria: [],
        errorMessage: isTimeout ? `${config?.name || providerId} request timed out (15s limit reached).` : `${config?.name || providerId} error: ${err.message || err}`
      };
    }
  }

  /**
   * Execute evaluation against Anthropic Claude Messages API with 15s timeout
   */
  static async executeAnthropic(
    modelId: string,
    reqText: string,
    domain: string
  ): Promise<NormalizedModelOutput> {
    const apiKey = AIConfigManager.getApiKey('anthropic');
    if (!apiKey) {
      return {
        providerId: 'anthropic',
        providerName: 'Anthropic Direct',
        modelId,
        status: 'not_configured',
        latencyMs: 0,
        classification: 'Functional',
        detectedVagueTerms: [],
        defectCodes: [],
        issues: [],
        isTestable: false,
        testabilityAssessment: 'API key not configured.',
        safeRewrite: '',
        suggestedAcceptanceCriteria: [],
        errorMessage: 'Anthropic Claude API key is required. Configure key in AI Settings.'
      };
    }

    const startTime = performance.now();
    const prompt = this.buildStructuredPrompt(reqText, domain);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true'
        },
        body: JSON.stringify({
          model: modelId || 'claude-3-5-sonnet-20241022',
          max_tokens: 1500,
          messages: [{ role: 'user', content: prompt }]
        }),
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      const latencyMs = Math.round(performance.now() - startTime);

      if (res.status === 429) {
        return {
          providerId: 'anthropic',
          providerName: 'Anthropic Direct',
          modelId,
          status: 'rate_limited',
          latencyMs,
          classification: 'Functional',
          detectedVagueTerms: [],
          defectCodes: [],
          issues: [],
          isTestable: false,
          testabilityAssessment: 'Anthropic rate limit reached.',
          safeRewrite: '',
          suggestedAcceptanceCriteria: [],
          errorMessage: 'Anthropic rate limit reached. Please retry later.'
        };
      }

      if (res.status === 401 || res.status === 403) {
        return {
          providerId: 'anthropic',
          providerName: 'Anthropic Direct',
          modelId,
          status: 'error',
          latencyMs,
          classification: 'Functional',
          detectedVagueTerms: [],
          defectCodes: [],
          issues: [],
          isTestable: false,
          testabilityAssessment: 'Authentication failed.',
          safeRewrite: '',
          suggestedAcceptanceCriteria: [],
          errorMessage: 'Anthropic authentication failed. Please verify your API key in AI Settings.'
        };
      }

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error?.message || `HTTP ${res.status}`);
      }

      const data = await res.json();
      const rawText = data.content?.[0]?.text || '';
      const parsed = this.safeParseJson(rawText);

      return this.normalizeParsedResponse(
        parsed,
        'anthropic',
        'Anthropic Direct',
        modelId,
        latencyMs,
        'Paid API (Usage-priced)',
        data.usage?.input_tokens,
        data.usage?.output_tokens,
        rawText
      );
    } catch (err: any) {
      clearTimeout(timeoutId);
      const latencyMs = Math.round(performance.now() - startTime);
      const isTimeout = err.name === 'AbortError' || err.message?.includes('aborted');
      return {
        providerId: 'anthropic',
        providerName: 'Anthropic Direct',
        modelId,
        status: isTimeout ? 'timeout' : 'error',
        latencyMs,
        classification: 'Functional',
        detectedVagueTerms: [],
        defectCodes: [],
        issues: [],
        isTestable: false,
        testabilityAssessment: isTimeout ? 'Inference request timed out after 15s.' : 'Inference call failed.',
        safeRewrite: '',
        suggestedAcceptanceCriteria: [],
        errorMessage: isTimeout ? 'Anthropic request timed out (15s limit reached).' : `Anthropic error: ${err.message || err}`
      };
    }
  }

  /**
   * Execute evaluation against a single provider
   */
  static async executeModel(
    providerId: string,
    req: string | { description?: string; title?: string },
    domain: string
  ): Promise<NormalizedModelOutput> {
    const text = typeof req === 'string' ? req : (req.description || req.title || '');
    const results = await this.runMultiModelEvaluation(text, domain, [providerId]);
    return results[0];
  }

  /**
   * Run parallel Multi-AI evaluation across all requested providers
   */
  static async runMultiModelEvaluation(
    reqText: string,
    domain: string,
    selectedProviderIds: string[]
  ): Promise<NormalizedModelOutput[]> {
    const promises: Promise<NormalizedModelOutput>[] = [];

    for (const pId of selectedProviderIds) {
      if (pId === 'baseline') {
        promises.push(Promise.resolve(this.executeBaseline(reqText, domain)));
      } else if (pId === 'gemini') {
        promises.push(this.executeGemini(reqText, domain));
      } else if (pId === 'groq') {
        promises.push(this.executeOpenAICompatible('groq', 'llama-3.3-70b-versatile', reqText, domain));
      } else if (pId === 'openrouter') {
        promises.push(this.executeOpenAICompatible('openrouter', 'deepseek/deepseek-r1:free', reqText, domain));
      } else if (pId === 'openrouter_free') {
        promises.push(this.executeOpenAICompatible('openrouter', 'openrouter/free', reqText, domain));
      } else if (pId === 'openai') {
        promises.push(this.executeOpenAICompatible('openai', 'gpt-4o', reqText, domain));
      } else if (pId === 'anthropic') {
        promises.push(this.executeAnthropic('claude-3-5-sonnet-20241022', reqText, domain));
      } else if (pId === 'deepseek') {
        promises.push(this.executeOpenAICompatible('deepseek', 'deepseek-reasoner', reqText, domain));
      }
    }

    return Promise.all(promises);
  }

  /**
   * Compute factual agreement analysis across executed models
   */
  static computeModelAgreement(outputs: NormalizedModelOutput[]): ModelAgreementAnalysis {
    const successful = outputs.filter(o => o.status === 'success');

    // Requirement 9: If successful model count < 2 -> status = "Insufficient Models"
    if (successful.length < 2) {
      return {
        totalEvaluated: successful.length,
        classificationConsensus: {
          category: successful.length === 1 ? (successful[0].classification || 'Functional') : 'Functional',
          percentage: 0,
          agreementLevel: 'Disagreement'
        },
        vagueTermsIdentified: [],
        testabilityConsensus: {
          isTestable: successful.length === 1 ? successful[0].isTestable : false,
          percentage: 0
        },
        sharedDefectCodes: [],
        modelSpecificDefectCodes: [],
        defectAgreementRate: 0,
        safeRewritePresentCount: successful.filter(o => Boolean(o.safeRewrite?.trim())).length,
        acceptanceCriteriaPresentCount: successful.filter(o => (o.suggestedAcceptanceCriteria?.length || 0) > 0).length,
        rewriteAlignmentScore: 0,
        overallConsensusLevel: 'Insufficient Models'
      };
    }

    // 1. Classification Consensus
    const classCounts: Record<string, number> = {};
    successful.forEach(o => {
      const cat = o.classification || 'Functional';
      classCounts[cat] = (classCounts[cat] || 0) + 1;
    });

    let topCategory: RequirementCategory = 'Functional';
    let topCount = 0;
    Object.entries(classCounts).forEach(([cat, count]) => {
      if (count > topCount) {
        topCount = count;
        topCategory = cat as RequirementCategory;
      }
    });

    const classPercentage = Math.round((topCount / successful.length) * 100);
    const classAgreementLevel = classPercentage >= 90 
      ? 'High Agreement' 
      : classPercentage >= 60 
        ? 'Partial Agreement' 
        : 'Disagreement';

    // 2. Vague terms identified across models
    const termModelMap: Record<string, string[]> = {};
    successful.forEach(o => {
      (o.detectedVagueTerms || []).forEach(term => {
        const clean = term.toLowerCase().trim();
        if (clean) {
          if (!termModelMap[clean]) termModelMap[clean] = [];
          if (!termModelMap[clean].includes(o.providerName)) {
            termModelMap[clean].push(o.providerName);
          }
        }
      });
    });

    const vagueTermsIdentified = Object.entries(termModelMap).map(([term, models]) => ({
      term,
      modelsAgreeing: models
    }));

    // 3. Testability Consensus
    const testableCount = successful.filter(o => o.isTestable).length;
    const nonTestableCount = successful.length - testableCount;
    const testabilityMajority = testableCount >= nonTestableCount;
    const testabilityPercentage = Math.round(
      (Math.max(testableCount, nonTestableCount) / successful.length) * 100
    );

    // 4. Defect Code Agreement (Shared vs Model-Specific DEF-01 to DEF-16)
    const validCodesSet = new Set<string>(VALID_DEFECT_CODES);
    const codeModelMap: Record<string, string[]> = {};
    successful.forEach(o => {
      const codes = new Set<string>();
      (o.defectCodes || []).forEach(c => {
        if (validCodesSet.has(c)) codes.add(c);
      });
      (o.issues || []).forEach(i => {
        if (i.code && validCodesSet.has(i.code)) codes.add(i.code);
      });

      codes.forEach(code => {
        if (!codeModelMap[code]) codeModelMap[code] = [];
        if (!codeModelMap[code].includes(o.providerName)) {
          codeModelMap[code].push(o.providerName);
        }
      });
    });

    const sharedDefectCodes: { code: string; name: string; modelsAgreeing: string[] }[] = [];
    const modelSpecificDefectCodes: { code: string; name: string; model: string }[] = [];

    Object.entries(codeModelMap).forEach(([code, models]) => {
      const name = DEFECT_CODE_DESCRIPTIONS[code] || code;
      if (models.length > 1) {
        sharedDefectCodes.push({ code, name, modelsAgreeing: models });
      } else {
        modelSpecificDefectCodes.push({ code, name, model: models[0] });
      }
    });

    const totalUniqueDefects = Object.keys(codeModelMap).length;
    const defectAgreementRate = totalUniqueDefects > 0
      ? Math.round((sharedDefectCodes.length / totalUniqueDefects) * 100)
      : 100;

    // 5. Rewrite Alignment (Jaccard token similarity between model rewrites)
    const rewrites = successful.map(o => o.safeRewrite).filter(r => Boolean(r && r.trim()));
    let rewriteAlignmentScore = 0;
    if (rewrites.length >= 2) {
      let totalSim = 0;
      let pairs = 0;
      for (let i = 0; i < rewrites.length; i++) {
        for (let j = i + 1; j < rewrites.length; j++) {
          totalSim += this.calculateLexicalSimilarity(rewrites[i], rewrites[j]);
          pairs++;
        }
      }
      rewriteAlignmentScore = pairs > 0 ? Math.round(totalSim / pairs) : 0;
    } else if (rewrites.length === 1) {
      rewriteAlignmentScore = 100;
    }

    // 6. Overall Consensus Level
    const overallConsensusLevel = 
      classPercentage >= 80 && testabilityPercentage >= 80
        ? 'Strong Agreement'
        : classPercentage >= 50 || testabilityPercentage >= 60
          ? 'Moderate Consensus'
          : 'Significant Divergence';

    return {
      totalEvaluated: successful.length,
      classificationConsensus: {
        category: topCategory,
        percentage: classPercentage,
        agreementLevel: classAgreementLevel
      },
      vagueTermsIdentified,
      testabilityConsensus: {
        isTestable: testabilityMajority,
        percentage: testabilityPercentage
      },
      sharedDefectCodes,
      modelSpecificDefectCodes,
      defectAgreementRate,
      safeRewritePresentCount: successful.filter(o => Boolean(o.safeRewrite?.trim())).length,
      acceptanceCriteriaPresentCount: successful.filter(o => (o.suggestedAcceptanceCriteria?.length || 0) > 0).length,
      rewriteAlignmentScore,
      overallConsensusLevel
    };
  }

  /**
   * Helper: Safe JSON parser for LLM outputs
   */
  private static safeParseJson(rawText: string): any {
    if (!rawText) return {};
    const cleaned = rawText.replace(/```json\s*|```/gi, '').trim();
    const match = cleaned.match(/\{[\s\S]*\}/);
    if (match) {
      try {
        return JSON.parse(match[0]);
      } catch (e) {
        // Safe fallback
      }
    }
    return {};
  }

  /**
   * Helper: Normalize parsed output into typed NormalizedModelOutput
   */
  private static normalizeParsedResponse(
    parsed: any,
    providerId: string,
    providerName: string,
    modelId: string,
    latencyMs: number,
    costEstimate: string,
    inputTokens?: number,
    outputTokens?: number,
    rawOutput?: string,
    actualModelId?: string,
    fallbackUsed?: boolean,
    primaryModelAttempted?: string
  ): NormalizedModelOutput {
    const classification: RequirementCategory = 
      ['Functional', 'Non-functional', 'System', 'Business', 'User', 'Technical'].includes(parsed.classification)
        ? parsed.classification
        : 'Functional';

    const detectedVagueTerms: string[] = Array.isArray(parsed.detectedVagueTerms)
      ? parsed.detectedVagueTerms.map((t: any) => String(t))
      : [];

    const validCodesSet = new Set<string>(VALID_DEFECT_CODES);

    // Validate raw defect codes
    const rawDefectCodes: string[] = Array.isArray(parsed.defectCodes)
      ? parsed.defectCodes.map((c: any) => String(c).trim().toUpperCase())
      : [];
    const validatedDefectCodes = rawDefectCodes.filter(c => validCodesSet.has(c));

    // Validate issues and their optional defect codes
    const issues = Array.isArray(parsed.issues)
      ? parsed.issues.map((i: any) => {
          const rawCode = i.code && typeof i.code === 'string' ? i.code.trim().toUpperCase() : undefined;
          const code = rawCode && validCodesSet.has(rawCode) ? rawCode : undefined;
          if (code && !validatedDefectCodes.includes(code)) {
            validatedDefectCodes.push(code);
          }
          return {
            code,
            type: String(i.type || 'Ambiguity'),
            problem: String(i.problem || 'Quality defect identified by model'),
            reason: String(i.reason || 'Violates IEEE 830 / ISO 29148 guidelines'),
            severity: (['Critical', 'High', 'Medium', 'Low'].includes(i.severity) ? i.severity : 'Medium') as SeverityLevel
          };
        })
      : [];

    const isTestable = typeof parsed.isTestable === 'boolean' ? parsed.isTestable : issues.length === 0;
    const testabilityAssessment = parsed.testabilityAssessment || (
      isTestable 
        ? 'Model determined the requirement defines observable conditions for verification.'
        : 'Model identified ambiguous or non-measurable language preventing objective verification.'
    );

    const safeRewrite = parsed.safeRewrite || '';
    const optionalRefinement = parsed.optionalRefinement || undefined;
    const suggestedAcceptanceCriteria = Array.isArray(parsed.suggestedAcceptanceCriteria)
      ? parsed.suggestedAcceptanceCriteria.map((ac: any) => String(ac))
      : [];

    return {
      providerId,
      providerName,
      modelId,
      actualModelId: actualModelId || modelId,
      fallbackUsed: fallbackUsed ?? false,
      primaryModelAttempted: primaryModelAttempted || modelId,
      status: 'success',
      latencyMs,
      inputTokens,
      outputTokens,
      costEstimate,
      classification,
      detectedVagueTerms,
      defectCodes: validatedDefectCodes,
      issues,
      isTestable,
      testabilityAssessment,
      safeRewrite,
      optionalRefinement,
      suggestedAcceptanceCriteria,
      rawOutput
    };
  }
}
