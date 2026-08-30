import React, { useState } from 'react';
import { HelpCircle, Sparkles, AlertTriangle, ArrowRight, ShieldCheck, Cpu, Layers } from 'lucide-react';
import { useProject } from '../../context/ProjectContext';
import { WhatIfScenarioResult } from '../../types';

export const ModuleWhatIfSimulator: React.FC = () => {
  const { currentProject } = useProject();

  const [prompt, setPrompt] = useState('What happens if we require 99.99% availability and biometric authentication?');
  const [simulation, setSimulation] = useState<WhatIfScenarioResult | null>({
    scenarioPrompt: 'What happens if we require 99.99% availability and biometric authentication?',
    impactRating: 'High',
    affectedRequirements: ['REQ-01', 'REQ-04'],
    affectedStories: ['US-01', 'US-03'],
    affectedUseCases: ['UC-01', 'UC-04'],
    affectedTestCases: ['TC-001', 'TC-004', 'TC-008'],
    riskDelta: '+35% Increased Security & Infrastructure Complexity Risk',
    complexityDelta: '+2 Story Points per User Authentication Flow',
    aiExplanation: `Simulating architectural constraint changes for domain ${currentProject?.domain}: Adding 99.99% availability requires multi-region active-active database clustering, load balancing failover, and hardware security modules (HSM) for biometric template vaulting.`,
    proposedModifications: [
      'Add Non-Functional Requirement: Mandatory hardware token or WebAuthn biometric prompt.',
      'Add System Architecture Node: Active-Active Multi-AZ PostgreSQL Cluster with 1-second failover.',
      'Update QA Suite: Add biometric spoofing penetration test cases & latency stress tests.'
    ]
  });

  const handleSimulate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || !currentProject) return;

    setSimulation({
      scenarioPrompt: prompt,
      impactRating: prompt.toLowerCase().includes('remove') || prompt.toLowerCase().includes('biometric') ? 'High' : 'Medium',
      affectedRequirements: currentProject.requirements.slice(0, 2).map(r => r.id),
      affectedStories: currentProject.userStories.slice(0, 2).map(s => s.id),
      affectedUseCases: currentProject.useCases.slice(0, 2).map(u => u.id),
      affectedTestCases: currentProject.testCases.slice(0, 3).map(t => t.id),
      riskDelta: '+25% Volatility & System Scope Impact',
      complexityDelta: '+3 Estimated Sprint Story Points',
      aiExplanation: `Hypothetical simulation for domain [${currentProject.domain}]: Evaluating impact of '${prompt}'. Downstream analysis indicates changes in security architecture, database schemas, and regression test suites.`,
      proposedModifications: [
        `Modify ${currentProject.requirements[0]?.id || 'REQ-01'} to incorporate new validation criteria.`,
        'Update Traceability Matrix links across test suites.',
        'Trigger automated IEEE 29148 compliance re-audit.'
      ]
    });
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="glass-card p-6 rounded-2xl border border-white/10 relative overflow-hidden">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
            <HelpCircle className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-purple-400 font-mono">
                INNOVATIVE MODULE • REQUIREMENT WHAT-IF SIMULATOR
              </span>
            </div>
            <h1 className="text-xl font-extrabold text-white font-mono mt-0.5">
              Hypothetical Requirement Scenario Simulator
            </h1>
          </div>
        </div>
        <p className="text-xs text-slate-300 mt-2 max-w-3xl leading-relaxed">
          Simulate architectural, functional, or non-functional modifications to analyze downstream impact on user stories, test cases, risks, and IEEE compliance score before committing code.
        </p>
      </div>

      {/* Input Form */}
      <div className="glass-card p-5 rounded-xl border border-white/10 hover:border-cyan-400/50 transition-all duration-300">
        <form onSubmit={handleSimulate} className="space-y-3">
          <label className="block text-xs font-bold text-slate-300 font-mono">
            Enter Hypothetical What-If Question:
          </label>
          <div className="flex gap-3">
            <input
              type="text"
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              placeholder="e.g. What happens if we remove user registration or add 2FA?"
              className="flex-1 bg-black/60 border border-white/15 rounded-xl py-2.5 px-4 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-bold text-xs shadow-neon-cyan transition duration-200 flex items-center space-x-2"
            >
              <Sparkles className="h-4 w-4" />
              <span>Run AI Simulation</span>
            </button>
          </div>
          
          <div className="flex items-center gap-2 pt-1">
            <span className="text-[10px] text-slate-400 font-mono">Sample prompts:</span>
            {[
              'What if we allow guest checkout?',
              'What if payment gateway times out?',
              'What if 99.99% uptime is mandatory?'
            ].map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setPrompt(p)}
                className="text-[10px] bg-white/5 hover:bg-white/10 text-cyan-300 px-2.5 py-1 rounded-lg border border-white/10 font-mono"
              >
                {p}
              </button>
            ))}
          </div>
        </form>
      </div>

      {/* Simulation Result */}
      {simulation && (
        <div className="space-y-4">
          <div className="glass-card p-6 rounded-xl border border-cyan-500/40 shadow-neon-cyan space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 text-xs font-mono font-bold">
                SIMULATION COMPLETE • CHANGE RATING: {simulation.impactRating}
              </span>
              <span className="text-xs font-mono text-cyan-400">{simulation.riskDelta}</span>
            </div>

            <div>
              <h4 className="text-sm font-bold text-white font-mono">AI Downstream Impact Summary</h4>
              <p className="text-xs text-slate-300 mt-1 bg-black/50 p-3 rounded-xl border border-white/10 leading-relaxed font-mono">
                {simulation.aiExplanation}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-black/40 border border-white/10">
                <span className="text-[10px] text-slate-400 font-mono">Affected Reqs</span>
                <p className="text-lg font-black text-cyan-400 font-mono">{simulation.affectedRequirements.length} Reqs</p>
              </div>
              <div className="p-3 rounded-xl bg-black/40 border border-white/10">
                <span className="text-[10px] text-slate-400 font-mono">Affected User Stories</span>
                <p className="text-lg font-black text-purple-400 font-mono">{simulation.affectedStories.length} Stories</p>
              </div>
              <div className="p-3 rounded-xl bg-black/40 border border-white/10">
                <span className="text-[10px] text-slate-400 font-mono">Affected Test Cases</span>
                <p className="text-lg font-black text-blue-400 font-mono">{simulation.affectedTestCases.length} Tests</p>
              </div>
              <div className="p-3 rounded-xl bg-black/40 border border-white/10">
                <span className="text-[10px] text-slate-400 font-mono">Complexity Impact</span>
                <p className="text-xs font-bold text-amber-400 font-mono mt-1">{simulation.complexityDelta}</p>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold text-slate-300 font-mono mb-2">Recommended Engineering Modifications</h4>
              <ul className="space-y-1.5">
                {simulation.proposedModifications.map((mod, idx) => (
                  <li key={idx} className="flex items-center space-x-2 text-xs text-slate-200 bg-white/5 p-2.5 rounded-lg border border-white/10">
                    <ArrowRight className="h-3.5 w-3.5 text-cyan-400 flex-shrink-0" />
                    <span>{mod}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
