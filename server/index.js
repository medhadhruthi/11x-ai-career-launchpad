import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Database } from './db.js';

const app = express();
const PORT = Number(process.env.PORT) || 5000;
const JWT_SECRET = process.env.JWT_SECRET;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (!JWT_SECRET) {
  console.error('JWT_SECRET is required. Set it in your environment before starting the app.');
  process.exit(1);
}

const allowedOrigin = process.env.CORS_ORIGIN;
app.use(cors({
  origin: allowedOrigin ? allowedOrigin.split(',').map(origin => origin.trim()) : false,
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));

// Middleware: Verify JWT Authentication Token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

  if (!token) {
    return res.status(401).json({ error: 'Authentication required.' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid or expired token.' });
    }
    req.user = decoded;
    next();
  });
}

// ----------------------------------------------------
// 1. AUTHENTICATION REST ENDPOINTS
// ----------------------------------------------------

// Sign Up
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Name, email, and password are required.' });
    }

    const existingUser = Database.findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: 'An account with this email already exists.' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = {
      id: `usr-${Date.now()}`,
      name,
      email,
      passwordHash,
      createdAt: new Date().toISOString()
    };

    Database.createUser(newUser);

    const token = jwt.sign({ id: newUser.id, email: newUser.email, name: newUser.name }, JWT_SECRET, { expiresIn: '7d' });
    const { passwordHash: _, ...userSafe } = newUser;

    return res.json({ token, user: userSafe });
  } catch (err) {
    console.error('Signup error:', err);
    return res.status(500).json({ error: 'Internal server error during sign up.' });
  }
});

// Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    const user = Database.findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);

    if (!isValid) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, JWT_SECRET, { expiresIn: '7d' });
    const { passwordHash: _, ...userSafe } = user;

    return res.json({ token, user: userSafe });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ error: 'Internal server error during login.' });
  }
});

// Get Current User Profile payload
app.get('/api/auth/me', authenticateToken, (req, res) => {
  const user = Database.findUserById(req.user.id);
  if (!user) {
    return res.json({ user: req.user });
  }
  const { passwordHash: _, ...userSafe } = user;
  return res.json({ user: userSafe });
});

// ----------------------------------------------------
// 2. MASTER CAREER PROFILE ENDPOINTS
// ----------------------------------------------------

app.get('/api/profile', authenticateToken, (req, res) => {
  const profile = Database.getProfile(req.user.id);
  return res.json({ profile });
});

app.put('/api/profile', authenticateToken, (req, res) => {
  const profileData = req.body;
  const saved = Database.saveProfile(req.user.id, profileData);
  return res.json({ profile: saved, message: 'Master Career Profile updated successfully.' });
});

// ----------------------------------------------------
// 3. JOB ANALYSIS ENDPOINTS
// ----------------------------------------------------

app.post('/api/jobs/analyze', authenticateToken, (req, res) => {
  const { jobText, userProfile } = req.body;
  if (!jobText) {
    return res.status(400).json({ error: 'Job description text is required.' });
  }

  // Dynamic analysis payload
  const analysis = {
    id: `job-${Date.now()}`,
    title: jobText.toLowerCase().includes('data analyst') ? 'Data Analyst' : 'Target Career Role',
    company: 'Enterprise Partner',
    rawDescription: jobText,
    createdAt: new Date().toISOString()
  };

  Database.saveJobAnalysis(req.user.id, analysis);
  return res.json({ analysis, message: 'Job analyzed successfully.' });
});

app.get('/api/jobs', authenticateToken, (req, res) => {
  const jobs = Database.getJobAnalyses(req.user.id);
  return res.json({ jobs });
});

// ----------------------------------------------------
// 4. RESUME ENDPOINTS
// ----------------------------------------------------

app.get('/api/resumes', authenticateToken, (req, res) => {
  const resumes = Database.getResumes(req.user.id);
  return res.json({ resumes });
});

app.post('/api/resumes', authenticateToken, (req, res) => {
  const resume = req.body;
  if (!resume || !resume.title) {
    return res.status(400).json({ error: 'Resume data and title are required.' });
  }
  const saved = Database.saveResume(req.user.id, resume);
  return res.json({ resume: saved, message: 'Resume saved successfully.' });
});

app.delete('/api/resumes/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  const success = Database.deleteResume(req.user.id, id);
  return res.json({ success, message: 'Resume deleted.' });
});

// ----------------------------------------------------
// 5. APPLICATION CRM ENDPOINTS
// ----------------------------------------------------

app.get('/api/applications', authenticateToken, (req, res) => {
  const applications = Database.getApplications(req.user.id);
  return res.json({ applications });
});

app.post('/api/applications', authenticateToken, (req, res) => {
  const appData = req.body;
  const newApp = {
    ...appData,
    id: appData.id || `app-${Date.now()}`,
    dateSaved: appData.dateSaved || new Date().toISOString().split('T')[0]
  };
  const saved = Database.saveApplication(req.user.id, newApp);
  return res.json({ application: saved, message: 'Application tracked.' });
});

app.patch('/api/applications/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const updated = Database.updateApplicationStatus(req.user.id, id, status);
  return res.json({ application: updated });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    product: '11X AI Career Launchpad REST API',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Serve the Vite build when the API and frontend share a deployment.
app.use(express.static(path.join(__dirname, '../dist')));
app.get('*', (req, res) => {
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ error: 'API route not found.' });
  }
  return res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 11X AI Career Launchpad Express Backend API running on http://localhost:${PORT}`);
});
