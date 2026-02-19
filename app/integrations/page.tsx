import Link from 'next/link'
import {
  ArrowRight, CheckCircle, Code, Terminal, Link2,
  Puzzle, Workflow, Server, Cpu, Shield,
  GitBranch, Box, MessageSquare, Zap
} from 'lucide-react'

// Integration methods
const integrationMethods = [
  {
    name: 'Gateway Proxy',
    icon: Link2,
    description: 'Route LLM traffic through TrustScope. Zero code changes required.',
    effort: '5 minutes',
    code: `# Just change your base URL
OPENAI_BASE_URL=https://gateway.trustscope.ai/v1

# Or in code:
client = OpenAI(
    base_url="https://gateway.trustscope.ai/v1",
    default_headers={
        "X-TrustScope-Key": "ts_live_xxx"
    }
)`,
    providers: ['OpenAI', 'Anthropic', 'Azure', 'Vertex AI', 'Ollama', 'vLLM', 'Groq', 'Mistral'],
    features: ['Drop-in compatible', 'No code changes', 'All providers supported', 'Request/response capture'],
  },
  {
    name: 'Python SDK',
    icon: Code,
    description: 'Instrument your code directly for maximum control and context.',
    effort: '15 minutes',
    code: `from trustscope import TrustScope

ts = TrustScope(api_key="ts_live_xxx")

@ts.observe("process_order")
def process_order(order_id: str) -> dict:
    return {"status": "completed"}

@ts.enforce("process_refund", policies=["max_amount"])
def process_refund(amount: float) -> dict:
    return {"refunded": amount}`,
    providers: ['Any Python app'],
    features: ['Decorator-based', 'Policy enforcement', 'Context capture', 'Async support'],
  },
  {
    name: 'Node.js SDK',
    icon: Box,
    description: 'Full TypeScript support with async/await patterns.',
    effort: '15 minutes',
    code: `import { TrustScope } from '@trustscope/sdk';

const ts = new TrustScope({ apiKey: 'ts_live_xxx' });

// Wrap your agent function
const safeAgent = ts.enforce(
  'customer-support',
  async (input) => await agent.run(input),
  { policies: ['pii_block', 'cost_limit'] }
);`,
    providers: ['Any Node.js app'],
    features: ['TypeScript native', 'Promise-based', 'Express middleware', 'Edge runtime support'],
  },
  {
    name: 'MCP Integration',
    icon: Puzzle,
    description: 'Monitor Model Context Protocol tool usage across Claude and other MCP clients.',
    effort: '10 minutes',
    code: `// MCP server configuration
{
  "mcpServers": {
    "trustscope": {
      "command": "trustscope-mcp",
      "args": ["--api-key", "ts_live_xxx"],
      "env": {}
    }
  }
}`,
    providers: ['Claude Desktop', 'Any MCP client'],
    features: ['Tool monitoring', 'MCP allowlisting', 'Resource tracking', 'Server whitelisting'],
  },
  {
    name: 'LangChain Callback',
    icon: GitBranch,
    description: 'Drop-in callback handler for LangChain applications.',
    effort: '5 minutes',
    code: `from trustscope.langchain import TrustScopeCallback

callback = TrustScopeCallback(api_key="ts_live_xxx")

chain = LLMChain(llm=llm, prompt=prompt)
chain.run(input, callbacks=[callback])`,
    providers: ['LangChain', 'LangGraph'],
    features: ['Chain tracing', 'Tool capture', 'Memory tracking', 'Agent loops'],
  },
  {
    name: 'CrewAI Callback',
    icon: Workflow,
    description: 'Native integration for CrewAI multi-agent workflows.',
    effort: '5 minutes',
    code: `from trustscope.crewai import TrustScopeCallback

crew = Crew(
    agents=[researcher, writer],
    tasks=[research_task, write_task],
    callbacks=[TrustScopeCallback()]
)`,
    providers: ['CrewAI'],
    features: ['Agent tracking', 'Task capture', 'Delegation monitoring', 'Crew sessions'],
  },
  {
    name: 'Google A2A',
    icon: Server,
    description: 'Monitor Google\'s Agent-to-Agent protocol communications.',
    effort: '10 minutes',
    code: `# Google A2A integration
from trustscope.a2a import A2AMonitor

monitor = A2AMonitor(api_key="ts_live_xxx")

# Wrap your A2A client
a2a_client = monitor.wrap(original_client)`,
    providers: ['Google A2A Protocol'],
    features: ['Session tracking', 'Depth limits', 'Cascade monitoring', 'Cross-agent traces'],
  },
  {
    name: 'CLI Tool',
    icon: Terminal,
    description: 'Command-line interface for testing and debugging.',
    effort: '2 minutes',
    code: `# Install
npx @trustscope/cli

# Test a prompt
trustscope test "What is 2+2?" --agent my-agent

# Check policy
trustscope check --policy pii_block --input "My SSN is..."

# View recent traces
trustscope traces --last 10`,
    providers: ['Any terminal'],
    features: ['Quick testing', 'Policy debugging', 'Trace inspection', 'Bulk operations'],
  },
]

// Providers supported via Gateway
const gatewayProviders = [
  { name: 'OpenAI', logo: '🟢', status: 'Full support' },
  { name: 'Anthropic', logo: '🟠', status: 'Full support' },
  { name: 'Azure OpenAI', logo: '🔵', status: 'Full support' },
  { name: 'Google Vertex AI', logo: '🔴', status: 'Full support' },
  { name: 'Ollama', logo: '🦙', status: 'Full support' },
  { name: 'vLLM', logo: '⚡', status: 'Full support' },
  { name: 'Groq', logo: '🟣', status: 'Full support' },
  { name: 'Mistral', logo: '🌀', status: 'Full support' },
  { name: 'Together AI', logo: '🤝', status: 'Full support' },
  { name: 'Anyscale', logo: '📐', status: 'Full support' },
]

