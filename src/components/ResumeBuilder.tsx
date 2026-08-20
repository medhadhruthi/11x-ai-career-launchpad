import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { TemplateId, Resume } from '../types';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import {
  FileText,
  Download,
  Printer,
  Eye,
  ZoomIn,
  ZoomOut,
  Sparkles,
  Layout,
  Plus,
  Trash2,
  Save,
  CheckCircle2,
  ChevronUp,
  ChevronDown
} from 'lucide-react';

export const ResumeBuilder: React.FC = () => {
  const { activeResume, saveResume, userProfile } = useApp();
  const [resumeData, setResumeData] = useState<Resume>(activeResume);
  const [zoom, setZoom] = useState<number>(100);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const templates: { id: TemplateId; name: string }[] = [
    { id: 'classic', name: 'Classic Executive' },
    { id: 'modern', name: 'Modern Tech' },
    { id: 'minimal', name: 'Minimalist Clean' },
    { id: 'student', name: 'Student & Fresher' },
    { id: 'data-analyst', name: 'Data Analyst Specialized' },
    { id: 'software-dev', name: 'Software Engineer' },
    { id: 'business-analyst', name: 'Business Analyst' }
  ];

  const handleSave = () => {
    saveResume(resumeData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleDownloadPDF = async () => {
    if (!previewRef.current) return;
    try {
      const canvas = await html2canvas(previewRef.current, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${resumeData.title.replace(/\s+/g, '_')}_Resume.pdf`);
    } catch (err) {
      window.print();
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-4">
      
      {/* Top Controls Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
        <div className="flex items-center space-x-3">
          <FileText className="w-6 h-6 text-brand-400" />
          <div>
            <input
              type="text"
              value={resumeData.title}
              onChange={e => setResumeData({ ...resumeData, title: e.target.value })}
              className="bg-transparent font-extrabold text-base text-white border-b border-transparent hover:border-slate-700 focus:border-brand-500 focus:outline-none"
            />
            <p className="text-[11px] text-slate-400">Two-Panel Real-Time Editor with 7 ATS Templates</p>
          </div>
        </div>

        {/* Template Selector & Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          
          <select
            value={resumeData.templateId}
            onChange={e => setResumeData({ ...resumeData, templateId: e.target.value as TemplateId })}
            className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-brand-500 font-semibold"
          >
            {templates.map(t => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>

          <button
            onClick={handleSave}
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-700 flex items-center space-x-1.5"
          >
            <Save className="w-3.5 h-3.5 text-emerald-400" />
            <span>Save</span>
          </button>

          <button
            onClick={handleDownloadPDF}
            className="bg-brand-500 hover:bg-brand-600 text-white text-xs font-bold px-4 py-1.5 rounded-lg flex items-center space-x-1.5 shadow-md"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download PDF</span>
          </button>
        </div>
      </div>

      {savedSuccess && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-2.5 rounded-xl text-xs flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>Resume saved successfully!</span>
        </div>
      )}

      {/* Two-Panel Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT PANEL: Editing Controls (5 Cols) */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-6 max-h-[85vh] overflow-y-auto">
          
          {/* Summary Section */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">Professional Summary</h3>
            <textarea
              rows={3}
              value={resumeData.summary}
              onChange={e => setResumeData({ ...resumeData, summary: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-brand-500"
            />
          </div>

          {/* Education Section */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">Education</h3>
            {resumeData.education.map((edu, idx) => (
              <div key={idx} className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-xs space-y-1">
                <input
                  type="text"
                  value={edu.degree}
                  onChange={e => {
                    const newEdu = [...resumeData.education];
                    newEdu[idx].degree = e.target.value;
                    setResumeData({ ...resumeData, education: newEdu });
                  }}
                  className="w-full bg-slate-900 border border-slate-800 rounded p-1 text-xs text-white font-bold"
                />
                <input
                  type="text"
                  value={edu.institution}
                  onChange={e => {
                    const newEdu = [...resumeData.education];
                    newEdu[idx].institution = e.target.value;
                    setResumeData({ ...resumeData, education: newEdu });
                  }}
                  className="w-full bg-slate-900 border border-slate-800 rounded p-1 text-xs text-slate-300"
                />
              </div>
            ))}
          </div>

          {/* Skills Section */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">Skills Categories</h3>
            {resumeData.skills.map((cat, idx) => (
              <div key={idx} className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-2">
                <input
                  type="text"
                  value={cat.category}
                  onChange={e => {
                    const newSkills = [...resumeData.skills];
                    newSkills[idx].category = e.target.value;
                    setResumeData({ ...resumeData, skills: newSkills });
                  }}
                  className="w-full bg-slate-900 border border-slate-800 rounded p-1 text-xs text-brand-400 font-bold"
                />
                <input
                  type="text"
                  value={cat.items.join(', ')}
                  onChange={e => {
                    const newSkills = [...resumeData.skills];
                    newSkills[idx].items = e.target.value.split(',').map(s => s.trim());
                    setResumeData({ ...resumeData, skills: newSkills });
                  }}
                  className="w-full bg-slate-900 border border-slate-800 rounded p-1 text-xs text-slate-300"
                />
              </div>
            ))}
          </div>

          {/* Experience Section */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">Work Experience</h3>
            {resumeData.experience.map((exp, idx) => (
              <div key={idx} className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-xs space-y-2">
                <input
                  type="text"
                  value={exp.title}
                  onChange={e => {
                    const newExp = [...resumeData.experience];
                    newExp[idx].title = e.target.value;
                    setResumeData({ ...resumeData, experience: newExp });
                  }}
                  className="w-full bg-slate-900 border border-slate-800 rounded p-1 text-xs text-white font-bold"
                />
                <textarea
                  rows={2}
                  value={exp.bullets.join('\n')}
                  onChange={e => {
                    const newExp = [...resumeData.experience];
                    newExp[idx].bullets = e.target.value.split('\n');
                    setResumeData({ ...resumeData, experience: newExp });
                  }}
                  className="w-full bg-slate-900 border border-slate-800 rounded p-2 text-xs text-slate-300"
                />
              </div>
            ))}
          </div>

        </div>

        {/* RIGHT PANEL: Live Printable Preview (7 Cols) */}
        <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-2xl p-6 flex flex-col items-center space-y-4 max-h-[85vh] overflow-y-auto">
          
          {/* Zoom Controls */}
          <div className="flex items-center space-x-3 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800 text-xs text-slate-400">
            <button onClick={() => setZoom(Math.max(60, zoom - 10))} className="hover:text-white"><ZoomOut className="w-4 h-4" /></button>
            <span>{zoom}% Zoom</span>
            <button onClick={() => setZoom(Math.min(140, zoom + 10))} className="hover:text-white"><ZoomIn className="w-4 h-4" /></button>
          </div>

          {/* Live Document Canvas Wrapper for Responsiveness */}
          <div className="w-full overflow-x-auto flex justify-center p-2">
            <div
              ref={previewRef}
              style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}
              className="w-[210mm] min-h-[297mm] bg-white text-slate-900 p-8 sm:p-10 shadow-2xl rounded-sm text-sm font-sans space-y-5 transition-transform flex-shrink-0"
            >
            
            {/* Resume Header */}
            <div className="border-b pb-4 border-slate-300">
              <h1 className="text-2xl font-bold text-slate-900 uppercase tracking-tight">{userProfile.personalInfo.fullName}</h1>
              <p className="text-xs text-slate-600 font-medium mt-0.5">{userProfile.personalInfo.professionalTitle}</p>
              <p className="text-[11px] text-slate-500 mt-1">
                {userProfile.personalInfo.email} • {userProfile.personalInfo.phone} • {userProfile.personalInfo.location} • {userProfile.personalInfo.linkedIn}
              </p>
            </div>

            {/* Professional Summary */}
            <div>
              <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-300 pb-1 mb-1.5">Professional Summary</h2>
              <p className="text-xs text-slate-700 leading-relaxed">{resumeData.summary}</p>
            </div>

            {/* Skills */}
            <div>
              <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-300 pb-1 mb-1.5">Technical & Domain Skills</h2>
              <div className="space-y-1">
                {resumeData.skills.map((cat, i) => (
                  <p key={i} className="text-xs text-slate-800">
                    <strong className="text-slate-900">{cat.category}:</strong> {cat.items.join(', ')}
                  </p>
                ))}
              </div>
            </div>

            {/* Experience */}
            <div>
              <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-300 pb-1 mb-1.5">Work Experience</h2>
              {resumeData.experience.map((exp, i) => (
                <div key={i} className="mb-3">
                  <div className="flex justify-between items-baseline">
                    <strong className="text-xs text-slate-900">{exp.title} — {exp.company}</strong>
                    <span className="text-[11px] text-slate-600">{exp.startDate} – {exp.endDate}</span>
                  </div>
                  <ul className="list-disc list-inside text-xs text-slate-700 mt-1 space-y-0.5">
                    {exp.bullets.map((b, idx) => <li key={idx}>{b}</li>)}
                  </ul>
                </div>
              ))}
            </div>

            {/* Projects */}
            <div>
              <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-300 pb-1 mb-1.5">Key Projects</h2>
              {resumeData.projects.map((p, i) => (
                <div key={i} className="mb-2">
                  <strong className="text-xs text-slate-900">{p.title}</strong>
                  <p className="text-xs text-slate-700">{p.description}</p>
                </div>
              ))}
            </div>

            {/* Education */}
            <div>
              <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-300 pb-1 mb-1.5">Education</h2>
              {resumeData.education.map((edu, i) => (
                <div key={i} className="flex justify-between text-xs text-slate-800">
                  <span><strong>{edu.degree}</strong> — {edu.institution}</span>
                  <span className="text-slate-600">{edu.startDate} – {edu.endDate}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
};
