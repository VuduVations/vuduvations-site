// src/app/earnings-analyzer/components/Methodology.js
'use client'

import { useState } from 'react'
import { 
  FlaskConical, 
  ChevronDown, 
  ChevronUp, 
  FileText, 
  Brain, 
  CheckCircle, 
  TrendingUp,
  AlertCircle,
  Zap,
  Shield,
  ArrowRight
} from 'lucide-react'

export default function Methodology() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 rounded-xl p-6 border border-purple-400/30 mb-8">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between group"
      >
        <div className="flex items-center gap-3">
          <FlaskConical className="w-6 h-6 text-purple-400" />
          <h3 className="text-2xl font-bold text-white">Our Methodology</h3>
          <span className="text-sm text-purple-300 bg-purple-500/20 px-3 py-1 rounded-full">
            Strategy Consulting-Grade
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
            {isExpanded ? 'Hide Details' : 'Learn How It Works'}
          </span>
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-purple-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-purple-400" />
          )}
        </div>
      </button>

      {isExpanded && (
        <div className="mt-6 space-y-6">
          
          {/* Overview */}
          <div className="bg-black/20 p-6 rounded-lg border border-white/10">
            <p className="text-gray-300 leading-relaxed">
              Our earnings intelligence platform processes quarterly earnings call transcripts through a 
              sophisticated <span className="text-blue-400 font-semibold">multi-tier AI analysis system</span>, 
              combining advanced natural language processing with financial domain expertise and strategy 
              consulting frameworks. Each analysis undergoes rigorous validation to ensure{' '}
              <span className="text-purple-400 font-semibold">institutional-grade accuracy</span> and 
              actionable insights at the level of top advisory firms.
            </p>
          </div>

          {/* Process Flow Diagram */}
          <div className="bg-black/20 p-6 rounded-lg border border-white/10">
            <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              Analysis Pipeline
            </h4>
            
            <div className="grid md:grid-cols-5 gap-4">
              {/* Step 1 */}
              <div className="relative">
                <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 p-4 rounded-lg border border-blue-400/30 text-center">
                  <FileText className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                  <div className="text-sm font-semibold text-white mb-1">Ingestion</div>
                  <div className="text-xs text-gray-400">Transcript processing & enrichment</div>
                </div>
                <ArrowRight className="hidden md:block absolute top-1/2 -right-6 w-5 h-5 text-purple-400 transform -translate-y-1/2" />
              </div>

              {/* Step 2 */}
              <div className="relative">
                <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 p-4 rounded-lg border border-purple-400/30 text-center">
                  <Brain className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                  <div className="text-sm font-semibold text-white mb-1">Analysis</div>
                  <div className="text-xs text-gray-400">Multi-tier LLM processing</div>
                </div>
                <ArrowRight className="hidden md:block absolute top-1/2 -right-6 w-5 h-5 text-purple-400 transform -translate-y-1/2" />
              </div>

              {/* Step 3 */}
              <div className="relative">
                <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 p-4 rounded-lg border border-green-400/30 text-center">
                  <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-2" />
                  <div className="text-sm font-semibold text-white mb-1">Extraction</div>
                  <div className="text-xs text-gray-400">Themes, risks & insights</div>
                </div>
                <ArrowRight className="hidden md:block absolute top-1/2 -right-6 w-5 h-5 text-purple-400 transform -translate-y-1/2" />
              </div>

              {/* Step 4 */}
              <div className="relative">
                <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 p-4 rounded-lg border border-orange-400/30 text-center">
                  <Shield className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                  <div className="text-sm font-semibold text-white mb-1">Validation</div>
                  <div className="text-xs text-gray-400">Quality assurance checks</div>
                </div>
                <ArrowRight className="hidden md:block absolute top-1/2 -right-6 w-5 h-5 text-purple-400 transform -translate-y-1/2" />
              </div>

              {/* Step 5 */}
              <div>
                <div className="bg-gradient-to-br from-blue-500/20 to-purple-600/20 p-4 rounded-lg border border-blue-400/30 text-center">
                  <CheckCircle className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                  <div className="text-sm font-semibold text-white mb-1">Report</div>
                  <div className="text-xs text-gray-400">Investment-grade insights</div>
                </div>
              </div>
            </div>
          </div>

          {/* Key Components Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            
            {/* Data Processing */}
            <div className="bg-gradient-to-br from-blue-500/10 to-transparent p-5 rounded-lg border border-blue-500/20">
              <h4 className="text-lg font-bold text-blue-300 mb-3 flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Data Processing & Enrichment
              </h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-0.5">â€¢</span>
                  <span>Transcript normalization & quality validation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-0.5">â€¢</span>
                  <span>Real-time market data integration (stock prices, volume)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-0.5">â€¢</span>
                  <span>Multi-quarter historical tracking & comparison</span>
                </li>
              </ul>
            </div>

            {/* Sentiment Calibration */}
            <div className="bg-gradient-to-br from-purple-500/10 to-transparent p-5 rounded-lg border border-purple-500/20">
              <h4 className="text-lg font-bold text-purple-300 mb-3 flex items-center gap-2">
                <Brain className="w-5 h-5" />
                Sentiment Calibration
              </h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 mt-0.5">â€¢</span>
                  <span>Calibrated 0-1 scale validated against market reactions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 mt-0.5">â€¢</span>
                  <span>Nuanced tone detection (e.g., &quot;cautiously optimistic&quot;)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 mt-0.5">â€¢</span>
                  <span>Cross-validation with actual stock price movements</span>
                </li>
              </ul>
            </div>

            {/* Topic Extraction */}
            <div className="bg-gradient-to-br from-green-500/10 to-transparent p-5 rounded-lg border border-green-500/20">
              <h4 className="text-lg font-bold text-green-300 mb-3 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Topic Extraction & Classification
              </h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">â€¢</span>
                  <span>Business segment performance with financial evidence</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">â€¢</span>
                  <span>Strategic themes, initiatives & management priorities</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">â€¢</span>
                  <span>Risk factors, opportunities & forward guidance</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">â€¢</span>
                  <span>Quarter-over-quarter change detection & analysis</span>
                </li>
              </ul>
            </div>

            {/* Quality Assurance */}
            <div className="bg-gradient-to-br from-orange-500/10 to-transparent p-5 rounded-lg border border-orange-500/20">
              <h4 className="text-lg font-bold text-orange-300 mb-3 flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Quality Assurance
              </h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
                  <span>Multi-tier LLM routing (cost/quality optimization)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
                  <span>Sentiment-market alignment verification</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
                  <span>Cross-quarter consistency checks</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
                  <span>Confidence scoring based on data completeness</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Confidence Levels */}
          <div className="bg-black/20 p-6 rounded-lg border border-white/10">
            <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              Confidence Level Scoring
            </h4>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
                <div className="text-lg font-bold text-green-400 mb-2">High Confidence</div>
                <div className="text-sm text-gray-300">
                  8,000+ words analyzed, complete data across all categories, validated metrics
                </div>
              </div>
              <div className="bg-yellow-500/10 p-4 rounded-lg border border-yellow-500/30">
                <div className="text-lg font-bold text-yellow-400 mb-2">Medium Confidence</div>
                <div className="text-sm text-gray-300">
                  5,000-8,000 words, most data present, minor gaps in coverage
                </div>
              </div>
              <div className="bg-orange-500/10 p-4 rounded-lg border border-orange-500/30">
                <div className="text-lg font-bold text-orange-400 mb-2">Low Confidence</div>
                <div className="text-sm text-gray-300">
                  Less than 5,000 words or missing key sections, requires manual review
                </div>
              </div>
            </div>
          </div>

          {/* Limitations & Disclaimer */}
          <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 p-5 rounded-lg border border-red-500/20">
            <h4 className="text-lg font-bold text-red-300 mb-3 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              Important Limitations & Disclaimer
            </h4>
            <div className="space-y-2 text-sm text-gray-300">
              <p>
                <span className="font-semibold text-white">Not Investment Advice:</span> This analysis is 
                generated by AI and should not be considered financial or investment advice. All insights 
                should be validated with additional research and professional guidance before making any 
                investment decisions.
              </p>
              <p>
                <span className="font-semibold text-white">Data Sources:</span> Analysis is based solely 
                on publicly available earnings call transcripts and market data. It does not account for 
                non-public information or real-time market dynamics.
              </p>
              <p>
                <span className="font-semibold text-white">Human Review Recommended:</span> While our 
                system provides high-quality insights, we always recommend human expert review for 
                critical business decisions.
              </p>
            </div>
          </div>

          {/* Continuous Improvement */}
          <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-5 rounded-lg border border-blue-500/20 text-center">
            <h4 className="text-lg font-bold text-blue-300 mb-2">Strategy Consulting Frameworks</h4>
            <p className="text-sm text-gray-300">
              Our analysis methodology draws on frameworks used by elite strategy consulting 
              firms (McKinsey, Bain, BCG) and top-tier investment banks, continuously refined 
              using feedback loops from market outcomes to ensure accuracy and relevance.
            </p>
          </div>

        </div>
      )}
    </div>
  )
}