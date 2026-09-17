import React, { useState } from 'react';
import { 
  BookOpenCheck, 
  CheckCircle2, 
  User, 
  Target, 
  Award,
  RefreshCw,
  Plus,
  Edit3,
  Save,
  X,
  Trash2,
  Filter,
  MessageSquarePlus,
  ChevronDown,
  ChevronUp,
  Zap
} from 'lucide-react';
import { useProject } from '../../context/ProjectContext';
import { UserStory, PriorityLevel } from '../../types';

type PriorityFilter = 'All' | 'Critical' | 'High' | 'Medium' | 'Low';

const PRIORITY_COLORS: Record<string, string> = {
  Critical: 'bg-red-500/20 text-red-400 border-red-500/40',
  High: 'bg-amber-500/20 text-amber-400 border-amber-500/40',
  Medium: 'bg-blue-500/20 text-blue-400 border-blue-500/40',
  Low: 'bg-slate-500/20 text-slate-400 border-slate-500/40',
};

const FIBONACCI = [1, 2, 3, 5, 8, 13, 21];
const DOD_DEFAULTS = ['Unit tested', 'Code reviewed', 'Acceptance criteria met', 'No critical bugs'];

export const ModuleUserStories: React.FC = () => {
  const { currentProject, regenerateArtifacts } = useProject();

  const [localStories, setLocalStories] = useState<UserStory[]>([]);
  const [initialised, setInitialised] = useState(false);
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>('All');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editBuffer, setEditBuffer] = useState<Partial<UserStory>>({});
  const [showAddForm, setShowAddForm] = useState(false);
  const [newStory, setNewStory] = useState<{
    asA: string;
    iWantTo: string;
    soThat: string;
    storyPoints: number;
    priority: PriorityLevel;
  }>({ asA: '', iWantTo: '', soThat: '', storyPoints: 5, priority: 'High' });
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  if (!currentProject) return null;

  // Sync from project once
  if (!initialised && currentProject.userStories?.length) {
    setLocalStories([...currentProject.userStories]);
    setExpandedIds(new Set(currentProject.userStories.map(us => us.id)));
    setInitialised(true);
  }

  const displayStories = localStories.length ? localStories : currentProject.userStories;
  const totalPoints = displayStories.reduce((acc, s) => acc + s.storyPoints, 0);
  const filteredStories = priorityFilter === 'All' ? displayStories : displayStories.filter(s => s.priority === priorityFilter);

  const showFeedback = (msg: string) => {
    setFeedbackMessage(msg);
    setTimeout(() => setFeedbackMessage(null), 2500);
  };

  const toggleExpand = (id: string) => {
    setExpandedIds(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const startEdit = (us: UserStory) => {
    setEditingId(us.id);
    setEditBuffer({ ...us });
  };

  const saveEdit = (id: string) => {
    setLocalStories(prev => prev.map(s => s.id === id ? { ...s, ...editBuffer } as UserStory : s));
    setEditingId(null);
    setEditBuffer({});
    setSavedIds(prev => new Set(prev).add(id));
    showFeedback('✓ Story updated successfully!');
    setTimeout(() => setSavedIds(prev => { const n = new Set(prev); n.delete(id); return n; }), 3000);
  };

  const cancelEdit = () => { setEditingId(null); setEditBuffer({}); };

  const deleteStory = (id: string) => {
    setLocalStories(prev => prev.filter(s => s.id !== id));
    showFeedback('Story removed.');
  };

  const addCustomStory = () => {
    if (!newStory.asA.trim() || !newStory.iWantTo.trim()) {
      showFeedback('⚠ Please fill in "As a" and "I want to" fields.');
      return;
    }
    const id = `US-C${String(Date.now()).slice(-4)}`;
    const story: UserStory = {
      id,
      requirementId: 'REQ-CUSTOM',
      asA: newStory.asA,
      iWantTo: newStory.iWantTo,
      soThat: newStory.soThat || 'achieve my goal efficiently',
      acceptanceCriteria: [
        'Given the user is authenticated',
        `When they ${newStory.iWantTo.toLowerCase().replace(/^to\s+/, '')}`,
        'Then the system responds within 1.5 seconds with a confirmation'
      ],
      storyPoints: newStory.storyPoints,
      priority: newStory.priority,
      definitionOfDone: DOD_DEFAULTS
    };
    setLocalStories(prev => [...prev, story]);
    setExpandedIds(prev => new Set(prev).add(id));
    setNewStory({ asA: '', iWantTo: '', soThat: '', storyPoints: 5, priority: 'High' });
    setShowAddForm(false);
    showFeedback('✓ Custom user story added!');
  };

  const handleRegenerate = () => {
    regenerateArtifacts();
    setLocalStories([]);
    setInitialised(false);
    showFeedback('Regenerating stories from AI engine...');
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="glass-card p-6 rounded-2xl border border-white/10 relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-bl from-cyan-500/8 via-purple-500/8 to-transparent blur-3xl pointer-events-none rounded-full" />
        <div>
          <div className="flex items-center space-x-2 text-cyan-400 text-xs font-bold mb-1">
            <BookOpenCheck className="h-4 w-4" />
            <span>MODULE 6 • AGILE USER STORY GENERATOR</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white font-mono">Agile User Story Board</h1>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            Transform IEEE specifications into Agile User Stories. Edit stories inline, add your own custom stories, filter by priority, and manage acceptance criteria with Definition of Done.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="text-right bg-surface/80 px-3 py-1.5 rounded-xl border border-white/10">
            <p className="text-[10px] text-slate-400">Total Velocity</p>
            <p className="text-lg font-bold font-mono text-cyan-400">{totalPoints} pts</p>
          </div>

          <button
            onClick={() => setShowAddForm(v => !v)}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl font-bold text-xs font-mono border transition cursor-pointer ${
              showAddForm 
                ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-neon-cyan' 
                : 'bg-surface hover:bg-surface-hover border-white/10 text-slate-300 hover:text-white hover:border-cyan-400/40 hover:shadow-neon-cyan'
            }`}
          >
            <Plus className="h-4 w-4" />
            <span>Add Story</span>
          </button>

          <button
            onClick={handleRegenerate}
            className="p-2.5 rounded-xl bg-surface hover:bg-surface-hover text-cyan-400 border border-white/10 hover:border-cyan-400/40 hover:shadow-neon-cyan transition cursor-pointer"
            title="Regenerate User Stories"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Feedback toast */}
      {feedbackMessage && (
        <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-bold animate-in fade-in flex items-center gap-2">
          <Zap className="h-3.5 w-3.5 text-cyan-400" />
          {feedbackMessage}
        </div>
      )}

      {/* Add Custom Story Form */}
      {showAddForm && (
        <div className="glass-card p-5 rounded-2xl border border-cyan-500/30 space-y-4 shadow-neon-cyan animate-in slide-in-from-top-2">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm font-mono">
              <MessageSquarePlus className="h-4 w-4" />
              <span>Compose Custom User Story</span>
            </div>
            <button onClick={() => setShowAddForm(false)} className="p-1.5 rounded-lg text-slate-400 hover:text-white transition cursor-pointer">
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="text-slate-400 font-bold font-mono block mb-1.5">As a... <span className="text-rose-400">*</span></label>
              <input
                value={newStory.asA}
                onChange={e => setNewStory(s => ({ ...s, asA: e.target.value }))}
                placeholder="e.g. registered user, admin..."
                className="w-full bg-black/60 border border-white/10 focus:border-cyan-500 rounded-xl px-3 py-2 text-white font-mono text-xs placeholder-slate-600 focus:outline-none transition"
              />
            </div>
            <div>
              <label className="text-slate-400 font-bold font-mono block mb-1.5">I want to... <span className="text-rose-400">*</span></label>
              <input
                value={newStory.iWantTo}
                onChange={e => setNewStory(s => ({ ...s, iWantTo: e.target.value }))}
                placeholder="e.g. search for products by category..."
                className="w-full bg-black/60 border border-white/10 focus:border-cyan-500 rounded-xl px-3 py-2 text-white font-mono text-xs placeholder-slate-600 focus:outline-none transition"
              />
            </div>
            <div>
              <label className="text-slate-400 font-bold font-mono block mb-1.5">So that...</label>
              <input
                value={newStory.soThat}
                onChange={e => setNewStory(s => ({ ...s, soThat: e.target.value }))}
                placeholder="e.g. I can find items quickly..."
                className="w-full bg-black/60 border border-white/10 focus:border-cyan-500 rounded-xl px-3 py-2 text-white font-mono text-xs placeholder-slate-600 focus:outline-none transition"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <label className="text-slate-400 font-bold font-mono block mb-1.5">Story Points (Fibonacci)</label>
              <div className="flex flex-wrap gap-2">
                {FIBONACCI.map(pt => (
                  <button
                    key={pt}
                    onClick={() => setNewStory(s => ({ ...s, storyPoints: pt }))}
                    className={`w-9 h-9 rounded-lg font-bold text-xs font-mono border transition cursor-pointer ${
                      newStory.storyPoints === pt
                        ? 'bg-purple-500/30 border-purple-400 text-purple-200 shadow-neon-purple'
                        : 'bg-surface border-white/10 text-slate-400 hover:text-white hover:border-white/30'
                    }`}
                  >
                    {pt}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-slate-400 font-bold font-mono block mb-1.5">Priority</label>
              <div className="flex flex-wrap gap-2">
                {(['Critical', 'High', 'Medium', 'Low'] as const).map(p => (
                  <button
                    key={p}
                    onClick={() => setNewStory(s => ({ ...s, priority: p }))}
                    className={`px-3 py-1.5 rounded-lg font-bold text-[11px] font-mono border transition cursor-pointer ${
                      newStory.priority === p
                        ? PRIORITY_COLORS[p]
                        : 'bg-surface border-white/10 text-slate-400 hover:text-white'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2 border-t border-white/10">
            <button onClick={() => setShowAddForm(false)} className="px-4 py-2 rounded-xl text-xs font-mono text-slate-400 hover:text-white transition cursor-pointer">
              Cancel
            </button>
            <button
              onClick={addCustomStory}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-black text-xs font-mono shadow-neon-cyan transition cursor-pointer flex items-center gap-2"
            >
              <Plus className="h-3.5 w-3.5" />
              Add Story
            </button>
          </div>
        </div>
      )}

      {/* Priority Filter Bar */}
      <div className="flex items-center gap-2 flex-wrap">
        <Filter className="h-3.5 w-3.5 text-slate-400" />
        <span className="text-[11px] text-slate-400 font-mono font-bold uppercase tracking-wider">Filter:</span>
        {(['All', 'Critical', 'High', 'Medium', 'Low'] as PriorityFilter[]).map(p => (
          <button
            key={p}
            onClick={() => setPriorityFilter(p)}
            className={`px-3 py-1 rounded-full text-[11px] font-mono font-bold border transition cursor-pointer ${
              priorityFilter === p
                ? p === 'All'
                  ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-neon-cyan'
                  : PRIORITY_COLORS[p]
                : 'bg-surface border-white/10 text-slate-400 hover:text-white hover:border-white/30'
            }`}
          >
            {p}{p !== 'All' && ` (${displayStories.filter(s => s.priority === p).length})`}
          </button>
        ))}
        <span className="ml-auto text-[11px] text-slate-500 font-mono">{filteredStories.length} stories</span>
      </div>

      {/* User Stories Cards */}
      {filteredStories.length === 0 ? (
        <div className="glass-card p-8 rounded-2xl border border-white/10 text-center">
          <BookOpenCheck className="h-10 w-10 text-slate-600 mx-auto mb-3" />
          <p className="text-xs text-slate-400">
            {displayStories.length === 0
              ? 'No user stories yet. Extract or add requirements first, or click "Add Story" above.'
              : `No ${priorityFilter} priority stories found.`}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredStories.map(us => {
            const isExpanded = expandedIds.has(us.id);
            const isEditing = editingId === us.id;
            const justSaved = savedIds.has(us.id);

            return (
              <div
                key={us.id}
                className={`glass-card p-5 rounded-2xl border transition-all duration-200 space-y-4 group ${
                  justSaved
                    ? 'border-emerald-500/50 shadow-neon-emerald'
                    : 'border-white/10 hover:border-cyan-500/40 hover:shadow-neon-cyan'
                }`}
              >
                {/* Card Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-mono font-bold text-cyan-400">{us.id}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border ${PRIORITY_COLORS[us.priority] || 'bg-slate-500/20 text-slate-400 border-slate-500/40'}`}>
                      {isEditing ? (editBuffer.priority || us.priority) : us.priority}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-mono font-bold border border-purple-500/30">
                      {isEditing ? (editBuffer.storyPoints ?? us.storyPoints) : us.storyPoints} pts
                    </span>
                    {justSaved && <span className="text-[10px] text-emerald-400 font-mono">✓ Saved</span>}
                  </div>
                  <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    {!isEditing ? (
                      <>
                        <button
                          onClick={() => startEdit(us)}
                          className="p-1.5 rounded-lg bg-surface hover:bg-surface-hover text-slate-400 hover:text-cyan-400 border border-white/10 hover:border-cyan-400/40 hover:shadow-neon-cyan transition cursor-pointer"
                          title="Edit story"
                        >
                          <Edit3 className="h-3 w-3" />
                        </button>
                        <button
                          onClick={() => toggleExpand(us.id)}
                          className="p-1.5 rounded-lg bg-surface hover:bg-surface-hover text-slate-400 hover:text-white border border-white/10 transition cursor-pointer"
                        >
                          {isExpanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                        </button>
                        <button
                          onClick={() => deleteStory(us.id)}
                          className="p-1.5 rounded-lg bg-surface hover:bg-red-500/20 text-slate-500 hover:text-red-400 border border-white/10 hover:border-red-400/40 transition cursor-pointer"
                          title="Delete story"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => saveEdit(us.id)}
                          className="px-3 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/40 text-[10px] font-bold font-mono transition cursor-pointer flex items-center gap-1"
                        >
                          <Save className="h-3 w-3" /> Save
                        </button>
                        <button onClick={cancelEdit} className="p-1.5 rounded-lg text-slate-400 hover:text-white transition cursor-pointer">
                          <X className="h-3 w-3" />
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {/* Triple Statement */}
                <div className="bg-black/50 p-4 rounded-xl border border-white/5 space-y-2.5 text-xs">
                  <div className="flex items-start space-x-2">
                    <User className="h-4 w-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <span className="font-bold text-cyan-300">As a </span>
                      {isEditing ? (
                        <input
                          value={editBuffer.asA ?? us.asA}
                          onChange={e => setEditBuffer(b => ({ ...b, asA: e.target.value }))}
                          className="bg-black/60 border border-cyan-500/40 rounded px-2 py-0.5 text-white font-mono text-xs focus:outline-none w-full mt-1"
                        />
                      ) : (
                        <span className="text-white font-medium">{us.asA}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Target className="h-4 w-4 text-blue-400 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <span className="font-bold text-blue-300">I want to </span>
                      {isEditing ? (
                        <input
                          value={editBuffer.iWantTo ?? us.iWantTo}
                          onChange={e => setEditBuffer(b => ({ ...b, iWantTo: e.target.value }))}
                          className="bg-black/60 border border-blue-500/40 rounded px-2 py-0.5 text-white font-mono text-xs focus:outline-none w-full mt-1"
                        />
                      ) : (
                        <span className="text-white font-medium">{us.iWantTo}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Award className="h-4 w-4 text-purple-400 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <span className="font-bold text-purple-300">So that </span>
                      {isEditing ? (
                        <input
                          value={editBuffer.soThat ?? us.soThat}
                          onChange={e => setEditBuffer(b => ({ ...b, soThat: e.target.value }))}
                          className="bg-black/60 border border-purple-500/40 rounded px-2 py-0.5 text-white font-mono text-xs focus:outline-none w-full mt-1"
                        />
                      ) : (
                        <span className="text-white font-medium">{us.soThat}</span>
                      )}
                    </div>
                  </div>
                  {isEditing && (
                    <div className="pt-2 border-t border-white/10 space-y-2">
                      <div>
                        <label className="text-[10px] text-slate-400 font-mono block mb-1">Story Points:</label>
                        <div className="flex gap-1.5 flex-wrap">
                          {FIBONACCI.map(pt => (
                            <button
                              key={pt}
                              onClick={() => setEditBuffer(b => ({ ...b, storyPoints: pt }))}
                              className={`w-8 h-8 rounded-lg font-bold text-xs font-mono border transition cursor-pointer ${
                                (editBuffer.storyPoints ?? us.storyPoints) === pt
                                  ? 'bg-purple-500/30 border-purple-400 text-purple-200'
                                  : 'bg-surface border-white/10 text-slate-400 hover:text-white'
                              }`}
                            >
                              {pt}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-400 font-mono block mb-1">Priority:</label>
                        <div className="flex gap-1.5 flex-wrap">
                          {(['Critical', 'High', 'Medium', 'Low'] as const).map(p => (
                            <button
                              key={p}
                              onClick={() => setEditBuffer(b => ({ ...b, priority: p }))}
                              className={`px-2.5 py-1 rounded-lg font-bold text-[10px] font-mono border transition cursor-pointer ${
                                (editBuffer.priority ?? us.priority) === p
                                  ? PRIORITY_COLORS[p]
                                  : 'bg-surface border-white/10 text-slate-400 hover:text-white'
                              }`}
                            >
                              {p}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Expandable: Acceptance Criteria & DoD */}
                {isExpanded && !isEditing && (
                  <>
                    <div>
                      <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block mb-2">
                        Given / When / Then Acceptance Criteria
                      </span>
                      <div className="space-y-1.5">
                        {us.acceptanceCriteria.map((ac, idx) => (
                          <div key={idx} className="flex items-start space-x-2 text-[11px] text-slate-300 bg-surface/50 p-2 rounded-lg border border-white/5">
                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                            <span className="leading-tight">{ac}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="border-t border-white/10 pt-3">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Definition of Done (DoD)</span>
                      <div className="flex flex-wrap gap-1.5">
                        {us.definitionOfDone.map((dod, idx) => (
                          <span key={idx} className="px-2 py-0.5 rounded bg-white/5 text-[10px] text-slate-400 border border-white/5">
                            ✓ {dod}
                          </span>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {/* Collapse hint */}
                {!isExpanded && !isEditing && (
                  <button
                    onClick={() => toggleExpand(us.id)}
                    className="w-full text-[10px] text-slate-500 hover:text-cyan-400 font-mono text-center py-1 transition cursor-pointer"
                  >
                    ↓ Expand acceptance criteria & DoD
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
