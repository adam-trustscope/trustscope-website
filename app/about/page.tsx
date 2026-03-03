import Link from 'next/link'
import { ArrowRight, FileCheck, Github, Shield } from 'lucide-react'

const team = [
  {
    name: 'Adam Layman',
    role: 'Founder & CEO',
    bio: 'Building runtime governance infrastructure for teams deploying AI agents in production.',
  },
]

const patents = [
  { label: 'Total claims', value: '800+' },
  { label: 'Evidence binding', value: 'MAX family' },
  { label: 'Coverage verification', value: 'AGB family' },
  { label: 'Semantic inspection', value: 'SMI family' },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] py-14">
      <section className="section-container max-w-5xl">
        <p className="eyebrow mb-4">About</p>
        <h1 className="text-4xl font-extrabold md:text-6xl">AI agents are making decisions. Someone has to govern them.</h1>
        <p className="mt-4 max-w-3xl text-lg text-[var(--text-secondary)]">
          TrustScope exists to close the gap between “we think our agents are controlled” and “we can prove what happened.”
        </p>
      </section>

      <section className="section-container mt-14 max-w-5xl">
        <div className="card">
          <h2 className="text-2xl font-bold">Mission</h2>
          <p className="mt-3 text-[var(--text-secondary)]">
            We build runtime controls and evidence systems for production AI. Teams need to detect risk, enforce policy, and produce defensible records when auditors, insurers, or regulators ask questions.
          </p>
          <p className="mt-3 text-[var(--text-secondary)]">
            TrustScope is designed for calm execution: clear control states, explicit gaps, and evidence integrity that can be independently verified.
          </p>
        </div>
      </section>

      <section className="section-container mt-14 max-w-5xl">
        <p className="eyebrow mb-3">Team</p>
        <div className="grid gap-3 md:grid-cols-2">
          {team.map((member) => (
            <article key={member.name} className="card">
              <h3 className="text-xl font-bold">{member.name}</h3>
              <p className="mt-1 text-sm text-[var(--interactive)]">{member.role}</p>
              <p className="mt-3 text-sm text-[var(--text-secondary)]">{member.bio}</p>
            </article>
          ))}
          <article className="card">
            <h3 className="text-xl font-bold">Leadership focus</h3>
            <ul className="mt-3 space-y-2 text-sm text-[var(--text-secondary)]">
              <li>Know what agents did</li>
              <li>Control what they are allowed to do</li>
              <li>Prove outcomes with verifiable evidence</li>
              <li>Keep implementation practical for engineering teams</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="section-container mt-14 max-w-5xl">
        <p className="eyebrow mb-3">Patents and IP</p>
        <div className="card">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {patents.map((item) => (
              <div key={item.label} className="rounded-lg border border-[var(--border)] bg-[var(--bg)] p-3">
                <p className="text-2xl font-black text-[var(--text-primary)]">{item.value}</p>
                <p className="mt-1 text-xs text-[var(--text-muted)]">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-container mt-14 max-w-5xl">
        <div className="card">
          <p className="eyebrow mb-2">Open source transparency</p>
          <h2 className="text-2xl font-bold">CLI is Apache-2.0 licensed</h2>
          <p className="mt-3 text-[var(--text-secondary)]">
            Inspect and run governance tooling locally. We believe governance systems should be auditable, not opaque.
          </p>
          <a href="https://github.com/trustscope" target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[var(--interactive)] hover:text-[var(--interactive-hover)]">
            <Github className="h-4 w-4" /> View repositories
          </a>
        </div>
      </section>

      <section className="section-container mt-14 max-w-5xl">
        <div className="card text-center">
          <Shield className="mx-auto h-5 w-5 text-[var(--brand-muted)]" />
          <h2 className="mt-3 text-3xl font-bold">Talk with the team.</h2>
          <p className="mx-auto mt-3 max-w-2xl text-[var(--text-secondary)]">
            If you are preparing for AI audits, underwriting review, or production rollout, we can help scope the governance path.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link href="/contact" className="btn-primary gap-2">
              Contact TrustScope <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/scanner" className="btn-secondary gap-2">
              <FileCheck className="h-4 w-4" /> Start Free
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
