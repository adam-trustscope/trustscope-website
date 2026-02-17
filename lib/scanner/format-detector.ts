// Format Detection for Browser Scanner
import { DetectedFormat, FormatDetectionResult, ScannedTrace } from './types';

interface ParsedContent {
  format: DetectedFormat;
  displayName: string;
  confidence: number;
  traces: ScannedTrace[];
  rawLines?: string[];
}

// Detect format and parse content
export function detectAndParse(
  content: string,
  fileName: string,
  fileType: string
): ParsedContent {
  const extension = fileName.split('.').pop()?.toLowerCase() || '';

  // Try JSON-based formats first
  if (extension === 'json' || extension === 'jsonl' || fileType.includes('json')) {
    return detectJsonFormat(content, extension);
  }

  // CSV/TSV
  if (extension === 'csv' || extension === 'tsv' || fileType.includes('csv') || fileType.includes('tab-separated')) {
    return detectDelimitedFormat(content, extension);
  }

  // HAR files
  if (extension === 'har') {
    return detectHarFormat(content);
  }

  // TXT - try to auto-detect
  if (extension === 'txt' || extension === '') {
    return detectFromContent(content);
  }

  return {
    format: 'unknown',
    displayName: 'Unknown format',
    confidence: 0,
    traces: [],
  };
}

function detectJsonFormat(content: string, extension: string): ParsedContent {
  // Check if JSONL (line-delimited)
  if (extension === 'jsonl' || content.trim().includes('\n{')) {
    return parseJsonl(content);
  }

  try {
    const parsed = JSON.parse(content);

    // LangSmith format: has run_type, child_runs, serialized
    if (isLangSmithFormat(parsed)) {
      return parseLangSmith(parsed);
    }

    // LangFuse format: has observations array or traces structure
    if (isLangFuseFormat(parsed)) {
      return parseLangFuse(parsed);
    }

    // OpenTelemetry format: has resourceSpans or traceId+spanId
    if (isOtelFormat(parsed)) {
      return parseOtel(parsed);
    }

    // HAR format: has log.entries
    if (isHarFormat(parsed)) {
      return parseHar(parsed);
    }

    // Generic JSON array
    if (Array.isArray(parsed)) {
      return parseJsonArray(parsed);
    }

    // Single object with AI-related fields
    if (hasAIFields(parsed)) {
      return {
        format: 'json-array',
        displayName: 'JSON trace',
        confidence: 0.7,
        traces: [extractTrace(parsed, 0)],
      };
    }

    return {
      format: 'unknown',
      displayName: 'JSON (no traces detected)',
      confidence: 0.3,
      traces: [],
    };
  } catch {
    // Invalid JSON, try JSONL
    return parseJsonl(content);
  }
}

function isLangSmithFormat(data: unknown): boolean {
  if (Array.isArray(data)) {
    const sample = data[0];
    return Boolean(
      sample &&
      typeof sample === 'object' &&
      ('run_type' in sample || 'child_runs' in sample || 'serialized' in sample)
    );
  }
  return Boolean(
    data &&
    typeof data === 'object' &&
    ('run_type' in data || 'child_runs' in data || 'serialized' in data)
  );
}

function isLangFuseFormat(data: unknown): boolean {
  if (!data || typeof data !== 'object') return false;
  const obj = data as Record<string, unknown>;
  return (
    'observations' in obj ||
    ('traces' in obj && Array.isArray(obj.traces)) ||
    ('data' in obj && Array.isArray(obj.data) && hasLangFuseFields(obj.data[0]))
  );
}

function hasLangFuseFields(item: unknown): boolean {
  if (!item || typeof item !== 'object') return false;
  const obj = item as Record<string, unknown>;
  return 'traceId' in obj || 'observationId' in obj || 'generation' in obj;
}

function isOtelFormat(data: unknown): boolean {
  if (!data || typeof data !== 'object') return false;
  const obj = data as Record<string, unknown>;
  return (
    'resourceSpans' in obj ||
    ('traceId' in obj && 'spanId' in obj) ||
    (Array.isArray(data) && data[0] && 'traceId' in data[0] && 'spanId' in data[0])
  );
}

