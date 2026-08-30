import React, { useState } from 'react';
import { LLMModelConfig, LLMProvider } from '../../../types/llmEvaluation';
import { X, Plus, Key, ShieldCheck, Cpu, Trash2, CheckCircle2 } from 'lucide-react';

interface ModelConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  models: LLMModelConfig[];
  onSaveModels: (models: LLMModelConfig[]) => void;
}

export const ModelConfigModal: React.FC<ModelConfigModalProps> = ({
  isOpen,
  onClose,
  models,
  onSaveModels
}) => {
  const [modelList, setModelList] = useState<LLMModelConfig[]>(models);
  const [showAddForm, setShowAddForm] = useState(false);

  // New model form state
  const [newName, setNewName] = useState('');
  const [newProvider, setNewProvider] = useState<LLMProvider>('OpenAI');
  const [newModelId, setNewModelId] = useState('');
  const [newApiKey, setNewApiKey] = useState('');

  if (!isOpen) return null;

  const handleToggleStatus = (id: string) => {
    const updated = modelList.map(m => {
      if (m.id === id) {
        const nextStatus = m.apiStatus === 'Connected' ? 'Demo / Mock Evaluation Mode' : 'Connected';
        return { ...m, apiStatus: nextStatus as any };
      }
      return m;
    });
    setModelList(updated);
  };

  const handleUpdateApiKey = (id: string, key: string) => {
    const updated = modelList.map(m => {
      if (m.id === id) {
        return {
          ...m,
          apiKey: key,
          apiStatus: (key.trim().length > 5 ? 'Connected' : 'Demo / Mock Evaluation Mode') as any
        };
      }
      return m;
    });
    setModelList(updated);
  };

  const handleDeleteModel = (id: string) => {
    setModelList(modelList.filter(m => m.id !== id));
  };

  const handleAddNewModel = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newModelId.trim()) return;

    const newModel: LLMModelConfig = {
      id: `custom-${Date.now().toString(36)}`,
      name: newName.trim(),
      provider: newProvider,
      modelId: newModelId.trim(),
      apiKey: newApiKey.trim() || undefined,
      apiStatus: (newApiKey.trim().length > 5 ? 'Connected' : 'Demo / Mock Evaluation Mode') as any,
      contextWindow: 128,
      costPer1kPrompt: 0.002,
      costPer1kCompletion: 0.006,
      speedRating: 'Fast',
      color: '#F59E0B',
      borderColor: 'border-amber-500/40',
      glowColor: 'shadow-neon-yellow',
      isCustom: true
    };

    setModelList([...modelList, newModel]);
    setNewName('');
    setNewModelId('');
    setNewApiKey('');
    setShowAddForm(false);
  };

  const handleSaveAndClose = () => {
    onSaveModels(modelList);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="glass-card w-full max-w-2xl rounded-2xl border border-white/20 shadow-2xl p-6 space-y-6 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 shadow-neon-cyan">
              <Cpu className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white font-mono">LLM Model Configuration Hub</h3>
              <p className="text-xs text-slate-400 font-light">Configure API keys, toggle Live / Demo mode, or add custom models.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Security Notice */}
        <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-start gap-2.5 text-xs font-mono text-slate-300">
          <ShieldCheck className="h-4 w-4 text-cyan-400 flex-shrink-0 mt-0.5" />
          <p>
            API keys are saved locally in your browser's private storage (localStorage) and never uploaded to public servers. When no API key is provided, the system seamlessly runs in <strong>Demo / Mock Evaluation Mode</strong>.
          </p>
        </div>

        {/* Configured Models List */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-slate-300 font-mono uppercase tracking-wider">
              Active Models ({modelList.length})
            </h4>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-bold cursor-pointer"
            >
              <Plus className="h-3.5 w-3.5" /> {showAddForm ? 'Cancel' : 'Add Custom Model'}
            </button>
          </div>

          {/* Add Custom Model Form */}
          {showAddForm && (
            <form onSubmit={handleAddNewModel} className="p-4 rounded-xl bg-black/60 border border-cyan-500/30 space-y-3 font-mono text-xs">
              <span className="font-bold text-cyan-300 block">Register Custom Model / Endpoint</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">Display Name</label>
                  <input
                    type="text"
                    placeholder="e.g. DeepSeek-V3 or Mistral Large"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    required
                    className="w-full bg-surface border border-white/10 rounded-lg px-3 py-1.5 text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">Provider</label>
                  <select
                    value={newProvider}
                    onChange={(e) => setNewProvider(e.target.value as LLMProvider)}
                    className="w-full bg-surface border border-white/10 rounded-lg px-3 py-1.5 text-white focus:outline-none cursor-pointer"
                  >
                    <option value="OpenAI">OpenAI Compatible</option>
                    <option value="Google">Google Gemini</option>
                    <option value="Anthropic">Anthropic</option>
                    <option value="Meta">Meta / Ollama</option>
                    <option value="Mistral">Mistral AI</option>
                    <option value="Custom">Custom Provider</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">Model Identifier (API ID)</label>
                  <input
                    type="text"
                    placeholder="e.g. deepseek-chat or mistral-large-latest"
                    value={newModelId}
                    onChange={(e) => setNewModelId(e.target.value)}
                    required
                    className="w-full bg-surface border border-white/10 rounded-lg px-3 py-1.5 text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">API Key (Optional)</label>
                  <input
                    type="password"
                    placeholder="Optional API Key"
                    value={newApiKey}
                    onChange={(e) => setNewApiKey(e.target.value)}
                    className="w-full bg-surface border border-white/10 rounded-lg px-3 py-1.5 text-white focus:outline-none"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-neon-cyan transition cursor-pointer"
              >
                Save Custom Model
              </button>
            </form>
          )}

          {/* Model Cards */}
          <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
            {modelList.map(model => (
              <div
                key={model.id}
                className="p-3.5 rounded-xl bg-black/40 border border-white/10 space-y-2 font-mono text-xs"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: model.color }} />
                    <span className="font-bold text-white text-sm">{model.name}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-white/10 text-slate-400">{model.provider}</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleToggleStatus(model.id)}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition cursor-pointer ${
                        model.apiStatus === 'Connected'
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                          : 'bg-amber-500/10 text-amber-300 border-amber-400/30'
                      }`}
                    >
                      {model.apiStatus}
                    </button>
                    {model.isCustom && (
                      <button
                        onClick={() => handleDeleteModel(model.id)}
                        className="p-1 rounded text-red-400 hover:bg-red-500/10 cursor-pointer"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* API Key Input */}
                <div className="flex items-center space-x-2 pt-1">
                  <Key className="h-3.5 w-3.5 text-slate-500" />
                  <input
                    type="password"
                    placeholder={`Enter ${model.provider} API key or leave blank for Demo Mode`}
                    value={model.apiKey || ''}
                    onChange={(e) => handleUpdateApiKey(model.id, e.target.value)}
                    className="flex-1 bg-surface border border-white/5 rounded-lg px-2.5 py-1 text-[11px] text-slate-200 focus:outline-none"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end space-x-3 pt-4 border-t border-white/10">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-slate-400 hover:text-white font-mono text-xs cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveAndClose}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold font-mono text-xs shadow-neon-blue transition cursor-pointer"
          >
            Save Configurations
          </button>
        </div>
      </div>
    </div>
  );
};
