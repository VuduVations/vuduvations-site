// components/ManagementCredibility.js
'use client'

import { Target, TrendingUp, CheckCircle, XCircle, AlertCircle } from 'lucide-react'

export default function ManagementCredibility({ data, currentQuarter, selectedQuarter }) {
  const credibility = data.management_credibility
  
  // Helper function to calculate variance if missing
  const calculateVariance = (guided, actual, metricType = 'revenue') => {
    if (!guided || !actual) return 'N/A'
    
    // Remove $ and B/M suffixes and convert to numbers
    const parseValue = (val) => {
      if (typeof val === 'number') return val
      const str = String(val).replace(/[$,]/g, '')
      if (str.includes('B')) return parseFloat(str) * 1e9
      if (str.includes('M')) return parseFloat(str) * 1e6
      if (str.includes('%')) return parseFloat(str) / 100
      return parseFloat(str)
    }
    
    const guidedNum = parseValue(guided)
    const actualNum = parseValue(actual)
    
    if (isNaN(guidedNum) || isNaN(actualNum)) return 'N/A'
    
    // Calculate percentage difference
    const percentDiff = ((actualNum - guidedNum) / guidedNum * 100).toFixed(1)
    
    // For margin, show as basis points
    if (metricType === 'margin' || String(guided).includes('%')) {
      const bpsDiff = ((actualNum - guidedNum) * 100).toFixed(0)
      return `${bpsDiff > 0 ? '+' : ''}${bpsDiff} bps`
    }
    
    // For revenue/EPS, show as percentage
    return `${percentDiff > 0 ? '+' : ''}${percentDiff}%`
  }
  
  // Get all quarters with guidance accuracy data
  const quartersWithGuidance = Object.entries(data.quarterly_results)
    .filter(([_, qData]) => qData.guidance_accuracy)
    .map(([quarter, qData]) => ({
      quarter,
      data: qData.guidance_accuracy
    }))

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-purple-400/20">
      {/* Overall Credibility Score */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-purple-500/10 rounded-lg p-6 border border-purple-400/20">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-5 h-5 text-purple-400" />
            <div className="text-sm text-gray-400">Credibility Score</div>
          </div>
          <div className="text-4xl font-bold text-purple-400">
            {credibility.credibility_score !== null 
              ? `${credibility.credibility_score.toFixed(0)}%`
              : 'N/A'}
          </div>
          <div className="text-xs text-gray-400 mt-1">
            {credibility.track_record}
          </div>
        </div>

        <div className="bg-blue-500/10 rounded-lg p-6 border border-blue-400/20">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-blue-400" />
            <div className="text-sm text-gray-400">Quarters Tracked</div>
          </div>
          <div className="text-4xl font-bold text-blue-400">
            {credibility.quarters_with_tracking}/{credibility.quarters_analyzed}
          </div>
          <div className="text-xs text-gray-400 mt-1">
            With guidance data
          </div>
        </div>

        <div className="bg-green-500/10 rounded-lg p-6 border border-green-400/20">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <div className="text-sm text-gray-400">Total Metrics</div>
          </div>
          <div className="text-4xl font-bold text-green-400">
            {credibility.total_beats}/{credibility.total_comparisons}
          </div>
          <div className="text-xs text-gray-400 mt-1">
            Beaten/Total
          </div>
        </div>
      </div>

      {/* Quarter-by-Quarter Breakdown */}
      <div>
        <h4 className="text-xl font-bold mb-4 text-white">Quarter-by-Quarter Accuracy</h4>
        
        {quartersWithGuidance.length === 0 ? (
          <div className="bg-white/5 rounded-lg p-6 text-center">
            <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-400">No guidance accuracy data available yet</p>
            <p className="text-sm text-gray-500 mt-1">
              Guidance accuracy is calculated by comparing previous quarter's guidance to current actuals
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {quartersWithGuidance.map(({ quarter, data: guidanceData }) => (
              <div 
                key={quarter}
                className={`bg-white/5 rounded-lg p-6 border ${
                  quarter === selectedQuarter 
                    ? 'border-purple-400/40 bg-purple-500/10' 
                    : 'border-white/10'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h5 className="text-lg font-bold text-white">
                      {quarter.replace('_', ' ')}
                    </h5>
                    <p className="text-sm text-gray-400">
                      Comparing to previous quarter's guidance
                    </p>
                  </div>
                  <div className="text-right">
                    <div className={`text-2xl font-bold ${
                      guidanceData.overall_accuracy_score !== null && guidanceData.overall_accuracy_score >= 50
                        ? 'text-green-400'
                        : guidanceData.overall_accuracy_score !== null
                        ? 'text-red-400'
                        : 'text-gray-400'
                    }`}>
                      {guidanceData.overall_accuracy_score !== null
                        ? `${guidanceData.overall_accuracy_score.toFixed(0)}%`
                        : 'N/A'}
                    </div>
                    <div className="text-xs text-gray-400">
                      {guidanceData.narrative || 'No data'}
                    </div>
                  </div>
                </div>

                {/* Individual Metrics */}
                <div className="grid md:grid-cols-2 gap-4">
                  {/* Revenue Accuracy */}
                  {guidanceData.revenue_accuracy && (
                    <div className="bg-black/20 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        {guidanceData.revenue_accuracy.status === 'beat' ? (
                          <CheckCircle className="w-4 h-4 text-green-400" />
                        ) : guidanceData.revenue_accuracy.status === 'miss' ? (
                          <XCircle className="w-4 h-4 text-red-400" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-yellow-400" />
                        )}
                        <span className="text-sm font-semibold text-white">Revenue</span>
                      </div>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Guided:</span>
                          <span className="text-white">{guidanceData.revenue_accuracy.guided}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Actual:</span>
                          <span className="text-white">{guidanceData.revenue_accuracy.actual}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Variance:</span>
                          <span className={`font-semibold ${
                            guidanceData.revenue_accuracy.status === 'beat' 
                              ? 'text-green-400' 
                              : guidanceData.revenue_accuracy.status === 'miss'
                              ? 'text-red-400'
                              : 'text-yellow-400'
                          }`}>
                            {guidanceData.revenue_accuracy.variance_pct !== undefined 
                              ? `${guidanceData.revenue_accuracy.variance_pct > 0 ? '+' : ''}${guidanceData.revenue_accuracy.variance_pct.toFixed(1)}%`
                              : guidanceData.revenue_accuracy.variance || 
                                calculateVariance(guidanceData.revenue_accuracy.guided, guidanceData.revenue_accuracy.actual, 'revenue')}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* EPS Accuracy */}
                  {guidanceData.eps_accuracy && (
                    <div className="bg-black/20 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        {guidanceData.eps_accuracy.status === 'beat' ? (
                          <CheckCircle className="w-4 h-4 text-green-400" />
                        ) : guidanceData.eps_accuracy.status === 'miss' ? (
                          <XCircle className="w-4 h-4 text-red-400" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-yellow-400" />
                        )}
                        <span className="text-sm font-semibold text-white">EPS</span>
                      </div>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Guided:</span>
                          <span className="text-white">{guidanceData.eps_accuracy.guided}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Actual:</span>
                          <span className="text-white">{guidanceData.eps_accuracy.actual}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Variance:</span>
                          <span className={`font-semibold ${
                            guidanceData.eps_accuracy.status === 'beat' 
                              ? 'text-green-400' 
                              : guidanceData.eps_accuracy.status === 'miss'
                              ? 'text-red-400'
                              : 'text-yellow-400'
                          }`}>
                            {guidanceData.eps_accuracy.variance_pct !== undefined 
                              ? `${guidanceData.eps_accuracy.variance_pct > 0 ? '+' : ''}${guidanceData.eps_accuracy.variance_pct.toFixed(1)}%`
                              : guidanceData.eps_accuracy.variance || 
                                calculateVariance(guidanceData.eps_accuracy.guided, guidanceData.eps_accuracy.actual, 'eps')}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Margin Accuracy (if available) */}
                  {guidanceData.margin_accuracy && (
                    <div className="bg-black/20 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        {guidanceData.margin_accuracy.status === 'beat' ? (
                          <CheckCircle className="w-4 h-4 text-green-400" />
                        ) : guidanceData.margin_accuracy.status === 'miss' ? (
                          <XCircle className="w-4 h-4 text-red-400" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-yellow-400" />
                        )}
                        <span className="text-sm font-semibold text-white">Margin</span>
                      </div>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Guided:</span>
                          <span className="text-white">{guidanceData.margin_accuracy.guided}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Actual:</span>
                          <span className="text-white">{guidanceData.margin_accuracy.actual}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Variance:</span>
                          <span className={`font-semibold ${
                            guidanceData.margin_accuracy.status === 'beat' 
                              ? 'text-green-400' 
                              : guidanceData.margin_accuracy.status === 'miss'
                              ? 'text-red-400'
                              : 'text-yellow-400'
                          }`}>
                            {guidanceData.margin_accuracy.variance_pts !== undefined 
                              ? `${guidanceData.margin_accuracy.variance_pts > 0 ? '+' : ''}${guidanceData.margin_accuracy.variance_pts.toFixed(1)} pts`
                              : guidanceData.margin_accuracy.variance || 
                                calculateVariance(guidanceData.margin_accuracy.guided, guidanceData.margin_accuracy.actual, 'margin')}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Interpretation Guide */}
      <div className="mt-6 bg-blue-500/10 rounded-lg p-4 border border-blue-400/20">
        <h5 className="text-sm font-semibold text-blue-300 mb-2">💡 How to Interpret</h5>
        <ul className="text-sm text-gray-300 space-y-1">
          <li>• <strong>Beat:</strong> Management exceeded their own guidance (positive signal)</li>
          <li>• <strong>Met:</strong> Results matched guidance exactly (neutral)</li>
          <li>• <strong>Miss:</strong> Results fell short of guidance (negative signal)</li>
          <li>• <strong>High Score (70%+):</strong> Management has strong forecasting ability</li>
          <li>• <strong>Low Score (&lt;50%):</strong> Management may be overly optimistic or facing unpredictable conditions</li>
        </ul>
      </div>
    </div>
  )
}