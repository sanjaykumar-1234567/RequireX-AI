/**
 * AI Service Configuration & Provider Management
 * Supports direct API integrations for OpenAI, Anthropic, Google Gemini, DeepSeek, Groq, and OpenRouter.
 * Securely stores user API keys in localStorage with fallback to Vite environment variables.
 */

export type AIProviderId = 'openrouter' | 'openai' | 'anthropic' | 'gemini' | 'deepseek' | 'groq';

export interface AIProviderConfig {
  id: AIProviderId;
  name: string;
  description: string;
  models: { id: string; name: string; tag: string }[];
  defaultModel: string;
  keyPlaceholder: string;
  baseUrl: string;
  docsUrl: string;
}

export const AI_PROVIDERS: Record<AIProviderId, AIProviderConfig> = {
  gemini: {
    id: 'gemini',
    name: 'Google Gemini (FREE)',
    description: 'Free official API via Google AI Studio. Flash-series models (2.0 Flash, 1.5 Flash) available FREE — no credit card needed. Pro models require billing. Rate limits vary by project; check AI Studio dashboard for your quota.',
    models: [
      { id: 'gemini-3.6-flash', name: 'Gemini 3.6 Flash', tag: 'Free — Recommended' },
      { id: 'gemini-2.0-flash', name: 'Gemini 2.0 Flash', tag: 'Free — Best Speed' },
      { id: 'gemini-1.5-flash', name: 'Gemini 1.5 Flash', tag: 'Free — Ultra Fast' },
      { id: 'gemini-1.5-flash-latest', name: 'Gemini 1.5 Flash Latest', tag: 'Free Tier' },
      { id: 'gemini-1.5-pro', name: 'Gemini 1.5 Pro', tag: 'Limited Free / Paid' }
    ],
    defaultModel: 'gemini-3.6-flash',
    keyPlaceholder: 'AIzaSy...',
    baseUrl: 'https://generativelanguage.googleapis.com/v1beta',
    docsUrl: 'https://aistudio.google.com/app/apikey'
  },
  groq: {
    id: 'groq',
    name: 'Groq Cloud (FREE)',
    description: 'Ultra-fast LLM inference — free developer tier with NO credit card required. Includes Llama 4 Scout, Llama 3.3 70B Versatile, Llama 3.1 8B Instant, and Qwen3 32B. Check console.groq.com for your per-org rate limits.',
    models: [
      { id: 'meta-llama/llama-4-scout-17b-16e-instruct', name: 'Llama 4 Scout 17B', tag: 'Free — Latest' },
      { id: 'llama-3.3-70b-versatile', name: 'Llama 3.3 70B Versatile', tag: 'Free — Best Quality' },
      { id: 'llama-3.1-8b-instant', name: 'Llama 3.1 8B Instant', tag: 'Free — Ultra Fast' },
      { id: 'qwen/qwen3-32b', name: 'Qwen3 32B', tag: 'Free — Reasoning' }
    ],
    defaultModel: 'llama-3.3-70b-versatile',
    keyPlaceholder: 'gsk_...',
    baseUrl: 'https://api.groq.com/openai/v1',
    docsUrl: 'https://console.groq.com/keys'
  },
  openrouter: {
    id: 'openrouter',
    name: 'OpenRouter (Free & Paid)',
    description: 'Unified gateway for GPT-4o, Claude 3.5, Gemini, and DeepSeek. Includes 100% FREE models alongside paid flagship models.',
    models: [
      { id: 'deepseek/deepseek-r1:free', name: 'DeepSeek R1 (Free Tier)', tag: '100% Free' },
      { id: 'meta-llama/llama-3.1-8b-instruct:free', name: 'Llama 3.1 8B (Free Tier)', tag: '100% Free' },
      { id: 'google/gemini-2.0-flash-exp:free', name: 'Gemini 2.0 Flash (Free Tier)', tag: '100% Free' },
      { id: 'openai/gpt-4o', name: 'GPT-4o (OpenAI)', tag: 'Paid Flagship' },
      { id: 'anthropic/claude-3.5-sonnet', name: 'Claude 3.5 Sonnet', tag: 'Paid Flagship' },
      { id: 'deepseek/deepseek-r1', name: 'DeepSeek R1 (Paid Priority)', tag: 'High Speed' }
    ],
    defaultModel: 'deepseek/deepseek-r1:free',
    keyPlaceholder: 'sk-or-v1-...',
    baseUrl: 'https://openrouter.ai/api/v1',
    docsUrl: 'https://openrouter.ai/keys'
  },
  openai: {
    id: 'openai',
    name: 'OpenAI Direct',
    description: 'Direct official API for GPT-4o and GPT-4o-mini (Pay-as-you-go).',
    models: [
      { id: 'gpt-4o', name: 'GPT-4o', tag: 'Flagship' },
      { id: 'gpt-4o-mini', name: 'GPT-4o Mini', tag: 'Ultra Low Cost' }
    ],
    defaultModel: 'gpt-4o',
    keyPlaceholder: 'sk-proj-...',
    baseUrl: 'https://api.openai.com/v1',
    docsUrl: 'https://platform.openai.com/api-keys'
  },
  anthropic: {
    id: 'anthropic',
    name: 'Anthropic Direct',
    description: 'Direct official API for Claude 3.5 Sonnet (Pay-as-you-go).',
    models: [
      { id: 'claude-3-5-sonnet-20241022', name: 'Claude 3.5 Sonnet', tag: 'Gold Standard' },
      { id: 'claude-3-haiku-20240307', name: 'Claude 3 Haiku', tag: 'Fast' }
    ],
    defaultModel: 'claude-3-5-sonnet-20241022',
    keyPlaceholder: 'sk-ant-api03-...',
    baseUrl: 'https://api.anthropic.com/v1',
    docsUrl: 'https://console.anthropic.com/settings/keys'
  },
  deepseek: {
    id: 'deepseek',
    name: 'DeepSeek Direct',
    description: 'Direct access to DeepSeek R1 reasoning model and DeepSeek-V3 chat model.',
    models: [
      { id: 'deepseek-reasoner', name: 'DeepSeek R1 (Reasoner)', tag: 'Math & Logic' },
      { id: 'deepseek-chat', name: 'DeepSeek V3 (Chat)', tag: 'High Speed' }
    ],
    defaultModel: 'deepseek-reasoner',
    keyPlaceholder: 'sk-...',
    baseUrl: 'https://api.deepseek.com/v1',
    docsUrl: 'https://platform.deepseek.com/api_keys'
  }
};

