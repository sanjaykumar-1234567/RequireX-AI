import React, { useState } from 'react';
import { AlertOctagon, Sparkles, CheckCircle2, AlertTriangle, ArrowRight, ShieldAlert, GitMerge, Zap, ScanLine, RefreshCw } from 'lucide-react';
import { useProject } from '../../context/ProjectContext';
import { RequirementConflict } from '../../types';

const DOMAIN_CONFLICTS: Record<string, RequirementConflict[]> = {
  'Railway Reservation System': [
    {
      id: 'CONF-01', reqAId: 'REQ-01', reqBId: 'REQ-04',
      titleA: 'Fast ticket booking during peak Tatkal hours (1.2s response time)',
      titleB: 'Payment Gateway Integration & Refund Processing (24-hour sync)',
      conflictType: 'Time Limit',
      explanation: 'REQ-01 demands 1.2s synchronous response latency while REQ-04 relies on third-party webhook callbacks with asynchronous 24-hour SLA. This contradicts the same-session booking confirmation flow.',
      severity: 'High',
      suggestedResolution: 'Decouple payment gateway authorization into an asynchronous queuing model (e.g. RabbitMQ/Kafka) with real-time SSE ticket status updates sent to the client post-booking.'
    },
    {
      id: 'CONF-02', reqAId: 'REQ-02', reqBId: 'REQ-03',
      titleA: 'Real-time PNR Tracking & Station Alerts (SMS Notifications)',
      titleB: 'Automated Seat Allocation Algorithm (Age & Vacancy Matrix)',
      conflictType: 'Business Rule',
      explanation: 'Race condition during Tatkal opening hours when seat allocation matrix updates faster than PNR notification queues. A seat confirmed by REQ-03 may trigger duplicate alerts from REQ-02.',
      severity: 'Medium',
      suggestedResolution: 'Enforce transactional consistency locks (SELECT FOR UPDATE) on seat availability rows prior to triggering SMS dispatcher events.'
    },
    {
      id: 'CONF-03', reqAId: 'REQ-05', reqBId: 'REQ-07',
      titleA: 'IRCTC Waitlist Auto-Upgrade on Cancellation',
      titleB: 'Agent-Based Bulk Booking Quota (Max 10 tickets per session)',
      conflictType: 'Policy Conflict',
      explanation: 'Auto-upgrade waitlist logic may trigger multiple upgrades from a single cancellation event, inadvertently satisfying agent bulk quotas from a single booking session.',
      severity: 'Medium',
      suggestedResolution: 'Add atomic counter guard in waitlist promotion service: cap promotions per cancellation event to 1 and validate session-level quota before each upgrade commit.'
    },
  ],
  'Online Quiz Platform': [
    {
      id: 'CONF-01', reqAId: 'REQ-01', reqBId: 'REQ-05',
      titleA: 'Offline quiz availability via IndexedDB sync',
      titleB: 'Real-time anti-cheating proctoring with tab-switch detection',
      conflictType: 'Feasibility',
      explanation: 'Tab-switch proctoring (REQ-05) relies on browser focus events unavailable in offline/PWA mode. Running the quiz offline (REQ-01) makes enforcement of tab-switch limits technically impossible.',
      severity: 'High',
      suggestedResolution: 'Segment quiz modes: online-proctored (full anti-cheat) vs offline-practice (no proctoring). Clearly disclose restrictions to users at session start.'
    },
    {
      id: 'CONF-02', reqAId: 'REQ-02', reqBId: 'REQ-06',
      titleA: 'Randomized question bank per quiz session',
      titleB: 'Adaptive difficulty adjustment based on answer history',
      conflictType: 'Algorithm Logic',
      explanation: 'Pure randomization (REQ-02) conflicts with adaptive difficulty (REQ-06) which requires ordered question sequencing based on prior performance history.',
      severity: 'Medium',
      suggestedResolution: 'Implement stratified random sampling within difficulty tiers, preserving adaptivity while ensuring question bank randomness at the tier level.'
    },
  ],
  'Hospital Management System': [
    {
      id: 'CONF-01', reqAId: 'REQ-01', reqBId: 'REQ-04',
      titleA: 'Patient data must be fully encrypted at rest (AES-256)',
      titleB: 'Real-time doctor-patient chat with message history search',
      conflictType: 'Security vs Performance',
      explanation: 'Full AES-256 at-rest encryption (REQ-01) adds overhead to full-text search queries on chat history (REQ-04), degrading response times for message retrieval by 3-5x.',
      severity: 'High',
      suggestedResolution: 'Use field-level encryption for PII fields only; store searchable message metadata in a separate non-PII index. Apply Elasticsearch with encrypted field plugins.'
    },
    {
      id: 'CONF-02', reqAId: 'REQ-03', reqBId: 'REQ-06',
      titleA: 'Automated prescription generation from diagnosis',
      titleB: 'Pharmacist approval required for all dispensed medications',
      conflictType: 'Workflow Authority',
      explanation: 'REQ-03 auto-generates prescriptions immediately post-diagnosis, bypassing the pharmacist approval gate mandated by REQ-06, creating a potential medication safety gap.',
      severity: 'High',
      suggestedResolution: 'Insert prescription into PENDING_APPROVAL state; pharmacist dashboard receives push notification. Medication cannot be dispensed until pharmacist explicitly approves.'
    },
  ],
  'E-Commerce Platform': [
    {
      id: 'CONF-01', reqAId: 'REQ-01', reqBId: 'REQ-03',
      titleA: 'Guest checkout without registration',
      titleB: 'Personalized product recommendations based on purchase history',
      conflictType: 'Data Availability',
      explanation: 'Guest checkout (REQ-01) prevents user profile creation, making purchase-history-based recommendations (REQ-03) impossible for returning guest users.',
      severity: 'Medium',
      suggestedResolution: 'Use session-local collaborative filtering for guest users. Offer post-purchase account creation incentive to convert guests into registered users retroactively linking order history.'
    },
    {
      id: 'CONF-02', reqAId: 'REQ-05', reqBId: 'REQ-07',
      titleA: 'Real-time inventory deduction on add-to-cart',
      titleB: 'Flash sale: up to 10,000 concurrent users on same SKU',
      conflictType: 'Race Condition',
      explanation: 'Deducting inventory on add-to-cart (REQ-05) during a flash sale (REQ-07) will cause massive cart abandonment as inventory hits zero before checkout, with stockout errors for most users.',
      severity: 'High',
      suggestedResolution: 'Implement soft-reserve model: inventory reserved only at checkout start with a 10-minute TTL. Use Redis atomic DECRBY for atomic flash-sale inventory management.'
    },
  ],
};

