import React from 'react';
import { Compass, Sparkles, BookOpen, Layers, User as UserIcon, Shield, Bot, LogOut, CheckCircle2 } from 'lucide-react';
import { User, StudentProfile } from '../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  user: User | null;
  onOpenAuth: () => void;
  onLogout: () => void;
  onToggleAi: () => void;
  profile: StudentProfile | null;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  user,
  onOpenAuth,
  onLogout,
  onToggleAi,
  profile
}) => {
  return (
    <nav className="sticky top-0 z-40 w-full glass-panel border-b border-slate-800/80 px-4 lg:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <div
          onClick={() => setActiveTab('landing')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-sky-500 to-emerald-400 p-0.5 shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Compass className="w-5 h-5 text-sky-400 group-hover:rotate-45 transition-transform duration-500" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xl tracking-tight text-white font-sans">PathWise</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                AI 2026
              </span>
            </div>
            <p className="text-[10px] font-medium text-slate-400 tracking-wider">ACADEMIC PATHWAY INTELLIGENCE</p>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('landing')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'landing'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            Home
          </button>

          {profile && (
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                activeTab === 'dashboard'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <UserIcon className="w-3.5 h-3.5" />
              My Profile
            </button>
          )}

          <button
            onClick={() => setActiveTab('onboarding')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
              activeTab === 'onboarding'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            {profile ? 'Retake Assessment' : 'Start Onboarding'}
          </button>

          <button
            onClick={() => setActiveTab('recommendations')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
              activeTab === 'recommendations'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            Recommendations
          </button>

          <button
            onClick={() => setActiveTab('pathway')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
              activeTab === 'pathway'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Pathway Flow
          </button>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {/* AI Advisor Trigger Button */}
          <button
            onClick={onToggleAi}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-sky-500/15 to-indigo-500/15 hover:from-sky-500/25 hover:to-indigo-500/25 border border-sky-500/30 text-sky-300 text-xs font-medium transition-all shadow-lg shadow-sky-500/10 group"
          >
            <Bot className="w-4 h-4 text-sky-400 group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline">PathWise AI Advisor</span>
          </button>

          {/* Admin Switch */}
          {user?.role === 'ADMIN' ? (
            <button
              onClick={() => setActiveTab('admin')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-all ${
                activeTab === 'admin'
                  ? 'bg-purple-600 text-white border-purple-500 shadow-lg shadow-purple-600/30'
                  : 'bg-purple-950/40 text-purple-300 border-purple-800/60 hover:bg-purple-900/40'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              Admin Portal
            </button>
          ) : null}

          {/* Auth Button */}
          {user ? (
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex flex-col text-right">
                <span className="text-xs font-semibold text-white">{user.name}</span>
                <span className="text-[10px] text-emerald-400 flex items-center justify-end gap-1">
                  <CheckCircle2 className="w-2.5 h-2.5" />
                  {user.role}
                </span>
              </div>
              <button
                onClick={onLogout}
                title="Logout"
                className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700/60 transition-all"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-sky-600 hover:from-indigo-500 hover:to-sky-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/25 transition-all hover:scale-105 active:scale-95"
            >
              Sign In / Admin
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};
