'use client'

import { useId, type ComponentType } from 'react'
import {
  ArrowRightLeft,
  Cpu,
  FileOutput,
  FolderSearch,
  Scale,
  ShieldAlert,
  ShieldCheck,
  SlidersHorizontal,
  Upload,
} from 'lucide-react'

interface GovernanceGraphProps {
  title?: string
  subtitle?: string
  metrics?: Record<string, string>
  className?: string
}

type GraphTone = 'ingest' | 'core' | 'governance' | 'output' | 'proof'
type NodeAnchor = 'left' | 'right' | 'top' | 'bottom'

interface GraphNode {
  id: string
  label: string
  metric: string
  x: number
  y: number
  w: number
  h: number
  icon: ComponentType<{ className?: string }>
  tone: GraphTone
}

interface GraphEdge {
  from: string
  to: string
  fromAnchor: NodeAnchor
  toAnchor: NodeAnchor
  tone: GraphTone
  label: string
  duration: number
  delay: number
  bend?: number
  labelDx?: number
  labelDy?: number
}

const WIDTH = 1760
const HEIGHT = 760

const lanes = [
  { label: 'Input Surfaces', x: 0, w: 23 },
  { label: 'Canonical Session', x: 23, w: 26 },
  { label: 'Governance Runtime', x: 49, w: 25 },
  { label: 'Artifacts & Proof', x: 74, w: 26 },
]

const baseNodes: GraphNode[] = [
  {
    id: 'upload',
    label: 'Uploaded Trace Files',
    metric: 'JSONL · CSV/TSV · HAR · OTel',
    x: 86,
    y: 148,
    w: 296,
    h: 108,
    icon: Upload,
    tone: 'ingest',
  },
  {
    id: 'runtime',
    label: 'Gateway / SDK / MCP Stream',
    metric: 'one ingestion path, many entry points',
    x: 86,
    y: 410,
    w: 296,
    h: 108,
    icon: ArrowRightLeft,
    tone: 'ingest',
  },
  {
    id: 'session',
    label: 'Normalized Trace Session',
    metric: 'single canonical execution model',
    x: 488,
    y: 280,
    w: 342,
    h: 126,
    icon: Cpu,
    tone: 'core',
  },
  {
    id: 'detections',
    label: 'Detection Engine Matrix',
    metric: 'PII · secrets · injection · loops · cost',
    x: 912,
    y: 148,
    w: 318,
    h: 108,
    icon: ShieldAlert,
    tone: 'governance',
  },
  {
    id: 'policy',
    label: 'Policy Evaluation Layer',
    metric: 'simulate → alert → block',
    x: 912,
    y: 410,
    w: 318,
    h: 108,
    icon: SlidersHorizontal,
    tone: 'governance',
  },
  {
    id: 'findings',
    label: 'Findings + Timeline',
    metric: 'severity index + hotspot traces',
    x: 1336,
    y: 104,
    w: 338,
    h: 92,
    icon: FolderSearch,
    tone: 'output',
  },
  {
    id: 'report',
    label: 'Redacted Artifacts + PDF',
    metric: 'browser-local exports',
    x: 1336,
    y: 256,
    w: 338,
    h: 92,
    icon: FileOutput,
    tone: 'output',
  },
  {
    id: 'receipt',
    label: 'Decision Receipts',
    metric: 'allow / block + control metadata',
    x: 1336,
    y: 408,
    w: 338,
    h: 92,
    icon: ShieldCheck,
    tone: 'proof',
  },
  {
    id: 'mapping',
    label: 'Framework Mapping',
    metric: 'AIUC-1 · SOC 2 · NIST · EU AI Act',
    x: 1336,
    y: 580,
    w: 338,
    h: 92,
    icon: Scale,
    tone: 'proof',
  },
]

