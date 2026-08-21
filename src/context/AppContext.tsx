import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserProfile,
  UserSkill,
  JobAnalysis,
  Resume,
  Application,
  InterviewQuestion,
  ApplicationStatus
} from '../types';
import { analyzeJobDescription, generateInterviewQuestions } from '../services/aiEngine';

// Default realistic sample data for instant exploration
const DEFAULT_USER_PROFILE: UserProfile = {
  personalInfo: {
    fullName: 'Alex Vance',
    professionalTitle: 'Data Analyst & Systems Specialist',
    email: 'alex.vance@example.com',
    phone: '+1 (555) 234-5678',
    location: 'Austin, TX',
    linkedIn: 'linkedin.com/in/alexvance-data',
    github: 'github.com/alexvance-analytics',
    portfolio: 'alexvance-analytics.dev',
    leetCode: 'leetcode.com/alexvance',
    bio: 'Data Analyst with strong quantitative skills in SQL, Python, and Power BI. Experienced in analyzing 50,000+ sales and financial records to build executive dashboards.'
  },
  education: [
    {
      id: 'edu-1',
      degree: 'Bachelor of Science in Information Systems',
      institution: 'University of Texas at Austin',
      location: 'Austin, TX',
      startDate: '2021',
      endDate: '2025',
      gpa: '3.8 / 4.0',
      fieldOfStudy: 'Information Systems & Analytics',
      coursework: ['Database Management (SQL)', 'Statistical Methods', 'Data Mining', 'Systems Analysis']
    }
  ],
  skills: [
    { id: 's-1', name: 'SQL', category: 'Databases & Querying', status: 'verified', proficiency: 'Advanced', evidenceIds: ['ev-1', 'ev-2'] },
    { id: 's-2', name: 'Python', category: 'Programming Languages', status: 'verified', proficiency: 'Intermediate', evidenceIds: ['ev-1'] },
    { id: 's-3', name: 'Excel', category: 'Spreadsheets', status: 'verified', proficiency: 'Advanced', evidenceIds: ['ev-2'] },
    { id: 's-4', name: 'Power BI', category: 'BI & Visualization', status: 'need_evidence', proficiency: 'Beginner', evidenceIds: [] },
    { id: 's-5', name: 'Git & GitHub', category: 'Tools', status: 'verified', proficiency: 'Intermediate', evidenceIds: ['ev-1'] },
    { id: 's-6', name: 'Data Visualization', category: 'Reporting', status: 'verified', proficiency: 'Intermediate', evidenceIds: ['ev-1'] },
    { id: 's-7', name: 'Statistics', category: 'Fundamentals', status: 'learning', proficiency: 'Beginner', evidenceIds: [] }
  ],
  evidence: [
    {
      id: 'ev-1',
      title: 'E-Commerce Sales Performance & Revenue Forecaster',
      type: 'Project',
      description: 'Processed and analyzed 25,000+ customer orders using Python (Pandas/NumPy) and SQL. Created automated anomaly detection scripts that reduced reporting errors by 30%.',
      technologies: ['Python', 'SQL', 'Git & GitHub', 'Data Visualization'],
      link: 'https://github.com/alexvance-analytics/ecommerce-forecast',
      date: '2024',
      impactMetrics: 'Reduced reporting latency by 30%; processed 25k records.'
    },
    {
      id: 'ev-2',
      title: 'Finance & Expense Tracker Dashboard',
      type: 'Internship',
      description: 'Built advanced Excel pivot models and SQL queries for weekly budget audits during analytics internship at FinTech Solutions.',
      technologies: ['SQL', 'Excel'],
      date: 'Summer 2024',
      impactMetrics: 'Identified $12,000 in duplicate subscription costs.'
    }
  ],
  experience: [
    {
      id: 'exp-1',
      title: 'Data Analytics Intern',
      company: 'FinTech Solutions Inc.',
      location: 'Austin, TX',
      startDate: 'May 2024',
      endDate: 'Aug 2024',
      isCurrent: false,
      bullets: [
        'Wrote 40+ complex SQL queries with joins, CTEs, and window functions to extract transaction logs.',
        'Created interactive Excel dashboards to monitor weekly operational metrics for executive leadership.',
        'Collaborated with 3 senior analysts to clean and standardize unstructured customer data.'
      ],
      skillsUsed: ['SQL', 'Excel', 'Data Visualization']
    }
  ],
  projects: [
    {
      id: 'proj-1',
      title: 'E-Commerce Revenue Forecaster',
      description: 'End-to-end Python & SQL analytical pipeline predicting monthly revenue trends.',
      skills: ['Python', 'SQL', 'Data Visualization', 'Git & GitHub'],
      bullets: [
        'Cleaned 25,000+ raw transactional records using Python Pandas and SQL window functions.',
        'Exported structured metrics into automated visualization reports.'
      ],
      githubUrl: 'github.com/alexvance-analytics/ecommerce-forecast'
    }
  ],
  certifications: [
    {
      id: 'cert-1',
      name: 'Google Data Analytics Professional Certificate',
      issuer: 'Coursera / Google',
      issueDate: 'Jan 2024',
      skills: ['SQL', 'R', 'Data Cleaning', 'Tableau']
    }
  ],
  achievements: [
    'Dean\'s Honor List for 4 consecutive semesters (2022-2024)',
    '1st Place Winner - University Data Hackathon 2024'
  ],
  research: [],
  targetRoles: ['Data Analyst', 'Business Analyst', 'BI Analyst'],
  studentDetails: {
    isStudent: true,
    college: 'University of Texas at Austin',
    branch: 'Information Systems',
    gradYear: '2025',
    cgpa: '3.8 / 4.0'
  }
};

