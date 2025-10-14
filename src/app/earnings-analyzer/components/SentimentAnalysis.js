// src/app/earnings-analyzer/components/SentimentAnalysis.js
'use client'

import { Brain, CheckCircle, AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react'

export default function SentimentAnalysis({ currentQuarter, selectedQuarter, expanded, toggleSection }) {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
      <button
        onClick={() => toggleSection('sentiment')}
        className="w-full flex items-center justify-between mb-4"
      >
        <h3 className="text-2xl font-bold flex items-center gap-3">
          <Brain className="w-6 h-6 text-purple-400" />
          Sentiment Analysis - {selectedQuarter.replace('_2024', ' 2024')}
        </h3>
        {expanded ? <ChevronUp /> : <ChevronDown />}
      </button>

      {expanded && (
        <div className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-black/30 p-5 rounded-lg">
              <div className="text-sm text-gray-400 mb-2">Sentiment Score</div>
              <div className="text-4xl font-bold text-purple-400">
                {currentQuarter.sentiment_analysis.sentiment_score.toFixed(2)}
              </div>
              <div className="text-sm text-gray-300 mt-1">
                {currentQuarter.sentiment_analysis.overall_tone}
              </div>
            </div>

            <div className="bg-black/30 p-5 rounded-lg">
              <div className="text-sm text-gray-400 mb-2">Confidence Level</div>
              <div className="text-2xl font-bold text-green-400 capitalize">
                {currentQuarter.sentiment_analysis.confidence_level}
              </div>
              <div className="text-sm text-gray-300 mt-1">
                {currentQuarter.word_count.toLocaleString()} words analyzed
              </div>
            </div>

            <div className="bg-black/30 p-5 rounded-lg">
              <div className="text-sm text-gray-400 mb-2">Management Confidence</div>
              <div className="text-2xl font-bold text-blue-400 capitalize">
                {currentQuarter.sentiment_analysis.management_confidence}
              </div>
              <div className="text-sm text-gray-300 mt-1">
                Market reaction: {currentQuarter.earnings_reaction > 0 ? '+' : ''}{currentQuarter.earnings_reaction}%
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-green-500/10 to-transparent p-5 rounded-lg border border-green-500/20">
              <h4 className="text-lg font-bold text-green-400 mb-3 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Key Positive Signals
              </h4>
              <div className="space-y-2">
                {currentQuarter.sentiment_analysis.key_positive_signals.map((signal, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">•</span>
                    <span className="text-gray-300 text-sm">{signal}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-red-500/10 to-transparent p-5 rounded-lg border border-red-500/20">
              <h4 className="text-lg font-bold text-red-400 mb-3 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Key Concerns
              </h4>
              <div className="space-y-2">
                {currentQuarter.sentiment_analysis.key_concerns.map((concern, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="text-red-400 mt-1">•</span>
                    <span className="text-gray-300 text-sm">{concern}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}