import Link from 'next/link'
import { ArrowRight, FileText } from 'lucide-react'

const upcomingSections = [
  'Product release notes by version',
  'Detection engine and policy updates',
  'Framework mapping revision history',
  'Deprecation and migration notices',
]

export default function ChangelogPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] py-14">
      <section className="section-container max-w-4xl text-center">
        <p className="eyebrow mb-4">Changelog</p>
        <h1 className="text-4xl font-extrabold md:text-6xl">Public release log is being finalized.</h1>
        <p className="mx-auto mt-4 max-w-3xl text-lg text-[var(--text-secondary)]">
          We are moving to a source-linked changelog format so every claim is versioned and verifiable.
        </p>
      </section>

      <section className="section-container mt-12 max-w-4xl">
        <div className="card">
          <p className="eyebrow mb-2">What will be published here</p>
          <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
            {upcomingSections.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-[var(--border-hover)]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-[var(--text-muted)]">
            Until the public feed is live, use support and docs channels for release details.
          </p>
        </div>
      </section>

      <section className="section-container mt-12 max-w-4xl">
        <div className="card text-center">
          <FileText className="mx-auto h-5 w-5 text-[var(--interactive)]" />
          <h2 className="mt-3 text-2xl font-bold">Need change history for a review now?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-[var(--text-secondary)]">
            Contact us for the latest release notes and framework mapping revision details.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/contact" className="btn-primary gap-2">
              Request Release Notes <ArrowRight className="h-4 w-4" />
            </Link>
            <a href="https://docs.trustscope.ai" target="_blank" rel="noopener noreferrer" className="btn-secondary">
              Open Docs
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
