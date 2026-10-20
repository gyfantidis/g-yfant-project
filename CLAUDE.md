# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Structure

This repo contains two distinct sub-projects:

- **`yfantidisNet3/`** — Static HTML/CSS/JS personal portfolio website (current live site). No build step; edit files directly.
- **`my-app/`** — Next.js 16 + React 19 + TypeScript + Tailwind CSS 4 app (in-progress rewrite/successor).

## my-app (Next.js — "Personal OS" Portfolio)

All commands run from the `my-app/` directory:

```bash
cd my-app
yarn dev      # Start dev server (localhost:3000)
yarn build    # Production build
yarn start    # Start production server
yarn lint     # ESLint
```

### Architecture

**Concept:** Two surfaces over one content layer (`lib/content/`):
- **The site** (`app/(site)/`): "blueprint" design, every page drawn like an engineering sheet with a title block. Routes: `/`, `/work`, `/work/[slug]` (case studies), `/services`, `/about`, `/writing`, `/now`. Styles live in `app/(site)/site.css` (`--bp-*` tokens in `globals.css`); system diagrams are hand-placed SVG in `components/site/Diagrams.tsx`. Site-only content (case studies, services, now) is in `lib/content/site.ts`.
- **The OS** (`app/os/`): easter egg linked from the nav. Visitor boots in via a terminal animation, then lands on an interactive desktop with draggable/resizable app windows.

**Site design rules:** must not look AI-generated — no gradients, glow, emoji or buzzword copy; real diagrams of real systems, specific numbers. Cyan (`--bp-line`) = data path, amber (`--bp-out`) = output; nothing else gets colour. The extraction client project is never named. Personal/financial info never goes on the site.

**Deploy:** pushes to `main` are deployed by Coolify. Work on a branch.

**OS entry flow:** `app/os/page.tsx` → `BootSequence` (typewriter terminal) → `Desktop` (full OS).

**Key files:**
- [app/layout.tsx](my-app/app/layout.tsx) — JetBrains Mono + DM Sans fonts, SEO metadata
- [app/globals.css](my-app/app/globals.css) — CSS custom property color system (`--os-*`), scanlines, particle grid, window chrome classes
- [lib/window-manager.tsx](my-app/lib/window-manager.tsx) — React context + useReducer managing open/minimized/z-index state for all 6 app windows
- [lib/terminal-commands.ts](my-app/lib/terminal-commands.ts) — pure function `processCommand()` mapping commands to output; supports `action` field for side-effects (clear, open_contact)
- [components/os/Desktop.tsx](my-app/components/os/Desktop.tsx) — `APPS` registry array (single source of truth for id/emoji/label/window config/component), renders `WindowManagerProvider` → icons + `AnimatePresence` window layer
- [components/os/Window.tsx](my-app/components/os/Window.tsx) — Framer Motion `useDragControls` (title-bar drag only) + resize handle; `AnimatePresence` scale+fade transitions

**App windows:** `components/apps/` — AboutApp, ProjectsApp, TerminalApp, BlogApp, SkillsApp, ContactApp. All are `"use client"` components.

**Color system:** CSS custom properties on `:root`, referenced as `var(--os-bg)`, `var(--os-accent)` etc. Do NOT use Tailwind's `bg-*` classes for OS colors — use inline styles with these variables.

**Typography rules:**
- OS chrome (taskbar, window titles, terminal): `var(--font-jetbrains)` / `font-family: var(--font-jetbrains), monospace`
- Content areas (apps): `var(--font-dmsans)` / `"DM Sans"` — Inter is forbidden

**Adding a new app window:**
1. Create `components/apps/MyApp.tsx`
2. Add entry to `APPS` array in `components/os/Desktop.tsx`
3. Add the `AppId` union type in `lib/window-manager.tsx` and the `APP_IDS` array

## yfantidisNet3 (Static Site)

No build tooling. Pages:
- `index.html` — home/about/skills/resume
- `projects.html` — project showcase
- `certifications.html` — certifications
- `portfolio_details/` — individual project detail pages

Uses Bootstrap 5.2, AOS (scroll animations), Swiper (carousels), GLightbox, and Boxicons — all vendored locally under `assets/vendor/`. Custom styles are in `assets/css/style.css`.

The contact form backend is `forms/sendMessage.php`.
