import FrameworkLanding from '@/components/FrameworkLanding'

export default function LlamaIndexPage() {
  return (
    <FrameworkLanding
      framework="LlamaIndex"
      snippet={`from llama_index.llms.openai import OpenAI\nfrom trustscope.llamaindex import TrustScopeCallback\n\nllm = OpenAI(model=\"gpt-4o\", callbacks=[TrustScopeCallback()])`}
      detail="Add callback-based governance coverage for query pipelines and retrieval workflows."
    />
  )
}
