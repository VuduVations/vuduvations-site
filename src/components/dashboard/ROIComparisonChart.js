'use client'
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { TrendingUp, Award, DollarSign } from 'lucide-react';

const ROIComparisonChart = ({ useCases }) => {
  const [animated, setAnimated] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    setTimeout(() => setAnimated(true), 300);
  }, []);

  // ✅ FIXED: Read from root level, not financial_metrics
  console.log('📊 ROI Chart - Raw useCases:', useCases);

  // Prepare data sorted by ROI (highest first)
  const chartData = (useCases || [])
    .map((useCase, idx) => {
      // ✅ FIXED: Try multiple field name patterns
      const roi = useCase.estimated_roi || useCase.roi || useCase.financial_metrics?.roi_percentage || 0;
      const investment = useCase.estimated_cost || useCase.cost || useCase.financial_metrics?.implementation_cost || 0;
      const savings = useCase.estimated_savings || useCase.savings || useCase.financial_metrics?.annual_savings || 0;
      
      // Calculate payback in months
      const payback = savings > 0 ? (investment / savings) * 12 : 0;

      console.log(`  [${idx}] ${useCase.title}: ROI=${roi}%, Cost=$${investment}, Savings=$${savings}`);

      return {
        name: useCase.title,
        roi: roi,
        investment: investment,
        savings: savings,
        payback: payback,
        originalIndex: idx,
        rank: idx + 1
      };
    })
    .filter(item => item.roi > 0 || item.investment > 0) // Filter out empty use cases
    .sort((a, b) => b.roi - a.roi);

  console.log('📊 Processed chart data:', chartData);

  // Color gradient based on ROI value
  const getBarColor = (roi, index) => {
    if (hoveredIndex === index) {
      return '#14B8A6'; // Teal on hover
    }
    if (roi >= 300) return '#10B981'; // Green (excellent)
    if (roi >= 200) return '#14B8A6'; // Teal (great)
    if (roi >= 150) return '#06B6D4'; // Cyan (good)
    if (roi >= 100) return '#A855F7'; // Purple (moderate)
    return '#F59E0B'; // Orange (low)
  };

  // Custom tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-slate-900 border-2 border-teal-500 rounded-xl p-4 shadow-2xl">
          <div className="font-bold text-white text-lg mb-3">{data.name}</div>
          
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between gap-4">
              <span className="text-gray-400">ROI:</span>
              <span className="text-teal-400 font-bold text-lg">{data.roi.toFixed(1)}%</span>
            </div>
            
            <div className="flex items-center justify-between gap-4">
              <span className="text-gray-400">Investment:</span>
              <span className="text-white font-semibold">
                ${(data.investment / 1000).toFixed(0)}K
              </span>
            </div>
            
            <div className="flex items-center justify-between gap-4">
              <span className="text-gray-400">Annual Savings:</span>
              <span className="text-green-400 font-semibold">
                ${(data.savings / 1000).toFixed(0)}K
              </span>
            </div>
            
            <div className="flex items-center justify-between gap-4">
              <span className="text-gray-400">Payback:</span>
              <span className="text-purple-400 font-semibold">
                {data.payback.toFixed(1)} months
              </span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  // Custom Y-axis label with truncation
  const CustomYAxisTick = ({ x, y, payload }) => {
    const maxLength = 30;
    const text = payload.value;
    const truncated = text.length > maxLength 
      ? text.substring(0, maxLength) + '...' 
      : text;
    
    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={0}
          dy={4}
          textAnchor="end"
          fill="#94A3B8"
          fontSize={12}
          fontWeight={500}
        >
          {truncated}
        </text>
      </g>
    );
  };

  if (!chartData || chartData.length === 0) {
    return (
      <div className="bg-slate-900/50 border-2 border-slate-700 rounded-2xl p-12 text-center">
        <TrendingUp className="w-16 h-16 text-slate-600 mx-auto mb-4" />
        <p className="text-slate-400">No ROI data available</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 border-2 border-teal-500/50 rounded-2xl p-6 shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center shadow-lg">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">ROI Comparison</h3>
            <p className="text-sm text-gray-400">Return on Investment by Use Case</p>
          </div>
        </div>
        
        {/* Top performer badge */}
        {chartData[0] && (
          <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/50 rounded-full px-4 py-2">
            <Award className="w-5 h-5 text-yellow-400" />
            <div className="text-sm">
              <div className="text-yellow-400 font-bold">{chartData[0].roi.toFixed(0)}%</div>
              <div className="text-xs text-gray-400">Top ROI</div>
            </div>
          </div>
        )}
      </div>

      {/* Chart */}
      <div className={`transition-all duration-1000 ${animated ? 'opacity-100' : 'opacity-0'}`}>
        <ResponsiveContainer width="100%" height={Math.max(400, chartData.length * 70)}>
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 150, bottom: 5 }}
          >
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="#334155" 
              horizontal={true}
              vertical={false}
            />
            
            <XAxis 
              type="number"
              stroke="#64748B"
              tick={{ fill: '#94A3B8', fontSize: 12 }}
              tickFormatter={(value) => `${value}%`}
            />
            
            <YAxis 
              type="category"
              dataKey="name"
              stroke="#64748B"
              tick={<CustomYAxisTick />}
              width={140}
            />
            
            <Tooltip 
              content={<CustomTooltip />}
              cursor={{ fill: 'rgba(20, 184, 166, 0.1)' }}
            />
            
            <Bar 
              dataKey="roi"
              radius={[0, 8, 8, 0]}
              animationDuration={1500}
              animationBegin={300}
              onMouseEnter={(_, index) => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {chartData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`}
                  fill={getBarColor(entry.roi, index)}
                  opacity={hoveredIndex === null || hoveredIndex === index ? 1 : 0.5}
                  style={{
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="mt-6 pt-6 border-t border-slate-700">
        <div className="flex flex-wrap items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-green-500" />
            <span className="text-gray-400">Excellent (≥300%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-teal-500" />
            <span className="text-gray-400">Great (200-299%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-cyan-500" />
            <span className="text-gray-400">Good (150-199%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-purple-500" />
            <span className="text-gray-400">Moderate (100-149%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-orange-500" />
            <span className="text-gray-400">Low (&lt;100%)</span>
          </div>
        </div>
      </div>

      {/* Key insights */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <div className="text-xs text-gray-400 mb-1">Average ROI</div>
          <div className="text-2xl font-bold text-teal-400">
            {(chartData.reduce((sum, d) => sum + d.roi, 0) / chartData.length).toFixed(0)}%
          </div>
        </div>
        
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <div className="text-xs text-gray-400 mb-1">Total Investment</div>
          <div className="text-2xl font-bold text-purple-400">
            ${(chartData.reduce((sum, d) => sum + d.investment, 0) / 1000000).toFixed(1)}M
          </div>
        </div>
        
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <div className="text-xs text-gray-400 mb-1">Total Annual Savings</div>
          <div className="text-2xl font-bold text-green-400">
            ${(chartData.reduce((sum, d) => sum + d.savings, 0) / 1000000).toFixed(1)}M
          </div>
        </div>
      </div>
    </div>
  );
};

export default ROIComparisonChart;