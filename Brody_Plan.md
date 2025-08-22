
# Brody MVP Plan

## 1. High-Level System Architecture (MVP)

```mermaid
graph TD
  Client[Client (Web/Chrome Extension/Mobile)] --> Auth[Auth / API Gateway (FastAPI + OAuth2)]
  Auth <--> Identity[Identity Provider (Google OAuth)]
  Auth --> Orchestrator[Orchestrator / Agent Manager (LangGraph)]
  Orchestrator --> Ingestors[Ingestors (calendar/gmail/to-do connectors)]
  Orchestrator --> BaseAgent[Base Agent (proactive logic & memory)]
  Orchestrator --> MeetingAgents[Task/Meeting Agents (summarize, doc-gen, email-draft)]
  Ingestors --> Transient[Transient Store / Queue (Redis/RabbitMQ)]
  BaseAgent --> Transient
  MeetingAgents --> Transient
  Transient --> LLM[LLM Engines (Gemini API, Ollama)]
  LLM --> VectorDB[Vector DB / RAG Store (Milvus/Pinecone/Weaviate)]
  VectorDB --> Persistent[Persistent DB (Postgres)]
  Persistent --> Output[Notification/Output Layer (UI, email sender, calendar update)]
```

**Notes:**
- LangGraph manages agent flows and retries
- Gemini (student credits) for quality, Ollama local models for fallback
- Vector DB stores meeting notes, documents, user memory (RAG)
- Redis for short-lived state, task queues, rate limiting
- Postgres for durable metadata and audit logs

---

## 2. Component Responsibilities (Short)

- **Client:** Requests “Prepare my day” and views briefs; shows confidence/feedback widget
- **Auth/API Gateway:** Secures endpoints, enforces scopes, proxies to connectors
- **Ingestors:** Connect to Google Calendar, Gmail, Microsoft To Do, and fetch events, threads, attachments. Respect rate limits and scopes
- **Orchestrator (LangGraph):** Schedules sub-agents, enforces policies (privacy, stop-words), composes multi-step pipelines
- **Base Agent:** Maintains ephemeral user context for the day (work hours, priorities, blackout times)
- **Meeting Agent:** Summarizes, generates decisions, pulls supporting docs, drafts email/agenda
- **LLM Engines:** Generate and refine text; post-process for hallucination checks
- **RAG/Vector DB:** Store and retrieve personal context and past meeting briefs for continuity
- **Persistence:** Store preferences, templates, audit trails
- **Output Layer:** UI cards, downloadable briefs, one-click send/deliver

---

## 3. End-to-End Activity Flow (Sequence)

1. **Trigger:** User clicks “Prepare my day” or scheduled cron triggers at 7 AM
2. **Auth + Fetch:** API Gateway validates token → Ingestors fetch today’s events, tasks, unread mails (only within granted scopes)
3. **Normalize:** Events → unified schema (see JSON schema below)
4. **Candidate Selection:** Base Agent filters events (priority rules, conflicts, blackouts)
5. **For Each Event:** Orchestrator spins Meeting Agent pipeline:
    - Pull recent emails/attachments for event attendees
    - Query Vector DB for prior context and related docs
    - Call LLM (Gemini) to create meeting brief (summary, decisions, 3 supporting docs, agenda)
    - Post-process: run hallucination check (ask LLM to provide sources or return "Insufficient data")
    - If confidence < threshold, mark as requires human review
    - Draft emails: Meeting Agent prepares draft email; optionally attach generated doc or links
6. **Aggregate:** Orchestrator compiles “Today’s Digest” — prioritized list + briefs
7. **Deliver:** UI displays digest; user can approve-send emails or request edits. Optionally schedule: send automatically X minutes before meeting after user opt-in
8. **Feedback Loop:** User thumbs-up/down on briefs; feedback stored in Postgres & embeddings updated in Vector DB for future RAG retrieval

---

## 4. Minimal Data Schemas (MVP)

**Unified Event Object (JSON):**
```json
{
  "event_id": "cal_12345",
  "title": "Client Sync",
  "start_time": "2025-06-18T10:00:00+05:30",
  "end_time": "2025-06-18T11:00:00+05:30",
  "attendees": [
    {"name":"Alice","email":"alice@example.com"}
  ],
  "location": "Zoom",
  "source": "google_calendar",
  "related_emails": ["msg_987","msg_988"],
  "attachments": [{"name":"PRD_v1.pdf","url":"..."}],
  "tags": ["client","roadmap"],
  "priority": "high"
}
```

