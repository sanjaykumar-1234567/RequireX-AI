import React from 'react';
import { 
  BookOpenCheck, 
  Sparkles, 
  Layers, 
  CheckCircle2, 
  User, 
  Target, 
  Award,
  RefreshCw
} from 'lucide-react';
import { useProject } from '../../context/ProjectContext';

export const ModuleUserStories: React.FC = () => {
  const { currentProject, regenerateArtifacts } = useProject();

  if (!currentProject) return null;

  const totalPoints = currentProject.userStories.reduce((acc, s) => acc + s.storyPoints, 0);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="glass-card p-6 rounded-2xl border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-cyan-400 text-xs font-bold mb-1">
            <BookOpenCheck className="h-4 w-4" />
            <span>MODULE 6 • AGILE USER STORY GENERATOR</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white font-mono">Agile User Story Board</h1>
          <p className="text-xs text-slate-300 mt-1">
            Automatically transform IEEE specifications into Agile User Stories formatted as "As a... I want to... So that...". Includes Fibonacci story estimation points, acceptance criteria checklists, and Definition of Done standards.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="text-right bg-surface/80 px-3 py-1.5 rounded-xl border border-white/10">
            <p className="text-[10px] text-slate-400">Total Velocity Points</p>
            <p className="text-lg font-bold font-mono text-cyan-400">{totalPoints} pts</p>
          </div>

          <button
            onClick={regenerateArtifacts}
            className="p-2.5 rounded-xl bg-surface hover:bg-surface-hover text-cyan-400 border border-white/10 transition"
            title="Resynthesize User Stories"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* User Stories Cards */}
      {currentProject.userStories.length === 0 ? (
        <div className="glass-card p-8 rounded-2xl border border-white/10 text-center">
          <p className="text-xs text-slate-400">No user stories available. Extract or add requirements first.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {currentProject.userStories.map(us => (
            <div key={us.id} className="glass-card p-6 rounded-2xl border border-white/10 space-y-4 relative group hover:border-cyan-500/40 transition">
              
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-mono font-bold text-cyan-400">{us.id}</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-mono font-bold border border-purple-500/30">
                    {us.storyPoints} Story Pts
                  </span>
                </div>

                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${us.priority === 'Critical' ? 'bg-red-500/20 text-red-400' : 'bg-blue-500/20 text-blue-400'}`}>
                  {us.priority} Priority
                </span>
              </div>

              {/* User Story Triple Statement */}
              <div className="bg-black/50 p-4 rounded-xl border border-white/5 space-y-2 text-xs">
                <div className="flex items-start space-x-2">
                  <User className="h-4 w-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <p><span className="font-bold text-cyan-300">As a</span> <span className="text-white font-medium">{us.asA}</span></p>
                </div>
                <div className="flex items-start space-x-2">
                  <Target className="h-4 w-4 text-blue-400 flex-shrink-0 mt-0.5" />
                  <p><span className="font-bold text-blue-300">I want to</span> <span className="text-white font-medium">{us.iWantTo}</span></p>
                </div>
                <div className="flex items-start space-x-2">
                  <Award className="h-4 w-4 text-purple-400 flex-shrink-0 mt-0.5" />
                  <p><span className="font-bold text-purple-300">So that</span> <span className="text-white font-medium">{us.soThat}</span></p>
                </div>
              </div>

              {/* Acceptance Criteria Checklist */}
              <div>
                <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block mb-2">Given / When / Then Acceptance Criteria</span>
                <div className="space-y-1.5">
                  {us.acceptanceCriteria.map((ac, idx) => (
                    <div key={idx} className="flex items-start space-x-2 text-[11px] text-slate-300 bg-surface/50 p-2 rounded-lg border border-white/5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span className="leading-tight">{ac}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Definition of Done */}
              <div className="border-t border-white/10 pt-3">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Definition of Done (DoD)</span>
                <div className="flex flex-wrap gap-1.5">
                  {us.definitionOfDone.map((dod, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-white/5 text-[10px] text-slate-400 border border-white/5">
                      ✓ {dod}
                    </span>
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
