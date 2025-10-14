// src/app/earnings-analyzer/components/BusinessSegments.js
'use client'

import { PieChart, ChevronDown, ChevronUp } from 'lucide-react'

export default function BusinessSegments({ currentQuarter, expanded, toggleSection }) {
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
        <div className="grid md:grid-cols-3 gap-4">
          {currentQuarter.topic_analysis.business_segments_discussed.map((segment, idx) => (
            <div key={idx} className="bg-black/30 p-5 rounded-lg border-l-4 border-blue-500">
              <h4 className="text-lg font-bold text-white mb-3">{segment.segment_name}</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Net Income:</span>
                  <span className="text-green-400 font-semibold">{segment.financial_evidence.net_income}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Revenue:</span>
                  <span className="text-blue-400 font-semibold">{segment.financial_evidence.revenue}</span>
                </div>
                {(segment.financial_evidence.year_on_year_growth || segment.financial_evidence.year_on_year_change) && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">YoY Growth:</span>
                    <span className={`font-semibold ${
                      (segment.financial_evidence.year_on_year_growth || segment.financial_evidence.year_on_year_change || '').includes('-') 
                        ? 'text-red-400' 
                        : 'text-green-400'
                    }`}>
                      {segment.financial_evidence.year_on_year_growth || segment.financial_evidence.year_on_year_change}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}