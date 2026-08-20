import {
  UserProfile,
  JobAnalysis,
  JobSkillRequirement,
  JobTwin,
  MatchedSkill,
  ATSAnalysisResult,
  InterviewQuestion,
  CareerRoleInfo,
  PriorityLevel,
  RequirementType
} from '../types';

// Predefined database of career roles & skill relationships for Universal Skill Intelligence
const CAREER_DATABASE: Record<string, CareerRoleInfo> = {
  'data analyst': {
    title: 'Data Analyst',
    overview: 'Transforms raw data into actionable insights through statistical analysis, visualization, and SQL querying.',
    commonTitles: ['Business Data Analyst', 'BI Analyst', 'Reporting Analyst', 'Analytics Specialist'],
    coreSkills: ['SQL', 'Python', 'Excel', 'Power BI', 'Statistics', 'Data Visualization'],
    tools: ['Power BI', 'Tableau', 'PostgreSQL', 'Jupyter Notebook', 'Excel (Advanced)'],
    education: ['B.S. in Computer Science, Statistics, Mathematics, Business, or related quantitative field'],
    certifications: ['Microsoft Certified: Power BI Data Analyst Associate', 'Google Data Analytics Certificate'],
    beginnerRoadmap: ['Week 1: Advanced Excel & SQL Queries', 'Week 2: Data Cleaning in Python (Pandas)', 'Week 3: Power BI Dashboards', 'Week 4: Portfolio Project'],
    intermediateRoadmap: ['Week 5: Statistical Modeling & Hypothesis Testing', 'Week 6: SQL Optimization & CTEs', 'Week 7: Tableau / Power BI DAX', 'Week 8: Automated Data Pipelines'],
    portfolioIdeas: ['Sales Performance & Profitability Dashboard', 'Customer Churn Analysis & Segmentation', 'E-commerce Revenue Forecaster'],
    interviewTopics: ['SQL Joins & Aggregations', 'DAX Measures', 'Pandas Dataframes', 'A/B Testing Basics', 'Data Cleaning Strategies'],
    relatedCareers: ['Business Analyst', 'Data Scientist', 'BI Developer', 'Financial Analyst']
  },
  'software engineer': {
    title: 'Software Engineer',
    overview: 'Designs, develops, tests, and maintains scalable software applications and systems.',
    commonTitles: ['Full Stack Developer', 'Backend Engineer', 'Frontend Engineer', 'Systems Developer'],
    coreSkills: ['Data Structures & Algorithms', 'System Design', 'JavaScript/TypeScript', 'Python/Java', 'Git', 'REST APIs'],
    tools: ['VS Code', 'Git/GitHub', 'Docker', 'Postman', 'Node.js/Spring Boot'],
    education: ['B.S. or M.S. in Computer Science, Software Engineering, or equivalent experience'],
    certifications: ['AWS Certified Developer', 'Meta Front-End/Back-End Developer Certificate'],
    beginnerRoadmap: ['Week 1: OOP & DSA Fundamentals', 'Week 2: Version Control & REST API Design', 'Week 3: Database Schemas & ORMs', 'Week 4: Full Stack CRUD App'],
    intermediateRoadmap: ['Week 5: Microservices & Dockerization', 'Week 6: CI/CD Pipelines & Unit Testing', 'Week 7: Caching & Performance Tuning', 'Week 8: System Design Prep'],
    portfolioIdeas: ['Task & Project Management System with Real-Time Auth', 'REST API Gateway with Rate Limiting', 'Developer Portfolio with Interactive Code Playground'],
    interviewTopics: ['Array/Tree Traversal Algorithms', 'RESTful API Conventions', 'Database Normalization', 'Concurrency & Async Programming', 'Clean Code Principles'],
    relatedCareers: ['DevOps Engineer', 'Cloud Engineer', 'Data Engineer', 'Product Manager']
  },
  'business analyst': {
    title: 'Business Analyst',
    overview: 'Bridges business goals and IT capabilities by capturing requirements, mapping processes, and analyzing data.',
    commonTitles: ['Product Analyst', 'Business Systems Analyst', 'Agile Business Analyst', 'Operations Analyst'],
    coreSkills: ['Requirements Gathering', 'Process Mapping (BPMN)', 'SQL', 'User Stories & JIRA', 'Stakeholder Management', 'Data Analysis'],
    tools: ['JIRA', 'Confluence', 'Visio / Lucidchart', 'Excel', 'Tableau / Power BI'],
    education: ['B.S. in Business Administration, Information Systems, or Engineering'],
    certifications: ['ECBA / CCBA (IIBA)', 'PMI-PBA (Project Management Institute)'],
    beginnerRoadmap: ['Week 1: Requirement Gathering Techniques', 'Week 2: Process Flowcharting & Use Cases', 'Week 3: Basic SQL & Excel Pivot Tables', 'Week 4: BRD & PRD Documentation Project'],
    intermediateRoadmap: ['Week 5: Agile/Scrum Ceremonies & Backlog Grooming', 'Week 6: Gap Analysis & Feasibility Studies', 'Week 7: Data Modeling for Business Rules', 'Week 8: UAT Planning'],
    portfolioIdeas: ['Banking System Digital Transformation BRD', 'Customer Onboarding Process Optimization Blueprint', 'Supply Chain Bottleneck Analysis'],
    interviewTopics: ['BRD vs PRD', 'Handling Scope Creep', 'Requirement Prioritization (MoSCoW)', 'Agile vs Waterfall', 'Stakeholder Conflict Resolution'],
    relatedCareers: ['Data Analyst', 'Product Owner', 'Project Manager', 'Systems Analyst']
  },
  'mechanical engineer': {
    title: 'Mechanical Design Engineer',
    overview: 'Designs, analyzes, and tests mechanical systems, components, and thermal-fluid machinery.',
    commonTitles: ['CAD Designer', 'Mechanical Systems Engineer', 'Thermal Engineer', 'Product Design Engineer'],
    coreSkills: ['SolidWorks / AutoCAD', 'FEA (Finite Element Analysis)', 'GD&T', 'Thermodynamics', 'Materials Selection', 'Manufacturing Processes'],
    tools: ['SolidWorks', 'ANSYS', 'AutoCAD', 'MATLAB', '3D Printing / CNC'],
    education: ['B.S. in Mechanical Engineering or Materials Science'],
    certifications: ['Certified SolidWorks Associate/Professional (CSWA/CSWP)', 'FE (Fundamentals of Engineering) Exam'],
    beginnerRoadmap: ['Week 1: SolidWorks 3D Modeling & Assembly', 'Week 2: Engineering Drawing & GD&T Rules', 'Week 3: Stress Analysis with ANSYS', 'Week 4: CAD Prototype Project'],
    intermediateRoadmap: ['Week 5: DFM/DFA (Design for Manufacturing/Assembly)', 'Week 6: Thermal & Fluid Simulation', 'Week 7: Tolerance Stack-Up Analysis', 'Week 8: Physical Prototyping & Testing'],
    portfolioIdeas: ['Robotic Arm CAD Assembly & FEA Stress Report', 'Drone Chassis Lightweight Structural Optimization', 'Automotive Gearbox Thermal Dissipation Model'],
    interviewTopics: ['GD&T Symbols & Datums', 'Von Mises Stress Analysis', 'Material Failure Theories', 'CAD Mates & Tolerances', 'Machining Processes (Lathe, CNC)'],
    relatedCareers: ['Automotive Engineer', 'Aerospace Engineer', 'Robotics Engineer', 'Manufacturing Engineer']
  },
  'ux designer': {
    title: 'UI/UX Designer',
    overview: 'Crafts intuitive, user-centered digital interfaces and end-to-end product experiences through research and prototyping.',
    commonTitles: ['Product Designer', 'Interaction Designer', 'User Researcher', 'Visual Designer'],
    coreSkills: ['User Research', 'Wireframing', 'Interactive Prototyping', 'Design Systems', 'Usability Testing', 'Information Architecture'],
    tools: ['Figma', 'Adobe XD', 'Miro', 'Maze', 'Balsamiq'],
    education: ['B.S. or Design Degree in HCI, Graphic Design, Digital Media, or equivalent portfolio'],
    certifications: ['Google UX Design Professional Certificate', 'Nielsen Norman Group UX Certification'],
    beginnerRoadmap: ['Week 1: User Persona & Journey Mapping', 'Week 2: Low-Fidelity Wireframes in Figma', 'Week 3: Interactive High-Fidelity Design', 'Week 4: Usability Testing & Case Study'],
    intermediateRoadmap: ['Week 5: Design System Tokenization', 'Week 6: Micro-interactions & Motion UX', 'Week 7: Accessibility (WCAG 2.1) Auditing', 'Week 8: Full SaaS Case Study'],
    portfolioIdeas: ['Fintech Mobile App Redesign for Gen Z', 'Healthcare Telemedicine Appointment Portal', 'E-commerce Checkout Friction Reduction Case Study'],
    interviewTopics: ['Design Thinking Process', 'Usability Heuristics (Nielsen)', 'Figma Auto-Layout & Components', 'A/B Testing Layouts', 'Handling Feedback'],
    relatedCareers: ['Product Manager', 'Frontend Developer', 'Graphic Designer', 'Brand Strategist']
  }
};

