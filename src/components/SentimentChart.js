// src/components/SentimentChart.js
'use client'
import React, { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown,
  Smile,
  Meh,
  Frown,
  MessageSquare,
  BarChart3,
  Activity,
  Zap,
  AlertCircle
} from 'lucide-react';

const SentimentChart = ({ sentimentData, quarters }) => {
  const [selectedMetric, setSelectedMetric] = useState('overall_confidence');
  const [hoveredQuarter, setHoveredQuarter] = useState(null);

  // Calculate max value for scaling
  const getMaxValue = () => {
    if (!sentimentData || sentimentData.length === 0) return 100;
    
    switch(selectedMetric) {
      case 'overall_confidence':
        return 100;
      case 'positive_language':
      case 'defensive_language':
      case 'certainty_markers':
        return Math.max(...sentimentData.map(d => Math.max(
          d.positive_language_count || 0,
          d.defensive_language_count || 0,
          d.certainty_markers_count || 0
        ))) * 1.2;
      default:
        return 100;
    }
  };

  // Get sentiment icon
  const getSentimentIcon = (score) => {
    if (score >= 80) return <Smile className="w-5 h-5 text-green-400" />;
    if (score >= 60) return <Smile className="w-5 h-5 text-teal-400" />;
    if (score >= 40) return <Meh className="w-5 h-5 text-yellow-400" />;
    if (score >= 20) return <Frown className="w-5 h-5 text-orange-400" />;
    return <Frown className="w-5 h-5 text-red-400" />;
  };

  // Get sentiment color
  const getSentimentColor = (score) => {
    if (score >= 80) return 'text-green-400 bg-green-500/20 border-green-500/50';
    if (score >= 60) return 'text-teal-400 bg-teal-500/20 border-teal-500/50';
    if (score >= 40) return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/50';
    if (score >= 20) return 'text-orange-400 bg-orange-500/20 border-orange-500/50';
    return 'text-red-400 bg-red-500/20 border-red-500/50';
  };

  // Get tone description
  const getToneDescription = (score) => {
    if (score >= 80) return 'Very Confident';
    if (score >= 60) return 'Confident';
    if (score >= 40) return 'Neutral';
    if (score >= 20) return 'Cautious';
    return 'Defensive';
  };

  // Calculate trend
  const getTrend = () => {
    if (!sentimentData || sentimentData.length < 2) return 'stable';
    
    const sorted = [...sentimentData].sort((a, b) => new Date(a.quarter) - new Date(b.quarter));
    const recent = sorted[sorted.length - 1];
    const previous = sorted[sorted.length - 2];
    
    const getValue = (data) => {
      switch(selectedMetric) {
        case 'overall_confidence':
          return data.overall_confidence || 0;
        case 'positive_language':
          return data.positive_language_count || 0;
        case 'defensive_language':
          return data.defensive_language_count || 0;
        case 'certainty_markers':
          return data.certainty_markers_count || 0;
        default:
          return 0;
      }
    };
    
    const recentVal = getValue(recent);
    const prevVal = getValue(previous);
    
    if (recentVal > prevVal * 1.1) return 'improving';
    if (recentVal < prevVal * 0.9) return 'declining';
    return 'stable';
  };

  const trend = getTrend();
  const maxValue = getMaxValue();

  // Metrics available for selection
  const metrics = [
    { 
      id: 'overall_confidence', 
      label: 'Overall Confidence', 
      icon: <Activity className="w-4 h-4" />,
      color: 'purple'
    },
    { 
      id: 'positive_language', 
      label: 'Positive Language', 
      icon: <TrendingUp className="w-4 h-4" />,
      color: 'green'
    },
    { 
      id: 'defensive_language', 
      label: 'Defensive Language', 
      icon: <AlertCircle className="w-4 h-4" />,
      color: 'red'
    },
    { 
      id: 'certainty_markers', 
      label: 'Certainty Markers', 
      icon: <Zap className="w-4 h-4" />,
      color: 'blue'
    }
  ];

  const selectedMetricInfo = metrics.find(m => m.id === selectedMetric);

  return (
    <div className="space-y-6">
      {/* Header with Metric Selector */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-2xl font-bold text-white flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-purple-400" />
            Management Sentiment Analysis
          </h3>
          <p className="text-sm text-gray-400 mt-1">
            Track confidence, tone, and language patterns across earnings calls
          </p>
        </div>

        {/* Trend Indicator */}
        <div className={`px-4 py-2 rounded-lg border-2 flex items-center gap-2 ${
          trend === 'improving' ? 'bg-green-500/20 border-green-500/50 text-green-400' :
          trend === 'declining' ? 'bg-red-500/20 border-red-500/50 text-red-400' :
          'bg-gray-500/20 border-gray-500/50 text-gray-400'
        }`}>
          {trend === 'improving' ? <TrendingUp className="w-5 h-5" /> :
           trend === 'declining' ? <TrendingDown className="w-5 h-5" /> :
           <Meh className="w-5 h-5" />}
          <span className="font-semibold capitalize">{trend}</span>
        </div>
      </div>

      {/* Metric Selection Buttons */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
        <h4 className="text-sm font-bold text-white mb-3">SELECT METRIC:</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {metrics.map(metric => (
            <button
              key={metric.id}
              onClick={() => setSelectedMetric(metric.id)}
              className={`p-3 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                selectedMetric === metric.id
                  ? `bg-${metric.color}-600 text-white shadow-lg`
                  : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
              }`}
            >
              {metric.icon}
              <span className="hidden md:inline">{metric.label}</span>
              <span className="md:hidden">{metric.label.split(' ')[0]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Chart Container */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-purple-500/50 rounded-xl p-6">
        {/* Chart Title */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {selectedMetricInfo?.icon}
            <h4 className="font-bold text-white">{selectedMetricInfo?.label}</h4>
          </div>
          <div className="text-sm text-gray-400">
            {sentimentData?.length || 0} Quarters Analyzed
          </div>
        </div>

        {/* Line Chart */}
        <div className="relative" style={{ height: '300px' }}>
          {/* Y-axis labels */}
          <div className="absolute left-0 top-0 bottom-0 w-12 flex flex-col justify-between text-xs text-gray-500">
            <span>{maxValue.toFixed(0)}</span>
            <span>{(maxValue * 0.75).toFixed(0)}</span>
            <span>{(maxValue * 0.5).toFixed(0)}</span>
            <span>{(maxValue * 0.25).toFixed(0)}</span>
            <span>0</span>
          </div>

          {/* Chart area */}
          <div className="absolute left-14 right-0 top-0 bottom-8">
            {/* Grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between">
              {[0, 1, 2, 3, 4].map(i => (
                <div key={i} className="h-px bg-slate-700/50" />
              ))}
            </div>

            {/* Data visualization */}
            {sentimentData && sentimentData.length > 0 && (
              <svg className="absolute inset-0 w-full h-full">
                <defs>
                  <linearGradient id="sentimentGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor={`var(--${selectedMetricInfo?.color}-500)`} stopOpacity="0.3" />
                    <stop offset="100%" stopColor={`var(--${selectedMetricInfo?.color}-500)`} stopOpacity="0.05" />
                  </linearGradient>
                </defs>

                {/* Area under line */}
                <path
                  d={(() => {
                    const sorted = [...sentimentData].sort((a, b) => new Date(a.quarter) - new Date(b.quarter));
                    const width = 100 / sorted.length;
                    
                    const getValue = (data) => {
                      switch(selectedMetric) {
                        case 'overall_confidence':
                          return data.overall_confidence || 0;
                        case 'positive_language':
                          return data.positive_language_count || 0;
                        case 'defensive_language':
                          return data.defensive_language_count || 0;
                        case 'certainty_markers':
                          return data.certainty_markers_count || 0;
                        default:
                          return 0;
                      }
                    };
                    
                    const points = sorted.map((d, i) => {
                      const x = (i * width) + (width / 2);
                      const y = 100 - ((getValue(d) / maxValue) * 100);
                      return `${x},${y}`;
                    }).join(' L');
                    
                    return `M0,100 L${points} L100,100 Z`;
                  })()}
                  fill="url(#sentimentGradient)"
                />

                {/* Line */}
                <polyline
                  points={(() => {
                    const sorted = [...sentimentData].sort((a, b) => new Date(a.quarter) - new Date(b.quarter));
                    const width = 100 / sorted.length;
                    
                    const getValue = (data) => {
                      switch(selectedMetric) {
                        case 'overall_confidence':
                          return data.overall_confidence || 0;
                        case 'positive_language':
                          return data.positive_language_count || 0;
                        case 'defensive_language':
                          return data.defensive_language_count || 0;
                        case 'certainty_markers':
                          return data.certainty_markers_count || 0;
                        default:
                          return 0;
                      }
                    };
                    
                    return sorted.map((d, i) => {
                      const x = (i * width) + (width / 2);
                      const y = 100 - ((getValue(d) / maxValue) * 100);
                      return `${x},${y}`;
                    }).join(' ');
                  })()}
                  fill="none"
                  stroke={`var(--${selectedMetricInfo?.color}-400)`}
                  strokeWidth="3"
                  vectorEffect="non-scaling-stroke"
                />

                {/* Data points */}
                {(() => {
                  const sorted = [...sentimentData].sort((a, b) => new Date(a.quarter) - new Date(b.quarter));
                  const width = 100 / sorted.length;
                  
                  const getValue = (data) => {
                    switch(selectedMetric) {
                      case 'overall_confidence':
                        return data.overall_confidence || 0;
                      case 'positive_language':
                        return data.positive_language_count || 0;
                      case 'defensive_language':
                        return data.defensive_language_count || 0;
                      case 'certainty_markers':
                        return data.certainty_markers_count || 0;
                      default:
                        return 0;
                    }
                  };
                  
                  return sorted.map((d, i) => {
                    const x = (i * width) + (width / 2);
                    const y = 100 - ((getValue(d) / maxValue) * 100);
                    
                    return (
                      <g key={i}>
                        <circle
                          cx={`${x}%`}
                          cy={`${y}%`}
                          r="6"
                          fill={`var(--${selectedMetricInfo?.color}-500)`}
                          stroke="white"
                          strokeWidth="2"
                          className="cursor-pointer hover:r-8 transition-all"
                          onMouseEnter={() => setHoveredQuarter(d)}
                          onMouseLeave={() => setHoveredQuarter(null)}
                        />
                      </g>
                    );
                  });
                })()}
              </svg>
            )}
          </div>

          {/* X-axis labels */}
          <div className="absolute left-14 right-0 bottom-0 h-8 flex justify-between items-center text-xs text-gray-500">
            {sentimentData && [...sentimentData]
              .sort((a, b) => new Date(a.quarter) - new Date(b.quarter))
              .map((d, i) => (
                <span key={i} className="flex-1 text-center font-semibold">
                  {d.quarter}
                </span>
              ))}
          </div>
        </div>

        {/* Hover Tooltip */}
        {hoveredQuarter && (
          <div className="mt-4 bg-slate-900/90 border border-purple-500/50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-purple-300">{hoveredQuarter.quarter}</span>
              {selectedMetric === 'overall_confidence' && getSentimentIcon(hoveredQuarter.overall_confidence)}
            </div>
            
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <div className="text-xs text-gray-400">Confidence Score</div>
                <div className="text-lg font-bold text-white">
                  {hoveredQuarter.overall_confidence || 0}/100
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-400">Tone</div>
                <div className="text-sm font-semibold text-white">
                  {getToneDescription(hoveredQuarter.overall_confidence || 0)}
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-400">Positive</div>
                <div className="text-sm font-semibold text-green-400">
                  {hoveredQuarter.positive_language_count || 0}
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-400">Defensive</div>
                <div className="text-sm font-semibold text-red-400">
                  {hoveredQuarter.defensive_language_count || 0}
                </div>
              </div>
            </div>

            {hoveredQuarter.key_phrases && (
              <div className="mt-3 pt-3 border-t border-slate-700">
                <div className="text-xs font-bold text-teal-400 mb-1">Key Phrases:</div>
                <div className="flex flex-wrap gap-1">
                  {hoveredQuarter.key_phrases.slice(0, 5).map((phrase, idx) => (
                    <span key={idx} className="text-xs bg-slate-800 text-gray-300 px-2 py-1 rounded">
                      "{phrase}"
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Quarter Details Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {sentimentData && [...sentimentData]
          .sort((a, b) => new Date(b.quarter) - new Date(a.quarter))
          .map((quarter, idx) => {
            const score = quarter.overall_confidence || 0;
            const colorClass = getSentimentColor(score);
            
            return (
              <div
                key={idx}
                className={`border-2 rounded-xl p-4 ${colorClass} transition-all hover:scale-105 cursor-pointer`}
              >
                {/* Quarter Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="font-bold text-white">{quarter.quarter}</div>
                  <div className="flex items-center gap-2">
                    {getSentimentIcon(score)}
                    <span className="text-2xl font-bold">{score}</span>
                  </div>
                </div>

                {/* Tone Description */}
                <div className="text-sm font-semibold mb-3">
                  {getToneDescription(score)}
                </div>

                {/* Language Counts */}
                <div className="grid grid-cols-3 gap-2 mb-3">
                  <div className="bg-slate-900/50 rounded p-2 text-center">
                    <div className="text-xs text-gray-400">Positive</div>
                    <div className="text-sm font-bold text-green-400">
                      {quarter.positive_language_count || 0}
                    </div>
                  </div>
                  <div className="bg-slate-900/50 rounded p-2 text-center">
                    <div className="text-xs text-gray-400">Defensive</div>
                    <div className="text-sm font-bold text-red-400">
                      {quarter.defensive_language_count || 0}
                    </div>
                  </div>
                  <div className="bg-slate-900/50 rounded p-2 text-center">
                    <div className="text-xs text-gray-400">Certainty</div>
                    <div className="text-sm font-bold text-blue-400">
                      {quarter.certainty_markers_count || 0}
                    </div>
                  </div>
                </div>

                {/* Example Phrases */}
                {quarter.positive_phrases && quarter.positive_phrases.length > 0 && (
                  <div className="bg-green-900/20 rounded p-2">
                    <div className="text-xs font-bold text-green-400 mb-1">Positive Phrases:</div>
                    <div className="text-xs text-gray-300 italic">
                      "{quarter.positive_phrases[0]}"
                    </div>
                  </div>
                )}

                {quarter.defensive_phrases && quarter.defensive_phrases.length > 0 && (
                  <div className="bg-red-900/20 rounded p-2 mt-2">
                    <div className="text-xs font-bold text-red-400 mb-1">Defensive Phrases:</div>
                    <div className="text-xs text-gray-300 italic">
                      "{quarter.defensive_phrases[0]}"
                    </div>
                  </div>
                )}
              </div>
            );
          })}
      </div>

      {/* Summary Statistics */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 border-2 border-purple-500/50 rounded-xl p-6">
        <h4 className="text-lg font-bold text-white mb-4">Sentiment Trends</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400">
              {sentimentData && sentimentData.length > 0
                ? (sentimentData.reduce((sum, d) => sum + (d.overall_confidence || 0), 0) / sentimentData.length).toFixed(0)
                : 0}
            </div>
            <div className="text-xs text-gray-400 mt-1">Avg Confidence</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">
              {sentimentData
                ? Math.max(...sentimentData.map(d => d.positive_language_count || 0))
                : 0}
            </div>
            <div className="text-xs text-gray-400 mt-1">Peak Positive</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-400">
              {sentimentData
                ? Math.max(...sentimentData.map(d => d.defensive_language_count || 0))
                : 0}
            </div>
            <div className="text-xs text-gray-400 mt-1">Peak Defensive</div>
          </div>
          <div className="text-center">
            <div className={`text-2xl font-bold ${
              trend === 'improving' ? 'text-green-400' :
              trend === 'declining' ? 'text-red-400' :
              'text-gray-400'
            }`}>
              {trend === 'improving' ? '↗' : trend === 'declining' ? '↘' : '→'}
            </div>
            <div className="text-xs text-gray-400 mt-1">Trend</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SentimentChart;