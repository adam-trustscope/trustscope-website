# TRUSTSCOPE WEBSITE CONTENT AUDIT
## All Text Content from Every Page
### Generated: February 19, 2026

---

## HOME PAGE (`/`)

**Tagline:** "Know. Control. Prove."

### Section: Why Governance Urgency is Rising
| Stat | Copy | Source |
|------|------|--------|
| 40% | of enterprise apps will embed AI agents by end of 2026, up from 5% last year | Gartner, Aug 2025 |
| 20% | of all data breaches now involve shadow AI — unmonitored models operating outside governance | IBM Cost of a Data Breach Report, 2025 |
| $4.63M | average cost of an AI-related data breach — $670K more than standard breaches | IBM Cost of a Data Breach Report, 2025 |

### Three Core Pillars

**1. Know**
- Headline: "See every decision your agents make."
- Body: "26 detection engines surface PII leaks, prompt injection, jailbreak attempts, cost spikes, and drift before they become incidents."
- Details:
  - Trace-level findings by model and severity
  - Timeline view to spot where drift starts
  - Local browser analysis with no trace upload
- CTA: "Open Trace Analyzer"

**2. Control**
- Headline: "Stop what should not happen."
- Body: "Inline policy enforcement blocks dangerous actions in real time while preserving developer workflows and uptime."
- Details:
  - Policy modes: simulate, alert, and block
  - Guardrails for tool calls and data boundaries
  - Escalation path for high-risk traces
- CTA: "View Security Controls"

**3. Prove**
- Headline: "Generate evidence anyone can verify."
- Body: "Signed, tamper-evident evidence packs map to AIUC-1, SOC 2, EU AI Act, NIST AI RMF, and ISO 42001 reporting needs."
- Details:
  - Hash-chained receipts for each governance event
  - Framework-mapped exports for audit workflows
  - Explicit ready, partial, and gap labeling
- CTA: "Open Compliance Mapping"

### Hard-hitting Workflows

**1. Deprecated Model Cutover**
- When: "When to use: your production model is being sunset or repriced"
- Body: "Compare baseline versus replacement traces before cutover so you can catch behavior drift before customers do."
- CTA: "Run Simulate Cutover"

**2. Live Leak Incident Response**
- When: "When to use: a bot exposed customer data or unsafe output"
- Body: "Run incident-focused trace analysis to scope which sessions leaked, what was exposed, and which controls should move to block."
- CTA: "Start Incident Triage"

**3. Friday Audit Evidence Request**
- When: "When to use: compliance, legal, or security asks for proof now"
- Body: "Generate mapped evidence workflows aligned to AIUC-1, SOC 2, NIST AI RMF, and EU AI Act reporting expectations."
- CTA: "Open Compliance Evidence"

### Built for Teams

**1. Developers**
- Line: "Governance from your first line of code."
- Details: SDK, gateway, and MCP setup paths / Fast local validation before cloud rollout
- CTA: "Go to Developers"

**2. Security and Engineering Leaders**
- Line: "Catch leaks, injection, and runaway automation before customers do."
- Details: Incident triage on trace history after an event / Policy controls to move from alert to block
- CTA: "View Security"

**3. Compliance Teams**
- Line: "When your auditor asks about AI controls, answer with evidence."
- Details: Framework mappings with ready/partial/gap labels / Evidence exports aligned to review workflows
- CTA: "View Compliance"

### Bottom CTA
- Headline: "Start free. See results in 5 minutes."
- Copy: "No credit card. 5,000 traces per month. Upgrade when you need continuous governance."
- Buttons: "Scan Your Traces" / "Open Model Compare"
- Badges: "274+ patent claims" / "MIT licensed CLI" / "SOC 2 in progress"

---

## AI TRACE ANALYZER (`/scanner`)

**H1:** "Analyze your traces. See where risk starts."

**Subheading:** "Local-first analysis with no data upload. Upload your trace file, then disconnect WiFi and run it."

**CTAs:** "Start Analysis" / "Open Model Compare"

**Features:**
- 100% local processing
- Disconnect WiFi and rerun
- Zero signup required
- JSON, JSONL, CSV, TSV, HAR

---

## SECURITY & BLOCKING (`/secure`)

**H1:** "Block what your AI shouldn't do."

**Subheading:** "PII leaks, prompt injection, unsafe tool calls, and runtime drift are operational events, not hypotheticals."

**CTAs:** "Open Trace Analyzer (Security-focused)" / "Read Incident Stories"

### Real Incidents

