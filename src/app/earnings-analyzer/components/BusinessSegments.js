// src/app/earnings-analyzer/components/BusinessSegments.js
'use client'

import { 
  PieChart, 
  ChevronDown, 
  ChevronUp, 
  TrendingUp, 
  TrendingDown,
  DollarSign, 
  Users, 
  Target,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Zap,
  Award
} from 'lucide-react'

export default function BusinessSegments({ currentQuarter, expanded, toggleSection }) {
  
  // Get business segments
  const rawSegments = currentQuarter?.topic_analysis?.business_segments_discussed || []
  
  // Normalize segments to consistent format
  const segments = rawSegments.map((seg, idx) => {
    if (typeof seg === 'object' && seg !== null && seg.segment_name) {
      return seg
    }
    if (typeof seg === 'string') {
      return {
        segment_name: seg,
        financial_evidence: { revenue: 'Not disclosed' },
        key_developments: ''
      }
    }
    return {
      segment_name: `Segment ${idx + 1}`,
      financial_evidence: {},
      key_developments: ''
    }
  })

  // Helper to check if financial_evidence is an object
  const isStructuredData = (evidence) => {
    return typeof evidence === 'object' && evidence !== null && !Array.isArray(evidence)
  }

  // Extract metrics from text or structured data
  const extractMetrics = (segment) => {
    const metrics = []
    const evidence = segment.financial_evidence
    const devText = segment.key_developments || ''
    
    // If structured data
    if (isStructuredData(evidence)) {
      if (evidence.revenue) {
        metrics.push({
          label: 'Revenue',
          value: evidence.revenue,
          icon: <DollarSign className="w-5 h-5" />,
          type: 'currency',
          color: 'blue'
        })
      }
      
      if (evidence.year_on_year_growth || evidence.year_on_year_change) {
        const growth = evidence.year_on_year_growth || evidence.year_on_year_change
        const isPositive = !growth.toString().includes('-')
        metrics.push({
          label: 'YoY Growth',
          value: growth,
          icon: isPositive ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />,
          type: 'growth',
          color: isPositive ? 'green' : 'red',
          isPositive
        })
      }
      
      if (evidence.key_metrics) {
        metrics.push({
          label: 'Key Metric',
          value: evidence.key_metrics,
          icon: <Target className="w-5 h-5" />,
          type: 'metric',
          color: 'purple'
        })
      }
    }
    
    // Extract from text
    const textToSearch = typeof evidence === 'string' ? evidence : JSON.stringify(evidence)
    const allText = textToSearch + ' ' + devText
    
    // Extract revenue if not already found
    if (metrics.length === 0 || !metrics.find(m => m.type === 'currency')) {
      const dollarMatch = allText.match(/\$\d+(?:\.\d+)?\s?(?:billion|B|million|M)/i)
      if (dollarMatch) {
        metrics.unshift({
          label: 'Revenue',
          value: dollarMatch[0],
          icon: <DollarSign className="w-5 h-5" />,
          type: 'currency',
          color: 'blue'
        })
      }
    }
    
    // Extract growth if not already found
    if (!metrics.find(m => m.type === 'growth')) {
      const growthMatch = allText.match(/(\+|\-)?(\d+(?:\.\d+)?)\s?%\s?(?:YoY|year over year)/i)
      if (growthMatch) {
        const isPositive = !growthMatch[0].includes('-')
        metrics.push({
          label: 'YoY Growth',
          value: growthMatch[0],
          icon: isPositive ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />,
          type: 'growth',
          color: isPositive ? 'green' : 'red',
          isPositive
        })
      }
    }
    
    // Extract key metrics (users, subscribers, etc.)
    if (!metrics.find(m => m.type === 'metric')) {
      const metricMatch = allText.match(/(\d+(?:\.\d+)?)\s?(?:million|M|billion|B)\s?(?:subscribers|users|additions|members)/i)
      if (metricMatch) {
        metrics.push({
          label: 'Key Metric',
          value: metricMatch[0],
          icon: <Users className="w-5 h-5" />,
          type: 'metric',
          color: 'purple'
        })
      }
    }
    
    return metrics.slice(0, 3)
  }

  // Assess segment health based on metrics
  const assessSegmentHealth = (segment) => {
    const evidence = segment.financial_evidence
    const devText = (segment.key_developments || '').toLowerCase()
    
    let score = 0
    let indicators = []
    
    // Check for positive indicators
    if (devText.includes('growth') || devText.includes('strong') || devText.includes('exceed')) {
      score += 1
      indicators.push('positive')
    }
    if (devText.includes('record') || devText.includes('milestone')) {
      score += 1
      indicators.push('positive')
    }
    
    // Check for negative indicators
    if (devText.includes('challenge') || devText.includes('pressure') || devText.includes('decline')) {
      score -= 1
      indicators.push('negative')
    }
    
    // Check financial evidence
    if (isStructuredData(evidence)) {
      const growth = evidence.year_on_year_growth || evidence.year_on_year_change || ''
      if (growth && !growth.toString().includes('-')) {
        score += 1
      } else if (growth && growth.toString().includes('-')) {
        score -= 1
      }
    }
    
    if (score > 0) return { status: 'Strong', color: 'green', icon: <Award className="w-4 h-4" /> }
    if (score < 0) return { status: 'Challenged', color: 'yellow', icon: <Activity className="w-4 h-4" /> }
    return { status: 'Stable', color: 'blue', icon: <Zap className="w-4 h-4" /> }
  }

  if (segments.length === 0) {
    return (
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
        <button
          onClick={() => toggleSection('segments')}
          className="w-full flex items-center justify-between mb-4"
        >
          <h3 className="text-2xl font-bold flex items-center gap-3">
            <PieChart className="w-6 h-6 text-blue-400" />
            Business Segment Performance
          </h3>
          {expanded ? <ChevronUp /> : <ChevronDown />}
        </button>

        {expanded && (
          <div className="text-center text-gray-400 py-8">
            No business segment data available for this quarter.
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
      <button
        onClick={() => toggleSection('segments')}
        className="w-full flex items-center justify-between mb-4"
      >
        <h3 className="text-2xl font-bold flex items-center gap-3">
          <PieChart className="w-6 h-6 text-blue-400" />
          Business Segment Performance
        </h3>
        {expanded ? <ChevronUp /> : <ChevronDown />}
      </button>

      {expanded && (
        <div className="space-y-6">
          {/* Segment Overview Header */}
          <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg p-4 border border-blue-400/30">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-400">Strategic Business Units</div>
                <div className="text-2xl font-bold text-white">{segments.length} Segments</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-400">Analysis Period</div>
                <div className="text-lg font-semibold text-blue-300">{currentQuarter?.quarter || 'Q4 2024'}</div>
              </div>
            </div>
          </div>

          {/* Segment Cards Grid */}
          <div className={`grid gap-6 ${
            segments.length === 1 ? 'grid-cols-1' :
            segments.length === 2 ? 'md:grid-cols-2' :
            'md:grid-cols-2 lg:grid-cols-3'
          }`}>
            {segments.map((segment, idx) => {
              const metrics = extractMetrics(segment)
              const health = assessSegmentHealth(segment)
              
              return (
                <div 
                  key={idx} 
                  className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl border-2 border-slate-700 hover:border-blue-400/50 transition-all overflow-hidden"
                >
                  {/* Segment Header */}
                  <div className={`bg-gradient-to-r from-${health.color}-500/20 to-${health.color}-600/20 p-4 border-b border-${health.color}-400/30`}>
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-lg font-bold text-white">{segment.segment_name}</h4>
                      <div className="flex gap-2">
                        {/* Health Status Badge */}
                        <div className={`flex items-center gap-1 px-2 py-1 rounded-full bg-${health.color}-500/30 border border-${health.color}-400/50`}>
                          {health.icon}
                          <span className={`text-xs font-semibold text-${health.color}-300`}>
                            {health.status}
                          </span>
                        </div>
                        
                        {/* Competitive Position Badge - NEW */}
                        {segment.competitive_analysis?.market_position && (
                          <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-purple-500/30 border border-purple-400/50">
                            <Award className="w-3 h-3 text-purple-300" />
                            <span className="text-xs font-semibold text-purple-300">
                              {segment.competitive_analysis.market_position}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Trajectory Indicator - NEW */}
                    {segment.trend_analysis?.trajectory && (
                      <div className="flex items-center gap-2 text-xs text-gray-300">
                        <Activity className="w-3 h-3" />
                        <span className="text-gray-400">Trajectory:</span>
                        <span className="font-semibold">{segment.trend_analysis.trajectory}</span>
                        {segment.trend_analysis.quarterly_cagr && (
                          <>
                            <span className="text-gray-500">•</span>
                            <span className="text-green-400">{segment.trend_analysis.quarterly_cagr} CAGR</span>
                          </>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Key Metrics */}
                  {metrics.length > 0 && (
                    <div className="p-4 space-y-3">
                      {metrics.map((metric, metricIdx) => (
                        <div 
                          key={metricIdx} 
                          className={`bg-${metric.color}-500/10 border border-${metric.color}-400/30 rounded-lg p-3`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className={`text-${metric.color}-400`}>
                                {metric.icon}
                              </div>
                              <div>
                                <div className="text-xs text-gray-400 mb-0.5">{metric.label}</div>
                                <div className={`text-lg font-bold text-${metric.color}-300`}>
                                  {metric.value}
                                </div>
                              </div>
                            </div>
                            {metric.type === 'growth' && (
                              <div className={`text-${metric.color}-400`}>
                                {metric.isPositive ? (
                                  <ArrowUpRight className="w-5 h-5" />
                                ) : (
                                  <ArrowDownRight className="w-5 h-5" />
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                      
                      {/* QoQ Comparison - NEW */}
                      {segment.financial_evidence?.qoq_comparison && (
                        <div className="bg-blue-500/10 border border-blue-400/30 rounded-lg p-3">
                          <div className="text-xs text-blue-300 font-semibold mb-2 flex items-center gap-1">
                            <TrendingUp className="w-3 h-3" />
                            Quarter-over-Quarter
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-300">
                              <span className="text-gray-400">vs {segment.financial_evidence.qoq_comparison.previous_quarter}:</span>
                            </div>
                            <div className={`text-lg font-bold ${
                              segment.financial_evidence.qoq_comparison.trend === 'up' ? 'text-green-400' : 'text-red-400'
                            }`}>
                              {segment.financial_evidence.qoq_comparison.qoq_change}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Key Developments */}
                  {segment.key_developments && (
                    <div className="p-4 pt-0">
                      <div className="bg-slate-700/30 rounded-lg p-3 border border-slate-600">
                        <div className="flex items-start gap-2">
                          <TrendingUp className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="text-xs text-gray-400 font-semibold mb-1">Key Developments</div>
                            <div className="text-sm text-gray-300 leading-relaxed">
                              {segment.key_developments}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Strategic Implications - if we have rich data */}
                  {isStructuredData(segment.financial_evidence) && Object.keys(segment.financial_evidence).length > 3 && (
                    <div className="p-4 pt-0">
                      <div className="bg-blue-500/10 border border-blue-400/30 rounded-lg p-3">
                        <div className="text-xs text-blue-300 font-semibold mb-2">Strategic Implications</div>
                        <div className="text-xs text-gray-300 space-y-1">
                          {Object.entries(segment.financial_evidence).slice(0, 2).map(([key, value], i) => (
                            <div key={i} className="flex justify-between">
                              <span className="text-gray-400 capitalize">{key.replace(/_/g, ' ')}:</span>
                              <span className="text-gray-200 font-medium">{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Strategic Summary Footer */}
          <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
            <div className="flex items-start gap-3">
              <Target className="w-5 h-5 text-blue-400 mt-0.5" />
              <div>
                <div className="text-sm font-semibold text-white mb-1">Strategic Insights</div>
                <div className="text-sm text-gray-300 leading-relaxed">
                  Portfolio analysis reveals {segments.filter(s => assessSegmentHealth(s).status === 'Strong').length} strong-performing segments 
                  with positive growth trajectories, indicating robust operational execution across core business units.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
