import Link from 'next/link'
import { Zap, Shield, FileCheck, GitBranch, CheckCircle } from 'lucide-react'

// Changelog entries - most recent first
const releases = [
  {
    version: '1.0.0',
    date: 'January 30, 2026',
    title: 'Production Launch',
    type: 'major',
    highlights: [
      'Evidence Layer with 4-level cryptographic verification',
      'Framework Evidence Explorer for NIST, EU AI Act, SOC 2, ISO 42001',
      'Agent Exposure Index for risk prioritization',
      'Evidence Pack templates with control narratives',
    ],
    features: [
      { icon: FileCheck, text: 'Evidence Packs with blockchain anchoring' },
      { icon: Shield, text: '19 detection engines (OWASP Agentic Top 10)' },
      { icon: GitBranch, text: 'Agent DNA behavioral fingerprinting' },
      { icon: Zap, text: 'Sub-50ms latency Gateway proxy' },
    ],
  },
  {
    version: '0.9.0',
    date: 'January 15, 2026',
    title: 'Beta Release',
    type: 'minor',
    highlights: [
      'Dashboard UI complete with particle field visualization',
      'Stripe billing integration with 4 tiers',
      'Python and Node.js SDKs',
      'MCP integration for Claude Desktop',
    ],
  },
  {
    version: '0.8.0',
    date: 'December 20, 2025',
    title: 'Core Infrastructure',
    type: 'minor',
    highlights: [
      'Gateway proxy supporting OpenAI, Anthropic, Azure, Vertex',
      'Policy engine with 72+ rules',
      'Hash chain audit trail implementation',
      'A2A session tracking for multi-agent workflows',
    ],
  },
]

export default function ChangelogPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-24 bg-gradient-to-b from-blue-600/10 to-transparent">
        <div className="section-container">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Changelog</h1>
          <p className="text-xl text-slate-400 max-w-2xl">
            All notable changes to TrustScope. We follow semantic versioning 
            and ship frequently.
          </p>
        </div>
      </section>

      {/* Releases */}
      <section className="py-16">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-6 top-0 bottom-0 w-px bg-slate-700" />
              
              {/* Release entries */}
              <div className="space-y-12">
                {releases.map((release, i) => (
                  <div key={i} className="relative pl-16">
                    {/* Version badge */}
                    <div className={`absolute left-0 w-12 h-12 rounded-full flex items-center justify-center ${
                      release.type === 'major' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-slate-800 text-slate-300 border border-slate-700'
                    }`}>
                      <span className="text-xs font-bold">{release.version}</span>
                    </div>
                    
                    {/* Content */}
                    <div className="card p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h2 className="text-xl font-bold">{release.title}</h2>
                          <p className="text-slate-500 text-sm">{release.date}</p>
                        </div>
                        <span className={`px-2 py-1 text-xs rounded ${
                          release.type === 'major'
                            ? 'bg-blue-500/10 text-blue-400'
                            : 'bg-slate-700 text-slate-300'
                        }`}>
                          {release.type === 'major' ? 'Major Release' : 'Minor Release'}
                        </span>
                      </div>
                      
                      {/* Highlights */}
                      <div className="space-y-2 mb-4">
                        {release.highlights.map((highlight, j) => (
                          <div key={j} className="flex items-start gap-2 text-slate-400 text-sm">
                            <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                            {highlight}
                          </div>
                        ))}
                      </div>
                      
                      {/* Features grid for major releases */}
                      {release.features && (
                        <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-700">
                          {release.features.map((feature, j) => (
                            <div key={j} className="flex items-center gap-2 text-sm text-slate-300">
                              <feature.icon className="w-4 h-4 text-blue-400" />
                              {feature.text}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Subscribe */}
      <section className="py-16 bg-slate-900/30">
        <div className="section-container text-center">
          <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
          <p className="text-slate-400 mb-6">
            Get notified when we ship new features and improvements.
          </p>
          <Link href="/contact" className="btn-primary">
            Subscribe to Updates
          </Link>
        </div>
      </section>
    </div>
  )
}
