// src/components/charts/MetricsBarList.js
'use client'

import React from 'react';

const MetricBar = ({ title, value }) => {
  const percentage = Math.round((value || 0) * 100);
  
  return (
    <div className="bg-black/30 p-5 rounded-lg">
      <div className="flex items-center justify-between mb-3">
        <div className="text-sm text-gray-400 font-semibold">{title}</div>
        <div className="text-2xl font-bold text-white">{percentage}/100</div>
      </div>
      
      <div className="w-full bg-gray-700 rounded-full h-3 relative overflow-hidden">
        <div
          className="h-3 rounded-full transition-all duration-500"
          style={{
            width: `${percentage}%`,
            background: "linear-gradient(90deg, #6B7280 0%, #3B82F6 50%, #22C55E 100%)"
          }}
        ></div>
      </div>
      
      <div className="mt-2 text-xs text-gray-500">
        {percentage >= 80 ? 'Excellent' :
         percentage >= 60 ? 'Strong' :
         percentage >= 40 ? 'Good' :
         percentage >= 20 ? 'Fair' : 'Needs Improvement'}
      </div>
    </div>
  );
};

const MetricsBarList = ({ novelty, impact, clarity, diversity, momentum }) => {
  console.log('MetricsBarList received:', { novelty, impact, clarity, diversity, momentum }); // Debug

  return (
    <div className="space-y-4">
      <MetricBar title="Novelty Score" value={novelty} />
      <MetricBar title="Market Impact" value={impact} />
      <MetricBar title="Clarity Index" value={clarity} />
      <MetricBar title="Portfolio Diversity" value={diversity} />
      <MetricBar title="Innovation Momentum" value={momentum} />
    </div>
  );
};

export default MetricsBarList;