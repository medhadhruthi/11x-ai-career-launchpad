import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_FILE = path.join(__dirname, 'database_data.json');

// In-memory schema + disk persistence layer
let db = {
  users: [
    {
      id: 'usr-1',
      name: 'Alex Vance',
      email: 'alex.vance@example.com',
      // Default demo password "password123" (hashed)
      passwordHash: '$2a$10$wE4L2wV4iR5x8nQd9H1J9.5YyV3X2Z1W0v9u8t7r6q5p4o3n2m1k0',
      createdAt: new Date().toISOString()
    }
  ],
  career_profiles: {},
  resumes: {},
  job_analyses: {},
  applications: {},
  interview_sessions: {}
};

// Load existing database from file if present
function initDb() {
  try {
    if (fs.existsSync(DB_FILE)) {
      const data = fs.readFileSync(DB_FILE, 'utf-8');
      db = JSON.parse(data);
      console.log('✅ Local Database loaded successfully from file.');
    } else {
      saveDb();
      console.log('✅ New Local Database initialized.');
    }
  } catch (err) {
    console.error('Error loading DB file, initializing fresh DB:', err);
  }
}

function saveDb() {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving DB file:', err);
  }
}

initDb();

export const Database = {
  getUsers: () => db.users,
  findUserByEmail: (email) => db.users.find(u => u.email.toLowerCase() === email.toLowerCase()),
  findUserById: (id) => db.users.find(u => u.id === id),
  createUser: (user) => {
    db.users.push(user);
    saveDb();
    return user;
  },
  getProfile: (userId) => db.career_profiles[userId] || null,
  saveProfile: (userId, profileData) => {
    db.career_profiles[userId] = profileData;
    saveDb();
    return profileData;
  },
  getResumes: (userId) => db.resumes[userId] || [],
  saveResume: (userId, resume) => {
    if (!db.resumes[userId]) db.resumes[userId] = [];
    const list = db.resumes[userId];
    const idx = list.findIndex(r => r.id === resume.id);
    if (idx >= 0) {
      list[idx] = { ...resume, updatedAt: new Date().toISOString() };
    } else {
      list.push({ ...resume, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
    }
    saveDb();
    return resume;
  },
  deleteResume: (userId, resumeId) => {
    if (!db.resumes[userId]) return false;
    db.resumes[userId] = db.resumes[userId].filter(r => r.id !== resumeId);
    saveDb();
    return true;
  },
  getJobAnalyses: (userId) => db.job_analyses[userId] || [],
  saveJobAnalysis: (userId, analysis) => {
    if (!db.job_analyses[userId]) db.job_analyses[userId] = [];
    db.job_analyses[userId].unshift(analysis);
    saveDb();
    return analysis;
  },
  getApplications: (userId) => db.applications[userId] || [],
  saveApplication: (userId, app) => {
    if (!db.applications[userId]) db.applications[userId] = [];
    const list = db.applications[userId];
    const idx = list.findIndex(a => a.id === app.id);
    if (idx >= 0) {
      list[idx] = app;
    } else {
      list.unshift(app);
    }
    saveDb();
    return app;
  },
  updateApplicationStatus: (userId, appId, status) => {
    if (!db.applications[userId]) return null;
    const app = db.applications[userId].find(a => a.id === appId);
    if (app) {
      app.status = status;
      saveDb();
    }
    return app;
  }
};
