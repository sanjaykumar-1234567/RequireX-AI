import React from 'react';
import { 
  Boxes, 
  Plus, 
  Search, 
  Sparkles, 
  History, 
  UserCheck, 
  ChevronDown, 
  FolderGit2
} from 'lucide-react';
import { useProject } from '../../context/ProjectContext';

export const Navbar: React.FC<{ onLandingClick: () => void; isLanding: boolean }> = ({ onLandingClick, isLanding }) => {
  const { 
    projects, 
    currentProject, 
    selectProject, 
    setIsCreateProjectOpen, 
    setIsAIChatOpen, 
    setIsGlobalSearchOpen,
    setIsHistoryOpen,
    userSession,
    setIsAuthModalOpen
  } = useProject();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#07070B]/90 backdrop-blur-2xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        
        {/* Brand & Project Selector */}
        <div className="flex items-center space-x-6">
          <button 
            onClick={onLandingClick}
            className="flex items-center space-x-3 group text-left focus:outline-none cursor-pointer"
          >
            <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 via-blue-600 to-amber-400 p-[1.5px] shadow-neon-violet">
              <div className="flex h-full w-full items-center justify-center rounded-[14px] bg-[#0A0A12] transition duration-300 group-hover:bg-opacity-80">
                <Boxes className="h-6 w-6 text-amber-400 group-hover:scale-110 transition duration-300" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-black tracking-tight text-white font-mono">
                  Require<span className="text-amber-400">X</span>
                </span>
                <span className="rounded-full bg-violet-950/80 px-2.5 py-0.5 text-[10px] font-extrabold text-violet-300 border border-violet-500/50 shadow-neon-violet font-mono tracking-wider">
                  AI SUITE v2.0
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block font-medium">IEEE Requirements Engineering</p>
            </div>
          </button>

          {!isLanding && (
            <div className="hidden md:flex items-center space-x-3 pl-6 border-l border-white/10">
              {/* Project Selector Dropdown */}
              <div className="relative">
                <select
                  value={currentProject?.id || ''}
                  onChange={(e) => selectProject(e.target.value)}
                  className="appearance-none bg-surface/90 hover:bg-surface border border-blue-500/40 hover:border-violet-500/60 text-slate-200 text-xs font-semibold font-mono rounded-xl px-4 py-2 pr-9 cursor-pointer focus:outline-none transition shadow-sm"
                >
                  {projects.map(p => (
                    <option key={p.id} value={p.id} className="bg-[#0F0F18] text-slate-200 py-1">
                      📂 {p.name} ({p.domain})
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-3 h-3.5 w-3.5 text-blue-400 pointer-events-none" />
              </div>

              {/* Create New Project CTA */}
              <button
                onClick={() => setIsCreateProjectOpen(true)}
                className="flex items-center space-x-1.5 bg-gradient-to-r from-blue-700/35 via-blue-600/30 to-cyan-500/25 hover:from-blue-600/50 hover:to-cyan-400/40 text-cyan-300 hover:text-white text-xs font-bold font-mono px-3.5 py-2 rounded-xl border border-blue-400/50 hover:border-cyan-400/70 transition shadow-neon-blue cursor-pointer"
              >
                <Plus className="h-4 w-4 text-cyan-400" />
                <span>New Project</span>
              </button>
            </div>
          )}
        </div>

        {/* Global Controls & Actions */}
        <div className="flex items-center space-x-4">
          {!isLanding && (
            <>
              {/* Global Search Button */}
              <button
                onClick={() => setIsGlobalSearchOpen(true)}
                className="hidden lg:flex items-center space-x-3 bg-surface/90 hover:bg-surface text-slate-400 hover:text-slate-200 text-xs px-4 py-2 rounded-xl border border-white/10 hover:border-blue-500/40 transition shadow-sm cursor-pointer"
              >
                <Search className="h-4 w-4 text-blue-400" />
                <span className="font-medium">Search reqs, stories, tests...</span>
                <kbd className="bg-black/50 text-[10px] font-mono text-amber-300 px-2 py-0.5 rounded border border-white/10">Ctrl+K</kbd>
              </button>

              {/* Version History Drawer Trigger */}
              <button
                onClick={() => setIsHistoryOpen(true)}
                className="p-2.5 text-slate-400 hover:text-amber-400 bg-surface/60 hover:bg-surface rounded-xl border border-white/10 hover:border-violet-500/40 transition relative cursor-pointer shadow-sm"
                title="Version History & Audit Log"
              >
                <History className="h-4 w-4" />
              </button>

              {/* AI Copilot Trigger */}
              <button
                onClick={() => setIsAIChatOpen(true)}
                className="flex items-center space-x-2 bg-gradient-to-r from-red-600 via-violet-600 to-blue-600 hover:from-red-500 hover:to-blue-500 text-white px-4 py-2 rounded-xl font-black text-xs font-mono shadow-neon-red transition cursor-pointer"
              >
                <Sparkles className="h-4 w-4 text-amber-300 animate-pulse" />
                <span className="hidden sm:inline tracking-wide">AI Copilot</span>
              </button>
            </>
          )}

          {/* User Session Button */}
          <button
            onClick={() => setIsAuthModalOpen(true)}
            className="flex items-center space-x-2 bg-surface/80 hover:bg-surface border border-white/10 hover:border-violet-500/40 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-200 transition cursor-pointer"
          >
            <div className="h-2 w-2 rounded-full bg-red-500 shadow-neon-red animate-pulse" />
            <span className="hidden md:inline font-mono">{userSession.username}</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-violet-600/20 text-violet-300 border border-violet-400/30 uppercase font-bold">
              {userSession.role}
            </span>
          </button>
        </div>

      </div>
    </header>
  );
};
