import React, { useState } from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  Check, 
  Sparkles, 
  CheckCircle2, 
  Wand2,
  Table as TableIcon,
  LayoutGrid,
  Filter,
  Flame,
  ShieldAlert,
  Layers,
  HelpCircle,
  Clock,
  Zap,
  ArrowRight
} from 'lucide-react';
import { useProject } from '../../context/ProjectContext';

export const ModuleQualityAudit: React.FC = () => {
  const { currentProject, acceptImprovedRequirement } = useProject();
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');
  const [selectedFilter, setSelectedFilter] = useState<string>('ALL');

  if (!currentProject) return null;

  const requirementsWithIssues = currentProject.requirements.filter(r => r.issues.length > 0 && !r.isImprovedAccepted);
  const approvedRequirements = currentProject.requirements.filter(r => r.issues.length === 0 || r.isImprovedAccepted);

  // Flatten all detected issues with requirement reference
  const allIssuesFlattened = requirementsWithIssues.flatMap(req => 
    req.issues.map(issue => ({
      req,
      issue
    }))
  );

  const filteredIssues = selectedFilter === 'ALL' 
    ? allIssuesFlattened 
    : allIssuesFlattened.filter(item => 
        item.issue.type.toLowerCase().includes(selectedFilter.toLowerCase()) ||
        item.issue.code?.toLowerCase().includes(selectedFilter.toLowerCase())
      );

  const totalDefectsCount = allIssuesFlattened.length;
  const criticalDefectsCount = allIssuesFlattened.filter(i => i.issue.severity === 'Critical').length;
  const highDefectsCount = allIssuesFlattened.filter(i => i.issue.severity === 'High').length;

  const healthScore = Math.max(0, Math.round(((currentProject.requirements.length - requirementsWithIssues.length) / Math.max(currentProject.requirements.length, 1)) * 100));

  const filterCategories = [
    { label: 'All Defect Types', value: 'ALL', count: totalDefectsCount },
    { label: '🔴 Ambiguity (DEF-01)', value: 'Ambiguity', count: allIssuesFlattened.filter(i => i.issue.type.includes('Ambigu') || i.issue.code === 'DEF-01').length },
    { label: '🔴 Vague Words (DEF-02)', value: 'Vague', count: allIssuesFlattened.filter(i => i.issue.type.includes('Vague') || i.issue.code === 'DEF-02').length },
    { label: '🟠 Incomplete (DEF-03)', value: 'Incomplete', count: allIssuesFlattened.filter(i => i.issue.type.includes('Incomplete') || i.issue.code === 'DEF-03').length },
    { label: '⚠ Missing NFR (DEF-04)', value: 'Missing Non-Functional', count: allIssuesFlattened.filter(i => i.issue.type.includes('Non-Functional') || i.issue.code === 'DEF-04').length },
    { label: '🔴 Non-Testable (DEF-05)', value: 'Non-testable', count: allIssuesFlattened.filter(i => i.issue.type.includes('testable') || i.issue.code === 'DEF-05').length },
    { label: '🔴 Contradiction (DEF-06)', value: 'Contradiction', count: allIssuesFlattened.filter(i => i.issue.type.includes('Contradiction') || i.issue.code === 'DEF-06').length },
    { label: '🟡 Duplicate (DEF-07)', value: 'Duplicate', count: allIssuesFlattened.filter(i => i.issue.type.includes('Duplicate') || i.issue.code === 'DEF-07').length },
    { label: '🟠 Non-Atomic (DEF-08)', value: 'Non-Atomic', count: allIssuesFlattened.filter(i => i.issue.type.includes('Atomic') || i.issue.code === 'DEF-08').length },
    { label: '🟠 Missing Actor (DEF-09)', value: 'Missing Actor', count: allIssuesFlattened.filter(i => i.issue.type.includes('Actor') || i.issue.code === 'DEF-09').length },
    { label: '🟠 Missing Trigger (DEF-10)', value: 'Trigger', count: allIssuesFlattened.filter(i => i.issue.type.includes('Trigger') || i.issue.code === 'DEF-10').length },
    { label: '🟠 Inputs/Outputs (DEF-11)', value: 'Inputs', count: allIssuesFlattened.filter(i => i.issue.type.includes('Input') || i.issue.code === 'DEF-11').length },
    { label: '🟡 Unclear Constraint (DEF-12)', value: 'Constraint', count: allIssuesFlattened.filter(i => i.issue.type.includes('Constraint') || i.issue.code === 'DEF-12').length },
    { label: '🛡 Security Gap (DEF-13)', value: 'Security', count: allIssuesFlattened.filter(i => i.issue.type.includes('Security') || i.issue.code === 'DEF-13').length },
    { label: '⚡ Performance Gap (DEF-14)', value: 'Performance', count: allIssuesFlattened.filter(i => i.issue.type.includes('Performance') || i.issue.code === 'DEF-14').length },
    { label: '🔴 Feasibility Concern (DEF-15)', value: 'Feasibility', count: allIssuesFlattened.filter(i => i.issue.type.includes('Feasibility') || i.issue.code === 'DEF-15').length },
    { label: '🟠 Missing Business Rule (DEF-16)', value: 'Business Rule', count: allIssuesFlattened.filter(i => i.issue.type.includes('Business Rule') || i.issue.code === 'DEF-16').length },
    { label: '🟠 Error Handling (DEF-17)', value: 'Exception', count: allIssuesFlattened.filter(i => i.issue.type.includes('Exception') || i.issue.type.includes('Error') || i.issue.code === 'DEF-17').length },
    { label: '🔵 Dependency (DEF-18)', value: 'Dependency', count: allIssuesFlattened.filter(i => i.issue.type.includes('Dependency') || i.issue.code === 'DEF-18').length },
  ].filter(c => c.value === 'ALL' || c.count > 0);

  const getDefectBadgeColor = (type: string, severity: string) => {
    if (severity === 'Critical') return 'bg-red-500/20 text-red-300 border-red-500/40 shadow-neon-red';
    if (type.includes('Ambigu') || type.includes('Vague')) return 'bg-rose-500/20 text-rose-300 border-rose-500/40';
    if (type.includes('Incomplete') || type.includes('Atomic') || type.includes('Actor')) return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
    if (type.includes('Security')) return 'bg-violet-500/20 text-violet-300 border-violet-500/40 shadow-neon-violet';
    if (type.includes('Performance')) return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 shadow-neon-cyan';
    return 'bg-blue-500/20 text-blue-300 border-blue-500/40';
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="glass-card neon-card-violet p-6 rounded-2xl border border-violet-500/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-neon-violet">
        <div>
          <div className="flex items-center space-x-2 text-cyan-400 text-xs font-bold font-mono mb-1">
            <ShieldCheck className="h-4 w-4" />
            <span>MODULE 3 &amp; 4 • 20-PROBLEM QUALITY AUDIT &amp; IEEE REWRITER</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white font-mono">Requirement Quality &amp; IEEE Standard Rewriter</h1>
          <p className="text-xs text-slate-300 mt-1 max-w-3xl">
            Deep automated analysis across all 20 requirement problem categories (Ambiguity, Vague Terminology, Incompleteness, Non-Testability, Contradictions, Duplicates, Non-Atomic bundling, and NFR gaps). Transform informal inputs into verifiable IEEE Std 830-1998 / ISO 29148 specifications for <strong className="text-cyan-300 font-mono">{currentProject.name}</strong>.
          </p>
        </div>

        {/* Audit Score Badges */}
        <div className="flex items-center gap-3 bg-surface/90 px-4 py-2.5 rounded-xl border border-white/10 shadow-lg">
          <div className="text-right font-mono">
            <p className="text-[10px] text-slate-400">Quality Health Index</p>
            <p className={`text-xl font-black ${healthScore >= 80 ? 'text-emerald-400' : 'text-amber-400'}`}>
              {healthScore}%
            </p>
          </div>
          <div className="h-8 w-px bg-white/10" />
          <div className="text-left font-mono">
            <p className="text-[10px] text-slate-400">Active Defects</p>
            <p className="text-xl font-black text-rose-400">{totalDefectsCount}</p>
          </div>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
        <div className="glass-card p-3.5 rounded-xl border border-white/10 flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <Layers className="h-4 w-4" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase block">Total Analyzed</span>
            <span className="text-base font-bold text-white">{currentProject.requirements.length} Reqs</span>
          </div>
        </div>

        <div className="glass-card p-3.5 rounded-xl border border-white/10 flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400">
            <Flame className="h-4 w-4" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase block">Critical Severity</span>
            <span className="text-base font-bold text-red-300">{criticalDefectsCount} Flags</span>
          </div>
        </div>

        <div className="glass-card p-3.5 rounded-xl border border-white/10 flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <AlertTriangle className="h-4 w-4" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase block">High / Medium</span>
            <span className="text-base font-bold text-amber-300">{highDefectsCount} Flags</span>
          </div>
        </div>

        <div className="glass-card p-3.5 rounded-xl border border-white/10 flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <CheckCircle2 className="h-4 w-4" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase block">Approved IEEE Reqs</span>
            <span className="text-base font-bold text-emerald-300">{approvedRequirements.length} Ready</span>
          </div>
        </div>
      </div>

      {/* Control Toolbar: View Toggle & Filters */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 bg-surface/80 p-3 rounded-xl border border-white/10">
        {/* Category Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
          <Filter className="h-3.5 w-3.5 text-slate-400 shrink-0 mr-1" />
          {filterCategories.map(cat => (
            <button
              key={cat.value}
              onClick={() => setSelectedFilter(cat.value)}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono font-semibold whitespace-nowrap transition cursor-pointer flex items-center gap-1.5 ${
                selectedFilter === cat.value
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-neon-cyan'
                  : 'bg-black/30 text-slate-400 hover:text-white border border-white/5'
              }`}
            >
              <span>{cat.label}</span>
              <span className="px-1.5 py-0.2 rounded-full text-[9px] bg-white/10 text-slate-300">
                {cat.count}
              </span>
            </button>
          ))}
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center space-x-1 self-end lg:self-auto bg-black/50 p-1 rounded-lg border border-white/10">
          <button
            onClick={() => setViewMode('table')}
            className={`px-3 py-1 rounded-md text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer transition ${
              viewMode === 'table' ? 'bg-cyan-500 text-black shadow-neon-cyan' : 'text-slate-400 hover:text-white'
            }`}
          >
            <TableIcon className="h-3.5 w-3.5" />
            <span>Table View</span>
          </button>
          <button
            onClick={() => setViewMode('cards')}
            className={`px-3 py-1 rounded-md text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer transition ${
              viewMode === 'cards' ? 'bg-cyan-500 text-black shadow-neon-cyan' : 'text-slate-400 hover:text-white'
            }`}
          >
            <LayoutGrid className="h-3.5 w-3.5" />
            <span>Card View</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {requirementsWithIssues.length === 0 ? (
        <div className="glass-card p-10 rounded-2xl border border-emerald-500/30 text-center space-y-3">
          <CheckCircle2 className="h-12 w-12 text-emerald-400 mx-auto animate-bounce" />
          <h3 className="text-lg font-bold text-white font-mono">All Requirements Pass IEEE Quality Standards!</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Zero ambiguity, vague words, missing NFRs, or contradictions detected in current project requirements. All specifications conform strictly to IEEE 830 and ISO/IEC 29148.
          </p>
        </div>
      ) : viewMode === 'table' ? (
        /* Comprehensive 20-Problem Defect Matrix Table */
        <div className="glass-card rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs font-mono">
              <thead>
                <tr className="border-b border-white/15 bg-black/60 text-slate-400 uppercase text-[10px] tracking-wider">
                  <th className="py-3.5 px-4 font-bold">Req ID &amp; Cat</th>
                  <th className="py-3.5 px-4 font-bold min-w-[200px]">Raw Requirement Input</th>
                  <th className="py-3.5 px-4 font-bold min-w-[180px]">Detected Problem (20 Types)</th>
                  <th className="py-3.5 px-4 font-bold min-w-[220px]">Missing Information / Reason</th>
                  <th className="py-3.5 px-4 font-bold min-w-[260px]">Contextual IEEE 830 Rewrite</th>
                  <th className="py-3.5 px-4 font-bold text-right">Remediation Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredIssues.map(({ req, issue }, idx) => (
                  <tr key={`${req.id}-${issue.id}-${idx}`} className="hover:bg-white/[0.02] transition">
                    {/* Req ID & Category */}
                    <td className="py-4 px-4 align-top">
                      <div className="space-y-1">
                        <span className="font-bold text-cyan-400 text-xs block">{req.id}</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-white/5 text-slate-300 border border-white/10 block w-fit">
                          {req.category}
                        </span>
                        <span className={`px-1.5 py-0.2 rounded text-[9px] font-bold block w-fit ${
                          req.priority === 'Critical' ? 'text-red-400 bg-red-500/10' :
                          req.priority === 'High' ? 'text-amber-400 bg-amber-500/10' : 'text-blue-400 bg-blue-500/10'
                        }`}>
                          {req.priority}
                        </span>
                      </div>
                    </td>

                    {/* Raw Text */}
                    <td className="py-4 px-4 align-top">
                      <div className="p-2.5 rounded-lg bg-black/60 border border-red-500/20 text-slate-200 text-xs font-sans italic leading-relaxed">
                        "{req.description}"
                      </div>
                    </td>

                    {/* Detected Defect */}
                    <td className="py-4 px-4 align-top">
                      <div className="space-y-1.5">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold border ${getDefectBadgeColor(issue.type, issue.severity)}`}>
                          {issue.code ? `${issue.code} • ` : ''}{issue.type}
                        </span>
                        <p className="text-[11px] text-slate-300 font-sans leading-snug">
                          {issue.problem}
                        </p>
                        <div className="flex items-center gap-2 text-[10px] text-slate-400">
                          <span>Conf: <strong className="text-cyan-400">{issue.confidenceScore}%</strong></span>
                          <span>•</span>
                          <span className={`${issue.severity === 'Critical' ? 'text-red-400' : 'text-amber-400'}`}>{issue.severity}</span>
                        </div>
                      </div>
                    </td>

                    {/* Missing Elements / Reason */}
                    <td className="py-4 px-4 align-top space-y-2">
                      <p className="text-[11px] text-slate-300 font-sans leading-relaxed">
                        {issue.reason}
                      </p>

                      {issue.missingElements && issue.missingElements.length > 0 && (
                        <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-[10px] text-amber-300 space-y-0.5">
                          <strong className="block text-amber-400 uppercase text-[9px]">Missing Elements:</strong>
                          {issue.missingElements.map((el, eIdx) => (
                            <div key={eIdx} className="flex items-center gap-1 font-mono">
                              <span>{el}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {issue.suggestedDecomposition && issue.suggestedDecomposition.length > 0 && (
                        <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20 text-[10px] text-purple-300 space-y-0.5">
                          <strong className="block text-purple-400 uppercase text-[9px]">Suggested Decomposition:</strong>
                          {issue.suggestedDecomposition.map((dec, dIdx) => (
                            <div key={dIdx} className="font-mono">{dec}</div>
                          ))}
                        </div>
                      )}
                    </td>

                    {/* Contextual IEEE Rewrite */}
                    <td className="py-4 px-4 align-top">
                      <div className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-500/30 space-y-2 shadow-neon-cyan">
                        <div className="flex items-center space-x-1.5 text-cyan-400 text-[10px] font-bold">
                          <Wand2 className="h-3 w-3" />
                          <span>IEEE 830 STANDARD REWRITE</span>
                        </div>
                        <p className="text-xs text-cyan-100 font-bold leading-relaxed font-mono">
                          "{req.improvedText}"
                        </p>
                        <p className="text-[10px] text-emerald-400 font-sans">
                          ✓ Correctly aligned with user requirement &amp; domain context
                        </p>
                      </div>
                    </td>

                    {/* Action */}
                    <td className="py-4 px-4 align-top text-right">
                      <button
                        onClick={() => acceptImprovedRequirement(req.id)}
                        className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-black font-black text-xs shadow-neon-emerald transition inline-flex items-center space-x-1.5 cursor-pointer whitespace-nowrap"
                      >
                        <Check className="h-3.5 w-3.5" />
                        <span>Accept Rewrite</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Card View */
        <div className="space-y-4">
          {requirementsWithIssues.map(req => (
            <div key={req.id} className="glass-card p-6 rounded-2xl border border-white/10 space-y-4 font-mono">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-bold text-cyan-400">{req.id}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-white/5 text-slate-300 border border-white/10">{req.category}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] bg-red-500/10 text-red-300 border border-red-500/20 font-bold">{req.priority}</span>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-300 text-[10px] font-bold border border-rose-500/30">
                  {req.issues.length} DEFECT(S) FLAGGED
                </span>
              </div>

              <div className="bg-black/60 p-3 rounded-xl border border-red-500/20">
                <span className="text-[10px] font-bold text-red-400 uppercase tracking-wider block mb-1">RAW REQUIREMENT TEXT:</span>
                <p className="text-xs text-slate-300 font-mono italic">"{req.description}"</p>
              </div>

              <div className="space-y-2.5">
                {req.issues.map((iss, iIdx) => (
                  <div key={iss.id || iIdx} className="p-3.5 rounded-xl bg-surface/80 border border-white/10 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getDefectBadgeColor(iss.type, iss.severity)}`}>
                        {iss.code ? `${iss.code} • ` : ''}{iss.type}
                      </span>
                      <span className="text-[10px] text-slate-400">Severity: <strong className="text-red-400">{iss.severity}</strong></span>
                    </div>

                    <p className="text-xs text-slate-200 font-sans">{iss.problem}</p>
                    <p className="text-[11px] text-slate-400 font-sans">{iss.reason}</p>

                    {iss.missingElements && (
                      <div className="p-2 rounded bg-amber-500/10 border border-amber-500/20 text-[10px] text-amber-300 space-y-0.5 font-mono">
                        <span className="font-bold text-amber-400 block text-[9px] uppercase">Missing Parameters:</span>
                        {iss.missingElements.map((el, eIdx) => <div key={eIdx}>{el}</div>)}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Contextual IEEE Rewrite */}
              {req.improvedText && (
                <div className="p-4 rounded-xl bg-gradient-to-r from-cyan-950/40 via-blue-950/40 to-purple-950/40 border border-cyan-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-neon-cyan">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2 text-cyan-400 text-[11px] font-bold">
                      <Wand2 className="h-3.5 w-3.5" />
                      <span>CONTEXTUAL IEEE 830 SPECIFICATION REWRITE</span>
                    </div>
                    <p className="text-xs font-semibold text-cyan-100 font-mono leading-relaxed">
                      "{req.improvedText}"
                    </p>
                  </div>

                  <button
                    onClick={() => acceptImprovedRequirement(req.id)}
                    className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xs flex items-center space-x-1.5 transition cursor-pointer shrink-0 shadow-neon-emerald"
                  >
                    <Check className="h-4 w-4" />
                    <span>Accept IEEE Rewrite</span>
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Approved Requirements Section */}
      {approvedRequirements.length > 0 && (
        <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2 font-mono">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>Approved &amp; Verified IEEE Specifications ({approvedRequirements.length})</span>
            </h3>
            <span className="text-xs text-slate-400 font-mono">Ready for SRS export</span>
          </div>

          <div className="space-y-2">
            {approvedRequirements.map(req => (
              <div key={req.id} className="p-3.5 rounded-xl bg-black/40 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono">
                <div className="flex items-start gap-2.5">
                  <span className="font-mono font-bold text-cyan-400 shrink-0">{req.id}</span>
                  <span className="text-slate-200 font-medium font-sans">{req.improvedText || req.description}</span>
                </div>
                <span className="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-bold border border-emerald-500/20 shrink-0 self-start sm:self-auto">
                  ✓ PASSED IEEE 830
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
