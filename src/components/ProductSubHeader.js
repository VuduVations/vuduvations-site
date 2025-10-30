// src/components/ProductSubHeader.js
'use client';

import React from 'react';
import Link from 'next/link';

/**
 * Product Sub-Header - Product-Specific Navigation
 * 
 * Appears BELOW the UniversalHeader on product pages
 * Shows product branding and product-specific navigation
 * 
 * Usage:
 * <ProductSubHeader config={reflexionSubHeaderConfig} />
 */

export default function ProductSubHeader({ config }) {
  const IconComponent = config.icon;
  
  return (
    <div className={`bg-gradient-to-r ${config.gradient} border-b border-white/10`}>
      <div className="mx-auto max-w-7xl px-4 py-3">
        <div className="flex items-center justify-between">
          
          {/* Product Branding */}
          <div className="flex items-center gap-3">
            {IconComponent && <IconComponent className={`w-6 h-6 ${config.iconColor}`} />}
            <div className="flex items-center gap-3">
              <span className="text-lg font-bold text-white">{config.productName}</span>
              {config.tagline && (
                <>
                  <span className="text-gray-400">•</span>
                  <span className="text-sm text-gray-300 hidden md:block">{config.tagline}</span>
                </>
              )}
            </div>
          </div>

          {/* Product-Specific Navigation */}
          <nav className="flex items-center gap-6">
            {config.links.map((link, idx) => (
              <Link
                key={idx}
                href={link.href}
                className="text-sm text-slate-300 hover:text-white transition-colors font-medium hidden md:block"
              >
                {link.label}
              </Link>
            ))}
            
            {/* Primary CTA */}
            {config.primaryCTA && (
              <Link
                href={config.primaryCTA.href}
                className={`${config.primaryCTA.className || 'bg-white/20 hover:bg-white/30'} text-white px-4 py-2 rounded-lg font-semibold transition-all text-sm`}
              >
                {config.primaryCTA.label}
              </Link>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
}

// ============================================
// EXAMPLE CONFIGURATIONS FOR EACH PRODUCT
// ============================================

import { Activity, Target, TrendingUp, DollarSign, BarChart3 } from 'lucide-react';

/**
 * Reflexion ITIL Sub-Header Configuration
 */
export const reflexionSubHeaderConfig = {
  productName: "Reflexion ITIL",
  tagline: "Self-improving AI for change management",
  icon: Activity,
  iconColor: "text-purple-400",
  gradient: "from-slate-900 via-purple-900/30 to-slate-900",
  links: [
    { label: "Features", href: "/reflexion-itil#features" },
    { label: "Screenshots", href: "/reflexion-itil#screenshots" },
    { label: "Pricing", href: "/reflexion-itil#pricing" },
    { label: "Docs", href: "/reflexion-itil/docs" }
  ],
  primaryCTA: {
    label: "Try Demo",
    href: "/reflexion-itil/demo",
    className: "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
  }
};

/**
 * VuduVectors Sub-Header Configuration
 */
export const vuduvectorsSubHeaderConfig = {
  productName: "VuduVectors",
  tagline: "Patent intelligence powered by AI",
  icon: Target,
  iconColor: "text-cyan-400",
  gradient: "from-slate-900 via-cyan-900/30 to-slate-900",
  links: [
    { label: "White Space", href: "/vuduvectors/white-space-discovery" },
    { label: "Company Intel", href: "/vuduvectors/company-intelligence" },
    { label: "Fusion Explorer", href: "/vuduvectors/fusion-explorer" },
    { label: "Pricing", href: "/vuduvectors#pricing" }
  ],
  primaryCTA: {
    label: "Explore Tools",
    href: "/vuduvectors",
    className: "bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700"
  }
};

/**
 * Sales Call Analyzer Sub-Header Configuration
 */
export const salesAnalyzerSubHeaderConfig = {
  productName: "Sales Call Analyzer",
  tagline: "LangGraph-powered conversation intelligence",
  icon: TrendingUp,
  iconColor: "text-blue-400",
  gradient: "from-slate-900 via-blue-900/30 to-slate-900",
  links: [
    { label: "Features", href: "/consulting-analyzer#features" },
    { label: "How It Works", href: "/consulting-analyzer#how-it-works" },
    { label: "Pricing", href: "/consulting-analyzer#pricing" }
  ],
  primaryCTA: {
    label: "Analyze Now",
    href: "/consulting-analyzer",
    className: "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
  }
};

/**
 * Earnings Intelligence Sub-Header Configuration
 */
export const earningsAnalyzerSubHeaderConfig = {
  productName: "Earnings Intelligence",
  tagline: "Multi-quarter AI analysis platform",
  icon: DollarSign,
  iconColor: "text-emerald-400",
  gradient: "from-slate-900 via-emerald-900/30 to-slate-900",
  links: [
    { label: "Features", href: "/earnings-analyzer#features" },
    { label: "Demo", href: "/earnings-analyzer#demo" },
    { label: "Pricing", href: "/earnings-analyzer#pricing" }
  ],
  primaryCTA: {
    label: "Analyze Company",
    href: "/earnings-analyzer",
    className: "bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700"
  }
};

/**
 * AI Discovery Sub-Header Configuration
 */
export const aiDiscoverySubHeaderConfig = {
  productName: "AI Discovery",
  tagline: "6-agent industry analysis platform",
  icon: BarChart3,
  iconColor: "text-teal-400",
  gradient: "from-slate-900 via-teal-900/30 to-slate-900",
  links: [
    { label: "Industries", href: "/ai-discovery#industries" },
    { label: "How It Works", href: "/ai-discovery#how-it-works" },
    { label: "Pricing", href: "/ai-discovery#pricing" }
  ],
  primaryCTA: {
    label: "View Demos",
    href: "/ai-discovery",
    className: "bg-gradient-to-r from-teal-600 to-green-600 hover:from-teal-700 hover:to-green-700"
  }
};
