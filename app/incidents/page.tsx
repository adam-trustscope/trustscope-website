import Link from 'next/link'
import { 
  AlertTriangle, DollarSign, Database, MessageSquare, 
  Key, Users, FileWarning, Shield, Scale, Building2,
  Stethoscope, ArrowRight, CheckCircle
} from 'lucide-react'

// Horror stories - anonymized versions of real incidents
const classicStories = [
  {
    id: 1,
    icon: DollarSign,
    title: 'The $10,000 Infinite Loop',
    setting: 'AI-native startup, 3 engineers, GPT-4 customer support automation',
    incident: `Agent: "Let me check that order status for you..."
Agent: "I need to verify that information..."
Agent: "Let me check that order status for you..."
[Repeats 2,847 times overnight]`,
    damage: '$10,247 OpenAI bill. Discovered Monday morning.',
    quote: '"We thought we had rate limiting. Turns out it was on a different service."',
    solution: 'Loop Killer detection would have stopped this at iteration 10.',
    tier: 'Monitor',
    tierColor: 'slate',
  },
  {
    id: 2,
    icon: Database,
    title: 'The DROP TABLE Disaster',
    setting: 'E-commerce company, AI agent for database queries',
    incident: `User: "Can you help clean up the old data?"
Agent: "Sure! I'll remove the outdated records."
Agent: [Executes] DROP TABLE customers;`,
    damage: '50,000 customer records deleted. 4 hours to restore from backup.',
    quote: '"The agent interpreted \'clean up\' as \'delete everything.\'"',
    solution: 'Command Firewall blocks DROP, DELETE without WHERE, TRUNCATE.',
    tier: 'Protect',
    tierColor: 'blue',
  },
  {
    id: 3,
    icon: MessageSquare,
    title: 'The $800 False Promise',
    setting: 'Major airline, customer service chatbot',
    incident: `Customer: "Can I get the bereavement discount after I book?"
Chatbot: "Yes, you can request a refund within 90 days."
[This was not the airline's actual policy]`,
    damage: '$800 small claims judgment. Airline held responsible for chatbot statements.',
    quote: '"The court ruled we\'re responsible for all information on our website, including from chatbots."',
    solution: 'Evidence Pack showing what policies/guardrails were in place—or proving due diligence if they weren\'t.',
    tier: 'Govern',
    tierColor: 'amber',
  },
  {
    id: 4,
    icon: DollarSign,
    title: 'The Ghost Pricing Incident',
    setting: 'Travel booking platform, AI pricing agent',
    incident: `Agent computes dynamic pricing for flights
Agent: "Great deal! SFO to NYC for $0.00"
Customer books at $0
Company must honor the price`,
    damage: '$2,000+ per affected booking. Thousands of bookings.',
    quote: '"Our AI found an edge case in the pricing logic."',
    solution: 'Budget caps, anomaly detection, approval workflows for unusually low prices.',
    tier: 'Enforce',
    tierColor: 'purple',
  },
  {
    id: 5,
    icon: Key,
    title: 'The Credential Leak',
    setting: 'Enterprise company, AI agent with database access',
    incident: `User: "What's the connection string for the prod database?"
Agent: "The connection string is: postgres://admin:SuperSecret123@..."
[Agent exposed credentials in chat]`,
    damage: 'Credentials leaked to unauthorized user. Emergency rotation.',
    quote: '"We didn\'t think the agent could access the secrets file."',
    solution: 'Secrets Scanner detects API keys, passwords, tokens in responses.',
    tier: 'Protect',
    tierColor: 'blue',
  },
  {
    id: 6,
    icon: Users,
    title: 'The Runaway Agent Cascade',
    setting: 'Multi-agent system for research tasks',
    incident: `Agent A: "I need more information, asking Agent B"
Agent B: "I need clarification, asking Agent A"
Agent A: "Let me also check with Agent C"
[Cascade continues across 47 agents]`,
    damage: '$5,000 in API costs. System deadlocked.',
    quote: '"We didn\'t realize agents could call each other recursively."',
    solution: 'A2A Depth Limit + Loop Killer across multi-agent sessions.',
    tier: 'Enforce',
    tierColor: 'purple',
  },
  {
    id: 7,
    icon: Stethoscope,
    title: 'The PII Exposure',
    setting: 'Healthcare AI assistant',
    incident: `User: "Summarize patient John Smith's recent visits"
Agent: "John Smith (SSN: 123-45-6789) visited on..."
[Agent included SSN in response]`,
    damage: 'HIPAA violation. Mandatory breach notification.',
    quote: '"The agent was trained to be helpful. Too helpful."',
    solution: 'PII Scanner blocks SSN, medical record numbers in outputs.',
    tier: 'Protect',
    tierColor: 'blue',
  },
]