const STORAGE_KEYS: Record<AIProviderId, string> = {
  openrouter: 'requirex_api_key_openrouter',
  openai: 'requirex_api_key_openai',
  anthropic: 'requirex_api_key_anthropic',
  gemini: 'requirex_api_key_gemini',
  deepseek: 'requirex_api_key_deepseek',
  groq: 'requirex_api_key_groq'
};

export class AIConfigManager {
  /**
   * Retrieve stored API key for a provider (checking localStorage then Vite env)
   */
  static getApiKey(provider: AIProviderId): string {
    const local = localStorage.getItem(STORAGE_KEYS[provider]);
    if (local && local.trim()) return local.trim();

    // Check Vite environment variables
    const envMap: Record<AIProviderId, string | undefined> = {
      openrouter: import.meta.env.VITE_OPENROUTER_API_KEY,
      openai: import.meta.env.VITE_OPENAI_API_KEY,
      anthropic: import.meta.env.VITE_ANTHROPIC_API_KEY,
      gemini: import.meta.env.VITE_GEMINI_API_KEY,
      deepseek: import.meta.env.VITE_DEEPSEEK_API_KEY,
      groq: import.meta.env.VITE_GROQ_API_KEY
    };

    return envMap[provider] || '';
  }

  /**
   * Save API key for a provider to browser local storage
   */
  static setApiKey(provider: AIProviderId, key: string): void {
    if (!key || !key.trim()) {
      localStorage.removeItem(STORAGE_KEYS[provider]);
    } else {
      localStorage.setItem(STORAGE_KEYS[provider], key.trim());
    }
  }

  /**
   * Get active provider preference
   */
  static getActiveProvider(): AIProviderId {
    const active = localStorage.getItem('requirex_active_provider') as AIProviderId;
    if (active && AI_PROVIDERS[active]) return active;

    // Detect first provider with a configured key
    const providers: AIProviderId[] = ['gemini', 'groq', 'openrouter', 'openai', 'anthropic', 'deepseek'];
    for (const p of providers) {
      if (this.getApiKey(p)) return p;
    }

    return 'gemini';
  }

  /**
   * Set active provider preference
   */
  static setActiveProvider(provider: AIProviderId): void {
    localStorage.setItem('requirex_active_provider', provider);
  }

  /**
   * Check if ANY real AI API key is configured
   */
  static hasAnyApiKey(): boolean {
    const providers: AIProviderId[] = ['openrouter', 'openai', 'gemini', 'anthropic', 'deepseek', 'groq'];
    return providers.some(p => Boolean(this.getApiKey(p)));
  }

  /**
   * Get active model ID for a provider
   */
  static getActiveModel(provider: AIProviderId): string {
    const custom = localStorage.getItem(`requirex_model_${provider}`);
    if (custom) return custom;
    return AI_PROVIDERS[provider].defaultModel;
  }

  /**
   * Set active model ID for a provider
   */
  static setActiveModel(provider: AIProviderId, modelId: string): void {
    localStorage.setItem(`requirex_model_${provider}`, modelId);
  }
}