// Generic phrase patterns for truthfulness auditing
const GENERIC_PHRASES = [
  'hardworking',
  'passionate',
  'quick learner',
  'team player',
  'good communication',
  'highly motivated',
  'responsible',
  'detail oriented',
  'self starter',
  'results driven',
  'good knowledge of python',
  'familiar with sql',
  'worked on projects'
];

/**
 * Universal Job Description Analyzer & Skill Intelligence Layer
 */
export function analyzeJobDescription(rawText: string, userProfile: UserProfile): JobAnalysis {
  const textLower = rawText.toLowerCase();

  // Extract Job Title
  let title = 'Target Career Role';
  const titleMatch = rawText.match(/(?:title|role|position):\s*([^\n\r]+)/i) ||
    rawText.match(/^([^\n\r]{3,50})/);
  if (titleMatch && titleMatch[1]) {
    title = titleMatch[1].trim();
  } else if (textLower.includes('data analyst')) title = 'Data Analyst';
  else if (textLower.includes('software engineer') || textLower.includes('full stack')) title = 'Software Engineer';
  else if (textLower.includes('business analyst')) title = 'Business Analyst';
  else if (textLower.includes('mechanical')) title = 'Mechanical Engineer';
  else if (textLower.includes('ux') || textLower.includes('ui design')) title = 'UI/UX Designer';
  else if (textLower.includes('cybersecurity')) title = 'Cybersecurity Analyst';
  else if (textLower.includes('cloud')) title = 'Cloud Engineer';
  else if (textLower.includes('marketing')) title = 'Digital Marketing Specialist';

  // Industry & Department Detection
  let industry = 'Technology & Software';
  if (textLower.includes('health') || textLower.includes('medical') || textLower.includes('clinical')) industry = 'Healthcare & Life Sciences';
  else if (textLower.includes('bank') || textLower.includes('finance') || textLower.includes('investment')) industry = 'Finance & Banking';
  else if (textLower.includes('manufacturing') || textLower.includes('automotive') || textLower.includes('cad')) industry = 'Engineering & Manufacturing';
  else if (textLower.includes('retail') || textLower.includes('e-commerce') || textLower.includes('sales')) industry = 'Retail & E-commerce';

  let seniority = 'Mid-Level';
  if (textLower.includes('senior') || textLower.includes('lead') || textLower.includes('principal')) seniority = 'Senior Level';
  else if (textLower.includes('junior') || textLower.includes('intern') || textLower.includes('fresher') || textLower.includes('entry level')) seniority = 'Entry Level / Fresher';

  // Dynamic Skill Extraction Layer
  const extractedSkills: JobSkillRequirement[] = [];

  const skillDictionary: Array<{ name: string; category: string; priority: PriorityLevel; type: RequirementType; keywords: string[] }> = [
    { name: 'SQL', category: 'Databases & Querying', priority: 'critical', type: 'must_have', keywords: ['sql', 'postgresql', 'mysql', 'queries', 'database', 'tsql'] },
    { name: 'Python', category: 'Programming Languages', priority: 'critical', type: 'must_have', keywords: ['python', 'pandas', 'numpy', 'scikit', 'pyspark'] },
    { name: 'Power BI', category: 'BI & Visualization', priority: 'critical', type: 'must_have', keywords: ['power bi', 'powerbi', 'dax', 'power query'] },
    { name: 'Tableau', category: 'BI & Visualization', priority: 'important', type: 'strongly_recommended', keywords: ['tableau', 'tableau server', 'visualizations'] },
    { name: 'Excel', category: 'Spreadsheets & Analysis', priority: 'important', type: 'must_have', keywords: ['excel', 'pivot tables', 'vlookup', 'xlookup', 'vba'] },
    { name: 'Statistics & Data Modeling', category: 'Analytics Fundamentals', priority: 'important', type: 'must_have', keywords: ['statistics', 'statistical', 'hypothesis', 'regression', 'data modeling'] },
    { name: 'Data Visualization', category: 'Reporting', priority: 'critical', type: 'must_have', keywords: ['visualization', 'dashboards', 'charts', 'plots', 'reporting'] },
    { name: 'Communication & Stakeholder Management', category: 'Soft Skills', priority: 'important', type: 'must_have', keywords: ['communication', 'stakeholder', 'presentation', 'cross-functional'] },
    { name: 'Problem Solving', category: 'Soft Skills', priority: 'critical', type: 'must_have', keywords: ['problem solving', 'analytical thinking', 'troubleshooting'] },
    { name: 'Git & Version Control', category: 'Tools & Platforms', priority: 'important', type: 'strongly_recommended', keywords: ['git', 'github', 'gitlab', 'version control'] },
    { name: 'Docker & Containers', category: 'DevOps & Cloud', priority: 'useful', type: 'nice_to_have', keywords: ['docker', 'containers', 'kubernetes'] },
    { name: 'AWS / Cloud Computing', category: 'DevOps & Cloud', priority: 'bonus', type: 'nice_to_have', keywords: ['aws', 'cloud', 'azure', 'gcp'] },
    { name: 'A/B Testing', category: 'Analytics Fundamentals', priority: 'useful', type: 'nice_to_have', keywords: ['a/b testing', 'experimentation', 'hypothesis testing'] },
    { name: 'SolidWorks', category: 'CAD & 3D Engineering', priority: 'critical', type: 'must_have', keywords: ['solidworks', 'cad', '3d modeling', 'assembly'] },
    { name: 'GD&T', category: 'Manufacturing & Drafting', priority: 'important', type: 'must_have', keywords: ['gd&t', 'tolerances', 'dimensioning', 'drafting'] },
    { name: 'Figma', category: 'UI/UX Design Tools', priority: 'critical', type: 'must_have', keywords: ['figma', 'wireframing', 'prototyping', 'auto-layout'] }
  ];

  skillDictionary.forEach(item => {
    const isPresent = item.keywords.some(kw => textLower.includes(kw));
    if (isPresent) {
      extractedSkills.push({
        skillName: item.name,
        priority: item.priority,
        category: item.category,
        requirementType: item.type
      });
    }
  });

  // Fallback defaults if few matched
  if (extractedSkills.length < 3) {
    extractedSkills.push(
      { skillName: 'SQL', priority: 'critical', category: 'Databases', requirementType: 'must_have' },
      { skillName: 'Data Analysis', priority: 'critical', category: 'Technical', requirementType: 'must_have' },
      { skillName: 'Problem Solving', priority: 'important', category: 'Soft Skills', requirementType: 'must_have' },
      { skillName: 'Communication', priority: 'important', category: 'Soft Skills', requirementType: 'strongly_recommended' },
      { skillName: 'Excel', priority: 'useful', category: 'Tools', requirementType: 'nice_to_have' }
    );
  }

  // Generate Job Twin
  const techSkillsList = extractedSkills.filter(s => s.category !== 'Soft Skills').map(s => s.skillName);
  const softSkillsList = extractedSkills.filter(s => s.category === 'Soft Skills').map(s => s.skillName);
  const toolsList = Array.from(new Set(extractedSkills.filter(s => s.category.includes('Tools') || s.category.includes('BI') || s.category.includes('CAD')).map(s => s.skillName)));

  const jobTwin: JobTwin = {
    title,
    technicalSkills: techSkillsList,
    tools: toolsList.length > 0 ? toolsList : ['Power BI', 'SQL Server', 'Excel'],
    responsibilities: [
      'Analyze business datasets to identify key trends, risks, and actionable operational insights.',
      'Build and maintain interactive performance dashboards for leadership and cross-functional teams.',
      'Collaborate with product and business stakeholders to turn vague requirements into technical specifications.',
      'Perform data quality checks, data cleaning, and statistical validation on high-volume data streams.'
    ],
    softSkills: softSkillsList.length > 0 ? softSkillsList : ['Communication', 'Problem Solving', 'Teamwork']
  };

  // Compare Profile against Job Requirements
  const userSkillNames = new Set(userProfile.skills.map(s => s.name.toLowerCase()));
  const userVerifiedSkills = new Set(userProfile.skills.filter(s => s.status === 'verified').map(s => s.name.toLowerCase()));
  const userEvidenceSkillNames = new Set<string>();
  userProfile.evidence.forEach(ev => {
    ev.technologies.forEach(t => userEvidenceSkillNames.add(t.toLowerCase()));
  });
  userProfile.projects.forEach(p => {
    p.skills.forEach(s => userEvidenceSkillNames.add(s.toLowerCase()));
  });

  const alreadyHave: MatchedSkill[] = [];
  const needEvidence: MatchedSkill[] = [];
  const missing: MatchedSkill[] = [];
  const bonus: MatchedSkill[] = [];

  extractedSkills.forEach(req => {
    const nameLower = req.skillName.toLowerCase();
    const hasUserSkillClaim = userSkillNames.has(nameLower);
    const hasVerified = userVerifiedSkills.has(nameLower);
    const hasConcreteEvidence = userEvidenceSkillNames.has(nameLower);

    const matchObj: MatchedSkill = {
      skillName: req.skillName,
      priority: req.priority,
      requirementType: req.requirementType,
      userClaim: hasUserSkillClaim,
      hasEvidence: hasConcreteEvidence,
      evidenceDetails: hasConcreteEvidence ? ['Demonstrated in verified project or work experience'] : undefined
    };

    if (hasVerified && hasConcreteEvidence) {
      alreadyHave.push(matchObj);
    } else if (hasUserSkillClaim && !hasConcreteEvidence) {
      matchObj.reason = `${req.skillName} appears in your skills list, but your resume lacks strong project/work evidence demonstrating practical usage.`;
      needEvidence.push(matchObj);
    } else {
      matchObj.reason = `Required by target position (${req.priority.toUpperCase()}) but not found in your master career profile.`;
      if (req.priority === 'bonus') {
        bonus.push(matchObj);
      } else {
        missing.push(matchObj);
      }
    }
  });

  // Calculate Job Match & Job Readiness Scores
  const totalReqs = extractedSkills.length;
  const matchCount = alreadyHave.length + needEvidence.length * 0.5;
  const jobMatchScore = Math.min(98, Math.max(45, Math.round((matchCount / Math.max(1, totalReqs)) * 100)));

  const mustHaves = extractedSkills.filter(s => s.requirementType === 'must_have');
  const verifiedMustHaves = mustHaves.filter(m => userVerifiedSkills.has(m.skillName.toLowerCase()));
  const mustHaveCoverage = Math.round((verifiedMustHaves.length / Math.max(1, mustHaves.length)) * 100);

  const totalEvidenceCount = alreadyHave.length;
  const skillEvidence = Math.round((totalEvidenceCount / Math.max(1, extractedSkills.length)) * 100);
  const resumeAlignment = Math.min(96, Math.max(50, jobMatchScore + 5));
  const interviewReadiness = Math.round((alreadyHave.length / Math.max(1, extractedSkills.length)) * 75 + 15);

  const jobReadinessScore = Math.round((mustHaveCoverage * 0.35) + (skillEvidence * 0.25) + (resumeAlignment * 0.25) + (interviewReadiness * 0.15));

  // ATS Diagnostic Simulation
  const atsAnalysis: ATSAnalysisResult = {
    score: Math.min(95, Math.max(65, Math.round(jobMatchScore * 0.95))),
    summary: `Your resume demonstrates good foundational alignment with ${title} positions, but key keyword density and empirical project evidence can be strengthened.`,
    goodPoints: [
      'Standard font hierarchy and standard section headings detected.',
      'No complex multi-column clipping issues detected.',
      'Contact information (Email, LinkedIn, GitHub) is clearly parseable.'
    ],
    problems: [
      needEvidence.length > 0 ? `${needEvidence.length} claimed skill(s) lack empirical project metrics (e.g. ${needEvidence.slice(0, 2).map(s => s.skillName).join(', ')})` : 'Minor missing keywords from target job description.',
      missing.length > 0 ? `Missing key required keywords: ${missing.slice(0, 3).map(s => s.skillName).join(', ')}.` : 'Some bullet points use passive descriptions rather than action verbs.'
    ],
    fixes: [
      'Connect listed skills to real project bullet points with quantified outcomes.',
      'Add missing critical tools to your learning roadmap and complete short evidence projects.',
      'Replace generic phrases like "hardworking" or "responsible" with metrics and achievements.'
    ],
    recruiterSimulation: {
      easyToFind: ['Candidate Name', 'Target Role Title', 'Education & Graduation Year', 'Primary Technical Skills (SQL, Python)'],
      couldBeClearer: ['Project impact metrics & dataset sizes', 'Specific tools used in each experience bullet'],
      difficultToIdentify: ['Quantified outcomes ($ saved, % efficiency gained)', 'Verifiable certification links'],
      estimatedScanSeconds: 6
    }
  };

  return {
    id: `job-${Date.now()}`,
    title,
    company: rawText.includes('Company:') ? rawText.split('Company:')[1].split('\n')[0].trim() : 'Leading Enterprise',
    department: 'Engineering & Data',
    seniority,
    industry,
    rawDescription: rawText,
    requirements: {
      technicalSkills: extractedSkills.filter(s => s.category !== 'Soft Skills'),
      softSkills: extractedSkills.filter(s => s.category === 'Soft Skills'),
      tools: extractedSkills.filter(s => s.category.includes('Tools') || s.category.includes('BI')),
      certifications: ['Power BI Certified', 'AWS Cloud Practitioner'],
      education: 'Bachelor degree in related discipline',
      experienceYears: '0-3 years'
    },
    responsibilities: jobTwin.responsibilities,
    keywords: extractedSkills.map(s => s.skillName),
    jobTwin,
    comparison: {
      alreadyHave,
      needEvidence,
      missing,
      bonus
    },
    jobMatchScore,
    jobReadinessScore,
    readinessBreakdown: {
      mustHaveCoverage,
      skillEvidence,
      resumeAlignment,
      interviewReadiness
    },
    atsAnalysis,
    createdAt: new Date().toISOString()
  };
}

