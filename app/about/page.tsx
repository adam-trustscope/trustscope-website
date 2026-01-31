import Link from 'next/link'
import { Shield, Target, Heart, Zap, ArrowRight, Linkedin, Twitter } from 'lucide-react'

const values = [
  {
    icon: Shield,
    title: 'Safety First',
    description: 'We believe AI should have brakes, not just cameras. Every feature we build prioritizes preventing harm over observing it.'
  },
  {
    icon: Target,
    title: 'Evidence Over Opinions',
    description: 'Compliance isn\'t about scores or checklists. It\'s about evidence. We generate cryptographically verifiable evidence, not readiness percentages.'
  },
  {
    icon: Heart,
    title: 'Developer Experience',
    description: 'Governance shouldn\'t slow you down. Our SDKs integrate in minutes, and our Gateway requires zero code changes.'
  },
  {
    icon: Zap,
    title: 'Real-Time by Default',
    description: 'Post-hoc analysis is too late. We operate inline with your agents, blocking threats before they cause damage.'
  },
]

const milestones = [
  { date: 'October 2025', event: 'TrustScope founded' },
  { date: 'December 2025', event: 'Core platform built' },
  { date: 'January 8, 2026', event: 'First patent filed (MAX - 119 claims)' },
  { date: 'January 2026', event: '274 total patent claims filed' },
  { date: 'January 2026', event: 'Production launch' },
]

const team = [
  {
    name: 'Adam Layman',
    role: 'Founder & CEO',
    bio: 'Previously built AI systems at scale. Obsessed with making AI safe for enterprise.',
    linkedin: '#',
    twitter: '#',
  },
]

export default function AboutPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-24 bg-gradient-to-b from-blue-600/10 to-transparent">
        <div className="section-container">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Building the Safety Layer
              <br />
              <span className="gradient-text">for AI Agents</span>
            </h1>
            <p className="text-xl text-slate-400">
              We started TrustScope because we saw enterprises deploying AI agents 
              without any way to document they were under control. That's a liability 
              time bomb. We're building the solution.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24">
        <div className="section-container">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-slate-400 mb-6">
                When an auditor asks "show me your AI agents followed policy," 
                every company should have a clear answer. Today, most don't. 
                Tomorrow, they'll be required to.
              </p>
              <p className="text-lg text-slate-400 mb-6">
                We're building evidence infrastructure—the layer between AI agents 
                and the enterprises that deploy them. We capture every action, 
                detect every threat, and generate cryptographically verifiable 
                evidence that controls were in place.
              </p>
              <p className="text-lg text-slate-300 font-medium">
                Not a score. Not a checklist. Evidence.
              </p>
            </div>
            <div className="card bg-blue-500/5 border-blue-500/20 p-8">
              <blockquote className="text-xl italic text-slate-300 mb-4">
                "The question isn't IF your AI agent will do something wrong—it's 
                whether you can DOCUMENT you had safeguards when it happens."
              </blockquote>
              <p className="text-slate-500">— Adam Layman, Founder</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-slate-900/30">
        <div className="section-container">
          <h2 className="text-3xl font-bold text-center mb-12">What We Believe</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => (
              <div key={i} className="card">
                <value.icon className="w-8 h-8 text-blue-400 mb-4" />
                <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                <p className="text-slate-400 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24">
        <div className="section-container">
          <h2 className="text-3xl font-bold text-center mb-12">Our Journey</h2>
          
          <div className="max-w-2xl mx-auto">
            {milestones.map((milestone, i) => (
              <div key={i} className="flex gap-6 mb-8 last:mb-0">
                <div className="w-32 shrink-0 text-right">
                  <span className="text-slate-500 text-sm">{milestone.date}</span>
                </div>
                <div className="relative">
                  <div className="absolute left-0 top-2 w-3 h-3 rounded-full bg-blue-500" />
                  {i < milestones.length - 1 && (
                    <div className="absolute left-1.5 top-5 w-0.5 h-full bg-slate-700 -translate-x-1/2" />
                  )}
                  <p className="pl-6 text-slate-300">{milestone.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-slate-900/30">
        <div className="section-container">
          <h2 className="text-3xl font-bold text-center mb-12">Leadership</h2>
          
          <div className="max-w-md mx-auto">
            {team.map((member, i) => (
              <div key={i} className="card text-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 mx-auto mb-4" />
                <h3 className="font-semibold text-xl mb-1">{member.name}</h3>
                <p className="text-blue-400 text-sm mb-4">{member.role}</p>
                <p className="text-slate-400 text-sm mb-6">{member.bio}</p>
                <div className="flex justify-center gap-4">
                  <a href={member.linkedin} className="text-slate-500 hover:text-white transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href={member.twitter} className="text-slate-500 hover:text-white transition-colors">
                    <Twitter className="w-5 h-5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Patents */}
      <section className="py-24">
        <div className="section-container">
          <div className="card bg-gradient-to-r from-amber-500/10 to-orange-500/10 border-amber-500/30 p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">274 Patent Claims</h2>
            <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
              Our core technology is protected by 3 provisional patents covering 
              governance evidence binding, coverage verification, and semantic 
              manifest inspection.
            </p>
            <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="p-4">
                <div className="text-3xl font-bold text-amber-400 mb-2">119</div>
                <div className="text-sm text-slate-400">MAX Claims</div>
                <div className="text-xs text-slate-500">Evidence Binding</div>
              </div>
              <div className="p-4">
                <div className="text-3xl font-bold text-amber-400 mb-2">53</div>
                <div className="text-sm text-slate-400">AGB Claims</div>
                <div className="text-xs text-slate-500">Coverage Verification</div>
              </div>
              <div className="p-4">
                <div className="text-3xl font-bold text-amber-400 mb-2">102</div>
                <div className="text-sm text-slate-400">SMI Claims</div>
                <div className="text-xs text-slate-500">Semantic Inspection</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="section-container text-center">
          <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
          <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
            We're building the safety layer for AI agents. 
            Want to learn more about AI governance?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-primary inline-flex items-center gap-2">
              Contact Us <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="https://app.trustscope.ai" className="btn-secondary">
              Try TrustScope Free
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
