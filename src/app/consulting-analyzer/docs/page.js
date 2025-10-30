// src/app/consulting-analyzer/docs/page.js

'use client'

import { useState } from 'react'
import Link from 'next/link'
import UniversalHeader from '@/components/UniversalHeader'
import UnifiedFooter from '@/components/UnifiedFooter'
import ContactModal from '@/components/ContactModal'
import { 
  Briefcase, Brain, Zap, Shield, Clock, FileText, Download, Copy, 
  AlertTriangle, TrendingUp, Target, Users, CheckCircle, DollarSign, 
  BarChart3, Activity, ArrowLeft, ChevronDown, ChevronUp, Code, 
  Settings, BookOpen, Lightbulb, Lock, Globe, Database, GitBranch
} from 'lucide-react'

// Sales Analyzer Footer Configuration
const salesAnalyzerFooterConfig = {
  name: "Sales Call Analyzer",
  icon: Briefcase,
  tagline: "Observable LangGraph intelligence for sales conversations. See exactly how AI analyzes your calls.",
  color: "blue",
  trademark: "Sales Call Analyzer",
  subtitle: "Multi-tier AI routing. Real-time cost tracking. Full transparency.",
  links: {
    product: [
      { label: "Overview", href: "/consulting-analyzer" },
      { label: "Live Demo", href: "/consulting-analyzer/demo" },
      { label: "Features", href: "/consulting-analyzer#features" },
      { label: "Pricing", href: "/consulting-analyzer#pricing" }
    ],
    resources: [
      { label: "Documentation", href: "/consulting-analyzer/docs" },
      { label: "Live Demo", href: "/consulting-analyzer/demo" },
      { label: "Sample Transcripts", href: "/consulting-analyzer/demo#samples" },
      { label: "Use Cases", href: "/consulting-analyzer#use-cases" }
    ],
    company: [
      { label: "About VuduVations", href: "/" },
      { label: "Contact Sales", href: "#contact" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" }
    ]
  }
};

export default function SalesCallAnalyzerDocs() {
  const [showModal, setShowModal] = useState(false)
  const [expandedSections, setExpandedSections] = useState({
    gettingStarted: true,
    architecture: false,
    transcriptFormat: false,
    analysisOutput: false,
    bestPractices: false,
    security: false
  })

  const salesAnalyzerBenefits = [
    { 
      text: "Real-time LangGraph multi-tier intelligence on every sales conversation",
      icon: <Zap className="w-5 h-5" />
    },
    { 
      text: "Observable execution paths with cost tracking and conditional routing",
      icon: <Activity className="w-5 h-5" />
    },
    { 
      text: "Multi-tier routing across Gemini and Mistral for optimal quality and cost",
      icon: <DollarSign className="w-5 h-5" />
    },
    { 
      text: "Actionable insights delivered within minutes of call completion",
      icon: <Briefcase className="w-5 h-5" />
    }
  ]

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <>
      <UniversalHeader />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6">

          {/* Back Navigation */}
          <Link 
            href="/consulting-analyzer"
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Sales Call Analyzer Overview</span>
          </Link>

          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-6">
              <BookOpen className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-white mb-4">
              Sales Call Analyzer
              <span className="block text-3xl mt-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Documentation
              </span>
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Complete guide to implementing LangGraph-powered sales intelligence in your workflow
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
                <div className="text-sm text-slate-400 mt-1">Quick setup guide</div>
              </button>
              <button
                onClick={() => toggleSection('architecture')}
                className="text-left px-4 py-3 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-all"
              >
                <div className="text-purple-400 font-medium">Architecture</div>
                <div className="text-sm text-slate-400 mt-1">LangGraph system</div>
              </button>
              <button
                onClick={() => toggleSection('transcriptFormat')}
                className="text-left px-4 py-3 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-all"
              >
                <div className="text-green-400 font-medium">Transcript Format</div>
                <div className="text-sm text-slate-400 mt-1">Input requirements</div>
              </button>
              <button
                onClick={() => toggleSection('bestPractices')}
                className="text-left px-4 py-3 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-all"
              >
                <div className="text-orange-400 font-medium">Best Practices</div>
                <div className="text-sm text-slate-400 mt-1">Maximize value</div>
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
                  <p className="text-slate-400 mt-1">Set up Sales Call Analyzer in minutes</p>
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
                <div className="prose prose-invert max-w-none">
                  <h3 className="text-xl font-semibold text-white mb-4">Overview</h3>
                  <p className="text-slate-300">
                    Sales Call Analyzer uses a sophisticated LangGraph architecture to extract actionable intelligence 
                    from sales conversations. The system employs multi-tier AI routing to optimize for both quality 
                    and cost, using Gemini for complex reasoning and Mistral for extraction tasks.
                  </p>
                </div>

                <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
                  <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    What You'll Need
                  </h4>
                  <ul className="space-y-2 text-slate-300">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span>Sales call transcripts (plain text or structured format)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span>API access credentials (contact sales for access)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span>Understanding of your sales process and key metrics</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span>Integration endpoint (webhook URL or API consumer)</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-blue-400 mb-4 flex items-center gap-2">
                    <Lightbulb className="w-5 h-5" />
                    Quick Start: 3 Steps to Your First Analysis
                  </h4>
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                        1
                      </div>
                      <div>
                        <div className="font-semibold text-white mb-1">Prepare Your Transcript</div>
                        <p className="text-slate-300 text-sm">
                          Export your sales call as plain text. Include speaker labels, timestamps, 
                          and clear conversation flow for best results.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                        2
                      </div>
                      <div>
                        <div className="font-semibold text-white mb-1">Submit to API</div>
                        <p className="text-slate-300 text-sm">
                          Send your transcript to the analysis endpoint. The LangGraph system will 
                          automatically route through optimal AI tiers.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                        3
                      </div>
                      <div>
                        <div className="font-semibold text-white mb-1">Review Intelligence</div>
                        <p className="text-slate-300 text-sm">
                          Receive comprehensive analysis including pain points, opportunities, 
                          stakeholder mapping, and next steps within 2-3 minutes.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Link
                    href="/consulting-analyzer/demo"
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-all text-center"
                  >
                    Try Live Demo
                  </Link>
                  <button
                    onClick={() => toggleSection('transcriptFormat')}
                    className="flex-1 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg font-semibold transition-all text-center border border-white/20"
                  >
                    View Transcript Guide
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Architecture */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 mb-6 overflow-hidden">
            <button
              onClick={() => toggleSection('architecture')}
              className="w-full px-8 py-6 flex items-center justify-between hover:bg-white/5 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <GitBranch className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <h2 className="text-2xl font-bold text-white">LangGraph Architecture</h2>
                  <p className="text-slate-400 mt-1">Understanding the multi-tier intelligence system</p>
                </div>
              </div>
              {expandedSections.architecture ? (
                <ChevronUp className="w-6 h-6 text-slate-400" />
              ) : (
                <ChevronDown className="w-6 h-6 text-slate-400" />
              )}
            </button>

            {expandedSections.architecture && (
              <div className="px-8 pb-8 space-y-6">
                <div className="prose prose-invert max-w-none">
                  <p className="text-slate-300">
                    Sales Call Analyzer uses LangGraph to orchestrate a sophisticated multi-agent analysis pipeline. 
                    The system intelligently routes tasks across different AI models based on complexity, optimizing 
                    for both quality and cost.
                  </p>
                </div>

                <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
                  <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-purple-400" />
                    Analysis Pipeline Flow
                  </h4>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-green-500/20 border border-green-500/30 rounded-lg flex items-center justify-center">
                        <span className="text-green-400 font-bold">1</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h5 className="font-semibold text-white">Classification Node</h5>
                          <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded text-xs font-mono">
                            Tier 3: Gemini Flash
                          </span>
                        </div>
                        <p className="text-slate-300 text-sm">
                          Initial conversation analysis to identify company, industry, and conversation type. 
                          Uses efficient Gemini Flash for cost optimization.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-blue-500/20 border border-blue-500/30 rounded-lg flex items-center justify-center">
                        <span className="text-blue-400 font-bold">2</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h5 className="font-semibold text-white">Extraction Node</h5>
                          <span className="px-2 py-0.5 bg-purple-500/20 text-purple-400 rounded text-xs font-mono">
                            Tier 2: Mistral Large
                          </span>
                        </div>
                        <p className="text-slate-300 text-sm">
                          Structured data extraction including stakeholders, pain points, and key discussion topics. 
                          Mistral excels at precise information extraction.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-purple-500/20 border border-purple-500/30 rounded-lg flex items-center justify-center">
                        <span className="text-purple-400 font-bold">3</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h5 className="font-semibold text-white">Analysis Node</h5>
                          <span className="px-2 py-0.5 bg-red-500/20 text-red-400 rounded text-xs font-mono">
                            Tier 1: Gemini Pro
                          </span>
                        </div>
                        <p className="text-slate-300 text-sm">
                          Deep strategic analysis and opportunity identification. Gemini's advanced reasoning 
                          capabilities generate high-value insights and recommendations.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-yellow-500/20 border border-yellow-500/30 rounded-lg flex items-center justify-center">
                        <span className="text-yellow-400 font-bold">4</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h5 className="font-semibold text-white">Synthesis Node</h5>
                          <span className="px-2 py-0.5 bg-purple-500/20 text-purple-400 rounded text-xs font-mono">
                            Tier 2: Mistral Large
                          </span>
                        </div>
                        <p className="text-slate-300 text-sm">
                          Combines all analysis into coherent, actionable recommendations with clear next steps 
                          and prioritization.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-orange-500/20 border border-orange-500/30 rounded-lg flex items-center justify-center">
                        <span className="text-orange-400 font-bold">5</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h5 className="font-semibold text-white">Validation Node</h5>
                          <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded text-xs font-mono">
                            Tier 3: Gemini Flash
                          </span>
                        </div>
                        <p className="text-slate-300 text-sm">
                          Final quality check to ensure completeness, accuracy, and actionability of all outputs. 
                          Flags any gaps or inconsistencies.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-purple-400 mb-4 flex items-center gap-2">
                    <DollarSign className="w-5 h-5" />
                    Multi-Tier Cost Optimization
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-slate-800/50 rounded-lg p-4">
                      <div className="text-red-400 font-bold text-lg mb-1">Tier 1: Gemini Pro</div>
                      <div className="text-slate-400 text-sm mb-2">$0.025 / 1K tokens</div>
                      <div className="text-slate-300 text-xs">
                        Complex reasoning, strategic analysis, high-value insights
                      </div>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-4">
                      <div className="text-purple-400 font-bold text-lg mb-1">Tier 2: Mistral Large</div>
                      <div className="text-slate-400 text-sm mb-2">$0.012 / 1K tokens</div>
                      <div className="text-slate-300 text-xs">
                        Data extraction, synthesis, structured outputs
                      </div>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-4">
                      <div className="text-blue-400 font-bold text-lg mb-1">Tier 3: Gemini Flash</div>
                      <div className="text-slate-400 text-sm mb-2">$0.001 / 1K tokens</div>
                      <div className="text-slate-300 text-xs">
                        Classification, validation, simple tasks
                      </div>
                    </div>
                  </div>
                  <p className="text-slate-300 text-sm mt-4">
                    Typical analysis costs: <span className="text-green-400 font-semibold">$0.08 - $0.25</span> per 
                    transcript, depending on length and complexity.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Transcript Format */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 mb-6 overflow-hidden">
            <button
              onClick={() => toggleSection('transcriptFormat')}
              className="w-full px-8 py-6 flex items-center justify-between hover:bg-white/5 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <h2 className="text-2xl font-bold text-white">Transcript Format Guidelines</h2>
                  <p className="text-slate-400 mt-1">Best practices for optimal analysis results</p>
                </div>
              </div>
              {expandedSections.transcriptFormat ? (
                <ChevronUp className="w-6 h-6 text-slate-400" />
              ) : (
                <ChevronDown className="w-6 h-6 text-slate-400" />
              )}
            </button>

            {expandedSections.transcriptFormat && (
              <div className="px-8 pb-8 space-y-6">
                <div className="prose prose-invert max-w-none">
                  <p className="text-slate-300">
                    While Sales Call Analyzer can process various transcript formats, following these guidelines 
                    will significantly improve analysis quality and accuracy.
                  </p>
                </div>

                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-green-400 mb-4 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    Recommended Format
                  </h4>
                  
                  <div className="bg-slate-900 rounded-lg p-4 font-mono text-sm mb-4">
                    <div className="text-slate-400 mb-2">// Example transcript structure</div>
                    <div className="text-slate-300">
                      <div className="text-blue-400">Sales Call with [Company Name]</div>
                      <div className="text-slate-500">Date: January 15, 2025</div>
                      <div className="text-slate-500">Duration: 45 minutes</div>
                      <div className="text-slate-500 mt-2">Participants:</div>
                      <div className="text-slate-500">- Sarah Chen, Chief Information Officer</div>
                      <div className="text-slate-500">- Michael Rodriguez, VP of Operations</div>
                      <div className="mt-2 text-purple-400">[00:00] Introduction & Context</div>
                      <div className="mt-1 text-slate-300">Sarah Chen: Thanks for coming in today...</div>
                    </div>
                  </div>

                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-300">
                        <strong className="text-white">Header Information:</strong> Include company name, date, 
                        duration, and list of participants with titles
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-300">
                        <strong className="text-white">Speaker Labels:</strong> Use "Speaker Name:" format at the 
                        start of each statement
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-300">
                        <strong className="text-white">Section Headers:</strong> Optional timestamps and topic headers 
                        help organize conversation flow
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-300">
                        <strong className="text-white">Context Preservation:</strong> Include small talk, concerns, 
                        and off-topic discussions - they reveal valuable insights
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
                  <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <Target className="w-5 h-5 text-yellow-400" />
                    Key Information to Include
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-300">Explicit pain points and challenges mentioned</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-300">Stakeholder names, titles, and roles</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-300">Specific timeline pressure (dates, deadlines)</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-300">Budget information (approved amounts, ranges)</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-300">Competitive context (competitors mentioned)</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-300">Technical requirements and constraints</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-300">Decision-making process and criteria</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-300">Concerns about past vendor failures</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-yellow-400 mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    Common Issues to Avoid
                  </h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-300">
                        <strong className="text-white">Missing speaker identification:</strong> Unlabeled dialogue 
                        makes stakeholder mapping impossible
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-300">
                        <strong className="text-white">Over-summarization:</strong> Don't condense too much - 
                        natural conversation flow reveals subtle insights
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-300">
                        <strong className="text-white">Removing context:</strong> Small talk and tangents often 
                        contain valuable relationship and priority signals
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-300">
                        <strong className="text-white">Incomplete transcripts:</strong> Ensure the entire 
                        conversation is captured, especially objections and concerns
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Analysis Output */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 mb-6 overflow-hidden">
            <button
              onClick={() => toggleSection('analysisOutput')}
              className="w-full px-8 py-6 flex items-center justify-between hover:bg-white/5 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <h2 className="text-2xl font-bold text-white">Analysis Output Structure</h2>
                  <p className="text-slate-400 mt-1">Understanding what you'll receive from the API</p>
                </div>
              </div>
              {expandedSections.analysisOutput ? (
                <ChevronUp className="w-6 h-6 text-slate-400" />
              ) : (
                <ChevronDown className="w-6 h-6 text-slate-400" />
              )}
            </button>

            {expandedSections.analysisOutput && (
              <div className="px-8 pb-8 space-y-6">
                <div className="prose prose-invert max-w-none">
                  <p className="text-slate-300">
                    Each analysis returns a comprehensive JSON object containing multiple intelligence dimensions, 
                    metadata about the LangGraph execution path, and cost tracking information.
                  </p>
                </div>

                <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
                  <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <Code className="w-5 h-5 text-orange-400" />
                    Response Structure
                  </h4>
                  
                  <div className="bg-slate-900 rounded-lg p-4 font-mono text-xs overflow-x-auto">
                    <pre className="text-slate-300">
{`{
  "company": "HealthWise Regional Hospital System",
  "industry": "Healthcare",
  
  "pain_points": [
    {
      "title": "System Integration Crisis",
      "description": "Three incompatible EHR systems...",
      "severity": "critical",
      "urgency": "high",
      "business_impact": "3-4 hours per shift per employee...",
      "evidence": ["Quote from transcript..."]
    }
  ],
  
  "opportunities": [
    {
      "title": "Unified Data Platform Implementation",
      "description": "Consolidate three EHR systems...",
      "value": "$2.8M annual savings potential",
      "confidence": "high",
      "timeline": "6-9 months implementation",
      "success_factors": [...]
    }
  ],
  
  "stakeholders": [
    {
      "name": "Sarah Chen",
      "title": "Chief Information Officer",
      "role": "Champion",
      "influence": "high",
      "concerns": ["Budget constraints", "Timeline pressure"],
      "priorities": ["Patient safety", "Staff retention"]
    }
  ],
  
  "next_steps": [
    {
      "action": "Schedule technical architecture review",
      "priority": "immediate",
      "owner": "Sales Engineer",
      "timeline": "Within 48 hours",
      "rationale": "Technical validation required before budget approval"
    }
  ],
  
  "metadata": {
    "graph_path": ["classify", "extract", "analyze", "synthesize", "validate"],
    "tiers_used": ["Gemini Flash", "Mistral", "Gemini Pro", "Mistral", "Gemini Flash"],
    "total_time": 127.3,
    "total_cost": 0.1847,
    "classification": {
      "confidence": 0.95,
      "reasoning": "Clear enterprise healthcare context..."
    }
  }
}`}
                    </pre>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6">
                    <h5 className="font-semibold text-red-400 mb-3 flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5" />
                      Pain Points Analysis
                    </h5>
                    <div className="text-sm text-slate-300 space-y-2">
                      <div>• <strong>Title:</strong> Clear problem statement</div>
                      <div>• <strong>Severity:</strong> Critical / High / Medium / Low</div>
                      <div>• <strong>Business Impact:</strong> Quantified consequences</div>
                      <div>• <strong>Evidence:</strong> Direct quotes from transcript</div>
                    </div>
                  </div>

                  <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-6">
                    <h5 className="font-semibold text-green-400 mb-3 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      Strategic Opportunities
                    </h5>
                    <div className="text-sm text-slate-300 space-y-2">
                      <div>• <strong>Value:</strong> Financial impact estimate</div>
                      <div>• <strong>Confidence:</strong> High / Medium / Low</div>
                      <div>• <strong>Timeline:</strong> Implementation duration</div>
                      <div>• <strong>Success Factors:</strong> Key requirements</div>
                    </div>
                  </div>

                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-6">
                    <h5 className="font-semibold text-blue-400 mb-3 flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      Stakeholder Mapping
                    </h5>
                    <div className="text-sm text-slate-300 space-y-2">
                      <div>• <strong>Role:</strong> Champion / Influencer / Blocker / User</div>
                      <div>• <strong>Influence:</strong> High / Medium / Low</div>
                      <div>• <strong>Concerns:</strong> Specific objections or worries</div>
                      <div>• <strong>Priorities:</strong> What matters most to them</div>
                    </div>
                  </div>

                  <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-6">
                    <h5 className="font-semibold text-purple-400 mb-3 flex items-center gap-2">
                      <Target className="w-5 h-5" />
                      Next Steps
                    </h5>
                    <div className="text-sm text-slate-300 space-y-2">
                      <div>• <strong>Priority:</strong> Immediate / High / Medium / Low</div>
                      <div>• <strong>Owner:</strong> Who should execute</div>
                      <div>• <strong>Timeline:</strong> When to complete</div>
                      <div>• <strong>Rationale:</strong> Why this action matters</div>
                    </div>
                  </div>
                </div>

                <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-orange-400 mb-4 flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    Metadata & Observability
                  </h4>
                  <p className="text-slate-300 text-sm mb-4">
                    Every response includes detailed execution metadata for full transparency:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-300">
                        <strong className="text-white">Graph Path:</strong> Exact sequence of nodes executed
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-300">
                        <strong className="text-white">Tiers Used:</strong> Which AI models processed each step
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-300">
                        <strong className="text-white">Total Time:</strong> Processing duration in seconds
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-300">
                        <strong className="text-white">Total Cost:</strong> Exact API costs for transparency
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Best Practices */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 mb-6 overflow-hidden">
            <button
              onClick={() => toggleSection('bestPractices')}
              className="w-full px-8 py-6 flex items-center justify-between hover:bg-white/5 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center">
                  <Lightbulb className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <h2 className="text-2xl font-bold text-white">Best Practices</h2>
                  <p className="text-slate-400 mt-1">Maximize value from your analyses</p>
                </div>
              </div>
              {expandedSections.bestPractices ? (
                <ChevronUp className="w-6 h-6 text-slate-400" />
              ) : (
                <ChevronDown className="w-6 h-6 text-slate-400" />
              )}
            </button>

            {expandedSections.bestPractices && (
              <div className="px-8 pb-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-green-400 mb-4 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5" />
                      Do This
                    </h4>
                    <ul className="space-y-3 text-sm text-slate-300">
                      <li className="flex items-start gap-2">
                        <span className="text-green-400 mt-1">✓</span>
                        <span>Analyze calls within 24 hours while details are fresh</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-400 mt-1">✓</span>
                        <span>Share results with entire deal team for alignment</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-400 mt-1">✓</span>
                        <span>Use insights to customize follow-up communications</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-400 mt-1">✓</span>
                        <span>Track which pain points lead to closed deals</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-400 mt-1">✓</span>
                        <span>Compare multiple calls from same company to spot patterns</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-400 mt-1">✓</span>
                        <span>Use stakeholder mapping to plan multi-threading strategy</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-red-400 mb-4 flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5" />
                      Avoid This
                    </h4>
                    <ul className="space-y-3 text-sm text-slate-300">
                      <li className="flex items-start gap-2">
                        <span className="text-red-400 mt-1">✗</span>
                        <span>Don't analyze transcripts longer than 90 minutes (split them)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-400 mt-1">✗</span>
                        <span>Don't skip discovery calls - they have the most valuable insights</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-400 mt-1">✗</span>
                        <span>Don't ignore low-confidence opportunities - investigate further</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-400 mt-1">✗</span>
                        <span>Don't treat AI insights as gospel - validate with human judgment</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-400 mt-1">✗</span>
                        <span>Don't share raw transcripts externally without consent</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-400 mt-1">✗</span>
                        <span>Don't wait for perfect transcripts - analyze what you have</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-blue-400 mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Advanced Workflows
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <div className="font-semibold text-white mb-2">1. Sequential Analysis Tracking</div>
                      <p className="text-slate-300 text-sm">
                        Analyze every call in a deal progression to track how pain points evolve, stakeholder 
                        concerns shift, and opportunities clarify over time. This reveals buying committee dynamics 
                        and negotiation patterns.
                      </p>
                    </div>
                    <div>
                      <div className="font-semibold text-white mb-2">2. Competitive Intelligence Aggregation</div>
                      <p className="text-slate-300 text-sm">
                        Aggregate analyses across multiple prospects mentioning the same competitor. Identify common 
                        competitive objections, successful counter-positioning, and gaps in competitor offerings.
                      </p>
                    </div>
                    <div>
                      <div className="font-semibold text-white mb-2">3. Win/Loss Pattern Recognition</div>
                      <p className="text-slate-300 text-sm">
                        Compare analyses from won vs. lost deals. Identify which pain point combinations, stakeholder 
                        configurations, and opportunity types correlate with successful closes vs. losses.
                      </p>
                    </div>
                    <div>
                      <div className="font-semibold text-white mb-2">4. Sales Playbook Development</div>
                      <p className="text-slate-300 text-sm">
                        Extract successful talk tracks, objection handling patterns, and discovery questions from 
                        high-performing calls. Build data-driven playbooks based on what actually works in real conversations.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Security */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 mb-6 overflow-hidden">
            <button
              onClick={() => toggleSection('security')}
              className="w-full px-8 py-6 flex items-center justify-between hover:bg-white/5 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <h2 className="text-2xl font-bold text-white">Security & Privacy</h2>
                  <p className="text-slate-400 mt-1">How we protect your sensitive data</p>
                </div>
              </div>
              {expandedSections.security ? (
                <ChevronUp className="w-6 h-6 text-slate-400" />
              ) : (
                <ChevronDown className="w-6 h-6 text-slate-400" />
              )}
            </button>

            {expandedSections.security && (
              <div className="px-8 pb-8 space-y-6">
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-red-400 mb-4 flex items-center gap-2">
                    <Lock className="w-5 h-5" />
                    Data Protection Guarantees
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-white mb-1">Zero Data Retention</div>
                        <div className="text-slate-300">
                          Transcripts are processed in real-time and never stored on our servers
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-white mb-1">End-to-End Encryption</div>
                        <div className="text-slate-300">
                          All data in transit protected by TLS 1.3 encryption
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-white mb-1">No AI Training</div>
                        <div className="text-slate-300">
                          Your transcripts are never used to train AI models (ours or third-party)
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-white mb-1">SOC 2 Type II Certified</div>
                        <div className="text-slate-300">
                          Audited annually for security, availability, and confidentiality
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
                  <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <Database className="w-5 h-5 text-blue-400" />
                    What We Store (Results Only)
                  </h4>
                  <div className="space-y-3 text-sm text-slate-300">
                    <p>
                      While transcripts are never stored, analysis results are cached for 30 days to enable:
                    </p>
                    <ul className="space-y-2 ml-6">
                      <li>• Result retrieval without re-analyzing</li>
                      <li>• Historical comparison across calls</li>
                      <li>• Trend analysis and pattern detection</li>
                      <li>• Cost optimization (avoid duplicate analyses)</li>
                    </ul>
                    <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded">
                      <div className="font-semibold text-blue-400 mb-2">Enterprise Option Available:</div>
                      <div className="text-slate-300">
                        Zero retention mode - Results purged immediately after delivery. 
                        <Link href="#contact" className="text-blue-400 hover:text-blue-300 ml-1">
                          Contact sales for details →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
                  <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <Globe className="w-5 h-5 text-purple-400" />
                    Compliance & Certifications
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-white/5 rounded-lg">
                      <div className="text-2xl font-bold text-green-400 mb-1">SOC 2</div>
                      <div className="text-xs text-slate-400">Type II</div>
                    </div>
                    <div className="text-center p-4 bg-white/5 rounded-lg">
                      <div className="text-2xl font-bold text-blue-400 mb-1">GDPR</div>
                      <div className="text-xs text-slate-400">Compliant</div>
                    </div>
                    <div className="text-center p-4 bg-white/5 rounded-lg">
                      <div className="text-2xl font-bold text-purple-400 mb-1">CCPA</div>
                      <div className="text-xs text-slate-400">Compliant</div>
                    </div>
                    <div className="text-center p-4 bg-white/5 rounded-lg">
                      <div className="text-2xl font-bold text-orange-400 mb-1">HIPAA</div>
                      <div className="text-xs text-slate-400">Available</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Custom Consulting CTA */}
          <div id="custom-consulting" className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 rounded-xl p-8 border border-white/20 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-6">
              <Briefcase className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Need Custom Analysis Solutions?</h2>
            <p className="text-white text-lg mb-6 max-w-2xl mx-auto">
              We build custom LangGraph intelligence systems tailored to your specific sales process, 
              industry requirements, and integration needs.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Custom agent workflows</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>CRM integrations</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Industry-specific models</span>
              </div>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-lg font-semibold transition-all text-lg cursor-pointer"
            >
              Schedule Consultation
            </button>
          </div>

        </div>
      </div>

      {/* Unified Footer */}
      <UnifiedFooter productBranding={salesAnalyzerFooterConfig} />

      {/* Contact Modal */}
      <ContactModal 
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        appName="Sales Call Analyzer Documentation"
        appIcon={<Briefcase className="w-8 h-8" />}
        benefits={salesAnalyzerBenefits}
        ctaText="Schedule Consultation"
      />
    </>
  )
}