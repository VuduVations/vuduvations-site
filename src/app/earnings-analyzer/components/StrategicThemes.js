// src/app/earnings-analyzer/components/StrategicThemes.js
'use client'

import { Target, AlertTriangle, TrendingUp, ChevronDown, ChevronUp } from 'lucide-react'

export default function StrategicThemes({ currentQuarter, expanded, toggleSection }) {
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
        <div className="space-y-4">
          {currentQuarter.topic_analysis.strategic_themes.map((theme, idx) => (
            <div key={idx} className="bg-black/30 p-5 rounded-lg border-l-4 border-purple-500">
              <h4 className="text-lg font-bold text-white mb-2">{theme.theme_name}</h4>
              <p className="text-gray-300 text-sm">{theme.description}</p>
            </div>
          ))}

          <div className="grid md:grid-cols-2 gap-4 mt-6">
            <div className="bg-gradient-to-br from-orange-500/10 to-transparent p-5 rounded-lg border border-orange-500/20">
              <h4 className="text-lg font-bold text-orange-400 mb-3">Risk Factors</h4>
              <div className="space-y-2">
                {currentQuarter.topic_analysis.risk_factors.map((risk, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{risk}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-500/10 to-transparent p-5 rounded-lg border border-green-500/20">
              <h4 className="text-lg font-bold text-green-400 mb-3">Opportunities</h4>
              <div className="space-y-2">
                {currentQuarter.topic_analysis.opportunities.map((opp, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <TrendingUp className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{opp}</span>
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