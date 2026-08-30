import React, { useState } from 'react';
import { useProject } from '../../context/ProjectContext';
import { 
  BookOpen, 
  Search, 
  Brain, 
  LayoutDashboard, 
  BarChart3, 
  TrendingUp, 
  Target, 
  FileUp, 
  ShieldCheck, 
  Sparkles, 
  Gamepad2, 
  ShieldAlert, 
  Flame, 
  AlertTriangle, 
  CheckSquare, 
  Network, 
  Cpu, 
  GitPullRequest, 
  Users, 
  Award, 
  Milestone, 
  Boxes, 
  BookOpenCheck, 
  GitMerge, 
  FileSpreadsheet, 
  ArrowRight,
  ExternalLink,
  Layers,
  HelpCircle,
  Lightbulb,
  CheckCircle2,
  Workflow
} from 'lucide-react';

interface ManualSection {
  id: string;
  tabTarget: any;
  title: string;
  category: 'AI & LLM Benchmark' | 'Executive & Quality' | 'Requirements & Refinement' | 'Risk & Testing' | 'Architecture & Traceability' | 'Simulation & Analysis' | 'Agile & SRS Exports';
  icon: any;
  tag: string;
  color: string;
  border: string;
  glow: string;
  description: string;
  purpose: string;
  inputs: string;
  outputs: string;
  standard: string;
}

