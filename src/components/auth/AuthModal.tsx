import React, { useState } from 'react';
import { X, Lock, Mail, User, ShieldCheck, KeyRound, CheckCircle2, UserCheck } from 'lucide-react';
import { useProject } from '../../context/ProjectContext';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, setUserSession } = useProject();

  const [role, setRole] = useState<'Admin' | 'User' | 'Senior Business Analyst' | 'QA Lead' | 'Security Analyst' | 'Project Manager'>('Admin');
  const [email, setEmail] = useState('admin@requirex.io');
  const [pin, setPin] = useState('1234');
  const [username, setUsername] = useState('Alex Mercer (Admin)');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isAuthModalOpen) return null;

  const handleRoleSelect = (selectedRole: typeof role) => {
    setRole(selectedRole);
    if (selectedRole === 'Admin') {
      setUsername('Alex Mercer (Platform Admin)');
      setEmail('admin@requirex.io');
      setPin('1234');
    } else if (selectedRole === 'User') {
      setUsername('David Kim (Software Engineer)');
      setEmail('user@requirex.io');
      setPin('1234');
    } else if (selectedRole === 'Senior Business Analyst') {
      setUsername('Sarah Jenkins (Lead BA)');
      setEmail('ba@requirex.io');
      setPin('1234');
    } else if (selectedRole === 'QA Lead') {
      setUsername('Elena Rostova (QA Lead)');
      setEmail('qa@requirex.io');
      setPin('1234');
    } else if (selectedRole === 'Security Analyst') {
      setUsername('Marcus Vance (SecOps)');
      setEmail('security@requirex.io');
      setPin('1234');
    } else {
      setUsername('Jordan Croft (Project Manager)');
      setEmail('pm@requirex.io');
      setPin('1234');
    }
    setErrorMsg('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pin || pin.length !== 4) {
      setErrorMsg('Please enter a valid 4-digit PIN code (e.g. 1234)');
      return;
    }
    setUserSession({
      username: username || 'RequireX Engineer',
      email: email || 'user@requirex.io',
      role,
      pin,
      isLoggedIn: true
    });
    setIsAuthModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-lg bg-[#12121A] border border-cyan-500/30 rounded-2xl p-6 shadow-[0_0_50px_rgba(0,240,255,0.25)] glass-card">
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/5"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center space-x-3 mb-5">
          <div className="h-11 w-11 rounded-xl bg-cyan-500/10 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-neon-cyan">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-xl font-black text-white font-mono flex items-center gap-2">
              Require<span className="text-cyan-400">X</span> Auth Gateway
            </h3>
            <p className="text-xs text-slate-400">Select persona role and verify 4-digit security PIN</p>
          </div>
        </div>

        {/* Role Persona Switcher Pills */}
        <div className="mb-5">
          <label className="block text-[11px] font-extrabold uppercase text-cyan-400 tracking-wider font-mono mb-2">
            Switch Persona Role
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'Admin', label: 'Admin', icon: ShieldCheck },
              { id: 'User', label: 'User / Dev', icon: UserCheck },
              { id: 'Senior Business Analyst', label: 'Senior BA', icon: User },
              { id: 'QA Lead', label: 'QA Lead', icon: CheckCircle2 },
              { id: 'Security Analyst', label: 'Security', icon: Lock },
              { id: 'Project Manager', label: 'Project Mgr', icon: KeyRound }
            ].map(item => {
              const Icon = item.icon;
              const isSelected = role === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleRoleSelect(item.id as any)}
                  className={`flex items-center justify-center space-x-1.5 py-2 px-2.5 rounded-xl text-xs font-semibold border transition duration-200 ${
                    isSelected
                      ? 'bg-gradient-to-r from-cyan-500/30 to-blue-600/30 border-cyan-400 text-cyan-300 shadow-neon-cyan'
                      : 'bg-black/40 border-white/10 text-slate-400 hover:text-white hover:border-white/20'
                  }`}
                >
                  <Icon className={`h-3.5 w-3.5 ${isSelected ? 'text-cyan-400' : 'text-slate-400'}`} />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">User Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                required
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="e.g. Alex Mercer"
                className="w-full bg-black/60 border border-white/10 rounded-xl py-2 pl-9 pr-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Work Email ID</label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="admin@requirex.io"
                className="w-full bg-black/60 border border-white/10 rounded-xl py-2 pl-9 pr-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-semibold text-slate-300">4-Digit Security PIN Code</label>
              <span className="text-[10px] text-cyan-400 font-mono">Default Demo PIN: 1234</span>
            </div>
            <div className="relative">
              <KeyRound className="absolute left-3 top-2.5 h-4 w-4 text-cyan-400" />
              <input
                type="password"
                maxLength={4}
                required
                value={pin}
                onChange={e => {
                  setPin(e.target.value.replace(/\D/g, '').slice(0, 4));
                  setErrorMsg('');
                }}
                placeholder="1234"
                className="w-full bg-black/60 border border-cyan-500/40 rounded-xl py-2 pl-9 pr-3 text-sm text-cyan-300 tracking-[0.4em] font-mono placeholder-slate-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
              />
            </div>
          </div>

          {errorMsg && (
            <p className="text-xs text-rose-400 font-mono bg-rose-500/10 border border-rose-500/20 p-2 rounded-lg text-center">
              {errorMsg}
            </p>
          )}

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-blue-500 text-black font-extrabold text-xs shadow-neon-cyan transition duration-200 uppercase tracking-wider font-mono"
          >
            Authenticate & Launch Workspace ({role})
          </button>
        </form>

        <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
          <span className="font-mono text-slate-500">RequireX AI Suite v2.0</span>
          <button
            type="button"
            onClick={() => {
              setEmail('admin@requirex.io');
              setPin('1234');
              setRole('Admin');
              setUsername('Alex Mercer (Admin)');
            }}
            className="text-cyan-400 hover:underline font-mono text-[10px]"
          >
            Autofill Admin PIN (1234)
          </button>
        </div>
      </div>
    </div>
  );
};
