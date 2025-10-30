// src/components/UniversalHeader.js
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

/**
 * Universal Header - Top-Level Site Navigation
 * 
 * Appears on ALL pages across the entire site
 * Contains VuduVations branding and main navigation
 * 
 * Usage: <UniversalHeader />
 * 
 * To customize logo:
 * 1. Place your logo PNG in /public/vuduvations-logo.png
 * 2. Update logoPath below if using different filename
 * 3. Adjust width/height as needed
 */

export default function UniversalHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Customize your logo path here
  const logoPath = '/vuduvations-logo.png';
  const logoSize = 32; // Adjust size as needed

  return (
    <header className="sticky top-0 z-50 bg-slate-800 backdrop-blur-md border-b border-white/10">
      <div className="mx-auto max-w-7xl px-6 py-3">
        <div className="flex items-center justify-between">
          
          {/* Logo / Brand */}
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Image 
              src={logoPath}
              alt="VuduVations Logo"
              width={logoSize}
              height={logoSize}
              className="object-contain"
              priority
            />
            <div className="flex flex-col">
              <span className="text-xl font-bold text-white">VuduVations</span>
              <span className="text-xs text-gray-400 italic -mt-1">Where Ideas Become Vectors</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link 
              href="/" 
              className="text-sm text-slate-300 hover:text-white transition-colors font-medium"
            >
              Home
            </Link>
            
            {/* VuduSuite Dropdown */}
            <div className="relative group">
              <button className="text-sm text-slate-300 hover:text-white transition-colors font-medium flex items-center gap-1">
                VuduSuite
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {/* Dropdown Menu */}
              <div className="absolute top-full left-0 mt-2 w-64 bg-slate-800 border border-white/10 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="py-2">

                  <Link 
                    href="/ai-discovery"
                    className="block px-4 py-2 text-sm text-slate-300 hover:bg-white/5 hover:text-white transition-colors"
                  >
                    <div className="font-semibold">AI Discovery</div>
                    <div className="text-xs text-gray-500">Industry Analysis Platform</div>
                  </Link>
                  <Link 
                    href="/reflexion-itil"
                    className="block px-4 py-2 text-sm text-slate-300 hover:bg-white/5 hover:text-white transition-colors"
                  >
                    <div className="font-semibold">Reflexion ITIL</div>
                    <div className="text-xs text-gray-500">Change Management Agent</div>
                  </Link>
                  <Link 
                    href="/consulting-analyzer"
                    className="block px-4 py-2 text-sm text-slate-300 hover:bg-white/5 hover:text-white transition-colors"
                  >
                    <div className="font-semibold">Sales Call Analyzer</div>
                    <div className="text-xs text-gray-500">Conversation Intelligence</div>
                  </Link>
                  <Link 
                    href="/earnings-analyzer"
                    className="block px-4 py-2 text-sm text-slate-300 hover:bg-white/5 hover:text-white transition-colors"
                  >
                    <div className="font-semibold">Earnings Intelligence</div>
                    <div className="text-xs text-gray-500">Financial Analysis Platform</div>
                  </Link>
                </div>
              </div>
            </div>

            <Link 
              href="/about" 
              className="text-sm text-slate-300 hover:text-white transition-colors font-medium"
            >
              About
            </Link>
            
            <Link 
              href="/partners" 
              className="text-sm text-slate-300 hover:text-white transition-colors font-medium"
            >
              Partners
            </Link>

            <Link 
              href="/contact"
              className="text-sm text-slate-300 hover:text-white transition-colors font-medium"
            >
              Contact
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-white/10 pt-4">
            <div className="flex flex-col gap-3">
              <Link 
                href="/" 
                className="text-sm text-slate-300 hover:text-white transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              
              <div className="text-sm font-semibold text-white mb-1">VuduSuite</div>
              <Link 
                href="/vuduvectors"
                className="text-sm text-slate-300 hover:text-white transition-colors py-1 pl-4"
                onClick={() => setMobileMenuOpen(false)}
              >
                VuduVectors
              </Link>
              <Link 
                href="/ai-discovery"
                className="text-sm text-slate-300 hover:text-white transition-colors py-1 pl-4"
                onClick={() => setMobileMenuOpen(false)}
              >
                AI Discovery
              </Link>
              <Link 
                href="/reflexion-itil"
                className="text-sm text-slate-300 hover:text-white transition-colors py-1 pl-4"
                onClick={() => setMobileMenuOpen(false)}
              >
                Reflexion ITIL
              </Link>
              <Link 
                href="/consulting-analyzer"
                className="text-sm text-slate-300 hover:text-white transition-colors py-1 pl-4"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sales Call Analyzer
              </Link>
              <Link 
                href="/earnings-analyzer"
                className="text-sm text-slate-300 hover:text-white transition-colors py-1 pl-4"
                onClick={() => setMobileMenuOpen(false)}
              >
                Earnings Intelligence
              </Link>
              
              <Link 
                href="/about" 
                className="text-sm text-slate-300 hover:text-white transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              
              <Link 
                href="/partners" 
                className="text-sm text-slate-300 hover:text-white transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Partners
              </Link>

              <Link 
                href="/contact"
                className="text-sm text-slate-300 hover:text-white transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}