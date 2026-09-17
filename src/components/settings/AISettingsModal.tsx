import React, { useState } from 'react';
import { 
  X, 
  KeyRound, 
  CheckCircle2, 
  AlertTriangle, 
  ExternalLink, 
  Eye, 
  EyeOff, 
  Sparkles, 
  Cpu, 
  ShieldCheck, 
  Zap, 
  RefreshCw 
} from 'lucide-react';
import { useProject } from '../../context/ProjectContext';
import { AIConfigManager, AI_PROVIDERS, AIProviderId } from '../../services/aiConfig';
import { RealAIService } from '../../services/realAIService';

export const AISettingsModal: React.FC = () => {
  const { isAISettingsOpen, setIsAISettingsOpen } = useProject();

  const [activeProvider, setActiveProvider] = useState<AIProviderId>(AIConfigManager.getActiveProvider());
  const [keys, setKeys] = useState<Record<AIProviderId, string>>({
    openrouter: AIConfigManager.getApiKey('openrouter'),
    openai: AIConfigManager.getApiKey('openai'),
    anthropic: AIConfigManager.getApiKey('anthropic'),
    gemini: AIConfigManager.getApiKey('gemini'),
    deepseek: AIConfigManager.getApiKey('deepseek'),
    groq: AIConfigManager.getApiKey('groq')
  });

  const [showKey, setShowKey] = useState<boolean>(false);
  const [testStatus, setTestStatus] = useState<{ testing: boolean; success?: boolean; message?: string }>({ testing: false });
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  if (!isAISettingsOpen) return null;

  const currentConfig = AI_PROVIDERS[activeProvider];
  const activeModel = AIConfigManager.getActiveModel(activeProvider);

  const handleKeyChange = (val: string) => {
    setKeys(prev => ({ ...prev, [activeProvider]: val }));
    setSavedSuccess(false);
    setTestStatus({ testing: false });
  };

  const handleSave = () => {
    AIConfigManager.setApiKey(activeProvider, keys[activeProvider]);
    AIConfigManager.setActiveProvider(activeProvider);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleTest = async () => {
    setTestStatus({ testing: true });
    const res = await RealAIService.testConnection(activeProvider, keys[activeProvider], activeModel);
    setTestStatus({ testing: false, success: res.success, message: res.message });
  };

  const handleSelectModel = (modelId: string) => {
    AIConfigManager.setActiveModel(activeProvider, modelId);
    // Force re-render
    setKeys({ ...keys });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl bg-[#0C0C14] border border-violet-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-violet-950/80 relative overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow ambient */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-start justify-between pb-5 border-b border-white/10 relative z-10">
          <div>
            <div className="flex items-center space-x-2 text-cyan-400 text-xs font-bold font-mono mb-1">
              <Sparkles className="h-4 w-4" />
              <span>LIVE AI ENGINE CONFIGURATION</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white font-mono tracking-tight flex items-center gap-2">
              <KeyRound className="h-6 w-6 text-violet-400" />
              <span>Connect Real AI Models</span>
            </h2>
            <p className="text-xs text-slate-300 mt-1">
              Connect official AI model APIs to power requirements analysis, IEEE rewrites, and full-spectrum downstream tasks.
            </p>
          </div>
          <button
            onClick={() => setIsAISettingsOpen(false)}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="py-6 space-y-6 overflow-y-auto pr-1">
          {/* Provider Selection Tabs */}
          <div>
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono block mb-2">
              Select AI Provider:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {(Object.keys(AI_PROVIDERS) as AIProviderId[]).map((pId) => {
                const prov = AI_PROVIDERS[pId];
                const isSelected = activeProvider === pId;
                const hasKey = Boolean(keys[pId] && keys[pId].trim());

                return (
                  <button
                    key={pId}
                    onClick={() => {
                      setActiveProvider(pId);
                      setTestStatus({ testing: false });
                    }}
                    className={`p-3 rounded-2xl border text-left transition flex flex-col justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-violet-950/50 border-violet-400 text-white shadow-neon-violet'
                        : 'bg-surface/60 hover:bg-surface border-white/10 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-1">
                      <span className="text-xs font-bold truncate">{prov.name.split(' ')[0]}</span>
                      {hasKey ? (
                        <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-neon-emerald" title="Key Saved" />
                      ) : (
                        <span className="h-2 w-2 rounded-full bg-slate-600" title="No Key" />
                      )}
                    </div>
                    <span className="text-[10px] text-slate-400 truncate">
                      {hasKey ? 'Configured' : 'Offline Engine'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Provider Config Box */}
          <div className="p-5 rounded-2xl bg-surface/80 border border-white/10 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Cpu className="h-4 w-4 text-cyan-400" />
                  <span>{currentConfig.name}</span>
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">{currentConfig.description}</p>
              </div>
              <a
                href={currentConfig.docsUrl}
                target="_blank"
                rel="noreferrer"
                className="text-[11px] text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-mono hover:underline shrink-0"
              >
                <span>Get Key</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>

            {/* Model Selector */}
            <div>
              <label className="text-[11px] font-bold text-slate-300 font-mono block mb-1.5">
                Default Model for {currentConfig.name}:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {currentConfig.models.map((m) => {
                  const isModelActive = activeModel === m.id;
                  return (
                    <button
                      key={m.id}
                      onClick={() => handleSelectModel(m.id)}
                      className={`px-3 py-2 rounded-xl text-left border text-xs font-mono transition flex items-center justify-between cursor-pointer ${
                        isModelActive
                          ? 'bg-cyan-950/40 border-cyan-400/80 text-cyan-200'
                          : 'bg-black/40 border-white/5 text-slate-400 hover:text-white'
                      }`}
                    >
                      <span className="truncate">{m.name}</span>
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/10 text-slate-300 shrink-0">{m.tag}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* API Key Input */}
            <div>
              <label className="text-[11px] font-bold text-slate-300 font-mono block mb-1.5">
                API Key:
              </label>
              <div className="relative">
                <input
                  type={showKey ? 'text' : 'password'}
                  value={keys[activeProvider] || ''}
                  onChange={(e) => handleKeyChange(e.target.value)}
                  placeholder={currentConfig.keyPlaceholder}
                  className="w-full bg-[#080810] border border-white/10 focus:border-violet-500 rounded-xl px-4 py-2.5 pr-20 text-xs text-white font-mono placeholder-slate-600 focus:outline-none transition shadow-inner"
                />
                <div className="absolute right-2 top-2 flex items-center space-x-1">
                  <button
                    type="button"
                    onClick={() => setShowKey(!showKey)}
                    className="p-1.5 text-slate-400 hover:text-white transition"
                    title={showKey ? 'Hide key' : 'Show key'}
                  >
                    {showKey ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                  </button>
                </div>
              </div>
              <p className="text-[10px] text-slate-400 mt-1 flex items-center gap-1 font-mono">
                <ShieldCheck className="h-3 w-3 text-emerald-400" />
                Keys are stored only in your local browser and sent directly to official endpoints.
              </p>
            </div>

            {/* Test Results Banner */}
            {testStatus.message && (
              <div
                className={`p-3 rounded-xl text-xs font-mono flex items-start space-x-2 ${
                  testStatus.success
                    ? 'bg-emerald-500/15 border border-emerald-500/40 text-emerald-300'
                    : 'bg-red-500/15 border border-red-500/40 text-red-300'
                }`}
              >
                {testStatus.success ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <AlertTriangle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                )}
                <span>{testStatus.message}</span>
              </div>
            )}

            {/* Saved Notification */}
            {savedSuccess && (
              <div className="p-3 rounded-xl bg-violet-500/20 border border-violet-500/40 text-violet-200 text-xs font-mono flex items-center space-x-2 animate-in fade-in">
                <CheckCircle2 className="h-4 w-4 text-violet-400" />
                <span>API Key saved successfully! Real AI models are now active.</span>
              </div>
            )}
          </div>

          {/* Free vs Paid Guidance */}
          <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-500/20 space-y-3 text-xs text-slate-300">
            <div className="flex items-center space-x-2 text-cyan-400 font-bold font-mono">
              <Zap className="h-4 w-4 shrink-0" />
              <span>Which AI APIs are 100% FREE? (No Credit Card Needed)</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
              <div className="p-3 rounded-xl bg-black/40 border border-emerald-500/30 space-y-1.5">
                <span className="text-emerald-400 font-bold block">🌟 Google Gemini — Flash Models FREE</span>
                <p className="text-slate-300 leading-relaxed">
                  Get a free key from{' '}
                  <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" className="text-cyan-400 underline font-bold">
                    aistudio.google.com
                  </a>{' '}
                  — no credit card. <strong className="text-emerald-300">Gemini 2.0 Flash & 1.5 Flash are free</strong>. Pro models need billing. Rate limits are per-project (check your AI Studio dashboard).
                </p>
                <div className="mt-1 px-2 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 font-mono text-[9px]">
                  ✓ Recommended: Gemini 2.0 Flash (free tier)
                </div>
              </div>
              <div className="p-3 rounded-xl bg-black/40 border border-cyan-500/30 space-y-1.5">
                <span className="text-cyan-400 font-bold block">⚡ Groq Cloud — Fast LLMs FREE</span>
                <p className="text-slate-300 leading-relaxed">
                  Get a free key from{' '}
                  <a href="https://console.groq.com/keys" target="_blank" rel="noreferrer" className="text-cyan-400 underline font-bold">
                    console.groq.com
                  </a>{' '}
                  — no credit card. <strong className="text-cyan-300">Llama 4 Scout, Llama 3.3 70B, Llama 3.1 8B Instant & Qwen3 32B</strong> all free. ~30 req/min on free tier.
                </p>
                <div className="mt-1 px-2 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 font-mono text-[9px]">
                  ✓ Recommended: Llama 3.3 70B Versatile (free)
                </div>
              </div>
            </div>
            <div className="text-[10px] text-slate-400 font-mono space-y-1 pt-1 border-t border-white/10">
              <p>• <strong className="text-violet-300">OpenRouter</strong>: offers free models like <code className="bg-white/10 px-1 rounded">deepseek-r1:free</code> and <code className="bg-white/10 px-1 rounded">gemini-2.0-flash-exp:free</code>.</p>
              <p>• <strong className="text-amber-300">OpenAI / Anthropic / DeepSeek</strong>: paid APIs — require billing account setup.</p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between relative z-10">
          <button
            type="button"
            onClick={handleTest}
            disabled={testStatus.testing || !keys[activeProvider]}
            className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 text-xs font-mono font-bold transition flex items-center space-x-1.5 cursor-pointer disabled:opacity-40"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${testStatus.testing ? 'animate-spin text-cyan-400' : ''}`} />
            <span>{testStatus.testing ? 'Testing...' : 'Test Connection'}</span>
          </button>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsAISettingsOpen(false)}
              className="px-4 py-2.5 rounded-xl text-xs font-mono text-slate-400 hover:text-white transition cursor-pointer"
            >
              Done
            </button>
            <button
              onClick={handleSave}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-500 hover:opacity-90 text-white font-bold text-xs font-mono shadow-neon-violet transition cursor-pointer"
            >
              Save Key &amp; Activate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
