import React, { useState } from 'react';
import { 
  AlertTriangle, 
  ShieldAlert, 
  Flame, 
  Layers, 
  ArrowRight, 
  CheckCircle2, 
  X,
  TrendingUp,
  Activity
} from 'lucide-react';
import { useProject } from '../../context/ProjectContext';
import { AIEngine } from '../../services/aiEngine';
import { RiskHeatmapItem } from '../../types';

export const ModuleRiskHeatmap: React.FC = () => {
  const { currentProject } = useProject();
  const [selectedRisk, setSelectedRisk] = useState<RiskHeatmapItem | null>(null);

  if (!currentProject) return null;

  const risks = AIEngine.generateRiskHeatmap(currentProject.requirements, currentProject.risks);

  // 3x3 Matrix Grid helper
  const getRisksAt = (prob: 'High' | 'Medium' | 'Low', imp: 'High' | 'Medium' | 'Low') => {
    return risks.filter(r => r.probability === prob && r.impact === imp);
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="glass-card p-6 sm:p-8 rounded-2xl border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <div className="flex items-center space-x-2 text-rose-400 text-xs font-bold font-mono mb-2">
            <Flame className="h-4 w-4" />
            <span>INNOVATIVE SE TOOL • 2D PROBABILITY VS IMPACT RISK RADAR</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white font-sans tracking-tight">Requirements Risk Heatmap</h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-3xl leading-relaxed font-light">
            Visualize where critical architectural and requirements defects are concentrated across a 2D matrix (Probability vs Impact) for <strong className="text-cyan-300 font-mono">{currentProject.name}</strong>.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-3.5 py-1.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono font-bold flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-400 animate-ping" />
            {risks.length} Active Risks Tracked
          </span>
        </div>
      </div>

      {/* 2D Heatmap Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* The Matrix */}
        <div className="lg:col-span-2 glass-card p-6 sm:p-8 rounded-2xl border border-white/10 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h3 className="text-sm font-bold text-white font-mono flex items-center gap-2">
              <Layers className="h-4 w-4 text-cyan-400" />
              <span>2D Probability vs Impact Matrix</span>
            </h3>
            <div className="flex items-center gap-3 text-[11px] font-mono">
              <span className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded-full bg-emerald-400" /> Low (0-4)</span>
              <span className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded-full bg-amber-400" /> Medium (5-7)</span>
              <span className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded-full bg-rose-500" /> High (8-10)</span>
            </div>
          </div>

          {/* Matrix Container */}
          <div className="space-y-4">
            <div className="text-center font-mono text-xs font-bold text-cyan-400 tracking-wider">
              — IMPACT —
            </div>

            <div className="grid grid-cols-4 gap-3">
              {/* Header Row */}
              <div className="p-2 text-center text-xs font-mono font-bold text-slate-400">PROBABILITY ↓</div>
              <div className="p-2 text-center text-xs font-mono font-bold text-slate-300 bg-surface/40 rounded-lg">Low Impact</div>
              <div className="p-2 text-center text-xs font-mono font-bold text-slate-300 bg-surface/40 rounded-lg">Medium Impact</div>
              <div className="p-2 text-center text-xs font-mono font-bold text-slate-300 bg-surface/40 rounded-lg">High Impact</div>

              {/* High Probability Row */}
              <div className="p-3 text-center text-xs font-mono font-bold text-rose-400 bg-rose-500/10 rounded-xl flex items-center justify-center">High Prob</div>
              {(['Low', 'Medium', 'High'] as const).map(imp => {
                const cellRisks = getRisksAt('High', imp);
                const isHighZone = imp === 'High' || imp === 'Medium';
                return (
                  <div 
                    key={`High-${imp}`}
                    className={`min-h-[100px] p-3 rounded-xl border transition-all duration-200 space-y-2 flex flex-col justify-center items-center text-center cursor-pointer ${
                      isHighZone 
                        ? 'bg-rose-950/40 border-rose-500/40 hover:border-rose-400 hover:shadow-neon-rose' 
                        : 'bg-amber-950/30 border-amber-500/30 hover:border-amber-400'
                    }`}
                  >
                    {cellRisks.length === 0 ? (
                      <span className="text-slate-600 text-xs font-mono">No Risks</span>
                    ) : (
                      cellRisks.map(r => (
                        <button
                          key={r.id}
                          onClick={() => setSelectedRisk(r)}
                          className="w-full px-2 py-1.5 rounded-lg bg-black/60 border border-white/15 hover:border-cyan-400 text-left text-[11px] font-mono text-slate-200 hover:text-white transition group flex items-center justify-between"
                        >
                          <span className="truncate font-bold text-rose-400">{r.id}</span>
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-rose-500/20 text-rose-300">{r.score}</span>
                        </button>
                      ))
                    )}
                  </div>
                );
              })}

              {/* Medium Probability Row */}
              <div className="p-3 text-center text-xs font-mono font-bold text-amber-400 bg-amber-500/10 rounded-xl flex items-center justify-center">Medium Prob</div>
              {(['Low', 'Medium', 'High'] as const).map(imp => {
                const cellRisks = getRisksAt('Medium', imp);
                return (
                  <div 
                    key={`Medium-${imp}`}
                    className="min-h-[100px] p-3 rounded-xl border bg-amber-950/20 border-amber-500/30 hover:border-amber-400 transition-all duration-200 space-y-2 flex flex-col justify-center items-center text-center cursor-pointer"
                  >
                    {cellRisks.length === 0 ? (
                      <span className="text-slate-600 text-xs font-mono">No Risks</span>
                    ) : (
                      cellRisks.map(r => (
                        <button
                          key={r.id}
                          onClick={() => setSelectedRisk(r)}
                          className="w-full px-2 py-1.5 rounded-lg bg-black/60 border border-white/15 hover:border-cyan-400 text-left text-[11px] font-mono text-slate-200 hover:text-white transition group flex items-center justify-between"
                        >
                          <span className="truncate font-bold text-amber-400">{r.id}</span>
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300">{r.score}</span>
                        </button>
                      ))
                    )}
                  </div>
                );
              })}

              {/* Low Probability Row */}
              <div className="p-3 text-center text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 rounded-xl flex items-center justify-center">Low Prob</div>
              {(['Low', 'Medium', 'High'] as const).map(imp => {
                const cellRisks = getRisksAt('Low', imp);
                return (
                  <div 
                    key={`Low-${imp}`}
                    className="min-h-[100px] p-3 rounded-xl border bg-emerald-950/20 border-emerald-500/30 hover:border-emerald-400 transition-all duration-200 space-y-2 flex flex-col justify-center items-center text-center cursor-pointer"
                  >
                    {cellRisks.length === 0 ? (
                      <span className="text-slate-600 text-xs font-mono">No Risks</span>
                    ) : (
                      cellRisks.map(r => (
                        <button
                          key={r.id}
                          onClick={() => setSelectedRisk(r)}
                          className="w-full px-2 py-1.5 rounded-lg bg-black/60 border border-white/15 hover:border-cyan-400 text-left text-[11px] font-mono text-slate-200 hover:text-white transition group flex items-center justify-between"
                        >
                          <span className="truncate font-bold text-emerald-400">{r.id}</span>
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300">{r.score}</span>
                        </button>
                      ))
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Selected Risk Inspection Drawer */}
        <div className="glass-card p-6 sm:p-8 rounded-2xl border border-white/10 space-y-6">
          <h3 className="text-sm font-bold text-white font-mono flex items-center gap-2 border-b border-white/10 pb-3">
            <ShieldAlert className="h-4 w-4 text-rose-400" />
            <span>Risk Inspection Console</span>
          </h3>

          {selectedRisk ? (
            <div className="space-y-4 font-mono text-xs animate-fadeIn">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-md bg-rose-500/20 text-rose-300 font-bold border border-rose-500/40">
                  {selectedRisk.id}
                </span>
                <span className="text-xs text-slate-400">{selectedRisk.category}</span>
              </div>

              <h4 className="text-base font-bold text-white font-sans">{selectedRisk.title}</h4>

              <div className="grid grid-cols-3 gap-2 text-center py-2">
                <div className="p-2.5 rounded-xl bg-surface/80 border border-white/10">
                  <p className="text-[10px] text-slate-400">Probability</p>
                  <p className="font-bold text-amber-400 mt-0.5">{selectedRisk.probability}</p>
                </div>
                <div className="p-2.5 rounded-xl bg-surface/80 border border-white/10">
                  <p className="text-[10px] text-slate-400">Impact</p>
                  <p className="font-bold text-rose-400 mt-0.5">{selectedRisk.impact}</p>
                </div>
                <div className="p-2.5 rounded-xl bg-surface/80 border border-white/10">
                  <p className="text-[10px] text-slate-400">Risk Score</p>
                  <p className="font-bold text-cyan-400 mt-0.5">{selectedRisk.score} / 10</p>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-white/10">
                <p className="text-slate-400 text-[11px] font-bold">Affected Requirements ({selectedRisk.affectedRequirementIds.length}):</p>
                <div className="flex flex-wrap gap-1.5">
                  {selectedRisk.affectedRequirementIds.map(id => (
                    <span key={id} className="px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-[10px]">
                      {id}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-white/10">
                <p className="text-slate-400 text-[11px] font-bold">Affected QA Test Cases ({selectedRisk.affectedTestCaseIds.length}):</p>
                <div className="flex flex-wrap gap-1.5">
                  {selectedRisk.affectedTestCaseIds.map(id => (
                    <span key={id} className="px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/30 text-purple-300 text-[10px]">
                      {id}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-black/60 border border-cyan-500/30 space-y-1.5">
                <span className="text-cyan-400 font-bold block text-[11px]">AI Recommended Mitigation:</span>
                <p className="text-slate-300 text-[11px] font-light leading-relaxed">{selectedRisk.mitigation}</p>
              </div>
            </div>
          ) : (
            <div className="py-16 text-center space-y-3 text-slate-400">
              <Activity className="h-10 w-10 text-cyan-500/40 mx-auto animate-pulse" />
              <p className="text-xs">Click any risk badge in the matrix to inspect severity, affected requirements, test cases, and mitigation strategy.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
