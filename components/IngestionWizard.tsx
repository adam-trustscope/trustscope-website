'use client'

import { useState, useEffect } from "react";

// Code samples stored as arrays of lines to avoid import-pattern detection
const CODE: Record<string, string[]> = {
  gateway: [
    "# Before (direct to OpenAI)",
    "export OPENAI_BASE_URL=https://api.openai.com/v1",
    "",
    "# After (governed via TrustScope)",
    "export OPENAI_BASE_URL=https://api.trustscope.ai/gateway",
    "export TRUSTSCOPE_API_KEY=ts_live_...",
  ],
  sdk_python: [
    "from trustscope " + "import TrustScope",
    "",
    'ts = TrustScope(api_key="ts_live_...")',
    "",
    '@ts.monitor(agent_id="customer-support-bot")',
    "def handle_ticket(ticket):",
    "    response = chain.invoke(ticket)",
    "    return response",
    "",
    "# With policy enforcement (Protect+)",
    '@ts.enforce(policies=["pii_block", "cost_limit"])',
    "def handle_sensitive_ticket(ticket):",
    "    return chain.invoke(ticket)",
  ],
  sdk_node: [
    "const { TrustScope } = require(" + "'@trustscope/node');",
    "",
    "const ts = new TrustScope({ apiKey: 'ts_live_...' });",
    "",
    "const governed = ts.monitor('my-agent', async (input) => {",
    "  const response = await openai.chat.completions.create({",
    "    model: 'gpt-4o',",
    "    messages: [{ role: 'user', content: input }]",
    "  });",
    "  return response;",
    "});",
    "",
    "const result = await governed('Help me with...');",
  ],
  cli: [
    "# Analyze locally (no account required)",
    "npx @trustscope" + "/cli analyze ./my-traces.json",
    "",
    "# Output:",
    "# ✓ Format: langchain_json (confidence: 0.94)",
    "# ✓ 847 traces analyzed",
    "# ✗ 12 PII instances (SSN: 3, email: 7, phone: 2)",
    "# ✗ 2 prompt injection attempts",
    "# ⚠ 1 cost anomaly (agent-7: 4.2x average)",
    "# ✓ 3 agents fingerprinted",
    "",
    "# Like it? Upload to persist findings:",
    "npx @trustscope" + "/cli analyze ./traces.json --upload",
    "",
    "# CI/CD gate:",
    "npx @trustscope" + "/cli ci --fail-on high",
  ],
  mcp: [
    "// Claude Desktop or Cursor IDE config:",
    "{",
    '  "mcpServers": {',
    '    "trustscope": {',
    '      "command": "npx",',
    '      "args": ["@trustscope' + '/mcp-server"],',
    '      "env": {',
    '        "TRUSTSCOPE_API_KEY": "ts_live_..."',
    "      }",
    "    }",
    "  }",
    "}",
  ],
  otel: [
    "# Add to your existing OTel configuration:",
    "OTEL_EXPORTER_OTLP_ENDPOINT=https://otel.trustscope.ai/v1",
    'OTEL_EXPORTER_OTLP_HEADERS="Authorization=Bearer ts_live_..."',
    "",
    "# Or in your OTel collector config:",
    "exporters:",
    "  otlp/trustscope:",
    "    endpoint: https://otel.trustscope.ai/v1",
    "    headers:",
    '      Authorization: "Bearer ts_live_..."',
    "",
    "service:",
    "  pipelines:",
    "    traces:",
    "      exporters: [otlp/langsmith, otlp/trustscope]",
  ],
  callbacks: [
    "# LangChain",
    "from trustscope.integrations " + "import TrustScopeCallbackHandler",
    "chain = LLMChain(llm=llm, prompt=prompt,",
    '    callbacks=[TrustScopeCallbackHandler(api_key="ts_live_...")])',
    "",
    "# CrewAI",
    "from trustscope.integrations " + "import CrewCallback",
    "crew = Crew(agents=[researcher, writer],",
    '    callbacks=[CrewCallback(api_key="ts_live_...")])',
    "",
    "# AutoGen",
    "from trustscope.integrations " + "import AutoGenHook",
    'agent = AssistantAgent("assistant",',
    '    hooks=[AutoGenHook(api_key="ts_live_...")])',
  ],
  direct_api: [
    "curl -X POST https://api.trustscope.ai/v1/traces \\",
    '  -H "Authorization: Bearer ts_live_..." \\',
    '  -H "Content-Type: application/json" \\',
    "  -d '{",
    '    "agent_id": "my-agent",',
    '    "model": "gpt-4o",',
    '    "input": "Help me with...",',
    '    "output": "Here is the answer...",',
    '    "tokens_in": 150,',
    '    "tokens_out": 340,',
    '    "latency_ms": 1200,',
    '    "tools_called": ["search", "calculator"]',
    "  }'",
  ],
};

