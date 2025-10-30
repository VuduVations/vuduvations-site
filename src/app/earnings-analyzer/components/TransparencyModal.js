// ============================================================================
// FILE: src/app/earnings-analyzer/components/TransparencyModal.jsx
// ============================================================================

'use client'

import { X, TrendingUp, TrendingDown, Minus } from 'lucide-react'

export default function TransparencyModal({ isOpen, onClose, data }) {
  if (!isOpen || !data) return null

  const totalPositive = data.positiveSignals.reduce((sum, s) => sum + (s.impact_points || s.points || 0), 0)
  const totalNegative = data.negativeSignals.reduce((sum, s) => sum + (s.impact_points || s.points || 0), 0)
  const baseScore = data.baseScore || 50

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border border-blue-400/30 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="sticky top-0 bg-slate-900/95 backdrop-blur border-b border-blue-400/20 p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">
              Sentiment Score Calculation
            </h2>
            <p className="text-gray-400">{data.quarter}</p>
          </div>
          <button
            onClick={onClose}
            className="bg-slate-700 hover:bg-slate-600 p-2 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-300" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          
          {/* Final Score Display */}
          <div className="bg-blue-500/20 border border-blue-400/40 rounded-lg p-6 text-center">
            <div className="text-6xl font-bold text-blue-400 mb-2">
              {data.sentimentScore}%
            </div>
            <div className="text-gray-300">Final Sentiment Score</div>
          </div>

          {/* Base Score */}
          <div className="bg-slate-700/50 rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Minus className="w-6 h-6 text-gray-400" />
              <div>
                <div className="font-bold text-white">Base Score</div>
                <div className="text-sm text-gray-400">Neutral starting point</div>
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-300">{baseScore}%</div>
          </div>

          {/* Positive Signals */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-green-400" />
                <h3 className="text-xl font-bold text-white">Positive Language Detected</h3>
              </div>
              <div className="text-2xl font-bold text-green-400">+{totalPositive}%</div>
            </div>
            <div className="space-y-3">
              {data.positiveSignals.map((signal, idx) => (
                <div 
                  key={idx} 
                  className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 hover:bg-green-500/20 transition-all"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="font-bold text-green-300">"{signal.phrase}"</div>
                      <div className="text-sm text-gray-400">({signal.mentions} mentions)</div>
                    </div>
                    <div className="text-lg font-bold text-green-400">+{signal.impact_points || signal.points}%</div>
                  </div>
                  {signal.example && (
                    <div className="text-sm text-gray-300 italic">
                      Example: "{signal.example}"
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Negative Signals */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <TrendingDown className="w-6 h-6 text-red-400" />
                <h3 className="text-xl font-bold text-white">Negative Language Detected</h3>
              </div>
              <div className="text-2xl font-bold text-red-400">{totalNegative}%</div>
            </div>
            <div className="space-y-3">
              {data.negativeSignals.map((signal, idx) => (
                <div 
                  key={idx} 
                  className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 hover:bg-red-500/20 transition-all"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="font-bold text-red-300">"{signal.phrase}"</div>
                      <div className="text-sm text-gray-400">({signal.mentions} mentions)</div>
                    </div>
                    <div className="text-lg font-bold text-red-400">{signal.impact_points || signal.points}%</div>
                  </div>
                  {signal.example && (
                    <div className="text-sm text-gray-300 italic">
                      Example: "{signal.example}"
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Final Calculation */}
          <div className="bg-blue-500/20 border border-blue-400/50 rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-4">Final Calculation</h3>
            <div className="space-y-2 text-lg">
              <div className="flex justify-between text-gray-300">
                <span>Base Score:</span>
                <span className="font-mono">{baseScore}%</span>
              </div>
              <div className="flex justify-between text-green-400">
                <span>+ Positive Signals:</span>
                <span className="font-mono">+{totalPositive}%</span>
              </div>
              <div className="flex justify-between text-red-400">
                <span>- Negative Signals:</span>
                <span className="font-mono">{totalNegative}%</span>
              </div>
              <div className="border-t border-white/20 pt-2 mt-2"></div>
              <div className="flex justify-between text-blue-400 text-2xl font-bold">
                <span>Final Sentiment Score:</span>
                <span className="font-mono">{data.sentimentScore}%</span>
              </div>
            </div>
          </div>

          {/* Methodology Note */}
          <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600">
            <h4 className="font-bold text-white mb-2">How This Works</h4>
            <p className="text-sm text-gray-300">
              Our AI analyzes every sentence in the earnings call transcript, evaluating context, 
              speaker importance, and linguistic patterns. CEO statements in prepared remarks 
              carry 2x weight compared to Q&A responses. Context-aware scoring distinguishes 
              between different uses of the same word (e.g., "challenging the competition" vs. 
              "challenging market conditions").
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-slate-900/95 backdrop-blur border-t border-blue-400/20 p-4 flex justify-end">
          <button
            onClick={onClose}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-all"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  )
}