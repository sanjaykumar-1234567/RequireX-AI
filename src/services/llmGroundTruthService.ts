import { GroundTruthBenchmark, LLMModelConfig, LLMEvalTaskMeta } from '../types/llmEvaluation';

export const EVALUATION_TASKS_CONFIG: LLMEvalTaskMeta[] = [
  {
    id: 'extraction',
    label: 'Requirement Extraction',
    category: 'Analysis',
    description: 'Identifies discrete, atomic specifications from raw unstructured stakeholder narratives.',
    academicMetric: 'Precision, Recall, F1-Score & Accuracy vs Ground-Truth Backlog',
    defaultWeight: 10
  },
  {
    id: 'classification',
    label: 'FR / NFR Classification',
    category: 'Analysis',
    description: 'Classifies extracted statements into Functional, Non-functional, Business, System, User & Technical types.',
    academicMetric: 'Multiclass Confusion Matrix, Macro-F1 & Category Precision',
    defaultWeight: 10
  },
  {
    id: 'ambiguity',
    label: 'Ambiguity Detection',
    category: 'Quality & Verification',
    description: 'Detects subjective buzzwords (e.g. quickly, robust, user-friendly) and proposes IEEE 830 measurable rewrites.',
    academicMetric: 'Ambiguity True Positive Rate & False Alarm Rate',
    defaultWeight: 10
  },
  {
    id: 'missing',
    label: 'Missing Requirement Discovery',
    category: 'Analysis',
    description: 'Discovers critical domain features omitted by stakeholders (e.g. refund logic, offline sync, error fallbacks).',
    academicMetric: 'Domain Recall Rate & Hallucination Penalty',
    defaultWeight: 8
  },
  {
    id: 'completeness',
    label: 'Completeness Analysis',
    category: 'Quality & Verification',
    description: 'Audits specifications for missing actors, boundary conditions, measurable metrics, and exception paths.',
    academicMetric: 'ISO/IEC/IEEE 29148 Completeness Index (0-100%)',
    defaultWeight: 8
  },
  {
    id: 'conflict',
    label: 'Conflict & Inconsistency Detection',
    category: 'Quality & Verification',
    description: 'Detects contradictory business rules, conflicting SLAs, and security vs performance trade-offs.',
    academicMetric: 'Contradiction Discovery Precision & Suggested Resolution Quality',
    defaultWeight: 9
  },
  {
    id: 'stories',
    label: 'User Story Synthesis',
    category: 'Synthesis & Agile',
    description: 'Synthesizes standard Connextra format user stories ("As a... I want to... So that...") with story points.',
    academicMetric: 'Agile Syntax Compliance & Business Value Alignment',
    defaultWeight: 7
  },
  {
    id: 'acceptance',
    label: 'Acceptance Criteria & Gherkin',
    category: 'Synthesis & Agile',
    description: 'Generates Given-When-Then BDD scenarios and testable acceptance checklists.',
    academicMetric: 'BDD Verifiability & Boundary Condition Coverage',
    defaultWeight: 7
  },
  {
    id: 'usecases',
    label: 'Textual Use Case Generation',
    category: 'Synthesis & Agile',
    description: 'Produces structured use cases complete with actors, preconditions, main flow, alternatives, and exceptions.',
    academicMetric: 'Cockburn Use Case Structural Completeness',
    defaultWeight: 7
  },
  {
    id: 'testcases',
    label: 'QA Test Case Generation',
    category: 'Quality & Verification',
    description: 'Generates multi-level QA test cases: Positive, Negative, Boundary, Security, and Concurrency test suites.',
    academicMetric: 'IEEE 829 Test Matrix Coverage & Fault Detection Rate',
    defaultWeight: 8
  },
  {
    id: 'risks',
    label: 'Risk & Volatility Identification',
    category: 'Analysis',
    description: 'Identifies probability, impact, risk exposure scores, and architectural mitigation strategies.',
    academicMetric: 'SEI Continuous Risk Management Coverage',
    defaultWeight: 7
  },
  {
    id: 'srs',
    label: 'IEEE SRS Section Generation',
    category: 'Synthesis & Agile',
    description: 'Generates formal IEEE 830-1998 Software Requirements Specification document sections.',
    academicMetric: 'IEEE 830 Sectional Coherence & Traceability Index',
    defaultWeight: 5
  },
  {
    id: 'structured',
    label: 'Structured Output Reliability',
    category: 'Reliability',
    description: 'Tests strict JSON schema enforcement, type adherence, missing field rates, and parsing robustness.',
    academicMetric: 'JSON Schema Validation Pass Rate & Zero-Error Rate (%)',
    defaultWeight: 4
  }
];