function isHarFormat(data: unknown): boolean {
  if (!data || typeof data !== 'object') return false;
  const obj = data as Record<string, unknown>;
  return 'log' in obj && typeof obj.log === 'object' && obj.log !== null && 'entries' in (obj.log as Record<string, unknown>);
}

function hasAIFields(data: unknown): boolean {
  if (!data || typeof data !== 'object') return false;
  const obj = data as Record<string, unknown>;
  const aiFieldNames = ['prompt', 'completion', 'input', 'output', 'messages', 'response', 'model', 'tokens', 'usage'];
  return aiFieldNames.some(field => field in obj);
}

function parseLangSmith(data: unknown): ParsedContent {
  const items = Array.isArray(data) ? data : [data];
  const traces: ScannedTrace[] = [];

  function extractFromRun(run: Record<string, unknown>, index: number): void {
    const trace: ScannedTrace = {
      index,
      raw: JSON.stringify(run),
      model: extractModelName(run),
      input: extractInput(run),
      output: extractOutput(run),
      tokensIn: extractTokensIn(run),
      tokensOut: extractTokensOut(run),
      timestamp: run.start_time as string || run.end_time as string,
      metadata: run.extra as Record<string, unknown> || {},
    };

    if (run.serialized && typeof run.serialized === 'object') {
      const serialized = run.serialized as Record<string, unknown>;
      if (serialized.kwargs && typeof serialized.kwargs === 'object') {
        const kwargs = serialized.kwargs as Record<string, unknown>;
        if (kwargs.tools) {
          trace.toolCalls = (kwargs.tools as unknown[]).map(t => JSON.stringify(t));
        }
      }
    }

    traces.push(trace);

    // Process child runs recursively
    if (Array.isArray(run.child_runs)) {
      for (const child of run.child_runs) {
        extractFromRun(child as Record<string, unknown>, traces.length);
      }
    }
  }

  for (const item of items) {
    extractFromRun(item as Record<string, unknown>, traces.length);
  }

  return {
    format: 'langsmith',
    displayName: 'LangSmith JSON export',
    confidence: 0.95,
    traces,
  };
}

function parseLangFuse(data: unknown): ParsedContent {
  const obj = data as Record<string, unknown>;
  let items: unknown[] = [];

  if (Array.isArray(obj.observations)) {
    items = obj.observations;
  } else if (Array.isArray(obj.traces)) {
    items = obj.traces;
  } else if (Array.isArray(obj.data)) {
    items = obj.data;
  } else if (Array.isArray(data)) {
    items = data;
  }

  const traces: ScannedTrace[] = items.map((item, index) => {
    const record = item as Record<string, unknown>;
    return {
      index,
      raw: JSON.stringify(item),
      model: extractModelName(record),
      input: extractInput(record),
      output: extractOutput(record),
      tokensIn: extractTokensIn(record),
      tokensOut: extractTokensOut(record),
      cost: typeof record.totalCost === 'number' ? record.totalCost : undefined,
      timestamp: record.startTime as string || record.timestamp as string,
      metadata: record.metadata as Record<string, unknown> || {},
    };
  });

  return {
    format: 'langfuse',
    displayName: 'LangFuse JSON export',
    confidence: 0.95,
    traces,
  };
}

function parseOtel(data: unknown): ParsedContent {
  const traces: ScannedTrace[] = [];
  const obj = data as Record<string, unknown>;

  if (obj.resourceSpans && Array.isArray(obj.resourceSpans)) {
    for (const resourceSpan of obj.resourceSpans) {
      const rs = resourceSpan as Record<string, unknown>;
      if (rs.scopeSpans && Array.isArray(rs.scopeSpans)) {
        for (const scopeSpan of rs.scopeSpans) {
          const ss = scopeSpan as Record<string, unknown>;
          if (ss.spans && Array.isArray(ss.spans)) {
            for (const span of ss.spans) {
              traces.push(extractOtelSpan(span as Record<string, unknown>, traces.length));
            }
          }
        }
      }
    }
  } else if (Array.isArray(data)) {
    for (const span of data) {
      traces.push(extractOtelSpan(span as Record<string, unknown>, traces.length));
    }
  }

  return {
    format: 'otel',
    displayName: 'OpenTelemetry spans',
    confidence: 0.9,
    traces,
  };
}

