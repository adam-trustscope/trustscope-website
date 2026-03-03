import Link from 'next/link'
import { Home, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[var(--bg)] px-4 py-24">
      <div className="mx-auto max-w-xl text-center">
        <p className="eyebrow mb-4">404</p>
        <h1 className="text-4xl font-extrabold text-[var(--text-primary)] md:text-5xl">Page not found</h1>
        <p className="mt-4 text-[var(--text-secondary)]">
          This URL does not exist or moved during the site restructure.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="btn-primary inline-flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            Go Home
          </Link>
          <Link
            href="/scanner"
            className="btn-secondary inline-flex items-center justify-center gap-2"
          >
            <Search className="w-4 h-4" />
            Start Free
          </Link>
        </div>

        <div className="mt-10 border-t border-[var(--border)] pt-6">
          <p className="mb-3 text-sm text-[var(--text-muted)]">Looking for something specific?</p>
          <div className="flex flex-wrap justify-center gap-3 text-sm">
            <Link href="/pricing" className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
              Pricing
            </Link>
            <span className="text-[var(--text-subtle)]">·</span>
            <a
              href="https://docs.trustscope.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
            >
              Documentation
            </a>
            <span className="text-[var(--text-subtle)]">·</span>
            <Link href="/contact" className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
