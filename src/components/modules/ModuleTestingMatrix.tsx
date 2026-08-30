import React from 'react';
import { 
  CheckSquare, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Layers, 
  Flame,
  Zap
} from 'lucide-react';
import { useProject } from '../../context/ProjectContext';
import { AIEngine } from '../../services/aiEngine';

export const ModuleTestingMatrix: React.FC = () => {
  const { currentProject } = useProject();

  if (!currentProject) return null;

  const matrixRows = AIEngine.generateTestingMatrix(currentProject.requirements, currentProject.testCases);

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="glass-card p-6 sm:p-8 rounded-2xl border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <div className="flex items-center space-x-2 text-emerald-400 text-xs font-bold font-mono mb-2">
            <CheckSquare className="h-4 w-4" />
            <span>REQUIREMENTS + TESTING BRIDGE • MULTI-LEVEL TEST SUITE MATRIX</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white font-sans tracking-tight">Requirements Testing Matrix</h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-3xl leading-relaxed font-light">
            Audit test coverage across <strong className="text-cyan-300 font-mono">Unit, Integration, System, Security, and Performance</strong> test levels for each requirement in <strong className="text-cyan-300 font-mono">{currentProject.name}</strong>.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-right">
            <span className="text-[10px] font-mono text-slate-400 block">Overall Test Coverage</span>
            <span className="text-2xl font-black font-mono text-emerald-400">88%</span>
          </div>
        </div>
      </div>

      {/* Multi-Level Test Table Matrix */}
      <div className="glass-card p-6 sm:p-8 rounded-2xl border border-white/10 space-y-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="border-b border-white/10 text-slate-400 text-[11px] uppercase tracking-wider">
                <th className="pb-3 pr-4 font-bold">Requirement ID & Title</th>
                <th className="pb-3 px-3 text-center">Unit Test</th>
                <th className="pb-3 px-3 text-center">Integration</th>
                <th className="pb-3 px-3 text-center">System Test</th>
                <th className="pb-3 px-3 text-center">Security (WAF)</th>
                <th className="pb-3 px-3 text-center">Performance (Load)</th>
                <th className="pb-3 pl-4 text-right">Test Coverage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {matrixRows.map((row) => (
                <tr key={row.reqId} className="hover:bg-white/5 transition duration-150">
                  <td className="py-4 pr-4">
                    <span className="text-cyan-400 font-bold mr-2">{row.reqId}</span>
                    <span className="text-slate-200 font-sans font-medium">{row.reqTitle}</span>
                  </td>

                  <td className="py-4 px-3 text-center">
                    {row.unitTest ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 mx-auto" />
                    ) : (
                      <XCircle className="h-4 w-4 text-rose-500 mx-auto" />
                    )}
                  </td>

                  <td className="py-4 px-3 text-center">
                    {row.integrationTest ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 mx-auto" />
                    ) : (
                      <XCircle className="h-4 w-4 text-rose-500 mx-auto" />
                    )}
                  </td>

                  <td className="py-4 px-3 text-center">
                    {row.systemTest ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 mx-auto" />
                    ) : (
                      <XCircle className="h-4 w-4 text-rose-500 mx-auto" />
                    )}
                  </td>

                  <td className="py-4 px-3 text-center">
                    {row.securityTest ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 mx-auto" />
                    ) : (
                      <XCircle className="h-4 w-4 text-rose-500 mx-auto" />
                    )}
                  </td>

                  <td className="py-4 px-3 text-center">
                    {row.performanceTest ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 mx-auto" />
                    ) : (
                      <XCircle className="h-4 w-4 text-rose-500 mx-auto" />
                    )}
                  </td>

                  <td className="py-4 pl-4 text-right">
                    <span className={`px-2.5 py-1 rounded-full font-bold text-[11px] ${
                      row.overallCoverage === 100 
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' 
                        : row.overallCoverage >= 75 
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' 
                        : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                    }`}>
                      {row.overallCoverage}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
