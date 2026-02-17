// Report Generator for Browser Scanner
// Client-side PDF generation using jsPDF

import { jsPDF } from 'jspdf';
import {
  Finding,
  ScanSummary,
  ContentClassification,
  FormatDetectionResult,
  FindingEngine,
  FindingSeverity,
} from './types';

export interface ReportData {
  fileName: string;
  scanDate: Date;
  formatResult: FormatDetectionResult;
  classification: ContentClassification;
  summary: ScanSummary;
  findings: Finding[];
}

export function generatePdfReport(data: ReportData): Blob {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;
  let y = margin;

  // Helper functions
  const addText = (text: string, size: number = 10, style: 'normal' | 'bold' = 'normal') => {
    doc.setFontSize(size);
    doc.setFont('helvetica', style);
    const lines = doc.splitTextToSize(text, contentWidth);
    doc.text(lines, margin, y);
    y += lines.length * (size * 0.4) + 2;
  };

  const addSection = (title: string) => {
    y += 5;
    doc.setDrawColor(59, 130, 246); // Blue
    doc.setLineWidth(0.5);
    doc.line(margin, y, pageWidth - margin, y);
    y += 5;
    addText(title, 14, 'bold');
    y += 2;
  };

  const checkPageBreak = (neededSpace: number = 30) => {
    if (y > doc.internal.pageSize.getHeight() - neededSpace) {
      doc.addPage();
      y = margin;
    }
  };

  // Header
  doc.setFillColor(15, 23, 42); // Slate-900
  doc.rect(0, 0, pageWidth, 35, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('TrustScope', margin, 18);

  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text('AI Trace Security Scan Report', margin, 28);

  doc.setTextColor(0, 0, 0);
  y = 45;

  // Scan Info
  addSection('Scan Information');
  addText(`File: ${data.fileName}`);
  addText(`Format: ${data.formatResult.displayName}`);
  addText(`Traces Scanned: ${data.formatResult.traceCount.toLocaleString()}`);
  addText(`Scan Date: ${data.scanDate.toLocaleString()}`);
  addText(`Scan Duration: ${(data.summary.scanDurationMs / 1000).toFixed(2)} seconds`);

  // Summary
  addSection('Summary');

  const severityColors: Record<FindingSeverity, [number, number, number]> = {
    critical: [220, 38, 38],
    high: [234, 88, 12],
    medium: [202, 138, 4],
    low: [22, 163, 74],
  };

  // Draw severity boxes
  const boxWidth = (contentWidth - 15) / 4;
  let boxX = margin;

  for (const severity of ['critical', 'high', 'medium', 'low'] as FindingSeverity[]) {
    const count = data.summary.bySeverity[severity];
    const [r, g, b] = severityColors[severity];

    doc.setFillColor(r, g, b);
    doc.roundedRect(boxX, y, boxWidth, 25, 2, 2, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text(count.toString(), boxX + boxWidth / 2, y + 12, { align: 'center' });

    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.text(severity.toUpperCase(), boxX + boxWidth / 2, y + 20, { align: 'center' });

    boxX += boxWidth + 5;
  }

  doc.setTextColor(0, 0, 0);
  y += 35;

  // Findings by Engine
  addText('Findings by Detection Engine:', 11, 'bold');
  y += 2;

  const engineLabels: Record<FindingEngine, string> = {
    pii: 'PII Detection',
    secrets: 'Secrets Detection',
    cost: 'Cost Anomalies',
    loop: 'Loop Detection',
    toxicity: 'Content Safety',
  };

  for (const engine of Object.keys(engineLabels) as FindingEngine[]) {
    const count = data.summary.byEngine[engine];
    addText(`  • ${engineLabels[engine]}: ${count} finding${count !== 1 ? 's' : ''}`);
  }

  // Content Classification
  checkPageBreak(50);
  addSection('Content Classification');

  addText(`Models Detected: ${data.classification.modelNames.join(', ') || 'None'}`);

  const contentTypes: string[] = [];
  if (data.classification.hasPrompts) contentTypes.push('Prompts');
  if (data.classification.hasResponses) contentTypes.push('Responses');
  if (data.classification.hasToolCalls) contentTypes.push('Tool Calls');
  if (data.classification.hasSystemPrompts) contentTypes.push('System Prompts');
  if (data.classification.hasEmbeddings) contentTypes.push('Embeddings');
  if (data.classification.hasMetadata) contentTypes.push('Metadata');

  addText(`Content Types: ${contentTypes.join(', ') || 'None detected'}`);

  if (data.classification.dateRange) {
    addText(`Date Range: ${new Date(data.classification.dateRange.earliest).toLocaleDateString()} - ${new Date(data.classification.dateRange.latest).toLocaleDateString()}`);
  }

  // Risk Assessment
  const risks: string[] = [];
  if (data.classification.hasPii) risks.push('PII detected in traces');
  if (data.classification.hasSecrets) risks.push('Secrets/API keys detected');
  if (data.classification.hasSystemPrompts) risks.push('System prompts may contain proprietary logic');
  if (data.classification.hasEmbeddings) risks.push('Embeddings may leak training data');

  if (risks.length > 0) {
    y += 3;
    addText('Risk Assessment:', 11, 'bold');
    for (const risk of risks) {
      addText(`  ⚠ ${risk}`);
    }
  }

  // Detailed Findings
  if (data.findings.length > 0) {
    checkPageBreak(40);
    addSection('Detailed Findings');

    // Group findings by engine and category
    const grouped = groupFindings(data.findings);

    for (const [engine, categories] of Object.entries(grouped)) {
      checkPageBreak(30);
      addText(`${engineLabels[engine as FindingEngine]}`, 12, 'bold');

      for (const [category, findings] of Object.entries(categories)) {
        checkPageBreak(20);
        addText(`  ${getCategoryLabel(category)} (${findings.length})`, 10, 'bold');

        // Show up to 5 examples per category
        const examples = findings.slice(0, 5);
        for (const finding of examples) {
          checkPageBreak(15);
          doc.setFillColor(245, 245, 245);
          doc.roundedRect(margin + 10, y - 2, contentWidth - 20, 12, 1, 1, 'F');

          doc.setFontSize(8);
          doc.setFont('helvetica', 'normal');
          doc.text(`Trace #${finding.traceIndex} | ${finding.field} | ${finding.redactedPreview}`, margin + 12, y + 4);
          y += 14;
        }

        if (findings.length > 5) {
          addText(`    ... and ${findings.length - 5} more`, 8);
        }

        y += 3;
      }
    }
  }

  // Footer
  const addFooter = () => {
    doc.setFontSize(8);
    doc.setTextColor(128, 128, 128);
    doc.text(
      'Generated by TrustScope Browser Scanner | 100% Client-Side | No data transmitted',
      pageWidth / 2,
      doc.internal.pageSize.getHeight() - 10,
      { align: 'center' }
    );
  };

  // Add footer to all pages
  const totalPages = doc.internal.pages.length - 1;
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    addFooter();
  }

  return doc.output('blob');
}

function groupFindings(findings: Finding[]): Record<string, Record<string, Finding[]>> {
  const grouped: Record<string, Record<string, Finding[]>> = {};

  for (const finding of findings) {
    if (!grouped[finding.engine]) {
      grouped[finding.engine] = {};
    }
    if (!grouped[finding.engine][finding.category]) {
      grouped[finding.engine][finding.category] = [];
    }
    grouped[finding.engine][finding.category].push(finding);
  }

  return grouped;
}

function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    // PII
    ssn: 'Social Security Numbers',
    email: 'Email Addresses',
    phone: 'Phone Numbers',
    credit_card: 'Credit Card Numbers',
    date_of_birth: 'Dates of Birth',
    ip_address: 'IP Addresses',
    medical_record: 'Medical Record IDs',
    drivers_license: "Driver's Licenses",
    // Secrets
    openai_key: 'OpenAI API Keys',
    anthropic_key: 'Anthropic API Keys',
    aws_access_key: 'AWS Access Keys',
    aws_secret_key: 'AWS Secret Keys',
    bearer_token: 'Bearer Tokens',
    private_key: 'Private Keys',
    generic_api_key: 'Generic API Keys',
    database_url: 'Database URLs',
    github_token: 'GitHub Tokens',
    google_api_key: 'Google API Keys',
    // Cost
    high_tokens: 'High Token Usage',
    high_cost: 'High Cost Requests',
    cost_growth: 'Cost Growth Spikes',
    above_median: 'Above Median Cost',
    // Loop
    identical_inputs: 'Identical Input Loops',
    similar_inputs: 'Similar Input Patterns',
    oscillation: 'Oscillation Patterns',
    // Toxicity
    hate_speech: 'Hate Speech',
    violence: 'Violence',
    self_harm: 'Self-Harm Content',
    sexual: 'Sexual Content',
    profanity: 'Profanity',
  };

  return labels[category] || category;
}

// Download helper
export function downloadReport(blob: Blob, fileName: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Download redacted file
export function downloadRedactedFile(content: string, originalFileName: string): void {
  const extension = originalFileName.split('.').pop() || 'txt';
  const baseName = originalFileName.replace(/\.[^/.]+$/, '');
  const newFileName = `${baseName}_redacted.${extension}`;

  const blob = new Blob([content], { type: 'application/json' });
  downloadReport(blob, newFileName);
}
