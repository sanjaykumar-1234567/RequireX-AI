import React from 'react';
import { 
  AlertTriangle, 
  ShieldAlert, 
  TrendingDown, 
  CheckCircle2, 
  Layers, 
  HelpCircle 
} from 'lucide-react';
import { useProject } from '../../context/ProjectContext';

export const ModuleRiskAnalysis: React.FC = () => {
  const { currentProject } = useProject();

  if (!currentProject) return null;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="glass-card p-6 rounded-2xl border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold mb-1">
            <AlertTriangle className="h-4 w-4" />
            <span>MODULE 10 • REQUIREMENT RISK & VOLATILITY RADAR</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white font-mono">Risk Analysis & Mitigation</h1>
          <p className="text-xs text-slate-300 mt-1">
            Identify requirement risks, project volatility, scope complexity, and third-party integration dependencies. Includes automated AI mitigation action strategies.
          </p>
        </div>

        <div className="flex items-center space-x-3 bg-surface/80 px-3 py-1.5 rounded-xl border border-white/10">
          <div className="text-right">
            <p className="text-[10px] text-slate-400">Risk Severity Score</p>
            <p className="text-lg font-bold font-mono text-amber-400">MODERATE (34%)</p>
          </div>
        </div>
      </div>

      {/* Risk Cards */}
      {currentProject.risks.length === 0 ? (
        <div className="glass-card p-8 rounded-2xl border border-white/10 text-center">
          <p className="text-xs text-slate-400">No risks identified for this project.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {currentProject.risks.map(rsk => (
            <div key={rsk.id} className="glass-card p-6 rounded-2xl border border-white/10 space-y-4 relative group hover:border-amber-500/40 transition">
              
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-xs font-mono font-bold text-amber-400">{rsk.id}</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {rsk.category}
                </span>
              </div>

              <h3 className="text-sm font-bold text-white leading-tight">{rsk.title}</h3>

              <div className="grid grid-cols-2 gap-2 text-xs bg-black/40 p-3 rounded-xl border border-white/5">
                <div>
                  <span className="text-[10px] text-slate-400">Impact</span>
                  <p className={`font-bold font-mono ${rsk.impact === 'High' ? 'text-red-400' : 'text-amber-400'}`}>{rsk.impact}</p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400">Probability</span>
                  <p className={`font-bold font-mono ${rsk.probability === 'High' ? 'text-red-400' : 'text-amber-400'}`}>{rsk.probability}</p>
                </div>
              </div>

              <div>
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block mb-1">AI Mitigation Strategy</span>
                <p className="text-xs text-slate-300 bg-emerald-500/5 p-3 rounded-xl border border-emerald-500/20 leading-relaxed">
                  {rsk.mitigation}
                </p>
              </div>

              <div className="border-t border-white/10 pt-2 text-[10px] text-slate-400 font-mono">
                Affected Requirements: {rsk.affectedRequirementIds.join(', ') || 'Global Scope'}
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};
