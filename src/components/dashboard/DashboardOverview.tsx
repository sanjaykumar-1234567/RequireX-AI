import React from 'react';
import { 
  FileUp, 
  ShieldAlert, 
  BookOpenCheck, 
  CheckSquare, 
  FileSpreadsheet, 
  Sparkles, 
  Plus, 
  TrendingUp, 
  Clock, 
  Download, 
  CheckCircle2, 
  AlertTriangle,
  FolderGit2,
  Zap,
  Activity,
  Flame,
  Brain
} from 'lucide-react';
import { useProject } from '../../context/ProjectContext';
import { ExportService } from '../../services/exportService';

export const DashboardOverview: React.FC = () => {
  const { 
    currentProject, 
    projects, 
    selectProject, 
    setIsCreateProjectOpen, 
    setActiveTab 
  } = useProject();

  if (!currentProject) return null;

  const totalReqs = currentProject.requirements.length;
  const funcReqs = currentProject.requirements.filter(r => r.category === 'Functional').length;
  const nonFuncReqs = currentProject.requirements.filter(r => r.category !== 'Functional').length;
  const issuesCount = currentProject.requirements.reduce((acc, r) => acc + r.issues.length, 0);
  const storiesCount = currentProject.userStories.length;
  const testsCount = currentProject.testCases.length;
  const risksCount = currentProject.risks.length;

  const healthScore = totalReqs > 0 
    ? Math.max(0, Math.round(((totalReqs * 2 - issuesCount) / (totalReqs * 2)) * 100))
    : 100;

  const completionPercent = totalReqs > 0
    ? Math.min(100, Math.round(((totalReqs + storiesCount + testsCount) / (totalReqs * 3)) * 100))
    : 0;

  return (
    <div className="space-y-8">
      {/* Top Banner with Dark Violet Neon Accents (Matching Evaluation Lab Theme) */}
      <div className="glass-card neon-card-violet p-6 sm:p-8 rounded-2xl border border-violet-500/40 relative overflow-hidden shadow-neon-violet">
        <div className="absolute -top-12 -right-12 w-96 h-96 bg-violet-600/20 blur-3xl pointer-events-none rounded-full" />
        <div className="absolute -bottom-12 -left-12 w-96 h-96 bg-blue-600/15 blur-3xl pointer-events-none rounded-full" />
        <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-violet-400/10 blur-3xl pointer-events-none rounded-full" />
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 rounded-full bg-violet-500/20 border border-violet-400/50 text-violet-300 text-[11px] font-mono font-black tracking-wider uppercase flex items-center gap-1.5 shadow-neon-violet">
                <Sparkles className="h-3.5 w-3.5 text-violet-300" />
                DOMAIN: {currentProject.domain.toUpperCase()}
              </span>
              <span className="text-violet-300 text-xs font-mono">• Last updated: {currentProject.updatedAt}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white mt-2 font-mono tracking-tight">
              {currentProject.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-200 mt-1 max-w-2xl leading-relaxed font-light">{currentProject.description}</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Upload Requirement Button in Yellow Theme */}
            <button
              onClick={() => setActiveTab('upload')}
              className="flex items-center space-x-2 px-5 py-3 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-300 text-black font-black text-xs font-mono shadow-neon-yellow border border-yellow-300/60 transition duration-200 cursor-pointer"
            >
              <FileUp className="h-4 w-4 text-black" />
              <span>Upload Requirement</span>
            </button>
            <button
              onClick={() => ExportService.exportPDF(currentProject)}
              className="flex items-center space-x-2 px-5 py-3 rounded-xl bg-surface/90 hover:bg-surface text-cyan-300 border border-violet-400/40 text-xs font-mono font-bold transition duration-200 cursor-pointer shadow-neon-blue"
            >
              <Download className="h-4 w-4 text-cyan-400" />
              <span>Export SRS PDF</span>
            </button>
          </div>
        </div>
      </div>

      {/* Analytics 4 Core KPI Metrics Cards - Highlighting Cobalt Blue, Dark Violet, Laser Red & Dark Yellow */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-mono">
        
        {/* 1. Cobalt Blue: Total Requirements */}
        <div className="glass-card neon-card-blue p-6 rounded-2xl border border-blue-500/40 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-blue-300 uppercase tracking-wider">Total Requirements</span>
            <FileUp className="h-5 w-5 text-blue-400" />
          </div>
          <p className="text-3xl font-black text-blue-300">{totalReqs}</p>
          <p className="text-[11px] text-slate-300 font-sans">{funcReqs} Functional • {nonFuncReqs} Non-Functional</p>
        </div>

        {/* 2. Dark Violet: IEEE Quality Health */}
        <div className="glass-card neon-card-violet p-6 rounded-2xl border border-violet-500/40 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-violet-300 uppercase tracking-wider">IEEE Quality Health</span>
            <ShieldAlert className="h-5 w-5 text-violet-400" />
          </div>
          <p className="text-3xl font-black text-violet-300">{healthScore}%</p>
          <p className="text-[11px] text-slate-300 font-sans">{issuesCount} Ambiguity Flag(s) Identified</p>
        </div>

        {/* 3. Laser Red: Generated Test Cases */}
        <div className="glass-card neon-card-red p-6 rounded-2xl border border-red-500/40 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-red-300 uppercase tracking-wider">Generated Test Cases</span>
            <CheckSquare className="h-5 w-5 text-red-400" />
          </div>
          <p className="text-3xl font-black text-red-300">{testsCount}</p>
          <p className="text-[11px] text-slate-300 font-sans">Unit, Integration, Security & Stress</p>
        </div>

        {/* 4. Electric Cyan Blue: RTM & Completion */}
        <div className="glass-card neon-card-cyan p-6 rounded-2xl border border-cyan-500/40 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider">RTM & Completion</span>
            <TrendingUp className="h-5 w-5 text-cyan-400" />
          </div>
          <p className="text-3xl font-black text-cyan-300">{completionPercent}%</p>
          <p className="text-[11px] text-slate-300 font-sans">{storiesCount} Agile User Stories Linked</p>
        </div>
      </div>

      {/* Main Grid: Active Requirements & Fast Navigation */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Requirements Backlog List */}
        <div className="lg:col-span-2 glass-card p-6 sm:p-8 rounded-2xl border border-white/10 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h3 className="text-base font-bold text-white font-mono flex items-center gap-2">
              <BookOpenCheck className="h-5 w-5 text-blue-400" />
              <span>Active Specifications Baseline ({totalReqs})</span>
            </h3>
            <button
              onClick={() => setActiveTab('quality')}
              className="text-xs font-mono text-cyan-400 hover:text-cyan-300 font-bold transition flex items-center gap-1"
            >
              <span>Audit in Quality Lab</span>
              <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
            </button>
          </div>

          <div className="space-y-3">
            {currentProject.requirements.slice(0, 6).map((req) => (
              <div 
                key={req.id}
                className="p-4 rounded-xl bg-black/60 border border-white/10 hover:border-blue-400/50 hover:shadow-neon-blue transition duration-200 space-y-2 group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-mono text-xs font-bold border border-blue-500/40">
                      {req.id}
                    </span>
                    <span className="text-xs text-cyan-300 font-mono font-semibold">
                      [{req.category}]
                    </span>
                  </div>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                    req.priority === 'High' ? 'bg-red-500/20 text-red-300 border-red-500/40 font-bold shadow-neon-red' :
                    'bg-blue-500/10 text-blue-300 border-blue-400/30 font-semibold'
                  }`}>
                    {req.priority} Priority
                  </span>
                </div>

                <h4 className="text-sm font-semibold text-white group-hover:text-cyan-300 transition duration-150">
                  {req.title}
                </h4>
                <p className="text-xs text-slate-300 font-light leading-relaxed font-sans line-clamp-2">
                  {req.improvedText || req.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Launchpad & Innovations */}
        <div className="glass-card p-6 sm:p-8 rounded-2xl border border-white/10 space-y-6">
          <h3 className="text-base font-bold text-white font-mono flex items-center gap-2 border-b border-white/10 pb-4">
            <Zap className="h-5 w-5 text-cyan-400" />
            <span>SE Innovation Suite Launchpad</span>
          </h3>

          <div className="space-y-3">
            {[
              { id: 'llm-eval-lab', label: 'LLM Evaluation Lab', desc: 'Benchmark Models on 12 RE Competencies', icon: Brain, color: 'text-cyan-400', border: 'border-cyan-500/40 hover:border-cyan-300', bg: 'bg-cyan-500/15 hover:shadow-neon-cyan' },
              { id: 'risk-heatmap', label: '2D Requirements Risk Heatmap', desc: 'Probability vs Impact 2D Matrix', icon: Flame, color: 'text-red-400', border: 'border-red-500/30 hover:border-red-400', bg: 'bg-red-500/10 hover:shadow-neon-red' },
              { id: 'traceability-graph', label: 'Traceability Lineage Graph', desc: 'Req → Story → Criteria → Test Flow', icon: Activity, color: 'text-cyan-400', border: 'border-cyan-500/30 hover:border-cyan-400', bg: 'bg-cyan-500/10 hover:shadow-neon-cyan' },
              { id: 'refinement-lab', label: 'Refinement Lab Game', desc: 'Interactive IEEE 830 Quality Game', icon: Sparkles, color: 'text-violet-300', border: 'border-violet-500/30 hover:border-violet-400', bg: 'bg-violet-500/10 hover:shadow-neon-violet' },
              { id: 'architecture', label: 'System Architecture DFD', desc: 'Real-time Live Packet Streamer', icon: Zap, color: 'text-blue-300', border: 'border-blue-500/30 hover:border-blue-400', bg: 'bg-blue-500/10 hover:shadow-neon-blue' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`w-full p-4 rounded-xl ${item.bg} border ${item.border} hover:scale-[1.02] transition-all duration-200 text-left space-y-1 group cursor-pointer`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold font-mono ${item.color} flex items-center gap-2`}>
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </span>
                  <span className="text-[10px] text-slate-400 group-hover:text-white font-mono">Launch →</span>
                </div>
                <p className="text-[11px] text-slate-300 font-light">{item.desc}</p>
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