/**
 * Generic Phrase Detector & Evidence Prompt Generator
 */
export function detectGenericPhrases(text: string): Array<{ phrase: string; question: string; exampleFix: string }> {
  const textLower = text.toLowerCase();
  const matches: Array<{ phrase: string; question: string; exampleFix: string }> = [];

  GENERIC_PHRASES.forEach(phrase => {
    if (textLower.includes(phrase)) {
      let question = `Where did you demonstrate "${phrase}"?`;
      let exampleFix = `Instead of "${phrase}", describe the specific action and result.`;

      if (phrase === 'team player' || phrase === 'worked on projects') {
        question = 'How many teammates did you collaborate with, and what was your specific contribution?';
        exampleFix = 'Collaborated with 4 engineers to design and deliver a full-stack dashboard within 3 weeks.';
      } else if (phrase === 'hardworking' || phrase === 'highly motivated') {
        question = 'What difficult milestone or deadline did you achieve through persistence?';
        exampleFix = 'Completed 50+ database optimizations and reduced query execution time by 40%.';
      } else if (phrase.includes('python') || phrase.includes('sql')) {
        question = `What specific project or dataset size did you process using ${phrase.toUpperCase()}?`;
        exampleFix = 'Utilized Python (Pandas/NumPy) to clean and analyze 25,000+ customer transactions.';
      }

      matches.push({ phrase, question, exampleFix });
    }
  });

  return matches;
}

