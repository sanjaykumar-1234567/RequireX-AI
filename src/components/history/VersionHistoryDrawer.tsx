import React, { useState } from 'react';
import { X, History, Plus, RotateCcw, CheckCircle2, Clock } from 'lucide-react';
import { useProject } from '../../context/ProjectContext';

export const VersionHistoryDrawer: React.FC = () => {
  const { isHistoryOpen, setIsHistoryOpen, currentProject, createVersionSnapshot, restoreVersionSnapshot } = useProject();
  const [snapshotNote, setSnapshotNote] = useState('');

  if (!isHistoryOpen || !currentProject) return null;

  const handleCreateSnapshot = () => {
    if (!snapshotNote.trim()) return;
    createVersionSnapshot(snapshotNote);
    setSnapshotNote('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-md bg-[#12121A] border-l border-white/10 h-full flex flex-col shadow-2xl">
        
        {/* Header */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between bg-black/40">
          <div className="flex items-center space-x-2.5">
            <History className="h-5 w-5 text-cyan-400" />
            <div>
              <h3 className="text-sm font-bold text-white font-mono">Project Version History</h3>
              <p className="text-[10px] text-slate-400">Snapshot version control & rollback timeline</p>
            </div>
          </div>

          <button
            onClick={() => setIsHistoryOpen(false)}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/5"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Create Snapshot Form */}
        <div className="p-4 border-b border-white/10 bg-surface/50 space-y-2">
          <label className="block text-xs font-semibold text-slate-300">Create Version Snapshot</label>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={snapshotNote}
              onChange={e => setSnapshotNote(e.target.value)}
              placeholder="e.g. Approved IEEE Tatkal Performance Spec v1.2"
              className="flex-1 bg-black/50 border border-white/10 rounded-xl py-1.5 px-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
            />
            <button
              onClick={handleCreateSnapshot}
              disabled={!snapshotNote.trim()}
              className="px-3 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-black font-bold text-xs shadow-neon-cyan transition flex items-center space-x-1"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Save</span>
            </button>
          </div>
        </div>

        {/* History Timeline List */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
          {currentProject.history.length === 0 ? (
            <div className="text-center py-10 text-slate-400">
              <Clock className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No historical snapshots saved yet.</p>
              <p className="text-[11px] mt-1">Create your first version snapshot above to bookmark current requirements state.</p>
            </div>
          ) : (
            currentProject.history.map(snap => (
              <div key={snap.id} className="p-3.5 rounded-xl bg-black/40 border border-white/10 hover:border-cyan-500/30 transition space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-cyan-400 text-xs">v{snap.versionNumber}.0</span>
                  <span className="text-[10px] text-slate-400">{snap.timestamp}</span>
                </div>
                <p className="text-slate-200 font-medium">{snap.description}</p>
                <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-white/5">
                  <span>{snap.requirements.length} Requirements • {snap.testCases.length} Tests</span>
                  <button
                    onClick={() => restoreVersionSnapshot(snap.id)}
                    className="flex items-center space-x-1 text-cyan-400 hover:underline font-semibold"
                  >
                    <RotateCcw className="h-3 w-3" />
                    <span>Restore Version</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
