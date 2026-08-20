import React from 'react';
import { useApp } from '../context/AppContext';
import { MessageSquare, CheckCircle2, Play, BookOpen, Sparkles } from 'lucide-react';

export const InterviewPrepView: React.FC = () => {
  const { interviewQuestions, updateQuestionStatus, activeJobAnalysis } = useApp();

  const practicedCount = interviewQuestions.filter(q => q.status === 'Practiced' || q.status === 'Confident').length;
  const totalCount = interviewQuestions.length;
  const readinessPercentage = Math.round((practicedCount / Math.max(1, totalCount)) * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <MessageSquare className="w-6 h-6 text-brand-400" />
            <h1 className="text-2xl font-extrabold text-white">Contextual Interview Preparation</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Questions generated strictly from your verified resume projects and target job ({activeJobAnalysis?.title || 'Data Analyst'}).
          </p>
        </div>

        <div className="bg-slate-950 border border-purple-500/30 px-5 py-3 rounded-xl text-center">
          <span className="text-[10px] text-slate-400 uppercase font-bold block">Interview Readiness</span>
          <span className="text-2xl font-black text-purple-400">{readinessPercentage}%</span>
        </div>
      </div>

      {/* Question Cards */}
      <div className="space-y-4">
        {interviewQuestions.map((q) => (
          <div key={q.id} className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4 shadow-lg">
            
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold text-brand-400 bg-brand-500/10 px-2.5 py-0.5 rounded border border-brand-500/20">
                  {q.category}
                </span>
                <span className="text-[11px] text-slate-400">• Context: {q.sourceContext}</span>
              </div>

              <div className="flex items-center space-x-2">
                {(['Not Practiced', 'Practiced', 'Confident'] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => updateQuestionStatus(q.id, st)}
                    className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg border transition-all ${
                      q.status === st
                        ? st === 'Confident'
                          ? 'bg-emerald-500 text-white border-emerald-500'
                          : st === 'Practiced'
                          ? 'bg-brand-500 text-white border-brand-500'
                          : 'bg-slate-800 text-slate-300 border-slate-700'
                        : 'bg-slate-950 text-slate-400 hover:bg-slate-800 border-slate-800'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            <h3 className="text-base font-extrabold text-white leading-snug">
              "{q.question}"
            </h3>

            <div className="bg-slate-950 border border-slate-800/80 rounded-lg p-3 space-y-1 text-xs">
              <span className="text-[11px] font-bold text-purple-400 uppercase tracking-wider block">Suggested STAR Framework Answer:</span>
              <p className="text-slate-300 leading-relaxed">{q.suggestedAnswerFramework}</p>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