/**
 * Generate Contextual Resume-to-Interview Questions (Strictly from user resume + target job)
 */
export function generateInterviewQuestions(userProfile: UserProfile, jobAnalysis?: JobAnalysis): InterviewQuestion[] {
  const questions: InterviewQuestion[] = [];

  // HR Question
  questions.push({
    id: 'q-1',
    question: `Tell me about yourself and why you are interested in the ${jobAnalysis?.title || 'target'} role.`,
    category: 'HR',
    difficulty: 'Beginner',
    sourceContext: 'Standard Introduction',
    suggestedAnswerFramework: 'Use the Present-Past-Future model: (1) Current background & key strengths, (2) Relevant project/work highlight, (3) Why this specific position aligns with your career goals.',
    status: 'Not Practiced'
  });

  // Project Question based on user's actual project
  if (userProfile.projects.length > 0) {
    const p = userProfile.projects[0];
    questions.push({
      id: 'q-2',
      question: `In your project "${p.title}", what was the most technical challenge you faced and how did you resolve it?`,
      category: 'Project',
      difficulty: 'Intermediate',
      sourceContext: `User Project: ${p.title}`,
      suggestedAnswerFramework: `Structure using STAR method: Situation (project goal), Task (your role with ${p.skills.slice(0, 2).join(', ')}), Action (how you debugged or optimized), Result (the outcome).`,
      status: 'Not Practiced'
    });
  }

  // Skill Question based on claimed skill
  const topSkill = userProfile.skills.find(s => s.status === 'verified') || userProfile.skills[0];
  if (topSkill) {
    questions.push({
      id: 'q-3',
      question: `How do you handle data edge cases, missing values, or performance bottlenecks when working with ${topSkill.name}?`,
      category: 'Skill',
      difficulty: 'Intermediate',
      sourceContext: `Verified Skill: ${topSkill.name}`,
      suggestedAnswerFramework: `Explain standard techniques (imputation, indexing, modular code), give a 30-second real scenario where you implemented this in ${topSkill.name}.`,
      status: 'Not Practiced'
    });
  }

  // Technical Question based on target job
  if (jobAnalysis) {
    const reqSkill = jobAnalysis.requirements.technicalSkills[0]?.skillName || 'SQL';
    questions.push({
      id: 'q-4',
      question: `Explain how you would write an optimized ${reqSkill} query/script to aggregate monthly performance metrics for executive reporting.`,
      category: 'Technical',
      difficulty: 'Advanced',
      sourceContext: `Target Job Requirement: ${reqSkill}`,
      suggestedAnswerFramework: `Step 1: Group By & Aggregations. Step 2: Handling null values & CTEs. Step 3: Indexing considerations for high performance.`,
      status: 'Not Practiced'
    });
  }

  // Resume-specific Question
  questions.push({
    id: 'q-5',
    question: `Walk me through a time when you received constructive feedback on your code/analysis and how you implemented the changes.`,
    category: 'Resume-specific',
    difficulty: 'Intermediate',
    sourceContext: 'Behavioral & Peer Review',
    suggestedAnswerFramework: 'Focus on openness, speed of adaptation, and building automated validation tests so the issue never reoccurred.',
    status: 'Not Practiced'
  });

  return questions;
}

