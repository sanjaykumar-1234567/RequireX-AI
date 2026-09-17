import React, { useState } from 'react';
import { 
  GitMerge, 
  Users, 
  ListOrdered, 
  AlertCircle, 
  CheckSquare,
  RefreshCw,
  Plus,
  Edit3,
  Save,
  X,
  Trash2,
  ChevronDown,
  ChevronUp,
  Zap,
  MessageSquarePlus,
  Sparkles
} from 'lucide-react';
import { useProject } from '../../context/ProjectContext';
import { UseCase } from '../../types';

export const ModuleUseCases: React.FC = () => {
  const { currentProject, regenerateArtifacts } = useProject();

  const [localUseCases, setLocalUseCases] = useState<UseCase[]>([]);
  const [initialised, setInitialised] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editBuffer, setEditBuffer] = useState<Partial<UseCase>>({});
  const [showAddForm, setShowAddForm] = useState(false);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());

  // New use case form state
  const [newUC, setNewUC] = useState({
    title: '',
    actors: '',
    preconditions: '',
    postconditions: '',
    mainFlowText: '',
    alternativeFlowText: '',
    exceptionsText: ''
  });

  if (!currentProject) return null;

  // Sync from project once
  if (!initialised && currentProject.useCases?.length) {
    setLocalUseCases([...currentProject.useCases]);
    setExpandedIds(new Set(currentProject.useCases.map(uc => uc.id)));
    setInitialised(true);
  }

  const displayUseCases = localUseCases.length ? localUseCases : currentProject.useCases;

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

  const startEdit = (uc: UseCase) => {
    setEditingId(uc.id);
    setEditBuffer({ ...uc });
  };

  const saveEdit = (id: string) => {
    setLocalUseCases(prev => prev.map(uc => uc.id === id ? { ...uc, ...editBuffer } as UseCase : uc));
    setEditingId(null);
    setEditBuffer({});
    setSavedIds(prev => new Set(prev).add(id));
    showFeedback('✓ Use case updated!');
    setTimeout(() => setSavedIds(prev => { const n = new Set(prev); n.delete(id); return n; }), 3000);
  };

  const cancelEdit = () => { setEditingId(null); setEditBuffer({}); };

  const deleteUseCase = (id: string) => {
    setLocalUseCases(prev => prev.filter(uc => uc.id !== id));
    showFeedback('Use case removed.');
  };

  const parseLines = (text: string): string[] =>
    text.split('\n').map(l => l.trim()).filter(Boolean);

  const addCustomUseCase = () => {
    if (!newUC.title.trim() || !newUC.actors.trim()) {
      showFeedback('⚠ Please fill in Title and Actors fields.');
      return;
    }
    const id = `UC-C${String(Date.now()).slice(-4)}`;
    const uc: UseCase = {
      id,
      requirementId: 'REQ-CUSTOM',
      title: newUC.title,
      actors: newUC.actors.split(',').map(a => a.trim()).filter(Boolean),
      preconditions: parseLines(newUC.preconditions) || ['System is operational and user is authenticated'],
      postconditions: parseLines(newUC.postconditions) || ['Operation is completed and state is persisted'],
      mainFlow: parseLines(newUC.mainFlowText).length
        ? parseLines(newUC.mainFlowText)
        : ['1. Actor initiates the use case', '2. System validates request', '3. System executes and confirms'],
      alternativeFlow: parseLines(newUC.alternativeFlowText).length
        ? parseLines(newUC.alternativeFlowText)
        : ['2a. Validation fails: system displays error message and requests correction'],
      exceptions: parseLines(newUC.exceptionsText).length
        ? parseLines(newUC.exceptionsText)
        : ['System timeout: operation rolls back and actor is notified'],
      relationships: []
    };
    setLocalUseCases(prev => [...prev, uc]);
    setExpandedIds(prev => new Set(prev).add(id));
    setNewUC({ title: '', actors: '', preconditions: '', postconditions: '', mainFlowText: '', alternativeFlowText: '', exceptionsText: '' });
    setShowAddForm(false);
    showFeedback('✓ Custom use case added!');
  };

  const handleRegenerate = () => {
    regenerateArtifacts();
    setLocalUseCases([]);
    setInitialised(false);
    showFeedback('Regenerating use cases from AI engine...');
  };

  const editArrayField = (field: keyof UseCase, value: string) => {
    setEditBuffer(b => ({
      ...b,
      [field]: value.split('\n').map(l => l.trim()).filter(Boolean)
    }));
  };

  const getArrayText = (arr: string[] | undefined): string =>
    (arr || []).join('\n');

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="glass-card p-6 rounded-2xl border border-white/10 relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-bl from-purple-500/8 via-cyan-500/8 to-transparent blur-3xl pointer-events-none rounded-full" />
        <div>
          <div className="flex items-center space-x-2 text-cyan-400 text-xs font-bold mb-1">
            <GitMerge className="h-4 w-4" />
            <span>MODULE 7 &amp; 8 • TEXTUAL USE CASE &amp; ACCEPTANCE SPECIFICATION</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white font-mono">Textual Use Cases &amp; Scenario Flows</h1>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            Compose and edit formal textual use cases with actors, preconditions, postconditions, main success flows, alternative branches, and exception handlers. Add your own custom use cases.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <div className="text-right bg-surface/80 px-3 py-1.5 rounded-xl border border-white/10">
            <p className="text-[10px] text-slate-400">Total Use Cases</p>
            <p className="text-lg font-bold font-mono text-purple-400">{displayUseCases.length}</p>
          </div>
          <button
            onClick={() => setShowAddForm(v => !v)}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl font-bold text-xs font-mono border transition cursor-pointer ${
              showAddForm
                ? 'bg-purple-500/20 border-purple-400 text-purple-300 shadow-neon-purple'
                : 'bg-surface hover:bg-surface-hover border-white/10 text-slate-300 hover:text-white hover:border-purple-400/40 hover:shadow-neon-purple'
            }`}
          >
            <Plus className="h-4 w-4" />
            <span>Add Use Case</span>
          </button>
          <button
            onClick={handleRegenerate}
            className="p-2.5 rounded-xl bg-surface hover:bg-surface-hover text-purple-400 border border-white/10 hover:border-purple-400/40 hover:shadow-neon-purple transition cursor-pointer"
            title="Regenerate Use Cases"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Feedback toast */}
      {feedbackMessage && (
        <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-500/40 text-purple-300 text-xs font-mono font-bold animate-in fade-in flex items-center gap-2">
          <Zap className="h-3.5 w-3.5 text-purple-400" />
          {feedbackMessage}
        </div>
      )}

      {/* Add Custom Use Case Form */}
      {showAddForm && (
        <div className="glass-card p-5 rounded-2xl border border-purple-500/30 space-y-4 shadow-neon-purple animate-in slide-in-from-top-2">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2 text-purple-400 font-bold text-sm font-mono">
              <MessageSquarePlus className="h-4 w-4" />
              <span>Compose Custom Use Case</span>
            </div>
            <button onClick={() => setShowAddForm(false)} className="p-1.5 rounded-lg text-slate-400 hover:text-white transition cursor-pointer">
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="text-slate-400 font-bold font-mono block mb-1.5">Use Case Title <span className="text-rose-400">*</span></label>
              <input
                value={newUC.title}
                onChange={e => setNewUC(s => ({ ...s, title: e.target.value }))}
                placeholder="e.g. Book Train Ticket, Process Payment..."
                className="w-full bg-black/60 border border-white/10 focus:border-purple-500 rounded-xl px-3 py-2 text-white font-mono text-xs placeholder-slate-600 focus:outline-none transition"
              />
            </div>
            <div>
              <label className="text-slate-400 font-bold font-mono block mb-1.5">Actors (comma-separated) <span className="text-rose-400">*</span></label>
              <input
                value={newUC.actors}
                onChange={e => setNewUC(s => ({ ...s, actors: e.target.value }))}
                placeholder="e.g. Passenger, System, Payment Gateway..."
                className="w-full bg-black/60 border border-white/10 focus:border-purple-500 rounded-xl px-3 py-2 text-white font-mono text-xs placeholder-slate-600 focus:outline-none transition"
              />
            </div>
            <div>
              <label className="text-slate-400 font-bold font-mono block mb-1.5">Preconditions (one per line)</label>
              <textarea
                value={newUC.preconditions}
                onChange={e => setNewUC(s => ({ ...s, preconditions: e.target.value }))}
                placeholder="User is authenticated&#10;System is online&#10;Payment service is reachable"
                rows={3}
                className="w-full bg-black/60 border border-white/10 focus:border-purple-500 rounded-xl px-3 py-2 text-white font-mono text-xs placeholder-slate-600 focus:outline-none transition resize-none"
              />
            </div>
            <div>
              <label className="text-slate-400 font-bold font-mono block mb-1.5">Postconditions (one per line)</label>
              <textarea
                value={newUC.postconditions}
                onChange={e => setNewUC(s => ({ ...s, postconditions: e.target.value }))}
                placeholder="Booking record is persisted&#10;Confirmation email is sent&#10;Seat is reserved"
                rows={3}
                className="w-full bg-black/60 border border-white/10 focus:border-purple-500 rounded-xl px-3 py-2 text-white font-mono text-xs placeholder-slate-600 focus:outline-none transition resize-none"
              />
            </div>
            <div className="md:col-span-2">
              <label className="text-slate-400 font-bold font-mono block mb-1.5">Main Success Flow (one step per line)</label>
              <textarea
                value={newUC.mainFlowText}
                onChange={e => setNewUC(s => ({ ...s, mainFlowText: e.target.value }))}
                placeholder="1. Actor selects seat and enters passenger details&#10;2. System validates inputs and checks availability&#10;3. Actor confirms and initiates payment&#10;4. System processes payment and issues PNR"
                rows={4}
                className="w-full bg-black/60 border border-white/10 focus:border-cyan-500 rounded-xl px-3 py-2 text-white font-mono text-xs placeholder-slate-600 focus:outline-none transition resize-none"
              />
            </div>
            <div>
              <label className="text-slate-400 font-bold font-mono block mb-1.5">Alternative Flows (one per line)</label>
              <textarea
                value={newUC.alternativeFlowText}
                onChange={e => setNewUC(s => ({ ...s, alternativeFlowText: e.target.value }))}
                placeholder="2a. Seat unavailable: system suggests next available options"
                rows={3}
                className="w-full bg-black/60 border border-white/10 focus:border-amber-500 rounded-xl px-3 py-2 text-white font-mono text-xs placeholder-slate-600 focus:outline-none transition resize-none"
              />
            </div>
            <div>
              <label className="text-slate-400 font-bold font-mono block mb-1.5">Exception / Error Flows (one per line)</label>
              <textarea
                value={newUC.exceptionsText}
                onChange={e => setNewUC(s => ({ ...s, exceptionsText: e.target.value }))}
                placeholder="Payment timeout: system rolls back and notifies user"
                rows={3}
                className="w-full bg-black/60 border border-white/10 focus:border-red-500 rounded-xl px-3 py-2 text-white font-mono text-xs placeholder-slate-600 focus:outline-none transition resize-none"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2 border-t border-white/10">
            <button onClick={() => setShowAddForm(false)} className="px-4 py-2 rounded-xl text-xs font-mono text-slate-400 hover:text-white transition cursor-pointer">
              Cancel
            </button>
            <button
              onClick={addCustomUseCase}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-400 hover:to-violet-500 text-white font-black text-xs font-mono shadow-neon-purple transition cursor-pointer flex items-center gap-2"
            >
              <Plus className="h-3.5 w-3.5" />
              Add Use Case
            </button>
          </div>
        </div>
      )}

      {/* Use Cases Cards */}
      {displayUseCases.length === 0 ? (
        <div className="glass-card p-8 rounded-2xl border border-white/10 text-center">
          <GitMerge className="h-10 w-10 text-slate-600 mx-auto mb-3" />
          <p className="text-xs text-slate-400">No use cases yet. Extract requirements first, or click "Add Use Case" above to create one manually.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {displayUseCases.map(uc => {
            const isExpanded = expandedIds.has(uc.id);
            const isEditing = editingId === uc.id;
            const justSaved = savedIds.has(uc.id);

            return (
              <div
                key={uc.id}
                className={`glass-card p-6 rounded-2xl border transition-all duration-200 space-y-4 group ${
                  justSaved
                    ? 'border-emerald-500/50 shadow-neon-emerald'
                    : 'border-white/10 hover:border-purple-500/40 hover:shadow-neon-purple'
                }`}
              >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-mono font-bold text-cyan-400">{uc.id}</span>
                    {isEditing ? (
                      <input
                        value={editBuffer.title ?? uc.title}
                        onChange={e => setEditBuffer(b => ({ ...b, title: e.target.value }))}
                        className="bg-black/60 border border-purple-500/40 rounded px-2 py-1 text-white font-mono text-sm focus:outline-none focus:border-purple-400 flex-1"
                      />
                    ) : (
                      <h3 className="text-sm font-bold text-white">{uc.title}</h3>
                    )}
                    {justSaved && <span className="text-[10px] text-emerald-400 font-mono">✓ Saved</span>}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-mono font-bold border border-cyan-500/30">
                      REF: {uc.requirementId || 'REQ-SYS'}
                    </span>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {!isEditing ? (
                        <>
                          <button
                            onClick={() => startEdit(uc)}
                            className="p-1.5 rounded-lg bg-surface hover:bg-surface-hover text-slate-400 hover:text-purple-400 border border-white/10 hover:border-purple-400/40 hover:shadow-neon-purple transition cursor-pointer"
                          >
                            <Edit3 className="h-3 w-3" />
                          </button>
                          <button
                            onClick={() => toggleExpand(uc.id)}
                            className="p-1.5 rounded-lg bg-surface hover:bg-surface-hover text-slate-400 hover:text-white border border-white/10 transition cursor-pointer"
                          >
                            {isExpanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                          </button>
                          <button
                            onClick={() => deleteUseCase(uc.id)}
                            className="p-1.5 rounded-lg bg-surface hover:bg-red-500/20 text-slate-500 hover:text-red-400 border border-white/10 hover:border-red-400/40 transition cursor-pointer"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => saveEdit(uc.id)}
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
                </div>

                {/* Meta: Actors, Pre, Post */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  <div className="bg-black/40 p-3 rounded-xl border border-white/5">
                    <div className="flex items-center space-x-1.5 text-cyan-400 font-bold text-[11px] mb-1">
                      <Users className="h-3.5 w-3.5" />
                      <span>Primary Actors</span>
                    </div>
                    {isEditing ? (
                      <input
                        value={(editBuffer.actors ?? uc.actors).join(', ')}
                        onChange={e => setEditBuffer(b => ({ ...b, actors: e.target.value.split(',').map(a => a.trim()).filter(Boolean) }))}
                        className="w-full bg-black/60 border border-cyan-500/30 rounded px-2 py-1 text-white font-mono text-xs focus:outline-none"
                        placeholder="Actor1, Actor2..."
                      />
                    ) : (
                      <p className="text-slate-300">{uc.actors.join(', ')}</p>
                    )}
                  </div>

                  <div className="bg-black/40 p-3 rounded-xl border border-white/5">
                    <div className="flex items-center space-x-1.5 text-purple-400 font-bold text-[11px] mb-1">
                      <CheckSquare className="h-3.5 w-3.5" />
                      <span>Preconditions</span>
                    </div>
                    {isEditing ? (
                      <textarea
                        value={getArrayText(editBuffer.preconditions ?? uc.preconditions)}
                        onChange={e => editArrayField('preconditions', e.target.value)}
                        rows={3}
                        className="w-full bg-black/60 border border-purple-500/30 rounded px-2 py-1 text-white font-mono text-xs focus:outline-none resize-none"
                      />
                    ) : (
                      <ul className="list-disc list-inside text-slate-300 space-y-0.5 text-[11px]">
                        {uc.preconditions.map((p, i) => <li key={i}>{p}</li>)}
                      </ul>
                    )}
                  </div>

                  <div className="bg-black/40 p-3 rounded-xl border border-white/5">
                    <div className="flex items-center space-x-1.5 text-emerald-400 font-bold text-[11px] mb-1">
                      <CheckSquare className="h-3.5 w-3.5" />
                      <span>Postconditions</span>
                    </div>
                    {isEditing ? (
                      <textarea
                        value={getArrayText(editBuffer.postconditions ?? uc.postconditions)}
                        onChange={e => editArrayField('postconditions', e.target.value)}
                        rows={3}
                        className="w-full bg-black/60 border border-emerald-500/30 rounded px-2 py-1 text-white font-mono text-xs focus:outline-none resize-none"
                      />
                    ) : (
                      <ul className="list-disc list-inside text-slate-300 space-y-0.5 text-[11px]">
                        {uc.postconditions.map((p, i) => <li key={i}>{p}</li>)}
                      </ul>
                    )}
                  </div>
                </div>

                {/* Main Success Flow */}
                {(isExpanded || isEditing) && (
                  <div className="bg-surface/60 p-4 rounded-xl border border-white/5">
                    <div className="flex items-center space-x-1.5 text-white font-bold text-xs mb-2">
                      <ListOrdered className="h-4 w-4 text-cyan-400" />
                      <span>Main Success Scenario (Basic Flow)</span>
                    </div>
                    {isEditing ? (
                      <textarea
                        value={getArrayText(editBuffer.mainFlow ?? uc.mainFlow)}
                        onChange={e => editArrayField('mainFlow', e.target.value)}
                        rows={5}
                        className="w-full bg-black/60 border border-cyan-500/30 rounded-xl px-3 py-2 text-white font-mono text-xs focus:outline-none resize-none"
                        placeholder="1. Actor does X&#10;2. System responds with Y&#10;3. Actor confirms..."
                      />
                    ) : (
                      <div className="space-y-1.5 pl-2 border-l-2 border-cyan-500/40 text-xs text-slate-200 font-mono">
                        {uc.mainFlow.map((step, idx) => (
                          <p key={idx} className="leading-relaxed">{step}</p>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Alt & Exception Flows */}
                {(isExpanded || isEditing) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="bg-amber-500/5 p-3.5 rounded-xl border border-amber-500/20">
                      <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block mb-1">
                        Alternative Branch Flow
                      </span>
                      {isEditing ? (
                        <textarea
                          value={getArrayText(editBuffer.alternativeFlow ?? uc.alternativeFlow)}
                          onChange={e => editArrayField('alternativeFlow', e.target.value)}
                          rows={3}
                          className="w-full bg-black/60 border border-amber-500/30 rounded-xl px-3 py-2 text-white font-mono text-xs focus:outline-none resize-none"
                          placeholder="2a. If invalid input, system prompts correction..."
                        />
                      ) : (
                        uc.alternativeFlow.map((alt, i) => (
                          <p key={i} className="text-slate-300 font-mono">{alt}</p>
                        ))
                      )}
                    </div>

                    <div className="bg-red-500/5 p-3.5 rounded-xl border border-red-500/20">
                      <span className="text-[10px] font-bold text-red-400 uppercase tracking-wider block mb-1">
                        Exception Handling Flow
                      </span>
                      {isEditing ? (
                        <textarea
                          value={getArrayText(editBuffer.exceptions ?? uc.exceptions)}
                          onChange={e => editArrayField('exceptions', e.target.value)}
                          rows={3}
                          className="w-full bg-black/60 border border-red-500/30 rounded-xl px-3 py-2 text-white font-mono text-xs focus:outline-none resize-none"
                          placeholder="3a. Timeout: system rolls back and notifies..."
                        />
                      ) : (
                        uc.exceptions.map((exc, i) => (
                          <p key={i} className="text-slate-300 font-mono">{exc}</p>
                        ))
                      )}
                    </div>
                  </div>
                )}

                {/* Expand hint when collapsed */}
                {!isExpanded && !isEditing && (
                  <button
                    onClick={() => toggleExpand(uc.id)}
                    className="w-full text-[10px] text-slate-500 hover:text-purple-400 font-mono text-center py-1 transition cursor-pointer"
                  >
                    ↓ Expand main flow, alternatives &amp; exceptions
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
