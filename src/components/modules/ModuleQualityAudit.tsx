import React, { useState } from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  Check, 
  X, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  ShieldAlert,
  HelpCircle,
  Wand2
} from 'lucide-react';
import { useProject } from '../../context/ProjectContext';

export const ModuleQualityAudit: React.FC = () => {
  const { currentProject, acceptImprovedRequirement } = useProject();

  if (!currentProject) return null;

  const requirementsWithIssues = currentProject.requirements.filter(r => r.issues.length > 0);
  const approvedRequirements = currentProject.requirements.filter(r => r.issues.length === 0 || r.isImprovedAccepted);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="glass-card p-6 rounded-2xl border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold mb-1">
            <ShieldCheck className="h-4 w-4" />
            <span>MODULE 3 & 4 • IEEE-802 QUALITY AUDIT & REWRITER</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white font-mono">Requirement Quality & IEEE Standard Rewriter</h1>
          <p className="text-xs text-slate-300 mt-1">
            Detect ambiguity, non-testable clauses, missing constraints, and missing actors. Automatically transform informal notes into formal IEEE 830-1998 specifications ("The system shall...").
          </p>
        </div>

        <div className="flex items-center space-x-3 bg-surface/80 px-4 py-2 rounded-xl border border-white/10">
          <div className="text-right">
            <p className="text-[10px] text-slate-400">Audited Health Score</p>
            <p className="text-xl font-bold font-mono text-cyan-400">
              {Math.max(0, Math.round(((currentProject.requirements.length - requirementsWithIssues.length) / Math.max(currentProject.requirements.length, 1)) * 100))}%
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid: Identified Defects vs IEEE Rewriter */}
      <div className="space-y-6">
        <h2 className="text-base font-bold text-white flex items-center gap-2 font-mono">
          <AlertTriangle className="h-4 w-4 text-amber-400" />
          <span>Flagged Quality Defects ({requirementsWithIssues.length})</span>
        </h2>

        {requirementsWithIssues.length === 0 ? (
          <div className="glass-card p-8 rounded-2xl border border-white/10 text-center">
            <CheckCircle2 className="h-10 w-10 text-emerald-400 mx-auto mb-2" />
            <h3 className="text-base font-bold text-white">All Requirements Pass IEEE Quality Standards</h3>
            <p className="text-xs text-slate-400 mt-1">No ambiguous words, non-testable clauses, or missing actors detected in current inventory.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {requirementsWithIssues.map(req => (
              <div key={req.id} className="glass-card p-6 rounded-2xl border border-white/10 space-y-4">
                
                {/* Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-mono font-bold text-cyan-400">{req.id}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-white/5 text-slate-300 border border-white/10">{req.category}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-mono font-semibold">
                    STATUS: QUALITY REVISION REQUIRED
                  </span>
                </div>

                {/* Original Input */}
                <div className="bg-black/50 p-3 rounded-xl border border-red-500/20">
                  <span className="text-[10px] font-bold text-red-400 uppercase tracking-wider block mb-1">RAW REQUIREMENT TEXT:</span>
                  <p className="text-xs text-slate-300 font-mono">"{req.description}"</p>
                </div>

                {/* Issues breakdown */}
                <div className="space-y-3">
                  {req.issues.map(iss => (
                    <div key={iss.id} className="p-3.5 rounded-xl bg-amber-500/5 border border-amber-500/20 grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
                      <div>
                        <span className="text-[10px] font-bold text-amber-400 uppercase">Defect Type</span>
                        <p className="font-semibold text-white mt-0.5">{iss.type}</p>
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-amber-400 uppercase">Problem & Reason</span>
                        <p className="text-slate-300 mt-0.5">{iss.problem}</p>
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-amber-400 uppercase">Suggested Correction</span>
                        <p className="text-emerald-300 mt-0.5">{iss.suggestedCorrection}</p>
                      </div>
                      <div className="flex items-center justify-between md:flex-col md:items-end md:justify-center">
                        <span className="text-[10px] text-slate-400">Confidence: <span className="text-cyan-400 font-bold font-mono">{iss.confidenceScore}%</span></span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${iss.severity === 'Critical' ? 'bg-red-500/20 text-red-400' : 'bg-amber-500/20 text-amber-400'}`}>
                          {iss.severity} Severity
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* IEEE Rewriter Recommendation Box */}
                {req.improvedText && (
                  <div className="p-4 rounded-xl bg-gradient-to-r from-cyan-950/40 via-blue-950/40 to-purple-950/40 border border-cyan-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-neon-cyan">
                    <div>
                      <div className="flex items-center space-x-2 text-cyan-400 text-[11px] font-bold mb-1">
                        <Wand2 className="h-3.5 w-3.5" />
                        <span>AI IEEE-802 REWRITTEN SPECIFICATION</span>
                      </div>
                      <p className="text-xs font-semibold text-cyan-100 font-mono leading-relaxed">
                        "{req.improvedText}"
                      </p>
                    </div>

                    <div className="flex items-center space-x-2 flex-shrink-0">
                      <button
                        onClick={() => acceptImprovedRequirement(req.id)}
                        className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs flex items-center space-x-1.5 transition"
                      >
                        <Check className="h-4 w-4" />
                        <span>Accept IEEE Rewrite</span>
                      </button>
                    </div>
                  </div>
                )}

              </div>
            ))}
          </div>
        )}

        {/* Approved Requirements Section */}
        {approvedRequirements.length > 0 && (
          <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2 font-mono">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>Approved IEEE Specifications ({approvedRequirements.length})</span>
            </h3>

            <div className="space-y-2.5">
              {approvedRequirements.map(req => (
                <div key={req.id} className="p-3.5 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-mono font-bold text-cyan-400 mr-2">{req.id}</span>
                    <span className="text-slate-200 font-medium">{req.improvedText || req.description}</span>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-bold border border-emerald-500/20">
                    PASSED IEEE 830
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