function extractOtelSpan(span: Record<string, unknown>, index: number): ScannedTrace {
  const attributes = span.attributes as Record<string, unknown>[] || [];
  const attrMap: Record<string, unknown> = {};

  for (const attr of attributes) {
    if (attr.key && 'value' in attr) {
      const value = attr.value as Record<string, unknown>;
      attrMap[attr.key as string] = value.stringValue || value.intValue || value.doubleValue;
    }
  }

  return {
    index,
    raw: JSON.stringify(span),
    model: attrMap['gen_ai.request.model'] as string || attrMap['llm.model'] as string,
    input: attrMap['gen_ai.prompt'] as string || attrMap['llm.prompts'] as string,
    output: attrMap['gen_ai.completion'] as string || attrMap['llm.completions'] as string,
    tokensIn: attrMap['gen_ai.usage.prompt_tokens'] as number || attrMap['llm.token_count.prompt'] as number,
    tokensOut: attrMap['gen_ai.usage.completion_tokens'] as number || attrMap['llm.token_count.completion'] as number,
    timestamp: span.startTimeUnixNano ? new Date(Number(span.startTimeUnixNano) / 1_000_000).toISOString() : undefined,
    metadata: attrMap,
  };
}

function parseHar(data: unknown): ParsedContent {
  return detectHarFormat(JSON.stringify(data));
}

function detectHarFormat(content: string): ParsedContent {
  try {
    const har = JSON.parse(content);
    const entries = har.log?.entries || [];
    const llmPatterns = [
      'api.openai.com',
      'api.anthropic.com',
      'generativelanguage.googleapis.com',
      'api.mistral.ai',
      'api.cohere.ai',
    ];

    const llmEntries = entries.filter((entry: Record<string, unknown>) => {
      const url = (entry.request as Record<string, unknown>)?.url as string || '';
      return llmPatterns.some(pattern => url.includes(pattern));
    });

    if (llmEntries.length === 0) {
      return {
        format: 'har',
        displayName: 'HTTP Archive — No LLM API calls found',
        confidence: 0.5,
        traces: [],
      };
    }

    const traces: ScannedTrace[] = llmEntries.map((entry: Record<string, unknown>, index: number) => {
      const request = entry.request as Record<string, unknown>;
      const response = entry.response as Record<string, unknown>;

      let inputText = '';
      let outputText = '';
      let model = '';

      try {
        const postData = request.postData as Record<string, unknown>;
        if (postData?.text) {
          const body = JSON.parse(postData.text as string);
          inputText = JSON.stringify(body.messages || body.prompt || body);
          model = body.model || '';
        }
      } catch { /* ignore */ }

      try {
        const responseContent = response.content as Record<string, unknown>;
        if (responseContent?.text) {
          const body = JSON.parse(responseContent.text as string);
          outputText = JSON.stringify(body.choices || body.content || body);
        }
      } catch { /* ignore */ }

      return {
        index,
        raw: JSON.stringify(entry),
        model,
        input: inputText,
        output: outputText,
        timestamp: entry.startedDateTime as string,
        metadata: {
          url: request.url,
          method: request.method,
          status: (response as Record<string, unknown>).status,
        },
      };
    });

    return {
      format: 'har',
      displayName: `HTTP Archive — ${traces.length} API calls`,
      confidence: 0.9,
      traces,
    };
  } catch {
    return {
      format: 'unknown',
      displayName: 'Invalid HAR file',
      confidence: 0,
      traces: [],
    };
  }
}

