import React, { useState } from 'react';
import { ModelEvaluationResult } from '../../../types/llmEvaluation';

interface RadarChartComparisonProps {
  results: Record<string, ModelEvaluationResult>;
  models: { id: string; name: string; color: string }[];
  showBreakdown?: boolean;
}

export const RadarChartComparison: React.FC<RadarChartComparisonProps> = ({ 
  results, 
  models,
  showBreakdown = true 
}) => {
  const [selectedModelIds, setSelectedModelIds] = useState<string[]>(models.map(m => m.id));

  const axes = [
    { key: 'extraction', label: 'Extraction' },
    { key: 'classification', label: 'FR/NFR Class' },
    { key: 'ambiguity', label: 'Ambiguity' },
    { key: 'completeness', label: 'Completeness' },
    { key: 'conflict', label: 'Conflict' },
    { key: 'testing', label: 'QA Testing' },
    { key: 'risk', label: 'Risk Analysis' },
    { key: 'structured', label: 'Structured JSON' }
  ] as const;

  const size = 360;
  const center = size / 2;
  const radius = 120;
  const angleStep = (Math.PI * 2) / axes.length;

  const getCoordinates = (value: number, index: number) => {
    const r = (value / 100) * radius;
    const angle = index * angleStep - Math.PI / 2;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y };
  };

  const toggleModel = (id: string) => {
    if (selectedModelIds.includes(id)) {
      if (selectedModelIds.length > 1) {
        setSelectedModelIds(selectedModelIds.filter(m => m !== id));
      }
    } else {
      setSelectedModelIds([...selectedModelIds, id]);
    }
  };

  return (
    <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-6 overflow-hidden flex flex-col justify-between">
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <h3 className="text-base font-bold text-white font-mono flex items-center gap-2">
              <span>Multi-Model 8-Dimensional Radar Comparison</span>
            </h3>
            <p className="text-xs text-slate-400 font-light">
              Compare model strengths across 8 core Software Requirements Engineering competencies.
            </p>
          </div>

          {/* Model Toggles with distinct colors */}
          <div className="flex flex-wrap gap-2">
            {models.map(model => {
              const isSelected = selectedModelIds.includes(model.id);
              return (
                <button
                  key={model.id}
                  onClick={() => toggleModel(model.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-2 border transition-all duration-200 cursor-pointer ${
                    isSelected 
                      ? 'bg-white/15 text-white border-white/40 shadow-sm'
                      : 'bg-black/40 text-slate-500 border-white/5 opacity-50 hover:opacity-80'
                  }`}
                >
                  <span className="h-2.5 w-2.5 rounded-full shadow-sm" style={{ backgroundColor: model.color }} />
                  <span>{model.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* SVG Radar */}
        <div className="relative flex items-center justify-center w-full overflow-visible py-4">
          <svg width={size} height={size} className="overflow-visible">
            {/* Background polygon web rings */}
            {[0.2, 0.4, 0.6, 0.8, 1.0].map((level, ringIdx) => {
              const ringPoints = axes.map((_, i) => {
                const { x, y } = getCoordinates(level * 100, i);
                return `${x},${y}`;
              }).join(' ');

              return (
                <polygon
                  key={ringIdx}
                  points={ringPoints}
                  fill={ringIdx % 2 === 0 ? 'rgba(255, 255, 255, 0.02)' : 'none'}
                  stroke={level === 1.0 ? 'rgba(255, 255, 255, 0.25)' : 'rgba(255, 255, 255, 0.08)'}
                  strokeWidth={level === 1.0 ? '1.5' : '1'}
                  strokeDasharray={level === 1.0 ? 'none' : '3 3'}
                />
              );
            })}

            {/* HIGH-CONTRAST VIBRANT YELLOW NEON PERCENTAGE BADGES (Offset right to prevent dot collision) */}
            {[
              { pct: 40, label: '40%' },
              { pct: 60, label: '60%' },
              { pct: 80, label: '80%' },
              { pct: 100, label: '100%' }
            ].map(item => {
              const ringR = radius * (item.pct / 100);
              const badgeX = center + 14;
              const badgeY = center - ringR;

              return (
                <g key={item.pct} className="filter drop-shadow-[0_0_6px_rgba(255,230,0,0.6)]">
                  {/* Black contrast background pill with Yellow border */}
                  <rect
                    x={badgeX - 16}
                    y={badgeY - 7}
                    width="32"
                    height="14"
                    rx="4"
                    fill="#050508"
                    stroke="#FFE600"
                    strokeWidth="1.2"
                  />
                  <text
                    x={badgeX}
                    y={badgeY + 3.5}
                    fill="#FFE600"
                    fontSize="9.5"
                    fontWeight="900"
                    fontFamily="monospace"
                    textAnchor="middle"
                  >
                    {item.label}
                  </text>
                </g>
              );
            })}

            {/* Axis spokes and labels */}
            {axes.map((axis, i) => {
              const { x, y } = getCoordinates(100, i);
              const labelPos = getCoordinates(126, i);
              return (
                <g key={axis.key}>
                  <line
                    x1={center}
                    y1={center}
                    x2={x}
                    y2={y}
                    stroke="rgba(255, 255, 255, 0.15)"
                    strokeWidth="1.2"
                  />
                  <text
                    x={labelPos.x}
                    y={labelPos.y}
                    fill="#FFFFFF"
                    fontSize="11"
                    fontWeight="bold"
                    fontFamily="monospace"
                    textAnchor={labelPos.x > center + 10 ? 'start' : labelPos.x < center - 10 ? 'end' : 'middle'}
                    alignmentBaseline="middle"
                  >
                    {axis.label}
                  </text>
                </g>
              );
            })}

            {/* Model Polygon Overlays */}
            {models.map(model => {
              if (!selectedModelIds.includes(model.id)) return null;
              const res = results[model.id];
              if (!res) return null;

              const points = axes.map((axis, i) => {
                const val = res.radarScores[axis.key] || 50;
                const { x, y } = getCoordinates(val, i);
                return `${x},${y}`;
              }).join(' ');

              return (
                <g key={model.id}>
                  <polygon
                    points={points}
                    fill={model.color}
                    fillOpacity="0.15"
                    stroke={model.color}
                    strokeWidth="2.8"
                    style={{ filter: `drop-shadow(0 0 8px ${model.color})` }}
                  />
                  {/* Point dots */}
                  {axes.map((axis, i) => {
                    const val = res.radarScores[axis.key] || 50;
                    const { x, y } = getCoordinates(val, i);
                    return (
                      <circle
                        key={i}
                        cx={x}
                        cy={y}
                        r="4"
                        fill="#050508"
                        stroke={model.color}
                        strokeWidth="2.5"
                      />
                    );
                  })}
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Spacious Scores Breakdown only when showBreakdown is true */}
      {showBreakdown && (
        <div className="w-full space-y-3 border-t border-white/10 pt-4">
          <h4 className="text-xs font-bold text-slate-300 font-mono uppercase tracking-wider">
            Dimension Scores Breakdown
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 font-mono text-xs">
            {models.filter(m => selectedModelIds.includes(m.id)).map(model => {
              const res = results[model.id];
              if (!res) return null;
              return (
                <div key={model.id} className="p-3.5 rounded-xl bg-black/50 border border-white/10 space-y-2">
                  <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
                    <span className="font-bold truncate text-xs" style={{ color: model.color }}>
                      {model.name}
                    </span>
                    <span className="font-black text-white text-xs pl-1">{res.overallScore}%</span>
                  </div>
                  <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-[10.5px] text-slate-400">
                    <div>Extract: <strong className="text-slate-200">{res.radarScores.extraction}%</strong></div>
                    <div>Class: <strong className="text-slate-200">{res.radarScores.classification}%</strong></div>
                    <div>Ambig: <strong className="text-slate-200">{res.radarScores.ambiguity}%</strong></div>
                    <div>Compl: <strong className="text-slate-200">{res.radarScores.completeness}%</strong></div>
                    <div>Conf: <strong className="text-slate-200">{res.radarScores.conflict}%</strong></div>
                    <div>Struct: <strong className="text-slate-200">{res.radarScores.structured}%</strong></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
