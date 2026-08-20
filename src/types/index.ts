export type PriorityLevel = 'critical' | 'important' | 'useful' | 'bonus';
export type RequirementType = 'must_have' | 'strongly_recommended' | 'nice_to_have' | 'transferable';
export type SkillStatus = 'verified' | 'learning' | 'unverified' | 'need_evidence' | 'not_relevant';
export type ProficiencyLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';

export interface EvidenceItem {
  id: string;
  title: string;
  type: 'Project' | 'Internship' | 'Experience' | 'Certification' | 'Coursework' | 'Research' | 'Achievement';
  description: string;
  technologies: string[];
  link?: string;
  date?: string;
  impactMetrics?: string;
}

export interface UserSkill {
  id: string;
  name: string;
  category: string;
  status: SkillStatus;
  proficiency: ProficiencyLevel;
  evidenceIds: string[];
  notes?: string;
}

export interface WorkExperience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  bullets: string[];
  skillsUsed: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  skills: string[];
  bullets: string[];
  link?: string;
  githubUrl?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  credentialUrl?: string;
  skills: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  coursework?: string[];
  fieldOfStudy: string;
}

export interface UserProfile {
  personalInfo: {
    fullName: string;
    professionalTitle: string;
    email: string;
    phone: string;
    location: string;
    linkedIn?: string;
    github?: string;
    portfolio?: string;
    leetCode?: string;
    hackerRank?: string;
    codeChef?: string;
    bio?: string;
  };
  education: Education[];
  skills: UserSkill[];
  evidence: EvidenceItem[];
  experience: WorkExperience[];
  projects: Project[];
  certifications: Certification[];
  achievements: string[];
  research: string[];
  targetRoles: string[];
  studentDetails?: {
    isStudent: boolean;
    college: string;
    branch: string;
    gradYear: string;
    cgpa: string;
  };
}

export interface JobSkillRequirement {
  skillName: string;
  priority: PriorityLevel;
  category: string;
  requirementType: RequirementType;
}

export interface JobTwin {
  title: string;
  technicalSkills: string[];
  tools: string[];
  responsibilities: string[];
  softSkills: string[];
}

export interface MatchedSkill {
  skillName: string;
  priority: PriorityLevel;
  requirementType: RequirementType;
  userClaim: boolean;
  hasEvidence: boolean;
  evidenceDetails?: string[];
  reason?: string;
  relatedSkillNote?: string;
}

export interface ATSAnalysisResult {
  score: number; // 0-100
  summary: string;
  goodPoints: string[];
  problems: string[];
  fixes: string[];
  recruiterSimulation: {
    easyToFind: string[];
    couldBeClearer: string[];
    difficultToIdentify: string[];
    estimatedScanSeconds: number;
  };
}

export interface JobAnalysis {
  id: string;
  title: string;
  company: string;
  department: string;
  seniority: string;
  industry: string;
  rawDescription: string;
  requirements: {
    technicalSkills: JobSkillRequirement[];
    softSkills: JobSkillRequirement[];
    tools: JobSkillRequirement[];
    certifications: string[];
    education: string;
    experienceYears: string;
  };
  responsibilities: string[];
  keywords: string[];
  jobTwin: JobTwin;
  comparison: {
    alreadyHave: MatchedSkill[];
    needEvidence: MatchedSkill[];
    missing: MatchedSkill[];
    bonus: MatchedSkill[];
  };
  jobMatchScore: number;
  jobReadinessScore: number;
  readinessBreakdown: {
    mustHaveCoverage: number;
    skillEvidence: number;
    resumeAlignment: number;
    interviewReadiness: number;
  };
  atsAnalysis: ATSAnalysisResult;
  createdAt: string;
}

export type TemplateId = 'classic' | 'modern' | 'minimal' | 'student' | 'data-analyst' | 'software-dev' | 'business-analyst';

export interface ResumeSkillCategory {
  category: string;
  items: string[];
}

export interface Resume {
  id: string;
  title: string;
  templateId: TemplateId;
  targetJobId?: string;
  personalInfo: UserProfile['personalInfo'];
  summary: string;
  education: Education[];
  skills: ResumeSkillCategory[];
  experience: WorkExperience[];
  projects: Project[];
  certifications: Certification[];
  achievements?: string[];
  hiddenSections: string[];
  sectionOrder: string[];
  createdAt: string;
  updatedAt: string;
}

export type ApplicationStatus = 'saved' | 'applied' | 'assessment' | 'interview' | 'rejected' | 'offer';

export interface Application {
  id: string;
  company: string;
  jobTitle: string;
  jobUrl?: string;
  dateSaved: string;
  dateApplied?: string;
  resumeId?: string;
  jobMatchScore?: number;
  status: ApplicationStatus;
  notes?: string;
}

export interface InterviewQuestion {
  id: string;
  question: string;
  category: 'HR' | 'Technical' | 'Project' | 'Skill' | 'Resume-specific';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  sourceContext: string;
  suggestedAnswerFramework: string;
  status: 'Not Practiced' | 'Practiced' | 'Confident';
}

export interface CareerRoleInfo {
  title: string;
  overview: string;
  commonTitles: string[];
  coreSkills: string[];
  tools: string[];
  education: string[];
  certifications: string[];
  beginnerRoadmap: string[];
  intermediateRoadmap: string[];
  portfolioIdeas: string[];
  interviewTopics: string[];
  relatedCareers: string[];
}
