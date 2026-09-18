import React, { useState } from 'react';
import { 
  Target, 
  CheckCircle2, 
  AlertCircle, 
  Layers, 
  ShieldCheck, 
  BarChart3, 
  ArrowRight,
  Flame,
  CheckSquare,
  ShieldAlert,
  Zap,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  X
} from 'lucide-react';
import { useProject } from '../../context/ProjectContext';

export const ModuleCoverageDashboard: React.FC = () => {
  const { currentProject, setActiveTab } = useProject();
  const [selectedReqId, setSelectedReqId] = useState<string | null>(null);

  if (!currentProject) return null;

  const reqs = currentProject.requirements;
  const stories = currentProject.userStories;
  const testCases = currentProject.testCases;
  const useCases = currentProject.useCases || [];

  // Build per-requirement QA coverage dynamically based on linked test levels
  const rows = reqs.map((r) => {
    const linkedStory = stories.find(s => s.requirementId === r.id);
    const linkedTests = testCases.filter(t => t.requirementId === r.id);
    
    // Dynamic test level detection
    const hasUnit = linkedTests.some(t => t.category === 'Positive' || t.category === 'Validation');
    const hasIntegration = linkedTests.some(t => t.category === 'Boundary' || t.description.toLowerCase().includes('integration'));
    const hasSystem = linkedTests.length > 0;
    const hasSecurity = linkedTests.some(t => t.category === 'Security' || t.description.toLowerCase().includes('security') || t.description.toLowerCase().includes('auth') || t.description.toLowerCase().includes('permission'));
    const hasLoad = linkedTests.some(t => t.category === 'Performance' || t.description.toLowerCase().includes('performance') || t.description.toLowerCase().includes('load') || t.description.toLowerCase().includes('concurrency'));

    const coveredLevelsCount = [hasUnit, hasIntegration, hasSystem, hasSecurity, hasLoad].filter(Boolean).length;
    const percent = linkedTests.length === 0 ? 0 : Math.round((coveredLevelsCount / 5) * 100);

    const missingLevels: string[] = [];
    if (!hasUnit) missingLevels.push('Unit Test');
    if (!hasIntegration) missingLevels.push('Integration Test');
    if (!hasSystem) missingLevels.push('System Flow Test');
    if (!hasSecurity) missingLevels.push('Security & Auth Test');
    if (!hasLoad) missingLevels.push('Load & Boundary Test');

    let gapWarning: string | null = null;
    if (linkedTests.length === 0) {
      gapWarning = 'No test cases linked to this requirement.';
    } else if (missingLevels.length > 0) {
      gapWarning = `Missing ${missingLevels.slice(0, 2).join(' & ')} coverage.`;
    }

    return {
      id: r.id,
      title: r.title,
      description: r.description,
      category: r.category,
      priority: r.priority,
      percent,
      testCount: linkedTests.length,
      linkedStory,
      linkedTests,
      hasUnit,
      hasIntegration,
      hasSystem,
      hasSecurity,
      hasLoad,
      missingLevels,
      gapWarning
    };
  });

  const selectedRow = rows.find(r => r.id === selectedReqId) || null;

  // Aggregate stats calculated dynamically from actual project data
  const totalReqs = rows.length;
  const verifiedReqs = reqs.filter(r => (r.status === 'Approved' || r.issues.length === 0) && testCases.some(t => t.requirementId === r.id)).length;
  const reqCoverage = totalReqs > 0 ? Math.round((verifiedReqs / totalReqs) * 100) : 0;
  const avgTestCoverage = totalReqs > 0 ? Math.round(rows.reduce((acc, r) => acc + r.percent, 0) / totalReqs) : 0;
  
  // Stakeholder Coverage: requirements with identified actors/stakeholders / total requirements
  const stakeholderCoveredCount = reqs.filter(r => stories.some(s => s.requirementId === r.id && s.asA && s.asA.toLowerCase() !== 'system') || (r as any).sourceStakeholder).length;
  const stakeholderCoverage = totalReqs > 0 ? Math.round((stakeholderCoveredCount / totalReqs) * 100) : 0;

  // Traceability Matrix: requirements with downstream links / total requirements
  const traceableCount = reqs.filter(r => stories.some(s => s.requirementId === r.id) || testCases.some(t => t.requirementId === r.id) || useCases.some(u => u.requirementId === r.id)).length;
  const traceabilityCoverage = totalReqs > 0 ? Math.round((traceableCount / totalReqs) * 100) : 0;

  return (
    <div className="space-y-8">
      {/* Header Banner with Dark Violet & Cyan Neon Theme */}
      <div className="glass-card neon-card-violet p-6 sm:p-8 rounded-2xl border border-violet-500/40 shadow-neon-violet flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/15 blur-3xl pointer-events-none rounded-full" />
        <div className="space-y-2 relative z-10">
          <div className="flex items-center space-x-2 text-cyan-400 text-xs font-bold font-mono">
            <Target className="h-4 w-4" />
            <span>INNOVATIVE SE TOOL • 4-DIMENSIONAL REQUIREMENTS COVERAGE RADAR</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight">Requirement Coverage Dashboard</h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed font-light">
            Measure automated verification completeness across Requirements, QA Test Suites, Stakeholder Perspectives, and RTM Traceability for <strong className="text-cyan-300 font-mono">{currentProject.name}</strong>.
          </p>
        </div>
      </div>

      {/* 4 Major Coverage KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-mono">
        {[
          { label: 'Requirement Verification', value: `${reqCoverage}%`, subtitle: `${verifiedReqs}/${totalReqs} Verified Requirements`, neon: 'neon-card-cyan', color: 'text-cyan-400' },
          { label: 'QA Test Depth', value: `${avgTestCoverage}%`, subtitle: 'Multi-level test coverage score', neon: 'neon-card-emerald', color: 'text-emerald-400' },
          { label: 'Stakeholder Coverage', value: `${stakeholderCoverage}%`, subtitle: `${stakeholderCoveredCount}/${totalReqs} User roles engaged`, neon: 'neon-card-violet', color: 'text-violet-400' },
          { label: 'Traceability Matrix', value: `${traceabilityCoverage}%`, subtitle: `${traceableCount}/${totalReqs} Bi-directional RTM linkage`, neon: 'neon-card-blue', color: 'text-blue-400' },
        ].map((kpi, idx) => (
          <div key={idx} className={`glass-card ${kpi.neon} p-6 rounded-2xl border border-white/10 space-y-2`}>
            <p className="text-[11px] font-bold text-slate-400 uppercase">{kpi.label}</p>
            <p className={`text-3xl font-black ${kpi.color}`}>{kpi.value}</p>
            <p className="text-xs text-slate-300 font-sans font-light">{kpi.subtitle}</p>
          </div>
        ))}
      </div>

      {/* Per-Requirement Test Coverage Drilldown Table & Inspector */}
      <div className="glass-card p-6 sm:p-8 rounded-2xl border border-white/10 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
          <div>
            <h3 className="text-sm font-bold text-white font-mono flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-cyan-400" />
              <span>Per-Requirement QA Test Suite Coverage Drilldown</span>
            </h3>
            <p className="text-xs text-slate-400 font-light mt-0.5">
              Click any requirement row to inspect its linked QA test suite, verify coverage across test types, and resolve gaps.
            </p>
          </div>
          <span className="text-xs text-cyan-300 font-mono font-bold bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
            Interactive Inspector Active
          </span>
        </div>

        <div className="space-y-3">
          {rows.length === 0 ? (
            <div className="p-8 text-center text-slate-400 font-sans border border-white/10 rounded-xl bg-surface/30">
              No requirements available. Upload or enter requirements to view coverage drilldown.
            </div>
          ) : (
            rows.map((row) => {
            const isSelected = selectedReqId === row.id;
            return (
              <div key={row.id} className="space-y-2">
                <div
                  onClick={() => setSelectedReqId(isSelected ? null : row.id)}
                  className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer space-y-2 ${
                    isSelected
                      ? 'bg-cyan-950/70 border-cyan-400 shadow-neon-cyan'
                      : 'bg-surface/60 border-white/10 hover:border-white/25 hover:bg-surface/80'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                    <div className="flex items-center space-x-3">
                      <span className="text-xs font-mono font-bold text-cyan-400">{row.id}</span>
                      <span className="text-xs font-bold text-white truncate max-w-md">{row.title}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/10 font-mono">{row.category}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded font-mono font-bold ${
                        row.priority === 'Critical' ? 'bg-red-500/20 text-red-300 border border-red-500/30' :
                        row.priority === 'High' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                        'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                      }`}>
                        {row.priority}
                      </span>
                    </div>

                    <div className="flex items-center space-x-4 text-xs font-mono">
                      <span className="text-slate-400">{row.testCount} Tests</span>
                      <span className={`font-black text-sm ${row.percent === 100 ? 'text-emerald-400' : row.percent >= 75 ? 'text-amber-400' : 'text-rose-400'}`}>
                        {row.percent}%
                      </span>
                      {isSelected ? (
                        <ChevronUp className="h-4 w-4 text-cyan-400" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-slate-400" />
                      )}
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-2.5 bg-black/70 rounded-full overflow-hidden border border-white/10">
                    <div 
                      className={`h-full rounded-full transition-all duration-300 ${
                        row.percent === 100 
                          ? 'bg-gradient-to-r from-emerald-500 to-teal-400 shadow-neon-emerald' 
                          : row.percent >= 75 
                          ? 'bg-gradient-to-r from-amber-500 to-yellow-400 shadow-neon-yellow' 
                          : 'bg-gradient-to-r from-rose-600 to-red-400 shadow-neon-red'
                      }`}
                      style={{ width: `${row.percent}%` }}
                    />
                  </div>

                  {row.gapWarning && (
                    <div className="flex items-center space-x-2 text-[11px] font-mono text-amber-400 pt-1">
                      <AlertCircle className="h-3.5 w-3.5 text-amber-400" />
                      <span>{row.gapWarning}</span>
                    </div>
                  )}
                </div>

                {/* EXPANDED IN-LINE QA TEST SUITE & COVERAGE INSPECTOR */}
                {isSelected && (
                  <div className="p-6 rounded-2xl bg-black/80 border border-cyan-500/40 space-y-5 shadow-neon-cyan animate-fadeIn">
                    <div className="flex items-start justify-between border-b border-white/10 pb-3">
                      <div>
                        <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-wider">
                          QA TEST SUITE INSPECTOR &amp; COVERAGE BREAKDOWN
                        </span>
                        <h4 className="text-sm font-bold text-white font-mono mt-0.5">
                          {row.id}: {row.title}
                        </h4>
                      </div>
                      <button
                        onClick={() => setSelectedReqId(null)}
                        className="text-slate-400 hover:text-white p-1"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Requirement Description */}
                    <div className="p-3.5 rounded-xl bg-surface/50 border border-white/10 text-xs font-mono">
                      <span className="text-[10px] text-slate-400 font-bold block uppercase mb-1">Requirement Statement:</span>
                      <p className="text-slate-200 leading-relaxed font-sans">{row.description}</p>
                    </div>

                    {/* 5-Level QA Verification Grid */}
                    <div className="space-y-2 font-mono">
                      <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                        5-Level QA Coverage Audit:
                      </span>
                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 text-xs">
                        {[
                          { level: 'Unit Test', covered: row.hasUnit },
                          { level: 'Integration Test', covered: row.hasIntegration },
                          { level: 'System Flow', covered: row.hasSystem },
                          { level: 'Security & Auth', covered: row.hasSecurity },
                          { level: 'Load & Boundary', covered: row.hasLoad }
                        ].map((lvl, idx) => (
                          <div key={idx} className={`p-2.5 rounded-xl border ${lvl.covered ? 'text-emerald-400 border-emerald-500/40 bg-emerald-500/10' : 'text-amber-400 border-amber-500/40 bg-amber-500/10'} text-center space-y-1`}>
                            <span className="text-[10px] text-slate-400 block">{lvl.level}</span>
                            <strong className="text-xs block">{lvl.covered ? 'Covered' : 'Missing Gap'}</strong>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Linked User Story */}
                    {row.linkedStory && (
                      <div className="p-3.5 rounded-xl bg-violet-500/10 border border-violet-500/30 text-xs font-mono space-y-1">
                        <span className="text-[10px] text-violet-300 font-bold uppercase">Linked Agile User Story ({row.linkedStory.id}):</span>
                        <p className="text-white font-sans">
                          As a <strong className="text-violet-300">{row.linkedStory.asA}</strong>, I want to {row.linkedStory.iWantTo} so that {row.linkedStory.soThat}.
                        </p>
                      </div>
                    )}

                    {/* Action Hub */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-white/10 font-mono text-xs">
                      <span className="text-slate-400">
                        Total {row.testCount} Test Cases Attached ({row.percent}% Verification)
                      </span>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setActiveTab('test-cases')}
                          className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold transition flex items-center gap-2 shadow-neon-blue cursor-pointer"
                        >
                          <CheckSquare className="h-3.5 w-3.5" />
                          <span>Open in QA Test Matrix</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
        </div>
      </div>
    </div>
  );
};