**1. The Credential Leak**
- Impact: "$230,000 incident response and rotation costs"
- Summary: "A support agent returned database connection secrets in customer-visible output. The key rotation window left production exposed for hours."
- Prevention: "Secrets scanner + output policy enforcement in block mode."

**2. The PII Exposure**
- Impact: "$1.2M regulatory and legal exposure"
- Summary: "A healthcare assistant returned SSNs and policy numbers during normal chat workflows. Discovery happened during audit sampling, not in production alerting."
- Prevention: "PII scanner, redaction policies, and sensitive field suppression."

**3. The DROP TABLE Disaster**
- Impact: "3 days of degraded operations and restoration work"
- Summary: "A tool-enabled agent interpreted 'clean up records' as destructive SQL and attempted privileged commands without human approval."
- Prevention: "Command firewall + tool allowlist + delegation depth caps."

### OWASP Agentic Top 10 Coverage
| ID | Threat | TrustScope Response |
|----|--------|---------------------|
| ASI-01 | Goal Hijacking | Prompt injection + jailbreak AI detectors with escalation and block policies |
| ASI-02 | Tool Misuse | Command firewall, A2A depth controls, and tool call policy validation |
| ASI-06 | Context Poisoning | Context growth monitoring and guardrail policy checks |
| ASI-08 | Cascading Failures | Loop, velocity, cost, and error-rate controls to stop chain failure |
| ASI-10 | Rogue Agents | Agent DNA drift detection and kill-switch controls |

### Security Engine Workflow

**Detect:** PII scanner, Secrets scanner, Prompt injection detection, Jailbreak detection

**Block:** Command firewall, Policy enforcement mode, Redaction policies, Agent lock / kill switch

**Prove:** Signed decision receipts, Hash-chained logs, Control mapping exports, Incident timeline reconstruction

**Bottom CTA:** "Don't learn from your customer first. Run a local scan and identify where your agent stack is exposed before rollout."

---

## MODEL MIGRATION (`/switch`)

**Eyebrow:** "Simulate"

**H1:** "Model Migration Report"

**Subheading:** "Compare two models. See what changed. Decide with data."

**Upload Instructions:**
- Baseline: "Traces from your current model" (e.g., "GPT-4 production traces")
- Candidate: "Traces from the model you're evaluating" (e.g., "replacement-model staging traces")

**Demo:** "Local Demo Pair (Optional) - This page starts blank. Click once to load a local before/after migration demo pair."
- Button: "Apply Financial Advisor Demo Pair"

**Note:** "100% local. Your data never leaves your browser. Disconnect WiFi and run Compare."

**After Comparison - Report Sections:**
- Verdict (CLEAR, DRIFT, or DANGER)
- 8-Strand Comparison table
- Top Regressions
- Projected Impact at Rollout (Canary)
- Download PDF Report / Copy Link

**Where This Fits:** "Simulate is for model replacement events. Daily trace review still starts in Trace Analyzer."

---

## PRICING (`/pricing`)

**H1:** "Start free. Scale with confidence."

**Subheading:** "Monitor, Protect, Enforce, Govern. One model, one upgrade path, no naming confusion."

### Tiers

| Tier | Price | Description | Traces | Retention | Engines | Seats |
|------|-------|-------------|--------|-----------|---------|-------|
| Monitor | Free | See everything your AI does | 5,000/mo | 30 days | 15 (CPU/regex) | 1 |
| Protect | $49/mo | Block threats before damage | 25,000/mo | 90 days | 20 (+5 ML) | 3 |
| Enforce | $249/mo | AI engines + compliance exports | 100,000/mo | 1 year | 26 (+6 AI-hybrid) | 5 |
| Govern | $2K+/mo | Signed evidence + audit proof | 500,000+/mo | 7 years | 26 + evidence signing | Unlimited |

### FAQs

1. **What happens if I exceed my trace limit?**
   "You will be notified before limit thresholds. Paid plans can scale with add-on volume and plan upgrades."

2. **Can I try Enforce features before upgrading?**
   "Yes. Simulate mode shows what Enforce engines would catch on your current traffic before you enable blocking."

3. **Do I need a credit card to start?**
   "No. Monitor starts immediately with no card required."

4. **Do you support annual billing?**
   "Yes. Annual pricing is discounted by 20%."

5. **Who should choose Govern?**
   "Teams requiring long retention, signed evidence chains, and enterprise audit workflows."

6. **What if I need more than 500,000 traces per month?**
   "Govern supports larger custom volumes. Contact the team."

