import React, { useState } from 'react';
import { ModelEvaluationResult } from '../../../types/llmEvaluation';
import { EVALUATION_TASKS_CONFIG } from '../../../services/llmGroundTruthService';
import { Swords, Trophy, Zap, CheckCircle2, ShieldAlert } from 'lucide-react';

interface HeadToHeadMatchupProps {
  results: Record<string, ModelEvaluationResult>;
  models: { id: string; name: string; color: string }[];
}

export const HeadToHeadMatchup: React.FC<HeadToHeadMatchupProps> = ({ results, models }) => {
  const [modelAId, setModelAId] = useState<string>(models[0]?.id || 'gpt-4o');
  const [modelBId, setModelBId] = useState<string>(models[1]?.id || 'claude-3-5-sonnet');

  const resA = results[modelAId];
  const resB = results[modelBId];

  if (!resA || !resB) return null;

  // Calculate wins
  let aWins = 0;
  let bWins = 0;
  let ties = 0;

  EVALUATION_TASKS_CONFIG.forEach(task => {
    const scoreA = resA.taskOutputs[task.id]?.score || 0;
    const scoreB = resB.taskOutputs[task.id]?.score || 0;
    if (scoreA > scoreB) aWins++;
    else if (scoreB > scoreA) bWins++;
    else ties++;
  });

  return (
    <div className="space-y-6">
      {/* Model Matchup Selection Header */}
      <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-xl bg-violet-500/20 border border-violet-400/40 flex items-center justify-center text-violet-300 shadow-neon-violet">
              <Swords className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-mono">Head-to-Head Model Matchup</h3>
              <p className="text-xs text-slate-400 font-light">Side-by-side comparative analysis of two Large Language Models on RequireX tasks.</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 font-mono text-xs font-bold">
            <span className="text-cyan-400">{resA.modelName}: {aWins} Wins</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-400">{ties} Ties</span>
            <span className="text-slate-500">•</span>
            <span className="text-violet-400">{resB.modelName}: {bWins} Wins</span>
          </div>
        </div>

        {/* Model Selector dropdowns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Model A Selector Card */}
          <div className="p-4 rounded-xl bg-black/40 border border-cyan-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-cyan-400">CORNER A (BLUE/CYAN)</span>
              <select
                value={modelAId}
                onChange={(e) => setModelAId(e.target.value)}
                className="bg-surface border border-white/10 rounded-lg px-3 py-1 text-xs font-mono font-bold text-white focus:outline-none cursor-pointer"
              >
                {models.map(m => (
                  <option key={m.id} value={m.id}>{m.name}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center justify-between pt-1">
              <div>
                <p className="text-2xl font-black font-mono text-white">{resA.overallScore}<span className="text-xs text-slate-400 font-normal">/100</span></p>
                <p className="text-[11px] text-slate-400">RequireX Evaluation Score</p>
              </div>
              <div className="text-right text-xs font-mono text-slate-300 space-y-0.5">
                <p>Latency: <strong>{resA.avgLatencyMs} ms</strong></p>
                <p>JSON Validity: <strong>{resA.structuredReliabilityRate}%</strong></p>
              </div>
            </div>
          </div>

          {/* Model B Selector Card */}
          <div className="p-4 rounded-xl bg-black/40 border border-violet-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-violet-400">CORNER B (VIOLET/PURPLE)</span>
              <select
                value={modelBId}
                onChange={(e) => setModelBId(e.target.value)}
                className="bg-surface border border-white/10 rounded-lg px-3 py-1 text-xs font-mono font-bold text-white focus:outline-none cursor-pointer"
              >
                {models.map(m => (
                  <option key={m.id} value={m.id}>{m.name}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center justify-between pt-1">
              <div>
                <p className="text-2xl font-black font-mono text-white">{resB.overallScore}<span className="text-xs text-slate-400 font-normal">/100</span></p>
                <p className="text-[11px] text-slate-400">RequireX Evaluation Score</p>
              </div>
              <div className="text-right text-xs font-mono text-slate-300 space-y-0.5">
                <p>Latency: <strong>{resB.avgLatencyMs} ms</strong></p>
                <p>JSON Validity: <strong>{resB.structuredReliabilityRate}%</strong></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Task by Task Comparison Bars */}
      <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-4">
        <h4 className="text-sm font-bold text-white font-mono flex items-center justify-between border-b border-white/10 pb-3">
          <span>Task-by-Task Score Differential</span>
          <span className="text-xs text-slate-400 font-normal">Direct Score Comparison per RE Competency</span>
        </h4>

        <div className="space-y-4 pt-2">
          {EVALUATION_TASKS_CONFIG.map(task => {
            const scoreA = resA.taskOutputs[task.id]?.score || 0;
            const scoreB = resB.taskOutputs[task.id]?.score || 0;
            const delta = scoreA - scoreB;

            return (
              <div key={task.id} className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-bold text-slate-200">{task.label}</span>
                  <div className="flex items-center space-x-3">
                    <span className={`font-bold ${scoreA >= scoreB ? 'text-cyan-300' : 'text-slate-400'}`}>{scoreA}%</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-white/10 font-bold">
                      {delta > 0 ? `+${delta}% (A)` : delta < 0 ? `+${Math.abs(delta)}% (B)` : 'Tie'}
                    </span>
                    <span className={`font-bold ${scoreB >= scoreA ? 'text-violet-300' : 'text-slate-400'}`}>{scoreB}%</span>
                  </div>
                </div>

                {/* Progress dual bar */}
                <div className="grid grid-cols-2 gap-2 h-2.5 bg-surface rounded-full overflow-hidden p-0.5">
                  <div className="flex justify-end">
                    <div
                      className="h-full bg-cyan-400 rounded-full transition-all duration-500 shadow-neon-cyan"
                      style={{ width: `${scoreA}%` }}
                    />
                  </div>
                  <div className="flex justify-start">
                    <div
                      className="h-full bg-violet-500 rounded-full transition-all duration-500 shadow-neon-violet"
                      style={{ width: `${scoreB}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Strengths & Weaknesses Split Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card p-5 rounded-2xl border border-cyan-500/30 space-y-3">
          <h4 className="text-xs font-bold text-cyan-300 font-mono uppercase tracking-wider flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-cyan-400" />
            {resA.modelName} Strengths & Best Roles
          </h4>
          <ul className="space-y-1.5 text-xs text-slate-300 list-disc list-inside">
            {resA.strengths.map((s, i) => (
              <li key={i} className="leading-relaxed">{s}</li>
            ))}
          </ul>
          <div className="p-2.5 rounded-lg bg-cyan-500/10 text-[11px] font-mono text-cyan-200">
            <strong>Recommended for:</strong> {resA.recommendedRole}
          </div>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-violet-500/30 space-y-3">
          <h4 className="text-xs font-bold text-violet-300 font-mono uppercase tracking-wider flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-violet-400" />
            {resB.modelName} Strengths & Best Roles
          </h4>
          <ul className="space-y-1.5 text-xs text-slate-300 list-disc list-inside">
            {resB.strengths.map((s, i) => (
              <li key={i} className="leading-relaxed">{s}</li>
            ))}
          </ul>
          <div className="p-2.5 rounded-lg bg-violet-500/10 text-[11px] font-mono text-violet-200">
            <strong>Recommended for:</strong> {resB.recommendedRole}
          </div>
        </div>
      </div>
    </div>
  );
};
