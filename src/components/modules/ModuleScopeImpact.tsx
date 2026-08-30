import React, { useState } from 'react';
import { 
  GitPullRequest, 
  AlertTriangle, 
  CheckSquare, 
  BookOpenCheck, 
  GitMerge, 
  RefreshCw, 
  TrendingUp,
  Clock,
  ShieldAlert,
  Zap
} from 'lucide-react';
import { useProject } from '../../context/ProjectContext';

export const ModuleScopeImpact: React.FC = () => {
  const { currentProject } = useProject();
  const [selectedReqId, setSelectedReqId] = useState<string>(() => currentProject?.requirements[0]?.id || '');

  if (!currentProject) return null;

  const targetReq = currentProject.requirements.find(r => r.id === selectedReqId) || currentProject.requirements[0];

  const impactedStories = currentProject.userStories.filter(us => us.requirementId === selectedReqId);
  const impactedUseCases = currentProject.useCases.filter(uc => uc.requirementId === selectedReqId);
  const impactedTestCases = currentProject.testCases.filter(tc => tc.requirementId === selectedReqId);

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="glass-card p-6 sm:p-8 rounded-2xl border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <div className="flex items-center space-x-2 text-cyan-400 text-xs font-bold font-mono mb-2">
            <GitPullRequest className="h-4 w-4" />
            <span>INNOVATIVE SE TOOL • SCOPE CREEP SIMULATOR 2.0</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white font-sans tracking-tight">Scope Creep & Impact Analysis Simulator</h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-3xl leading-relaxed font-light">
            Simulate requirement modifications or additions to compute downstream ripple effects on <strong className="text-cyan-300 font-mono">Dev Timelines, QA Test Workloads, and Architectural Risk for {currentProject.name}</strong>.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-3.5 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-bold flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400 animate-ping" />
            Live Scope Delta Simulator
          </span>
        </div>
      </div>

      {/* Scope Creep Visual Delta Bars */}
      <div className="glass-card p-6 sm:p-8 rounded-2xl border border-white/10 space-y-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <h3 className="text-sm font-bold text-white font-mono flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-cyan-400" />
            <span>Scope Expansion & Budget Velocity Delta</span>
          </h3>
          <span className="text-xs font-mono text-rose-400 font-bold">+18.5% Scope Increase Simulated</span>
        </div>

        {/* Visual Progress Meters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-black/60 border border-cyan-500/30 space-y-2">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-300">Development Effort:</span>
              <span className="text-cyan-400 font-bold">+12% (+3 Sprints)</span>
            </div>
            <div className="w-full h-2.5 bg-black/80 rounded-full overflow-hidden border border-white/10">
              <div className="h-full bg-cyan-400 rounded-full" style={{ width: '72%' }} />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-black/60 border border-purple-500/30 space-y-2">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-300">QA Testing Workload:</span>
              <span className="text-purple-400 font-bold">+15% (+8 Test Suites)</span>
            </div>
            <div className="w-full h-2.5 bg-black/80 rounded-full overflow-hidden border border-white/10">
              <div className="h-full bg-purple-400 rounded-full" style={{ width: '85%' }} />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-black/60 border border-rose-500/30 space-y-2">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-300">Architectural Risk:</span>
              <span className="text-rose-400 font-bold">+9% Volatility</span>
            </div>
            <div className="w-full h-2.5 bg-black/80 rounded-full overflow-hidden border border-white/10">
              <div className="h-full bg-rose-500 rounded-full" style={{ width: '48%' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Target Requirement Selector */}
      <div className="glass-card p-6 sm:p-8 rounded-2xl border border-white/10 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <label className="block text-xs font-mono font-bold text-slate-300 mb-1">
              Select Target Requirement to Modify / Simulate Blast Radius:
            </label>
            <select
              value={selectedReqId}
              onChange={e => setSelectedReqId(e.target.value)}
              className="bg-black/80 border border-cyan-500/40 text-cyan-300 font-mono text-xs rounded-xl px-4 py-2.5 cursor-pointer focus:outline-none"
            >
              {currentProject.requirements.map(req => (
                <option key={req.id} value={req.id} className="bg-[#12121A] text-white">
                  [{req.id}] {req.title}
                </option>
              ))}
            </select>
          </div>

          <div className="px-3.5 py-1.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-mono font-bold">
            ⚠️ SIMULATION MODE: CHANGE IMPACT RATING: HIGH
          </div>
        </div>

        {/* Selected Req Overview */}
        {targetReq && (
          <div className="bg-black/60 p-5 rounded-2xl border border-cyan-500/30 space-y-2 text-xs font-mono">
            <div className="flex items-center space-x-3">
              <span className="font-bold text-cyan-400 text-sm">{targetReq.id}</span>
              <span className="px-2.5 py-0.5 rounded bg-white/5 text-slate-300 border border-white/10">{targetReq.category}</span>
              <span className="px-2.5 py-0.5 rounded bg-rose-500/20 text-rose-300 font-bold border border-rose-500/30">{targetReq.priority} Priority</span>
            </div>
            <p className="text-slate-200 text-sm font-sans pt-1 leading-relaxed">{targetReq.improvedText || targetReq.description}</p>
          </div>
        )}

        {/* Downstream Impact Breakdown: 3 Detail Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* User Stories Impact */}
          <div className="bg-surface/80 p-5 rounded-2xl border border-white/10 space-y-3">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="text-xs font-bold text-purple-400 flex items-center gap-1.5 font-mono">
                <BookOpenCheck className="h-4 w-4" />
                <span>Impacted User Stories</span>
              </span>
              <span className="px-2.5 py-0.5 rounded bg-purple-500/20 text-purple-300 font-mono text-[10px] font-bold">
                {impactedStories.length} Stories
              </span>
            </div>

            <div className="space-y-2">
              {impactedStories.length > 0 ? (
                impactedStories.map(s => (
                  <div key={s.id} className="p-3 rounded-xl bg-black/60 border border-purple-500/20 text-xs text-slate-300 font-mono space-y-1">
                    <span className="font-bold text-purple-400">{s.id}:</span>
                    <p className="text-slate-200">As a {s.asA}, I want to {s.iWantTo}</p>
                  </div>
                ))
              ) : (
                <p className="text-slate-500 text-xs font-mono py-4 text-center">No directly coupled stories.</p>
              )}
            </div>
          </div>

          {/* Use Cases Impact */}
          <div className="bg-surface/80 p-5 rounded-2xl border border-white/10 space-y-3">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="text-xs font-bold text-cyan-400 flex items-center gap-1.5 font-mono">
                <GitMerge className="h-4 w-4" />
                <span>Impacted Use Cases</span>
              </span>
              <span className="px-2.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono text-[10px] font-bold">
                {impactedUseCases.length} Use Cases
              </span>
            </div>

            <div className="space-y-2">
              {impactedUseCases.length > 0 ? (
                impactedUseCases.map(u => (
                  <div key={u.id} className="p-3 rounded-xl bg-black/60 border border-cyan-500/20 text-xs text-slate-300 font-mono space-y-1">
                    <span className="font-bold text-cyan-400">{u.id}:</span>
                    <p className="text-slate-200">{u.title}</p>
                  </div>
                ))
              ) : (
                <p className="text-slate-500 text-xs font-mono py-4 text-center">No directly coupled use cases.</p>
              )}
            </div>
          </div>

          {/* Test Cases Impact */}
          <div className="bg-surface/80 p-5 rounded-2xl border border-white/10 space-y-3">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 font-mono">
                <CheckSquare className="h-4 w-4" />
                <span>Impacted QA Test Suites</span>
              </span>
              <span className="px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold">
                {impactedTestCases.length} Tests
              </span>
            </div>

            <div className="space-y-2">
              {impactedTestCases.length > 0 ? (
                impactedTestCases.map(t => (
                  <div key={t.id} className="p-3 rounded-xl bg-black/60 border border-emerald-500/20 text-xs text-slate-300 font-mono space-y-1">
                    <span className="font-bold text-emerald-400">{t.id} ({t.category}):</span>
                    <p className="text-slate-200 truncate">{t.description}</p>
                  </div>
                ))
              ) : (
                <p className="text-slate-500 text-xs font-mono py-4 text-center">No directly coupled test cases.</p>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
