import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  Layers, 
  Flame, 
  Brain, 
  Workflow, 
  Cpu, 
  TrendingUp, 
  Box, 
  Zap, 
  Play, 
  Pause,
  RotateCcw, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldAlert, 
  ArrowRight, 
  Activity, 
  Target, 
  CheckSquare, 
  Network, 
  Users, 
  FileText,
  Sliders,
  DollarSign,
  Clock,
  Eye,
  RefreshCw,
  Globe,
  Building,
  X,
  Crosshair,
  Maximize2
} from 'lucide-react';
import { useProject } from '../../context/ProjectContext';

type SimTab = 'impact' | 'traceability' | 'risk' | 'arena' | 'factory' | 'architecture' | 'evolution' | 'twin' | 'neural' | 'city';

interface TraceNode {
  id: string;
  type: string;
  level: number;
  title: string;
  detail: string;
  codeSymbol: string;
  slaStatus: string;
  upstreamReq: string;
  downstreamTC: string;
  domainContext: string;
}

export const Module3DSimulationLab: React.FC = () => {
  const { currentProject } = useProject();
  const [activeTab, setActiveTab] = useState<SimTab>('impact');

  // Multi-Domain Context
  const domainName = currentProject?.domain || 'Railway Reservation';
  const requirements = currentProject?.requirements || [];
  const selectedReq = requirements[0] || {
    id: 'REQ-01',
    title: 'Fast ticket booking during peak Tatkal hours',
    description: 'The website should be very fast and user-friendly during peak Tatkal booking hours.',
    improvedText: 'The system shall process ticket reservation requests within 1.2 seconds under 50,000 concurrent active users.',
    category: 'Functional',
    priority: 'Critical'
  };

  // 1. Impact Simulator State
  const [selectedReqId, setSelectedReqId] = useState<string>(selectedReq.id);
  const [impactSLA, setImpactSLA] = useState<string>('Response Latency <= 1.0s under 50,000 users');
  const [isSimulatingImpact, setIsSimulatingImpact] = useState<boolean>(false);
  const [impactStep, setImpactStep] = useState<number>(0);

  // 2. 3D Traceability State & Node Inspector Modal
  const [tiltAngle, setTiltAngle] = useState<number>(50);
  const [rotationAngle, setRotationAngle] = useState<number>(-12);
  const [selectedTraceNode, setSelectedTraceNode] = useState<TraceNode | null>({
    id: 'REQ-01',
    type: 'Requirement Baseline',
    level: 1,
    title: selectedReq.title,
    detail: selectedReq.improvedText || selectedReq.description,
    codeSymbol: 'src/services/aiEngine.ts::analyzeRequirement()',
    slaStatus: 'VERIFIED (1.2s Tatkal Latency SLA)',
    upstreamReq: 'BUSINESS-GOAL-01 (Tatkal Throughput)',
    downstreamTC: 'TC-01 (Tatkal Concurrency Stress Test)',
    domainContext: `${domainName} Core Transaction Pipeline`
  });
  const [isInspectorModalOpen, setIsInspectorModalOpen] = useState<boolean>(false);

  // 3. AI Battle Arena State
  const [orbitSpeed, setOrbitSpeed] = useState<number>(1);
  const [isOrbitPaused, setIsOrbitPaused] = useState<boolean>(false);
  const [selectedAIModel, setSelectedAIModel] = useState<any>({
    name: 'Gemini 3.6 Flash',
    provider: 'Google',
    color: '#3b82f6',
    latency: '340ms',
    accuracy: '98.4%',
    cost: '$0.07 / 1M tokens',
    reasoning: '96/100',
    tier: 'Recommended Free Tier'
  });
  const [laserBeamFired, setLaserBeamFired] = useState<boolean>(true);

  // 4. Refinement Factory State
  const [factoryProgress, setFactoryProgress] = useState<number>(0);
  const [isFactoryActive, setIsFactoryActive] = useState<boolean>(false);

  // 5. 3D Risk Terrain State
  const [hoveredRisk, setHoveredRisk] = useState<any>(null);

  // 6. Architecture Blocks Layer Filter
  const [archFilter, setArchFilter] = useState<'all' | 'frontend' | 'ai' | 'storage'>('all');

  // 7. Evolution Simulator State
  const [evolutionStep, setEvolutionStep] = useState<number>(2);

  // Canvas Refs for 3D Engines
  const arenaCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const neuralCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const currentReqObj = requirements.find(r => r.id === selectedReqId) || selectedReq;

  // Impact Simulation Step Timer
  const handleRunImpact = () => {
    setIsSimulatingImpact(true);
    setImpactStep(1);
    let step = 1;
    const interval = setInterval(() => {
      step += 1;
      setImpactStep(step);
      if (step >= 6) {
        clearInterval(interval);
        setIsSimulatingImpact(false);
      }
    }, 600);
  };

  // Trigger Factory Simulation
  const handleRunFactory = () => {
    setIsFactoryActive(true);
    setFactoryProgress(0);
    let prog = 0;
    const interval = setInterval(() => {
      prog += 5;
      setFactoryProgress(prog);
      if (prog >= 100) {
        clearInterval(interval);
        setIsFactoryActive(false);
      }
    }, 120);
  };

  // Helper for Cross-Browser Canvas Rounded Rectangle
  const drawRoundedRect = (ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) => {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  };

  // 3D Canvas Satellite Orbit Engine for AI Battle Arena
  useEffect(() => {
    if (activeTab !== 'arena') return;
    const canvas = arenaCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let angle = 0;

    const models = [
      { name: 'GPT-4o', provider: 'OpenAI', color: '#10b981', latency: '420ms', accuracy: '99.1%', cost: '$2.50 / 1M tokens', reasoning: '98/100', tier: 'Flagship' },
      { name: 'Claude 3.5', provider: 'Anthropic', color: '#06b6d4', latency: '380ms', accuracy: '98.9%', cost: '$3.00 / 1M tokens', reasoning: '99/100', tier: 'Precision' },
      { name: 'Gemini 3.6', provider: 'Google', color: '#3b82f6', latency: '340ms', accuracy: '98.4%', cost: '$0.07 / 1M tokens', reasoning: '96/100', tier: 'Recommended Free Tier' },
      { name: 'DeepSeek R1', provider: 'DeepSeek', color: '#f43f5e', latency: '650ms', accuracy: '99.5%', cost: '$0.55 / 1M tokens', reasoning: '100/100', tier: 'Reasoning Leader' },
      { name: 'Llama 3.1 70B', provider: 'Meta AI', color: '#8b5cf6', latency: '410ms', accuracy: '96.2%', cost: '$0.40 / 1M tokens', reasoning: '92/100', tier: 'Open Weights' },
      { name: 'Mistral Large', provider: 'Mistral', color: '#f59e0b', latency: '390ms', accuracy: '96.8%', cost: '$2.00 / 1M tokens', reasoning: '94/100', tier: 'Enterprise' }
    ];

    const resizeCanvas = () => {
      const parentWidth = canvas.parentElement?.clientWidth || 800;
      canvas.width = parentWidth;
      canvas.height = 380;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;
      if (width === 0 || height === 0) {
        animId = requestAnimationFrame(render);
        return;
      }

      ctx.fillStyle = '#06040F';
      ctx.fillRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;
      const radiusX = Math.min(width, height) * 0.38;
      const radiusY = radiusX * 0.42;

      // Outer Starfield Particles
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      for (let i = 0; i < 40; i++) {
        const sx = (Math.sin(i * 99 + angle * 0.1) * 0.5 + 0.5) * width;
        const sy = (Math.cos(i * 33 + angle * 0.1) * 0.5 + 0.5) * height;
        ctx.fillRect(sx, sy, 1.5, 1.5);
      }

      // Draw Orbit Ellipse Track
      ctx.strokeStyle = 'rgba(139, 92, 246, 0.35)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, Math.PI * 2);
      ctx.stroke();

      // Draw Central Requirement Core Box
      ctx.shadowBlur = 25;
      ctx.shadowColor = '#06b6d4';
      ctx.fillStyle = '#0F172A';
      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 2;
      drawRoundedRect(ctx, centerX - 100, centerY - 40, 200, 80, 14);
      ctx.fill();
      ctx.stroke();

      ctx.shadowBlur = 0;
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 11px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('3D BATTLE ORBIT CORE', centerX, centerY - 15);
      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 12px monospace';
      ctx.fillText(currentReqObj.id, centerX, centerY + 5);
      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px sans-serif';
      ctx.fillText(domainName.substring(0, 24), centerX, centerY + 22);

      // Orbit Angle Update
      if (!isOrbitPaused) {
        angle += orbitSpeed * 0.012;
      }

      // Render Orbiting Satellites
      models.forEach((m, idx) => {
        const theta = angle + (idx * Math.PI * 2) / models.length;
        const x = centerX + Math.cos(theta) * radiusX;
        const y = centerY + Math.sin(theta) * radiusY;
        const zScale = 0.7 + (Math.sin(theta) + 1) * 0.35;
        const isSelected = selectedAIModel.name === m.name;

        // Laser beam to central core
        ctx.strokeStyle = m.color;
        ctx.globalAlpha = isSelected ? 0.9 : 0.25;
        ctx.lineWidth = isSelected ? 2.5 : 1;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(centerX, centerY);
        ctx.stroke();
        ctx.globalAlpha = 1.0;

        // Pulse Particle on Laser Beam
        if (isSelected || Math.floor(angle * 5) % models.length === idx) {
          const pulseProgress = (angle * 2 + idx) % 1;
          const px = x + (centerX - x) * pulseProgress;
          const py = y + (centerY - y) * pulseProgress;
          ctx.fillStyle = m.color;
          ctx.shadowBlur = 10;
          ctx.shadowColor = m.color;
          ctx.beginPath();
          ctx.arc(px, py, 4, 0, Math.PI * 2);
          ctx.fill();
        }

        // Satellite Node Body
        ctx.shadowBlur = isSelected ? 25 : 12;
        ctx.shadowColor = m.color;
        ctx.fillStyle = m.color;
        ctx.beginPath();
        ctx.arc(x, y, (isSelected ? 16 : 12) * zScale, 0, Math.PI * 2);
        ctx.fill();

        if (isSelected) {
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 2;
          ctx.stroke();
        }

        ctx.shadowBlur = 0;
        ctx.fillStyle = '#ffffff';
        ctx.font = isSelected ? 'bold 11px monospace' : '9px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(m.name, x, y + 24);
      });

      animId = requestAnimationFrame(render);
    };

    render();

    // Mouse click listener on canvas to pick orbiting model satellite
    const handleCanvasClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radiusX = Math.min(canvas.width, canvas.height) * 0.38;
      const radiusY = radiusX * 0.42;

      models.forEach((m, idx) => {
        const theta = angle + (idx * Math.PI * 2) / models.length;
        const x = centerX + Math.cos(theta) * radiusX;
        const y = centerY + Math.sin(theta) * radiusY;

        const dist = Math.sqrt((clickX - x) ** 2 + (clickY - y) ** 2);
        if (dist <= 30) {
          setSelectedAIModel(m);
          setLaserBeamFired(true);
        }
      });
    };

    canvas.addEventListener('click', handleCanvasClick);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('click', handleCanvasClick);
    };
  }, [activeTab, orbitSpeed, isOrbitPaused, currentReqObj, selectedAIModel, domainName]);

  // 3D Neural Mesh Canvas Loop
  useEffect(() => {
    if (activeTab !== 'neural') return;
    const canvas = neuralCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const resizeNeural = () => {
      canvas.width = canvas.parentElement?.clientWidth || 800;
      canvas.height = 420;
    };
    resizeNeural();
    window.addEventListener('resize', resizeNeural);

    const nodes = Array.from({ length: 28 }, (_, i) => ({
      x: Math.random() * (canvas.width || 800),
      y: Math.random() * 420,
      vx: (Math.random() - 0.5) * 1.6,
      vy: (Math.random() - 0.5) * 1.6,
      label: `REQ-${String(i + 1).padStart(2, '0')}`,
      type: i % 3 === 0 ? 'Functional' : i % 3 === 1 ? 'NFR' : 'System'
    }));

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;
      ctx.fillStyle = '#06060F';
      ctx.fillRect(0, 0, width, height);

      ctx.lineWidth = 0.5;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 140) {
            const alpha = 1 - dist / 140;
            ctx.strokeStyle = i % 2 === 0 ? `rgba(6, 182, 212, ${alpha * 0.7})` : `rgba(139, 92, 246, ${alpha * 0.7})`;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      nodes.forEach(node => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 20 || node.x > width - 20) node.vx *= -1;
        if (node.y < 20 || node.y > height - 20) node.vy *= -1;

        ctx.shadowBlur = 14;
        ctx.shadowColor = node.type === 'Functional' ? '#06b6d4' : node.type === 'NFR' ? '#f59e0b' : '#a855f7';
        ctx.fillStyle = node.type === 'Functional' ? '#06b6d4' : node.type === 'NFR' ? '#f59e0b' : '#a855f7';

        ctx.beginPath();
        ctx.arc(node.x, node.y, 6, 0, Math.PI * 2);
        ctx.fill();

        ctx.shadowBlur = 0;
        ctx.fillStyle = '#ffffff';
        ctx.font = '10px monospace';
        ctx.fillText(node.label, node.x + 10, node.y + 4);
      });

      animId = requestAnimationFrame(render);
    };

    render();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resizeNeural);
    };
  }, [activeTab]);

  return (
    <div className="space-y-6 font-mono text-slate-100 selection:bg-cyan-500 selection:text-black">
      {/* Top Banner */}
      <div className="glass-card neon-card-violet p-6 sm:p-8 rounded-2xl border border-violet-500/40 shadow-neon-violet relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-cyan-500/20 via-violet-600/20 to-transparent blur-3xl pointer-events-none rounded-full" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-cyan-300 text-xs font-bold">
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-[10px] uppercase tracking-wider">
                ADVANCED 3D GRAPHICS &amp; SIMULATION SUITE
              </span>
              <span>•</span>
              <span className="text-violet-300">MULTI-DOMAIN REAL-TIME ENGINE</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-3">
              <Box className="h-8 w-8 text-cyan-400 animate-spin" />
              <span>RequireX — 3D Interactive Visualizations &amp; Simulators</span>
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed font-sans font-light">
              Live moving 3D objects, particle energy lasers, 3D floating traceability depth node inspection, 3D volcano risk peaks, conveyor factory pipelines, and dynamic neural vector mesh for <strong className="text-cyan-300 font-mono">{domainName}</strong>.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="px-3.5 py-2 rounded-xl bg-violet-950/80 border border-violet-400/50 text-violet-300 text-xs font-bold flex items-center gap-2 shadow-neon-violet">
              <Zap className="h-4 w-4 text-amber-300 animate-pulse" />
              <span>60 FPS 3D Engine Active</span>
            </span>
          </div>
        </div>
      </div>

      {/* 10 Simulation Sub-Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-white/10 text-xs">
        {[
          { id: 'impact', label: '1. 3D Impact Laser Simulator', icon: Workflow, color: 'text-amber-400' },
          { id: 'traceability', label: '2. 3D Floating Traceability Depth', icon: Layers, color: 'text-cyan-400' },
          { id: 'risk', label: '3. 3D Risk Volcano Peaks', icon: Flame, color: 'text-rose-400' },
          { id: 'arena', label: '4. AI Model 3D Battle Orbit', icon: Brain, color: 'text-violet-400' },
          { id: 'factory', label: '5. Refinement 3D Conveyor Factory', icon: Cpu, color: 'text-emerald-400' },
          { id: 'architecture', label: '6. 3D Isometric Architecture Blocks', icon: Box, color: 'text-blue-400' },
          { id: 'evolution', label: '7. 3D Requirement Evolution', icon: TrendingUp, color: 'text-purple-400' },
          { id: 'twin', label: '8. 3D Project Digital Twin', icon: Sparkles, color: 'text-amber-300' },
          { id: 'neural', label: '9. 3D Neural Vector Mesh', icon: Network, color: 'text-cyan-300' },
          { id: 'city', label: '10. 3D Software Architecture City', icon: Building, color: 'text-emerald-300' }
        ].map(tab => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as SimTab)}
              className={`px-3.5 py-2.5 rounded-xl font-bold flex items-center gap-2 whitespace-nowrap transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-600/40 via-blue-600/40 to-violet-600/40 text-white border border-cyan-400/60 shadow-neon-cyan'
                  : 'bg-black/40 text-slate-400 hover:text-white border border-white/5 hover:border-white/20'
              }`}
            >
              <tab.icon className={`h-4 w-4 ${isActive ? tab.color : 'text-slate-500'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* 1. 3D REQUIREMENT IMPACT LASER SIMULATOR */}
      {/* ========================================================================= */}
      {activeTab === 'impact' && (
        <div className="space-y-6 font-mono">
          <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Workflow className="h-4 w-4 text-amber-400" />
                  <span>1. 3D Requirement Impact Laser Simulator (Change Impact Analysis for {domainName})</span>
                </h3>
                <p className="text-xs text-slate-400 font-sans mt-0.5">
                  Simulates energy pulse propagation from a modified requirement through downstream components and test suites.
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <select
                  value={selectedReqId}
                  onChange={e => { setSelectedReqId(e.target.value); setImpactStep(0); }}
                  className="bg-black/70 border border-white/15 rounded-xl py-1.5 px-3 text-xs text-white cursor-pointer focus:outline-none focus:border-cyan-400"
                >
                  {requirements.map(r => (
                    <option key={r.id} value={r.id} className="bg-[#12121A] text-white">
                      {r.id}: {r.title.substring(0, 35)}...
                    </option>
                  ))}
                </select>

                <button
                  onClick={handleRunImpact}
                  disabled={isSimulatingImpact}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 via-orange-600 to-red-600 hover:from-amber-400 hover:to-red-500 text-black font-black text-xs shadow-neon-amber transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <Play className={`h-4 w-4 text-black ${isSimulatingImpact ? 'animate-spin' : ''}`} />
                  <span>{isSimulatingImpact ? 'Firing Laser Pulse...' : 'Fire 3D Laser Simulation'}</span>
                </button>
              </div>
            </div>

            {/* Requirement Modifier Input */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-xl bg-black/60 border border-amber-500/30 text-xs">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Original Requirement [{currentReqObj.id}]:</span>
                <p className="text-white font-bold bg-surface/80 p-2.5 rounded-lg border border-white/10">
                  "{currentReqObj.description}"
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold text-amber-400 uppercase">Simulated SLA Delta Modifier:</span>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={impactSLA}
                    onChange={e => setImpactSLA(e.target.value)}
                    className="flex-1 bg-surface/90 border border-amber-500/40 rounded-lg px-3 py-2 text-xs text-amber-200 font-bold focus:outline-none focus:border-amber-400"
                  />
                  <button
                    onClick={handleRunImpact}
                    className="px-3 py-2 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-lg font-bold hover:bg-amber-500/30 cursor-pointer"
                  >
                    Fire Lasers
                  </button>
                </div>
              </div>
            </div>

            {/* True 3D Isometric Laser Node Cascade Visualizer */}
            <div className="p-8 bg-[#04040A] rounded-2xl border border-white/10 relative overflow-hidden min-h-[360px] flex items-center justify-center">
              <div className="grid grid-cols-1 md:grid-cols-6 gap-4 w-full relative z-10">
                {[
                  { id: 1, title: `Root Req (${currentReqObj.id})`, sub: 'Upstream Cause', type: 'Root Node', color: 'border-cyan-400 bg-cyan-950/60 text-cyan-300 shadow-neon-cyan' },
                  { id: 2, title: 'Performance NFR', sub: 'Latency Constraint', type: 'SLA Boundary', color: 'border-amber-400 bg-amber-950/60 text-amber-300 shadow-neon-amber' },
                  { id: 3, title: `${domainName.split(' ')[0]} Subsystem`, sub: 'Core Processing Engine', type: 'Service Module', color: 'border-violet-400 bg-violet-950/60 text-violet-300 shadow-neon-violet' },
                  { id: 4, title: 'Database & Ledger', sub: 'Shared State Repository', type: 'Data Storage', color: 'border-purple-400 bg-purple-950/60 text-purple-300 shadow-neon-purple' },
                  { id: 5, title: 'REST / Webhook API', sub: '/v2/endpoint/sync', type: 'API Contract', color: 'border-blue-400 bg-blue-950/60 text-blue-300 shadow-neon-blue' },
                  { id: 6, title: 'QA Test Matrix', sub: 'TC-14, TC-19, TC-22', type: 'Affected Tests', color: 'border-rose-400 bg-rose-950/60 text-rose-300 shadow-neon-rose' }
                ].map((node) => {
                  const isHit = impactStep >= node.id;
                  const isCurrentTarget = impactStep === node.id;

                  return (
                    <div
                      key={node.id}
                      className={`p-4 rounded-xl border text-center transition-all duration-500 transform ${
                        isCurrentTarget
                          ? 'scale-110 border-amber-400 bg-amber-500/30 text-white z-20 shadow-2xl shadow-neon-amber animate-pulse'
                          : isHit
                          ? `scale-105 ${node.color} shadow-lg z-10`
                          : 'scale-95 border-white/10 bg-black/40 text-slate-500 opacity-40'
                      }`}
                    >
                      <span className="text-[9px] font-bold uppercase tracking-wider block mb-1 text-slate-400">{node.type}</span>
                      <h4 className="text-xs font-bold text-white leading-tight">{node.title}</h4>
                      <p className="text-[10px] text-slate-400 mt-1 font-sans">{node.sub}</p>

                      <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-center gap-1 text-[10px]">
                        {isHit ? (
                          <span className="text-emerald-400 font-bold flex items-center gap-1">
                            <Zap className="h-3 w-3 text-amber-300 animate-spin" /> LASER IMPACTED
                          </span>
                        ) : (
                          <span className="text-slate-600">IDLE</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. 3D FLOATING TRACEABILITY DEPTH LAYERS + INTERACTIVE NODE INSPECTOR MODAL */}
      {/* ========================================================================= */}
      {activeTab === 'traceability' && (
        <div className="space-y-6 font-mono">
          <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Layers className="h-4 w-4 text-cyan-400" />
                  <span>2. 3D Floating Traceability Depth Layers (Click ANY Box to Open Interactive Inspector)</span>
                </h3>
                <p className="text-xs text-slate-400 font-sans mt-0.5">
                  Clicking any floating 3D box opens a detailed inspection modal displaying complete upstream/downstream lineage, SLA verification, and code symbols.
                </p>
              </div>

              {/* 3D Angle Sliders */}
              <div className="flex items-center space-x-4 text-xs">
                <div className="flex items-center space-x-2">
                  <span className="text-slate-400">Tilt ({tiltAngle}°):</span>
                  <input
                    type="range"
                    min="20"
                    max="75"
                    value={tiltAngle}
                    onChange={e => setTiltAngle(Number(e.target.value))}
                    className="w-24 accent-cyan-400 cursor-pointer"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-slate-400">Rotate ({rotationAngle}°):</span>
                  <input
                    type="range"
                    min="-45"
                    max="45"
                    value={rotationAngle}
                    onChange={e => setRotationAngle(Number(e.target.value))}
                    className="w-24 accent-purple-400 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Rotatable 3D Depth Layer Box */}
            <div className="p-8 bg-[#04040E] rounded-2xl border border-white/10 min-h-[460px] flex items-center justify-center overflow-hidden relative">
              <div
                style={{ transform: `perspective(1000px) rotateX(${tiltAngle}deg) rotateZ(${rotationAngle}deg)` }}
                className="w-full space-y-6 transition-transform duration-300 ease-out"
              >
                {[
                  { name: 'LEVEL 1: REQUIREMENTS BASELINE', level: 1, color: 'border-cyan-500/60 bg-cyan-950/40 text-cyan-300 shadow-neon-cyan', prefix: 'REQ', typeName: 'Requirement Baseline' },
                  { name: 'LEVEL 2: AGILE USER STORIES', level: 2, color: 'border-violet-500/60 bg-violet-950/40 text-violet-300 shadow-neon-violet', prefix: 'US', typeName: 'Agile User Story' },
                  { name: 'LEVEL 3: TEXTUAL USE CASES', level: 3, color: 'border-purple-500/60 bg-purple-950/40 text-purple-300 shadow-neon-purple', prefix: 'UC', typeName: 'Textual Use Case' },
                  { name: 'LEVEL 4: QA TEST MATRIX ASSERTIONS', level: 4, color: 'border-emerald-500/60 bg-emerald-950/40 text-emerald-300 shadow-neon-emerald', prefix: 'TC', typeName: 'QA Test Case' }
                ].map((lvl, idx) => (
                  <div key={idx} className={`p-4 rounded-2xl border ${lvl.color} shadow-2xl transition duration-300 space-y-2 transform hover:translate-z-6`}>
                    <div className="flex items-center justify-between border-b border-white/10 pb-2">
                      <span className="text-xs font-bold tracking-wider">{lvl.name}</span>
                      <span className="text-[10px] opacity-75">3D Depth Plane 0{idx + 1}</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-6 gap-3">
                      {[1, 2, 3, 4, 5, 6].map(num => {
                        const nodeId = `${lvl.prefix}-${String(num).padStart(2, '0')}`;
                        const isSelected = selectedTraceNode?.id === nodeId;

                        return (
                          <div
                            key={num}
                            onClick={() => {
                              const traceData: TraceNode = {
                                id: nodeId,
                                type: lvl.typeName,
                                level: lvl.level,
                                title: `${lvl.typeName} for ${domainName} capability REQ-${String(num).padStart(2, '0')}`,
                                detail: `Verified ${lvl.typeName} mapped to ${domainName} core execution pipeline with bi-directional RTM traceability matrix audit.`,
                                codeSymbol: `src/components/modules/Module${lvl.prefix}.tsx::handler_${nodeId.toLowerCase()}()`,
                                slaStatus: `ISO 29148 VERIFIED (${domainName} SLA <= 1.2s)`,
                                upstreamReq: `REQ-0${num} (${domainName} Baseline)`,
                                downstreamTC: `TC-0${num} (${domainName} Automated Test Suite)`,
                                domainContext: `${domainName} Subsystem ${num}`
                              };
                              setSelectedTraceNode(traceData);
                              setIsInspectorModalOpen(true);
                            }}
                            className={`p-3 rounded-xl border text-center transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                              isSelected
                                ? 'bg-cyan-400/30 border-cyan-400 text-white font-bold shadow-neon-cyan scale-110 z-20 animate-pulse'
                                : 'bg-black/60 border-white/10 text-slate-300 hover:border-cyan-400/50 hover:bg-black/80'
                            }`}
                          >
                            <span className="text-xs font-bold block">{nodeId}</span>
                            <span className="text-[9px] text-cyan-300 block truncate mt-1">
                              {isSelected ? '★ CLICKED / ACTIVE' : 'Click to Inspect'}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* INTERACTIVE 3D LINEAGE INSPECTOR BAR */}
            {selectedTraceNode && (
              <div className="p-5 rounded-2xl bg-cyan-950/40 border border-cyan-500/50 shadow-neon-cyan space-y-3 relative">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-2 gap-2">
                  <div className="flex items-center space-x-3">
                    <span className="px-3 py-1 rounded-lg bg-cyan-500/20 text-cyan-300 font-bold text-xs border border-cyan-500/50 shadow-neon-cyan">
                      ACTIVE SELECTED NODE: {selectedTraceNode.id}
                    </span>
                    <span className="text-xs text-slate-200 font-bold">({selectedTraceNode.type})</span>
                  </div>
                  <button
                    onClick={() => setIsInspectorModalOpen(true)}
                    className="px-3 py-1 rounded-lg bg-cyan-500 text-black font-black text-xs hover:bg-cyan-400 transition cursor-pointer flex items-center gap-1.5 shadow-neon-cyan"
                  >
                    <Maximize2 className="h-3.5 w-3.5" />
                    <span>Expand Full 3D Inspector Modal</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-sans">
                  <div className="p-3 rounded-xl bg-black/70 border border-white/10 space-y-1">
                    <span className="text-[10px] text-cyan-400 font-mono font-bold uppercase block">Node Specification:</span>
                    <p className="text-white font-bold">{selectedTraceNode.title}</p>
                  </div>

                  <div className="p-3 rounded-xl bg-black/70 border border-white/10 space-y-1">
                    <span className="text-[10px] text-violet-400 font-mono font-bold uppercase block">Bi-Directional Lineage:</span>
                    <p className="text-slate-200 font-mono text-[11px]">
                      <strong className="text-cyan-300">REQ-0{selectedTraceNode.id.split('-')[1]}</strong> → <strong className="text-violet-300">US-0{selectedTraceNode.id.split('-')[1]}</strong> → <strong className="text-purple-300">UC-0{selectedTraceNode.id.split('-')[1]}</strong> → <strong className="text-emerald-300">TC-0{selectedTraceNode.id.split('-')[1]}</strong>
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-black/70 border border-white/10 space-y-1">
                    <span className="text-[10px] text-emerald-400 font-mono font-bold uppercase block">Verification SLA Status:</span>
                    <p className="text-emerald-300 font-bold">{selectedTraceNode.detail}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* FLOATING POPUP MODAL FOR 3D TRACEABILITY NODE INSPECTION */}
      {isInspectorModalOpen && selectedTraceNode && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 font-mono">
          <div className="bg-[#0B0F19] border border-cyan-400/60 shadow-2xl shadow-neon-cyan rounded-2xl max-w-2xl w-full p-6 space-y-5 relative">
            <button
              onClick={() => setIsInspectorModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1.5 rounded-lg bg-surface hover:bg-white/10 transition cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center space-x-3 border-b border-white/10 pb-3">
              <span className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                <Layers className="h-6 w-6" />
              </span>
              <div>
                <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider block">
                  3D TRACEABILITY NODE INSPECTOR • DEPTH PLANE LEVEL 0{selectedTraceNode.level}
                </span>
                <h2 className="text-lg font-black text-white flex items-center gap-2">
                  <span>{selectedTraceNode.id}:</span>
                  <span className="text-cyan-300">{selectedTraceNode.type}</span>
                </h2>
              </div>
            </div>

            <div className="space-y-4 text-xs font-sans">
              <div className="p-4 rounded-xl bg-black/70 border border-white/10 space-y-2">
                <span className="text-[10px] text-slate-400 font-mono font-bold uppercase">Requirement Specification &amp; Domain Context:</span>
                <p className="text-white font-bold leading-relaxed">{selectedTraceNode.title}</p>
                <p className="text-slate-300 text-xs">{selectedTraceNode.detail}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-black/70 border border-violet-500/30 space-y-1">
                  <span className="text-[10px] text-violet-400 font-mono font-bold uppercase block">Upstream Dependency:</span>
                  <p className="text-violet-200 font-mono font-bold">{selectedTraceNode.upstreamReq}</p>
                </div>
                <div className="p-3 rounded-xl bg-black/70 border border-emerald-500/30 space-y-1">
                  <span className="text-[10px] text-emerald-400 font-mono font-bold uppercase block">Downstream Test Case:</span>
                  <p className="text-emerald-200 font-mono font-bold">{selectedTraceNode.downstreamTC}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-black/70 border border-white/10 space-y-1">
                  <span className="text-[10px] text-amber-400 font-mono font-bold uppercase block">Code Symbol Reference:</span>
                  <p className="text-amber-200 font-mono text-[11px] truncate">{selectedTraceNode.codeSymbol}</p>
                </div>
                <div className="p-3 rounded-xl bg-black/70 border border-white/10 space-y-1">
                  <span className="text-[10px] text-cyan-400 font-mono font-bold uppercase block">Domain Category:</span>
                  <p className="text-cyan-200 font-bold">{selectedTraceNode.domainContext}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-white/10">
              <button
                onClick={() => {
                  setIsInspectorModalOpen(false);
                  setActiveTab('impact');
                  handleRunImpact();
                }}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-black font-black text-xs shadow-neon-amber transition cursor-pointer flex items-center gap-2"
              >
                <Workflow className="h-4 w-4" />
                <span>Simulate 3D Impact Laser For {selectedTraceNode.id}</span>
              </button>

              <button
                onClick={() => setIsInspectorModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-surface hover:bg-surface-hover text-white text-xs font-bold border border-white/15 cursor-pointer"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. AI MODEL 3D BATTLE ORBIT CANVAS ENGINE */}
      {/* ========================================================================= */}
      {activeTab === 'arena' && (
        <div className="space-y-6 font-mono">
          <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Brain className="h-4 w-4 text-violet-400" />
                  <span>4. AI Model 3D Battle Orbit (Interactive HTML5 Canvas 3D Graphics)</span>
                </h3>
                <p className="text-xs text-slate-400 font-sans mt-0.5">
                  Click any orbiting AI satellite to lock targets, inspect real-time performance telemetry, and test requirement battle rewrites!
                </p>
              </div>

              {/* Speed & Pause Controls */}
              <div className="flex items-center space-x-3 text-xs">
                <button
                  onClick={() => setIsOrbitPaused(!isOrbitPaused)}
                  className="px-3 py-1.5 rounded-lg bg-violet-950/80 border border-violet-500/40 text-violet-300 font-bold hover:bg-violet-900/80 cursor-pointer flex items-center gap-1.5"
                >
                  {isOrbitPaused ? <Play className="h-3.5 w-3.5 text-emerald-400" /> : <Pause className="h-3.5 w-3.5 text-amber-400" />}
                  <span>{isOrbitPaused ? 'Resume Orbit' : 'Pause Orbit'}</span>
                </button>

                <span className="text-slate-400">Speed:</span>
                {[0.5, 1, 2, 4].map(spd => (
                  <button
                    key={spd}
                    onClick={() => { setOrbitSpeed(spd); setIsOrbitPaused(false); }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold cursor-pointer transition ${
                      orbitSpeed === spd && !isOrbitPaused ? 'bg-violet-600 text-white shadow-neon-violet' : 'bg-surface hover:bg-surface-hover text-slate-400'
                    }`}
                  >
                    {spd}x
                  </button>
                ))}
              </div>
            </div>

            {/* REAL HTML5 CANVAS 3D SATELLITE ORBIT GRAPHICS */}
            <div className="p-2 bg-[#05030E] rounded-2xl border border-violet-500/40 shadow-neon-violet overflow-hidden relative">
              <canvas ref={arenaCanvasRef} className="w-full rounded-xl block cursor-pointer" />
              <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-[10px] text-cyan-300 font-bold flex items-center gap-2">
                <Crosshair className="h-3.5 w-3.5 text-rose-400 animate-spin" />
                <span>CLICK ANY SATELLITE TO SELECT TARGET AI MODEL</span>
              </div>
            </div>

            {/* SELECTED AI MODEL BATTLE TELEMETRY PANEL */}
            {selectedAIModel && (
              <div className="p-5 rounded-2xl bg-gradient-to-r from-violet-950/40 via-purple-950/40 to-cyan-950/40 border border-violet-500/50 shadow-neon-violet space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-3 gap-2">
                  <div className="flex items-center space-x-3">
                    <span className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: selectedAIModel.color }} />
                    <h3 className="text-sm font-bold text-white">
                      TARGET LOCKED: <span className="text-cyan-300">{selectedAIModel.name}</span> ({selectedAIModel.provider})
                    </h3>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-violet-500/20 text-violet-300 border border-violet-500/40">
                      {selectedAIModel.tier}
                    </span>
                  </div>

                  <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Firing Energy Beam to REQ-01 Core
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-black/60 border border-white/10">
                    <span className="text-[10px] text-slate-400 block">Response Latency:</span>
                    <span className="text-cyan-300 font-bold text-sm">{selectedAIModel.latency}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-black/60 border border-white/10">
                    <span className="text-[10px] text-slate-400 block">IEEE Defect Detection:</span>
                    <span className="text-emerald-300 font-bold text-sm">{selectedAIModel.accuracy}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-black/60 border border-white/10">
                    <span className="text-[10px] text-slate-400 block">Token Cost / 1M:</span>
                    <span className="text-amber-300 font-bold text-sm">{selectedAIModel.cost}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-black/60 border border-white/10">
                    <span className="text-[10px] text-slate-400 block">Reasoning Benchmark:</span>
                    <span className="text-violet-300 font-bold text-sm">{selectedAIModel.reasoning}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. 3D RISK VOLCANO PEAKS */}
      {/* ========================================================================= */}
      {activeTab === 'risk' && (
        <div className="space-y-6 font-mono">
          <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Flame className="h-4 w-4 text-rose-400" />
                  <span>3. 3D Risk Terrain Volcano Peaks ({domainName})</span>
                </h3>
                <p className="text-xs text-slate-400 font-sans mt-0.5">
                  Visualizes high-risk requirement hazards as elevated 3D volcano peaks where height = Risk Score ($P \times I$).
                </p>
              </div>
              <span className="text-xs text-rose-300 bg-rose-950/60 px-3 py-1 rounded-full border border-rose-500/40">
                Risk Score = Probability × Impact
              </span>
            </div>

            {/* 3D Risk Peak Mesh Cards */}
            <div className="p-6 bg-[#080308] rounded-2xl border border-rose-500/30 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { id: 'RISK-01', title: 'Peak Concurrency Bottleneck', prob: 4, imp: 5, score: 20, sev: 'Critical', req: 'REQ-01' },
                { id: 'RISK-02', title: 'Payment Gateway Timeout', prob: 3, imp: 5, score: 15, sev: 'High', req: 'REQ-04' },
                { id: 'RISK-03', title: 'EHR Data Leak Non-Compliance', prob: 2, imp: 5, score: 10, sev: 'Medium', req: 'REQ-03' },
                { id: 'RISK-04', title: 'Sub-100ms Telemetry Latency Lag', prob: 3, imp: 4, score: 12, sev: 'Medium', req: 'REQ-06' }
              ].map(risk => (
                <div
                  key={risk.id}
                  onMouseEnter={() => setHoveredRisk(risk)}
                  className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between transform hover:scale-105 ${
                    risk.sev === 'Critical'
                      ? 'border-red-500 bg-red-950/40 shadow-neon-red'
                      : 'border-amber-500 bg-amber-950/40 shadow-neon-amber'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold text-red-400">{risk.id} ({risk.req})</span>
                      <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-red-500/20 text-red-300 border border-red-500/40">
                        SCORE: {risk.score}
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-white leading-snug">{risk.title}</h4>
                  </div>

                  {/* 3D Volcano Bar Peak Representation */}
                  <div className="mt-4 pt-3 border-t border-white/10 space-y-2">
                    <div className="w-full bg-black/80 rounded-xl p-3 border border-white/10 relative overflow-hidden flex items-end justify-center">
                      <div
                        style={{ height: `${(risk.score / 25) * 80 + 20}px` }}
                        className={`w-full rounded-lg bg-gradient-to-t ${
                          risk.sev === 'Critical' ? 'from-red-600 via-rose-500 to-amber-400 shadow-neon-red' : 'from-amber-600 to-yellow-400 shadow-neon-amber'
                        } flex items-center justify-center font-bold text-black text-xs transition-all duration-500`}
                      >
                        🔥 {risk.score}
                      </div>
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-300">
                      <span>Prob: <strong>{risk.prob}/5</strong></span>
                      <span>Impact: <strong>{risk.imp}/5</strong></span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. REFINEMENT 3D CONVEYOR FACTORY */}
      {/* ========================================================================= */}
      {activeTab === 'factory' && (
        <div className="space-y-6 font-mono">
          <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Cpu className="h-4 w-4 text-emerald-400" />
                  <span>5. Requirements Refinement 3D Conveyor Factory (Interactive Pipeline)</span>
                </h3>
                <p className="text-xs text-slate-400 font-sans mt-0.5">
                  Simulates a requirement moving through a virtual 3D conveyor belt factory, stage by stage.
                </p>
              </div>

              <button
                onClick={handleRunFactory}
                disabled={isFactoryActive}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-black font-black text-xs shadow-neon-emerald transition cursor-pointer disabled:opacity-50"
              >
                <Play className={`h-4 w-4 text-black ${isFactoryActive ? 'animate-spin' : ''}`} />
                <span>{isFactoryActive ? 'Processing Conveyor Payload...' : 'Start 3D Conveyor Factory'}</span>
              </button>
            </div>

            {/* Conveyor Belt Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Conveyor Belt Progress:</span>
                <span className="text-emerald-400 font-bold">{factoryProgress}% Completed</span>
              </div>
              <div className="w-full bg-black/80 h-3 rounded-full overflow-hidden border border-white/10">
                <div className="h-full bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-500 rounded-full transition-all duration-300 shadow-neon-emerald" style={{ width: `${factoryProgress}%` }} />
              </div>
            </div>

            {/* 6 Factory Stages */}
            <div className="p-6 bg-[#040E0A] rounded-2xl border border-emerald-500/30 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-6 gap-2">
                {[
                  { stage: 1, name: 'RAW INPUT', text: 'Vague text entry', targetPct: 15 },
                  { stage: 2, name: 'AI EXTRACTION', text: 'Normalized & ID', targetPct: 35 },
                  { stage: 3, name: 'CLASSIFICATION', text: 'Category & MoSCoW', targetPct: 55 },
                  { stage: 4, name: 'QUALITY CHECK', text: '20 Defect Scan', targetPct: 75 },
                  { stage: 5, name: 'REFINEMENT', text: 'IEEE 830 Quantify', targetPct: 90 },
                  { stage: 6, name: 'APPROVED SPEC', text: 'Locked Baseline', targetPct: 100 }
                ].map(st => {
                  const isReached = factoryProgress >= st.targetPct;

                  return (
                    <div
                      key={st.stage}
                      className={`p-3 rounded-xl border text-center transition-all duration-300 ${
                        isReached
                          ? 'border-emerald-400 bg-emerald-500/20 text-white shadow-neon-emerald scale-105'
                          : 'border-white/10 bg-black/40 text-slate-500'
                      }`}
                    >
                      <span className="text-[9px] font-bold uppercase block text-slate-400">Stage 0{st.stage}</span>
                      <h4 className="text-xs font-bold text-white mt-0.5">{st.name}</h4>
                      <span className="text-[10px] text-slate-400 block mt-1 font-sans">{st.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. 3D ISOMETRIC ARCHITECTURE BLOCKS */}
      {/* ========================================================================= */}
      {activeTab === 'architecture' && (
        <div className="space-y-6 font-mono">
          <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Box className="h-4 w-4 text-blue-400" />
                  <span>6. 3D Isometric Software Architecture Component Blocks ({domainName})</span>
                </h3>
                <p className="text-xs text-slate-400 font-sans mt-0.5">
                  Interactive 3D isometric representation of core software architecture components and data flow boundaries.
                </p>
              </div>

              <div className="flex items-center space-x-2 text-xs">
                {(['all', 'frontend', 'ai', 'storage'] as const).map(flt => (
                  <button
                    key={flt}
                    onClick={() => setArchFilter(flt)}
                    className={`px-3 py-1.5 rounded-lg font-bold capitalize cursor-pointer transition ${
                      archFilter === flt ? 'bg-blue-600 text-white shadow-neon-blue' : 'bg-surface hover:bg-surface-hover text-slate-400'
                    }`}
                  >
                    {flt}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { id: 'ARCH-01', title: 'React 18 & Vite Client', type: 'frontend', color: 'border-cyan-400 bg-cyan-950/40 text-cyan-300 shadow-neon-cyan', desc: 'Single-page interactive dashboard with state sync.' },
                { id: 'ARCH-02', title: 'Gemini 3.6 Flash Engine', type: 'ai', color: 'border-violet-400 bg-violet-950/40 text-violet-300 shadow-neon-violet', desc: 'ISO 29148 real-time requirement quality audit kernel.' },
                { id: 'ARCH-03', title: '20 Defect Rule Classifier', type: 'ai', color: 'border-purple-400 bg-purple-950/40 text-purple-300 shadow-neon-purple', desc: 'Pattern matching engine for ambiguity & vagueness.' },
                { id: 'ARCH-04', title: 'RTM Traceability Matrix', type: 'storage', color: 'border-emerald-400 bg-emerald-950/40 text-emerald-300 shadow-neon-emerald', desc: 'Bi-directional linkage map (REQ -> US -> UC -> TC).' },
                { id: 'ARCH-05', title: 'IndexedDB Project Store', type: 'storage', color: 'border-amber-400 bg-amber-950/40 text-amber-300 shadow-neon-amber', desc: 'Client-side offline project state repository.' },
                { id: 'ARCH-06', title: 'SRS Markdown Export Hub', type: 'frontend', color: 'border-blue-400 bg-blue-950/40 text-blue-300 shadow-neon-blue', desc: 'IEEE 830 export renderer for DOCX, PDF, and Markdown.' }
              ].filter(b => archFilter === 'all' || b.type === archFilter).map(block => (
                <div key={block.id} className={`p-5 rounded-2xl border ${block.color} space-y-2 transform hover:-translate-y-1 transition duration-300 cursor-pointer`}>
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">{block.id} • {block.type}</span>
                    <span className="text-emerald-400 text-[10px] font-bold">ONLINE ✓</span>
                  </div>
                  <h4 className="text-sm font-bold text-white">{block.title}</h4>
                  <p className="text-xs text-slate-300 font-sans leading-relaxed">{block.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 7. 3D REQUIREMENT EVOLUTION SIMULATOR */}
      {/* ========================================================================= */}
      {activeTab === 'evolution' && (
        <div className="space-y-6 font-mono">
          <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-purple-400" />
                  <span>7. 3D Requirement Lifecycle Evolution Simulator ({domainName})</span>
                </h3>
                <p className="text-xs text-slate-400 font-sans mt-0.5">
                  Tracks how a requirement evolves from raw informal text (v1.0) into a formal IEEE 830 specification (v3.0).
                </p>
              </div>

              <div className="flex items-center space-x-2 text-xs">
                {[1, 2, 3].map(v => (
                  <button
                    key={v}
                    onClick={() => setEvolutionStep(v)}
                    className={`px-3 py-1.5 rounded-lg font-bold cursor-pointer transition ${
                      evolutionStep === v ? 'bg-purple-600 text-white shadow-neon-purple' : 'bg-surface text-slate-400 hover:text-white'
                    }`}
                  >
                    Version v{v}.0
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { v: 1, title: 'v1.0 Raw Draft (Unstructured)', text: currentReqObj.description, status: 'Ambiguous & Vague', color: 'border-rose-500/40 bg-rose-950/30 text-rose-300' },
                { v: 2, title: 'v2.0 AI Extracted & Categorized', text: currentReqObj.improvedText || currentReqObj.title, status: 'Quantified SLA', color: 'border-amber-500/40 bg-amber-950/30 text-amber-300' },
                { v: 3, title: 'v3.0 Approved IEEE 830 Spec', text: `The system shall execute ${domainName} transactions adhering to ISO/IEC/IEEE 29148 with guaranteed p99 sub-1.2s response time under 50,000 peak concurrent users.`, status: '100% Validated Baseline', color: 'border-emerald-500/40 bg-emerald-950/30 text-emerald-300' }
              ].map(ver => (
                <div
                  key={ver.v}
                  onClick={() => setEvolutionStep(ver.v)}
                  className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer space-y-3 ${
                    evolutionStep === ver.v ? `${ver.color} shadow-2xl scale-105 z-10` : 'border-white/10 bg-black/40 text-slate-500 opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <span className="text-xs font-bold">{ver.title}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-black/60 font-bold">{ver.status}</span>
                  </div>
                  <p className="text-xs font-sans text-slate-200 leading-relaxed font-bold">"{ver.text}"</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 8. 3D PROJECT DIGITAL TWIN COCKPIT */}
      {/* ========================================================================= */}
      {activeTab === 'twin' && (
        <div className="space-y-6 font-mono">
          <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-amber-300" />
                  <span>8. 3D Project Operational Digital Twin Cockpit ({domainName})</span>
                </h3>
                <p className="text-xs text-slate-400 font-sans mt-0.5">
                  Real-time simulated telemetry cockpit monitoring project requirements health, throughput, and defect density.
                </p>
              </div>
              <span className="text-xs text-amber-300 bg-amber-950/60 px-3 py-1 rounded-full border border-amber-500/40">
                DIGITAL TWIN ONLINE
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              <div className="p-5 rounded-2xl bg-black/70 border border-cyan-500/40 shadow-neon-cyan space-y-2">
                <span className="text-slate-400 font-bold uppercase text-[10px]">Total Backlog Requirements</span>
                <div className="text-2xl font-black text-cyan-300">{requirements.length || 18} Active REQs</div>
                <p className="text-[10px] text-emerald-400 font-bold">100% Traceability Coverage</p>
              </div>
              <div className="p-5 rounded-2xl bg-black/70 border border-violet-500/40 shadow-neon-violet space-y-2">
                <span className="text-slate-400 font-bold uppercase text-[10px]">AI Refinement Throughput</span>
                <div className="text-2xl font-black text-violet-300">42 REQ / min</div>
                <p className="text-[10px] text-cyan-300 font-bold">Gemini 3.6 Flash Real-Time Engine</p>
              </div>
              <div className="p-5 rounded-2xl bg-black/70 border border-emerald-500/40 shadow-neon-emerald space-y-2">
                <span className="text-slate-400 font-bold uppercase text-[10px]">Quality Audit Score</span>
                <div className="text-2xl font-black text-emerald-300">96.8 / 100</div>
                <p className="text-[10px] text-emerald-400 font-bold">ISO/IEC/IEEE 29148 Passed</p>
              </div>
              <div className="p-5 rounded-2xl bg-black/70 border border-amber-500/40 shadow-neon-amber space-y-2">
                <span className="text-slate-400 font-bold uppercase text-[10px]">Active Risk Exposure</span>
                <div className="text-2xl font-black text-amber-300">LOW (2 Hazards)</div>
                <p className="text-[10px] text-amber-400 font-bold">Mitigation Plans Verified</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 9. 3D NEURAL REQUIREMENTS MESH (CANVAS ENGINE) */}
      {/* ========================================================================= */}
      {activeTab === 'neural' && (
        <div className="space-y-6 font-mono">
          <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Network className="h-4 w-4 text-cyan-300" />
                  <span>9. 3D Neural Requirements Vector Mesh (Canvas 60 FPS Engine)</span>
                </h3>
                <p className="text-xs text-slate-400 font-sans mt-0.5">
                  Real-time HTML5 3D particle mesh engine rendering requirement vector nodes, force vectors, and live laser connections.
                </p>
              </div>
              <span className="text-xs text-cyan-300 bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-500/40">
                HTML5 CANVAS 3D ENGINE
              </span>
            </div>

            <div className="p-2 bg-[#05050C] rounded-2xl border border-cyan-500/40 shadow-neon-cyan overflow-hidden relative">
              <canvas ref={neuralCanvasRef} className="w-full rounded-xl block cursor-crosshair" />
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 10. 3D SOFTWARE ARCHITECTURE CITY (CODE STRUCTURE & QUALITY SKYLINE) */}
      {/* ========================================================================= */}
      {activeTab === 'city' && (
        <div className="space-y-6 font-mono">
          <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Building className="h-4 w-4 text-emerald-300" />
                  <span>10. 3D Software Architecture City (Code Structure &amp; Quality Skyline for {domainName})</span>
                </h3>
                <p className="text-xs text-slate-400 font-sans mt-0.5">
                  Visualizes system components as 3D skyscrapers where height = code complexity and color = quality health.
                </p>
              </div>
              <span className="text-xs text-emerald-300 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-500/40">
                SOFTWARE CITY 3D
              </span>
            </div>

            {/* 3D Skyscrapers Grid */}
            <div className="p-8 bg-[#030A06] rounded-2xl border border-emerald-500/30 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-4 min-h-[350px]">
              {[
                { name: 'UI Tower', sub: 'Navbar & Layout', height: 'h-40', status: '100% Health', color: 'from-cyan-600 via-teal-500 to-emerald-400' },
                { name: 'AI Engine Hub', sub: '20-Defect Kernel', height: 'h-52', status: '98% Health', color: 'from-violet-600 via-purple-500 to-indigo-400' },
                { name: 'Quality Citadel', sub: 'ISO 29148 Audit', height: 'h-44', status: '94% Health', color: 'from-amber-600 via-yellow-500 to-amber-300' },
                { name: 'Risk Fortress', sub: 'Heatmap Matrix', height: 'h-36', status: 'Protected', color: 'from-rose-600 via-red-500 to-pink-400' },
                { name: 'Traceability Bridge', sub: 'RTM Lineage', height: 'h-48', status: 'Verified', color: 'from-blue-600 via-cyan-500 to-teal-400' },
                { name: 'Database Vault', sub: 'IndexedDB Store', height: 'h-32', status: '100% Synced', color: 'from-emerald-600 via-green-500 to-teal-300' }
              ].map((sky, i) => (
                <div key={i} className="p-4 rounded-xl bg-surface/90 border border-white/10 space-y-3 flex flex-col justify-between hover:border-emerald-400 transition cursor-pointer transform hover:-translate-y-2">
                  <div>
                    <span className="text-[9px] text-slate-400 uppercase font-bold block mb-1">Skyscraper 0{i + 1}</span>
                    <h4 className="text-xs font-bold text-white">{sky.name}</h4>
                    <span className="text-[10px] text-cyan-300 block">{sky.sub}</span>
                  </div>

                  <div className="w-full bg-black/80 rounded-xl p-2 border border-white/10 flex items-end justify-center">
                    <div className={`w-full rounded-lg bg-gradient-to-t ${sky.color} ${sky.height} shadow-lg flex items-center justify-center font-bold text-black text-[10px]`}>
                      {sky.status.split(' ')[0]}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
