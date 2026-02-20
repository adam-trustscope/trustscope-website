import FrameworkLanding from '@/components/FrameworkLanding'

export default function LangChainPage() {
  return (
    <FrameworkLanding
      framework="LangChain"
      snippet={`from langchain_openai import ChatOpenAI\nfrom trustscope.langchain import TrustScopeCallbackHandler\n\nllm = ChatOpenAI(model=\"gpt-4o\")\nresult = llm.invoke(\"Explain risk controls\", config={\"callbacks\": [TrustScopeCallbackHandler()]})`}
      detail="Attach the callback handler once to capture traces, enforce policies, and generate evidence metadata."
    />
  )
}
