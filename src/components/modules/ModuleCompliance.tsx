import React from 'react';
import { Award, CheckCircle2, AlertTriangle, ShieldCheck, HelpCircle, FileCheck } from 'lucide-react';
import { useProject } from '../../context/ProjectContext';
import { AIEngine } from '../../services/aiEngine';

export const ModuleCompliance: React.FC = () => {
  const { currentProject } = useProject();

  if (!currentProject) return null;

  const checks = AIEngine.generateComplianceChecks(currentProject.requirements);
  const avgScore = Math.round(checks.reduce((acc, c) => acc + c.score, 0) / checks.length);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="glass-card p-6 rounded-2xl border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-cyan-400 text-xs font-bold mb-1">
            <Award className="h-4 w-4" />
            <span>INNOVATIVE MODULE • IEEE 29148 SPECIFICATION COMPLIANCE RADAR</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white font-mono">IEEE 29148 Standard Compliance Audit</h1>
          <p className="text-xs text-slate-300 mt-1">
            Automated 6-point verification of Software Requirement Specification compliance (Completeness, Unambiguity, Testability, Traceability, Modifiability, and Feasibility).
          </p>
        </div>

        <div className="flex items-center space-x-3 bg-surface/80 px-4 py-2 rounded-xl border border-white/10">
          <div className="text-right">
            <p className="text-[10px] text-slate-400 font-mono">IEEE Audit Index</p>
            <p className="text-xl font-bold font-mono text-emerald-400">{avgScore}% GRADE A</p>
          </div>
        </div>
      </div>

      {/* Compliance Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {checks.map(chk => (
          <div key={chk.id} className="glass-card p-6 rounded-2xl border border-white/10 space-y-3 relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono font-bold text-cyan-400">{chk.id}</span>
                <h3 className="text-sm font-bold text-white">{chk.criterion}</h3>
              </div>
              <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold font-mono ${
                chk.status === 'Passed' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
              }`}>
                {chk.score}% {chk.status}
              </span>
            </div>

            <p className="text-xs text-slate-300">{chk.description}</p>

            {/* Score Bar */}
            <div className="w-full h-2 rounded-full bg-black/50 overflow-hidden border border-white/5">
              <div 
                className={`h-full rounded-full transition-all duration-500 ${chk.score > 90 ? 'bg-emerald-400' : 'bg-amber-400'}`}
                style={{ width: `${chk.score}%` }}
              />
            </div>

            <div className="bg-black/40 p-3 rounded-xl border border-white/5 text-xs text-slate-300">
              <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block mb-0.5">AI Recommendation</span>
              <p>{chk.recommendation}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
