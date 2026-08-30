import React from 'react';
import { 
  LayoutDashboard, 
  FileUp, 
  ShieldCheck, 
  Sparkles, 
  BookOpenCheck, 
  GitMerge, 
  CheckSquare, 
  AlertTriangle, 
  Network, 
  FileSpreadsheet, 
  BarChart3,
  Award,
  Cpu,
  GitPullRequest,
  Flame,
  Milestone,
  Boxes,
  Target,
  Gamepad2,
  TrendingUp,
  ShieldAlert,
  Users,
  Brain,
  BookOpen
} from 'lucide-react';
import { useProject } from '../../context/ProjectContext';

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab, currentProject } = useProject();

  const reqCount = currentProject?.requirements.length || 0;
  const issuesCount = currentProject?.requirements.reduce((acc, r) => acc + r.issues.length, 0) || 0;
  const storiesCount = currentProject?.userStories.length || 0;
  const testsCount = currentProject?.testCases.length || 0;

  const menuSections = [
    {
      title: 'AI & LLM BENCHMARK SUITE',
      headerColor: 'text-cyan-400',
      items: [
        { id: 'llm-eval-lab', label: 'LLM Evaluation Lab', icon: Brain, badge: 'BENCHMARK', badgeType: 'cyan' },
      ]
    },
    {
      title: 'EXECUTIVE & QUALITY DASHBOARD',
      headerColor: 'text-violet-400',
      items: [
        { id: 'dashboard', label: 'Dashboard Overview', icon: LayoutDashboard, badge: 'CORE', badgeType: 'violet' },
        { id: 'analytics', label: 'Quality Dashboard', icon: BarChart3, badge: 'MOSCOW', badgeType: 'blue' },
        { id: 'quality-over-time', label: 'Quality Over Time (V1-V4)', icon: TrendingUp, badge: 'TREND', badgeType: 'blue' },
        { id: 'coverage-dashboard', label: 'Coverage Dashboard', icon: Target, badge: '4-KPI', badgeType: 'cyan' },
      ]
    },
    {
      title: 'REQUIREMENTS & REFINEMENT LAB',
      headerColor: 'text-blue-400',
      items: [
        { id: 'upload', label: 'Requirement Ingestion', icon: FileUp, badge: reqCount ? `${reqCount}` : null, badgeType: 'blue' },
        { id: 'quality', label: 'IEEE Quality Audit', icon: ShieldCheck, badge: issuesCount ? `${issuesCount} flags` : null, badgeType: issuesCount > 0 ? 'red' : 'violet' },
        { id: 'recommendations', label: 'Domain Suggestions', icon: Sparkles, badge: 'AI', badgeType: 'violet' },
        { id: 'refinement-lab', label: 'Refinement Lab Game', icon: Gamepad2, badge: 'GAME', badgeType: 'violet' },
        { id: 'bad-req-detector', label: 'Bad Req Detector Demo', icon: ShieldAlert, badge: 'DEMO', badgeType: 'red' },
      ]
    },
    {
      title: 'RISK & TESTING INTELLIGENCE',
      headerColor: 'text-red-400',
      items: [
        { id: 'risk-heatmap', label: '2D Risk Heatmap', icon: Flame, badge: '2D-RADAR', badgeType: 'red' },
        { id: 'risk-early-warning', label: 'Risk Early Warning', icon: AlertTriangle, badge: 'PREDICT', badgeType: 'red' },
        { id: 'testing-matrix', label: 'Testing Matrix (5 Levels)', icon: CheckSquare, badge: 'MATRIX', badgeType: 'blue' },
      ]
    },
    {
      title: 'ARCHITECTURE & TRACEABILITY',
      headerColor: 'text-cyan-400',
      items: [
        { id: 'traceability-graph', label: 'Traceability Graph', icon: Network, badge: 'LINEAGE', badgeType: 'cyan' },
        { id: 'dependency-graph', label: 'Dependency Network', icon: Network, badge: 'MAP', badgeType: 'blue' },
        { id: 'architecture', label: 'System Architecture DFD', icon: Cpu, badge: 'DFD', badgeType: 'violet' },
        { id: 'architecture-impact', label: 'Architecture Impact', icon: Cpu, badge: 'BLAST', badgeType: 'red' },
      ]
    },
    {
      title: 'SIMULATION & ANALYSIS',
      headerColor: 'text-blue-400',
      items: [
        { id: 'what-if', label: 'What-If Simulator', icon: Sparkles, badge: 'AI', badgeType: 'cyan' },
        { id: 'impact', label: 'Scope Creep 2.0', icon: GitPullRequest, badge: 'SIM', badgeType: 'red' },
        { id: 'similarity-map', label: 'Similarity & Clusters', icon: Network, badge: 'VECTOR', badgeType: 'blue' },
        { id: 'conflict', label: 'Conflict & Duplicates', icon: GitPullRequest, badge: 'DETECT', badgeType: 'red' },
        { id: 'stakeholders', label: 'Power-Interest Matrix', icon: Users, badge: '2x2', badgeType: 'violet' },
        { id: 'quality-heatmap', label: 'Requirement Health Scores', icon: BarChart3, badge: 'HEALTH', badgeType: 'blue' },
        { id: 'compliance', label: 'IEEE 29148 Radar', icon: Award, badge: 'IEEE', badgeType: 'violet' },
        { id: 'multi-review', label: '5-Persona Review Board', icon: ShieldCheck, badge: 'REVIEW', badgeType: 'blue' },
      ]
    },
    {
      title: 'AGILE, RELEASE & EXPORTS',
      headerColor: 'text-emerald-400',
      items: [
        { id: 'roadmap', label: 'Requirements Roadmap', icon: Milestone, badge: 'TIMELINE', badgeType: 'cyan' },
        { id: 'release-planner', label: 'AI Sprint Planner', icon: Boxes, badge: 'SPRINTS', badgeType: 'blue' },
        { id: 'user-stories', label: 'Agile User Stories', icon: BookOpenCheck, badge: storiesCount ? `${storiesCount}` : null, badgeType: 'violet' },
        { id: 'use-cases', label: 'Textual Use Cases', icon: GitMerge, badge: null, badgeType: 'blue' },
        { id: 'test-cases', label: 'QA Test Matrix', icon: CheckSquare, badge: testsCount ? `${testsCount}` : null, badgeType: 'blue' },
        { id: 'rtm', label: 'Traceability Matrix', icon: Network, badge: null, badgeType: 'violet' },
        { id: 'srs', label: 'IEEE SRS Exporter', icon: FileSpreadsheet, badge: 'PDF', badgeType: 'violet' },
      ]
    },
    {
      title: 'HELP & CAPABILITIES GUIDE',
      headerColor: 'text-cyan-400',
      items: [
        { id: 'user-manual', label: 'Interactive User Manual', icon: BookOpen, badge: 'MANUAL', badgeType: 'cyan' },
      ]
    }
  ];

  const getBadgeStyle = (type?: string, isActive?: boolean) => {
    if (isActive) {
      return 'bg-white/20 text-white border-white/40 shadow-sm';
    }
    switch (type) {
      case 'red':
        return 'bg-red-500/15 text-red-300 border-red-500/40 shadow-neon-red';
      case 'blue':
        return 'bg-blue-500/15 text-blue-300 border-blue-500/40 shadow-neon-blue';
      case 'yellow':
        return 'bg-cyan-500/15 text-cyan-300 border-cyan-400/40 shadow-neon-cyan';
      case 'cyan':
        return 'bg-cyan-500/15 text-cyan-300 border-cyan-400/40 shadow-neon-cyan';
      case 'emerald':
        return 'bg-emerald-500/15 text-emerald-300 border-emerald-400/40 shadow-neon-emerald';
      case 'violet':
      default:
        return 'bg-violet-500/15 text-violet-300 border-violet-500/40 shadow-neon-violet';
    }
  };

  return (
    <aside className="w-80 flex-shrink-0 border-r border-white/10 bg-[#07070B]/95 p-5 min-h-[calc(100vh-5rem)] hidden lg:block overflow-y-auto max-h-[calc(100vh-5rem)]">
      
      {/* Active Context Card with Multi-Neon border */}
      <div className="mb-6 px-4 py-3 rounded-2xl bg-surface/90 border border-violet-500/40 shadow-neon-violet relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 blur-xl pointer-events-none rounded-full" />
        <p className="text-[10px] font-extrabold text-cyan-400 tracking-wider uppercase font-mono">Active Project Context</p>
        <p className="text-xs font-black text-white truncate mt-1 font-mono">{currentProject?.name || 'No Project Selected'}</p>
        <div className="flex items-center justify-between mt-2 text-[10px] text-slate-300">
          <span className="flex items-center gap-1.5 font-mono">
            <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse shadow-neon-cyan" />
            {currentProject?.domain || 'General'}
          </span>
          <span className="font-mono text-blue-400 font-bold">{reqCount} Reqs</span>
        </div>
      </div>

      {/* Navigation Sections */}
      <nav className="space-y-6">
        {menuSections.map((section, sIdx) => (
          <div key={sIdx} className="space-y-1.5">
            <p className={`px-3 text-[10px] font-black uppercase tracking-widest font-mono mb-2 ${section.headerColor}`}>
              {section.title}
            </p>
            {section.items.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition duration-200 group cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-violet-700/40 via-blue-700/30 to-red-600/20 text-white border border-violet-400/60 shadow-neon-violet scale-[1.01]'
                      : 'text-slate-400 hover:text-white hover:bg-surface/80 border border-transparent'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={`h-4 w-4 transition duration-200 ${isActive ? 'text-amber-300 scale-110' : 'text-slate-400 group-hover:text-blue-400'}`} />
                    <span className="truncate">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`px-2 py-0.5 text-[9px] font-extrabold rounded-full border font-mono ${getBadgeStyle(item.badgeType, isActive)}`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </nav>
    </aside>
  );
};
