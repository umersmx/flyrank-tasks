# Continuous Deployment & Telemetry Guide (FE-04)

> **Why it matters**: Deploying on day one, not at the end, is how professionals work. Every commit lands on a live preview URL.

This guide details the deployment architecture, continuous integration (CI) pipeline, environment variable structure, and rollback procedures for **SMX AI** (FlyRank Capstone).

---

## 🚀 Live Production & Preview Architecture

- **Deployment Platform**: [Vercel](https://vercel.com) (Optimized Next.js Edge & Serverless Runtime).
- **Live Deployment URL**: [https://smxai-flyrank.vercel.app/](https://smxai-flyrank.vercel.app/)
- **Health Check Endpoint**: [https://smxai-flyrank.vercel.app/health](https://smxai-flyrank.vercel.app/health)
- **Diagnostic JSON API**: [https://smxai-flyrank.vercel.app/api/health](https://smxai-flyrank.vercel.app/api/health)

---

## ⚙️ Environment Variable Structure

Secrets are strictly encapsulated on server runtimes and never prefixed with `NEXT_PUBLIC_`:

| Variable Name | Required | Environment | Purpose |
|:---|:---:|:---|:---|
| `OPENROUTER_API_KEY` | Optional | Server-side | Primary OpenRouter AI Provider key |
| `GROQ_API_KEY` | Optional | Server-side | High-speed LPU model inference key |
| `ANTHROPIC_API_KEY` | Optional | Server-side | Anthropic Claude 3.5 Sonnet key |
| `NEXT_PUBLIC_APP_NAME` | Yes | Public / Client | Application title (`"SMX AI"`) |
| `NEXT_PUBLIC_APP_ENV` | Yes | Public / Client | Environment flag (`"production"` / `"preview"`) |

---

## 🔄 CI/CD Git Workflow & Preview URLs

```
  Git Commit & Push
        │
        ▼
  GitHub Repository (main / feat branches)
        │
        ├── [feat/* branch] ──> Vercel Automated Preview URL (e.g. `smxai-git-feat-*.vercel.app`)
        │
        └── [main branch]   ──> Vercel Production Build (`smxai-flyrank.vercel.app`)
```

### Preview Deployments on Every Commit:
1. Every push to any branch generates an isolated, ephemeral preview deployment with its own unique HTTPS URL.
2. Pull requests automatically receive Vercel bot comments with preview links, build logs, and bundle size analytics.

---

## 🛡️ Pre-Flight Verification Checklist

Before promoting any branch to production:
- [x] `npm test` passes with 100% test coverage.
- [x] `npm run build` completes with 0 TypeScript and ESLint errors.
- [x] `/api/health` returns status code `200 OK` with valid telemetry JSON.
- [x] All 5 routed placeholder screens exist and render without 404/500 errors (`/`, `/dashboard`, `/playground`, `/settings`, `/health`).
- [x] Zero client bundle leaks (no private keys in `NEXT_PUBLIC_` variables).
- [x] Mobile responsiveness verified at `375px` (mobile navigation drawer) and `1280px` (desktop header).

---

## ⏪ Rollback Strategy

In the event of an unexpected edge runtime failure or breaking upstream API change:
1. **Instant Vercel Instant Rollback**:
   - Navigate to **Vercel Dashboard** → **Deployments**.
   - Locate the previous stable production deployment.
   - Click `···` → **Instant Rollback**.
   - Traffic is rerouted in `< 10 seconds` without requiring a rebuild or git revert.
2. **Git Revert**:
   ```bash
   git revert HEAD
   git push origin main
   ```
