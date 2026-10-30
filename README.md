# 🎓 GATE AI Practice Agent

An intelligent, interactive preparation portal for **GATE (Graduate Aptitude Test in Engineering)** aspirants. The agent tests candidates on syllabus topics using questions modeled directly after **Previous Years Questions (PYQs)** from IISc Bangalore and IITs, evaluates responses in real time using the official GATE marking scheme, and provides rigorous step-by-step solutions with mathematical derivations and trap alerts.

---

## 🌟 Key Features

### 1. 📋 Onboarding & Discipline Selection
- Supports official GATE disciplines:
  - **GATE CS / IT** (Computer Science & Information Technology)
  - **GATE DA** (Data Science & Artificial Intelligence)
  - **GATE EC** (Electronics & Communication Engineering)
  - **GATE EE** (Electrical Engineering)
  - **GATE ME** (Mechanical Engineering)
  - **GATE CE** (Civil Engineering)
- Easily switch between papers at any time from the top bar.

### 2. 🎯 Syllabus & Topic Selector
- Browse all high-yield subjects and subtopics with official GATE mark weightages (e.g., *Algorithms & Data Structures*, *Theory of Computation*, *Operating Systems*, *DBMS*, *Machine Learning*, *Linear Algebra*).
- Filter by question type (**MCQ**, **MSQ**, **NAT**) or marks (**1 Mark** conceptual vs **2 Marks** analytical).

### 3. 🧩 Authentic GATE PYQ-Style Question Formats
- **MCQ (Multiple Choice Questions)**: 4 options, single correct. Strictly penalizes wrong responses (-0.33 for 1 mark, -0.66 for 2 marks).
- **MSQ (Multiple Select Questions)**: 4 options, one or more correct. No negative marking, but requires selecting all correct options (no partial marks, matching actual GATE rules).
- **NAT (Numerical Answer Type)**: Exact numerical answer input with floating-point range acceptance. No negative marking.

### 4. 📐 Step-by-Step Derivations & Trap Analysis
- **Formula & Governing Equation**: Visual mathematical expressions rendered crisply with $\LaTeX$ / KaTeX.
- **Detailed Mathematical Derivation**: Clear, step-by-step reasoning showing exactly how the solution is reached.
- **Option-by-Option Breakdown**: Explains why correct options succeed and why distractors fail.
- **GATE Trap Alert**: Warns aspirants about deceptive edge cases and misconceptions where majority of students lose marks.

### 5. 🧮 TCS iON Virtual Scientific Calculator
- Authentic replica of the on-screen scientific calculator provided in the real GATE exam by TCS iON (since physical calculators are forbidden).
- Includes trigonometric, logarithmic, exponential, powers, roots, factorial, memory functions, and DEG/RAD toggles.

### 6. 📊 Real-Time Scorecard & Analytics
- Live tracking of Net GATE Marks (including negative penalties), Accuracy %, Total Attempted, and Mistake count.

---

## 🚀 How to Run Locally

A local preview server is already running! Open your browser and visit:
```
http://localhost:3000
```

To run manually at any time using Python's built-in web server:
```bash
cd /Users/kasim/.gemini/antigravity/scratch/gate-practice-agent
python3 -m http.server 3000
```

---

## 🌐 How to Host on a Site (Free & 1-Click)

The project is structured with zero build dependencies, meaning you can deploy it instantly to any static hosting provider.

### Option 1: Deploy to Vercel (Recommended)
1. Install Vercel CLI (or connect via GitHub):
   ```bash
   npm i -g vercel
   cd /Users/kasim/.gemini/antigravity/scratch/gate-practice-agent
   vercel
   ```
2. Or push to a GitHub repository, go to [vercel.com](https://vercel.com), click **Add New Project**, and select your repo.
3. The included `vercel.json` will automatically configure routing.

### Option 2: Deploy to Netlify (Drag & Drop or Git)
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
2. Drag and drop the `gate-practice-agent` folder directly into the browser window.
3. Your site will be live instantly with a free SSL URL (e.g., `gate-practice-agent.netlify.app`).
4. The included `netlify.toml` handles redirects and asset caching.

### Option 3: Deploy to GitHub Pages
1. Initialize git and push to GitHub:
   ```bash
   cd /Users/kasim/.gemini/antigravity/scratch/gate-practice-agent
   git init
   git add .
   git commit -m "Initial commit of GATE Practice Agent"
   git branch -M main
   git remote add origin https://github.com/<your-username>/gate-practice-agent.git
   git push -u origin main
   ```
2. On GitHub, go to your repository **Settings** → **Pages** → Source: **Deploy from a branch** → Branch: **main** / **root** → Save.
3. Your site is live at `https://<your-username>.github.io/gate-practice-agent/`.

---

## 🤖 Optional: Live AI Question Generation (Gemini API)
- The app operates out of the box with a rich **Parametric PYQ Generator** (varying numerical values, graph edges, cache sizes, memory access times, and combinatorics dynamically).
- If you wish to enable live generative synthesis for custom or niche subtopics, click the ⚙ settings icon in the top header and enter your **Google Gemini API Key**. It is saved safely in your browser's local storage.
