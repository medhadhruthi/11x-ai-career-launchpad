# 11X AI Career Launchpad

**From Job Description to Job Readiness.**

11X AI Career Launchpad is a career intelligence workspace that helps a candidate move from a raw job description to a targeted, evidence-backed application. It combines job analysis, skill-gap discovery, resume building, interview preparation, and application tracking in one workflow.

> Job readiness does not guarantee selection. Hiring decisions depend on recruiters, interviews, competition, employer preferences, and other factors.

## Why This Project Exists

Most career tools focus on one step: generating a resume, checking ATS keywords, or storing applications. 11X connects those steps around the actual target job. It asks not only **"What should I write?"**, but also **"What does this job require, can I prove it, and what should I do next?"**

## Main Functions

### 1. Universal Job Description Analyzer

Paste a job description to identify:

- Target role and seniority
- Industry and department signals
- Technical skills, tools, soft skills, and keywords
- Certifications, education, and experience expectations
- Responsibilities and job-specific requirements

The local analysis engine currently supports common career areas including data, software, business analysis, mechanical engineering, and UX design, with a general fallback for other roles.

### 2. Job Twin Target Profile

Builds a practical representation of the target role, including:

- Technical skills
- Tools and platforms
- Responsibilities
- Soft skills
- Suggested target profile for comparison with the candidate

### 3. Four-Tier Skill Gap Audit

Requirements are compared with the master profile and grouped into:

- **Already Have**: claimed, verified, and supported by evidence
- **Need Evidence**: claimed but not backed by concrete project or work evidence
- **Missing**: relevant requirements not currently present in the profile
- **Bonus**: useful additional requirements

### 4. Master Career Profile

Maintain a reusable career source of truth containing:

- Personal information and professional links
- Education
- Skills and proficiency levels
- Projects
- Work experience
- Certifications
- Achievements and research
- Student details and target roles

### 5. Evidence Checker

Connect skills to projects, internships, experience, certifications, coursework, and achievements. The checker also detects generic phrases such as `hardworking`, `team player`, and `worked on projects`, then prompts the candidate to replace them with specific actions and measurable outcomes.

### 6. Skill Verification Board

Use the drag-and-drop board to organize skills into practical groups such as:

- My Skills
- Need Evidence
- Currently Learning
- Recommended

Skills can be marked with statuses such as verified, learning, unverified, need evidence, and not relevant.

### 7. Job Readiness Scoring

Calculates a readiness score from multiple signals:

- Must-have requirement coverage
- Evidence strength
- Resume alignment
- Interview preparation progress
- Overall job match

The dashboard presents these as separate metrics so a candidate can see why a score changed.

### 8. ATS Resume Builder

Create and save tailored resumes with:

- Seven templates: classic, modern, minimal, student, data analyst, software engineer, and business analyst
- Editable resume sections
- Custom section ordering and hidden sections
- Live preview
- PDF export
- Browser print fallback
- Multiple saved resume versions

PDF libraries are loaded only when export is requested, keeping the initial application bundle smaller.

### 9. Resume Optimization Guidance

The resume workflow provides current-versus-suggested guidance for improving bullets using verified profile information, measurable outcomes, action verbs, and target-job keywords.

### 10. Interview Preparation

Generates contextual questions based on:

- The selected target job
- Actual projects in the master profile
- Claimed or verified skills
- HR and behavioral topics
- Technical requirements
- Resume-specific situations

Each question includes a category, difficulty, source context, and suggested answer framework such as STAR or Present-Past-Future.

### 11. Career Explorer

Explore role information such as:

- Role overview and common titles
- Core skills and tools
- Education and certifications
- Beginner and intermediate roadmaps
- Portfolio project ideas
- Interview topics
- Related careers

### 12. Application Tracker

Track the application pipeline from:

`Saved` -> `Applied` -> `Assessment` -> `Interview` -> `Offer` or `Rejected`

Applications can include company, title, URL, dates, match score, notes, and the resume version used.

### 13. Authentication and Data Persistence

The Express backend provides:

- Account signup and login
- bcrypt password hashing
- JWT-based authentication
- Per-user profiles, resumes, job analyses, and applications
- JSON-file persistence for local development
- Strict rejection of missing, invalid, or expired tokens

