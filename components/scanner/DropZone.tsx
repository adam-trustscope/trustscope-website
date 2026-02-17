'use client';

import { useCallback, useState } from 'react';
import { Upload, FileJson, FileSpreadsheet, Globe, Sparkles } from 'lucide-react';

interface DropZoneProps {
  onFileSelect: (file: File) => void;
  disabled?: boolean;
}

const ACCEPTED_EXTENSIONS = ['.json', '.jsonl', '.csv', '.tsv', '.txt', '.har'];
const MAX_FILE_SIZE = 200 * 1024 * 1024; // 200MB

const SUPPORTED_FORMATS = [
  { name: 'LangSmith', icon: FileJson },
  { name: 'LangFuse', icon: FileJson },
  { name: 'OpenTelemetry', icon: Globe },
  { name: 'HAR', icon: Globe },
  { name: 'CSV/TSV', icon: FileSpreadsheet },
  { name: 'JSONL', icon: FileJson },
];

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
    <div className="space-y-4">
      <div
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`
          relative border-2 border-dashed rounded-2xl p-8 md:p-12 text-center cursor-pointer
          transition-all duration-200
          ${isDragging
            ? 'border-amber-400 bg-amber-400/10 scale-[1.02]'
            : 'border-white/20 hover:border-blue-400/50 hover:bg-white/5'
          }
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        <div className="flex flex-col items-center gap-6">
          {/* Icon and headline */}
          <div className="flex flex-col items-center gap-3">
            <div className={`
              w-16 h-16 rounded-2xl flex items-center justify-center
              ${isDragging ? 'bg-amber-400/20' : 'bg-blue-500/20'}
              transition-colors duration-200
            `}>
              <Upload className={`w-8 h-8 ${isDragging ? 'text-amber-400' : 'text-blue-400'}`} />
            </div>

            <div>
              <h3 className="text-xl md:text-2xl font-bold mb-2">
                {isDragging ? 'Drop to scan' : "What's hiding in your AI traces?"}
              </h3>
              <p className="text-slate-400">
                Drop a file here or <span className="text-blue-400 underline">browse</span>
              </p>
            </div>
          </div>

          {/* What we scan for */}
          <div className="flex flex-wrap justify-center gap-2">
            {['PII', 'API Keys', 'Credentials', 'Cost Spikes', 'Loops', 'Toxicity'].map((item) => (
              <span
                key={item}
                className="bg-white/5 border border-white/10 rounded-full px-3 py-1 text-xs text-slate-400"
              >
                {item}
              </span>
            ))}
          </div>

          {/* Supported formats */}
          <div className="pt-4 border-t border-white/10 w-full">
            <p className="text-xs text-slate-500 mb-3">Supported formats:</p>
            <div className="flex flex-wrap justify-center gap-4">
              {SUPPORTED_FORMATS.map((format) => (
                <div
                  key={format.name}
                  className="flex items-center gap-1.5 text-slate-500"
                >
                  <format.icon className="w-3.5 h-3.5" />
                  <span className="text-xs">{format.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Trust indicator */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1.5 text-emerald-400/60 text-xs">
          <Sparkles className="w-3 h-3" />
          <span>100% Local</span>
        </div>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3 text-red-400 text-sm">
          {error}
        </div>
      )}
    </div>
  );
}
