import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Eye, Repeat, HelpCircle, CheckCircle2, AlertTriangle, XCircle, Clock } from 'lucide-react';

export const ATSAnalyzerView: React.FC = () => {
  const { activeJobAnalysis, savedResumes } = useApp();
  const [activeTab, setActiveTab] = useState<'ats' | 'recruiter' | 'ab-testing' | 'shortlist-diagnostic'>('ats');

  if (!activeJobAnalysis) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center text-slate-400">
        Paste a job description first to unlock ATS Diagnostics.
      </div>
    );
  }

  const { atsAnalysis } = activeJobAnalysis;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-6 h-6 text-brand-400" />
            <h1 className="text-2xl font-extrabold text-white">ATS Diagnostics & Recruiter Simulation</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Analyze keyword compatibility, simulated 6-second recruiter scans, and A/B test resume variations.
          </p>
        </div>

        <div className="bg-slate-950 border border-brand-500/30 px-5 py-3 rounded-xl text-center">
          <span className="text-[10px] text-slate-400 uppercase font-bold block">Estimated ATS Score</span>
          <span className="text-2xl font-black text-brand-400">{atsAnalysis.score} / 100</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
        {[
          { id: 'ats', label: 'ATS Compatibility Audit', icon: ShieldCheck },
          { id: 'recruiter', label: 'View Like a Recruiter (6s Scan)', icon: Eye },
          { id: 'ab-testing', label: 'Resume A/B Testing', icon: Repeat },
          { id: 'shortlist-diagnostic', label: 'Why Am I Not Shortlisted?', icon: HelpCircle }
        ].map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-brand-500 text-white shadow-md'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: ATS Compatibility */}
      {activeTab === 'ats' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Good Points */}
            <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-5 space-y-3">
              <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>What is Good</span>
              </h3>
              <ul className="space-y-2 text-xs text-slate-300">
                {atsAnalysis.goodPoints.map((pt, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Problems Detected */}
            <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-5 space-y-3">
              <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center space-x-1.5">
                <AlertTriangle className="w-4 h-4" />
                <span>Parsing Problems</span>
              </h3>
              <ul className="space-y-2 text-xs text-slate-300">
                {atsAnalysis.problems.map((pt, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <span className="text-amber-400 font-bold">⚠</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* How to Fix */}
            <div className="bg-brand-500/5 border border-brand-500/20 rounded-xl p-5 space-y-3">
              <h3 className="text-xs font-bold text-brand-400 uppercase tracking-wider flex items-center space-x-1.5">
                <ShieldCheck className="w-4 h-4" />
                <span>How to Fix</span>
              </h3>
              <ul className="space-y-2 text-xs text-slate-300">
                {atsAnalysis.fixes.map((pt, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <span className="text-brand-400 font-bold">➔</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          <p className="text-[11px] text-slate-500 italic text-center">
            "This is an estimated compatibility score based on standard parser rules and does not guarantee compatibility with every ATS."
          </p>
        </div>
      )}

      {/* TAB 2: View Like a Recruiter */}
      {activeTab === 'recruiter' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center">
              <Clock className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Simulated 6-Second Recruiter Initial Scan</h2>
              <p className="text-xs text-slate-400">Recruiters spend an average of 6 to 8 seconds during initial resume triage.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="bg-slate-950 border border-emerald-500/30 rounded-xl p-4 space-y-2">
              <h3 className="text-xs font-bold text-emerald-400 uppercase">🟢 Easy to Find (At a Glance)</h3>
              <ul className="list-disc list-inside text-xs text-slate-300 space-y-1">
                {atsAnalysis.recruiterSimulation.easyToFind.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>

            <div className="bg-slate-950 border border-amber-500/30 rounded-xl p-4 space-y-2">
              <h3 className="text-xs font-bold text-amber-400 uppercase">🟡 Could Be Clearer</h3>
              <ul className="list-disc list-inside text-xs text-slate-300 space-y-1">
                {atsAnalysis.recruiterSimulation.couldBeClearer.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>

            <div className="bg-slate-950 border border-red-500/30 rounded-xl p-4 space-y-2">
              <h3 className="text-xs font-bold text-red-400 uppercase">🔴 Difficult to Identify</h3>
              <ul className="list-disc list-inside text-xs text-slate-300 space-y-1">
                {atsAnalysis.recruiterSimulation.difficultToIdentify.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>

          </div>
        </div>
      )}

      {/* TAB 3: Resume A/B Testing */}
      {activeTab === 'ab-testing' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <h2 className="text-lg font-bold text-white">Compare Resume Variations Against Target Job</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            <div className="bg-slate-950 border border-brand-500/40 rounded-xl p-5 space-y-3">
              <span className="text-[10px] bg-brand-500/10 text-brand-400 px-2 py-0.5 rounded font-bold">VERSION A</span>
              <h3 className="text-sm font-bold text-white">Data Analyst Resume</h3>
              <div className="text-2xl font-black text-emerald-400">89% Match</div>
              <p className="text-xs text-slate-400">Emphasizes SQL queries & Python dataset sizes. Strongest match for Senior Data Analyst.</p>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-3">
              <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded font-bold">VERSION B</span>
              <h3 className="text-sm font-bold text-white">Business Analyst Resume</h3>
              <div className="text-2xl font-black text-amber-400">74% Match</div>
              <p className="text-xs text-slate-400">Focuses on user stories and BPMN process mapping. Missing statistical modeling keywords.</p>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-3">
              <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded font-bold">VERSION C</span>
              <h3 className="text-sm font-bold text-white">Software Internship Resume</h3>
              <div className="text-2xl font-black text-indigo-400">81% Match</div>
              <p className="text-xs text-slate-400">Strong technical coding background, but lacks Power BI visualization evidence.</p>
            </div>

          </div>
        </div>
      )}

      {/* TAB 4: Why Am I Not Getting Shortlisted */}
      {activeTab === 'shortlist-diagnostic' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <h2 className="text-lg font-bold text-white">Diagnostic Analysis: Possible Rejection Root Causes</h2>

          <div className="space-y-3">
            <div className="bg-slate-950 border border-red-500/30 rounded-xl p-4 flex items-start space-x-3">
              <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-red-400 uppercase">Missing Critical Tool Evidence</h4>
                <p className="text-xs text-slate-300 mt-1">The employer lists Power BI as a must-have requirement, but your current resume lists zero verified Power BI projects.</p>
              </div>
            </div>

            <div className="bg-slate-950 border border-amber-500/30 rounded-xl p-4 flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-amber-400 uppercase">Generic Bullet Point Descriptions</h4>
                <p className="text-xs text-slate-300 mt-1">Bullet points like "wrote SQL queries" do not convey dataset scale or efficiency improvements.</p>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
