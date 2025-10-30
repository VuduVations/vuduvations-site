// src/components/UnifiedFooter.js
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Twitter, ArrowRight, Activity } from 'lucide-react';

/**
 * Unified Footer Component - Navy/Slate Color Scheme (4 Columns)
 * 
 * Combines product-specific branding (optional) with site-wide navigation
 * Uses navy/slate background (#1e293b) for professional look
 * Always 4 columns including "Stay Updated" newsletter
 * 
 * Usage:
 * <UnifiedFooter productBranding={{ name: "Sales Call Analyzer", icon: Activity, tagline: "...", color: "blue" }} />
 * <UnifiedFooter /> // Just site-wide footer, no product branding
 */

export default function UnifiedFooter({ productBranding = null }) {
  const [email, setEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSubscribeStatus('');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to subscribe');
      }

      setSubscribeStatus('Thanks for subscribing! Check your email.');
      setEmail('');
      setTimeout(() => setSubscribeStatus(''), 5000);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
      setTimeout(() => setError(''), 5000);
    } finally {
      setIsLoading(false);
    }
  };

  // Define color classes for product branding icons
  const colorClasses = {
    purple: 'text-purple-400',
    cyan: 'text-cyan-400',
    blue: 'text-blue-400',
    green: 'text-green-400',
    pink: 'text-pink-400',
    emerald: 'text-emerald-400',
  };

  // Logo configuration
  const logoPath = '/vuduvations-logo.png';
  const logoSize = 28;

  return (
    <footer className="bg-slate-800 text-white">
      
      {/* Optional Product-Specific Section */}
      {productBranding && (
        <div className="border-b border-white/10 bg-slate-800">
          <div className="mx-auto max-w-7xl px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              
              {/* Product Branding */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  {productBranding.icon && (
                    <productBranding.icon 
                      className={`h-6 w-6 ${colorClasses[productBranding.color] || 'text-white'}`} 
                    />
                  )}
                  <h3 className="text-xl font-bold">{productBranding.name}</h3>
                </div>
                <p className="text-sm text-gray-400">
                  {productBranding.tagline}
                </p>
              </div>

              {/* Product Links */}
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Product</h4>
                <ul className="space-y-2">
                  {productBranding.links?.product?.map((link, idx) => (
                    <li key={idx}>
                      <Link href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Product Resources */}
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Resources</h4>
                <ul className="space-y-2">
                  {productBranding.links?.resources?.map((link, idx) => (
                    <li key={idx}>
                      <Link href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Product Company Links */}
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Company</h4>
                <ul className="space-y-2">
                  {productBranding.links?.company?.map((link, idx) => (
                    <li key={idx}>
                      <Link href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Site-Wide VuduVations Footer - 4 COLUMNS */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            
            {/* Column 1: Brand */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Image 
                  src={logoPath}
                  alt="VuduVations Logo"
                  width={logoSize}
                  height={logoSize}
                  className="object-contain"
                />
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
                <li>
                  <Link href="/contact" className="text-sm text-gray-400 hover:text-white transition-colors">
                    Contact
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
                      disabled={isLoading}
                      className="flex-1 px-3 py-2 text-sm bg-white/5 border border-white/10 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="px-4 py-2 bg-white text-black rounded-md hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <div className="h-4 w-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <ArrowRight className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {subscribeStatus && (
                    <p className="text-xs text-green-400">{subscribeStatus}</p>
                  )}
                  {error && (
                    <p className="text-xs text-red-400">{error}</p>
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

          {/* Bottom Bar - VuduVations Copyright */}
          <div className="pt-8 border-t border-white/10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-xs text-gray-400">
                © {new Date().getFullYear()} VuduVations.
              </p>
              <p className="text-xs text-gray-500 italic">Born of Vudu</p>
            </div>
          </div>

          {/* Product Copyright - MOVED BELOW */}
          {productBranding && (
            <div className="mt-6 pt-6 border-t border-white/10 text-center">
              <p className="text-sm text-gray-400">
                {productBranding.trademark || productBranding.name}™ is a trademark of VuduVations Inc.
              </p>
              {productBranding.subtitle && (
                <p className="text-xs text-gray-500 mt-2">
                  {productBranding.subtitle}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}


// ============================================
// EXAMPLE USAGE CONFIGURATIONS
// ============================================

/**
 * For Sales Call Analyzer pages, use:
 */
export const salesCallFooterConfig = {
  name: "Sales Call Analyzer",
  icon: Activity,
  tagline: "Observable LangGraph intelligence for sales conversations. See exactly how AI analyzes your calls.",
  color: "blue",
  trademark: "Sales Call Analyzer",
  subtitle: "Multi-tier AI routing. Real-time cost tracking. Full transparency.",
  links: {
    product: [
      { label: "Overview", href: "/consulting-analyzer" },
      { label: "Features", href: "/consulting-analyzer#features" },
      { label: "How it Works", href: "/consulting-analyzer#how-it-works" },
      { label: "Live Demo", href: "/consulting-analyzer#demo" }
    ],
    resources: [
      { label: "Documentation", href: "/consulting-analyzer/docs" },
      { label: "Sample Transcripts", href: "/consulting-analyzer#samples" },
      { label: "Use Cases", href: "/consulting-analyzer#use-cases" }
    ],
    company: [
      { label: "About VuduVations", href: "/about" },
      { label: "Contact Sales", href: "/contact" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" }
    ]
  }
};

/**
 * For Reflexion ITIL pages, use:
 */
export const reflexionFooterConfig = {
  name: "Reflexion ITIL",
  icon: Activity,
  tagline: "Self-improving AI for change management. 90 seconds to CAB-ready.",
  color: "purple",
  trademark: "Reflexion ITIL",
  subtitle: "Transform your change management. Achieve 95% CAB approval.",
  links: {
    product: [
      { label: "Features", href: "/reflexion-itil#features" },
      { label: "Screenshots", href: "/reflexion-itil#screenshots" },
      { label: "Pricing", href: "/reflexion-itil#pricing" },
      { label: "Live Demo", href: "/reflexion-itil#demo" }
    ],
    resources: [
      { label: "Documentation", href: "/reflexion-itil/docs" },
      { label: "Case Studies", href: "/reflexion-itil#case-studies" },
      { label: "Blog", href: "/blog" }
    ],
    company: [
      { label: "About VuduVations", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" }
    ]
  }
};

/**
 * For VuduVectors pages, use:
 */
export const vuduvectorsFooterConfig = {
  name: "VuduVectors",
  icon: null, // Add your VuduVectors icon here
  tagline: "Patent intelligence powered by AI. Find white space in minutes.",
  color: "cyan",
  trademark: "VuduVectors",
  subtitle: "45,931 patents analyzed. Billions in opportunity discovered.",
  links: {
    product: [
      { label: "White Space Discovery", href: "/vuduvectors/white-space-discovery" },
      { label: "Company Intelligence", href: "/vuduvectors/company-intelligence" },
      { label: "Fusion Explorer", href: "/vuduvectors/fusion-explorer" },
      { label: "Pricing", href: "/vuduvectors#pricing" }
    ],
    resources: [
      { label: "Documentation", href: "/vuduvectors/docs" },
      { label: "Patent Dataset", href: "/vuduvectors#dataset" },
      { label: "Case Studies", href: "/vuduvectors#case-studies" }
    ],
    company: [
      { label: "About VuduVations", href: "/about" },
      { label: "Contact Sales", href: "/contact" },
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" }
    ]
  }
};

/**
 * For homepage or generic pages, just use:
 * <UnifiedFooter />
 * 
 * No product branding, just site-wide footer with 4 columns and newsletter
 */