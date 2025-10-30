'use client';

import Link from 'next/link';
import { Home } from 'lucide-react';

export default function Navigation() {
  return (
    <nav className="bg-slate-900/50 border-b border-white/10 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-white hover:text-emerald-400 transition-colors font-semibold"
        >
          <Home className="w-5 h-5" />
          <span>Back to Portfolio</span>
        </Link>
      </div>
    </nav>
  );
}
