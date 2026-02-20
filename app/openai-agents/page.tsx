import FrameworkLanding from '@/components/FrameworkLanding'

export default function OpenAIAgentsPage() {
  return (
    <FrameworkLanding
      framework="OpenAI Agents"
      snippet={`import { TrustScope } from '@trustscope/node'\nimport { Agent } from 'openai/agents'\n\nconst ts = new TrustScope({ apiKey: process.env.TRUSTSCOPE_API_KEY })\nconst agent = new Agent({ name: 'support', middleware: [ts.middleware()] })`}
      detail="Apply middleware once for policy checks, trace capture, and runtime decision evidence."
    />
  )
}