**Meeting Brief (Output):**
```json
{
  "event_id":"cal_12345",
  "objective":"Get client signoff on MVP scope",
  "priority":"High",
  "summary":"60-word summary...",
  "decisions":["Approve scope","Prioritize auth"],
  "supporting_docs":[{"filename":"PRD_v1.pdf","reason":"scope reference"}],
  "draft_email":{"subject":"Client Sync — Roadmap signoff","body":"..."},
  "confidence":78
}
```

---

## 5. Orchestration / Agent Flow (LangGraph Example Outline)

1. **fetch_event_context:** returns emails + attachments
2. **retrieve_rag_context:** similarity search in Vector DB
3. **compose_prompt:** build concise system prompt + context + user preferences
4. **call_llm:** Gemini generate summary and decisions
5. **hallucination_check:** verify claimed facts against attachments/quotes
6. **persist_brief:** store in Postgres & Vector DB
7. **present_to_user:** show in UI or send email

---

## 6. LLM Prompting Rules & Safety

- Always include source buckets (emails, attachments, RAG hits) and require the LLM to list 1–3 explicit sources per factual claim
- Use confidence scoring from the LLM + heuristic (presence of source matches) to decide send vs. user-approval
- If LLM cannot find sources for a claim → return “Insufficient data” and suggest 2 possible user-check actions

---

## 7. Deployment & Infra (MVP Cost Control)

- **Hosting:** Single small AWS/GCP VM for LangGraph + FastAPI, Redis managed free tier or tiny instance. Use student credits for Gemini
- **Vector DB:** Milvus (self-hosted) or Pinecone free tier. Start with Milvus if you want ownership
- **CI/CD:** GitHub Actions for build/deploy
- **Monitoring:** Sentry for errors, Prometheus + Grafana for basic metrics (latency, LLM calls)
- **Secrets:** HashiCorp Vault or cloud secret manager for API keys

---

## 8. Acceptance Criteria & Metrics (MVP)

- **Functionality:** `/prepare-day` endpoint returns prioritized digest with briefs for ≥90% of calendar events that have ≥1 related email/attachment
- **Quality:** Average user-rated confidence >= 75% across 10 test users
- **Latency:** End-to-end digest generation (for up to 8 events) < 30s (can be async and stream)
- **Cost:** LLM credits used per user-day < threshold (define after tests)

---

## 9. Development Roadmap & Dev-Hour Estimates (MVP)

- **Connectors (Calendar + Gmail + ToDo):** 2 devs, 2 weeks (40–80 hrs)
- **LangGraph flows + Meeting Agent pipeline:** 1 dev, 2 weeks (40 hrs)
- **LLM prompt engineering + hallucination checks:** 1 dev, 1 week (20–40 hrs)
- **Vector DB + RAG integration:** 1 dev, 1 week (20–40 hrs)
- **Frontend (digest UI + approval flow):** 1 dev, 1–2 weeks (40–80 hrs)
- **Security, CI, deploy:** 1 dev, 1 week (20–40 hrs)

**Total MVP rough:** ~200–320 dev-hours (reasonable for a 1–2 month small team sprint)

---

## 10. Quick POC (4-Step) — Build This First

1. Build FastAPI endpoint `/prepare-day` that accepts a test-calendar.json
2. Implement a connector mock that fetches events and related emails from test files
3. Implement a LangGraph flow or a simple orchestrator that calls Gemini to generate single meeting brief (use the Meeting Prep Template)
4. Present the digest in a simple React page; capture user feedback (thumbs up/down) and store in Postgres

---

## 11. Sample Prompt Schema (for LLM Call)

```
SYSTEM: You are Brody Meeting Agent. Use ONLY the sources provided. Output JSON with fields: objective, summary(<=60 words), decisions[], supporting_docs[], agenda[], draft_email{}, confidence(0-100). If facts aren't supported, say "Insufficient data" and list what you need.

USER CONTEXT: { user_prefs, role, tone="concise, professional" }

SOURCES: [email_texts..., attachment_summaries..., rag_hits...]
```

---

## 12. Security & Privacy Checklist (Must-Do Before Sharing with Users)

- OAuth scopes: request minimal scopes (calendar.readonly, gmail.readonly) and explain to users
- Data retention policy: default 30 days for temporary context; explicit opt-in for long-term memory
- Encryption at rest & transit
- Privacy audit: do not send sensitive personal data to third-party LLMs without explicit user consent