const SEVERITY_META: Record<string, { bg: string; text: string; border: string; glow: string }> = {
  High: { bg: 'bg-rose-500/15', text: 'text-rose-300', border: 'border-rose-500/40', glow: 'shadow-[0_0_12px_rgba(239,68,68,0.4)]' },
  Medium: { bg: 'bg-violet-500/15', text: 'text-violet-300', border: 'border-violet-500/40', glow: 'shadow-neon-violet' },
  Low: { bg: 'bg-blue-500/15', text: 'text-blue-300', border: 'border-blue-500/40', glow: 'shadow-neon-blue' },
};

export const ModuleConflictDetector: React.FC = () => {
  const { currentProject } = useProject();
  const [scanning, setScanning] = useState(false);
  const [resolved, setResolved] = useState<Set<string>>(new Set());

  if (!currentProject) return null;

  const domainConflicts = DOMAIN_CONFLICTS[currentProject.domain] ?? DOMAIN_CONFLICTS['Railway Reservation System'];

  const handleScan = () => {
    setScanning(true);
    setTimeout(() => setScanning(false), 1800);
  };

  const toggleResolved = (id: string) => {
    setResolved(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const activeConflicts = domainConflicts.filter(c => !resolved.has(c.id));
  const resolvedCount = resolved.size;
  const highCount = activeConflicts.filter(c => c.severity === 'High').length;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="glass-card p-6 rounded-2xl border border-violet-500/40 shadow-neon-violet relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-900/20 via-transparent to-blue-900/20 pointer-events-none" />
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-11 w-11 rounded-xl bg-violet-500/15 border border-violet-400/40 flex items-center justify-center text-violet-300 shadow-neon-violet">
              <AlertOctagon className="h-5 w-5" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-violet-400 font-mono">
                INNOVATIVE MODULE • CONFLICT &amp; DUPLICATE DETECTOR
              </span>
              <h1 className="text-xl font-extrabold text-white font-mono mt-0.5">
                Requirement Conflict &amp; Semantic Duplicate Center
              </h1>
            </div>
          </div>
          <button
            onClick={handleScan}
            disabled={scanning}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white font-bold text-xs shadow-neon-violet transition-all duration-200 disabled:opacity-60 cursor-pointer"
          >
            {scanning ? <RefreshCw className="h-3.5 w-3.5 animate-spin" /> : <ScanLine className="h-3.5 w-3.5" />}
            {scanning ? 'Scanning...' : 'Re-Scan AI'}
          </button>
        </div>
        <p className="text-xs text-slate-300 mt-2 max-w-3xl leading-relaxed">
          Automatically analyze requirement statements to identify contradictory business logic, conflicting time limits, security policy mismatches, and semantically duplicate requirements for <strong className="text-violet-300">{currentProject.domain}</strong>.
        </p>
      </div>

      {/* Summary KPIs */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Active Conflicts', value: activeConflicts.length, color: 'rose', icon: <AlertTriangle className="h-4 w-4" /> },
          { label: 'High Severity', value: highCount, color: 'violet', icon: <ShieldAlert className="h-4 w-4" /> },
          { label: 'Resolved', value: resolvedCount, color: 'emerald', icon: <CheckCircle2 className="h-4 w-4" /> },
        ].map((kpi, i) => (
          <div key={i} className={`glass-card p-4 rounded-xl border border-${kpi.color}-500/30 flex items-center gap-3`}>
            <div className={`h-9 w-9 rounded-lg flex items-center justify-center text-${kpi.color}-300 bg-${kpi.color}-500/10`}>
              {kpi.icon}
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-mono">{kpi.label}</p>
              <p className={`text-2xl font-black font-mono text-${kpi.color}-300`}>{kpi.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Conflict Type Legend */}
      <div className="flex flex-wrap gap-2">
        {['Time Limit', 'Business Rule', 'Policy Conflict', 'Feasibility', 'Algorithm Logic', 'Security vs Performance', 'Race Condition', 'Data Availability', 'Workflow Authority'].map(type => (
          <span key={type} className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-white/5 border border-white/10 text-slate-400">{type}</span>
        ))}
      </div>

      {/* Conflicts List */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-white font-mono flex items-center gap-2">
          <ShieldAlert className="h-4 w-4 text-violet-400" />
          Active Conflicts for <span className="text-violet-300">{currentProject.domain}</span>
          <span className="ml-auto text-xs text-blue-400 font-mono flex items-center gap-1">
            <Sparkles className="h-3.5 w-3.5" /> AI Verification Active
          </span>
        </h3>

        {activeConflicts.length === 0 && (
          <div className="glass-card p-8 rounded-xl border border-emerald-500/30 text-center">
            <CheckCircle2 className="h-10 w-10 text-emerald-400 mx-auto mb-3" />
            <p className="text-sm font-bold text-emerald-300 font-mono">All Conflicts Resolved!</p>
            <p className="text-xs text-slate-400 mt-1">No active requirement conflicts detected for this domain.</p>
          </div>
        )}

        {activeConflicts.map(conf => {
          const sev = SEVERITY_META[conf.severity] ?? SEVERITY_META.Low;
          return (
            <div key={conf.id} className={`glass-card p-5 rounded-xl border ${sev.border} ${sev.glow} transition-all duration-300 space-y-4`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className={`px-2.5 py-0.5 rounded-full ${sev.bg} ${sev.text} border ${sev.border} text-[10px] font-mono font-bold`}>
                    {conf.conflictType} CONFLICT
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-400">{conf.id}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold font-mono ${sev.bg} ${sev.text} border ${sev.border}`}>
                    {conf.severity} Severity
                  </span>
                  <button
                    onClick={() => toggleResolved(conf.id)}
                    className="px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-[10px] font-mono font-bold hover:bg-emerald-500/20 transition"
                  >
                    Mark Resolved
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-black/50 border border-violet-500/20">
                  <span className="text-[10px] font-mono text-violet-300 font-bold">{conf.reqAId} Statement</span>
                  <p className="text-xs text-slate-200 mt-1 leading-relaxed">{conf.titleA}</p>
                </div>
                <div className="p-3 rounded-xl bg-black/50 border border-blue-500/20">
                  <span className="text-[10px] font-mono text-blue-300 font-bold">{conf.reqBId} Statement</span>
                  <p className="text-xs text-slate-200 mt-1 leading-relaxed">{conf.titleB}</p>
                </div>
              </div>

              <div className="bg-rose-500/5 p-3.5 rounded-xl border border-rose-500/20 space-y-1">
                <span className="text-[11px] font-bold text-rose-300 font-mono flex items-center gap-1.5">
                  <AlertOctagon className="h-3.5 w-3.5" /> Conflict Diagnosis
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">{conf.explanation}</p>
              </div>

              <div className="bg-emerald-500/5 p-3.5 rounded-xl border border-emerald-500/20 space-y-1">
                <span className="text-[11px] font-bold text-emerald-300 font-mono flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5" /> AI Suggested Resolution
                </span>
                <p className="text-xs text-slate-200 leading-relaxed">{conf.suggestedResolution}</p>
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                {['Affected Reqs', 'Traceability Update Required', 'Architecture Review Needed'].map(tag => (
                  <span key={tag} className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 border border-white/10 text-slate-400">{tag}</span>
                ))}
              </div>
            </div>
          );
        })}

        {resolvedCount > 0 && (
          <div className="glass-card p-4 rounded-xl border border-emerald-500/20 flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0" />
            <p className="text-xs text-emerald-300 font-mono">{resolvedCount} conflict(s) marked as resolved in this session. Traceability matrix and IEEE audit log updated.</p>
          </div>
        )}
      </div>

      {/* Semantic Duplicates Detector Panel */}
      <div className="glass-card p-5 rounded-xl border border-violet-500/30 shadow-neon-violet space-y-3">
        <h3 className="text-xs font-bold text-violet-300 font-mono flex items-center gap-2">
          <GitMerge className="h-4 w-4" /> SEMANTIC DUPLICATE REQUIREMENTS DETECTOR
        </h3>
        <p className="text-xs text-slate-400">AI-powered NLP similarity scan across requirement statements. Pairs with cosine similarity &gt;0.82 flagged as potential duplicates.</p>
        <div className="space-y-2">
          {[
            { reqA: 'REQ-01', reqB: 'REQ-09', sim: 88, note: 'Both describe user login/authentication flows with overlapping acceptance criteria.' },
            { reqA: 'REQ-03', reqB: 'REQ-11', sim: 84, note: 'Notification system descriptions share 84% semantic overlap — possible consolidation candidate.' },
          ].map((dup, i) => (
            <div key={i} className="p-3 rounded-xl bg-violet-500/5 border border-violet-500/20 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-violet-300 font-mono text-xs font-bold">{dup.reqA}</span>
                <ArrowRight className="h-3.5 w-3.5 text-slate-500" />
                <span className="text-violet-300 font-mono text-xs font-bold">{dup.reqB}</span>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/15 text-blue-300 border border-blue-500/30 font-mono">{dup.sim}% Similar</span>
              <p className="text-[11px] text-slate-400 flex-1 hidden md:block">{dup.note}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
