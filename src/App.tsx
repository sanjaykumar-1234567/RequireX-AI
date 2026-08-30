import React, { useState } from 'react';
import { ProjectProvider, useProject } from './context/ProjectContext';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { LandingPage } from './components/landing/LandingPage';
import { AuthModal } from './components/auth/AuthModal';
import { CreateProjectModal } from './components/projects/CreateProjectModal';
import { AIChatDrawer } from './components/chat/AIChatDrawer';
import { GlobalSearchModal } from './components/search/GlobalSearchModal';
import { VersionHistoryDrawer } from './components/history/VersionHistoryDrawer';

import { DashboardOverview } from './components/dashboard/DashboardOverview';
import { ModuleUpload } from './components/modules/ModuleUpload';
import { ModuleQualityAudit } from './components/modules/ModuleQualityAudit';
import { ModuleDomainRecommendations } from './components/modules/ModuleDomainRecommendations';
import { ModuleUserStories } from './components/modules/ModuleUserStories';
import { ModuleUseCases } from './components/modules/ModuleUseCases';
import { ModuleTestCases } from './components/modules/ModuleTestCases';
import { ModuleRiskAnalysis } from './components/modules/ModuleRiskAnalysis';
import { ModuleRTM } from './components/modules/ModuleRTM';
import { ModuleSRSGenerator } from './components/modules/ModuleSRSGenerator';
import { ModuleAnalytics } from './components/modules/ModuleAnalytics';
import { ModuleCompliance } from './components/modules/ModuleCompliance';
import { ModuleArchitectureDFD } from './components/modules/ModuleArchitectureDFD';
import { ModuleScopeImpact } from './components/modules/ModuleScopeImpact';

import { ModuleWhatIfSimulator } from './components/modules/ModuleWhatIfSimulator';
import { ModuleConflictDetector } from './components/modules/ModuleConflictDetector';
import { ModuleDependencyGraph } from './components/modules/ModuleDependencyGraph';
import { ModuleStakeholderAnalyzer } from './components/modules/ModuleStakeholderAnalyzer';
import { ModuleQualityHeatmap } from './components/modules/ModuleQualityHeatmap';
import { ModuleMultiPerspectiveReview } from './components/modules/ModuleMultiPerspectiveReview';

// 20 Innovation Modules
import { ModuleRiskHeatmap } from './components/modules/ModuleRiskHeatmap';
import { ModuleTraceabilityGraph } from './components/modules/ModuleTraceabilityGraph';
import { ModuleQualityOverTime } from './components/modules/ModuleQualityOverTime';
import { ModuleCoverageDashboard } from './components/modules/ModuleCoverageDashboard';
import { ModuleRoadmapTimeline } from './components/modules/ModuleRoadmapTimeline';
import { ModuleReleasePlanner } from './components/modules/ModuleReleasePlanner';
import { ModuleSimilarityMap } from './components/modules/ModuleSimilarityMap';
import { ModuleArchitectureImpact } from './components/modules/ModuleArchitectureImpact';
import { ModuleTestingMatrix } from './components/modules/ModuleTestingMatrix';
import { ModuleRiskEarlyWarning } from './components/modules/ModuleRiskEarlyWarning';
import { ModuleRefinementLab } from './components/modules/ModuleRefinementLab';
import { ModuleBadReqDetector } from './components/modules/ModuleBadReqDetector';
import { ModuleLLMEvaluationLab } from './components/modules/ModuleLLMEvaluationLab';
import { ModuleUserManual } from './components/modules/ModuleUserManual';

const AppContent: React.FC = () => {
  const { activeTab } = useProject();
  const [isLandingPage, setIsLandingPage] = useState<boolean>(false);

  const renderActiveModule = () => {
    switch (activeTab) {
      case 'llm-eval-lab':
        return <ModuleLLMEvaluationLab />;
      case 'dashboard':
        return <DashboardOverview />;
      case 'analytics':
        return <ModuleAnalytics />;
      case 'quality-over-time':
        return <ModuleQualityOverTime />;
      case 'coverage-dashboard':
        return <ModuleCoverageDashboard />;
      case 'upload':
        return <ModuleUpload />;
      case 'quality':
        return <ModuleQualityAudit />;
      case 'recommendations':
        return <ModuleDomainRecommendations />;
      case 'refinement-lab':
        return <ModuleRefinementLab />;
      case 'bad-req-detector':
        return <ModuleBadReqDetector />;
      case 'risk-heatmap':
        return <ModuleRiskHeatmap />;
      case 'risk-early-warning':
        return <ModuleRiskEarlyWarning />;
      case 'testing-matrix':
        return <ModuleTestingMatrix />;
      case 'traceability-graph':
        return <ModuleTraceabilityGraph />;
      case 'dependency-graph':
        return <ModuleDependencyGraph />;
      case 'architecture':
        return <ModuleArchitectureDFD />;
      case 'architecture-impact':
        return <ModuleArchitectureImpact />;
      case 'what-if':
        return <ModuleWhatIfSimulator />;
      case 'impact':
        return <ModuleScopeImpact />;
      case 'similarity-map':
        return <ModuleSimilarityMap />;
      case 'conflict':
        return <ModuleConflictDetector />;
      case 'stakeholders':
        return <ModuleStakeholderAnalyzer />;
      case 'quality-heatmap':
        return <ModuleQualityHeatmap />;
      case 'compliance':
        return <ModuleCompliance />;
      case 'multi-review':
        return <ModuleMultiPerspectiveReview />;
      case 'roadmap':
        return <ModuleRoadmapTimeline />;
      case 'release-planner':
        return <ModuleReleasePlanner />;
      case 'user-stories':
        return <ModuleUserStories />;
      case 'use-cases':
        return <ModuleUseCases />;
      case 'test-cases':
        return <ModuleTestCases />;
      case 'risks':
        return <ModuleRiskAnalysis />;
      case 'rtm':
        return <ModuleRTM />;
      case 'srs':
        return <ModuleSRSGenerator />;
      case 'user-manual':
        return <ModuleUserManual />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0B0F] text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-black">
      {/* Navigation Header */}
      <Navbar
        isLanding={isLandingPage}
        onLandingClick={() => setIsLandingPage(!isLandingPage)}
      />

      {/* Main Container */}
      {isLandingPage ? (
        <LandingPage onGetStarted={() => setIsLandingPage(false)} />
      ) : (
        <div className="flex-1 flex w-full max-w-7xl mx-auto">
          {/* Module Navigation Sidebar */}
          <Sidebar />

          {/* Active Module Canvas Area */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-full">
            {renderActiveModule()}
          </main>
        </div>
      )}

      {/* Global Drawers & Modals */}
      <AuthModal />
      <CreateProjectModal />
      <AIChatDrawer />
      <GlobalSearchModal />
      <VersionHistoryDrawer />
    </div>
  );
};

export default function App() {
  return (
    <ProjectProvider>
      <AppContent />
    </ProjectProvider>
  );
}
