import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Project, 
  Requirement, 
  UserStory, 
  UseCase, 
  TestCase, 
  RiskItem, 
  RecommendedRequirement,
  UserSession,
  VersionSnapshot,
  RequirementCategory,
  PriorityLevel,
  QualityIssue,
  RequirementLifecycleStatus,
  ReviewDecision
} from '../types';
import { AIEngine } from '../services/aiEngine';

type ActiveTab = 
  | 'dashboard'
  | 'upload'
  | 'quality'
  | 'recommendations'
  | 'compliance'
  | 'architecture'
  | 'impact'
  | 'what-if'
  | 'conflict'
  | 'dependency-graph'
  | 'stakeholders'
  | 'quality-heatmap'
  | 'multi-review'
  | 'user-stories'
  | 'use-cases'
  | 'test-cases'
  | 'risks'
  | 'rtm'
  | 'srs'
  | 'analytics'
  | 'risk-heatmap'
  | 'traceability-graph'
  | 'quality-over-time'
  | 'coverage-dashboard'
  | 'roadmap'
  | 'release-planner'
  | 'similarity-map'
  | 'architecture-impact'
  | 'testing-matrix'
  | 'risk-early-warning'
  | 'refinement-lab'
  | 'bad-req-detector'
  | 'llm-eval-lab'
  | 'ai-model-studio'
  | '3d-simulations'
  | 'system-diagrams'
  | 'user-manual';

interface ProjectContextType {
  projects: Project[];
  currentProject: Project | null;
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  userSession: UserSession;
  setUserSession: React.Dispatch<React.SetStateAction<UserSession>>;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  isCreateProjectOpen: boolean;
  setIsCreateProjectOpen: (open: boolean) => void;
  isAIChatOpen: boolean;
  setIsAIChatOpen: (open: boolean) => void;
  isGlobalSearchOpen: boolean;
  setIsGlobalSearchOpen: (open: boolean) => void;
  isHistoryOpen: boolean;
  setIsHistoryOpen: (open: boolean) => void;
  isAISettingsOpen: boolean;
  setIsAISettingsOpen: (open: boolean) => void;
  
