import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Rocket,
  Sparkles,
  Target,
  FileText,
  Search,
  Users,
  CheckCircle2,
  Brain,
  Layers,
  ArrowRight,
  ShieldAlert,
  BarChart3,
  MessageSquare,
  Repeat,
  Briefcase
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { setActiveView, setWizardStep } = useApp();

  const features = [
    {
      title: 'Universal Job Analyzer',
      description: 'Paste any job description across Tech, Healthcare, Engineering, Finance, or Trades to extract critical requirements.',
      icon: Search,
      badge: 'Dynamic AI'
    },
    {
      title: 'Job Twin Target Profile',
      description: 'Generates a visual standard profile of technical skills, tools, soft skills, and responsibilities demanded by employers.',
      icon: Users,
      badge: 'Visual Target'
    },
    {
      title: 'Skill Gap Analyzer',
      description: 'Categorizes requirements into You Already Have, Need Better Evidence, Missing, and Recommended Bonus skills.',
      icon: Layers,
      badge: '4-Tier Audit'
    },
    {
      title: 'Evidence Checker',
      description: 'Identifies skills you claim but cannot prove. Detects weak generic phrases ("team player") and prompts for real metrics.',
      icon: CheckCircle2,
      badge: 'Truth Assurance'
    },
    {
      title: 'ATS Resume Builder',
      description: 'Create multi-version ATS-friendly resumes across 7 industry-tailored templates with live 2-panel preview.',
      icon: FileText,
      badge: '7 Templates'
    },
    {
      title: 'AI Resume Optimizer',
      description: 'Real-time side-by-side Current vs Suggested vs Why bullet point improver strictly using your verified experience.',
      icon: Brain,
      badge: 'Zero Hallucination'
    },
    {
      title: 'Job Readiness Score',
      description: 'Calculates a comprehensive readiness score (0-100%) evaluating requirement coverage, evidence strength, and interview readiness.',
      icon: BarChart3,
      badge: '100% Alignment'
    },
    {
      title: 'Interview Preparation',
      description: 'Generates contextual technical, HR, and project questions tailored specifically to your verified resume and target JD.',
      icon: MessageSquare,
      badge: 'STAR Framework'
    },
    {
      title: 'Resume A/B Testing',
      description: 'Compare multiple resume versions against the same job description to determine which version maximizes ATS match.',
      icon: Repeat,
      badge: 'Multi-Version'
    },
    {
      title: 'Application Tracker',
      description: 'Save target jobs, link customized resumes, and track application stages from Saved to Interview and Offer.',
      icon: Briefcase,
      badge: 'Career CRM'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 selection:bg-brand-500 selection:text-white">
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-24 overflow-hidden">
        
        {/* Background Gradients */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-500/10 blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          
          {/* Top Pill */}
          <div className="inline-flex items-center space-x-2 bg-slate-800/80 border border-slate-700/80 rounded-full px-4 py-1.5 mb-8 shadow-inner">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-semibold text-slate-200">Universal AI Career Intelligence Platform</span>
            <span className="text-slate-500">•</span>
            <span className="text-xs text-brand-400 font-medium">Not Just Another ATS Builder</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight max-w-4xl mx-auto leading-tight">
            11X AI Career <span className="bg-gradient-to-r from-brand-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">Launchpad</span>
          </h1>

          {/* Tagline */}
          <p className="mt-4 text-2xl sm:text-3xl font-bold text-slate-200">
            "From Job Description to Job Readiness."
          </p>
          <p className="mt-2 text-base sm:text-lg text-slate-400 font-medium italic">
            Know the job. Build the skills. Get job-ready.
          </p>

          {/* Subtitle */}
          <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Paste any job description. Discover what the employer is looking for, identify your skill gaps, verify evidence, optimize your resume, and prepare for the interview.
          </p>

          {/* Action CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => {
                setWizardStep(1);
                setActiveView('wizard');
              }}
              className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-gradient-to-r from-brand-500 via-brand-600 to-indigo-600 hover:from-brand-600 hover:to-indigo-700 text-white font-bold text-base px-8 py-4 rounded-xl shadow-xl shadow-brand-500/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Rocket className="w-5 h-5" />
              <span>Get 11X Job Ready</span>
              <ArrowRight className="w-5 h-5 ml-1" />
            </button>

            <button
              onClick={() => setActiveView('resume-builder')}
              className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-slate-800 hover:bg-slate-700/80 text-slate-100 font-semibold text-base px-7 py-4 rounded-xl border border-slate-700 transition-all"
            >
              <FileText className="w-5 h-5 text-slate-400" />
              <span>Build My Resume</span>
            </button>
          </div>

          {/* Philosophy Banner */}
          <div className="mt-12 max-w-2xl mx-auto p-4 rounded-xl bg-slate-800/40 border border-slate-800 backdrop-blur-sm text-left flex items-start space-x-3">
            <Target className="w-6 h-6 text-brand-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-brand-400 uppercase tracking-wider">The 11X Philosophy</h4>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                "Don't just generate a resume. Help the user become genuinely ready for the target job."
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Feature Grid Section */}
      <section className="py-20 bg-slate-950/60 border-t border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              Complete Career Intelligence Loop
            </h2>
            <p className="mt-3 text-slate-400 text-sm sm:text-base">
              From analyzing raw JDs to drag-and-drop skill verification, evidence checking, ATS optimization, and interview coaching.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div
                  key={idx}
                  onClick={() => {
                    if (idx === 0 || idx === 1 || idx === 2 || idx === 3 || idx === 6) {
                      setWizardStep(1);
                      setActiveView('wizard');
                    } else if (idx === 4 || idx === 5) {
                      setActiveView('resume-builder');
                    } else if (idx === 7) {
                      setActiveView('interview-prep');
                    } else if (idx === 8) {
                      setActiveView('ats-analyzer');
                    } else {
                      setActiveView('applications');
                    }
                  }}
                  className="bg-slate-900/90 border border-slate-800 hover:border-brand-500/50 rounded-xl p-6 transition-all duration-200 hover:-translate-y-1 group cursor-pointer shadow-lg"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center group-hover:bg-brand-500/20 transition-colors">
                      <Icon className="w-6 h-6 text-brand-400" />
                    </div>
                    <span className="text-[11px] font-semibold text-brand-400 bg-brand-500/10 px-2.5 py-1 rounded-full border border-brand-500/20">
                      {feat.badge}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-brand-300 transition-colors">
                    {feat.title}
                  </h3>
                  <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Universal Job Domains */}
      <section className="py-16 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-xl font-bold text-white tracking-tight">Supports Careers Across Every Industry</h3>
          <p className="mt-2 text-xs text-slate-400">Software • Data Science • Cybersecurity • Mechanical Eng • Civil • Healthcare • Finance • Marketing • Legal • Skilled Trades</p>
          
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {[
              'Software Engineering', 'Data Analytics', 'Artificial Intelligence', 'Cybersecurity',
              'Cloud Computing', 'Mechanical Engineering', 'Healthcare', 'Finance', 'Marketing',
              'UI/UX Design', 'Supply Chain', 'Legal & Regulatory', 'Biomedical', 'Skilled Trades'
            ].map((domain, i) => (
              <span key={i} className="text-xs bg-slate-800 text-slate-300 px-3 py-1.5 rounded-lg border border-slate-700">
                {domain}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Mandatory Hiring Disclaimer */}
      <section className="py-8 bg-slate-950 border-t border-slate-800">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="inline-flex items-center space-x-2 text-amber-400 font-semibold text-xs mb-2">
            <ShieldAlert className="w-4 h-4" />
            <span>Important Product Disclaimer</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed max-w-3xl mx-auto">
            "Job readiness does not guarantee selection. Hiring decisions depend on recruiters, interviews, competition, employer preferences, and other factors. 11X AI Career Launchpad optimizes preparation, alignment, and evidence verification, but does not promise or guarantee employment."
          </p>
        </div>
      </section>

    </div>
  );
};
