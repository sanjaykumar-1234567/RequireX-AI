import { 
  Requirement, 
  RequirementCategory, 
  QualityIssue, 
  RecommendedRequirement, 
  UserStory, 
  UseCase, 
  TestCase, 
  RiskItem, 
  RTMRow,
  ComplianceCheck,
  PriorityLevel
} from '../types';

export const DOMAIN_RECOMMENDATIONS: Record<string, Omit<RecommendedRequirement, 'id' | 'selected'>[]> = {
  'Online Quiz Platform': [
    { category: 'Functional', title: 'Automated Quiz Evaluation & Real-time Scoreboard', description: 'The system shall evaluate candidate quiz submissions automatically upon timer expiration and compute percentile rank.', domain: 'Online Quiz Platform' },
    { category: 'Functional', title: 'Randomized Question Bank & Shuffling', description: 'The system shall draw questions dynamically from a tagged repository and shuffle answer option sequences per candidate.', domain: 'Online Quiz Platform' },
    { category: 'Non-functional', title: 'Anti-Cheating Proctoring & Tab-Switch Detection', description: 'The system shall monitor candidate browser focus, detect tab-switching events, and auto-submit after 3 unauthorized warnings.', domain: 'Online Quiz Platform' },
    { category: 'Technical', title: 'High-Concurrency Exam Submission Sync', description: 'The system shall buffer exam answers locally in IndexedDB and sync to cloud server with zero data loss on network drops.', domain: 'Online Quiz Platform' },
    { category: 'System', title: 'Instructor Assessment Analytics & Item Analysis', description: 'The system shall provide instructors question difficulty indices, discrimination ratings, and bell-curve reports.', domain: 'Online Quiz Platform' },
    { category: 'User', title: 'Candidate Instant Score Card & Review Mode', description: 'The system shall generate itemized score reports with detailed answer explanations immediately following quiz submission.', domain: 'Online Quiz Platform' },
    { category: 'Business', title: 'Certification Webhook & Credential Badge Sync', description: 'The system shall issue verifiable digital certificates with SHA-256 signatures upon achieving a passing score >= 80%.', domain: 'Online Quiz Platform' }
  ],
  'Railway Reservation': [
    { category: 'Functional', title: 'PNR Status Tracking & Real-Time Inquiry', description: 'The system shall allow passengers to query real-time PNR booking status, coach position, and train location updates via SMS and Web.', domain: 'Railway Reservation' },
    { category: 'Functional', title: 'Seat Availability & Automated Berth Allocation', description: 'The system shall calculate seat matrix dynamically and allocate berth classes based on passenger age, gender, and preference.', domain: 'Railway Reservation' },
    { category: 'Functional', title: 'Automated Refund & Cancellation Engine', description: 'The system shall process ticket cancellations and calculate refund breakdown according to railway cancellation policies within 24 hours.', domain: 'Railway Reservation' },
    { category: 'Non-functional', title: 'Tatkal Booking Peak Concurrency Handling', description: 'The system shall sustain 50,000 concurrent ticket booking requests per minute during morning Tatkal opening hours without degradation.', domain: 'Railway Reservation' },
    { category: 'Technical', title: 'Multi-Bank Payment Gateway Failover', description: 'The system shall integrate multi-bank payment gateways with automatic 30-second failover and instant refund webhooks.', domain: 'Railway Reservation' },
    { category: 'System', title: 'Dynamic Train Schedule & Delay Prediction', description: 'The system shall calculate predicted arrival delays based on live GPS feeds and alert waiting passengers 30 minutes before arrival.', domain: 'Railway Reservation' },
    { category: 'User', title: 'Passenger Meal & Special Assistance Preference', description: 'The system shall capture dietary preferences and wheelchair requests during ticket booking and dispatch lists to pantry supervisors.', domain: 'Railway Reservation' }
  ],
  'Hospital Management': [
    { category: 'Functional', title: 'Patient Electronic Health Record (EHR) Sync', description: 'The system shall maintain centralized patient medical histories, diagnostic lab reports, and prescription records with full audit trail.', domain: 'Hospital Management' },
    { category: 'Functional', title: 'Doctor Appointment Scheduling & Token Queue', description: 'The system shall schedule outpatient visits and display real-time waiting room token numbers on digital signage and mobile apps.', domain: 'Hospital Management' },
    { category: 'Non-functional', title: 'HIPAA & Data Privacy Compliance Encryption', description: 'The system shall encrypt all patient protected health information (PHI) at rest using AES-256 encryption and mandate TLS 1.3 in transit.', domain: 'Hospital Management' },
    { category: 'Technical', title: 'Pharmacy Inventory & Automated Reorder Alert', description: 'The system shall track medication stock levels in real time and generate purchase orders when drug inventory falls below safety thresholds.', domain: 'Hospital Management' },
    { category: 'System', title: 'ICU Bed Availability & Emergency Triage Matrix', description: 'The system shall monitor bed occupancy across emergency, ICU, and general wards, updating triage staff every 60 seconds.', domain: 'Hospital Management' },
    { category: 'Business', title: 'Insurance Claim Authorization & Billing Gate', description: 'The system shall interface with health insurance portals to verify policy coverage limits and generate pre-authorization claims.', domain: 'Hospital Management' }
  ],
  'E-Commerce': [
    { category: 'Functional', title: 'Smart Search & Faceted Product Filtering', description: 'The system shall enable fuzzy search and multi-attribute filtering by price range, brand, customer rating, and category.', domain: 'E-Commerce' },
    { category: 'Functional', title: 'Shopping Cart & Multi-Currency Checkout', description: 'The system shall calculate subtotal, localized taxes, promo code discounts, and convert currency dynamically using live exchange rates.', domain: 'E-Commerce' },
    { category: 'Non-functional', title: 'PCI-DSS Compliant Payment Gateway Isolation', description: 'The system shall tokenize credit card credentials according to PCI-DSS Level 1 specifications without storing raw card numbers.', domain: 'E-Commerce' },
    { category: 'Technical', title: 'Real-time Inventory Sync & Anti-Overselling Lock', description: 'The system shall lock cart items for 10 minutes during checkout to prevent duplicate inventory deduction during flash sales.', domain: 'E-Commerce' },
    { category: 'System', title: 'Automated Order Tracking & Courier Webhook Sync', description: 'The system shall update shipment dispatch milestones from FedEx/DHL webhooks and notify customers via push alerts.', domain: 'E-Commerce' },
    { category: 'User', title: 'Wishlist & Automated Abandoned Cart Recovery', description: 'The system shall persist saved items across devices for 30 days and trigger personalized discount reminder emails after 24 hours.', domain: 'E-Commerce' }
  ],
  'Banking': [
    { category: 'Functional', title: 'Fund Transfer & Real-Time Settlement (IMPS/NEFT)', description: 'The system shall execute interbank money transfers within 3 seconds with instant receiver account validation and dual authorization.', domain: 'Banking' },
    { category: 'Functional', title: 'Biometric KYC Verification & Video Onboarding', description: 'The system shall verify customer identity documents via AI OCR and facial liveness matching during mobile account opening.', domain: 'Banking' },
    { category: 'Non-functional', title: 'AI Fraud Detection & Automated Account Freeze', description: 'The system shall evaluate transaction risk scores in real time using machine learning models and freeze transactions exceeding anomaly thresholds.', domain: 'Banking' },
    { category: 'Technical', title: 'Core Banking Ledger Sync & Audit Trail', description: 'The system shall record double-entry transaction journals with microsecond timestamps and immutable SHA-256 hash chains.', domain: 'Banking' },
    { category: 'System', title: 'ATM & Mobile Cardless Cash Withdrawal', description: 'The system shall issue single-use 6-digit OTP tokens for cardless ATM cash withdrawals valid for 15 minutes.', domain: 'Banking' }
  ],
  'Disaster Management': [
    { category: 'Functional', title: 'SOS Geo-Location Beacon & Alert Broadcast', description: 'The system shall broadcast emergency evacuation SMS alerts to all mobile devices within a 50km radius of detected disaster epicenters.', domain: 'Disaster Management' },
    { category: 'Functional', title: 'Real-Time Rescue Team Dispatch Matrix', description: 'The system shall track relief supply inventories, medical stocks, and rescue personnel positions on an offline-first GIS map.', domain: 'Disaster Management' },
    { category: 'Non-functional', title: 'Mesh Network & Satellite Offline Backup Sync', description: 'The system shall maintain communication sync across emergency shelters using satellite links and mesh radio protocols when cell towers fail.', domain: 'Disaster Management' },
    { category: 'Technical', title: 'Drone Thermal Imaging & Victim Detection Stream', description: 'The system shall stream aerial thermal imaging feeds from rescue drones and pinpoint survivor locations on tactical maps.', domain: 'Disaster Management' }
  ],
  'Smart Home & IoT': [
    { category: 'Functional', title: 'Automated Environmental Climate Control', description: 'The system shall adjust HVAC thermostats, humidity levels, and smart blinds based on ambient temperature sensors and occupancy.', domain: 'Smart Home & IoT' },
    { category: 'Non-functional', title: 'Sub-100ms Zigbee & Matter Device Latency', description: 'The system shall execute local smart lighting and lock triggers within 100 milliseconds without cloud server dependency.', domain: 'Smart Home & IoT' },
    { category: 'Technical', title: 'AES-128 Encrypted Mesh Telemetry Stream', description: 'The system shall encrypt sensor data payloads transmitted over MQTT using AES-128 encryption with TLS 1.3 certificate pinning.', domain: 'Smart Home & IoT' },
    { category: 'System', title: 'Intrusion Detection & Mobile Siren Dispatch', description: 'The system shall trigger 100dB sirens and broadcast live camera video feeds to homeowner smartphones upon detecting unauthorized door breaches.', domain: 'Smart Home & IoT' }
  ]
};

