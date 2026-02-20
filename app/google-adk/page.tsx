import FrameworkLanding from '@/components/FrameworkLanding'

export default function GoogleADKPage() {
  return (
    <FrameworkLanding
      framework="Google ADK"
      snippet={`from google.adk import Agent\nfrom trustscope.gateway import trustscope_base_url\n\nagent = Agent(\n  model=\"gemini-2.0\",\n  base_url=trustscope_base_url()\n)`}
      detail="Route ADK model traffic through TrustScope Gateway for detection, policy, and evidence instrumentation."
    />
  )
}
