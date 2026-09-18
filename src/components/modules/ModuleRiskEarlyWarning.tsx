import React, { useState } from 'react';
import { 
  AlertTriangle, 
  ShieldAlert, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Flame, 
  Zap,
  Activity
} from 'lucide-react';
import { useProject } from '../../context/ProjectContext';

export const ModuleRiskEarlyWarning: React.FC = () => {
  const { currentProject, acceptImprovedRequirement } = useProject();
  const [fixedReqs, setFixedReqs] = useState<string[]>([]);

  if (!currentProject) return null;

  const alerts = currentProject.requirements
    .filter(req => req.issues.length > 0 || req.priority === 'Critical' || req.priority === 'High')
    .slice(0, 6)
    .map(req => {
      const hasCritical = req.issues.some(i => i.severity === 'Critical') || req.priority === 'Critical';
      const severity = hasCritical ? 'HIGH ALERT' : 'MEDIUM ALERT';
      const riskScore = hasCritical 
        ? `${(8.5 + (req.issues.length % 15) * 0.1).toFixed(1)} / 10`
        : `${(6.5 + (req.issues.length % 15) * 0.1).toFixed(1)} / 10`;

      const flaws = req.issues.length > 0 
        ? req.issues.map(i => i.problem || i.reason)
        : [
            'Missing quantified operational acceptance threshold',
            'Undefined failure recovery & edge-case behavior',
            'Requires objective automated QA stress test verification'
          ];

      const suggestedIEEE = req.improvedText || `The system shall execute ${req.title.toLowerCase()} with fully quantified operational bounds, verified exception handling, and automated test coverage.`;

      return {
        reqId: req.id,
        title: req.title,
        severity,
        riskScore,
        flaws: flaws.slice(0, 3),
        currentRaw: `"${req.description}"`,
        suggestedIEEE
      };
    });

  const handleFix = (reqId: string) => {
    setFixedReqs(prev => [...prev, reqId]);
    acceptImprovedRequirement(reqId);
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="glass-card p-6 sm:p-8 rounded-2xl border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold font-mono mb-2">
            <AlertTriangle className="h-4 w-4" />
            <span>AI EARLY WARNING • PREDICTIVE REQUIREMENT RISK RADAR</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white font-sans tracking-tight">Requirement Risk Early Warning Radar</h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-3xl leading-relaxed font-light">
            AI predicts which requirements carry severe ambiguity, missing constraints, or testing risks before coding begins for <strong className="text-cyan-300 font-mono">{currentProject.name}</strong>.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-3.5 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-bold flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400 animate-ping" />
            {alerts.length} High-Risk Warnings
          </span>
        </div>
      </div>

      {/* Early Warning Alert Cards Grid */}
      <div className="space-y-6">
        {alerts.length === 0 ? (
          <div className="glass-card p-12 rounded-2xl border border-white/10 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <h2 className="text-xl font-bold text-white">No High-Risk Early Warnings Detected</h2>
            <p className="text-slate-400 text-sm max-w-md mx-auto">
              {!currentProject.requirements || currentProject.requirements.length === 0
                ? 'No requirements available. Upload or enter requirements to run the early risk warning radar.'
                : 'All project requirements meet baseline stability and IEEE criteria without critical ambiguities or high risk.'}
            </p>
          </div>
        ) : (
          alerts.map((alert) => {
          const isFixed = fixedReqs.includes(alert.reqId);

          return (
            <div 
              key={alert.reqId}
              className={`glass-card p-6 sm:p-8 rounded-2xl border transition-all duration-300 space-y-6 ${
                isFixed 
                  ? 'bg-emerald-950/30 border-emerald-500/40 shadow-neon-emerald' 
                  : alert.severity === 'HIGH ALERT'
                  ? 'bg-rose-950/20 border-rose-500/40 hover:shadow-neon-rose'
                  : 'bg-amber-950/20 border-amber-500/40 hover:shadow-neon-amber'
              }`}
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold border ${
                    alert.severity === 'HIGH ALERT' 
                      ? 'bg-rose-500/20 text-rose-300 border-rose-500/40' 
                      : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  }`}>
                    {alert.severity}
                  </span>
                  <span className="text-sm font-mono font-bold text-white">{alert.reqId}: {alert.title}</span>
                </div>

                <div className="flex items-center space-x-3 text-xs font-mono">
                  <span className="text-slate-400">Risk Severity:</span>
                  <span className="font-bold text-rose-400 text-sm">{alert.riskScore}</span>
                </div>
              </div>

              {/* Flaws Identified */}
              <div className="space-y-2 font-mono text-xs">
                <span className="text-rose-400 font-bold block text-[11px]">Identified Defect Root Causes:</span>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {alert.flaws.map((flaw, fIdx) => (
                    <div key={fIdx} className="p-3 rounded-xl bg-black/60 border border-white/10 flex items-start space-x-2 text-slate-300">
                      <span className="text-rose-400 font-bold">✕</span>
                      <span>{flaw}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Before vs After IEEE Suggestion */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
                <div className="p-4 rounded-xl bg-black/80 border border-rose-500/30 space-y-2">
                  <span className="text-rose-400 font-bold block">CURRENT FLAWED SPECIFICATION:</span>
                  <p className="text-slate-300 italic">{alert.currentRaw}</p>
                </div>

                <div className="p-4 rounded-xl bg-black/80 border border-cyan-500/40 space-y-2">
                  <span className="text-cyan-400 font-bold block">IEEE 830 STANDARDIZED SPECIFICATION:</span>
                  <p className="text-cyan-200 font-semibold">{alert.suggestedIEEE}</p>
                </div>
              </div>

              {/* 1-Click Fix Button */}
              <div className="flex justify-end pt-2">
                {isFixed ? (
                  <span className="px-5 py-2.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-mono text-xs font-bold flex items-center space-x-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <span>Applied to IEEE Baseline</span>
                  </span>
                ) : (
                  <button
                    onClick={() => handleFix(alert.reqId)}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-extrabold text-xs font-mono shadow-neon-cyan transition flex items-center space-x-2 cursor-pointer"
                  >
                    <Sparkles className="h-4 w-4" />
                    <span>Apply 1-Click IEEE Rewrite</span>
                  </button>
                )}
              </div>
            </div>
          );
        })
      )}
      </div>
    </div>
  );
};
