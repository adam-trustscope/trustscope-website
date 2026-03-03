import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const controls = [
  {
    id: 'CC4.1',
    name: 'Monitoring activities',
    status: 'Ready',
    evidence: 'Continuous detection logs and alert history',
  },
  {
    id: 'CC5.1',
    name: 'Control activities',
    status: 'Ready',
    evidence: 'Policy evaluation and enforcement receipts',
  },
  {
    id: 'CC5.2',
    name: 'Technology controls',
    status: 'Ready',
    evidence: 'Runtime guardrail and budget policy execution logs',
  },
  {
    id: 'CC6.1',
    name: 'Logical access',
    status: 'Partial',
    evidence: 'TrustScope RBAC + customer IAM evidence needed',
  },
  {
    id: 'CC6.2',
    name: 'Access provisioning / deprovisioning',
    status: 'Partial',
    evidence: 'Customer identity lifecycle controls required',
  },
  {
    id: 'CC8.1',
    name: 'Change management',
    status: 'Ready',
    evidence: 'Configuration history and policy version trails',
  },
  {
    id: 'CC9.1',
    name: 'Risk mitigation',
    status: 'Ready',
    evidence: 'Exposure scoring, incidents, and response timelines',
  },
  {
    id: 'CC9.2',
    name: 'Vendor management',
    status: 'Customer',
    evidence: 'Organizational process outside TrustScope scope',
  },
]

export default function SOC2Page() {
  return (
    <div className="min-h-screen bg-[var(--bg)] py-14">
      <section className="section-container max-w-5xl">
        <p className="eyebrow mb-4">SOC 2</p>
        <h1 className="text-4xl font-extrabold md:text-6xl">SOC 2 AI control mapping.</h1>
        <p className="mt-4 max-w-3xl text-lg text-[var(--text-secondary)]">
          TrustScope provides strong evidence coverage for monitoring, control activity, and change-management criteria tied to AI runtime behavior.
        </p>
        <p className="mt-4 text-xs text-[var(--text-subtle)]">Last verified mapping date: February 19, 2026</p>
      </section>

      <section className="section-container mt-14 max-w-5xl">
        <div className="card overflow-x-auto !p-0">
          <table className="w-full min-w-[700px] text-left text-sm">
            <thead className="border-b border-[var(--border)] bg-[var(--surface-hover)]">
              <tr>
                <th className="px-4 py-3 text-[var(--text-secondary)]">Control</th>
                <th className="px-4 py-3 text-[var(--text-secondary)]">Requirement</th>
                <th className="px-4 py-3 text-[var(--text-secondary)]">Status</th>
                <th className="px-4 py-3 text-[var(--text-secondary)]">TrustScope Evidence</th>
              </tr>
            </thead>
            <tbody>
              {controls.map((control) => (
                <tr key={control.id} className="border-b border-[var(--border)] last:border-0">
                  <td className="px-4 py-3 font-mono text-[var(--interactive)]">{control.id}</td>
                  <td className="px-4 py-3 text-[var(--text-primary)]">{control.name}</td>
                  <td className={`px-4 py-3 ${
                    control.status === 'Ready'
                      ? 'text-[var(--status-success)]'
                      : control.status === 'Partial'
                        ? 'text-[var(--status-warning)]'
                        : 'text-[var(--text-muted)]'
                  }`}>
                    {control.status}
                  </td>
                  <td className="px-4 py-3 text-[var(--text-secondary)]">{control.evidence}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="section-container mt-14 max-w-5xl">
        <div className="compliance-disclaimer">
          <p className="font-semibold text-[var(--status-warning)]">Evidence, not compliance determination</p>
          <p className="mt-1 text-[var(--text-secondary)]">
            TrustScope provides governance evidence, not compliance determinations. SOC 2 conclusions require qualified audit review.
          </p>
        </div>
      </section>

      <section className="section-container mt-14 max-w-5xl text-center">
        <a href="https://app.trustscope.ai/signup" className="btn-primary gap-2">
          Start Free <ArrowRight className="h-4 w-4" />
        </a>
      </section>
    </div>
  )
}