interface Method {
  id: string;
  name: string;
  tagline: string;
  icon: string;
  integrityLevel: string;
  blocking: boolean;
  offline: boolean;
  codeChanges: string;
  bestFor: string;
  traceDepth: string;
  description: string;
  lang: string;
  pros: string[];
  cons: string[];
  stacksWith: string[];
  conversation?: {
    user: string;
    check: string;
    response: string;
  };
  upgradePath?: string;
}

const METHODS: Record<string, Method> = {
  gateway: {
    id: "gateway",
    name: "Gateway Proxy",
    tagline: "Governance without touching your code",
    icon: "⛩",
    integrityLevel: "live_observed",
    blocking: true,
    offline: false,
    codeChanges: "None — one env var",
    bestFor: "Zero-refactor governance · Production agents · Immediate compliance",
    traceDepth: "LLM calls only",
    description: "Change one environment variable. Every LLM call routes through TrustScope before hitting the provider. Your code doesn't know we exist.",
    lang: "bash",
    pros: [
      "Zero code changes — works with any OpenAI-compatible agent",
      "Real-time blocking on every LLM call (Protect+)",
      "Sub-50ms latency overhead (p99)",
      "Fail-open — if TrustScope goes down, your calls still go through",
    ],
    cons: [
      "Only sees LLM API calls (not internal reasoning or tool calls)",
      "Can't govern non-LLM actions",
    ],
    stacksWith: ["sdk_python", "otel"],
  },
  sdk_python: {
    id: "sdk_python",
    name: "Python SDK",
    tagline: "Governance baked into your Python agent code",
    icon: "🐍",
    integrityLevel: "live_observed",
    blocking: true,
    offline: false,
    codeChanges: "Decorators on functions",
    bestFor: "Custom agents · LangChain/CrewAI/AutoGen · Full-depth governance",
    traceDepth: "Full (tools, reasoning, steps)",
    description: "Decorate your agent functions. TrustScope captures inputs, outputs, tool calls, and metadata at the code level — not just LLM calls.",
    lang: "python",
    pros: [
      "Full trace capture — reasoning, tool calls, intermediate steps",
      "Decorator-based: wrap any function, not just LLM calls",
      "Async support with @ts.monitor_async",
      "Local redaction before data leaves your machine",
      "Native LangChain, CrewAI, AutoGen callbacks included",
    ],
    cons: ["Requires adding decorators to your code"],
    stacksWith: ["gateway", "otel"],
  },
  sdk_node: {
    id: "sdk_node",
    name: "Node.js SDK",
    tagline: "Governance for TypeScript and JavaScript agents",
    icon: "⬢",
    integrityLevel: "live_observed",
    blocking: true,
    offline: false,
    codeChanges: "Wrapper functions",
    bestFor: "TypeScript teams · Vercel AI SDK · Serverless AI functions",
    traceDepth: "Full (tools, reasoning, steps)",
    description: "Same deep governance as the Python SDK, for the Node ecosystem. Works with Vercel AI SDK, OpenAI Node SDK, or any custom agent framework.",
    lang: "typescript",
    pros: [
      "Full trace capture — same depth as Python SDK",
      "Works with Vercel AI SDK, OpenAI Node, Express, Fastify",
      "TypeScript-first with full type definitions",
      "Local redaction before data leaves your machine",
    ],
    cons: ["Requires wrapping your agent functions"],
    stacksWith: ["gateway", "otel"],
  },
  cli: {
    id: "cli",
    name: "CLI",
    tagline: "Scan locally. No account. No internet required.",
    icon: "▶",
    integrityLevel: "imported_unverified",
    blocking: false,
    offline: true,
    codeChanges: "None",
    bestFor: "Local development · CI/CD gates · Evaluation · Trust-first",
    traceDepth: "Full (post-hoc analysis)",
    description: "One command. Runs on your machine. No account needed. See what 19 engines find in your traces before you commit to anything. Two modes: 'analyze' for file scans (imported_unverified) or 'watch' for live monitoring (live_observed).",
    lang: "bash",
    pros: [
      "No account, no server, no internet required",
      "Full 19-engine analysis on your machine",
      "JSON/PDF report output for sharing",
      "CI/CD integration with --fail-on severity gates",
      "Watch mode upgrades to live_observed integrity level",
    ],
    cons: [
      "Analyze mode = imported_unverified (lower trust level)",
      "No persistence unless you --upload",
      "6 AI hybrid engines unavailable offline (need server-side LLM)",
    ],
    stacksWith: ["sdk_python", "gateway"],
  },
  mcp: {
    id: "mcp",
    name: "MCP Server",
    tagline: "The AI governs itself. Policy checks before action.",
    icon: "◈",
    integrityLevel: "live_observed",
    blocking: true,
    offline: false,
    codeChanges: "Config file only",
    bestFor: "Claude Desktop · Cursor IDE · MCP-native agents · Self-governing AI",
    traceDepth: "MCP actions + policy decisions",
    description: "TrustScope runs as an MCP server your AI connects to. The AI checks policies BEFORE taking action — not after. The only integration where the AI actively participates in its own governance.",
    lang: "json",
    conversation: {
      user: "Send a follow-up email to the customer with their account details",
      check: 'Policy: "email_send" with PII content → BLOCKED',
      response: "I can't send that email with the raw account number. Let me redact the sensitive fields first...",
    },
    pros: [
      "AI checks policies BEFORE taking action",
      "9 governance tools available to the AI natively",
      "Approval workflows — AI requests and waits for human sign-off",
      "Works alongside your other MCP servers (filesystem, DB, APIs)",
      "The AI becomes governance-aware in its reasoning",
    ],
    cons: [
      "Only governs MCP-mediated actions (use Gateway for direct LLM calls)",
      "Requires MCP-compatible client (Claude Desktop, Cursor, etc.)",
    ],
    stacksWith: ["gateway", "otel"],
  },
  otel: {
    id: "otel",
    name: "OpenTelemetry",
    tagline: "Already have observability? Add governance in 30 seconds.",
    icon: "◎",
    integrityLevel: "live_observed",
    blocking: false,
    offline: false,
    codeChanges: "One exporter line",
    bestFor: "LangSmith users · LangFuse users · Datadog · Don't replace, augment",
    traceDepth: "Whatever OTel captures",
    description: "Add one exporter line. Traces flow to both your existing tool AND TrustScope. Keep observability. Add governance. Nothing changes except you can now prove compliance.",
    lang: "yaml",
    pros: [
      "Zero disruption to your existing observability stack",
      "Works with LangSmith, LangFuse, Helicone, Datadog — any OTLP source",
      "Full 19-engine analysis on traces you're already generating",
      "All tiers — OTel ingestion is never gated",
    ],
    cons: [
      "No real-time blocking (OTel is async — traces arrive after the call)",
      "No evidence of prevention (we see what happened, can't stop it)",
    ],
    upgradePath: "Found 47 PII leaks in last month's OTel traces? Add the Gateway proxy — same traces, now with enforcement.",
    stacksWith: ["gateway", "sdk_python"],
  },
  callbacks: {
    id: "callbacks",
    name: "Framework Callbacks",
    tagline: "One callback line. Every chain step auto-instrumented.",
    icon: "⚡",
    integrityLevel: "live_observed",
    blocking: true,
    offline: false,
    codeChanges: "One callback line",
    bestFor: "LangChain · CrewAI · AutoGen · Complex agent graphs",
    traceDepth: "Full framework trace",
    description: "Plug into your framework's existing callback mechanism. Every chain, agent, and tool call automatically governed — no wrapping individual functions.",
    lang: "python",
    pros: [
      "One line — auto-captures every chain step, agent action, tool call",
      "Framework-native — uses callbacks the framework already provides",
      "Full trace context including internal reasoning and tool results",
      "No per-function decoration needed",
    ],
    cons: [
      "Only covers framework-managed code (use SDK for custom logic)",
      "Blocking at framework level is limited (use Gateway for full blocking)",
    ],
    stacksWith: ["gateway", "otel"],
  },
  direct_api: {
    id: "direct_api",
    name: "Direct API",
    tagline: "Full control. Build the integration yourself.",
    icon: "{ }",
    integrityLevel: "live_observed",
    blocking: false,
    offline: false,
    codeChanges: "Custom integration",
    bestFor: "Rust/Go/Java · Maximum control · Platform builders",
    traceDepth: "Whatever you send",
    description: "POST traces to our REST API. You control the payload, timing, and content level. For teams using languages without an SDK or building custom integrations.",
    lang: "bash",
    pros: [
      "Full flexibility — any language, any runtime",
      "All 270+ API endpoints available",
      "Batch ingestion support (up to 1,000 traces per request)",
    ],
    cons: [
      "You build the payload yourself (no auto-capture)",
      "No automatic framework detection",
    ],
    stacksWith: ["otel"],
  },
};

