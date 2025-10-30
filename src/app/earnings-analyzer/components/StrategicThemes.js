'use client'

import { Target, AlertTriangle, TrendingUp, ChevronDown, ChevronUp, Lightbulb, Shield, Rocket, Zap } from 'lucide-react'

export default function StrategicThemes({ currentQuarter, expanded, toggleSection }) {
  // Safely extract data with fallbacks
  const themes = currentQuarter?.topic_analysis?.strategic_themes || []
  const riskFactors = currentQuarter?.topic_analysis?.risk_factors || []
  const opportunities = currentQuarter?.topic_analysis?.opportunities || []

  // Smart icon selection based on theme content
  const getThemeIcon = (themeName, description) => {
    const text = ((themeName || '') + ' ' + (description || '')).toLowerCase()
    
    if (text.includes('advertising') || text.includes('monetization') || text.includes('revenue')) {
      return { icon: <Rocket className="w-6 h-6" />, color: 'text-orange-400', bg: 'bg-orange-500/20' }
    }
    if (text.includes('resilience') || text.includes('production') || text.includes('safety')) {
      return { icon: <Shield className="w-6 h-6" />, color: 'text-blue-400', bg: 'bg-blue-500/20' }
    }
    if (text.includes('content') || text.includes('diverse') || text.includes('strategy')) {
      return { icon: <Lightbulb className="w-6 h-6" />, color: 'text-purple-400', bg: 'bg-purple-500/20' }
    }
    if (text.includes('currency') || text.includes('management') || text.includes('financial')) {
      return { icon: <Zap className="w-6 h-6" />, color: 'text-green-400', bg: 'bg-green-500/20' }
    }
    
    return { icon: <Target className="w-6 h-6" />, color: 'text-purple-400', bg: 'bg-purple-500/20' }
  }

  // Color scheme rotation for variety
  const getBorderColor = (idx) => {
    const colors = ['border-blue-500', 'border-purple-500', 'border-green-500', 'border-orange-500']
    return colors[idx % colors.length]
  }

  // Normalize themes to handle both string and object formats
  const normalizedThemes = themes.map((theme, idx) => {
    if (typeof theme === 'object' && theme !== null) {
      return {
        theme_name: theme.theme_name || `Theme ${idx + 1}`,
        description: theme.description || ''
      }
    }
    return {
      theme_name: typeof theme === 'string' ? theme : `Theme ${idx + 1}`,
      description: ''
    }
  })

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
      <button
        onClick={() => toggleSection('themes')}
        className="w-full flex items-center justify-between mb-4"
      >
        <h3 className="text-2xl font-bold flex items-center gap-3">
          <Target className="w-6 h-6 text-purple-400" />
          Strategic Themes & Initiatives
        </h3>
        {expanded ? <ChevronUp /> : <ChevronDown />}
      </button>

      {expanded && (
        <div className="space-y-5">
          
          {/* Strategic Theme Cards */}
          {normalizedThemes.length > 0 ? (
            normalizedThemes.map((theme, idx) => {
              const { icon, color, bg } = getThemeIcon(theme.theme_name, theme.description)
              const borderColor = getBorderColor(idx)
              
              return (
                <div 
                  key={idx} 
                  className={`bg-gradient-to-r from-black/40 to-black/20 p-6 rounded-xl border-l-4 ${borderColor} hover:from-black/50 hover:to-black/30 transition-all duration-300 group`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`${bg} ${color} p-3 rounded-xl flex-shrink-0 group-hover:scale-110 transition-transform`}>
                      {icon}
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">
                        {theme.theme_name}
                      </h4>
                      {theme.description && (
                        <p className="text-gray-300 text-base leading-relaxed">
                          {theme.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )
            })
          ) : (
            <div className="text-center py-8 text-gray-400">
              No strategic themes available for this quarter
            </div>
          )}

          {/* Risk Factors & Opportunities Grid */}
          {(riskFactors.length > 0 || opportunities.length > 0) && (
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              
              {/* Risk Factors */}
              {riskFactors.length > 0 && (
                <div className="bg-gradient-to-br from-orange-500/10 to-red-500/5 p-6 rounded-xl border border-orange-500/30">
                  <h4 className="text-xl font-bold text-orange-400 mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    Risk Factors
                  </h4>
                  <div className="space-y-3">
                    {riskFactors.map((risk, idx) => {
                      // Handle both string and object formats
                      const riskText = typeof risk === 'object' && risk !== null 
                        ? risk.description || risk.risk || JSON.stringify(risk)
                        : risk
                      
                      return (
                        <div 
                          key={idx} 
                          className="flex items-start gap-3 p-3 bg-black/30 rounded-lg hover:bg-black/40 transition-colors"
                        >
                          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold flex-shrink-0 mt-0.5">
                            {idx + 1}
                          </div>
                          <span className="text-gray-300 text-sm leading-relaxed">{riskText}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Opportunities */}
              {opportunities.length > 0 && (
                <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/5 p-6 rounded-xl border border-green-500/30">
                  <h4 className="text-xl font-bold text-green-400 mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Opportunities
                  </h4>
                  <div className="space-y-3">
                    {opportunities.map((opp, idx) => {
                      // Handle both string and object formats
                      const oppText = typeof opp === 'object' && opp !== null 
                        ? opp.description || opp.opportunity || JSON.stringify(opp)
                        : opp
                      
                      return (
                        <div 
                          key={idx} 
                          className="flex items-start gap-3 p-3 bg-black/30 rounded-lg hover:bg-black/40 transition-colors"
                        >
                          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500/20 text-green-400 text-xs font-bold flex-shrink-0 mt-0.5">
                            {idx + 1}
                          </div>
                          <span className="text-gray-300 text-sm leading-relaxed">{oppText}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Summary Stats Bar */}
          <div className="flex items-center justify-around p-4 bg-black/30 rounded-lg border border-white/10 mt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-1">{normalizedThemes.length}</div>
              <div className="text-xs text-gray-400 uppercase tracking-wider">Strategic Themes</div>
            </div>
            <div className="h-12 w-px bg-white/20"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-1">{opportunities.length}</div>
              <div className="text-xs text-gray-400 uppercase tracking-wider">Opportunities</div>
            </div>
            <div className="h-12 w-px bg-white/20"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-400 mb-1">{riskFactors.length}</div>
              <div className="text-xs text-gray-400 uppercase tracking-wider">Risk Factors</div>
            </div>
          </div>

        </div>
      )}
    </div>
  )
}
