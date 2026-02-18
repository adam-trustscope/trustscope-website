import Link from 'next/link';
import { Home, ArrowLeft, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0f1117] flex items-center justify-center px-4">
      <div className="max-w-md text-center">
        <div className="text-8xl font-bold text-slate-700 mb-4">404</div>
        <h1 className="text-2xl font-bold text-white mb-4">Page not found</h1>
        <p className="text-slate-400 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-[#C49B3A] hover:bg-[#D4A843] text-black font-medium px-6 py-3 rounded-lg transition-colors"
          >
            <Home className="w-4 h-4" />
            Go Home
          </Link>
          <Link
            href="/scanner"
            className="inline-flex items-center justify-center gap-2 border border-slate-600 hover:bg-slate-800 text-white px-6 py-3 rounded-lg transition-colors"
          >
            <Search className="w-4 h-4" />
            Try Scanner
          </Link>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800">
          <p className="text-slate-500 text-sm mb-4">Looking for something specific?</p>
          <div className="flex flex-wrap justify-center gap-3 text-sm">
            <Link href="/pricing" className="text-slate-400 hover:text-white transition-colors">
              Pricing
            </Link>
            <span className="text-slate-700">·</span>
            <a
              href="https://docs.trustscope.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition-colors"
            >
              Documentation
            </a>
            <span className="text-slate-700">·</span>
            <Link href="/contact" className="text-slate-400 hover:text-white transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