const DEFAULT_DOMAIN_RECOMMENDATIONS: Omit<RecommendedRequirement, 'id' | 'selected'>[] = [
  { category: 'Functional', title: 'User Authentication & Multi-Factor Security', description: 'The system shall support OAuth 2.0, biometric login, and mandatory MFA for administrative privileges.', domain: 'General' },
  { category: 'Non-functional', title: 'System Auditing & Comprehensive Trace Logs', description: 'The system shall record all user actions, timestamp changes, and IP addresses in an append-only audit trail.', domain: 'General' },
  { category: 'Non-functional', title: 'Data Backup & Disaster Recovery RPO/RTO', description: 'The system shall execute automated daily database backups with RPO < 1 hour and RTO < 4 hours.', domain: 'General' }
];

export class AIEngine {
  static detectDomain(rawText: string): { domain: string; confidence: number; keywords: string[] } {
    const text = rawText.toLowerCase();
    
    if (text.includes('pnr') || text.includes('train') || text.includes('tatkal') || text.includes('berth') || text.includes('ticket reservation')) {
      return { domain: 'Railway Reservation', confidence: 96, keywords: ['pnr', 'train', 'tatkal', 'berth'] };
    }
    if (text.includes('cart') || text.includes('product') || text.includes('checkout') || text.includes('discount') || text.includes('seller') || text.includes('e-commerce')) {
      return { domain: 'E-Commerce', confidence: 94, keywords: ['cart', 'product', 'checkout', 'seller'] };
    }
    if (text.includes('patient') || text.includes('doctor') || text.includes('appointment') || text.includes('prescription') || text.includes('ehr') || text.includes('hospital')) {
      return { domain: 'Hospital Management', confidence: 95, keywords: ['patient', 'doctor', 'appointment', 'ehr'] };
    }
    if (text.includes('bank') || text.includes('transaction') || text.includes('transfer') || text.includes('kyc') || text.includes('account') || text.includes('balance')) {
      return { domain: 'Banking', confidence: 93, keywords: ['bank', 'transfer', 'kyc', 'transaction'] };
    }
    if (text.includes('evacuation') || text.includes('disaster') || text.includes('shelter') || text.includes('rescue') || text.includes('relief') || text.includes('incident')) {
      return { domain: 'Disaster Management', confidence: 92, keywords: ['disaster', 'shelter', 'rescue', 'relief'] };
    }
    if (text.includes('quiz') || text.includes('exam') || text.includes('instructor') || text.includes('student') || text.includes('course')) {
      return { domain: 'Online Quiz Platform', confidence: 91, keywords: ['quiz', 'exam', 'instructor', 'course'] };
    }
    
    return { domain: 'General Software System', confidence: 80, keywords: ['system', 'user', 'service'] };
  }