interface Situation {
  id: string;
  label: string;
  sublabel: string;
  recommendation: string;
  icon: string;
}

const SITUATIONS: Situation[] = [
  { id: "no_code_change", label: "I don't want to change any code", sublabel: "Just make my existing agents governed", recommendation: "gateway", icon: "🛡" },
  { id: "existing_observability", label: "I already use LangSmith / LangFuse / Datadog", sublabel: "Add governance without replacing anything", recommendation: "otel", icon: "◎" },
  { id: "python_agent", label: "I'm building agents in Python", sublabel: "LangChain, CrewAI, AutoGen, or custom", recommendation: "sdk_python", icon: "🐍" },
  { id: "node_agent", label: "I'm building in TypeScript / Node.js", sublabel: "Vercel AI SDK, OpenAI Node, Express", recommendation: "sdk_node", icon: "⬢" },
  { id: "mcp_workflow", label: "I use Claude Desktop / Cursor with MCP", sublabel: "AI-native governance inside the IDE", recommendation: "mcp", icon: "◈" },
  { id: "evaluate", label: "I just want to evaluate locally first", sublabel: "No account, no commitment, just show me", recommendation: "cli", icon: "▶" },
  { id: "framework_heavy", label: "I use LangChain / CrewAI / AutoGen heavily", sublabel: "Auto-instrument everything with one callback", recommendation: "callbacks", icon: "⚡" },
  { id: "custom_stack", label: "I'm using Rust, Go, Java, or something else", sublabel: "I'll build the integration myself", recommendation: "direct_api", icon: "{ }" },
];

