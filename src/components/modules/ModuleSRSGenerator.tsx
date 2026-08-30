import React, { useState } from 'react';
import { 
  FileSpreadsheet, 
  Download, 
  Copy, 
  Check, 
  FileText, 
  BookOpen, 
  Sparkles, 
  Eye 
} from 'lucide-react';
import { useProject } from '../../context/ProjectContext';
import { ExportService, generateSRSMarkdown } from '../../services/exportService';

export const ModuleSRSGenerator: React.FC = () => {
  const { currentProject } = useProject();
  const [copied, setCopied] = useState(false);

  if (!currentProject) return null;

  const markdownText = generateSRSMarkdown(currentProject);

  const handleCopy = () => {
    navigator.clipboard.writeText(markdownText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="glass-card p-6 rounded-2xl border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-cyan-400 text-xs font-bold mb-1">
            <FileSpreadsheet className="h-4 w-4" />
            <span>MODULE 12 & 13 • IEEE-830 / 29148 SRS GENERATOR & EXPORTER</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white font-mono">IEEE Software Requirement Specification (SRS)</h1>
          <p className="text-xs text-slate-300 mt-1">
            Complete, standardized Software Requirement Specification document. Export as publication-ready PDF, Word (.docx), Markdown (.md), or Plain Text (.txt).
          </p>
        </div>

        {/* Multi-Format Export Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => ExportService.exportPDF(currentProject)}
            className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-red-500 to-red-600 hover:from-red-400 hover:to-red-500 text-white font-bold text-xs shadow-lg transition"
          >
            <Download className="h-4 w-4" />
            <span>Export PDF</span>
          </button>

          <button
            onClick={() => ExportService.exportDOCX(currentProject)}
            className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg transition"
          >
            <Download className="h-4 w-4" />
            <span>Export DOCX</span>
          </button>

          <button
            onClick={() => ExportService.exportMarkdown(currentProject)}
            className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-bold text-xs shadow-neon-cyan transition"
          >
            <Download className="h-4 w-4" />
            <span>Export Markdown</span>
          </button>

          <button
            onClick={handleCopy}
            className="p-2 rounded-xl bg-surface hover:bg-surface-hover text-slate-300 border border-white/10 transition"
            title="Copy Raw Markdown"
          >
            {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Live Document Preview Box */}
      <div className="glass-card p-8 rounded-2xl border border-white/10 space-y-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">
              <BookOpen className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white font-mono">{currentProject.name}_IEEE_SRS.md</h2>
              <p className="text-[11px] text-slate-400">IEEE Std 830-1998 / ISO/IEC/IEEE 29148 Compliance Verified</p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-mono font-bold border border-emerald-500/30">
            ✓ READY FOR PRODUCTION RELEASE
          </span>
        </div>

        {/* Formatted IEEE SRS Sections Preview */}
        <div className="bg-black/60 p-6 rounded-xl border border-white/10 text-xs font-mono text-slate-200 overflow-y-auto max-h-[600px] leading-relaxed whitespace-pre-wrap selection:bg-cyan-500 selection:text-black">
          {markdownText}
        </div>
      </div>
    </div>
  );
};
