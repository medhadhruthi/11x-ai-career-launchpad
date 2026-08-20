import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ApplicationStatus, Application } from '../types';
import { Briefcase, Plus, CheckCircle2, Clock, XCircle, Award, ExternalLink } from 'lucide-react';

export const ApplicationTrackerView: React.FC = () => {
  const { savedApplications, updateApplicationStatus, addApplication } = useApp();
  const [showAddModal, setShowAddModal] = useState(false);
  const [company, setCompany] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [notes, setNotes] = useState('');

  const totalApps = savedApplications.length;
  const interviewCount = savedApplications.filter(a => a.status === 'interview').length;
  const offerCount = savedApplications.filter(a => a.status === 'offer').length;

  const handleAdd = () => {
    if (!company.trim() || !jobTitle.trim()) return;
    addApplication({
      company,
      jobTitle,
      dateSaved: new Date().toISOString().split('T')[0],
      status: 'saved',
      notes
    });
    setCompany('');
    setJobTitle('');
    setNotes('');
    setShowAddModal(false);
  };

  const statusColors: Record<ApplicationStatus, string> = {
    saved: 'bg-slate-800 text-slate-300 border-slate-700',
    applied: 'bg-brand-500/10 text-brand-400 border-brand-500/30',
    assessment: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    interview: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
    rejected: 'bg-red-500/10 text-red-400 border-red-500/30',
    offer: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <Briefcase className="w-6 h-6 text-brand-400" />
            <h1 className="text-2xl font-extrabold text-white">Job Application CRM & Tracker</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Track applications from initial saved state to interviews, assessments, and offers.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs px-5 py-2.5 rounded-xl flex items-center space-x-1.5 shadow-lg"
        >
          <Plus className="w-4 h-4" />
          <span>Add Application</span>
        </button>
      </div>

      {/* Analytics Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-400 font-semibold block">Total Applications</span>
            <span className="text-2xl font-extrabold text-white">{totalApps}</span>
          </div>
          <Briefcase className="w-6 h-6 text-brand-400" />
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-400 font-semibold block">Active Interviews</span>
            <span className="text-2xl font-extrabold text-purple-400">{interviewCount}</span>
          </div>
          <Clock className="w-6 h-6 text-purple-400" />
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-400 font-semibold block">Offers Received</span>
            <span className="text-2xl font-extrabold text-emerald-400">{offerCount}</span>
          </div>
          <Award className="w-6 h-6 text-emerald-400" />
        </div>
      </div>

      {/* Applications List */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
        <h2 className="text-lg font-bold text-white">Tracked Applications</h2>

        <div className="space-y-3">
          {savedApplications.map((app) => (
            <div key={app.id} className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <h3 className="text-sm font-bold text-white">{app.jobTitle}</h3>
                  <span className="text-xs text-brand-400 font-semibold">@ {app.company}</span>
                </div>
                <p className="text-xs text-slate-400">{app.notes}</p>
                <span className="text-[10px] text-slate-500 block">Saved: {app.dateSaved} {app.jobMatchScore && `• Match Score: ${app.jobMatchScore}%`}</span>
              </div>

              {/* Status Select */}
              <div className="flex items-center space-x-2">
                <select
                  value={app.status}
                  onChange={(e) => updateApplicationStatus(app.id, e.target.value as ApplicationStatus)}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-lg border focus:outline-none ${statusColors[app.status]}`}
                >
                  <option value="saved">Saved</option>
                  <option value="applied">Applied</option>
                  <option value="assessment">Assessment</option>
                  <option value="interview">Interview</option>
                  <option value="rejected">Rejected</option>
                  <option value="offer">Offer</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-md w-full space-y-4">
            <h3 className="text-base font-bold text-white">Add New Application</h3>
            <input
              type="text"
              placeholder="Company Name (e.g., Google, Amazon)"
              value={company}
              onChange={e => setCompany(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
            />
            <input
              type="text"
              placeholder="Job Title (e.g., Data Analyst)"
              value={jobTitle}
              onChange={e => setJobTitle(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
            />
            <textarea
              placeholder="Notes..."
              rows={2}
              value={notes}
              onChange={e => setNotes(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
            />
            <div className="flex justify-end space-x-2">
              <button onClick={() => setShowAddModal(false)} className="px-4 py-2 text-xs text-slate-400">Cancel</button>
              <button onClick={handleAdd} className="bg-brand-500 text-white font-bold text-xs px-4 py-2 rounded-lg">Save Application</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
