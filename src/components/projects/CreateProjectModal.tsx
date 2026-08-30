import React, { useState } from 'react';
import { X, Plus, FolderPlus, Sparkles } from 'lucide-react';
import { useProject } from '../../context/ProjectContext';

export const CreateProjectModal: React.FC = () => {
  const { isCreateProjectOpen, setIsCreateProjectOpen, createNewProject } = useProject();

  const [name, setName] = useState('');
  const [domain, setDomain] = useState('Online Quiz Platform');
  const [description, setDescription] = useState('');

  if (!isCreateProjectOpen) return null;

  const domains = [
    'Online Quiz Platform',
    'Railway Reservation',
    'Hospital Management',
    'E-Commerce',
    'Banking',
    'Education',
    'Food Delivery',
    'Travel',
    'Library',
    'Hotel',
    'Others'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    createNewProject(name, domain, description);
    setName('');
    setDescription('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
      <div className="relative w-full max-w-lg bg-[#12121A] border border-white/10 rounded-2xl p-6 shadow-2xl">
        <button
          onClick={() => setIsCreateProjectOpen(false)}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/5"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center space-x-3 mb-6">
          <div className="h-10 w-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <FolderPlus className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white font-mono">Create New Software Project</h3>
            <p className="text-xs text-slate-400">Initialize a new requirements engineering project context</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-300 mb-1">Project Name *</label>
            <input
              type="text"
              required
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. Smart Online Quiz & Proctoring Portal"
              className="w-full bg-black/50 border border-white/10 rounded-xl py-2 px-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">Project Domain *</label>
            <select
              value={domain}
              onChange={e => setDomain(e.target.value)}
              className="w-full bg-black/50 border border-white/10 rounded-xl py-2 px-3 text-white focus:outline-none focus:border-cyan-500 cursor-pointer"
            >
              {domains.map(d => (
                <option key={d} value={d} className="bg-[#12121A] text-white">
                  {d}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">Project Description & Scope</label>
            <textarea
              rows={3}
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Briefly describe system goals, exam proctoring features, grading algorithms..."
              className="w-full bg-black/50 border border-white/10 rounded-xl py-2 px-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono leading-relaxed"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-bold text-xs shadow-neon-cyan transition flex items-center justify-center space-x-2"
          >
            <Sparkles className="h-4 w-4" />
            <span>Create Project & Initialize AI Engine</span>
          </button>
        </form>
      </div>
    </div>
  );
};
