// src/app/earnings-analyzer/components/QuarterSelector.js
'use client'

import { Calendar } from 'lucide-react'

export default function QuarterSelector({ quarters, selectedQuarter, setSelectedQuarter, data }) {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 mb-8">
      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
        <Calendar className="w-5 h-5 text-blue-400" />
        Select Quarter for Detailed Analysis
      </h3>
      <div className="grid grid-cols-4 gap-4">
        {quarters.map((q) => {
          const quarterData = data.quarterly_results[q]
          const isSelected = selectedQuarter === q
          return (
            <button
              key={q}
              onClick={() => setSelectedQuarter(q)}
              className={`p-4 rounded-lg border-2 transition-all ${
                isSelected
                  ? 'bg-blue-500/30 border-blue-400 shadow-lg shadow-blue-500/20'
                  : 'bg-black/30 border-white/10 hover:border-white/30'
              }`}
            >
              <div className="text-lg font-bold text-white mb-1">
                {q.replace('_2024', ' 2024')}
              </div>
              <div className="text-sm text-gray-400 mb-2">
                Sentiment: {quarterData.sentiment_score.toFixed(2)}
              </div>
              <div className="text-xs text-gray-400">
                ${quarterData.stock_price.toFixed(2)}
              </div>
              <div className={`text-xs font-semibold mt-1 ${
                quarterData.earnings_reaction > 0 ? 'text-green-400' : 'text-red-400'
              }`}>
                {quarterData.earnings_reaction > 0 ? '+' : ''}{quarterData.earnings_reaction}% reaction
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}