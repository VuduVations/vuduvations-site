// src/app/earnings-analyzer/page.js
'use client'

import Navigation from '@/components/Navigation';
import { useState } from 'react'
import Link from 'next/link'
import ContactModal from '@/components/ContactModal'
import { LineChart, Brain, Zap, CheckCircle, Info, Upload, Download, TrendingUp, BarChart3, Target } from 'lucide-react'

// Import data and components
import { JPM_2024_DATA } from './data/jpm-2024'
import ExecutiveDashboard from './components/ExecutiveDashboard'
import QuarterSelector from './components/QuarterSelector'
import SentimentAnalysis from './components/SentimentAnalysis'
import BusinessSegments from './components/BusinessSegments'
import StrategicThemes from './components/StrategicThemes'
import FinancialInsights from './components/FinancialInsights'
import Methodology from './components/Methodology'

export default function EarningsAnalyzer() {
  const [selectedQuarter, setSelectedQuarter] = useState('Q1_2024')
  const [expandedSections, setExpandedSections] = useState({
    sentiment: true,
    segments: true,
    themes: true,
    insights: true
  })
  const [showModal, setShowModal] = useState(false)

  const earningsBenefits = [
    { 
      text: "Strategy consulting-grade multi-quarter earnings analysis with sentiment tracking",
      icon: <TrendingUp className="w-5 h-5" />
    },
    { 
      text: "Strategic theme extraction and investment implications delivered in minutes",
      icon: <BarChart3 className="w-5 h-5" />
    },
    { 
      text: "Institutional-level intelligence comparable to McKinsey, Bain, and BCG analysis",
      icon: <Target className="w-5 h-5" />
    },
    { 
      text: "Complete financial performance assessment with actionable recommendations",
      icon: <LineChart className="w-5 h-5" />
    }
  ]

  const quarters = ['Q1_2024', 'Q2_2024', 'Q3_2024', 'Q4_2024']
  const currentQuarter = JPM_2024_DATA.quarterly_results[selectedQuarter]

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  // Calculate sentiment trend
  const sentimentTrend = quarters.map(q => ({
    quarter: q.replace('_2024', ''),
    sentiment: JPM_2024_DATA.quarterly_results[q].sentiment_score,
    stock_price: JPM_2024_DATA.quarterly_results[q].stock_price,
    reaction: JPM_2024_DATA.quarterly_results[q].earnings_reaction
  }))

  // Get sentiment change indicator
  const getSentimentChange = () => {
    const q1 = JPM_2024_DATA.quarterly_results.Q1_2024.sentiment_score
    const q4 = JPM_2024_DATA.quarterly_results.Q4_2024.sentiment_score
    const change = ((q4 - q1) / q1 * 100).toFixed(1)
    return { change, positive: q4 > q1 }
  }

  // Get stock performance
  const getStockPerformance = () => {
    const q1 = JPM_2024_DATA.quarterly_results.Q1_2024.stock_price
    const q4 = JPM_2024_DATA.quarterly_results.Q4_2024.stock_price
    const change = ((q4 - q1) / q1 * 100).toFixed(1)
    return { change, positive: q4 > q1, q1, q4 }
  }

  const sentimentChange = getSentimentChange()
  const stockPerf = getStockPerformance()

  const downloadReport = () => {
    const report = `
JPMorgan Chase & Co. - 2024 Earnings Intelligence Report
Generated: ${new Date().toLocaleString()}
Strategy Consulting-Grade Analysis | Confidential

=============================================================
EXECUTIVE SUMMARY
=============================================================

Company: ${JPM_2024_DATA.company}
Ticker: ${JPM_2024_DATA.ticker}
Analysis Period: 2024 (Q1-Q4)
Analysis Quality: Institutional-Grade

This report provides strategy consulting-level analysis of JPMorgan Chase's 
2024 earnings performance, including multi-quarter sentiment tracking, 
strategic theme extraction, and investment implications.

Year-over-Year Performance:
- Sentiment Evolution: ${sentimentChange.change}% ${sentimentChange.positive ? 'improvement' : 'decline'}
- Stock Performance: +${stockPerf.change}% ($${stockPerf.q1} → $${stockPerf.q4})
- Management Confidence: Progressive improvement (Medium → High)

=============================================================
QUARTERLY BREAKDOWN
=============================================================

${quarters.map(q => {
  const data = JPM_2024_DATA.quarterly_results[q]
  return `
${q.replace('_', ' ')}
---------------------------------------------------------
Stock Price: $${data.stock_price.toFixed(2)}
Earnings Reaction: ${data.earnings_reaction > 0 ? '+' : ''}${data.earnings_reaction}%
Sentiment Score: ${data.sentiment_score.toFixed(2)}
Overall Tone: ${data.sentiment_analysis.overall_tone}
Management Confidence: ${data.sentiment_analysis.management_confidence}

Key Positive Signals:
${data.sentiment_analysis.key_positive_signals.map((s, i) => `${i + 1}. ${s}`).join('\n')}

Key Concerns:
${data.sentiment_analysis.key_concerns.map((c, i) => `${i + 1}. ${c}`).join('\n')}

Strategic Themes:
${data.topic_analysis.strategic_themes.map((t, i) => `${i + 1}. ${t.theme_name}: ${t.description}`).join('\n')}

Risk Factors:
${data.topic_analysis.risk_factors.map((r, i) => `${i + 1}. ${r}`).join('\n')}

Opportunities:
${data.topic_analysis.opportunities.map((o, i) => `${i + 1}. ${o}`).join('\n')}
`
}).join('\n')}

=============================================================
END OF REPORT
=============================================================

Disclaimer: This analysis is generated by an AI-powered system and should 
not be considered as investment advice. Always conduct your own due diligence 
and consult with financial professionals before making investment decisions.
`

    const blob = new Blob([report], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `JPM-2024-Earnings-Intelligence-Report-${Date.now()}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Back to Home Link */}
        <div className="mb-6">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Portfolio
          </Link>
        </div>

        {/* Hero Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <LineChart className="w-12 h-12 text-blue-400" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent pb-2">
              Earnings Intelligence Platform
            </h1>
          </div>
          <p className="text-xl text-gray-300 mb-2">
            Strategy Consulting-Grade Multi-Quarter Analysis & Strategic Insights
          </p>
          <div className="flex items-center justify-center gap-6 mt-4 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <Brain className="w-4 h-4 text-blue-400" />
              <span>Elite-Level Analysis</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-blue-400" />
              <span>Real-time Market Data</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-blue-400" />
              <span>Institutional-Grade Insights</span>
            </div>
          </div>
        </div>

        {/* Demo Banner */}
        <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 rounded-xl p-6 mb-8">
          <div className="flex items-start gap-4">
            <Info className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-bold text-blue-300 mb-2">Live Demo: JPMorgan Chase 2024 Full Year Analysis</h3>
              <p className="text-gray-300 mb-4">
                Explore a complete 4-quarter earnings intelligence report powered by our enhanced 
                AI analysis engine. This demo showcases the same level of strategic analysis that 
                top consulting firms provide to Fortune 500 companies—using real JPM transcripts 
                analyzed with institutional-grade rigor.
              </p>
              <button
                onClick={() => setShowModal(true)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-lg font-semibold transition-all inline-flex items-center gap-2"
              >
                <Upload className="w-4 h-4" />
                Analyze Any Company
              </button>
            </div>
          </div>
        </div>

        {/* Methodology Section */}
        <Methodology />

        {/* Executive Dashboard */}
        <ExecutiveDashboard 
          data={JPM_2024_DATA}
          sentimentChange={sentimentChange}
          stockPerf={stockPerf}
          sentimentTrend={sentimentTrend}
        />

        {/* Quarter Selector */}
        <QuarterSelector
          quarters={quarters}
          selectedQuarter={selectedQuarter}
          setSelectedQuarter={setSelectedQuarter}
          data={JPM_2024_DATA}
        />

        {/* Quarterly Deep Dive */}
        <div className="space-y-6">
          <SentimentAnalysis 
            currentQuarter={currentQuarter}
            selectedQuarter={selectedQuarter}
            expanded={expandedSections.sentiment}
            toggleSection={toggleSection}
          />

          <BusinessSegments 
            currentQuarter={currentQuarter}
            expanded={expandedSections.segments}
            toggleSection={toggleSection}
          />

          <StrategicThemes 
            currentQuarter={currentQuarter}
            expanded={expandedSections.themes}
            toggleSection={toggleSection}
          />

          <FinancialInsights 
            currentQuarter={currentQuarter}
            expanded={expandedSections.insights}
            toggleSection={toggleSection}
          />
        </div>

        {/* Download Section */}
        <div className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 rounded-xl p-8 border border-white/20 text-center mt-8">
          <h3 className="text-3xl font-bold mb-4">Export Complete Analysis</h3>
          <p className="text-gray-300 text-lg mb-6 max-w-2xl mx-auto">
            Download the full 4-quarter earnings intelligence report with strategy 
            consulting-grade metrics, insights, and investment recommendations.
          </p>
          <button
            onClick={downloadReport}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-lg font-semibold transition-all inline-flex items-center gap-2 text-lg"
          >
            <Download className="w-6 h-6" />
            Download Full Report
          </button>
        </div>

        {/* CTA Footer */}
        <div className="mt-12 bg-gradient-to-br from-blue-900/50 to-purple-900/50 rounded-xl p-8 border border-white/20 text-center">
          <h2 className="text-3xl font-bold mb-4">Get Strategy Consulting-Grade Analysis for Any Company</h2>
          <p className="text-gray-300 text-lg mb-6 max-w-2xl mx-auto">
            Access the same level of strategic earnings intelligence that McKinsey, Bain, 
            and BCG provide to Fortune 500 clients—delivered in minutes with AI-powered 
            multi-quarter insights, sentiment tracking, and investment recommendations.
          </p>
          
          <button
            onClick={() => setShowModal(true)}
            className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-lg font-semibold transition-all text-lg"
          >
            Request Custom Analysis
          </button>
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
    </div>
  )
}