**Trust Strip:** No credit card required / Cancel anytime / Your data is always yours / Full API export

---

## COST MANAGEMENT (`/cost`)

**H1:** "Your AI spend spiked last Tuesday."

**Subheading:** "Most teams discover runaway costs on the invoice. TrustScope flags and enforces spend thresholds in real time."

### Real Cost Incidents

**1. The $10,000 Infinite Loop**
- Impact: "$10,847 in 90 minutes"
- Prevention: "Loop killer + velocity limits + hard budget policies."

**2. The Runaway Agent Cascade**
- Impact: "$3,200 in a single afternoon"
- Prevention: "A2A depth caps + delegation policy constraints."

**3. The Context Window Explosion**
- Impact: "$680/day unnecessary spend"
- Prevention: "Token growth detection + context boundary policies."

### Budget Policy Example
```yaml
policies:
  - name: customer-bot-budget
    agent: customer-bot
    daily_limit_usd: 100
    alert_at: 0.8
    block_at: 1.0
```

---

## COMPLIANCE HUB (`/compliance`)

**H1:** "Your auditor asked about AI. Here's your answer."

**Subheading:** "TrustScope generates framework-mapped evidence across runtime governance controls, with verifiable records and explicit gap labeling."

**The Compliance Paradox:** "Prove the controls ran without exposing sensitive data."

**Evidence Chain:** Trace → 26 Engines → Policy → Receipt → Hash Chain → Framework Mapping → Export

### AIUC-1 Domain Snapshot
| Domain | Ready/Total |
|--------|-------------|
| A. Data & Privacy | 4/7 |
| B. Security | 5/9 |
| C. Safety | 7/12 |
| D. Reliability | 1/4 |
| E. Accountability | 3/10+ |
| F. Society | 1/2 |

### Frameworks Covered
- AIUC-1: 21 ready / ~44 controls
- SOC 2: 6 ready / 10 AI-relevant controls
- EU AI Act: Strong on Articles 9, 11, 12, 13, 14
- NIST AI RMF: 42 ready / 63 applicable
- ISO 42001: 22 ready / 38 controls

**Disclaimer:** "Evidence, not legal determination. TrustScope provides governance evidence, not compliance determinations."

---

## INCIDENT STORIES (`/incidents`)

**H1:** "Things that went wrong."

**Subheading:** "Real patterns from production AI failures. Names changed. Dollar amounts not."

### Incidents

| Title | Category | Impact | Prevention | Tier |
|-------|----------|--------|------------|------|
| The $10,000 Infinite Loop | Cost | $10,847 overnight | Loop killer + velocity policy + budget block | Monitor+ |
| The Agent That Leaked SSNs | Security | $1.2M exposure | PII scanner + redaction + receipts | Protect |
| The DROP TABLE Incident | Security | 3 days degraded | Command firewall + allowlist + approval gate | Protect |
| The Audit They Couldn't Pass | Compliance | SOC 2 delay, lost deal | Signed evidence chain + exports | Govern |
| The Insurance Denial | Risk | No AI liability coverage | Underwriting-ready evidence bundle | Govern |
| The Hallucinated Legal Citation | Reliability | Pending litigation | Hallucination checks in enforce mode | Enforce |

---

## FEATURES (`/features`)

**H1:** "Everything TrustScope does."

**Subheading:** "26 detection engines, 4 integration paths, and one runtime governance platform."

### Detection Engines by Tier

**Monitor (Rule-based):** PII Scanner, Secrets Scanner, Command Firewall, Loop Killer, Velocity Monitor, Cost Velocity, Context Expansion

**Protect (ML-assisted):** PII Confidence Model, Intent Classification, Toxicity Scoring

**Enforce (AI-hybrid):** Prompt Injection (AI), Jailbreak Detection (AI), Hallucination Scoring (AI), Groundedness/Citation

### Integration Paths
1. Gateway proxy - Zero-code rollout
2. Python/Node SDK - Deep per-agent control
3. MCP server - IDE-native workflows
4. Batch trace import - Offline analysis

---

## DEVELOPERS (`/developers`)

**H1:** "Governance from your first line of code."

**Subheading:** "One integration model, multiple entry points. Use gateway, SDK, MCP, or batch ingest."

### Integration Paths

**1. Gateway (Zero Code)**
```bash
export OPENAI_BASE_URL=https://api.trustscope.ai/gateway
export TRUSTSCOPE_API_KEY=ts_live_abc123
```

