'use client'

import { DollarSign, TrendingUp, Target, BarChart3 } from 'lucide-react'

export default function MarketContext({ currentQuarter }) {
  const yahoo = currentQuarter?.yahoo_finance_data
  
  // If no Yahoo Finance data, show message
  if (!yahoo || !yahoo.fundamentals) {
    return (
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
        <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
          <BarChart3 className="w-6 h-6 text-blue-400" />
          Market Context
        </h3>
        <div className="text-center py-8 text-gray-400">
          Market data not available for this quarter
        </div>
      </div>
    )
  }

  const fundamentals = yahoo.fundamentals
  const priceTargets = yahoo.price_targets

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
      <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
        <BarChart3 className="w-6 h-6 text-blue-400" />
        Market Context
      </h3>
      
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        
        {/* Current Price */}
        <div className="bg-black/30 p-5 rounded-lg border border-blue-400/20">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-5 h-5 text-blue-400" />
            <div className="text-sm text-gray-400">Stock Price</div>
          </div>
          <div className="text-3xl font-bold text-blue-400">
            ${priceTargets.current_price.toFixed(2)}
          </div>
          <div className="text-xs text-gray-300 mt-1">
            Market Cap: ${(fundamentals.market_cap / 1e9).toFixed(1)}B
          </div>
        </div>
        
        {/* Valuation */}
        <div className="bg-black/30 p-5 rounded-lg border border-purple-400/20">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-purple-400" />
            <div className="text-sm text-gray-400">Valuation Metrics</div>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">P/E Ratio:</span>
              <span className="text-white font-semibold">{fundamentals.pe_ratio.toFixed(1)}x</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">P/S Ratio:</span>
              <span className="text-white font-semibold">{fundamentals.price_to_sales.toFixed(1)}x</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Forward P/E:</span>
              <span className="text-white font-semibold">{fundamentals.forward_pe.toFixed(1)}x</span>
            </div>
          </div>
        </div>
        
        {/* Analyst Price Targets */}
        <div className="bg-black/30 p-5 rounded-lg border border-green-400/20">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-5 h-5 text-green-400" />
            <div className="text-sm text-gray-400">Price Targets</div>
          </div>
          <div className="text-2xl font-bold text-green-400 mb-1">
            ${priceTargets.target_mean.toFixed(0)}
          </div>
          <div className="text-xs text-gray-300 mb-2">Mean Target</div>
          <div className="text-xs text-gray-400">
            Range: ${priceTargets.target_low.toFixed(0)} - ${priceTargets.target_high.toFixed(0)}
          </div>
          <div className={`text-sm font-semibold mt-2 ${
            priceTargets.upside_potential > 0 ? 'text-green-300' : 'text-red-300'
          }`}>
            {priceTargets.upside_potential > 0 ? '+' : ''}{priceTargets.upside_potential.toFixed(1)}% Upside
          </div>
        </div>
        
      </div>

      {/* Financial Metrics Grid */}
      <div className="grid md:grid-cols-4 gap-4">
        
        <div className="bg-gradient-to-br from-blue-500/10 to-transparent p-4 rounded-lg border border-blue-500/20">
          <div className="text-xs text-gray-400 mb-1">Revenue Growth</div>
          <div className="text-xl font-bold text-blue-300">
            {(fundamentals.revenue_growth * 100).toFixed(1)}%
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500/10 to-transparent p-4 rounded-lg border border-green-500/20">
          <div className="text-xs text-gray-400 mb-1">Profit Margin</div>
          <div className="text-xl font-bold text-green-300">
            {(fundamentals.profit_margin * 100).toFixed(1)}%
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500/10 to-transparent p-4 rounded-lg border border-purple-500/20">
          <div className="text-xs text-gray-400 mb-1">ROE</div>
          <div className="text-xl font-bold text-purple-300">
            {(fundamentals.roe * 100).toFixed(1)}%
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500/10 to-transparent p-4 rounded-lg border border-orange-500/20">
          <div className="text-xs text-gray-400 mb-1">Free Cash Flow</div>
          <div className="text-xl font-bold text-orange-300">
            ${(fundamentals.free_cash_flow / 1e9).toFixed(1)}B
          </div>
        </div>

      </div>

      {/* Sector Info */}
      <div className="mt-4 flex items-center justify-between text-sm">
        <div>
          <span className="text-gray-400">Sector:</span>{' '}
          <span className="text-gray-300 font-semibold">{yahoo.sector}</span>
        </div>
        <div>
          <span className="text-gray-400">Industry:</span>{' '}
          <span className="text-gray-300 font-semibold">{yahoo.industry}</span>
        </div>
        <div className="text-xs text-gray-500">
          Data as of {new Date(yahoo.fetched_at).toLocaleDateString()}
        </div>
      </div>
    </div>
  )
}
