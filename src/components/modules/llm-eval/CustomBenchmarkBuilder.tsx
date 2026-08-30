import React, { useState } from 'react';
import { GroundTruthBenchmark } from '../../../types/llmEvaluation';
import { Sparkles, Plus, Trash2, CheckCircle2, FileText } from 'lucide-react';

interface CustomBenchmarkBuilderProps {
  onSaveCustomBenchmark: (benchmark: GroundTruthBenchmark) => void;
  onClose: () => void;
}

export const CustomBenchmarkBuilder: React.FC<CustomBenchmarkBuilderProps> = ({
  onSaveCustomBenchmark,
  onClose
}) => {
  const [domainName, setDomainName] = useState('');
  const [description, setDescription] = useState('');
  const [rawText, setRawText] = useState('');
  const [ambiguities, setAmbiguities] = useState<{ phrase: string; targetReqId: string; clarification: string }[]>([
    { phrase: 'respond quickly under load', targetReqId: 'REQ-01', clarification: 'Specify response latency < 2.0s under 10,000 requests.' }
  ]);
  const [conflicts, setConflicts] = useState<{ reqAId: string; reqBId: string; reason: string; resolution: string; severity: 'High' | 'Medium' }[]>([
    { reqAId: 'REQ-01', reqBId: 'REQ-03', reason: 'Real-time telemetry sync conflicts with offline battery conservation policy.', resolution: 'Implement adaptive heartbeat polling based on battery level.', severity: 'High' }
  ]);

  const handleAddAmbiguity = () => {
    setAmbiguities([...ambiguities, { phrase: '', targetReqId: `REQ-0${ambiguities.length + 1}`, clarification: '' }]);
  };

  const handleAddConflict = () => {
    setConflicts([...conflicts, { reqAId: 'REQ-01', reqBId: 'REQ-02', reason: '', resolution: '', severity: 'Medium' }]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!domainName.trim() || !rawText.trim()) return;

    const customBenchmark: GroundTruthBenchmark = {
      domain: domainName.trim(),
      domainName: `${domainName.trim()} Custom Benchmark`,
      description: description.trim() || 'User-defined custom ground-truth benchmark suite.',
      rawInputDocument: rawText.trim(),
      expectedRequirements: [
        {
          id: 'REQ-01',
          title: 'Core System Functionality',
          description: rawText.slice(0, 150) + '...',
          category: 'Functional'
        },
        {
          id: 'REQ-02',
          title: 'Non-functional Performance & Security SLA',
          description: 'The system shall maintain 99.9% uptime with TLS 1.3 encryption.',
          category: 'Non-functional'
        }
      ],
      knownAmbiguities: ambiguities.filter(a => a.phrase.trim().length > 0),
      knownMissingRequirements: [
        { title: 'Audit Trail & Event Logging', category: 'System', justification: 'Mandatory for security auditing.' }
      ],
      knownConflicts: conflicts.filter(c => c.reason.trim().length > 0),
      expectedTestTypes: ['Unit Test', 'Integration Test', 'Stress Test']
    };

    onSaveCustomBenchmark(customBenchmark);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="glass-card w-full max-w-3xl rounded-2xl border border-white/20 shadow-2xl p-6 space-y-6 max-h-[90vh] overflow-y-auto font-mono text-xs">
        
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-xl bg-violet-500/20 border border-violet-400/40 flex items-center justify-center text-violet-300 shadow-neon-violet">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Custom Ground-Truth Benchmark Creator</h3>
              <p className="text-xs text-slate-400 font-light font-sans">Define your own ground-truth specification dataset to evaluate LLM models.</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white cursor-pointer">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[11px] font-bold text-slate-300 block mb-1">Domain / Project Name *</label>
              <input
                type="text"
                placeholder="e.g. Smart Drone Logistics System"
                value={domainName}
                onChange={(e) => setDomainName(e.target.value)}
                required
                className="w-full bg-surface border border-white/10 rounded-xl px-3.5 py-2 text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-300 block mb-1">Short Description</label>
              <input
                type="text"
                placeholder="e.g. Autonomous fleet routing & battery telemetry"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-surface border border-white/10 rounded-xl px-3.5 py-2 text-white focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-300 block mb-1">Raw Requirements Specification Text *</label>
            <textarea
              rows={5}
              placeholder="Paste the unstructured stakeholder requirement narrative or specification document here..."
              value={rawText}
              onChange={(e) => setRawText(e.target.value)}
              required
              className="w-full bg-surface border border-white/10 rounded-xl p-3.5 text-white font-sans text-xs focus:outline-none leading-relaxed"
            />
          </div>

          {/* Known Ambiguities */}
          <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-cyan-300">Known Ambiguous Phrases for Ground-Truth Scoring</span>
              <button
                type="button"
                onClick={handleAddAmbiguity}
                className="text-cyan-400 hover:text-cyan-300 text-[11px] flex items-center gap-1 cursor-pointer"
              >
                <Plus className="h-3.5 w-3.5" /> Add Phrase
              </button>
            </div>

            {ambiguities.map((amb, i) => (
              <div key={i} className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Subjective Phrase (e.g. fast, robust)"
                  value={amb.phrase}
                  onChange={(e) => {
                    const next = [...ambiguities];
                    next[i].phrase = e.target.value;
                    setAmbiguities(next);
                  }}
                  className="bg-surface border border-white/10 rounded-lg px-2.5 py-1 text-slate-200"
                />
                <input
                  type="text"
                  placeholder="Measurable IEEE Clarification"
                  value={amb.clarification}
                  onChange={(e) => {
                    const next = [...ambiguities];
                    next[i].clarification = e.target.value;
                    setAmbiguities(next);
                  }}
                  className="bg-surface border border-white/10 rounded-lg px-2.5 py-1 text-slate-200"
                />
              </div>
            ))}
          </div>

          {/* Known Conflicts */}
          <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-violet-300">Known Inconsistencies &amp; Contradictions</span>
              <button
                type="button"
                onClick={handleAddConflict}
                className="text-violet-400 hover:text-violet-300 text-[11px] flex items-center gap-1 cursor-pointer"
              >
                <Plus className="h-3.5 w-3.5" /> Add Conflict
              </button>
            </div>

            {conflicts.map((conf, i) => (
              <div key={i} className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Conflict Reason / Contradiction"
                  value={conf.reason}
                  onChange={(e) => {
                    const next = [...conflicts];
                    next[i].reason = e.target.value;
                    setConflicts(next);
                  }}
                  className="bg-surface border border-white/10 rounded-lg px-2.5 py-1 text-slate-200"
                />
                <input
                  type="text"
                  placeholder="Suggested Architectural Resolution"
                  value={conf.resolution}
                  onChange={(e) => {
                    const next = [...conflicts];
                    next[i].resolution = e.target.value;
                    setConflicts(next);
                  }}
                  className="bg-surface border border-white/10 rounded-lg px-2.5 py-1 text-slate-200"
                />
              </div>
            ))}
          </div>

          <div className="flex items-center justify-end space-x-3 pt-3 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-slate-400 hover:text-white cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white font-bold shadow-neon-violet transition cursor-pointer"
            >
              Save &amp; Select Benchmark
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
