<div align="center">

# Personal OS Portfolio

### An interactive desktop OS experience — built as a personal portfolio

**[g-yfantidis.gr](https://g-yfantidis.gr)**

![Next.js](https://img.shields.io/badge/Next.js_16-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React_19-61DAFB?style=flat-square&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=flat-square&logo=framer&logoColor=white)
![Deployed on Coolify](https://img.shields.io/badge/Deployed_on-Coolify-6C47FF?style=flat-square)

</div>

---

## Concept

Instead of a traditional portfolio page, visitors boot into a simulated OS:

1. **Boot sequence** — typewriter terminal animation fires up
2. **Desktop** — a full interactive desktop with draggable, resizable windows
3. **App windows** — each one is a section of the portfolio

---

## Tech Stack

| Layer | Tech |
|-------|------|
| Framework | Next.js 16 (App Router) |
| UI | React 19 + TypeScript |
| Styling | Tailwind CSS 4 + CSS custom properties (`--os-*`) |
| Animations | Framer Motion |
| Fonts | JetBrains Mono (OS chrome) · DM Sans (content) |
| Deploy | Coolify (self-hosted) |

---

## Project Structure

```
my-app/
├── app/
│   ├── page.tsx          # Entry point: BootSequence → Desktop
│   ├── layout.tsx        # Fonts, SEO metadata
│   └── globals.css       # CSS custom property color system, scanlines, grid
│
├── components/
│   ├── os/
│   │   ├── BootSequence.tsx    # Terminal typewriter boot animation
│   │   ├── Desktop.tsx         # APPS registry + AnimatePresence window layer
│   │   ├── Window.tsx          # Draggable + resizable window chrome
│   │   ├── Menubar.tsx         # Top menu bar
│   │   ├── Taskbar.tsx         # Bottom app dock
│   │   └── Spotlight.tsx       # Search overlay
│   └── apps/
│       ├── AboutApp.tsx        # Bio, experience, education
│       ├── ProjectsApp.tsx     # Selected projects
│       ├── SkillsApp.tsx       # Tech stack
│       ├── TerminalApp.tsx     # Interactive CLI
│       ├── BooksApp.tsx        # Reading list
│       ├── ContactApp.tsx      # Contact form
│       ├── PhotosApp.tsx       # Photo gallery with lightbox
│       └── CertificationsApp.tsx
│
├── lib/
│   ├── window-manager.tsx      # React context + useReducer for window state
│   └── terminal-commands.ts    # CLI command → output mapping
│
└── public/
    └── photos/                 # Compressed photos (max 1400px, mozjpeg 82%)
```

---

## Getting Started

```bash
# Install dependencies
yarn install

# Start dev server
yarn dev        # → localhost:3000

# Production build
yarn build
yarn start

# Lint
yarn lint
```

---

## Color System

All OS colors use CSS custom properties. **Never use Tailwind `bg-*` classes for OS chrome** — always use inline styles with these variables:

```css
--os-bg          /* main background          */
--os-surface     /* window surface           */
--os-surface-2   /* elevated surface         */
--os-border      /* borders & dividers       */
--os-text        /* primary text             */
--os-muted       /* secondary / dimmed text  */
--os-accent      /* green accent  #00ff88    */
--os-blue        /* blue accent              */
```

---

## Adding a New App Window

1. Create `components/apps/MyApp.tsx` (`"use client"` component)
2. Add an entry to the `APPS` array in `components/os/Desktop.tsx`
3. Add the new `AppId` to the union type and `APP_IDS` array in `lib/window-manager.tsx`

---

## Photo Compression

Before committing new photos to `public/photos/`, run the compression script:

```bash
node compress-photos.mjs
```

Resizes to max **1400px** wide at **82% JPEG quality** (mozjpeg). Typical size reduction: **80–99%**.
