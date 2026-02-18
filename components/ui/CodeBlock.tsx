'use client';

import { useState } from 'react';
import { Check, Copy, FileCode } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
}

const LANGUAGE_COLORS: Record<string, string> = {
  python: 'text-blue-400',
  javascript: 'text-yellow-400',
  typescript: 'text-blue-400',
  bash: 'text-green-400',
  json: 'text-purple-400',
  yaml: 'text-pink-400',
};

export default function CodeBlock({
  code,
  language = 'bash',
  filename,
  showLineNumbers = false,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.split('\n');
  const langColor = LANGUAGE_COLORS[language] || 'text-slate-400';

  return (
    <div className="relative group rounded-xl overflow-hidden bg-[#0d0f14] border border-slate-800">
      {/* Header */}
      {(filename || language) && (
        <div className="flex items-center justify-between px-4 py-2 bg-slate-900/50 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <FileCode className={`w-4 h-4 ${langColor}`} />
            {filename ? (
              <span className="text-sm text-slate-400 font-mono">{filename}</span>
            ) : (
              <span className={`text-xs font-medium uppercase ${langColor}`}>{language}</span>
            )}
          </div>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-white transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-green-400" />
                <span className="text-green-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* Code content */}
      <div className="relative overflow-x-auto">
        <pre className="p-4 text-sm font-mono">
          <code>
            {lines.map((line, i) => (
              <div key={i} className="table-row">
                {showLineNumbers && (
                  <span className="table-cell pr-4 text-slate-600 select-none text-right w-8">
                    {i + 1}
                  </span>
                )}
                <span className="table-cell text-slate-300">{line || ' '}</span>
              </div>
            ))}
          </code>
        </pre>
      </div>

      {/* Copy button overlay (when no header) */}
      {!filename && !language && (
        <button
          onClick={handleCopy}
          className="absolute top-2 right-2 p-2 rounded-lg bg-slate-800/80 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-400" />
          ) : (
            <Copy className="w-4 h-4 text-slate-400 hover:text-white" />
          )}
        </button>
      )}
    </div>
  );
}