export default function IntegrationsPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-24 bg-gradient-to-b from-blue-600/10 to-transparent">
        <div className="section-container text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Universal Ingestion
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-8">
            One platform, every integration method. Capture all AI agent traffic 
            regardless of how you deploy—Gateway, SDK, MCP, or framework callbacks.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="https://app.trustscope.ai" className="btn-primary flex items-center justify-center gap-2">
              Start Free <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="https://docs.trustscope.ai" target="_blank" rel="noopener noreferrer" className="btn-secondary">
              View Documentation
            </Link>
          </div>
        </div>
      </section>

      {/* Key Message */}
      <section className="py-16 border-y border-slate-800 bg-slate-900/30">
        <div className="section-container">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-400 mb-2">8</div>
              <div className="text-slate-400">Integration Methods</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-emerald-400 mb-2">10+</div>
              <div className="text-slate-400">LLM Providers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-400 mb-2">5 min</div>
              <div className="text-slate-400">Average Setup</div>
            </div>
          </div>
        </div>
      </section>

      {/* Integration Methods */}
      <section className="py-24">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Choose Your Integration</h2>
            <p className="text-slate-400">All methods available on all tiers. Mix and match as needed.</p>
          </div>

          <div className="space-y-8">
            {integrationMethods.map((method, i) => (
              <div key={i} className="card p-8">
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Info */}
                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                        <method.icon className="w-6 h-6 text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-xl">{method.name}</h3>
                        <p className="text-slate-500 text-sm">Setup: ~{method.effort}</p>
                      </div>
                    </div>
                    
                    <p className="text-slate-400 mb-6">{method.description}</p>
                    
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-slate-300 mb-2">Works with:</h4>
                      <div className="flex flex-wrap gap-2">
                        {method.providers.map((provider, j) => (
                          <span key={j} className="px-2 py-1 bg-slate-800 rounded text-xs text-slate-400">
                            {provider}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-slate-300 mb-2">Features:</h4>
                      <ul className="grid grid-cols-2 gap-1">
                        {method.features.map((feature, j) => (
                          <li key={j} className="text-sm text-slate-500 flex items-center gap-2">
                            <CheckCircle className="w-3 h-3 text-emerald-500" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  {/* Code */}
                  <div className="bg-slate-950 rounded-lg overflow-hidden">
                    <div className="bg-slate-800 px-4 py-2 border-b border-slate-700">
                      <span className="text-slate-400 text-sm">Quick Start</span>
                    </div>
                    <pre className="p-4 text-sm overflow-x-auto">
                      <code className="text-slate-300">{method.code}</code>
                    </pre>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gateway Providers */}
      <section className="py-24 bg-slate-900/30">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Gateway Supported Providers</h2>
            <p className="text-slate-400">Drop-in compatible with all major LLM providers</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-4xl mx-auto">
            {gatewayProviders.map((provider, i) => (
              <div key={i} className="card p-4 text-center">
                <div className="text-2xl mb-2">{provider.logo}</div>
                <div className="font-medium text-sm">{provider.name}</div>
                <div className="text-xs text-emerald-400">{provider.status}</div>
              </div>
            ))}
          </div>

          <p className="text-center text-slate-500 text-sm mt-8">
            Any OpenAI-compatible API works automatically via the Gateway.
          </p>
        </div>
      </section>

      {/* Why Universal Ingestion */}
      <section className="py-24">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Universal Ingestion Matters</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="card p-6">
              <Shield className="w-8 h-8 text-blue-400 mb-4" />
              <h3 className="font-semibold text-lg mb-2">Complete Coverage</h3>
              <p className="text-slate-400 text-sm">
                No blind spots. Every AI action captured regardless of integration method. 
                Mix Gateway for quick wins, SDK for custom logic.
              </p>
            </div>
            
            <div className="card p-6">
              <Zap className="w-8 h-8 text-emerald-400 mb-4" />
              <h3 className="font-semibold text-lg mb-2">Incremental Adoption</h3>
              <p className="text-slate-400 text-sm">
                Start with Gateway (5 minutes). Add SDK instrumentation gradually. 
                No big-bang migration required.
              </p>
            </div>
            
            <div className="card p-6">
              <Workflow className="w-8 h-8 text-purple-400 mb-4" />
              <h3 className="font-semibold text-lg mb-2">Framework Agnostic</h3>
              <p className="text-slate-400 text-sm">
                LangChain today, CrewAI tomorrow, custom agents next week. 
                One governance layer across all frameworks.
              </p>
            </div>
            
            <div className="card p-6">
              <MessageSquare className="w-8 h-8 text-amber-400 mb-4" />
              <h3 className="font-semibold text-lg mb-2">Consistent Evidence</h3>
              <p className="text-slate-400 text-sm">
                Same audit trail format regardless of integration method. 
                Unified Evidence Packs for compliance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-slate-900/30">
        <div className="section-container text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to integrate?</h2>
          <p className="text-xl text-slate-400 mb-8">
            Most teams are capturing traces within 15 minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="https://app.trustscope.ai" className="btn-primary">
              Get Started Free
            </Link>
            <Link href="https://docs.trustscope.ai/quickstart" target="_blank" rel="noopener noreferrer" className="btn-secondary">
              Read Quickstart Guide
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
