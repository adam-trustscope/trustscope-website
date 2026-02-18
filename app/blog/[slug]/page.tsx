'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, Clock, User, Calendar, Share2, Twitter, Linkedin, LinkIcon } from 'lucide-react';

// Blog posts data - same as listing page
const posts: Record<string, {
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  readTime: string;
  content?: string;
}> = {
  'announcing-trustscope': {
    title: 'Announcing TrustScope: Governance Evidence Infrastructure for AI Agents',
    excerpt: 'Today we\'re launching TrustScope, the first platform that generates cryptographically verifiable evidence for AI agent governance.',
    date: 'January 30, 2026',
    author: 'Adam',
    category: 'Announcements',
    readTime: '5 min',
    content: `
## The Problem

AI agents are taking thousands of actions per day. Every LLM call, every tool invocation, every decision. But when an auditor asks "show me your agents followed policy," what do you show them?

Observability tools give you dashboards. Logs give you raw data. Neither provides **evidence**.

Evidence is different. Evidence is:
- Cryptographically verifiable
- Tamper-evident
- Mappable to compliance frameworks
- Auditor-consumable

That's what TrustScope provides.

## What We Built

TrustScope is inline runtime governance infrastructure for AI agents. Three capabilities, one platform:

**Know** — 25 detection engines analyze every AI action. PII, secrets, prompt injections, loops, anomalies, toxicity. See it all.

**Control** — 50+ policy types enforce your rules inline. Block threats before they cause damage. Natural language policies for complex requirements.

**Prove** — Cryptographic evidence for any framework. Hash chains, Ed25519 signatures, AIUC-1 mapping. Evidence packs that auditors can verify.

## How It Works

1. **Connect** your agents via Gateway, SDK, MCP, or CLI
2. **Detect** threats with 25 engines running on every trace
3. **Enforce** policies that block violations inline
4. **Prove** compliance with signed evidence packs

## Start Today

TrustScope is available now. Start free with 5,000 traces/month, or upgrade for blocking, AI engines, and evidence signing.

[Try the Scanner →](/)
    `,
  },
  'why-observability-isnt-enough': {
    title: 'Why Observability Isn\'t Enough for AI Agents',
    excerpt: 'Observability tools show you what happened. But when an auditor asks "show me your agents followed policy," you need evidence, not dashboards.',
    date: 'Coming Soon',
    author: 'Adam',
    category: 'Thought Leadership',
    readTime: '8 min',
  },
  'eu-ai-act-compliance-guide': {
    title: 'EU AI Act Article 17: A Practical Compliance Guide',
    excerpt: 'High-risk AI requirements take effect August 2026. Here\'s what engineering teams need to know about QMS compliance.',
    date: 'Coming Soon',
    author: 'Adam',
    category: 'Compliance',
    readTime: '12 min',
  },
  'agent-dna-explained': {
    title: 'Agent DNA: Behavioral Fingerprinting for AI Agents',
    excerpt: 'How we use cryptographic fingerprints to detect drift, lock behavior, and document agent identity across deployments.',
    date: 'Coming Soon',
    author: 'Adam',
    category: 'Technical Deep Dive',
    readTime: '10 min',
  },
};

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const post = posts[slug];

  if (!post) {
    return (
      <div className="min-h-screen bg-[#0f1117] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Post Not Found</h1>
          <Link href="/blog" className="text-[#C49B3A] hover:underline">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const isComingSoon = post.date === 'Coming Soon';

  return (
    <div className="min-h-screen bg-[#0f1117]">
      {/* Header */}
      <section className="pt-8 pb-4 px-4">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>

          <div className="mb-4">
            <span className="text-[#C49B3A] text-sm font-medium">{post.category}</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{post.title}</h1>

          <p className="text-xl text-slate-400 mb-6">{post.excerpt}</p>

          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 pb-6 border-b border-slate-800">
            <span className="flex items-center gap-1">
              <User className="w-4 h-4" />
              {post.author}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {post.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {post.readTime} read
            </span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-8 px-4">
        <div className="max-w-3xl mx-auto">
          {isComingSoon ? (
            <div className="bg-[#1a1f2e] border border-slate-700/50 rounded-xl p-8 text-center">
              <h2 className="text-xl font-bold text-white mb-4">Coming Soon</h2>
              <p className="text-slate-400 mb-6">
                This article is currently being written. Subscribe to our newsletter to get notified when it's published.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="you@company.com"
                  className="flex-1 px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-[#C49B3A]"
                />
                <button className="bg-[#C49B3A] hover:bg-[#D4A843] text-black font-medium px-6 py-3 rounded-lg transition-colors">
                  Notify Me
                </button>
              </div>
            </div>
          ) : (
            <article className="prose prose-invert prose-slate max-w-none">
              {post.content?.split('\n').map((line, i) => {
                if (line.startsWith('## ')) {
                  return (
                    <h2 key={i} className="text-2xl font-bold text-white mt-8 mb-4">
                      {line.replace('## ', '')}
                    </h2>
                  );
                }
                if (line.startsWith('**') && line.endsWith('**')) {
                  return (
                    <p key={i} className="text-lg font-semibold text-white my-4">
                      {line.replace(/\*\*/g, '')}
                    </p>
                  );
                }
                if (line.startsWith('- ')) {
                  return (
                    <li key={i} className="text-slate-300 ml-4">
                      {line.replace('- ', '')}
                    </li>
                  );
                }
                if (line.startsWith('[') && line.includes('](')) {
                  const match = line.match(/\[(.*?)\]\((.*?)\)/);
                  if (match) {
                    return (
                      <p key={i} className="my-4">
                        <Link href={match[2]} className="text-[#C49B3A] hover:underline">
                          {match[1]}
                        </Link>
                      </p>
                    );
                  }
                }
                if (line.startsWith('1. ') || line.startsWith('2. ') || line.startsWith('3. ') || line.startsWith('4. ')) {
                  return (
                    <li key={i} className="text-slate-300 ml-4 list-decimal">
                      {line.replace(/^\d+\.\s/, '').replace(/\*\*(.*?)\*\*/g, '$1')}
                    </li>
                  );
                }
                if (line.trim() === '') {
                  return null;
                }
                return (
                  <p key={i} className="text-slate-300 my-4 leading-relaxed">
                    {line}
                  </p>
                );
              })}
            </article>
          )}
        </div>
      </section>

      {/* Share */}
      {!isComingSoon && (
        <section className="py-8 px-4 border-t border-slate-800">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 text-sm">Share this article</span>
              <div className="flex items-center gap-3">
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://trustscope.ai/blog/${slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors"
                >
                  <Twitter className="w-4 h-4 text-slate-400" />
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://trustscope.ai/blog/${slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors"
                >
                  <Linkedin className="w-4 h-4 text-slate-400" />
                </a>
                <button
                  onClick={() => navigator.clipboard.writeText(`https://trustscope.ai/blog/${slug}`)}
                  className="p-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors"
                >
                  <LinkIcon className="w-4 h-4 text-slate-400" />
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-gradient-to-r from-[#C49B3A]/10 to-slate-800/50 border border-[#C49B3A]/30 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Ready to govern your AI agents?</h2>
            <p className="text-slate-400 mb-6">
              Start free. See what's hiding in your AI traces.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-[#C49B3A] hover:bg-[#D4A843] text-black font-medium px-6 py-3 rounded-lg transition-colors"
            >
              Try the Scanner
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
