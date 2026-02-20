import BrowserScanner from '@/components/scanner/BrowserScanner'
import type { SampleType } from '@/lib/scanner/types'
import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'AI Trace Analyzer',
  description:
    'Upload AI traces or run a demo to analyze risk, leaks, and policy violations locally in your browser.',
}

function resolveDemo(value: string | null): SampleType {
  if (!value) return 'financial_advisor'
  const normalized = value.toLowerCase()
  if (normalized === 'support' || normalized === 'customer-support' || normalized === 'support-bot') return 'support_bot'
  if (normalized === 'code' || normalized === 'code-assistant') return 'code_assistant'
  if (normalized === 'claims' || normalized === 'claims-processor' || normalized === 'healthcare' || normalized === 'healthcare-ai') return 'claims_processor'
  if (normalized === 'research' || normalized === 'research-pipeline' || normalized === 'multiagent' || normalized === 'multi-agent') return 'research_pipeline'
  if (normalized === 'financial' || normalized === 'financial-bot' || normalized === 'financial-advisor') return 'financial_advisor'
  return 'financial_advisor'
}

interface ScannerPageProps {
  searchParams?: Promise<Record<string, string | string[] | undefined>> | Record<string, string | string[] | undefined>
}

export default async function ScannerPage({ searchParams }: ScannerPageProps) {
  const params = searchParams
    ? 'then' in searchParams
      ? await searchParams
      : searchParams
    : undefined
  const demoParam = params?.demo
  const demoValue = Array.isArray(demoParam) ? demoParam[0] : demoParam ?? null
  const hasDemoParam = !!demoValue
  const defaultSample = resolveDemo(demoValue)

  return (
    <div className="min-h-screen bg-[var(--bg)] py-12 md:py-14">
      <section className="section-container max-w-6xl">
        <div className="mb-12 text-center">
          <p className="eyebrow mb-4">AI Trace Analyzer</p>
          <h1 className="text-4xl font-extrabold leading-[1.04] md:text-6xl lg:text-7xl">
            Analyze your traces.
            <br />
            <span className="text-[var(--text-secondary)]">See where risk starts.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-[var(--text-secondary)]">
            Local-first analysis with no data upload. Upload your trace file, then disconnect WiFi and run it.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Link href="#trace-analyzer-workspace" className="btn-primary gap-2">
              Start Analysis <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/switch#compare-upload" className="btn-secondary gap-2">
              Open Model Compare <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs text-[var(--text-subtle)]">
            <span>100% local processing</span>
            <span>Disconnect WiFi and rerun</span>
            <span>Zero signup required</span>
            <span>JSON, JSONL, CSV, TSV, HAR</span>
          </div>
        </div>

        <BrowserScanner
          defaultSample={defaultSample}
          autoRunDemo={hasDemoParam}
          showDemoBadge={hasDemoParam}
        />
      </section>
    </div>
  )
}
