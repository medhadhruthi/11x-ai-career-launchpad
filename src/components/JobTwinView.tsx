import React from 'react';
import { useApp } from '../context/AppContext';
import { Users, Code, Wrench, FileText, HeartHandshake, CheckCircle2 } from 'lucide-react';

export const JobTwinView: React.FC = () => {
  const { activeJobAnalysis } = useApp();

  if (!activeJobAnalysis) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center">
        <p className="text-slate-400 text-sm">Paste a job description to generate your visual Job Twin profile.</p>
      </div>
    );
  }

  const { jobTwin } = activeJobAnalysis;

  return (
    <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/10 blur-[80px] rounded-full pointer-events-none" />

      {/* Title */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-brand-500/10 border border-brand-500/30 flex items-center justify-center">
            <Users className="w-5 h-5 text-brand-400" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-xl font-extrabold text-white">{jobTwin.title}</h2>
              <span className="bg-brand-500/10 text-brand-400 text-xs font-bold px-2.5 py-0.5 rounded-full border border-brand-500/20">
                JOB TWIN TARGET
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">Visual baseline target profile for {activeJobAnalysis.company}</p>
          </div>
        </div>
      </div>

      {/* 4 Quadrants */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Technical Skills */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 space-y-3">
          <div className="flex items-center space-x-2 text-brand-400">
            <Code className="w-4 h-4" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">Technical Skills</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {jobTwin.technicalSkills.map((sk, idx) => (
              <span key={idx} className="bg-brand-500/10 border border-brand-500/20 text-brand-300 text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-400" />
                <span>{sk}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Tools & Platforms */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 space-y-3">
          <div className="flex items-center space-x-2 text-indigo-400">
            <Wrench className="w-4 h-4" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">Required Tools</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {jobTwin.tools.map((tool, idx) => (
              <span key={idx} className="bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
                <span>{tool}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Key Responsibilities */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 space-y-3 md:col-span-2">
          <div className="flex items-center space-x-2 text-emerald-400">
            <FileText className="w-4 h-4" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">Target Responsibilities</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {jobTwin.responsibilities.map((resp, idx) => (
              <div key={idx} className="bg-slate-950 border border-slate-800/80 rounded-lg p-3 text-xs text-slate-300 flex items-start space-x-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span>{resp}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Soft Skills */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 space-y-3 md:col-span-2">
          <div className="flex items-center space-x-2 text-amber-400">
            <HeartHandshake className="w-4 h-4" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">Soft Skills & Methodologies</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {jobTwin.softSkills.map((ss, idx) => (
              <span key={idx} className="bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold px-3 py-1.5 rounded-lg">
                {ss}
              </span>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