function parseJsonl(content: string): ParsedContent {
  const lines = content.trim().split('\n').filter(line => line.trim());
  const traces: ScannedTrace[] = [];

  for (let i = 0; i < lines.length; i++) {
    try {
      const parsed = JSON.parse(lines[i]);
      if (hasAIFields(parsed)) {
        traces.push(extractTrace(parsed, traces.length));
      }
    } catch {
      // Skip invalid lines
    }
  }

  if (traces.length === 0) {
    return {
      format: 'unknown',
      displayName: 'JSONL (no traces detected)',
      confidence: 0.3,
      traces: [],
      rawLines: lines,
    };
  }

  return {
    format: 'jsonl',
    displayName: 'JSONL traces',
    confidence: 0.85,
    traces,
    rawLines: lines,
  };
}

function parseJsonArray(data: unknown[]): ParsedContent {
  const traces: ScannedTrace[] = [];

  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    if (item && typeof item === 'object' && hasAIFields(item)) {
      traces.push(extractTrace(item as Record<string, unknown>, traces.length));
    }
  }

  return {
    format: 'json-array',
    displayName: `JSON array — ${traces.length} traces`,
    confidence: traces.length > 0 ? 0.8 : 0.4,
    traces,
  };
}

function detectDelimitedFormat(content: string, extension: string): ParsedContent {
  const lines = content.trim().split('\n');
  if (lines.length < 2) {
    return {
      format: extension === 'tsv' ? 'tsv' : 'csv',
      displayName: `${extension.toUpperCase()} (empty or no data rows)`,
      confidence: 0.3,
      traces: [],
    };
  }

  // Detect delimiter
  const firstLine = lines[0];
  const tabCount = (firstLine.match(/\t/g) || []).length;
  const commaCount = (firstLine.match(/,/g) || []).length;
  const delimiter = tabCount > commaCount ? '\t' : ',';
  const format: DetectedFormat = delimiter === '\t' ? 'tsv' : 'csv';

  // Parse headers
  const headers = parseDelimitedLine(firstLine, delimiter);
  const aiHeaders = ['prompt', 'completion', 'input', 'output', 'messages', 'response', 'model', 'tokens'];
  const hasAIHeaders = headers.some(h => aiHeaders.some(ah => h.toLowerCase().includes(ah)));

  if (!hasAIHeaders) {
    return {
      format,
      displayName: `${format.toUpperCase()} (no AI-related columns detected)`,
      confidence: 0.4,
      traces: [],
    };
  }

  // Parse data rows
  const traces: ScannedTrace[] = [];
  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue;

    const values = parseDelimitedLine(lines[i], delimiter);
    const row: Record<string, string> = {};
    for (let j = 0; j < headers.length; j++) {
      row[headers[j]] = values[j] || '';
    }

    traces.push({
      index: traces.length,
      raw: lines[i],
      model: row.model || row.Model,
      input: row.input || row.prompt || row.Prompt || row.messages || row.Messages,
      output: row.output || row.completion || row.Completion || row.response || row.Response,
      tokensIn: parseInt(row.tokens_in || row.input_tokens || row.prompt_tokens || '0') || undefined,
      tokensOut: parseInt(row.tokens_out || row.output_tokens || row.completion_tokens || '0') || undefined,
      cost: parseFloat(row.cost || row.Cost || '0') || undefined,
      timestamp: row.timestamp || row.Timestamp || row.created_at || row.date,
      metadata: row,
    });
  }

  return {
    format,
    displayName: `${format.toUpperCase()} data — ${traces.length} rows`,
    confidence: 0.85,
    traces,
  };
}

function parseDelimitedLine(line: string, delimiter: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === delimiter && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }

  result.push(current.trim());
  return result;
}

function detectFromContent(content: string): ParsedContent {
  // Try JSON first
  if (content.trim().startsWith('{') || content.trim().startsWith('[')) {
    return detectJsonFormat(content, 'json');
  }

  // Try JSONL
  if (content.includes('\n{')) {
    return parseJsonl(content);
  }

  // Try delimited
  const firstLine = content.split('\n')[0] || '';
  if (firstLine.includes('\t')) {
    return detectDelimitedFormat(content, 'tsv');
  }
  if (firstLine.includes(',')) {
    return detectDelimitedFormat(content, 'csv');
  }

  return {
    format: 'unknown',
    displayName: 'Unknown format',
    confidence: 0,
    traces: [],
  };
}

