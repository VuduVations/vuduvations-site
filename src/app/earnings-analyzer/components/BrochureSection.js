// ============================================================================
// FILE: app/earnings-analyzer/components/BrochureSection.jsx
// ============================================================================

'use client'

import { useState } from 'react'
import { Download, FileText, CheckCircle, Loader } from 'lucide-react'

export default function BrochureSection() {
  const [generating, setGenerating] = useState(false)
  const [generated, setGenerated] = useState(false)

  const generateBrochure = async () => {
    setGenerating(true)
    
    // Simulate PDF generation
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Create brochure content
    const brochureContent = `
╔═══════════════════════════════════════════════════════════════════════════╗
║                                                                           ║
║                    EARNINGS INTELLIGENCE PLATFORM                         ║
║                                                                           ║
║              Strategy Consulting-Grade Analysis in Minutes               ║
║                                                                           ║
║                            VUDUVATIONS                                    ║
║                                                                           ║
╚═══════════════════════════════════════════════════════════════════════════╝


═══════════════════════════════════════════════════════════════════════════
                              THE PROBLEM
═══════════════════════════════════════════════════════════════════════════

Financial analysts spend 80% of their time on mechanical tasks:

📊 6-8 hours per earnings call on manual data processing
📊 Reading transcripts, pulling stock data, building charts
📊 Inconsistent analysis quality due to time pressure
📊 Limited coverage - can only deep-dive 20-30 companies


═══════════════════════════════════════════════════════════════════════════
                             THE SOLUTION
═══════════════════════════════════════════════════════════════════════════

AI-POWERED EARNINGS INTELLIGENCE

✓ Institutional-grade analysis in 3 minutes (not 8 hours)
✓ Complete transparency - every score is explainable
✓ Multi-quarter sentiment tracking and theme evolution
✓ Real-time financial data integration
✓ Strategy consulting-quality insights


═══════════════════════════════════════════════════════════════════════════
                      HOW OUR AI PIPELINE WORKS
═══════════════════════════════════════════════════════════════════════════

5 SPECIALIZED AI AGENTS WORKING TOGETHER (Total: ~3 minutes)

Stage 1: Audio Transcription (45 seconds) - OpenAI Whisper API
Stage 2: Sentiment Analysis (90 seconds) - GPT-4 + Custom Models
Stage 3: Strategic Theme Extraction (60 seconds) - LangChain Multi-Agent
Stage 4: Financial Data Integration (30 seconds) - Yahoo Finance API
Stage 5: Report Synthesis (45 seconds) - Multi-Agent Orchestration


═══════════════════════════════════════════════════════════════════════════
                       TRANSPARENCY IN ACTION
═══════════════════════════════════════════════════════════════════════════

Example: Q4 2024 Sentiment Score = 78%

Base Score:                                                           50%
Positive Language:                                                   +35%
Negative Language:                                                    -7%
Final Sentiment Score:                                                78%


═══════════════════════════════════════════════════════════════════════════
                           REAL RESULTS
═══════════════════════════════════════════════════════════════════════════

CASE STUDY: JPMORGAN CHASE 2024

Q1 2024:  Sentiment 72%  |  Stock: $161.66  |  Reaction: -0.6%
Q2 2024:  Sentiment 76%  |  Stock: $177.03  |  Reaction: -1.1%
Q3 2024:  Sentiment 75%  |  Stock: $204.44  |  Reaction: +4.2%
Q4 2024:  Sentiment 78%  |  Stock: $248.40  |  Reaction: +2.7%

Annual Performance: +53.7% stock gain


═══════════════════════════════════════════════════════════════════════════
                          WHO IT'S FOR
═══════════════════════════════════════════════════════════════════════════

EQUITY RESEARCH ANALYSTS
Problem: 6-8 hours per earnings call on manual processing
Solution: Get comprehensive analysis in 3 minutes
Result:  Better work-life balance + higher quality research

PORTFOLIO MANAGERS
Problem: Can't deeply analyze 100+ quarterly earnings calls
Solution: Screen entire portfolio with sentiment rankings
Result:   Better risk management + early warning signals

CORPORATE STRATEGY EXECUTIVES
Problem: Limited visibility into market perception
Solution: Instant sentiment analysis + competitor benchmarking
Result:   Data-driven earnings preparation + board readiness


═══════════════════════════════════════════════════════════════════════════
                           GETTING STARTED
═══════════════════════════════════════════════════════════════════════════

PRICING OPTIONS:

Individual Analyst Plan - $499/month
  • Up to 25 earnings call analyses per month
  • All features included
  • Email support

Team Plan - $1,999/month
  • Up to 100 analyses per month
  • Multi-user access
  • Priority support

Enterprise Plan - Custom pricing
  • Unlimited analyses
  • White-label options
  • Dedicated success manager


DEMO REQUEST:

📧 Email:   demo@vuduvations.io
🌐 Website: vuduvations.io/earnings-analyzer
📍 Location: Las Vegas, Nevada, USA


═══════════════════════════════════════════════════════════════════════════

                        © 2025 Vuduvations
              All rights reserved. Patent pending.

    This brochure was generated automatically by our platform.
         For the latest version, visit vuduvations.io

═══════════════════════════════════════════════════════════════════════════
`

    // Download as text file
    const blob = new Blob([brochureContent], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'Vuduvations-Earnings-Intelligence-Brochure.txt'
    a.click()
    URL.revokeObjectURL(url)
    
    setGenerating(false)
    setGenerated(true)
    
    setTimeout(() => setGenerated(false), 3000)
  }

  return (
    <div className="mt-12 bg-gradient-to-br from-pink-500/20 to-orange-500/20 border border-pink-400/30 rounded-xl p-8">
      
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-white mb-3">
          Download Marketing Brochure
        </h2>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Get our comprehensive 8-page brochure with complete pipeline details, 
          case studies, pricing, and methodology. Perfect for sharing with your team.
        </p>
      </div>

      <div className="bg-slate-800/60 rounded-xl p-6 border border-pink-400/20 mb-6">
        <div className="flex items-start gap-4">
          <div className="bg-pink-500/20 p-3 rounded-lg flex-shrink-0">
            <FileText className="w-8 h-8 text-pink-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-3">What's Included:</h3>
            <div className="grid md:grid-cols-2 gap-3">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 text-sm">Problem statement & value proposition</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 text-sm">Complete AI pipeline explanation</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 text-sm">Transparency & methodology details</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 text-sm">Real JPMorgan 2024 case study</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 text-sm">Target audience profiles</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 text-sm">Pricing & contact information</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={generateBrochure}
          disabled={generating}
          className={`px-8 py-4 rounded-lg font-semibold transition-all inline-flex items-center justify-center gap-3 text-lg ${
            generating
              ? 'bg-slate-700 cursor-not-allowed'
              : generated
              ? 'bg-green-600 hover:bg-green-700'
              : 'bg-gradient-to-r from-pink-600 to-orange-600 hover:from-pink-700 hover:to-orange-700'
          } text-white`}
        >
          {generating ? (
            <>
              <Loader className="w-6 h-6 animate-spin" />
              Generating Brochure...
            </>
          ) : generated ? (
            <>
              <CheckCircle className="w-6 h-6" />
              Brochure Downloaded!
            </>
          ) : (
            <>
              <Download className="w-6 h-6" />
              Generate & Download Brochure
            </>
          )}
        </button>
        
        <p className="text-sm text-gray-400 mt-4">
          Text format • Instant download • No signup required
        </p>
      </div>

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>

    </div>
  )
}