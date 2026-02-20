import { jsPDF } from 'jspdf'
import { getBrandLogoDataUrl } from '@/lib/pdf/brand-logo'
import { MigrationReport } from './migration-report'

interface MigrationPdfOptions {
  baselineFileName: string
  candidateFileName: string
  generatedAt: Date
  comparisonHash: string
}

const DISCLAIMER_TEXT =
  'This report reflects automated detection results only. TrustScope does not certify migration outcomes. Final deployment decisions are the responsibility of the deploying team.'

function verdictColor(verdict: MigrationReport['verdict']): [number, number, number] {
  if (verdict === 'CLEAR') return [22, 163, 74]
  if (verdict === 'DRIFT') return [217, 119, 6]
  return [220, 38, 38]
}

function addFooter(doc: jsPDF): void {
  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  const pageNumber = doc.getCurrentPageInfo().pageNumber
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8)
  doc.setTextColor(113, 113, 122)
  doc.text(`TrustScope Migration Report • Page ${pageNumber}`, pageWidth / 2, pageHeight - 8, {
    align: 'center',
  })
}

export async function generateMigrationPdfReport(
  report: MigrationReport,
  options: MigrationPdfOptions
): Promise<Blob> {
  const doc = new jsPDF()
  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  const margin = 16
  const contentWidth = pageWidth - margin * 2
  let y = margin

  const ensureSpace = (space = 22) => {
    if (y + space > pageHeight - 14) {
      addFooter(doc)
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
    y += 2
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
  doc.text('Model Migration Report', pageWidth - margin, 18, { align: 'right' })

  y = 42
  writeText(`Baseline: ${options.baselineFileName}`, 9, 'normal', [113, 113, 122])
  writeText(`Candidate: ${options.candidateFileName}`, 9, 'normal', [113, 113, 122])
  writeText(`Generated: ${options.generatedAt.toLocaleString()}`, 9, 'normal', [113, 113, 122])

  // Verdict card
  ensureSpace(30)
  const [vr, vg, vb] = verdictColor(report.verdict)
  doc.setFillColor(vr, vg, vb)
  doc.roundedRect(margin, y - 1.5, contentWidth, 26, 2, 2, 'F')
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(19)
  doc.setTextColor(255, 255, 255)
  doc.text(report.verdict, margin + 4, y + 8)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9.5)
  const verdictLines = doc.splitTextToSize(report.verdictContext, contentWidth - 8)
  doc.text(verdictLines, margin + 4, y + 14)
  y += 31

  // Executive cards
  const degraded = report.strands.filter((strand) => strand.status === 'DEGRADED').length
  const critical = report.strands.filter(
    (strand) =>
      strand.status === 'DEGRADED' &&
      (strand.key === 'pii_exposure' || strand.key === 'secrets' || strand.key === 'prompt_injection')
  ).length

  const cards = [
    { label: 'Matched Pairs', value: report.confidence.matchedPairs.toLocaleString() },
    { label: 'Degraded Strands', value: degraded.toString() },
    { label: 'Critical Strands', value: critical.toString() },
  ]

  ensureSpace(22)
  const cardWidth = (contentWidth - 8) / 3
  cards.forEach((card, index) => {
    const x = margin + index * (cardWidth + 4)
    doc.setFillColor(244, 244, 245)
    doc.setDrawColor(212, 212, 216)
    doc.roundedRect(x, y, cardWidth, 18, 2, 2, 'FD')
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8)
    doc.setTextColor(113, 113, 122)
    doc.text(card.label, x + 2, y + 6)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(13)
    doc.setTextColor(39, 39, 42)
    doc.text(card.value, x + 2, y + 14)
  })
  y += 24

  writeSection('8-Strand Comparison')
  const tableHeadY = y
  doc.setFillColor(24, 24, 27)
  doc.rect(margin, tableHeadY - 4, contentWidth, 8, 'F')
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(8.5)
  doc.setTextColor(244, 244, 245)
  doc.text('Strand', margin + 2, tableHeadY + 1)
  doc.text('Baseline', margin + 70, tableHeadY + 1)
  doc.text('Candidate', margin + 108, tableHeadY + 1)
  doc.text('Delta', margin + 146, tableHeadY + 1)
  doc.text('Status', margin + 174, tableHeadY + 1)
  y += 8

  for (const strand of report.strands) {
    ensureSpace(8)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8.3)
    doc.setTextColor(39, 39, 42)
    doc.text(strand.label, margin + 2, y + 1.2)
    doc.text(strand.baselineDisplay, margin + 70, y + 1.2)
    doc.text(strand.candidateDisplay, margin + 108, y + 1.2)
    doc.text(strand.deltaDisplay, margin + 146, y + 1.2)
    doc.text(strand.status, margin + 174, y + 1.2)
    y += 5.5
    if (strand.notes) {
      doc.setFontSize(7.3)
      doc.setTextColor(113, 113, 122)
      doc.text(strand.notes, margin + 2, y + 0.8)
      y += 3.8
    }
  }

  if (report.regressions.length > 0) {
    writeSection('Top Regressions')
    for (const [index, regression] of report.regressions.slice(0, 10).entries()) {
      ensureSpace(16)
      writeText(`${index + 1}. ${regression.strandLabel}`, 10.2, 'bold')
      writeText(regression.detail, 9.2, 'normal', [63, 63, 70])
      writeText(regression.baselineExample, 8.5, 'normal', [113, 113, 122])
      writeText(regression.candidateExample, 8.5, 'normal', [113, 113, 122])
      y += 1
    }
  }

  writeSection('Projected Impact at Rollout')
  writeText(
    'Canary rollout means starting with a small share of traffic (10%, 25%, 50%) before 100%.',
    8.8,
    'normal',
    [113, 113, 122]
  )
  if (report.projections.length === 0 || report.projectionStrands.length === 0) {
    writeText('No regressions to project. All strands are stable or improved.', 9.4, 'normal', [63, 63, 70])
  } else {
    const columns = report.projectionStrands
      .map((key) => report.strands.find((item) => item.key === key)?.label ?? key)
      .slice(0, 3)
    ensureSpace(10)
    const headY = y
    doc.setFillColor(24, 24, 27)
    doc.rect(margin, headY - 4, contentWidth, 8, 'F')
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(8)
    doc.setTextColor(244, 244, 245)
    doc.text('Rollout', margin + 2, headY + 1)
    columns.forEach((column, idx) => {
      doc.text(column, margin + 40 + idx * 50, headY + 1)
    })
    y += 8

    for (const row of report.projections) {
      ensureSpace(7)
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(8.3)
      doc.setTextColor(39, 39, 42)
      doc.text(`${row.rolloutPct}%`, margin + 2, y + 1.1)
      report.projectionStrands.slice(0, 3).forEach((key, idx) => {
        doc.text(row.values[key] ?? 'N/A', margin + 40 + idx * 50, y + 1.1)
      })
      y += 6
    }
  }

  writeSection('Confidence and Disclosure')
  writeText(
    `Matched pairs: ${report.confidence.matchedPairs.toLocaleString()} • Unmatched: ${report.confidence.unmatchedBaseline.toLocaleString()} baseline / ${report.confidence.unmatchedCandidate.toLocaleString()} candidate.`,
    9,
    'normal',
    [63, 63, 70]
  )
  if (report.confidence.note) {
    writeText(report.confidence.note, 8.6, 'normal', [113, 113, 122])
  }
  writeText(DISCLAIMER_TEXT, 8.5, 'normal', [113, 113, 122])
  writeText(`Comparison hash (SHA-256): ${options.comparisonHash}`, 7.8, 'normal', [82, 82, 91])

  // Footer pass
  const pageCount = doc.getNumberOfPages()
  for (let page = 1; page <= pageCount; page += 1) {
    doc.setPage(page)
    addFooter(doc)
  }

  return doc.output('blob')
}

export function downloadMigrationPdf(blob: Blob, fileName: string): void {
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = fileName
  document.body.appendChild(anchor)
  anchor.click()
  document.body.removeChild(anchor)
  URL.revokeObjectURL(url)
}

export const migrationReportDisclaimer = DISCLAIMER_TEXT

