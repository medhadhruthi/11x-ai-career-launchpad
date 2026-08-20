import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { detectGenericPhrases } from '../services/aiEngine';
import { ShieldAlert, Sparkles, CheckCircle2, AlertTriangle, X } from 'lucide-react';

export const EvidenceCheckerModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { userProfile, addEvidenceToSkill } = useApp();
  const [inputText, setInputText] = useState('I am a hardworking team player with good knowledge of Python and SQL.');
  const [evidenceTitle, setEvidenceTitle] = useState('');
  const [evidenceDesc, setEvidenceDesc] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('Python');
  const [evidenceSavedSuccess, setEvidenceSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const detectedPhrases = detectGenericPhrases(inputText);

  const handleSaveEvidence = () => {
    if (!evidenceTitle.trim() || !evidenceDesc.trim()) return;
    addEvidenceToSkill(selectedSkill, evidenceTitle, evidenceDesc);
    setEvidenceSavedSuccess(true);
    setTimeout(() => {
      setEvidenceSavedSuccess(false);
      setEvidenceTitle('');
      setEvidenceDesc('');
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-2xl w-full shadow-2xl space-y-6 relative my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
            <ShieldAlert className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-white">Skill Evidence Checker & Generic Phrase Audit</h2>
            <p className="text-xs text-slate-400">Verifies whether claimed skills have empirical project backing. Eliminates weak fluff.</p>
          </div>
        </div>

        {/* Audit Tester */}
        <div className="space-y-3">
          <label className="block text-xs font-semibold text-slate-300">
            Paste Resume Summary or Bullet Point to Audit:
          </label>
          <textarea
            rows={2}
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-brand-500"
          />
        </div>

        {/* Detected Fluff Phrases */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center space-x-1.5">
            <AlertTriangle className="w-4 h-4" />
            <span>Generic / Weak Phrases Detected ({detectedPhrases.length})</span>
          </h3>

          {detectedPhrases.length === 0 ? (
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3 text-xs text-emerald-400 flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Great job! No weak generic phrases detected in this statement.</span>
            </div>
          ) : (
            <div className="space-y-2">
              {detectedPhrases.map((item, idx) => (
                <div key={idx} className="bg-slate-950 border border-amber-500/30 rounded-xl p-3 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                      "{item.phrase}"
                    </span>
                    <span className="text-[10px] text-slate-400">Requires Empirical Evidence</span>
                  </div>
                  <p className="text-xs text-slate-200 font-medium">❓ Prompt: {item.question}</p>
                  <p className="text-xs text-brand-300 italic">💡 Strong Fix: {item.exampleFix}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Connect Skill to Real Evidence Form */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center space-x-1.5">
            <Sparkles className="w-4 h-4 text-brand-400" />
            <span>Connect Skill to Real Project Evidence</span>
          </h3>

          {evidenceSavedSuccess && (
            <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-2.5 rounded-lg text-xs flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Evidence saved and linked to {selectedSkill}!</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Target Skill</label>
              <select
                value={selectedSkill}
                onChange={e => setSelectedSkill(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-500"
              >
                {userProfile.skills.map(s => (
                  <option key={s.id} value={s.name}>{s.name} ({s.status})</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Project / Internship Title</label>
              <input
                type="text"
                placeholder="e.g. Sales Anomaly Detector"
                value={evidenceTitle}
                onChange={e => setEvidenceTitle(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] text-slate-400 mb-1">Empirical Evidence & Metric Description</label>
            <textarea
              rows={2}
              placeholder="e.g. Analyzed 10,000+ transaction records using Python (Pandas) to identify 15% pricing variance."
              value={evidenceDesc}
              onChange={e => setEvidenceDesc(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-brand-500"
            />
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleSaveEvidence}
              className="bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs px-5 py-2 rounded-lg transition-colors"
            >
              Link Evidence to Skill
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
