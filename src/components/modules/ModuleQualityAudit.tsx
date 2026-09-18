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
  Layers,
  Edit3,
  X,
  FileCheck2,
  AlertCircle
} from 'lucide-react';
import { useProject } from '../../context/ProjectContext';
import { Requirement } from '../../types';

export const ModuleQualityAudit: React.FC = () => {
  const { 
    currentProject, 
    acceptImprovedRequirement, 
    editAndApproveRequirement, 
    rejectRequirementRewrite 
  } = useProject();
  
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');
  const [selectedFilter, setSelectedFilter] = useState<string>('ALL');
  const [editingReqId, setEditingReqId] = useState<string | null>(null);
  const [editText, setEditText] = useState<string>('');

  if (!currentProject) return null;

  // 1. Explicitly approved & verified requirements (SRS Ready)
  const approvedRequirements = currentProject.requirements.filter(
    r => r.status === 'USER_APPROVED' &&
         (r.reviewDecision === 'Approved' || r.reviewDecision === 'Modified') &&
         r.isSRSReady === true &&
         Boolean(r.approvedText && r.approvedText.trim().length > 0)
  );
  
  // 2. Requirements awaiting review or refinement (one entry per requirement)
  const pendingRequirements = currentProject.requirements.filter(
    r => !approvedRequirements.some(app => app.id === r.id)
  );

  // Filter pending requirements based on defect code or category
  const filteredRequirements = selectedFilter === 'ALL'
    ? pendingRequirements
    : pendingRequirements.filter(req => 
        req.issues.some(issue => 
          issue.type.toLowerCase().includes(selectedFilter.toLowerCase()) ||
          (issue.code && issue.code.toLowerCase().includes(selectedFilter.toLowerCase()))
        )
      );

  const totalDefectsCount = pendingRequirements.flatMap(r => r.issues).length;
  const criticalDefectsCount = pendingRequirements.flatMap(r => r.issues).filter(i => i.severity === 'Critical').length;

  const healthScore = Math.max(
    0, 
    Math.round(((approvedRequirements.length) / Math.max(currentProject.requirements.length, 1)) * 100)
  );

  const filterCategories = [
    { label: 'All Pending Reqs', value: 'ALL', count: pendingRequirements.length },
    { label: '🔴 Ambiguity (DEF-01)', value: 'Ambiguity', count: pendingRequirements.filter(r => r.issues.some(i => i.code === 'DEF-01' || i.category?.includes('Ambiguity') || i.type.includes('Ambiguity'))).length },
    { label: '🔴 Non-Testable (DEF-02)', value: 'Non-Verifiable', count: pendingRequirements.filter(r => r.issues.some(i => i.code === 'DEF-02' || i.category?.includes('Non-Verifiable') || i.type.includes('Non-Verifiable'))).length },
    { label: '🟠 Incomplete (DEF-03)', value: 'Incomplete', count: pendingRequirements.filter(r => r.issues.some(i => i.code === 'DEF-03' || i.category?.includes('Incomplete') || i.type.includes('Incomplete'))).length },
    { label: '🟠 Missing Actor (DEF-04)', value: 'Missing Actor', count: pendingRequirements.filter(r => r.issues.some(i => i.code === 'DEF-04' || i.category?.includes('Missing Actor') || i.type.includes('Missing Actor'))).length },
    { label: '🟠 Missing Object (DEF-05)', value: 'Missing Object', count: pendingRequirements.filter(r => r.issues.some(i => i.code === 'DEF-05' || i.category?.includes('Missing Object') || i.type.includes('Missing Object'))).length },
    { label: '🟠 Missing Trigger (DEF-06)', value: 'Missing Condition', count: pendingRequirements.filter(r => r.issues.some(i => i.code === 'DEF-06' || i.category?.includes('Missing Condition') || i.type.includes('Missing Condition'))).length },
    { label: '🟠 Compound / Non-Atomic (DEF-07)', value: 'Compound', count: pendingRequirements.filter(r => r.issues.some(i => i.code === 'DEF-07' || i.category?.includes('Compound') || i.type.includes('Compound'))).length },
    { label: '🔴 Undefined Quantity (DEF-08)', value: 'Undefined Quantity', count: pendingRequirements.filter(r => r.issues.some(i => i.code === 'DEF-08' || i.category?.includes('Undefined Quantity') || i.type.includes('Undefined Quantity'))).length },
    { label: '🟡 Subjective Terms (DEF-09)', value: 'Subjective', count: pendingRequirements.filter(r => r.issues.some(i => i.code === 'DEF-09' || i.category?.includes('Subjective') || i.type.includes('Subjective'))).length },
    { label: '🟡 Optional / Modal (DEF-10)', value: 'Optional', count: pendingRequirements.filter(r => r.issues.some(i => i.code === 'DEF-10' || i.category?.includes('Optional') || i.type.includes('Optional'))).length },
    { label: '🔴 Pronoun Ambiguity (DEF-11)', value: 'Pronoun', count: pendingRequirements.filter(r => r.issues.some(i => i.code === 'DEF-11' || i.category?.includes('Pronoun') || i.type.includes('Pronoun'))).length },
    { label: '🟡 Acceptance Criteria (DEF-12)', value: 'Acceptance Criteria', count: pendingRequirements.filter(r => r.issues.some(i => i.code === 'DEF-12' || i.category?.includes('Acceptance Criteria') || i.type.includes('Acceptance Criteria'))).length },
    { label: '🟡 Duplicate (DEF-13)', value: 'Duplicate', count: pendingRequirements.filter(r => r.issues.some(i => i.code === 'DEF-13' || i.category?.includes('Duplicate') || i.type.includes('Duplicate'))).length },
    { label: '🔴 Contradiction (DEF-14)', value: 'Contradiction', count: pendingRequirements.filter(r => r.issues.some(i => i.code === 'DEF-14' || i.category?.includes('Contradiction') || i.type.includes('Contradiction'))).length },
    { label: '🔵 Traceability Gap (DEF-15)', value: 'Traceability', count: pendingRequirements.filter(r => r.issues.some(i => i.code === 'DEF-15' || i.category?.includes('Traceability') || i.type.includes('Traceability'))).length },
  ].filter(c => c.value === 'ALL' || c.count > 0);

  const getDefectBadgeColor = (type: string, severity: string) => {
    if (severity === 'Critical') return 'bg-red-500/20 text-red-300 border-red-500/40 shadow-neon-red';
    if (type.includes('Ambigu') || type.includes('Vague') || type.includes('Pronoun')) return 'bg-rose-500/20 text-rose-300 border-rose-500/40';
    if (type.includes('Incomplete') || type.includes('Compound') || type.includes('Atomic') || type.includes('Actor') || type.includes('Object') || type.includes('Condition')) return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
    if (type.includes('Quantity') || type.includes('Contradiction')) return 'bg-red-500/20 text-red-300 border-red-500/30';
    if (type.includes('Security')) return 'bg-violet-500/20 text-violet-300 border-violet-500/40 shadow-neon-violet';
    if (type.includes('Traceability')) return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 shadow-neon-cyan';
    return 'bg-blue-500/20 text-blue-300 border-blue-500/40';
  };

  const handleStartEdit = (reqId: string, currentProposalText: string) => {
    setEditingReqId(reqId);
    setEditText(currentProposalText);
  };

  const handleSaveEdit = (reqId: string) => {
    if (editText.trim()) {
      editAndApproveRequirement(reqId, editText.trim());
      setEditingReqId(null);
      setEditText('');
    }
  };

  const handleCancelEdit = () => {
    setEditingReqId(null);
    setEditText('');
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="glass-card neon-card-violet p-6 rounded-2xl border border-violet-500/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-neon-violet">
        <div>
          <div className="flex items-center space-x-2 text-cyan-400 text-xs font-bold font-mono mb-1">
            <ShieldCheck className="h-4 w-4" />
            <span>MODULE 3 &amp; 4 • IEEE 29148 / 830 QUALITY AUDIT &amp; APPROVAL LIFECYCLE</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white font-mono">IEEE Requirements Quality &amp; Approval Lifecycle</h1>
          <p className="text-xs text-slate-300 mt-1 max-w-3xl">
            ISO/IEC/IEEE 29148 &amp; IEEE 830 Quality Verification for <strong className="text-cyan-300 font-mono">{currentProject.name}</strong>. Raw inputs undergo defect detection, grammatical normalization, and safe suggestion generation. AI rewrites <span className="text-rose-300 font-bold underline">never auto-approve</span>: human review and explicit approval are strictly mandated before SRS baseline export.
          </p>
        </div>

        {/* Audit Score Badges */}
        <div className="flex items-center gap-3 bg-surface/90 px-4 py-2.5 rounded-xl border border-white/10 shadow-lg">
          <div className="text-right font-mono">
            <p className="text-[10px] text-slate-400">IEEE Approval Progress</p>
            {currentProject.requirements.length === 0 ? (
              <p className="text-sm font-bold text-slate-400 italic">Insufficient data</p>
            ) : (
              <p className={`text-xl font-black ${healthScore >= 80 ? 'text-emerald-400' : 'text-amber-400'}`}>
                {approvedRequirements.length} / {currentProject.requirements.length}
              </p>
            )}
          </div>
          <div className="h-8 w-px bg-white/10" />
          <div className="text-left font-mono">
            <p className="text-[10px] text-slate-400">Active Defects</p>
            {currentProject.requirements.length === 0 ? (
              <p className="text-sm font-bold text-slate-400 italic">Insufficient data</p>
            ) : (
              <p className="text-xl font-black text-rose-400">{totalDefectsCount}</p>
            )}
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
            <span className="text-[10px] text-slate-400 uppercase block">Total Ingested</span>
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
            <span className="text-[10px] text-slate-400 uppercase block">Needs Refinement</span>
            <span className="text-base font-bold text-amber-300">{pendingRequirements.length} Awaiting</span>
          </div>
        </div>

        <div className="glass-card p-3.5 rounded-xl border border-white/10 flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <CheckCircle2 className="h-4 w-4" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase block">User-Approved Reqs</span>
            <span className="text-base font-bold text-emerald-300">{approvedRequirements.length} SRS Ready</span>
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

      {/* Main Pending Requirements Area */}
      {pendingRequirements.length === 0 ? (
        <div className="glass-card p-10 rounded-2xl border border-emerald-500/30 text-center space-y-3 shadow-neon-emerald">
          <CheckCircle2 className="h-12 w-12 text-emerald-400 mx-auto" />
          <h3 className="text-lg font-bold text-white font-mono">All Requirements Reviewed &amp; Approved!</h3>
          <p className="text-xs text-slate-300 max-w-md mx-auto font-sans">
            Every specification in <strong className="text-cyan-300">{currentProject.name}</strong> has been verified, quality-cleared, and explicitly user-approved. The specification baseline is fully prepared for SRS export.
          </p>
        </div>
      ) : viewMode === 'table' ? (
        /* Comprehensive 20-Problem Defect Matrix Table (ONE ROW PER REQUIREMENT) */
        <div className="glass-card rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs font-mono">
              <thead>
                <tr className="border-b border-white/15 bg-black/60 text-slate-400 uppercase text-[10px] tracking-wider">
                  <th className="py-3.5 px-4 font-bold min-w-[130px]">Req ID &amp; State</th>
                  <th className="py-3.5 px-4 font-bold min-w-[200px]">Original User Input</th>
                  <th className="py-3.5 px-4 font-bold min-w-[220px]">Detected Quality Defects</th>
                  <th className="py-3.5 px-4 font-bold min-w-[220px]">IEEE Justification</th>
                  <th className="py-3.5 px-4 font-bold min-w-[280px]">Safe Normalized IEEE Rewrite</th>
                  <th className="py-3.5 px-4 font-bold text-right min-w-[150px]">Human Review Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredRequirements.map(req => {
                  const rawText = req.rawSource || req.originalRawText || req.description;
                  const proposalText = req.suggestedText || req.improvedText || req.description;
                  const isEditing = editingReqId === req.id;

                  return (
                    <tr key={req.id} className="hover:bg-white/[0.02] transition">
                      {/* Req ID & Primary Classification */}
                      <td className="py-4 px-4 align-top">
                        <div className="space-y-1.5">
                          <span className="font-bold text-cyan-400 text-xs block">{req.id}</span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-white/5 text-slate-300 border border-white/10 block w-fit">
                            {req.category}
                          </span>
                          
                          {/* Lifecycle Status Badge */}
                          <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold border block w-fit ${
                            req.status === 'USER_EDITED' 
                              ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' 
                              : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                          }`}>
                            {req.status === 'USER_EDITED' ? 'USER EDITED' : 'NEEDS REVIEW'}
                          </span>

                          <span className={`px-1.5 py-0.2 rounded text-[9px] font-bold block w-fit ${
                            req.priority === 'Critical' ? 'text-red-400 bg-red-500/10' :
                            req.priority === 'High' ? 'text-amber-400 bg-amber-500/10' : 'text-blue-400 bg-blue-500/10'
                          }`}>
                            {req.priority}
                          </span>

                          {/* Secondary Semantic Tags */}
                          {req.tags && req.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-1">
                              {req.tags.map((tag, tIdx) => (
                                <span key={tIdx} className="px-1.5 py-0.2 rounded text-[8px] bg-cyan-950/40 text-cyan-300 border border-cyan-800/30">
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Raw Immutable User Input */}
                      <td className="py-4 px-4 align-top">
                        <div className="p-2.5 rounded-lg bg-black/60 border border-amber-500/20 text-slate-200 text-xs font-sans leading-relaxed">
                          "{rawText}"
                        </div>
                        <span className="text-[9px] text-slate-500 font-mono mt-1 block">
                          Original Immutable Source Trace
                        </span>
                      </td>

                      {/* Detected Quality Defects */}
                      <td className="py-4 px-4 align-top">
                        {req.issues.length === 0 ? (
                          <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-[11px] font-mono">
                            ✓ No defects detected. Awaiting explicit user approval.
                          </div>
                        ) : (
                          <div className="space-y-2">
                            {req.issues.map((issue, issIdx) => (
                              <div key={issue.id || issIdx} className="p-2.5 rounded-lg bg-black/40 border border-white/5 space-y-1.5">
                                <div className="flex items-center justify-between gap-1">
                                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold border ${getDefectBadgeColor(issue.category || issue.type, issue.severity)}`}>
                                    {issue.code ? `${issue.code} • ` : ''}{issue.category || issue.type}
                                  </span>
                                  <span className={`text-[9px] font-bold ${issue.severity === 'Critical' ? 'text-red-400' : 'text-amber-400'}`}>
                                    {issue.severity}
                                  </span>
                                </div>
                                {issue.problematicPhrase && (
                                  <div className="text-[10px] text-rose-300 font-mono">
                                    <span className="text-slate-500">Phrase: </span>
                                    <span className="bg-rose-950/60 px-1.5 py-0.5 rounded border border-rose-800/40 font-bold">"{issue.problematicPhrase}"</span>
                                  </div>
                                )}
                                <p className="text-[11px] text-slate-300 font-sans leading-snug">
                                  {issue.explanation || issue.problem}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}
                      </td>

                      {/* Missing Elements / Suggested Improvement */}
                      <td className="py-4 px-4 align-top space-y-2">
                        {req.issues.length === 0 ? (
                          <p className="text-[11px] text-slate-400 font-sans">
                            ISO/IEC/IEEE 29148 mandates explicit stakeholder authorization prior to software baseline freezing.
                          </p>
                        ) : (
                          req.issues.map((issue, issIdx) => (
                            <div key={issIdx} className="p-2 rounded-lg bg-black/30 border border-white/5 space-y-1.5">
                              <p className="text-[11px] text-slate-300 font-sans leading-relaxed">
                                {issue.reason}
                              </p>
                              {(issue.suggestedImprovement || issue.suggestedCorrection) && (
                                <div className="p-1.5 rounded bg-cyan-950/30 border border-cyan-800/30 text-[10px] text-cyan-300">
                                  <strong className="block text-cyan-400 uppercase text-[8px]">Suggested Improvement:</strong>
                                  {issue.suggestedImprovement || issue.suggestedCorrection}
                                </div>
                              )}
                              {issue.missingElements && issue.missingElements.length > 0 && (
                                <div className="p-1.5 rounded bg-amber-500/10 border border-amber-500/20 text-[9px] text-amber-300">
                                  <strong className="block text-amber-400 uppercase text-[8px]">Missing:</strong>
                                  {issue.missingElements.join(', ')}
                                </div>
                              )}
                            </div>
                          ))
                        )}
                      </td>

                      {/* Contextual IEEE Rewrite & Optional Refinement */}
                      <td className="py-4 px-4 align-top">
                        {isEditing ? (
                          <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-400 space-y-2">
                            <span className="text-[10px] font-bold text-cyan-400 uppercase block">Manual Specification Editor:</span>
                            <textarea
                              value={editText}
                              onChange={e => setEditText(e.target.value)}
                              rows={3}
                              className="w-full p-2 bg-black/70 border border-white/20 rounded-lg text-xs font-mono text-white focus:outline-none focus:border-cyan-400"
                              placeholder="Enter normalized specification..."
                            />
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleSaveEdit(req.id)}
                                className="px-2.5 py-1 rounded bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-[10px] cursor-pointer"
                              >
                                Save &amp; Run Audit
                              </button>
                              <button
                                onClick={handleCancelEdit}
                                className="px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-slate-300 text-[10px] cursor-pointer"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <div className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-500/30 space-y-1.5 shadow-neon-cyan">
                              <div className="flex items-center space-x-1.5 text-cyan-400 text-[10px] font-bold">
                                <Wand2 className="h-3 w-3" />
                                <span>SAFE IEEE 830 PROPOSAL</span>
                              </div>
                              <p className="text-xs text-cyan-100 font-bold leading-relaxed font-mono">
                                "{proposalText}"
                              </p>
                              <p className="text-[9px] text-slate-400">
                                ✓ Safe grammatical normalization • Zero invented numerical assumptions
                              </p>
                            </div>

                            {/* Optional Refinement Card (isolated [AI Suggested Value]) */}
                            {req.optionalRefinement && (
                              <div className="p-2.5 rounded-lg bg-purple-950/30 border border-purple-500/30 text-[10px] text-purple-200 space-y-1">
                                <div className="flex items-center space-x-1 text-purple-400 font-bold text-[9px]">
                                  <Sparkles className="h-3 w-3" />
                                  <span>AI SUGGESTED VALUE [OPTIONAL REFINEMENT]</span>
                                </div>
                                <p className="font-sans leading-relaxed">{req.optionalRefinement}</p>
                                <p className="text-[8px] text-slate-400 italic">
                                  * Excluded from SRS unless explicitly adopted by user.
                                </p>
                              </div>
                            )}
                          </div>
                        )}
                      </td>

                      {/* Remediation Action Buttons (Operates strictly on req.id) */}
                      <td className="py-4 px-4 align-top text-right">
                        <div className="flex flex-col items-end gap-1.5">
                          <button
                            onClick={() => acceptImprovedRequirement(req.id)}
                            className="px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 hover:border-emerald-400 font-bold text-[11px] shadow-neon-emerald transition inline-flex items-center space-x-1 cursor-pointer whitespace-nowrap"
                            title={`Accept Safe Proposal for ${req.id}`}
                          >
                            <Check className="h-3.5 w-3.5" />
                            <span>Accept Proposal</span>
                          </button>

                          <button
                            onClick={() => handleStartEdit(req.id, proposalText)}
                            className="px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 hover:border-cyan-400 font-bold text-[11px] transition inline-flex items-center space-x-1 cursor-pointer whitespace-nowrap"
                            title={`Edit Spec for ${req.id}`}
                          >
                            <Edit3 className="h-3.5 w-3.5" />
                            <span>Edit Spec</span>
                          </button>

                          <button
                            onClick={() => rejectRequirementRewrite(req.id)}
                            className="px-3 py-1.5 rounded-lg bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 border border-rose-500/30 hover:border-rose-400 font-bold text-[11px] transition inline-flex items-center space-x-1 cursor-pointer whitespace-nowrap"
                            title={`Reject Rewrite for ${req.id}`}
                          >
                            <X className="h-3.5 w-3.5" />
                            <span>Reject</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Card View (ONE CARD PER REQUIREMENT) */
        <div className="space-y-4">
          {filteredRequirements.map(req => {
            const rawText = req.rawSource || req.originalRawText || req.description;
            const proposalText = req.suggestedText || req.improvedText || req.description;

            return (
              <div key={req.id} className="glass-card p-6 rounded-2xl border border-white/10 space-y-4 font-mono">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-cyan-400">{req.id}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-white/5 text-slate-300 border border-white/10">{req.category}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] bg-red-500/10 text-red-300 border border-red-500/20 font-bold">{req.priority}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                      req.status === 'USER_EDITED' 
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30' 
                        : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                    }`}>
                      {req.status === 'USER_EDITED' ? 'USER EDITED' : 'NEEDS REVIEW'}
                    </span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-300 text-[10px] font-bold border border-rose-500/30">
                    {req.issues.length} DEFECT(S) FLAGGED
                  </span>
                </div>

                {/* Raw User Input */}
                <div className="bg-black/60 p-3 rounded-xl border border-amber-500/20">
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block mb-1">
                    ORIGINAL RAW USER REQUIREMENT [TRACEABILITY ROOT]:
                  </span>
                  <p className="text-xs text-slate-200 font-mono italic">"{rawText}"</p>
                </div>

                {/* Issues List */}
                <div className="space-y-2.5">
                  {req.issues.map((iss, iIdx) => (
                    <div key={iss.id || iIdx} className="p-3.5 rounded-xl bg-surface/80 border border-white/10 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getDefectBadgeColor(iss.category || iss.type, iss.severity)}`}>
                          {iss.code ? `${iss.code} • ` : ''}{iss.category || iss.type}
                        </span>
                        <span className="text-[10px] text-slate-400">Severity: <strong className="text-red-400">{iss.severity}</strong></span>
                      </div>

                      {iss.problematicPhrase && (
                        <div className="text-[10px] text-rose-300 font-mono">
                          <span className="text-slate-500">Phrase: </span>
                          <span className="bg-rose-950/60 px-1.5 py-0.5 rounded border border-rose-800/40 font-bold">"{iss.problematicPhrase}"</span>
                        </div>
                      )}

                      <p className="text-xs text-slate-200 font-sans">{iss.explanation || iss.problem}</p>
                      <p className="text-[11px] text-slate-400 font-sans">{iss.reason}</p>

                      {(iss.suggestedImprovement || iss.suggestedCorrection) && (
                        <div className="p-2 rounded bg-cyan-950/30 border border-cyan-800/30 text-[10px] text-cyan-300">
                          <strong className="block text-cyan-400 uppercase text-[9px] mb-0.5">Suggested Improvement:</strong>
                          {iss.suggestedImprovement || iss.suggestedCorrection}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Safe Rewrite Proposal */}
                {editingReqId === req.id ? (
                  <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-400 space-y-2">
                    <span className="text-xs font-bold text-cyan-300 uppercase block">Manual Specification Editor:</span>
                    <textarea
                      value={editText}
                      onChange={e => setEditText(e.target.value)}
                      rows={3}
                      className="w-full p-2.5 bg-black/70 border border-white/20 rounded-lg text-xs font-mono text-white focus:outline-none focus:border-cyan-400"
                    />
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleSaveEdit(req.id)}
                        className="px-3.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs cursor-pointer shadow-neon-emerald"
                      >
                        Save &amp; Run Audit
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 text-xs cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-neon-cyan">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2 text-cyan-400 text-[11px] font-bold">
                        <Wand2 className="h-3.5 w-3.5" />
                        <span>SAFE IEEE 830 STANDARD REWRITE</span>
                      </div>
                      <p className="text-xs font-semibold text-cyan-100 font-mono leading-relaxed">
                        "{proposalText}"
                      </p>
                      {req.optionalRefinement && (
                        <div className="mt-2 p-2 rounded bg-purple-950/40 border border-purple-500/30 text-[10px] text-purple-200">
                          <strong className="text-purple-400 block mb-0.5">Optional Refinement [AI Suggested Value]:</strong>
                          {req.optionalRefinement}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => acceptImprovedRequirement(req.id)}
                        className="px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xs flex items-center space-x-1.5 transition cursor-pointer shadow-neon-emerald"
                      >
                        <Check className="h-4 w-4" />
                        <span>Accept Proposal</span>
                      </button>
                      <button
                        onClick={() => handleStartEdit(req.id, proposalText)}
                        className="px-3.5 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-400/40 font-bold text-xs flex items-center space-x-1.5 transition cursor-pointer"
                      >
                        <Edit3 className="h-4 w-4" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => rejectRequirementRewrite(req.id)}
                        className="px-3 py-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-400/40 font-bold text-xs flex items-center space-x-1.5 transition cursor-pointer"
                      >
                        <X className="h-4 w-4" />
                        <span>Reject</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Approved Requirements Section (ONLY Explicitly User-Approved Reqs with Valid Text) */}
      <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
          <h3 className="text-base font-bold text-white flex items-center gap-2 font-mono">
            <FileCheck2 className="h-5 w-5 text-emerald-400" />
            <span>Approved &amp; Verified IEEE Specifications ({approvedRequirements.length})</span>
          </h3>
          <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-full border ${
            approvedRequirements.length === currentProject.requirements.length && currentProject.requirements.length > 0
              ? 'text-emerald-300 bg-emerald-500/10 border-emerald-500/30'
              : 'text-amber-300 bg-amber-500/10 border-amber-500/30'
          }`}>
            {approvedRequirements.length === currentProject.requirements.length && currentProject.requirements.length > 0
              ? '✓ Full Project SRS Ready'
              : `${pendingRequirements.length} Requirement(s) Pending Review`}
          </span>
        </div>

        {approvedRequirements.length === 0 ? (
          <div className="p-4 rounded-xl bg-black/40 border border-amber-500/20 text-center space-y-1 text-xs text-slate-400 font-sans">
            <AlertCircle className="h-5 w-5 text-amber-400 mx-auto mb-1" />
            <p className="font-semibold text-slate-300">No specifications have been approved yet.</p>
            <p>AI suggestions are held in draft state. Review the proposals above and click <strong className="text-emerald-400">[Accept Proposal]</strong> or <strong className="text-cyan-400">[Edit Spec]</strong> to promote them to the approved SRS baseline.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {approvedRequirements.map(req => (
              <div key={req.id} className="p-3.5 rounded-xl bg-black/40 border border-emerald-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono">
                <div className="flex items-start gap-2.5">
                  <span className="font-mono font-bold text-cyan-400 shrink-0">{req.id}</span>
                  <div>
                    <span className="text-slate-200 font-medium font-sans block">{req.approvedText || req.description}</span>
                    {req.rawSource && req.rawSource !== (req.approvedText || req.description) && (
                      <span className="text-[10px] text-slate-500 italic block mt-0.5">
                        Raw Source Trace: "{req.rawSource}"
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto">
                  <span className="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-bold border border-emerald-500/20">
                    {req.reviewDecision === 'Modified' ? '✓ USER EDITED & APPROVED' : '✓ USER APPROVED'}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-emerald-950/40 text-emerald-300 border border-emerald-700/40">
                    SRS READY
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
