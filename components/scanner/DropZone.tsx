'use client';

import { useCallback, useState } from 'react';
import { Upload } from 'lucide-react';

interface DropZoneProps {
  onFileSelect: (file: File) => void;
  disabled?: boolean;
}

const ACCEPTED_EXTENSIONS = ['.json', '.jsonl', '.csv', '.tsv', '.txt', '.har'];
const MAX_FILE_SIZE = 200 * 1024 * 1024; // 200MB

export default function DropZone({ onFileSelect, disabled }: DropZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateFile = useCallback((file: File): string | null => {
    const extension = '.' + file.name.split('.').pop()?.toLowerCase();

    if (!ACCEPTED_EXTENSIONS.includes(extension)) {
      return `Unsupported format. Accepted: ${ACCEPTED_EXTENSIONS.join(', ')}`;
    }

    if (file.size > MAX_FILE_SIZE) {
      return 'File too large. Maximum size: 200MB';
    }

    return null;
  }, []);

  const handleFile = useCallback((file: File) => {
    setError(null);
    const validationError = validateFile(file);

    if (validationError) {
      setError(validationError);
      return;
    }

    onFileSelect(file);
  }, [onFileSelect, validateFile]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    if (disabled) return;

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFile(files[0]);
    }
  }, [disabled, handleFile]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) {
      setIsDragging(true);
    }
  }, [disabled]);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleClick = useCallback(() => {
    if (disabled) return;

    const input = document.createElement('input');
    input.type = 'file';
    input.accept = ACCEPTED_EXTENSIONS.join(',');
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        handleFile(file);
      }
    };
    input.click();
  }, [disabled, handleFile]);

  return (
    <div className="space-y-3">
      <button
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        disabled={disabled}
        className={`min-h-[84px] w-full rounded-xl border px-4 py-3 text-left transition-colors ${
          isDragging
            ? 'border-[var(--interactive)] bg-[color:rgba(37,99,235,.10)]'
            : 'border-[var(--border)] bg-[var(--surface)] hover:border-[var(--border-hover)]'
        } ${disabled ? 'opacity-60' : ''}`}
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--bg)]">
            <Upload className="h-4 w-4 text-[var(--text-secondary)]" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-[var(--text-primary)]">
              Drop your trace file or <span className="text-[var(--interactive)]">browse</span>
            </p>
            <p className="mt-1 text-[11px] text-[var(--text-subtle)]">
              LangSmith · LangFuse · OTel · HAR · CSV/TSV · JSONL
            </p>
          </div>
          <span className="rounded-md border border-[color:rgba(22,163,74,.3)] bg-[color:rgba(22,163,74,.12)] px-2 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--status-success)]">
            LOCAL
          </span>
        </div>
      </button>

      {error && (
        <div className="rounded-lg border border-[color:rgba(220,38,38,.4)] bg-[color:rgba(220,38,38,.1)] px-3 py-2 text-sm text-[var(--status-danger)]">
          {error}
        </div>
      )}
    </div>
  );
}
