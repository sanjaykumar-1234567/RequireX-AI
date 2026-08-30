import React, { useState } from 'react';
import { 
  TrendingUp, 
  History, 
  Sparkles, 
  CheckCircle2, 
  ArrowUpRight, 
  Layers, 
  ShieldCheck,
  Zap,
  Activity
} from 'lucide-react';
import { useProject } from '../../context/ProjectContext';

export const ModuleQualityOverTime: React.FC = () => {
  const { currentProject } = useProject();
  const [selectedVersion, setSelectedVersion] = useState<string>('V4');

  if (!currentProject) return null;

  const versionData = [
    {
      version: 'V1 (Raw Input)',
      qualityScore: 58,
      ambiguityCount: 6,
      completeness: 62,
      traceability: 45,
      date: 'Aug 01, 2026',
      summary: 'Initial raw client ingestion. Flagged multiple subjective terms ("fast", "user-friendly") and missing non-functional constraints.',
      improvements: [
        'Raw client transcripts ingested',
        '6 Ambiguity flags identified by NLP auditor',
        'Lacked formal IEEE acceptance bounds'
      ]
    },
    {
      version: 'V2 (AI Audit & Rewrites)',
      qualityScore: 74,
      ambiguityCount: 3,
      completeness: 79,
      traceability: 72,
      date: 'Aug 10, 2026',
      summary: 'Accepted AI IEEE 830 rewrites replacing subjective statements with quantified latency constraints (e.g. < 1.2s under 50k concurrency).',
      improvements: [
        'Converted 3 ambiguous statements to standard IEEE 830 syntax',
        'Added role actors ("Train Passenger", "Medical Staff")',
        'Initiated RTM traceability matrix'
      ]
    },
    {
      version: 'V3 (Domain Enrichment)',
      qualityScore: 88,
      ambiguityCount: 1,
      completeness: 91,
      traceability: 89,
      date: 'Aug 20, 2026',
      summary: 'Imported missing domain architectural features (MFA, AES-256 encryption, anti-oversell inventory locks, and automated webhook failovers).',
      improvements: [
        'Imported domain security & proctoring recommendations',
        'Synthesized Agile User Stories with Gherkin BDD scenarios',
        'Generated full-coverage QA test suites'
      ]
    },
    {
      version: 'V4 (Enterprise Baseline)',
      qualityScore: 98,
      ambiguityCount: 0,
      completeness: 99,
      traceability: 100,
      date: 'Aug 29, 2026',
      summary: 'Zero defect baseline. 100% RTM traceability, automated test matrices, and production-ready IEEE 830 / ISO 29148 SRS export generated.',
      improvements: [
        'Zero ambiguity defects remaining',
        '100% bi-directional traceability across all requirements',
        'Publication-ready IEEE SRS signed off'
      ]
    }
  ];

  const activeVerObj = versionData.find(v => v.version.startsWith(selectedVersion)) || versionData[3];

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="glass-card p-6 sm:p-8 rounded-2xl border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <div className="flex items-center space-x-2 text-emerald-400 text-xs font-bold font-mono mb-2">
            <TrendingUp className="h-4 w-4" />
            <span>INNOVATIVE SE TOOL • CONTINUOUS REQUIREMENTS IMPROVEMENT OVER TIME</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white font-sans tracking-tight">Requirement Quality Over Time</h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-3xl leading-relaxed font-light">
            Track how specification quality, completeness, and verifiability evolved across version iterations for <strong className="text-cyan-300 font-mono">{currentProject.name}</strong>.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-right">
            <span className="text-[10px] font-mono text-slate-400 block">Current Quality Health</span>
            <span className="text-2xl font-black font-mono text-emerald-400">98% (+40% gain)</span>
          </div>
        </div>
      </div>

      {/* Visual Quality Evolution Trend Chart */}
      <div className="glass-card p-6 sm:p-8 rounded-2xl border border-white/10 space-y-8">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <h3 className="text-sm font-bold text-white font-mono flex items-center gap-2">
            <Activity className="h-4 w-4 text-cyan-400" />
            <span>Version Progression & Quality Ascent (V1 → V4)</span>
          </h3>
          <span className="text-xs font-mono text-cyan-400">Continuous AI Enhancement Baseline</span>
        </div>

        {/* Visual Multi-Bar Step Chart */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {versionData.map((ver, idx) => {
            const isSelected = activeVerObj.version === ver.version;
            const heightPercent = `${ver.qualityScore}%`;

            return (
              <div
                key={idx}
                onClick={() => setSelectedVersion(ver.version.substring(0, 2))}
                className={`p-6 rounded-2xl border cursor-pointer transition-all duration-300 space-y-4 ${
                  isSelected
                    ? 'bg-gradient-to-b from-cyan-950/80 to-surface border-cyan-400 shadow-neon-cyan scale-[1.02]'
                    : 'bg-surface/60 border-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold font-mono text-cyan-400">{ver.version.split(' ')[0]}</span>
                  <span className="text-[10px] font-mono text-slate-400">{ver.date}</span>
                </div>

                {/* Vertical Progress Indicator */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-300">Quality Score:</span>
                    <span className="font-bold text-emerald-400 text-sm">{ver.qualityScore}%</span>
                  </div>
                  <div className="w-full h-3 bg-black/60 rounded-full overflow-hidden border border-white/10">
                    <div 
                      className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 rounded-full transition-all duration-500 shadow-neon-cyan"
                      style={{ width: heightPercent }}
                    />
                  </div>
                </div>

                <div className="text-[11px] font-mono text-slate-400 space-y-1 pt-2 border-t border-white/10">
                  <p>• Ambiguities: <span className={ver.ambiguityCount > 0 ? "text-rose-400 font-bold" : "text-emerald-400 font-bold"}>{ver.ambiguityCount} flagged</span></p>
                  <p>• Completeness: <span className="text-slate-200">{ver.completeness}%</span></p>
                  <p>• Traceability: <span className="text-slate-200">{ver.traceability}%</span></p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Version Explanation Card */}
        <div className="p-6 rounded-2xl bg-black/80 border border-cyan-500/30 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-5 w-5 text-cyan-400" />
              <h4 className="text-base font-bold text-white font-mono">
                AI Continuous Improvement Report: {activeVerObj.version}
              </h4>
            </div>
            <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 font-mono text-xs font-bold">
              Health Index: {activeVerObj.qualityScore}%
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed font-light font-mono">
            {activeVerObj.summary}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            {activeVerObj.improvements.map((imp, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-surface/80 border border-white/10 flex items-start space-x-2 text-xs font-mono text-slate-300">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>{imp}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
