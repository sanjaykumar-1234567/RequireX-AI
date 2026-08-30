import React, { useState } from 'react';
import { 
  Boxes, 
  Sparkles, 
  Layers, 
  CheckCircle2, 
  ArrowRight, 
  Calendar, 
  Clock, 
  Zap,
  Gauge
} from 'lucide-react';
import { useProject } from '../../context/ProjectContext';
import { AIEngine } from '../../services/aiEngine';

export const ModuleReleasePlanner: React.FC = () => {
  const { currentProject } = useProject();
  const [totalCapacity, setTotalCapacity] = useState<number>(100);

  if (!currentProject) return null;

  const sprintProposals = AIEngine.generateSprintPlans(currentProject.requirements, currentProject.userStories);

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="glass-card p-6 sm:p-8 rounded-2xl border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <div className="flex items-center space-x-2 text-cyan-400 text-xs font-bold font-mono mb-2">
            <Boxes className="h-4 w-4" />
            <span>AGILE SE ENGINE • CAPACITY-BASED SPRINT & STORY POINT PLANNER</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white font-sans tracking-tight">AI Agile Release & Sprint Planner</h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-3xl leading-relaxed font-light">
            AI automatically packages requirements into 3-sprint release cadences respecting story point capacity budgets and technical dependencies for <strong className="text-cyan-300 font-mono">{currentProject.name}</strong>.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-surface/80 p-3 rounded-2xl border border-white/10">
          <Gauge className="h-5 w-5 text-cyan-400" />
          <div className="text-right">
            <span className="text-[10px] font-mono text-slate-400 block">Total Release Velocity</span>
            <span className="text-base font-bold font-mono text-cyan-300">{totalCapacity} Story Points</span>
          </div>
        </div>
      </div>

      {/* Sprints Cadence Board */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sprintProposals.map((sprint, idx) => {
          const isSprint1 = idx === 0;
          const isSprint2 = idx === 1;

          const neon = isSprint1 ? 'neon-card-cyan' : isSprint2 ? 'neon-card-blue' : 'neon-card-purple';
          const progressPercent = Math.round((sprint.assignedPoints / sprint.capacityPoints) * 100);

          return (
            <div key={idx} className={`glass-card ${neon} p-6 sm:p-8 rounded-2xl border border-white/10 space-y-6 flex flex-col justify-between`}>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold font-mono text-cyan-400">SPRINT {idx + 1}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-white/5 border border-white/10 text-slate-300">
                    Risk: {sprint.riskRating}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white font-sans">{sprint.sprint}</h3>

                {/* Capacity Budget Meter */}
                <div className="p-3.5 rounded-xl bg-black/60 border border-white/10 space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400">Points Allocated:</span>
                    <span className="font-bold text-cyan-300">{sprint.assignedPoints} / {sprint.capacityPoints} pts</span>
                  </div>
                  <div className="w-full h-2 bg-black/80 rounded-full overflow-hidden border border-white/10">
                    <div 
                      className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>

                {/* Allocated Requirements */}
                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-slate-400 uppercase font-mono block">Allocated User Stories:</span>
                  {sprint.requirements.map((req) => (
                    <div key={req.id} className="p-3 rounded-xl bg-surface/80 border border-white/10 flex items-center justify-between text-xs font-mono">
                      <div className="truncate pr-2">
                        <span className="text-cyan-400 font-bold mr-1.5">{req.id}:</span>
                        <span className="text-slate-300">{req.title}</span>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 text-[10px] font-bold whitespace-nowrap">
                        {req.points} pts
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technical Prerequisites */}
              <div className="pt-4 border-t border-white/10 space-y-1.5 font-mono text-[11px]">
                <span className="text-slate-400 font-bold block text-[10px] uppercase">Prerequisites & Blockers:</span>
                {sprint.dependencies.map((dep, dIdx) => (
                  <p key={dIdx} className="text-slate-300 flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                    <span>{dep}</span>
                  </p>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
