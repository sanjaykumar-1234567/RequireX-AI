import React from 'react';
import { 
  Milestone, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  Layers, 
  Sparkles,
  Zap
} from 'lucide-react';
import { useProject } from '../../context/ProjectContext';
import { AIEngine } from '../../services/aiEngine';

export const ModuleRoadmapTimeline: React.FC = () => {
  const { currentProject } = useProject();

  if (!currentProject) return null;

  const releases = AIEngine.generateRoadmap(currentProject.requirements, currentProject.userStories);

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="glass-card p-6 sm:p-8 rounded-2xl border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <div className="flex items-center space-x-2 text-purple-400 text-xs font-bold font-mono mb-2">
            <Milestone className="h-4 w-4" />
            <span>INNOVATIVE SE TOOL • REQUIREMENTS RELEASE ROADMAP & TIMELINE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white font-sans tracking-tight">Requirements Release Roadmap</h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-3xl leading-relaxed font-light">
            Sequence prioritized requirements across <strong className="text-cyan-300 font-mono">Release 1 (Must Have), Release 2 (Should Have), and Release 3 (Could Have)</strong> milestones for <strong className="text-cyan-300 font-mono">{currentProject.name}</strong>.
          </p>
        </div>
      </div>

      {/* Visual Roadmap Releases Timeline */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {releases.map((rel, idx) => {
          const isR1 = idx === 0;
          const isR2 = idx === 1;

          const neonClass = isR1 ? 'neon-card-cyan' : isR2 ? 'neon-card-purple' : 'neon-card-emerald';
          const badgeColor = isR1 ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' : isR2 ? 'bg-purple-500/20 text-purple-300 border-purple-500/40' : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';

          return (
            <div key={idx} className={`glass-card ${neonClass} p-6 sm:p-8 rounded-2xl border border-white/10 space-y-6 flex flex-col justify-between`}>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold font-mono border ${badgeColor}`}>
                    {rel.moscow}
                  </span>
                  <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {rel.totalStoryPoints} Story Pts
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white font-sans">{rel.release}</h3>
                  <p className="text-xs text-slate-400 font-mono mt-1 flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-cyan-400" />
                    {rel.timeline}
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-white/10">
                  <span className="text-[11px] font-bold text-slate-400 uppercase font-mono block">Milestone Backlog Items:</span>
                  {rel.requirements.map((reqText, rIdx) => (
                    <div key={rIdx} className="p-3 rounded-xl bg-surface/80 border border-white/10 flex items-start space-x-2 text-xs font-mono text-slate-200">
                      <CheckCircle2 className="h-4 w-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span className="leading-snug">{reqText}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">Release Readiness</span>
                  <span className="font-bold text-emerald-400">{rel.readiness}%</span>
                </div>
                <div className="w-full h-2 bg-black/60 rounded-full overflow-hidden border border-white/10">
                  <div 
                    className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 rounded-full"
                    style={{ width: `${rel.readiness}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
