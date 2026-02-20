import { jsPDF } from 'jspdf'
import {
  ContentClassification,
  Finding,
  FindingSeverity,
  FormatDetectionResult,
  ScanSummary,
} from './types'
import { getBrandLogoDataUrl } from '@/lib/pdf/brand-logo'

export interface ReportData {
  fileName: string
  scanDate: Date
  formatResult: FormatDetectionResult
  classification: ContentClassification
  summary: ScanSummary
  findings: Finding[]
}

interface ExposureIndicator {
  score: number
  label: string
  band: string
}

const SCANNER_DISCLAIMER =
  'This report reflects automated detection results only. TrustScope does not provide legal, compliance, or certification determinations.'

const severityPriority: Record<FindingSeverity, number> = {
  critical: 4,
  high: 3,
  medium: 2,
  low: 1,
}

function computeExposureIndicator(summary: ScanSummary): ExposureIndicator {
  const totalTraces = Math.max(summary.totalTraces, 1)
  const weighted =
    summary.bySeverity.critical * 12 +
    summary.bySeverity.high * 6 +
    summary.bySeverity.medium * 2 +
    summary.bySeverity.low * 1

  const perTrace = weighted / totalTraces
  const score = Math.max(0, Math.min(100, Math.round(100 - perTrace * 8)))

  if (score >= 90) return { score, label: 'Low exposure', band: 'Minimal' }
  if (score >= 80) return { score, label: 'Moderate exposure', band: 'Low' }
  if (score >= 70) return { score, label: 'Elevated exposure', band: 'Moderate' }
  if (score >= 60) return { score, label: 'High exposure', band: 'High' }
  return { score, label: 'Severe exposure', band: 'Critical' }
}

function getTopCategories(summary: ScanSummary): Array<{ category: string; count: number }> {
  return Object.entries(summary.byCategory)
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6)
}

