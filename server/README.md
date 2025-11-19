# Server

This server exposes a small API used by the client. It includes a `/api/suggestions` endpoint that sends user answers to OpenAI and returns job suggestions.

IMPORTANT: This repository previously contained an exposed OpenAI API key. If you have not already done so, please rotate/revoke that key in your OpenAI dashboard now.

Setup

1. Copy `.env.example` to `.env` and set `OPENAI_API_KEY` to your new key. Do NOT commit `.env`.

2. Install dependencies and run in dev:

```powershell
cd server
npm install
npm run dev
```

3. (Optional) Test your key locally with the provided script:

```powershell
cd server
.\scripts\check-openai-key.ps1
```

The server listens on `PORT` (default 5000).
