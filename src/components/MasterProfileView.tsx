import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  UserCheck,
  GraduationCap,
  Briefcase,
  FolderGit2,
  Award,
  Link2,
  Plus,
  Trash2,
  Save,
  CheckCircle,
  PlusCircle,
  AlertCircle
} from 'lucide-react';
import { UserSkill, EvidenceItem, Project, WorkExperience, Education } from '../types';

export const MasterProfileView: React.FC = () => {
  const { userProfile, updateUserProfile } = useApp();
  const [activeTab, setActiveTab] = useState<'personal' | 'skills' | 'evidence' | 'projects' | 'experience' | 'education'>('personal');
  const [savedNotice, setSavedNotice] = useState(false);

  // Form states
  const [personal, setPersonal] = useState(userProfile.personalInfo);
  const [skills, setSkills] = useState<UserSkill[]>(userProfile.skills);
  const [evidence, setEvidence] = useState<EvidenceItem[]>(userProfile.evidence);
  const [projects, setProjects] = useState<Project[]>(userProfile.projects);
  const [experience, setExperience] = useState<WorkExperience[]>(userProfile.experience);
  const [education, setEducation] = useState<Education[]>(userProfile.education);

  // Skill Add Form
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillCategory, setNewSkillCategory] = useState('Technical');
  const [newSkillStatus, setNewSkillStatus] = useState<UserSkill['status']>('verified');

  // Evidence Add Form
  const [newEvTitle, setNewEvTitle] = useState('');
  const [newEvTech, setNewEvTech] = useState('');
  const [newEvDesc, setNewEvDesc] = useState('');

  const handleSave = () => {
    updateUserProfile({
      personalInfo: personal,
      skills,
      evidence,
      projects,
      experience,
      education
    });
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
  };

  const handleAddSkill = () => {
    if (!newSkillName.trim()) return;
    const newSkill: UserSkill = {
      id: `sk-${Date.now()}`,
      name: newSkillName.trim(),
      category: newSkillCategory,
      status: newSkillStatus,
      proficiency: 'Intermediate',
      evidenceIds: []
    };
    setSkills(prev => [...prev, newSkill]);
    setNewSkillName('');
  };

  const handleDeleteSkill = (id: string) => {
    setSkills(prev => prev.filter(s => s.id !== id));
  };

  const handleAddEvidence = () => {
    if (!newEvTitle.trim()) return;
    const item: EvidenceItem = {
      id: `ev-${Date.now()}`,
      title: newEvTitle.trim(),
      type: 'Project',
      description: newEvDesc,
      technologies: newEvTech.split(',').map(t => t.trim()).filter(Boolean),
      date: new Date().getFullYear().toString()
    };
    setEvidence(prev => [item, ...prev]);
    setNewEvTitle('');
    setNewEvTech('');
    setNewEvDesc('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
        <div>
          <div className="flex items-center space-x-2">
            <UserCheck className="w-6 h-6 text-brand-400" />
            <h1 className="text-2xl font-extrabold text-white">Master Career Profile</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Single central repository for your verified background. Used across all tailored resumes.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="flex items-center justify-center space-x-2 bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-lg transition-all"
        >
          <Save className="w-4 h-4" />
          <span>Save Master Profile</span>
        </button>
      </div>

      {savedNotice && (
        <div className="flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-4 py-3 rounded-xl text-xs">
          <CheckCircle className="w-4 h-4" />
          <span>Master Career Profile updated successfully! All resume builders and job analyses synced.</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
        {[
          { id: 'personal', label: 'Personal & Links' },
          { id: 'skills', label: `Skills (${skills.length})` },
          { id: 'evidence', label: `Skill Evidence (${evidence.length})` },
          { id: 'projects', label: `Projects (${projects.length})` },
          { id: 'experience', label: `Experience (${experience.length})` },
          { id: 'education', label: 'Education' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === tab.id
                ? 'bg-brand-500 text-white shadow-md'
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        
        {/* Personal Info */}
        {activeTab === 'personal' && (
          <div className="space-y-4 max-w-3xl">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Personal Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Full Name</label>
                <input
                  type="text"
                  value={personal.fullName}
                  onChange={e => setPersonal({ ...personal, fullName: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Professional Title</label>
                <input
                  type="text"
                  value={personal.professionalTitle}
                  onChange={e => setPersonal({ ...personal, professionalTitle: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Email</label>
                <input
                  type="email"
                  value={personal.email}
                  onChange={e => setPersonal({ ...personal, email: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Phone</label>
                <input
                  type="text"
                  value={personal.phone}
                  onChange={e => setPersonal({ ...personal, phone: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Location</label>
                <input
                  type="text"
                  value={personal.location}
                  onChange={e => setPersonal({ ...personal, location: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">LinkedIn URL</label>
                <input
                  type="text"
                  value={personal.linkedIn || ''}
                  onChange={e => setPersonal({ ...personal, linkedIn: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">GitHub URL</label>
                <input
                  type="text"
                  value={personal.github || ''}
                  onChange={e => setPersonal({ ...personal, github: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Portfolio / Website</label>
                <input
                  type="text"
                  value={personal.portfolio || ''}
                  onChange={e => setPersonal({ ...personal, portfolio: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-500"
                />
              </div>
            </div>

            <div className="pt-2">
              <label className="block text-xs font-medium text-slate-300 mb-1">Professional Bio / Summary</label>
              <textarea
                rows={3}
                value={personal.bio || ''}
                onChange={e => setPersonal({ ...personal, bio: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-brand-500"
              />
            </div>
          </div>
        )}

        {/* Master Skills */}
        {activeTab === 'skills' && (
          <div className="space-y-6">
            
            {/* Add Skill Form */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center space-x-1.5">
                <PlusCircle className="w-4 h-4 text-brand-400" />
                <span>Add Skill to Master Profile</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <input
                  type="text"
                  placeholder="Skill Name (e.g. Power BI, DAX, SolidWorks)"
                  value={newSkillName}
                  onChange={e => setNewSkillName(e.target.value)}
                  className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-500"
                />
                <select
                  value={newSkillCategory}
                  onChange={e => setNewSkillCategory(e.target.value)}
                  className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-500"
                >
                  <option value="Technical">Technical</option>
                  <option value="Databases & Querying">Databases & Querying</option>
                  <option value="BI & Visualization">BI & Visualization</option>
                  <option value="Tools & Platforms">Tools & Platforms</option>
                  <option value="Soft Skills">Soft Skills</option>
                </select>
                <select
                  value={newSkillStatus}
                  onChange={e => setNewSkillStatus(e.target.value as any)}
                  className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-500"
                >
                  <option value="verified">Verified (Have Evidence)</option>
                  <option value="learning">Currently Learning</option>
                  <option value="need_evidence">Need Evidence</option>
                </select>
                <button
                  onClick={handleAddSkill}
                  className="bg-brand-500 hover:bg-brand-600 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors"
                >
                  + Add Skill
                </button>
              </div>
            </div>

            {/* Skill Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {skills.map(sk => (
                <div key={sk.id} className="bg-slate-950 border border-slate-800 rounded-xl p-3 flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold text-white">{sk.name}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold border ${
                        sk.status === 'verified'
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                          : sk.status === 'learning'
                          ? 'bg-purple-500/10 text-purple-400 border-purple-500/30'
                          : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                      }`}>
                        {sk.status}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">{sk.category} • {sk.proficiency}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteSkill(sk.id)}
                    className="text-slate-500 hover:text-red-400 p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* Skill Evidence */}
        {activeTab === 'evidence' && (
          <div className="space-y-6">
            
            {/* Add Evidence */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center space-x-1.5">
                <PlusCircle className="w-4 h-4 text-emerald-400" />
                <span>Add Verified Project Evidence</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Evidence Title (e.g. Sales Forecast Dashboard)"
                  value={newEvTitle}
                  onChange={e => setNewEvTitle(e.target.value)}
                  className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-500"
                />
                <input
                  type="text"
                  placeholder="Technologies Used (comma separated: SQL, Python, Power BI)"
                  value={newEvTech}
                  onChange={e => setNewEvTech(e.target.value)}
                  className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-500"
                />
              </div>
              <textarea
                placeholder="Description & Impact Metrics (e.g. Processed 25,000 customer records and reduced query latency by 40%)"
                rows={2}
                value={newEvDesc}
                onChange={e => setNewEvDesc(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-brand-500"
              />
              <button
                onClick={handleAddEvidence}
                className="bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors"
              >
                + Save Evidence Item
              </button>
            </div>

            {/* Evidence List */}
            <div className="space-y-3">
              {evidence.map(ev => (
                <div key={ev.id} className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-white">{ev.title}</h4>
                    <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">{ev.type}</span>
                  </div>
                  <p className="text-xs text-slate-300">{ev.description}</p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {ev.technologies.map((t, idx) => (
                      <span key={idx} className="text-[10px] bg-brand-500/10 text-brand-400 border border-brand-500/20 px-2 py-0.5 rounded">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* Projects */}
        {activeTab === 'projects' && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Verified Projects</h3>
            {projects.map(p => (
              <div key={p.id} className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2">
                <h4 className="text-sm font-bold text-white">{p.title}</h4>
                <p className="text-xs text-slate-300">{p.description}</p>
                <ul className="list-disc list-inside text-xs text-slate-400 space-y-1">
                  {p.bullets.map((b, i) => <li key={i}>{b}</li>)}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Experience */}
        {activeTab === 'experience' && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Work Experience & Internships</h3>
            {experience.map(exp => (
              <div key={exp.id} className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-sm font-bold text-white">{exp.title}</h4>
                    <p className="text-xs text-brand-400 font-medium">{exp.company} • {exp.location}</p>
                  </div>
                  <span className="text-[11px] text-slate-400">{exp.startDate} - {exp.endDate}</span>
                </div>
                <ul className="list-disc list-inside text-xs text-slate-400 space-y-1 pt-2">
                  {exp.bullets.map((b, i) => <li key={i}>{b}</li>)}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {activeTab === 'education' && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Education Details</h3>
            {education.map(edu => (
              <div key={edu.id} className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-sm font-bold text-white">{edu.degree}</h4>
                    <p className="text-xs text-slate-300">{edu.institution} • GPA: {edu.gpa}</p>
                  </div>
                  <span className="text-[11px] text-slate-400">{edu.startDate} - {edu.endDate}</span>
                </div>
                {edu.coursework && (
                  <div className="pt-2">
                    <p className="text-[11px] text-slate-400 font-medium">Relevant Coursework:</p>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {edu.coursework.map((c, i) => (
                        <span key={i} className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

      </div>

    </div>
  );
};