function getTopEngines(summary: ScanSummary): Array<{ engine: string; count: number }> {
  return Object.entries(summary.byEngine)
    .map(([engine, count]) => ({ engine, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8)
}

function formatCategoryLabel(value: string): string {
  const mapping: Record<string, string> = {
    ssn: 'Social Security Number',
    email: 'Email',
    phone: 'Phone',
    credit_card: 'Card Number',
    date_of_birth: 'Date of Birth',
    medical_record: 'Medical Record ID',
    openai_key: 'OpenAI Key',
    anthropic_key: 'Anthropic Key',
    aws_access_key: 'AWS Access Key',
    aws_secret_key: 'AWS Secret Key',
    bearer_token: 'Bearer Token',
    private_key: 'Private Key',
    database_url: 'Database URL',
    high_tokens: 'High Token Usage',
    high_cost: 'High Cost',
    cost_growth: 'Cost Growth',
    identical_inputs: 'Identical Input Loop',
    similar_inputs: 'Similar Input Loop',
    oscillation: 'Oscillation Loop',
    prompt_injection: 'Prompt Injection',
    jailbreak: 'Jailbreak',
  }
  return mapping[value] ?? value.replace(/_/g, ' ')
}

function formatEngineLabel(value: string): string {
  return value.replace(/_/g, ' ')
}

function formatSeverityLabel(value: FindingSeverity): string {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

function formatFindingSnippet(finding: Finding): string {
  const preview = finding.redactedPreview?.trim() || finding.description
  if (!preview) return finding.description
  return preview.length > 70 ? `${preview.slice(0, 67)}...` : preview
}

function footer(doc: jsPDF): void {
  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  const page = doc.getCurrentPageInfo().pageNumber
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8)
  doc.setTextColor(113, 113, 122)
  doc.text(`TrustScope Trace Analysis Report • Page ${page}`, pageWidth / 2, pageHeight - 8, {
    align: 'center',
  })
}

export async function generatePdfReport(data: ReportData): Promise<Blob> {
  const doc = new jsPDF()
  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  const margin = 16
  const contentWidth = pageWidth - margin * 2
  let y = margin

  const ensureSpace = (space = 20) => {
    if (y + space > pageHeight - 14) {
      footer(doc)
      doc.addPage()
      y = margin
    }
  }

  const writeText = (
    text: string,
    size = 10,
    style: 'normal' | 'bold' = 'normal',
    color: [number, number, number] = [39, 39, 42]
  ) => {
    doc.setFont('helvetica', style)
    doc.setFontSize(size)
    doc.setTextColor(color[0], color[1], color[2])
    const lines = doc.splitTextToSize(text, contentWidth)
    doc.text(lines, margin, y)
    y += lines.length * (size * 0.38) + 2.4
  }

  const writeSection = (title: string) => {
    ensureSpace(16)
    y += 1
    doc.setDrawColor(63, 63, 70)
    doc.setLineWidth(0.4)
    doc.line(margin, y, pageWidth - margin, y)
    y += 5
    writeText(title, 12.5, 'bold')
    y += 1
  }

  // Header
  doc.setFillColor(9, 9, 11)
  doc.rect(0, 0, pageWidth, 34, 'F')

  const whiteLogo = await getBrandLogoDataUrl('white')
  if (whiteLogo) {
    doc.addImage(whiteLogo, 'PNG', margin, 8, 46, 15)
  } else {
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(17)
    doc.setTextColor(250, 250, 250)
    doc.text('TrustScope', margin, 18)
  }

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10.5)
  doc.setTextColor(228, 228, 231)
  doc.text('Trace Analysis Report', pageWidth - margin, 18, { align: 'right' })

  y = 42
  writeText(`File: ${data.fileName}`, 9, 'normal', [113, 113, 122])
  writeText(`Format: ${data.formatResult.displayName}`, 9, 'normal', [113, 113, 122])
  writeText(`Generated: ${data.scanDate.toLocaleString()}`, 9, 'normal', [113, 113, 122])
  writeText(`Scan duration: ${(data.summary.scanDurationMs / 1000).toFixed(2)}s`, 9, 'normal', [113, 113, 122])

  // Executive summary
  const indicator = computeExposureIndicator(data.summary)
  writeSection('Executive Summary')

  ensureSpace(24)
  doc.setFillColor(244, 244, 245)
  doc.setDrawColor(212, 212, 216)
  doc.roundedRect(margin, y, contentWidth, 22, 2, 2, 'FD')
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(16)
  doc.setTextColor(39, 39, 42)
  doc.text(`Exposure Index: ${indicator.score}/100`, margin + 3, y + 9)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.setTextColor(82, 82, 91)
  doc.text(`${indicator.label} · Band: ${indicator.band}`, margin + 3, y + 15)
  y += 27

  ensureSpace(21)
  const cards = [
    { label: 'Traces scanned', value: data.summary.totalTraces.toLocaleString() },
    { label: 'Total findings', value: data.summary.totalFindings.toLocaleString() },
    {
      label: 'Critical + High',
      value: (data.summary.bySeverity.critical + data.summary.bySeverity.high).toLocaleString(),
    },
    {
      label: 'Findings / trace',
      value: (data.summary.totalFindings / Math.max(data.summary.totalTraces, 1)).toFixed(2),
    },
  ]
  const cardWidth = (contentWidth - 12) / 4
  cards.forEach((card, index) => {
    const x = margin + index * (cardWidth + 4)
    doc.setFillColor(249, 250, 251)
    doc.setDrawColor(228, 228, 231)
    doc.roundedRect(x, y, cardWidth, 18, 2, 2, 'FD')
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(7.6)
    doc.setTextColor(113, 113, 122)
    doc.text(card.label, x + 2, y + 5)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(11)
    doc.setTextColor(39, 39, 42)
    doc.text(card.value, x + 2, y + 13)
  })
  y += 24

  writeSection('Top Risk Signals')
  const topCategories = getTopCategories(data.summary)
  if (topCategories.length === 0) {
    writeText('No findings detected in this trace file.', 9.5, 'normal', [82, 82, 91])
  } else {
    topCategories.forEach((item, index) => {
      ensureSpace(7)
      writeText(
        `${index + 1}. ${formatCategoryLabel(item.category)} — ${item.count.toLocaleString()} finding(s)`,
        9.5,
        'normal',
        [63, 63, 70]
      )
    })
  }

  writeSection('Model Footprint')
  const models = data.classification.modelNames.length > 0 ? data.classification.modelNames.join(', ') : 'Not detected'
  writeText(models, 9.5, 'normal', [63, 63, 70])

  writeSection('Findings by Severity')
  ;(['critical', 'high', 'medium', 'low'] as FindingSeverity[]).forEach((severity) => {
    ensureSpace(7)
    writeText(
      `${formatSeverityLabel(severity)}: ${data.summary.bySeverity[severity].toLocaleString()}`,
      9.4,
      'normal',
      [63, 63, 70]
    )
  })

  writeSection('Findings by Detection Engine')
  const topEngines = getTopEngines(data.summary)
  if (topEngines.length === 0) {
    writeText('No detection engines reported findings.', 9.2, 'normal', [82, 82, 91])
  } else {
    topEngines.forEach((item) => {
      ensureSpace(7)
      writeText(
        `${formatEngineLabel(item.engine)} — ${item.count.toLocaleString()} finding(s)`,
        9.2,
        'normal',
        [63, 63, 70]
      )
    })
  }

  writeSection('Representative Findings')
  const sampleFindings = [...data.findings]
    .sort((a, b) => severityPriority[b.severity] - severityPriority[a.severity])
    .slice(0, 20)

  if (sampleFindings.length === 0) {
    writeText('No findings available for detail preview.', 9.2, 'normal', [82, 82, 91])
  } else {
    for (const finding of sampleFindings) {
      ensureSpace(11)
      doc.setFillColor(249, 250, 251)
      doc.setDrawColor(228, 228, 231)
      doc.roundedRect(margin, y - 1, contentWidth, 9, 1.2, 1.2, 'FD')
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(8.4)
      doc.setTextColor(39, 39, 42)
      doc.text(
        `Trace #${finding.traceIndex + 1} • ${formatSeverityLabel(finding.severity)} • ${formatEngineLabel(finding.engine)}`,
        margin + 2,
        y + 2.6
      )
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(7.8)
      doc.setTextColor(82, 82, 91)
      doc.text(formatFindingSnippet(finding), margin + 2, y + 6.2)
      y += 11
    }
  }

  writeSection('Disclosure')
  writeText(SCANNER_DISCLAIMER, 8.4, 'normal', [113, 113, 122])

  const pageCount = doc.getNumberOfPages()
  for (let page = 1; page <= pageCount; page += 1) {
    doc.setPage(page)
    footer(doc)
  }

  return doc.output('blob')
}

export function downloadReport(blob: Blob, fileName: string): void {
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = fileName
  document.body.appendChild(anchor)
  anchor.click()
  document.body.removeChild(anchor)
  URL.revokeObjectURL(url)
}

export function downloadRedactedFile(content: string, originalFileName: string): void {
  const extension = originalFileName.split('.').pop() || 'txt'
  const baseName = originalFileName.replace(/\.[^/.]+$/, '')
  const fileName = `${baseName}_redacted.${extension}`

  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = fileName
  document.body.appendChild(anchor)
  anchor.click()
  document.body.removeChild(anchor)
  URL.revokeObjectURL(url)
}
