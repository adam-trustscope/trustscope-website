// @ts-nocheck
'use client'

import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'

const C = {
  bg: '#08080A',
  surface: '#0E0E10',
  surfaceAlt: '#131315',
  border: '#1A1A1D',
  borderHi: '#262629',
  text: '#F5F5F4',
  text2: '#C8C8CC',
  text3: '#71717A',
  text4: '#47474D',
  gold: '#B8964E',
  goldDim: '#6B5A35',
  goldGlow: 'rgba(184,150,78,0.35)',
  goldSoft: 'rgba(184,150,78,0.06)',
  blue: '#3B82F6',
  blueGlow: 'rgba(59,130,246,0.12)',
  red: '#EF4444',
  redBright: '#F87171',
  redGlow: 'rgba(239,68,68,0.08)',
  redFlash: 'rgba(239,68,68,0.15)',
  amber: '#F59E0B',
  amberGlow: 'rgba(245,158,11,0.08)',
  green: '#22C55E',
  greenGlow: 'rgba(34,197,94,0.10)',
  greenBright: '#4ADE80',
} as const

const TRACE = {
  meta: [
    { k: 'session', v: 's-9af2' },
    { k: 'trace', v: 'CLM-8834' },
    { k: 'model', v: 'gpt-4o' },
  ],
  input: {
    text: 'Review claim CLM-8834. Patient {0}, SSN {1}. Diagnosis {2}. NPI {3}, policy {4}.',
    dangers: [
      { id: 0, raw: 'Sarah Mitchell', label: 'NAME', sev: 'high', action: 'alert' },
      { id: 1, raw: '423-88-1294', label: 'SSN', sev: 'critical', action: 'redact' },
      { id: 2, raw: 'E11.9', label: 'DIAGNOSIS', sev: 'critical', action: 'redact' },
      { id: 3, raw: '1245319599', label: 'NPI', sev: 'low', action: 'allow' },
      { id: 4, raw: 'HMO-2847-X', label: 'POLICY #', sev: 'high', action: 'alert' },
    ],
  },
  output: {
    text: 'Patient {0} (SSN {1}) is covered under {4}. Diagnosis {2} eligible. NPI {3} in-network. Responsibility: $340.',
    dangers: [
      { id: 0, raw: 'Sarah Mitchell', label: 'NAME', sev: 'high', action: 'alert' },
      { id: 1, raw: '423-88-1294', label: 'SSN', sev: 'critical', action: 'redact' },
      { id: 2, raw: 'E11.9', label: 'DIAGNOSIS', sev: 'critical', action: 'redact' },
      { id: 3, raw: '1245319599', label: 'NPI', sev: 'low', action: 'allow' },
      { id: 4, raw: 'HMO-2847-X', label: 'POLICY #', sev: 'high', action: 'alert' },
    ],
  },
  totalRisks: 10,
  critical: 3,
  high: 3,
  medium: 2,
  low: 2,
  policies: [
    { label: 'SSN in response', action: 'REDACT', c: C.red },
    { label: 'Diagnosis code in response', action: 'REDACT', c: C.red },
    { label: 'Patient name in response', action: 'ALERT', c: C.amber },
    { label: 'Member ID in response', action: 'ALERT', c: C.amber },
    { label: 'Policy number in response', action: 'ALERT', c: C.amber },
    { label: 'Provider NPI', action: 'ALLOW', c: C.green },
  ],
  frameworks: ['HIPAA 164.312(b)', 'AIUC-1 B002', 'SOC 2 CC6.1'],
  blocked: 2,
  alerted: 3,
  allowed: 1,
}

const IDLE = -1
const INGEST = 0
const SCAN = 1
const DETECT = 2
const ENFORCE = 3
const REDACT = 4
const EVIDENCE = 5
const DONE = 6

const PIPELINE = [
  { key: 'ingest', label: 'INGEST', sub: 'any source', c: C.blue, at: INGEST },
  { key: 'detect', label: 'DETECT', sub: '27 engines', c: C.red, at: DETECT },
  { key: 'enforce', label: 'ENFORCE', sub: 'apply policies', c: C.amber, at: ENFORCE },
  { key: 'govern', label: 'GOVERN', sub: 'clean output + proof', c: C.gold, at: EVIDENCE },
] as const

