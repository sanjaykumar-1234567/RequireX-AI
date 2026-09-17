import React, { useState } from 'react';
import { 
  Network, 
  GitFork, 
  Layers, 
  Activity, 
  Brain, 
  Cpu, 
  Sparkles, 
  CheckCircle2, 
  Play, 
  Database, 
  FileText, 
  ArrowRight, 
  ShieldAlert, 
  RefreshCw, 
  Zap, 
  Target, 
  Flame, 
  Users, 
  Milestone,
  Check,
  ChevronRight,
  BarChart3,
  Sliders,
  Award,
  KeyRound,
  Plus,
  Trash2,
  X,
  Maximize2,
  Box,
  Download,
  RotateCcw,
  MousePointer,
  Link,
  Save,
  Globe,
  Edit3,
  Copy,
  FileCode,
  Move,
  Grid,
  Eye,
  Palette,
  Share2,
  Compass,
  Tag,
  UploadCloud
} from 'lucide-react';
import { useProject } from '../../context/ProjectContext';

type DiagramTab = 'lifecycle' | 'use-cases' | 'sequence' | 'activity-workflow' | 'class-er' | 'component-deployment' | 'draw-3d-studio';
type StudioDiagramMode = 'topology' | 'use-case' | 'class-er' | 'state-machine' | 'sequence';

interface UMLNodeDetail {
  id: string;
  title: string;
  type: string;
  category: string;
  description: string;
  inputs: string;
  outputs: string;
  codeSymbol: string;
  standard: string;
  domainNote: string;
}

interface Custom3DNode {
  id: string;
  title: string;
  type: 'Actor' | 'Requirement' | 'AI Engine' | 'Database' | 'Microservice' | 'API Gateway' | 'Test Suite' | 'Class Entity' | 'State Node' | 'Boundary Box';
  color: string;
  x: number; // grid position X (%)
  y: number; // grid position Y (%)
  z: number; // elevation altitude (px)
  detail: string;
  attributes?: string[];
  methods?: string[];
  tag?: string;
}

interface Custom3DLink {
  id: string;
  from: string;
  to: string;
  label: string;
  color: 'cyan' | 'violet' | 'emerald' | 'amber' | 'rose';
  style: 'laser-pulse' | 'solid' | 'dashed';
}

