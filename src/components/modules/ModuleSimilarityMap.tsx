import React, { useState } from 'react';
import { 
  Network, 
  Sparkles, 
  Lock, 
  Zap, 
  ShieldCheck, 
  CopyCheck, 
  ArrowRight,
  GitBranch
} from 'lucide-react';
import { useProject } from '../../context/ProjectContext';
import { AIEngine } from '../../services/aiEngine';

export const ModuleSimilarityMap: React.FC = () => {
  const { currentProject } = useProject();
  const [selectedClusterIndex, setSelectedClusterIndex] = useState<number>(0);

  if (!currentProject) return null;

  const clusters = AIEngine.generateSemanticClusters(currentProject.requirements);
  const activeCluster = clusters[selectedClusterIndex] || clusters[0];

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="glass-card p-6 sm:p-8 rounded-2xl border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <div className="flex items-center space-x-2 text-cyan-400 text-xs font-bold font-mono mb-2">
            <Network className="h-4 w-4" />
            <span>INNOVATIVE SE TOOL • SEMANTIC SIMILARITY & DUPLICATE CLUSTERING</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white font-sans tracking-tight">Requirement Similarity Map</h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-3xl leading-relaxed font-light">
            AI clusters semantically related requirements into cohesive architectural domains using vector similarity scores (e.g. 89% similarity) to prevent functional duplication for <strong className="text-cyan-300 font-mono">{currentProject.name}</strong>.
          </p>
        </div>
      </div>

      {/* Cluster Navigation & Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {clusters.map((cluster, idx) => {
          const isSelected = selectedClusterIndex === idx;
          const neonClass = idx === 0 ? 'neon-card-cyan' : idx === 1 ? 'neon-card-blue' : 'neon-card-purple';

          return (
            <div
              key={idx}
              onClick={() => setSelectedClusterIndex(idx)}
              className={`glass-card ${neonClass} p-6 sm:p-8 rounded-2xl border cursor-pointer transition-all duration-300 space-y-4 ${
                isSelected ? 'ring-2 ring-cyan-400 scale-[1.02]' : 'border-white/10'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold font-mono text-cyan-400">CLUSTER {idx + 1}</span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-white/5 border border-white/10 text-slate-300">
                  {cluster.requirements.length} Nodes
                </span>
              </div>

              <h3 className="text-base font-bold text-white font-sans">{cluster.clusterName}</h3>
              <p className="text-xs text-slate-400 font-light font-mono leading-relaxed">{cluster.primaryInsight}</p>
            </div>
          );
        })}
      </div>

      {/* Active Cluster Semantic Inspector */}
      {activeCluster && (
        <div className="glass-card p-6 sm:p-8 rounded-2xl border border-cyan-500/40 shadow-neon-cyan space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h3 className="text-base font-bold text-white font-mono flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-cyan-400" />
              <span>Semantic Affinity Inspector: {activeCluster.clusterName}</span>
            </h3>
            <span className="text-xs font-mono text-cyan-300">Cosine Distance & NLP Match</span>
          </div>

          <div className="space-y-4 font-mono text-xs">
            {activeCluster.requirements.map((req, rIdx) => (
              <div key={rIdx} className="p-4 rounded-xl bg-black/70 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center space-x-3">
                  <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold text-[11px]">{req.id}</span>
                  <span className="text-slate-200 text-sm font-sans">{req.title}</span>
                </div>

                <div className="flex items-center space-x-3 self-end sm:self-auto">
                  <div className="w-28 h-2 bg-black/80 rounded-full overflow-hidden border border-white/10">
                    <div 
                      className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
                      style={{ width: `${req.similarityScore}%` }}
                    />
                  </div>
                  <span className="text-xs font-bold text-cyan-400 whitespace-nowrap">{req.similarityScore}% Match</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
