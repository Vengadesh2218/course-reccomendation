import React, { useState } from 'react';
import { X, Lock, Mail, User as UserIcon, Shield, Sparkles, ArrowRight, CheckCircle2, Bot } from 'lucide-react';
import { loginUser, signupStudent } from '../services/api';
import { User } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: User) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [mode, setMode] = useState<'LOGIN' | 'SIGNUP' | 'ADMIN'>('LOGIN');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (mode === 'SIGNUP') {
        const res = await signupStudent(name, email, password);
        onSuccess(res.user);
      } else if (mode === 'LOGIN') {
        const res = await loginUser(email, password, 'STUDENT');
        onSuccess(res.user);
      } else {
        const res = await loginUser(email, password, 'ADMIN');
        onSuccess(res.user);
      }
      onClose();
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const fillAdminDemo = () => {
    setMode('ADMIN');
    setEmail('admin@pathwise.ai');
    setPassword('admin123');
  };

  const fillStudentDemo = () => {
    setMode('LOGIN');
    setEmail('alex@example.com');
    setPassword('student123');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      {/* Modern Split/Structured Container preserving dark PathWise background */}
      <div className="relative w-full max-w-4xl glass-panel rounded-3xl border border-indigo-500/30 shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-12 my-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-xl bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 transition-all border border-slate-700/60"
        >
          <X className="w-5 h-5" />
        </button>

        {/* LEFT COLUMN: Premium Split Brand Banner */}
        <div className="md:col-span-5 p-8 bg-gradient-to-br from-indigo-950/90 via-slate-900 to-slate-950 border-r border-slate-800/80 flex flex-col justify-between relative overflow-hidden hidden md:flex">
          {/* Subtle Ambient Glow */}
          <div className="absolute -top-12 -left-12 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-sky-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold border border-indigo-500/30 shadow-sm">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>PathWise AI Compliance</span>
            </div>

            <h3 className="text-2xl font-black text-white leading-tight">
              Intelligent Academic & Career Pathways
            </h3>

            <p className="text-xs text-slate-300 leading-relaxed">
              Personalized course recommendations grounded in 12th subject prerequisites, marks calculation, and rule-aware compatibility.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-2.5 text-xs text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Real-Time 12th Marks Calculation</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Zero-Guesswork Prerequisites Rule Check</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Explainable 0-100% Match Scores</span>
              </div>
            </div>
          </div>

          <div className="relative z-10 pt-6 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
            <span className="flex items-center gap-1.5 font-medium">
              <Bot className="w-4 h-4 text-sky-400" />
              AI Advisor Active
            </span>
            <span>PathWise AI 2026</span>
          </div>
        </div>

        {/* RIGHT COLUMN: Structured Authentication Form Card */}
        <div className="md:col-span-7 p-6 sm:p-10 space-y-6 flex flex-col justify-center bg-slate-950/60">
          
          {/* Header & Mode Switcher */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-500/20 to-sky-500/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center shrink-0">
                {mode === 'ADMIN' ? <Shield className="w-6 h-6 text-purple-400" /> : <UserIcon className="w-6 h-6 text-sky-400" />}
              </div>
              <div>
                <h2 className="text-2xl font-extrabold text-white tracking-tight">
                  {mode === 'SIGNUP' ? 'Create Your Account' : mode === 'ADMIN' ? 'Admin Portal Access' : 'Welcome Back'}
                </h2>
                <p className="text-xs text-slate-400">
                  {mode === 'ADMIN' ? 'Manage course database & eligibility rules' : 'Access your academic profile & course recommendations'}
                </p>
              </div>
            </div>

            {/* Segmented Mode Selector Bar */}
            <div className="flex rounded-2xl bg-slate-900 p-1.5 border border-slate-800 text-xs font-bold">
              <button
                type="button"
                onClick={() => setMode('LOGIN')}
                className={`flex-1 py-2 rounded-xl transition-all ${
                  mode === 'LOGIN' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'text-slate-400 hover:text-white'
                }`}
              >
                Student Login
              </button>
              <button
                type="button"
                onClick={() => setMode('SIGNUP')}
                className={`flex-1 py-2 rounded-xl transition-all ${
                  mode === 'SIGNUP' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'text-slate-400 hover:text-white'
                }`}
              >
                Sign Up
              </button>
              <button
                type="button"
                onClick={() => setMode('ADMIN')}
                className={`flex-1 py-2 rounded-xl transition-all ${
                  mode === 'ADMIN' ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30' : 'text-slate-400 hover:text-white'
                }`}
              >
                Admin
              </button>
            </div>
          </div>

          {error && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {mode === 'SIGNUP' && (
              <div>
                <label className="block text-slate-300 font-semibold mb-1.5">Full Name</label>
                <div className="relative flex items-center">
                  <UserIcon className="w-4 h-4 text-slate-400 absolute left-3.5" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Rivera"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-3 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 shadow-inner"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-slate-300 font-semibold mb-1.5">Email Address</label>
              <div className="relative flex items-center">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5" />
                <input
                  type="email"
                  required
                  placeholder="e.g. student@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-3 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 shadow-inner"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1.5">Password</label>
              <div className="relative flex items-center">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-3 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 shadow-inner"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3.5 rounded-xl font-bold text-sm text-white shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 ${
                mode === 'ADMIN'
                  ? 'bg-purple-600 hover:bg-purple-500 shadow-purple-600/30'
                  : 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-600/30'
              }`}
            >
              <span>{loading ? 'Authenticating...' : mode === 'SIGNUP' ? 'Create Free Account' : mode === 'ADMIN' ? 'Login as Admin' : 'Sign In'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Fill Demo Pills */}
          <div className="pt-4 border-t border-slate-800 text-center space-y-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              Quick Demo Fill Buttons:
            </span>
            <div className="flex items-center justify-center gap-2.5">
              <button
                type="button"
                onClick={fillStudentDemo}
                className="px-3.5 py-2 rounded-xl bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-500/25 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Student Demo
              </button>
              <button
                type="button"
                onClick={fillAdminDemo}
                className="px-3.5 py-2 rounded-xl bg-purple-500/15 text-purple-300 border border-purple-500/30 hover:bg-purple-500/25 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Shield className="w-3.5 h-3.5 text-purple-400" />
                Admin Demo
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
