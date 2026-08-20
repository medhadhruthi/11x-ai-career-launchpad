import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Target,
  ShieldCheck,
  BarChart3,
  CheckCircle2,
  MessageSquare,
  Sparkles,
  ArrowRight,
  Plus,
  BookOpen,
  FileEdit,
  Play,
  Briefcase
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const {
    activeJobAnalysis,
    setActiveView,
    setWizardStep,
    userProfile
  } = useApp();

  const readiness = activeJobAnalysis?.jobReadinessScore || 82;
  const atsScore = activeJobAnalysis?.atsAnalysis.score || 91;
  const matchScore = activeJobAnalysis?.jobMatchScore || 78;
  const evidenceScore = activeJobAnalysis?.readinessBreakdown.skillEvidence || 69;
  const interviewScore = activeJobAnalysis?.readinessBreakdown.interviewReadiness || 73;

  const recommendations = [
    {
      id: 'rec-1',
      title: 'Add empirical project evidence for SQL',
      description: 'SQL is a CRITICAL requirement for your target job. Add dataset sizes or performance metrics.',
      actionLabel: 'Add Evidence',
      actionView: 'master-profile',
      icon: Plus,
      color: 'border-brand-500/30 bg-brand-500/10 text-brand-400'
    },
    {
      id: 'rec-2',
      title: 'Improve project descriptions & eliminate generic phrases',
      description: 'Your project bullet points contain weak phrases like "worked on". Add action verbs and quantifiable results.',
      actionLabel: 'Optimize Resume',
      actionView: 'resume-builder',
      icon: FileEdit,
      color: 'border-amber-500/30 bg-amber-500/10 text-amber-400'
    },
    {
      id: 'rec-3',
      title: 'Add Power BI to your 4-Week Learning Roadmap',
      description: 'Power BI is missing from your verified profile. Start learning the basics to close this critical gap.',
      actionLabel: 'Learn Power BI',
      actionView: 'wizard',
      wizardStepTarget: 7,
      icon: BookOpen,
      color: 'border-purple-500/30 bg-purple-500/10 text-purple-400'
    },
    {
      id: 'rec-4',
      title: 'Practice project-specific technical interview questions',
      description: 'Generate 5 contextual STAR-format interview questions based on your E-Commerce Forecaster project.',
      actionLabel: 'Practice Interview',
      actionView: 'interview-prep',
      icon: Play,
      color: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-500/10 blur-[90px] rounded-full pointer-events-none" />
        
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-semibold text-brand-400 bg-brand-500/10 px-2.5 py-1 rounded-full border border-brand-500/20">
              Active Career Target
            </span>
            <span className="text-xs text-slate-400">Target Role: <strong className="text-white font-medium">{activeJobAnalysis?.title || 'Data Analyst'}</strong></span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
            Welcome back, {userProfile.personalInfo.fullName.split(' ')[0]} 👋
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Here is your live career intelligence overview and job readiness metrics.
          </p>
        </div>

        <button
          onClick={() => {
            setWizardStep(1);
            setActiveView('wizard');
          }}
          className="flex items-center justify-center space-x-2 bg-gradient-to-r from-brand-500 to-indigo-600 hover:from-brand-600 hover:to-indigo-700 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-lg shadow-brand-500/25 transition-all transform active:scale-95 flex-shrink-0"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>Launch 🚀 GET JOB READY</span>
        </button>
      </div>

      {/* 5 Core Metrics Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center space-x-2">
            <BarChart3 className="w-5 h-5 text-brand-400" />
            <span>Career Overview Metrics</span>
          </h2>
          <span className="text-xs text-slate-400">Calculated from verified profile & target job</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          
          {/* Job Readiness */}
          <div className="bg-slate-900 border border-brand-500/40 rounded-xl p-5 shadow-lg relative overflow-hidden group">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-brand-400 uppercase tracking-wider">Job Readiness</span>
              <Target className="w-5 h-5 text-brand-400" />
            </div>
            <div className="text-3xl font-extrabold text-white">{readiness}%</div>
            <div className="w-full bg-slate-800 rounded-full h-2 mt-3 overflow-hidden">
              <div className="bg-gradient-to-r from-brand-500 to-indigo-400 h-2 rounded-full" style={{ width: `${readiness}%` }} />
            </div>
            <p className="text-[11px] text-slate-400 mt-2">Overall profile requirement coverage</p>
          </div>

          {/* ATS Compatibility */}
          <div className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl p-5 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">ATS Compatibility</span>
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="text-3xl font-extrabold text-white">{atsScore}%</div>
            <div className="w-full bg-slate-800 rounded-full h-2 mt-3 overflow-hidden">
              <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${atsScore}%` }} />
            </div>
            <p className="text-[11px] text-slate-400 mt-2">Parsing & keyword score</p>
          </div>

          {/* Average Job Match */}
          <div className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl p-5 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Average Job Match</span>
              <Briefcase className="w-5 h-5 text-indigo-400" />
            </div>
            <div className="text-3xl font-extrabold text-white">{matchScore}%</div>
            <div className="w-full bg-slate-800 rounded-full h-2 mt-3 overflow-hidden">
              <div className="bg-indigo-500 h-2 rounded-full" style={{ width: `${matchScore}%` }} />
            </div>
            <p className="text-[11px] text-slate-400 mt-2">Skills & experience match</p>
          </div>

          {/* Skill Evidence */}
          <div className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl p-5 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Skill Evidence</span>
              <CheckCircle2 className="w-5 h-5 text-amber-400" />
            </div>
            <div className="text-3xl font-extrabold text-white">{evidenceScore}%</div>
            <div className="w-full bg-slate-800 rounded-full h-2 mt-3 overflow-hidden">
              <div className="bg-amber-500 h-2 rounded-full" style={{ width: `${evidenceScore}%` }} />
            </div>
            <p className="text-[11px] text-slate-400 mt-2">Verified project evidence</p>
          </div>

          {/* Interview Readiness */}
          <div className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl p-5 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">Interview Readiness</span>
              <MessageSquare className="w-5 h-5 text-purple-400" />
            </div>
            <div className="text-3xl font-extrabold text-white">{interviewScore}%</div>
            <div className="w-full bg-slate-800 rounded-full h-2 mt-3 overflow-hidden">
              <div className="bg-purple-500 h-2 rounded-full" style={{ width: `${interviewScore}%` }} />
            </div>
            <p className="text-[11px] text-slate-400 mt-2">Practiced question mastery</p>
          </div>

        </div>
      </div>

      {/* Recommended Actions */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white tracking-tight">
          Recommended Actions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recommendations.map((rec) => {
            const Icon = rec.icon;
            return (
              <div
                key={rec.id}
                className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl p-5 flex flex-col justify-between space-y-4 transition-all"
              >
                <div className="flex items-start space-x-3">
                  <div className={`p-2.5 rounded-lg border flex-shrink-0 ${rec.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white leading-snug">{rec.title}</h3>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">{rec.description}</p>
                  </div>
                </div>

                <div className="flex justify-end pt-2 border-t border-slate-800/80">
                  <button
                    onClick={() => {
                      if (rec.wizardStepTarget) {
                        setWizardStep(rec.wizardStepTarget);
                      }
                      setActiveView(rec.actionView);
                    }}
                    className="flex items-center space-x-1.5 text-xs font-semibold text-brand-400 hover:text-brand-300 bg-brand-500/10 hover:bg-brand-500/20 px-3.5 py-1.5 rounded-lg border border-brand-500/20 transition-colors"
                  >
                    <span>{rec.actionLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
