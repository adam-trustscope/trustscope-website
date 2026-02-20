import FrameworkLanding from '@/components/FrameworkLanding'

export default function CrewAIPage() {
  return (
    <FrameworkLanding
      framework="CrewAI"
      snippet={`from crewai import Agent\nfrom trustscope.crewai import TrustScopeCrewCallback\n\nagent = Agent(\n  role=\"Analyst\",\n  callbacks=[TrustScopeCrewCallback()]\n)`}
      detail="Capture task-level behavior across agents and delegation chains with runtime policy controls."
    />
  )
}
