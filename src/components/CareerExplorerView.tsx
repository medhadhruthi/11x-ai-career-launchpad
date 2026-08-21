import React, { useState } from 'react';
import { getCareerRoleInfo } from '../services/aiEngine';
import { Compass, Search, BookOpen } from 'lucide-react';

export const CareerExplorerView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('Data Analyst');
  const [activeTab, setActiveTab] = useState<'explore' | 'compare'>('explore');

  const careerInfo = getCareerRoleInfo(searchQuery);

  const roleA = getCareerRoleInfo('Data Analyst');
  const roleB = getCareerRoleInfo('Business Analyst');
  const roleC = getCareerRoleInfo('Software Engineer');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <Compass className="w-6 h-6 text-brand-400" />
            <h1 className="text-2xl font-extrabold text-white">Universal Career Intelligence Explorer</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Discover core skills, tools, beginner & intermediate roadmaps, and side-by-side career comparisons.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setActiveTab('explore')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold ${activeTab === 'explore' ? 'bg-brand-500 text-white' : 'bg-slate-800 text-slate-400'}`}
          >
            Career Explorer
          </button>
          <button
            onClick={() => setActiveTab('compare')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold ${activeTab === 'compare' ? 'bg-brand-500 text-white' : 'bg-slate-800 text-slate-400'}`}
          >
            Career Comparison Matrix
          </button>
        </div>
      </div>

      {activeTab === 'explore' && (
        <div className="space-y-6">
          
          {/* Search Bar */}
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
              <input
                type="text"
                placeholder="Search any career (e.g., Data Analyst, Software Engineer, Mechanical Engineer, UX Designer)..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-4 py-3 text-xs text-white focus:outline-none focus:border-brand-500"
              />
            </div>
          </div>

          {/* Role Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
            <div>
              <h2 className="text-2xl font-extrabold text-white">{careerInfo.title}</h2>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">{careerInfo.overview}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Skills & Tools */}
              <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-3">
                <h3 className="text-xs font-bold text-brand-400 uppercase tracking-wider">Core Skills & Tools</h3>
                <div className="flex flex-wrap gap-1.5">
                  {careerInfo.coreSkills.map((sk, i) => (
                    <span key={i} className="text-xs bg-brand-500/10 text-brand-300 border border-brand-500/20 px-2.5 py-1 rounded-lg">
                      {sk}
                    </span>
                  ))}
                  {careerInfo.tools.map((t, i) => (
                    <span key={i} className="text-xs bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 px-2.5 py-1 rounded-lg">
                      🛠 {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Portfolio Ideas */}
              <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-3">
                <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Recommended Portfolio Projects</h3>
                <ul className="list-disc list-inside text-xs text-slate-300 space-y-1">
                  {careerInfo.portfolioIdeas.map((idea, i) => <li key={i}>{idea}</li>)}
                </ul>
              </div>

            </div>

            {/* Beginner & Intermediate Roadmaps */}
            <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-3">
              <h3 className="text-xs font-bold text-purple-400 uppercase tracking-wider flex items-center space-x-1.5">
                <BookOpen className="w-4 h-4" />
                <span>Beginner & Intermediate Learning Roadmaps</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-300">
                <div>
                  <h4 className="font-bold text-white mb-1">Beginner Phase (Weeks 1-4)</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {careerInfo.beginnerRoadmap.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">Intermediate Phase (Weeks 5-8)</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {careerInfo.intermediateRoadmap.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                </div>
              </div>
            </div>

          </div>

        </div>
      )}

      {activeTab === 'compare' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <h2 className="text-lg font-bold text-white">Side-by-Side Career Comparison Matrix</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            <div className="bg-slate-950 border border-brand-500/30 rounded-xl p-5 space-y-3">
              <h3 className="text-base font-bold text-brand-400">{roleA.title}</h3>
              <p className="text-xs text-slate-400">{roleA.overview}</p>
              <div className="pt-2">
                <span className="text-[10px] text-slate-500 font-bold block uppercase">Primary Focus</span>
                <span className="text-xs text-white font-semibold">Data Visualization, SQL, & Business Insights</span>
              </div>
            </div>

            <div className="bg-slate-950 border border-indigo-500/30 rounded-xl p-5 space-y-3">
              <h3 className="text-base font-bold text-indigo-400">{roleB.title}</h3>
              <p className="text-xs text-slate-400">{roleB.overview}</p>
              <div className="pt-2">
                <span className="text-[10px] text-slate-500 font-bold block uppercase">Primary Focus</span>
                <span className="text-xs text-white font-semibold">Requirement Gathering & Process Modeling</span>
              </div>
            </div>

            <div className="bg-slate-950 border border-purple-500/30 rounded-xl p-5 space-y-3">
              <h3 className="text-base font-bold text-purple-400">{roleC.title}</h3>
              <p className="text-xs text-slate-400">{roleC.overview}</p>
              <div className="pt-2">
                <span className="text-[10px] text-slate-500 font-bold block uppercase">Primary Focus</span>
                <span className="text-xs text-white font-semibold">Systems Architecture, OOP, & Coding</span>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
