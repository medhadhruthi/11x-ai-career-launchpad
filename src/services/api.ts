import { UserProfile, Resume, Application } from '../types';

const API_BASE_URL = '/api';

function getAuthHeader(): Record<string, string> {
  const token = localStorage.getItem('11x_auth_token');
  return token ? { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } : { 'Content-Type': 'application/json' };
}

export const api = {
  // Auth
  async login(email: string, password: string) {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Login failed.');
    }
    const data = await res.json();
    if (data.token) {
      localStorage.setItem('11x_auth_token', data.token);
    }
    return data;
  },

  async signup(name: string, email: string, password: string) {
    const res = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Sign up failed.');
    }
    const data = await res.json();
    if (data.token) {
      localStorage.setItem('11x_auth_token', data.token);
    }
    return data;
  },

  async getMe() {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/me`, { headers: getAuthHeader() });
      if (res.ok) return await res.json();
    } catch {
      console.warn('API backend offline, running in offline state.');
    }
    return null;
  },

  // Master Profile Sync
  async fetchProfile(): Promise<UserProfile | null> {
    try {
      const res = await fetch(`${API_BASE_URL}/profile`, { headers: getAuthHeader() });
      if (res.ok) {
        const data = await res.json();
        return data.profile;
      }
    } catch {
      console.warn('Backend server offline, fallback to LocalStorage');
    }
    return null;
  },

  async updateProfile(profile: UserProfile): Promise<boolean> {
    try {
      const res = await fetch(`${API_BASE_URL}/profile`, {
        method: 'PUT',
        headers: getAuthHeader(),
        body: JSON.stringify(profile)
      });
      return res.ok;
    } catch {
      return false;
    }
  },

  // Resumes Sync
  async fetchResumes(): Promise<Resume[] | null> {
    try {
      const res = await fetch(`${API_BASE_URL}/resumes`, { headers: getAuthHeader() });
      if (res.ok) {
        const data = await res.json();
        return data.resumes;
      }
    } catch {
      console.warn('Backend server offline');
    }
    return null;
  },

  async saveResume(resume: Resume): Promise<boolean> {
    try {
      const res = await fetch(`${API_BASE_URL}/resumes`, {
        method: 'POST',
        headers: getAuthHeader(),
        body: JSON.stringify(resume)
      });
      return res.ok;
    } catch {
      return false;
    }
  },

  // Applications CRM Sync
  async fetchApplications(): Promise<Application[] | null> {
    try {
      const res = await fetch(`${API_BASE_URL}/applications`, { headers: getAuthHeader() });
      if (res.ok) {
        const data = await res.json();
        return data.applications;
      }
    } catch {
      console.warn('Backend server offline');
    }
    return null;
  },

  async saveApplication(app: Application): Promise<boolean> {
    try {
      const res = await fetch(`${API_BASE_URL}/applications`, {
        method: 'POST',
        headers: getAuthHeader(),
        body: JSON.stringify(app)
      });
      return res.ok;
    } catch {
      return false;
    }
  }
};