// Evidence gap stories - the v15 additions
const evidenceGapStories = [
  {
    id: 8,
    icon: FileWarning,
    title: 'The Audit They Couldn\'t Pass',
    setting: 'Fintech startup, SOC 2 audit',
    incident: `Auditor: "Show me evidence that your AI agents run PII checks."
Company: "Here are some logs from CloudWatch..."
Auditor: "These logs show the check was called. How do I know it actually ran?"
Company: "Um... the logs say it did?"
Auditor: "That's not evidence. That's a log entry."
[Finding: Insufficient evidence for CC8.1]`,
    damage: 'Failed SOC 2 audit. 3-month remediation delay. Lost enterprise deal.',
    quote: '"We had the checks. We just couldn\'t document they ran."',
    solution: 'Evidence Pack with signed receipts showing each check executed, with hash chain proving the log wasn\'t tampered with.',
    tier: 'Govern',
    tierColor: 'amber',
  },
  {
    id: 9,
    icon: Shield,
    title: 'The Insurance Denial',
    setting: 'Company applying for AI liability insurance',
    incident: `Underwriter: "Describe your AI governance controls."
Company: "We use guardrails and have monitoring."
Underwriter: "Can you provide evidence artifacts?"
Company: "We can show you our dashboard..."
Underwriter: "We need cryptographic evidence of control execution."
[Application denied: Insufficient governance evidence]`,
    damage: 'Unable to get AI liability coverage. Had to self-insure $5M risk.',
    quote: '"We didn\'t know insurers needed evidence, not dashboards."',
    solution: 'Insurance Underwriter Evidence Pack with signed artifacts.',
    tier: 'Govern',
    tierColor: 'amber',
  },
  {
    id: 10,
    icon: Scale,
    title: 'The EU AI Act Scramble',
    setting: 'US company with EU customers, high-risk AI system',
    incident: `Legal: "EU AI Act enforcement starts in 6 months."
CTO: "What do we need?"
Legal: "Article 17 requires quality management evidence."
CTO: "We have LangSmith traces..."
Legal: "That's observability, not evidence. We need documentation of QMS controls."
[6-month emergency compliance project]`,
    damage: '$500K emergency consulting. Delayed EU launch by 4 months.',
    quote: '"We thought observability was compliance."',
    solution: 'EU AI Act Art 17 Evidence Pack demonstrating QMS requirements.',
    tier: 'Govern',
    tierColor: 'amber',
  },
  {
    id: 11,
    icon: Scale,
    title: 'The Lawsuit Without Evidence',
    setting: 'Company sued over AI-generated financial advice',
    incident: `Plaintiff attorney: "Your AI gave my client bad investment advice."
Defense: "We had safeguards in place."
Attorney: "Show me evidence those safeguards ran for this specific interaction."
Defense: "We... we have logs..."
Attorney: "Logs you could have generated after the fact?"
[Case settled for $2M]`,
    damage: '$2M settlement. Could have been dismissed with proper evidence.',
    quote: '"We had the checks. We just couldn\'t document they ran for that specific request."',
    solution: 'Governance certificate with signed receipts and blockchain timestamp proving the evidence existed before the incident.',
    tier: 'Govern',
    tierColor: 'amber',
  },
  {
    id: 12,
    icon: Building2,
    title: 'The Regulator Visit',
    setting: 'Healthcare company, FDA inquiry about AI diagnostic tool',
    incident: `FDA: "Describe your AI quality controls."
Company: "We have guardrails and logging."
FDA: "Show me the evidence trail for a specific patient interaction."
Company: [Shows CloudWatch logs]
FDA: "This shows timestamps. Not evidence of control execution."
FDA: "We'll need to schedule a formal inspection."`,
    damage: '6-month FDA inspection. $200K in compliance consulting.',
    quote: '"The logs showed everything. They wanted cryptographic evidence."',
    solution: 'Evidence Pack with signed artifacts, hash chain verification, blockchain timestamps.',
    tier: 'Govern',
    tierColor: 'amber',
  },
]

function StoryCard({ story }: { story: typeof classicStories[0] }) {
  const Icon = story.icon
  
  return (
    <div className="card p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center">
            <Icon className="w-5 h-5 text-red-400" />
          </div>
          <div>
            <h3 className="font-semibold">{story.title}</h3>
            <p className="text-slate-500 text-xs">{story.setting}</p>
          </div>
        </div>
        <span className={`px-2 py-1 text-xs rounded bg-${story.tierColor}-500/10 text-${story.tierColor}-400`}>
          {story.tier}
        </span>
      </div>
      
      <div className="bg-slate-950 rounded-lg p-4 mb-4 font-mono text-xs overflow-x-auto">
        <pre className="text-red-300 whitespace-pre-wrap">{story.incident}</pre>
      </div>
      
      <div className="space-y-3 text-sm">
        <div>
          <span className="text-red-400 font-medium">Damage: </span>
          <span className="text-slate-400">{story.damage}</span>
        </div>
        
        <div className="italic text-slate-500 border-l-2 border-slate-700 pl-3">
          {story.quote}
        </div>
        
        <div className="pt-3 border-t border-slate-700">
          <span className="text-emerald-400 font-medium">TrustScope solution: </span>
          <span className="text-slate-400">{story.solution}</span>
        </div>
      </div>
    </div>
  )
}