interface Custom3DBoundary {
  id: string;
  name: string;
  color: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export const ModuleSystemDiagrams: React.FC = () => {
  const { currentProject } = useProject();
  const [activeTab, setActiveTab] = useState<DiagramTab>('lifecycle');
  
  // State Machine Simulator State
  const [stateStep, setStateStep] = useState<number>(2);
  
  // Domain Use Case Selection State
  const [selectedDomain, setSelectedDomain] = useState<string>(currentProject?.domain || 'Railway Reservation');

  // Sequence Simulator Step State
  const [seqStep, setSeqStep] = useState<number>(0);

  // Inspector Modal State for UML Nodes
  const [selectedUMLNode, setSelectedUMLNode] = useState<UMLNodeDetail | null>(null);
  const [isUMLModalOpen, setIsUMLModalOpen] = useState<boolean>(false);

  // ---------------------------------------------------------------------------
  // 3D DIAGRAM BUILDER STUDIO SUITE STATE
  // ---------------------------------------------------------------------------
  const [studioMode, setStudioMode] = useState<StudioDiagramMode>('topology');
  const [tiltAngle, setTiltAngle] = useState<number>(45);
  const [rotateAngle, setRotateAngle] = useState<number>(-15);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>('NODE-1');

  // Custom 3D Nodes State
  const [customNodes, setCustomNodes] = useState<Custom3DNode[]>([
    { id: 'NODE-1', title: 'User / Engineer', type: 'Actor', color: 'border-amber-400 bg-amber-950/60 text-amber-300 shadow-neon-amber', x: 12, y: 38, z: 20, detail: 'Primary user initiating requirement extraction or SRS generation.', tag: 'Primary Actor' },
    { id: 'NODE-2', title: 'RequireX Web Client', type: 'Microservice', color: 'border-cyan-400 bg-cyan-950/60 text-cyan-300 shadow-neon-cyan', x: 38, y: 38, z: 35, detail: 'React 18 single-page application rendering real-time dashboards.', tag: 'React 18 SPA' },
    { id: 'NODE-3', title: 'Gemini 3.6 Flash Kernel', type: 'AI Engine', color: 'border-violet-400 bg-violet-950/60 text-violet-300 shadow-neon-violet', x: 68, y: 22, z: 55, detail: 'Live LLM inference engine executing ISO 29148 20-defect audits.', tag: 'ISO 29148 Kernel' },
    { id: 'NODE-4', title: 'IndexedDB State Vault', type: 'Database', color: 'border-emerald-400 bg-emerald-950/60 text-emerald-300 shadow-neon-emerald', x: 68, y: 58, z: 25, detail: 'Client-side persistent offline state storage for backlogs and matrices.', tag: 'Offline Store' },
    { id: 'NODE-5', title: 'QA Test Matrix Engine', type: 'Test Suite', color: 'border-rose-400 bg-rose-950/60 text-rose-300 shadow-neon-rose', x: 90, y: 38, z: 40, detail: 'Automated 5-level test case generator linked to baseline REQ IDs.', tag: 'Automated QA' }
  ]);

  // Custom 3D Connections State
  const [customLinks, setCustomLinks] = useState<Custom3DLink[]>([
    { id: 'L-1', from: 'NODE-1', to: 'NODE-2', label: 'HTTP REST / Ingest Payload', color: 'cyan', style: 'laser-pulse' },
    { id: 'L-2', from: 'NODE-2', to: 'NODE-3', label: 'Analyze 20 Defect Rules', color: 'violet', style: 'laser-pulse' },
    { id: 'L-3', from: 'NODE-2', to: 'NODE-4', label: 'Persist State & RTM', color: 'emerald', style: 'solid' },
    { id: 'L-4', from: 'NODE-3', to: 'NODE-5', label: 'Synthesize Test Cases', color: 'rose', style: 'laser-pulse' }
  ]);

  // Custom 3D Boundaries State
  const [customBoundaries, setCustomBoundaries] = useState<Custom3DBoundary[]>([
    { id: 'B-1', name: 'RequireX Platform Engine Boundary', color: 'border-cyan-500/40 bg-cyan-950/20', x: 30, y: 12, width: 62, height: 75 }
  ]);

  // New Node Form State
  const [newNodeTitle, setNewNodeTitle] = useState<string>('Custom Service');
  const [newNodeType, setNewNodeType] = useState<Custom3DNode['type']>('Microservice');
  const [newNodeDetail, setNewNodeDetail] = useState<string>('Handles core domain processing.');
  const [newNodeTag, setNewNodeTag] = useState<string>('SLA <= 1.2s');
  const [newNodeColor, setNewNodeColor] = useState<string>('border-cyan-400 bg-cyan-950/60 text-cyan-300 shadow-neon-cyan');

  // Link Form State
  const [linkFrom, setLinkFrom] = useState<string>('NODE-1');
  const [linkTo, setLinkTo] = useState<string>('NODE-2');
  const [linkLabel, setLinkLabel] = useState<string>('Data Flow Laser');
  const [linkColor, setLinkColor] = useState<Custom3DLink['color']>('cyan');
  const [linkStyle, setLinkStyle] = useState<Custom3DLink['style']>('laser-pulse');

  // Boundary Form State
  const [boundaryName, setBoundaryName] = useState<string>('Core System Boundary');

  // JSON Import/Export & Report State
  const [jsonSpecText, setJsonSpecText] = useState<string>('');
  const [isJsonModalOpen, setIsJsonModalOpen] = useState<boolean>(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);
  const [copiedNotification, setCopiedNotification] = useState<boolean>(false);

  const domainsList = [
    { id: 'Railway Reservation', name: 'Railway Reservation System', icon: '🚆', actor: 'Passenger / Station Manager', cases: ['Search Train & Seat Matrix', 'Book Tatkal/General Ticket', 'Execute Real-Time PNR Query', 'Process Automated Refund', 'Cancel Ticket <= 2 Hours'] },
    { id: 'Banking', name: 'Banking & Core Fintech', icon: '🏦', actor: 'Account Holder / Compliance Officer', cases: ['IMPS / NEFT Fund Transfer', 'Biometric Video KYC', 'AI Fraud Anomaly Freeze', 'Cardless ATM OTP Cash', 'Core Ledger Audit Sync'] },
    { id: 'E-Commerce', name: 'E-Commerce Marketplace', icon: '🛒', actor: 'Online Shopper / Merchant', cases: ['Faceted Product Search', 'Multi-Currency Cart Checkout', '10-Min Inventory Lock', 'PCI-DSS Tokenization', 'FedEx Dispatch Webhook'] },
    { id: 'Hospital Management', name: 'Hospital Management & EHR', icon: '🏥', actor: 'Patient / Attending Physician', cases: ['Patient EHR Record Sync', 'Doctor Appointment Token', 'ICU Bed Availability Sync', 'HIPAA AES-256 Encryption', 'Pharmacy Reorder Alert'] },
    { id: 'Disaster Management', name: 'Disaster Relief & GIS', icon: '🆘', actor: 'Rescue Team / GIS Operator', cases: ['SOS Geo-Location Broadcast', 'Relief Supply Dispatch', 'Satellite Offline Sync', 'Drone Thermal Victim Stream', 'Shelter Occupancy Map'] },
    { id: 'Smart Home & IoT', name: 'Smart Home IoT Ecosystem', icon: '🏠', actor: 'Homeowner / IoT Gateway', cases: ['HVAC Environmental Control', '<100ms Matter Device Trigger', 'AES-128 MQTT Sensor Stream', 'Intrusion Alert & Siren', 'Zigbee Mesh Topology'] },
    { id: 'Online Quiz Platform', name: 'Online Quiz & Assessment', icon: '🎓', actor: 'Candidate / Exam Instructor', cases: ['Auto-Submit Timer Exam', 'Randomized Question Bank', 'Proctoring Tab-Switch Alert', 'Instant Scorecard Analytics', 'SHA-256 Digital Certificate'] }
  ];

  const currentDomainData = domainsList.find(d => d.id === selectedDomain) || domainsList[0];

  const stateMachineSteps = [
    { id: 'Raw', label: '1. Raw Input', desc: 'Informal user requirement string entered or uploaded via CSV/DOCX/PDF', color: 'border-slate-500 bg-slate-900 text-slate-300' },
    { id: 'Extracted', label: '2. AI Extracted', desc: 'Normalized and parsed into structured requirement entity with unique REQ ID', color: 'border-blue-500 bg-blue-950/60 text-blue-300' },
    { id: 'Analyzed', label: '3. Quality Analyzed', desc: 'Inspected by 20 ISO/IEC/IEEE 29148 & IEEE 830 defect rule detectors', color: 'border-amber-500 bg-amber-950/60 text-amber-300' },
    { id: 'Needs Refinement', label: '4. Needs Refinement', desc: 'Ambiguities, vague terms, or missing NFRs flagged requiring correction', color: 'border-rose-500 bg-rose-950/60 text-rose-300' },
    { id: 'Validated', label: '5. IEEE Validated', desc: 'Contextual IEEE Std 830 rewrite generated with quantified SLA boundaries', color: 'border-cyan-500 bg-cyan-950/60 text-cyan-300' },
    { id: 'Approved', label: '6. Approved Specification', desc: 'Accepted by engineer, locked into baseline requirements specification', color: 'border-violet-500 bg-violet-950/60 text-violet-300' },
    { id: 'Tested', label: '7. QA Test Verified', desc: 'Linked to automated test cases, user stories, and bi-directional RTM lineage', color: 'border-emerald-500 bg-emerald-950/60 text-emerald-300' }
  ];

  const sequenceSteps = [
    { step: 1, sender: 'User / Requirements Engineer', target: 'RequireX Web UI', message: 'Upload informal requirements & select target domain', detail: 'Input text, PDF, DOCX, or direct requirement ingestion.' },
    { step: 2, sender: 'RequireX Web UI', target: 'AI Analysis Engine (AIEngine.ts)', message: 'Dispatch text payload for 20-problem defect audit', detail: 'Runs regex heuristics, domain detectors, and defect code matchers (DEF-01 to DEF-20).' },
    { step: 3, sender: 'AI Analysis Engine', target: 'Live Real AI Provider (Gemini 3.6 Flash / Groq)', message: 'Request live inference & IEEE 830 contextual rewrite', detail: 'Generates formal "[Actor] shall [verifiable action] [quantified SLA]" rewrite.' },
    { step: 4, sender: 'Live Real AI Provider', target: 'Quality & Defect Engine', message: 'Return structured JSON with severity, confidence, & IEEE rewrite', detail: 'Parses returned payload into QualityIssue array.' },
    { step: 5, sender: 'Quality & Defect Engine', target: 'RequireX State Store (ProjectContext)', message: 'Update project state, RTM matrix, and downstream artifacts', detail: 'Auto-generates User Stories, Test Cases, Risk Matrix, and Traceability Links.' },
    { step: 6, sender: 'RequireX State Store', target: 'Interactive Dashboards & Exporters', message: 'Render visual charts, SVG diagrams, and export IEEE SRS PDF/DOCX', detail: 'UI updates dynamically with dark neon visual metrics.' }
  ];

  // Helper to trigger inspector modal
  const openNodeInspector = (node: UMLNodeDetail) => {
    setSelectedUMLNode(node);
    setIsUMLModalOpen(true);
  };

  // Currently Selected Node Object
  const selectedNodeObj = customNodes.find(n => n.id === selectedNodeId);

  // Update selected node position
  const updateSelectedNodePos = (axis: 'x' | 'y' | 'z', val: number) => {
    if (!selectedNodeId) return;
    setCustomNodes(customNodes.map(n => n.id === selectedNodeId ? { ...n, [axis]: val } : n));
  };

  // Add Node in 3D Studio
  const handleAdd3DNode = () => {
    const newId = `NODE-${customNodes.length + 1}`;
    const newNode: Custom3DNode = {
      id: newId,
      title: newNodeTitle || `Custom ${newNodeType}`,
      type: newNodeType,
      color: newNodeColor,
      x: 20 + (customNodes.length * 15) % 60,
      y: 20 + (customNodes.length * 10) % 50,
      z: 35,
      detail: newNodeDetail || 'User customized 3D architecture node.',
      tag: newNodeTag || undefined,
      attributes: newNodeType === 'Class Entity' ? ['+ id: string', '+ status: string'] : undefined,
      methods: newNodeType === 'Class Entity' ? ['+ executeTask()'] : undefined
    };

    setCustomNodes([...customNodes, newNode]);
    setSelectedNodeId(newId);
  };

  // Delete Selected 3D Node
  const handleDeleteSelectedNode = () => {
    if (!selectedNodeId) return;
    setCustomNodes(customNodes.filter(n => n.id !== selectedNodeId));
    setCustomLinks(customLinks.filter(l => l.from !== selectedNodeId && l.to !== selectedNodeId));
    setSelectedNodeId(null);
  };

  // Add 3D Laser Link
  const handleAdd3DLink = () => {
    if (linkFrom === linkTo) return;
    if (customLinks.some(l => l.from === linkFrom && l.to === linkTo)) return;
    const newLinkId = `L-${customLinks.length + 1}`;
    setCustomLinks([...customLinks, { id: newLinkId, from: linkFrom, to: linkTo, label: linkLabel, color: linkColor, style: linkStyle }]);
  };

  // Add 3D Boundary Container
  const handleAddBoundary = () => {
    const newBId = `B-${customBoundaries.length + 1}`;
    setCustomBoundaries([...customBoundaries, {
      id: newBId,
      name: boundaryName || 'New System Boundary',
      color: 'border-violet-500/40 bg-violet-950/20',
      x: 25,
      y: 15,
      width: 65,
      height: 70
    }]);
  };

  // Load Preset 3D Diagram Templates
  const loadPresetTemplate = (preset: 'tatkal' | 'microservices' | 'hipaa' | 'usecase' | 'classer') => {
    if (preset === 'tatkal') {
      setStudioMode('topology');
      setCustomNodes([
        { id: 'N1', title: 'IRCTC Web Portal', type: 'Actor', color: 'border-amber-400 bg-amber-950/60 text-amber-300 shadow-neon-amber', x: 10, y: 35, z: 20, detail: '50,000 Tatkal concurrent active users.', tag: 'Primary Actor' },
        { id: 'N2', title: 'Redis Cache Layer', type: 'Microservice', color: 'border-violet-400 bg-violet-950/60 text-violet-300 shadow-neon-violet', x: 35, y: 20, z: 40, detail: 'Sub-10ms seat matrix lock engine.', tag: 'Redis Sub-10ms' },
        { id: 'N3', title: 'Tatkal Booking Worker', type: 'AI Engine', color: 'border-cyan-400 bg-cyan-950/60 text-cyan-300 shadow-neon-cyan', x: 60, y: 35, z: 55, detail: 'SLA response latency <= 1.2 seconds.', tag: 'SLA <= 1.2s' },
        { id: 'N4', title: 'PostgreSQL DB Cluster', type: 'Database', color: 'border-emerald-400 bg-emerald-950/60 text-emerald-300 shadow-neon-emerald', x: 85, y: 35, z: 30, detail: 'ACID ticket ledger sync.', tag: 'ACID Ledger' }
      ]);
      setCustomLinks([
        { id: 'L1', from: 'N1', to: 'N2', label: 'Seat Inquiry', color: 'cyan', style: 'laser-pulse' },
        { id: 'L2', from: 'N2', to: 'N3', label: 'Lock Ticket Slot', color: 'violet', style: 'laser-pulse' },
        { id: 'L3', from: 'N3', to: 'N4', label: 'Commit Transaction', color: 'emerald', style: 'solid' }
      ]);
      setCustomBoundaries([
        { id: 'B1', name: 'IRCTC Tatkal Core Engine', color: 'border-cyan-500/40 bg-cyan-950/20', x: 28, y: 10, width: 68, height: 75 }
      ]);
    } else if (preset === 'microservices') {
      setStudioMode('topology');
      setCustomNodes([
        { id: 'M1', title: 'API Gateway Router', type: 'API Gateway', color: 'border-blue-400 bg-blue-950/60 text-blue-300 shadow-neon-blue', x: 15, y: 35, z: 25, detail: 'JWT Authentication & Rate Limiting.', tag: 'JWT Auth' },
        { id: 'M2', title: 'Requirements Service', type: 'Microservice', color: 'border-cyan-400 bg-cyan-950/60 text-cyan-300 shadow-neon-cyan', x: 45, y: 20, z: 45, detail: 'ISO 29148 extraction service.', tag: 'ISO 29148 Service' },
        { id: 'M3', title: 'AI LLM Inference Bus', type: 'AI Engine', color: 'border-violet-400 bg-violet-950/60 text-violet-300 shadow-neon-violet', x: 45, y: 55, z: 50, detail: 'Gemini 3.6 Flash & Groq provider queue.', tag: 'Gemini 3.6 Kernel' },
        { id: 'M4', title: 'Traceability Graph DB', type: 'Database', color: 'border-emerald-400 bg-emerald-950/60 text-emerald-300 shadow-neon-emerald', x: 80, y: 35, z: 30, detail: 'Bi-directional RTM graph storage.', tag: 'RTM Graph Store' }
      ]);
      setCustomLinks([
        { id: 'L1', from: 'M1', to: 'M2', label: 'Dispatch Request', color: 'cyan', style: 'laser-pulse' },
        { id: 'L2', from: 'M2', to: 'M3', label: 'Trigger AI Audit', color: 'violet', style: 'laser-pulse' },
        { id: 'L3', from: 'M2', to: 'M4', label: 'Persist RTM Links', color: 'emerald', style: 'solid' }
      ]);
      setCustomBoundaries([
        { id: 'B1', name: 'RequireX Microservices Mesh', color: 'border-violet-500/40 bg-violet-950/20', x: 35, y: 10, width: 58, height: 80 }
      ]);
    } else if (preset === 'usecase') {
      setStudioMode('use-case');
      setCustomNodes([
        { id: 'U1', title: 'Requirements Engineer', type: 'Actor', color: 'border-amber-400 bg-amber-950/60 text-amber-300 shadow-neon-amber', x: 15, y: 35, z: 20, detail: 'Primary user persona.', tag: 'User Persona' },
        { id: 'U2', title: 'UC-01: Ingest & Extract REQ', type: 'Requirement', color: 'border-cyan-400 bg-cyan-950/60 text-cyan-300 shadow-neon-cyan', x: 50, y: 20, z: 35, detail: 'Atomic extraction of REQs.', tag: 'Use Case 01' },
        { id: 'U3', title: 'UC-02: 20 Defect Rule Audit', type: 'Requirement', color: 'border-violet-400 bg-violet-950/60 text-violet-300 shadow-neon-violet', x: 50, y: 50, z: 45, detail: 'Detect ambiguity & vagueness.', tag: 'Use Case 02' },
        { id: 'U4', title: 'UC-03: Generate IEEE 830 Spec', type: 'Requirement', color: 'border-emerald-400 bg-emerald-950/60 text-emerald-300 shadow-neon-emerald', x: 80, y: 35, z: 30, detail: 'Formal SRS PDF export.', tag: 'Use Case 03' }
      ]);
      setCustomLinks([
        { id: 'L1', from: 'U1', to: 'U2', label: 'Executes', color: 'cyan', style: 'solid' },
        { id: 'L2', from: 'U1', to: 'U3', label: 'Executes', color: 'violet', style: 'solid' },
        { id: 'L3', from: 'U2', to: 'U4', label: '<<include>>', color: 'emerald', style: 'dashed' },
        { id: 'L4', from: 'U3', to: 'U4', label: '<<include>>', color: 'emerald', style: 'dashed' }
      ]);
      setCustomBoundaries([
        { id: 'B1', name: 'RequireX AI System Boundary', color: 'border-cyan-500/40 bg-cyan-950/20', x: 38, y: 10, width: 55, height: 75 }
      ]);
    }
  };

  // Export JSON spec
  const handleExportJSON = () => {
    const spec = {
      domain: selectedDomain,
      mode: studioMode,
      nodes: customNodes,
      links: customLinks,
      boundaries: customBoundaries
    };
    setJsonSpecText(JSON.stringify(spec, null, 2));
    setIsJsonModalOpen(true);
  };

  // Import JSON spec
  const handleImportJSON = () => {
    try {
      const parsed = JSON.parse(jsonSpecText);
      if (parsed.nodes) setCustomNodes(parsed.nodes);
      if (parsed.links) setCustomLinks(parsed.links);
      if (parsed.boundaries) setCustomBoundaries(parsed.boundaries);
      if (parsed.mode) setStudioMode(parsed.mode);
      setIsJsonModalOpen(false);
    } catch (e) {
      alert('Invalid JSON Specification format.');
    }
  };

  return (
    <div className="space-y-6 font-mono text-slate-100 selection:bg-cyan-500 selection:text-black">
      {/* Top Banner */}
      <div className="glass-card neon-card-violet p-6 sm:p-8 rounded-2xl border border-violet-500/40 shadow-neon-violet relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 blur-3xl pointer-events-none rounded-full" />
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-violet-300 text-xs font-bold">
              <span className="px-2.5 py-0.5 rounded-full bg-violet-500/20 border border-violet-400/40 text-[10px] uppercase tracking-wider">
                FORMAL SYSTEM ARCHITECTURE
              </span>
              <span>•</span>
              <span className="text-cyan-300">UML 2.0 &amp; 3D DIAGRAM STUDIO</span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-3">
              <Network className="h-8 w-8 text-cyan-400 animate-pulse" />
              <span>RequireX — Architecture &amp; System Diagrams</span>
            </h1>
            
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed font-sans font-light">
              Interactive UML 2.0 visual diagrams modeling the RequireX platform, requirement state machine, multi-domain use cases, sequence interactions, class models, and a <strong className="text-cyan-300 font-mono">3D Diagram Builder Studio Suite</strong> to construct your own custom software architecture diagrams!
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="px-3.5 py-2 rounded-xl bg-cyan-950/60 border border-cyan-400/50 text-cyan-300 text-xs font-bold flex items-center gap-2 shadow-neon-cyan">
              <Sparkles className="h-4 w-4 text-cyan-400" />
              <span>UML 2.0 &amp; 3D Studio Active</span>
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-white/10 text-xs">
        {[
          { id: 'lifecycle', label: '1. Lifecycle & State Machine', icon: Activity },
          { id: 'use-cases', label: '2. Platform & Multi-Domain Use Cases', icon: Users },
          { id: 'sequence', label: '3. Sequence Diagrams', icon: GitFork },
          { id: 'activity-workflow', label: '4. Activity Workflow', icon: Milestone },
          { id: 'class-er', label: '5. Class & ER Diagrams', icon: Database },
          { id: 'component-deployment', label: '6. Component & Deployment', icon: Layers },
          { id: 'draw-3d-studio', label: '7. 🛠️ 3D Diagram Builder Studio', icon: Box, isNew: true },
        ].map(tab => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as DiagramTab)}
              className={`px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 whitespace-nowrap transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-600/40 via-blue-600/40 to-violet-600/40 text-white border border-cyan-400/60 shadow-neon-cyan'
                  : 'bg-black/40 text-slate-400 hover:text-white border border-white/5 hover:border-white/20'
              }`}
            >
              <tab.icon className={`h-4 w-4 ${isActive ? 'text-cyan-300' : 'text-slate-500'}`} />
              <span>{tab.label}</span>
              {tab.isNew && (
                <span className="px-1.5 py-0.2 text-[9px] font-black rounded bg-gradient-to-r from-amber-400 to-orange-500 text-black">
                  3D STUDIO
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: REQUIREMENTS LIFECYCLE & STATE MACHINE */}
      {/* ========================================================================= */}
      {activeTab === 'lifecycle' && (
        <div className="space-y-6">
          {/* Section A: Requirements Lifecycle Activity Flow */}
          <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Activity className="h-4 w-4 text-cyan-400" />
                  <span>4. Requirements Lifecycle Activity Diagram (Click Any Step to Inspect)</span>
                </h3>
                <p className="text-xs text-slate-400 font-sans mt-0.5">
                  Click on any node in the pipeline below to open detailed technical specifications &amp; ISO standards.
                </p>
              </div>
              <span className="text-[10px] text-cyan-300 bg-cyan-950/60 px-2.5 py-0.5 rounded-full border border-cyan-500/40">
                LEVEL 1: PLATFORM PROCESS FLOW
              </span>
            </div>

            {/* SVG Visual Flow Diagram */}
            <div className="p-4 bg-black/60 rounded-xl border border-white/10 overflow-x-auto">
              <div className="min-w-[850px] flex items-center justify-between gap-2 py-4">
                {[
                  { step: 'Input', desc: 'Raw text / file upload', color: 'from-blue-600 to-indigo-600', icon: FileText, code: 'src/components/modules/ModuleIngestion.tsx', inp: 'PDF/DOCX/Text', out: 'Raw String' },
                  { step: 'Extraction', desc: 'AI parsing & ID assignment', color: 'from-cyan-600 to-blue-600', icon: Brain, code: 'src/services/aiEngine.ts::extractRequirements()', inp: 'Raw String', out: 'Requirement[]' },
                  { step: 'Classification', desc: 'Category & MoSCoW priority', color: 'from-violet-600 to-purple-600', icon: Layers, code: 'src/services/aiEngine.ts::classifyCategory()', inp: 'Requirement', out: 'Category & Priority' },
                  { step: 'Quality Analysis', desc: '20 Defect Rule inspection', color: 'from-rose-600 to-red-600', icon: ShieldAlert, code: 'src/services/aiEngine.ts::analyzeRequirement()', inp: 'Requirement', out: 'QualityIssue[]' },
                  { step: 'Refinement', desc: 'IEEE 830 rewrite & SLA fix', color: 'from-amber-600 to-orange-600', icon: Sparkles, code: 'src/services/realAIService.ts::generateIEEERewrite()', inp: 'Defect Issue', out: 'Formal SLA Rewrite' },
                  { step: 'Risk Analysis', desc: 'Impact & probability rating', color: 'from-purple-600 to-pink-600', icon: Flame, code: 'src/components/modules/ModuleRiskMatrix.tsx', inp: 'SLA Boundary', out: 'Risk Score (P x I)' },
                  { step: 'Testing Matrix', desc: 'Test case generation', color: 'from-teal-600 to-emerald-600', icon: CheckCircle2, code: 'src/components/modules/ModuleTestMatrix.tsx', inp: 'Requirement Baseline', out: 'TestCase Matrix' },
                  { step: 'Traceability', desc: 'Bi-directional RTM graph', color: 'from-blue-600 to-cyan-600', icon: Network, code: 'src/components/modules/ModuleTraceability.tsx', inp: 'REQ/US/UC/TC IDs', out: 'RTM Graph' },
                  { step: 'SRS Export', desc: 'IEEE 830 spec download', color: 'from-emerald-600 to-green-600', icon: FileText, code: 'src/components/modules/ModuleSRSExport.tsx', inp: 'Approved Backlog', out: 'PDF / DOCX / MD' }
                ].map((item, idx, arr) => (
                  <React.Fragment key={idx}>
                    <div 
                      onClick={() => openNodeInspector({
                        id: `STEP-0${idx + 1}`,
                        title: `${item.step} Activity Phase`,
                        type: 'Lifecycle Activity Node',
                        category: 'RequireX Platform Engine',
                        description: `Executes the ${item.step} lifecycle phase: ${item.desc}.`,
                        inputs: item.inp,
                        outputs: item.out,
                        codeSymbol: item.code,
                        standard: 'ISO/IEC/IEEE 29148:2018 Life Cycle Processes',
                        domainNote: `Applies across all domains (${selectedDomain}).`
                      })}
                      className="flex flex-col items-center text-center space-y-2 group flex-1 cursor-pointer transform hover:scale-105 transition duration-300"
                    >
                      <div className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${item.color} p-[1.5px] shadow-lg shadow-neon-blue border border-cyan-400/40`}>
                        <div className="h-full w-full bg-[#0A0A12] rounded-[14px] flex items-center justify-center">
                          <item.icon className="h-5 w-5 text-white" />
                        </div>
                      </div>
                      <span className="text-xs font-bold text-white block">{item.step}</span>
                      <span className="text-[10px] text-cyan-300 max-w-[90px] leading-tight font-sans block truncate">Click to Inspect</span>
                    </div>
                    {idx < arr.length - 1 && (
                      <ArrowRight className="h-4 w-4 text-cyan-400 shrink-0 animate-pulse" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>

          {/* Section B: Requirement State Machine Visualizer */}
          <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <GitFork className="h-4 w-4 text-violet-400" />
                  <span>5. Requirement State Machine Diagram &amp; Step-Through Simulator</span>
                </h3>
                <p className="text-xs text-slate-400 font-sans mt-0.5">
                  Models the lifecycle state transitions of an individual requirement from initial raw ingestion to automated test verification.
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setStateStep(prev => (prev > 0 ? prev - 1 : 0))}
                  disabled={stateStep === 0}
                  className="px-3 py-1.5 rounded-lg bg-surface hover:bg-surface-hover border border-white/10 text-xs text-slate-300 disabled:opacity-40 cursor-pointer"
                >
                  ← Prev State
                </button>
                <button
                  onClick={() => setStateStep(prev => (prev < stateMachineSteps.length - 1 ? prev + 1 : prev))}
                  disabled={stateStep === stateMachineSteps.length - 1}
                  className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white font-bold text-xs shadow-neon-violet disabled:opacity-40 cursor-pointer"
                >
                  Next State →
                </button>
              </div>
            </div>

            {/* Interactive State Nodes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-7 gap-2">
              {stateMachineSteps.map((st, idx) => {
                const isActive = stateStep === idx;
                const isPassed = stateStep > idx;

                return (
                  <div
                    key={st.id}
                    onClick={() => {
                      setStateStep(idx);
                      openNodeInspector({
                        id: `STATE-0${idx + 1}`,
                        title: st.label,
                        type: 'UML Requirement Lifecycle State',
                        category: 'State Machine Specification',
                        description: st.desc,
                        inputs: 'State Entry Trigger',
                        outputs: 'State Transition Event Payload',
                        codeSymbol: 'src/context/ProjectContext.tsx::updateRequirementState()',
                        standard: 'IEEE Std 830-1998 & ISO/IEC 29148 Lifecycle States',
                        domainNote: `Active state for requirement entity in ${selectedDomain}.`
                      });
                    }}
                    className={`p-3.5 rounded-xl border text-left transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                      isActive
                        ? 'border-cyan-400 bg-cyan-950/60 shadow-neon-cyan scale-105 z-10'
                        : isPassed
                        ? 'border-emerald-500/40 bg-emerald-950/20 text-emerald-300'
                        : 'border-white/10 bg-surface/40 text-slate-400 hover:border-white/20'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-bold uppercase">{st.id}</span>
                        {isPassed && <Check className="h-3 w-3 text-emerald-400" />}
                        {isActive && <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse shadow-neon-cyan" />}
                      </div>
                      <p className="text-xs font-bold text-white">{st.label.split('.')[1]}</p>
                      <p className="text-[10px] text-slate-400 mt-1 font-sans line-clamp-3 leading-snug">{st.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Selected State Active Inspector Box */}
            <div className="p-4 rounded-xl bg-black/80 border border-cyan-500/40 shadow-neon-blue flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-xl bg-cyan-500/20 border border-cyan-400/50 flex items-center justify-center text-cyan-300 font-bold shrink-0">
                  {stateStep + 1}
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block">
                    ACTIVE STATE TRANSITION: {stateMachineSteps[stateStep].label}
                  </span>
                  <p className="text-xs text-white font-sans">{stateMachineSteps[stateStep].desc}</p>
                </div>
              </div>

              <button
                onClick={() => openNodeInspector({
                  id: `STATE-0${stateStep + 1}`,
                  title: stateMachineSteps[stateStep].label,
                  type: 'UML Requirement Lifecycle State',
                  category: 'State Machine Specification',
                  description: stateMachineSteps[stateStep].desc,
                  inputs: 'State Entry Trigger',
                  outputs: 'State Transition Event Payload',
                  codeSymbol: 'src/context/ProjectContext.tsx::updateRequirementState()',
                  standard: 'IEEE Std 830-1998 & ISO/IEC 29148 Lifecycle States',
                  domainNote: `Active state for requirement entity in ${selectedDomain}.`
                })}
                className="px-3.5 py-2 rounded-xl bg-cyan-500 text-black font-black text-xs hover:bg-cyan-400 transition cursor-pointer shrink-0 shadow-neon-cyan"
              >
                Inspect State Details
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: PLATFORM & MULTI-DOMAIN USE CASE DIAGRAMS */}
      {/* ========================================================================= */}
      {activeTab === 'use-cases' && (
        <div className="space-y-6">
          {/* Level 1: Main RequireX Platform Use Case Diagram */}
          <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Users className="h-4 w-4 text-violet-400" />
                <span>Level 1: Main RequireX Platform Use Case Diagram (Click Use Case to Inspect)</span>
              </h3>
              <span className="text-[10px] text-violet-300 bg-violet-950/60 px-2.5 py-0.5 rounded-full border border-violet-500/40">
                UML 2.0 USE CASE SPECIFICATION
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center p-4 bg-black/60 rounded-xl border border-white/10">
              {/* Actor Column */}
              <div 
                onClick={() => openNodeInspector({
                  id: 'ACTOR-01',
                  title: 'Requirements Engineer / Analyst',
                  type: 'UML Primary Actor',
                  category: 'Platform User Persona',
                  description: 'Primary human actor performing requirements analysis, quality audits, ambiguity detection, and SRS generation.',
                  inputs: 'Informal requirements text, domain specification rules',
                  outputs: 'Validated IEEE 830 SRS documents, RTM matrices',
                  codeSymbol: 'src/context/ProjectContext.tsx',
                  standard: 'ISO/IEC/IEEE 29148 Requirements Engineer Role',
                  domainNote: 'User operating the RequireX platform workstation.'
                })}
                className="glass-card p-5 rounded-xl border border-violet-500/40 text-center space-y-2 shadow-neon-violet cursor-pointer transform hover:scale-105 transition"
              >
                <div className="h-16 w-16 mx-auto rounded-full bg-violet-600/20 border border-violet-400 flex items-center justify-center text-amber-300 text-2xl font-bold">
                  👨‍💻
                </div>
                <h4 className="text-sm font-bold text-white">Requirements Engineer / Analyst</h4>
                <p className="text-[11px] text-slate-300 font-sans">Primary Actor (Click to Inspect Specs)</p>
              </div>

              {/* System Boundary Box & Use Cases Grid */}
              <div className="lg:col-span-2 glass-card p-5 rounded-xl border border-cyan-500/40 space-y-3 shadow-neon-cyan">
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block border-b border-white/10 pb-2">
                  System Boundary: RequireX AI Suite v2.0
                </span>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    'Upload Requirements',
                    'Select Domain',
                    'Extract Requirements',
                    'Analyze Quality (20 Defect Rules)',
                    'Detect Ambiguity & Vague Words',
                    'Find Missing NFR & Security Gaps',
                    'Generate User Stories & Use Cases',
                    'Generate QA Test Matrix',
                    'Perform Risk Heatmap Analysis',
                    'View Lineage & Traceability Graph',
                    'Compare Multi-LLM Benchmarks',
                    'Export IEEE Std 830 SRS Document'
                  ].map((uc, i) => (
                    <div 
                      key={i} 
                      onClick={() => openNodeInspector({
                        id: `UC-${String(i + 1).padStart(2, '0')}`,
                        title: uc,
                        type: 'UML Platform Use Case',
                        category: 'System Boundary Use Case',
                        description: `Allows Requirements Engineer to execute ${uc.toLowerCase()}.`,
                        inputs: 'Project backlog & domain parameters',
                        outputs: `Verified ${uc} artifacts`,
                        codeSymbol: `src/components/modules/Module${uc.replace(/\s+/g, '')}.tsx`,
                        standard: 'IEEE 830 & ISO/IEC 29148 Functionality',
                        domainNote: `Executes under ${selectedDomain} context.`
                      })}
                      className="p-2.5 rounded-lg bg-surface/90 border border-white/10 text-center hover:border-cyan-400 hover:bg-black transition cursor-pointer"
                    >
                      <span className="text-[11px] font-bold text-slate-200 block truncate">UC-{String(i + 1).padStart(2, '0')}: {uc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Level 2: Domain-Specific Use Case Diagram Switcher */}
          <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Database className="h-4 w-4 text-emerald-400" />
                  <span>Level 2: Domain-Specific System Use Case Diagram (Domain Under Analysis)</span>
                </h3>
                <p className="text-xs text-slate-400 font-sans mt-0.5">
                  Demonstrates how RequireX adapts to analyze functional capabilities of specific target domain systems.
                </p>
              </div>

              {/* Domain Selector Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                {domainsList.map(d => (
                  <button
                    key={d.id}
                    onClick={() => setSelectedDomain(d.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                      selectedDomain === d.id
                        ? 'bg-emerald-500 text-black shadow-neon-emerald'
                        : 'bg-surface hover:bg-surface-hover text-slate-300 border border-white/10'
                    }`}
                  >
                    <span>{d.icon} {d.id}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Active Selected Domain Use Case View */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center p-5 bg-black/60 rounded-xl border border-emerald-500/40 shadow-neon-emerald">
              {/* Domain Actor Box */}
              <div className="glass-card p-5 rounded-xl border border-emerald-500/40 text-center space-y-2">
                <span className="text-3xl">{currentDomainData.icon}</span>
                <h4 className="text-sm font-bold text-white">{currentDomainData.actor}</h4>
                <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider block">Target System Primary Actor</span>
              </div>

              {/* Domain Use Cases List */}
              <div className="lg:col-span-2 space-y-3">
                <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider block border-b border-white/10 pb-2">
                  Analyzed System Use Cases ({currentDomainData.name})
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {currentDomainData.cases.map((c, i) => (
                    <div 
                      key={i} 
                      onClick={() => openNodeInspector({
                        id: `DUC-${String(i + 1).padStart(2, '0')}`,
                        title: c,
                        type: 'Target Domain System Use Case',
                        category: currentDomainData.name,
                        description: `Verifies target system capability '${c}' for actor ${currentDomainData.actor}.`,
                        inputs: `${selectedDomain} Transaction Parameters`,
                        outputs: 'Sub-1.2s SLA Execution Record',
                        codeSymbol: `src/services/aiEngine.ts::domain_${selectedDomain.toLowerCase().replace(/\s+/g, '_')}`,
                        standard: 'ISO/IEC/IEEE 29148 Domain Verification',
                        domainNote: `Core capability in ${selectedDomain}.`
                      })}
                      className="p-3 rounded-xl bg-surface/90 border border-emerald-500/30 flex items-center justify-between hover:border-emerald-400 transition cursor-pointer"
                    >
                      <span className="text-xs font-bold text-white">{c}</span>
                      <span className="text-[9px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-mono">
                        VERIFIED IEEE
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: SEQUENCE DIAGRAMS */}
      {/* ========================================================================= */}
      {activeTab === 'sequence' && (
        <div className="space-y-6">
          <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <GitFork className="h-4 w-4 text-cyan-400" />
                <span>Level A: Main RequireX AI Execution Sequence Diagram</span>
              </h3>
              <button
                onClick={() => setSeqStep(prev => (prev < sequenceSteps.length - 1 ? prev + 1 : 0))}
                className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs shadow-neon-cyan cursor-pointer flex items-center gap-1.5"
              >
                <Play className="h-3.5 w-3.5" />
                <span>Simulate Execution Step ({seqStep + 1}/6)</span>
              </button>
            </div>

            {/* Sequence Step-by-Step Message Trace List */}
            <div className="space-y-3 pt-2">
              {sequenceSteps.map((sq, i) => {
                const isActive = seqStep === i;
                return (
                  <div
                    key={i}
                    onClick={() => {
                      setSeqStep(i);
                      openNodeInspector({
                        id: `SEQ-0${sq.step}`,
                        title: `${sq.sender} → ${sq.target}`,
                        type: 'UML Sequence Interaction Message',
                        category: 'Synchronous System Call',
                        description: sq.message,
                        inputs: sq.detail,
                        outputs: 'Asynchronous event ACK or payload return',
                        codeSymbol: 'src/services/realAIService.ts::executeInference()',
                        standard: 'UML 2.0 Sequence Specification',
                        domainNote: `Execution step ${sq.step} of 6.`
                      });
                    }}
                    className={`p-4 rounded-xl border transition-all duration-300 cursor-pointer ${
                      isActive 
                        ? 'bg-cyan-950/60 border-cyan-400 shadow-neon-cyan scale-[1.01]' 
                        : 'bg-black/40 border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center space-x-3">
                        <span className={`h-7 w-7 rounded-lg flex items-center justify-center font-bold text-xs ${
                          isActive ? 'bg-cyan-400 text-black' : 'bg-surface text-slate-400'
                        }`}>
                          {sq.step}
                        </span>
                        <div>
                          <span className="text-xs font-bold text-white">
                            {sq.sender} → <strong className="text-cyan-300">{sq.target}</strong>
                          </span>
                          <p className="text-xs font-bold text-amber-300 font-sans mt-0.5">{sq.message}</p>
                        </div>
                      </div>
                      <span className="text-[11px] text-slate-400 font-sans max-w-md">{sq.detail}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: ACTIVITY WORKFLOW DIAGRAM */}
      {/* ========================================================================= */}
      {activeTab === 'activity-workflow' && (
        <div className="space-y-6">
          <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Milestone className="h-4 w-4 text-amber-400" />
                <span>End-to-End RequireX Platform Activity Diagram Workflow</span>
              </h3>
              <span className="text-[10px] text-amber-300 bg-amber-950/60 px-2.5 py-0.5 rounded-full border border-amber-500/40">
                UML ACTIVITY WORKFLOW
              </span>
            </div>

            {/* Visual Step flowchart with decision branch */}
            <div className="space-y-4 pt-2 font-sans">
              <div className="p-4 rounded-xl bg-black/60 border border-white/10 space-y-4">
                <div className="flex items-center space-x-3 text-xs font-mono text-cyan-300">
                  <span className="h-3 w-3 rounded-full bg-emerald-400 shadow-neon-emerald" />
                  <span>START → Ingest Requirements → Select Domain ({selectedDomain})</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono">
                  <div 
                    onClick={() => openNodeInspector({
                      id: 'ACT-01',
                      title: '1. AI Extraction Activity',
                      type: 'Activity Workflow Node',
                      category: 'Data Normalization',
                      description: 'Normalizes input lines, assigns REQ IDs, strips non-printable artifacts.',
                      inputs: 'Raw document string',
                      outputs: 'Structured Requirement[] array',
                      codeSymbol: 'src/services/aiEngine.ts::extractRequirements()',
                      standard: 'ISO/IEC/IEEE 29148 Activity Flow',
                      domainNote: 'Stage 1 of 3.'
                    })}
                    className="p-3 rounded-xl bg-surface border border-white/10 hover:border-cyan-400 transition cursor-pointer"
                  >
                    <span className="font-bold text-cyan-400 block mb-1">1. AI Extraction</span>
                    <p className="text-slate-300 text-[11px]">Normalizes input lines, assigns REQ IDs, strips non-printable artifacts.</p>
                  </div>

                  <div 
                    onClick={() => openNodeInspector({
                      id: 'ACT-02',
                      title: '2. Classification Activity',
                      type: 'Activity Workflow Node',
                      category: 'Categorization & MoSCoW',
                      description: 'Categorizes into Functional/NFR/System & assigns MoSCoW priorities.',
                      inputs: 'Requirement Entity',
                      outputs: 'Category & MoSCoW Tags',
                      codeSymbol: 'src/services/aiEngine.ts::classifyCategory()',
                      standard: 'ISO/IEC/IEEE 29148 Activity Flow',
                      domainNote: 'Stage 2 of 3.'
                    })}
                    className="p-3 rounded-xl bg-surface border border-white/10 hover:border-violet-400 transition cursor-pointer"
                  >
                    <span className="font-bold text-violet-400 block mb-1">2. Classification</span>
                    <p className="text-slate-300 text-[11px]">Categorizes into Functional/NFR/System &amp; assigns MoSCoW priorities.</p>
                  </div>

                  <div 
                    onClick={() => openNodeInspector({
                      id: 'ACT-03',
                      title: '3. Quality Audit Activity',
                      type: 'Activity Workflow Node',
                      category: 'Defect Heuristics',
                      description: 'Evaluates input against all 20 ISO/IEC/IEEE 29148 & IEEE 830 defect rules.',
                      inputs: 'Requirement & Domain Heuristics',
                      outputs: '20 Defect Flags',
                      codeSymbol: 'src/services/aiEngine.ts::analyzeRequirement()',
                      standard: 'ISO/IEC/IEEE 29148 Defect Standards',
                      domainNote: 'Stage 3 of 3.'
                    })}
                    className="p-3 rounded-xl bg-surface border border-white/10 hover:border-rose-400 transition cursor-pointer"
                  >
                    <span className="font-bold text-rose-400 block mb-1">3. Quality Audit</span>
                    <p className="text-slate-300 text-[11px]">Evaluates input against all 20 ISO/IEC/IEEE 29148 &amp; IEEE 830 defect rules.</p>
                  </div>
                </div>

                {/* Decision Node */}
                <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/40 space-y-2 text-xs font-mono">
                  <span className="font-bold text-amber-400 flex items-center gap-2">
                    <ShieldAlert className="h-4 w-4 text-amber-400" />
                    <span>DECISION NODE: Were Defect Flags Detected?</span>
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                    <div className="p-3 rounded-lg bg-red-950/40 border border-red-500/40 text-red-200">
                      <strong className="block text-red-400">[YES] → Route to Refinement Lab:</strong>
                      <span>Apply contextual IEEE 830 rewrite &amp; quantify SLAs (e.g. response time &lt; 1.2s).</span>
                    </div>
                    <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/40 text-emerald-200">
                      <strong className="block text-emerald-400">[NO / Approved] → Generate Downstream Artifacts:</strong>
                      <span>Synthesize User Stories, QA Test Matrix, Risk Heatmap, and RTM Lineage.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 5: CLASS & ER DIAGRAMS */}
      {/* ========================================================================= */}
      {activeTab === 'class-er' && (
        <div className="space-y-6">
          <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Database className="h-4 w-4 text-violet-400" />
                <span>RequireX Class Diagram (Click Any Class to Inspect Attributes &amp; Methods)</span>
              </h3>
              <span className="text-[10px] text-violet-300 bg-violet-950/60 px-2.5 py-0.5 rounded-full border border-violet-500/40">
                UML 2.0 CLASS ARCHITECTURE
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
              {[
                { name: 'Project', attrs: ['+ id: string', '+ name: string', '+ domain: string', '+ requirements: Requirement[]'], methods: ['+ selectProject()', '+ createSnapshot()'] },
                { name: 'Requirement', attrs: ['+ id: string', '+ title: string', '+ category: Category', '+ priority: Priority', '+ issues: QualityIssue[]'], methods: ['+ applyRewrite()', '+ acceptImprovement()'] },
                { name: 'QualityAssessment', attrs: ['+ code: string', '+ type: string', '+ severity: Severity', '+ confidenceScore: number'], methods: ['+ analyze20Problems()'] },
                { name: 'UserStory', attrs: ['+ id: string', '+ role: string', '+ goal: string', '+ benefit: string', '+ points: number'], methods: ['+ generateStories()'] },
                { name: 'TestCase', attrs: ['+ id: string', '+ steps: string[]', '+ expected: string', '+ type: TestType'], methods: ['+ generateTestCases()'] },
                { name: 'RiskItem', attrs: ['+ id: string', '+ impact: number', '+ probability: number', '+ mitigation: string'], methods: ['+ generateRisks()'] }
              ].map((cls, i) => (
                <div 
                  key={i} 
                  onClick={() => openNodeInspector({
                    id: `CLASS-0${i + 1}`,
                    title: `UML Class: ${cls.name}`,
                    type: 'UML 2.0 Structural Class',
                    category: 'RequireX Object Model',
                    description: `Defines data structure and behaviors for ${cls.name}.`,
                    inputs: cls.attrs.join(', '),
                    outputs: cls.methods.join(', '),
                    codeSymbol: `src/types/project.ts::${cls.name}`,
                    standard: 'UML 2.0 Class Diagram Standards',
                    domainNote: 'Core domain entity model.'
                  })}
                  className="p-4 rounded-xl bg-surface/90 border border-white/10 space-y-2 hover:border-cyan-400 transition cursor-pointer"
                >
                  <span className="font-bold text-cyan-400 text-sm block border-b border-white/10 pb-1">{cls.name}</span>
                  <div className="space-y-0.5 text-slate-300 text-[11px]">
                    {cls.attrs.map((a, aIdx) => <div key={aIdx}>{a}</div>)}
                  </div>
                  <div className="pt-1.5 border-t border-white/10 space-y-0.5 text-purple-300 text-[11px]">
                    {cls.methods.map((m, mIdx) => <div key={mIdx}>{m}</div>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 6: COMPONENT & DEPLOYMENT DIAGRAMS */}
      {/* ========================================================================= */}
      {activeTab === 'component-deployment' && (
        <div className="space-y-6">
          <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Layers className="h-4 w-4 text-cyan-400" />
                <span>RequireX Component &amp; Multi-Tier Deployment Architecture</span>
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
              <div 
                onClick={() => openNodeInspector({
                  id: 'COMP-01',
                  title: 'Presentation Tier (React 18 + Vite)',
                  type: 'UI Component Layer',
                  category: 'Frontend Tier',
                  description: 'Interactive UI modules, SVG charts, dark neon theme engine, and state drawer providers.',
                  inputs: 'User browser interaction events',
                  outputs: 'DOM state updates & SVG canvas rendering',
                  codeSymbol: 'src/App.tsx',
                  standard: 'W3C HTML5 & React 18 SPA Architecture',
                  domainNote: 'Runs inside client web browser.'
                })}
                className="p-4 rounded-xl bg-surface/90 border border-cyan-500/40 space-y-2 hover:border-cyan-300 transition cursor-pointer"
              >
                <span className="font-bold text-cyan-300 text-sm block">Presentation Tier (React 18 + Vite)</span>
                <p className="text-slate-300 text-[11px] font-sans">Interactive UI modules, SVG charts, dark neon theme engine, and state drawer providers.</p>
              </div>

              <div 
                onClick={() => openNodeInspector({
                  id: 'COMP-02',
                  title: 'Application Core Engine',
                  type: 'Business Logic Layer',
                  category: 'Application Kernel',
                  description: '20-defect rule engine, ISO/IEEE rewriter, MoSCoW classifier, and downstream generators.',
                  inputs: 'Raw text & project requirements',
                  outputs: 'QualityIssue[] & IEEE Rewrites',
                  codeSymbol: 'src/services/aiEngine.ts',
                  standard: 'ISO/IEC/IEEE 29148 Audit Engine',
                  domainNote: 'Executes in client JS thread.'
                })}
                className="p-4 rounded-xl bg-surface/90 border border-violet-500/40 space-y-2 hover:border-violet-300 transition cursor-pointer"
              >
                <span className="font-bold text-violet-300 text-sm block">Application Core (AIEngine &amp; RealAIService)</span>
                <p className="text-slate-300 text-[11px] font-sans">20-defect rule engine, ISO/IEEE rewriter, MoSCoW classifier, and downstream generators.</p>
              </div>

              <div 
                onClick={() => openNodeInspector({
                  id: 'COMP-03',
                  title: 'External AI Gateway Connectors',
                  type: 'Integration Layer',
                  category: 'REST API Connectors',
                  description: 'Official direct REST endpoints for Google Gemini, Groq Cloud, Anthropic Claude, and OpenRouter.',
                  inputs: 'REST API Payloads with API Keys',
                  outputs: 'JSON completion stream',
                  codeSymbol: 'src/services/realAIService.ts',
                  standard: 'REST / HTTPS TLS 1.3 Security',
                  domainNote: 'Connects to official cloud provider APIs.'
                })}
                className="p-4 rounded-xl bg-surface/90 border border-emerald-500/40 space-y-2 hover:border-emerald-300 transition cursor-pointer"
              >
                <span className="font-bold text-emerald-300 text-sm block">External AI Gateway Connectors</span>
                <p className="text-slate-300 text-[11px] font-sans">Official direct REST endpoints for Google Gemini, Groq Cloud, Anthropic Claude, and OpenRouter.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 7: INNOVATIVE 3D DIAGRAM BUILDER STUDIO SUITE */}
      {/* ========================================================================= */}
      {activeTab === 'draw-3d-studio' && (
        <div className="space-y-6">
          <div className="glass-card p-6 rounded-2xl border border-violet-500/40 shadow-neon-violet space-y-5">
            {/* Header & Mode Switcher */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <h3 className="text-base font-black text-white flex items-center gap-2">
                  <Box className="h-5 w-5 text-cyan-400 animate-spin" />
                  <span>Interactive 3D UML &amp; Architecture Builder Studio Suite</span>
                </h3>
                <p className="text-xs text-slate-300 font-sans mt-0.5">
                  Draw custom 3D UML diagrams across 5 modes with real-time 3D camera controls, laser links, boundaries, position controls, and JSON export!
                </p>
              </div>

              {/* Mode Selector Buttons */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
                {[
                  { id: 'topology', label: '🌐 3D System Topology', color: 'text-cyan-300' },
                  { id: 'use-case', label: '👥 3D Use Cases', color: 'text-amber-300' },
                  { id: 'class-er', label: '🏛️ 3D Class & ER', color: 'text-emerald-300' },
                  { id: 'state-machine', label: '🔄 3D State Machine', color: 'text-violet-300' },
                  { id: 'sequence', label: '⚡ 3D Sequence Interactions', color: 'text-rose-300' }
                ].map(m => (
                  <button
                    key={m.id}
                    onClick={() => setStudioMode(m.id as StudioDiagramMode)}
                    className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition cursor-pointer ${
                      studioMode === m.id
                        ? 'bg-gradient-to-r from-cyan-600/40 to-violet-600/40 text-white border border-cyan-400/60 shadow-neon-cyan'
                        : 'bg-black/40 text-slate-400 hover:text-white border border-white/10'
                    }`}
                  >
                    <span>{m.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Presets & Spec Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-black/60 border border-white/10 text-xs">
              <div className="flex items-center space-x-2">
                <span className="text-slate-400 font-bold">1-Click Presets:</span>
                <button onClick={() => loadPresetTemplate('tatkal')} className="px-2.5 py-1 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold hover:bg-amber-500/30 cursor-pointer">
                  🚆 Tatkal Pipeline
                </button>
                <button onClick={() => loadPresetTemplate('microservices')} className="px-2.5 py-1 rounded-lg bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 font-bold hover:bg-cyan-500/30 cursor-pointer">
                  🌐 Microservices Mesh
                </button>
                <button onClick={() => loadPresetTemplate('usecase')} className="px-2.5 py-1 rounded-lg bg-violet-500/20 border border-violet-500/40 text-violet-300 font-bold hover:bg-violet-500/30 cursor-pointer">
                  👥 RequireX Use Cases
                </button>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={handleExportJSON}
                  className="px-3 py-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold hover:bg-cyan-500/30 cursor-pointer flex items-center gap-1.5"
                >
                  <FileCode className="h-3.5 w-3.5" /> Spec JSON / Import
                </button>

                <button
                  onClick={() => setIsReportModalOpen(true)}
                  className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-violet-600 to-cyan-600 text-white font-black hover:from-violet-500 hover:to-cyan-500 shadow-neon-violet cursor-pointer flex items-center gap-1.5"
                >
                  <FileText className="h-3.5 w-3.5" /> Generate 3D Spec Report
                </button>
              </div>
            </div>

            {/* 3D Camera Controls & Viewport Tools Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-black/80 border border-violet-500/30 text-xs">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="text-slate-400 font-bold">Tilt ({tiltAngle}°):</span>
                  <input
                    type="range"
                    min="15"
                    max="75"
                    value={tiltAngle}
                    onChange={e => setTiltAngle(Number(e.target.value))}
                    className="w-24 accent-cyan-400 cursor-pointer"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-slate-400 font-bold">Rotate ({rotateAngle}°):</span>
                  <input
                    type="range"
                    min="-180"
                    max="180"
                    value={rotateAngle}
                    onChange={e => setRotateAngle(Number(e.target.value))}
                    className="w-24 accent-purple-400 cursor-pointer"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-slate-400 font-bold">Zoom ({zoomLevel.toFixed(1)}x):</span>
                  <button onClick={() => setZoomLevel(Math.max(0.6, zoomLevel - 0.1))} className="px-2 py-0.5 rounded bg-surface border border-white/10 text-white font-bold cursor-pointer">-</button>
                  <button onClick={() => setZoomLevel(Math.min(1.6, zoomLevel + 0.1))} className="px-2 py-0.5 rounded bg-surface border border-white/10 text-white font-bold cursor-pointer">+</button>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={handleDeleteSelectedNode}
                  disabled={!selectedNodeId}
                  className="px-3 py-1.5 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-500/40 font-bold hover:bg-rose-500/30 cursor-pointer disabled:opacity-40 flex items-center gap-1"
                >
                  <Trash2 className="h-3.5 w-3.5" /> Delete Node
                </button>
                <button
                  onClick={() => { setCustomNodes([]); setCustomLinks([]); setCustomBoundaries([]); setSelectedNodeId(null); }}
                  className="px-3 py-1.5 rounded-lg bg-surface border border-white/15 text-slate-300 font-bold hover:bg-white/10 cursor-pointer flex items-center gap-1"
                >
                  <RotateCcw className="h-3.5 w-3.5" /> Reset Viewport
                </button>
              </div>
            </div>

            {/* 3D CANVAS VIEWPORT */}
            <div className="p-8 bg-[#03030C] rounded-2xl border border-violet-500/40 shadow-neon-violet min-h-[500px] flex items-center justify-center relative overflow-hidden">
              <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/10 text-[10px] text-cyan-300 font-bold flex items-center gap-2 z-20">
                <MousePointer className="h-3.5 w-3.5 text-cyan-400 animate-pulse" />
                <span>3D MODE: {studioMode.toUpperCase()} • CLICK NODE TO SELECT &amp; POSITION</span>
              </div>

              <div
                style={{
                  transform: `perspective(1000px) rotateX(${tiltAngle}deg) rotateZ(${rotateAngle}deg) scale(${zoomLevel})`
                }}
                className="w-full h-[420px] relative transition-transform duration-300 ease-out border border-white/10 rounded-2xl bg-[#050514]/90 p-6 shadow-2xl"
              >
                {/* Render 3D System Boundary Boxes */}
                {customBoundaries.map(b => (
                  <div
                    key={b.id}
                    style={{
                      left: `${b.x}%`,
                      top: `${b.y}%`,
                      width: `${b.width}%`,
                      height: `${b.height}%`
                    }}
                    className={`absolute rounded-3xl border-2 border-dashed ${b.color} p-4 pointer-events-none z-0 transition-all duration-300`}
                  >
                    <span className="text-[10px] font-bold text-cyan-300 uppercase tracking-widest bg-black/80 px-2 py-0.5 rounded border border-cyan-500/40">
                      {b.name}
                    </span>
                  </div>
                ))}

                {/* Render Custom 3D Energy Links */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                  {customLinks.map((lnk) => {
                    const fromNode = customNodes.find(n => n.id === lnk.from);
                    const toNode = customNodes.find(n => n.id === lnk.to);
                    if (!fromNode || !toNode) return null;

                    const x1 = `${fromNode.x}%`;
                    const y1 = `${fromNode.y}%`;
                    const x2 = `${toNode.x}%`;
                    const y2 = `${toNode.y}%`;

                    let strokeColor = '#06b6d4';
                    if (lnk.color === 'violet') strokeColor = '#a855f7';
                    if (lnk.color === 'emerald') strokeColor = '#10b981';
                    if (lnk.color === 'amber') strokeColor = '#f59e0b';
                    if (lnk.color === 'rose') strokeColor = '#f43f5e';

                    return (
                      <g key={lnk.id}>
                        <line
                          x1={x1}
                          y1={y1}
                          x2={x2}
                          y2={y2}
                          stroke={strokeColor}
                          strokeWidth="2.5"
                          strokeDasharray={lnk.style === 'dashed' ? '6 4' : 'none'}
                          className={lnk.style === 'laser-pulse' ? 'animate-pulse' : ''}
                        />
                      </g>
                    );
                  })}
                </svg>

                {/* Render Custom 3D Nodes */}
                {customNodes.map(node => {
                  const isSelected = selectedNodeId === node.id;

                  return (
                    <div
                      key={node.id}
                      onClick={() => setSelectedNodeId(node.id)}
                      style={{
                        left: `${node.x}%`,
                        top: `${node.y}%`,
                        transform: `translate(-50%, -50%) translateZ(${node.z}px)`
                      }}
                      className={`absolute p-4 rounded-2xl border text-center transition-all duration-300 cursor-pointer shadow-2xl z-10 w-44 ${
                        node.color
                      } ${
                        isSelected ? 'scale-110 border-white shadow-2xl shadow-neon-cyan z-30 animate-pulse ring-2 ring-cyan-400' : 'hover:scale-105'
                      }`}
                    >
                      {node.tag && (
                        <span className="absolute -top-2.5 right-2 px-1.5 py-0.2 text-[8px] font-black rounded bg-cyan-500 text-black border border-cyan-300">
                          {node.tag}
                        </span>
                      )}

                      <div className="flex items-center justify-between border-b border-white/10 pb-1 mb-1 text-[9px] uppercase font-bold">
                        <span>{node.type}</span>
                        <span>{node.id}</span>
                      </div>

                      <h4 className="text-xs font-black text-white leading-tight">{node.title}</h4>
                      <p className="text-[10px] text-slate-300 font-sans mt-1 line-clamp-2">{node.detail}</p>

                      <div className="mt-2 pt-1 border-t border-white/10 text-[9px] text-cyan-300 font-bold">
                        {isSelected ? '★ ACTIVE SELECTED' : 'Click to Select'}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* SELECTED NODE 3D POSITION & ATTRIBUTE CONTROLLER */}
            {selectedNodeObj && (
              <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/40 shadow-neon-cyan space-y-3 text-xs">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <div className="flex items-center space-x-2">
                    <Move className="h-4 w-4 text-cyan-400" />
                    <span className="font-bold text-white uppercase">
                      3D Node Position &amp; Elevation Controller: <strong className="text-cyan-300">{selectedNodeObj.title} ({selectedNodeObj.id})</strong>
                    </span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-bold">XYZ Real-time Adjustment</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-slate-400 font-bold">X-Axis ({selectedNodeObj.x}%):</span>
                    <input
                      type="range"
                      min="5"
                      max="95"
                      value={selectedNodeObj.x}
                      onChange={e => updateSelectedNodePos('x', Number(e.target.value))}
                      className="w-full accent-cyan-400 cursor-pointer"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-slate-400 font-bold">Y-Axis ({selectedNodeObj.y}%):</span>
                    <input
                      type="range"
                      min="5"
                      max="95"
                      value={selectedNodeObj.y}
                      onChange={e => updateSelectedNodePos('y', Number(e.target.value))}
                      className="w-full accent-purple-400 cursor-pointer"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-slate-400 font-bold">Z-Elevation ({selectedNodeObj.z}px):</span>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={selectedNodeObj.z}
                      onChange={e => updateSelectedNodePos('z', Number(e.target.value))}
                      className="w-full accent-amber-400 cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* NODE, LINK & BOUNDARY CREATOR SUITE CONTROLS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-5 rounded-2xl bg-black/60 border border-white/10 text-xs">
              {/* 1. Add New 3D Node Panel */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block border-b border-white/10 pb-2 flex items-center gap-1.5">
                  <Plus className="h-4 w-4 text-cyan-400" /> 1. Add Custom 3D Node
                </span>

                <div>
                  <label className="text-[10px] text-slate-400 font-bold block mb-1">Node Title:</label>
                  <input
                    type="text"
                    value={newNodeTitle}
                    onChange={e => setNewNodeTitle(e.target.value)}
                    className="w-full bg-surface border border-white/15 rounded-lg px-2.5 py-1.5 text-white font-bold focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] text-slate-400 font-bold block mb-1">Type:</label>
                    <select
                      value={newNodeType}
                      onChange={e => setNewNodeType(e.target.value as any)}
                      className="w-full bg-surface border border-white/15 rounded-lg px-2.5 py-1.5 text-white font-bold focus:outline-none focus:border-cyan-400 cursor-pointer"
                    >
                      <option value="Actor" className="bg-black">Actor / User</option>
                      <option value="Requirement" className="bg-black">Requirement / Spec</option>
                      <option value="AI Engine" className="bg-black">AI Engine Kernel</option>
                      <option value="Database" className="bg-black">Database Vault</option>
                      <option value="Microservice" className="bg-black">Microservice</option>
                      <option value="API Gateway" className="bg-black">API Gateway</option>
                      <option value="Test Suite" className="bg-black">QA Test Suite</option>
                      <option value="Class Entity" className="bg-black">UML Class Entity</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 font-bold block mb-1">Badge Tag:</label>
                    <input
                      type="text"
                      value={newNodeTag}
                      onChange={e => setNewNodeTag(e.target.value)}
                      className="w-full bg-surface border border-white/15 rounded-lg px-2.5 py-1.5 text-cyan-300 font-bold focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] text-slate-400 font-bold block mb-1">Specification Detail:</label>
                  <input
                    type="text"
                    value={newNodeDetail}
                    onChange={e => setNewNodeDetail(e.target.value)}
                    className="w-full bg-surface border border-white/15 rounded-lg px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <button
                  onClick={handleAdd3DNode}
                  className="w-full py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-black shadow-neon-cyan transition cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Plus className="h-4 w-4" /> Add 3D Node
                </button>
              </div>

              {/* 2. Connect 3D Laser Links Panel */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-violet-400 uppercase tracking-wider block border-b border-white/10 pb-2 flex items-center gap-1.5">
                  <Link className="h-4 w-4 text-violet-400" /> 2. Connect 3D Laser Link
                </span>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] text-slate-400 font-bold block mb-1">From Node:</label>
                    <select
                      value={linkFrom}
                      onChange={e => setLinkFrom(e.target.value)}
                      className="w-full bg-surface border border-white/15 rounded-lg px-2.5 py-1.5 text-white font-bold focus:outline-none focus:border-violet-400 cursor-pointer"
                    >
                      {customNodes.map(n => (
                        <option key={n.id} value={n.id} className="bg-black">{n.id}: {n.title}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 font-bold block mb-1">To Node:</label>
                    <select
                      value={linkTo}
                      onChange={e => setLinkTo(e.target.value)}
                      className="w-full bg-surface border border-white/15 rounded-lg px-2.5 py-1.5 text-white font-bold focus:outline-none focus:border-violet-400 cursor-pointer"
                    >
                      {customNodes.map(n => (
                        <option key={n.id} value={n.id} className="bg-black">{n.id}: {n.title}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] text-slate-400 font-bold block mb-1">Data Flow Protocol Label:</label>
                  <input
                    type="text"
                    value={linkLabel}
                    onChange={e => setLinkLabel(e.target.value)}
                    className="w-full bg-surface border border-white/15 rounded-lg px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-violet-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] text-slate-400 font-bold block mb-1">Laser Color:</label>
                    <select
                      value={linkColor}
                      onChange={e => setLinkColor(e.target.value as any)}
                      className="w-full bg-surface border border-white/15 rounded-lg px-2.5 py-1.5 text-white font-bold focus:outline-none focus:border-violet-400 cursor-pointer"
                    >
                      <option value="cyan" className="bg-black">Cyan Neon</option>
                      <option value="violet" className="bg-black">Electric Violet</option>
                      <option value="emerald" className="bg-black">Emerald Green</option>
                      <option value="amber" className="bg-black">Amber Gold</option>
                      <option value="rose" className="bg-black">Crimson Rose</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 font-bold block mb-1">Laser Style:</label>
                    <select
                      value={linkStyle}
                      onChange={e => setLinkStyle(e.target.value as any)}
                      className="w-full bg-surface border border-white/15 rounded-lg px-2.5 py-1.5 text-white font-bold focus:outline-none focus:border-violet-400 cursor-pointer"
                    >
                      <option value="laser-pulse" className="bg-black">Pulsing Laser</option>
                      <option value="solid" className="bg-black">Solid Beam</option>
                      <option value="dashed" className="bg-black">Dashed Trace</option>
                    </select>
                  </div>
                </div>

                <button
                  onClick={handleAdd3DLink}
                  className="w-full py-2 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-black shadow-neon-violet transition cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Link className="h-4 w-4" /> Connect 3D Laser Link
                </button>
              </div>

              {/* 3. System Boundary Box Container Panel */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block border-b border-white/10 pb-2 flex items-center gap-1.5">
                  <Grid className="h-4 w-4 text-emerald-400" /> 3. Add 3D System Boundary Box
                </span>

                <div>
                  <label className="text-[10px] text-slate-400 font-bold block mb-1">Boundary System Label:</label>
                  <input
                    type="text"
                    value={boundaryName}
                    onChange={e => setBoundaryName(e.target.value)}
                    className="w-full bg-surface border border-white/15 rounded-lg px-2.5 py-1.5 text-emerald-300 font-bold focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
                  Creates a translucent 3D boundary enclosure around custom nodes to represent subsystem modules, cloud VPCs, or PCI security boundaries.
                </p>

                <button
                  onClick={handleAddBoundary}
                  className="w-full py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-black font-black shadow-neon-emerald transition cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Grid className="h-4 w-4 text-black" /> Add 3D System Boundary Enclosure
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* FLOATING POPUP MODAL FOR JSON SPEC IMPORT / EXPORT */}
      {/* ========================================================================= */}
      {isJsonModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 font-mono">
          <div className="bg-[#0B0F19] border border-cyan-400/60 shadow-2xl shadow-neon-cyan rounded-2xl max-w-2xl w-full p-6 space-y-5 relative">
            <button onClick={() => setIsJsonModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white p-1.5 rounded-lg bg-surface cursor-pointer">
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center space-x-3 border-b border-white/10 pb-3">
              <FileCode className="h-6 w-6 text-cyan-400" />
              <div>
                <h2 className="text-base font-black text-white">3D Diagram JSON Specification Editor</h2>
                <p className="text-xs text-slate-400 font-sans">Copy or paste JSON diagram schemas to import/export custom 3D architecture layouts.</p>
              </div>
            </div>

            <textarea
              rows={12}
              value={jsonSpecText}
              onChange={e => setJsonSpecText(e.target.value)}
              className="w-full bg-black/80 border border-white/15 rounded-xl p-3 text-xs text-cyan-300 font-mono focus:outline-none focus:border-cyan-400"
            />

            <div className="flex items-center justify-between">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(jsonSpecText);
                  setCopiedNotification(true);
                  setTimeout(() => setCopiedNotification(false), 2000);
                }}
                className="px-4 py-2 rounded-xl bg-surface border border-white/15 text-white text-xs font-bold hover:bg-white/10 cursor-pointer flex items-center gap-1.5"
              >
                <Copy className="h-4 w-4 text-cyan-300" />
                <span>{copiedNotification ? 'Copied to Clipboard!' : 'Copy Spec JSON'}</span>
              </button>

              <div className="flex space-x-2">
                <button onClick={handleImportJSON} className="px-4 py-2 rounded-xl bg-cyan-500 text-black font-black text-xs hover:bg-cyan-400 cursor-pointer shadow-neon-cyan">
                  Import &amp; Render 3D Diagram
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* FLOATING POPUP MODAL FOR 3D SPEC REPORT GENERATOR */}
      {/* ========================================================================= */}
      {isReportModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 font-mono">
          <div className="bg-[#0B0F19] border border-violet-400/60 shadow-2xl shadow-neon-violet rounded-2xl max-w-2xl w-full p-6 space-y-5 relative">
            <button onClick={() => setIsReportModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white p-1.5 rounded-lg bg-surface cursor-pointer">
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center space-x-3 border-b border-white/10 pb-3">
              <FileText className="h-6 w-6 text-violet-400" />
              <div>
                <h2 className="text-base font-black text-white">Generated 3D Architecture Specification Report</h2>
                <p className="text-xs text-slate-400 font-sans">Formal ISO/IEC/IEEE 42010 architectural description of user-drawn 3D diagram.</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-black/80 border border-white/10 max-h-80 overflow-y-auto space-y-3 text-xs font-sans text-slate-200">
              <h3 className="font-bold text-cyan-300 text-sm font-mono">System Architecture Report ({selectedDomain})</h3>
              <p><strong>Drawing Mode:</strong> {studioMode.toUpperCase()}</p>
              <p><strong>Total 3D Components:</strong> {customNodes.length} Nodes, {customLinks.length} Laser Links, {customBoundaries.length} Enclosures.</p>

              <div className="pt-2 border-t border-white/10 font-mono text-[11px] space-y-1">
                <strong className="text-violet-300 uppercase block">Node Topology Matrix:</strong>
                {customNodes.map(n => (
                  <div key={n.id} className="text-slate-300">
                    • <strong>[{n.id}] {n.title}</strong> ({n.type}): {n.detail} {n.tag ? `[Tag: ${n.tag}]` : ''}
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-white/10 font-mono text-[11px] space-y-1">
                <strong className="text-emerald-300 uppercase block">Data Flow Protocol Links:</strong>
                {customLinks.map(l => (
                  <div key={l.id} className="text-slate-300">
                    • {l.from} $\longrightarrow$ {l.to} via <em>"{l.label}"</em> ({l.style} laser)
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end">
              <button onClick={() => setIsReportModalOpen(false)} className="px-4 py-2 rounded-xl bg-violet-600 text-white font-black text-xs hover:bg-violet-500 cursor-pointer shadow-neon-violet">
                Close Report
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* FLOATING POPUP MODAL FOR UML NODE DETAIL INSPECTION */}
      {/* ========================================================================= */}
      {isUMLModalOpen && selectedUMLNode && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 font-mono">
          <div className="bg-[#0B0F19] border border-cyan-400/60 shadow-2xl shadow-neon-cyan rounded-2xl max-w-2xl w-full p-6 space-y-5 relative">
            <button
              onClick={() => setIsUMLModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1.5 rounded-lg bg-surface hover:bg-white/10 transition cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center space-x-3 border-b border-white/10 pb-3">
              <span className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                <Network className="h-6 w-6" />
              </span>
              <div>
                <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider block">
                  UML ARCHITECTURE NODE INSPECTOR • {selectedUMLNode.category}
                </span>
                <h2 className="text-lg font-black text-white flex items-center gap-2">
                  <span>{selectedUMLNode.id}:</span>
                  <span className="text-cyan-300">{selectedUMLNode.title}</span>
                </h2>
              </div>
            </div>

            <div className="space-y-4 text-xs font-sans">
              <div className="p-4 rounded-xl bg-black/70 border border-white/10 space-y-2">
                <span className="text-[10px] text-slate-400 font-mono font-bold uppercase">Technical Specification &amp; Description:</span>
                <p className="text-white font-bold leading-relaxed">{selectedUMLNode.description}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono">
                <div className="p-3 rounded-xl bg-black/70 border border-blue-500/30 space-y-1">
                  <span className="text-[10px] text-blue-400 uppercase font-bold block">Input Artifact Payload:</span>
                  <p className="text-blue-200 font-bold">{selectedUMLNode.inputs}</p>
                </div>

                <div className="p-3 rounded-xl bg-black/70 border border-emerald-500/30 space-y-1">
                  <span className="text-[10px] text-emerald-400 uppercase font-bold block">Output Artifact Result:</span>
                  <p className="text-emerald-200 font-bold">{selectedUMLNode.outputs}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono">
                <div className="p-3 rounded-xl bg-black/70 border border-amber-500/30 space-y-1">
                  <span className="text-[10px] text-amber-400 uppercase font-bold block">Code Symbol / Service Path:</span>
                  <p className="text-amber-200 text-[11px] truncate font-bold">{selectedUMLNode.codeSymbol}</p>
                </div>

                <div className="p-3 rounded-xl bg-black/70 border border-violet-500/30 space-y-1">
                  <span className="text-[10px] text-violet-400 uppercase font-bold block">IEEE Standard Compliance:</span>
                  <p className="text-violet-200 text-[11px] font-bold">{selectedUMLNode.standard}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-white/10">
              <span className="text-[11px] text-cyan-300 font-mono font-bold">
                Domain Context: {selectedUMLNode.domainNote}
              </span>

              <button
                onClick={() => setIsUMLModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-cyan-500 text-black font-black text-xs hover:bg-cyan-400 transition cursor-pointer shadow-neon-cyan"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