const edges: GraphEdge[] = [
  {
    from: 'upload',
    to: 'session',
    fromAnchor: 'right',
    toAnchor: 'left',
    tone: 'ingest',
    label: 'parse + schema normalize',
    duration: 5.2,
    delay: 0.1,
    bend: -20,
    labelDy: -14,
  },
  {
    from: 'runtime',
    to: 'session',
    fromAnchor: 'right',
    toAnchor: 'left',
    tone: 'ingest',
    label: 'ingest runtime envelopes',
    duration: 5.4,
    delay: 0.45,
    bend: 20,
    labelDy: 15,
  },
  {
    from: 'session',
    to: 'detections',
    fromAnchor: 'right',
    toAnchor: 'left',
    tone: 'governance',
    label: 'execute detection pass',
    duration: 4.9,
    delay: 0.2,
    bend: -24,
    labelDy: -16,
  },
  {
    from: 'session',
    to: 'policy',
    fromAnchor: 'right',
    toAnchor: 'left',
    tone: 'governance',
    label: 'evaluate policy controls',
    duration: 5.0,
    delay: 0.7,
    bend: 24,
    labelDy: 18,
  },
  {
    from: 'detections',
    to: 'findings',
    fromAnchor: 'right',
    toAnchor: 'left',
    tone: 'output',
    label: 'aggregate findings index',
    duration: 4.7,
    delay: 0.22,
    bend: -8,
    labelDy: -10,
  },
  {
    from: 'detections',
    to: 'report',
    fromAnchor: 'right',
    toAnchor: 'left',
    tone: 'output',
    label: 'apply redaction + package',
    duration: 4.8,
    delay: 0.94,
    bend: 14,
    labelDy: 10,
  },
  {
    from: 'policy',
    to: 'receipt',
    fromAnchor: 'right',
    toAnchor: 'left',
    tone: 'proof',
    label: 'persist control receipts',
    duration: 4.8,
    delay: 0.42,
    bend: -8,
    labelDy: 10,
  },
  {
    from: 'report',
    to: 'mapping',
    fromAnchor: 'bottom',
    toAnchor: 'top',
    tone: 'proof',
    label: 'bind artifacts to controls',
    duration: 4.8,
    delay: 1.1,
    labelDx: -95,
    labelDy: 6,
  },
  {
    from: 'receipt',
    to: 'mapping',
    fromAnchor: 'bottom',
    toAnchor: 'top',
    tone: 'proof',
    label: 'bind decision evidence',
    duration: 4.7,
    delay: 0.72,
    labelDx: 98,
    labelDy: 16,
  },
]

const metricAliases: Record<string, string[]> = {
  upload: ['upload', 'prompt'],
  runtime: ['runtime', 'model'],
  session: ['session'],
  detections: ['detections'],
  policy: ['policy', 'policies'],
  findings: ['findings'],
  report: ['report', 'evidence'],
  receipt: ['receipt', 'decision'],
  mapping: ['mapping', 'framework'],
}

function pickMetric(
  metrics: Record<string, string> | undefined,
  keys: string[],
): string | undefined {
  if (!metrics) return undefined
  for (const key of keys) {
    if (metrics[key]) return metrics[key]
  }
  return undefined
}

function metricLines(
  node: GraphNode,
  metrics: Record<string, string> | undefined,
): string[] {
  const direct = pickMetric(metrics, metricAliases[node.id] ?? [node.id])
  if (node.id !== 'runtime') {
    return [direct ?? node.metric]
  }

  const detail = [metrics?.tools, metrics?.context].filter(Boolean).join(' · ')
  const primary = direct ?? node.metric
  return detail ? [primary, detail] : [primary]
}

function toneStyles(tone: GraphTone) {
  if (tone === 'core') {
    return {
      node: 'border-[color:rgba(184,150,78,.58)] bg-[color:rgba(184,150,78,.08)]',
      iconWrap: 'border-[color:rgba(184,150,78,.52)] bg-[color:rgba(184,150,78,.12)]',
      icon: 'text-[var(--brand)]',
      metric: 'text-[var(--brand)]',
    }
  }

  if (tone === 'governance') {
    return {
      node: 'border-[color:rgba(37,99,235,.5)] bg-[color:rgba(37,99,235,.08)]',
      iconWrap: 'border-[color:rgba(37,99,235,.55)] bg-[color:rgba(37,99,235,.12)]',
      icon: 'text-[var(--interactive)]',
      metric: 'text-[color:rgba(96,165,250,.95)]',
    }
  }

  if (tone === 'proof') {
    return {
      node: 'border-[color:rgba(184,150,78,.48)] bg-[color:rgba(184,150,78,.07)]',
      iconWrap: 'border-[color:rgba(184,150,78,.52)] bg-[color:rgba(184,150,78,.12)]',
      icon: 'text-[var(--brand)]',
      metric: 'text-[var(--brand-muted)]',
    }
  }

  if (tone === 'output') {
    return {
      node: 'border-[color:rgba(63,63,70,.9)] bg-[color:rgba(17,17,19,.9)]',
      iconWrap: 'border-[color:rgba(63,63,70,.9)] bg-[color:rgba(9,9,11,.9)]',
      icon: 'text-[var(--text-secondary)]',
      metric: 'text-[var(--text-muted)]',
    }
  }

  return {
    node: 'border-[color:rgba(63,63,70,.9)] bg-[color:rgba(17,17,19,.88)]',
    iconWrap: 'border-[color:rgba(63,63,70,.85)] bg-[color:rgba(9,9,11,.88)]',
    icon: 'text-[var(--text-secondary)]',
    metric: 'text-[var(--text-muted)]',
  }
}

