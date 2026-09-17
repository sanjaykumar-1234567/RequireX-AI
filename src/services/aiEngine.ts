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
        const validChars = (l.match(/[a-zA-Z0-9\s.,;:'"?!()\-_/]/g) || []).length;
        return (validChars / l.length) >= 0.65;
      });

    const requirements: Requirement[] = [];

    lines.forEach((line, index) => {
      const analysis = AIEngine.analyze20Problems(line, lines, domain, index);

      requirements.push({
        id: `REQ-${String(index + 1).padStart(2, '0')}`,
        title: line.length > 55 ? line.substring(0, 52) + '...' : line,
        description: line,
        category: analysis.category,
        priority: analysis.priority,
        status: analysis.issues.length > 0 ? 'Analyzed' : 'Approved',
        issues: analysis.issues,
        improvedText: analysis.ieeeRewrite,
        isImprovedAccepted: false,
        domain,
        version: 1,
        createdAt: new Date().toISOString().split('T')[0]
      });
    });

    return requirements;
  }

  /**
   * Comprehensive 20-Problem Requirement Defect Analyzer
   * Detects all 20 software requirement defects specified in ISO/IEC/IEEE 29148 & IEEE 830.
   */
  static analyze20Problems(
    text: string, 
    allLines: string[] = [], 
    domain: string = 'General', 
    reqIndex: number = 0
  ): {
    issues: QualityIssue[];
    ieeeRewrite: string;
    category: RequirementCategory;
    priority: PriorityLevel;
  } {
    const issues: QualityIssue[] = [];
    const lower = text.toLowerCase();
    const reqId = `REQ-${String(reqIndex + 1).padStart(2, '0')}`;

    // 19. Requirement Classification
    let category: RequirementCategory = 'Functional';
    if (lower.includes('speed') || lower.includes('fast') || lower.includes('performance') || lower.includes('latency') || 
        lower.includes('secure') || lower.includes('encrypt') || lower.includes('uptime') || lower.includes('availability') || 
        lower.includes('scale') || lower.includes('concurrency') || lower.includes('proctor') || lower.includes('cheat')) {
      category = 'Non-functional';
    } else if (lower.includes('business') || lower.includes('revenue') || lower.includes('compliance') || 
               lower.includes('policy') || lower.includes('fee') || lower.includes('refund policy')) {
      category = 'Business';
    } else if (lower.includes('admin') || lower.includes('dashboard') || lower.includes('telemetry') || 
               lower.includes('scheduler') || lower.includes('background') || lower.includes('system shall')) {
      category = 'System';
    } else if (lower.includes('passenger') || lower.includes('student') || lower.includes('customer') || 
               lower.includes('shopper') || lower.includes('doctor') || lower.includes('patient') || lower.includes('as a user')) {
      category = 'User';
    } else if (lower.includes('api') || lower.includes('database') || lower.includes('integration') || 
               lower.includes('webhook') || lower.includes('indexeddb') || lower.includes('rest') || lower.includes('sync')) {
      category = 'Technical';
    }

    // 20. Priority Detection (MoSCoW)
    let priority: PriorityLevel = 'Medium';
    if (lower.includes('must') || lower.includes('critical') || lower.includes('urgent') || 
        lower.includes('security') || lower.includes('auth') || lower.includes('payment')) {
      priority = 'Critical';
    } else if (lower.includes('should') || lower.includes('important') || lower.includes('performance') || lower.includes('high')) {
      priority = 'High';
    } else if (lower.includes('could') || lower.includes('nice to have') || lower.includes('optional')) {
      priority = 'Low';
    }

    // 1. Ambiguity (Multiple possible interpretations)
    const ambiguityTerms = ['fast', 'quick', 'rapid', 'high speed', 'high volume', 'large capacity'];
    const foundAmbiguity = ambiguityTerms.find(w => new RegExp(`\\b${w}\\b`, 'i').test(lower));
    const hasNumericalTime = /\b\d+(\.\d+)?\s*(ms|s|sec|seconds?|minutes?|hours?)\b/i.test(lower);
    if (foundAmbiguity && !hasNumericalTime) {
      issues.push({
        id: `ISS-${reqId}-01`,
        code: 'DEF-01',
        type: 'Ambiguity',
        problem: `Ambiguous Requirement: What does "${foundAmbiguity}" mean? (1 second? 5 seconds? 10 seconds?) Lacks quantitative SLA boundary.`,
        reason: 'Ambiguous statements have multiple conflicting interpretations between clients and engineers (IEEE 830 Clause 4.3.2).',
        suggestedCorrection: 'Specify a measurable response time target, e.g., "within 1.5 seconds under a peak load of 5,000 concurrent active sessions".',
        confidenceScore: 96,
        severity: 'Critical'
      });
    }

    // 2. Vague / Subjective Words (Difficult to measure objectively)
    const vagueWords = ['easy', 'user-friendly', 'efficient', 'secure', 'reliable', 'sufficient', 'convenient', 'quickly', 'robust', 'seamless', 'good', 'simple', 'smooth', 'well', 'promptly', 'flexible', 'intuitive'];
    const foundVague = vagueWords.filter(w => new RegExp(`\\b${w}\\b`, 'i').test(lower));
    if (foundVague.length > 0) {
      issues.push({
        id: `ISS-${reqId}-02`,
        code: 'DEF-02',
        type: 'Vague / Subjective Words',
        problem: `Vague terminology detected: "${foundVague.join(', ')}" cannot be objectively validated.`,
        reason: 'Subjective buzzwords violate ISO/IEC/IEEE 29148 testability rules. Acceptance testing cannot verify "user-friendly" without defined metrics.',
        suggestedCorrection: 'Define measurable usability criteria such as "task completion rate >= 95% with a maximum of 3 navigation steps".',
        confidenceScore: 94,
        severity: 'High'
      });
    }

    // 3. Incomplete Requirements (Missing vital dimensions)
    const isNotificationOrProcess = lower.includes('notification') || lower.includes('send alert') || lower.includes('notify') || lower.includes('send email') || lower.includes('send sms');
    const hasRecipient = lower.includes('passenger') || lower.includes('user') || lower.includes('admin') || lower.includes('customer') || lower.includes('student') || lower.includes('recipient') || lower.includes('client');
    const hasTrigger = lower.includes('when') || lower.includes('after') || lower.includes('upon') || lower.includes('if') || lower.includes('on ');
    const hasChannel = lower.includes('sms') || lower.includes('email') || lower.includes('push') || lower.includes('webhook') || lower.includes('in-app');
    if (isNotificationOrProcess && (!hasRecipient || !hasTrigger || !hasChannel)) {
      const missing: string[] = [];
      if (!hasRecipient) missing.push('✓ Recipient Role');
      if (!hasTrigger) missing.push('✓ Trigger Condition');
      if (!hasChannel) missing.push('✓ Notification Channel');
      missing.push('✓ Content Payload Definition');

      issues.push({
        id: `ISS-${reqId}-03`,
        code: 'DEF-03',
        type: 'Incomplete Requirement',
        problem: 'Incomplete Requirement: Statement does not provide enough operational detail to implement.',
        missingElements: missing,
        reason: 'Software engineers cannot build the notification dispatcher without recipient targeting, channel protocol, and trigger criteria.',
        suggestedCorrection: 'Specify recipient role (e.g. passenger), trigger event (e.g. 30 mins before arrival), channel (SMS/Push), and notification message schema.',
        confidenceScore: 93,
        severity: 'High'
      });
    }

    // 4. Missing Non-Functional Requirements (Companion NFR gap)
    const isCoreAction = (lower.includes('book') || lower.includes('order') || lower.includes('checkout') || 
                          lower.includes('transfer') || lower.includes('submit') || lower.includes('register') || lower.includes('login')) && category === 'Functional';
    if (isCoreAction && !hasNumericalTime && !lower.includes('encrypt') && !lower.includes('auth')) {
      issues.push({
        id: `ISS-${reqId}-04`,
        code: 'DEF-04',
        type: 'Missing Non-Functional Requirement',
        problem: 'Companion Non-Functional Requirements (NFRs) missing for critical transaction flow.',
        missingElements: [
          '⚠ Performance requirement missing (< 1.5s latency)',
          '⚠ Security requirement missing (TLS 1.3 & Auth)',
          '⚠ Availability requirement missing (99.9% uptime)'
        ],
        reason: 'Functional requirements without companion performance and security NFRs lead to production bottlenecks and security audits failure.',
        suggestedCorrection: 'Couple this functional requirement with explicit NFR benchmarks: response latency < 1.2s, 99.95% uptime, and TLS 1.3 encryption.',
        confidenceScore: 90,
        severity: 'Medium'
      });
    }

    // 5. Non-Verifiable / Non-Testable Requirements
    const nonTestableWords = ['highly secure', 'attractive', 'bug-free', 'never fail', '100% reliable', 'optimal', 'best in class', 'instantaneous'];
    const foundNonTestable = nonTestableWords.find(w => lower.includes(w));
    if (foundNonTestable) {
      issues.push({
        id: `ISS-${reqId}-05`,
        code: 'DEF-05',
        type: 'Non-Verifiable / Non-Testable',
        problem: `Not objectively verifiable: Contains non-testable phrase "${foundNonTestable}".`,
        reason: 'QA engineers cannot write automated pass/fail unit assertions for qualitative superlatives like "highly secure" (ISO/IEC/IEEE 29148).',
        suggestedCorrection: 'Define explicit verifiable threshold: "The system shall lock an account after 5 consecutive failed login attempts within 15 minutes and log SHA-256 audit events".',
        confidenceScore: 95,
        severity: 'Critical'
      });
    }

    // 6. Inconsistency / Contradiction (Cross-requirement conflict detection)
    if (allLines.length > 1) {
      allLines.forEach((otherLine, otherIdx) => {
        if (otherIdx === reqIndex) return;
        const otherLower = otherLine.toLowerCase();

        // Time limit contradiction (e.g., 2 hours vs 4 hours cancellation)
        const hourMatchA = lower.match(/(\d+)\s*(hours?|hrs?|minutes?|mins?)\s*(before|prior)/i);
        const hourMatchB = otherLower.match(/(\d+)\s*(hours?|hrs?|minutes?|mins?)\s*(before|prior)/i);
        if (hourMatchA && hourMatchB && hourMatchA[1] !== hourMatchB[1] && 
            (lower.includes('cancel') || lower.includes('refund')) && (otherLower.includes('cancel') || otherLower.includes('refund'))) {
          issues.push({
            id: `ISS-${reqId}-06`,
            code: 'DEF-06',
            type: 'Inconsistency / Contradiction',
            problem: `Potential contradiction detected with REQ-${String(otherIdx + 1).padStart(2, '0')}: Conflicting time limit (${hourMatchA[0]} vs ${hourMatchB[0]}).`,
            relatedReqId: `REQ-${String(otherIdx + 1).padStart(2, '0')}`,
            reason: 'Conflicting cancellation policies or operational timeframes violate IEEE consistency constraints.',
            suggestedCorrection: `Align cancellation policy between REQ-${String(reqIndex + 1).padStart(2, '0')} and REQ-${String(otherIdx + 1).padStart(2, '0')} to a single agreed standard (e.g. up to ${hourMatchA[1]} hours prior to departure).`,
            confidenceScore: 97,
            severity: 'Critical'
          });
        }

        // Offline vs Real-time cloud sync contradiction
        if ((lower.includes('offline') && otherLower.includes('real-time cloud sync')) || 
            (lower.includes('guest checkout without') && otherLower.includes('mandatory user registration'))) {
          issues.push({
            id: `ISS-${reqId}-06b`,
            code: 'DEF-06',
            type: 'Inconsistency / Contradiction',
            problem: `Architectural policy clash detected with REQ-${String(otherIdx + 1).padStart(2, '0')}.`,
            relatedReqId: `REQ-${String(otherIdx + 1).padStart(2, '0')}`,
            reason: 'Operating modes (offline vs real-time or guest vs registered) conflict in session and state management.',
            suggestedCorrection: `Decouple flows into distinct online vs offline operating modes with clear fallback boundaries.`,
            confidenceScore: 92,
            severity: 'High'
          });
        }
      });
    }

    // 7. Duplicate / Redundant Requirements (Semantic overlap > 70%)
    if (allLines.length > 1) {
      allLines.forEach((otherLine, otherIdx) => {
        if (otherIdx <= reqIndex) return; // avoid duplicate duplicate-reports
        const wordsA = new Set(lower.split(/\s+/).filter(w => w.length > 3));
        const wordsB = new Set(otherLine.toLowerCase().split(/\s+/).filter(w => w.length > 3));
        const intersection = [...wordsA].filter(w => wordsB.has(w));
        const similarity = Math.round((intersection.length / Math.max(wordsA.size, wordsB.size, 1)) * 100);

        if (similarity >= 65) {
          issues.push({
            id: `ISS-${reqId}-07`,
            code: 'DEF-07',
            type: 'Duplicate / Redundant Requirement',
            problem: `Possible duplicate / redundant requirement with REQ-${String(otherIdx + 1).padStart(2, '0')} (Semantic similarity: ${similarity}%).`,
            relatedReqId: `REQ-${String(otherIdx + 1).padStart(2, '0')}`,
            reason: 'Both statements describe essentially the same system capability. Duplicate requirements inflate maintenance effort.',
            suggestedCorrection: `Consider merging REQ-${String(reqIndex + 1).padStart(2, '0')} and REQ-${String(otherIdx + 1).padStart(2, '0')} into a single unified specification.`,
            confidenceScore: 89,
            severity: 'Medium'
          });
        }
      });
    }

    // 8. Non-Atomic Requirements (Bundling multiple independent features)
    const verbList = ['book', 'cancel', 'receive', 'make payment', 'download', 'upload', 'edit', 'delete', 'notify', 'search', 'authenticate', 'generate'];
    const matchedVerbs = verbList.filter(v => lower.includes(v));
    const commaCount = (text.match(/,/g) || []).length;
    if (matchedVerbs.length >= 3 || (commaCount >= 3 && lower.includes(' and '))) {
      const decomposition = matchedVerbs.slice(0, 5).map((v, i) => `REQ-0${i + 1} → ${v.charAt(0).toUpperCase() + v.slice(1)} capability`);
      issues.push({
        id: `ISS-${reqId}-08`,
        code: 'DEF-08',
        type: 'Non-Atomic Requirement',
        problem: `Non-atomic requirement: Contains ${matchedVerbs.length} independent actions bundled into a single statement.`,
        suggestedDecomposition: decomposition,
        reason: 'Composite requirements cannot be independently tested, estimated in story points, or assigned separate release milestones (IEEE 830 Clause 4.3.5).',
        suggestedCorrection: `Decompose into distinct atomic requirements: ${decomposition.join('; ')}.`,
        confidenceScore: 93,
        severity: 'High'
      });
    }

    // 9. Missing Actors / Stakeholders (Passive voice or missing subject)
    const hasActor = lower.includes('system') || lower.includes('user') || lower.includes('passenger') || 
                     lower.includes('admin') || lower.includes('student') || lower.includes('doctor') || 
                     lower.includes('patient') || lower.includes('customer') || lower.includes('service') || lower.includes('engine');
    if (!hasActor || (lower.startsWith('shall generate') || lower.startsWith('reports will') || lower.startsWith('data must be'))) {
      issues.push({
        id: `ISS-${reqId}-09`,
        code: 'DEF-09',
        type: 'Missing Actor / Stakeholder',
        problem: 'Actor ambiguity: The requirement does not clearly identify who performs or triggers the action.',
        reason: 'Untraceable operational authority: developers cannot assign authorization permissions or UI roles without an explicit actor.',
        suggestedCorrection: 'Specify the primary subject (e.g., "The Administrator shall generate analytical reports", "The System shall dispatch alerts").',
        confidenceScore: 91,
        severity: 'Medium'
      });
    }

    // 10. Missing Conditions / Triggers
    const actionNeedsTrigger = (lower.includes('send an alert') || lower.includes('trigger backup') || lower.includes('send notification')) && !hasTrigger;
    if (actionNeedsTrigger) {
      issues.push({
        id: `ISS-${reqId}-10`,
        code: 'DEF-10',
        type: 'Missing Condition / Trigger',
        problem: 'Missing trigger condition: Describes an action but not when or under what circumstance it happens.',
        reason: 'Automated event triggers must state explicit threshold or lifecycle event triggers to avoid infinite loops or missing dispatches.',
        suggestedCorrection: 'Define the trigger event: e.g., "Send an alert when train delay exceeds 15 minutes / disk usage exceeds 85%".',
        confidenceScore: 92,
        severity: 'Medium'
      });
    }

    // 11. Missing Inputs and Outputs
    const hasCalculate = lower.includes('calculate') || lower.includes('compute') || lower.includes('generate fare') || lower.includes('estimate');
    const hasDeclaredInputs = lower.includes('input') || lower.includes('based on') || lower.includes('from ') || lower.includes('using ');
    if (hasCalculate && !hasDeclaredInputs) {
      issues.push({
        id: `ISS-${reqId}-11`,
        code: 'DEF-11',
        type: 'Missing Inputs and Outputs',
        problem: 'Missing input parameters and output schema for computational logic.',
        missingElements: [
          'Inputs: Source location, destination, travel class, passenger type',
          'Output: Total calculated fare with tax breakdown'
        ],
        reason: 'Algorithms cannot be written or validated without explicitly typed input parameters and return data contracts.',
        suggestedCorrection: 'Explicitly specify inputs (source, destination, class, passenger type) and output return structure (total fare currency breakdown).',
        confidenceScore: 90,
        severity: 'Medium'
      });
    }

    // 12. Unclear Quantitative Constraints
    const numberMatches = text.match(/\b\d{2,}\b/);
    const hasContext = lower.includes('concurrent') || lower.includes('per second') || lower.includes('total') || lower.includes('within') || lower.includes('milliseconds');
    if (numberMatches && !hasContext && !lower.includes('year') && !lower.includes('date')) {
      issues.push({
        id: `ISS-${reqId}-12`,
        code: 'DEF-12',
        type: 'Unclear Quantitative Constraint',
        problem: `Constraint requires clarification: "${numberMatches[0]}" lacks operational context (concurrent users vs total accounts? over what period?).`,
        reason: 'Isolated numbers without capacity, throughput, or duration units cause mismatched server provisioning.',
        suggestedCorrection: `Clarify quantitative context: e.g. "sustain ${numberMatches[0]} concurrent active users during peak hours with average response time < 1.0s".`,
        confidenceScore: 88,
        severity: 'Medium'
      });
    }

    // 13. Security Gaps
    const involvesCredentialsOrData = lower.includes('email') || lower.includes('login') || lower.includes('account') || 
                                     lower.includes('password') || lower.includes('credit card') || lower.includes('payment');
    const hasSecurityGuards = lower.includes('encrypt') || lower.includes('mfa') || lower.includes('hash') || lower.includes('tls') || lower.includes('oauth');
    if (involvesCredentialsOrData && !hasSecurityGuards) {
      issues.push({
        id: `ISS-${reqId}-13`,
        code: 'DEF-13',
        type: 'Security Gap',
        problem: 'Security control gaps detected: Sensitive identity or transaction workflow lacks explicit protection controls.',
        missingElements: [
          '✓ Mandatory Multi-Factor Authentication (MFA)',
          '✓ TLS 1.3 transport encryption',
          '✓ Password hashing via bcrypt (work factor >= 12)',
          '✓ Rate-limiting after 5 failed login attempts'
        ],
        reason: 'Handling user credentials or accounts without stated security controls triggers high-severity cybersecurity audit defects.',
        suggestedCorrection: 'Incorporate security controls: password hashing (bcrypt), TLS 1.3 encryption, and account lockout after 5 consecutive failures.',
        confidenceScore: 94,
        severity: 'High'
      });
    }

    // 14. Performance Gaps
    const isHighTraffic = (lower.includes('process booking') || lower.includes('search') || lower.includes('query') || lower.includes('load catalog')) && !hasNumericalTime;
    if (isHighTraffic) {
      issues.push({
        id: `ISS-${reqId}-14`,
        code: 'DEF-14',
        type: 'Performance Gap',
        problem: 'Performance gap: Missing maximum acceptable response time, throughput, and concurrent user bounds.',
        reason: 'User satisfaction and load testing require exact millisecond SLAs under defined concurrent user volumes.',
        suggestedCorrection: 'Define explicit SLA: "The system shall process requests within 1.2 seconds under a peak load of 50,000 concurrent active users".',
        confidenceScore: 92,
        severity: 'High'
      });
    }

    // 15. Feasibility / Unrealistic Constraints
    if (lower.includes('instant') || lower.includes('0ms') || lower.includes('zero delay') || lower.includes('100% uptime') || lower.includes('never crash')) {
      issues.push({
        id: `ISS-${reqId}-15`,
        code: 'DEF-15',
        type: 'Feasibility / Unrealistic Constraint',
        problem: 'Potential feasibility concern: Claiming instantaneous execution or 100% uptime is technically questionable.',
        reason: 'Physical network propagation and server latency prevent 0ms zero-latency execution. SLA promises must be achievable.',
        suggestedCorrection: 'Define an achievable engineering target: e.g. "p99 response latency <= 250ms with 99.95% availability SLA".',
        confidenceScore: 95,
        severity: 'High'
      });
    }

    // 16. Missing Business Rules
    if ((lower.includes('cancel') || lower.includes('refund') || lower.includes('discount')) && !lower.includes('fee') && !lower.includes('cutoff') && !lower.includes('policy')) {
      issues.push({
        id: `ISS-${reqId}-16`,
        code: 'DEF-16',
        type: 'Missing Business Rule',
        problem: 'Missing business rules: Cancellation or refund parameters lack cutoff timing, fee structures, or refund SLAs.',
        reason: 'Commercial domain operations require explicit business logic to resolve refund amounts and operational time gates.',
        suggestedCorrection: 'Define business rules: "Users can cancel an order up to 2 hours prior to dispatch with a 10% fee; refunds will process within 24 hours".',
        confidenceScore: 91,
        severity: 'Medium'
      });
    }

    // 17. Missing Error / Exception Handling
    if ((lower.includes('payment') || lower.includes('checkout') || lower.includes('transfer') || lower.includes('sync')) && !lower.includes('fail') && !lower.includes('error') && !lower.includes('timeout')) {
      issues.push({
        id: `ISS-${reqId}-17`,
        code: 'DEF-17',
        type: 'Missing Error / Exception Handling',
        problem: 'Exception handling requirement missing: Describes only the happy path without handling failures or timeouts.',
        missingElements: [
          '⚠ Gateway timeout handling',
          '⚠ Network disconnect fallback state',
          '⚠ Automated transaction rollback & customer alert'
        ],
        reason: 'Mission-critical transactions must specify behavior when network drops or third-party webhooks fail.',
        suggestedCorrection: 'Add exception handling: "If payment times out after 30 seconds or network disconnects, roll back transaction and alert user with retry token".',
        confidenceScore: 92,
        severity: 'Medium'
      });
    }

    // 18. Dependency Detection
    if (lower.includes('payment') || lower.includes('download ticket') || lower.includes('generate invoice') || lower.includes('print')) {
      issues.push({
        id: `ISS-${reqId}-18`,
        code: 'DEF-18',
        type: 'Dependency Detection',
        problem: 'Workflow dependency identified: Upstream validation prerequisites required.',
        reason: 'Generating tickets or invoices strictly depends on preceding authentication and confirmed payment authorization.',
        suggestedCorrection: 'Maintain bi-directional RTM traceability linking this requirement to upstream authentication and payment confirmation.',
        confidenceScore: 88,
        severity: 'Low'
      });
    }

    const ieeeRewrite = AIEngine.generateContextualIEEERewrite(text, domain, issues);

    return {
      issues,
      ieeeRewrite,
      category,
      priority
    };
  }

  static analyzeQuality(text: string): QualityIssue[] {
    const analysis = AIEngine.analyze20Problems(text);
    return analysis.issues;
  }

  /**
   * Context-Aware IEEE 830 / ISO 29148 Standard Rewriter
   * Extracts domain context, entities, verbs, and intent from the raw requirement,
   * replacing subjective phrases with concrete, verifiable engineering benchmarks.
   * Handles ANY domain — predefined or custom user-defined.
   */
  static generateContextualIEEERewrite(raw: string, domain: string = 'General', issues: QualityIssue[] = []): string {
    const rawTrimmed = raw.trim();
    if (!rawTrimmed) return 'The system shall perform the specified operation within defined SLA boundaries.';
    const lower = rawTrimmed.toLowerCase();
    const domainLower = (domain || 'General').toLowerCase().trim();

    // 1. Domain-Aware Actor Resolution (handles custom domains via clean naming)
    const toServiceName = (d: string): string => {
      const clean = d.replace(/[^a-zA-Z0-9\s]/g, '').trim();
      // Avoid duplicate "system" or "service" words in actor
      if (/system$/i.test(clean) || /platform$/i.test(clean)) return `The ${clean.toLowerCase()} module`;
      if (/service$/i.test(clean) || /engine$/i.test(clean)) return `The ${clean.toLowerCase()}`;
      return `The ${clean.toLowerCase()} processing service`;
    };

    let actor = 'The system';
    if (lower.includes('passenger') || domainLower.includes('railway') || lower.includes('pnr') || lower.includes('train') || lower.includes('ticket')) {
      actor = 'The railway reservation engine';
    } else if (lower.includes('student') || lower.includes('quiz') || lower.includes('exam') || lower.includes('proctor') || domainLower.includes('education') || domainLower.includes('quiz')) {
      actor = 'The examination proctoring service';
    } else if (lower.includes('patient') || lower.includes('doctor') || lower.includes('clinical') || domainLower.includes('hospital') || domainLower.includes('health') || domainLower.includes('medical')) {
      actor = 'The clinical health information system';
    } else if (lower.includes('customer') || lower.includes('cart') || lower.includes('order') || lower.includes('product') || domainLower.includes('commerce') || domainLower.includes('retail') || domainLower.includes('shopping')) {
      actor = 'The e-commerce transaction service';
    } else if (lower.includes('bank') || lower.includes('transfer') || lower.includes('payment') || lower.includes('finance') || domainLower.includes('banking') || domainLower.includes('fintech') || domainLower.includes('payment')) {
      actor = 'The core payment processing kernel';
    } else if (lower.includes('auth') || lower.includes('login') || lower.includes('password') || lower.includes('token') || lower.includes('credential') || domainLower.includes('auth') || domainLower.includes('identity')) {
      actor = 'The identity and authentication provider';
    } else if (lower.includes('admin') || lower.includes('manager') || lower.includes('dashboard') || domainLower.includes('admin')) {
      actor = 'The administrative management console';
    } else if (lower.includes('sensor') || lower.includes('device') || lower.includes('iot') || domainLower.includes('iot') || domainLower.includes('smart home')) {
      actor = 'The IoT device management platform';
    } else if (lower.includes('disaster') || lower.includes('emergency') || lower.includes('rescue') || domainLower.includes('disaster') || domainLower.includes('emergency')) {
      actor = 'The emergency response coordination system';
    } else if (lower.includes('report') || lower.includes('analytics') || lower.includes('dashboard') || domainLower.includes('analytics') || domainLower.includes('reporting')) {
      actor = 'The analytics and reporting engine';
    } else if (lower.includes('notification') || lower.includes('alert') || lower.includes('message') || domainLower.includes('notification')) {
      actor = 'The notification dispatch service';
    } else if (domain && domain !== 'General' && domain !== 'General Software System') {
      // Smart custom domain: produce grammatically clean actor name
      actor = toServiceName(domain);
    }

    // 2. High-precision semantic transformations for recognized patterns
    if (lower.includes('fast ticket booking') || (lower.includes('fast') && lower.includes('booking'))) {
      return `${actor} shall process concurrent ticket reservation transactions within 1.5 seconds under a peak concurrency load of 50,000 active sessions, returning a validated booking reference and itemized cost receipt.`;
    }
    if (lower.includes('user-friendly') || lower.includes('easy to use') || lower.includes('easy to navigate')) {
      return `The user interface module shall enable authenticated users to complete primary ${domainLower !== 'general' ? domainLower + ' ' : ''}workflows with a measured task completion rate >= 95% in <= 3 interaction steps, without requiring external training or documentation.`;
    }
    if (lower.includes('send notification') || lower.includes('send an alert') || lower.includes('send alert') || lower.includes('email notification')) {
      return `${actor} shall deliver automated multi-channel notifications (SMS, email, push) to verified recipient endpoints within 30 seconds of confirmed event triggers, with delivery acknowledgment logged in the audit trail.`;
    }
    if (lower.includes('cancel') && (lower.includes('ticket') || lower.includes('order') || lower.includes('booking') || lower.includes('reservation'))) {
      const hours = (lower.match(/(\d+)\s*(hours?|hrs?)/i) || [])[1] || '2';
      return `${actor} shall permit authenticated users to initiate cancellation requests up to ${hours} hours prior to the scheduled event, computing applicable refund deductions per policy and crediting verified amounts within 24 hours.`;
    }
    if ((lower.includes('secure') || lower.includes('data protection') || lower.includes('protect')) && !lower.includes('process')) {
      return `${actor} shall enforce end-to-end TLS 1.3 encryption in transit, store sensitive credentials using salted bcrypt hashes (work factor >= 12), and encrypt all persisted data at rest using AES-256 with quarterly key rotation.`;
    }
    if (lower.includes('calculate') && (lower.includes('fare') || lower.includes('price') || lower.includes('cost') || lower.includes('total'))) {
      return `${actor} shall compute the total transaction amount incorporating applicable discounts, taxes, and dynamic pricing multipliers, returning an itemized cost breakdown to the client within 250 milliseconds.`;
    }
    if (lower.includes('support') && (lower.includes('users') || lower.includes('traffic') || lower.includes('concurrent') || lower.includes('load'))) {
      const numMatch = rawTrimmed.match(/\b\d{2,}\b/);
      const num = numMatch ? numMatch[0] : '10,000';
      return `${actor} shall sustain a throughput of ${num} concurrent active sessions with average API response latency < 1.2 seconds at p95 and a minimum 99.95% service availability SLA under peak load conditions.`;
    }
    if (lower.includes('prevent cheating') || lower.includes('proctoring') || lower.includes('anti-cheat') || lower.includes('detect tab')) {
      return `${actor} shall monitor real-time browser focus state, log all unauthorized window-switch events with timestamps, and automatically terminate the active session after 3 consecutively verified violations.`;
    }
    if (lower.includes('make payment') || lower.includes('process payment') || lower.includes('checkout') || lower.includes('initiate payment')) {
      return `${actor} shall execute payment transactions via PCI-DSS Level 1 compliant gateways within 3.0 seconds, triggering an automated transactional rollback with error logging if gateway confirmation is not received within 30 seconds.`;
    }
    if (lower.includes('generate report') || lower.includes('create report') || lower.includes('export report')) {
      return `${actor} shall generate and deliver paginated ${domainLower !== 'general' ? domainLower + ' ' : ''}analytical reports in PDF and CSV formats within 5 seconds for datasets up to 100,000 records, with configurable date range, grouping, and filter parameters.`;
    }
    if (lower.includes('upload') || lower.includes('import') || lower.includes('ingest')) {
      return `${actor} shall accept file uploads of up to 50 MB in supported formats, validate structural integrity and schema compliance within 2 seconds, and persist records to the database with a transaction-level consistency guarantee.`;
    }
    if (lower.includes('search') || lower.includes('find') || lower.includes('query') || lower.includes('filter')) {
      return `${actor} shall execute full-text and parameterized search queries across the ${domainLower !== 'general' ? domainLower + ' ' : ''}dataset and return ranked, paginated results within 800 milliseconds for collections up to 1,000,000 records.`;
    }
    if (lower.includes('backup') || lower.includes('recovery') || lower.includes('restore')) {
      return `${actor} shall perform automated incremental backups every 6 hours, maintain a Recovery Point Objective (RPO) of <= 1 hour, and guarantee a Recovery Time Objective (RTO) of <= 4 hours with verified restoration integrity.`;
    }
    if (lower.includes('log') || lower.includes('audit') || lower.includes('track')) {
      return `${actor} shall record all user-initiated actions, system state transitions, and API access events in an append-only, tamper-evident audit log, retaining entries for a minimum of 90 days with sub-100ms write latency.`;
    }

    // 3. Dynamic Quantifier Synthesizer — Ensures rewrite is NEVER identical to raw input
    let coreClause = rawTrimmed
      .replace(/^(the\s+system\s+(should|must|needs\s+to|shall|will)|we\s+need\s+to|please\s+(ensure|make\s+sure(\s+to)?)|the\s+app\s+should|users?\s+(can|should|must|shall))\s+/i, '')
      .replace(/^(it\s+should|it\s+must|it\s+shall)\s+/i, '')
      .replace(/\s+/g, ' ')
      .trim();

    // Remove redundant leading "to "
    coreClause = coreClause.replace(/^to\s+/i, '');

    // Replace subjective/vague terms with quantified engineering criteria
    coreClause = coreClause
      .replace(/\b(fast(?:er)?|quickly|swiftly|rapidly|in real[- ]?time)\b/gi, 'within 1.5 seconds under standard production load')
      .replace(/\b(user-friendly|easy[\s-]to[\s-]use|simple[\s-]to[\s-]use|convenient|intuitive|simple)\b/gi, 'with a task completion rate >= 95% in <= 3 interaction steps')
      .replace(/\b(reliable|reliably|always available)\b/gi, 'maintaining a 99.95% operational uptime SLA')
      .replace(/\b(secure|securely|safe|safely)\b/gi, 'enforcing TLS 1.3 encryption and role-based access control (RBAC)')
      .replace(/\b(efficient(?:ly)?|optimized|scalable)\b/gi, 'with CPU utilization <= 35% and memory footprint <= 200 MB under peak load')
      .replace(/\b(sufficient(?:ly)?|adequate(?:ly)?|enough)\b/gi, 'meeting the minimum threshold as defined in project specifications')
      .replace(/\b(immediately|instant(?:ly)?|at once|right away)\b/gi, 'within 500 milliseconds')
      .replace(/\b(good|well|properly|correctly)\b/gi, 'in compliance with ISO/IEC/IEEE 29148 acceptance criteria')
      .replace(/\b(large|huge|massive|significant)\b/gi, 'exceeding the defined capacity threshold')
      .replace(/\b(small|minimal|minor)\b/gi, 'within the defined minimum resource boundary');

    // Ensure it starts with lowercase (since "actor shall ..." prefix follows)
    if (coreClause.length > 0) {
      coreClause = coreClause.charAt(0).toLowerCase() + coreClause.slice(1);
    }

    // Strip trailing period before we add the full construction
    coreClause = coreClause.replace(/\.$/, '').trim();

    // Build formal IEEE 830 construction
    let synthesized = `${actor} shall ${coreClause}`;

    // Ensure ending period
    if (!synthesized.endsWith('.')) {
      synthesized += '.';
    }

    // Append NFR qualifications based on detected issue types
    if (issues.some(i => i.type?.includes('Error') || i.code === 'DEF-17') && !synthesized.includes('rollback') && !synthesized.includes('timeout')) {
      synthesized = synthesized.replace(/\.$/, ', initiating automated rollback and logging structured error traces if the operation fails to complete within 30 seconds.');
    } else if (issues.some(i => i.type?.includes('NFR') || i.code === 'DEF-04') && !synthesized.includes('SLA') && !synthesized.includes('second')) {
      synthesized = synthesized.replace(/\.$/, ', with a verified sub-second API response latency and 99.9% minimum service availability SLA.');
    } else if (!synthesized.includes('second') && !synthesized.includes('%') && !synthesized.includes('ms')) {
      // If no quantification was injected, add a domain-aware performance postfix
      const perfPostfix = domainLower.includes('report') || domainLower.includes('analytics')
        ? ', delivering results within 5 seconds for standard dataset sizes.'
        : ', with operations completing within 1.5 seconds under nominal production load.';
      synthesized = synthesized.replace(/\.$/, perfPostfix);
    }

    // Final safety: If synthesized exactly matches the raw input (no transformation happened), force a unique IEEE form
    if (synthesized.trim().toLowerCase() === rawTrimmed.toLowerCase() || synthesized.length < 20) {
      synthesized = `${actor} shall execute the specified ${domainLower !== 'general' ? domainLower + ' ' : ''}operation — ${coreClause || rawTrimmed.toLowerCase()} — within 1.5 seconds under standard production concurrency, adhering to IEEE Std 830 verifiability and completeness criteria.`;
    }

    return synthesized;
  }

  static generateIEEEText(raw: string): string {
    return AIEngine.generateContextualIEEERewrite(raw);
  }

  /**
   * Dynamic Domain Recommendations Generator
   * Returns tailored recommendations for existing domains or dynamically synthesizes
   * comprehensive domain specifications for ANY new/custom domain.
   */
  static getDomainRecommendations(domain: string): RecommendedRequirement[] {
    if (DOMAIN_RECOMMENDATIONS[domain]) {
      const specific = DOMAIN_RECOMMENDATIONS[domain];
      const combined = [...specific, ...DEFAULT_DOMAIN_RECOMMENDATIONS];
      return combined.map((rec, i) => ({
        id: `REC-${domain.substring(0, 3).toUpperCase()}-${i + 1}`,
        ...rec,
        selected: false
      }));
    }

    // Dynamically synthesize recommendations for new custom domains
    return AIEngine.getDynamicDomainRecommendations(domain);
  }

  static getDynamicDomainRecommendations(domain: string): RecommendedRequirement[] {
    const cleanDomain = domain.trim() || 'Software System';
    const prefix = cleanDomain.substring(0, 3).toUpperCase();

    return [
      {
        id: `REC-${prefix}-01`,
        category: 'Functional',
        title: `${cleanDomain} Core Workflow & Processing Engine`,
        description: `The system shall execute core ${cleanDomain.toLowerCase()} operational transactions, state transitions, and validation rules with real-time audit event logging.`,
        domain: cleanDomain,
        selected: false
      },
      {
        id: `REC-${prefix}-02`,
        category: 'Non-functional',
        title: `High-Throughput SLA & Sub-Second Response Latency`,
        description: `The system shall process ${cleanDomain.toLowerCase()} user requests within 1.2 seconds under a peak concurrency load of up to 10,000 active sessions with 99.95% availability.`,
        domain: cleanDomain,
        selected: false
      },
      {
        id: `REC-${prefix}-03`,
        category: 'Technical',
        title: `AES-256 Encryption & Secure Data Sync API`,
        description: `The system shall encrypt all sensitive ${cleanDomain.toLowerCase()} records using AES-256 at rest and enforce TLS 1.3 with OAuth 2.0 token authentication for all API integrations.`,
        domain: cleanDomain,
        selected: false
      },
      {
        id: `REC-${prefix}-04`,
        category: 'System',
        title: `Automated Health Monitoring & Circuit Breaker Failover`,
        description: `The system shall monitor telemetry, processing queues, and database health metrics every 15 seconds, triggering automated failover and administrative alerts upon anomaly detection.`,
        domain: cleanDomain,
        selected: false
      },
      {
        id: `REC-${prefix}-05`,
        category: 'User',
        title: `Role-Based Stakeholder Dashboard & Analytical Reports`,
        description: `The system shall provide customized responsive dashboards with exportable PDF/CSV reports tailored to operational roles and end-users of the ${cleanDomain.toLowerCase()} platform.`,
        domain: cleanDomain,
        selected: false
      },
      {
        id: `REC-${prefix}-06`,
        category: 'Business',
        title: `Regulatory Compliance & Immutable Audit Log Matrix`,
        description: `The system shall maintain an immutable, timestamped audit ledger of all ${cleanDomain.toLowerCase()} transactions adhering to international industry governance standards.`,
        domain: cleanDomain,
        selected: false
      }
    ];
  }

  /**
   * Dynamic Cross-Requirement Conflict & Semantic Duplicate Detector
   * Analyzes the project's actual requirements to identify contradictions and redundancies.
   */
  static detectConflictsAndDuplicates(requirements: Requirement[], domain: string): import('../types').RequirementConflict[] {
    const conflicts: import('../types').RequirementConflict[] = [];
    let confId = 1;

    for (let i = 0; i < requirements.length; i++) {
      for (let j = i + 1; j < requirements.length; j++) {
        const reqA = requirements[i];
        const reqB = requirements[j];
        const lowerA = (reqA.description || '').toLowerCase();
        const lowerB = (reqB.description || '').toLowerCase();

        // Check 1: Cancellation / Timeframe Contradiction
        const matchA = lowerA.match(/(\d+)\s*(hours?|hrs?|minutes?|mins?)\s*(before|prior)/i);
        const matchB = lowerB.match(/(\d+)\s*(hours?|hrs?|minutes?|mins?)\s*(before|prior)/i);
        if (matchA && matchB && matchA[1] !== matchB[1] && (lowerA.includes('cancel') || lowerA.includes('refund')) && (lowerB.includes('cancel') || lowerB.includes('refund'))) {
          conflicts.push({
            id: `CONF-${String(confId++).padStart(2, '0')}`,
            reqAId: reqA.id,
            reqBId: reqB.id,
            titleA: reqA.title,
            titleB: reqB.title,
            conflictType: 'Time Limit',
            explanation: `${reqA.id} permits operation ${matchA[0]} whereas ${reqB.id} mandates ${matchB[0]}. This creates an operational policy contradiction.`,
            severity: 'High',
            suggestedResolution: `Reconcile the time limit between ${reqA.id} and ${reqB.id} into a single harmonized business rule (e.g., standardizing on ${matchA[0]}).`
          });
        }

        // Check 2: Offline Mode vs Real-time Continuous Cloud Sync
        if ((lowerA.includes('offline') && lowerB.includes('real-time')) || (lowerA.includes('real-time') && lowerB.includes('offline'))) {
          conflicts.push({
            id: `CONF-${String(confId++).padStart(2, '0')}`,
            reqAId: reqA.id,
            reqBId: reqB.id,
            titleA: reqA.title,
            titleB: reqB.title,
            conflictType: 'Feasibility',
            explanation: `${reqA.id} specifies disconnected offline operation while ${reqB.id} requires synchronous real-time cloud data updates.`,
            severity: 'High',
            suggestedResolution: 'Deploy a hybrid local sync model: buffer client transactions locally in IndexedDB and synchronize via background workers upon network reconnect.'
          });
        }

        // Check 3: Semantic Redundancy / Duplicate
        const wordsA = new Set(lowerA.split(/\s+/).filter(w => w.length > 3));
        const wordsB = new Set(lowerB.split(/\s+/).filter(w => w.length > 3));
        const intersection = [...wordsA].filter(w => wordsB.has(w));
        const similarity = Math.round((intersection.length / Math.max(wordsA.size, wordsB.size, 1)) * 100);

        if (similarity >= 65) {
          conflicts.push({
            id: `CONF-${String(confId++).padStart(2, '0')}`,
            reqAId: reqA.id,
            reqBId: reqB.id,
            titleA: reqA.title,
            titleB: reqB.title,
            conflictType: 'Business Rule',
            explanation: `${reqA.id} and ${reqB.id} share ${similarity}% semantic overlap and describe essentially duplicate capabilities.`,
            severity: 'Medium',
            suggestedResolution: `Merge ${reqA.id} and ${reqB.id} into a single consolidated requirement statement to eliminate redundant maintenance overhead.`
          });
        }
      }
    }

    return conflicts;
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
    const risks: RiskItem[] = [];
    let rId = 1;

    const issueReqs = requirements.filter(r => r.issues.length > 0);
    if (issueReqs.length > 0) {
      risks.push({
        id: `RSK-${String(rId++).padStart(2, '0')}`,
        title: 'Requirement Ambiguity & SLA Volatility Risk',
        category: 'Requirement Volatility',
        impact: 'High',
        probability: 'High',
        mitigation: 'Implement formal IEEE 830 acceptance criteria sign-offs and version snapshot locks.',
        affectedRequirementIds: issueReqs.slice(0, 4).map(r => r.id)
      });
    }

    const techReqs = requirements.filter(r => r.category === 'Technical' || r.category === 'Non-functional');
    if (techReqs.length > 0) {
      risks.push({
        id: `RSK-${String(rId++).padStart(2, '0')}`,
        title: 'Concurrency Bottleneck & Integration Latency',
        category: 'Dependency Issue',
        impact: 'High',
        probability: 'Medium',
        mitigation: 'Deploy connection pooling, circuit breaker pattern, and Redis cache layer with idempotent retries.',
        affectedRequirementIds: techReqs.slice(0, 4).map(r => r.id)
      });
    }

    const secReqs = requirements.filter(r => 
      r.issues.some(i => i.code === 'DEF-13' || i.type === 'Security Gap') || 
      r.description.toLowerCase().includes('auth') || 
      r.description.toLowerCase().includes('payment') || 
      r.description.toLowerCase().includes('security')
    );
    if (secReqs.length > 0) {
      risks.push({
        id: `RSK-${String(rId++).padStart(2, '0')}`,
        title: 'Security Control Gap & Identity Vulnerability Risk',
        category: 'Requirement Risk',
        impact: 'High',
        probability: 'Medium',
        mitigation: 'Mandate AES-256 encryption, TLS 1.3 certificate pinning, and multi-factor authentication.',
        affectedRequirementIds: secReqs.slice(0, 4).map(r => r.id)
      });
    }

    if (risks.length === 0) {
      risks.push({
        id: 'RSK-01',
        title: 'Scope Expansion & Baseline Volatility',
        category: 'Project Risk',
        impact: 'Medium',
        probability: 'Low',
        mitigation: 'Enforce baseline IEEE change control procedures and version history snapshots.',
        affectedRequirementIds: requirements.slice(0, 2).map(r => r.id)
      });
    }

    return risks;
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
    const ambiguousCount = requirements.filter(r => r.issues.some(i => 
      i.type === 'Ambiguous word' || i.type === 'Ambiguity' || i.type === 'Vague / Subjective Words' || i.code === 'DEF-01' || i.code === 'DEF-02'
    )).length;
    const missingActorCount = requirements.filter(r => r.issues.some(i => 
      i.type === 'Missing actor' || i.type === 'Missing Actor / Stakeholder' || i.code === 'DEF-09'
    )).length;

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
