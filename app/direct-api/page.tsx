import FrameworkLanding from '@/components/FrameworkLanding'

export default function DirectAPIPage() {
  return (
    <FrameworkLanding
      framework="Direct API"
      headline="TrustScope for direct LLM API calls"
      snippet={`export OPENAI_BASE_URL=https://api.trustscope.ai/gateway\nexport TRUSTSCOPE_API_KEY=ts_live_abc123\n\n# Existing OpenAI-compatible clients continue working.`}
      detail="Use Gateway mode when you have custom orchestration and want zero refactor instrumentation."
    />
  )
}
