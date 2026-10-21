# 🎓 PathWise AI - Course & Career Recommendation Platform

PathWise AI is an intelligent course and career recommendation engine designed to guide high school and undergraduate students toward optimal degree programs, specialized career pathways, and academic growth based on their stream, subject marks, interests, and aspirations.

---

## 🌟 Key Features

- **Personalized Onboarding & Profile Assessment**: Evaluates 12th-grade stream (Science, Commerce, Arts/Humanities, Vocational), subject marks, personal interests, and preferred career directions.
- **Rule-Based & AI Eligibility Engine**: Validates eligibility criteria across hundreds of degree options, computing match scores and recommendation confidence.
- **Interactive Pathway Visualizer**: Step-by-step career milestones, degree requirements, required certifications, and salary expectations.
- **Side-by-Side Course Comparison**: Compare curriculum, career outcomes, duration, and difficulty ratings.
- **AI Career Advisor**: Conversational AI guidance powered by Google Gemini to answer questions about college admissions, scholarships, and career trends.
- **Student & Admin Dashboards**:
  - **Student Dashboard**: Saved courses, matched career paths, profile settings, and downloadable recommendation reports.
  - **Admin Dashboard**: Course catalog management, system analytics, user management, and eligibility criteria editor.

---

## 🏗️ Project Architecture

```
course-recommendation/
├── client/                     # Frontend Application (React 19 + TypeScript + Vite + TailwindCSS)
│   ├── public/                 # Static assets, icons, videos
│   ├── src/
│   │   ├── components/         # UI components (Dashboard, Modal, Visualizer, etc.)
│   │   ├── config/             # Streams, subjects, and career configuration
│   │   ├── services/           # Backend API client
│   │   ├── types.ts            # Frontend TypeScript definitions
│   │   ├── App.tsx             # Main routing and application state
│   │   └── main.tsx            # Application entry point
│   ├── package.json
│   └── vite.config.ts
├── server/                     # Backend API Server (Node.js + Express + TypeScript)
│   ├── data/                   # JSON persistence (courses, users, analytics)
│   ├── src/
│   │   ├── routes/             # Express API route handlers (auth, courses, aiAdvisor, etc.)
│   │   ├── db.ts               # File-based DB operations & persistence
│   │   ├── eligibilityEngine.ts # Eligibility calculation & matching logic
│   │   ├── types.ts            # Server-side TypeScript interfaces
│   │   └── server.ts           # Server bootstrap & middleware setup
│   ├── .env.example            # Environment configuration template
│   ├── package.json
│   └── tsconfig.json
├── .gitignore                  # Git ignore rules for node_modules, builds, and logs
└── package.json                # Root workspace scripts
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.0.0 or higher recommended)
- `npm` (v9.0.0 or higher)

### 1. Installation

Clone the repository and install dependencies for both server and client:

```bash
# Clone the repository
git clone https://github.com/Vengadesh2218/course-reccomendation.git
cd course-reccomendation

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 2. Environment Setup

Configure the backend environment:

```bash
cd server
cp .env.example .env
```

Edit `.env` to configure:
```env
PORT=5000
GEMINI_API_KEY=your_gemini_api_key_here # Optional: For AI Advisor
```

### 3. Running the Application

You can run the application either from the root or in separate terminals.

#### Option A: From the Root Directory

```bash
# Terminal 1: Start Backend Server (runs on http://localhost:5000)
npm run server

# Terminal 2: Start Frontend App (runs on http://localhost:3000 / 5173)
npm run client
```

#### Option B: Individual Directories

```bash
# Terminal 1: Backend
cd server
npm run dev

# Terminal 2: Frontend
cd client
npm run dev
```

---

## 🔒 Security & Best Practices

- Real `.env` files and API keys are strictly excluded from version control via `.gitignore`.
- Password hashing and token-based authentication protect user accounts.
- Sensitive files and `node_modules/` are cleanly ignored.

---

## 📄 License

This project is licensed under the MIT License - feel free to use and modify for educational and personal projects.