  // Actions
  selectProject: (projectId: string) => void;
  createNewProject: (name: string, domain: string, description: string) => void;
  addRequirementsToProject: (reqs: Requirement[]) => void;
  updateRequirement: (updated: Requirement) => void;
  deleteRequirement: (id: string) => void;
  acceptImprovedRequirement: (id: string) => void;
  editAndApproveRequirement: (id: string, newText: string) => void;
  rejectRequirementRewrite: (id: string, reason?: string) => void;
  applyRequirementRewrite: (id: string, newText: string, decision?: 'Pending' | 'Approved' | 'Rejected' | 'Modified') => void;
  addRecommendedRequirements: (recs: RecommendedRequirement[]) => void;
  regenerateArtifacts: () => void;
  createVersionSnapshot: (description: string) => void;
  restoreVersionSnapshot: (snapshotId: string) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

const createSampleProject = (
  id: string, 
  name: string, 
  domain: string, 
  description: string, 
  reqTexts: Array<{ 
    title: string; 
    desc: string; 
    rawText?: string;
    improvedText?: string;
    category: RequirementCategory; 
    priority: PriorityLevel; 
    issue?: QualityIssue 
  }>
): Project => {
  const reqs: Requirement[] = reqTexts.map((r, i) => {
    const raw = r.rawText || r.desc;
    const hasIssue = Boolean(r.issue);
    const activeText = hasIssue ? raw : (r.improvedText || r.desc);
    return {
      id: `REQ-${String(i + 1).padStart(2, '0')}`,
      title: r.title,
      rawSource: raw,
      originalRawText: raw,
      description: activeText,
      currentText: activeText,
      suggestedText: r.improvedText || r.desc,
      improvedText: r.improvedText || r.desc,
      approvedText: hasIssue ? undefined : (r.improvedText || r.desc),
      category: r.category,
      priority: r.priority,
      status: hasIssue ? 'NEEDS_REVIEW' : 'USER_APPROVED',
      reviewDecision: hasIssue ? 'Pending' : 'Approved',
      isSRSReady: !hasIssue,
      issues: r.issue ? [r.issue] : [],
      isImprovedAccepted: !hasIssue,
      domain,
      version: 1,
      createdAt: '2026-08-01'
    };
  });

  const proj: Project = {
    id,
    name,
    domain,
    description,
    createdAt: '2026-08-01',
    updatedAt: '2026-08-26',
    requirements: reqs,
    recommendedRequirements: AIEngine.getDomainRecommendations(domain),
    userStories: AIEngine.generateUserStories(reqs),
    useCases: AIEngine.generateUseCases(reqs),
    testCases: AIEngine.generateTestCases(reqs),
    risks: AIEngine.generateRisks(reqs),
    history: []
  };

  return proj;
};

const SAMPLE_RAILWAY_PROJECT = createSampleProject(
  'proj-railway-01',
  'NextGen Railway Reservation System',
  'Railway Reservation',
  'An AI-enhanced enterprise high-concurrency ticket booking, seat matrix, live PNR tracking, and cancellation refund platform.',
  [
    { 
      title: 'Fast ticket booking during peak Tatkal hours', 
      desc: 'The website should be very fast and user-friendly during peak Tatkal booking hours.',
      rawText: 'The website should be very fast and user-friendly during peak Tatkal booking hours.',
      improvedText: 'The system shall process ticket reservation requests within 1.2 seconds under a peak load of 50,000 concurrent active users.', 
      category: 'Non-functional', 
      priority: 'Critical', 
      issue: { 
        id: 'ISS-01', 
        type: 'Ambiguous word', 
        problem: 'Contains subjective phrases "website should be very fast" and "user-friendly".', 
        reason: 'Subjective terms cannot be quantitatively validated during performance and acceptance testing (IEEE 830 Clause 4.3.2).', 
        suggestedCorrection: 'Specify measurable millisecond latency target (<1.2s) under peak concurrent user load (50,000 users).', 
        confidenceScore: 96, 
        severity: 'Critical' 
      } 
    },
    { title: 'Real-time PNR Tracking & Station Alerts', desc: 'The system shall allow passengers to query real-time PNR status and receive SMS location alerts 30 minutes before arrival.', category: 'Functional', priority: 'High' },
    { title: 'Automated Seat Allocation Algorithm', desc: 'The system shall allocate train berth preferences automatically based on passenger age and vacancy matrix.', category: 'System', priority: 'Medium' },
    { 
      title: 'Payment Gateway Failover & Webhook Sync', 
      desc: 'Ticket cancellation refund should be processed quickly without delay.',
      rawText: 'Ticket cancellation refund should be processed quickly without delay.',
      improvedText: 'The payment gateway interface shall initiate ticket cancellation refunds to the originating bank account within 24 hours of confirmation.',
      category: 'Technical', 
      priority: 'High',
      issue: {
        id: 'ISS-02',
        type: 'Missing actor',
        problem: 'Missing actor/subsystem responsible for refund processing and contains vague timeframe "quickly without delay".',
        reason: 'Untraceable operational responsibility and non-verifiable SLA (ISO/IEC/IEEE 29148).',
        suggestedCorrection: 'Explicitly identify the payment gateway subsystem and define strict 24-hour refund completion SLA.',
        confidenceScore: 92,
        severity: 'High'
      }
    },
    { title: 'Dynamic Train Delay & Route Rerouting Engine', desc: 'The system shall calculate predicted arrival delays based on live GPS feeds and broadcast estimated delay updates to station kiosks.', category: 'User', priority: 'Medium' },
    { title: 'Biometric Station Gate & E-Ticket Scanner', desc: 'The system shall validate QR-coded e-tickets at station entry turnstiles within 300 milliseconds.', category: 'Business', priority: 'High' }
  ]
);

const SAMPLE_QUIZ_PROJECT = createSampleProject(
  'proj-quiz-06',
  'EduTest Online Quiz & Exam Proctoring Platform',
  'Online Quiz Platform',
  'High-concurrency proctored examination suite with dynamic question shuffling, offline answer sync, and AI tab-switch cheating prevention.',
  [
    { title: 'Automated Quiz Evaluation & Percentile Rank', desc: 'The system shall evaluate candidate quiz submissions automatically upon timer expiration and compute percentile rank.', category: 'Functional', priority: 'Critical' },
    { 
      title: 'Anti-Cheating Proctoring & Tab-Switch Detection', 
      desc: 'Cheating must be prevented effectively and reliably during online exams.', 
      rawText: 'Cheating must be prevented effectively and reliably during online exams.',
      improvedText: 'The proctoring engine shall monitor candidate browser focus, detect tab-switching events, and auto-submit the exam after 3 unauthorized warnings.',
      category: 'Non-functional', 
      priority: 'High', 
      issue: { 
        id: 'ISS-03', 
        type: 'Ambiguous word', 
        problem: 'Contains non-verifiable adverbs "effectively and reliably".', 
        reason: 'Proctoring effectiveness must be strictly quantified with event thresholds (IEEE 830).', 
        suggestedCorrection: 'Enforce strict 3 tab-switch threshold with automated exam lock and submission.', 
        confidenceScore: 94, 
        severity: 'High' 
      } 
    },
    { title: 'Offline Answer Sync Buffer via IndexedDB', desc: 'The system shall buffer exam answers locally in IndexedDB and sync to cloud server with zero data loss on network drops.', category: 'Technical', priority: 'Critical' },
    { 
      title: 'Randomized Question Bank Shuffling', 
      desc: 'Question bank should shuffle questions well for all students.', 
      rawText: 'Question bank should shuffle questions well for all students.',
      improvedText: 'The system shall draw questions dynamically from a tagged repository and apply Fisher-Yates randomization to answer option sequences per candidate.',
      category: 'System', 
      priority: 'Medium',
      issue: {
        id: 'ISS-04',
        type: 'Non-testable requirement',
        problem: 'Contains subjective clause "shuffle questions well".',
        reason: 'Test engineers cannot write an automated test verification script for "well" without a defined algorithm.',
        suggestedCorrection: 'Specify algorithm (e.g. Fisher-Yates randomization) and item option sequence randomization.',
        confidenceScore: 91,
        severity: 'Medium'
      }
    }
  ]
);

const SAMPLE_ECOMMERCE_PROJECT = createSampleProject(
  'proj-ecom-02',
  'Global Commerce Cloud & Marketplace Platform',
  'E-Commerce',
  'Multi-vendor e-commerce platform supporting real-time inventory management, dynamic pricing, localized currency checkout, and flash sales.',
  [
    { 
      title: 'Faceted Product Search & Instant Auto-Complete', 
      desc: 'Product search should return good and relevant results immediately for shoppers.', 
      rawText: 'Product search should return good and relevant results immediately for shoppers.',
      improvedText: 'The search service shall return indexed catalog results within 200ms for fuzzy queries against up to 1,000,000 active SKU items.',
      category: 'Functional', 
      priority: 'High',
      issue: {
        id: 'ISS-05',
        type: 'Ambiguous word',
        problem: 'Contains subjective terms "good and relevant results immediately".',
        reason: 'Relevance and immediate response must be defined with quantifiable latency and search index metrics.',
        suggestedCorrection: 'Define explicit response time (<200ms) and catalog SKU capacity (1,000,000 SKUs).',
        confidenceScore: 95,
        severity: 'High'
      }
    },
    { title: 'Shopping Cart Persistence & Cart Recovery', desc: 'The system shall persist abandoned cart items across devices for 30 days and trigger automated discount emails after 24 hours.', category: 'User', priority: 'Medium' },
    { 
      title: 'PCI-DSS Compliant Multi-Currency Checkout', 
      desc: 'Checkout payments must be secure and robust against fraud.', 
      rawText: 'Checkout payments must be secure and robust against fraud.',
      improvedText: 'The payment gateway service shall process multi-currency credit card transactions adhering strictly to PCI-DSS Level 1 specifications and mandatory 3D-Secure 2.0 authentication.',
      category: 'Technical', 
      priority: 'Critical', 
      issue: { 
        id: 'ISS-06', 
        type: 'Weak requirement', 
        problem: 'Lacks explicitly stated compliance standard and authentication protocols.', 
        reason: 'Payment processors will fail PCI-DSS audit without mandatory 3DS2 and tokenization definitions.', 
        suggestedCorrection: 'Mandate PCI-DSS Level 1 tokenization and 3D-Secure 2.0 biometric challenge verification.', 
        confidenceScore: 93, 
        severity: 'Critical' 
      } 
    },
    { title: 'Real-Time Inventory Lock during Flash Sales', desc: 'The system shall hold stock items in cart reserve for 10 minutes to prevent double-selling during high-demand product drops.', category: 'System', priority: 'High' }
  ]
);

const SAMPLE_HOSPITAL_PROJECT = createSampleProject(
  'proj-hosp-03',
  'SmartCare Enterprise EHR & Hospital Management',
  'Hospital Management',
  'Centralized healthcare information platform managing electronic health records (EHR), outpatient token queues, ICU bed matrix, and pharmacy billing.',
  [
    { title: 'Patient Electronic Health Record (EHR) Sync', desc: 'The system shall maintain encrypted patient medical records, diagnostic lab reports, and prescription histories in compliance with HIPAA guidelines.', category: 'Functional', priority: 'Critical' },
    { 
      title: 'Real-Time Doctor Appointment Queue Management', 
      desc: 'Doctor appointments should be managed efficiently and waiting tokens notified to patients.', 
      rawText: 'Doctor appointments should be managed efficiently and waiting tokens notified to patients.',
      improvedText: 'The appointment scheduling module shall display real-time waiting room token numbers on digital signage and dispatch SMS notifications 15 minutes prior to estimated consultation.',
      category: 'System', 
      priority: 'High',
      issue: {
        id: 'ISS-07',
        type: 'Missing actor',
        problem: 'Contains vague adverb "managed efficiently" and lacks responsible notification dispatch subsystem.',
        reason: 'Queue handling and notification latency are undefined for clinical SLAs.',
        suggestedCorrection: 'Specify digital signage displays and SMS notification lead times (15 mins prior).',
        confidenceScore: 90,
        severity: 'High'
      }
    },
    { title: 'AES-256 Data Encryption at Rest & in Transit', desc: 'The system shall encrypt all patient protected health information (PHI) at rest using AES-256 and mandate TLS 1.3 for network transmissions.', category: 'Non-functional', priority: 'Critical' },
    { 
      title: 'Pharmacy Inventory & Reorder Threshold Notification', 
      desc: 'Pharmacy inventory should be refilled as needed when drugs run low.', 
      rawText: 'Pharmacy inventory should be refilled as needed when drugs run low.',
      improvedText: 'The pharmacy inventory subsystem shall monitor stock levels in real time and automatically dispatch purchase orders when critical medications fall below safety thresholds (< 50 units).',
      category: 'Technical', 
      priority: 'Medium',
      issue: {
        id: 'ISS-08',
        type: 'Non-testable requirement',
        problem: 'Contains undefined condition "as needed when drugs run low".',
        reason: 'Automated purchasing rules require exact minimum numerical inventory thresholds.',
        suggestedCorrection: 'Define explicit reorder threshold (<50 units) and automated purchase order dispatch.',
        confidenceScore: 92,
        severity: 'Medium'
      }
    }
  ]
);

const SAMPLE_BANKING_PROJECT = createSampleProject(
  'proj-bank-04',
  'FinCore Neobank & Real-Time Settlement Engine',
  'Banking',
  'High-security digital banking core handling IMPS/NEFT fund transfers, biometric KYC verification, and automated AI fraud detection.',
  [
    { 
      title: 'Instant Interbank Fund Transfer & Settlement', 
      desc: 'Money transfer between accounts should happen quickly and smoothly.', 
      rawText: 'Money transfer between accounts should happen quickly and smoothly.',
      improvedText: 'The payment engine shall execute IMPS interbank fund transfers within 3.0 seconds with dual-authorization limits for transactions exceeding $10,000.',
      category: 'Functional', 
      priority: 'Critical',
      issue: {
        id: 'ISS-09',
        type: 'Ambiguous word',
        problem: 'Contains subjective words "quickly and smoothly".',
        reason: 'Financial settlement requires strict latency targets (<3s) and authorization boundaries (IEEE 830).',
        suggestedCorrection: 'Specify 3.0-second settlement latency and dual-authorization threshold ($10,000).',
        confidenceScore: 96,
        severity: 'Critical'
      }
    },
    { title: 'Automated AI Fraud Detection & Account Freeze', desc: 'The system shall evaluate real-time transaction risk scores using machine learning and flag suspicious withdrawals over historical threshold.', category: 'Technical', priority: 'High' },
    { 
      title: 'Biometric Video KYC Onboarding & OCR Validation', 
      desc: 'Customer onboarding verification should be simple and user-friendly.', 
      rawText: 'Customer onboarding verification should be simple and user-friendly.',
      improvedText: 'The KYC onboarding service shall extract customer data from passport and ID cards using OCR and perform facial liveness verification in < 30 seconds.',
      category: 'User', 
      priority: 'High',
      issue: {
        id: 'ISS-10',
        type: 'Weak requirement',
        problem: 'Lacks technical specification of document types and verification duration.',
        reason: 'Compliance with anti-money laundering (AML) requires defined biometric and OCR verification parameters.',
        suggestedCorrection: 'Specify OCR passport extraction and <30-second facial liveness verification target.',
        confidenceScore: 93,
        severity: 'High'
      }
    }
  ]
);

const SAMPLE_DISASTER_PROJECT = createSampleProject(
  'proj-disaster-05',
  'ResQ-Link Emergency Relief & Disaster Response System',
  'Disaster Management',
  'Mission-critical emergency response framework coordinating rescue team dispatch, shelter capacity, medical supply logistics, and SOS alerts.',
  [
    { 
      title: 'SOS Geo-Location Beacon & Emergency Alert Dispatch', 
      desc: 'SOS evacuation alerts should be sent to nearby citizens as soon as possible during disasters.', 
      rawText: 'SOS evacuation alerts should be sent to nearby citizens as soon as possible during disasters.',
      improvedText: 'The emergency dispatch system shall broadcast cell-broadcast evacuation alerts to all mobile devices within a 50km radius of detected epicenters within 5 seconds.',
      category: 'Functional', 
      priority: 'Critical',
      issue: {
        id: 'ISS-11',
        type: 'Ambiguous word',
        problem: 'Contains ambiguous scope "nearby citizens" and non-quantifiable timing "as soon as possible".',
        reason: 'Emergency dispatch requires exact geographic radius (50km) and broadcast time limit (<5s).',
        suggestedCorrection: 'Define explicit 50km epicenter radius and 5-second alert dispatch deadline.',
        confidenceScore: 97,
        severity: 'Critical'
      }
    },
    { title: 'Real-Time Rescue Team & Resource Allocation Matrix', desc: 'The system shall track relief supply inventories, medical stocks, and rescue personnel positions on an offline-first GIS map.', category: 'System', priority: 'High' },
    { 
      title: 'Satellite & Mesh Radio Emergency Fallback Stream', 
      desc: 'Emergency network connectivity should be maintained during power outages.', 
      rawText: 'Emergency network connectivity should be maintained during power outages.',
      improvedText: 'The telemetry subsystem shall automatically switch to satellite telemetry and LoRa mesh radio feeds within 2 seconds when primary cellular networks fail.',
      category: 'Technical', 
      priority: 'Critical',
      issue: {
        id: 'ISS-12',
        type: 'Missing actor',
        problem: 'Lacks responsible subsystem and protocol definitions for failover connectivity.',
        reason: 'Hardware and protocol failover require explicit network definitions (satellite/LoRa mesh).',
        suggestedCorrection: 'Specify automatic 2-second switch to satellite and LoRa mesh radio protocols.',
        confidenceScore: 91,
        severity: 'High'
      }
    }
  ]
);

const INITIAL_SAMPLE_PROJECTS = [
  SAMPLE_RAILWAY_PROJECT,
  SAMPLE_QUIZ_PROJECT,
  SAMPLE_ECOMMERCE_PROJECT,
  SAMPLE_HOSPITAL_PROJECT,
  SAMPLE_BANKING_PROJECT,
  SAMPLE_DISASTER_PROJECT
];

const isCleanRequirement = (r: Requirement): boolean => {
  if (!r || !r.description || r.description.length < 5) return false;
  if (
    r.description.includes('[Content_Types].xml') || 
    r.description.includes('word/document') || 
    r.description.includes('PK\x03\x04') || 
    r.description.includes('\uFFFD')
  ) {
    return false;
  }
  const validChars = (r.description.match(/[a-zA-Z0-9\s.,;:'"?!()\-_/]/g) || []).length;
  return (validChars / r.description.length) >= 0.65;
};

/**
 * Migration & Data Integrity Sanitizer for LocalStorage Projects
 * - Removes old fabricated text (1.5 seconds under nominal production load)
 * - Assigns persistent, strictly unique IDs (no duplicate REQ-01)
 * - Preserves raw user source
 * - Resets false approvals to NEEDS_REVIEW unless explicit approval provenance exists
 */
const migrateAndSanitizeProject = (p: Project): Project => {
  const seenIds = new Set<string>();
  let maxIdNum = 0;

  // First pass: scan for maximum numerical suffix
  for (const r of p.requirements || []) {
    const match = r.id?.match(/^REQ-(\d+)$/i);
    if (match) {
      const num = parseInt(match[1], 10);
      if (num > maxIdNum) maxIdNum = num;
    }
  }

  const cleanReqs = (p.requirements || []).filter(isCleanRequirement).map((r, idx) => {
    // 1. Remove fabricated context from description / rawSource
    let rawText = r.rawSource || r.originalRawText || r.description || '';
    if (
      rawText.includes('The school event planner processing service shall') ||
      rawText.includes('nominal production load') ||
      rawText.includes('1.5 seconds under')
    ) {
      rawText = rawText
        .replace(/The school event planner processing service shall\s*/gi, '')
        .replace(/,\s*with operations completing within 1\.5 seconds under nominal production load\.?/gi, '')
        .trim();
      if (!rawText.endsWith('.')) rawText += '.';
    }

    // 2. Ensure unique persistent ID
    let finalId = r.id;
    if (!finalId || seenIds.has(finalId)) {
      maxIdNum++;
      finalId = `REQ-${String(maxIdNum).padStart(2, '0')}`;
    } else {
      seenIds.add(finalId);
    }

    // 3. Re-run analysis for fresh issues & safe proposal
    const analysis = AIEngine.analyze20Problems(rawText, [], p.domain, idx);

    // 4. Determine legitimate approval state:
    // Only requirements with valid approvedText and explicit approval decision are approved
    const isExplicitlyApproved = 
      (r.status === 'USER_APPROVED' || r.reviewDecision === 'Approved' || r.reviewDecision === 'Modified') &&
      Boolean(r.approvedText) &&
      analysis.issues.filter(i => i.severity === 'Critical').length === 0;

    const status: RequirementLifecycleStatus = isExplicitlyApproved
      ? 'USER_APPROVED'
      : (analysis.issues.length > 0 ? 'NEEDS_REVIEW' : 'RAW');

    const reviewDecision: ReviewDecision = isExplicitlyApproved
      ? (r.reviewDecision || 'Approved')
      : 'Pending';

    const isSRSReady = isExplicitlyApproved;
    const currentText = isExplicitlyApproved ? (r.approvedText || r.description) : rawText;

    return {
      ...r,
      id: finalId,
      rawSource: rawText,
      originalRawText: rawText,
      description: currentText,
      currentText: currentText,
      suggestedText: analysis.safeRewrite,
      improvedText: analysis.safeRewrite,
      approvedText: isExplicitlyApproved ? (r.approvedText || r.description) : undefined,
      optionalRefinement: analysis.optionalRefinement,
      category: analysis.category,
      tags: analysis.tags,
      priority: analysis.priority,
      status,
      reviewDecision,
      isSRSReady,
      issues: isExplicitlyApproved ? [] : analysis.issues,
      domain: r.domain || p.domain,
      version: r.version || 1,
      createdAt: r.createdAt || new Date().toISOString().split('T')[0]
    };
  });

  return {
    ...p,
    requirements: cleanReqs,
    userStories: p.userStories?.length > 0 ? p.userStories : AIEngine.generateUserStories(cleanReqs),
    useCases: p.useCases?.length > 0 ? p.useCases : AIEngine.generateUseCases(cleanReqs),
    testCases: p.testCases?.length > 0 ? p.testCases : AIEngine.generateTestCases(cleanReqs),
    risks: p.risks?.length > 0 ? p.risks : AIEngine.generateRisks(cleanReqs),
    recommendedRequirements: AIEngine.getDomainRecommendations(p.domain, cleanReqs)
  };
};

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('requirex_projects_v5');
    if (saved) {
      try {
        const parsed: Project[] = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map(migrateAndSanitizeProject);
        }
      } catch (e) { console.error(e); }
    }
    // Clean initial sample projects
    localStorage.setItem('requirex_projects_v5', JSON.stringify(INITIAL_SAMPLE_PROJECTS));
    return INITIAL_SAMPLE_PROJECTS;
  });

