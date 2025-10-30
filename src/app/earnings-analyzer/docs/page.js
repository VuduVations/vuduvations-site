// src/app/earnings-analyzer/docs/page.js

'use client'

import { useState } from 'react'
import Link from 'next/link'
import UniversalHeader from '@/components/UniversalHeader'
import UnifiedFooter from '@/components/UnifiedFooter'
import ContactModal from '@/components/ContactModal'
import { 
  LineChart, Brain, Target, TrendingUp, BarChart3, Sparkles, ArrowRight, 
  Zap, Award, Clock, AlertTriangle, Users, DollarSign, Download,
  CheckCircle, Play, FileText, ChevronDown, ChevronUp, Code, 
  BookOpen, Lightbulb, Shield, Layers, Database, Activity, Eye
} from 'lucide-react'

// Earnings Analyzer Footer Configuration
const earningsFooterConfig = {
  name: "Earnings Intelligence Platform",
  icon: LineChart,
  tagline: "Professional multi-quarter earnings analysis powered by Llama 3.1. Comprehensive intelligence inspired by Bloomberg Terminal.",
  color: "blue",
  trademark: "Earnings Intelligence Platform",
  subtitle: "5-step analysis pipeline. Professional-grade insights. Multi-quarter sentiment tracking.",
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

export default function EarningsAnalyzerDocs() {
  const [showModal, setShowModal] = useState(false)
  const [expandedSections, setExpandedSections] = useState({
    gettingStarted: true,
    fiveAgents: false,
    methodology: false,
    deliverables: false,
    transparency: false,
    bestPractices: false,
    comparison: false
  })

  const earningsBenefits = [
    { 
      text: "Professional multi-quarter earnings analysis with sentiment tracking using Llama 3.1",
      icon: <TrendingUp className="w-5 h-5 text-blue-400" />
    },
    { 
      text: "Strategic theme extraction and business insight analysis delivered in minutes",
      icon: <BarChart3 className="w-5 h-5 text-blue-400" />
    },
    { 
      text: "Comprehensive intelligence inspired by leading consulting methodologies",
      icon: <Target className="w-5 h-5 text-blue-400" />
    },
    { 
      text: "Multi-quarter financial performance analysis to augment your research process",
      icon: <LineChart className="w-5 h-5 text-blue-400" />
    }
  ]

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  return (
    <>
      <UniversalHeader />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6">

          {/* Back Navigation */}
          <Link 
            href="/earnings-analyzer"
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors mb-6"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            <span>Back to Earnings Intelligence Overview</span>
          </Link>

          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-6">
              <BookOpen className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-white mb-4">
              Earnings Intelligence Platform
              <span className="block text-3xl mt-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Documentation
              </span>
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Complete guide to understanding how our 5-step analysis pipeline delivers professional earnings intelligence using Llama 3.1
            </p>
          </div>

          {/* Quick Navigation */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 mb-8">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-400" />
              Quick Navigation
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <button
                onClick={() => toggleSection('gettingStarted')}
                className="text-left px-4 py-3 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-all"
              >
                <div className="text-blue-400 font-medium">Getting Started</div>
                <div className="text-sm text-slate-400 mt-1">Quick overview</div>
              </button>
              <button
                onClick={() => toggleSection('fiveAgents')}
                className="text-left px-4 py-3 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-all"
              >
                <div className="text-purple-400 font-medium">5-Step Pipeline</div>
                <div className="text-sm text-slate-400 mt-1">How it works</div>
              </button>
              <button
                onClick={() => toggleSection('deliverables')}
                className="text-left px-4 py-3 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-all"
              >
                <div className="text-green-400 font-medium">Deliverables</div>
                <div className="text-sm text-slate-400 mt-1">What you receive</div>
              </button>
              <button
                onClick={() => toggleSection('transparency')}
                className="text-left px-4 py-3 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-all"
              >
                <div className="text-teal-400 font-medium">Transparency</div>
                <div className="text-sm text-slate-400 mt-1">Score calculation</div>
              </button>
            </div>
          </div>

          {/* Getting Started */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 mb-6 overflow-hidden">
            <button
              onClick={() => toggleSection('gettingStarted')}
              className="w-full px-8 py-6 flex items-center justify-between hover:bg-white/5 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <h2 className="text-2xl font-bold text-white">Getting Started</h2>
                  <p className="text-slate-400 mt-1">Quick start guide to earnings intelligence</p>
                </div>
              </div>
              {expandedSections.gettingStarted ? (
                <ChevronUp className="w-6 h-6 text-slate-400" />
              ) : (
                <ChevronDown className="w-6 h-6 text-slate-400" />
              )}
            </button>

            {expandedSections.gettingStarted && (
              <div className="px-8 pb-8 space-y-6">
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-white mb-4">What is Earnings Intelligence?</h3>
                  <p className="text-slate-300 mb-4">
                    Earnings Intelligence Platform analyzes public company earnings call transcripts using Llama 3.1 8B 
                    through a comprehensive 5-step analysis pipeline. In just minutes, you get professional insights that would traditionally 
                    require hours of manual analysis by equity research teams.
                  </p>
                  <p className="text-slate-300">
                    Our platform tracks sentiment evolution, extracts strategic themes, evaluates management credibility, 
                    and provides actionable business insights—all delivered in a format ready for professional researchers, 
                    analysts, and strategic consultants.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
                    <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                      <Clock className="w-5 h-5 text-blue-400" />
                      Time to Value
                    </h4>
                    <ul className="space-y-2 text-slate-300">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-400 mt-1">•</span>
                        <span><strong>Minutes:</strong> Typically 3-5 minutes per transcript</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-400 mt-1">•</span>
                        <span><strong>5 steps:</strong> Comprehensive sequential analysis</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-400 mt-1">•</span>
                        <span><strong>4+ quarters:</strong> Multi-quarter tracking</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-400 mt-1">•</span>
                        <span><strong>Llama 3.1 8B:</strong> State-of-the-art LLM</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
                    <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                      <Target className="w-5 h-5 text-purple-400" />
                      Who Should Use This
                    </h4>
                    <ul className="space-y-2 text-slate-300">
                      <li className="flex items-start gap-2">
                        <span className="text-purple-400 mt-1">•</span>
                        <span>Hedge fund analysts tracking portfolios</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-400 mt-1">•</span>
                        <span>Equity research teams at scale</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-400 mt-1">•</span>
                        <span>Portfolio managers monitoring holdings</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-400 mt-1">•</span>
                        <span>Strategic consultants needing market intel</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 5-Agent System */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 mb-6 overflow-hidden">
            <button
              onClick={() => toggleSection('fiveAgents')}
              className="w-full px-8 py-6 flex items-center justify-between hover:bg-white/5 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <h2 className="text-2xl font-bold text-white">5-Step Analysis Pipeline</h2>
                  <p className="text-slate-400 mt-1">How our Llama 3.1-powered system processes earnings transcripts</p>
                </div>
              </div>
              {expandedSections.fiveAgents ? (
                <ChevronUp className="w-6 h-6 text-slate-400" />
              ) : (
                <ChevronDown className="w-6 h-6 text-slate-400" />
              )}
            </button>

            {expandedSections.fiveAgents && (
              <div className="px-8 pb-8 space-y-6">
                <p className="text-slate-300">
                  Our platform uses Llama 3.1 8B through five specialized analysis steps, each optimized for specific analytical tasks. 
                  The pipeline processes sequentially to deliver comprehensive earnings intelligence in minutes.
                </p>

                <div className="space-y-4">
                  {/* Agent 1 */}
                  <div className="bg-gradient-to-r from-blue-900/30 to-blue-800/30 border border-blue-500/30 rounded-lg p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                        <Download className="w-6 h-6 text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-2">Step 1: Audio Transcription</h3>
                        <p className="text-slate-300 mb-3">
                          Transcribes earnings call audio files using OpenAI Whisper (medium model). 
                          Handles multiple audio formats and provides accurate speech-to-text conversion including Q&A sessions.
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-semibold">
                            Whisper Medium
                          </span>
                          <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-semibold">
                            Multi-Format Audio
                          </span>
                          <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-semibold">
                            Q&A Included
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Agent 2 */}
                  <div className="bg-gradient-to-r from-green-900/30 to-green-800/30 border border-green-500/30 rounded-lg p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                        <Activity className="w-6 h-6 text-green-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-2">Step 2: Sentiment Analysis</h3>
                        <p className="text-slate-300 mb-3">
                          Analyzes transcript language to quantify management tone, confidence levels, and overall sentiment. 
                          Tracks positive signals and concerns to generate a 0-100% sentiment score with full transparency.
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-semibold">
                            Language Processing
                          </span>
                          <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-semibold">
                            Tone Analysis
                          </span>
                          <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-semibold">
                            Signal Weighting
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Agent 3 */}
                  <div className="bg-gradient-to-r from-purple-900/30 to-purple-800/30 border border-purple-500/30 rounded-lg p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                        <Lightbulb className="w-6 h-6 text-purple-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-2">Step 3: Strategic Theme Extraction</h3>
                        <p className="text-slate-300 mb-3">
                          Identifies and categorizes key strategic themes mentioned during the call—AI adoption, market expansion, 
                          cost optimization, competitive positioning, and more. Tracks theme evolution across quarters.
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-xs font-semibold">
                            Theme Detection
                          </span>
                          <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-xs font-semibold">
                            Trend Analysis
                          </span>
                          <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-xs font-semibold">
                            Priority Ranking
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Agent 4 */}
                  <div className="bg-gradient-to-r from-yellow-900/30 to-yellow-800/30 border border-yellow-500/30 rounded-lg p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                        <BarChart3 className="w-6 h-6 text-yellow-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-2">Step 4: Financial Analysis</h3>
                        <p className="text-slate-300 mb-3">
                          Extracts forward guidance and management commentary using Llama 3.1. Tracks financial metrics 
                          and compares actual results to guidance to build management credibility scores.
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-xs font-semibold">
                            Metric Extraction
                          </span>
                          <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-xs font-semibold">
                            Guidance Tracking
                          </span>
                          <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-xs font-semibold">
                            Accuracy Scoring
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Agent 5 */}
                  <div className="bg-gradient-to-r from-teal-900/30 to-teal-800/30 border border-teal-500/30 rounded-lg p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-teal-500/20 rounded-lg flex items-center justify-center">
                        <Sparkles className="w-6 h-6 text-teal-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-2">Step 5: Data Assembly & Output</h3>
                        <p className="text-slate-300 mb-3">
                          Combines insights from all analysis steps to generate comprehensive reports with executive summaries, 
                          thematic business insights, and research findings ready for professional decision-makers.
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <span className="px-3 py-1 bg-teal-500/20 text-teal-400 rounded-full text-xs font-semibold">
                            Multi-Agent Synthesis
                          </span>
                          <span className="px-3 py-1 bg-teal-500/20 text-teal-400 rounded-full text-xs font-semibold">
                            Recommendation Engine
                          </span>
                          <span className="px-3 py-1 bg-teal-500/20 text-teal-400 rounded-full text-xs font-semibold">
                            Report Generation
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Deliverables */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 mb-6 overflow-hidden">
            <button
              onClick={() => toggleSection('deliverables')}
              className="w-full px-8 py-6 flex items-center justify-between hover:bg-white/5 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <h2 className="text-2xl font-bold text-white">What You Receive</h2>
                  <p className="text-slate-400 mt-1">Complete breakdown of deliverables</p>
                </div>
              </div>
              {expandedSections.deliverables ? (
                <ChevronUp className="w-6 h-6 text-slate-400" />
              ) : (
                <ChevronDown className="w-6 h-6 text-slate-400" />
              )}
            </button>

            {expandedSections.deliverables && (
              <div className="px-8 pb-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
                    <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-blue-400" />
                      Sentiment Dashboard
                    </h4>
                    <ul className="space-y-2 text-slate-300 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                        <span>Multi-quarter sentiment tracking (0-100% score)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                        <span>Key positive signals with impact scores</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                        <span>Concerns and risks highlighted</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                        <span>Sentiment trend visualization</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                        <span>Stock price correlation analysis</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
                    <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <Lightbulb className="w-5 h-5 text-purple-400" />
                      Strategic Themes
                    </h4>
                    <ul className="space-y-2 text-slate-300 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                        <span>Top 5-10 strategic themes identified</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                        <span>Theme frequency and importance ranking</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                        <span>Quarter-over-quarter theme evolution</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                        <span>Business implications per theme</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                        <span>Competitive positioning insights</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
                    <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <Target className="w-5 h-5 text-yellow-400" />
                      Management Credibility
                    </h4>
                    <ul className="space-y-2 text-slate-300 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                        <span>Guidance accuracy tracking (0-100%)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                        <span>Beat/miss/meet history across quarters</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                        <span>Forward guidance vs actual results</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                        <span>Management track record summary</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                        <span>Confidence level in future guidance</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
                    <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-teal-400" />
                      Business Segments
                    </h4>
                    <ul className="space-y-2 text-slate-300 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                        <span>Segment-level performance breakdown</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                        <span>Revenue and margin analysis per segment</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                        <span>Segment-specific opportunities and risks</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                        <span>Key metrics and KPIs per segment</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                        <span>Management commentary highlights</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-blue-400 mb-3 flex items-center gap-2">
                    <Download className="w-5 h-5" />
                    Downloadable Report
                  </h4>
                  <p className="text-slate-300 mb-4">
                    All analysis is exportable as a comprehensive text report containing executive summary, multi-quarter 
                    analysis, strategic themes, management credibility, segment performance, and business insights.
                  </p>
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <FileText className="w-4 h-4" />
                    <span>Format: Plain text (.txt) - Easy to import into any system</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Transparency Section */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 mb-6 overflow-hidden">
            <button
              onClick={() => toggleSection('transparency')}
              className="w-full px-8 py-6 flex items-center justify-between hover:bg-white/5 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center">
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <h2 className="text-2xl font-bold text-white">Calculation Transparency</h2>
                  <p className="text-slate-400 mt-1">See exactly how scores are calculated</p>
                </div>
              </div>
              {expandedSections.transparency ? (
                <ChevronUp className="w-6 h-6 text-slate-400" />
              ) : (
                <ChevronDown className="w-6 h-6 text-slate-400" />
              )}
            </button>

            {expandedSections.transparency && (
              <div className="px-8 pb-8 space-y-6">
                <p className="text-slate-300">
                  Unlike black-box AI systems, our platform shows you exactly how every sentiment score is calculated. 
                  Click "Show How Score Was Calculated" on any quarter to see the breakdown.
                </p>

                <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
                  <h4 className="text-lg font-semibold text-white mb-4">Sentiment Score Formula</h4>
                  <div className="bg-slate-900 rounded p-4 font-mono text-sm text-slate-300 mb-4">
                    Base Score (50%) + Positive Signals - Negative Signals = Final Score (0-100%)
                  </div>
                  <p className="text-slate-300 text-sm mb-4">
                    Each signal (positive or negative) is weighted by its impact and frequency in the transcript. 
                    The system identifies key phrases, calculates their influence, and shows you the exact math.
                  </p>
                  
                  <h5 className="text-md font-semibold text-white mb-3">Example Breakdown:</h5>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-300">Base Score</span>
                      <span className="text-blue-400 font-mono">50.0 pts</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-green-400">+ "Strong subscriber growth" (12 mentions)</span>
                      <span className="text-green-400 font-mono">+8.0 pts</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-green-400">+ "Exceeded expectations" (8 mentions)</span>
                      <span className="text-green-400 font-mono">+5.0 pts</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-red-400">- "Content cost pressures" (6 mentions)</span>
                      <span className="text-red-400 font-mono">-4.0 pts</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-red-400">- "Competitive intensity" (5 mentions)</span>
                      <span className="text-red-400 font-mono">-3.0 pts</span>
                    </div>
                    <div className="border-t border-slate-600 pt-3 flex items-center justify-between text-sm font-semibold">
                      <span className="text-white">Final Sentiment Score</span>
                      <span className="text-blue-400 font-mono">56.0%</span>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-blue-400 mb-3">Why Transparency Matters</h4>
                  <ul className="space-y-2 text-slate-300">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span><strong>Build Trust:</strong> See the evidence behind every score</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span><strong>Validate AI:</strong> Verify the system isn't hallucinating</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span><strong>Regulatory Compliance:</strong> Explain AI decisions to stakeholders</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span><strong>Research Justification:</strong> Back up analysis with verifiable data</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Comparison vs Traditional Solutions */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 mb-6 overflow-hidden">
            <button
              onClick={() => toggleSection('comparison')}
              className="w-full px-8 py-6 flex items-center justify-between hover:bg-white/5 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <h2 className="text-2xl font-bold text-white">vs Traditional Solutions</h2>
                  <p className="text-slate-400 mt-1">How we compare to Bloomberg & equity research</p>
                </div>
              </div>
              {expandedSections.comparison ? (
                <ChevronUp className="w-6 h-6 text-slate-400" />
              ) : (
                <ChevronDown className="w-6 h-6 text-slate-400" />
              )}
            </button>

            {expandedSections.comparison && (
              <div className="px-8 pb-8 space-y-6">
                <div className="bg-slate-800/50 rounded-lg border border-slate-700 overflow-hidden">
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
                      <tr>
                        <td className="px-6 py-4 text-sm text-slate-300 font-medium">Analysis Time</td>
                        <td className="px-6 py-4 text-sm text-slate-400">2-3 hours manual</td>
                        <td className="px-6 py-4 text-sm text-slate-400">4-8 hours</td>
                        <td className="px-6 py-4 text-sm text-blue-400 font-bold">3 minutes</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-sm text-slate-300 font-medium">Cost per Analysis</td>
                        <td className="px-6 py-4 text-sm text-slate-400">$2,000+ (loaded)</td>
                        <td className="px-6 py-4 text-sm text-slate-400">$1,500+ (loaded)</td>
                        <td className="px-6 py-4 text-sm text-blue-400 font-bold">$50-150</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-sm text-slate-300 font-medium">Multi-Quarter Tracking</td>
                        <td className="px-6 py-4 text-sm text-slate-400">Manual charting</td>
                        <td className="px-6 py-4 text-sm text-slate-400">Manual spreadsheets</td>
                        <td className="px-6 py-4 text-sm text-blue-400 font-bold">Automated</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-sm text-slate-300 font-medium">Sentiment Analysis</td>
                        <td className="px-6 py-4 text-sm text-slate-400">Not available</td>
                        <td className="px-6 py-4 text-sm text-slate-400">Manual reading</td>
                        <td className="px-6 py-4 text-sm text-blue-400 font-bold">AI-powered analysis</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-sm text-slate-300 font-medium">Theme Extraction</td>
                        <td className="px-6 py-4 text-sm text-slate-400">Manual notes</td>
                        <td className="px-6 py-4 text-sm text-slate-400">Manual summaries</td>
                        <td className="px-6 py-4 text-sm text-blue-400 font-bold">Automated extraction</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-sm text-slate-300 font-medium">Management Credibility</td>
                        <td className="px-6 py-4 text-sm text-slate-400">Not tracked</td>
                        <td className="px-6 py-4 text-sm text-slate-400">Analyst judgment</td>
                        <td className="px-6 py-4 text-sm text-blue-400 font-bold">Quantified accuracy</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-sm text-slate-300 font-medium">Calculation Transparency</td>
                        <td className="px-6 py-4 text-sm text-slate-400">N/A</td>
                        <td className="px-6 py-4 text-sm text-slate-400">Subjective</td>
                        <td className="px-6 py-4 text-sm text-blue-400 font-bold">Full breakdown shown</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-blue-400 mb-3">The Best of Both Worlds</h4>
                  <p className="text-slate-300">
                    We combine comprehensive data analysis with professional strategic methodology, 
                    delivered using Llama 3.1 at AI speed. You get professional-grade insights 
                    with complete transparency and cost efficiency.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* CTA Section */}
          <div id="get-started" className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 rounded-xl p-8 border border-blue-500/30 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-6">
              <LineChart className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
            <p className="text-white text-lg mb-6 max-w-2xl mx-auto">
              Experience professional earnings intelligence powered by Llama 3.1 through our 5-step analysis pipeline. 
              See live analysis or request a custom demo.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Minutes per analysis</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Llama 3.1 8B powered</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Full transparency</span>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/earnings-analyzer/demo"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-lg font-semibold transition-all inline-flex items-center gap-2 text-lg"
              >
                <Sparkles className="w-5 h-5" />
                View Live Demo
              </Link>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setShowModal(true);
                }}
                className="bg-slate-800 hover:bg-slate-700 text-white px-8 py-4 rounded-lg font-semibold transition-all inline-flex items-center gap-2 text-lg border-2 border-slate-600"
              >
                Request Custom Analysis
              </button>
            </div>
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

      {/* Unified Footer */}
      <UnifiedFooter productBranding={earningsFooterConfig} />
    </>
  )
}