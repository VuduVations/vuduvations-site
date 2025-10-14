'use client';

import { useState } from "react";
import Link from "next/link";
import { Sparkles, Menu } from "lucide-react";

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-semibold text-lg">
            <Sparkles className="h-5 w-5" />
            <span>Vuduvations</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link href="/#apps" className="text-sm font-medium hover:text-foreground/80 transition-colors">
              Apps
            </Link>
            <Link href="/#blog" className="text-sm font-medium hover:text-foreground/80 transition-colors">
              Blog
            </Link>
            <Link href="/partners" className="text-sm font-medium hover:text-foreground/80 transition-colors">
              Partners
            </Link>
            <Link href="/about" className="text-sm font-medium hover:text-foreground/80 transition-colors">
              About
            </Link>
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-3 border-t">
            <Link href="/#apps" className="block text-sm font-medium hover:text-foreground/80 transition-colors" onClick={() => setMobileMenuOpen(false)}>
              Apps
            </Link>
            <Link href="/#blog" className="block text-sm font-medium hover:text-foreground/80 transition-colors" onClick={() => setMobileMenuOpen(false)}>
              Blog
            </Link>
            <Link href="/partners" className="block text-sm font-medium hover:text-foreground/80 transition-colors" onClick={() => setMobileMenuOpen(false)}>
              Partners
            </Link>
            <Link href="/about" className="block text-sm font-medium hover:text-foreground/80 transition-colors" onClick={() => setMobileMenuOpen(false)}>
              About
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}