  const [currentProjectId, setCurrentProjectId] = useState<string>(() => projects[0]?.id || 'proj-railway-01');
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  
  const [userSession, setUserSession] = useState<UserSession>(() => {
    const savedUser = localStorage.getItem('requirex_user');
    if (savedUser) {
      try { return JSON.parse(savedUser); } catch (e) { console.error(e); }
    }
    return {
      username: 'Engineering Lead',
      email: 'lead@enterprise.io',
      role: 'Senior Business Analyst',
      isLoggedIn: true
    };
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isCreateProjectOpen, setIsCreateProjectOpen] = useState<boolean>(false);
  const [isAIChatOpen, setIsAIChatOpen] = useState<boolean>(false);
  const [isGlobalSearchOpen, setIsGlobalSearchOpen] = useState<boolean>(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(false);
  const [isAISettingsOpen, setIsAISettingsOpen] = useState<boolean>(false);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('requirex_projects_v5', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('requirex_user', JSON.stringify(userSession));
  }, [userSession]);

  const currentProject = projects.find(p => p.id === currentProjectId) || projects[0] || null;

  const selectProject = (id: string) => {
    setCurrentProjectId(id);
  };

  const createNewProject = (name: string, domain: string, description: string) => {
    const recommendations = AIEngine.getDomainRecommendations(domain, []);
    const newProj: Project = {
      id: `proj-${Math.random().toString(36).substring(2, 9)}`,
      name,
      domain,
      description,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      requirements: [],
      recommendedRequirements: recommendations,
      userStories: [],
      useCases: [],
      testCases: [],
      risks: [],
      history: []
    };

    setProjects(prev => [newProj, ...prev]);
    setCurrentProjectId(newProj.id);
    setActiveTab('upload');
    setIsCreateProjectOpen(false);
  };

  const updateProjectState = (updater: (proj: Project) => Project) => {
    setProjects(prev => prev.map(p => {
      if (p.id === currentProjectId) {
        const updated = updater(p);
        updated.updatedAt = new Date().toISOString().split('T')[0];
        return updated;
      }
      return p;
    }));
  };

  const addRequirementsToProject = (newReqs: Requirement[]) => {
    updateProjectState(proj => {
      // Collect existing IDs and find max numeric suffix
      const existingIds = new Set<string>();
      let maxIdNum = 0;
      for (const r of proj.requirements) {
        if (r.id) {
          existingIds.add(r.id);
          const match = r.id.match(/^REQ-(\d+)$/i);
          if (match) {
            const num = parseInt(match[1], 10);
            if (num > maxIdNum) maxIdNum = num;
          }
        }
      }

      // Assign strictly unique, non-colliding persistent IDs for all incoming requirements
      const normalizedNewReqs = newReqs.map(r => {
        let finalId = r.id;
        if (!finalId || existingIds.has(finalId)) {
          maxIdNum++;
          finalId = `REQ-${String(maxIdNum).padStart(2, '0')}`;
        } else {
          const match = finalId.match(/^REQ-(\d+)$/i);
          if (match) {
            const num = parseInt(match[1], 10);
            if (num > maxIdNum) maxIdNum = num;
          }
        }
        existingIds.add(finalId);

        const raw = r.rawSource || r.originalRawText || r.description;
        return {
          ...r,
          id: finalId,
          rawSource: raw,
          originalRawText: raw,
          description: r.description || raw,
          currentText: r.currentText || r.description || raw,
          suggestedText: r.suggestedText || r.improvedText || '',
          improvedText: r.suggestedText || r.improvedText || '',
          status: r.status || (r.issues && r.issues.length > 0 ? 'NEEDS_REVIEW' : 'RAW'),
          reviewDecision: r.reviewDecision || 'Pending',
          isSRSReady: r.isSRSReady || false
        };
      });

      const combined = [...proj.requirements, ...normalizedNewReqs];
      return {
        ...proj,
        requirements: combined,
        userStories: AIEngine.generateUserStories(combined),
        useCases: AIEngine.generateUseCases(combined),
        testCases: AIEngine.generateTestCases(combined),
        risks: AIEngine.generateRisks(combined),
        recommendedRequirements: AIEngine.getDomainRecommendations(proj.domain, combined)
      };
    });
  };

  const updateRequirement = (updated: Requirement) => {
    updateProjectState(proj => {
      const reqs = proj.requirements.map(r => {
        if (r.id === updated.id) {
          return {
            ...updated,
            rawSource: r.rawSource || updated.rawSource || updated.description
          };
        }
        return r;
      });
      return {
        ...proj,
        requirements: reqs,
        userStories: AIEngine.generateUserStories(reqs),
        useCases: AIEngine.generateUseCases(reqs),
        testCases: AIEngine.generateTestCases(reqs)
      };
    });
  };

  const deleteRequirement = (id: string) => {
    updateProjectState(proj => {
      const reqs = proj.requirements.filter(r => r.id !== id);
      return {
        ...proj,
        requirements: reqs,
        userStories: AIEngine.generateUserStories(reqs),
        useCases: AIEngine.generateUseCases(reqs),
        testCases: AIEngine.generateTestCases(reqs)
      };
    });
  };

  const applyRequirementRewrite = (id: string, newText: string, decision: ReviewDecision = 'Approved') => {
    updateProjectState(proj => {
      const reqs: Requirement[] = proj.requirements.map(r => {
        if (r.id === id) {
          const freshAudit = AIEngine.analyze20Problems(newText, [], proj.domain);
          const hasCriticalDefects = freshAudit.issues.some(i => i.severity === 'Critical');
          const isApproved = decision === 'Approved' || decision === 'Modified';

          const updatedReq: Requirement = {
            ...r,
            rawSource: r.rawSource || r.originalRawText || r.description,
            originalRawText: r.rawSource || r.originalRawText || r.description,
            description: newText,
            currentText: newText,
            improvedText: newText,
            approvedText: isApproved && !hasCriticalDefects ? newText : undefined,
            issues: freshAudit.issues,
            status: (isApproved && !hasCriticalDefects ? 'USER_APPROVED' : 'NEEDS_REVIEW') as RequirementLifecycleStatus,
            reviewDecision: (isApproved && !hasCriticalDefects ? decision : 'Pending') as ReviewDecision,
            isImprovedAccepted: isApproved && !hasCriticalDefects,
            isSRSReady: isApproved && !hasCriticalDefects,
            reviewedAt: new Date().toISOString()
          };
          return updatedReq;
        }
        return r;
      });

      return {
        ...proj,
        requirements: reqs,
        userStories: AIEngine.generateUserStories(reqs),
        useCases: AIEngine.generateUseCases(reqs),
        testCases: AIEngine.generateTestCases(reqs)
      };
    });
  };

  const acceptImprovedRequirement = (id: string) => {
    updateProjectState(proj => {
      const reqs = proj.requirements.map(r => {
        if (r.id === id) {
          const proposal = (r.suggestedText || r.improvedText || '').trim();
          if (!proposal) return r;

          // Re-run quality audit against the accepted proposal
          const freshAudit = AIEngine.analyze20Problems(proposal, [], proj.domain);
          const hasCriticalDefects = freshAudit.issues.some(i => i.severity === 'Critical');

          if (hasCriticalDefects) {
            return {
              ...r,
              description: proposal,
              currentText: proposal,
              issues: freshAudit.issues,
              status: 'NEEDS_REVIEW' as const,
              reviewDecision: 'Pending' as const,
              isSRSReady: false,
              reviewedAt: new Date().toISOString()
            };
          }

          return {
            ...r,
            approvedText: proposal,
            description: proposal,
            currentText: proposal,
            issues: freshAudit.issues,
            status: 'USER_APPROVED' as const,
            reviewDecision: 'Approved' as const,
            isSRSReady: true,
            isImprovedAccepted: true,
            reviewedAt: new Date().toISOString()
          };
        }
        return r;
      });

      return {
        ...proj,
        requirements: reqs,
        userStories: AIEngine.generateUserStories(reqs),
        useCases: AIEngine.generateUseCases(reqs),
        testCases: AIEngine.generateTestCases(reqs)
      };
    });
  };

  const editAndApproveRequirement = (id: string, newText: string) => {
    const cleaned = (newText || '').trim();
    if (!cleaned) return;

    updateProjectState(proj => {
      const reqs = proj.requirements.map(r => {
        if (r.id === id) {
          // Re-run quality audit against the user-edited text
          const freshAudit = AIEngine.analyze20Problems(cleaned, [], proj.domain);
          const hasIssues = freshAudit.issues.length > 0;

          if (hasIssues) {
            // User edited the requirement but defects remain (e.g. left "quickly")
            // System detects "quickly" again and keeps in NEEDS_REVIEW!
            return {
              ...r,
              description: cleaned,
              currentText: cleaned,
              suggestedText: freshAudit.safeRewrite,
              improvedText: freshAudit.safeRewrite,
              approvedText: undefined,
              issues: freshAudit.issues,
              status: 'USER_EDITED' as const,
              reviewDecision: 'Pending' as const,
              isSRSReady: false,
              reviewedAt: new Date().toISOString()
            };
          }

          // Edited text is clean and satisfies IEEE specifications
          return {
            ...r,
            approvedText: cleaned,
            description: cleaned,
            currentText: cleaned,
            issues: [],
            status: 'USER_APPROVED' as const,
            reviewDecision: 'Modified' as const,
            isSRSReady: true,
            isImprovedAccepted: true,
            reviewedAt: new Date().toISOString()
          };
        }
        return r;
      });

      return {
        ...proj,
        requirements: reqs,
        userStories: AIEngine.generateUserStories(reqs),
        useCases: AIEngine.generateUseCases(reqs),
        testCases: AIEngine.generateTestCases(reqs)
      };
    });
  };

  const rejectRequirementRewrite = (id: string, reason?: string) => {
    updateProjectState(proj => {
      const reqs = proj.requirements.map(r => {
        if (r.id === id) {
          const raw = r.rawSource || r.originalRawText || r.description;
          const freshAudit = AIEngine.analyze20Problems(raw, [], proj.domain);
          return {
            ...r,
            description: raw,
            currentText: raw,
            approvedText: undefined,
            issues: freshAudit.issues,
            status: 'REJECTED' as const,
            reviewDecision: 'Rejected' as const,
            rejectionReason: reason || 'User rejected proposed IEEE rewrite',
            isImprovedAccepted: false,
            isSRSReady: false,
            reviewedAt: new Date().toISOString()
          };
        }
        return r;
      });

      return {
        ...proj,
        requirements: reqs
      };
    });
  };

  const addRecommendedRequirements = (selectedRecs: RecommendedRequirement[]) => {
    const convertedReqs: Requirement[] = selectedRecs.map((rec, i) => ({
      id: `REQ-${String((currentProject?.requirements.length || 0) + i + 1).padStart(2, '0')}`,
      title: rec.title,
      description: rec.description,
      rawSource: rec.description,
      currentText: rec.description,
      category: rec.category,
      priority: 'High',
      status: 'NEEDS_REVIEW',
      reviewDecision: 'Pending',
      isSRSReady: false,
      issues: [],
      improvedText: rec.description,
      suggestedText: rec.description,
      isImprovedAccepted: false,
      domain: rec.domain,
      version: 1,
      createdAt: new Date().toISOString().split('T')[0]
    }));

    addRequirementsToProject(convertedReqs);
  };

  const regenerateArtifacts = () => {
    if (!currentProject) return;
    updateProjectState(proj => ({
      ...proj,
      userStories: AIEngine.generateUserStories(proj.requirements),
      useCases: AIEngine.generateUseCases(proj.requirements),
      testCases: AIEngine.generateTestCases(proj.requirements),
      risks: AIEngine.generateRisks(proj.requirements)
    }));
  };

  const createVersionSnapshot = (description: string) => {
    if (!currentProject) return;
    const nextVer = (currentProject.history.length || 0) + 1;
    const snapshot: VersionSnapshot = {
      id: `snap-${Date.now()}`,
      versionNumber: nextVer,
      timestamp: new Date().toLocaleString(),
      description,
      requirements: [...currentProject.requirements],
      userStories: [...currentProject.userStories],
      useCases: [...currentProject.useCases],
      testCases: [...currentProject.testCases],
      risks: [...currentProject.risks]
    };

    updateProjectState(proj => ({
      ...proj,
      history: [snapshot, ...proj.history]
    }));
  };

  const restoreVersionSnapshot = (snapshotId: string) => {
    if (!currentProject) return;
    const target = currentProject.history.find(h => h.id === snapshotId);
    if (!target) return;

    updateProjectState(proj => ({
      ...proj,
      requirements: [...target.requirements],
      userStories: [...target.userStories],
      useCases: [...target.useCases],
      testCases: [...target.testCases],
      risks: [...target.risks]
    }));
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        currentProject,
        activeTab,
        setActiveTab,
        userSession,
        setUserSession,
        isAuthModalOpen,
        setIsAuthModalOpen,
        isCreateProjectOpen,
        setIsCreateProjectOpen,
        isAIChatOpen,
        setIsAIChatOpen,
        isGlobalSearchOpen,
        setIsGlobalSearchOpen,
        isHistoryOpen,
        setIsHistoryOpen,
        isAISettingsOpen,
        setIsAISettingsOpen,
        selectProject,
        createNewProject,
        addRequirementsToProject,
        updateRequirement,
        deleteRequirement,
        acceptImprovedRequirement,
        editAndApproveRequirement,
        rejectRequirementRewrite,
        applyRequirementRewrite,
        addRecommendedRequirements,
        regenerateArtifacts,
        createVersionSnapshot,
        restoreVersionSnapshot
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
};
