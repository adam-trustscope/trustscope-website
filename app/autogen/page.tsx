import FrameworkLanding from '@/components/FrameworkLanding'

export default function AutoGenPage() {
  return (
    <FrameworkLanding
      framework="AutoGen"
      snippet={`from autogen import AssistantAgent\nfrom trustscope.autogen import TrustScopeObserver\n\nassistant = AssistantAgent(\n  name=\"assistant\",\n  runtime_observers=[TrustScopeObserver()]\n)`}
      detail="Instrument AutoGen conversations and tool usage for governance and evidence export."
    />
  )
}
