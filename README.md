# AI Council Hub

A mobile-first, bilingual (Arabic/English) workspace for organizing manual collaboration with ChatGPT, Claude, and Gemini.

## Current release: S3
- Redesigned responsive dashboard with a premium dark emerald and warm-gold visual system
- Official links to ChatGPT, Claude, and Gemini
- Prompt studio with role-specific prompts
- Local session storage using IndexedDB
- Paste and keep each assistant's response
- Unified review prompt to compare agreement, disagreement, gaps, and uncertainty
- Independent peer-review rounds: each assistant reviews the other available answers
- Search saved sessions
- Import/export JSON backups
- Installable PWA shell with versioned offline cache

## Privacy and limitations
- No paid APIs are used.
- No passwords, cookies, or account tokens are collected.
- The site does not connect to AI services automatically. Users open official services and copy/paste prompts and answers manually.
- Sessions are stored in the current browser on the current device. Export a JSON backup before clearing browser data or changing devices.
- Generated review prompts are instructions for the user to submit to an assistant; the site does not execute them automatically.

## Run and deploy
Serve the repository root over HTTPS or localhost. For GitHub Pages, select **Settings → Pages → Deploy from a branch → main → /(root)**.

## Roadmap
- S4: Decision matrix, weighted scoring, final decision record, and project-specific workspaces