function edgeColor(tone: GraphTone): string {
  if (tone === 'proof') return 'rgba(184,150,78,.74)'
  if (tone === 'governance') return 'rgba(37,99,235,.72)'
  if (tone === 'output') return 'rgba(161,161,170,.6)'
  return 'rgba(113,113,122,.58)'
}

function anchorPoint(node: GraphNode, anchor: NodeAnchor) {
  if (anchor === 'left') return { x: node.x, y: node.y + node.h / 2 }
  if (anchor === 'right') return { x: node.x + node.w, y: node.y + node.h / 2 }
  if (anchor === 'top') return { x: node.x + node.w / 2, y: node.y }
  return { x: node.x + node.w / 2, y: node.y + node.h }
}

function edgePath(
  fromPoint: { x: number; y: number },
  toPoint: { x: number; y: number },
  fromAnchor: NodeAnchor,
  toAnchor: NodeAnchor,
  bend = 0,
) {
  const dx = toPoint.x - fromPoint.x
  const dy = toPoint.y - fromPoint.y
  const horizontal = fromAnchor === 'left' || fromAnchor === 'right'

  const travelX = Math.max(88, Math.abs(dx) * 0.42)
  const travelY = Math.max(70, Math.abs(dy) * 0.45)

  const c1x =
    fromPoint.x +
    (fromAnchor === 'right'
      ? travelX
      : fromAnchor === 'left'
        ? -travelX
        : bend)
  const c1y =
    fromPoint.y +
    (fromAnchor === 'bottom'
      ? travelY
      : fromAnchor === 'top'
        ? -travelY
        : horizontal
          ? bend
          : 0)

  const c2x =
    toPoint.x -
    (toAnchor === 'left'
      ? travelX
      : toAnchor === 'right'
        ? -travelX
        : bend)
  const c2y =
    toPoint.y -
    (toAnchor === 'top'
      ? travelY
      : toAnchor === 'bottom'
        ? -travelY
        : horizontal
          ? -bend
          : 0)

  return `M ${fromPoint.x} ${fromPoint.y} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${toPoint.x} ${toPoint.y}`
}

