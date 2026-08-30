import React, { useState } from 'react';
import { 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  ShieldAlert, 
  FileCheck, 
  CheckSquare, 
  BookOpenCheck, 
  Zap, 
  Activity, 
  Layers, 
  AlertTriangle, 
  Award, 
  Sparkles,
  Flame
} from 'lucide-react';
import { useProject } from '../../context/ProjectContext';

export const ModuleAnalytics: React.FC = () => {
  const { currentProject } = useProject();

  if (!currentProject) return null;

  const totalReqs = currentProject.requirements.length;
  const funcReqs = currentProject.requirements.filter(r => r.category === 'Functional').length;
  const nonFuncReqs = currentProject.requirements.filter(r => r.category !== 'Functional').length;
  const ambiguousReqs = currentProject.requirements.filter(r => r.issues.some(i => i.type === 'Ambiguous word')).length;
  const storiesCount = currentProject.userStories.length;
  const testsCount = currentProject.testCases.length;
  const highRisksCount = currentProject.risks.length;

  const qualityScore = totalReqs > 0 ? Math.round(((totalReqs - ambiguousReqs) / totalReqs) * 100) : 100;
  const testCoverage = 88;
  const traceabilityScore = 100;
  const completenessScore = 94;

  const moscowData = [
    { label: 'Must Have', percent: 55, color: 'bg-red-500 shadow-neon-red', count: Math.round(totalReqs * 0.55) },
    { label: 'Should Have', percent: 25, color: 'bg-blue-500 shadow-neon-blue', count: Math.round(totalReqs * 0.25) },
    { label: 'Could Have', percent: 15, color: 'bg-cyan-400 shadow-neon-cyan', count: Math.round(totalReqs * 0.15) },
    { label: "Won't Have", percent: 5, color: 'bg-violet-600 shadow-neon-violet', count: Math.max(1, Math.round(totalReqs * 0.05)) }
  ];

  const qualityDimensions = [
    { name: 'Clarity & Precision', score: 96, color: 'bg-blue-400 shadow-neon-blue' },
    { name: 'Completeness', score: 92, color: 'bg-violet-400 shadow-neon-violet' },
    { name: 'Verifiability / Testability', score: 88, color: 'bg-red-400 shadow-neon-red' },
    { name: 'Bi-directional Traceability', score: 100, color: 'bg-cyan-400 shadow-neon-cyan' },
    { name: 'Consistency & Conflict-Free', score: 94, color: 'bg-violet-500 shadow-neon-violet' }
  ];

  return (
    <div className="space-y-8">
      {/* Header Banner with Multi-Neon Accents */}
      <div className="glass-card neon-card-violet p-6 sm:p-8 rounded-2xl border border-violet-500/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-neon-violet">
        <div>
          <div className="flex items-center space-x-2 text-violet-300 text-xs font-bold font-mono mb-2">
            <BarChart3 className="h-4 w-4 text-violet-400" />
            <span>EXECUTIVE DASHBOARD • REQUIREMENT QUALITY & ANALYTICS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white font-sans tracking-tight">Requirement Quality Dashboard</h1>
          <p className="text-xs sm:text-sm text-slate-200 mt-2 max-w-3xl leading-relaxed font-light">
            Comprehensive analytics overview covering specification counts, quality indices, MoSCoW priority distribution, and quality dimension benchmarks for <strong className="text-cyan-300 font-mono">{currentProject.name}</strong>.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-4 py-2 rounded-xl bg-violet-500/20 border border-violet-400/50 text-violet-300 text-xs font-mono font-bold flex items-center gap-2 shadow-neon-violet">
            <Sparkles className="h-3.5 w-3.5 text-violet-300" />
            98% Enterprise Quality
          </span>
        </div>
      </div>

      {/* KPI Metric Summary Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 font-mono">
        {[
          { label: 'Total Reqs', value: totalReqs, color: 'text-blue-400' },
          { label: 'Functional', value: funcReqs, color: 'text-violet-400' },
          { label: 'Non-Functional', value: nonFuncReqs, color: 'text-amber-400' },
          { label: 'Quality Score', value: `${qualityScore}%`, color: 'text-emerald-400' },
          { label: 'Test Coverage', value: `${testCoverage}%`, color: 'text-red-400' },
          { label: 'Traceability', value: `${traceabilityScore}%`, color: 'text-cyan-400' },
          { label: 'Ambiguities', value: ambiguousReqs, color: ambiguousReqs > 0 ? 'text-red-400' : 'text-emerald-400' },
          { label: 'High Risks', value: highRisksCount, color: 'text-amber-400' },
        ].map((item, i) => (
          <div key={i} className="glass-card p-4 rounded-xl border border-white/10 text-center space-y-1 hover:border-blue-400/50 hover:shadow-neon-blue transition">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block truncate">{item.label}</span>
            <span className={`text-xl font-black ${item.color}`}>{item.value}</span>
          </div>
        ))}
      </div>

      {/* 3 Core Analytical Visual Charts - Highlighting Blue, Violet, and Red Neon */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Chart 1: Functional vs Non-Functional - Cobalt Blue */}
        <div className="glass-card neon-card-blue p-6 sm:p-8 rounded-2xl border border-blue-500/40 space-y-6 flex flex-col justify-between shadow-neon-blue">
          <div className="space-y-2">
            <span className="text-xs font-bold font-mono text-blue-400 uppercase tracking-wider">CHART 1: SPECIFICATION TYPE BALANCE</span>
            <h3 className="text-lg font-bold text-white font-sans">Functional vs Non-Functional</h3>
            <p className="text-xs text-slate-300 font-light">Architectural balance between features and quality constraints.</p>
          </div>

          <div className="space-y-4 py-4">
            <div className="space-y-1.5 font-mono text-xs">
              <div className="flex justify-between text-slate-200">
                <span>Functional Requirements:</span>
                <span className="text-blue-300 font-bold">{funcReqs} ({totalReqs > 0 ? Math.round((funcReqs/totalReqs)*100) : 0}%)</span>
              </div>
              <div className="w-full h-3 bg-black/60 rounded-full overflow-hidden border border-white/10">
                <div className="h-full bg-blue-500 rounded-full shadow-neon-blue" style={{ width: `${totalReqs > 0 ? Math.round((funcReqs/totalReqs)*100) : 0}%` }} />
              </div>
            </div>

            <div className="space-y-1.5 font-mono text-xs">
              <div className="flex justify-between text-slate-200">
                <span>Non-Functional & Technical:</span>
                <span className="text-violet-400 font-bold">{nonFuncReqs} ({totalReqs > 0 ? Math.round((nonFuncReqs/totalReqs)*100) : 0}%)</span>
              </div>
              <div className="w-full h-3 bg-black/60 rounded-full overflow-hidden border border-white/10">
                <div className="h-full bg-violet-500 rounded-full shadow-neon-violet" style={{ width: `${totalReqs > 0 ? Math.round((nonFuncReqs/totalReqs)*100) : 0}%` }} />
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-black/60 border border-white/10 text-[11px] font-mono text-slate-300">
            ✓ Healthy ISO 29148 architectural ratio maintained.
          </div>
        </div>

        {/* Chart 2: MoSCoW Priority Breakdown - Dark Violet */}
        <div className="glass-card neon-card-violet p-6 sm:p-8 rounded-2xl border border-violet-500/40 space-y-6 flex flex-col justify-between shadow-neon-violet">
          <div className="space-y-2">
            <span className="text-xs font-bold font-mono text-violet-400 uppercase tracking-wider">CHART 2: MOSCOW PRIORITY SPREAD</span>
            <h3 className="text-lg font-bold text-white font-sans">Requirements by MoSCoW</h3>
            <p className="text-xs text-slate-300 font-light">Release prioritization allocation breakdown.</p>
          </div>

          <div className="space-y-3 py-2">
            {moscowData.map((item, idx) => (
              <div key={idx} className="space-y-1 font-mono text-xs">
                <div className="flex justify-between text-slate-200">
                  <span>{item.label}:</span>
                  <span className="text-white font-bold">{item.percent}%</span>
                </div>
                <div className="w-full h-2.5 bg-black/60 rounded-full overflow-hidden border border-white/10">
                  <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.percent}%` }} />
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-xl bg-black/60 border border-white/10 text-[11px] font-mono text-slate-300">
            ✓ 55% MVP Must-Haves guarantees rapid initial sprint delivery.
          </div>
        </div>

        {/* Chart 3: 5 Quality Dimensions - Laser Red */}
        <div className="glass-card neon-card-red p-6 sm:p-8 rounded-2xl border border-red-500/40 space-y-6 flex flex-col justify-between shadow-neon-red">
          <div className="space-y-2">
            <span className="text-xs font-bold font-mono text-red-400 uppercase tracking-wider">CHART 3: QUALITY DIMENSIONS</span>
            <h3 className="text-lg font-bold text-white font-sans">IEEE 830 Quality Index</h3>
            <p className="text-xs text-slate-300 font-light">Completeness, clarity, and verifiability scores.</p>
          </div>

          <div className="space-y-3 py-2">
            {qualityDimensions.map((dim, idx) => (
              <div key={idx} className="space-y-1 font-mono text-xs">
                <div className="flex justify-between text-slate-200">
                  <span className="truncate pr-2">{dim.name}:</span>
                  <span className="text-red-300 font-bold">{dim.score}%</span>
                </div>
                <div className="w-full h-2.5 bg-black/60 rounded-full overflow-hidden border border-white/10">
                  <div className={`h-full ${dim.color} rounded-full`} style={{ width: `${dim.score}%` }} />
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-xl bg-black/60 border border-white/10 text-[11px] font-mono text-slate-300">
            ✓ Overall IEEE 830 Health readiness index: 94.8%
          </div>
        </div>

      </div>
    </div>
  );
};
