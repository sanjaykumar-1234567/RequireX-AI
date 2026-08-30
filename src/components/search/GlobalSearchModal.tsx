import React, { useState, useEffect } from 'react';
import { Search, X, FileUp, BookOpenCheck, GitMerge, CheckSquare, FileSpreadsheet } from 'lucide-react';
import { useProject } from '../../context/ProjectContext';

export const GlobalSearchModal: React.FC = () => {
  const { isGlobalSearchOpen, setIsGlobalSearchOpen, currentProject, setActiveTab } = useProject();
  const [query, setQuery] = useState('');

  // Keyboard shortcut Ctrl+K / Cmd+K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsGlobalSearchOpen(!isGlobalSearchOpen);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isGlobalSearchOpen, setIsGlobalSearchOpen]);

  if (!isGlobalSearchOpen || !currentProject) return null;

  const q = query.toLowerCase();

  const matchingReqs = currentProject.requirements.filter(r => 
    r.id.toLowerCase().includes(q) || r.title.toLowerCase().includes(q) || r.description.toLowerCase().includes(q)
  );

  const matchingStories = currentProject.userStories.filter(s =>
    s.id.toLowerCase().includes(q) || s.asA.toLowerCase().includes(q) || s.iWantTo.toLowerCase().includes(q)
  );

  const matchingUseCases = currentProject.useCases.filter(u =>
    u.id.toLowerCase().includes(q) || u.title.toLowerCase().includes(q)
  );

  const matchingTests = currentProject.testCases.filter(t =>
    t.id.toLowerCase().includes(q) || t.description.toLowerCase().includes(q)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/70 backdrop-blur-md">
      <div className="w-full max-w-2xl bg-[#12121A] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        
        {/* Search Input Bar */}
        <div className="p-4 border-b border-white/10 flex items-center space-x-3 bg-black/40">
          <Search className="h-5 w-5 text-cyan-400" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search requirements, user stories, use cases, test cases..."
            className="flex-1 bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none font-mono"
          />
          <button
            onClick={() => setIsGlobalSearchOpen(false)}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/5"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Results Body */}
        <div className="p-4 overflow-y-auto space-y-4 text-xs">
          {!query.trim() ? (
            <p className="text-slate-400 text-center py-8">Type to search across requirements, user stories, use cases, test cases, and SRS specs...</p>
          ) : (
            <>
              {/* Requirements Results */}
              {matchingReqs.length > 0 && (
                <div>
                  <span className="text-[10px] font-bold text-cyan-400 uppercase font-mono block mb-2">Requirements ({matchingReqs.length})</span>
                  <div className="space-y-1.5">
                    {matchingReqs.map(r => (
                      <div
                        key={r.id}
                        onClick={() => { setActiveTab('upload'); setIsGlobalSearchOpen(false); }}
                        className="p-2.5 rounded-lg bg-surface hover:bg-surface-hover border border-white/5 cursor-pointer flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-2">
                          <FileUp className="h-3.5 w-3.5 text-cyan-400" />
                          <span className="font-mono font-bold text-cyan-400">{r.id}</span>
                          <span className="text-slate-200 truncate max-w-md">{r.improvedText || r.description}</span>
                        </div>
                        <span className="text-[10px] text-slate-400">{r.category}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* User Stories Results */}
              {matchingStories.length > 0 && (
                <div>
                  <span className="text-[10px] font-bold text-purple-400 uppercase font-mono block mb-2">Agile User Stories ({matchingStories.length})</span>
                  <div className="space-y-1.5">
                    {matchingStories.map(s => (
                      <div
                        key={s.id}
                        onClick={() => { setActiveTab('user-stories'); setIsGlobalSearchOpen(false); }}
                        className="p-2.5 rounded-lg bg-surface hover:bg-surface-hover border border-white/5 cursor-pointer flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-2">
                          <BookOpenCheck className="h-3.5 w-3.5 text-purple-400" />
                          <span className="font-mono font-bold text-purple-400">{s.id}</span>
                          <span className="text-slate-200 truncate">As a {s.asA}, I want to {s.iWantTo}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Test Cases Results */}
              {matchingTests.length > 0 && (
                <div>
                  <span className="text-[10px] font-bold text-emerald-400 uppercase font-mono block mb-2 font-mono">Test Cases ({matchingTests.length})</span>
                  <div className="space-y-1.5">
                    {matchingTests.map(t => (
                      <div
                        key={t.id}
                        onClick={() => { setActiveTab('test-cases'); setIsGlobalSearchOpen(false); }}
                        className="p-2.5 rounded-lg bg-surface hover:bg-surface-hover border border-white/5 cursor-pointer flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-2">
                          <CheckSquare className="h-3.5 w-3.5 text-emerald-400" />
                          <span className="font-mono font-bold text-emerald-400">{t.id}</span>
                          <span className="text-slate-200 truncate">{t.description}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

      </div>
    </div>
  );
};
