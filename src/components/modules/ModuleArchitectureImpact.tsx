import React, { useState } from 'react';
import { 
  Cpu, 
  Server, 
  Database, 
  Layers, 
  ArrowRight, 
  AlertTriangle, 
  CheckCircle2, 
  Activity,
  Zap,
  ShieldAlert,
  Boxes
} from 'lucide-react';
import { useProject } from '../../context/ProjectContext';
import { AIEngine } from '../../services/aiEngine';

export const ModuleArchitectureImpact: React.FC = () => {
  const { currentProject } = useProject();
  const [selectedReqId, setSelectedReqId] = useState<string>('');

  if (!currentProject) return null;

  const chains = AIEngine.generateArchitectureImpact(currentProject.requirements);
  const activeChain = chains.find(c => c.reqId === selectedReqId) || chains[0];

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="glass-card p-6 sm:p-8 rounded-2xl border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <div className="flex items-center space-x-2 text-cyan-400 text-xs font-bold font-mono mb-2">
            <Cpu className="h-4 w-4" />
            <span>ACADEMIC SE TOOL • ARCHITECTURE IMPACT ANALYZER</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white font-sans tracking-tight">Requirement → Architecture Impact Map</h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-3xl leading-relaxed font-light">
            Pinpoint exact downstream blast radius when a requirement changes: tracing from <strong className="text-cyan-300 font-mono">Functional Requirement → Microservice Component → Database Entity → Downstream API Services → Affected QA Test Cases</strong>.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-3.5 py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-mono font-bold flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-purple-400 animate-ping" />
            Active Domain: {currentProject.domain}
          </span>
        </div>
      </div>

      {/* Main Impact Explorer */}
      <div className="glass-card p-6 sm:p-8 rounded-2xl border border-white/10 space-y-8">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <h3 className="text-sm font-bold text-white font-mono flex items-center gap-2">
            <Zap className="h-4 w-4 text-cyan-400" />
            <span>Select Requirement to Trace System Architecture Blast Radius</span>
          </h3>
        </div>

        {/* Requirements Selection Ribbon */}
        <div className="flex items-center gap-3 overflow-x-auto pb-2">
          {chains.map((chain) => {
            const isSelected = activeChain?.reqId === chain.reqId;
            return (
              <button
                key={chain.reqId}
                onClick={() => setSelectedReqId(chain.reqId)}
                className={`px-4 py-2.5 rounded-xl font-mono text-xs whitespace-nowrap transition-all duration-300 border flex items-center gap-2.5 cursor-pointer ${
                  isSelected
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-neon-cyan scale-105'
                    : 'bg-surface/60 border-white/10 text-slate-400 hover:text-slate-200 hover:border-white/20'
                }`}
              >
                <span className="h-2 w-2 rounded-full bg-cyan-400" />
                <span className="font-bold">{chain.reqId}</span>
                <span className="text-[11px] truncate max-w-[130px]">{chain.reqTitle}</span>
              </button>
            );
          })}
        </div>

        {/* Architecture Blast Radius Pipeline */}
        {activeChain && (
          <div className="p-6 sm:p-8 rounded-2xl bg-black/90 border border-cyan-500/40 shadow-neon-cyan space-y-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-2">
                <Boxes className="h-4 w-4 text-cyan-400" />
                <span>DOWNSTREAM ARCHITECTURAL BLAST RADIUS TRACE</span>
              </span>
              <span className="px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40">
                Impact Severity: {activeChain.impactSeverity}
              </span>
            </div>

            {/* 4 Impact Nodes - Engineered with clean padding, min-w-0, and overflow protection */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              
              {/* Node 1: Requirement */}
              <div className="p-5 rounded-2xl bg-cyan-950/60 border border-cyan-400 text-center space-y-3 shadow-neon-cyan min-w-0 overflow-hidden flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-cyan-500/20 text-cyan-300 font-bold inline-block uppercase tracking-wider">
                    1. CHANGED REQ
                  </span>
                  <h4 className="text-sm font-bold text-white font-mono">{activeChain.reqId}</h4>
                  <p className="text-xs text-slate-200 leading-snug line-clamp-3 px-1">{activeChain.reqTitle}</p>
                </div>
                <div className="pt-2 border-t border-cyan-500/20 text-[10px] font-mono text-cyan-300">
                  Origin Requirement
                </div>
              </div>

              {/* Node 2: Microservice */}
              <div className="p-5 rounded-2xl bg-blue-950/60 border border-blue-400 text-center space-y-3 shadow-neon-blue min-w-0 overflow-hidden flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-blue-500/20 text-blue-300 font-bold inline-block uppercase tracking-wider">
                    2. MICROSERVICE
                  </span>
                  <h4 className="text-xs font-bold text-white font-mono break-words leading-tight px-1">{activeChain.microservice}</h4>
                  <p className="text-[11px] text-slate-300">Target execution kernel</p>
                </div>
                <div className="pt-2 border-t border-blue-500/20 text-[10px] font-mono text-blue-300">
                  gRPC / REST Interface
                </div>
              </div>

              {/* Node 3: Database Store (Proper word-break and overflow protection) */}
              <div className="p-5 rounded-2xl bg-purple-950/60 border border-purple-400 text-center space-y-3 shadow-neon-purple min-w-0 overflow-hidden flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-purple-500/20 text-purple-300 font-bold inline-block uppercase tracking-wider">
                    3. DATABASE ENTITY
                  </span>
                  <h4 className="text-xs font-bold text-purple-200 font-mono break-all leading-tight px-1 bg-black/40 py-1.5 rounded-lg border border-purple-500/30">
                    {activeChain.databaseTable}
                  </h4>
                  <p className="text-[11px] text-slate-300">AES-256 encrypted schema</p>
                </div>
                <div className="pt-2 border-t border-purple-500/20 text-[10px] font-mono text-purple-300">
                  PostgreSQL Table
                </div>
              </div>

              {/* Node 4: Downstream Services & Tests */}
              <div className="p-5 rounded-2xl bg-emerald-950/60 border border-emerald-400 text-center space-y-3 shadow-neon-emerald min-w-0 overflow-hidden flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-300 font-bold inline-block uppercase tracking-wider">
                    4. RE-TEST SUITES
                  </span>
                  <h4 className="text-sm font-bold text-white font-mono">{activeChain.affectedTests.length} Test Suites</h4>
                  <p className="text-[11px] text-slate-300">Automated QA regressions</p>
                </div>
                <div className="pt-2 border-t border-emerald-500/20 text-[10px] font-mono text-emerald-300">
                  100% Pass Required
                </div>
              </div>

            </div>

            {/* Affected Downstream Webhooks & Test IDs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 font-mono text-xs pt-4 border-t border-white/10">
              <div className="p-5 rounded-xl bg-surface/80 border border-white/10 space-y-3">
                <span className="text-cyan-400 font-bold flex items-center gap-2">
                  <Server className="h-4 w-4 text-cyan-400" />
                  <span>Downstream Webhook Adapters Impacted:</span>
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeChain.downstreamServices.map((svc, i) => (
                    <span key={i} className="px-3 py-1.5 rounded-lg bg-black/70 border border-white/15 text-slate-200 text-xs">
                      • {svc}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-5 rounded-xl bg-surface/80 border border-white/10 space-y-3">
                <span className="text-emerald-400 font-bold flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <span>Required Regression Test Case IDs:</span>
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeChain.affectedTests.map((testId, i) => (
                    <span key={i} className="px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold">
                      ✓ {testId}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