export default function GovernanceGraph({
  title = 'How TrustScope executes one governance pass.',
  subtitle = 'Input traces and runtime events converge into one normalized session, then run through detections, policy controls, and evidence mapping.',
  metrics,
  className = '',
}: GovernanceGraphProps) {
  const uid = useId().replace(/:/g, '')
  const nodeMap = new Map(baseNodes.map((node) => [node.id, node]))

  const graphEdges = edges
    .map((edge, index) => {
      const from = nodeMap.get(edge.from)
      const to = nodeMap.get(edge.to)
      if (!from || !to) return null

      const fromPoint = anchorPoint(from, edge.fromAnchor)
      const toPoint = anchorPoint(to, edge.toAnchor)
      const path = edgePath(fromPoint, toPoint, edge.fromAnchor, edge.toAnchor, edge.bend)

      return {
        ...edge,
        id: `${uid}-edge-${index}`,
        path,
        labelX: (fromPoint.x + toPoint.x) / 2 + (edge.labelDx ?? 0),
        labelY: (fromPoint.y + toPoint.y) / 2 + (edge.labelDy ?? 0),
      }
    })
    .filter((edge): edge is NonNullable<typeof edge> => Boolean(edge))

  return (
    <div className={`card !p-0 overflow-hidden ${className}`}>
      <div className="border-b border-[var(--border)] px-5 py-4">
        <p className="eyebrow">Governance Graph</p>
        <h3 className="mt-1 text-2xl font-bold text-[var(--text-primary)]">{title}</h3>
        <p className="mt-1 text-sm text-[var(--text-secondary)]">{subtitle}</p>
        <div className="mt-3 flex flex-wrap gap-4 text-[11px] text-[var(--text-muted)]">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-1.5 w-4 rounded bg-[color:rgba(113,113,122,.58)]" />
            ingest path
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-1.5 w-4 rounded bg-[color:rgba(37,99,235,.72)]" />
            detection + policy path
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-1.5 w-4 rounded bg-[color:rgba(184,150,78,.74)]" />
            evidence mapping path
          </span>
        </div>
      </div>

      <div className="px-5 py-5">
        <div
          className="relative w-full overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg)]"
          style={{
            aspectRatio: `${WIDTH} / ${HEIGHT}`,
            backgroundImage:
              'linear-gradient(to right, rgba(39,39,42,.16) 1px, transparent 1px), linear-gradient(to bottom, rgba(39,39,42,.12) 1px, transparent 1px), radial-gradient(circle at 62% 30%, rgba(37,99,235,.08), transparent 45%)',
            backgroundSize: '28px 28px, 28px 28px, auto',
          }}
        >
          <div className="pointer-events-none absolute inset-0">
            {lanes.map((lane) => (
              <div
                key={lane.label}
                className="absolute inset-y-0 border-r border-[color:rgba(39,39,42,.42)]"
                style={{ left: `${lane.x}%`, width: `${lane.w}%` }}
              >
                <span className="absolute left-3 top-2 text-[10px] uppercase tracking-[0.12em] text-[var(--text-subtle)]">
                  {lane.label}
                </span>
              </div>
            ))}
          </div>

          <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox={`0 0 ${WIDTH} ${HEIGHT}`} aria-hidden>
            <defs>
              <radialGradient id={`${uid}-pulse`} cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(250,250,250,.88)" />
                <stop offset="100%" stopColor="rgba(250,250,250,0)" />
              </radialGradient>
            </defs>

            {graphEdges.map((edge) => (
              <g key={edge.id}>
                <path
                  d={edge.path}
                  fill="none"
                  stroke={edgeColor(edge.tone)}
                  strokeWidth="1.55"
                  strokeDasharray={edge.tone === 'ingest' ? '6 6' : undefined}
                />
                <circle r="5" fill={`url(#${uid}-pulse)`}>
                  <animateMotion
                    dur={`${edge.duration}s`}
                    begin={`${edge.delay}s`}
                    repeatCount="indefinite"
                    path={edge.path}
                  />
                </circle>
                <text
                  x={edge.labelX}
                  y={edge.labelY}
                  textAnchor="middle"
                  className="fill-[color:rgba(161,161,170,.78)] font-mono"
                  style={{ fontSize: '10px', letterSpacing: '0.03em' }}
                >
                  {edge.label}
                </text>
              </g>
            ))}
          </svg>

          {baseNodes.map((node) => {
            const tone = toneStyles(node.tone)
            const Icon = node.icon
            const lines = metricLines(node, metrics)

            return (
              <div
                key={node.id}
                className={`pointer-events-none absolute rounded-xl border px-3 py-3 ${tone.node}`}
                style={{
                  left: `${(node.x / WIDTH) * 100}%`,
                  top: `${(node.y / HEIGHT) * 100}%`,
                  width: `${(node.w / WIDTH) * 100}%`,
                  minHeight: `${(node.h / HEIGHT) * 100}%`,
                }}
              >
                <div className="flex items-start gap-3">
                  <span
                    className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border ${tone.iconWrap}`}
                  >
                    <Icon className={`h-4 w-4 ${tone.icon}`} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[15px] font-semibold leading-tight text-[var(--text-primary)]">
                      {node.label}
                    </p>
                    {lines.map((line) => (
                      <p key={`${node.id}-${line}`} className={`mt-1 text-[10px] leading-tight ${tone.metric}`}>
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