export const DEFAULT_LLM_MODELS: LLMModelConfig[] = [
  {
    id: 'gpt-4o',
    name: 'OpenAI GPT-4o',
    provider: 'OpenAI',
    modelId: 'gpt-4o',
    apiStatus: 'Demo / Mock Evaluation Mode',
    contextWindow: 128,
    costPer1kPrompt: 0.0025,
    costPer1kCompletion: 0.010,
    speedRating: 'Fast',
    color: '#00F0FF',
    borderColor: 'border-cyan-500/40',
    glowColor: 'shadow-neon-cyan'
  },
  {
    id: 'claude-3-5-sonnet',
    name: 'Anthropic Claude 3.5 Sonnet',
    provider: 'Anthropic',
    modelId: 'claude-3-5-sonnet-20241022',
    apiStatus: 'Demo / Mock Evaluation Mode',
    contextWindow: 200,
    costPer1kPrompt: 0.003,
    costPer1kCompletion: 0.015,
    speedRating: 'Medium',
    color: '#FF007F',
    borderColor: 'border-pink-500/40',
    glowColor: 'shadow-neon-red'
  },
  {
    id: 'gemini-1-5-pro',
    name: 'Google Gemini 1.5 Pro',
    provider: 'Google',
    modelId: 'gemini-1.5-pro',
    apiStatus: 'Demo / Mock Evaluation Mode',
    contextWindow: 1000,
    costPer1kPrompt: 0.00125,
    costPer1kCompletion: 0.005,
    speedRating: 'Medium',
    color: '#FFB800',
    borderColor: 'border-amber-400/40',
    glowColor: 'shadow-neon-yellow'
  },
  {
    id: 'llama-3-1-70b',
    name: 'Meta Llama 3.1 70B',
    provider: 'Meta',
    modelId: 'meta-llama/Llama-3.1-70B-Instruct',
    apiStatus: 'Demo / Mock Evaluation Mode',
    contextWindow: 128,
    costPer1kPrompt: 0.0006,
    costPer1kCompletion: 0.0008,
    speedRating: 'Fast',
    color: '#00FF88',
    borderColor: 'border-emerald-400/40',
    glowColor: 'shadow-neon-emerald'
  }
];

