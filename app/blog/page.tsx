import Link from 'next/link'
import { ArrowRight, Clock, User } from 'lucide-react'

// Sample blog posts - can be expanded with real content
const posts = [
  {
    slug: 'announcing-trustscope',
    title: 'Announcing TrustScope: Governance Evidence Infrastructure for AI Agents',
    excerpt: 'Today we\'re launching TrustScope, the first platform that generates cryptographically verifiable evidence for AI agent governance.',
    date: 'January 30, 2026',
    author: 'Adam',
    category: 'Announcements',
    readTime: '5 min',
    featured: true,
  },
  {
    slug: 'why-observability-isnt-enough',
    title: 'Why Observability Isn\'t Enough for AI Agents',
    excerpt: 'Observability tools show you what happened. But when an auditor asks "show me your agents followed policy," you need evidence, not dashboards.',
    date: 'Coming Soon',
    author: 'Adam',
    category: 'Thought Leadership',
    readTime: '8 min',
  },
  {
    slug: 'eu-ai-act-compliance-guide',
    title: 'EU AI Act Article 17: A Practical Compliance Guide',
    excerpt: 'High-risk AI requirements take effect August 2026. Here\'s what engineering teams need to know about QMS compliance.',
    date: 'Coming Soon',
    author: 'Adam',
    category: 'Compliance',
    readTime: '12 min',
  },
  {
    slug: 'agent-dna-explained',
    title: 'Agent DNA: Behavioral Fingerprinting for AI Agents',
    excerpt: 'How we use cryptographic fingerprints to detect drift, lock behavior, and document agent identity across deployments.',
    date: 'Coming Soon',
    author: 'Adam',
    category: 'Technical Deep Dive',
    readTime: '10 min',
  },
]

const categories = ['All', 'Announcements', 'Thought Leadership', 'Compliance', 'Technical Deep Dive']

export default function BlogPage() {
  const featuredPost = posts.find(p => p.featured)
  const otherPosts = posts.filter(p => !p.featured)

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-16 bg-gradient-to-b from-blue-600/10 to-transparent">
        <div className="section-container">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Blog</h1>
          <p className="text-xl text-slate-400 max-w-2xl">
            Insights on AI governance, compliance, and building safe AI agent infrastructure.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="py-4 border-b border-slate-800">
        <div className="section-container">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat, i) => (
              <button 
                key={i}
                className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                  i === 0 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-12">
          <div className="section-container">
            <div className="card p-8 bg-gradient-to-br from-blue-600/10 to-transparent">
              <span className="text-blue-400 text-sm font-medium">{featuredPost.category}</span>
              <h2 className="text-3xl font-bold mt-2 mb-4">{featuredPost.title}</h2>
              <p className="text-slate-400 text-lg mb-6">{featuredPost.excerpt}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-slate-500">
                  <span className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {featuredPost.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {featuredPost.readTime} read
                  </span>
                  <span>{featuredPost.date}</span>
                </div>
                
                <Link 
                  href={`/blog/${featuredPost.slug}`}
                  className="text-blue-400 hover:text-blue-300 flex items-center gap-2"
                >
                  Read more <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Post Grid */}
      <section className="py-12">
        <div className="section-container">
          <div className="grid md:grid-cols-3 gap-6">
            {otherPosts.map((post, i) => (
              <div key={i} className="card p-6 flex flex-col">
                <span className="text-blue-400 text-xs font-medium mb-2">{post.category}</span>
                <h3 className="font-semibold text-lg mb-3">{post.title}</h3>
                <p className="text-slate-400 text-sm mb-4 flex-1">{post.excerpt}</p>
                
                <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </div>
                  <span className="text-xs text-slate-500">{post.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-slate-900/30">
        <div className="section-container text-center">
          <h2 className="text-2xl font-bold mb-4">Subscribe to our newsletter</h2>
          <p className="text-slate-400 mb-6 max-w-xl mx-auto">
            Get the latest on AI governance, compliance insights, and TrustScope updates 
            delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="you@company.com"
              className="flex-1 px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
            <button className="btn-primary px-6">Subscribe</button>
          </div>
        </div>
      </section>
    </div>
  )
}
