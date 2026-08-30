import React from 'react';
import { Users, CheckCircle2, AlertTriangle, Shield, UserCheck, Layers, Sparkles } from 'lucide-react';
import { useProject } from '../../context/ProjectContext';
import { AIEngine } from '../../services/aiEngine';

export const ModuleStakeholderAnalyzer: React.FC = () => {
  const { currentProject } = useProject();

  if (!currentProject) return null;

  const stakeholders = AIEngine.generateStakeholderPowerInterest(currentProject.domain);

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="glass-card p-6 sm:p-8 rounded-2xl border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <div className="flex items-center space-x-2 text-cyan-400 text-xs font-bold font-mono mb-2">
            <Users className="h-4 w-4" />
            <span>INNOVATIVE SE TOOL • STAKEHOLDER POWER-INTEREST INFLUENCE MATRIX</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white font-sans tracking-tight">Stakeholder Influence & Power Matrix</h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-3xl leading-relaxed font-light">
            Evaluate stakeholder influence across a <strong className="text-cyan-300 font-mono">2x2 Power vs Interest Matrix</strong> to balance conflicting priorities for <strong className="text-cyan-300 font-mono">{currentProject.name}</strong>.
          </p>
        </div>
      </div>

      {/* 2x2 Power-Interest Grid */}
      <div className="glass-card p-6 sm:p-8 rounded-2xl border border-white/10 space-y-6">
        <div className="text-center font-mono text-xs font-bold text-cyan-400 tracking-wider">
          — INTEREST (LOW → HIGH) —
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Quadrant 1: Keep Satisfied (High Power, Low Interest) */}
          <div className="p-6 rounded-2xl bg-amber-950/20 border border-amber-500/30 space-y-4 shadow-neon-amber">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-amber-400 font-bold font-mono text-xs uppercase">KEEP SATISFIED (High Power, Low Interest)</span>
              <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono text-[10px]">Regulatory & Legal</span>
            </div>
            <h4 className="text-base font-bold text-white font-sans">Regulatory Compliance Auditor & Data Protection Officer</h4>
            <p className="text-xs text-slate-300 leading-relaxed font-light">Mandates AES-256 encryption, TLS 1.3 transit, immutable audit logs, and HIPAA / PCI-DSS compliance.</p>
            <div className="p-3 rounded-xl bg-black/60 border border-white/10 text-slate-300 text-xs font-mono">
              <span className="text-amber-400 font-bold block mb-1">Engagement Strategy:</span>
              <span>Provide automated compliance radar certificates and security penetration logs.</span>
            </div>
          </div>

          {/* Quadrant 2: Key Players (High Power, High Interest) */}
          <div className="p-6 rounded-2xl bg-cyan-950/30 border border-cyan-500/40 space-y-4 shadow-neon-cyan">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-cyan-400 font-bold font-mono text-xs uppercase">KEY PLAYERS (High Power, High Interest)</span>
              <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono text-[10px]">Executive Sponsor</span>
            </div>
            <h4 className="text-base font-bold text-white font-sans">Enterprise Client & Executive Project Sponsor</h4>
            <p className="text-xs text-slate-300 leading-relaxed font-light">Controls project budget, release timeline, core business ROI, and system uptime SLA thresholds (&gt; 99.9%).</p>
            <div className="p-3 rounded-xl bg-black/60 border border-white/10 text-slate-300 text-xs font-mono">
              <span className="text-cyan-400 font-bold block mb-1">Engagement Strategy:</span>
              <span>Weekly milestone sprint demos, formal IEEE scope sign-offs, and risk heatmaps.</span>
            </div>
          </div>

          {/* Quadrant 3: Minimal Effort (Low Power, Low Interest) */}
          <div className="p-6 rounded-2xl bg-surface/50 border border-white/10 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-slate-400 font-bold font-mono text-xs uppercase">MINIMAL EFFORT (Low Power, Low Interest)</span>
              <span className="px-2 py-0.5 rounded bg-white/5 text-slate-400 font-mono text-[10px]">Third-Party API</span>
            </div>
            <h4 className="text-base font-bold text-white font-sans">Third-Party Gateway & SMS Notification Vendors</h4>
            <p className="text-xs text-slate-300 leading-relaxed font-light">External service providers providing payment processing and webhook notification infrastructure.</p>
            <div className="p-3 rounded-xl bg-black/60 border border-white/10 text-slate-300 text-xs font-mono">
              <span className="text-slate-400 font-bold block mb-1">Engagement Strategy:</span>
              <span>Publish standard OpenAPI contracts and monitor automated health check pingers.</span>
            </div>
          </div>

          {/* Quadrant 4: Keep Informed (Low Power, High Interest) */}
          <div className="p-6 rounded-2xl bg-purple-950/20 border border-purple-500/30 space-y-4 shadow-neon-purple">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-purple-400 font-bold font-mono text-xs uppercase">KEEP INFORMED (Low Power, High Interest)</span>
              <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-mono text-[10px]">Primary Users</span>
            </div>
            <h4 className="text-base font-bold text-white font-sans">Daily End-Users (Passengers, Students, Shoppers, Patients)</h4>
            <p className="text-xs text-slate-300 leading-relaxed font-light">Primary consumers needing responsive UI, sub-1.5s latency, offline resilience, and instant receipts.</p>
            <div className="p-3 rounded-xl bg-black/60 border border-white/10 text-slate-300 text-xs font-mono">
              <span className="text-purple-400 font-bold block mb-1">Engagement Strategy:</span>
              <span>Conduct beta usability tests and capture sentiment feedback in early sprints.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
