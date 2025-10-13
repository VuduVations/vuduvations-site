'use client'

import { useState } from 'react'
import { Briefcase, Brain, Zap, Shield, Clock, FileText, Download, Copy, AlertTriangle, TrendingUp, Target, Users, CheckCircle, DollarSign, BarChart3, Play, ChevronDown, ChevronUp } from 'lucide-react'

export default function ConsultingAnalyzer() {
  const [transcript, setTranscript] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResults, setAnalysisResults] = useState(null)
  const [expandedSections, setExpandedSections] = useState({
    transcript: false,
    painPoints: true,
    opportunities: true,
    sentiment: false,
    nextSteps: true
  })

  // API URL - will be replaced with environment variable in production
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://langgraph-analyzer-703153929469.us-central1.run.app'

  const sampleTranscripts = [
    {
      name: "Healthcare - HealthWise Hospital",
      text: `Sales Call with HealthWise Regional Hospital
Date: January 2025

Participants:
- Sarah Chen, CIO
- Michael Rodriguez, VP of Operations

Sarah: Thanks for coming in. We're really struggling with our patient data systems. We have three different EHR systems that don't talk to each other, and our staff is spending hours doing manual data entry.

Michael: It's worse than that. We're seeing medication errors because the pharmacy system isn't integrated with the main EHR. Last month we had two near-misses that could have been serious.

Sarah: All five of our regional hospitals plus 12 clinics are affected. We're talking about 2,500 staff members who are frustrated daily. Our patient satisfaction scores are dropping because wait times are up 40%.

Michael: And it's costing us. We estimate we're losing $2M annually in inefficiencies, plus the regulatory risk is keeping me up at night. We need a solution within the next quarter. Budget is around $150k for initial phase.`
    },
    {
      name: "Finance - Summit Advisors",
      text: `Discovery Call with Summit Financial Advisors
Date: January 2025

Participants:
- Jennifer Park, Chief Compliance Officer
- David Liu, Managing Partner

Jennifer: We're facing a critical compliance issue. The SEC is requiring full visibility into all advisor communications - texts, WhatsApp, Signal, everything. We have 90 days to implement a solution or face potential shutdown.

David: We tried implementing Smarsh last year. Spent $150K and it was a disaster. The advisors refused to use it because it was so clunky. We need something that actually works.

Jennifer: We manage $8B in assets with 5,000 clients. Our advisors are used to communicating freely with clients. They need a solution that doesn't slow them down but gives us the monitoring we need.

David: This is existential for us. Without compliance, we lose our license. We're looking at $2-4M budget to get this right. Timeline is tight - 90 days.`
    },
    {
      name: "Retail - StyleHub Fashion",
      text: `Strategy Session with StyleHub Fashion
Date: January 2025

Participants:
- Marcus Johnson, CEO
- Lisa Martinez, Chief Digital Officer

Marcus: Our in-store sales are down 32% over three years while our competitors are thriving. We have 85 stores but our online and offline experiences are completely disconnected.

Lisa: Last month we had a product go viral on TikTok. We had inventory in stores but couldn't fulfill online orders fast enough. Lost an estimated $300K in that moment alone.

Marcus: Our website converts at 0.8% while industry average is 2.5%. Customers come to stores, try things on, then go home and buy from Shein or Zara because our online experience is terrible.

Lisa: We're hemorrhaging $4M per quarter. We need a unified commerce platform where inventory, customer data, and fulfillment are all connected. Budget is $3-5M. We have 8 weeks before Black Friday planning starts.`
    }
  ]

  const loadSample = (sample) => {
    setTranscript(sample.text)
  }

  const analyzeTranscript = async () => {
    if (!transcript || transcript.length < 100) {
      alert('Please enter a transcript of at least 100 characters')
      return
    }

    setIsAnalyzing(true)
    setAnalysisResults(null)

    try {
      const response = await fetch(`${API_URL}/api/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ transcript })
      })

      if (!response.ok) {
        throw new Error(`Analysis failed: ${response.statusText}`)
      }

      const data = await response.json()
      setAnalysisResults(data)
      
      // Auto-expand all sections
      setExpandedSections({
        transcript: false,
        painPoints: true,
        opportunities: true,
        sentiment: true,
        nextSteps: true
      })

    } catch (error) {
      console.error('Analysis error:', error)
      alert(`Analysis failed: ${error.message}`)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const downloadReport = () => {
    if (!analysisResults) return

    const report = `
STRATEGIC CLIENT INQUIRY ANALYSIS
Generated: ${new Date().toLocaleString()}
Confidentiality: INTERNAL USE ONLY

==================================================
EXECUTIVE SUMMARY
==================================================

Company: ${analysisResults.company}
Industry: ${analysisResults.industry}

Overview:
${analysisResults.executive_summary.overview}

Critical Findings:
${analysisResults.executive_summary.critical_findings.map((f, i) => `${i + 1}. ${f}`).join('\n')}

Recommended Approach:
${analysisResults.executive_summary.recommended_approach}

==================================================
LANGGRAPH EXECUTION METADATA
==================================================

Graph Path: ${analysisResults.metadata.graph_path.join(' → ')}
Tiers Used: ${analysisResults.metadata.tiers_used.join(', ')}
Total Time: ${analysisResults.metadata.total_time.toFixed(2)}s
Total Cost: $${analysisResults.metadata.total_cost.toFixed(4)}
Quality Score: ${analysisResults.metadata.validation_score}

Classification:
- Industry: ${analysisResults.metadata.classification.industry}
- Complexity: ${analysisResults.metadata.classification.complexity}
- Deal Size: ${analysisResults.metadata.classification.deal_size_category}
- Urgency: ${analysisResults.metadata.classification.urgency}
- Confidence: ${(analysisResults.metadata.classification.confidence * 100).toFixed(0)}%

==================================================
CRITICAL PAIN POINTS
==================================================

${analysisResults.pain_points.map((p, i) => `
${i + 1}. ${p.title}
   Category: ${p.category}
   Impact: ${p.impact}
   Description: ${p.description}
   Estimated Cost: ${p.estimated_cost}
   Evidence:
${p.evidence.map(e => `   - ${e}`).join('\n')}
`).join('\n')}

==================================================
STRATEGIC OPPORTUNITIES
==================================================

${analysisResults.opportunities.map((o, i) => `
${i + 1}. ${o.title}
   Type: ${o.type}
   Description: ${o.description}
   Expected Value: ${o.estimated_value}
   Timeframe: ${o.timeframe}
   Requirements:
${o.requirements.map(r => `   - ${r}`).join('\n')}
`).join('\n')}

==================================================
STAKEHOLDERS
==================================================

${analysisResults.stakeholders.map((s, i) => `
${i + 1}. ${s.name} - ${s.role}
   Influence: ${s.influence}
   Concerns:
${s.concerns.map(c => `   - ${c}`).join('\n')}
   Motivations:
${s.motivations.map(m => `   - ${m}`).join('\n')}
`).join('\n')}

==================================================
RECOMMENDED NEXT STEPS
==================================================

${analysisResults.next_steps.map((s, i) => `
${i + 1}. ${s.action}
   Owner: ${s.owner}
   Timeline: ${s.timeline}
   Priority: ${s.priority}
`).join('\n')}

==================================================
RISK FACTORS
==================================================

${analysisResults.risk_factors.map((r, i) => `
${i + 1}. ${r.risk}
   Severity: ${r.severity}
   Mitigation: ${r.mitigation}
`).join('\n')}

==================================================
END OF REPORT
==================================================
`

    const blob = new Blob([report], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `analysis-${analysisResults.company.replace(/\s+/g, '-')}-${Date.now()}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  const copyJSON = () => {
    if (!analysisResults) return
    navigator.clipboard.writeText(JSON.stringify(analysisResults, null, 2))
    alert('Analysis JSON copied to clipboard!')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Briefcase className="w-10 h-10 text-blue-400" />
            <h1 className="text-4xl font-bold">Live Sales Call Analyzer</h1>
          </div>
          <p className="text-xl text-gray-300">
            Real-Time LangGraph Multi-Tier Intelligence
          </p>
          <div className="flex items-center justify-center gap-6 mt-4 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <Brain className="w-4 h-4 text-blue-400" />
              <span>Observable Execution</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-blue-400" />
              <span>3-Tier Routing</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-blue-400" />
              <span>Cost Optimized</span>
            </div>
          </div>
        </div>

        {/* Demo Scenarios */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 mb-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-2">Interactive Demo Analysis</h2>
            <p className="text-gray-300">
              See LangGraph in action with real client scenarios. Click any example to run a live analysis.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            {sampleTranscripts.map((sample, idx) => (
              <button
                key={idx}
                onClick={() => loadSample(sample)}
                disabled={isAnalyzing}
                className={`bg-blue-500/20 hover:bg-blue-500/30 border border-blue-400/30 rounded-lg p-4 text-left transition-all ${
                  isAnalyzing ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <div className="font-semibold text-blue-300 mb-2">{sample.name}</div>
                <div className="text-xs text-gray-400 mb-3">
                  {sample.text.substring(0, 100)}...
                </div>
                <div className="flex items-center gap-2 text-sm text-blue-400 font-semibold">
                  <Play className="w-4 h-4" />
                  Run Analysis
                </div>
              </button>
            ))}
          </div>

          {transcript && !analysisResults && !isAnalyzing && (
            <div className="space-y-4">
              {/* Full Transcript View */}
              <div className="bg-black/30 p-6 rounded-lg border border-blue-400/30">
                <h3 className="text-lg font-semibold text-blue-300 mb-4">
                  Selected: {sampleTranscripts.find(s => s.text === transcript)?.name}
                </h3>
                <div className="bg-black/20 p-4 rounded border border-white/10 max-h-96 overflow-y-auto">
                  <pre className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap font-sans">
                    {transcript}
                  </pre>
                </div>
              </div>

              {/* Analyze Now Button */}
              <div className="bg-black/30 p-4 rounded-lg border border-blue-400/30">
                <div className="flex items-center justify-between">
                  <div className="text-gray-300">
                    Ready to analyze this transcript with LangGraph
                  </div>
                  <button
                    onClick={analyzeTranscript}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-all flex items-center gap-2"
                  >
                    <Play className="w-5 h-5" />
                    Analyze Now
                  </button>
                </div>
              </div>
            </div>
          )}

          {isAnalyzing && (
            <div className="bg-black/30 p-6 rounded-lg border border-blue-400/30">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-6 h-6 text-blue-400 animate-pulse" />
                <span className="text-blue-300 font-semibold text-lg">Processing via LangGraph...</span>
              </div>
              <div className="space-y-3 text-sm text-gray-300">
                <div className="flex items-center gap-3 bg-blue-500/10 p-3 rounded">
                  <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                  <span>Tier 1: Fast Classification (GPT-4o-mini)</span>
                </div>
                <div className="flex items-center gap-3 bg-blue-500/10 p-3 rounded">
                  <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                  <span>Tier 2: Main Analysis (GPT-4o-mini)</span>
                </div>
                <div className="flex items-center gap-3 bg-purple-500/10 p-3 rounded">
                  <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
                  <span>Tier 3: Deep Enhancement (Claude 3.5) - if triggered</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Dashboard */}
        {analysisResults && (
          <div className="space-y-6">
            
            {/* LangGraph Execution Metadata */}
            <div className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 rounded-xl p-8 border border-white/20">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <BarChart3 className="w-8 h-8 text-blue-400" />
                LangGraph Execution Path
              </h2>
              
              <div className="grid md:grid-cols-4 gap-6 mb-6">
                <div className="bg-black/30 p-5 rounded-lg">
                  <div className="text-sm text-gray-400 mb-2">Graph Path</div>
                  <div className="text-lg font-bold text-blue-400">
                    {analysisResults.metadata.graph_path.join(' → ')}
                  </div>
                </div>
                
                <div className="bg-black/30 p-5 rounded-lg">
                  <div className="text-sm text-gray-400 mb-2">Tiers Used</div>
                  <div className="flex flex-col gap-2">
                    {[...new Set(analysisResults.metadata.tiers_used)].map((tier, idx) => (
                      <span key={`tier-display-${idx}`} className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm font-semibold inline-block w-fit">
                        Tier {tier}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="bg-black/30 p-5 rounded-lg">
                  <div className="text-sm text-gray-400 mb-2">Total Time</div>
                  <div className="text-2xl font-bold text-green-400">
                    {analysisResults.metadata.total_time.toFixed(2)}s
                  </div>
                </div>
                
                <div className="bg-black/30 p-5 rounded-lg">
                  <div className="text-sm text-gray-400 mb-2">Total Cost</div>
                  <div className="text-2xl font-bold text-purple-400">
                    ${analysisResults.metadata.total_cost.toFixed(4)}
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-5 gap-4 bg-black/20 p-4 rounded-lg">
                <div>
                  <div className="text-xs text-gray-400">Industry</div>
                  <div className="text-lg font-bold text-white">{analysisResults.metadata.classification.industry}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-400">Complexity</div>
                  <div className="text-lg font-bold text-orange-400">{analysisResults.metadata.classification.complexity}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-400">Deal Size</div>
                  <div className="text-lg font-bold text-green-400">{analysisResults.metadata.classification.deal_size_category}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-400">Urgency</div>
                  <div className="text-lg font-bold text-red-400">{analysisResults.metadata.classification.urgency}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-400">Quality Score</div>
                  <div className="text-lg font-bold text-blue-400">{analysisResults.metadata.validation_score}</div>
                </div>
              </div>
            </div>

            {/* Source Transcript */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <button
                onClick={() => toggleSection('transcript')}
                className="w-full flex items-center justify-between"
              >
                <h3 className="text-2xl font-bold flex items-center gap-3">
                  <FileText className="w-6 h-6 text-blue-400" />
                  Source Transcript
                </h3>
                {expandedSections.transcript ? <ChevronUp /> : <ChevronDown />}
              </button>

              {expandedSections.transcript && (
                <div className="mt-4">
                  <div className="bg-black/30 p-5 rounded-lg border border-blue-400/20">
                    <div className="text-sm text-gray-400 mb-3">
                      Demo: {sampleTranscripts.find(s => s.text === transcript)?.name || 'Custom Transcript'}
                    </div>
                    <div className="text-gray-300 whitespace-pre-wrap font-mono text-sm leading-relaxed max-h-96 overflow-y-auto">
                      {transcript}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Executive Summary */}
            <div className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 rounded-xl p-8 border border-white/20">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <Target className="w-8 h-8 text-blue-400" />
                Executive Summary
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-black/30 p-5 rounded-lg">
                  <div className="text-sm text-gray-400 mb-2">Company</div>
                  <div className="text-2xl font-bold text-white mb-1">{analysisResults.company}</div>
                  <div className="text-blue-400">{analysisResults.industry}</div>
                </div>
                
                <div className="bg-black/30 p-5 rounded-lg">
                  <div className="text-sm text-gray-400 mb-2">Confidence Score</div>
                  <div className="text-3xl font-bold text-green-400">
                    {(analysisResults.metadata.classification.confidence * 100).toFixed(0)}%
                  </div>
                </div>
              </div>

              <div className="bg-black/30 p-5 rounded-lg mb-4">
                <div className="text-sm font-semibold text-gray-300 mb-2">Overview</div>
                <p className="text-gray-200 leading-relaxed">{analysisResults.executive_summary.overview}</p>
              </div>

              <div className="bg-black/30 p-5 rounded-lg mb-4">
                <div className="text-sm font-semibold text-gray-300 mb-3">Critical Findings</div>
                <div className="space-y-2">
                  {analysisResults.executive_summary.critical_findings.map((finding, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-orange-400 mt-1 flex-shrink-0" />
                      <span className="text-gray-200">{finding}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 p-5 rounded-lg border border-blue-500/30">
                <div className="text-sm font-semibold text-blue-300 mb-2">Recommended Approach</div>
                <p className="text-white font-medium">{analysisResults.executive_summary.recommended_approach}</p>
              </div>
            </div>

            {/* Pain Points */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <button
                onClick={() => toggleSection('painPoints')}
                className="w-full flex items-center justify-between mb-4"
              >
                <h3 className="text-2xl font-bold flex items-center gap-3">
                  <AlertTriangle className="w-6 h-6 text-red-400" />
                  Critical Pain Points ({analysisResults.pain_points.length})
                </h3>
                {expandedSections.painPoints ? <ChevronUp /> : <ChevronDown />}
              </button>

              {expandedSections.painPoints && (
                <div className="space-y-4">
                  {analysisResults.pain_points.map((pain, idx) => (
                    <div key={idx} className="bg-black/30 p-5 rounded-lg border-l-4 border-red-500">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <span className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-xs font-semibold">
                            {pain.category}
                          </span>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          pain.impact === 'critical' || pain.impact === 'high' 
                            ? 'bg-red-500/20 text-red-400' 
                            : 'bg-orange-500/20 text-orange-400'
                        }`}>
                          {pain.impact.toUpperCase()} IMPACT
                        </span>
                      </div>
                      <h4 className="text-xl font-bold text-white mb-2">{pain.title}</h4>
                      <p className="text-gray-300 mb-4">{pain.description}</p>
                      
                      <div className="bg-black/30 p-4 rounded mb-3">
                        <div className="text-sm text-gray-400 mb-2">Estimated Cost if Not Addressed:</div>
                        <div className="text-lg font-bold text-red-400">{pain.estimated_cost}</div>
                      </div>

                      <div>
                        <div className="text-sm font-semibold text-gray-300 mb-2">Evidence:</div>
                        <div className="space-y-1">
                          {pain.evidence.map((e, i) => (
                            <div key={i} className="flex items-start gap-2 text-sm text-gray-400">
                              <span className="text-red-400">•</span>
                              <span>{e}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Solution Opportunities */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <button
                onClick={() => toggleSection('opportunities')}
                className="w-full flex items-center justify-between mb-4"
              >
                <h3 className="text-2xl font-bold flex items-center gap-3">
                  <TrendingUp className="w-6 h-6 text-green-400" />
                  Strategic Opportunities ({analysisResults.opportunities.length})
                </h3>
                {expandedSections.opportunities ? <ChevronUp /> : <ChevronDown />}
              </button>

              {expandedSections.opportunities && (
                <div className="space-y-4">
                  {analysisResults.opportunities.map((opp, idx) => (
                    <div key={idx} className="bg-black/30 p-5 rounded-lg border-l-4 border-green-500">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="text-xl font-bold text-white">{opp.title}</h4>
                        <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-semibold">
                          {opp.type}
                        </span>
                      </div>
                      
                      <p className="text-gray-300 mb-4">{opp.description}</p>
                      
                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div className="bg-black/30 p-3 rounded">
                          <div className="text-xs text-gray-400">Expected Value</div>
                          <div className="text-lg font-bold text-green-400">{opp.estimated_value}</div>
                        </div>
                        <div className="bg-black/30 p-3 rounded">
                          <div className="text-xs text-gray-400">Timeframe</div>
                          <div className="text-lg font-bold text-white">{opp.timeframe}</div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-sm font-semibold text-gray-300 mb-2">Requirements:</div>
                        <div className="flex flex-wrap gap-2">
                          {opp.requirements.map((req, i) => (
                            <span key={i} className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs">
                              {req}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Stakeholders */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <Users className="w-6 h-6 text-purple-400" />
                Key Stakeholders ({analysisResults.stakeholders.length})
              </h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                {analysisResults.stakeholders.map((stakeholder, idx) => (
                  <div key={idx} className="bg-black/30 p-5 rounded-lg">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="text-xl font-bold text-white">{stakeholder.name}</h4>
                        <p className="text-blue-400">{stakeholder.role}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        stakeholder.influence === 'high' 
                          ? 'bg-red-500/20 text-red-400'
                          : stakeholder.influence === 'medium'
                          ? 'bg-orange-500/20 text-orange-400'
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {stakeholder.influence.toUpperCase()} INFLUENCE
                      </span>
                    </div>
                    
                    <div className="mb-3">
                      <div className="text-xs text-gray-400 mb-2">Concerns:</div>
                      <div className="space-y-1">
                        {stakeholder.concerns.map((concern, i) => (
                          <div key={i} className="flex items-start gap-2 text-sm">
                            <span className="text-orange-400">•</span>
                            <span className="text-gray-300">{concern}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-xs text-gray-400 mb-2">Motivations:</div>
                      <div className="space-y-1">
                        {stakeholder.motivations.map((motivation, i) => (
                          <div key={i} className="flex items-start gap-2 text-sm">
                            <span className="text-green-400">•</span>
                            <span className="text-gray-300">{motivation}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <button
                onClick={() => toggleSection('nextSteps')}
                className="w-full flex items-center justify-between mb-4"
              >
                <h3 className="text-2xl font-bold flex items-center gap-3">
                  <Target className="w-6 h-6 text-blue-400" />
                  Recommended Next Steps ({analysisResults.next_steps.length})
                </h3>
                {expandedSections.nextSteps ? <ChevronUp /> : <ChevronDown />}
              </button>

              {expandedSections.nextSteps && (
                <div className="space-y-4">
                  {analysisResults.next_steps.map((step, idx) => (
                    <div key={idx} className="bg-black/30 p-5 rounded-lg border-l-4 border-blue-500">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="text-lg font-bold text-white">{step.action}</h4>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          step.priority === 'critical' || step.priority === 'high'
                            ? 'bg-red-500/20 text-red-400'
                            : 'bg-orange-500/20 text-orange-400'
                        }`}>
                          {step.priority.toUpperCase()}
                        </span>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-400">Owner: </span>
                          <span className="text-white font-semibold">{step.owner}</span>
                        </div>
                        <div>
                          <span className="text-gray-400">Timeline: </span>
                          <span className="text-white font-semibold">{step.timeline}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Risk Factors */}
            {analysisResults.risk_factors && analysisResults.risk_factors.length > 0 && (
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                  <Shield className="w-6 h-6 text-yellow-400" />
                  Risk Factors ({analysisResults.risk_factors.length})
                </h3>
                
                <div className="space-y-4">
                  {analysisResults.risk_factors.map((risk, idx) => (
                    <div key={idx} className="bg-black/30 p-5 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-lg font-bold text-white">{risk.risk}</h4>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          risk.severity === 'high' || risk.severity === 'critical'
                            ? 'bg-red-500/20 text-red-400'
                            : risk.severity === 'medium'
                            ? 'bg-orange-500/20 text-orange-400'
                            : 'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {risk.severity.toUpperCase()} SEVERITY
                        </span>
                      </div>
                      <div className="mt-3">
                        <span className="text-gray-400 text-sm">Mitigation: </span>
                        <span className="text-green-300">{risk.mitigation}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Download Section */}
            <div className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 rounded-xl p-8 border border-white/20 text-center">
              <h3 className="text-2xl font-bold mb-4">Export Analysis</h3>
              <p className="text-gray-300 mb-6">
                Download the complete analysis or copy the raw JSON data
              </p>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={downloadReport}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Download Report
                </button>
                <button
                  onClick={copyJSON}
                  className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 border border-white/20"
                >
                  <Copy className="w-5 h-5" />
                  Copy JSON
                </button>
              </div>
            </div>

          </div>
        )}

        {/* CTA Footer - Always Visible */}
        <div className="mt-12 bg-gradient-to-br from-blue-900/50 to-purple-900/50 rounded-xl p-8 border border-white/20 text-center">
          <h2 className="text-3xl font-bold mb-4">Want a Custom Analysis?</h2>
          <p className="text-gray-300 text-lg mb-6 max-w-2xl mx-auto">
            Get a comprehensive AI-powered sales call analysis tailored to your company&apos;s specific challenges and opportunities.
          </p>
          <a 
            href="/#services"
            className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-lg font-semibold transition-all text-lg"
          >
            View Services & Pricing
          </a>
        </div>

      </div>
    </div>
  )
}