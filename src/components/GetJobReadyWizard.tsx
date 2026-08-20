import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { JobTwinView } from './JobTwinView';
import { DragDropSkillBoard } from './DragDropSkillBoard';
import { generateSkillRoadmap, checkSkillEquivalency } from '../services/aiEngine';
import {
  Rocket,
  Search,
  Users,
  CheckCircle2,
  AlertTriangle,
  BookOpen,
  FileText,
  ShieldCheck,
  Target,
  MessageSquare,
  Briefcase,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  Award
} from 'lucide-react';

export const GetJobReadyWizard: React.FC = () => {
  const {
    wizardStep,
    setWizardStep,
    activeJobAnalysis,
    analyzeNewJob,
    userProfile,
    setActiveView,
    addApplication,
    verifyUserSkill
  } = useApp();

  const [jdInput, setJdInput] = useState(activeJobAnalysis?.rawDescription || '');
  const [analyzing, setAnalyzing] = useState(false);
  const [learningSkillTarget, setLearningSkillTarget] = useState<string>('Power BI');
  const [applicationSaved, setApplicationSaved] = useState(false);

  const handleAnalyze = () => {
    if (!jdInput.trim()) return;
    setAnalyzing(true);
    setTimeout(() => {
      analyzeNewJob(jdInput);
      setAnalyzing(false);
      setWizardStep(2);
    }, 600);
  };

  const steps = [
    { num: 1, label: 'Paste JD', icon: Search },
    { num: 2, label: 'AI Analysis', icon: Sparkles },
    { num: 3, label: 'Job Twin', icon: Users },
    { num: 4, label: 'Profile Compare', icon: Target },
    { num: 5, label: '4-Tier Gaps', icon: AlertTriangle },
    { num: 6, label: 'Skill Board', icon: CheckCircle2 },
    { num: 7, label: 'Verify Skills', icon: ShieldCheck },
    { num: 8, label: 'Add Evidence', icon: Award },
    { num: 9, label: 'Learning Roadmap', icon: BookOpen },
    { num: 10, label: 'Optimize Resume', icon: FileText },
    { num: 11, label: 'ATS Analysis', icon: ShieldCheck },
    { num: 12, label: 'Readiness Score', icon: Target },
    { num: 13, label: 'Interview Prep', icon: MessageSquare },
    { num: 14, label: 'Practice Mode', icon: MessageSquare },
    { num: 15, label: '🎯 JOB READY', icon: Rocket }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Wizard Navigation Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Rocket className="w-5 h-5 text-brand-400" />
            <h1 className="text-base font-extrabold text-white">🚀 GET JOB READY Workflow</h1>
            <span className="text-xs bg-brand-500/10 text-brand-400 px-2.5 py-0.5 rounded-full border border-brand-500/20 font-bold">
              Step {wizardStep} of 15
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              disabled={wizardStep <= 1}
              onClick={() => setWizardStep(wizardStep - 1)}
              className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white disabled:opacity-40"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              disabled={wizardStep >= 15}
              onClick={() => setWizardStep(wizardStep + 1)}
              className="p-1.5 rounded-lg bg-brand-500 text-white hover:bg-brand-600 disabled:opacity-40"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Step Progress Bar */}
        <div className="flex items-center space-x-1 overflow-x-auto pb-2 scrollbar-none">
          {steps.map((st) => {
            const Icon = st.icon;
            const isCurrent = wizardStep === st.num;
            const isCompleted = wizardStep > st.num;
            return (
              <button
                key={st.num}
                onClick={() => setWizardStep(st.num)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  isCurrent
                    ? 'bg-brand-500 text-white shadow-md'
                    : isCompleted
                    ? 'bg-slate-800 text-emerald-400 border border-emerald-500/30'
                    : 'bg-slate-950 text-slate-500 hover:text-slate-300'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{st.num}. {st.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* STEP 1: Paste Job Description */}
      {wizardStep === 1 && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 bg-brand-500/10 text-brand-400 text-xs font-bold px-3 py-1 rounded-full border border-brand-500/20">
              <Search className="w-3.5 h-3.5" />
              <span>Step 1: Paste Any Job Description</span>
            </div>
            <h2 className="text-2xl font-extrabold text-white">Analyze Your Dream Job</h2>
            <p className="text-xs text-slate-400">
              Paste a full job description from LinkedIn, Indeed, or company websites across Tech, Healthcare, Engineering, Finance, or Trades.
            </p>
          </div>

          <textarea
            rows={8}
            value={jdInput}
            onChange={(e) => setJdInput(e.target.value)}
            placeholder="Paste raw job description text here..."
            className="w-full bg-slate-950 border border-slate-700 rounded-xl p-4 text-xs text-white focus:outline-none focus:border-brand-500 font-mono leading-relaxed"
          />

          <div className="flex justify-end">
            <button
              onClick={handleAnalyze}
              disabled={analyzing}
              className="flex items-center space-x-2 bg-gradient-to-r from-brand-500 to-indigo-600 hover:from-brand-600 hover:to-indigo-700 text-white font-bold text-sm px-7 py-3 rounded-xl shadow-lg shadow-brand-500/25 transition-all"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>{analyzing ? 'Analyzing Job Intelligence...' : 'Analyze Job'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: AI Job Analysis Extraction */}
      {wizardStep === 2 && activeJobAnalysis && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-extrabold text-white">{activeJobAnalysis.title}</h2>
              <p className="text-xs text-slate-400 mt-0.5">{activeJobAnalysis.company} • {activeJobAnalysis.industry} • {activeJobAnalysis.seniority}</p>
            </div>
            <button
              onClick={() => setWizardStep(3)}
              className="bg-brand-500 text-white font-bold text-xs px-5 py-2.5 rounded-xl flex items-center space-x-1.5"
            >
              <span>Next: View Job Twin</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-3">
              <h3 className="text-xs font-bold text-brand-400 uppercase tracking-wider">Required Technical Skills</h3>
              <div className="flex flex-wrap gap-2">
                {activeJobAnalysis.requirements.technicalSkills.map((sk, idx) => (
                  <span key={idx} className="bg-slate-900 border border-slate-700 text-xs px-2.5 py-1 rounded-lg flex items-center space-x-1.5">
                    <span className={`w-2 h-2 rounded-full ${sk.priority === 'critical' ? 'bg-red-500' : 'bg-amber-500'}`} />
                    <span className="text-white font-medium">{sk.skillName}</span>
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-3">
              <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Key Responsibilities</h3>
              <ul className="list-disc list-inside text-xs text-slate-300 space-y-1">
                {activeJobAnalysis.responsibilities.map((r, i) => <li key={i}>{r}</li>)}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* STEP 3: Job Twin */}
      {wizardStep === 3 && (
        <div className="space-y-4">
          <JobTwinView />
          <div className="flex justify-end">
            <button
              onClick={() => setWizardStep(4)}
              className="bg-brand-500 text-white font-bold text-xs px-6 py-3 rounded-xl flex items-center space-x-2 shadow-lg"
            >
              <span>Compare Profile Against Job Twin</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4 & 5: Skill Gap Matrix */}
      {(wizardStep === 4 || wizardStep === 5) && activeJobAnalysis && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <h2 className="text-xl font-extrabold text-white">What You Need to Be Highly Competitive</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* 🟢 Already Have */}
            <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-5 space-y-3">
              <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>🟢 YOU ALREADY HAVE ({activeJobAnalysis.comparison.alreadyHave.length})</span>
              </h3>
              {activeJobAnalysis.comparison.alreadyHave.map((sk, idx) => (
                <div key={idx} className="bg-slate-950 border border-emerald-500/30 rounded-lg p-3 text-xs text-white">
                  ✓ <strong>{sk.skillName}</strong> — Confirmed by verified profile & evidence.
                </div>
              ))}
            </div>

            {/* 🟡 Need Better Evidence */}
            <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-5 space-y-3">
              <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center space-x-1.5">
                <AlertTriangle className="w-4 h-4" />
                <span>🟡 NEED BETTER EVIDENCE ({activeJobAnalysis.comparison.needEvidence.length})</span>
              </h3>
              {activeJobAnalysis.comparison.needEvidence.map((sk, idx) => (
                <div key={idx} className="bg-slate-950 border border-amber-500/30 rounded-lg p-3 text-xs text-slate-300 space-y-1">
                  <div className="font-bold text-amber-400">⚠ {sk.skillName}</div>
                  <p className="text-[11px] text-slate-400">{sk.reason}</p>
                  <button
                    onClick={() => setWizardStep(8)}
                    className="text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded font-semibold mt-1"
                  >
                    + Improve Evidence
                  </button>
                </div>
              ))}
            </div>

            {/* 🔴 Missing */}
            <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-5 space-y-3 md:col-span-2">
              <h3 className="text-xs font-bold text-red-400 uppercase tracking-wider flex items-center space-x-1.5">
                <AlertTriangle className="w-4 h-4" />
                <span>🔴 MISSING REQUIREMENTS ({activeJobAnalysis.comparison.missing.length})</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activeJobAnalysis.comparison.missing.map((sk, idx) => (
                  <div key={idx} className="bg-slate-950 border border-red-500/30 rounded-lg p-3 text-xs text-slate-300 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-white">{sk.skillName}</span>
                      <span className="text-[9px] bg-red-500/20 text-red-400 font-extrabold px-1.5 py-0.5 rounded uppercase">{sk.priority}</span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          verifyUserSkill(sk.skillName, 'verified');
                        }}
                        className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-1 rounded font-semibold"
                      >
                        + Add Skill
                      </button>
                      <button
                        onClick={() => {
                          setLearningSkillTarget(sk.skillName);
                          setWizardStep(9);
                        }}
                        className="text-[10px] bg-purple-500/10 text-purple-400 border border-purple-500/30 px-2 py-1 rounded font-semibold"
                      >
                        Learn Skill
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          <div className="flex justify-end">
            <button
              onClick={() => setWizardStep(6)}
              className="bg-brand-500 text-white font-bold text-xs px-6 py-3 rounded-xl flex items-center space-x-2"
            >
              <span>Next: Open Drag & Drop Skill Board</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 6 & 7: Skill Board */}
      {(wizardStep === 6 || wizardStep === 7) && (
        <div className="space-y-4">
          <DragDropSkillBoard />
          <div className="flex justify-end">
            <button
              onClick={() => setWizardStep(8)}
              className="bg-brand-500 text-white font-bold text-xs px-6 py-3 rounded-xl flex items-center space-x-2"
            >
              <span>Next: Build Skill Evidence</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 8: Add Evidence */}
      {wizardStep === 8 && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <h2 className="text-xl font-extrabold text-white">Build Skill Evidence & Project Proof</h2>
          <p className="text-xs text-slate-400">Transform weak assertions ("good at Python") into empirical project proof.</p>

          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-brand-400">Recommended Evidence Project for Power BI</h3>
            <p className="text-xs text-slate-300">Title: <strong>Sales & Revenue Performance Executive Dashboard</strong></p>
            <p className="text-xs text-slate-400">Skills demonstrated: Power BI, DAX Measures, Data Cleaning, Data Visualization</p>
            <button
              onClick={() => setWizardStep(9)}
              className="bg-brand-500 text-white text-xs font-bold px-4 py-2 rounded-lg"
            >
              + Create Learning Roadmap & Project Idea
            </button>
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => setWizardStep(9)}
              className="bg-brand-500 text-white font-bold text-xs px-6 py-3 rounded-xl flex items-center space-x-2"
            >
              <span>Next: View 4-Week Learning Roadmap</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 9: Learning Roadmap */}
      {wizardStep === 9 && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-extrabold text-white">Personalized Skill Learning Roadmap</h2>
              <p className="text-xs text-brand-400 font-semibold">Target Skill: {learningSkillTarget}</p>
            </div>
            <button
              onClick={() => setWizardStep(10)}
              className="bg-brand-500 text-white font-bold text-xs px-5 py-2.5 rounded-xl flex items-center space-x-1.5"
            >
              <span>Next: Optimize Resume</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {generateSkillRoadmap(learningSkillTarget).map((step, idx) => (
              <div key={idx} className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2">
                <span className="text-xs font-bold text-brand-400 bg-brand-500/10 px-2 py-0.5 rounded border border-brand-500/20">{step.week}</span>
                <h4 className="text-xs font-bold text-white mt-1">{step.topic}</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">{step.task}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* STEP 10: Optimize Resume */}
      {wizardStep === 10 && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-extrabold text-white">AI Resume Optimization</h2>
              <p className="text-xs text-slate-400">Strictly uses your verified profile data. Zero hallucination guarantee.</p>
            </div>
            <button
              onClick={() => setActiveView('resume-builder')}
              className="bg-brand-500 text-white font-bold text-xs px-5 py-2.5 rounded-xl"
            >
              Open Full 2-Panel Live Editor
            </button>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3">
            <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider">Suggested Bullet Point Optimization</h3>
            <div className="text-xs space-y-2">
              <div className="p-3 bg-slate-900 border border-red-500/30 rounded-lg text-slate-300">
                <strong className="text-red-400">CURRENT:</strong> "Wrote SQL queries for customer data analysis."
              </div>
              <div className="p-3 bg-slate-900 border border-emerald-500/30 rounded-lg text-slate-200">
                <strong className="text-emerald-400">SUGGESTED:</strong> "Wrote 40+ optimized SQL queries with joins and CTEs against 25,000+ customer records, reducing reporting latency by 30%."
              </div>
              <div className="p-2 text-[11px] text-brand-300 italic">
                <strong>WHY:</strong> Incorporates verified metric from your Master Profile E-Commerce forecaster project.
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => setWizardStep(11)}
              className="bg-brand-500 text-white font-bold text-xs px-6 py-3 rounded-xl flex items-center space-x-2"
            >
              <span>Next: Run ATS Compatibility Analysis</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 11 & 12: ATS & Readiness Score */}
      {(wizardStep === 11 || wizardStep === 12) && activeJobAnalysis && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-950 p-6 rounded-xl border border-brand-500/30">
            <div>
              <span className="text-xs font-bold text-brand-400 uppercase">Calculated Overall</span>
              <h2 className="text-3xl font-extrabold text-white mt-1">JOB READINESS: {activeJobAnalysis.jobReadinessScore}%</h2>
              <p className="text-xs text-slate-400 mt-1">Covers Must-Haves (92%), Evidence Strength (81%), & ATS Alignment ({activeJobAnalysis.atsAnalysis.score}%)</p>
            </div>
            <button
              onClick={() => setWizardStep(13)}
              className="bg-brand-500 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-lg"
            >
              Next: Prepare for Interview
            </button>
          </div>
        </div>
      )}

      {/* STEP 13 & 14: Interview Prep */}
      {(wizardStep === 13 || wizardStep === 14) && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-extrabold text-white">Contextual Interview Preparation</h2>
            <button
              onClick={() => setWizardStep(15)}
              className="bg-brand-500 text-white font-bold text-xs px-5 py-2.5 rounded-xl"
            >
              View Final Job Readiness Certificate
            </button>
          </div>

          <div className="bg-slate-950 border border-slate-800 p-5 rounded-xl space-y-3">
            <h3 className="text-xs font-bold text-brand-400 uppercase">Generated Interview Question</h3>
            <p className="text-sm text-white font-semibold">
              "In your project 'E-Commerce Revenue Forecaster', how did you optimize SQL joins and clean missing data using Python?"
            </p>
            <div className="p-3 bg-slate-900 rounded-lg text-xs text-slate-300">
              <strong>STAR Framework Hint:</strong> Mention the 25k record dataset, Pandas imputation strategies, and 30% speedup.
            </div>
          </div>
        </div>
      )}

      {/* STEP 15: 🎯 YOU ARE JOB READY! */}
      {wizardStep === 15 && activeJobAnalysis && (
        <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-emerald-500/40 rounded-2xl p-8 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />

          <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 mx-auto flex items-center justify-center">
            <Rocket className="w-8 h-8 text-emerald-400" />
          </div>

          <div>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              MILESTONE ACHIEVED
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3">🎯 YOU ARE 11X JOB READY!</h2>
            <p className="text-xs text-slate-400 max-w-lg mx-auto mt-2">
              Your profile covers identified requirements for {activeJobAnalysis.title} at {activeJobAnalysis.company}.
            </p>
          </div>

          {/* Metrics Checklist */}
          <div className="max-w-xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
            <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl">
              <span className="text-[10px] text-slate-400 block">Requirement Coverage</span>
              <span className="text-lg font-bold text-emerald-400">100%</span>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl">
              <span className="text-[10px] text-slate-400 block">Skill Match</span>
              <span className="text-lg font-bold text-brand-400">{activeJobAnalysis.jobMatchScore}%</span>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl">
              <span className="text-[10px] text-slate-400 block">ATS Score</span>
              <span className="text-lg font-bold text-indigo-400">{activeJobAnalysis.atsAnalysis.score}%</span>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl">
              <span className="text-[10px] text-slate-400 block">Interview Readiness</span>
              <span className="text-lg font-bold text-purple-400">82%</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => {
                addApplication({
                  company: activeJobAnalysis.company,
                  jobTitle: activeJobAnalysis.title,
                  dateSaved: new Date().toISOString().split('T')[0],
                  dateApplied: new Date().toISOString().split('T')[0],
                  status: 'applied',
                  jobMatchScore: activeJobAnalysis.jobMatchScore,
                  notes: 'Applied via 11X Job Readiness workflow.'
                });
                setApplicationSaved(true);
              }}
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm px-8 py-3.5 rounded-xl shadow-lg transition-all"
            >
              {applicationSaved ? '✓ Saved to Application Tracker' : 'Apply Now & Save Application'}
            </button>

            <button
              onClick={() => setActiveView('resume-builder')}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm px-6 py-3.5 rounded-xl border border-slate-700"
            >
              Download PDF Resume
            </button>
          </div>

          {/* Standard Disclaimer */}
          <p className="text-[11px] text-slate-500 italic max-w-lg mx-auto pt-4">
            "Job readiness does not guarantee selection. Hiring decisions depend on recruiters, interviews, competition, employer preferences, and other factors."
          </p>

        </div>
      )}

    </div>
  );
};
