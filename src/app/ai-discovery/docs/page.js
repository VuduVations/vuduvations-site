// src/app/ai-discovery/docs/page.js

'use client'

import { useState } from 'react'
import Link from 'next/link'
import UniversalHeader from '@/components/UniversalHeader'
import UnifiedFooter from '@/components/UnifiedFooter'
import ContactModal from '@/components/ContactModal'
import { 
  Brain, Target, TrendingUp, BarChart3, Sparkles, ArrowRight, 
  Zap, Award, Clock, AlertTriangle, Users, DollarSign,
  CheckCircle, Play, FileText, ChevronDown, ChevronUp, Code, 
  BookOpen, Lightbulb, Shield, Layers, Database, Activity
} from 'lucide-react'

// AI Discovery Footer Configuration
const aiDiscoveryFooterConfig = {
  name: "AI Discovery Platform",
  icon: Brain,
  tagline: "Strategic AI readiness assessments using consulting-grade methodology. Know what's possible before you build.",
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

export default function AIDiscoveryDocs() {
  const [showModal, setShowModal] = useState(false)
  const [expandedSections, setExpandedSections] = useState({
    gettingStarted: true,
    sixAgents: false,
    methodology: false,
    deliverables: false,
    industries: false,
    bestPractices: false,
    comparison: false
  })

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
      text: "Industry-specific insights from consulting-grade best practices",
      icon: <Brain className="w-5 h-5 text-emerald-400" />
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
      
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6">

          {/* Back Navigation */}
          <Link 
            href="/ai-discovery"
            className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors mb-6"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            <span>Back to AI Discovery Overview</span>
          </Link>

          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl mb-6">
              <BookOpen className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-white mb-4">
              AI Discovery Platform
              <span className="block text-3xl mt-2 bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Documentation
              </span>
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Complete guide to understanding how our 6-agent system delivers consulting-grade strategic intelligence
            </p>
          </div>

          {/* Quick Navigation */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 mb-8">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-emerald-400" />
              Quick Navigation
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <button
                onClick={() => toggleSection('gettingStarted')}
                className="text-left px-4 py-3 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-all"
              >
                <div className="text-emerald-400 font-medium">Getting Started</div>
                <div className="text-sm text-slate-400 mt-1">Quick overview</div>
              </button>
              <button
                onClick={() => toggleSection('sixAgents')}
                className="text-left px-4 py-3 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-all"
              >
                <div className="text-teal-400 font-medium">6-Agent System</div>
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
                onClick={() => toggleSection('industries')}
                className="text-left px-4 py-3 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-all"
              >
                <div className="text-yellow-400 font-medium">Industries</div>
                <div className="text-sm text-slate-400 mt-1">Sector expertise</div>
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
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <h2 className="text-2xl font-bold text-white">Getting Started</h2>
                  <p className="text-slate-400 mt-1">Understand what AI Discovery can do for you</p>
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
                  <h3 className="text-xl font-semibold text-white mb-4">What is AI Discovery?</h3>
                  <p className="text-slate-300">
                    AI Discovery Platform is a strategic consulting intelligence system that analyzes your business 
                    to identify AI opportunities, calculate ROI, assess readiness, and build implementation roadmaps—all 
                    using consulting-grade methodologies and frameworks, but delivered in hours instead of weeks.
                  </p>
                </div>

                <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
                  <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                    What You Need to Get Started
                  </h4>
                  <ul className="space-y-2 text-slate-300">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>Basic company information (industry, revenue, size)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>Key business challenges or pain points you're experiencing</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>Understanding of your current tech stack and data landscape</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>Stakeholder availability for clarification questions</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-emerald-400 mb-4 flex items-center gap-2">
                    <Lightbulb className="w-5 h-5" />
                    Typical Engagement Timeline
                  </h4>
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold">
                        1
                      </div>
                      <div>
                        <div className="font-semibold text-white mb-1">Discovery Call (1 hour)</div>
                        <p className="text-slate-300 text-sm">
                          We learn about your business, challenges, and strategic objectives
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold">
                        2
                      </div>
                      <div>
                        <div className="font-semibold text-white mb-1">Analysis Phase (2-4 hours)</div>
                        <p className="text-slate-300 text-sm">
                          Our 6-agent system analyzes your business across all dimensions
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold">
                        3
                      </div>
                      <div>
                        <div className="font-semibold text-white mb-1">Results Delivery (Same Day)</div>
                        <p className="text-slate-300 text-sm">
                          Receive comprehensive report with findings, ROI projections, and roadmap
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold">
                        4
                      </div>
                      <div>
                        <div className="font-semibold text-white mb-1">Executive Briefing (1 hour)</div>
                        <p className="text-slate-300 text-sm">
                          Walk through findings with your leadership team, answer questions
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Link
                    href="/ai-discovery/demos"
                    className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-6 py-3 rounded-lg font-semibold transition-all text-center"
                  >
                    View Sample Reports
                  </Link>
                  <button
                    onClick={() => setShowModal(true)}
                    className="flex-1 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg font-semibold transition-all text-center border border-white/20"
                  >
                    Schedule Discovery Call
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* 6-Agent System */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 mb-6 overflow-hidden">
            <button
              onClick={() => toggleSection('sixAgents')}
              className="w-full px-8 py-6 flex items-center justify-between hover:bg-white/5 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <h2 className="text-2xl font-bold text-white">The 6-Agent System</h2>
                  <p className="text-slate-400 mt-1">How our multi-agent intelligence works</p>
                </div>
              </div>
              {expandedSections.sixAgents ? (
                <ChevronUp className="w-6 h-6 text-slate-400" />
              ) : (
                <ChevronDown className="w-6 h-6 text-slate-400" />
              )}
            </button>

            {expandedSections.sixAgents && (
              <div className="px-8 pb-8 space-y-6">
                <div className="prose prose-invert max-w-none">
                  <p className="text-slate-300">
                    Each agent specializes in a specific dimension of AI readiness. They work in parallel and 
                    synthesize their findings into a comprehensive strategic intelligence package.
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Agent 1 */}
                  <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                        <Target className="w-6 h-6 text-emerald-400" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-white">1. Discovery Agent</h4>
                        <p className="text-sm text-slate-400">Business Model & Pain Point Analysis</p>
                      </div>
                    </div>
                    <div className="text-slate-300 text-sm mb-3">
                      <strong className="text-white">What it does:</strong> Analyzes your business model, revenue streams, 
                      operational workflows, and identifies process inefficiencies where AI can create value.
                    </div>
                    <div className="text-slate-300 text-sm">
                      <strong className="text-white">Key outputs:</strong> Pain point mapping, process bottleneck identification, 
                      opportunity area prioritization
                    </div>
                  </div>

                  {/* Agent 2 */}
                  <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-teal-500/20 rounded-lg flex items-center justify-center">
                        <Shield className="w-6 h-6 text-teal-400" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-white">2. Assessment Agent</h4>
                        <p className="text-sm text-slate-400">Readiness & Capability Evaluation</p>
                      </div>
                    </div>
                    <div className="text-slate-300 text-sm mb-3">
                      <strong className="text-white">What it does:</strong> Evaluates data quality and availability, 
                      technical infrastructure maturity, team capabilities, and organizational change readiness.
                    </div>
                    <div className="text-slate-300 text-sm">
                      <strong className="text-white">Key outputs:</strong> Readiness scores across 8 dimensions, 
                      capability gap analysis, resource requirement estimates
                    </div>
                  </div>

                  {/* Agent 3 */}
                  <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                        <DollarSign className="w-6 h-6 text-green-400" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-white">3. ROI Agent</h4>
                        <p className="text-sm text-slate-400">Financial Impact Modeling</p>
                      </div>
                    </div>
                    <div className="text-slate-300 text-sm mb-3">
                      <strong className="text-white">What it does:</strong> Calculates implementation costs, 
                      projects financial benefits, estimates timeline to value, and computes payback periods.
                    </div>
                    <div className="text-slate-300 text-sm">
                      <strong className="text-white">Key outputs:</strong> ROI projections per use case, 
                      cost-benefit analysis, NPV calculations, sensitivity analysis
                    </div>
                  </div>

                  {/* Agent 4 */}
                  <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                        <Layers className="w-6 h-6 text-blue-400" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-white">4. Roadmap Agent</h4>
                        <p className="text-sm text-slate-400">Implementation Planning</p>
                      </div>
                    </div>
                    <div className="text-slate-300 text-sm mb-3">
                      <strong className="text-white">What it does:</strong> Builds phased implementation plans, 
                      identifies quick wins vs long-term plays, maps dependencies, and allocates resources.
                    </div>
                    <div className="text-slate-300 text-sm">
                      <strong className="text-white">Key outputs:</strong> 12-24 month roadmap, milestone definitions, 
                      resource allocation plans, success metrics
                    </div>
                  </div>

                  {/* Agent 5 */}
                  <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                        <AlertTriangle className="w-6 h-6 text-yellow-400" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-white">5. Risk Agent</h4>
                        <p className="text-sm text-slate-400">Risk Identification & Mitigation</p>
                      </div>
                    </div>
                    <div className="text-slate-300 text-sm mb-3">
                      <strong className="text-white">What it does:</strong> Identifies technical, organizational, 
                      and market risks, assesses probability and impact, develops mitigation strategies.
                    </div>
                    <div className="text-slate-300 text-sm">
                      <strong className="text-white">Key outputs:</strong> Risk matrix, mitigation plans, 
                      contingency strategies, monitoring frameworks
                    </div>
                  </div>

                  {/* Agent 6 */}
                  <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                        <Activity className="w-6 h-6 text-purple-400" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-white">6. Implementation Agent</h4>
                        <p className="text-sm text-slate-400">Tactical Execution Guidance</p>
                      </div>
                    </div>
                    <div className="text-slate-300 text-sm mb-3">
                      <strong className="text-white">What it does:</strong> Provides vendor recommendations, 
                      build vs buy analysis, team structure suggestions, and KPI definitions.
                    </div>
                    <div className="text-slate-300 text-sm">
                      <strong className="text-white">Key outputs:</strong> Vendor shortlists, technology stack recommendations, 
                      org design proposals, success metrics frameworks
                    </div>
                  </div>
                </div>

                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-emerald-400 mb-3 flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    How They Work Together
                  </h4>
                  <p className="text-slate-300 text-sm">
                    All six agents run in parallel, analyzing your business from their specialized perspectives. 
                    Their findings are synthesized into a cohesive strategic intelligence package that addresses 
                    every dimension of AI readiness—from business case to technical implementation to organizational change.
                  </p>
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
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <h2 className="text-2xl font-bold text-white">What You Receive</h2>
                  <p className="text-slate-400 mt-1">Executive decision package deliverables</p>
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
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
                    <h4 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-emerald-400" />
                      Executive Summary
                    </h4>
                    <ul className="space-y-2 text-sm text-slate-300">
                      <li>• Key findings and strategic recommendations</li>
                      <li>• Total addressable opportunity quantified</li>
                      <li>• Investment requirements and ROI projections</li>
                      <li>• Timeline to first value realization</li>
                    </ul>
                  </div>

                  <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
                    <h4 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                      <Target className="w-5 h-5 text-teal-400" />
                      Use Case Portfolio
                    </h4>
                    <ul className="space-y-2 text-sm text-slate-300">
                      <li>• Typically 7-12 prioritized AI opportunities</li>
                      <li>• Detailed business case for each</li>
                      <li>• Effort vs impact matrix visualization</li>
                      <li>• Quick win identification</li>
                    </ul>
                  </div>

                  <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
                    <h4 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                      <Shield className="w-5 h-5 text-blue-400" />
                      Readiness Assessment
                    </h4>
                    <ul className="space-y-2 text-sm text-slate-300">
                      <li>• Up to 8-dimension maturity scoring</li>
                      <li>• Gap analysis and recommendations</li>
                      <li>• Data quality and availability audit</li>
                      <li>• Technical infrastructure evaluation</li>
                    </ul>
                  </div>

                  <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
                    <h4 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                      <Layers className="w-5 h-5 text-green-400" />
                      Implementation Roadmap
                    </h4>
                    <ul className="space-y-2 text-sm text-slate-300">
                      <li>• 12-24 month phased rollout plan</li>
                      <li>• Milestone definitions and KPIs</li>
                      <li>• Resource allocation recommendations</li>
                      <li>• Dependency mapping</li>
                    </ul>
                  </div>

                  <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
                    <h4 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-yellow-400" />
                      Risk Analysis
                    </h4>
                    <ul className="space-y-2 text-sm text-slate-300">
                      <li>• Risk matrix with probability/impact</li>
                      <li>• Mitigation strategies per risk</li>
                      <li>• Contingency planning guidance</li>
                      <li>• Early warning indicators</li>
                    </ul>
                  </div>

                  <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
                    <h4 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                      <Activity className="w-5 h-5 text-purple-400" />
                      Vendor Recommendations
                    </h4>
                    <ul className="space-y-2 text-sm text-slate-300">
                      <li>• Technology stack suggestions</li>
                      <li>• Build vs buy analysis</li>
                      <li>• Vendor shortlists with comparisons</li>
                      <li>• Integration considerations</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-6">
                  <div className="flex items-start gap-4">
                    <CheckCircle className="w-8 h-8 text-green-400 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="text-lg font-bold text-white mb-2">Presentation-Ready Format</h4>
                      <p className="text-slate-300 text-sm">
                        All deliverables are provided in both detailed technical format and executive presentation 
                        slides. You can present findings directly to your board or leadership team without additional preparation.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Industries */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 mb-6 overflow-hidden">
            <button
              onClick={() => toggleSection('industries')}
              className="w-full px-8 py-6 flex items-center justify-between hover:bg-white/5 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center">
                  <Database className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <h2 className="text-2xl font-bold text-white">Industry Expertise</h2>
                  <p className="text-slate-400 mt-1">Sector-specific AI opportunity knowledge</p>
                </div>
              </div>
              {expandedSections.industries ? (
                <ChevronUp className="w-6 h-6 text-slate-400" />
              ) : (
                <ChevronDown className="w-6 h-6 text-slate-400" />
              )}
            </button>

            {expandedSections.industries && (
              <div className="px-8 pb-8 space-y-6">
                <p className="text-slate-300">
                  Our 6-agent system is trained on industry-specific best practices and benchmarks. We understand 
                  the unique challenges, regulations, and opportunities in each sector.
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
                    <h4 className="text-lg font-bold text-emerald-400 mb-3">Manufacturing</h4>
                    <ul className="space-y-1 text-sm text-slate-300">
                      <li>• Predictive maintenance and downtime reduction</li>
                      <li>• Quality defect detection and prevention</li>
                      <li>• Supply chain optimization</li>
                      <li>• Production planning and scheduling</li>
                    </ul>
                    <Link href="/ai-discovery/manufacturing" className="text-emerald-400 text-sm mt-3 inline-flex items-center gap-1 hover:gap-2 transition-all">
                      View demo report <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>

                  <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
                    <h4 className="text-lg font-bold text-teal-400 mb-3">Healthcare</h4>
                    <ul className="space-y-1 text-sm text-slate-300">
                      <li>• Patient flow and wait time optimization</li>
                      <li>• Staff scheduling and burnout reduction</li>
                      <li>• Billing error detection and prevention</li>
                      <li>• Clinical documentation automation</li>
                    </ul>
                    <Link href="/ai-discovery/healthcare" className="text-teal-400 text-sm mt-3 inline-flex items-center gap-1 hover:gap-2 transition-all">
                      View demo report <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>

                  <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
                    <h4 className="text-lg font-bold text-green-400 mb-3">Financial Services</h4>
                    <ul className="space-y-1 text-sm text-slate-300">
                      <li>• Loan processing time reduction</li>
                      <li>• Fraud detection and prevention</li>
                      <li>• Compliance reporting automation</li>
                      <li>• Customer service chatbot deployment</li>
                    </ul>
                    <Link href="/ai-discovery/fintech" className="text-green-400 text-sm mt-3 inline-flex items-center gap-1 hover:gap-2 transition-all">
                      View demo report <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>

                  <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
                    <h4 className="text-lg font-bold text-blue-400 mb-3">Retail & E-commerce</h4>
                    <ul className="space-y-1 text-sm text-slate-300">
                      <li>• Inventory optimization and demand forecasting</li>
                      <li>• Dynamic pricing strategies</li>
                      <li>• Customer service automation</li>
                      <li>• Cart abandonment reduction</li>
                    </ul>
                    <Link href="/ai-discovery/retail" className="text-blue-400 text-sm mt-3 inline-flex items-center gap-1 hover:gap-2 transition-all">
                      View demo report <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>

                  <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
                    <h4 className="text-lg font-bold text-purple-400 mb-3">SaaS & Technology</h4>
                    <ul className="space-y-1 text-sm text-slate-300">
                      <li>• Churn prediction and prevention</li>
                      <li>• Lead scoring and qualification</li>
                      <li>• Support ticket routing automation</li>
                      <li>• Feature usage analysis and optimization</li>
                    </ul>
                    <Link href="/ai-discovery/saas" className="text-purple-400 text-sm mt-3 inline-flex items-center gap-1 hover:gap-2 transition-all">
                      View demo report <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>

                  <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
                    <h4 className="text-lg font-bold text-yellow-400 mb-3">Logistics</h4>
                    <ul className="space-y-1 text-sm text-slate-300">
                      <li>• Route optimization and delivery time reduction</li>
                      <li>• Warehouse automation opportunities</li>
                      <li>• Invoice reconciliation automation</li>
                      <li>• Demand forecasting accuracy</li>
                    </ul>
                    <Link href="/ai-discovery/logistics" className="text-yellow-400 text-sm mt-3 inline-flex items-center gap-1 hover:gap-2 transition-all">
                      View demo report <ArrowRight className="w-4 h-4" />
                    </Link>
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
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Lightbulb className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <h2 className="text-2xl font-bold text-white">Best Practices</h2>
                  <p className="text-slate-400 mt-1">Maximize value from your AI discovery</p>
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
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-green-400 mb-4 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5" />
                      Do This
                    </h4>
                    <ul className="space-y-3 text-sm text-slate-300">
                      <li className="flex items-start gap-2">
                        <span className="text-green-400 mt-1">✓</span>
                        <span>Involve cross-functional stakeholders in the discovery call</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-400 mt-1">✓</span>
                        <span>Be transparent about current pain points and failed initiatives</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-400 mt-1">✓</span>
                        <span>Share data about processes, metrics, and system capabilities</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-400 mt-1">✓</span>
                        <span>Start with quick wins to build momentum and credibility</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-400 mt-1">✓</span>
                        <span>Use findings to secure executive buy-in and budget approval</span>
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
                        <span>Don't wait for perfect data—use what you have</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-400 mt-1">✗</span>
                        <span>Don't try to implement all recommendations simultaneously</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-400 mt-1">✗</span>
                        <span>Don't ignore organizational change management requirements</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-400 mt-1">✗</span>
                        <span>Don't skip the executive briefing—alignment is critical</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-400 mt-1">✗</span>
                        <span>Don't let the report sit—act on findings within 30 days</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Comparison */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 mb-6 overflow-hidden">
            <button
              onClick={() => toggleSection('comparison')}
              className="w-full px-8 py-6 flex items-center justify-between hover:bg-white/5 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <h2 className="text-2xl font-bold text-white">vs Traditional Consulting</h2>
                  <p className="text-slate-400 mt-1">How we compare to traditional consulting firms</p>
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
                        <th className="px-6 py-4 text-left text-sm font-semibold text-white">Factor</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-emerald-400">AI Discovery</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-400">Traditional Firms</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700">
                      <tr>
                        <td className="px-6 py-4 text-sm text-slate-300 font-medium">Delivery Time</td>
                        <td className="px-6 py-4 text-sm text-emerald-400 font-bold">2-6 hours</td>
                        <td className="px-6 py-4 text-sm text-slate-400">4-8 weeks</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-sm text-slate-300 font-medium">Cost</td>
                        <td className="px-6 py-4 text-sm text-emerald-400 font-bold">$15K-$50K</td>
                        <td className="px-6 py-4 text-sm text-slate-400">$150K-$500K</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-sm text-slate-300 font-medium">Revision Speed</td>
                        <td className="px-6 py-4 text-sm text-emerald-400 font-bold">Real-time</td>
                        <td className="px-6 py-4 text-sm text-slate-400">2-3 weeks</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-sm text-slate-300 font-medium">Methodology</td>
                        <td className="px-6 py-4 text-sm text-emerald-400 font-bold">Industry best practices</td>
                        <td className="px-6 py-4 text-sm text-slate-400">Proprietary frameworks</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-sm text-slate-300 font-medium">Scope</td>
                        <td className="px-6 py-4 text-sm text-emerald-400 font-bold">Unlimited iterations</td>
                        <td className="px-6 py-4 text-sm text-slate-400">Fixed scope</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-sm text-slate-300 font-medium">Analysis Depth</td>
                        <td className="px-6 py-4 text-sm text-emerald-400 font-bold">6 specialized agents</td>
                        <td className="px-6 py-4 text-slate-400">3-5 generalist consultants</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-blue-400 mb-3">The Best of Both Worlds</h4>
                  <p className="text-slate-300 text-sm">
                    We combine the strategic rigor and methodology of top-tier consulting firms with the speed, 
                    scalability, and cost-effectiveness of AI systems. You get consulting-grade strategic insights at a 
                    fraction of the time and cost.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Custom Consulting CTA */}
          <div id="custom-consulting" className="bg-gradient-to-br from-emerald-900/50 to-teal-900/50 rounded-xl p-8 border border-emerald-500/30 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl mb-6">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Discover Your AI Opportunities?</h2>
            <p className="text-white text-lg mb-6 max-w-2xl mx-auto">
              Get strategic intelligence from our 6-agent system. Know exactly what AI can do for your business 
              before you invest in development.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Same-day delivery</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Consulting-grade methodology</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Executive-ready reports</span>
              </div>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                console.log('CTA button clicked - opening modal');
                setShowModal(true);
              }}
              className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 py-4 rounded-lg font-semibold transition-all text-lg cursor-pointer"
            >
              Schedule Discovery Call
            </button>
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
    </>
  )
}