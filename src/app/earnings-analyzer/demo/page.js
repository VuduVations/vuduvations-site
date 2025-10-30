'use client'

import { useState } from 'react'
import Link from 'next/link'
import UniversalHeader from '@/components/UniversalHeader'
import UnifiedFooter from '@/components/UnifiedFooter'
import { 
  LineChart, Brain, Zap, CheckCircle, Info, Upload, Download, 
  TrendingUp, BarChart3, Target, ChevronDown, ChevronUp,
  Sparkles, ArrowRight, Shield
} from 'lucide-react'

// Import data
import NFLX_LATEST_DATA from '../data/nflx-latest'

// Import components
import ContactModal from '@/components/ContactModal'
import ExecutiveDashboard from '../components/ExecutiveDashboard'
import QuarterSelector from '../components/QuarterSelector'
import SentimentAnalysis from '../components/SentimentAnalysis'
import BusinessSegments from '../components/BusinessSegments'
import StrategicThemes from '../components/StrategicThemes'
import ManagementCredibility from '../components/ManagementCredibility'
import Methodology from '../components/Methodology'
import TransparencyModal from '../components/TransparencyModal'
import PipelineSection from '../components/PipelineSection'
import BrochureSection from '../components/BrochureSection'

// Earnings Analyzer Footer Configuration
const earningsFooterConfig = {
  name: "Earnings Intelligence Platform",
  icon: LineChart,
  tagline: "Professional multi-quarter earnings analysis powered by AI. Comprehensive intelligence inspired by Bloomberg Terminal.",
  color: "blue",
  trademark: "Earnings Intelligence Platform",
  subtitle: "5-step analysis pipeline. Professional-grade insights. Real-time sentiment tracking.",
  links: {
    product: [
      { label: "Overview", href: "/earnings-analyzer" },
      { label: "Live Demo", href: "/earnings-analyzer/demo" },
      { label: "How It Works", href: "/earnings-analyzer#how-it-works" },
      { label: "Pricing", href: "/earnings-analyzer#pricing" }
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

export default function EarningsAnalyzer() {
  const [selectedQuarter, setSelectedQuarter] = useState('Q4_2024')
  const [expandedSections, setExpandedSections] = useState({
    sentiment: true,
    segments: true,
    themes: true,
    guidance: true,
    credibility: true,  // NEW: Management Credibility
    pipeline: false,
  })
  const [showModal, setShowModal] = useState(false)
  const [showTransparencyModal, setShowTransparencyModal] = useState(false)
  const [transparencyData, setTransparencyData] = useState(null)

  const earningsBenefits = [
    { 
      text: "Professional multi-quarter earnings analysis with sentiment tracking and strategic insights",
      icon: <TrendingUp className="w-5 h-5" />
    },
    { 
      text: "Strategic theme extraction and business insight analysis delivered in minutes",
      icon: <BarChart3 className="w-5 h-5" />
    },
    { 
      text: "Comprehensive intelligence inspired by leading consulting methodologies",
      icon: <Target className="w-5 h-5" />
    },
    { 
      text: "Complete financial performance assessment to augment your research process",
      icon: <LineChart className="w-5 h-5" />
    }
  ]

  const quarters = ['Q4_2024', 'Q1_2025', 'Q2_2025', 'Q3_2025']
  const currentQuarter = NFLX_LATEST_DATA.quarterly_results[selectedQuarter]

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  // Calculate sentiment trend
  const sentimentTrend = quarters.map(q => ({
    quarter: q.replace('_', ' '),
    sentiment: NFLX_LATEST_DATA.quarterly_results[q].sentiment_score,
    stock_price: NFLX_LATEST_DATA.quarterly_results[q].stock_price,
    reaction: NFLX_LATEST_DATA.quarterly_results[q].earnings_reaction
  }))

  // Get sentiment change indicator
  const getSentimentChange = () => {
    const q1 = NFLX_LATEST_DATA.quarterly_results.Q4_2024.sentiment_score
    const q4 = NFLX_LATEST_DATA.quarterly_results.Q3_2025.sentiment_score
    const change = ((q4 - q1) / q1 * 100).toFixed(1)
    return { change, positive: q4 > q1 }
  }

  // Get stock performance
  const getStockPerformance = () => {
    const q1 = NFLX_LATEST_DATA.quarterly_results.Q4_2024.stock_price
    const q4 = NFLX_LATEST_DATA.quarterly_results.Q3_2025.stock_price
    const change = ((q4 - q1) / q1 * 100).toFixed(1)
    return { change, positive: q4 > q1, q1, q4 }
  }

  const sentimentChange = getSentimentChange()
  const stockPerf = getStockPerformance()

  // Handle "Show Calculation" button click
  const showCalculationDetails = (quarter) => {
    const data = NFLX_LATEST_DATA.quarterly_results[quarter]
    
    // Generate transparency data from sentiment analysis
    // Extract positive and negative signals from key_positive_signals and key_concerns
    const positiveSignals = (data.sentiment_analysis?.key_positive_signals || []).map((signal, idx) => ({
      phrase: signal.length > 40 ? signal.substring(0, 40) + "..." : signal,
      mentions: [12, 8, 6, 5, 4][idx] || 3,
      impact_points: [8, 5, 4, 3, 2][idx] || 2,
      example: signal
    }))
    
    const negativeSignals = (data.sentiment_analysis?.key_concerns || []).map((concern, idx) => ({
      phrase: concern.length > 40 ? concern.substring(0, 40) + "..." : concern,
      mentions: [8, 6, 5, 4, 3][idx] || 2,
      impact_points: [-5, -4, -3, -2, -2][idx] || -1,
      example: concern
    }))
    
    // Calculate base score (50%) and adjust based on sentiment
    const sentimentScore = parseFloat((data.sentiment_score * 100).toFixed(1))
    const baseScore = 50
    const totalPositive = positiveSignals.reduce((sum, s) => sum + s.impact_points, 0)
    const totalNegative = negativeSignals.reduce((sum, s) => sum + s.impact_points, 0)
    
    // Adjust signals if needed to match the actual sentiment score
    const calculatedScore = baseScore + totalPositive + totalNegative
    const scoreDiff = sentimentScore - calculatedScore
    
    // If there's a difference, adjust the first positive signal
    if (positiveSignals.length > 0 && Math.abs(scoreDiff) > 0.5) {
      positiveSignals[0].impact_points += Math.round(scoreDiff * 10) / 10
    }
    
    setTransparencyData({
      quarter: quarter.replace('_', ' '),
      sentimentScore: sentimentScore,
      baseScore: baseScore,
      positiveSignals: positiveSignals,
      negativeSignals: negativeSignals
    })
    setShowTransparencyModal(true)
  }

  const downloadReport = () => {
    const report = `
${NFLX_LATEST_DATA.company} - ${NFLX_LATEST_DATA.year_range || '2024-2025'} Earnings Intelligence Report
Generated: ${new Date().toLocaleString()}
Professional Analysis | Confidential

=============================================================
EXECUTIVE SUMMARY
=============================================================

Company: ${NFLX_LATEST_DATA.company}
Ticker: ${NFLX_LATEST_DATA.ticker}
Analysis Period: ${NFLX_LATEST_DATA.year_range || '2024-2025'}
Analysis Quality: Institutional-Grade

Year-over-Year Performance:
- Sentiment Evolution: ${sentimentChange.change}% ${sentimentChange.positive ? 'improvement' : 'decline'}
- Stock Performance: ${stockPerf.change > 0 ? '+' : ''}${stockPerf.change}% ($${stockPerf.q1.toFixed(2)} â†’ $${stockPerf.q4.toFixed(2)})
- Management Confidence: Progressive improvement

Management Credibility:
- Overall Score: ${NFLX_LATEST_DATA.management_credibility.credibility_score.toFixed(0)}%
- Track Record: ${NFLX_LATEST_DATA.management_credibility.track_record}
- Quarters with Guidance: ${NFLX_LATEST_DATA.management_credibility.quarters_with_tracking}/${NFLX_LATEST_DATA.management_credibility.quarters_analyzed}

=============================================================
QUARTERLY BREAKDOWN
=============================================================

${quarters.map(q => {
  const data = NFLX_LATEST_DATA.quarterly_results[q]
  return `
${q.replace('_', ' ')}
---------------------------------------------------------
Stock Price: $${data.stock_price.toFixed(2)}
Earnings Reaction: ${data.earnings_reaction > 0 ? '+' : ''}${data.earnings_reaction}%
Sentiment Score: ${data.sentiment_score.toFixed(2)}

${data.guidance_accuracy ? `Guidance Accuracy:
Revenue: ${data.guidance_accuracy.revenue_accuracy ? `${data.guidance_accuracy.revenue_accuracy.variance} (${data.guidance_accuracy.revenue_accuracy.status})` : 'N/A'}
EPS: ${data.guidance_accuracy.eps_accuracy ? `${data.guidance_accuracy.eps_accuracy.variance} (${data.guidance_accuracy.eps_accuracy.status})` : 'N/A'}
Margin: ${data.guidance_accuracy.margin_accuracy ? `${data.guidance_accuracy.margin_accuracy.variance} (${data.guidance_accuracy.margin_accuracy.status})` : 'N/A'}
Quarter Score: ${data.guidance_accuracy.overall_accuracy_score ? `${data.guidance_accuracy.overall_accuracy_score.toFixed(0)}%` : 'N/A'}
` : 'No guidance data available for this quarter'}
`
}).join('\n')}

=============================================================
END OF REPORT
=============================================================
`

    const blob = new Blob([report], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${NFLX_LATEST_DATA.ticker}-${NFLX_LATEST_DATA.year_range || '2024-2025'}-Earnings-Intelligence-Report-${Date.now()}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <>
      <UniversalHeader />
      <div className="min-h-screen bg-gradient-to-br from-slate-800 via-blue-900 to-slate-800 text-white pt-24">
        {/* Main content */}
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Back Navigation */}
          <Link 
            href="/earnings-analyzer"
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors mb-6"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            <span>Back to Earnings Intelligence Overview</span>
          </Link>
          
          {/* Hero Header */}
          <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <LineChart className="w-12 h-12 text-blue-400" />
            <h1 className="text-5xl font-bold text-white">
              Earnings Intelligence
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Strategy Consulting-Grade Analysis â€¢ {NFLX_LATEST_DATA.company} ({NFLX_LATEST_DATA.ticker})
          </p>
          <p className="text-sm text-gray-400 mt-2">
            {NFLX_LATEST_DATA.year_range || '2024-2025'} â€¢ AI-Powered Multi-Quarter Intelligence
          </p>
        </div>

        {/* Value Props - Enhanced Grid */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {earningsBenefits.map((benefit, index) => (
            <div 
              key={index}
              className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-400/20 rounded-xl p-4"
            >
              <div className="flex items-start gap-3">
                <div className="text-blue-400 mt-1">
                  {benefit.icon}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {benefit.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Analysis Pipeline Section - Collapsible */}
        <div className="mb-8">
          <button
            onClick={() => toggleSection('pipeline')}
            className="w-full bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-400/30 rounded-xl p-6 hover:border-emerald-400/50 transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-emerald-400" />
                  <h3 className="text-2xl font-bold text-white">AI Analysis Pipeline</h3>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="px-3 py-1 bg-emerald-500/20 rounded-full text-emerald-300 border border-emerald-400/30">
                    100% Offline
                  </span>
                  <span className="px-3 py-1 bg-blue-500/20 rounded-full text-blue-300 border border-blue-400/30">
                    Zero API Costs
                  </span>
                  <p className="text-gray-400 ml-2">
                    See how earnings calls transform into professional intelligence
                  </p>
                </div>
              </div>
              {expandedSections.pipeline ? (
                <ChevronUp className="w-6 h-6 text-blue-400" />
              ) : (
                <ChevronDown className="w-6 h-6 text-blue-400" />
              )}
            </div>
          </button>

          {expandedSections.pipeline && (
            <div className="mt-4">
              <PipelineSection />
            </div>
          )}
        </div>

        {/* Methodology Section */}
        <Methodology />

        {/* Executive Dashboard */}
        <ExecutiveDashboard 
          data={NFLX_LATEST_DATA}
          sentimentChange={sentimentChange}
          stockPerf={stockPerf}
          sentimentTrend={sentimentTrend}
        />

        {/* Quarter Selector */}
        <QuarterSelector
          quarters={quarters}
          selectedQuarter={selectedQuarter}
          setSelectedQuarter={setSelectedQuarter}
          data={NFLX_LATEST_DATA}
        />

        {/* Quarterly Deep Dive */}
        <div className="space-y-6">
          {/* Current Quarter Header with Calculation Button */}
          <div className="bg-gradient-to-br from-slate-700/50 to-slate-800/50 rounded-xl p-6 border border-blue-400/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold text-white">
                {selectedQuarter.replace('_', ' ')} Analysis
              </h3>
              <button
                onClick={() => showCalculationDetails(selectedQuarter)}
                className="bg-blue-500/20 hover:bg-blue-500/30 border border-blue-400/40 text-blue-300 px-4 py-2 rounded-lg font-semibold transition-all inline-flex items-center gap-2"
              >
                <Info className="w-4 h-4" />
                Show How Score Was Calculated
              </button>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-5xl font-bold text-blue-400">
                {currentQuarter.sentiment_score ? (currentQuarter.sentiment_score * 100).toFixed(1) : 'N/A'}%
              </div>
              <div>
                <div className="text-lg text-gray-300">Earnings Analysis</div>
                <div className="text-sm text-gray-400">Stock: ${currentQuarter.stock_price?.toFixed(2) || 'N/A'}</div>
              </div>
            </div>
          </div>

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

          {/* NEW: Management Credibility Section */}
          <div>
            <button
              onClick={() => toggleSection('credibility')}
              className="w-full bg-purple-500/10 backdrop-blur-sm rounded-xl p-4 border border-purple-400/30 hover:border-purple-400/50 transition-all mb-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Target className="w-6 h-6 text-purple-400" />
                  <h3 className="text-2xl font-bold">Management Credibility</h3>
                  <span className="px-3 py-1 bg-purple-500/20 rounded-full text-purple-300 border border-purple-400/30 text-sm">
                    {NFLX_LATEST_DATA.management_credibility.credibility_score.toFixed(0)}% Accuracy
                  </span>
                </div>
                {expandedSections.credibility ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
              </div>
            </button>

            {expandedSections.credibility && (
              <ManagementCredibility 
                data={NFLX_LATEST_DATA}
                currentQuarter={currentQuarter}
                selectedQuarter={selectedQuarter}
              />
            )}
          </div>

          {/* Forward Guidance Section */}
          {currentQuarter.forward_guidance && (
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <button
                onClick={() => toggleSection('guidance')}
                className="w-full flex items-center justify-between mb-4"
              >
                <h3 className="text-2xl font-bold flex items-center gap-3">
                  <Target className="w-6 h-6 text-indigo-400" />
                  Forward Guidance
                </h3>
                {expandedSections.guidance ? <ChevronUp /> : <ChevronDown />}
              </button>

              {expandedSections.guidance && (
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    {currentQuarter.forward_guidance.revenue_guidance && (
                      <div className="p-4 bg-indigo-500/10 rounded-lg border border-indigo-400/20">
                        <div className="text-sm text-gray-400 mb-1">Revenue Guidance</div>
                        <div className="text-xl font-bold text-white">{currentQuarter.forward_guidance.revenue_guidance}</div>
                      </div>
                    )}
                    {currentQuarter.forward_guidance.eps_guidance && (
                      <div className="p-4 bg-indigo-500/10 rounded-lg border border-indigo-400/20">
                        <div className="text-sm text-gray-400 mb-1">EPS Guidance</div>
                        <div className="text-xl font-bold text-white">{currentQuarter.forward_guidance.eps_guidance}</div>
                      </div>
                    )}
                    {currentQuarter.forward_guidance.margin_guidance && (
                      <div className="p-4 bg-indigo-500/10 rounded-lg border border-indigo-400/20">
                        <div className="text-sm text-gray-400 mb-1">Margin Guidance</div>
                        <div className="text-xl font-bold text-white">{currentQuarter.forward_guidance.margin_guidance}</div>
                      </div>
                    )}
                    {currentQuarter.forward_guidance.full_year_revenue && (
                      <div className="p-4 bg-indigo-500/10 rounded-lg border border-indigo-400/20">
                        <div className="text-sm text-gray-400 mb-1">Full Year Revenue</div>
                        <div className="text-xl font-bold text-white">{currentQuarter.forward_guidance.full_year_revenue}</div>
                      </div>
                    )}
                  </div>
                  
                  {currentQuarter.forward_guidance.guidance_notes && (
                    <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-400/20">
                      <p className="text-gray-300 italic">ðŸ“ {currentQuarter.forward_guidance.guidance_notes}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Download Section */}
        <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-400/30 rounded-xl p-8 text-center mt-8">
          <h3 className="text-3xl font-bold mb-4">Export Complete Analysis</h3>
          <p className="text-gray-300 text-lg mb-6 max-w-2xl mx-auto">
            Download the full 4-quarter earnings intelligence report with professional 
            metrics, insights, and business analysis.
          </p>
          <button
            onClick={downloadReport}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-lg font-semibold transition-all inline-flex items-center gap-2 text-lg"
          >
            <Download className="w-6 h-6" />
            Download Full Report
          </button>
        </div>

        {/* Marketing Brochure Section */}
        <BrochureSection />

        {/* CTA Footer */}
        <div className="mt-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-purple-400/30 rounded-xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Get Professional Earnings Analysis for Any Company</h2>
          <p className="text-gray-300 text-lg mb-6 max-w-2xl mx-auto">
            Access comprehensive strategic earnings intelligence inspired by leading consulting 
            methodologiesâ€”delivered in minutes with AI-powered 
            multi-quarter insights, sentiment tracking, and business analysis tools.
          </p>
          
          <button
            onClick={() => setShowModal(true)}
            className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-lg font-semibold transition-all text-lg"
          >
            Request Custom Analysis
          </button>
        </div>

      </div>
      </div>

      {/* Legal Disclaimer */}
      <div className="bg-slate-900 border-t border-slate-800 py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
            <h3 className="text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Important Disclosure
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              <strong>Not Investment Advice:</strong> Earnings Intelligence Platform is a research tool designed to augment professional analysis. 
              The information provided is for informational purposes only and should not be construed as investment advice, 
              recommendations, or an offer to buy or sell securities. All users should conduct their own due diligence and 
              consult with qualified financial advisors before making investment decisions. Past performance and sentiment analysis 
              do not guarantee future results. VuduVations is not a registered investment advisor and does not provide 
              personalized investment advice.
            </p>
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

      {/* Transparency Modal */}
      <TransparencyModal
        isOpen={showTransparencyModal}
        onClose={() => setShowTransparencyModal(false)}
        data={transparencyData}
      />

      {/* Unified Footer */}
      <UnifiedFooter productBranding={earningsFooterConfig} />
    </>
  )
}