const DEFAULT_JOB_DESCRIPTION = `
Position: Senior Data Analyst
Company: Enterprise Cloud Tech
Location: Remote / Austin, TX

About the Role:
We are seeking a data analyst to join our core analytics team. You will be responsible for building dashboards, writing SQL queries, and utilizing Python for data visualization and statistical analysis.

Requirements:
- Strong proficiency in SQL (joins, subqueries, CTEs, window functions).
- Hands-on experience with Python (Pandas, NumPy) for data cleaning and analytical modeling.
- Experience building interactive dashboards using Power BI or Tableau.
- Solid understanding of Statistics, data visualization best practices, and A/B testing principles.
- Bachelor's degree in Computer Science, Information Systems, Statistics, or quantitative discipline.
- Excellent communication skills and problem-solving mindset.

Responsibilities:
- Write optimized SQL queries against high-volume database systems.
- Design executive Power BI reports for key product performance metrics.
- Partner with product managers to formulate data-driven business insights.
`;

const DEFAULT_RESUME: Resume = {
  id: 'res-default',
  title: 'Data Analyst — Target Optimized',
  templateId: 'data-analyst',
  personalInfo: DEFAULT_USER_PROFILE.personalInfo,
  summary: DEFAULT_USER_PROFILE.personalInfo.bio || '',
  education: DEFAULT_USER_PROFILE.education,
  skills: [
    { category: 'Languages & Querying', items: ['SQL (Advanced)', 'Python (Pandas, NumPy)'] },
    { category: 'Tools & BI', items: ['Excel (Advanced)', 'Power BI', 'Git & GitHub'] },
    { category: 'Analytics', items: ['Data Visualization', 'Statistical Analysis'] }
  ],
  experience: DEFAULT_USER_PROFILE.experience,
  projects: DEFAULT_USER_PROFILE.projects,
  certifications: DEFAULT_USER_PROFILE.certifications,
  achievements: DEFAULT_USER_PROFILE.achievements,
  hiddenSections: [],
  sectionOrder: ['summary', 'education', 'skills', 'experience', 'projects', 'certifications', 'achievements'],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

const DEFAULT_APPLICATIONS: Application[] = [
  {
    id: 'app-1',
    company: 'Enterprise Cloud Tech',
    jobTitle: 'Senior Data Analyst',
    dateSaved: '2026-08-15',
    dateApplied: '2026-08-18',
    status: 'interview',
    jobMatchScore: 84,
    notes: 'Completed initial recruiter screen. Technical interview scheduled for next Tuesday.'
  },
  {
    id: 'app-2',
    company: 'FinTech Dynamics',
    jobTitle: 'Business Data Analyst',
    dateSaved: '2026-08-10',
    dateApplied: '2026-08-12',
    status: 'assessment',
    jobMatchScore: 91,
    notes: 'Submitted SQL coding assessment on HackerRank.'
  },
  {
    id: 'app-3',
    company: 'Apex Healthcare Systems',
    jobTitle: 'Junior Data Analyst',
    dateSaved: '2026-08-01',
    status: 'saved',
    jobMatchScore: 78,
    notes: 'Need to complete Power BI evidence project before applying.'
  }
];

interface AppContextType {
  activeView: string;
  setActiveView: (view: string) => void;
  userProfile: UserProfile;
  updateUserProfile: (profile: Partial<UserProfile>) => void;
  activeJobAnalysis: JobAnalysis | null;
  analyzeNewJob: (jdText: string) => JobAnalysis;
  setActiveJobAnalysis: (job: JobAnalysis | null) => void;
  savedResumes: Resume[];
  activeResume: Resume;
  setActiveResume: (resume: Resume) => void;
  saveResume: (resume: Resume) => void;
  savedApplications: Application[];
  addApplication: (app: Omit<Application, 'id'>) => void;
  updateApplicationStatus: (id: string, status: ApplicationStatus) => void;
  interviewQuestions: InterviewQuestion[];
  updateQuestionStatus: (id: string, status: InterviewQuestion['status']) => void;
  isStudentMode: boolean;
  setIsStudentMode: (enabled: boolean) => void;
  wizardStep: number;
  setWizardStep: (step: number) => void;
  verifyUserSkill: (skillName: string, status: UserSkill['status'], proficiency?: UserSkill['proficiency']) => void;
  addEvidenceToSkill: (skillName: string, evidenceTitle: string, description: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const readStorageState = <T,>(key: string, fallback: T): T => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) as T : fallback;
  } catch (error) {
    console.warn(`Could not read ${key} from localStorage. Falling back to defaults.`, error);
    return fallback;
  }
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load from localStorage or default
  const [activeView, setActiveView] = useState<string>('landing');
  const [wizardStep, setWizardStep] = useState<number>(1);
  const [isStudentMode, setIsStudentMode] = useState<boolean>(true);

  const [userProfile, setUserProfile] = useState<UserProfile>(() => readStorageState<UserProfile>('11x_user_profile', DEFAULT_USER_PROFILE));

  const [activeJobAnalysis, setActiveJobAnalysis] = useState<JobAnalysis | null>(() => {
    const saved = readStorageState<JobAnalysis | null>('11x_active_job', null);
    return saved ?? analyzeJobDescription(DEFAULT_JOB_DESCRIPTION, DEFAULT_USER_PROFILE);
  });

  const [savedResumes, setSavedResumes] = useState<Resume[]>(() => readStorageState<Resume[]>('11x_saved_resumes', [DEFAULT_RESUME]));

  const [activeResume, setActiveResume] = useState<Resume>(() => savedResumes[0] || DEFAULT_RESUME);

  const [savedApplications, setSavedApplications] = useState<Application[]>(() => readStorageState<Application[]>('11x_saved_applications', DEFAULT_APPLICATIONS));

  const [interviewQuestions, setInterviewQuestions] = useState<InterviewQuestion[]>(() => {
    return generateInterviewQuestions(userProfile, activeJobAnalysis || undefined);
  });

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem('11x_user_profile', JSON.stringify(userProfile));
  }, [userProfile]);

  useEffect(() => {
    if (activeJobAnalysis) {
      localStorage.setItem('11x_active_job', JSON.stringify(activeJobAnalysis));
    }
  }, [activeJobAnalysis]);

  useEffect(() => {
    localStorage.setItem('11x_saved_resumes', JSON.stringify(savedResumes));
  }, [savedResumes]);

  useEffect(() => {
    localStorage.setItem('11x_saved_applications', JSON.stringify(savedApplications));
  }, [savedApplications]);

  const updateUserProfile = (updated: Partial<UserProfile>) => {
    setUserProfile(prev => {
      const next = { ...prev, ...updated };
      // Re-run job analysis against updated profile if active
      if (activeJobAnalysis) {
        const reAnalyzed = analyzeJobDescription(activeJobAnalysis.rawDescription, next);
        setActiveJobAnalysis(reAnalyzed);
      }
      return next;
    });
  };

  const analyzeNewJob = (jdText: string): JobAnalysis => {
    const analysis = analyzeJobDescription(jdText, userProfile);
    setActiveJobAnalysis(analysis);
    setInterviewQuestions(generateInterviewQuestions(userProfile, analysis));
    return analysis;
  };

  const saveResume = (resume: Resume) => {
    setSavedResumes(prev => {
      const exists = prev.some(r => r.id === resume.id);
      if (exists) {
        return prev.map(r => r.id === resume.id ? { ...resume, updatedAt: new Date().toISOString() } : r);
      }
      return [...prev, { ...resume, updatedAt: new Date().toISOString() }];
    });
    setActiveResume(resume);
  };

  const addApplication = (app: Omit<Application, 'id'>) => {
    const newApp: Application = {
      ...app,
      id: `app-${Date.now()}`
    };
    setSavedApplications(prev => [newApp, ...prev]);
  };

  const updateApplicationStatus = (id: string, status: ApplicationStatus) => {
    setSavedApplications(prev => prev.map(a => a.id === id ? { ...a, status } : a));
  };

  const updateQuestionStatus = (id: string, status: InterviewQuestion['status']) => {
    setInterviewQuestions(prev => prev.map(q => q.id === id ? { ...q, status } : q));
  };

  const verifyUserSkill = (skillName: string, status: UserSkill['status'], proficiency?: UserSkill['proficiency']) => {
    setUserProfile(prev => {
      const existingIndex = prev.skills.findIndex(s => s.name.toLowerCase() === skillName.toLowerCase());
      const updatedSkills = [...prev.skills];

      if (existingIndex >= 0) {
        updatedSkills[existingIndex] = {
          ...updatedSkills[existingIndex],
          status,
          proficiency: proficiency || updatedSkills[existingIndex].proficiency
        };
      } else {
        updatedSkills.push({
          id: `sk-${Date.now()}`,
          name: skillName,
          category: 'Technical',
          status,
          proficiency: proficiency || 'Intermediate',
          evidenceIds: []
        });
      }

      const nextProfile = { ...prev, skills: updatedSkills };
      if (activeJobAnalysis) {
        setActiveJobAnalysis(analyzeJobDescription(activeJobAnalysis.rawDescription, nextProfile));
      }
      return nextProfile;
    });
  };

  const addEvidenceToSkill = (skillName: string, evidenceTitle: string, description: string) => {
    const newEvId = `ev-${Date.now()}`;
    const newEvItem = {
      id: newEvId,
      title: evidenceTitle,
      type: 'Project' as const,
      description,
      technologies: [skillName],
      date: new Date().getFullYear().toString()
    };

    setUserProfile(prev => {
      const updatedEv = [newEvItem, ...prev.evidence];
      const updatedSkills = prev.skills.map(s => {
        if (s.name.toLowerCase() === skillName.toLowerCase()) {
          return {
            ...s,
            status: 'verified' as const,
            evidenceIds: Array.from(new Set([...s.evidenceIds, newEvId]))
          };
        }
        return s;
      });

      const nextProfile = { ...prev, evidence: updatedEv, skills: updatedSkills };
      if (activeJobAnalysis) {
        setActiveJobAnalysis(analyzeJobDescription(activeJobAnalysis.rawDescription, nextProfile));
      }
      return nextProfile;
    });
  };

  return (
    <AppContext.Provider
      value={{
        activeView,
        setActiveView,
        userProfile,
        updateUserProfile,
        activeJobAnalysis,
        analyzeNewJob,
        setActiveJobAnalysis,
        savedResumes,
        activeResume,
        setActiveResume,
        saveResume,
        savedApplications,
        addApplication,
        updateApplicationStatus,
        interviewQuestions,
        updateQuestionStatus,
        isStudentMode,
        setIsStudentMode,
        wizardStep,
        setWizardStep,
        verifyUserSkill,
        addEvidenceToSkill
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
