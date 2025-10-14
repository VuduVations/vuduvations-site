// src/app/earnings-analyzer/components/ExecutiveDashboard.js
'use client'

import { 
  TrendingUp, 
  DollarSign, 
  Target,
  Building2,
  CheckCircle,
  LineChart,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react'

export default function ExecutiveDashboard({ data, sentimentChange, stockPerf, sentimentTrend }) {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20 mb-8">
      <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
        <Target className="w-8 h-8 text-blue-400" />
        Executive Dashboard
      </h2>

      <div className="grid md:grid-cols-4 gap-6 mb-8">
        {/* Company Info */}
        <div className="bg-black/30 p-6 rounded-lg border border-blue-400/20">
          <div className="flex items-center gap-2 mb-2">
            <Building2 className="w-5 h-5 text-blue-400" />
            <div className="text-sm text-gray-400">Company</div>
          </div>
          <div className="text-2xl font-bold text-white mb-1">{data.ticker}</div>
          <div className="text-sm text-gray-300">{data.company}</div>
        </div>

        {/* Sentiment Evolution */}
        <div className="bg-black/30 p-6 rounded-lg border border-green-400/20">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-green-400" />
            <div className="text-sm text-gray-400">Sentiment Evolution</div>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-3xl font-bold text-green-400">
              {sentimentChange.positive ? '+' : ''}{sentimentChange.change}%
            </div>
            <ArrowUpRight className="w-6 h-6 text-green-400" />
          </div>
          <div className="text-xs text-gray-400 mt-1">0.72 → 0.78 (Q1→Q4)</div>
        </div>

        {/* Stock Performance */}
        <div className="bg-black/30 p-6 rounded-lg border border-purple-400/20">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-5 h-5 text-purple-400" />
            <div className="text-sm text-gray-400">Stock Performance</div>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-3xl font-bold text-purple-400">+{stockPerf.change}%</div>
            <ArrowUpRight className="w-6 h-6 text-purple-400" />
          </div>
          <div className="text-xs text-gray-400 mt-1">${stockPerf.q1} → ${stockPerf.q4}</div>
        </div>

        {/* Analysis Quality */}
        <div className="bg-black/30 p-6 rounded-lg border border-orange-400/20">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-5 h-5 text-orange-400" />
            <div className="text-sm text-gray-400">Analysis Quality</div>
          </div>
          <div className="text-3xl font-bold text-orange-400">High</div>
          <div className="text-xs text-gray-400 mt-1">4 Quarters Verified</div>
        </div>
      </div>

      {/* Sentiment Trend Chart */}
      <div className="bg-black/30 p-6 rounded-lg border border-white/10">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <LineChart className="w-5 h-5 text-blue-400" />
          Sentiment & Stock Price Trend (2024)
        </h3>
        
        <div className="grid grid-cols-4 gap-4 mb-4">
          {sentimentTrend.map((item, idx) => (
            <div key={idx} className="text-center">
              <div className="text-xs text-gray-400 mb-1">{item.quarter}</div>
              <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg p-4 border border-white/10">
                <div className="text-2xl font-bold text-blue-400 mb-1">
                  {item.sentiment.toFixed(2)}
                </div>
                <div className="text-xs text-gray-400 mb-2">Sentiment</div>
                <div className="text-lg font-semibold text-white mb-1">
                  ${item.stock_price.toFixed(0)}
                </div>
                <div className="text-xs text-gray-400 mb-2">Stock Price</div>
                <div className={`flex items-center justify-center gap-1 text-xs font-semibold ${
                  item.reaction > 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  {item.reaction > 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {item.reaction > 0 ? '+' : ''}{item.reaction}%
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Visual Sentiment Line */}
        <div className="relative h-2 bg-gradient-to-r from-orange-500 via-yellow-500 to-green-500 rounded-full overflow-hidden">
          <div 
            className="absolute top-0 h-full bg-white/30"
            style={{
              left: `${(sentimentTrend[0].sentiment - 0.5) / 0.5 * 100}%`,
              width: `${((sentimentTrend[3].sentiment - sentimentTrend[0].sentiment) / 0.5 * 100)}%`
            }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>0.50 (Neutral)</span>
          <span>0.75 (Positive)</span>
          <span>1.00 (Very Positive)</span>
        </div>
      </div>
    </div>
  )
}