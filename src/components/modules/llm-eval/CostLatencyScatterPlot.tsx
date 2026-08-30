import React from 'react';
import { ModelEvaluationResult } from '../../../types/llmEvaluation';
import { DollarSign, Clock, Zap, TrendingUp } from 'lucide-react';

interface CostLatencyScatterPlotProps {
  results: Record<string, ModelEvaluationResult>;
  models: { id: string; name: string; color: string }[];
}

export const CostLatencyScatterPlot: React.FC<CostLatencyScatterPlotProps> = ({ results, models }) => {
  const plotWidth = 500;
  const plotHeight = 260;
  const padding = 45;

  const validModels = models.filter(m => results[m.id]);
  const maxCost = Math.max(0.005, ...validModels.map(m => results[m.id]?.totalCostUsd || 0.001)) * 1.25;
  const minScore = 75;
  const maxScore = 100;

  const getX = (cost: number) => {
    return padding + ((cost / maxCost) * (plotWidth - padding * 2));
  };

  const getY = (score: number) => {
    const clamped = Math.max(minScore, Math.min(maxScore, score));
    return (plotHeight - padding) - (((clamped - minScore) / (maxScore - minScore)) * (plotHeight - padding * 2));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* 1. Cost vs Performance Scatter Plot */}
      <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center space-x-2.5">
            <DollarSign className="h-4 w-4 text-emerald-400" />
            <h4 className="text-sm font-bold text-white font-mono">Cost vs Performance Frontier</h4>
          </div>
          <span className="text-[10px] text-slate-400 font-mono">Estimated $/Run vs Score</span>
        </div>

        <p className="text-xs text-slate-400 font-light">
          Identifies the Pareto efficiency frontier: high RequireX score combined with minimal inference cost.
        </p>

        {/* SVG Scatter Plot */}
        <div className="relative flex items-center justify-center pt-2">
          <svg width={plotWidth} height={plotHeight} className="overflow-visible max-w-full">
            {/* Grid lines */}
            {[80, 85, 90, 95, 100].map(s => (
              <g key={s}>
                <line
                  x1={padding}
                  y1={getY(s)}
                  x2={plotWidth - padding}
                  y2={getY(s)}
                  stroke="rgba(255, 255, 255, 0.07)"
                  strokeDasharray="2 2"
                />
                <text
                  x={padding - 8}
                  y={getY(s) + 3}
                  fill="rgba(255, 255, 255, 0.4)"
                  fontSize="9"
                  fontFamily="monospace"
                  textAnchor="end"
                >
                  {s}
                </text>
              </g>
            ))}

            {/* Axes */}
            <line
              x1={padding}
              y1={plotHeight - padding}
              x2={plotWidth - padding}
              y2={plotHeight - padding}
              stroke="rgba(255, 255, 255, 0.2)"
              strokeWidth="1.5"
            />
            <line
              x1={padding}
              y1={padding}
              x2={padding}
              y2={plotHeight - padding}
              stroke="rgba(255, 255, 255, 0.2)"
              strokeWidth="1.5"
            />

            {/* Axis labels */}
            <text
              x={plotWidth / 2}
              y={plotHeight - 8}
              fill="#94A3B8"
              fontSize="10"
              fontFamily="monospace"
              textAnchor="middle"
            >
              Estimated Cost ($ / Benchmark Suite) →
            </text>
            <text
              x={12}
              y={plotHeight / 2}
              fill="#94A3B8"
              fontSize="10"
              fontFamily="monospace"
              textAnchor="middle"
              transform={`rotate(-90 12 ${plotHeight / 2})`}
            >
              Score →
            </text>

            {/* Model Scatter Points */}
            {validModels.map(model => {
              const res = results[model.id];
              if (!res) return null;
              const x = getX(res.totalCostUsd);
              const y = getY(res.overallScore);

              return (
                <g key={model.id} className="group cursor-pointer">
                  {/* Outer pulse */}
                  <circle
                    cx={x}
                    cy={y}
                    r="8"
                    fill={model.color}
                    fillOpacity="0.25"
                    style={{ filter: `drop-shadow(0 0 6px ${model.color})` }}
                  />
                  {/* Core dot */}
                  <circle
                    cx={x}
                    cy={y}
                    r="4.5"
                    fill={model.color}
                    stroke="#FFFFFF"
                    strokeWidth="1.5"
                  />
                  {/* Label badge */}
                  <text
                    x={x + 10}
                    y={y - 6}
                    fill={model.color}
                    fontSize="10"
                    fontFamily="monospace"
                    fontWeight="bold"
                  >
                    {model.name} (${res.totalCostUsd})
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* 2. Observed Response Time & Speed Ranking */}
      <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-4 flex flex-col justify-between">
        <div className="space-y-2">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center space-x-2.5">
              <Clock className="h-4 w-4 text-cyan-400" />
              <h4 className="text-sm font-bold text-white font-mono">Observed Response Latency (ms)</h4>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">Per-Task Average</span>
          </div>

          <p className="text-xs text-slate-400 font-light">
            Measured round-trip token inference time per evaluation step under standardized payload volume.
          </p>

          <div className="space-y-4 pt-3">
            {validModels
              .sort((a, b) => (results[a.id]?.avgLatencyMs || 0) - (results[b.id]?.avgLatencyMs || 0))
              .map((model, idx) => {
                const res = results[model.id];
                if (!res) return null;
                const maxLatency = Math.max(1500, ...validModels.map(m => results[m.id]?.avgLatencyMs || 1000));
                const widthPct = Math.round((res.avgLatencyMs / maxLatency) * 100);

                return (
                  <div key={model.id} className="space-y-1.5 font-mono text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-200 flex items-center gap-2">
                        <span className="text-slate-500">#{idx + 1}</span>
                        <span style={{ color: model.color }}>{model.name}</span>
                      </span>
                      <span className="text-white font-black">{res.avgLatencyMs} ms</span>
                    </div>

                    <div className="h-2.5 bg-black/50 rounded-full overflow-hidden border border-white/10 p-0.5">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${widthPct}%`,
                          backgroundColor: model.color,
                          boxShadow: `0 0 10px ${model.color}`
                        }}
                      />
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        <div className="p-3 rounded-xl bg-cyan-500/5 border border-cyan-500/20 text-[11px] font-mono text-slate-300">
          ⚡ Latency measured on local / API network context. Faster models facilitate rapid iterative prompt refinement.
        </div>
      </div>
    </div>
  );
};
