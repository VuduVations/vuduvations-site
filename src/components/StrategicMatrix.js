'use client'
import React, { useState, useEffect } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ReferenceLine, Label } from 'recharts';
import { Target, Zap, AlertTriangle, Clock } from 'lucide-react';

const StrategicMatrix = ({ useCases }) => {
  const [animated, setAnimated] = useState(false);
  const [selectedQuadrant, setSelectedQuadrant] = useState(null);

  useEffect(() => {
    setTimeout(() => setAnimated(true), 400);
  }, []);

  // ✅ FIXED: Map complexity string to numeric value
  const complexityMap = {
    'Low': 1,
    'Medium': 2,
    'High': 3
  };

  console.log('🎯 Strategic Matrix - Raw useCases:', useCases);

  // Prepare bubble data
  const bubbleData = (useCases || []).map((useCase, idx) => {
    // ✅ FIXED: Try multiple possible field names for complexity
    const complexityStr = useCase.complexity || 
                         useCase.technical_complexity || 
                         useCase.feasibility || 
                         'Medium';
    
    const complexity = complexityMap[complexityStr] || 2;
    
    // ✅ FIXED: Get ROI from root level
    const roi = useCase.estimated_roi || useCase.roi || 0;
    const investment = useCase.estimated_cost || useCase.cost || 0;
    const savings = useCase.estimated_savings || useCase.savings || 0;
    
    console.log(`  [${idx}] ${useCase.title}:`, {
      complexity: complexityStr,
      complexityValue: complexity,
      roi,
      investment
    });
    
    return {
      x: complexity,
      y: roi,
      z: investment / 50000, // Bubble size
      name: useCase.title,
      complexity: complexityStr,
      roi: roi,
      investment: investment,
      payback: investment > 0 && savings > 0 
        ? (investment / savings) * 12 
        : 0,
      department: useCase.department,
      rank: idx + 1
    };
  });

  console.log('🎯 Processed bubble data:', bubbleData);

  // ✅ FIXED: Determine quadrant with realistic ROI threshold
  const getQuadrant = (x, y) => {
    // High ROI = 80% or higher (much more realistic!)
    // Low Complexity = 1.5 or lower (Low/Medium)
    if (y >= 80 && x <= 1.5) return 'quick-wins';      // High ROI, Low Complexity
    if (y >= 80 && x > 1.5) return 'strategic';        // High ROI, High Complexity
    if (y < 80 && x <= 1.5) return 'fill-ins';         // Low ROI, Low Complexity
    return 'time-sinks';                                // Low ROI, High Complexity
  };

  // Quadrant colors
  const getQuadrantColor = (quadrant) => {
    switch (quadrant) {
      case 'quick-wins': return '#10B981'; // Green
      case 'strategic': return '#14B8A6'; // Teal
      case 'fill-ins': return '#F59E0B'; // Orange
      case 'time-sinks': return '#EF4444'; // Red
      default: return '#94A3B8';
    }
  };

  // Custom tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const quadrant = getQuadrant(data.x, data.y);
      const quadrantLabels = {
        'quick-wins': 'Quick Wins',
        'strategic': 'Strategic',
        'fill-ins': 'Fill-ins',
        'time-sinks': 'Time Sinks'
      };

      return (
        <div className="bg-slate-900 border-2 border-teal-500 rounded-xl p-4 shadow-2xl max-w-xs">
          <div className="font-bold text-white text-base mb-2">{data.name}</div>
          
          {/* Quadrant badge */}
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-3`}
               style={{ 
                 backgroundColor: `${getQuadrantColor(quadrant)}20`,
                 color: getQuadrantColor(quadrant),
                 border: `1px solid ${getQuadrantColor(quadrant)}`
               }}>
            {quadrant === 'quick-wins' && <Zap className="w-3 h-3" />}
            {quadrant === 'strategic' && <Target className="w-3 h-3" />}
            {quadrant === 'time-sinks' && <AlertTriangle className="w-3 h-3" />}
            {quadrant === 'fill-ins' && <Clock className="w-3 h-3" />}
            {quadrantLabels[quadrant]}
          </div>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between gap-4">
              <span className="text-gray-400">ROI:</span>
              <span className="text-teal-400 font-bold">{data.roi}%</span>
            </div>
            
            <div className="flex justify-between gap-4">
              <span className="text-gray-400">Complexity:</span>
              <span className={`font-semibold ${
                data.complexity === 'Low' ? 'text-green-400' :
                data.complexity === 'Medium' ? 'text-yellow-400' :
                'text-red-400'
              }`}>
                {data.complexity}
              </span>
            </div>
            
            <div className="flex justify-between gap-4">
              <span className="text-gray-400">Investment:</span>
              <span className="text-white font-semibold">
                ${(data.investment / 1000000).toFixed(1)}M
              </span>
            </div>
            
            {data.payback > 0 && (
              <div className="flex justify-between gap-4">
                <span className="text-gray-400">Payback:</span>
                <span className="text-purple-400 font-semibold">
                  {data.payback.toFixed(1)}mo
                </span>
              </div>
            )}

            <div className="flex justify-between gap-4">
              <span className="text-gray-400">Department:</span>
              <span className="text-gray-300 text-xs">{data.department}</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  // Count use cases in each quadrant
  const quadrantCounts = bubbleData.reduce((acc, item) => {
    const quadrant = getQuadrant(item.x, item.y);
    acc[quadrant] = (acc[quadrant] || 0) + 1;
    return acc;
  }, {});

  if (!bubbleData || bubbleData.length === 0) {
    return (
      <div className="bg-slate-900/50 border-2 border-slate-700 rounded-2xl p-12 text-center">
        <Target className="w-16 h-16 text-slate-600 mx-auto mb-4" />
        <p className="text-slate-400">No strategic data available</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 border-2 border-teal-500/50 rounded-2xl p-6 shadow-2xl">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
            <Target className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">Strategic Prioritization Matrix</h3>
            <p className="text-sm text-gray-400">ROI vs. Implementation Complexity</p>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className={`transition-all duration-1000 ${animated ? 'opacity-100' : 'opacity-0'}`}>
        <ResponsiveContainer width="100%" height={500}>
          <ScatterChart margin={{ top: 20, right: 60, bottom: 60, left: 60 }}>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="#334155"
            />

            {/* ✅ FIXED: Reference lines at realistic thresholds */}
            <ReferenceLine 
              x={1.5} 
              stroke="#64748B" 
              strokeWidth={2}
              strokeDasharray="5 5"
            />
            <ReferenceLine 
              y={80} 
              stroke="#64748B" 
              strokeWidth={2}
              strokeDasharray="5 5"
            />

            <XAxis 
              type="number"
              dataKey="x"
              domain={[0.5, 3.5]}
              ticks={[1, 2, 3]}
              tickFormatter={(value) => {
                if (value === 1) return 'Low';
                if (value === 2) return 'Medium';
                if (value === 3) return 'High';
                return '';
              }}
              stroke="#94A3B8"
              tick={{ fill: '#94A3B8', fontSize: 12 }}
            >
              <Label 
                value="Implementation Complexity" 
                position="bottom" 
                offset={15}
                style={{ fill: '#94A3B8', fontSize: 14, fontWeight: 600 }}
              />
            </XAxis>

            <YAxis 
              type="number"
              dataKey="y"
              domain={[0, 'dataMax + 20']}
              stroke="#94A3B8"
              tick={{ fill: '#94A3B8', fontSize: 12 }}
              tickFormatter={(value) => `${value}%`}
            >
              <Label 
                value="Return on Investment (%)" 
                angle={-90} 
                position="left"
                offset={15}
                style={{ fill: '#94A3B8', fontSize: 14, fontWeight: 600 }}
              />
            </YAxis>

            <ZAxis 
              type="number" 
              dataKey="z" 
              range={[400, 2000]}
            />

            <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />

            <Scatter
              data={bubbleData}
              animationDuration={1500}
              animationBegin={400}
            >
              {bubbleData.map((entry, index) => {
                const quadrant = getQuadrant(entry.x, entry.y);
                return (
                  <Cell 
                    key={`cell-${index}`}
                    fill={getQuadrantColor(quadrant)}
                    opacity={0.8}
                    stroke={getQuadrantColor(quadrant)}
                    strokeWidth={2}
                    style={{
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                  />
                );
              })}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      {/* Quadrant Legend */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-green-900/20 border-2 border-green-500/50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-5 h-5 text-green-400" />
            <span className="font-bold text-green-400">Quick Wins</span>
          </div>
          <p className="text-xs text-gray-400 mb-2">High ROI (≥80%), Low Complexity</p>
          <div className="text-2xl font-bold text-white">{quadrantCounts['quick-wins'] || 0}</div>
          <p className="text-xs text-green-400 mt-1">Priority: Implement ASAP</p>
        </div>

        <div className="bg-teal-900/20 border-2 border-teal-500/50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-5 h-5 text-teal-400" />
            <span className="font-bold text-teal-400">Strategic</span>
          </div>
          <p className="text-xs text-gray-400 mb-2">High ROI (≥80%), High Complexity</p>
          <div className="text-2xl font-bold text-white">{quadrantCounts['strategic'] || 0}</div>
          <p className="text-xs text-teal-400 mt-1">Priority: Plan carefully</p>
        </div>

        <div className="bg-orange-900/20 border-2 border-orange-500/50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-5 h-5 text-orange-400" />
            <span className="font-bold text-orange-400">Fill-ins</span>
          </div>
          <p className="text-xs text-gray-400 mb-2">Low ROI {'(<80%)'}, Low Complexity</p>
          <div className="text-2xl font-bold text-white">{quadrantCounts['fill-ins'] || 0}</div>
          <p className="text-xs text-orange-400 mt-1">Priority: Nice to have</p>
        </div>

        <div className="bg-red-900/20 border-2 border-red-500/50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            <span className="font-bold text-red-400">Time Sinks</span>
          </div>
          <p className="text-xs text-gray-400 mb-2">Low ROI {'(<80%)'}, High Complexity</p>
          <div className="text-2xl font-bold text-white">{quadrantCounts['time-sinks'] || 0}</div>
          <p className="text-xs text-red-400 mt-1">Priority: Avoid or defer</p>
        </div>
      </div>

      {/* Key Insights */}
      <div className="mt-6 bg-slate-800/50 rounded-xl p-4 border border-slate-700">
        <div className="text-sm font-bold text-teal-300 mb-2">💡 Strategic Recommendation</div>
        <p className="text-sm text-gray-300">
          Focus on <span className="text-green-400 font-bold">{quadrantCounts['quick-wins'] || 0} Quick Win(s)</span> first 
          for immediate impact. Then tackle <span className="text-teal-400 font-bold">{quadrantCounts['strategic'] || 0} Strategic initiative(s)</span> with 
          proper planning and resources.
          {quadrantCounts['time-sinks'] > 0 && (
            <span className="text-red-400"> Consider deferring {quadrantCounts['time-sinks']} Time Sink(s) to Phase 2 or 3.</span>
          )}
        </p>
      </div>
    </div>
  );
};

export default StrategicMatrix;