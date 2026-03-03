import Link from 'next/link'
import { ArrowRight, Clock, User } from 'lucide-react'

const publishedPosts = [
  {
    slug: 'announcing-trustscope',
    title: 'Announcing TrustScope: Governance Evidence Infrastructure for AI Agents',
    excerpt:
      "Today we're launching TrustScope, a platform that generates cryptographically verifiable evidence for AI agent governance.",
    date: 'January 30, 2026',
    author: 'Adam',
    category: 'Announcements',
    readTime: '5 min',
  },
]

const upcomingTopics = [
  'Why observability is not enough for AI agent governance',
  'EU AI Act implementation checklist for engineering teams',
  'Agent DNA and migration drift detection in production',
]

export default function BlogPage() {
  const featuredPost = publishedPosts[0]

  return (
    <div className="min-h-screen bg-[var(--bg)] py-14">
      <section className="section-container max-w-5xl text-center">
        <p className="eyebrow mb-4">Blog</p>
        <h1 className="text-4xl font-extrabold md:text-6xl">TrustScope Writing</h1>
        <p className="mx-auto mt-4 max-w-3xl text-lg text-[var(--text-secondary)]">
          Product updates and governance implementation notes for teams running AI in production.
        </p>
      </section>

      <section className="section-container mt-12 max-w-5xl">
        <article className="card">
          <p className="text-xs font-semibold text-[var(--interactive)]">{featuredPost.category}</p>
          <h2 className="mt-2 text-3xl font-bold text-[var(--text-primary)]">{featuredPost.title}</h2>
          <p className="mt-3 text-[var(--text-secondary)]">{featuredPost.excerpt}</p>

          <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-[var(--text-muted)]">
            <span className="inline-flex items-center gap-1">
              <User className="h-4 w-4" />
              {featuredPost.author}
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {featuredPost.readTime}
            </span>
            <span>{featuredPost.date}</span>
          </div>

          <Link
            href={`/blog/${featuredPost.slug}`}
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--interactive)] hover:underline"
          >
            Read article <ArrowRight className="h-4 w-4" />
          </Link>
        </article>
      </section>

      <section className="section-container mt-12 max-w-5xl">
        <div className="card">
          <p className="eyebrow mb-2">Editorial queue</p>
          <h3 className="text-xl font-bold text-[var(--text-primary)]">Next topics in review</h3>
          <ul className="mt-4 space-y-2 text-sm text-[var(--text-secondary)]">
            {upcomingTopics.map((topic) => (
              <li key={topic} className="flex items-start gap-2">
                <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-[var(--border-hover)]" />
                <span>{topic}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-[var(--text-muted)]">
            Only published posts are linked. Draft topics stay non-clickable until live.
          </p>
        </div>
      </section>

      <section className="section-container mt-12 max-w-5xl text-center">
        <div className="card">
          <h3 className="text-2xl font-bold">Need a walkthrough now?</h3>
          <p className="mx-auto mt-3 max-w-2xl text-[var(--text-secondary)]">
            Try the browser scanner for a live local demo or contact the team for a guided review.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/scanner" className="btn-primary">
              Start Free
            </Link>
            <Link href="/contact" className="btn-secondary">
              Contact Team
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
