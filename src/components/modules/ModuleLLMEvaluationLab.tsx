import React, { useState, useEffect } from 'react';
import { useProject } from '../../context/ProjectContext';
import { 
  LLMModelConfig, 
  LLMEvalTaskId, 
  BenchmarkRun, 
  GroundTruthBenchmark 
} from '../../types/llmEvaluation';
import { 
  EVALUATION_TASKS_CONFIG, 
  DEFAULT_LLM_MODELS, 
  GROUND_TRUTH_DATASETS 
} from '../../services/llmGroundTruthService';
import { LLMEvaluationService } from '../../services/llmEvaluationService';
import { LLMExportService } from '../../services/llmExportService';

import { RadarChartComparison } from './llm-eval/RadarChartComparison';
import { ConfusionMatrixViewer } from './llm-eval/ConfusionMatrixViewer';
import { HeadToHeadMatchup } from './llm-eval/HeadToHeadMatchup';
import { OutputComparisonViewer } from './llm-eval/OutputComparisonViewer';
import { CostLatencyScatterPlot } from './llm-eval/CostLatencyScatterPlot';
import { ModelConfigModal } from './llm-eval/ModelConfigModal';
import { CustomBenchmarkBuilder } from './llm-eval/CustomBenchmarkBuilder';

import { 
  Brain, 
  Play, 
  Sparkles, 
  Settings, 
  Download, 
  RotateCcw, 
  Trophy, 
  Target, 
  CheckSquare, 
  FileCode2, 
  Zap, 
  Clock, 
  DollarSign, 
  BookOpen, 
  ShieldAlert, 
  ChevronRight, 
  FileUp, 
  FileSpreadsheet, 
  FileText,
  Activity,
  Award,
  Layers
} from 'lucide-react';

