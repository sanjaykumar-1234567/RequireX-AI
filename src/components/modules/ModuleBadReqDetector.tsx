import React, { useState } from 'react';
import { 
  ShieldAlert, 
  ShieldCheck,
  Sparkles, 
  Flame, 
  CheckCircle2, 
  ArrowRight, 
  RotateCcw, 
  Play, 
  Zap, 
  Activity 
} from 'lucide-react';

export const ModuleBadReqDetector: React.FC = () => {
  const [selectedDemoIndex, setSelectedDemoIndex] = useState<number>(0);
  const [isFixing, setIsFixing] = useState<boolean>(false);
  const [showResolved, setShowResolved] = useState<boolean>(false);

  const demoCases = [
    {
      title: 'Vague Speed Benchmark',
      badInput: 'The system should provide reports quickly when requested by executives.',
      defects: [
        'Subjective term "quickly" cannot be verified in performance testing.',
        'Lacks quantifiable throughput limits or payload size bounds.',
        'Missing operational error handling timeout.'
      ],
      aiDetectionScore: '38% Quality Health',
      fixedIEEE: 'The system shall generate and render executive analytical reports within 2.5 seconds for dataset queries up to 500,000 records.'
    },
    {
      title: 'Ambiguous Usability & Security',
      badInput: 'The mobile app must be robust, easy to use, and protect passwords effectively.',
      defects: [
        'Buzzword "robust" without failure rate MTBF / MTTR bounds.',
        'Subjective term "easy to use" violates ISO/IEC 29148 testability.',
        'Unspecified cryptographic hashing standard for passwords.'
      ],
      aiDetectionScore: '25% Quality Health',
      fixedIEEE: 'The system shall hash customer passwords using bcrypt with a salt work factor >= 12 and enforce Argon2id verification with 99.99% login uptime.'
    },
    {
      title: 'Missing Constraints in Concurrency',
      badInput: 'We need to handle lots of users during flash sales without server crashing.',
      defects: [
        'Vague quantification "lots of users".',
        'Informal colloquial syntax "without server crashing".',
        'No SLA on request drop rates or timeout thresholds.'
      ],
      aiDetectionScore: '30% Quality Health',
      fixedIEEE: 'The system shall sustain 100,000 concurrent active checkout sessions with an average response time < 800ms and a 0% transaction loss rate.'
    }
  ];

  const activeDemo = demoCases[selectedDemoIndex];

  const handleTriggerFix = () => {
    setIsFixing(true);
    setTimeout(() => {
      setIsFixing(false);
      setShowResolved(true);
    }, 600);
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="glass-card p-6 sm:p-8 rounded-2xl border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <div className="flex items-center space-x-2 text-rose-400 text-xs font-bold font-mono mb-2">
            <ShieldAlert className="h-4 w-4" />
            <span>SIGNATURE DEMO • "CHALLENGE REQUIREX" DEFECT DETECTOR</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white font-sans tracking-tight">Bad Requirement Detector Demo</h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-3xl leading-relaxed font-light">
            Live demonstration mode: Inject intentionally defective, ambiguous client requirements and watch RequireX AI detect defects and synthesize IEEE 830 compliant rewrites.
          </p>
        </div>

        <button
          onClick={handleTriggerFix}
          disabled={isFixing}
          className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-rose-500 via-purple-600 to-cyan-500 hover:from-rose-400 hover:to-cyan-400 text-black font-black text-xs font-mono shadow-neon-rose transition flex items-center space-x-2 cursor-pointer"
        >
          <Sparkles className="h-4 w-4 text-black animate-spin-slow" />
          <span>{isFixing ? 'Auditing & Rewriting...' : 'Challenge RequireX AI'}</span>
        </button>
      </div>

      {/* Demo Selector Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {demoCases.map((demo, idx) => (
          <button
            key={idx}
            onClick={() => { setSelectedDemoIndex(idx); setShowResolved(false); }}
            className={`p-4 rounded-xl border font-mono text-xs text-left transition-all duration-200 ${
              selectedDemoIndex === idx
                ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-neon-cyan'
                : 'bg-surface/60 border-white/10 text-slate-400 hover:text-white'
            }`}
          >
            <span className="text-[10px] text-slate-400 block mb-1">DEMO CASE 0{idx + 1}</span>
            <span className="font-bold text-sm block truncate">{demo.title}</span>
          </button>
        ))}
      </div>

      {/* Interactive Detection & Resolution Arena */}
      <div className="glass-card p-6 sm:p-8 rounded-2xl border border-white/10 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Defective Input Card */}
          <div className="p-6 rounded-2xl bg-black/80 border border-rose-500/40 shadow-neon-rose space-y-4 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-rose-400 font-bold flex items-center gap-1.5">
                <Flame className="h-4 w-4 text-rose-500" />
                <span>RAW DEFECTIVE INPUT</span>
              </span>
              <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-bold text-[10px]">
                {activeDemo.aiDetectionScore}
              </span>
            </div>

            <p className="text-sm text-white font-sans italic leading-relaxed">
              "{activeDemo.badInput}"
            </p>

            <div className="space-y-2 pt-2 border-t border-white/10">
              <span className="text-rose-400 font-bold block text-[10px] uppercase">Detected Defect Categories:</span>
              {activeDemo.defects.map((defect, dIdx) => (
                <div key={dIdx} className="p-2.5 rounded-lg bg-surface/80 border border-white/10 flex items-start space-x-2 text-slate-300">
                  <span className="text-rose-400 font-bold">✕</span>
                  <span>{defect}</span>
                </div>
              ))}
            </div>
          </div>

          {/* AI Standardized Output Card */}
          <div className={`p-6 rounded-2xl border transition-all duration-300 space-y-4 font-mono text-xs ${
            showResolved 
              ? 'bg-cyan-950/40 border-cyan-400 shadow-neon-cyan animate-fadeIn' 
              : 'bg-black/40 border-white/10'
          }`}>
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-cyan-400 font-bold flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-cyan-400" />
                <span>REQUIREX IEEE 830 STANDARD OUTPUT</span>
              </span>
              {showResolved && (
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold text-[10px]">
                  Quality: 98%
                </span>
              )}
            </div>

            {showResolved ? (
              <div className="space-y-4 animate-fadeIn">
                <p className="text-sm font-sans text-cyan-200 font-bold leading-relaxed">
                  "{activeDemo.fixedIEEE}"
                </p>

                <div className="p-4 rounded-xl bg-surface/80 border border-white/10 text-slate-300 space-y-1.5 text-[11px]">
                  <p className="text-emerald-400 font-bold">✓ IEEE 830-1998 & ISO 29148 Standard Compliant</p>
                  <p className="text-cyan-400">✓ Automated QA Stress & Unit Tests Generated</p>
                  <p className="text-purple-400">✓ Bi-directional RTM Traceability Linked</p>
                </div>
              </div>
            ) : (
              <div className="py-16 text-center space-y-3 text-slate-400">
                <Zap className="h-10 w-10 text-cyan-500/40 mx-auto animate-pulse" />
                <p className="text-xs">Click "Challenge RequireX AI" above to trigger real-time ambiguity remediation.</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