The frontend also keeps a localStorage fallback for offline/demo use.

## What Makes 11X Different

| Typical career tool | 11X AI Career Launchpad |
| --- | --- |
| Generates a generic resume | Builds a resume against a specific job description |
| Focuses mainly on keyword matching | Separates claimed skills, proven skills, gaps, and bonus skills |
| Encourages adding keywords | Encourages evidence and measurable outcomes before making claims |
| Treats the resume as the whole solution | Connects skills, evidence, learning, resume, interviews, and applications |
| Provides a score without much context | Breaks readiness into requirement, evidence, alignment, and interview signals |
| Uses one resume for every application | Supports multiple target-specific resume versions |
| Gives generic interview questions | Uses the candidate's projects, skills, resume, and target job as context |
| Stores applications separately | Links application tracking to the career preparation workflow |

The core differentiator is the **evidence-first career loop**: analyze the target, compare it with the candidate's real profile, identify what can be proven, build missing evidence, tailor the resume, practice the interview, and track the application.

## Technology Stack

- React 18 and TypeScript
- Vite 7
- Tailwind CSS
- Express
- JWT and bcryptjs authentication
- Local JSON persistence for development
- Framer Motion for UI motion
- Lucide React icons
- `html2canvas` and `jsPDF` for resume export
- `@hello-pangea/dnd` for skill-board interactions

## Project Structure

```text
.
├── server/
│   ├── db.js              # Local JSON persistence layer
│   ├── database_data.json # Local development data
│   └── index.js           # Express API and production static server
├── src/
│   ├── components/        # Feature views and UI components
│   ├── context/           # Shared application state
│   ├── services/          # Career analysis and API services
│   ├── types/             # TypeScript domain models
│   ├── App.tsx            # View routing and application shell
│   └── main.tsx           # React entry point
├── .env.example
├── Dockerfile
├── render.yaml
└── package.json
```

## Getting Started

### Requirements

- Node.js 20.19+ or Node.js 22.12+
- npm

### Install

```powershell
npm install
```

### Configure the backend

Copy `.env.example` to `.env` and set values for local development:

```env
PORT=5000
JWT_SECRET=replace_with_a_long_random_local_secret
CORS_ORIGIN=http://localhost:5173
```

Never commit `.env` or production secrets.

### Run the frontend

```powershell
npm run dev
```

Open `http://localhost:5173`.

### Run the backend

In a second terminal:

```powershell
npm run server
```

The API runs at `http://localhost:5000`.

### Quality checks

```powershell
npm run lint
npm run build
npm audit
```

### Production preview

```powershell
npm run build
npm run server
```

The Express server serves the compiled frontend from `dist` and exposes the `/api` routes.

## API Overview

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `POST` | `/api/auth/signup` | Create an account |
| `POST` | `/api/auth/login` | Authenticate an account |
| `GET` | `/api/auth/me` | Read the authenticated user |
| `GET` / `PUT` | `/api/profile` | Read or update the career profile |
| `POST` | `/api/jobs/analyze` | Save a job analysis |
| `GET` | `/api/jobs` | List the user's job analyses |
| `GET` / `POST` / `DELETE` | `/api/resumes` | Read, save, or delete resumes |
| `GET` / `POST` / `PATCH` | `/api/applications` | Read, create, or update applications |
| `GET` | `/api/health` | Check backend availability |

Protected endpoints require:

```text
Authorization: Bearer <jwt>
```

## Current Scope and Honest Limitations

- The career analysis engine is a deterministic local TypeScript engine, not a connection to a hosted large-language model.
- Role intelligence is strongest for the roles represented in the local career database; unknown roles use fallback analysis.
- JSON persistence is suitable for local development and demos, not concurrent production workloads.
- For production, use a managed database, HTTPS, a strong secret stored by the hosting provider, and a specific `CORS_ORIGIN`.
- Scores are guidance signals, not hiring predictions or guarantees.

## Deployment

The repository includes configuration for Render and Docker.

For Render, configure:

- `JWT_SECRET`: generate a strong secret
- `CORS_ORIGIN`: the deployed frontend origin, such as `https://your-domain.example`
- A persistent database before storing real user data at scale

## License

No license has been specified yet. Add a license before accepting external contributions or redistributing the project.
