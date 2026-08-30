import React from 'react';
import { UserCheck, Shield, Bug, Briefcase, Code, Sparkles, CheckCircle2 } from 'lucide-react';
import { useProject } from '../../context/ProjectContext';
import { PersonaReview } from '../../types';

export const ModuleMultiPerspectiveReview: React.FC = () => {
  const { currentProject } = useProject();

  if (!currentProject) return null;

  const personas: PersonaReview[] = [
    {
      persona: 'Business Analyst',
      score: 92,
      summary: `Requirements align with domain business outcomes for ${currentProject.domain}. Stakeholder value is well documented.`,
      recommendations: ['Explicitly state SLA penalty clauses for third-party payment gateway downtime.'],
      risksIdentified: ['Scope expansion during peak operational windows.']
    },
    {
      persona: 'Software Developer',
      score: 86,
      summary: 'Technical feasibility is high. REST API endpoints and data model structures are implementable.',
      recommendations: ['Introduce Redis caching layer to offload high-concurrency database queries.'],
      risksIdentified: ['Database lock contention under peak Tatkal / flash sale load.']
    },
    {
      persona: 'QA Engineer',
      score: 88,
      summary: 'Acceptance criteria and positive/negative test paths are testable.',
      recommendations: ['Add boundary value test cases for maximum payload throughput limits.'],
      risksIdentified: ['Unclear automated timeout assertion in test matrix.']
    },
    {
      persona: 'Security Analyst',
      score: 95,
      summary: 'Strong security posture: OAuth 2.0, AES-256 encryption at rest, and mandatory MFA supported.',
      recommendations: ['Enforce rate limiting on authentication endpoints to prevent brute-force attacks.'],
      risksIdentified: ['API token exposure in client-side storage logs.']
    },
    {
      persona: 'Project Manager',
      score: 90,
      summary: 'Overall sprint velocity impact is manageable. Story point allocations match milestone targets.',
      recommendations: ['Prioritize critical non-functional requirements in Sprint 1.'],
      risksIdentified: ['Third-party API integration dependency delays.']
    }
  ];

  const getPersonaIcon = (p: PersonaReview['persona']) => {
    switch (p) {
      case 'Business Analyst': return Briefcase;
      case 'Software Developer': return Code;
      case 'QA Engineer': return Bug;
      case 'Security Analyst': return Shield;
      case 'Project Manager': return UserCheck;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="glass-card p-6 rounded-2xl border border-white/10 relative overflow-hidden">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400 font-mono">
                INNOVATIVE MODULE • MULTI-PERSPECTIVE AI REVIEW
              </span>
            </div>
            <h1 className="text-xl font-extrabold text-white font-mono mt-0.5">
              5-Persona Multi-Perspective AI Engineering Review
            </h1>
          </div>
        </div>
        <p className="text-xs text-slate-300 mt-2 max-w-3xl leading-relaxed">
          AI evaluation of [{currentProject.name}] requirements through 5 dedicated engineering personas: Business Analyst, Software Architect, QA Lead, Security Specialist, and Project Manager.
        </p>
      </div>

      {/* Personas Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {personas.map((item, idx) => {
          const Icon = getPersonaIcon(item.persona);
          return (
            <div key={idx} className="glass-card p-5 rounded-xl border border-white/10 hover:border-cyan-400/60 hover:shadow-[0_0_25px_rgba(0,240,255,0.25)] transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="h-8 w-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="text-xs font-bold text-white font-mono">{item.persona}</span>
                </div>
                <span className="px-2.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-bold font-mono">
                  {item.score}% OK
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed bg-black/40 p-3 rounded-lg border border-white/5">
                {item.summary}
              </p>

              <div>
                <span className="text-[10px] font-bold text-cyan-400 font-mono block mb-1">Key Recommendation</span>
                <p className="text-xs text-slate-200 flex items-start gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>{item.recommendations[0]}</span>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
