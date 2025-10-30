// src/app/ai-discovery/demos/page.js
'use client'

import { useState } from 'react'
import Link from 'next/link'
import UniversalHeader from '@/components/UniversalHeader'
import UnifiedFooter from '@/components/UnifiedFooter'
import ContactModal from '@/components/ContactModal'
import { Brain, Target, TrendingUp, BarChart3, ArrowLeft } from 'lucide-react'

// AI Discovery Footer Configuration
const aiDiscoveryFooterConfig = {
  name: "AI Discovery Platform",
  icon: Brain,
  tagline: "Strategic AI readiness assessments from F500 consulting methodology. Know what's possible before you build.",
  color: "emerald",
  trademark: "AI Discovery Platform",
  subtitle: "6-agent intelligence. Executive-ready insights. Implementation roadmaps.",
  links: {
    product: [
      { label: "Overview", href: "/ai-discovery" },
      { label: "Features", href: "/ai-discovery#features" },
      { label: "How It Works", href: "/ai-discovery#how-it-works" },
      { label: "Industry Demos", href: "/ai-discovery/demos" }
    ],
    resources: [
      { label: "Documentation", href: "/ai-discovery/docs" },
      { label: "Sample Reports", href: "/ai-discovery/demos" },
      { label: "Use Cases", href: "/ai-discovery#use-cases" },
      { label: "ROI Calculator", href: "/ai-discovery#roi" }
    ],
    company: [
      { label: "About VuduVations", href: "/" },
      { label: "Contact Sales", href: "#contact" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" }
    ]
  }
};

const demos = [
  {
    id: 'manufacturing',
    name: 'PrecisionTech Manufacturing',
    industry: 'Industrial Manufacturing',
    revenue: '$250M',
    useCases: 7,
    roi: '111%',
    description: 'Equipment downtime, quality defects, supply chain visibility'
  },
  {
    id: 'logistics',
    name: 'LogiFlow Systems',
    industry: 'Supply Chain & Logistics SaaS',
    revenue: '$12M',
    useCases: 8,
    roi: '127%',
    description: 'Route optimization, delivery delays, invoice reconciliation'
  },
  {
    id: 'retail',
    name: 'TechRetail Inc.',
    industry: 'E-commerce Retail',
    revenue: '$50M',
    useCases: 7,
    roi: '95%',
    description: 'Customer service costs, inventory management, cart abandonment'
  },
  {
    id: 'healthcare',
    name: 'Metro Health Systems',
    industry: 'Healthcare Provider',
    revenue: '$180M',
    useCases: 7,
    roi: '98%',
    description: 'Patient wait times, staff burnout, billing errors'
  },
  {
    id: 'fintech',
    name: 'Pinnacle Financial Group',
    industry: 'Financial Services',
    revenue: '$420M',
    useCases: 7,
    roi: '105%',
    description: 'Loan processing time, fraud detection, compliance costs'
  },
  {
    id: 'saas',
    name: 'CloudScale Analytics',
    industry: 'SaaS Technology',
    revenue: '$8M',
    useCases: 7,
    roi: '92%',
    description: 'Customer churn, lead qualification, support scaling'
  }
]

export default function DemoSelector() {
  const [showModal, setShowModal] = useState(false)

  const aiDiscoveryBenefits = [
    { 
      text: "Complete multi-dimensional AI readiness assessment across your organization",
      icon: <Target className="w-5 h-5 text-emerald-400" />
    },
    { 
      text: "Executive-ready ROI projections and use case mapping with competitive positioning",
      icon: <TrendingUp className="w-5 h-5 text-emerald-400" />
    },
    { 
      text: "Strategic roadmap with implementation priorities and resource requirements",
      icon: <BarChart3 className="w-5 h-5 text-emerald-400" />
    },
    { 
      text: "Industry-specific insights from F500 consulting best practices",
      icon: <Brain className="w-5 h-5 text-emerald-400" />
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900 text-white">
      <UniversalHeader />
      
      <div className="max-w-7xl mx-auto px-6 py-12 pt-24">
        {/* Back Link */}
        <Link 
          href="/ai-discovery"
          className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to AI Discovery Overview</span>
        </Link>

        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 mb-6">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
            Industry Demo Reports
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Explore our comprehensive AI readiness assessments across different industries. 
            Each demo showcases how our 6-agent system analyzes opportunities, risks, and implementation roadmaps.
          </p>
        </div>

        {/* Info Banner */}
        <div className="mb-12 bg-gradient-to-r from-emerald-900/40 to-teal-900/40 border-2 border-emerald-500 rounded-2xl p-6">
          <h2 className="text-2xl font-bold mb-4 text-white">What You'll See in Each Demo:</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {aiDiscoveryBenefits.map((benefit, idx) => (
              <div key={idx} className="flex items-start gap-3">
                {benefit.icon}
                <p className="text-slate-300">{benefit.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Demo Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {demos.map((demo) => (
            <Link 
              key={demo.id}
              href={`/ai-discovery/${demo.id}`}
              className="group"
            >
              <div className="h-full bg-slate-800/50 border-2 border-slate-700 hover:border-emerald-500 rounded-2xl p-6 transition-all hover:shadow-xl hover:shadow-emerald-500/20 hover:-translate-y-1">
                {/* Header */}
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                    {demo.name}
                  </h3>
                  <p className="text-sm text-slate-400">{demo.industry}</p>
                  <p className="text-xs text-slate-500 mt-1">{demo.revenue} annual revenue</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-slate-900/50 rounded-lg p-3 text-center">
                    <div className="text-xl font-bold text-emerald-400">{demo.useCases}</div>
                    <div className="text-xs text-slate-400">Use Cases</div>
                  </div>
                  <div className="bg-slate-900/50 rounded-lg p-3 text-center">
                    <div className="text-xl font-bold text-green-400">{demo.roi}</div>
                    <div className="text-xs text-slate-400">Avg ROI</div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-slate-400 mb-4">
                  <span className="font-semibold text-slate-300">Key Challenges:</span> {demo.description}
                </p>

                {/* CTA */}
                <div className="flex items-center justify-between text-emerald-400 group-hover:text-emerald-300 transition-colors">
                  <span className="font-semibold">View Full Analysis</span>
                  <svg 
                    className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA Section */}
        <div className="rounded-2xl border-2 border-emerald-500 bg-gradient-to-br from-emerald-900/40 to-teal-900/40 shadow-xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-4 text-white">Ready for Your Custom Analysis?</h2>
          <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
            These demos showcase our AI Discovery Platform's capabilities. Get a tailored analysis for your company's 
            specific challenges, opportunities, and strategic priorities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center justify-center rounded-lg text-sm font-semibold transition-all bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white h-11 px-8 shadow-lg hover:shadow-emerald-500/50"
            >
              Request Custom Analysis
            </button>
            <Link
              href="/ai-discovery"
              className="inline-flex items-center justify-center rounded-lg text-sm font-semibold transition-all bg-slate-800 hover:bg-slate-700 text-white h-11 px-8 border-2 border-slate-600"
            >
              Back to Overview
            </Link>
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      <ContactModal 
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        appName="AI Discovery Platform"
        appIcon={<Brain className="w-8 h-8" />}
        benefits={aiDiscoveryBenefits}
        ctaText="Request Custom AI Analysis"
      />

      {/* Unified Footer */}
      <UnifiedFooter productBranding={aiDiscoveryFooterConfig} />
    </div>
  )
}