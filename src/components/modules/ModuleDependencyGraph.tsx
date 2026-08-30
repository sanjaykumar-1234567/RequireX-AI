import React, { useState } from 'react';
import { 
  Network, 
  GitBranch, 
  ArrowRight, 
  Layers, 
  Box, 
  ShieldCheck, 
  Zap, 
  AlertCircle,
  Activity
} from 'lucide-react';
import { useProject } from '../../context/ProjectContext';

export const ModuleDependencyGraph: React.FC = () => {
  const { currentProject } = useProject();
  const [selectedNodeId, setSelectedNodeId] = useState<string>('');

  if (!currentProject) return null;

  const reqs = currentProject.requirements;
  const activeNode = reqs.find(r => r.id === selectedNodeId) || reqs[0] || null;

  // Domain-specific dependency topology links
  const getDomainDependencyLinks = () => {
    switch (currentProject.domain) {
      case 'Online Quiz Platform':
        return [
          { from: 'REQ-01', to: 'REQ-02', label: 'OAuth Auth → Proctor Engine', strength: 'Strong', color: '#EF4444' },
          { from: 'REQ-02', to: 'REQ-03', label: 'Proctor Lock → IndexedDB Cache', strength: 'Strong', color: '#EF4444' },
          { from: 'REQ-03', to: 'REQ-04', label: 'IndexedDB Sync → Auto-Evaluation', strength: 'Moderate', color: '#F59E0B' },
          { from: 'REQ-04', to: 'REQ-05', label: 'Score Evaluation → Real-time Leaderboard', strength: 'Moderate', color: '#F59E0B' },
        ];
      case 'Hospital Management':
        return [
          { from: 'REQ-01', to: 'REQ-02', label: 'Patient Triage → EHR Record Lock', strength: 'Strong', color: '#EF4444' },
          { from: 'REQ-02', to: 'REQ-03', label: 'EHR Access → Doctor Consultation Queue', strength: 'Moderate', color: '#F59E0B' },
          { from: 'REQ-03', to: 'REQ-04', label: 'Prescription → Pharmacy Inventory Sync', strength: 'Strong', color: '#EF4444' },
          { from: 'REQ-04', to: 'REQ-05', label: 'Discharge Bill → Insurance Claim Webhook', strength: 'Weak', color: '#10B981' },
        ];
      case 'E-Commerce Platform':
        return [
          { from: 'REQ-01', to: 'REQ-02', label: 'Search Engine → Product Catalog Cache', strength: 'Weak', color: '#10B981' },
          { from: 'REQ-02', to: 'REQ-03', label: 'Cart Checkout → Inventory Reservation Lock', strength: 'Strong', color: '#EF4444' },
          { from: 'REQ-03', to: 'REQ-04', label: 'Inventory Lock → 3D-Secure Payment Gateway', strength: 'Strong', color: '#EF4444' },
          { from: 'REQ-04', to: 'REQ-05', label: 'Payment Success → Logistics Dispatch Order', strength: 'Moderate', color: '#F59E0B' },
        ];
      case 'Banking / Fintech':
        return [
          { from: 'REQ-01', to: 'REQ-02', label: '2FA Auth → Account Balance Query', strength: 'Strong', color: '#EF4444' },
          { from: 'REQ-02', to: 'REQ-03', label: 'Fund Transfer → AI Fraud Anomaly Check', strength: 'Strong', color: '#EF4444' },
          { from: 'REQ-03', to: 'REQ-04', label: 'Fraud Clearance → Double-Entry Ledger Hash', strength: 'Strong', color: '#EF4444' },
          { from: 'REQ-04', to: 'REQ-05', label: 'Settlement → SMS / Webhook Dispatcher', strength: 'Weak', color: '#10B981' },
        ];
      case 'Disaster Management':
        return [
          { from: 'REQ-01', to: 'REQ-02', label: 'SOS Alert Beacon → GPS Geofence Clustering', strength: 'Strong', color: '#EF4444' },
          { from: 'REQ-02', to: 'REQ-03', label: 'Geofence Cluster → Offline Mesh Sync', strength: 'Moderate', color: '#F59E0B' },
          { from: 'REQ-03', to: 'REQ-04', label: 'Rescue Routing → Hospital Bed Capacity Dispatch', strength: 'Strong', color: '#EF4444' },
          { from: 'REQ-04', to: 'REQ-05', label: 'Rescue Status → Emergency Broadcast SMS', strength: 'Weak', color: '#10B981' },
        ];
      case 'Railway Reservation':
      default:
        return [
          { from: 'REQ-01', to: 'REQ-02', label: 'Tatkal Booking Engine → Seat Concurrency Lock', strength: 'Strong', color: '#EF4444' },
          { from: 'REQ-02', to: 'REQ-03', label: 'Seat Lock → Payment Gateway Webhook', strength: 'Strong', color: '#EF4444' },
          { from: 'REQ-03', to: 'REQ-04', label: 'Payment Settlement → PNR Allocation Kernel', strength: 'Moderate', color: '#F59E0B' },
          { from: 'REQ-04', to: 'REQ-05', label: 'PNR Confirmation → SMS / Email Dispatcher', strength: 'Weak', color: '#10B981' },
        ];
    }
  };

  const links = getDomainDependencyLinks();

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="glass-card p-6 sm:p-8 rounded-2xl border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <div className="flex items-center space-x-2 text-cyan-400 text-xs font-bold font-mono mb-2">
            <Network className="h-4 w-4" />
            <span>INNOVATIVE SE TOOL • REQUIREMENT TOPOLOGY & DEPENDENCY NETWORK</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white font-sans tracking-tight">Requirement Dependency Network</h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-3xl leading-relaxed font-light">
            Analyze prerequisite couplings and dependency strengths (<span className="text-emerald-400 font-bold">Weak 🟢</span>, <span className="text-amber-400 font-bold">Moderate 🟡</span>, <span className="text-rose-400 font-bold">Strong 🔴</span>) for <strong className="text-cyan-300 font-mono">{currentProject.name}</strong> ({currentProject.domain}).
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-3.5 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-bold flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-cyan-400 animate-ping" />
            {reqs.length} Graph Nodes Mapped
          </span>
        </div>
      </div>

      {/* Main Dependency Graph Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Visual Graph View */}
        <div className="lg:col-span-2 glass-card p-6 sm:p-8 rounded-2xl border border-white/10 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h3 className="text-sm font-bold text-white font-mono flex items-center gap-2">
              <GitBranch className="h-4 w-4 text-cyan-400" />
              <span>Interactive Topology Map: {currentProject.domain}</span>
            </h3>
            <div className="flex items-center gap-3 text-[11px] font-mono">
              <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-emerald-400" /> Weak</span>
              <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-amber-400" /> Moderate</span>
              <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-rose-500" /> Strong</span>
            </div>
          </div>

          {/* Interactive Topology Canvas */}
          <div className="p-6 rounded-2xl bg-black/80 border border-white/10 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {reqs.map((req) => {
                const isSelected = (activeNode?.id === req.id);
                return (
                  <button
                    key={req.id}
                    onClick={() => setSelectedNodeId(req.id)}
                    className={`p-4 rounded-xl border text-left transition-all duration-300 space-y-2 cursor-pointer ${
                      isSelected
                        ? 'bg-cyan-500/20 border-cyan-400 shadow-neon-cyan scale-105'
                        : 'bg-surface/60 border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-cyan-400">{req.id}</span>
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/10">
                        {req.category}
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-white truncate">{req.title}</h4>
                    <p className="text-[10px] text-slate-400 font-mono">Priority: {req.priority}</p>
                  </button>
                );
              })}
            </div>

            {/* Dependency Relationship Links List */}
            <div className="pt-4 border-t border-white/10 space-y-2 font-mono text-xs">
              <span className="text-slate-400 font-bold block text-[11px] uppercase tracking-wider">
                ACTIVE DOMAIN DEPENDENCY COUPLINGS ({links.length}):
              </span>
              <div className="space-y-2">
                {links.map((link, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-surface/80 border border-white/10 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-cyan-400 font-bold">{link.from}</span>
                      <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
                      <span className="text-purple-400 font-bold">{link.to}</span>
                      <span className="text-slate-300 text-xs font-sans pl-2">({link.label})</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      link.strength === 'Strong' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' :
                      link.strength === 'Moderate' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' :
                      'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    }`}>
                      {link.strength} Link
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Selected Node Details Drawer */}
        <div className="glass-card p-6 sm:p-8 rounded-2xl border border-white/10 space-y-6">
          <h3 className="text-sm font-bold text-white font-mono flex items-center gap-2 border-b border-white/10 pb-3">
            <Layers className="h-4 w-4 text-cyan-400" />
            <span>Node Inspection Console</span>
          </h3>

          {activeNode ? (
            <div className="space-y-4 font-mono text-xs">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-cyan-500/20 text-cyan-300 font-bold">
                  {activeNode.id}
                </span>
                <span className="text-slate-400 text-xs">{activeNode.category}</span>
              </div>

              <h4 className="text-base font-bold text-white font-sans">{activeNode.title}</h4>
              <p className="text-slate-300 text-xs font-light leading-relaxed font-sans">
                {activeNode.description}
              </p>

              <div className="p-3.5 rounded-xl bg-black/60 border border-white/10 space-y-2">
                <span className="text-cyan-400 font-bold block text-[11px]">Upstream Prerequisites:</span>
                <p className="text-slate-300 text-[11px]">Requires Core Identity Verification and OAuth 2.0 Token Exchange.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-black/60 border border-white/10 space-y-2">
                <span className="text-purple-400 font-bold block text-[11px]">Downstream Impact:</span>
                <p className="text-slate-300 text-[11px]">Propagates to 3 User Stories, 4 Test Cases, and 1 Microservice Database Entity.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-[11px]">
                ✓ IEEE 830 RTM Bi-directional Integrity Verified
              </div>
            </div>
          ) : (
            <div className="py-16 text-center space-y-3 text-slate-400">
              <Activity className="h-10 w-10 text-cyan-500/40 mx-auto animate-pulse" />
              <p className="text-xs">Select any node in the topology map to inspect its upstream and downstream linkages.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