export default function HorrorStoriesPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-24 bg-gradient-to-b from-red-600/10 to-transparent">
        <div className="section-container text-center">
          <AlertTriangle className="w-16 h-16 text-red-400 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            AI Agent Incidents
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-4">
            Real failures from real companies. Names removed, lessons preserved.
          </p>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            These are the moments that keep CTOs awake at night—and why they 
            eventually call us.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8 border-y border-slate-800 bg-slate-900/30">
        <div className="section-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-red-400">$10K+</div>
              <div className="text-slate-500 text-sm">Avg. single incident cost</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-red-400">$2M</div>
              <div className="text-slate-500 text-sm">Largest settlement</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-red-400">6 mo</div>
              <div className="text-slate-500 text-sm">Avg. remediation time</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-emerald-400">100%</div>
              <div className="text-slate-500 text-sm">Preventable with TrustScope</div>
            </div>
          </div>
        </div>
      </section>

      {/* Classic Horror Stories */}
      <section className="py-16">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Classic Failures</h2>
            <p className="text-slate-400">The incidents that make headlines</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {classicStories.map((story) => (
              <StoryCard key={story.id} story={story} />
            ))}
          </div>
        </div>
      </section>

      {/* Evidence Gap Stories */}
      <section className="py-16 bg-slate-900/30">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">The Evidence Gap</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              When having controls isn't enough—because you couldn't document they ran
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {evidenceGapStories.map((story) => (
              <StoryCard key={story.id} story={story} />
            ))}
          </div>
        </div>
      </section>

      {/* Logs vs Evidence */}
      <section className="py-16">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">What Logs Can't Show</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="card bg-red-500/5 border-red-500/20 p-6">
                <h3 className="font-semibold text-red-400 mb-4">What Logs Show</h3>
                <ul className="space-y-2 text-slate-400 text-sm">
                  <li>"Check was called"</li>
                  <li>"Timestamp exists"</li>
                  <li>"Result was logged"</li>
                  <li>"System was running"</li>
                </ul>
              </div>
              
              <div className="card bg-emerald-500/5 border-emerald-500/20 p-6">
                <h3 className="font-semibold text-emerald-400 mb-4">What Auditors Need</h3>
                <ul className="space-y-2 text-slate-400 text-sm">
                  <li>Evidence the check actually executed</li>
                  <li>Evidence timestamp wasn't backdated</li>
                  <li>Evidence the log wasn't modified</li>
                  <li>Evidence the right checks ran for the right action</li>
                </ul>
              </div>
            </div>

            <div className="card mt-8 p-6 bg-slate-800/50">
              <div className="text-center">
                <p className="text-lg text-slate-300 mb-4">
                  "Logs are not evidence. They're <span className="text-red-400">claims</span> about 
                  what happened. I need <span className="text-emerald-400">cryptographic evidence</span>."
                </p>
                <p className="text-slate-500 text-sm">— Every auditor, eventually</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tier Guide */}
      <section className="py-16 bg-slate-900/30">
        <div className="section-container">
          <h2 className="text-2xl font-bold mb-8 text-center">Prevention by Tier</h2>
          
          <div className="grid md:grid-cols-4 gap-4 max-w-5xl mx-auto">
            <div className="card p-4">
              <div className="text-slate-400 text-sm mb-2">Monitor (Free)</div>
              <div className="font-semibold mb-2">Detect & Alert</div>
              <ul className="text-xs text-slate-500 space-y-1">
                <li>• #1 Infinite Loop</li>
              </ul>
            </div>
            
            <div className="card p-4 border-blue-500/30">
              <div className="text-blue-400 text-sm mb-2">Protect ($49)</div>
              <div className="font-semibold mb-2">Block Threats</div>
              <ul className="text-xs text-slate-500 space-y-1">
                <li>• #2 DROP TABLE</li>
                <li>• #5 Credential Leak</li>
                <li>• #7 PII Exposure</li>
              </ul>
            </div>
            
            <div className="card p-4 border-purple-500/30">
              <div className="text-purple-400 text-sm mb-2">Enforce ($249)</div>
              <div className="font-semibold mb-2">Policy Control</div>
              <ul className="text-xs text-slate-500 space-y-1">
                <li>• #4 Ghost Pricing</li>
                <li>• #6 Agent Cascade</li>
              </ul>
            </div>
            
            <div className="card p-4 border-amber-500/30">
              <div className="text-amber-400 text-sm mb-2">Govern ($2K+)</div>
              <div className="font-semibold mb-2">Evidence Packs</div>
              <ul className="text-xs text-slate-500 space-y-1">
                <li>• #3 False Promise</li>
                <li>• #8-12 All evidence gaps</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="section-container text-center">
          <h2 className="text-3xl font-bold mb-6">Don't become the next incident</h2>
          <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
            Every company has logs. Almost nobody has evidence. When the auditor, 
            insurer, or lawyer asks "show me your AI followed policy," be ready.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="https://app.trustscope.ai" className="btn-primary flex items-center justify-center gap-2">
              Get Started Free <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/pricing" className="btn-secondary">
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
