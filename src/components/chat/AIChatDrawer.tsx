import React, { useState } from 'react';
import { X, Sparkles, Send, Bot, User, ArrowRight, FileText } from 'lucide-react';
import { useProject } from '../../context/ProjectContext';
import { AIEngine } from '../../services/aiEngine';
import { ChatMessage } from '../../types';

export const AIChatDrawer: React.FC = () => {
  const { isAIChatOpen, setIsAIChatOpen, currentProject, setActiveTab } = useProject();
  
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-0',
      sender: 'ai',
      text: `Hello! I am your **RequireX AI Co-Pilot**. I have indexed the **${currentProject?.name || 'Software Project'}** (${currentProject?.domain || 'General'}) context. Ask me anything about quality improvements, missing requirements, test case matrices, or IEEE SRS exports!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      actionButtons: [
        { label: 'Check Quality Audit', tabTarget: 'quality' },
        { label: 'View Agile User Stories', tabTarget: 'user-stories' },
        { label: 'Export IEEE SRS PDF', tabTarget: 'srs' }
      ]
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');

  if (!isAIChatOpen) return null;

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputQuery;
    if (!text.trim() || !currentProject) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');

    // Dynamic AI response generation
    setTimeout(() => {
      const aiReply = AIEngine.getAIChatResponse(text, currentProject.requirements, currentProject.domain);
      const aiMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'ai',
        text: aiReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actionButtons: getActionButtonsForQuery(text)
      };
      setMessages(prev => [...prev, aiMsg]);
    }, 500);
  };

  const getActionButtonsForQuery = (query: string) => {
    const q = query.toLowerCase();
    if (q.includes('quality') || q.includes('ambigu') || q.includes('score')) {
      return [{ label: 'Go to IEEE Quality Audit →', tabTarget: 'quality' }];
    }
    if (q.includes('story') || q.includes('agile')) {
      return [{ label: 'View Agile User Stories Board →', tabTarget: 'user-stories' }];
    }
    if (q.includes('test') || q.includes('qa')) {
      return [{ label: 'Open Automated Test Matrix →', tabTarget: 'test-cases' }];
    }
    if (q.includes('srs') || q.includes('export') || q.includes('pdf')) {
      return [{ label: 'Export IEEE SRS Document →', tabTarget: 'srs' }];
    }
    if (q.includes('missing') || q.includes('recommend')) {
      return [{ label: 'View Domain Suggestions →', tabTarget: 'recommendations' }];
    }
    return [{ label: 'Open Analytics Dashboard →', tabTarget: 'analytics' }];
  };

  const presetPrompts = [
    "What requirements are missing for this domain?",
    "Analyze requirement ambiguities and IEEE quality score.",
    "Generate Agile User Stories & Gherkin scenarios.",
    "How to export complete IEEE SRS to PDF or Word?"
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-md flex justify-end">
      <div className="w-full max-w-lg bg-[#12121A] border-l border-white/10 h-full flex flex-col shadow-2xl">
        
        {/* Header */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between bg-black/50">
          <div className="flex items-center space-x-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-600 p-[1.5px] shadow-neon-cyan">
              <div className="h-full w-full bg-[#0B0B0F] rounded-[9px] flex items-center justify-center text-cyan-400">
                <Sparkles className="h-4 w-4" />
              </div>
            </div>
            <div>
              <h3 className="text-sm font-bold text-white font-mono">RequireX AI Co-Pilot</h3>
              <p className="text-[10px] text-slate-400 font-medium">Contextual Software Engineering Assistant</p>
            </div>
          </div>

          <button
            onClick={() => setIsAIChatOpen(false)}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/5"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Message Feed */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs font-sans">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex items-start space-x-2.5 ${msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}
            >
              <div className={`h-7 w-7 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                msg.sender === 'user' ? 'bg-purple-600 text-white' : 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40'
              }`}>
                {msg.sender === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
              </div>

              <div className={`p-4 rounded-2xl max-w-[88%] border ${
                msg.sender === 'user'
                  ? 'bg-purple-600/30 border-purple-500/40 text-slate-100 rounded-tr-none'
                  : 'bg-surface/95 border-white/10 text-slate-200 rounded-tl-none leading-relaxed space-y-2'
              }`}>
                <div className="whitespace-pre-wrap leading-relaxed">{msg.text}</div>
                
                {msg.actionButtons && msg.actionButtons.length > 0 && (
                  <div className="pt-2 flex flex-wrap gap-2 border-t border-white/10">
                    {msg.actionButtons.map((btn, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setActiveTab(btn.tabTarget as any);
                          setIsAIChatOpen(false);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 text-[10px] font-bold border border-cyan-500/30 transition flex items-center space-x-1"
                      >
                        <span>{btn.label}</span>
                      </button>
                    ))}
                  </div>
                )}

                <span className="text-[9px] text-slate-400 mt-1 block text-right font-mono">{msg.timestamp}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Preset Prompts Bar */}
        <div className="p-3 border-t border-white/10 bg-black/40 space-y-2">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">Suggested AI Queries</p>
          <div className="flex flex-wrap gap-1.5">
            {presetPrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(p)}
                className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-cyan-500/20 text-[10px] text-cyan-300 border border-white/10 hover:border-cyan-500/30 transition text-left"
              >
                ⚡ {p}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-white/10 bg-[#0B0B0F]">
          <form
            onSubmit={e => { e.preventDefault(); handleSend(); }}
            className="flex items-center space-x-2"
          >
            <input
              type="text"
              value={inputQuery}
              onChange={e => setInputQuery(e.target.value)}
              placeholder="Ask RequireX AI anything..."
              className="flex-1 bg-black/50 border border-white/10 rounded-xl py-2.5 px-4 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
            />
            <button
              type="submit"
              disabled={!inputQuery.trim()}
              className="p-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-50 text-black font-bold transition shadow-neon-cyan"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};