function tokenizeTemplate(template: string, dangers: any[]) {
  const parts: Array<{ type: 'text'; content: string } | { type: 'danger'; d: any }> = []
  let remaining = template

  while (remaining.length > 0) {
    const match = remaining.match(/\{(\d+)\}/)
    if (!match || match.index === undefined) {
      parts.push({ type: 'text', content: remaining })
      break
    }

    if (match.index > 0) {
      parts.push({ type: 'text', content: remaining.slice(0, match.index) })
    }

    const id = Number.parseInt(match[1], 10)
    const d = dangers.find((item) => item.id === id)
    if (d) parts.push({ type: 'danger', d })

    remaining = remaining.slice(match.index + match[0].length)
  }

  return parts
}

function ConvoText({
  template,
  dangers,
  phase,
  mode,
}: {
  template: string
  dangers: any[]
  phase: number
  mode: 'input' | 'raw-output' | 'governed-output'
}) {
  const parts = tokenizeTemplate(template, dangers)

  return (
    <span>
      {parts.map((part, i) => {
        if (part.type === 'text') {
          return <span key={`txt-${i}`}>{part.content}</span>
        }

        const d = part.d

        if (phase < DETECT) {
          return (
            <span key={`dg-${i}`} style={{ color: C.text2 }}>
              {d.raw}
            </span>
          )
        }

        if (mode === 'input') {
          if (phase < REDACT) {
            const severe = d.sev === 'critical' || d.sev === 'high'
            return (
              <span
                key={`dg-${i}`}
                style={{
                  color: d.sev === 'critical' ? C.redBright : d.sev === 'high' ? C.amber : C.text2,
                  borderBottom: severe
                    ? `1.5px solid ${d.sev === 'critical' ? `${C.red}60` : `${C.amber}50`}`
                    : 'none',
                  fontWeight: severe ? 600 : 400,
                  transition: 'all 0.35s ease',
                }}
              >
                {d.raw}
              </span>
            )
          }

          return (
            <span
              key={`dg-${i}`}
              style={{
                color: C.text3,
                borderBottom: d.sev !== 'low' ? `1px dashed ${C.text4}` : 'none',
                transition: 'all 0.35s ease',
              }}
            >
              {d.raw}
            </span>
          )
        }

        if (mode === 'raw-output') {
          const severe = d.sev === 'critical' || d.sev === 'high'
          if (!severe) {
            return (
              <span key={`dg-${i}`} style={{ color: C.text2 }}>
                {d.raw}
              </span>
            )
          }

          return (
            <span
              key={`dg-${i}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
                background: d.sev === 'critical' ? C.redFlash : C.amberGlow,
                color: d.sev === 'critical' ? C.redBright : C.amber,
                padding: '2px 6px',
                margin: '0 1px',
                borderRadius: 4,
                fontWeight: 600,
                borderBottom: `2px solid ${d.sev === 'critical' ? `${C.red}50` : `${C.amber}50`}`,
                transition: 'all 0.35s ease',
              }}
            >
              <span>{d.raw}</span>
              <span
                style={{
                  fontSize: 7,
                  fontWeight: 700,
                  background: d.sev === 'critical' ? `${C.red}25` : `${C.amber}25`,
                  padding: '1px 4px',
                  borderRadius: 2,
                  letterSpacing: '0.06em',
                }}
              >
                {d.label}
              </span>
            </span>
          )
        }

        if (phase < REDACT) {
          return <span key={`dg-${i}`} style={{ color: C.text4 }}>…</span>
        }

        if (d.action === 'redact') {
          return (
            <span
              key={`dg-${i}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 2,
                background: C.greenGlow,
                color: C.greenBright,
                padding: '2px 6px',
                margin: '0 1px',
                borderRadius: 4,
                fontWeight: 700,
                fontSize: 10.5,
              }}
            >
              ✓[REDACTED]
            </span>
          )
        }

        if (d.action === 'alert') {
          return (
            <span
              key={`dg-${i}`}
              style={{
                color: C.amber,
                borderBottom: `1.5px solid ${C.amber}40`,
                fontWeight: 500,
              }}
            >
              {d.raw}
            </span>
          )
        }

        return (
          <span key={`dg-${i}`} style={{ color: C.text2 }}>
            {d.raw}
          </span>
        )
      })}
    </span>
  )
}