// Helper extraction functions
function extractTrace(data: Record<string, unknown>, index: number): ScannedTrace {
  return {
    index,
    raw: JSON.stringify(data),
    model: extractModelName(data),
    input: extractInput(data),
    output: extractOutput(data),
    tokensIn: extractTokensIn(data),
    tokensOut: extractTokensOut(data),
    cost: typeof data.cost === 'number' ? data.cost : undefined,
    timestamp: data.timestamp as string || data.created_at as string,
    metadata: data.metadata as Record<string, unknown> || {},
  };
}

function extractModelName(data: Record<string, unknown>): string | undefined {
  if (typeof data.model === 'string') return data.model;
  if (typeof data.model_name === 'string') return data.model_name;

  // LangSmith nested
  const serialized = data.serialized as Record<string, unknown>;
  if (serialized?.kwargs) {
    const kwargs = serialized.kwargs as Record<string, unknown>;
    if (typeof kwargs.model === 'string') return kwargs.model;
    if (typeof kwargs.model_name === 'string') return kwargs.model_name;
  }

  // Extra metadata
  const extra = data.extra as Record<string, unknown>;
  if (extra?.invocation_params) {
    const params = extra.invocation_params as Record<string, unknown>;
    if (typeof params.model === 'string') return params.model;
  }

  return undefined;
}

function extractInput(data: Record<string, unknown>): string | undefined {
  if (typeof data.input === 'string') return data.input;
  if (typeof data.prompt === 'string') return data.prompt;
  if (data.inputs && typeof data.inputs === 'object') return JSON.stringify(data.inputs);
  if (Array.isArray(data.messages)) return JSON.stringify(data.messages);
  return undefined;
}

function extractOutput(data: Record<string, unknown>): string | undefined {
  if (typeof data.output === 'string') return data.output;
  if (typeof data.completion === 'string') return data.completion;
  if (typeof data.response === 'string') return data.response;
  if (data.outputs && typeof data.outputs === 'object') return JSON.stringify(data.outputs);
  return undefined;
}

function extractTokensIn(data: Record<string, unknown>): number | undefined {
  if (typeof data.prompt_tokens === 'number') return data.prompt_tokens;
  if (typeof data.tokens_in === 'number') return data.tokens_in;
  if (typeof data.input_tokens === 'number') return data.input_tokens;

  const usage = data.usage as Record<string, unknown>;
  if (usage) {
    if (typeof usage.prompt_tokens === 'number') return usage.prompt_tokens;
    if (typeof usage.input_tokens === 'number') return usage.input_tokens;
  }

  const extra = data.extra as Record<string, unknown>;
  if (extra?.tokens) {
    const tokens = extra.tokens as Record<string, unknown>;
    if (typeof tokens.input === 'number') return tokens.input;
    if (typeof tokens.prompt === 'number') return tokens.prompt;
  }

  return undefined;
}

function extractTokensOut(data: Record<string, unknown>): number | undefined {
  if (typeof data.completion_tokens === 'number') return data.completion_tokens;
  if (typeof data.tokens_out === 'number') return data.tokens_out;
  if (typeof data.output_tokens === 'number') return data.output_tokens;

  const usage = data.usage as Record<string, unknown>;
  if (usage) {
    if (typeof usage.completion_tokens === 'number') return usage.completion_tokens;
    if (typeof usage.output_tokens === 'number') return usage.output_tokens;
  }

  const extra = data.extra as Record<string, unknown>;
  if (extra?.tokens) {
    const tokens = extra.tokens as Record<string, unknown>;
    if (typeof tokens.output === 'number') return tokens.output;
    if (typeof tokens.completion === 'number') return tokens.completion;
  }

  return undefined;
}

// Public function to get format result for UI
export function getFormatResult(parsed: ParsedContent): FormatDetectionResult {
  return {
    format: parsed.format,
    displayName: parsed.displayName,
    confidence: parsed.confidence,
    traceCount: parsed.traces.length,
  };
}
