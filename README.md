# Seeker Guidance Portal

A guided job-discovery experience for blue- and grey-collar seekers. The app interviews users through a simple conversational flow (voice or text), derives a profile, and then surfaces role matches, learning roadmaps, and curated job cards.

## Tech Stack

- **Frontend**: React + Vite + TypeScript
- **Backend**: Node.js + Express + TypeScript (MongoDB-ready)
- **State/Logic**: Context-based conversational flow with mock recommendations (swap in real AI endpoints later)

## Project Structure

```
ai interviewer/
├── client/      # React single-page app
├── server/      # Express API scaffold
└── README.md
```

## Prerequisites

- Node.js 18+
- npm 9+
- MongoDB instance (local or remote) for the backend
- Optional: OpenAI API key (or any LLM provider) for future AI-powered endpoints

---

## Frontend (client)

1. Install dependencies
   ```bash
   cd client
   npm install
   ```
2. Start dev server

   ```bash
   npm run dev
   ```

   Vite serves the SPA at `http://localhost:5173`.

3. Build for production
   ```bash
   npm run build
   npm run preview
   ```

### Key Features

- Matte-black minimal UI with a Google-style mic/text capture bar.
- Web Speech API integration for browser-based transcription (Chrome recommended).
- Context-driven flow that collects five profiling answers, then opens a full-window results sheet.
- Mock recommender (`client/src/lib/recommender.ts`) so the UI works before real APIs exist.

---

## Backend (server)

1. Install dependencies
   ```bash
   cd server
   npm install
   ```
2. Create `.env` (sample values below)
   ```
   PORT=5000
   MONGODB_URI=mongodb://127.0.0.1:27017/seeker_portal
   OPENAI_API_KEY=sk-REPLACE_ME  # optional placeholder
   ```
3. Run in dev mode

   ```bash
   npm run dev
   ```

   - Express boots at `http://localhost:5000`
   - `GET /api/status` returns a basic health payload

4. Compile for prod
   ```bash
   npm run build
   npm start
   ```

### Next Backend Steps

- Add models (`Profile`, `Role`, `Roadmap`, `Job`) under `src/models`.
- Implement controllers/routes for:
  - `/api/profile/questions`
  - `/api/profile/submit`
  - `/api/roles/recommend`
  - `/api/learning-roadmap`
  - `/api/jobs/recommend`
- Replace mock recommender in the client with these endpoints.

---

## Voice Support Notes

- The Web Speech API is only available on Chromium browsers. Users on unsupported browsers automatically fall back to typing.
- `client/src/hooks/useSpeechCapture.ts` centralizes the mic logic.

---

## Demo Suggestions

1. Start both client and server (`npm run dev` in each folder).
2. Walk through the five-question flow, mix of typing + mic.
3. On submission, highlight the modal/overlay with role matches, roadmap, and job recommendations.
4. Mention how the backend can swap in real AI/ML logic without touching the UX.

Happy hacking! 🎤🧭