**2. SDK (Python/Node)**
```python
from trustscope import TrustScope
from trustscope.langchain import TrustScopeCallbackHandler
ts = TrustScope(api_key="ts_live_abc123")
handler = TrustScopeCallbackHandler(client=ts)
```

**3. MCP Server**
```bash
npx @trustscope/mcp-server
# exposes 9 governance tools locally
```

**Framework Support:** LangChain, CrewAI, AutoGen, OpenAI Agents, Google ADK, LlamaIndex, Semantic Kernel, Direct API

**Open Source:** "CLI is MIT licensed"

---

## CONTACT (`/contact`)

**H1:** "Let's Talk"

**Options:**
- Book a Demo: https://calendly.com/trustscope/demo
- Technical Support: support@trustscope.ai
- General Inquiries: hello@trustscope.ai

**Location:** "Based in New York City."

---

## ABOUT (`/about`)

**H1:** "AI agents are making decisions. Someone has to govern them."

**Mission:** "We build runtime controls and evidence systems for production AI."

**Team:** Adam Layman, Founder & CEO

**Patents:** 274+ total claims (MAX, AGB, SMI families)

**Open Source:** "CLI is MIT licensed"

---

## BLOG (`/blog`)

**H1:** "TrustScope Writing"

**Published:**
- "Announcing TrustScope: Governance Evidence Infrastructure for AI Agents" (Jan 30, 2026)

**Editorial Queue:**
- Why observability is not enough for AI agent governance
- EU AI Act implementation checklist for engineering teams
- Agent DNA and migration drift detection in production

---

## CHANGELOG (`/changelog`)

**H1:** "Public release log is being finalized."

**Status:** Placeholder - states "We are moving to a source-linked changelog format"

---

## LEGAL PAGES

### Privacy Policy (`/privacy`)
- Last updated: January 30, 2026
- Data retention by tier (30 days to 7 years)
- Encryption: TLS 1.3 transit, AES-256 rest
- Contact: privacy@trustscope.ai

### Terms of Service (`/terms`)
- Last updated: January 30, 2026
- Evidence Packs Disclaimer: "auditor-consumable, not auditor-ready"
- Governing Law: Delaware

### Security (`/security`)
- Infrastructure: Render, Neon, Vercel, Clerk, Stripe
- Encryption: TLS 1.3, AES-256, Ed25519 signatures
- SOC 2 Type II in progress (Q2 2026)
- Contact: security@trustscope.ai

### DPA (`/dpa`)
- GDPR compliant
- EU Standard Contractual Clauses included
- Contact: legal@trustscope.ai

---

## COMPLIANCE FRAMEWORK PAGES

### AIUC-1 (`/compliance/aiuc-1`)
- 21 ready / ~44 controls
- 6 domains covered
- Key gaps: Third-party testing requirements (B001, C010-C012, D002, D004)

### SOC 2 (`/compliance/soc2`)
- 6 ready / 10 AI-relevant controls
- Strong on CC4.1, CC5.1, CC5.2, CC8.1, CC9.1

### EU AI Act (`/compliance/eu-ai-act`)
- Strong on Articles 9, 11, 12, 13, 14
- Warning: Penalties up to 7% global revenue

### NIST AI RMF (`/compliance/nist`)
- 42 ready / 63 applicable
- GOVERN: 10/15, MAP: 8/12, MEASURE: 12/19, MANAGE: 12/17

### ISO 42001 (`/compliance/iso42001`)
- 22 ready / 38 controls
- Key gap: AI system impact assessment (8.4)

---

## FRAMEWORK LANDING PAGES (Stubs)

All use shared `FrameworkLanding` component with framework-specific code snippets:

| Route | Framework | Setup Pattern |
|-------|-----------|---------------|
| `/langchain` | LangChain | TrustScopeCallbackHandler |
| `/crewai` | CrewAI | TrustScopeCrewCallback |
| `/autogen` | AutoGen | TrustScopeObserver |
| `/openai-agents` | OpenAI Agents | ts.middleware() |
| `/google-adk` | Google ADK | Gateway config |
| `/llamaindex` | LlamaIndex | Callback handler |
| `/semantic-kernel` | Semantic Kernel | Plugin pattern |
| `/direct-api` | Direct API | Gateway URL swap |

---

## VERIFY (`/verify`)

**H1:** "Verify TrustScope Evidence"

**How Verification Works:**
1. Hash Chain - Tampering breaks the chain
2. Ed25519 Signatures - Verify authenticity
3. Framework Mapping - Auditor consumption

---

## END OF CONTENT AUDIT
