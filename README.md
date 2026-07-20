# 🧠 AI Summer Camp

A modern, two-track, browser-based curriculum that teaches artificial intelligence through interactive games, experiments and real-world activities. Built as a fully static site — no backend, no build step, no frameworks — ready to deploy directly on **GitHub Pages**.

**Live demo:** `https://<your-username>.github.io/AI-Summer-Camp/`

---

## ✨ Overview

| | Track A — AI Explorers | Track B — AI Builders |
|---|---|---|
| **Ages** | 8–11 | 12–15 |
| **Focus** | Games, drawing, stories, playful first contact with AI | Prompt engineering, machine learning, AI safety |
| **Activities** | 7 | 7 |
| **Format** | Single-page, self-contained HTML activities | Single-page, self-contained HTML activities |

Every activity is a standalone HTML file — open it directly in a browser, no accounts or installation required.

---

## 📁 Project Structure

```
AI-Summer-Camp/
│
├── index.html              # Landing page (hero, about, track cards)
├── track-a.html            # Track A activity directory
├── track-b.html            # Track B activity directory
├── README.md
│
├── css/
│   └── style.css           # Shared design system (colors, type, components)
│
├── js/
│   └── script.js           # Nav, dark mode, search/filter, scroll effects, ripple
│
├── assets/                  # Reserved for shared images/icons
│
├── trackA/                  # Track A activities (Ages 8–11)
│   ├── week1-activity1-is-this-ai.html
│   ├── week2-activity2-fix-the-prompt.html
│   ├── week2-activity3-collaborative-story.html
│   ├── week3-activity1-dream-world-image.html
│   ├── week3-activity2-ai-jingle-creator.html
│   ├── week4-activity1-ai-inventor-card.html
│   └── week4-main-build-your-own-ai-object.html
│
└── trackB/                  # Track B activities (Ages 12–15)
    ├── week1-activity1-train-and-break-the-model.html
    ├── week1-activity2-scale-changes-everything.html
    ├── week2-activity1-prompt-battle.html
    ├── week2-activity2-hallucination-hunt.html
    ├── week3-activity1-pick-your-app.html
    ├── week3-activity2-ai-vs-human.html
    └── week4-final-ai-escape-room.html
```

---

## 🎨 Design System

- **Palette:** white base with azure blue (`#2563EB`) and violet (`#7C3AED`) accents — Track A is color-coded blue, Track B is color-coded violet throughout.
- **Type:** Space Grotesk (display/headings), Inter (body), JetBrains Mono (eyebrows, durations, data labels).
- **Style:** glassmorphism surfaces, soft shadows, rounded corners, an animated neural-network hero graphic, card-lift hover states, and scroll-triggered fade-ins.
- **Dark mode:** toggle in the navbar, persisted via `localStorage`, respects `prefers-color-scheme` on first visit.

All shared styling lives in `css/style.css`; all shared behavior lives in `js/script.js`. Individual activity pages keep their own embedded styles/scripts and are untouched apart from a small injected "← Home" button so learners can always get back to the hub.

---

## 🚀 Deploying to GitHub Pages

1. Create a new GitHub repository (e.g. `AI-Summer-Camp`) and push this folder to it:
   ```bash
   git init
   git add .
   git commit -m "Initial commit — AI Summer Camp site"
   git branch -M main
   git remote add origin https://github.com/<your-username>/AI-Summer-Camp.git
   git push -u origin main
   ```
2. In the repository, go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to `Deploy from a branch`.
4. Choose the `main` branch and `/ (root)` folder, then **Save**.
5. GitHub will publish the site at `https://<your-username>.github.io/AI-Summer-Camp/` within a minute or two.

Because every link in this project uses **relative paths**, the site works identically whether it's opened locally (`index.html`) or served from a GitHub Pages subpath — no configuration needed.

---

## 🛠️ Local Preview

No build step is required. Either:

- Open `index.html` directly in a browser, **or**
- Serve it locally for the most accurate experience:
  ```bash
  python3 -m http.server 8000
  # then visit http://localhost:8000
  ```

---

## ✅ Features

- Sticky, responsive navbar with mobile menu
- Dark mode toggle (persisted)
- Live search + difficulty filters on both track pages
- Scroll-triggered fade-ins, hover/lift animations, button ripple effects
- Scroll-to-top button
- Page-load animation
- "← Home" button injected on every activity page
- Fully responsive down to mobile
- Zero dependencies, zero frameworks — plain HTML/CSS/JS only

---

## ✍️ Author

**Abdul Aakhir Saifullah**
BS Computer Science · NED University

---

## 📄 License

This project is provided for educational use. Feel free to adapt it for your own AI Summer Camp or classroom curriculum.
