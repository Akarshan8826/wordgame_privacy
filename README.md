# Word Circle backend

This small Node.js service hosts the Word Circle privacy policy and exposes a health check:

- `/` and `/privacy-policy` serve the policy page.
- `/app-logo.png` serves the app logo.
- `/health` returns `{"status":"ok"}` for monitoring and Render health checks.

## Run locally

Requires Node.js 20 or newer.

```sh
npm start
```

Then open `http://localhost:3000` or check `http://localhost:3000/health`.

## Deploy on Render

Create a new Render Web Service from the `word-circle-backend` GitHub repository and use this folder as its root directory if deploying from the Android project's repository. The included `render.yaml` configures the start command and `/health` check. Render assigns the public URL after deployment.

Free Render services may spin down when idle. Use a paid, always-on instance if the policy page must remain immediately available around the clock. Do not send a request every few seconds to defeat an idle policy; the health endpoint is for platform health checks and sensible uptime monitoring.

## Publish as its own GitHub repository

Publish this folder's contents to the `wordgame_privacy` repository, then connect that repository to Render as described above. Keep any credentials or access tokens out of this repository.
