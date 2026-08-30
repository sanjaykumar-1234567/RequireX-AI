import React, { useState } from 'react';
import { 
  Gamepad2, 
  Sparkles, 
  Award, 
  CheckCircle2, 
  ArrowRight, 
  RotateCcw, 
  Trophy,
  Zap,
  ShieldCheck
} from 'lucide-react';
import { AIEngine } from '../../services/aiEngine';
import { RefinementGameItem } from '../../types';

export const ModuleRefinementLab: React.FC = () => {
  const challenges = AIEngine.generateRefinementChallenges();
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [userRewrite, setUserRewrite] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [userScore, setUserScore] = useState<number>(0);
  const [feedback, setFeedback] = useState<string[]>([]);

  const activeChallenge = challenges[currentIdx] || challenges[0];

  const handleEvaluate = () => {
    if (!userRewrite.trim()) return;

    let score = 50;
    const lower = userRewrite.toLowerCase();
    const feedbackList: string[] = [];

    if (lower.startsWith('the system shall') || lower.startsWith('the user shall')) {
      score += 20;
      feedbackList.push('✓ Excellent: Uses standard IEEE 830 "The system shall..." modal verb syntax (+20 pts).');
    } else {
      feedbackList.push('⚠ Notice: Consider starting with standard IEEE 830 modal verb "The system shall...".');
    }

    if (lower.match(/\d+(\.\d+)?\s*(seconds|ms|milliseconds|users|%|hours)/)) {
      score += 20;
      feedbackList.push('✓ Great: Contains quantified measurable metrics (latency, concurrency, or percentage bounds) (+20 pts).');
    } else {
      feedbackList.push('⚠ Missing quantified metrics (e.g. latency in seconds, max concurrent active users).');
    }

    if (!lower.includes('fast') && !lower.includes('user-friendly') && !lower.includes('effectively')) {
      score += 10;
      feedbackList.push('✓ Clean: Free of subjective ambiguous buzzwords (+10 pts).');
    } else {
      score -= 10;
      feedbackList.push('✕ Contains subjective terms (e.g., "fast", "user-friendly").');
    }

    setUserScore(Math.min(score, 100));
    setFeedback(feedbackList);
    setSubmitted(true);
  };

  const handleNext = () => {
    setCurrentIdx((currentIdx + 1) % challenges.length);
    setUserRewrite('');
    setSubmitted(false);
    setFeedback([]);
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="glass-card p-6 sm:p-8 rounded-2xl border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <div className="flex items-center space-x-2 text-cyan-400 text-xs font-bold font-mono mb-2">
            <Gamepad2 className="h-4 w-4" />
            <span>INTERACTIVE SIMULATOR • REQUIREMENTS QUALITY GAME</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white font-sans tracking-tight">Requirement Refinement Lab</h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-3xl leading-relaxed font-light">
            Challenge your Software Engineering skills! Take flawed, ambiguous client statements and rewrite them into quantified, testable IEEE 830 specifications.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-surface/80 p-3 rounded-2xl border border-white/10">
          <Trophy className="h-6 w-6 text-amber-400" />
          <div className="text-right">
            <span className="text-[10px] font-mono text-slate-400 block">Challenge Level</span>
            <span className="text-base font-bold font-mono text-amber-300">Level {currentIdx + 1} of {challenges.length}</span>
          </div>
        </div>
      </div>

      {/* Interactive Challenge Arena */}
      <div className="glass-card p-6 sm:p-8 rounded-2xl border border-white/10 space-y-8">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <span className="text-xs font-mono font-bold text-cyan-400">DOMAIN: {activeChallenge.domain}</span>
          <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40">
            Original Flawed Score: {activeChallenge.originalScore} / 100
          </span>
        </div>

        {/* Flawed Requirement Prompt Box */}
        <div className="p-6 rounded-2xl bg-black/80 border border-rose-500/40 space-y-3 shadow-neon-rose">
          <span className="text-xs font-mono font-bold text-rose-400 uppercase tracking-widest block">
            DEFECTIVE CLIENT REQUIREMENT PROMPT:
          </span>
          <p className="text-base font-mono text-white font-semibold italic">
            "{activeChallenge.flawedText}"
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            {activeChallenge.defectReasons.map((d, i) => (
              <span key={i} className="px-2.5 py-1 rounded-lg bg-rose-500/10 text-rose-300 text-[11px] font-mono border border-rose-500/20">
                ✕ {d}
              </span>
            ))}
          </div>
        </div>

        {/* User Input Rewrite Area */}
        <div className="space-y-4 font-mono text-xs">
          <label className="block font-bold text-slate-200">
            YOUR REFINED IEEE 830 SPECIFICATION REWRITE:
          </label>
          <textarea
            rows={4}
            value={userRewrite}
            onChange={e => setUserRewrite(e.target.value)}
            placeholder='e.g. The system shall process reservation requests within 1.2 seconds under a peak concurrency load of 50,000 active users...'
            className="w-full bg-black/70 border border-white/15 focus:border-cyan-400 rounded-2xl p-4 text-white placeholder-slate-500 focus:outline-none font-mono text-sm leading-relaxed"
          />

          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <button
              onClick={handleEvaluate}
              disabled={!userRewrite.trim()}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-50 text-slate-950 font-black text-xs font-mono shadow-neon-cyan transition flex items-center space-x-2 cursor-pointer"
            >
              <Sparkles className="h-4 w-4" />
              <span>Evaluate My Rewrite with AI</span>
            </button>

            <button
              onClick={handleNext}
              className="px-5 py-3 rounded-xl bg-surface hover:bg-surface-hover text-slate-200 border border-white/10 text-xs font-mono font-bold transition flex items-center space-x-2"
            >
              <span>Next Challenge</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Evaluation Score Card Modal/Drawer */}
        {submitted && (
          <div className="p-6 rounded-2xl bg-black/90 border border-cyan-500/40 shadow-neon-cyan space-y-6 animate-fadeIn font-mono text-xs">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center space-x-2">
                <Trophy className="h-6 w-6 text-amber-400" />
                <h4 className="text-base font-bold text-white font-sans">AI Scorecard & Quality Assessment</h4>
              </div>
              <span className={`text-xl font-black ${userScore >= 80 ? 'text-emerald-400' : 'text-amber-400'}`}>
                {userScore} / 100 Points
              </span>
            </div>

            {/* Feedback items */}
            <div className="space-y-2">
              {feedback.map((f, i) => (
                <div key={i} className="p-3 rounded-xl bg-surface/80 border border-white/10 text-slate-200">
                  {f}
                </div>
              ))}
            </div>

            {/* Reference Golden Standard Rewrite */}
            <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 space-y-2">
              <span className="text-emerald-400 font-bold block text-[11px]">GOLDEN STANDARD REFERENCE IEEE 830 REWRITE:</span>
              <p className="text-slate-200 font-sans">{activeChallenge.referenceIdealText}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
