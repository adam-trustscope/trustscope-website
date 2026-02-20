import FrameworkLanding from '@/components/FrameworkLanding'

export default function SemanticKernelPage() {
  return (
    <FrameworkLanding
      framework="Semantic Kernel"
      snippet={`from semantic_kernel import Kernel\nfrom trustscope.semantic_kernel import TrustScopeFilter\n\nkernel = Kernel()\nkernel.add_filter(TrustScopeFilter())`}
      detail="Instrument prompt execution and tool calls with TrustScope runtime filters."
    />
  )
}
