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
