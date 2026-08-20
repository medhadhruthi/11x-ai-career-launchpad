import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AuthModal } from './AuthModal';
import {
  Rocket,
  LayoutDashboard,
  Target,
  UserCheck,
  FileText,
  ShieldCheck,
  MessageSquare,
  Compass,
  Briefcase,
  GraduationCap,
  Sparkles,
  ChevronRight,
  Menu,
  X,
  LogIn
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    activeView,
    setActiveView,
    isStudentMode,
    setIsStudentMode,
    setWizardStep
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string } | null>({
    name: 'Alex Vance',
    email: 'alex.vance@example.com'
  });

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'wizard', label: '🚀 Get Job Ready', icon: Target, highlight: true },
    { id: 'master-profile', label: 'Master Profile', icon: UserCheck },
    { id: 'resume-builder', label: 'Resume Builder', icon: FileText },
    { id: 'ats-analyzer', label: 'ATS Diagnostics', icon: ShieldCheck },
    { id: 'interview-prep', label: 'Interview Prep', icon: MessageSquare },
    { id: 'career-explorer', label: 'Career Explorer', icon: Compass },
    { id: 'applications', label: 'Applications', icon: Briefcase },
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo & Title (Fixed alignment & zero wrapping) */}
          <div className="flex items-center space-x-2.5 cursor-pointer flex-shrink-0 py-1" onClick={() => setActiveView('landing')}>
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-brand-600 via-brand-500 to-indigo-400 p-0.5 flex-shrink-0 flex items-center justify-center shadow-lg shadow-brand-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Rocket className="w-4 h-4 sm:w-5 sm:h-5 text-brand-400 animate-pulse" />
              </div>
            </div>
            <div className="flex flex-col justify-center flex-shrink-0">
              <div className="flex items-center space-x-1.5 sm:space-x-2 whitespace-nowrap">
                <span className="font-extrabold text-base sm:text-lg text-white tracking-tight leading-none whitespace-nowrap">11X AI</span>
                <span className="bg-brand-500/10 text-brand-400 text-[10px] sm:text-xs font-bold px-1.5 sm:px-2 py-0.5 rounded border border-brand-500/20 leading-none whitespace-nowrap">
                  LAUNCHPAD
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-400 hidden 2xl:block leading-none mt-1 whitespace-nowrap">
                From Job Description to Job Readiness.
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.id === 'wizard') setWizardStep(1);
                    setActiveView(item.id);
                  }}
                  className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? item.highlight
                        ? 'bg-brand-500 text-white shadow-md shadow-brand-500/25'
                        : 'bg-slate-800 text-white border border-slate-700'
                      : item.highlight
                      ? 'text-brand-400 hover:bg-brand-500/10 border border-brand-500/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Controls: Student Mode Toggle, Auth Button, CTA & Mobile Hamburger */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Login / User Status Button */}
            <button
              onClick={() => setAuthModalOpen(true)}
              className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
            >
              <LogIn className="w-3.5 h-3.5 text-brand-400" />
              <span className="hidden md:inline">{currentUser ? currentUser.name.split(' ')[0] : 'Sign In'}</span>
            </button>

            {/* Student Mode Badge / Toggle */}
            <button
              onClick={() => setIsStudentMode(!isStudentMode)}
              className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                isStudentMode
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                  : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
              }`}
              title="Toggle Student & Fresher Mode"
            >
              <GraduationCap className="w-4 h-4" />
              <span className="hidden sm:inline">{isStudentMode ? 'Student Mode' : 'Pro Mode'}</span>
            </button>

            {/* Main CTA */}
            <button
              onClick={() => {
                setWizardStep(1);
                setActiveView('wizard');
              }}
              className="hidden sm:flex items-center space-x-1.5 bg-gradient-to-r from-brand-500 to-indigo-600 hover:from-brand-600 hover:to-indigo-700 text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-lg shadow-brand-500/25 transition-all transform active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Get Job Ready</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Hamburger Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white border border-slate-700"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 border-b border-slate-800 px-4 pt-2 pb-4 space-y-2 shadow-2xl animate-in slide-in-from-top-2">
          <div className="grid grid-cols-2 gap-2 pt-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.id === 'wizard') setWizardStep(1);
                    setActiveView(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center space-x-2 px-3 py-2.5 rounded-lg text-xs font-medium transition-all text-left ${
                    isActive
                      ? 'bg-brand-500 text-white shadow-md'
                      : 'bg-slate-950 text-slate-300 border border-slate-800 hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4 text-brand-400" />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-800">
            <button
              onClick={() => {
                setWizardStep(1);
                setActiveView('wizard');
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-brand-500 to-indigo-600 text-white text-xs font-bold py-3 rounded-lg shadow-lg"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Get 11X Job Ready</span>
            </button>
          </div>
        </div>
      )}

      {/* Mobile Touch Quick Bar (Horizontal Scrollable Subheader) */}
      <div className="lg:hidden bg-slate-950 border-b border-slate-800 px-2 py-1.5 overflow-x-auto flex items-center space-x-1 scrollbar-none">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                if (item.id === 'wizard') setWizardStep(1);
                setActiveView(item.id);
              }}
              className={`flex items-center space-x-1 px-2.5 py-1 rounded-md text-[11px] whitespace-nowrap font-medium transition-all ${
                isActive
                  ? 'bg-brand-500/20 text-brand-300 border border-brand-500/40 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className="w-3 h-3" />
              <span>{item.label.replace('🚀 ', '')}</span>
            </button>
          );
        })}
      </div>

      {/* Auth Modal Component */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={(user) => setCurrentUser(user)}
      />
    </header>
  );
};
