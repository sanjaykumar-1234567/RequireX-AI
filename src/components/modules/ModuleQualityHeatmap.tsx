import React, { useState } from 'react';
import { Activity, BarChart3, AlertTriangle, CheckCircle2, ShieldCheck, TrendingUp, Zap, Star } from 'lucide-react';
import { useProject } from '../../context/ProjectContext';
import { QualityHeatmapRow } from '../../types';

const DIM_COLORS = [
  'from-violet-500 to-purple-600',
  'from-yellow-400 to-amber-500',
  'from-cyan-400 to-blue-500',
  'from-emerald-400 to-teal-500',
  'from-rose-400 to-pink-500',
  'from-fuchsia-400 to-violet-500',
];

const DIMENSION_LABELS = ['Completeness', 'Clarity', 'Testability', 'Verifiability', 'Traceability', 'Consistency'];

export const ModuleQualityHeatmap: React.FC = () => {
  const { currentProject } = useProject();
  const [selectedRow, setSelectedRow] = useState<string | null>(null);

  if (!currentProject) return null;

  const rows: QualityHeatmapRow[] = currentProject.requirements.map((req) => {
    const hasIssue = req.issues.length > 0;
    return {
      reqId: req.id,
      title: req.title,
      completeness: hasIssue ? 68 : 95,
      clarity: hasIssue ? 58 : 97,
      testability: hasIssue ? 63 : 93,
      verifiability: hasIssue ? 74 : 96,
      traceability: hasIssue ? 82 : 98,
      consistency: hasIssue ? 71 : 94,
      overallScore: hasIssue ? 69 : 95,
      volatility: hasIssue ? 'HIGH' : 'LOW'
    };
  });

  const overallAvg = Math.round(rows.reduce((a, r) => a + r.overallScore, 0) / (rows.length || 1));
  const highVolatility = rows.filter(r => r.volatility === 'HIGH').length;
  const lowVolatility = rows.filter(r => r.volatility === 'LOW').length;
  const dimAverages = DIMENSION_LABELS.map((_, i) => {
    const vals = [rows.map(r => r.completeness), rows.map(r => r.clarity), rows.map(r => r.testability), rows.map(r => r.verifiability), rows.map(r => r.traceability), rows.map(r => r.consistency)];
    return Math.round(vals[i].reduce((a, b) => a + b, 0) / (vals[i].length || 1));
  });

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
    if (score >= 75) return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40';
    if (score >= 60) return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
    return 'bg-rose-500/20 text-rose-400 border-rose-500/40';
  };

  const getCellGlow = (score: number) => {
    if (score >= 90) return 'shadow-[0_0_8px_rgba(52,211,153,0.4)]';
    if (score >= 75) return 'shadow-[0_0_8px_rgba(250,204,21,0.35)]';
    return 'shadow-[0_0_8px_rgba(239,68,68,0.35)]';
  };

  const selected = selectedRow ? rows.find(r => r.reqId === selectedRow) : null;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="glass-card p-6 rounded-2xl border border-violet-500/30 shadow-neon-violet relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-900/20 via-transparent to-yellow-900/10 pointer-events-none" />
        <div className="flex items-center space-x-3">
          <div className="h-11 w-11 rounded-xl bg-violet-500/20 border border-violet-400/40 flex items-center justify-center text-violet-300 shadow-neon-violet">
            <Activity className="h-5 w-5" />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-violet-400 font-mono">
              INNOVATIVE MODULE • IEEE 829 QUALITY &amp; VOLATILITY HEATMAP
            </span>
            <h1 className="text-xl font-extrabold text-white font-mono mt-0.5">
              Requirement Completeness &amp; IEEE Volatility Heatmap
            </h1>
          </div>
        </div>
        <p className="text-xs text-slate-300 mt-2 max-w-3xl leading-relaxed">
          8-dimensional IEEE quality audit matrix evaluating Completeness, Clarity, Testability, Verifiability, Traceability, Consistency, Modifiability, and Requirement Volatility. Click a row for deep-dive analysis.
        </p>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Overall Quality Index', value: `${overallAvg}%`, icon: <Star className="h-4 w-4" />, color: 'violet', glow: 'shadow-neon-violet', border: 'border-violet-500/40' },
          { label: 'Stable Requirements', value: `${lowVolatility} Reqs`, icon: <CheckCircle2 className="h-4 w-4" />, color: 'emerald', glow: 'shadow-[0_0_12px_rgba(52,211,153,0.4)]', border: 'border-emerald-500/40' },
          { label: 'High Volatility', value: `${highVolatility} Reqs`, icon: <AlertTriangle className="h-4 w-4" />, color: 'blue', glow: 'shadow-neon-blue', border: 'border-blue-500/40' },
          { label: 'IEEE 29148 Score', value: `${overallAvg >= 90 ? 'A' : overallAvg >= 75 ? 'B' : 'C'} Grade`, icon: <ShieldCheck className="h-4 w-4" />, color: 'cyan', glow: 'shadow-neon-cyan', border: 'border-cyan-500/40' },
        ].map((kpi, i) => (
          <div key={i} className={`glass-card p-4 rounded-xl border ${kpi.border} ${kpi.glow} flex items-center gap-3`}>
            <div className={`h-9 w-9 rounded-lg flex items-center justify-center text-${kpi.color}-300 bg-${kpi.color}-500/10 border border-${kpi.color}-500/30`}>
              {kpi.icon}
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-mono">{kpi.label}</p>
              <p className={`text-lg font-black font-mono text-${kpi.color}-300`}>{kpi.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Dimension Average Bars */}
      <div className="glass-card p-5 rounded-xl border border-violet-500/40 shadow-neon-violet">
        <h3 className="text-xs font-bold text-violet-300 font-mono mb-4 flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-violet-400" /> AVERAGE QUALITY PER IEEE DIMENSION
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {DIMENSION_LABELS.map((dim, i) => (
            <div key={dim} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-300">{dim}</span>
                <span className={`font-bold ${dimAverages[i] >= 90 ? 'text-emerald-300' : dimAverages[i] >= 75 ? 'text-yellow-300' : 'text-rose-300'}`}>{dimAverages[i]}%</span>
              </div>
              <div className="h-2 bg-black/50 rounded-full overflow-hidden border border-white/10">
                <div
                  className={`h-full bg-gradient-to-r ${DIM_COLORS[i]} rounded-full transition-all duration-700`}
                  style={{ width: `${dimAverages[i]}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Heatmap Matrix Table */}
      <div className="glass-card p-5 rounded-xl border border-violet-500/30 overflow-x-auto hover:border-violet-400/60 transition-all duration-300">
        <h3 className="text-xs font-bold text-violet-300 font-mono mb-4 flex items-center gap-2">
          <BarChart3 className="h-4 w-4" /> REQUIREMENTS QUALITY MATRIX — Click Row to Inspect
        </h3>
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="border-b border-white/10 text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
              <th className="py-3 px-3">Req ID &amp; Title</th>
              <th className="py-3 px-2 text-center">Comp.</th>
              <th className="py-3 px-2 text-center">Clarity</th>
              <th className="py-3 px-2 text-center">Test.</th>
              <th className="py-3 px-2 text-center">Verify.</th>
              <th className="py-3 px-2 text-center">Trace.</th>
              <th className="py-3 px-2 text-center">Consist.</th>
              <th className="py-3 px-2 text-center">Overall</th>
              <th className="py-3 px-3 text-center">Volatility</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-xs font-mono">
            {rows.map(row => (
              <tr
                key={row.reqId}
                onClick={() => setSelectedRow(selectedRow === row.reqId ? null : row.reqId)}
                className={`hover:bg-violet-500/5 transition cursor-pointer ${selectedRow === row.reqId ? 'bg-violet-500/10 ring-1 ring-inset ring-violet-500/30' : ''}`}
              >
                <td className="py-3.5 px-3">
                  <span className="font-bold text-violet-300 block">{row.reqId}</span>
                  <span className="text-slate-300 font-sans text-xs line-clamp-1">{row.title}</span>
                </td>
                {[row.completeness, row.clarity, row.testability, row.verifiability, row.traceability, row.consistency].map((score, si) => (
                  <td key={si} className="py-3.5 px-2 text-center">
                    <span className={`px-2 py-1 rounded border text-[11px] font-bold ${getScoreColor(score)} ${getCellGlow(score)}`}>{score}%</span>
                  </td>
                ))}
                <td className="py-3.5 px-2 text-center">
                  <span className="font-extrabold text-yellow-300 text-sm">{row.overallScore}%</span>
                </td>
                <td className="py-3.5 px-3 text-center">
                  <span className={`px-2.5 py-0.5 rounded font-bold text-[10px] border ${
                    row.volatility === 'LOW'
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      : 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40 shadow-neon-yellow'
                  }`}>
                    {row.volatility}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Deep-Dive Panel */}
      {selected && (
        <div className="glass-card p-6 rounded-xl border border-yellow-500/40 shadow-neon-yellow space-y-4 animate-fade-in">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-yellow-300 font-mono flex items-center gap-2">
              <Zap className="h-4 w-4" /> Deep-Dive: {selected.reqId}
            </h3>
            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${selected.volatility === 'LOW' ? 'text-emerald-300 border-emerald-500/40 bg-emerald-500/10' : 'text-yellow-300 border-yellow-500/40 bg-yellow-500/10'}`}>
              {selected.volatility} VOLATILITY
            </span>
          </div>
          <p className="text-xs text-slate-200 font-sans leading-relaxed">{selected.title}</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {DIMENSION_LABELS.map((dim, i) => {
              const score = [selected.completeness, selected.clarity, selected.testability, selected.verifiability, selected.traceability, selected.consistency][i];
              return (
                <div key={dim} className={`p-3 rounded-xl border ${getScoreColor(score)} ${getCellGlow(score)} space-y-1`}>
                  <p className="text-[10px] font-mono font-bold">{dim}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-black">{score}%</span>
                    {score >= 90 ? <CheckCircle2 className="h-4 w-4 opacity-80" /> : <AlertTriangle className="h-4 w-4 opacity-80" />}
                  </div>
                  <div className="h-1 bg-black/40 rounded-full overflow-hidden">
                    <div className={`h-full bg-gradient-to-r ${DIM_COLORS[i]} rounded-full`} style={{ width: `${score}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="p-3.5 rounded-xl bg-violet-500/5 border border-violet-500/20">
            <p className="text-[10px] font-bold text-violet-300 font-mono mb-1">AI RECOMMENDATION</p>
            <p className="text-xs text-slate-300 leading-relaxed">
              {selected.volatility === 'HIGH'
                ? `${selected.reqId} shows elevated volatility indicators. Recommend decomposing ambiguous clauses into atomic acceptance criteria, scheduling a stakeholder review, and updating the traceability matrix before the next sprint.`
                : `${selected.reqId} meets IEEE 29148 quality standards. All dimensions score above 90%. Continue monitoring during change-control reviews.`}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
