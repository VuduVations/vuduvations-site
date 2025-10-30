// src/components/SiteWideFooter.js
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Twitter, ArrowRight, Sparkles } from 'lucide-react';

/**
 * Site-Wide Footer - 4 Column Layout Only
 * 
 * Clean footer with just VuduVations branding and site navigation
 * No product-specific sections
 */

export default function SiteWideFooter() {
  const [email, setEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    setSubscribeStatus('Thanks for subscribing!');
    setEmail('');
    setTimeout(() => setSubscribeStatus(''), 3000);
  };

  return (
    <footer className="bg-slate-800 text-white border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          
          {/* Column 1: Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-white" />
              <h3 className="text-lg font-bold">VuduVations</h3>
            </div>
            <p className="text-sm text-gray-400">
              Independent AI innovation studio operating at the intersection of strategic advisory and hands-on execution.
            </p>
            <p className="text-xs text-gray-500 italic">
              Where Ideas Become Vectors
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-gray-400 hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/#apps" className="text-sm text-gray-400 hover:text-white transition-colors">
                  VuduSuite Apps
                </Link>
              </li>
              <li>
                <Link href="/partners" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Partners
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: VuduSuite */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">VuduSuite</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/ai-discovery" className="text-sm text-gray-400 hover:text-white transition-colors">
                  AI Discovery Dashboard
                </Link>
              </li>
              <li>
                <Link href="/reflexion-itil" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Reflexion ITIL Agent
                </Link>
              </li>
              <li>
                <Link href="/consulting-analyzer" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Sales Call Analyzer
                </Link>
              </li>
              <li>
                <Link href="/earnings-analyzer" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Earnings Intelligence
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Stay Updated + Social */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Stay Updated</h4>
              <p className="text-xs text-gray-400">
                Subscribe for insights on AI innovation and new releases.
              </p>
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="flex-1 px-3 py-2 text-sm bg-white/5 border border-white/10 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-white text-black rounded-md hover:bg-gray-200 transition-colors"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
                {subscribeStatus && (
                  <p className="text-xs text-green-400">{subscribeStatus}</p>
                )}
              </form>
            </div>

            {/* Social Links */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Connect</h4>
              <div className="flex gap-4">
                <a
                  href="https://twitter.com/vuduvations"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href="mailto:hello@vuduvations.io"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="Email"
                >
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-gray-400">
              © {new Date().getFullYear()} VuduVations. Built by a one-person studio.
            </p>
            <p className="text-xs text-gray-500 italic">Born of Vudu</p>
          </div>
        </div>
      </div>
    </footer>
  );
}