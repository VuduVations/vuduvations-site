// src/app/earnings-analyzer/components/FinancialInsights.js
'use client'

import { BarChart3, TrendingUp, TrendingDown, CheckCircle, AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react'

export default function FinancialInsights({ currentQuarter, expanded, toggleSection }) {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
      <button
        onClick={() => toggleSection('insights')}
        className="w-full flex items-center justify-between mb-4"
      >
        <h3 className="text-2xl font-bold flex items-center gap-3">
          <BarChart3 className="w-6 h-6 text-green-400" />
          Investment Insights & Analysis
        </h3>
        {expanded ? <ChevronUp /> : <ChevronDown />}
      </button>

      {expanded && (
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-6 rounded-lg border border-blue-500/20">
            <h4 className="text-lg font-bold text-blue-300 mb-4">Key Insights</h4>
            <div className="space-y-3">
              {currentQuarter.financial_insights.key_insights.map((insight, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 text-sm font-bold flex-shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <p className="text-gray-200">{insight}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-green-500/10 to-transparent p-5 rounded-lg border border-green-500/20">
              <h4 className="text-lg font-bold text-green-400 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Bullish Factors
              </h4>
              <div className="space-y-3">
                {currentQuarter.financial_insights.bullish_factors.map((factor, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{factor}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-red-500/10 to-transparent p-5 rounded-lg border border-red-500/20">
              <h4 className="text-lg font-bold text-red-400 mb-4 flex items-center gap-2">
                <TrendingDown className="w-5 h-5" />
                Bearish Factors
              </h4>
              <div className="space-y-3">
                {currentQuarter.financial_insights.bearish_factors.map((factor, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{factor}</span>
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