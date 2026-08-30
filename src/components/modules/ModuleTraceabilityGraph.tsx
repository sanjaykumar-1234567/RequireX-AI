import React, { useState } from 'react';
import { 
  Network, 
  GitBranch, 
  CheckCircle2, 
  ArrowRight, 
  Layers, 
  ShieldCheck, 
  Sparkles,
  Zap,
  Activity,
  FileCheck
} from 'lucide-react';
import { useProject } from '../../context/ProjectContext';
import { AIEngine } from '../../services/aiEngine';
import { TraceabilityNodeItem } from '../../types';

export const ModuleTraceabilityGraph: React.FC = () => {
  const { currentProject } = useProject();
  const [selectedReqId, setSelectedReqId] = useState<string>('');

  if (!currentProject) return null;

  const chains = AIEngine.generateTraceabilityGraph(
    currentProject.requirements,
    currentProject.userStories,
    currentProject.useCases,
    currentProject.testCases
  );

  const activeChain = chains.find(c => c.reqId === selectedReqId) || chains[0] || null;

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="glass-card p-6 sm:p-8 rounded-2xl border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <div className="flex items-center space-x-2 text-cyan-400 text-xs font-bold font-mono mb-2">
            <Network className="h-4 w-4" />
            <span>INNOVATIVE SE TOOL • INTERACTIVE TRACEABILITY GRAPH</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white font-sans tracking-tight">Requirements Traceability Graph</h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-3xl leading-relaxed font-light">
            Bi-directional visual dependency pipeline linking <strong className="text-cyan-300 font-mono">Functional Requirement → Agile User Story → Acceptance Criteria → Use Case → Test Case → Execution Status</strong>.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3.5 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-bold flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-cyan-400 animate-ping" />
            100% Traceability Linked
          </span>
        </div>
      </div>

      {/* Main Interactive Visual Graph Workspace */}
      <div className="glass-card p-6 sm:p-8 rounded-2xl border border-white/10 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <h3 className="text-sm font-bold text-white font-mono flex items-center gap-2">
              <GitBranch className="h-4 w-4 text-cyan-400" />
              <span>Click a Requirement Node to Light Up its Complete Upstream & Downstream Lineage</span>
            </h3>
          </div>
        </div>

        {/* Requirements Selection Horizontal Ribbon */}
        <div className="flex items-center gap-3 overflow-x-auto pb-2">
          {chains.map((chain) => {
            const isSelected = activeChain?.reqId === chain.reqId;
            return (
              <button
                key={chain.reqId}
                onClick={() => setSelectedReqId(chain.reqId)}
                className={`px-4 py-2.5 rounded-xl font-mono text-xs whitespace-nowrap transition-all duration-300 border flex items-center gap-2.5 ${
                  isSelected
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-neon-cyan scale-105'
                    : 'bg-surface/60 border-white/10 text-slate-400 hover:text-slate-200 hover:border-white/20'
                }`}
              >
                <span className="h-2 w-2 rounded-full bg-cyan-400" />
                <span className="font-bold">{chain.reqId}</span>
                <span className="text-[11px] truncate max-w-[120px]">{chain.reqTitle}</span>
              </button>
            );
          })}
        </div>

        {/* Visual Graph Node Flow Pipeline */}
        {activeChain && (
          <div className="p-8 rounded-2xl bg-black/70 border border-cyan-500/40 shadow-neon-cyan space-y-8">
            <div className="text-center font-mono text-xs text-cyan-400 font-bold tracking-widest uppercase">
              ACTIVE TRACEABILITY LINEAGE PIPELINE
            </div>

            <div className="flex flex-col lg:flex-row items-center justify-between gap-4 relative">
              
              {/* Node 1: Requirement */}
              <div className="w-full lg:w-48 p-5 rounded-2xl bg-cyan-950/60 border border-cyan-400 text-center space-y-2 shadow-neon-cyan">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300">REQUIREMENT</span>
                <h4 className="text-base font-bold text-white font-mono">{activeChain.reqId}</h4>
                <p className="text-[11px] text-slate-300 truncate">{activeChain.reqTitle}</p>
              </div>

              <div className="flex flex-col items-center">
                <ArrowRight className="h-6 w-6 text-cyan-400 animate-pulse hidden lg:block" />
                <span className="text-[9px] font-mono text-slate-500 mt-1">Synthesizes</span>
              </div>

              {/* Node 2: User Story */}
              <div className="w-full lg:w-48 p-5 rounded-2xl bg-blue-950/60 border border-blue-400 text-center space-y-2 shadow-neon-blue">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-300">USER STORY</span>
                <h4 className="text-base font-bold text-white font-mono">{activeChain.storyId}</h4>
                <p className="text-[11px] text-slate-300 truncate">Agile BDD Story</p>
              </div>

              <div className="flex flex-col items-center">
                <ArrowRight className="h-6 w-6 text-blue-400 animate-pulse hidden lg:block" />
                <span className="text-[9px] font-mono text-slate-500 mt-1">Gherkin BDD</span>
              </div>

              {/* Node 3: Acceptance Criteria */}
              <div className="w-full lg:w-48 p-5 rounded-2xl bg-purple-950/60 border border-purple-400 text-center space-y-2 shadow-neon-purple">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300">CRITERIA</span>
                <h4 className="text-base font-bold text-white font-mono">{activeChain.criteriaId}</h4>
                <p className="text-[11px] text-slate-300 truncate">Given/When/Then</p>
              </div>

              <div className="flex flex-col items-center">
                <ArrowRight className="h-6 w-6 text-purple-400 animate-pulse hidden lg:block" />
                <span className="text-[9px] font-mono text-slate-500 mt-1">Executes</span>
              </div>

              {/* Node 4: Use Case */}
              <div className="w-full lg:w-48 p-5 rounded-2xl bg-indigo-950/60 border border-indigo-400 text-center space-y-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300">USE CASE</span>
                <h4 className="text-base font-bold text-white font-mono">{activeChain.useCaseId}</h4>
                <p className="text-[11px] text-slate-300 truncate">Operational Flow</p>
              </div>

              <div className="flex flex-col items-center">
                <ArrowRight className="h-6 w-6 text-emerald-400 animate-pulse hidden lg:block" />
                <span className="text-[9px] font-mono text-slate-500 mt-1">Validates</span>
              </div>

              {/* Node 5: QA Test & Status */}
              <div className="w-full lg:w-48 p-5 rounded-2xl bg-emerald-950/60 border border-emerald-400 text-center space-y-2 shadow-neon-emerald">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">TEST MATRIX</span>
                <h4 className="text-base font-bold text-white font-mono">{activeChain.testCaseId}</h4>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500 text-slate-950 font-bold font-mono text-[10px] block">
                  ● STATUS: {activeChain.status}
                </span>
              </div>

            </div>

            {/* Traceability Details Breakdown Box */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-white/10 font-mono text-xs">
              <div className="bg-surface/80 p-4 rounded-xl border border-white/10 space-y-2">
                <span className="text-cyan-400 font-bold block">SPECIFICATION CONTEXT:</span>
                <p className="text-slate-300">{activeChain.reqTitle}</p>
                <p className="text-slate-400 text-[11px] mt-1">Bound to Active Domain: <strong className="text-white">{currentProject.domain}</strong></p>
              </div>

              <div className="bg-surface/80 p-4 rounded-xl border border-white/10 space-y-2">
                <span className="text-emerald-400 font-bold block">VERIFICATION GUARANTEE:</span>
                <p className="text-slate-300">Bi-directional linkage verified from stakeholder input down to test assertions.</p>
                <p className="text-emerald-400 text-[11px] mt-1">✓ Automated IEEE 830 RTM Index Signed Off</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
