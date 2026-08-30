import React, { useState } from 'react';
import { 
  CheckSquare, 
  Search, 
  Filter, 
  ShieldCheck, 
  Zap, 
  Lock, 
  AlertOctagon, 
  CheckCircle2, 
  Clock 
} from 'lucide-react';
import { useProject } from '../../context/ProjectContext';
import { TestCase } from '../../types';

export const ModuleTestCases: React.FC = () => {
  const { currentProject } = useProject();
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  if (!currentProject) return null;

  const categories = ['All', 'Positive', 'Negative', 'Boundary', 'Validation', 'Security', 'Performance'];

  const filteredTestCases = currentProject.testCases.filter(tc => {
    const matchesCat = filterCategory === 'All' || tc.category === filterCategory;
    const matchesQuery = searchQuery === '' || 
      tc.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tc.inputData.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCat && matchesQuery;
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="glass-card p-6 rounded-2xl border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-blue-400 text-xs font-bold mb-1">
            <CheckSquare className="h-4 w-4" />
            <span>MODULE 9 • COMPREHENSIVE QA TEST SUITE GENERATOR</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white font-mono">Automated Test Case Matrix</h1>
          <p className="text-xs text-slate-300 mt-1">
            Automatically synthesize Positive, Negative, Boundary, Validation, Security, and Performance test suites complete with Test ID, Inputs, Expected Outputs, Priority, and Verification Status.
          </p>
        </div>

        <div className="flex items-center space-x-3 bg-surface/80 px-3 py-1.5 rounded-xl border border-white/10">
          <div className="text-right">
            <p className="text-[10px] text-slate-400">Total Test Cases</p>
            <p className="text-lg font-bold font-mono text-cyan-400">{currentProject.testCases.length}</p>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="glass-card p-4 rounded-xl border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Category Tabs */}
        <div className="flex items-center space-x-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                filterCategory === cat
                  ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-surface'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search test ID, input, or output..."
            className="w-full bg-black/50 border border-white/10 rounded-xl py-1.5 pl-9 pr-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      {/* Test Case Table */}
      <div className="glass-card rounded-2xl border border-white/10 overflow-hidden">
        {filteredTestCases.length === 0 ? (
          <p className="text-xs text-slate-400 text-center py-8">No matching test cases found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-black/60 border-b border-white/10 text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Test ID</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Description</th>
                  <th className="py-3 px-4">Input Data</th>
                  <th className="py-3 px-4">Expected Output</th>
                  <th className="py-3 px-4">Priority</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-sans">
                {filteredTestCases.map(tc => (
                  <tr key={tc.id} className="hover:bg-white/5 transition">
                    <td className="py-3.5 px-4 font-mono font-bold text-cyan-400">{tc.id}</td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        tc.category === 'Security' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                        tc.category === 'Performance' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' :
                        tc.category === 'Boundary' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                        'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                      }`}>
                        {tc.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-200 max-w-xs leading-tight">{tc.description}</td>
                    <td className="py-3.5 px-4 font-mono text-[11px] text-slate-400 max-w-xs truncate">{tc.inputData}</td>
                    <td className="py-3.5 px-4 font-mono text-[11px] text-emerald-300 max-w-xs">{tc.expectedOutput}</td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${tc.priority === 'Critical' ? 'text-red-400' : 'text-slate-300'}`}>
                        {tc.priority}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-1 rounded text-[10px] font-bold flex items-center gap-1 w-max ${
                        tc.status === 'Passed' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                        'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      }`}>
                        {tc.status === 'Passed' ? <CheckCircle2 className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
                        {tc.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