/**
 * Get Career Exploration Info
 */
export function getCareerRoleInfo(query: string): CareerRoleInfo {
  const key = query.toLowerCase().trim();
  for (const roleKey of Object.keys(CAREER_DATABASE)) {
    if (key.includes(roleKey) || roleKey.includes(key)) {
      return CAREER_DATABASE[roleKey];
    }
  }
  // Default fallback Data Analyst
  return CAREER_DATABASE['data analyst'];
}

/**
 * Skill Equivalency Checker
 */
export function checkSkillEquivalency(requiredSkill: string, userSkill: string): { isEquivalent: boolean; note: string } {
  const req = requiredSkill.toLowerCase();
  const usr = userSkill.toLowerCase();

  if (req === usr) return { isEquivalent: true, note: 'Exact skill match!' };

  if ((req.includes('power bi') && usr.includes('tableau')) || (req.includes('tableau') && usr.includes('power bi'))) {
    return {
      isEquivalent: false,
      note: '🟡 Related BI Skill: Power BI and Tableau are both top business intelligence platforms, but use different query formulas (DAX vs Tableau Calculations). Transferable concepts!'
    };
  }

  if ((req.includes('postgresql') && usr.includes('mysql')) || (req.includes('mysql') && usr.includes('postgresql'))) {
    return {
      isEquivalent: false,
      note: '🟢 High Transferability: MySQL and PostgreSQL share standard SQL ANSI syntax, though PostgreSQL has richer JSON and indexing features.'
    };
  }

  return {
    isEquivalent: false,
    note: `${requiredSkill} and ${userSkill} are distinct technologies. Review fundamentals before listing on your resume.`
  };
}

/**
 * Generate 4-Week Skill Roadmap
 */
export function generateSkillRoadmap(skillName: string): { week: string; topic: string; task: string }[] {
  return [
    { week: 'Week 1', topic: `${skillName} Core Fundamentals`, task: `Master syntax, basic functions, and core concepts of ${skillName}.` },
    { week: 'Week 2', topic: `Intermediate Applied ${skillName}`, task: `Work with real-world datasets/scenarios, handling edge cases and errors.` },
    { week: 'Week 3', topic: `Advanced Patterns & Best Practices`, task: `Learn optimization, modular structuring, and industry standards.` },
    { week: 'Week 4', topic: `Portfolio Evidence Project`, task: `Build an end-to-end open-source project demonstrating ${skillName} with clear README documentation.` }
  ];
}