export const ModuleUserManual: React.FC = () => {
  const { setActiveTab } = useProject();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    'All',
    'AI & LLM Benchmark',
    'Executive & Quality',
    'Requirements & Refinement',
    'Risk & Testing',
    'Architecture & Traceability',
    'Simulation & Analysis',
    'Agile & SRS Exports'
  ];

  const sections: ManualSection[] = [
    // 1. AI & LLM Benchmark
    {
      id: 'llm-eval-lab',
      tabTarget: 'llm-eval-lab',
      title: 'LLM Model Evaluation Lab',
      category: 'AI & LLM Benchmark',
      icon: Brain,
      tag: 'MAJOR INNOVATION',
      color: 'text-cyan-400',
      border: 'border-cyan-500/40',
      glow: 'shadow-neon-cyan',
      description: 'Empirical benchmarking suite to evaluate and compare Large Language Models (OpenAI GPT-4o, Claude 3.5, Gemini 1.5, Llama 3.1) specifically for Software Requirements Engineering.',
      purpose: 'Objectively score models on 13 standardized RE competencies including extraction precision, multiclass confusion matrix, ambiguity detection, and JSON schema reliability.',
      inputs: 'Standardized ground-truth datasets, project backlogs, custom requirement documents.',
      outputs: '8D Radar charts, multiclass confusion matrices, head-to-head win/loss differentials, split-screen explainability views, PDF/DOCX/CSV reports.',
      standard: 'ISO/IEC/IEEE 29148:2018 & Empirical SE Benchmarking'
    },

    // 2. Executive & Quality Dashboard
    {
      id: 'dashboard',
      tabTarget: 'dashboard',
      title: 'Executive Dashboard Overview',
      category: 'Executive & Quality',
      icon: LayoutDashboard,
      tag: 'CORE COCKPIT',
      color: 'text-violet-400',
      border: 'border-violet-500/40',
      glow: 'shadow-neon-violet',
      description: 'Central project command center displaying active specifications baseline, IEEE compliance health, and quick innovation launchpad.',
      purpose: 'Provides leadership and engineering teams instant visibility into project metrics, requirement counts, and one-click access to all modules.',
      inputs: 'Active project data & requirements baseline.',
      outputs: 'Real-time KPI metrics, active specification cards, one-click PDF export, fast innovation launcher.',
      standard: 'IEEE Std 830-1998 Project Overview'
    },
    {
      id: 'analytics',
      tabTarget: 'analytics',
      title: 'Quality & MoSCoW Analytics',
      category: 'Executive & Quality',
      icon: BarChart3,
      tag: 'ANALYTICS',
      color: 'text-blue-400',
      border: 'border-blue-500/40',
      glow: 'shadow-neon-blue',
      description: 'Deep visual analytics covering requirement type breakdowns, MoSCoW priority distributions, and quality dimension benchmarks.',
      purpose: 'Quantify specification quality across clarity, completeness, verifiability, traceability, and consistency.',
      inputs: 'Categorized requirements baseline.',
      outputs: 'Functional vs Non-Functional donut charts, MoSCoW priority bars, 5-dimension quality benchmarks.',
      standard: 'MoSCoW Prioritization & ISO 25010 Quality Model'
    },
    {
      id: 'quality-over-time',
      tabTarget: 'quality-over-time',
      title: 'Quality Over Time (V1-V4 Evolution)',
      category: 'Executive & Quality',
      icon: TrendingUp,
      tag: 'EVOLUTION',
      color: 'text-blue-400',
      border: 'border-blue-500/30',
      glow: 'shadow-neon-blue',
      description: 'Tracks quality index evolution, ambiguity reduction, and test coverage growth across specification versions.',
      purpose: 'Demonstrate continuous requirement improvement and audit trail progress across iterations.',
      inputs: 'Historical project version snapshots.',
      outputs: 'Multi-version trend line charts, version-to-version delta metrics, regression detection.',
      standard: 'Software Configuration & Version Audit (IEEE 828)'
    },
    {
      id: 'coverage-dashboard',
      tabTarget: 'coverage-dashboard',
      title: '4-KPI Coverage Dashboard',
      category: 'Executive & Quality',
      icon: Target,
      tag: 'METRICS',
      color: 'text-cyan-400',
      border: 'border-cyan-500/30',
      glow: 'shadow-neon-cyan',
      description: 'High-level verification dashboard highlighting Traceability Coverage, QA Test Depth, Risk Mitigation Rate, and Story Linkage.',
      purpose: 'Ensure zero orphaned requirements and 100% downstream artifact verification.',
      inputs: 'Requirements, test cases, risks, user stories.',
      outputs: '4 radial gauge progress meters and coverage gap summaries.',
      standard: 'IEEE 829 Verification & Validation'
    },

    // 3. Requirements & Refinement Lab
    {
      id: 'upload',
      tabTarget: 'upload',
      title: 'Requirement Ingestion & AI Classifier',
      category: 'Requirements & Refinement',
      icon: FileUp,
      tag: 'INGESTION',
      color: 'text-blue-400',
      border: 'border-blue-500/30',
      glow: 'shadow-neon-blue',
      description: 'Upload PDF, DOCX, TXT files, stakeholder interview transcripts, or paste raw text. AI extracts atomic requirements and classifies them.',
      purpose: 'Converts unstructured, chaotic narrative documents into structured, categorized specifications.',
      inputs: 'Raw documents, meeting minutes, interview transcripts, pasted text.',
      outputs: 'Atomic requirement objects classified into Functional, Non-functional, Business, System, User, Technical.',
      standard: 'Natural Language Requirements Ingestion'
    },
    {
      id: 'quality',
      tabTarget: 'quality',
      title: 'IEEE Quality Audit & Standard Rewriter',
      category: 'Requirements & Refinement',
      icon: ShieldCheck,
      tag: 'QUALITY AUDIT',
      color: 'text-violet-400',
      border: 'border-violet-500/40',
      glow: 'shadow-neon-violet',
      description: 'Automated audit engine flagging subjective buzzwords, missing actors, non-testable clauses, and missing constraints.',
      purpose: 'Rewrites flawed requirements into formal IEEE 830 statements ("The system shall...") with one-click adoption.',
      inputs: 'Draft requirements statements.',
      outputs: 'Itemized defect reasons, severity ratings, suggested formal IEEE rewrites, audit confidence scores.',
      standard: 'IEEE 830-1998 & ISO/IEC/IEEE 29148 Clause 5.2'
    },
    {
      id: 'recommendations',
      tabTarget: 'recommendations',
      title: 'Domain Knowledge Recommender',
      category: 'Requirements & Refinement',
      icon: Sparkles,
      tag: 'AI SUGGEST',
      color: 'text-violet-400',
      border: 'border-violet-500/30',
      glow: 'shadow-neon-violet',
      description: 'AI domain intelligence that suggests critical missing security, performance, audit, and offline requirements tailored to your domain.',
      purpose: 'Prevents omission of mission-critical requirements in domains like Railway, E-Commerce, Hospital, Banking, Disaster Management.',
      inputs: 'Selected project domain and existing requirements backlog.',
      outputs: 'Domain-specific requirement proposals ready for immediate addition to the project baseline.',
      standard: 'Domain-Driven Requirements Engineering (DDRE)'
    },
    {
      id: 'refinement-lab',
      tabTarget: 'refinement-lab',
      title: 'Refinement Lab Game',
      category: 'Requirements & Refinement',
      icon: Gamepad2,
      tag: 'INTERACTIVE GAME',
      color: 'text-violet-400',
      border: 'border-violet-500/30',
      glow: 'shadow-neon-violet',
      description: 'Gamified interactive requirements training environment where users inspect flawed specifications and rewrite them to achieve high IEEE scores.',
      purpose: 'Educational and training tool for software engineering students and analysts to master IEEE quality criteria.',
      inputs: 'Flawed sample requirements across domains.',
      outputs: 'Real-time score calculator, defect reason breakdowns, ideal reference rewrites.',
      standard: 'Gamified Software Engineering Education'
    },
    {
      id: 'bad-req-detector',
      tabTarget: 'bad-req-detector',
      title: 'Bad Requirement Detector Demo',
      category: 'Requirements & Refinement',
      icon: ShieldAlert,
      tag: 'DEMO SCANNER',
      color: 'text-red-400',
      border: 'border-red-500/30',
      glow: 'shadow-neon-red',
      description: 'Interactive anti-pattern demonstration tool showcasing real-time detection of weak words (e.g. "fast", "user-friendly", "robust").',
      purpose: 'Instantly highlights why certain colloquial words fail software verification and validation.',
      inputs: 'Sample statements or live user input.',
      outputs: 'Highlighted anti-pattern keywords, explainability callouts, measurable metric suggestions.',
      standard: 'IEEE 830 Ambiguity Rules'
    },

    // 4. Risk & Testing Intelligence
    {
      id: 'risk-heatmap',
      tabTarget: 'risk-heatmap',
      title: '2D Requirements Risk Heatmap',
      category: 'Risk & Testing',
      icon: Flame,
      tag: '2D MATRIX',
      color: 'text-red-400',
      border: 'border-red-500/40',
      glow: 'shadow-neon-red',
      description: 'Interactive 2D Probability vs. Impact risk matrix mapping project and requirement vulnerabilities.',
      purpose: 'Identifies critical path risks and automatically generates architectural mitigation action plans.',
      inputs: 'Risk items and linked requirement IDs.',
      outputs: 'Color-coded 3x3 risk matrix, risk exposure scores, mitigation strategies.',
      standard: 'SEI Continuous Risk Management'
    },
    {
      id: 'risk-early-warning',
      tabTarget: 'risk-early-warning',
      title: 'Risk Early Warning & Blast Radius',
      category: 'Risk & Testing',
      icon: AlertTriangle,
      tag: 'PREDICTIVE',
      color: 'text-red-400',
      border: 'border-red-500/30',
      glow: 'shadow-neon-red',
      description: 'Predictive risk indicator that calculates requirement volatility and architectural blast radius before code implementation begins.',
      purpose: 'Warns development teams of cascading risks and unstable requirements early in the software lifecycle.',
      inputs: 'Requirement volatility ratings and dependency chains.',
      outputs: 'Blast radius scores, early warning alert cards, pre-sprint stability checklist.',
      standard: 'Shift-Left Quality & Risk Engineering'
    },
    {
      id: 'testing-matrix',
      tabTarget: 'testing-matrix',
      title: '5-Level Testing Matrix',
      category: 'Risk & Testing',
      icon: CheckSquare,
      tag: '5-LEVEL QA',
      color: 'text-blue-400',
      border: 'border-blue-500/30',
      glow: 'shadow-neon-blue',
      description: 'Multi-level testing breakdown auditing Unit, Integration, System, Security, and Performance test coverage per requirement.',
      purpose: 'Identifies untested verification gaps and guarantees comprehensive QA coverage across all testing levels.',
      inputs: 'Requirement backlog and QA test cases.',
      outputs: 'Interactive 5-level coverage matrix table with gap indicators and test health scores.',
      standard: 'IEEE Std 829-2008 Multi-Level Testing'
    },

    // 5. Architecture & Traceability
    {
      id: 'traceability-graph',
      tabTarget: 'traceability-graph',
      title: 'Traceability Lineage Graph',
      category: 'Architecture & Traceability',
      icon: Network,
      tag: 'LINEAGE',
      color: 'text-cyan-400',
      border: 'border-cyan-500/40',
      glow: 'shadow-neon-cyan',
      description: 'Interactive visual flow mapping Requirement → User Story → Acceptance Criteria → Use Case → QA Test Case.',
      purpose: 'Ensures strict forward and backward traceability for certification, compliance, and regression tracking.',
      inputs: 'Requirements, user stories, use cases, test cases.',
      outputs: 'Interactive multi-node lineage graph with live status pills (PASS/PENDING/FAIL).',
      standard: 'IEEE Std 29148 Bi-Directional Traceability'
    },
    {
      id: 'dependency-graph',
      tabTarget: 'dependency-graph',
      title: 'Dependency Network Graph',
      category: 'Architecture & Traceability',
      icon: Network,
      tag: 'DAG GRAPH',
      color: 'text-blue-400',
      border: 'border-blue-500/30',
      glow: 'shadow-neon-blue',
      description: 'Interactive Directed Acyclic Graph (DAG) visualizing inter-requirement dependencies, prerequisite chains, and bottlenecks.',
      purpose: 'Helps architects identify blocker requirements and sequence sprint implementation safely.',
      inputs: 'Requirement dependency declarations.',
      outputs: 'Interactive network graph with dependency clustering and circular reference detection.',
      standard: 'Dependency Structure Matrix (DSM)'
    },
    {
      id: 'architecture',
      tabTarget: 'architecture',
      title: 'System Architecture DFD Streamer',
      category: 'Architecture & Traceability',
      icon: Cpu,
      tag: 'LIVE DFD',
      color: 'text-violet-400',
      border: 'border-violet-500/40',
      glow: 'shadow-neon-violet',
      description: 'Interactive Level-0 (Context) and Level-1 Data Flow Diagrams with real-time live animated packet streamer simulation.',
      purpose: 'Visualizes external entities, system processes, data stores, and data flows for system architects.',
      inputs: 'System boundaries and data transactions.',
      outputs: 'Gane-Sarson / Yourdon DFD visualizer with live packet animation controls (Play/Pause/Speed).',
      standard: 'Gane-Sarson & Yourdon Structured Analysis'
    },
    {
      id: 'architecture-impact',
      tabTarget: 'architecture-impact',
      title: 'Architecture Impact & Microservice Chains',
      category: 'Architecture & Traceability',
      icon: Cpu,
      tag: 'BLAST RADIUS',
      color: 'text-red-400',
      border: 'border-red-500/30',
      glow: 'shadow-neon-red',
      description: 'Maps each software requirement to its impacted microservices, database tables, downstream APIs, and regression tests.',
      purpose: 'Enables backend engineers and architects to evaluate the exact architectural footprint of any requirement change.',
      inputs: 'Requirements and microservice architecture schema.',
      outputs: 'Itemized architectural impact chains and severity classifications.',
      standard: 'Microservice Architecture Traceability'
    },

    // 6. Simulation & Analysis
    {
      id: 'what-if',
      tabTarget: 'what-if',
      title: 'What-If Scope Creep Simulator',
      category: 'Simulation & Analysis',
      icon: Sparkles,
      tag: 'SIMULATION',
      color: 'text-cyan-400',
      border: 'border-cyan-500/40',
      glow: 'shadow-neon-cyan',
      description: 'Scenario simulator that models the downstream cost, risk, timeline, and architectural impact of adding or modifying requirements.',
      purpose: 'Gives project managers data-backed evidence during stakeholder scope change negotiations.',
      inputs: 'Proposed change prompt (e.g. "Add biometric facial KYC").',
      outputs: 'Impact rating, affected stories/use cases/tests, risk delta, complexity delta, AI explanation.',
      standard: 'COCOMO II Cost Estimation & Change Impact Analysis'
    },
    {
      id: 'conflict',
      tabTarget: 'conflict',
      title: 'Conflict & Duplicate Detector',
      category: 'Simulation & Analysis',
      icon: GitPullRequest,
      tag: 'CONFLICT AI',
      color: 'text-violet-400',
      border: 'border-violet-500/40',
      glow: 'shadow-neon-violet',
      description: 'Automated conflict detection engine identifying contradictory business rules, conflicting SLAs, security vs. performance trade-offs, and duplicate statements.',
      purpose: 'Prevents conflicting specifications from reaching developers, avoiding costly architecture redesigns.',
      inputs: 'Requirements backlog statements.',
      outputs: 'Conflict diagnosis, severity rating, affected statements, AI suggested architectural resolutions.',
      standard: 'Requirements Consistency Analysis (ISO 29148)'
    },
    {
      id: 'similarity-map',
      tabTarget: 'similarity-map',
      title: 'Similarity & Cluster Map',
      category: 'Simulation & Analysis',
      icon: Network,
      tag: 'VECTOR AI',
      color: 'text-blue-400',
      border: 'border-blue-500/30',
      glow: 'shadow-neon-blue',
      description: 'AI semantic similarity analysis grouping requirements into contextual clusters and identifying redundant specifications.',
      purpose: 'Consolidate duplicate requirements and discover natural functional clusters for microservice decomposition.',
      inputs: 'All requirement descriptions.',
      outputs: 'Semantic cluster cards, cosine similarity ratings (>80%), consolidation recommendations.',
      standard: 'NLP Semantic Embeddings & Cluster Analysis'
    },
    {
      id: 'stakeholders',
      tabTarget: 'stakeholders',
      title: 'Power-Interest Stakeholder Matrix',
      category: 'Simulation & Analysis',
      icon: Users,
      tag: '2x2 MATRIX',
      color: 'text-violet-400',
      border: 'border-violet-500/30',
      glow: 'shadow-neon-violet',
      description: 'Interactive Mendelow Power-Interest 2x2 grid mapping project stakeholders into Key Players, Keep Satisfied, Keep Informed, Minimal Effort.',
      purpose: 'Aligns requirement priorities with stakeholder influence and engagement strategies.',
      inputs: 'Stakeholder roster and linked requirement tags.',
      outputs: 'Interactive 2x2 quadrant visualizer with customized engagement strategies per role.',
      standard: 'Mendelow Power-Interest Matrix (PMBOK Guide)'
    },
    {
      id: 'quality-heatmap',
      tabTarget: 'quality-heatmap',
      title: 'Requirement Health Scores Heatmap',
      category: 'Simulation & Analysis',
      icon: BarChart3,
      tag: 'HEALTH',
      color: 'text-blue-400',
      border: 'border-blue-500/30',
      glow: 'shadow-neon-blue',
      description: 'Comprehensive 8-dimensional health matrix scoring every individual requirement across Completeness, Clarity, Testability, Verifiability, Traceability, Consistency, Modifiability, and Volatility.',
      purpose: 'Enables deep-dive audit of individual specifications to identify weak requirements needing refinement.',
      inputs: 'Requirements statements.',
      outputs: 'Interactive tabular heatmap with per-dimension scores and volatility tags.',
      standard: 'IEEE 830 Quality Characteristics Matrix'
    },
    {
      id: 'compliance',
      tabTarget: 'compliance',
      title: 'IEEE 29148 Compliance Radar',
      category: 'Simulation & Analysis',
      icon: Award,
      tag: 'IEEE AUDIT',
      color: 'text-violet-400',
      border: 'border-violet-500/40',
      glow: 'shadow-neon-violet',
      description: 'Formal compliance verification checking requirements against international ISO/IEC/IEEE 29148 standards.',
      purpose: 'Audits specifications for singularity, feasibility, verifiability, and standard formatting.',
      inputs: 'Entire project baseline.',
      outputs: 'Compliance criterion cards with status (Passed/Warning/Failed) and actionable recommendations.',
      standard: 'ISO/IEC/IEEE 29148:2018 Standard Compliance'
    },
    {
      id: 'multi-review',
      tabTarget: 'multi-review',
      title: '5-Persona Multi-Perspective Review Board',
      category: 'Simulation & Analysis',
      icon: ShieldCheck,
      tag: '5 PERSONAS',
      color: 'text-blue-400',
      border: 'border-blue-500/40',
      glow: 'shadow-neon-blue',
      description: 'Simulates a formal cross-functional review board with 5 AI expert personas: Business Analyst, Software Developer, QA Engineer, Security Analyst, Project Manager.',
      purpose: 'Reviews specifications from multiple engineering viewpoints before sign-off to catch architectural, testing, and business gaps.',
      inputs: 'Project requirements baseline.',
      outputs: 'Persona review cards with scores (0-100), itemized recommendations, and domain risks.',
      standard: 'Formal Technical Review (FTR) & Cross-Functional Inspection'
    },

    // 7. Agile & SRS Exports
    {
      id: 'roadmap',
      tabTarget: 'roadmap',
      title: 'Requirements Roadmap & Release Timeline',
      category: 'Agile & SRS Exports',
      icon: Milestone,
      tag: 'TIMELINE',
      color: 'text-cyan-400',
      border: 'border-cyan-500/30',
      glow: 'shadow-neon-cyan',
      description: 'Maps specifications across release milestones (Release 1 MVP, Release 2 Enhanced, Release 3 Advanced) using MoSCoW prioritization.',
      purpose: 'Plans phased feature rollouts and tracks story point allocations per milestone.',
      inputs: 'Requirements, story points, and MoSCoW priorities.',
      outputs: 'Interactive Gantt-style release timeline with readiness progress meters.',
      standard: 'Agile Release Planning'
    },
    {
      id: 'release-planner',
      tabTarget: 'release-planner',
      title: 'AI Sprint Planner',
      category: 'Agile & SRS Exports',
      icon: Boxes,
      tag: 'SPRINT AI',
      color: 'text-blue-400',
      border: 'border-blue-500/30',
      glow: 'shadow-neon-blue',
      description: 'Automated sprint allocation engine that bundles user stories into balanced 2-week sprints respecting team velocity and dependency constraints.',
      purpose: 'Automates sprint backlog creation with zero dependency violations.',
      inputs: 'User stories, story points, team capacity constraints.',
      outputs: 'Sprint proposals (Sprint 1, Sprint 2, Sprint 3) with assigned story points and risk ratings.',
      standard: 'Scrum Sprint Planning & Velocity Modeling'
    },
    {
      id: 'user-stories',
      tabTarget: 'user-stories',
      title: 'Agile User Stories Synthesizer',
      category: 'Agile & SRS Exports',
      icon: BookOpenCheck,
      tag: 'AGILE STORIES',
      color: 'text-violet-400',
      border: 'border-violet-500/30',
      glow: 'shadow-neon-violet',
      description: 'Generates standard Connextra format user stories ("As a [role], I want to [goal], so that [benefit]") with Fibonacci story points.',
      purpose: 'Populates Jira/Azure DevOps backlogs with acceptance criteria checklists and Definition of Done.',
      inputs: 'Functional and user requirements.',
      outputs: 'Agile story cards with acceptance criteria, DoD checklists, and Gherkin scenarios.',
      standard: 'Connextra Format & INVEST Story Principles'
    },
    {
      id: 'use-cases',
      tabTarget: 'use-cases',
      title: 'Textual Use Cases Generator',
      category: 'Agile & SRS Exports',
      icon: GitMerge,
      tag: 'USE CASES',
      color: 'text-blue-400',
      border: 'border-blue-500/30',
      glow: 'shadow-neon-blue',
      description: 'Produces Cockburn-style structured textual use cases complete with primary actors, preconditions, main success flow, alternative flows, and exceptions.',
      purpose: 'Provides detailed step-by-step operational workflows for system implementers.',
      inputs: 'Functional requirements baseline.',
      outputs: 'Formal structured use case cards with numbered sequence steps.',
      standard: 'Alistair Cockburn Textual Use Case Standard'
    },
    {
      id: 'test-cases',
      tabTarget: 'test-cases',
      title: 'QA Test Matrix Synthesizer',
      category: 'Agile & SRS Exports',
      icon: CheckSquare,
      tag: 'QA TESTS',
      color: 'text-blue-400',
      border: 'border-blue-500/30',
      glow: 'shadow-neon-blue',
      description: 'Generates comprehensive QA test cases categorized into Positive, Negative, Boundary, Validation, Security, and Performance suites.',
      purpose: 'Supplies QA teams with test IDs, input parameters, and expected outputs tied to requirement IDs.',
      inputs: 'Requirements specifications.',
      outputs: 'Interactive test case table with test filters, execution status toggles, and coverage links.',
      standard: 'IEEE Std 829-2008 Test Documentation'
    },
    {
      id: 'rtm',
      tabTarget: 'rtm',
      title: 'Requirements Traceability Matrix (RTM)',
      category: 'Agile & SRS Exports',
      icon: Network,
      tag: 'RTM MATRIX',
      color: 'text-violet-400',
      border: 'border-violet-500/40',
      glow: 'shadow-neon-violet',
      description: 'Bi-directional traceability table dynamically mapping Requirements ↔ Use Cases ↔ Test Cases.',
      purpose: 'Guarantees that every requirement has at least one use case and one test case (100% coverage verification).',
      inputs: 'Requirements, use cases, test cases.',
      outputs: 'Complete tabular RTM index with coverage badges (Covered/Partial/Uncovered) and quick filters.',
      standard: 'CMMI Level 3 Requirements Traceability & IEEE 29148'
    },
    {
      id: 'srs',
      tabTarget: 'srs',
      title: 'IEEE SRS Document Exporter',
      category: 'Agile & SRS Exports',
      icon: FileSpreadsheet,
      tag: 'SRS EXPORT',
      color: 'text-violet-400',
      border: 'border-violet-500/40',
      glow: 'shadow-neon-violet',
      description: 'Live interactive preview of publication-ready IEEE Std 830-1998 / 29148 Software Requirements Specification documents.',
      purpose: 'One-click professional document export for client delivery, academic submission, and formal compliance.',
      inputs: 'All project artifacts (requirements, user stories, use cases, test cases, risks, architecture).',
      outputs: 'Formatted documents downloadable in PDF, Word (.docx), Markdown (.md), and Plain Text (.txt).',
      standard: 'IEEE Std 830-1998 & ISO/IEC/IEEE 29148:2018 SRS Template'
    }
  ];

  // Filter sections based on search query and category
  const filteredSections = sections.filter(sec => {
    const matchesSearch = 
      sec.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sec.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sec.purpose.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sec.standard.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCat = selectedCategory === 'All' || sec.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-8">
      {/* Top Banner with Dark Violet & Cyan Neon Theme */}
      <div className="glass-card neon-card-violet p-6 sm:p-8 rounded-2xl border border-violet-500/40 shadow-neon-violet relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/15 blur-3xl pointer-events-none rounded-full" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-violet-600/20 blur-3xl pointer-events-none rounded-full" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-violet-300 text-xs font-bold font-mono">
              <span className="px-2.5 py-0.5 rounded-full bg-violet-500/20 border border-violet-400/40 text-[10px] uppercase tracking-wider">
                COMPREHENSIVE APPLICATION GUIDE
              </span>
              <span>•</span>
              <span className="text-cyan-300">27+ SE SERVICES &amp; MODULES</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight flex items-center gap-3">
              <BookOpen className="h-8 w-8 text-cyan-400" />
              <span>RequireX AI — Interactive User Manual &amp; Capabilities Guide</span>
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed font-light">
              Complete index and reference manual for all 27+ Software Requirements Engineering modules, AI benchmarking tools, and artifact generators present in the RequireX workstation.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-3 font-mono text-xs">
            <div className="p-3 rounded-xl bg-black/50 border border-violet-500/30 text-center">
              <span className="text-[10px] text-slate-400 block uppercase">Total Modules</span>
              <span className="text-xl font-black text-violet-300">27</span>
            </div>
            <div className="p-3 rounded-xl bg-black/50 border border-cyan-500/30 text-center">
              <span className="text-[10px] text-slate-400 block uppercase">IEEE Standards</span>
              <span className="text-xl font-black text-cyan-300">830 / 29148</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="glass-card p-5 rounded-2xl border border-white/10 space-y-4">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="relative flex-1 w-full">
            <Search className="h-4 w-4 text-cyan-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by module name, feature, IEEE standard, or engineering purpose..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-black/50 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs font-mono text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 transition"
            />
          </div>

          <span className="text-xs font-mono text-slate-400 font-bold whitespace-nowrap">
            Showing {filteredSections.length} of {sections.length} Modules
          </span>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 font-mono text-xs">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl font-bold whitespace-nowrap transition cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-blue-600/40 to-violet-600/40 text-white border border-blue-400/50 shadow-neon-blue'
                  : 'bg-black/40 text-slate-400 hover:text-white border border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* End-to-End Pipeline Workflow Visual Guide */}
      <div className="glass-card p-6 rounded-2xl border border-cyan-500/30 shadow-neon-blue space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <h3 className="text-sm font-bold text-white font-mono flex items-center gap-2">
            <Workflow className="h-4 w-4 text-cyan-400" />
            <span>End-to-End Requirements Engineering Lifecycle Flow</span>
          </h3>
          <span className="text-[10px] text-cyan-300 font-mono font-bold">AUTOMATED PIPELINE</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 font-mono text-xs text-center">
          {[
            { step: '01', title: 'Ingest & Classify', desc: 'PDF / DOCX upload & atomic extraction', color: 'border-blue-500/40 text-blue-300' },
            { step: '02', title: 'IEEE Quality Audit', desc: 'Ambiguity detection & formal rewrites', color: 'border-violet-500/40 text-violet-300' },
            { step: '03', title: 'Risk & Testing', desc: '2D matrix, 5-level test cases & early warning', color: 'border-red-500/40 text-red-300' },
            { step: '04', title: 'Architecture & DFD', desc: 'DFD streamer, DAG graph & blast radius', color: 'border-cyan-500/40 text-cyan-300' },
            { step: '05', title: 'LLM Evaluation Lab', desc: '13-task RE benchmarking & radar charts', color: 'border-cyan-400/50 text-cyan-200' },
            { step: '06', title: 'Agile & SRS Export', desc: 'Stories, RTM, PDF/DOCX/Markdown', color: 'border-emerald-500/40 text-emerald-300' },
          ].map((st, i) => (
            <div key={i} className={`p-3.5 rounded-xl bg-black/50 border ${st.color} space-y-1`}>
              <span className="text-[10px] font-black opacity-60 block">{st.step}</span>
              <p className="font-bold text-white">{st.title}</p>
              <p className="text-[10.5px] text-slate-400 font-light leading-relaxed">{st.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Module Catalog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredSections.map(sec => {
          const Icon = sec.icon;
          return (
            <div
              key={sec.id}
              className={`glass-card p-6 rounded-2xl border ${sec.border} ${sec.glow} space-y-4 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1`}
            >
              <div className="space-y-3">
                {/* Card Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center space-x-3">
                    <div className={`h-10 w-10 rounded-xl bg-black/60 border border-white/15 flex items-center justify-center ${sec.color} shadow-md`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                        {sec.category}
                      </span>
                      <h3 className="text-base font-bold text-white font-mono leading-tight">
                        {sec.title}
                      </h3>
                    </div>
                  </div>

                  <span className={`text-[9px] px-2 py-0.5 rounded font-mono font-bold uppercase ${sec.color} bg-white/5 border border-white/10 whitespace-nowrap`}>
                    {sec.tag}
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed font-light">
                  {sec.description}
                </p>

                {/* Purpose & Details */}
                <div className="space-y-2 pt-2 border-t border-white/10 font-mono text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Engineering Purpose:</span>
                    <p className="text-[11px] text-slate-200">{sec.purpose}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-400 pt-1">
                    <div><strong>Inputs:</strong> <span className="text-slate-300">{sec.inputs}</span></div>
                    <div><strong>Outputs:</strong> <span className="text-slate-300">{sec.outputs}</span></div>
                  </div>
                  <div className="pt-1 text-[10px] text-cyan-300 font-bold">
                    Standard: {sec.standard}
                  </div>
                </div>
              </div>

              {/* Direct Launch Button */}
              <button
                onClick={() => setActiveTab(sec.tabTarget)}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600/30 to-violet-600/30 hover:from-blue-600/50 hover:to-violet-600/50 border border-blue-400/40 text-white font-mono font-bold text-xs shadow-sm hover:shadow-neon-blue transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Launch {sec.title}</span>
                <ArrowRight className="h-3.5 w-3.5 text-cyan-300" />
              </button>
            </div>
          );
        })}
      </div>

      {/* Pro Tips & Keyboard Shortcuts Footer */}
      <div className="glass-card p-6 rounded-2xl border border-white/10 grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
        <div className="space-y-2">
          <h4 className="text-sm font-bold text-cyan-300 flex items-center gap-2">
            <Lightbulb className="h-4 w-4 text-cyan-400" />
            <span>Power User Tips &amp; Pro Workflows</span>
          </h4>
          <ul className="space-y-1.5 text-slate-300 list-disc list-inside text-[11.5px] leading-relaxed font-sans">
            <li>Press <strong>Ctrl + K</strong> anywhere to trigger Global Search across all requirements and artifacts.</li>
            <li>Use the <strong>LLM Evaluation Lab</strong> to compare model extraction accuracy before large-scale SRS generation.</li>
            <li>In the <strong>Quality Lab</strong>, click "Accept Rewrite" to immediately promote draft statements to approved IEEE standard.</li>
            <li>Export full requirements documents with one click to <strong>PDF, Word (.docx), Markdown, or CSV</strong>.</li>
          </ul>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-bold text-violet-300 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-violet-400" />
            <span>Academic IEEE Standards Compliance</span>
          </h4>
          <p className="text-[11.5px] text-slate-300 leading-relaxed font-sans">
            RequireX conforms strictly to <strong>IEEE Std 830-1998</strong> (Recommended Practice for Software Requirements Specifications), <strong>ISO/IEC/IEEE 29148:2018</strong> (Systems and software engineering — Life cycle processes — Requirements engineering), and <strong>IEEE Std 829-2008</strong> (Software and System Test Documentation).
          </p>
        </div>
      </div>
    </div>
  );
};
