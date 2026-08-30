import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  CheckSquare, 
  Plus, 
  Layers, 
  ShieldAlert, 
  CheckCircle2 
} from 'lucide-react';
import { useProject } from '../../context/ProjectContext';
import { RecommendedRequirement } from '../../types';

export const ModuleDomainRecommendations: React.FC = () => {
  const { currentProject, addRecommendedRequirements } = useProject();
  
  const [recommendations, setRecommendations] = useState<RecommendedRequirement[]>(() => {
    return currentProject?.recommendedRequirements || [];
  });

  useEffect(() => {
    if (currentProject) {
      setRecommendations(currentProject.recommendedRequirements || []);
    }
  }, [currentProject?.id, currentProject?.domain]);

  if (!currentProject) return null;

  const toggleSelect = (id: string) => {
    setRecommendations(prev => prev.map(rec => rec.id === id ? { ...rec, selected: !rec.selected } : rec));
  };

  const selectAll = () => {
    setRecommendations(prev => prev.map(rec => ({ ...rec, selected: true })));
  };

  const deselectAll = () => {
    setRecommendations(prev => prev.map(rec => ({ ...rec, selected: false })));
  };

  const handleImportSelected = () => {
    const selected = recommendations.filter(r => r.selected);
    if (selected.length === 0) return;
    addRecommendedRequirements(selected);
    // Mark imported
    setRecommendations(prev => prev.filter(r => !r.selected));
  };

  const selectedCount = recommendations.filter(r => r.selected).length;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="glass-card p-6 rounded-2xl border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-cyan-400 text-xs font-bold mb-1">
            <Sparkles className="h-4 w-4" />
            <span>MODULE 5 • DOMAIN-BASED MISSING REQUIREMENT RECOMMENDER</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white font-mono">Missing Requirement Recommendations</h1>
          <p className="text-xs text-slate-300 mt-1">
            RequireX AI analyzes your selected project domain (<span className="text-cyan-400 font-semibold">{currentProject.domain}</span>) to recommend essential security, administrative, compliance, and performance requirements you may have missed.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={selectAll}
            className="px-3 py-1.5 rounded-lg bg-surface hover:bg-surface-hover text-slate-300 text-xs font-semibold border border-white/10"
          >
            Select All
          </button>
          <button
            onClick={deselectAll}
            className="px-3 py-1.5 rounded-lg bg-surface hover:bg-surface-hover text-slate-300 text-xs font-semibold border border-white/10"
          >
            Deselect
          </button>
          <button
            onClick={handleImportSelected}
            disabled={selectedCount === 0}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-50 text-black font-bold text-xs shadow-neon-cyan transition flex items-center space-x-1.5"
          >
            <Plus className="h-4 w-4" />
            <span>Import Selected ({selectedCount})</span>
          </button>
        </div>
      </div>

      {/* Recommendations Cards Grid */}
      {recommendations.length === 0 ? (
        <div className="glass-card p-10 rounded-2xl border border-white/10 text-center">
          <CheckCircle2 className="h-12 w-12 text-emerald-400 mx-auto mb-3" />
          <h3 className="text-base font-bold text-white">All Recommended Domain Features Imported</h3>
          <p className="text-xs text-slate-400 mt-1">Your project inventory contains all key architectural features for {currentProject.domain}.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recommendations.map(rec => (
            <div
              key={rec.id}
              onClick={() => toggleSelect(rec.id)}
              className={`glass-card p-5 rounded-2xl border cursor-pointer transition duration-200 ${
                rec.selected
                  ? 'bg-gradient-to-r from-cyan-500/15 via-blue-500/10 to-transparent border-cyan-500/50 shadow-neon-cyan'
                  : 'border-white/10 hover:border-white/20'
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={rec.selected}
                    onChange={() => toggleSelect(rec.id)}
                    className="h-4 w-4 rounded border-white/20 bg-black/40 text-cyan-500 focus:ring-cyan-400 cursor-pointer"
                  />
                  <div>
                    <span className="text-xs font-mono font-bold text-cyan-400 mr-2">{rec.id}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-white/5 text-slate-300 border border-white/10">{rec.category}</span>
                  </div>
                </div>

                <span className="text-[10px] text-slate-400 font-mono">Domain: {rec.domain}</span>
              </div>

              <h4 className="text-sm font-bold text-white mb-1 pl-7">{rec.title}</h4>
              <p className="text-xs text-slate-300 pl-7 leading-relaxed">{rec.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