interface IntegrityLevel {
  level: string;
  label: string;
  trust: string;
  color: string;
  meaning: string;
}

const INTEGRITY_LEVELS: IntegrityLevel[] = [
  { level: "imported_unverified", label: "Imported", trust: "Low", color: "#eab308", meaning: "Someone uploaded this. Could be fabricated." },
  { level: "imported_verified_source", label: "Verified Source", trust: "Medium", color: "#f97316", meaning: "Came from a known platform via OAuth." },
  { level: "live_observed", label: "Live Observed", trust: "High", color: "#22c55e", meaning: "TrustScope witnessed this in real-time." },
  { level: "live_signed", label: "Live + Signed", trust: "Highest", color: "#06b6d4", meaning: "Both parties co-signed. Tamper-proof." },
];

function CodeBlock({ methodId, lang }: { methodId: string; lang: string }) {
  const [copied, setCopied] = useState(false);
  const lines = CODE[methodId] || [];
  const codeText = lines.join("\n");

  const handleCopy = () => {
    navigator.clipboard.writeText(codeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative bg-[#0c0e14] rounded-lg border border-[#1e2330] overflow-hidden">
      <div className="flex justify-between items-center px-4 py-2 bg-[#111520] border-b border-[#1e2330]">
        <span className="font-mono text-xs text-slate-500 uppercase tracking-wider">{lang}</span>
        <button onClick={handleCopy} className="bg-transparent border border-[#2a3040] rounded px-2.5 py-1 text-xs font-mono cursor-pointer transition-colors hover:border-emerald-500 hover:text-emerald-500" style={{ color: copied ? "#22c55e" : "#5a6280" }}>
          {copied ? "✓ copied" : "copy"}
        </button>
      </div>
      <pre className="m-0 p-4 font-mono text-sm leading-relaxed text-slate-300 overflow-x-auto whitespace-pre">
        {lines.map((line, i) => (
          <div key={i}>
            {line.startsWith("#") || line.startsWith("//") ? (
              <span className="text-slate-600">{line}</span>
            ) : line.includes("trustscope") ? (
              <span>
                {line.split(/(trustscope)/gi).map((part, j) =>
                  part.toLowerCase() === "trustscope" ? (
                    <span key={j} className="text-sky-400">{part}</span>
                  ) : part
                )}
              </span>
            ) : line}
          </div>
        ))}
      </pre>
    </div>
  );
}

function Badge({ children, color = "#22c55e", outline = false }: { children: React.ReactNode; color?: string; outline?: boolean }) {
  return (
    <span
      className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold font-mono whitespace-nowrap"
      style={{
        background: outline ? "transparent" : color + "18",
        color: color,
        border: outline ? "1px solid " + color + "40" : "1px solid transparent"
      }}
    >
      {children}
    </span>
  );
}

function IntegrityBar({ level }: { level: string }) {
  const activeIdx = INTEGRITY_LEVELS.findIndex((l) => l.level === level);
  return (
    <div className="mt-4">
      <div className="text-xs font-mono text-slate-500 mb-2 uppercase tracking-wider">
        Evidence Strength
      </div>
      <div className="flex gap-1">
        {INTEGRITY_LEVELS.map((l, i) => (
          <div key={l.level} className="flex-1 flex flex-col items-center gap-1.5">
            <div
              className="h-1.5 w-full rounded-sm transition-all duration-400"
              style={{
                background: i <= activeIdx ? l.color : "#1a1f2e",
                boxShadow: i <= activeIdx ? "0 0 8px " + l.color + "30" : "none"
              }}
            />
            <span
              className="text-[9px] font-mono text-center leading-tight"
              style={{
                color: i === activeIdx ? l.color : "#3a4060",
                fontWeight: i === activeIdx ? 700 : 400
              }}
            >
              {l.trust}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-1.5 text-xs font-mono text-center" style={{ color: INTEGRITY_LEVELS[activeIdx]?.color || "#5a6280" }}>
        {INTEGRITY_LEVELS[activeIdx]?.meaning}
      </div>
    </div>
  );
}

function MCPConversation({ conversation }: { conversation: { user: string; check: string; response: string } }) {
  const [step, setStep] = useState(0);
  useEffect(() => {
    setStep(0);
    const t1 = setTimeout(() => setStep(1), 800);
    const t2 = setTimeout(() => setStep(2), 2200);
    const t3 = setTimeout(() => setStep(3), 3600);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [conversation]);

  return (
    <div className="bg-[#0c0e14] rounded-lg border border-[#1e2330] p-4 flex flex-col gap-2.5 mt-3">
      <div className="text-[10px] text-slate-500 font-mono uppercase tracking-widest mb-1">
        MCP in action
      </div>
      {step >= 1 && (
        <div className="flex justify-end">
          <div className="py-2.5 px-3.5 rounded-xl bg-[#1a2540] text-slate-400 text-sm max-w-[85%] rounded-br-sm">{conversation.user}</div>
        </div>
      )}
      {step >= 2 && (
        <div className="flex justify-center">
          <div className="py-1.5 px-3 rounded-md bg-[#1a0a0a] border border-red-900 font-mono text-xs text-red-500">
            ⛔ {conversation.check}
          </div>
        </div>
      )}
      {step >= 3 && (
        <div className="flex">
          <div className="py-2.5 px-3.5 rounded-xl bg-[#111a1a] text-emerald-200 text-sm max-w-[85%] rounded-bl-sm border border-[#1e3330]">
            🤖 {conversation.response}
          </div>
        </div>
      )}
    </div>
  );
}

function MethodDetail({ method, onBack, onSelectMethod }: { method: string; onBack: () => void; onSelectMethod: (id: string) => void }) {
  const m = METHODS[method];
  if (!m) return null;

  return (
    <div className="animate-slideUp">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onBack} className="bg-transparent border border-[#2a3040] rounded-md text-slate-400 px-3 py-1.5 text-xs font-mono cursor-pointer hover:border-emerald-500 transition-colors">
          ← back
        </button>
      </div>

      <div className="flex items-center gap-3.5 mb-2">
        <span className="text-3xl">{m.icon}</span>
        <div>
          <h2 className="m-0 text-xl font-bold text-slate-100">{m.name}</h2>
          <p className="m-0 mt-0.5 text-sm text-slate-400">{m.tagline}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 my-4">
        {m.blocking ? <Badge color="#22c55e">Real-time blocking</Badge> : <Badge color="#eab308" outline>Alert only (no blocking)</Badge>}
        {m.offline && <Badge color="#06b6d4">Works offline</Badge>}
        <Badge color="#8b5cf6" outline>{m.codeChanges}</Badge>
      </div>

      <p className="text-slate-400 text-sm leading-relaxed my-4">{m.description}</p>

      <CodeBlock methodId={method} lang={m.lang} />

      {m.conversation && <MCPConversation conversation={m.conversation} />}

      <IntegrityBar level={m.integrityLevel} />

      <div className="mt-5 flex gap-5 flex-wrap">
        <div className="flex-1 min-w-[220px]">
          <div className="text-xs font-mono text-emerald-500 uppercase tracking-wider mb-2.5">What you get</div>
          {m.pros.map((p, i) => (
            <div key={i} className="flex gap-2 mb-1.5 text-sm text-slate-400 leading-relaxed">
              <span className="text-emerald-500 flex-shrink-0">✓</span>{p}
            </div>
          ))}
        </div>
        <div className="flex-1 min-w-[220px]">
          <div className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-2.5">Limitations</div>
          {m.cons.map((c, i) => (
            <div key={i} className="flex gap-2 mb-1.5 text-sm text-slate-500 leading-relaxed">
              <span className="text-slate-600 flex-shrink-0">—</span>{c}
            </div>
          ))}
        </div>
      </div>

      {m.upgradePath && (
        <div className="mt-5 p-3.5 rounded-lg bg-[#0d1a14] border border-[#1a3328]">
          <div className="text-xs font-mono text-emerald-500 uppercase tracking-wider mb-1.5">Upgrade path</div>
          <p className="m-0 text-sm text-emerald-300/70 leading-relaxed">{m.upgradePath}</p>
        </div>
      )}

      <div className="mt-6 p-4 rounded-lg bg-[#0e1018] border border-[#1e2330]">
        <div className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-2.5">Stacks well with</div>
        <div className="flex gap-2 flex-wrap">
          {m.stacksWith.map((s) => {
            const sm = METHODS[s];
            return sm ? (
              <button
                key={s}
                onClick={() => onSelectMethod(s)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#111520] border border-[#2a3040] text-slate-400 text-xs cursor-pointer transition-all hover:border-sky-500 hover:text-slate-200"
              >
                <span>{sm.icon}</span> {sm.name}
              </button>
            ) : null;
          })}
        </div>
      </div>

      <p className="text-center mt-5 text-sm text-slate-500 italic">
        Best for: {m.bestFor}
      </p>
    </div>
  );
}

function AllMethods({ onSelect }: { onSelect: (id: string) => void }) {
  return (
    <div className="animate-slideUp">
      <h3 className="m-0 mb-5 text-base text-slate-300 font-semibold">
        All Integration Methods
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {Object.values(METHODS).map((m) => (
          <button
            key={m.id}
            onClick={() => onSelect(m.id)}
            className="flex items-start gap-2.5 p-3.5 rounded-lg bg-[#0e1018] border border-[#1e2330] cursor-pointer text-left transition-all hover:border-emerald-500/30 hover:bg-[#101420]"
          >
            <span className="text-xl flex-shrink-0 mt-0.5">{m.icon}</span>
            <div>
              <div className="text-sm font-semibold text-slate-200">{m.name}</div>
              <div className="text-xs text-slate-500 mt-0.5 leading-snug">{m.tagline}</div>
              <div className="flex gap-1 mt-2 flex-wrap">
                {m.blocking ? <Badge color="#22c55e">blocks</Badge> : <Badge color="#eab308" outline>alert only</Badge>}
                {m.offline && <Badge color="#06b6d4">offline</Badge>}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function IngestionWizard() {
  const [view, setView] = useState<"choose" | "detail" | "all">("choose");
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [hoveredSituation, setHoveredSituation] = useState<string | null>(null);

  const selectSituation = (s: Situation) => { setSelectedMethod(s.recommendation); setView("detail"); };
  const selectMethod = (id: string) => { setSelectedMethod(id); setView("detail"); };
  const goBack = () => { setView("choose"); setSelectedMethod(null); };

  return (
    <div className="max-w-3xl mx-auto text-slate-300 py-10 px-6">
      <style>{`
        @keyframes slideUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse { 0%, 100% { opacity: 0.4; } 50% { opacity: 1; } }
        @keyframes hashScroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-slideUp { animation: slideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1); }
      `}</style>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2.5 mb-3">
          <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(34,197,94,0.4)]" style={{ animation: "pulse 2.5s ease-in-out infinite" }} />
          <span className="font-mono text-xs text-emerald-800 uppercase tracking-widest">
            Universal Ingestion Engine
          </span>
        </div>
        <h2 className="m-0 text-2xl font-bold text-slate-100 leading-tight">
          How do you want to connect?
        </h2>
        <p className="mt-2.5 text-sm text-slate-500 leading-relaxed">
          One trace schema. Eight ways in. Every method feeds the same 19 detection engines.{" "}
          <span className="text-emerald-700">Pick the one that fits how you work.</span>
        </p>
      </div>

      {/* Hash chain decoration */}
      <div className="overflow-hidden h-4 mb-7 opacity-25 relative">
        <div className="font-mono text-[10px] text-emerald-500 whitespace-nowrap tracking-wide" style={{ animation: "hashScroll 30s linear infinite" }}>
          {"sha256:a4f2c8...→sha256:7b1d3e...→sha256:92ca01...→sha256:f8e1b4...→".repeat(6)}
        </div>
      </div>

      {/* Situation chooser */}
      {view === "choose" && (
        <div className="animate-slideUp">
          <div className="flex flex-col gap-2">
            {SITUATIONS.map((s) => (
              <button
                key={s.id}
                onClick={() => selectSituation(s)}
                onMouseEnter={() => setHoveredSituation(s.id)}
                onMouseLeave={() => setHoveredSituation(null)}
                className="flex items-center gap-3.5 py-3.5 px-4.5 rounded-xl cursor-pointer text-left w-full transition-all"
                style={{
                  background: hoveredSituation === s.id ? "#101420" : "#0b0d14",
                  border: "1px solid " + (hoveredSituation === s.id ? "rgba(34,197,94,0.25)" : "#1a1f2e"),
                  transform: hoveredSituation === s.id ? "translateX(4px)" : "translateX(0)"
                }}
              >
                <span className="text-xl w-9 h-9 flex items-center justify-center flex-shrink-0 rounded-lg bg-[#111520]">{s.icon}</span>
                <div className="flex-1">
                  <div className="text-sm font-semibold transition-colors" style={{ color: hoveredSituation === s.id ? "#f0f2f8" : "#c4cbe0" }}>{s.label}</div>
                  <div className="text-xs mt-0.5 transition-colors" style={{ color: hoveredSituation === s.id ? "#7a8298" : "#4a5268" }}>{s.sublabel}</div>
                </div>
                <span className="font-mono text-xs transition-all" style={{ color: hoveredSituation === s.id ? "#22c55e" : "#2a3040" }}>→</span>
              </button>
            ))}
          </div>

          <div className="text-center mt-6">
            <button
              onClick={() => setView("all")}
              className="bg-transparent border border-[#2a3040] rounded-lg px-6 py-2.5 text-slate-400 text-sm cursor-pointer transition-all hover:border-sky-500 hover:text-sky-400"
            >
              Or browse all 8 integration methods →
            </button>
          </div>

          {/* Stack play teaser */}
          <div className="mt-10 p-5 rounded-xl bg-gradient-to-br from-[#0a1218] via-[#0e1018] to-[#10081a] border border-[#1a2438]">
            <div className="text-xs font-mono text-sky-500 uppercase tracking-widest mb-2">
              Pro tip: The Three-Layer Stack
            </div>
            <p className="m-0 text-sm text-slate-400 leading-relaxed">
              Power users combine <span className="text-emerald-500">Gateway</span> (catches every LLM call) + <span className="text-purple-400">SDK</span> (sees inside agent logic) + <span className="text-sky-400">OTel</span> (keeps your existing tools). Three layers. Nothing escapes governance.
            </p>
          </div>
        </div>
      )}

      {/* Method detail view */}
      {view === "detail" && selectedMethod && (
        <MethodDetail method={selectedMethod} onBack={goBack} onSelectMethod={selectMethod} />
      )}

      {/* All methods grid */}
      {view === "all" && (
        <div>
          <button
            onClick={goBack}
            className="bg-transparent border border-[#2a3040] rounded-md text-slate-400 px-3 py-1.5 text-xs font-mono cursor-pointer mb-5 hover:border-emerald-500 transition-colors"
          >
            ← pick by situation
          </button>
          <AllMethods onSelect={selectMethod} />
        </div>
      )}
    </div>
  );
}
