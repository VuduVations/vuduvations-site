// src/components/charts/KeyDriversRadar.js
'use client'

import React from 'react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar, Tooltip as RechartsTooltip } from 'recharts';

const KeyDriversRadar = ({ data }) => {
  console.log('KeyDriversRadar received data:', data); // Debug

  if (!data || data.length === 0) {
    return (
      <div className="h-96 flex items-center justify-center text-gray-400">
        No data available for radar chart
      </div>
    );
  }

  return (
    <div className="h-96 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
          <PolarGrid stroke="#4A5568" />
          <PolarAngleAxis 
            dataKey="subject" 
            tick={{ fill: '#A0AEC0', fontSize: 14 }} 
          />
          <Radar 
            name="Industry Avg" 
            dataKey="ClusterAvg" 
            stroke="#3B82F6" 
            fill="#3B82F6" 
            fillOpacity={0.4} 
            strokeWidth={2}
          />
          <Radar 
            name={`Current`}
            dataKey="Current" 
            stroke="#22C55E" 
            fill="#22C55E" 
            fillOpacity={0.2} 
            strokeWidth={2}
          />
          <RechartsTooltip 
            contentStyle={{ 
              backgroundColor: '#2D3748', 
              border: '1px solid #4A5568', 
              color: 'white',
              borderRadius: '8px'
            }} 
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default KeyDriversRadar;