export const GROUND_TRUTH_DATASETS: Record<string, GroundTruthBenchmark> = {
  'Railway Reservation': {
    domain: 'Railway Reservation',
    domainName: 'NextGen Railway Reservation & PNR Tracking System',
    description: 'High-concurrency ticket reservation, berth allocation matrix, live PNR tracking, Tatkal rush handling, and automated refund management.',
    rawInputDocument: `
NextGen Railway Reservation System Requirements Brief:
The system should allow passengers to book tickets quickly without lag during Tatkal morning rush hours. Passengers must be able to check their real-time PNR booking status and track live train locations with coach layout previews. The system needs to calculate ticket fares dynamically and allocate berth classes based on age, gender, and passenger preferences. When a passenger cancels a ticket, the refund must be processed within 24 hours via payment gateway webhook callbacks, while waitlisted tickets should be auto-upgraded atomically. The mobile app and portal must be robust, easy to use, and protect passwords effectively. It should support concurrent access by up to 50,000 active sessions per minute and failover to multi-bank gateways if one bank server times out.
    `,
    expectedRequirements: [
      {
        id: 'REQ-01',
        title: 'Tatkal High-Concurrency Ticket Booking',
        description: 'The system shall sustain 50,000 concurrent ticket booking transactions per minute with sub-1.5 second API latency during peak Tatkal opening hours.',
        category: 'Non-functional'
      },
      {
        id: 'REQ-02',
        title: 'Real-Time PNR Status & Train Tracking',
        description: 'The system shall provide passengers real-time PNR booking status, coach layout visualization, and GPS train tracking updates with 99.9% uptime.',
        category: 'Functional'
      },
      {
        id: 'REQ-03',
        title: 'Automated Berth Allocation Algorithm',
        description: 'The system shall allocate berth positions dynamically using demographic rules (lower berths for senior citizens & pregnant women) and coach balance heuristics.',
        category: 'Functional'
      },
      {
        id: 'REQ-04',
        title: 'Payment Gateway Integration & Refund Processing',
        description: 'The system shall execute cancellation refunds through multi-bank gateway webhooks within 24 hours of ticket cancellation confirmation.',
        category: 'Technical'
      },
      {
        id: 'REQ-05',
        title: 'Waitlist Auto-Upgrade on Cancellation',
        description: 'The system shall auto-promote waitlisted passengers to confirmed status immediately when higher-priority cancellations occur.',
        category: 'Functional'
      },
      {
        id: 'REQ-06',
        title: 'Multi-Bank Failover & Circuit Breaker',
        description: 'The system shall automatically reroute payment traffic to a secondary bank gateway if the primary gateway response time exceeds 30 seconds.',
        category: 'Technical'
      },
      {
        id: 'REQ-07',
        title: 'User Authentication & Data Protection',
        description: 'The system shall hash passwords using Argon2id with salt factor >= 12 and enforce MFA for agent booking portal logins.',
        category: 'Non-functional',
        isAmbiguous: true,
        ambiguityReason: 'Input mentions "protect passwords effectively" without cryptographic standards.'
      }
    ],
    knownAmbiguities: [
      {
        phrase: 'book tickets quickly without lag',
        targetReqId: 'REQ-01',
        clarification: 'Replace subjective term "quickly" with "within 1.5 seconds under 50,000 concurrent transactions".'
      },
      {
        phrase: 'robust, easy to use, and protect passwords effectively',
        targetReqId: 'REQ-07',
        clarification: 'Specify ISO 9241 usability criteria and mandate Argon2id password hashing with TLS 1.3.'
      }
    ],
    knownMissingRequirements: [
      {
        title: 'Agent Bulk Booking Quota Rate-Limiter',
        category: 'Business',
        justification: 'Critical anti-scalping control required to prevent travel agents from exhausting Tatkal quotas.'
      },
      {
        title: 'Offline Ticket Validation for Ticket Examiners (TTE)',
        category: 'Technical',
        justification: 'Required for on-board ticket checking on moving trains passing through zero-connectivity zones.'
      }
    ],
    knownConflicts: [
      {
        reqAId: 'REQ-01',
        reqBId: 'REQ-04',
        reason: 'Synchronous 1.5s Tatkal booking SLA conflicts with third-party payment gateway 24-hour asynchronous reconciliation webhooks.',
        resolution: 'Decouple payment reconciliation into asynchronous message queue (Kafka/RabbitMQ) with immediate client token generation.',
        severity: 'High'
      }
    ],
    expectedTestTypes: ['Peak Concurrency Load Test', 'Berth Allocation Unit Test', 'Payment Failover Security Test', 'PNR Sync Boundary Test']
  },

  'E-Commerce': {
    domain: 'E-Commerce',
    domainName: 'Omni-Channel E-Commerce & Flash Sale Platform',
    description: 'High-scale retail catalog, cart reservation lock, PCI-DSS payment tokenization, inventory anti-overselling, and automated courier tracking.',
    rawInputDocument: `
Omni-Channel E-Commerce Platform Requirements:
The online store must provide fast product search and filtering across 1,000,000 SKUs. Customers can add items to cart and check out as guests or registered users. During high-traffic flash sales with 100,000 simultaneous shoppers, inventory must be updated in real time so we never oversell stock. The system should support all major credit cards, UPI, and digital wallets while keeping payment data completely secure. Orders should be dispatched via courier partners and customers must get push notifications. It should recommend products personalized to user purchase history.
    `,
    expectedRequirements: [
      {
        id: 'REQ-EC-01',
        title: 'Faceted Product Search & Catalog Indexing',
        description: 'The system shall execute multi-attribute search queries across 1,000,000 SKUs with search response latency < 300ms.',
        category: 'Functional'
      },
      {
        id: 'REQ-EC-02',
        title: 'Guest & Member Checkout Workflow',
        description: 'The system shall allow guest users to complete checkout using one-time email/SMS OTP verification.',
        category: 'Functional'
      },
      {
        id: 'REQ-EC-03',
        title: 'Real-Time Inventory Lock & Anti-Overselling',
        description: 'The system shall maintain Redis atomic inventory locks during flash sales with a 10-minute checkout TTL.',
        category: 'Technical'
      },
      {
        id: 'REQ-EC-04',
        title: 'PCI-DSS Level 1 Payment Tokenization',
        description: 'The system shall tokenize payment card credentials with zero storage of raw CVV or PAN numbers.',
        category: 'Non-functional'
      },
      {
        id: 'REQ-EC-05',
        title: 'Automated Courier Webhook Milestone Sync',
        description: 'The system shall ingest courier tracking status updates and dispatch customer push notifications within 60 seconds.',
        category: 'System'
      },
      {
        id: 'REQ-EC-06',
        title: 'Personalized Collaborative Recommendation Engine',
        description: 'The system shall generate personalized item recommendations using customer purchase vectors.',
        category: 'User'
      }
    ],
    knownAmbiguities: [
      {
        phrase: 'fast product search',
        targetReqId: 'REQ-EC-01',
        clarification: 'Specify Elasticsearch query response time < 300ms for 95th percentile requests.'
      },
      {
        phrase: 'keeping payment data completely secure',
        targetReqId: 'REQ-EC-04',
        clarification: 'Specify PCI-DSS 4.0 Level 1 compliance with AES-256 field-level encryption.'
      }
    ],
    knownMissingRequirements: [
      {
        title: 'Automated Return Merchandise Authorization (RMA) & Reverse Logistics',
        category: 'Functional',
        justification: 'Standard e-commerce necessity for processing returns, replacement pickups, and refund gates.'
      },
      {
        title: 'Tax & Regional GST / VAT Calculation Engine',
        category: 'Business',
        justification: 'Required for multi-state and international sales tax compliance.'
      }
    ],
    knownConflicts: [
      {
        reqAId: 'REQ-EC-02',
        reqBId: 'REQ-EC-06',
        reason: 'Guest checkout without account persistence prevents historical purchase-based collaborative filtering.',
        resolution: 'Use session-local browsing vector for guests, offering post-purchase account conversion incentives.',
        severity: 'Medium'
      }
    ],
    expectedTestTypes: ['Inventory Race Condition Test', 'PCI Tokenization Vulnerability Scan', 'Faceted Search Stress Test']
  },

  'Hospital Management': {
    domain: 'Hospital Management',
    domainName: 'Smart Healthcare & Hospital Management System',
    description: 'Electronic Health Records (EHR), HIPAA compliance, OPD token queue, doctor diagnosis, pharmacy inventory, and emergency ICU triage.',
    rawInputDocument: `
Hospital Management Information System Requirements:
The system must maintain electronic medical records for all patients securely adhering to data privacy standards. Doctors must be able to view patient medical history, prescribe medications, and order laboratory diagnostic tests. The outpatient department needs automated digital queue displays for consultation tokens. Patient diagnostic reports and doctor-patient chat should be fast and searchable. When doctors prescribe controlled medications, pharmacy stock should be deducted, but pharmacists must approve all dispensed drugs. ICU bed occupancy must be updated across wards in real time.
    `,
    expectedRequirements: [
      {
        id: 'REQ-HM-01',
        title: 'EHR Electronic Health Record Management',
        description: 'The system shall store centralized patient diagnostic reports, prescription histories, and allergies with immutable audit logs.',
        category: 'Functional'
      },
      {
        id: 'REQ-HM-02',
        title: 'HIPAA Data Privacy & PHI Encryption at Rest',
        description: 'The system shall encrypt all Protected Health Information (PHI) at rest using AES-256 and enforce role-based access control (RBAC).',
        category: 'Non-functional'
      },
      {
        id: 'REQ-HM-03',
        title: 'Automated OPD Token Queue & Digital Signage',
        description: 'The system shall calculate outpatient consultation waiting times and broadcast live token queues to mobile apps and displays.',
        category: 'System'
      },
      {
        id: 'REQ-HM-04',
        title: 'Doctor-Patient Teleconsultation & Searchable Chat',
        description: 'The system shall provide end-to-end encrypted medical chat with metadata-indexed message history search.',
        category: 'User'
      },
      {
        id: 'REQ-HM-05',
        title: 'Pharmacy Dispensation Gate & Inventory Deduction',
        description: 'The system shall require mandatory pharmacist digital sign-off before deducting medication inventory and dispensing drugs.',
        category: 'Business'
      },
      {
        id: 'REQ-HM-06',
        title: 'ICU Bed Availability & Emergency Triage Matrix',
        description: 'The system shall synchronize bed occupancy across emergency, ICU, and general wards every 30 seconds.',
        category: 'System'
      }
    ],
    knownAmbiguities: [
      {
        phrase: 'maintain electronic medical records securely adhering to data privacy standards',
        targetReqId: 'REQ-HM-02',
        clarification: 'Specify HIPAA Title II compliance, SOC2 Type II audit certification, and AES-256 PHI encryption.'
      }
    ],
    knownMissingRequirements: [
      {
        title: 'Emergency Medical Dispatch & Ambulance GPS Telemetry',
        category: 'Functional',
        justification: 'Vital emergency medicine integration for live patient vitals transmission before hospital arrival.'
      },
      {
        title: 'Insurance Pre-Authorization & Direct Claim Settlement',
        category: 'Business',
        justification: 'Automates cashless hospital admission and policy claim approvals.'
      }
    ],
    knownConflicts: [
      {
        reqAId: 'REQ-HM-02',
        reqBId: 'REQ-HM-04',
        reason: 'Full AES-256 payload encryption at rest slows down full-text search across large historical patient chat logs.',
        resolution: 'Encrypt body payloads while maintaining separate blind-indexed cryptographic search tokens.',
        severity: 'High'
      }
    ],
    expectedTestTypes: ['PHI Access Audit Penetration Test', 'Pharmacist Dual-Authorization Unit Test', 'ICU Sync Latency Test']
  },

  'Banking': {
    domain: 'Banking',
    domainName: 'Core Banking Ledger & Instant Payment System',
    description: 'High-reliability double-entry ledger, IMPS/NEFT fund transfers, biometric KYC verification, ML-based fraud detection, and cardless ATM tokens.',
    rawInputDocument: `
Core Banking & Payments Platform Requirements:
The system must support real-time interbank money transfers within 3 seconds with double-entry immutable accounting. New customers should be onboarded via mobile app using biometric KYC and facial liveness detection. The transaction engine must evaluate fraud risk in real time using ML models and immediately block suspicious accounts. All financial records must have immutable SHA-256 hash chains. Customers can generate single-use OTP tokens for cardless ATM cash withdrawals. The platform must maintain 99.999% uptime with active-active geo-redundancy.
    `,
    expectedRequirements: [
      {
        id: 'REQ-BK-01',
        title: 'Real-Time Interbank IMPS/NEFT Transfers',
        description: 'The system shall execute interbank fund transfers within 3 seconds with atomic debit-credit balance locks.',
        category: 'Functional'
      },
      {
        id: 'REQ-BK-02',
        title: 'Biometric AI KYC & Facial Liveness Verification',
        description: 'The system shall verify government identity credentials via OCR and confirm biometric liveness with < 0.01% False Acceptance Rate.',
        category: 'Functional'
      },
      {
        id: 'REQ-BK-03',
        title: 'Real-Time ML Fraud Detection & Auto-Freeze',
        description: 'The system shall calculate transaction fraud scores in < 50ms and automatically freeze accounts scoring > 0.85.',
        category: 'Technical'
      },
      {
        id: 'REQ-BK-04',
        title: 'Immutable Ledger Audit Trail with SHA-256 Chains',
        description: 'The system shall record double-entry accounting journals with cryptographic SHA-256 hash blocks for regulatory compliance.',
        category: 'Business'
      },
      {
        id: 'REQ-BK-05',
        title: 'Cardless ATM Single-Use Token Dispensation',
        description: 'The system shall issue 6-digit OTP tokens for cardless ATM cash withdrawals with a strict 15-minute time-to-live.',
        category: 'User'
      },
      {
        id: 'REQ-BK-06',
        title: 'Five-Nines High Availability & Geo-Redundancy',
        description: 'The platform infrastructure shall sustain 99.999% annual uptime with sub-second active-active database replication.',
        category: 'Non-functional'
      }
    ],
    knownAmbiguities: [
      {
        phrase: 'evaluate fraud risk in real time',
        targetReqId: 'REQ-BK-03',
        clarification: 'Specify sub-50ms inference latency constraint and ISO 20022 message schema integration.'
      }
    ],
    knownMissingRequirements: [
      {
        title: 'Automated Chargeback & Disputed Transaction Arbitration Workflow',
        category: 'Business',
        justification: 'Mandated by banking ombudsman regulations for customer dispute resolution.'
      }
    ],
    knownConflicts: [
      {
        reqAId: 'REQ-BK-01',
        reqBId: 'REQ-BK-03',
        reason: 'Complex ML model inference on batch transactions may exceed the 3-second SLA for high-throughput transfer windows.',
        resolution: 'Run lightweight sub-10ms rule checks synchronously and asynchronous deep anomaly inspection via streaming pipeline.',
        severity: 'High'
      }
    ],
    expectedTestTypes: ['Double-Entry Ledger Integrity Test', 'Cardless OTP Expiration Boundary Test', 'Fraud Auto-Freeze Security Test']
  },

  'Disaster Management': {
    domain: 'Disaster Management',
    domainName: 'Offline-First Emergency Response & Disaster Management System',
    description: 'Geo-location emergency beacons, multi-lingual SMS broadcasts, offline GIS maps, supply chain inventory, and rescue team triage telemetry.',
    rawInputDocument: `
Emergency Disaster Management & Relief Platform:
The platform must broadcast emergency SMS alerts to all mobile phones within 50km of an earthquake or flood epicenter within 60 seconds. Relief workers must be able to use the system on tablets in disaster zones with zero cellular connectivity using offline-first local database sync and mesh Wi-Fi. The central operations hub should visualize real-time rescue squad locations, survivor headcount, and medical supply inventory on an interactive GIS map. Victims can trigger SOS beacons with GPS coordinates.
    `,
    expectedRequirements: [
      {
        id: 'REQ-DM-01',
        title: 'Geo-Targeted Emergency Alert Broadcast',
        description: 'The system shall broadcast CAP-compliant emergency SMS alerts to all mobile devices within a 50km radius within 60 seconds.',
        category: 'Functional'
      },
      {
        id: 'REQ-DM-02',
        title: 'Offline-First Mesh Network Data Synchronization',
        description: 'The system shall persist field assessments locally in SQLite/IndexedDB and sync bidirectionally via mesh Wi-Fi when connectivity restores.',
        category: 'Technical'
      },
      {
        id: 'REQ-DM-03',
        title: 'Central GIS Rescue & Resource Dashboard',
        description: 'The system shall render real-time GIS map layers displaying rescue squad coordinates, shelter capacities, and supply deficits.',
        category: 'System'
      },
      {
        id: 'REQ-DM-04',
        title: 'Citizen SOS Beacon & Location Telemetry',
        description: 'The system shall capture emergency SOS beacons with latitude/longitude coordinates and battery status over low-bandwidth channels.',
        category: 'User'
      },
      {
        id: 'REQ-DM-05',
        title: 'Relief Material Inventory & Rationing Control',
        description: 'The system shall track relief kits, water supplies, and medical inventory distribution to prevent supply hoarding.',
        category: 'Business'
      }
    ],
    knownAmbiguities: [
      {
        phrase: 'broadcast emergency SMS alerts quickly',
        targetReqId: 'REQ-DM-01',
        clarification: 'Specify Common Alerting Protocol (CAP v1.2) broadcast within 60 seconds of trigger.'
      }
    ],
    knownMissingRequirements: [
      {
        title: 'Missing Persons Facial Recognition & Kinship Reconnection',
        category: 'Functional',
        justification: 'Crucial humanitarian capability to help families find missing relatives in emergency shelters.'
      }
    ],
    knownConflicts: [
      {
        reqAId: 'REQ-DM-02',
        reqBId: 'REQ-DM-03',
        reason: 'Real-time central GIS tracking requires continuous high-bandwidth connectivity which contradicts disaster-zone offline mesh constraints.',
        resolution: 'Implement delta-vector telemetry compression and store-and-forward batch queueing.',
        severity: 'Medium'
      }
    ],
    expectedTestTypes: ['Offline SQLite Sync Conflict Test', 'Emergency Broadcast Latency Load Test', 'SOS Beacon Low-Bandwidth Test']
  }
};
