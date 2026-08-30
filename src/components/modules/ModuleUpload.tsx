import React, { useState } from 'react';
import { 
  FileUp, 
  Sparkles, 
  Upload, 
  FileText, 
  Layers, 
  Trash2, 
  Edit3, 
  CheckCircle, 
  FileCheck,
  AlertCircle,
  XCircle,
  FileCode
} from 'lucide-react';
import { useProject } from '../../context/ProjectContext';
import { AIEngine } from '../../services/aiEngine';
import { DocumentParserService } from '../../services/documentParserService';
import { RequirementCategory } from '../../types';

export const ModuleUpload: React.FC = () => {
  const { currentProject, addRequirementsToProject, deleteRequirement } = useProject();
  const [inputText, setInputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'paste' | 'upload' | 'transcript'>('paste');

  const handleExtract = () => {
    if (!inputText.trim() || !currentProject) return;
    setIsProcessing(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    setTimeout(() => {
      try {
        const sanitized = DocumentParserService.sanitizeText(inputText);
        if (!sanitized) {
          setErrorMessage('The entered text does not contain valid requirement statements.');
          setIsProcessing(false);
          return;
        }

        const extracted = AIEngine.extractRequirements(sanitized, currentProject.domain);
        if (extracted.length === 0) {
          setErrorMessage('No valid atomic requirements could be extracted. Please enter statements with at least 8 characters.');
          setIsProcessing(false);
          return;
        }

        addRequirementsToProject(extracted);
        setSuccessMessage(`Successfully extracted and categorized ${extracted.length} requirements!`);
        setInputText('');
      } catch (err: any) {
        setErrorMessage(err.message || 'Failed to extract requirements.');
      } finally {
        setIsProcessing(false);
      }
    }, 600);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !currentProject) return;

    setIsProcessing(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      // Cleanly parse Word .docx, PDF, or Plain text files
      const cleanText = await DocumentParserService.parseFile(file);
      
      if (!cleanText || cleanText.trim().length < 10) {
        setErrorMessage(`Could not extract readable text from "${file.name}". Please ensure the file contains readable requirements text.`);
        setIsProcessing(false);
        return;
      }

      const extracted = AIEngine.extractRequirements(cleanText, currentProject.domain);
      
      if (extracted.length === 0) {
        setErrorMessage(`No valid requirements could be parsed from "${file.name}". Please check the document content.`);
        setIsProcessing(false);
        return;
      }

      addRequirementsToProject(extracted);
      setSuccessMessage(`Successfully parsed "${file.name}" and extracted ${extracted.length} requirements!`);
    } catch (err: any) {
      console.error('File parsing error:', err);
      setErrorMessage(err.message || `Failed to parse "${file.name}".`);
    } finally {
      setIsProcessing(false);
      // Reset input so same file can be uploaded again if needed
      e.target.value = '';
    }
  };

  const loadSampleTranscript = () => {
    setInputText(
      `Stakeholder Interview Transcript - ${currentProject?.domain || 'Software System'}
1. The system shall authenticate users via OAuth 2.0 and biometric single sign-on.
2. The user interface shall load dashboard metrics within 1.5 seconds under 10,000 concurrent sessions.
3. The payment gateway shall process refunds within 24 hours of cancellation approval.
4. The system shall encrypt all sensitive customer data at rest using AES-256 standards.
5. The reporting engine shall export audit logs in PDF and CSV format on a weekly automated schedule.`
    );
    setErrorMessage(null);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="glass-card neon-card-violet p-6 rounded-2xl border border-violet-500/40 shadow-neon-violet flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-cyan-400 text-xs font-bold font-mono mb-1">
            <FileUp className="h-4 w-4" />
            <span>MODULE 1 &amp; 2 • REQUIREMENT INGESTION &amp; CLASSIFICATION</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white font-mono">Upload &amp; Extract Requirements</h1>
          <p className="text-xs text-slate-300 mt-1">
            Upload Word (.docx), PDF, TXT documents or paste stakeholder interview transcripts. RequireX AI extracts atomic requirements and classifies them into Functional, Non-functional, System, Business, User, and Technical categories for <strong className="text-cyan-300 font-mono">{currentProject?.name}</strong>.
          </p>
        </div>
      </div>

      {/* Error / Success Notifications */}
      {errorMessage && (
        <div className="p-4 rounded-xl bg-red-500/15 border border-red-500/40 text-red-300 text-xs font-mono flex items-center justify-between shadow-neon-red">
          <div className="flex items-center space-x-2">
            <XCircle className="h-4 w-4 text-red-400 shrink-0" />
            <span>{errorMessage}</span>
          </div>
          <button onClick={() => setErrorMessage(null)} className="text-red-400 hover:text-white text-sm font-bold">×</button>
        </div>
      )}

      {successMessage && (
        <div className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center justify-between shadow-neon-emerald">
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" />
            <span>{successMessage}</span>
          </div>
          <button onClick={() => setSuccessMessage(null)} className="text-emerald-400 hover:text-white text-sm font-bold">×</button>
        </div>
      )}

      {/* Input Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Parser Dropzone / Manual Textarea */}
        <div className="lg:col-span-2 glass-card p-6 rounded-2xl border border-white/10 space-y-4">
          
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => { setActiveTab('paste'); setErrorMessage(null); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-mono transition cursor-pointer ${activeTab === 'paste' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'text-slate-400 hover:text-slate-200'}`}
              >
                Paste Requirement Text
              </button>
              <button
                onClick={() => { setActiveTab('upload'); setErrorMessage(null); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-mono transition cursor-pointer ${activeTab === 'upload' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'text-slate-400 hover:text-slate-200'}`}
              >
                Upload File (.docx / .pdf / .txt)
              </button>
              <button
                onClick={() => { setActiveTab('transcript'); setErrorMessage(null); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-mono transition cursor-pointer ${activeTab === 'transcript' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'text-slate-400 hover:text-slate-200'}`}
              >
                Interview Transcripts
              </button>
            </div>

            <button
              onClick={loadSampleTranscript}
              className="text-[11px] font-mono text-cyan-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Sparkles className="h-3 w-3" />
              <span>Load Clean Sample</span>
            </button>
          </div>

          {activeTab === 'upload' ? (
            <div className="border-2 border-dashed border-cyan-500/30 hover:border-cyan-400 rounded-2xl p-10 text-center transition cursor-pointer bg-black/50 group shadow-inner">
              <input
                type="file"
                accept=".docx,.pdf,.txt,.md,.json"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload-input"
                disabled={isProcessing}
              />
              <label htmlFor="file-upload-input" className="cursor-pointer block space-y-3">
                <Upload className={`h-12 w-12 text-cyan-400 mx-auto transition-transform group-hover:scale-110 ${isProcessing ? 'animate-bounce' : ''}`} />
                <div>
                  <p className="text-sm font-bold text-white font-mono">
                    {isProcessing ? 'Parsing Document & Extracting Requirements...' : 'Click to Browse or Drag & Drop File'}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    Native Word (.docx) text extractor, PDF parser, Plain text (.txt), Markdown (.md)
                  </p>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-[11px] font-mono">
                  <FileCode className="h-3.5 w-3.5" />
                  <span>Automatic Binary Filter &amp; Text Sanitizer Active</span>
                </div>
              </label>
            </div>
          ) : (
            <div>
              <textarea
                rows={7}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Enter client requirements, user stories, or stakeholder interview notes here (one per line, numbered, or bulleted)..."
                className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono leading-relaxed"
              />
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-3">
                <span className="text-[11px] text-slate-400 font-mono">
                  Target Domain: <strong className="text-cyan-400">{currentProject?.domain}</strong>
                </span>
                <button
                  onClick={handleExtract}
                  disabled={isProcessing || !inputText.trim()}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-600 to-violet-600 hover:from-cyan-300 hover:to-violet-500 disabled:opacity-50 text-slate-950 font-black text-xs font-mono shadow-neon-cyan transition flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <Sparkles className={`h-4 w-4 ${isProcessing ? 'animate-spin' : ''}`} />
                  <span>{isProcessing ? 'AI Extracting Requirements...' : 'Execute AI Extraction'}</span>
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Right Col: Category Breakdown Stats */}
        <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-4 font-mono">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Layers className="h-4 w-4 text-cyan-400" />
            <span>Classification Breakdown</span>
          </h3>

          <div className="space-y-2.5">
            {[
              { cat: 'Functional', desc: 'Core software behaviors & user actions' },
              { cat: 'Non-functional', desc: 'Performance, security, availability SLAs' },
              { cat: 'System', desc: 'Admin tools, system architecture, background jobs' },
              { cat: 'Technical', desc: 'APIs, database integrations, protocols' },
              { cat: 'Business', desc: 'Compliance, revenue rules, policies' },
              { cat: 'User', desc: 'User persona roles & UI capabilities' },
            ].map((item, idx) => {
              const count = currentProject?.requirements.filter(r => r.category === item.cat).length || 0;
              return (
                <div key={idx} className="p-2.5 rounded-xl bg-surface/80 border border-white/5 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-slate-200">{item.cat}</p>
                    <p className="text-[10px] text-slate-400 font-sans">{item.desc}</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold border border-cyan-500/30">
                    {count}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Extracted Requirement Cards Display */}
      <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2 font-mono">
            <FileCheck className="h-4 w-4 text-emerald-400" />
            <span>Extracted Requirement Inventory ({currentProject?.requirements.length || 0})</span>
          </h3>
          <span className="text-xs text-slate-400 font-mono">
            Click trash icon to remove any individual requirement
          </span>
        </div>

        {currentProject?.requirements.length === 0 ? (
          <p className="text-xs text-slate-400 text-center py-8 font-mono">
            No requirements in inventory. Upload a Word (.docx), PDF, or paste text above to extract.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentProject?.requirements.map(req => (
              <div 
                key={req.id} 
                className="p-4 rounded-xl bg-black/50 border border-white/10 hover:border-cyan-500/40 transition space-y-2 relative group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-mono font-bold text-cyan-400">{req.id}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white/5 text-slate-300 border border-white/10 font-mono">
                      {req.category}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                      req.priority === 'Critical' ? 'bg-red-500/20 text-red-300 border border-red-500/30' :
                      req.priority === 'High' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                      'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                    }`}>
                      {req.priority}
                    </span>

                    {/* Delete button */}
                    <button
                      onClick={() => deleteRequirement(req.id)}
                      className="p-1 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition cursor-pointer"
                      title="Delete Requirement"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                <p className="text-xs text-slate-200 font-medium leading-relaxed font-mono">
                  {req.description}
                </p>

                {req.issues.length > 0 && (
                  <div className="mt-2 p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-300 flex items-center justify-between font-mono">
                    <span>⚠️ {req.issues.length} IEEE Quality Issue(s) detected</span>
                    <span className="text-[10px] text-amber-400 uppercase font-bold">{req.issues[0].type}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
