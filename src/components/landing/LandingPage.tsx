import React from 'react';
import { 
  Boxes, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  FileSpreadsheet, 
  Zap, 
  GitBranch, 
  CheckCircle2, 
  Layers, 
  Lock, 
  Cpu, 
  Terminal,
  FileCheck,
  TrendingUp,
  Activity,
  BarChart2
} from 'lucide-react';

export const LandingPage: React.FC<{ onGetStarted: () => void }> = ({ onGetStarted }) => {
  return (
    <div className="relative overflow-hidden bg-[#0B0B0F] min-h-screen text-slate-100">
      {/* Hero Glow Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-gradient-to-tr from-cyan-500/15 via-purple-500/10 to-transparent blur-3xl pointer-events-none rounded-full" />
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-3xl pointer-events-none rounded-full" />
      <div className="absolute top-2/3 left-0 w-[450px] h-[450px] bg-emerald-600/10 blur-3xl pointer-events-none rounded-full" />

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto text-center space-y-8">
        <div className="inline-flex items-center space-x-2.5 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs sm:text-sm font-semibold tracking-wide shadow-neon-cyan">
          <Sparkles className="h-4 w-4 text-cyan-400 animate-pulse" />
          <span>IEEE 830-1998 & ISO/IEC/IEEE 29148 Standardized Requirements Engine</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-tight font-sans">
          Automate Requirements Engineering with <span className="neon-text-gradient">Next-Gen AI</span>
        </h1>

        <p className="mt-6 text-base sm:text-xl text-slate-300 max-w-3xl mx-auto font-light leading-relaxed">
          Transform raw client notes, stakeholder transcripts, and unstructured specifications into IEEE 830 compliant Software Requirement Specifications, Agile User Stories, Textual Use Cases, DFD Architectures, and Automated Test Suites.
        </p>

        {/* CTA Buttons - Large Prominent Sizing */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-6">
          <button
            onClick={onGetStarted}
            className="w-full sm:w-auto px-12 py-5 rounded-2xl bg-gradient-to-r from-cyan-400 via-blue-600 to-purple-600 hover:from-cyan-300 hover:to-purple-500 text-slate-950 font-black text-base sm:text-xl shadow-neon-cyan hover:shadow-neon-blue transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-3 group cursor-pointer"
          >
            <span>Launch Workstation Free</span>
            <ArrowRight className="h-6 w-6 text-slate-950 group-hover:translate-x-1.5 transition duration-200" />
          </button>
          
          <a
            href="#workflow"
            className="w-full sm:w-auto px-12 py-5 rounded-2xl bg-surface/90 hover:bg-surface text-white border-2 border-white/20 hover:border-cyan-400 text-base sm:text-xl font-bold transition-all duration-300 flex items-center justify-center space-x-2.5 shadow-lg hover:shadow-neon-cyan"
          >
            <span>Explore Engineering Suite</span>
          </a>
        </div>
      </section>

      {/* Feature Grid Section */}
      <section className="py-24 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto border-t border-white/10 space-y-16">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-mono uppercase tracking-widest">
            <Cpu className="h-3.5 w-3.5" />
            <span>Full-Lifecycle Software Engineering</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-sans">
            Enterprise Requirements Suite
          </h2>
          <p className="text-base text-slate-400 leading-relaxed font-light">
            Everything software architects, business analysts, and project managers need to eliminate requirement defects before writing code.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: Cpu,
              title: "AI Requirement Classifier",
              desc: "Upload PDFs, DOCX, TXT documents or interview transcripts. RequireX automatically classifies requirements into Functional, Non-functional, Business, System, User, and Technical types.",
              neonClass: "neon-card-cyan"
            },
            {
              icon: ShieldCheck,
              title: "IEEE Quality Auditor",
              desc: "Detect ambiguous terms, missing actors, non-testable clauses, and weak conditions. Get instant confidence scores and IEEE 830 standardized rewriter suggestions.",
              neonClass: "neon-card-purple"
            },
            {
              icon: Sparkles,
              title: "Domain Knowledge Engine",
              desc: "Select project domain (Railway, Hospital, E-Commerce, Banking, Disaster Management, Smart Home). Receive intelligent recommendations for missing security & architectural features.",
              neonClass: "neon-card-blue"
            },
            {
              icon: GitBranch,
              title: "Agile Story & Use Case Synthesizer",
              desc: "Automatically synthesize Agile User Stories (As a / I want / So that) with story points, acceptance criteria checklists, Gherkin BDD scenarios, and full textual use cases.",
              neonClass: "neon-card-emerald"
            },
            {
              icon: FileCheck,
              title: "Automated QA Test Suite",
              desc: "Generate Positive, Negative, Boundary, Security, and Performance test cases complete with Test IDs, input parameters, expected outputs, and priority levels.",
              neonClass: "neon-card-amber"
            },
            {
              icon: FileSpreadsheet,
              title: "One-Click IEEE SRS Export",
              desc: "Export complete, production-formatted Software Requirement Specifications in PDF, Word (.docx), Markdown (.md), and Plain Text (.txt) formats.",
              neonClass: "neon-card-rose"
            }
          ].map((f, i) => {
            const Icon = f.icon;
            return (
              <div 
                key={i} 
                className={`glass-card ${f.neonClass} p-8 rounded-2xl border border-white/10 space-y-4 relative group cursor-pointer transition-all duration-300 hover:-translate-y-1.5`}
              >
                <div className="h-12 w-12 rounded-xl bg-surface/90 border border-white/15 flex items-center justify-center text-cyan-400 group-hover:scale-110 group-hover:text-white transition duration-300 shadow-md">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-white font-sans">{f.title}</h3>
                <p className="text-sm text-slate-300 leading-relaxed font-light">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Interactive Workflow Section */}
      <section id="workflow" className="py-24 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto border-t border-white/10 space-y-16">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest font-mono">End-to-End Requirements Pipeline</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">How RequireX Engineering Works</h2>
          <p className="text-sm text-slate-400 font-light">Seamlessly converting chaotic input into standardized engineering artifacts.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { step: "01", title: "Upload & Ingest", desc: "Paste raw unstructured text or upload project documents & stakeholder notes.", color: "border-cyan-500/40 text-cyan-400" },
            { step: "02", title: "IEEE Quality Audit", desc: "RequireX flags ambiguity, missing constraints, and rewrites into IEEE standard.", color: "border-blue-500/40 text-blue-400" },
            { step: "03", title: "Artifact Synthesis", desc: "Generates Agile user stories, textual use cases, test matrices, and RTM index.", color: "border-purple-500/40 text-purple-400" },
            { step: "04", title: "Download SRS", desc: "Export professional IEEE SRS documents in PDF, DOCX, Markdown, and TXT.", color: "border-emerald-500/40 text-emerald-400" }
          ].map((s, idx) => (
            <div key={idx} className={`glass-card p-8 rounded-2xl border ${s.color.split(' ')[0]} space-y-4 hover:shadow-lg transition-all duration-300`}>
              <span className={`text-4xl font-black font-mono block ${s.color.split(' ')[1]}`}>{s.step}</span>
              <h4 className="text-lg font-bold text-white font-sans">{s.title}</h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tech Stack Showcase */}
      <section className="py-20 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto border-t border-white/10 text-center space-y-8">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">Engineered with Enterprise Software Engineering Standards</h3>
        <div className="flex flex-wrap items-center justify-center gap-4">
          {['IEEE Std 830-1998', 'ISO/IEC/IEEE 29148-2018', 'Agile BDD & Gherkin', 'React 18 & TypeScript', 'Tailwind CSS & Neon Glass', 'Framer Motion', 'jsPDF & DOCX Core', 'COCOMO II Engine'].map((tech, i) => (
            <span key={i} className="px-5 py-2.5 rounded-xl bg-surface/80 border border-white/10 text-xs sm:text-sm font-mono text-cyan-300 hover:border-cyan-500/50 hover:shadow-neon-cyan transition duration-300">
              {tech}
            </span>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-10 px-6 text-center text-xs text-slate-400 bg-[#08080C]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2.5">
            <Boxes className="h-5 w-5 text-cyan-400" />
            <span className="font-extrabold text-white font-mono text-sm">RequireX AI Workstation</span>
            <span className="text-slate-500">• Enterprise Requirements Engineering</span>
          </div>
          <p>© 2026 RequireX. Designed for Software Engineers & Systems Architects.</p>
        </div>
      </footer>
    </div>
  );
};

