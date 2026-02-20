import Link from 'next/link'
import { AlertTriangle, ArrowRight, CheckCircle, Shield, ShieldAlert } from 'lucide-react'

const incidents = [
  {
    title: 'The Credential Leak',
    impact: '$230,000 incident response and rotation costs',
    summary:
      'A support agent returned database connection secrets in customer-visible output. The key rotation window left production exposed for hours.',
    prevention: 'Secrets scanner + output policy enforcement in block mode.',
  },
  {
    title: 'The PII Exposure',
    impact: '$1.2M regulatory and legal exposure',
    summary:
      'A healthcare assistant returned SSNs and policy numbers during normal chat workflows. Discovery happened during audit sampling, not in production alerting.',
    prevention: 'PII scanner, redaction policies, and sensitive field suppression.',
  },
  {
    title: 'The DROP TABLE Disaster',
    impact: '3 days of degraded operations and restoration work',
    summary:
      'A tool-enabled agent interpreted “clean up records” as destructive SQL and attempted privileged commands without human approval.',
    prevention: 'Command firewall + tool allowlist + delegation depth caps.',
  },
]

const owaspRows = [
  {
    risk: 'ASI-01 Goal Hijacking',
    response: 'Prompt injection + jailbreak AI detectors with escalation and block policies.',
  },
  {
    risk: 'ASI-02 Tool Misuse',
    response: 'Command firewall, A2A depth controls, and tool call policy validation.',
  },
  {
    risk: 'ASI-06 Context Poisoning',
    response: 'Context growth monitoring and guardrail policy checks.',
  },
  {
    risk: 'ASI-08 Cascading Failures',
    response: 'Loop, velocity, cost, and error-rate controls to stop chain failure.',
  },
  {
    risk: 'ASI-10 Rogue Agents',
    response: 'Agent DNA drift detection and kill-switch controls.',
  },
]

const engines = [
  {
    stage: 'Detect',
    items: ['PII scanner', 'Secrets scanner', 'Prompt injection detection', 'Jailbreak detection'],
  },
  {
    stage: 'Block',
    items: ['Command firewall', 'Policy enforcement mode', 'Redaction policies', 'Agent lock / kill switch'],
  },
  {
    stage: 'Prove',
    items: ['Signed decision receipts', 'Hash-chained logs', 'Control mapping exports', 'Incident timeline reconstruction'],
  },
]

export default function SecurePage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] py-14">
      <section className="section-container max-w-5xl text-center">
        <p className="eyebrow mb-4">Security</p>
        <h1 className="text-4xl font-extrabold md:text-6xl">Block what your AI shouldn&apos;t do.</h1>
        <p className="mx-auto mt-4 max-w-3xl text-lg text-[var(--text-secondary)]">
          PII leaks, prompt injection, unsafe tool calls, and runtime drift are operational events, not hypotheticals.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="/scanner?demo=support-bot" className="btn-primary gap-2">
            Open Trace Analyzer (Security-focused) <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/incidents" className="btn-secondary">Read Incident Stories</Link>
        </div>
      </section>

      <section className="section-container mt-14 max-w-5xl">
        <p className="eyebrow mb-3">Real incidents</p>
        <p className="mb-3 text-sm text-[var(--text-muted)]">
          Composite scenarios based on recurring production failures. Names changed. Failure modes preserved.
        </p>
        <div className="space-y-3">
          {incidents.map((incident) => (
            <article key={incident.title} className="card">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <h2 className="text-2xl font-bold">{incident.title}</h2>
                <span className="rounded-md border border-[color:rgba(220,38,38,.35)] bg-[color:rgba(220,38,38,.1)] px-3 py-1 text-xs text-[var(--status-danger)]">
                  {incident.impact}
                </span>
              </div>
              <p className="mt-3 text-[var(--text-secondary)]">{incident.summary}</p>
              <p className="mt-3 text-sm text-[var(--text-muted)]">
                <span className="font-semibold text-[var(--status-success)]">What would have stopped it:</span> {incident.prevention}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-container mt-14 max-w-5xl">
        <p className="eyebrow mb-3">OWASP Agentic Top 10 coverage</p>
        <div className="card overflow-x-auto !p-0">
          <table className="w-full min-w-[620px] text-left text-sm">
            <thead className="border-b border-[var(--border)] bg-[var(--surface-hover)]">
              <tr>
                <th className="px-4 py-3 font-semibold text-[var(--text-secondary)]">OWASP Risk</th>
                <th className="px-4 py-3 font-semibold text-[var(--text-secondary)]">TrustScope Response</th>
              </tr>
            </thead>
            <tbody>
              {owaspRows.map((row) => (
                <tr key={row.risk} className="border-b border-[var(--border)] last:border-0">
                  <td className="px-4 py-3 text-[var(--text-primary)]">{row.risk}</td>
                  <td className="px-4 py-3 text-[var(--text-secondary)]">{row.response}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="section-container mt-14 max-w-5xl">
        <p className="eyebrow mb-3">Security engine workflow</p>
        <div className="grid gap-3 md:grid-cols-3">
          {engines.map((stage) => (
            <article key={stage.stage} className="card">
              <div className="mb-3 flex items-center gap-2">
                {stage.stage === 'Detect' ? (
                  <Shield className="h-4 w-4 text-[var(--interactive)]" />
                ) : stage.stage === 'Block' ? (
                  <ShieldAlert className="h-4 w-4 text-[var(--status-warning)]" />
                ) : (
                  <CheckCircle className="h-4 w-4 text-[var(--status-success)]" />
                )}
                <h3 className="text-lg font-semibold">{stage.stage}</h3>
              </div>
              <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                {stage.items.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-[var(--border-hover)]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section-container mt-14 max-w-5xl">
        <div className="card text-center">
          <AlertTriangle className="mx-auto h-5 w-5 text-[var(--status-warning)]" />
          <h2 className="mt-3 text-3xl font-bold">Don&apos;t learn from your customer first.</h2>
          <p className="mx-auto mt-3 max-w-2xl text-[var(--text-secondary)]">
            Run a local scan and identify where your agent stack is exposed before rollout.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link href="/scanner?demo=support-bot" className="btn-primary">Open Trace Analyzer (Security-focused)</Link>
            <Link href="/pricing" className="btn-secondary">Compare Plans</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
