import React from 'react';
import { useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { Dashboard } from './components/Dashboard';
import { GetJobReadyWizard } from './components/GetJobReadyWizard';
import { MasterProfileView } from './components/MasterProfileView';
import { ResumeBuilder } from './components/ResumeBuilder';
import { ATSAnalyzerView } from './components/ATSAnalyzerView';
import { InterviewPrepView } from './components/InterviewPrepView';
import { CareerExplorerView } from './components/CareerExplorerView';
import { ApplicationTrackerView } from './components/ApplicationTrackerView';
import { ShieldAlert } from 'lucide-react';

export const MainApp: React.FC = () => {
  const { activeView } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-slate-100 font-sans antialiased selection:bg-brand-500 selection:text-white">
      <Navbar />

      <main className="flex-1">
        {activeView === 'landing' && <LandingPage />}
        {activeView === 'dashboard' && <Dashboard />}
        {activeView === 'wizard' && <GetJobReadyWizard />}
        {activeView === 'master-profile' && <MasterProfileView />}
        {activeView === 'resume-builder' && <ResumeBuilder />}
        {activeView === 'ats-analyzer' && <ATSAnalyzerView />}
        {activeView === 'interview-prep' && <InterviewPrepView />}
        {activeView === 'career-explorer' && <CareerExplorerView />}
        {activeView === 'applications' && <ApplicationTrackerView />}
      </main>

      {/* Global Disclaimer Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div>
            <span className="font-extrabold text-sm text-white">11X AI Career Launchpad</span>
            <p className="text-xs text-slate-400 mt-0.5">From Job Description to Job Readiness.</p>
          </div>

          <div className="max-w-2xl text-[11px] text-slate-500 leading-relaxed flex items-center space-x-2">
            <ShieldAlert className="w-4 h-4 text-amber-500 flex-shrink-0 hidden sm:block" />
            <span>
              "Job readiness does not guarantee selection. Hiring decisions depend on recruiters, interviews, competition, employer preferences, and other factors."
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};