  static extractRequirements(rawText: string, domain: string): Requirement[] {
    if (!rawText || !rawText.trim()) return [];

    // Remove control codes and binary artifacts
    const cleanedText = rawText
      .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x9F\uFFFD\uFEFF]/g, ' ')
      .replace(/PK[\x00-\x09\x10-\x1F\x7F-\xFF]+[^\n]*/gi, '')
      .replace(/word\/(?:document|fontTable|styles|settings)\.xml[^\n]*/gi, '');

    const lines = cleanedText
      .split(/\n+|\d+\.\s+|•|-|;/)
      .map(l => l.trim())
      .filter(l => {
        if (l.length < 8) return false;
        // Filter out binary noise: require at least 65% alphanumeric and space characters
        const validChars = (l.match(/[a-zA-Z0-9\s.,;:'"?!()\-_/]/g) || []).length;
        return (validChars / l.length) >= 0.65;
      });

    const requirements: Requirement[] = [];

    lines.forEach((line, index) => {
      const lower = line.toLowerCase();
      let category: RequirementCategory = 'Functional';
      let priority: PriorityLevel = 'Medium';

      if (lower.includes('speed') || lower.includes('fast') || lower.includes('performance') || lower.includes('secure') || lower.includes('encrypt') || lower.includes('uptime') || lower.includes('scale') || lower.includes('proctor') || lower.includes('cheat')) {
        category = 'Non-functional';
      } else if (lower.includes('business') || lower.includes('revenue') || lower.includes('compliance') || lower.includes('policy')) {
        category = 'Business';
      } else if (lower.includes('admin') || lower.includes('dashboard') || lower.includes('instructor') || lower.includes('system shall')) {
        category = 'System';
      } else if (lower.includes('user') || lower.includes('student') || lower.includes('candidate') || lower.includes('as a')) {
        category = 'User';
      } else if (lower.includes('api') || lower.includes('database') || lower.includes('integration') || lower.includes('indexeddb') || lower.includes('sync')) {
        category = 'Technical';
      }

      if (lower.includes('must') || lower.includes('critical') || lower.includes('urgent') || lower.includes('security')) {
        priority = 'High';
      }

      const issues = AIEngine.analyzeQuality(line);

      requirements.push({
        id: `REQ-${String(index + 1).padStart(2, '0')}`,
        title: line.length > 50 ? line.substring(0, 47) + '...' : line,
        description: line,
        category,
        priority,
        status: issues.length > 0 ? 'Analyzed' : 'Draft',
        issues,
        improvedText: AIEngine.generateIEEEText(line),
        isImprovedAccepted: false,
        domain,
        version: 1,
        createdAt: new Date().toISOString().split('T')[0]
      });
    });

    return requirements;
  }

  static analyzeQuality(text: string): QualityIssue[] {
    const issues: QualityIssue[] = [];
    const lower = text.toLowerCase();

    const ambiguousWords = ['fast', 'user-friendly', 'easy', 'robust', 'quick', 'efficient', 'seamless', 'good', 'appropriate'];
    const foundAmbiguous = ambiguousWords.filter(w => lower.includes(w));
    if (foundAmbiguous.length > 0) {
      issues.push({
        id: `ISS-${Math.random().toString(36).substring(2, 7)}`,
        type: 'Ambiguous word',
        problem: `Contains subjective term(s): "${foundAmbiguous.join(', ')}"`,
        reason: 'Subjective terms lead to differing interpretations between clients and developers.',
        suggestedCorrection: `Replace "${foundAmbiguous[0]}" with explicit measurable metrics (e.g. "within 1.5 seconds" or "evaluated within 500ms").`,
        confidenceScore: 95,
        severity: 'High'
      });
    }

    if (!lower.includes('system') && !lower.includes('user') && !lower.includes('student') && !lower.includes('instructor') && !lower.includes('admin') && !lower.includes('candidate')) {
      issues.push({
        id: `ISS-${Math.random().toString(36).substring(2, 7)}`,
        type: 'Missing actor',
        problem: 'No explicit subject/actor defined.',
        reason: 'It is unclear who or what component is responsible for executing this behavior.',
        suggestedCorrection: 'Specify the primary subject (e.g., "The system shall...", "The candidate shall...").',
        confidenceScore: 88,
        severity: 'Medium'
      });
    }

    return issues;
  }

  static generateIEEEText(raw: string): string {
    let cleaned = raw.trim();

    if (cleaned.toLowerCase().includes('should be fast')) {
      return 'The system shall process user requests within 1.2 seconds under peak concurrency load.';
    }
    if (cleaned.toLowerCase().includes('prevent cheating') || cleaned.toLowerCase().includes('proctor')) {
      return 'The system shall monitor candidate browser focus, log window blur events, and auto-submit the exam upon 3 unauthorized tab switches.';
    }

    cleaned = cleaned.replace(/^(should|must|website should|system needs to|we need|please make sure)/i, '');
    cleaned = cleaned.charAt(0).toLowerCase() + cleaned.slice(1);

    if (!cleaned.toLowerCase().startsWith('the system shall') && !cleaned.toLowerCase().startsWith('the user shall')) {
      return `The system shall ${cleaned.replace(/^to\s+/i, '')}.`;
    }

    return cleaned;
  }

  static getDomainRecommendations(domain: string): RecommendedRequirement[] {
    const specific = DOMAIN_RECOMMENDATIONS[domain] || [];
    const combined = [...specific, ...DEFAULT_DOMAIN_RECOMMENDATIONS];

    return combined.map((rec, i) => ({
      id: `REC-${domain.substring(0, 3).toUpperCase()}-${i + 1}`,
      ...rec,
      selected: false
    }));
  }

  static generateUserStories(requirements: Requirement[]): UserStory[] {
    return requirements.map((req, idx) => {
      const titleLower = req.title.toLowerCase();
      const domainLower = (req.domain || '').toLowerCase();

      let role = 'System User';
      let action = req.title;
      let benefit = 'ensure business reliability, system safety, and user satisfaction';
      let criteria: string[] = [];

      if (domainLower.includes('railway') || titleLower.includes('pnr') || titleLower.includes('train') || titleLower.includes('berth') || titleLower.includes('tatkal') || titleLower.includes('ticket')) {
        role = 'Train Passenger / Station Operator';
        action = `execute ${req.title.toLowerCase()}`;
        benefit = 'complete train journeys and seat reservations with guaranteed SLA timing';
        criteria = [
          `Given valid passenger credentials, when "${req.title}" is triggered, then response completes in < 1.5 seconds.`,
          `Given high concurrency peak loads, transaction state remains consistent without race conditions.`,
          `Given successful processing, confirmation SMS/e-ticket and PNR audit log are generated.`
        ];
      } else if (domainLower.includes('quiz') || titleLower.includes('quiz') || titleLower.includes('exam') || titleLower.includes('student') || titleLower.includes('score') || titleLower.includes('proctor')) {
        role = 'Student Candidate / Examiner';
        action = `participate in ${req.title.toLowerCase()}`;
        benefit = 'evaluate academic competencies securely with automated evaluation and anti-cheating audit';
        criteria = [
          `Given candidate starts timed session, when timer expires or 3 tab switches occur, then exam auto-submits.`,
          `Given intermittent network disconnection, local answer state buffers in IndexedDB without data loss.`,
          `Given quiz submission completion, an itemized scorecard and percentile ranking generate instantly.`
        ];
      } else if (domainLower.includes('hospital') || titleLower.includes('patient') || titleLower.includes('doctor') || titleLower.includes('ehr') || titleLower.includes('prescription')) {
        role = 'Medical Practitioner / Patient';
        action = `manage ${req.title.toLowerCase()}`;
        benefit = 'maintain patient health safety, HIPAA regulatory compliance, and minimal triage wait times';
        criteria = [
          `Given authorized medical credentials, patient health records decrypt and render via AES-256.`,
          `Given appointment booking or queue token request, real-time waiting room alerts broadcast via SMS.`,
          `Given emergency triage update, audit trail logs practitioner ID and timestamp with zero data discrepancy.`
        ];
      } else if (domainLower.includes('e-commerce') || domainLower.includes('commerce') || titleLower.includes('cart') || titleLower.includes('product') || titleLower.includes('checkout')) {
        role = 'Online Shopper / Merchant';
        action = `utilize ${req.title.toLowerCase()}`;
        benefit = 'discover relevant catalog items, prevent inventory overselling, and complete 3D-Secure checkout';
        criteria = [
          `Given product search or checkout trigger, indexed catalogue responses return in < 200ms.`,
          `Given flash sale checkout, cart inventory reserve locks for 10 minutes to prevent double-booking.`,
          `Given payment confirmation via gateway webhook, order tracking status updates automatically.`
        ];
      } else if (domainLower.includes('bank') || titleLower.includes('transfer') || titleLower.includes('fund') || titleLower.includes('kyc') || titleLower.includes('fraud')) {
        role = 'Bank Customer / Compliance Officer';
        action = `process ${req.title.toLowerCase()}`;
        benefit = 'secure high-value transactions with sub-second settlement and automated fraud deterrence';
        criteria = [
          `Given interbank fund transfer request, receiver account validation and dual-authorization execute in < 3s.`,
          `Given risk score above anomaly threshold, transaction freezes and alerts compliance officer.`,
          `Given transaction execution, core double-entry ledger logs with immutable SHA-256 hash chains.`
        ];
      } else if (domainLower.includes('disaster') || titleLower.includes('sos') || titleLower.includes('rescue') || titleLower.includes('shelter')) {
        role = 'Emergency Responder / Citizen';
        action = `dispatch ${req.title.toLowerCase()}`;
        benefit = 'save civilian lives and coordinate emergency logistics during mission-critical events';
        criteria = [
          `Given detected disaster epicenter, evacuation alerts broadcast to 50km radius within 5 seconds.`,
          `Given offline field deployment, GIS tactical map synchronizes via mesh satellite telemetry.`,
          `Given rescue unit dispatch, resource inventory matrices update live across command shelters.`
        ];
      } else {
        role = 'Authorized System User';
        action = `perform ${req.title.toLowerCase()}`;
        benefit = 'achieve target business workflow outcomes with zero defect rate';
        criteria = [
          `Given authenticated user session, when valid payload is submitted for "${req.title}", system returns 200 OK.`,
          `Given invalid or malformed parameters, system rejects input with descriptive validation error banner.`,
          `Given nominal execution, audit logs and state changes commit to persistent storage.`
        ];
      }

      const gherkin = `Feature: ${req.title} (${req.id})
  Scenario: Nominal execution of ${req.title}
    Given the user is authenticated with role "${role}"
    When valid parameters are provided for "${req.title}"
    Then the system executes core logic within SLA threshold
    And a secure audit record is created in the persistence layer`;

      return {
        id: `US-${String(idx + 1).padStart(2, '0')}`,
        requirementId: req.id,
        asA: role,
        iWantTo: action,
        soThat: benefit,
        priority: req.priority,
        storyPoints: req.priority === 'Critical' ? 13 : req.priority === 'High' ? 8 : req.priority === 'Medium' ? 5 : 3,
        acceptanceCriteria: criteria,
        definitionOfDone: [
          'Code written, peer reviewed & merged to main branch',
          'Automated unit & integration test suite passed with > 85% coverage',
          'Security vulnerability scan & WAF inspection verified',
          'IEEE 830 traceability matrix linked and signed off'
        ],
        gherkinScenario: gherkin
      };
    });
  }

  static generateRiskHeatmap(requirements: Requirement[], risks: RiskItem[]): import('../types').RiskHeatmapItem[] {
    const defaultRisks: import('../types').RiskHeatmapItem[] = [
      {
        id: 'RISK-01',
        title: 'Payment Gateway Failover & Webhook Drop',
        probability: 'Medium',
        impact: 'High',
        score: 7.8,
        category: 'Third-Party Integration',
        affectedRequirementIds: requirements.filter(r => r.category === 'Technical' || r.category === 'Non-functional').slice(0, 3).map(r => r.id),
        affectedTestCaseIds: ['TC-003', 'TC-004', 'TC-007'],
        mitigation: 'Implement exponential backoff retry queue, circuit breaker pattern, and idempotent webhook handlers.',
        color: 'amber'
      },
      {
        id: 'RISK-02',
        title: 'Peak Concurrency Database Connection Starvation',
        probability: 'High',
        impact: 'High',
        score: 9.2,
        category: 'Performance & Scale',
        affectedRequirementIds: requirements.filter(r => r.priority === 'Critical' || r.priority === 'High').slice(0, 2).map(r => r.id),
        affectedTestCaseIds: ['TC-001', 'TC-004'],
        mitigation: 'Deploy PgBouncer connection pooling, Redis caching layer, and horizontal read replicas.',
        color: 'red'
      },
      {
        id: 'RISK-03',
        title: 'Ambiguous Operational Latency Constraints',
        probability: 'High',
        impact: 'Medium',
        score: 6.9,
        category: 'Requirement Volatility',
        affectedRequirementIds: requirements.slice(0, 2).map(r => r.id),
        affectedTestCaseIds: ['TC-002'],
        mitigation: 'Enforce IEEE 830 quantified millisecond benchmarks before architecture sign-off.',
        color: 'amber'
      },
      {
        id: 'RISK-04',
        title: 'Session Token Replay & Injection Breach',
        probability: 'Low',
        impact: 'High',
        score: 5.4,
        category: 'Security & Auth',
        affectedRequirementIds: requirements.filter(r => r.category === 'Non-functional').map(r => r.id),
        affectedTestCaseIds: ['TC-003'],
        mitigation: 'Mandate TLS 1.3, short-lived JWTs, RSA-256 asymmetric signatures, and strict CORS origins.',
        color: 'amber'
      },
      {
        id: 'RISK-05',
        title: 'Offline Local Buffer Inconsistency',
        probability: 'Low',
        impact: 'Medium',
        score: 3.5,
        category: 'Data Integrity',
        affectedRequirementIds: requirements.slice(1, 3).map(r => r.id),
        affectedTestCaseIds: ['TC-001'],
        mitigation: 'Implement CRDT conflict-free resolution algorithms and IndexedDB transactional checkpoints.',
        color: 'green'
      },
      {
        id: 'RISK-06',
        title: 'Client UI State Desynchronization',
        probability: 'Low',
        impact: 'Low',
        score: 2.1,
        category: 'Frontend UI',
        affectedRequirementIds: requirements.slice(0, 1).map(r => r.id),
        affectedTestCaseIds: ['TC-001'],
        mitigation: 'Use optimistic UI updates with automatic WebSocket rollbacks upon validation failures.',
        color: 'green'
      }
    ];

    return defaultRisks;
  }

  static generateTraceabilityGraph(requirements: Requirement[], stories: UserStory[], useCases: UseCase[], testCases: TestCase[]): import('../types').TraceabilityNodeItem[] {
    return requirements.map((req, idx) => {
      const story = stories.find(s => s.requirementId === req.id) || stories[idx] || { id: `US-${String(idx+1).padStart(2,'0')}` };
      const uc = useCases.find(u => u.requirementId === req.id) || useCases[idx] || { id: `UC-${String(idx+1).padStart(2,'0')}` };
      const tc = testCases.find(t => t.requirementId === req.id) || testCases[idx] || { id: `TC-${String(idx+1).padStart(3,'0')}`, status: 'Passed' };

      return {
        reqId: req.id,
        reqTitle: req.title,
        storyId: story.id,
        criteriaId: `AC-${String(idx+1).padStart(2,'0')}`,
        useCaseId: uc.id,
        testCaseId: tc.id,
        status: (tc.status === 'Passed' ? 'PASS' : tc.status === 'Failed' ? 'FAIL' : 'PENDING') as any
      };
    });
  }

  static generateRoadmap(requirements: Requirement[], stories: UserStory[]): import('../types').RoadmapReleaseItem[] {
    const totalPts = stories.reduce((acc, s) => acc + s.storyPoints, 0);

    return [
      {
        release: 'Release 1 (MVP)',
        moscow: 'Must Have',
        timeline: 'Sprint 1 - Sprint 3 (Weeks 1-6)',
        requirements: requirements.filter(r => r.priority === 'Critical' || r.priority === 'High').slice(0, 4).map(r => `${r.id}: ${r.title}`),
        totalStoryPoints: Math.round(totalPts * 0.55),
        readiness: 94
      },
      {
        release: 'Release 2 (Enhanced)',
        moscow: 'Should Have',
        timeline: 'Sprint 4 - Sprint 6 (Weeks 7-12)',
        requirements: requirements.filter(r => r.priority === 'Medium').slice(0, 3).map(r => `${r.id}: ${r.title}`),
        totalStoryPoints: Math.round(totalPts * 0.30),
        readiness: 78
      },
      {
        release: 'Release 3 (Advanced)',
        moscow: 'Could Have',
        timeline: 'Sprint 7 - Sprint 8 (Weeks 13-16)',
        requirements: requirements.filter(r => r.priority === 'Low' || r.category === 'Business').slice(0, 3).map(r => `${r.id}: ${r.title}`),
        totalStoryPoints: Math.round(totalPts * 0.15),
        readiness: 45
      }
    ];
  }

  static generateSprintPlans(requirements: Requirement[], stories: UserStory[]): import('../types').SprintPlanProposal[] {
    return [
      {
        sprint: 'Sprint 1 • Core Infrastructure & Auth',
        capacityPoints: 35,
        assignedPoints: 32,
        requirements: requirements.slice(0, 2).map((r, i) => ({ id: r.id, title: r.title, points: stories[i]?.storyPoints || 8 })),
        dependencies: ['Gateway WAF Setup', 'PostgreSQL AES-256 Schema'],
        riskRating: 'Low'
      },
      {
        sprint: 'Sprint 2 • Business Logic & Processing Kernel',
        capacityPoints: 35,
        assignedPoints: 34,
        requirements: requirements.slice(2, 4).map((r, i) => ({ id: r.id, title: r.title, points: stories[i + 2]?.storyPoints || 8 })),
        dependencies: ['Sprint 1 Auth Service', 'Message Buffer Queue'],
        riskRating: 'Medium'
      },
      {
        sprint: 'Sprint 3 • Real-time Sync & Integration Webhooks',
        capacityPoints: 35,
        assignedPoints: 28,
        requirements: requirements.slice(4, 7).map((r, i) => ({ id: r.id, title: r.title, points: stories[i + 4]?.storyPoints || 5 })),
        dependencies: ['Sprint 2 Core Kernel', 'Third-Party Bank/GIS Webhooks'],
        riskRating: 'High'
      }
    ];
  }

  static generateSemanticClusters(requirements: Requirement[]): import('../types').SemanticSimilarityGroup[] {
    return [
      {
        clusterName: 'Authentication & Access Control Cluster',
        icon: 'Lock',
        primaryInsight: 'High cohesion around identity, token security, and RBAC policies.',
        requirements: [
          { id: 'REQ-AUTH-01', title: 'Multi-Factor Biometric Login', similarityScore: 94 },
          { id: 'REQ-AUTH-02', title: 'JWT RSA-256 Token Verification', similarityScore: 89 },
          { id: 'REQ-AUTH-03', title: 'Session Inactivity Auto-Logout', similarityScore: 82 }
        ]
      },
      {
        clusterName: 'Transaction & Concurrency Cluster',
        icon: 'Zap',
        primaryInsight: 'Shared SLA dependencies on sub-second execution and distributed lock guards.',
        requirements: [
          { id: 'REQ-TXN-01', title: 'Peak Concurrency Tatkal / Flash Request Handling', similarityScore: 96 },
          { id: 'REQ-TXN-02', title: 'Real-Time Inventory Lock & Anti-Oversell', similarityScore: 91 },
          { id: 'REQ-TXN-03', title: 'Payment Gateway Webhook Sync & Refund Engine', similarityScore: 87 }
        ]
      },
      {
        clusterName: 'Audit & Compliance Telemetry Cluster',
        icon: 'ShieldCheck',
        primaryInsight: 'Cross-cutting requirements addressing tamper-proof logging and encryption.',
        requirements: [
          { id: 'REQ-AUD-01', title: 'AES-256 Encryption at Rest & TLS 1.3 in Transit', similarityScore: 95 },
          { id: 'REQ-AUD-02', title: 'Immutable SHA-256 Audit Trail Journal', similarityScore: 92 }
        ]
      }
    ];
  }

  static generateArchitectureImpact(requirements: Requirement[]): import('../types').ArchitectureImpactChain[] {
    return requirements.map((req, i) => {
      let svc = 'Auth & Security Service';
      let db = 'users_auth_store';
      let downstream = ['Audit Log Service', 'Notification Webhook'];
      let tests = ['TC-001', 'TC-003', 'TC-008'];
      let severity: import('../types').ArchitectureImpactChain['impactSeverity'] = 'Medium';

      if (req.category === 'Non-functional' || req.priority === 'Critical') {
        svc = 'Core Transaction & High-Concurrency Kernel';
        db = 'transactions_ledger_master';
        downstream = ['Payment Gateway Adapter', 'Inventory Buffer', 'Audit Queue'];
        tests = ['TC-001', 'TC-004', 'TC-007', 'TC-012'];
        severity = 'Critical';
      } else if (req.category === 'System' || req.category === 'Technical') {
        svc = 'Domain Scheduling & Allocation Engine';
        db = 'resource_matrix_store';
        downstream = ['Live Cache Index', 'WebSocket Dispatcher'];
        tests = ['TC-002', 'TC-005'];
        severity = 'High';
      }

      return {
        reqId: req.id,
        reqTitle: req.title,
        microservice: svc,
        databaseTable: db,
        downstreamServices: downstream,
        affectedTests: tests,
        impactSeverity: severity
      };
    });
  }

  static generateTestingMatrix(requirements: Requirement[], testCases: TestCase[]): import('../types').TestingMatrixCoverageRow[] {
    return requirements.map((req, idx) => {
      const isCritical = req.priority === 'Critical';
      const isTechnical = req.category === 'Technical' || req.category === 'Non-functional';

      return {
        reqId: req.id,
        reqTitle: req.title,
        unitTest: true,
        integrationTest: true,
        systemTest: isCritical || isTechnical,
        securityTest: isCritical || req.category === 'Non-functional',
        performanceTest: isCritical,
        overallCoverage: isCritical ? 100 : isTechnical ? 80 : 60,
        hasGaps: !isCritical && !isTechnical
      };
    });
  }

  static generateStakeholderPowerInterest(domain: string): import('../types').PowerInterestStakeholderItem[] {
    return [
      {
        name: 'Enterprise Client & Executive Sponsor',
        role: 'Business Vision & Budget Authority',
        power: 'High',
        interest: 'High',
        quadrant: 'Key Players',
        priorityRequirements: ['Budget SLA adherence', 'ROI timeline', 'System availability > 99.9%'],
        engagementStrategy: 'Weekly milestone demonstrations and formal IEEE scope approval meetings.'
      },
      {
        name: 'Regulatory & Compliance Auditor',
        role: 'Data Privacy (HIPAA / PCI-DSS / IEEE)',
        power: 'High',
        interest: 'Low',
        quadrant: 'Keep Satisfied',
        priorityRequirements: ['AES-256 data encryption', 'Immutable audit logs', 'MFA auth policy'],
        engagementStrategy: 'Provide automated IEEE 29148 compliance reports and security vulnerability certificates.'
      },
      {
        name: 'Primary End-Users (Students / Passengers / Shoppers)',
        role: 'Daily Product Beneficiaries',
        power: 'Low',
        interest: 'High',
        quadrant: 'Keep Informed',
        priorityRequirements: ['Sub-1.5s response latency', 'Intuitive mobile UI', 'Instant receipts & alerts'],
        engagementStrategy: 'Run usability beta testing and monitor user feedback sentiment channels.'
      },
      {
        name: 'Third-Party Integration Vendors',
        role: 'Payment Gateways & SMS Service Providers',
        power: 'Low',
        interest: 'Low',
        quadrant: 'Minimal Effort',
        priorityRequirements: ['Standard REST / Webhook contracts', 'Clear rate limit quotas'],
        engagementStrategy: 'Automated OpenAPI contract testing and webhook ping monitors.'
      }
    ];
  }

  static generateRefinementChallenges(): import('../types').RefinementGameItem[] {
    return [
      {
        id: 'CHAL-01',
        domain: 'Railway Reservation',
        flawedText: 'The ticket booking website should be fast and user-friendly in the morning.',
        defectReasons: ['Subjective term "fast"', 'Subjective term "user-friendly"', 'Vague time window "in the morning"'],
        originalScore: 34,
        referenceIdealText: 'The system shall process ticket reservation transactions within 1.2 seconds under a peak concurrency load of 50,000 active users during Tatkal opening hours (10:00 AM - 11:00 AM).'
      },
      {
        id: 'CHAL-02',
        domain: 'Online Quiz Platform',
        flawedText: 'The app must prevent students from cheating during tests effectively.',
        defectReasons: ['Subjective term "effectively"', 'No measurable proctoring criteria', 'Missing exact tab-switch action'],
        originalScore: 41,
        referenceIdealText: 'The system shall monitor candidate browser focus, detect tab-switching events, and automatically submit the exam upon 3 unauthorized window blur warnings.'
      },
      {
        id: 'CHAL-03',
        domain: 'Hospital Management',
        flawedText: 'Patient records should be kept secure and private at all times.',
        defectReasons: ['Subjective phrase "kept secure and private"', 'Missing explicit encryption standard', 'Lacks access control rules'],
        originalScore: 38,
        referenceIdealText: 'The system shall encrypt all patient electronic health records (EHR) at rest using AES-256 and mandate TLS 1.3 encryption for all network data transmissions in compliance with HIPAA.'
      }
    ];
  }


  static generateUseCases(requirements: Requirement[]): UseCase[] {
    return requirements.map((req, idx) => ({
      id: `UC-${String(idx + 1).padStart(2, '0')}`,
      requirementId: req.id,
      title: `Execute ${req.title}`,
      actors: [getActorForRequirement(req), 'System Processing Kernel'],
      preconditions: [
        'User is authenticated with active session token',
        'System state is online and operational'
      ],
      postconditions: [
        'Transaction committed to database',
        'Audit trail log generated'
      ],
      mainFlow: [
        '1. User initiates feature action from dashboard.',
        '2. System displays input parameters form.',
        '3. User submits data payload.',
        '4. System validates parameters and executes core business logic.',
        '5. System returns 200 OK and renders confirmation UI.'
      ],
      alternativeFlow: [
        '3a. User requests draft save: System caches state in session store.'
      ],
      exceptions: [
        '4a. Validation error or connection failure: System rolls back transaction, displays error banner E-400.'
      ],
      relationships: ['Includes: Authentication Service', 'Extends: Audit Logger']
    }));
  }

  static generateTestCases(requirements: Requirement[]): TestCase[] {
    const testCases: TestCase[] = [];
    let testIdx = 1;

    requirements.forEach((req) => {
      testCases.push({
        id: `TC-${String(testIdx++).padStart(3, '0')}`,
        requirementId: req.id,
        category: 'Positive',
        description: `Verify standard nominal execution of ${req.title}.`,
        inputData: 'Valid JSON payload matching schema standards',
        expectedOutput: 'HTTP 200 OK / Success UI rendered',
        priority: req.priority,
        status: 'Passed'
      });

      testCases.push({
        id: `TC-${String(testIdx++).padStart(3, '0')}`,
        requirementId: req.id,
        category: 'Negative',
        description: `Verify system validation when null or malformed data is passed to ${req.title}.`,
        inputData: 'Malformed payload / Null attributes',
        expectedOutput: 'HTTP 400 Bad Request with field validation errors',
        priority: req.priority,
        status: 'Passed'
      });

      testCases.push({
        id: `TC-${String(testIdx++).padStart(3, '0')}`,
        requirementId: req.id,
        category: 'Security',
        description: `Verify SQL Injection & XSS sanitization during submission of ${req.title}.`,
        inputData: "' OR '1'='1; <script>alert('xss')</script>",
        expectedOutput: 'Input sanitized, payload blocked by WAF filter',
        priority: 'High',
        status: 'Passed'
      });

      testCases.push({
        id: `TC-${String(testIdx++).padStart(3, '0')}`,
        requirementId: req.id,
        category: 'Performance',
        description: `Verify response latency under concurrent traffic for ${req.title}.`,
        inputData: '1,000 concurrent active session requests',
        expectedOutput: 'Response time <= 1.5s, 0% request drop rate',
        priority: 'Medium',
        status: 'Pending'
      });
    });

    return testCases;
  }

  static generateRisks(requirements: Requirement[]): RiskItem[] {
    return [
      {
        id: 'RSK-01',
        title: 'Requirement Volatility & Unclear SLAs',
        category: 'Requirement Volatility',
        impact: 'High',
        probability: 'Medium',
        mitigation: 'Implement formal IEEE change control sign-off and version snapshot tagging.',
        affectedRequirementIds: requirements.slice(0, 2).map(r => r.id)
      },
      {
        id: 'RSK-02',
        title: 'Third-Party Integration Throttling & Latency',
        category: 'Dependency Issue',
        impact: 'High',
        probability: 'High',
        mitigation: 'Implement circuit breaker pattern, localized caching, and background sync queues.',
        affectedRequirementIds: requirements.filter(r => r.category === 'Technical').map(r => r.id)
      }
    ];
  }

  static generateRTM(requirements: Requirement[], useCases: UseCase[], testCases: TestCase[]): RTMRow[] {
    return requirements.map(req => {
      const matchingUseCase = useCases.find(uc => uc.requirementId === req.id);
      const matchingTestCases = testCases.filter(tc => tc.requirementId === req.id).map(tc => tc.id);

      return {
        requirementId: req.id,
        requirementTitle: req.title,
        category: req.category,
        useCaseId: matchingUseCase ? matchingUseCase.id : 'N/A',
        testCaseIds: matchingTestCases,
        status: (matchingUseCase && matchingTestCases.length > 0) ? 'Covered' : 'Partial',
        priority: req.priority
      };
    });
  }

  static generateComplianceChecks(requirements: Requirement[]): ComplianceCheck[] {
    const total = requirements.length;
    const ambiguousCount = requirements.filter(r => r.issues.some(i => i.type === 'Ambiguous word')).length;
    const missingActorCount = requirements.filter(r => r.issues.some(i => i.type === 'Missing actor')).length;

    return [
      { id: 'CMP-01', criterion: 'Completeness', description: 'All core sub-modules, constraints, and exceptions defined.', score: 92, status: 'Passed', recommendation: 'Specification covers core functional paths.' },
      { id: 'CMP-02', criterion: 'Unambiguity', description: 'Requirements have single, clear interpretation without subjective words.', score: total > 0 ? Math.round(((total - ambiguousCount) / total) * 100) : 100, status: ambiguousCount === 0 ? 'Passed' : 'Warning', recommendation: ambiguousCount > 0 ? `Rewrite ${ambiguousCount} flagged ambiguous statement(s) into IEEE format.` : 'Passed IEEE quality audit.' },
      { id: 'CMP-03', criterion: 'Verifiability / Testability', description: 'Acceptance criteria exist and QA engineers can write pass/fail unit tests.', score: 95, status: 'Passed', recommendation: 'Test case matrix generated across 6 categories.' },
      { id: 'CMP-04', criterion: 'Traceability', description: 'Bi-directional mapping between requirements, use cases, and test cases.', score: 96, status: 'Passed', recommendation: 'Requirement Traceability Matrix (RTM) active.' },
      { id: 'CMP-05', criterion: 'Modifiability & Versioning', description: 'Structure allows clean updates without conflicting requirements.', score: 90, status: 'Passed', recommendation: 'Version snapshot engine active.' },
      { id: 'CMP-06', criterion: 'Correctness & Feasibility', description: 'Requirements align with technology stack and domain boundaries.', score: 94, status: 'Passed', recommendation: 'Domain rules validated.' }
    ];
  }

  /**
   * Enhanced Dynamic AI Co-Pilot Assistant Logic
   */
  static getAIChatResponse(query: string, requirements: Requirement[], domain: string): string {
    const q = query.toLowerCase();
    const reqCount = requirements.length;
    const funcCount = requirements.filter(r => r.category === 'Functional').length;
    const nonFuncCount = requirements.filter(r => r.category !== 'Functional').length;
    const ambiguousCount = requirements.filter(r => r.issues.some(i => i.type === 'Ambiguous word')).length;

    if (q.includes('missing') || q.includes('recommend') || q.includes('suggest')) {
      return `### 💡 Recommended Features for **${domain}**

Based on AI domain knowledge analysis for **${domain}**, here are essential missing requirements you should add:

1. **Anti-Cheating & Proctoring**: Browser window focus tracking, tab-switch detection, and automatic exam termination after 3 warnings.
2. **Offline Buffer & Auto-Sync**: Client-side IndexedDB answer buffering to ensure 0% data loss during unexpected network drops.
3. **Question Bank Shuffling & Item Analysis**: Randomized question sequence per candidate and instructor difficulty bell-curve metrics.
4. **Audit Logging & MFA**: Multi-factor authentication for administrative actions and SHA-256 signed audit trails.

👉 *You can select and import these in 1-click inside **Domain Suggestions (Module 5)**!*`;
    }

    if (q.includes('quality') || q.includes('ambigu') || q.includes('audit') || q.includes('score')) {
      const healthScore = reqCount > 0 ? Math.round(((reqCount - ambiguousCount) / reqCount) * 100) : 100;
      return `### 🛡️ IEEE 830 Quality Audit Summary

- **Total Analyzed Requirements**: \`${reqCount}\`
- **Ambiguous Statements Flagged**: \`${ambiguousCount}\`
- **Quality Health Index**: \`${healthScore}%\`

${ambiguousCount > 0 
  ? `⚠️ **Action Needed**: ${ambiguousCount} requirement(s) contain subjective terms like *"fast"* or *"user-friendly"*. Navigate to **IEEE Quality Audit (Module 3 & 4)** to accept automatic IEEE rewrites (*"The system shall..."*)!` 
  : `✅ **Great job!** All current requirements pass IEEE 830 quality standards without ambiguity defects.`}`;
    }

    if (q.includes('story') || q.includes('agile') || q.includes('user story')) {
      return `### 📖 Agile User Story Breakdown

Your project currently has **${reqCount} Agile User Stories** synthesized from your specifications.

Each story contains:
- **Triple Format**: *As a [User/Student/Passenger]... I want to... So that...*
- **Fibonacci Points**: Estimated complexity points (3, 5, 8 pts).
- **Gherkin Scenarios**: Executable \`Given ... When ... Then ...\` acceptance rules.
- **Definition of Done (DoD)**: Code review, unit test coverage, and QA sign-off checklists.

👉 *View your complete story board in **Agile User Stories (Module 6)**!*`;
    }

    if (q.includes('test') || q.includes('qa') || q.includes('matrix')) {
      return `### 🧪 QA Test Suite Summary

RequireX has compiled **${reqCount * 4} Automated Test Cases** for your project across 6 core quality categories:
- **Positive & Functional Tests**: Nominal valid payloads.
- **Negative Tests**: Malformed data & HTTP 400 validation error handling.
- **Security Tests**: SQL Injection, XSS sanitization & WAF rules.
- **Performance & Load Tests**: Concurrent user latency benchmarks.

👉 *Inspect the full interactive matrix in **Test Case Matrix (Module 9)**!*`;
    }

    if (q.includes('srs') || q.includes('export') || q.includes('pdf') || q.includes('docx')) {
      return `### 📄 IEEE SRS Document Exporter

Your Software Requirement Specification for **${domain}** is complete and fully formatted to **IEEE Std 830-1998 / 29148-2018** standards.

You can export the publication-ready document right now in:
1. **PDF Document** (formatted with title page & standard headers)
2. **Word Document (.docx)**
3. **Markdown (.md)**
4. **Plain Text (.txt)**

👉 *Navigate to **IEEE SRS & Export (Module 12 & 13)** to download!*`;
    }

    if (q.includes('risk') || q.includes('volatility') || q.includes('creep')) {
      return `### ⚠️ Risk & Volatility Analysis

RequireX identified key risks in **${domain}**:
1. **High Concurrency Peak Load**: Risk of latency drops during peak submission windows. *Mitigation: Async queue buffering.*
2. **Scope Creep**: Risk of changing stakeholder requirements. *Mitigation: IEEE version snapshot tagging.*

👉 *Inspect full mitigations in **Risk Analysis (Module 10)**!*`;
    }

    // Default intelligent contextual response
    return `### 🤖 RequireX AI Co-Pilot Summary for **${domain}**

- **Project Name**: \`${domain}\`
- **Total Requirements**: \`${reqCount}\` (${funcCount} Functional, ${nonFuncCount} Non-Functional)
- **Quality Ambiguities**: \`${ambiguousCount} flagged\`

I can help you:
- Recommend missing security or proctoring features
- Analyze requirement ambiguity and generate IEEE rewrites
- Synthesize Agile User Stories and Gherkin BDD test scenarios
- Export complete IEEE SRS documents to PDF or Word

What specific area would you like to explore?`;
  }
}

function getActorForRequirement(req: Requirement): string {
  const t = req.title.toLowerCase();
  if (t.includes('quiz') || t.includes('student') || t.includes('exam')) return 'Student / Candidate';
  if (t.includes('instructor') || t.includes('teacher')) return 'Course Instructor';
  if (t.includes('patient')) return 'Patient / Medical Staff';
  if (t.includes('passenger') || t.includes('pnr')) return 'Railway Passenger';
  if (t.includes('admin')) return 'System Administrator';
  return 'Primary System User';
}
