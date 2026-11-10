# AI Council Hub

A mobile-first workspace for preparing prompts and comparing responses from ChatGPT, Claude, and Gemini.

## S1 features
- Arabic RTL and English LTR interface
- Mobile-first responsive dashboard
- Official assistant links
- Prompt composer with assistant-specific prompts
- Installable PWA shell and basic offline caching
- No paid APIs, credential storage, or automated account access

## Important
This version does **not** connect to the assistants automatically. Open each official service yourself, paste the generated prompt, then bring the responses back into your workflow. Never share passwords, session cookies, or private access tokens.

## Run locally
Serve this folder with any static HTTP server, or publish it using GitHub Pages. Service workers require HTTPS or localhost.

## Deploy with GitHub Pages
1. Open repository **Settings → Pages**.
2. Under **Build and deployment**, choose **Deploy from a branch**.
3. Select **main** and **/(root)**, then save.
4. Wait for the Pages deployment to finish.

## Roadmap
- S2: Local session and response storage, import/export
- S3: Cross-review and critique prompts
- S4: Voting, final decision, and project archive
