import React from 'react';
import { 
  GitMerge, 
  Users, 
  ListOrdered, 
  AlertCircle, 
  Link2, 
  Sparkles, 
  CheckSquare 
} from 'lucide-react';
import { useProject } from '../../context/ProjectContext';

export const ModuleUseCases: React.FC = () => {
  const { currentProject } = useProject();

  if (!currentProject) return null;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="glass-card p-6 rounded-2xl border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-cyan-400 text-xs font-bold mb-1">
            <GitMerge className="h-4 w-4" />
            <span>MODULE 7 & 8 • TEXTUAL USE CASE & ACCEPTANCE SPECIFICATION</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white font-mono">Textual Use Cases & Scenario Flows</h1>
          <p className="text-xs text-slate-300 mt-1">
            Generate formal textual use cases outlining primary actors, system preconditions, postconditions, main success flows, alternative branch paths, and error exceptions.
          </p>
        </div>
      </div>

      {/* Use Cases Cards */}
      {currentProject.useCases.length === 0 ? (
        <div className="glass-card p-8 rounded-2xl border border-white/10 text-center">
          <p className="text-xs text-slate-400">No use cases generated yet. Extract requirements first.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {currentProject.useCases.map(uc => (
            <div key={uc.id} className="glass-card p-6 rounded-2xl border border-white/10 space-y-4">
              
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-mono font-bold text-cyan-400">{uc.id}</span>
                  <h3 className="text-sm font-bold text-white">{uc.title}</h3>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-mono font-bold border border-cyan-500/30">
                  REF: {uc.requirementId || 'REQ-SYS'}
                </span>
              </div>

              {/* Meta Stats: Actors, Pre, Post */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div className="bg-black/40 p-3 rounded-xl border border-white/5">
                  <div className="flex items-center space-x-1.5 text-cyan-400 font-bold text-[11px] mb-1">
                    <Users className="h-3.5 w-3.5" />
                    <span>Primary Actors</span>
                  </div>
                  <p className="text-slate-300">{uc.actors.join(', ')}</p>
                </div>

                <div className="bg-black/40 p-3 rounded-xl border border-white/5">
                  <div className="flex items-center space-x-1.5 text-purple-400 font-bold text-[11px] mb-1">
                    <CheckSquare className="h-3.5 w-3.5" />
                    <span>Preconditions</span>
                  </div>
                  <ul className="list-disc list-inside text-slate-300 space-y-0.5 text-[11px]">
                    {uc.preconditions.map((p, i) => <li key={i}>{p}</li>)}
                  </ul>
                </div>

                <div className="bg-black/40 p-3 rounded-xl border border-white/5">
                  <div className="flex items-center space-x-1.5 text-emerald-400 font-bold text-[11px] mb-1">
                    <CheckSquare className="h-3.5 w-3.5" />
                    <span>Postconditions</span>
                  </div>
                  <ul className="list-disc list-inside text-slate-300 space-y-0.5 text-[11px]">
                    {uc.postconditions.map((p, i) => <li key={i}>{p}</li>)}
                  </ul>
                </div>
              </div>

              {/* Main Success Flow Steps */}
              <div className="bg-surface/60 p-4 rounded-xl border border-white/5">
                <div className="flex items-center space-x-1.5 text-white font-bold text-xs mb-2">
                  <ListOrdered className="h-4 w-4 text-cyan-400" />
                  <span>Main Success Scenario (Basic Flow)</span>
                </div>
                <div className="space-y-1.5 pl-2 border-l-2 border-cyan-500/40 text-xs text-slate-200 font-mono">
                  {uc.mainFlow.map((step, idx) => (
                    <p key={idx} className="leading-relaxed">{step}</p>
                  ))}
                </div>
              </div>

              {/* Alternative & Exception Flows */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="bg-amber-500/5 p-3.5 rounded-xl border border-amber-500/20">
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block mb-1">Alternative Branch Flow</span>
                  {uc.alternativeFlow.map((alt, i) => (
                    <p key={i} className="text-slate-300 font-mono">{alt}</p>
                  ))}
                </div>

                <div className="bg-red-500/5 p-3.5 rounded-xl border border-red-500/20">
                  <span className="text-[10px] font-bold text-red-400 uppercase tracking-wider block mb-1">Exception Handling Flow</span>
                  {uc.exceptions.map((exc, i) => (
                    <p key={i} className="text-slate-300 font-mono">{exc}</p>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};
