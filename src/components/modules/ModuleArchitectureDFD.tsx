import React, { useState, useEffect } from 'react';
import { 
  Cpu, 
  Server, 
  Database, 
  Globe, 
  Lock, 
  ArrowRight, 
  Layers, 
  ShieldCheck, 
  Activity, 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle2, 
  Zap,
  Terminal,
  Code2,
  Boxes,
  Gauge
} from 'lucide-react';
import { useProject } from '../../context/ProjectContext';

export const ModuleArchitectureDFD: React.FC = () => {
  const { currentProject } = useProject();
  const [selectedNode, setSelectedNode] = useState<number>(1);
  const [isSimulating, setIsSimulating] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'dfd' | 'contracts' | 'database' | 'simulator'>('dfd');

  // Real-time live simulator state
  const [packetCount, setPacketCount] = useState<number>(89240);
  const [liveTps, setLiveTps] = useState<number>(49850);
  const [liveLatency, setLiveLatency] = useState<number>(0.92);
  const [liveLogs, setLiveLogs] = useState<string[]>([
    '• Packet #89238: Ingested client payload → Rate-limit verified (0.1ms)',
    '• Packet #89239: RequireX AI Kernel generated 5 BDD user stories → Quality: 99%',
    '• Packet #89240: Stored bi-directional RTM linkage in PostgreSQL → 200 OK (0.8ms)'
  ]);

  useEffect(() => {
    if (!isSimulating) return;

    const interval = setInterval(() => {
      setPacketCount(prev => {
        const nextId = prev + 1;
        const randomLatency = (0.75 + Math.random() * 0.45).toFixed(2);
        const randomTps = Math.floor(48000 + Math.random() * 4000);
        setLiveLatency(parseFloat(randomLatency));
        setLiveTps(randomTps);

        const newLog = `• Packet #${nextId}: [${currentProject?.domain || 'General'}] Processed & Verified in Pipeline → Latency: ${randomLatency}ms (200 OK)`;
        setLiveLogs(logs => [newLog, ...logs.slice(0, 5)]);

        return nextId;
      });
    }, 1400);

    return () => clearInterval(interval);
  }, [isSimulating, currentProject]);

  if (!currentProject) return null;

  const nodes = [
    {
      id: 1,
      name: "1.0 Client Interface",
      subtitle: "Web Dashboard & Mobile Client (React / TypeScript)",
      protocol: "REST / WebSockets",
      neonClass: "neon-card-cyan",
      textColor: "text-cyan-400",
      bgColor: "bg-cyan-500/10",
      icon: Globe,
      throughput: "12,500 req/sec",
      latency: "12ms",
      details: [
        "React 18 SPA with Zustand State Sync & Framer Motion UI",
        "PWA Local Storage & IndexedDB answer buffer for zero offline data loss",
        "WebSocket connection for real-time live domain alerts"
      ]
    },
    {
      id: 2,
      name: "2.0 API Gateway & WAF Guard",
      subtitle: "Reverse Proxy, Rate Limiting & TLS 1.3 Termination",
      protocol: "HTTPS / TLS 1.3 / gRPC",
      neonClass: "neon-card-blue",
      textColor: "text-blue-400",
      bgColor: "bg-blue-500/10",
      icon: Lock,
      throughput: "50,000 req/sec",
      latency: "0.8ms",
      details: [
        "Cloudflare WAF with DDoS mitigation and OWASP Top 10 rule filtering",
        "Token bucket rate limiting: 10,000 requests/sec per API key",
        "JWT asymmetric RS256 token verification & RBAC enforcement"
      ]
    },
    {
      id: 3,
      name: "3.0 RequireX AI Analysis Kernel",
      subtitle: "NLP Extraction, Ambiguity Detection & SRS Generation",
      protocol: "gRPC Streaming / JSON-RPC",
      neonClass: "neon-card-purple",
      textColor: "text-purple-400",
      bgColor: "bg-purple-500/10",
      icon: Cpu,
      throughput: "8,200 req/sec",
      latency: "180ms",
      details: [
        "NLP semantic parser with ISO/IEC/IEEE 29148 compliance heuristics",
        "Bi-directional RTM traceability graph synthesis engine",
        "Automatic Gherkin BDD scenario generator & QA test case synthesizer"
      ]
    },
    {
      id: 4,
      name: "4.0 Database Persistence & Audit",
      subtitle: "PostgreSQL 16 & Redis 7 Cache (AES-256 Encrypted)",
      protocol: "TCP / PostgreSQL Wire Protocol",
      neonClass: "neon-card-emerald",
      textColor: "text-emerald-400",
      bgColor: "bg-emerald-500/10",
      icon: Database,
      throughput: "24,000 queries/sec",
      latency: "1.2ms",
      details: [
        "PostgreSQL 16 with JSONB column stores for flexible requirement schemas",
        "Redis cluster for in-memory session caching and rate-limiting counters",
        "Write-Ahead Logging (WAL) with multi-region replication & point-in-time recovery"
      ]
    }
  ];

  const selectedNodeData = nodes.find(n => n.id === selectedNode) || nodes[0];

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="glass-card p-6 sm:p-8 rounded-2xl border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <div className="flex items-center space-x-2 text-cyan-400 text-xs font-bold font-mono mb-2">
            <Cpu className="h-4 w-4" />
            <span>INNOVATIVE SE TOOL • SYSTEM ARCHITECTURE & DFD SIMULATOR</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white font-sans tracking-tight">System Architecture & DFD Pipeline</h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-3xl leading-relaxed font-light">
            Interactive multi-tier architecture diagram, OpenAPI contracts, PostgreSQL schema, and real-time live traffic packet stream simulator for <strong className="text-cyan-300 font-mono">{currentProject.name}</strong>.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
          {[
            { id: 'dfd', label: 'Architecture DFD' },
            { id: 'contracts', label: 'API Contracts' },
            { id: 'database', label: 'DB Schema' },
            { id: 'simulator', label: 'Live Traffic Stream' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-2 rounded-xl border transition-all duration-200 cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-neon-cyan font-bold'
                  : 'bg-surface/60 border-white/10 text-slate-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main DFD Interactive Canvas */}
      {activeTab === 'dfd' && (
        <div className="space-y-6">
          {/* 4 Interactive DFD Tier Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {nodes.map((node) => {
              const Icon = node.icon;
              const isSelected = selectedNode === node.id;

              return (
                <div
                  key={node.id}
                  onClick={() => setSelectedNode(node.id)}
                  className={`glass-card ${node.neonClass} p-6 rounded-2xl border cursor-pointer transition-all duration-300 space-y-4 ${
                    isSelected ? 'ring-2 ring-cyan-400 scale-[1.03]' : 'border-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className={`h-10 w-10 rounded-xl ${node.bgColor} flex items-center justify-center ${node.textColor}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-400">
                      Tier 0{node.id}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white font-sans">{node.name}</h3>
                    <p className="text-xs text-slate-300 font-light mt-1 leading-snug">{node.subtitle}</p>
                  </div>

                  <div className="pt-2 border-t border-white/10 space-y-1 text-[11px] font-mono text-slate-400">
                    <p className="flex justify-between">
                      <span>Throughput:</span>
                      <span className="text-white font-bold">{node.throughput}</span>
                    </p>
                    <p className="flex justify-between">
                      <span>Latency:</span>
                      <span className="text-emerald-400 font-bold">{node.latency}</span>
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Selected Node Detailed Architecture Inspector */}
          <div className="glass-card p-6 sm:p-8 rounded-2xl border border-cyan-500/30 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center space-x-3">
                <selectedNodeData.icon className={`h-6 w-6 ${selectedNodeData.textColor}`} />
                <div>
                  <h3 className="text-lg font-bold text-white font-sans">{selectedNodeData.name}</h3>
                  <p className="text-xs text-slate-400 font-mono">Protocol: {selectedNodeData.protocol}</p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-mono font-bold">
                Latency SLA: {selectedNodeData.latency}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              {selectedNodeData.details.map((detail, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-black/60 border border-white/10 flex items-start space-x-2 text-xs font-mono text-slate-300">
                  <CheckCircle2 className="h-4 w-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{detail}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* API Contracts Tab */}
      {activeTab === 'contracts' && (
        <div className="glass-card p-6 sm:p-8 rounded-2xl border border-white/10 space-y-6 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Code2 className="h-5 w-5 text-cyan-400" />
              <span>OpenAPI v3.1 REST & WebSocket Contracts</span>
            </h3>
            <span className="text-xs text-slate-400">Target Endpoint: /api/v1/requirements/analyze</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-black/70 p-5 rounded-2xl border border-cyan-500/30 space-y-3">
              <span className="text-cyan-400 font-bold block border-b border-white/10 pb-2">POST /api/v1/requirements/analyze (Request Body)</span>
              <pre className="text-slate-300 text-[11px] overflow-x-auto leading-relaxed">
{`{
  "projectId": "${currentProject.id}",
  "domain": "${currentProject.domain}",
  "specifications": [
    {
      "id": "REQ-01",
      "rawText": "System must handle peak user transactions smoothly without delay."
    }
  ],
  "enforceStandards": ["IEEE-830", "ISO-29148"]
}`}
              </pre>
            </div>

            <div className="bg-black/70 p-5 rounded-2xl border border-purple-500/30 space-y-3">
              <span className="text-emerald-400 font-bold block border-b border-white/10 pb-2">200 OK Response Payload (Analyzed)</span>
              <pre className="text-slate-300 text-[11px] overflow-x-auto leading-relaxed">
{`{
  "status": "SUCCESS",
  "qualityScore": 98,
  "ambiguityFlags": 0,
  "extractedCount": ${currentProject.requirements.length},
  "rtmTraceability": "100%",
  "srsDownloadUrl": "/exports/srs_${currentProject.id}.pdf"
}`}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* Data Schema Tab */}
      {activeTab === 'database' && (
        <div className="glass-card p-6 sm:p-8 rounded-2xl border border-white/10 space-y-6 font-mono text-xs">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Database className="h-5 w-5 text-emerald-400" />
            <span>Persistence Entity Relationship Schema (PostgreSQL AES-256)</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-black/70 p-5 rounded-2xl border border-cyan-500/30 space-y-2">
              <h4 className="text-cyan-400 font-bold border-b border-white/10 pb-2">TABLE requirements</h4>
              <p>• id (UUID PRIMARY KEY)</p>
              <p>• project_id (FK → projects.id)</p>
              <p>• title (VARCHAR 255)</p>
              <p>• description (TEXT ENCRYPTED)</p>
              <p>• category (ENUM RequirementCategory)</p>
              <p>• priority (ENUM PriorityLevel)</p>
              <p>• status (ENUM RequirementStatus)</p>
            </div>

            <div className="bg-black/70 p-5 rounded-2xl border border-blue-500/30 space-y-2">
              <h4 className="text-blue-400 font-bold border-b border-white/10 pb-2">TABLE user_stories</h4>
              <p>• id (VARCHAR PRIMARY KEY)</p>
              <p>• requirement_id (FK → requirements.id)</p>
              <p>• as_a (VARCHAR 100)</p>
              <p>• i_want_to (TEXT)</p>
              <p>• so_that (TEXT)</p>
              <p>• story_points (INT)</p>
              <p>• gherkin_scenario (TEXT)</p>
            </div>

            <div className="bg-black/70 p-5 rounded-2xl border border-emerald-500/30 space-y-2">
              <h4 className="text-emerald-400 font-bold border-b border-white/10 pb-2">TABLE test_cases</h4>
              <p>• id (VARCHAR PRIMARY KEY)</p>
              <p>• requirement_id (FK → requirements.id)</p>
              <p>• category (ENUM TestCategory)</p>
              <p>• input_data (TEXT)</p>
              <p>• expected_output (TEXT)</p>
              <p>• execution_status (VARCHAR)</p>
            </div>
          </div>
        </div>
      )}

      {/* Simulator Tab - Real-time Live Traffic Packet Stream */}
      {activeTab === 'simulator' && (
        <div className="glass-card p-6 sm:p-8 rounded-2xl border border-white/10 space-y-6 font-mono text-xs">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Activity className="h-5 w-5 text-amber-400" />
                <span>Real-Time Live Data Packet Stream Simulator</span>
              </h3>
              <p className="text-slate-400 text-xs mt-1">Live streaming client payloads flowing across Tier 1 (Client) → Tier 2 (WAF Gateway) → Tier 3 (AI Kernel) → Tier 4 (Database).</p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsSimulating(!isSimulating)}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold font-mono flex items-center space-x-2 transition duration-200 cursor-pointer ${
                  isSimulating 
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-neon-rose' 
                    : 'bg-emerald-500 text-slate-950 shadow-neon-emerald'
                }`}
              >
                {isSimulating ? (
                  <>
                    <Pause className="h-4 w-4" />
                    <span>Pause Live Stream</span>
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4" />
                    <span>Start Live Stream</span>
                  </>
                )}
              </button>

              <button
                onClick={() => { setPacketCount(89200); setLiveLogs([]); }}
                className="p-2.5 rounded-xl bg-surface hover:bg-surface-hover border border-white/10 text-slate-300 transition"
                title="Reset Packet Counter"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Live Metrics Dashboard */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-black/60 border border-cyan-500/30 space-y-1">
              <span className="text-[10px] text-slate-400 block uppercase">Total Ingested Packets</span>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-cyan-400">#{packetCount}</span>
                <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-black/60 border border-emerald-500/30 space-y-1">
              <span className="text-[10px] text-slate-400 block uppercase">Live Stream Throughput</span>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-emerald-400">{liveTps.toLocaleString()} TPS</span>
                <Gauge className="h-4 w-4 text-emerald-400" />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-black/60 border border-purple-500/30 space-y-1">
              <span className="text-[10px] text-slate-400 block uppercase">Average End-to-End Latency</span>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-purple-400">{liveLatency} ms</span>
                <span className="text-[10px] text-emerald-400 font-bold">✓ Sub-1ms SLA</span>
              </div>
            </div>
          </div>

          {/* Animated 4-Tier Pipeline Stream */}
          <div className="bg-black/90 p-6 rounded-2xl border border-white/10 space-y-6">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span className="font-bold text-cyan-400">Tier 1: Client Ingestion</span>
              <span className={isSimulating ? "text-emerald-400 font-bold flex items-center gap-1.5" : "text-slate-500"}>
                <span className={`h-2.5 w-2.5 rounded-full ${isSimulating ? 'bg-emerald-400 animate-ping' : 'bg-slate-600'}`} />
                {isSimulating ? "STREAM ACTIVE • 0% PACKET LOSS" : "STREAM PAUSED"}
              </span>
              <span className="font-bold text-emerald-400">Tier 4: PostgreSQL Sink</span>
            </div>

            {/* Visual Multi-Node Stream Pipeline */}
            <div className="relative h-16 bg-surface/80 rounded-2xl border border-white/10 overflow-hidden flex items-center px-8 justify-between">
              <div className="flex flex-col items-center z-10">
                <div className="h-4 w-4 rounded-full bg-cyan-400 shadow-neon-cyan" />
                <span className="text-[9px] text-slate-400 mt-1">Client</span>
              </div>

              <div className="flex flex-col items-center z-10">
                <div className="h-4 w-4 rounded-full bg-blue-400 shadow-neon-blue" />
                <span className="text-[9px] text-slate-400 mt-1">WAF Gate</span>
              </div>

              <div className="flex flex-col items-center z-10">
                <div className="h-4 w-4 rounded-full bg-purple-400 shadow-neon-purple" />
                <span className="text-[9px] text-slate-400 mt-1">AI Kernel</span>
              </div>

              <div className="flex flex-col items-center z-10">
                <div className="h-4 w-4 rounded-full bg-emerald-400 shadow-neon-emerald" />
                <span className="text-[9px] text-slate-400 mt-1">PostgreSQL</span>
              </div>

              {isSimulating && (
                <div className="absolute inset-0 flex items-center px-8 pointer-events-none">
                  <div className="h-1.5 w-full bg-gradient-to-r from-cyan-400 via-purple-400 to-emerald-400 opacity-30" />
                  <div className="absolute h-3 w-10 rounded-full bg-cyan-300 blur-sm animate-pulse" style={{ left: `${(packetCount % 5) * 20}%` }} />
                </div>
              )}
            </div>

            {/* Live Terminal Logs */}
            <div className="p-4 rounded-xl bg-black/80 border border-white/10 space-y-2 text-[11px]">
              <div className="flex items-center justify-between text-slate-400 border-b border-white/10 pb-2">
                <span className="text-cyan-400 font-bold flex items-center gap-1.5">
                  <Terminal className="h-3.5 w-3.5" />
                  <span>REAL-TIME STREAM INGESTION LOGS:</span>
                </span>
                <span className="text-[10px] text-emerald-400">AUTO-SCROLLING LIVE</span>
              </div>

              <div className="space-y-1.5 pt-1 font-mono">
                {liveLogs.map((log, lIdx) => (
                  <p key={lIdx} className={lIdx === 0 ? "text-cyan-300 font-bold animate-fadeIn" : "text-slate-400"}>
                    {log}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