export default function HeroGovernanceDemo() {
  const [phase, setPhase] = useState(IDLE)
  const [inputVisible, setInputVisible] = useState(false)
  const [outputVisible, setOutputVisible] = useState(false)
  const [scanY, setScanY] = useState(0)
  const [risks, setRisks] = useState(0)
  const [policyIndex, setPolicyIndex] = useState(-1)
  const [hashLen, setHashLen] = useState(0)
  const [sealed, setSealed] = useState(false)
  const [signedAt, setSignedAt] = useState('')
  const [cycle, setCycle] = useState(0)
  const timers = useRef<number[]>([])
  const alive = useRef(true)

  const wait = (ms: number) =>
    new Promise<void>((resolve) => {
      const id = window.setTimeout(resolve, ms)
      timers.current.push(id)
    })

  const clearAll = () => {
    for (const id of timers.current) window.clearTimeout(id)
    timers.current = []
  }

  const reset = () => {
    clearAll()
    setPhase(IDLE)
    setInputVisible(false)
    setOutputVisible(false)
    setScanY(0)
    setRisks(0)
    setPolicyIndex(-1)
    setHashLen(0)
    setSealed(false)
    setSignedAt('')
  }

  const run = useCallback(async () => {
    reset()
    await wait(50)

    setPhase(INGEST)
    await wait(300)
    setInputVisible(true)
    await wait(650)
    setOutputVisible(true)
    await wait(550)

    setPhase(SCAN)
    for (let i = 0; i <= 60; i += 1) {
      setScanY((i / 60) * 100)
      await wait(14)
    }
    await wait(250)

    setPhase(DETECT)
    for (let i = 0; i <= TRACE.totalRisks; i += 1) {
      setRisks(i)
      await wait(65)
    }
    await wait(1050)

    setPhase(ENFORCE)
    for (let i = 0; i < TRACE.policies.length; i += 1) {
      setPolicyIndex(i)
      await wait(360)
    }
    await wait(350)

    setPhase(REDACT)
    await wait(1400)

    setPhase(EVIDENCE)
    setSignedAt(new Date().toISOString().replace(/\.\d{3}Z$/, 'Z'))
    const hash = 'e4b2c9f18a3d7b60'
    for (let i = 0; i <= hash.length; i += 1) {
      setHashLen(i)
      await wait(28)
    }
    await wait(240)
    setSealed(true)
    await wait(700)

    setPhase(DONE)
    await wait(4200)
    if (alive.current) setCycle((c) => c + 1)
  }, [])

  useEffect(() => {
    alive.current = true
    const id = window.setTimeout(() => {
      void run()
    }, 600)

    return () => {
      alive.current = false
      window.clearTimeout(id)
      clearAll()
    }
  }, [cycle, run])

  const signedTime = signedAt ? signedAt.slice(11) : '—'

  return (
    <section className="section-container py-4 md:py-5">
      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideIn { from { opacity: 0; transform: translateX(-8px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes sealDrop {
          0% { transform: scale(2.7) rotate(-20deg); opacity: 0; }
          45% { transform: scale(.9) rotate(3deg); opacity: 1; }
          70% { transform: scale(1.04) rotate(-1deg); }
          100% { transform: scale(1) rotate(0); opacity: 1; }
        }
        @keyframes goldPulse { 0%, 100% { box-shadow: 0 0 12px ${C.goldGlow}; } 50% { box-shadow: 0 0 26px ${C.goldGlow}; } }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes borderFlash { 0% { border-color: ${C.red}; } 100% { border-color: ${C.border}; } }
        @keyframes heroEnter { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes riskBump { from { transform: scale(1.05); } to { transform: scale(1); } }

        .hero-shell {
          display: grid;
          grid-template-columns: minmax(0, 1fr);
          gap: 10px;
          align-items: start;
        }

        .pipeline-head {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 8px;
          margin-bottom: 6px;
        }

        .pipeline-col {
          display: grid;
          gap: 4px;
        }

        .demo-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 8px;
        }

        .demo-panel {
          background: ${C.surface};
          border: 1px solid ${C.border};
          border-radius: 12px;
          padding: 10px;
          min-height: 344px;
          position: relative;
          overflow: hidden;
        }

        .mono-scroll::-webkit-scrollbar { width: 3px; }
        .mono-scroll::-webkit-scrollbar-track { background: transparent; }
        .mono-scroll::-webkit-scrollbar-thumb { background: ${C.borderHi}; border-radius: 2px; }

        @media (max-width: 1080px) {
          .pipeline-head { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .demo-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }

        @media (max-width: 700px) {
          .pipeline-head { grid-template-columns: minmax(0, 1fr); }
          .demo-grid { grid-template-columns: minmax(0, 1fr); }
          .demo-panel { min-height: auto; }
        }
      `}</style>

      <div style={{ maxWidth: 1460, margin: '0 auto', padding: '0 22px' }}>
        <div className="hero-shell">
          <div style={{ animation: 'heroEnter 0.65s ease', textAlign: 'center', maxWidth: 940, margin: '0 auto' }}>
            <h1
              style={{
                fontFamily: 'var(--font-display), sans-serif',
                fontSize: 'clamp(40px, 5.5vw, 68px)',
                fontWeight: 900,
                color: C.text,
                letterSpacing: '-0.04em',
                lineHeight: 1.01,
                marginBottom: 10,
              }}
            >
              Govern your AI agents. <span style={{ color: C.gold }}>Prove it happened.</span>
            </h1>

            <p
              style={{
                fontFamily: 'var(--font-body), sans-serif',
                fontSize: 17,
                color: C.text3,
                lineHeight: 1.45,
                marginBottom: 14,
              }}
            >
              27 detection engines. Runtime policy enforcement.{' '}
              Cryptographic evidence for any compliance framework.
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 9, marginBottom: 8 }}>
              <Link
                href="https://app.trustscope.ai/signup"
                style={{
                  fontFamily: 'var(--font-body), sans-serif',
                  fontSize: 14,
                  fontWeight: 700,
                  padding: '12px 24px',
                  borderRadius: 10,
                  background: C.gold,
                  color: '#08080A',
                  boxShadow: `0 0 20px ${C.goldGlow}`,
                }}
              >
                Start Free
              </Link>
              <Link
                href="/switch#compare-upload"
                style={{
                  fontFamily: 'var(--font-body), sans-serif',
                  fontSize: 14,
                  fontWeight: 700,
                  padding: '12px 24px',
                  borderRadius: 10,
                  border: `1.5px solid ${C.borderHi}`,
                  background: 'transparent',
                  color: C.text3,
                }}
              >
                Watch Demo
              </Link>
            </div>
          </div>

          <div style={{ animation: 'heroEnter 0.65s ease 0.1s both' }}>
            <div className="pipeline-head">
              {PIPELINE.map((step) => {
                const active = phase >= step.at
                return (
                  <div className="pipeline-col" key={step.key}>
                    <div style={{ height: 3, borderRadius: 999, background: active ? step.c : C.border }} />
                    <div
                      style={{
                        fontFamily: 'var(--font-mono), monospace',
                        fontSize: 9,
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: active ? step.c : C.text4,
                        fontWeight: 700,
                        textAlign: 'center',
                      }}
                    >
                      {step.label}
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-body), sans-serif',
                        fontSize: 12,
                        color: C.text4,
                        textAlign: 'center',
                      }}
                    >
                      {step.sub}
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="demo-grid">
              <div
                className="demo-panel"
                style={{ borderColor: phase >= DETECT ? `${C.red}55` : C.border, animation: phase === DETECT ? 'borderFlash 0.35s ease' : 'none', minHeight: 0 }}
              >
                {phase === SCAN && (
                  <div
                    style={{
                      position: 'absolute',
                      left: 0,
                      right: 0,
                      top: `${42 + scanY * 0.58}%`,
                      height: 2,
                      background: `linear-gradient(90deg, transparent 8%, ${C.blue} 35%, ${C.blue} 65%, transparent 92%)`,
                      boxShadow: `0 0 8px ${C.blue}, 0 -12px 25px ${C.blueGlow}, 0 12px 25px ${C.blueGlow}`,
                      pointerEvents: 'none',
                    }}
                  />
                )}

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                  <div style={{ display: 'flex', gap: 5 }}>
                    <span style={{ width: 8, height: 8, borderRadius: 999, background: '#EF4444' }} />
                    <span style={{ width: 8, height: 8, borderRadius: 999, background: '#F59E0B' }} />
                    <span style={{ width: 8, height: 8, borderRadius: 999, background: '#22C55E' }} />
                  </div>
                  <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 9, color: C.text4 }}>
                    gpt-4o · claims
                  </span>
                </div>

                <div className="mono-scroll" style={{ overflowY: 'auto', maxHeight: 286 }}>
                  <p
                    style={{
                      fontFamily: 'var(--font-mono), monospace',
                      fontSize: 9,
                      color: C.blue,
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.12em',
                      marginBottom: 4,
                      opacity: inputVisible ? 1 : 0,
                    }}
                  >
                    ← INPUT
                  </p>
                  <div
                    style={{
                      opacity: inputVisible ? 1 : 0,
                      transform: inputVisible ? 'none' : 'translateY(8px)',
                      transition: 'all 0.4s ease',
                      background: C.bg,
                      border: `1px solid ${C.border}`,
                      borderRadius: 10,
                      padding: '9px 11px',
                      marginBottom: 8,
                      fontFamily: 'var(--font-mono), monospace',
                      fontSize: 11,
                      lineHeight: 1.58,
                      color: C.text2,
                    }}
                  >
                    <ConvoText template={TRACE.input.text} dangers={TRACE.input.dangers} phase={phase} mode="input" />
                  </div>

                  <p
                    style={{
                      fontFamily: 'var(--font-mono), monospace',
                      fontSize: 9,
                      color: phase >= DETECT ? C.red : C.text3,
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.12em',
                      marginBottom: 4,
                    }}
                  >
                    ← RAW OUTPUT — PII EXPOSED
                  </p>
                  <div
                    style={{
                      opacity: outputVisible ? 1 : 0,
                      transform: outputVisible ? 'none' : 'translateY(8px)',
                      transition: 'all 0.4s ease',
                      background: C.bg,
                      border: `1px solid ${phase >= DETECT ? `${C.red}25` : C.border}`,
                      borderRadius: 10,
                      padding: '9px 11px',
                      fontFamily: 'var(--font-mono), monospace',
                      fontSize: 11,
                      lineHeight: 1.58,
                      color: C.text2,
                    }}
                  >
                    <ConvoText template={TRACE.output.text} dangers={TRACE.output.dangers} phase={phase} mode="raw-output" />
                  </div>
                </div>
              </div>

              <div className="demo-panel" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column' }}>
                <div
                  style={{
                    fontFamily: 'var(--font-mono), monospace',
                    fontSize: 9,
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    color: C.text4,
                    marginBottom: 8,
                    fontWeight: 700,
                    textAlign: 'left',
                  }}
                >
                  Findings
                </div>

                {phase >= DETECT ? (
                  <>
                    <div className="mono-scroll" style={{ maxHeight: 250, overflowY: 'auto' }}>
                      {[
                        { l: 'SSN', s: 'CRITICAL', c: C.red },
                        { l: 'Diagnosis code', s: 'CRITICAL', c: C.red },
                        { l: 'Patient name', s: 'HIGH', c: C.amber },
                        { l: 'Member ID', s: 'HIGH', c: C.amber },
                        { l: 'Policy number', s: 'HIGH', c: C.amber },
                        { l: 'Provider NPI', s: 'MEDIUM', c: C.text3 },
                      ].map((finding) => (
                        <div
                          key={finding.l}
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            borderRadius: 5,
                            padding: '4px 6px',
                            marginBottom: 3,
                            border: `1px solid ${finding.c}25`,
                            background: `${finding.c}08`,
                          }}
                        >
                          <span style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: 10, color: C.text2 }}>
                            {finding.l}
                          </span>
                          <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 8, color: finding.c }}>
                            {finding.s}
                          </span>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 10, color: C.text4, marginTop: 16 }}>
                    Waiting for detection pass
                  </div>
                )}

                <div
                  style={{
                    marginTop: 'auto',
                    paddingTop: 8,
                    borderTop: `1px solid ${C.border}`,
                    minHeight: 98,
                    display: 'grid',
                    alignContent: 'center',
                    gap: 6,
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-display), sans-serif',
                      fontSize: 42,
                      fontWeight: 900,
                      lineHeight: 1,
                      color: phase >= DETECT ? C.red : `${C.text4}35`,
                      animation: phase === DETECT && risks > 0 ? 'riskBump 0.12s ease' : 'none',
                    }}
                  >
                    {phase >= DETECT ? risks : '—'}
                  </div>

                  <div
                    style={{
                      fontFamily: 'var(--font-mono), monospace',
                      fontSize: 9,
                      color: phase >= DETECT ? C.red : C.text4,
                      textTransform: 'uppercase',
                      letterSpacing: '0.12em',
                      fontWeight: 700,
                    }}
                  >
                    Risks Found
                  </div>
                </div>
              </div>

              <div className="demo-panel" style={{ display: 'flex', flexDirection: 'column' }}>
                <div
                  style={{
                    fontFamily: 'var(--font-mono), monospace',
                    fontSize: 9,
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    color: phase >= ENFORCE ? C.amber : C.text4,
                    marginBottom: 8,
                    fontWeight: 700,
                  }}
                >
                  Policy Actions
                </div>

                {phase >= ENFORCE ? (
                  <div className="mono-scroll" style={{ maxHeight: 250, overflowY: 'auto' }}>
                    {TRACE.policies.slice(0, policyIndex + 1).map((p, i) => (
                      <div
                        key={`${p.label}-${i}`}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '4px 6px',
                          marginBottom: 3,
                          borderRadius: 5,
                          background: `${p.c}06`,
                          border: `1px solid ${p.c}12`,
                          animation: 'slideIn 0.25s ease',
                        }}
                      >
                        <span
                          style={{
                            fontFamily: 'var(--font-body), sans-serif',
                            fontSize: 10,
                            color: C.text2,
                            paddingRight: 8,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {p.label}
                        </span>
                        <span
                          style={{
                            fontFamily: 'var(--font-mono), monospace',
                            fontSize: 8,
                            fontWeight: 700,
                            color: p.c,
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {p.action}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 10, color: C.text4, marginTop: 16 }}>
                    Awaiting policy evaluation
                  </div>
                )}

                {phase >= REDACT && (
                  <div
                    style={{
                      marginTop: 'auto',
                      paddingTop: 8,
                      borderTop: `1px solid ${C.border}`,
                      minHeight: 98,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-mono), monospace',
                        fontSize: 11,
                        color: C.green,
                        letterSpacing: '0.04em',
                        fontWeight: 700,
                      }}
                    >
                      ✓ All policies applied
                    </span>
                  </div>
                )}
              </div>

              <div
                className="demo-panel"
                style={{
                  borderColor: phase >= EVIDENCE ? C.goldDim : C.border,
                  background: phase >= EVIDENCE ? C.goldSoft : C.surface,
                  animation: sealed ? 'goldPulse 2.5s ease infinite' : 'none',
                  height: 344,
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-mono), monospace',
                    fontSize: 9,
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    color: phase >= REDACT ? C.gold : C.text4,
                    marginBottom: 8,
                    fontWeight: 700,
                  }}
                >
                  Govern Output
                </div>

                <div
                  style={{
                    background: C.bg,
                    border: `1px solid ${phase >= REDACT ? `${C.green}35` : C.border}`,
                    borderRadius: 10,
                    padding: '8px 10px',
                    minHeight: phase >= REDACT ? 118 : 144,
                    fontFamily: 'var(--font-mono), monospace',
                    fontSize: 10,
                    lineHeight: 1.45,
                    color: C.text2,
                  }}
                >
                  {phase < REDACT ? (
                    <span style={{ color: C.text4 }}>Awaiting policy actions…</span>
                  ) : (
                    <ConvoText template={TRACE.output.text} dangers={TRACE.output.dangers} phase={phase} mode="governed-output" />
                  )}
                </div>

                {phase >= REDACT && (
                  <div
                    style={{
                      marginTop: 6,
                      paddingTop: 6,
                      borderTop: `1px solid ${C.border}`,
                    }}
                  >
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                        gap: 4,
                        marginBottom: 5,
                      }}
                    >
                      {[
                        { n: TRACE.blocked, l: 'REDACTED', c: C.red },
                        { n: TRACE.alerted, l: 'ALERTED', c: C.amber },
                        { n: TRACE.allowed, l: 'ALLOWED', c: C.green },
                      ].map((s) => (
                        <div
                          key={s.l}
                          style={{
                            textAlign: 'center',
                            borderRadius: 6,
                            border: `1px solid ${s.c}20`,
                            background: `${s.c}08`,
                            padding: '4px 2px',
                          }}
                        >
                          <div
                            style={{
                              fontFamily: 'var(--font-display), sans-serif',
                              fontSize: 18,
                              fontWeight: 800,
                              color: s.c,
                              lineHeight: 1,
                            }}
                          >
                            {s.n}
                          </div>
                          <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 6, color: s.c }}>{s.l}</div>
                        </div>
                      ))}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono), monospace',
                          fontSize: 7,
                          color: C.text4,
                          textTransform: 'uppercase',
                          letterSpacing: '0.1em',
                        }}
                      >
                        Latency
                      </span>
                      <span
                        style={{
                          fontFamily: 'var(--font-display), sans-serif',
                          fontSize: 24,
                          lineHeight: 1,
                          fontWeight: 800,
                          color: C.green,
                        }}
                      >
                        47ms
                      </span>
                    </div>
                  </div>
                )}

                <div style={{ height: 1, background: C.border, margin: '6px 0 5px' }} />

                <div
                  style={{
                    fontFamily: 'var(--font-mono), monospace',
                    fontSize: 8,
                    color: phase >= EVIDENCE ? C.gold : C.text4,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    marginBottom: 2,
                    fontWeight: 700,
                  }}
                >
                  Evidence
                </div>

                <div
                  style={{
                    fontFamily: 'var(--font-mono), monospace',
                    fontSize: 8,
                    color: phase >= EVIDENCE ? C.gold : C.text4,
                    marginBottom: 4,
                    lineHeight: 1.2,
                  }}
                >
                  sha256:
                  <span style={{ color: phase >= EVIDENCE ? C.gold : C.text4, marginLeft: 4, whiteSpace: 'nowrap' }}>
                    {'e4b2c9f18a3d7b60'.slice(0, hashLen)}
                    {phase >= EVIDENCE && hashLen < 16 && <span style={{ animation: 'blink 0.4s infinite' }}>▊</span>}
                  </span>
                </div>

                <div
                  style={{
                    fontFamily: 'var(--font-mono), monospace',
                    fontSize: 8,
                    color: phase >= EVIDENCE ? C.gold : C.text4,
                    marginBottom: 4,
                    lineHeight: 1.2,
                  }}
                >
                  signed:
                  <span style={{ color: phase >= EVIDENCE ? C.gold : C.text4, marginLeft: 4, whiteSpace: 'nowrap' }}>
                    {phase >= EVIDENCE ? signedTime : '—'}
                  </span>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                  {TRACE.frameworks.map((fw) => (
                    <span
                      key={fw}
                      style={{
                        fontFamily: 'var(--font-mono), monospace',
                        fontSize: 7,
                        padding: '2px 4px',
                        borderRadius: 3,
                        background: `${C.gold}10`,
                        border: `1px solid ${C.goldDim}`,
                        color: phase >= EVIDENCE ? C.gold : C.text4,
                      }}
                    >
                      {fw}
                    </span>
                  ))}
                </div>

                {sealed && (
                  <div style={{ position: 'absolute', top: 9, right: 9, animation: 'sealDrop 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards' }}>
                    <div
                      style={{
                        width: 34,
                        height: 34,
                        borderRadius: '50%',
                        border: `2px solid ${C.gold}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: C.goldSoft,
                      }}
                    >
                      <span style={{ fontFamily: 'var(--font-display), sans-serif', fontSize: 15, fontWeight: 900, color: C.gold }}>
                        ✓
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div
              style={{
                marginTop: 6,
                fontFamily: 'var(--font-mono), monospace',
                fontSize: 9,
                color: C.text4,
                display: 'flex',
                flexWrap: 'wrap',
                gap: 6,
                alignItems: 'center',
              }}
            >
              <span>Raw conversation with PII exposed</span>
              <span style={{ color: C.text4 }}>→</span>
              <span>10 risks found</span>
              <span style={{ color: C.text4 }}>→</span>
              <span>Policy actions applied</span>
              <span style={{ color: C.text4 }}>→</span>
              <span style={{ color: C.gold }}>Governed response delivered</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
