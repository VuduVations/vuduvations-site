// src/app/earnings-analyzer/page.js
'use client'

import { useState } from 'react'
import Link from 'next/link'
import UniversalHeader from '@/components/UniversalHeader'
import UnifiedFooter from '@/components/UnifiedFooter'
import ContactModal from '@/components/ContactModal'
import { 
  LineChart, Brain, TrendingUp, BarChart3, Target, Sparkles,
  CheckCircle, Clock, DollarSign, Shield, Zap, Users,
  ArrowRight, Download, AlertCircle, Activity, Eye, BookOpen
} from 'lucide-react'

// Earnings Analyzer Footer Configuration
const earningsFooterConfig = {
  name: "Earnings Intelligence Platform",
  icon: LineChart,
  tagline: "Strategy consulting-grade multi-quarter earnings analysis powered by AI. Bloomberg-level intelligence at a fraction of the cost.",
  color: "blue",
  trademark: "Earnings Intelligence Platform",
  subtitle: "5-agent system. Institutional-quality insights. Real-time sentiment tracking.",
  links: {
    product: [
      { label: "Overview", href: "/earnings-analyzer" },
      { label: "Live Demo", href: "/earnings-analyzer/demo" },
      { label: "How It Works", href: "/earnings-analyzer#how-it-works" },
      { label: "Documentation", href: "/earnings-analyzer/docs" }
    ],
    resources: [
      { label: "Sample Reports", href: "/earnings-analyzer/demo" },
      { label: "Methodology", href: "/earnings-analyzer#methodology" },
      { label: "Use Cases", href: "/earnings-analyzer#use-cases" },
      { label: "Documentation", href: "/earnings-analyzer/docs" }
    ],
    company: [
      { label: "About VuduVations", href: "/" },
      { label: "Contact Sales", href: "#contact" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" }
    ]
  }
};

export default function EarningsAnalyzerLanding() {
  const [showModal, setShowModal] = useState(false)

  const earningsBenefits = [
    { 
      text: "Strategy consulting-grade multi-quarter earnings analysis with sentiment tracking",
      icon: <TrendingUp className="w-5 h-5 text-blue-400" />
    },
    { 
      text: "Strategic theme extraction and business insight analysis delivered in minutes",
      icon: <BarChart3 className="w-5 h-5 text-blue-400" />
    },
    { 
      text: "Institutional-level intelligence comparable to McKinsey, Bain, and BCG analysis",
      icon: <Target className="w-5 h-5 text-blue-400" />
    },
    { 
      text: "Complete financial performance assessment to augment your research process",
      icon: <LineChart className="w-5 h-5 text-blue-400" />
    }
  ]

  const keyFeatures = [
    {
      icon: <Brain className="w-8 h-8 text-blue-400" />,
      title: "5-Agent AI System",
      description: "Sophisticated multi-agent architecture processes earnings transcripts across transcript acquisition, sentiment analysis, theme extraction, financial metrics, and synthesis."
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-green-400" />,
      title: "Multi-Quarter Tracking",
      description: "Track sentiment evolution, strategic themes, and management credibility across 4+ quarters to identify long-term trends and inflection points."
    },
    {
      icon: <Target className="w-8 h-8 text-purple-400" />,
      title: "Management Credibility",
      description: "Evaluate management guidance accuracy, track record, and forward-looking statements to assess leadership reliability."
    },
    {
      icon: <Eye className="w-8 h-8 text-teal-400" />,
      title: "Calculation Transparency",
      description: "See exactly how sentiment scores are calculated with detailed breakdowns of positive and negative signals from the transcript."
    },
    {
      icon: <Activity className="w-8 h-8 text-yellow-400" />,
      title: "Strategic Theme Analysis",
      description: "Automatically extract and track key strategic themes across quarters—AI adoption, market expansion, cost optimization, and more."
    },
    {
      icon: <Shield className="w-8 h-8 text-indigo-400" />,
      title: "Business Segment Insights",
      description: "Deep-dive into segment performance, challenges, and opportunities with automated highlighting of critical metrics."
    }
  ]

  const useCases = [
    {
      icon: <Users className="w-6 h-6 text-blue-400" />,
      title: "Hedge Fund Analysts",
      description: "Rapidly analyze multiple companies across quarters to identify patterns and sentiment shifts to augment your research workflow.",
      benefit: "3 minutes per company vs 2+ hours manual analysis"
    },
    {
      icon: <DollarSign className="w-6 h-6 text-green-400" />,
      title: "Portfolio Managers",
      description: "Monitor holdings with automated earnings intelligence, management credibility scoring, and strategic theme tracking as research tools.",
      benefit: "Track 50+ companies simultaneously"
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-purple-400" />,
      title: "Equity Research",
      description: "Produce institutional-quality research reports with multi-quarter analysis, sentiment trends, and thematic insights in minutes.",
      benefit: "10x faster research production"
    },
    {
      icon: <Target className="w-6 h-6 text-teal-400" />,
      title: "Strategic Consultants",
      description: "Deliver McKinsey-grade competitive intelligence with automated earnings analysis for client presentations and strategic planning.",
      benefit: "Strategy consulting quality at AI speed"
    }
  ]

  const comparisonData = [
    {
      metric: "Analysis Time",
      bloomberg: "2-3 hours manual",
      traditional: "4-8 hours",
      earnings: "3 minutes",
      highlight: true
    },
    {
      metric: "Multi-Quarter Tracking",
      bloomberg: "Manual charting",
      traditional: "Manual spreadsheets",
      earnings: "Automated trends"
    },
    {
      metric: "Sentiment Analysis",
      bloomberg: "Not available",
      traditional: "Manual reading",
      earnings: "AI-powered scoring"
    },
    {
      metric: "Theme Extraction",
      bloomberg: "Manual notes",
      traditional: "Manual summaries",
      earnings: "Automated extraction"
    },
    {
      metric: "Management Credibility",
      bloomberg: "Not tracked",
      traditional: "Analyst judgment",
      earnings: "Quantified accuracy"
    },
    {
      metric: "Cost per Analysis",
      bloomberg: "$2,000+ (loaded)",
      traditional: "$1,500+ (loaded)",
      earnings: "$50-150",
      highlight: true
    }
  ]

  return (
    <>
      <UniversalHeader />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6">

          {/* Back Navigation */}
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors mb-6"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            <span>Back to VuduVations Portfolio</span>
          </Link>

          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-6">
              <LineChart className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-white mb-4">
              Earnings Intelligence Platform
            </h1>
            <p className="text-2xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-6">
              Strategy Consulting-Grade Multi-Quarter Analysis
            </p>
            
            {/* Disclaimer under subtitle */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                <p className="text-xs text-slate-400 leading-relaxed text-center">
                  <strong className="text-slate-300">Research Tool Notice:</strong> This platform provides analytical tools for informational purposes only. 
                  Not investment advice. Users should conduct their own due diligence and consult qualified financial advisors 
                  before making investment decisions.
                </p>
              </div>
            </div>
            
            <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
              Bloomberg-level earnings intelligence powered by a 5-agent AI system. Analyze any public company's 
              earnings calls with institutional-quality insights delivered in 3 minutes.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/earnings-analyzer/demo"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-lg font-semibold transition-all inline-flex items-center gap-2 text-lg"
              >
                <Sparkles className="w-5 h-5" />
                View Live Demo (Netflix)
              </Link>
              <Link
                href="/earnings-analyzer/docs"
                className="bg-slate-800 hover:bg-slate-700 text-white px-8 py-4 rounded-lg font-semibold transition-all inline-flex items-center gap-2 text-lg border-2 border-slate-600"
              >
                <BookOpen className="w-5 h-5" />
                Documentation
              </Link>
              <button
                onClick={() => setShowModal(true)}
                className="bg-slate-800 hover:bg-slate-700 text-white px-8 py-4 rounded-lg font-semibold transition-all inline-flex items-center gap-2 text-lg border-2 border-slate-600"
              >
                Request Custom Analysis
              </button>
            </div>
          </div>

          {/* Stats Banner */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">3 min</div>
              <div className="text-slate-300">Analysis Time</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 text-center">
              <div className="text-4xl font-bold text-green-400 mb-2">5</div>
              <div className="text-slate-300">AI Agents</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 text-center">
              <div className="text-4xl font-bold text-purple-400 mb-2">4+</div>
              <div className="text-slate-300">Quarters Tracked</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 text-center">
              <div className="text-4xl font-bold text-yellow-400 mb-2">95%+</div>
              <div className="text-slate-300">Accuracy</div>
            </div>
          </div>

          {/* Demo Preview Section */}
          <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-xl p-8 mb-16">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">See It In Action</h2>
                <p className="text-slate-300">
                  Explore our live Netflix (NFLX) earnings analysis spanning Q4 2024 - Q3 2025
                </p>
              </div>
              <Link
                href="/earnings-analyzer/demo"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-all inline-flex items-center gap-2"
              >
                View Demo
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-blue-400" />
                  <span className="font-semibold text-white">Sentiment Tracking</span>
                </div>
                <p className="text-sm text-slate-400">Multi-quarter sentiment evolution with stock price correlation</p>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-5 h-5 text-purple-400" />
                  <span className="font-semibold text-white">Management Credibility</span>
                </div>
                <p className="text-sm text-slate-400">Guidance accuracy tracking and leadership assessment</p>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                <div className="flex items-center gap-2 mb-2">
                  <Eye className="w-5 h-5 text-teal-400" />
                  <span className="font-semibold text-white">Transparent Scoring</span>
                </div>
                <p className="text-sm text-slate-400">See exactly how every score is calculated</p>
              </div>
            </div>
          </div>

          {/* Key Features */}
          <div id="how-it-works" className="mb-16">
            <h2 className="text-3xl font-bold text-center text-white mb-12">
              How It Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {keyFeatures.map((feature, idx) => (
                <div key={idx} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-blue-400/50 transition-all">
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-slate-300">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 5-Agent System */}
          <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 rounded-xl p-8 border border-purple-500/30 mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">5-Agent AI Architecture</h2>
              <p className="text-slate-300 max-w-2xl mx-auto">
                Our sophisticated multi-agent system processes earnings transcripts through five specialized agents, 
                each optimized for specific analytical tasks.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <div className="text-center mb-2">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-500/20 rounded-lg mb-2">
                    <Download className="w-6 h-6 text-blue-400" />
                  </div>
                  <div className="font-bold text-white">Agent 1</div>
                  <div className="text-sm text-slate-400">Transcript Acquisition</div>
                </div>
              </div>
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <div className="text-center mb-2">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-green-500/20 rounded-lg mb-2">
                    <Activity className="w-6 h-6 text-green-400" />
                  </div>
                  <div className="font-bold text-white">Agent 2</div>
                  <div className="text-sm text-slate-400">Sentiment Analysis</div>
                </div>
              </div>
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <div className="text-center mb-2">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-500/20 rounded-lg mb-2">
                    <Brain className="w-6 h-6 text-purple-400" />
                  </div>
                  <div className="font-bold text-white">Agent 3</div>
                  <div className="text-sm text-slate-400">Theme Extraction</div>
                </div>
              </div>
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <div className="text-center mb-2">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-yellow-500/20 rounded-lg mb-2">
                    <BarChart3 className="w-6 h-6 text-yellow-400" />
                  </div>
                  <div className="font-bold text-white">Agent 4</div>
                  <div className="text-sm text-slate-400">Financial Metrics</div>
                </div>
              </div>
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <div className="text-center mb-2">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-teal-500/20 rounded-lg mb-2">
                    <Sparkles className="w-6 h-6 text-teal-400" />
                  </div>
                  <div className="font-bold text-white">Agent 5</div>
                  <div className="text-sm text-slate-400">Synthesis</div>
                </div>
              </div>
            </div>
          </div>

          {/* Use Cases */}
          <div id="use-cases" className="mb-16">
            <h2 className="text-3xl font-bold text-center text-white mb-12">
              Who Uses Earnings Intelligence
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {useCases.map((useCase, idx) => (
                <div key={idx} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex-shrink-0">{useCase.icon}</div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">{useCase.title}</h3>
                      <p className="text-slate-300 mb-3">{useCase.description}</p>
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/20 rounded-full text-green-400 text-sm">
                        <CheckCircle className="w-4 h-4" />
                        {useCase.benefit}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Comparison Table */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center text-white mb-4">
              vs Traditional Solutions
            </h2>
            <p className="text-center text-slate-300 mb-8 max-w-2xl mx-auto">
              See how Earnings Intelligence compares to Bloomberg Terminal and traditional equity research
            </p>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden">
              <table className="w-full">
                <thead className="bg-slate-900/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">Feature</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-400">Bloomberg Terminal</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-400">Traditional Research</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-blue-400">Earnings Intelligence</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {comparisonData.map((row, idx) => (
                    <tr key={idx} className={row.highlight ? 'bg-blue-500/5' : ''}>
                      <td className="px-6 py-4 text-sm text-slate-300 font-medium">{row.metric}</td>
                      <td className="px-6 py-4 text-sm text-slate-400">{row.bloomberg}</td>
                      <td className="px-6 py-4 text-sm text-slate-400">{row.traditional}</td>
                      <td className="px-6 py-4 text-sm text-blue-400 font-bold">{row.earnings}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Final CTA */}
          <div className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 rounded-xl p-8 border border-blue-500/30 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-6">
              <LineChart className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Earnings Research?</h2>
            <p className="text-white text-lg mb-6 max-w-2xl mx-auto">
              Join institutional research teams using AI-powered earnings intelligence. Get Bloomberg-level research tools 
              at a fraction of the cost, delivered in minutes instead of hours.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>3-minute analysis</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>95%+ accuracy</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Multi-quarter tracking</span>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/earnings-analyzer/demo"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-lg font-semibold transition-all inline-flex items-center gap-2 text-lg"
              >
                <Sparkles className="w-5 h-5" />
                Explore Live Demo
              </Link>
              <Link
                href="/earnings-analyzer/docs"
                className="bg-slate-800 hover:bg-slate-700 text-white px-8 py-4 rounded-lg font-semibold transition-all inline-flex items-center gap-2 text-lg border-2 border-slate-600"
              >
                <BookOpen className="w-5 h-5" />
                View Documentation
              </Link>
              <button
                onClick={() => setShowModal(true)}
                className="bg-slate-800 hover:bg-slate-700 text-white px-8 py-4 rounded-lg font-semibold transition-all inline-flex items-center gap-2 text-lg border-2 border-slate-600"
              >
                Request Custom Analysis
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Contact Modal */}
      <ContactModal 
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        appName="Earnings Intelligence Platform"
        appIcon={<LineChart className="w-8 h-8" />}
        benefits={earningsBenefits}
        ctaText="Request Custom Earnings Analysis"
      />

      {/* Unified Footer */}
      <UnifiedFooter productBranding={earningsFooterConfig} />
    </>
  )
}