export const ModuleLLMEvaluationLab: React.FC = () => {
  const { currentProject } = useProject();

  // State: Models & Config
  const [models, setModels] = useState<LLMModelConfig[]>([]);
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [isCustomBenchmarkOpen, setIsCustomBenchmarkOpen] = useState(false);

  // State: Benchmark Wizard Steps
  const [selectedDomain, setSelectedDomain] = useState<string>(currentProject?.domain || 'Railway Reservation');
  const [ingestionMethod, setIngestionMethod] = useState<'sample' | 'project' | 'paste' | 'upload'>('sample');
  const [pastedRequirements, setPastedRequirements] = useState<string>('');
  const [selectedModelIds, setSelectedModelIds] = useState<string[]>(['gpt-4o', 'claude-3-5-sonnet', 'gemini-1-5-pro', 'llama-3-1-70b']);
  const [selectedTaskIds, setSelectedTaskIds] = useState<LLMEvalTaskId[]>(EVALUATION_TASKS_CONFIG.map(t => t.id));

  // State: Execution
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [progressPercent, setProgressPercent] = useState<number>(0);
  const [currentRunningModel, setCurrentRunningModel] = useState<string>('');
  const [currentRunningTask, setCurrentRunningTask] = useState<string>('');

  // State: Results & Active Tab inside Lab
  const [currentBenchmark, setCurrentBenchmark] = useState<BenchmarkRun | null>(null);
  const [benchmarkHistory, setBenchmarkHistory] = useState<BenchmarkRun[]>([]);
  const [activeLabTab, setActiveLabTab] = useState<
    'wizard' | 'dashboard' | 'radar' | 'tasks' | 'headtohead' | 'output' | 'leaderboard' | 'cost' | 'history' | 'methodology'
  >('dashboard');

  // Load models and initial baseline benchmark on mount
  useEffect(() => {
    const loadedModels = LLMEvaluationService.getModels();
    setModels(loadedModels);
    const history = LLMEvaluationService.getBenchmarkHistory();
    setBenchmarkHistory(history);

    if (history.length > 0) {
      setCurrentBenchmark(history[0]);
    } else {
      // Run initial baseline
      runInitialBaseline(loadedModels);
    }
  }, []);

  const runInitialBaseline = async (loadedModels: LLMModelConfig[]) => {
    const initialRun = await LLMEvaluationService.runBenchmarkSuite(
      loadedModels.slice(0, 4),
      EVALUATION_TASKS_CONFIG.map(t => t.id),
      'Railway Reservation',
      currentProject?.name || 'Railway Reservation System'
    );
    setCurrentBenchmark(initialRun);
    setBenchmarkHistory([initialRun]);
  };

  const handleStartBenchmark = async () => {
    const activeModels = models.filter(m => selectedModelIds.includes(m.id));
    if (activeModels.length === 0 || selectedTaskIds.length === 0) return;

    setIsRunning(true);
    setProgressPercent(0);

    try {
      const run = await LLMEvaluationService.runBenchmarkSuite(
        activeModels,
        selectedTaskIds,
        selectedDomain,
        currentProject?.name || `${selectedDomain} Project`,
        undefined,
        (pct, modelName, taskName) => {
          setProgressPercent(pct);
          setCurrentRunningModel(modelName);
          setCurrentRunningTask(taskName);
        }
      );

      setCurrentBenchmark(run);
      setBenchmarkHistory([run, ...benchmarkHistory.filter(h => h.id !== run.id)]);
      setActiveLabTab('dashboard');
    } catch (err) {
      console.error('Benchmark execution error', err);
    } finally {
      setIsRunning(false);
      setProgressPercent(100);
    }
  };

  const toggleModelSelection = (id: string) => {
    if (selectedModelIds.includes(id)) {
      if (selectedModelIds.length > 1) {
        setSelectedModelIds(selectedModelIds.filter(m => m !== id));
      }
    } else {
      setSelectedModelIds([...selectedModelIds, id]);
    }
  };

  const toggleTaskSelection = (id: LLMEvalTaskId) => {
    if (selectedTaskIds.includes(id)) {
      if (selectedTaskIds.length > 1) {
        setSelectedTaskIds(selectedTaskIds.filter(t => t !== id));
      }
    } else {
      setSelectedTaskIds([...selectedTaskIds, id]);
    }
  };

  const selectAllTasks = () => {
    setSelectedTaskIds(EVALUATION_TASKS_CONFIG.map(t => t.id));
  };

  const handleSaveCustomBenchmark = (customBench: GroundTruthBenchmark) => {
    GROUND_TRUTH_DATASETS[customBench.domain] = customBench;
    setSelectedDomain(customBench.domain);
  };

  const labNavItems = [
    { id: 'dashboard', label: 'Overview & KPIs', icon: Activity },
    { id: 'wizard', label: 'New Benchmark', icon: Play },
    { id: 'radar', label: '8D Radar Chart', icon: Target },
    { id: 'tasks', label: 'Task Scores & Matrix', icon: CheckSquare },
    { id: 'headtohead', label: 'Head-to-Head', icon: Award },
    { id: 'output', label: 'Output Inspector', icon: Layers },
    { id: 'leaderboard', label: 'Model Leaderboard', icon: Trophy },
    { id: 'cost', label: 'Cost vs Speed', icon: DollarSign },
    { id: 'history', label: 'Run History', icon: RotateCcw },
    { id: 'methodology', label: 'Methodology & Ethics', icon: BookOpen },
  ];

  return (
    <div className="space-y-8">
      {/* Top Banner with Dark Violet & Cobalt Blue Glow */}
      <div className="glass-card neon-card-violet p-6 sm:p-8 rounded-2xl border border-violet-500/40 shadow-neon-violet relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 blur-3xl pointer-events-none rounded-full" />
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-violet-300 text-xs font-bold font-mono">
              <span className="px-2.5 py-0.5 rounded-full bg-violet-500/20 border border-violet-400/40 text-[10px] uppercase tracking-wider">
                SCIENTIFIC RE EVALUATION SUITE
              </span>
              <span>•</span>
              <span className="text-cyan-300">ACADEMIC BENCHMARK 2.0</span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight flex items-center gap-3">
              <Brain className="h-8 w-8 text-cyan-400" />
              <span>RequireX AI — LLM Model Evaluation Lab</span>
            </h1>
            
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed font-light">
              Empirically evaluate, benchmark, and compare Large Language Models specifically on Software Requirements Engineering tasks: Extraction, Classification, Ambiguity Detection, Conflict Analysis, Test Case Synthesis, and IEEE 830 Specification Generation.
            </p>
          </div>

          {/* Action Hub */}
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
            <button
              onClick={() => setIsConfigModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-black/40 hover:bg-black/60 border border-white/10 hover:border-cyan-400 text-slate-300 hover:text-white transition flex items-center gap-2 cursor-pointer"
            >
              <Settings className="h-4 w-4 text-cyan-400" />
              <span>Configure Models</span>
            </button>

            {currentBenchmark && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => LLMExportService.exportBenchmarkPDF(currentBenchmark)}
                  className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white font-bold transition flex items-center gap-1.5 shadow-neon-violet cursor-pointer"
                  title="Export PDF Report"
                >
                  <Download className="h-4 w-4" />
                  <span>Export PDF</span>
                </button>
                <button
                  onClick={() => LLMExportService.exportBenchmarkDOCX(currentBenchmark)}
                  className="px-3 py-2 rounded-xl bg-black/40 hover:bg-black/60 border border-blue-400/40 text-blue-300 transition flex items-center gap-1 cursor-pointer"
                  title="Export Word Document"
                >
                  <FileText className="h-4 w-4" />
                  <span>DOCX</span>
                </button>
                <button
                  onClick={() => LLMExportService.exportBenchmarkCSV(currentBenchmark)}
                  className="px-3 py-2 rounded-xl bg-black/40 hover:bg-black/60 border border-cyan-400/40 text-cyan-300 transition flex items-center gap-1 cursor-pointer"
                  title="Export CSV Table"
                >
                  <FileSpreadsheet className="h-4 w-4" />
                  <span>CSV</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Live Execution Progress Bar (Shows when benchmark is running) */}
        {isRunning && (
          <div className="mt-6 p-4 rounded-xl bg-black/80 border border-cyan-500/40 shadow-neon-blue space-y-2 font-mono text-xs">
            <div className="flex items-center justify-between text-cyan-300">
              <span className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-cyan-400 animate-spin" />
                Executing Standardized Benchmark Suite ({progressPercent}%)
              </span>
              <span>Model: <strong className="text-white">{currentRunningModel}</strong> • Task: <strong className="text-violet-300">{currentRunningTask}</strong></span>
            </div>
            <div className="h-2 bg-surface rounded-full overflow-hidden p-0.5 border border-white/10">
              <div
                className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 rounded-full transition-all duration-300 shadow-neon-cyan"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Lab Navigation Pill Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-white/10 font-mono text-xs">
        {labNavItems.map(tab => {
          const isActive = activeLabTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveLabTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl font-bold flex items-center gap-2 whitespace-nowrap transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-blue-600/40 to-violet-600/40 text-white border border-blue-400/50 shadow-neon-blue'
                  : 'bg-black/40 text-slate-400 hover:text-white border border-white/5 hover:border-white/20'
              }`}
            >
              <tab.icon className={`h-4 w-4 ${isActive ? 'text-cyan-300' : 'text-slate-500'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: DASHBOARD OVERVIEW & 8 SUMMARY KPIS */}
      {activeLabTab === 'dashboard' && currentBenchmark && (
        <div className="space-y-6">
          {/* 8 Top Summary Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 font-mono">
            {[
              { label: 'Models Tested', value: currentBenchmark.modelsTested.length, icon: Brain, color: 'text-cyan-400' },
              { label: 'Tasks Run', value: currentBenchmark.tasksRun.length, icon: CheckSquare, color: 'text-blue-400' },
              { label: 'Top Model', value: currentBenchmark.results[currentBenchmark.topModelId]?.modelName.split(' ')[1] || 'GPT-4o', icon: Trophy, color: 'text-violet-300' },
              { label: 'Best Analysis', value: currentBenchmark.results[currentBenchmark.bestAnalysisModelId]?.modelName.split(' ')[1] || 'Claude', icon: Target, color: 'text-emerald-400' },
              { label: 'Best Testing', value: currentBenchmark.results[currentBenchmark.bestTestingModuleId]?.modelName.split(' ')[1] || 'GPT-4o', icon: CheckSquare, color: 'text-cyan-300' },
              { label: 'JSON Reliability', value: currentBenchmark.results[currentBenchmark.bestStructuredModelId]?.modelName.split(' ')[1] || 'GPT-4o', icon: FileCode2, color: 'text-violet-400' },
              { label: 'Fastest Speed', value: currentBenchmark.results[currentBenchmark.fastestModelId]?.modelName.split(' ')[1] || 'Llama', icon: Clock, color: 'text-red-400' },
              { label: 'Best Value', value: currentBenchmark.results[currentBenchmark.bestValueModelId]?.modelName.split(' ')[1] || 'Llama', icon: DollarSign, color: 'text-emerald-300' },
            ].map((kpi, i) => (
              <div key={i} className="glass-card p-4 rounded-xl border border-white/10 text-center space-y-1 hover:border-blue-400/40 hover:shadow-neon-blue transition">
                <kpi.icon className={`h-4 w-4 mx-auto ${kpi.color}`} />
                <span className="text-[9px] text-slate-400 uppercase tracking-wider block truncate">{kpi.label}</span>
                <span className={`text-base font-black ${kpi.color} block truncate`}>{kpi.value}</span>
              </div>
            ))}
          </div>

          {/* RequireX Recommendation Callout Card */}
          <div className="glass-card p-6 rounded-2xl border border-violet-500/40 shadow-neon-violet space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-sm font-bold text-white font-mono flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-violet-400" />
                <span>RequireX Architectural Recommendation for {currentBenchmark.domain}</span>
              </h3>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-violet-500/20 text-violet-300 font-mono font-bold border border-violet-500/30">
                BENCHMARK-BACKED INSIGHT
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
              <div className="p-4 rounded-xl bg-black/40 border border-blue-500/30 space-y-1.5">
                <span className="text-[10px] text-blue-400 uppercase font-bold">Recommended for Requirements Analysis:</span>
                <p className="text-sm font-bold text-white">{currentBenchmark.recommendationSummary.recommendedForAnalysis.modelName}</p>
                <p className="text-[11px] text-slate-300 font-sans font-light">{currentBenchmark.recommendationSummary.recommendedForAnalysis.reason}</p>
              </div>

              <div className="p-4 rounded-xl bg-black/40 border border-violet-500/30 space-y-1.5">
                <span className="text-[10px] text-violet-400 uppercase font-bold">Recommended for QA &amp; Test Matrix:</span>
                <p className="text-sm font-bold text-white">{currentBenchmark.recommendationSummary.recommendedForTesting.modelName}</p>
                <p className="text-[11px] text-slate-300 font-sans font-light">{currentBenchmark.recommendationSummary.recommendedForTesting.reason}</p>
              </div>

              <div className="p-4 rounded-xl bg-black/40 border border-emerald-500/30 space-y-1.5">
                <span className="text-[10px] text-emerald-400 uppercase font-bold">Recommended for Cost Efficiency:</span>
                <p className="text-sm font-bold text-white">{currentBenchmark.recommendationSummary.recommendedForCost.modelName}</p>
                <p className="text-[11px] text-slate-300 font-sans font-light">{currentBenchmark.recommendationSummary.recommendedForCost.reason}</p>
              </div>
            </div>
          </div>

          {/* Quick Dual Visualizer: Radar & Confusion Matrix */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <RadarChartComparison
              results={currentBenchmark.results}
              models={currentBenchmark.modelsTested}
              showBreakdown={false}
            />
            <ConfusionMatrixViewer
              results={currentBenchmark.results}
              models={currentBenchmark.modelsTested}
            />
          </div>

          {/* Domain Performance Comparison Matrix */}
          <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <h3 className="text-sm font-bold text-white font-mono">Cross-Domain Model Performance Matrix</h3>
                <p className="text-xs text-slate-400 font-light">Demonstrates that model performance varies dynamically depending on domain semantics.</p>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">Scores in %</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs">
                <thead>
                  <tr className="border-b border-white/10 text-slate-400">
                    <th className="py-2.5 px-3">LLM Model</th>
                    <th className="py-2.5 px-3">Railway Reservation</th>
                    <th className="py-2.5 px-3">E-Commerce</th>
                    <th className="py-2.5 px-3">Hospital Management</th>
                    <th className="py-2.5 px-3">Banking</th>
                    <th className="py-2.5 px-3">Disaster Management</th>
                    <th className="py-2.5 px-3">Domain Avg</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {[
                    { name: 'Anthropic Claude 3.5 Sonnet', scores: [95, 94, 96, 94, 95], avg: 94.8, color: '#8A2BE2' },
                    { name: 'OpenAI GPT-4o', scores: [94, 95, 93, 95, 92], avg: 93.8, color: '#00F0FF' },
                    { name: 'Google Gemini 1.5 Pro', scores: [91, 92, 93, 90, 93], avg: 91.8, color: '#0066FF' },
                    { name: 'Meta Llama 3.1 70B', scores: [87, 88, 86, 89, 87], avg: 87.4, color: '#10B981' }
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-white/5 transition">
                      <td className="py-3 px-3 font-bold text-white flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full" style={{ backgroundColor: row.color }} />
                        {row.name}
                      </td>
                      {row.scores.map((sc, idx) => (
                        <td key={idx} className="py-3 px-3">
                          <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                            sc >= 94 ? 'bg-cyan-500/20 text-cyan-300' :
                            sc >= 90 ? 'bg-blue-500/20 text-blue-300' :
                            'bg-slate-500/20 text-slate-300'
                          }`}>
                            {sc}%
                          </span>
                        </td>
                      ))}
                      <td className="py-3 px-3 font-black text-white">{row.avg}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: WIZARD / RUNNER (STEP 1 - 6) */}
      {activeLabTab === 'wizard' && (
        <div className="glass-card p-6 sm:p-8 rounded-2xl border border-white/10 space-y-8">
          <div className="border-b border-white/10 pb-4">
            <h2 className="text-lg font-bold text-white font-mono flex items-center gap-2">
              <Play className="h-5 w-5 text-cyan-400" />
              <span>Standardized LLM Benchmark Wizard (6 Steps)</span>
            </h2>
            <p className="text-xs text-slate-400 font-light mt-1">
              Configure uniform inputs and evaluation rubrics to guarantee fair, academically sound comparison across all selected models.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column: Steps 1, 2, 3 */}
            <div className="space-y-6">
              {/* STEP 1: Select Project Context */}
              <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-3 font-mono text-xs">
                <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block">
                  STEP 1 • SELECT PROJECT
                </span>
                <div className="flex items-center justify-between p-3 rounded-lg bg-surface/80 border border-white/5">
                  <div>
                    <p className="font-bold text-white">{currentProject?.name || 'No Project'}</p>
                    <p className="text-[11px] text-slate-400">Domain: {currentProject?.domain || 'General'}</p>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-blue-500/15 text-blue-300 border border-blue-500/30 text-[10px] font-bold">
                    {currentProject?.requirements.length || 0} Reqs Loaded
                  </span>
                </div>
              </div>

              {/* STEP 2: Select Domain Benchmark */}
              <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-violet-400 uppercase tracking-wider">
                    STEP 2 • SELECT DOMAIN BENCHMARK
                  </span>
                  <button
                    onClick={() => setIsCustomBenchmarkOpen(true)}
                    className="text-[11px] text-cyan-400 hover:text-cyan-300 font-bold cursor-pointer"
                  >
                    + Create Custom Dataset
                  </button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {Object.keys(GROUND_TRUTH_DATASETS).map(dom => (
                    <button
                      key={dom}
                      onClick={() => setSelectedDomain(dom)}
                      className={`p-2.5 rounded-xl border text-center transition cursor-pointer ${
                        selectedDomain === dom
                          ? 'bg-violet-600/30 text-white border-violet-400 shadow-neon-violet font-bold'
                          : 'bg-surface/50 text-slate-400 hover:text-white border-white/5'
                      }`}
                    >
                      {dom}
                    </button>
                  ))}
                </div>
              </div>

              {/* STEP 3: Ingestion Method */}
              <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-3 font-mono text-xs">
                <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider block">
                  STEP 3 • INGEST SPECIFICATIONS
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'sample', label: 'Ground Truth' },
                    { id: 'project', label: 'RequireX Project' },
                    { id: 'paste', label: 'Paste Text' },
                    { id: 'upload', label: 'Upload File' },
                  ].map(m => (
                    <button
                      key={m.id}
                      onClick={() => setIngestionMethod(m.id as any)}
                      className={`p-2 rounded-lg border text-center transition cursor-pointer ${
                        ingestionMethod === m.id
                          ? 'bg-blue-600/30 text-white border-blue-400 font-bold'
                          : 'bg-surface/50 text-slate-400 hover:text-white border-white/5'
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>

                {ingestionMethod === 'paste' && (
                  <textarea
                    rows={4}
                    placeholder="Paste requirements narrative here..."
                    value={pastedRequirements}
                    onChange={(e) => setPastedRequirements(e.target.value)}
                    className="w-full bg-surface border border-white/10 rounded-xl p-3 text-white font-sans text-xs focus:outline-none"
                  />
                )}
              </div>
            </div>

            {/* Right Column: Steps 4, 5, 6 */}
            <div className="space-y-6">
              {/* STEP 4: Select Models */}
              <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider">
                    STEP 4 • SELECT COMPETING MODELS ({selectedModelIds.length} SELECTED)
                  </span>
                  <button
                    onClick={() => setIsConfigModalOpen(true)}
                    className="text-[11px] text-cyan-400 hover:text-cyan-300 font-bold cursor-pointer"
                  >
                    Manage Keys
                  </button>
                </div>
                <div className="space-y-2">
                  {models.map(model => {
                    const isChecked = selectedModelIds.includes(model.id);
                    return (
                      <label
                        key={model.id}
                        className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition ${
                          isChecked ? 'bg-surface/80 border-cyan-500/40 text-white' : 'bg-surface/30 border-white/5 text-slate-500'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleModelSelection(model.id)}
                            className="accent-cyan-400 h-4 w-4 rounded"
                          />
                          <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: model.color }} />
                          <span className="font-bold">{model.name}</span>
                        </div>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-white/10 text-slate-400">{model.apiStatus}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* STEP 5: Select Evaluation Tasks */}
              <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-violet-400 uppercase tracking-wider">
                    STEP 5 • SELECT RE EVALUATION TASKS ({selectedTaskIds.length}/13)
                  </span>
                  <button
                    onClick={selectAllTasks}
                    className="text-[11px] text-violet-400 hover:text-violet-300 font-bold cursor-pointer"
                  >
                    Select All Tasks
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
                  {EVALUATION_TASKS_CONFIG.map(task => {
                    const isChecked = selectedTaskIds.includes(task.id);
                    return (
                      <label
                        key={task.id}
                        className={`p-2.5 rounded-lg border flex items-center space-x-2.5 cursor-pointer text-[11px] transition ${
                          isChecked ? 'bg-surface/80 border-violet-500/40 text-white' : 'bg-surface/30 border-white/5 text-slate-500'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleTaskSelection(task.id)}
                          className="accent-violet-400 h-3.5 w-3.5 rounded"
                        />
                        <span className="truncate">{task.label}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* STEP 6: Execute Benchmark Button */}
              <div className="pt-2">
                <button
                  onClick={handleStartBenchmark}
                  disabled={isRunning || selectedModelIds.length === 0 || selectedTaskIds.length === 0}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-600 via-blue-600 to-violet-600 hover:from-cyan-500 hover:to-violet-500 text-white font-mono font-black text-sm tracking-wide shadow-neon-blue hover:shadow-neon-violet transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 cursor-pointer"
                >
                  <Zap className="h-5 w-5 text-yellow-300 animate-bounce" />
                  <span>🚀 RUN STANDARDIZED LLM BENCHMARK</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: RADAR CHART */}
      {activeLabTab === 'radar' && currentBenchmark && (
        <RadarChartComparison
          results={currentBenchmark.results}
          models={currentBenchmark.modelsTested}
        />
      )}

      {/* TAB 4: TASK SCORES & CONFUSION MATRIX */}
      {activeLabTab === 'tasks' && currentBenchmark && (
        <div className="space-y-6">
          <ConfusionMatrixViewer
            results={currentBenchmark.results}
            models={currentBenchmark.modelsTested}
          />

          {/* Grouped Bar Chart of All 12 Tasks */}
          <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-6">
            <h3 className="text-sm font-bold text-white font-mono">
              Task-by-Task Relative Model Benchmark Scores (0-100%)
            </h3>

            <div className="space-y-4 font-mono text-xs">
              {EVALUATION_TASKS_CONFIG.map(task => (
                <div key={task.id} className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-200">{task.label}</span>
                    <span className="text-[10px] text-slate-500">{task.academicMetric}</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
                    {currentBenchmark.modelsTested.map(m => {
                      const score = currentBenchmark.results[m.id]?.taskOutputs[task.id]?.score || 0;
                      return (
                        <div key={m.id} className="p-2 rounded-lg bg-surface/60 border border-white/5 flex items-center justify-between">
                          <span className="text-[11px] truncate" style={{ color: m.color }}>{m.name}</span>
                          <span className="font-black text-white">{score}%</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: HEAD TO HEAD */}
      {activeLabTab === 'headtohead' && currentBenchmark && (
        <HeadToHeadMatchup
          results={currentBenchmark.results}
          models={currentBenchmark.modelsTested}
        />
      )}

      {/* TAB 6: OUTPUT INSPECTOR */}
      {activeLabTab === 'output' && currentBenchmark && (
        <OutputComparisonViewer
          results={currentBenchmark.results}
          models={currentBenchmark.modelsTested}
          currentDomain={currentBenchmark.domain}
        />
      )}

      {/* TAB 7: LEADERBOARD */}
      {activeLabTab === 'leaderboard' && currentBenchmark && (
        <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <h3 className="text-base font-bold text-white font-mono flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-400" />
                <span>RequireX LLM Model Leaderboard</span>
              </h3>
              <p className="text-xs text-slate-400 font-light">Application-specific benchmark rankings for {currentBenchmark.domain}.</p>
            </div>
            <span className="text-[10px] px-3 py-1 rounded-full bg-blue-500/20 text-cyan-300 font-mono font-bold border border-blue-500/40">
              {currentBenchmark.modelsTested.length} Models Ranked
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead>
                <tr className="border-b border-white/10 text-slate-400">
                  <th className="py-3 px-4">Rank</th>
                  <th className="py-3 px-4">Model Name</th>
                  <th className="py-3 px-4">Provider</th>
                  <th className="py-3 px-4">RequireX Score</th>
                  <th className="py-3 px-4">Best Competency</th>
                  <th className="py-3 px-4">Latency</th>
                  <th className="py-3 px-4">JSON Reliability</th>
                  <th className="py-3 px-4">Estimated Cost</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {Object.values(currentBenchmark.results)
                  .sort((a, b) => b.overallScore - a.overallScore)
                  .map((res, idx) => (
                    <tr key={res.modelId} className="hover:bg-white/5 transition">
                      <td className="py-3.5 px-4 font-black">
                        <span className={`px-2.5 py-1 rounded-lg text-xs ${
                          idx === 0 ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/40 shadow-neon-yellow' :
                          idx === 1 ? 'bg-slate-300/20 text-slate-200 border border-slate-300/40' :
                          idx === 2 ? 'bg-amber-600/20 text-amber-300 border border-amber-600/40' :
                          'text-slate-500'
                        }`}>
                          #{idx + 1}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-bold text-white text-sm flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: res.color }} />
                        {res.modelName}
                      </td>
                      <td className="py-3.5 px-4 text-slate-300">{res.provider}</td>
                      <td className="py-3.5 px-4 font-black text-white text-sm">{res.overallScore}/100</td>
                      <td className="py-3.5 px-4 text-cyan-300">{res.bestTasks[0] || 'Analysis'}</td>
                      <td className="py-3.5 px-4 text-slate-300">{res.avgLatencyMs} ms</td>
                      <td className="py-3.5 px-4 font-bold text-emerald-300">{res.structuredReliabilityRate}%</td>
                      <td className="py-3.5 px-4 text-slate-400">${res.totalCostUsd}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 8: COST VS SPEED */}
      {activeLabTab === 'cost' && currentBenchmark && (
        <CostLatencyScatterPlot
          results={currentBenchmark.results}
          models={currentBenchmark.modelsTested}
        />
      )}

      {/* TAB 9: BENCHMARK HISTORY */}
      {activeLabTab === 'history' && (
        <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h3 className="text-base font-bold text-white font-mono flex items-center gap-2">
              <RotateCcw className="h-5 w-5 text-cyan-400" />
              <span>Historical Evaluation Runs ({benchmarkHistory.length})</span>
            </h3>
          </div>

          <div className="space-y-3 font-mono text-xs">
            {benchmarkHistory.map(run => (
              <div
                key={run.id}
                className="p-4 rounded-xl bg-black/40 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-cyan-400/40 transition"
              >
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-white text-sm">{run.domain}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-white/10 text-slate-400">{run.id}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    {run.timestamp} • {run.modelsTested.length} Models • {run.tasksRun.length} Tasks
                  </p>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <span className="text-xs font-bold text-cyan-300">
                      Top: {run.results[run.topModelId]?.modelName}
                    </span>
                    <span className="text-[10px] text-slate-400 block">
                      Score: {run.results[run.topModelId]?.overallScore}/100
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setCurrentBenchmark(run);
                      setActiveLabTab('dashboard');
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-neon-blue transition cursor-pointer"
                  >
                    Load Run
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 10: METHODOLOGY & ETHICS */}
      {activeLabTab === 'methodology' && (
        <div className="glass-card p-6 sm:p-8 rounded-2xl border border-white/10 space-y-6">
          <div className="border-b border-white/10 pb-4">
            <h2 className="text-lg font-bold text-white font-mono flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-cyan-400" />
              <span>How RequireX Evaluates LLMs: Academic Methodology</span>
            </h2>
            <p className="text-xs text-slate-400 font-light mt-1">
              Standardized, repeatable protocol ensuring fairness, transparency, and scientific rigor in software requirements engineering benchmarking.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
            <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-3">
              <h4 className="font-bold text-cyan-300 text-sm">Standardized 7-Step Evaluation Protocol</h4>
              <ol className="space-y-2 text-slate-300 list-decimal list-inside leading-relaxed font-sans">
                <li><strong>Uniform Ingestion:</strong> Every model receives the exact same verbatim requirements document.</li>
                <li><strong>Standardized Prompting:</strong> Identical system and user prompt templates are transmitted across all models.</li>
                <li><strong>Zero-Shot Ground-Truth Audit:</strong> Model outputs are cross-verified against verified domain backlogs.</li>
                <li><strong>Empirical Confusion Matrix:</strong> Multiclass classification evaluated with Macro-Precision, Recall, and F1.</li>
                <li><strong>ISO/IEC/IEEE 29148 Completeness:</strong> Automated audit for quantifiable bounds, actors, and error states.</li>
                <li><strong>Structured JSON Validation:</strong> Strict schema validation tests parsing reliability for downstream tools.</li>
                <li><strong>Weighted Aggregation:</strong> Configurable criteria weights prevent single-metric dominance.</li>
              </ol>
            </div>

            <div className="p-4 rounded-xl bg-black/40 border border-rose-500/30 space-y-3">
              <h4 className="font-bold text-rose-300 text-sm flex items-center gap-1.5">
                <ShieldAlert className="h-4 w-4 text-rose-400" />
                Benchmark Limitations &amp; Academic Scope
              </h4>
              <ul className="space-y-2 text-slate-300 list-disc list-inside leading-relaxed font-sans">
                <li><strong>Domain Specificity:</strong> Scores reflect requirements engineering performance and should not be construed as universal general intelligence rankings.</li>
                <li><strong>Stochastic Variance:</strong> LLM outputs can vary between runs; deterministic testing or multi-seed sampling is recommended for formal research publications.</li>
                <li><strong>Latency Dependencies:</strong> API latency is subject to third-party server load and regional networking conditions.</li>
                <li><strong>Model Updates:</strong> Cloud provider model weights receive periodic updates which may alter historical scoring baselines.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      <ModelConfigModal
        isOpen={isConfigModalOpen}
        onClose={() => setIsConfigModalOpen(false)}
        models={models}
        onSaveModels={(updated) => {
          setModels(updated);
          LLMEvaluationService.saveModels(updated);
        }}
      />

      {isCustomBenchmarkOpen && (
        <CustomBenchmarkBuilder
          onSaveCustomBenchmark={handleSaveCustomBenchmark}
          onClose={() => setIsCustomBenchmarkOpen(false)}
        />
      )}
    </div>
  );
};
