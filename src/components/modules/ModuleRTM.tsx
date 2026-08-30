import React from 'react';
import { 
  Network, 
  CheckCircle2, 
  AlertCircle, 
  HelpCircle, 
  GitMerge, 
  CheckSquare 
} from 'lucide-react';
import { useProject } from '../../context/ProjectContext';
import { AIEngine } from '../../services/aiEngine';

export const ModuleRTM: React.FC = () => {
  const { currentProject } = useProject();

  if (!currentProject) return null;

  const rtmData = AIEngine.generateRTM(currentProject.requirements, currentProject.useCases, currentProject.testCases);
  const coveredCount = rtmData.filter(r => r.status === 'Covered').length;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="glass-card p-6 rounded-2xl border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-cyan-400 text-xs font-bold mb-1">
            <Network className="h-4 w-4" />
            <span>MODULE 11 • REQUIREMENT TRACEABILITY MATRIX (RTM)</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white font-mono">Requirement Traceability Matrix</h1>
          <p className="text-xs text-slate-300 mt-1">
            Bi-directional mapping between requirements, textual use cases, and QA automated test suites to ensure 100% specification coverage without unverified features.
          </p>
        </div>

        <div className="flex items-center space-x-3 bg-surface/80 px-3 py-1.5 rounded-xl border border-white/10">
          <div className="text-right">
            <p className="text-[10px] text-slate-400">RTM Traceability Coverage</p>
            <p className="text-lg font-bold font-mono text-emerald-400">
              {Math.round((coveredCount / Math.max(rtmData.length, 1)) * 100)}% COVERED
            </p>
          </div>
        </div>
      </div>

      {/* RTM Table */}
      <div className="glass-card rounded-2xl border border-white/10 overflow-hidden">
        {rtmData.length === 0 ? (
          <p className="text-xs text-slate-400 text-center py-8">No requirements to map in RTM matrix.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-black/60 border-b border-white/10 text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-4">Req ID</th>
                  <th className="py-3.5 px-4">Requirement Specification</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Linked Use Case</th>
                  <th className="py-3.5 px-4">Linked Test Cases</th>
                  <th className="py-3.5 px-4">Coverage Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-sans">
                {rtmData.map(row => (
                  <tr key={row.requirementId} className="hover:bg-white/5 transition">
                    <td className="py-3.5 px-4 font-mono font-bold text-cyan-400">{row.requirementId}</td>
                    <td className="py-3.5 px-4 font-medium text-slate-200 max-w-sm">{row.requirementTitle}</td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded text-[10px] bg-white/5 text-slate-300 border border-white/10">
                        {row.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-cyan-300 font-bold">{row.useCaseId}</td>
                    <td className="py-3.5 px-4 font-mono text-slate-400">
                      {row.testCaseIds.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {row.testCaseIds.map(t => (
                            <span key={t} className="px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 text-[10px]">
                              {t}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-slate-500">None</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-1 rounded text-[10px] font-bold flex items-center gap-1 w-max ${
                        row.status === 'Covered' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                        'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      }`}>
                        <CheckCircle2 className="h-3 w-3" />
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
