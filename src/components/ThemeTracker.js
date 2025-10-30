// src/components/ThemeTracker.js
'use client'
import React, { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Minus,
  Target,
  Zap,
  Star,
  AlertCircle,
  ChevronRight,
  Calendar
} from 'lucide-react';

const ThemeTracker = ({ themes, quarters }) => {
  const [selectedTheme, setSelectedTheme] = useState(null);

  // Calculate theme metrics
  const getThemeMetrics = (theme) => {
    if (!theme.quarters || theme.quarters.length === 0) return null;

    const sortedQuarters = [...theme.quarters].sort((a, b) => 
      new Date(a.quarter) - new Date(b.quarter)
    );

    const first = sortedQuarters[0];
    const last = sortedQuarters[sortedQuarters.length - 1];

    // Calculate mention trend
    const mentionTrend = last.mentions - first.mentions;
    const sentimentTrend = getSentimentValue(last.sentiment) - getSentimentValue(first.sentiment);

    return {
      mentionTrend,
      sentimentTrend,
      avgMentions: sortedQuarters.reduce((sum, q) => sum + q.mentions, 0) / sortedQuarters.length,
      peakQuarter: sortedQuarters.reduce((max, q) => q.mentions > max.mentions ? q : max, sortedQuarters[0]),
      currentSentiment: last.sentiment,
      trajectory: getTrajectory(sortedQuarters)
    };
  };

  const getSentimentValue = (sentiment) => {
    const map = { 
      'very positive': 5, 
      'positive': 4, 
      'neutral': 3, 
      'cautious': 2, 
      'negative': 1 
    };
    return map[sentiment?.toLowerCase()] || 3;
  };

  const getTrajectory = (quarters) => {
    if (quarters.length < 2) return 'stable';
    
    const mentions = quarters.map(q => q.mentions);
    const recentAvg = (mentions[mentions.length - 1] + mentions[mentions.length - 2]) / 2;
    const earlyAvg = (mentions[0] + mentions[1]) / 2;
    
    if (recentAvg > earlyAvg * 1.5) return 'accelerating';
    if (recentAvg > earlyAvg * 1.1) return 'growing';
    if (recentAvg < earlyAvg * 0.9) return 'declining';
    return 'stable';
  };

  const getTrajectoryColor = (trajectory) => {
    switch(trajectory) {
      case 'accelerating': return 'text-green-400 bg-green-500/20 border-green-500/50';
      case 'growing': return 'text-teal-400 bg-teal-500/20 border-teal-500/50';
      case 'declining': return 'text-red-400 bg-red-500/20 border-red-500/50';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500/50';
    }
  };

  const getTrajectoryIcon = (trajectory) => {
    switch(trajectory) {
      case 'accelerating': return <TrendingUp className="w-4 h-4" />;
      case 'growing': return <TrendingUp className="w-4 h-4" />;
      case 'declining': return <TrendingDown className="w-4 h-4" />;
      default: return <Minus className="w-4 h-4" />;
    }
  };

  const getSentimentColor = (sentiment) => {
    switch(sentiment?.toLowerCase()) {
      case 'very positive': return 'text-emerald-400 bg-emerald-500/20';
      case 'positive': return 'text-green-400 bg-green-500/20';
      case 'neutral': return 'text-gray-400 bg-gray-500/20';
      case 'cautious': return 'text-amber-400 bg-amber-500/20';
      case 'negative': return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getPriorityIcon = (priority) => {
    switch(priority?.toLowerCase()) {
      case 'critical': return <AlertCircle className="w-5 h-5 text-red-400" />;
      case 'high': return <Star className="w-5 h-5 text-orange-400" />;
      case 'medium': return <Target className="w-5 h-5 text-yellow-400" />;
      default: return <Zap className="w-5 h-5 text-blue-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-white flex items-center gap-2">
            <Target className="w-6 h-6 text-purple-400" />
            Strategic Theme Evolution
          </h3>
          <p className="text-sm text-gray-400 mt-1">
            Track how key initiatives evolve across {quarters?.length || 0} quarters
          </p>
        </div>
      </div>

      {/* Theme Cards Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {themes.map((theme, idx) => {
          const metrics = getThemeMetrics(theme);
          if (!metrics) return null;

          return (
            <div
              key={idx}
              onClick={() => setSelectedTheme(theme)}
              className="bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-purple-500/50 rounded-xl p-5 hover:border-purple-400 hover:shadow-xl hover:shadow-purple-500/20 transition-all cursor-pointer group"
            >
              {/* Theme Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {getPriorityIcon(theme.priority)}
                    <h4 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
                      {theme.name}
                    </h4>
                  </div>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {theme.description}
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-purple-400 transition-colors" />
              </div>

              {/* Quick Metrics */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="bg-slate-900/50 rounded-lg p-2 text-center">
                  <div className="text-lg font-bold text-teal-400">
                    {metrics.avgMentions.toFixed(0)}
                  </div>
                  <div className="text-xs text-gray-400">Avg Mentions</div>
                </div>
                <div className={`rounded-lg p-2 text-center ${getSentimentColor(metrics.currentSentiment)}`}>
                  <div className="text-lg font-bold capitalize">
                    {metrics.currentSentiment?.split(' ')[0] || 'N/A'}
                  </div>
                  <div className="text-xs">Sentiment</div>
                </div>
                <div className={`rounded-lg p-2 text-center border-2 ${getTrajectoryColor(metrics.trajectory)}`}>
                  <div className="flex items-center justify-center mb-1">
                    {getTrajectoryIcon(metrics.trajectory)}
                  </div>
                  <div className="text-xs capitalize">{metrics.trajectory}</div>
                </div>
              </div>

              {/* Mini Timeline */}
              <div className="flex items-center gap-1">
                {theme.quarters.sort((a, b) => new Date(a.quarter) - new Date(b.quarter)).map((quarter, qIdx) => {
                  const height = (quarter.mentions / metrics.peakQuarter.mentions) * 100;
                  const sentimentColor = getSentimentColor(quarter.sentiment);
                  
                  return (
                    <div key={qIdx} className="flex-1 flex flex-col items-center gap-1">
                      <div className="w-full bg-slate-700 rounded-t-lg overflow-hidden" style={{ height: '40px' }}>
                        <div 
                          className={`w-full ${sentimentColor} transition-all`}
                          style={{ height: `${height}%`, marginTop: `${100 - height}%` }}
                        />
                      </div>
                      <div className="text-[10px] text-gray-500 font-semibold">
                        {quarter.quarter}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed Theme Modal */}
      {selectedTheme && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border-2 border-purple-500 rounded-2xl max-w-4xl w-full max-h-[85vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-slate-900 border-b border-slate-700 p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {getPriorityIcon(selectedTheme.priority)}
                <div>
                  <h3 className="text-2xl font-bold text-white">
                    {selectedTheme.name}
                  </h3>
                  <p className="text-sm text-gray-400 mt-1">
                    {selectedTheme.description}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedTheme(null)}
                className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-gray-400 rotate-180" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Quarter-by-Quarter Analysis */}
              <div>
                <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-teal-400" />
                  Quarterly Evolution
                </h4>

                <div className="space-y-3">
                  {selectedTheme.quarters
                    .sort((a, b) => new Date(b.quarter) - new Date(a.quarter))
                    .map((quarter, idx) => (
                      <div
                        key={idx}
                        className="bg-gradient-to-r from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-4 hover:border-purple-500/50 transition-all"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="text-sm font-bold text-purple-300 mb-1">
                              {quarter.quarter}
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-xs text-gray-400">
                                Mentions: <span className="text-white font-semibold">{quarter.mentions}</span>
                              </span>
                              <span className={`text-xs px-2 py-1 rounded ${getSentimentColor(quarter.sentiment)}`}>
                                {quarter.sentiment}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Key Highlights */}
                        {quarter.key_highlights && quarter.key_highlights.length > 0 && (
                          <div className="bg-slate-900/50 rounded-lg p-3 mb-3">
                            <div className="text-xs font-bold text-teal-400 mb-2">KEY HIGHLIGHTS:</div>
                            <ul className="space-y-1">
                              {quarter.key_highlights.map((highlight, hIdx) => (
                                <li key={hIdx} className="text-xs text-gray-300 flex items-start gap-2">
                                  <span className="text-teal-400 mt-0.5">▸</span>
                                  <span>{highlight}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Management Quotes */}
                        {quarter.management_quotes && quarter.management_quotes.length > 0 && (
                          <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-3">
                            <div className="text-xs font-bold text-purple-400 mb-2">MANAGEMENT COMMENTARY:</div>
                            {quarter.management_quotes.map((quote, qIdx) => (
                              <div key={qIdx} className="text-xs text-gray-300 italic mb-2 last:mb-0">
                                "{quote}"
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Metrics */}
                        {quarter.metrics && (
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-3">
                            {Object.entries(quarter.metrics).map(([key, value]) => (
                              <div key={key} className="bg-slate-900/50 rounded p-2 text-center">
                                <div className="text-xs text-gray-400 capitalize">
                                  {key.replace(/_/g, ' ')}
                                </div>
                                <div className="text-sm font-bold text-white">
                                  {typeof value === 'number' ? value.toFixed(1) : value}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              </div>

              {/* Investment Trajectory */}
              {selectedTheme.investment && (
                <div className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 border border-blue-500/30 rounded-xl p-5">
                  <h4 className="text-sm font-bold text-blue-300 mb-3 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    INVESTMENT TRAJECTORY
                  </h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <div className="text-xs text-gray-400 mb-1">Initial</div>
                      <div className="text-xl font-bold text-white">
                        ${(selectedTheme.investment.initial / 1000000).toFixed(1)}M
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-400 mb-1">Current</div>
                      <div className="text-xl font-bold text-cyan-400">
                        ${(selectedTheme.investment.current / 1000000).toFixed(1)}M
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-400 mb-1">Change</div>
                      <div className={`text-xl font-bold ${
                        selectedTheme.investment.current > selectedTheme.investment.initial 
                          ? 'text-green-400' 
                          : 'text-red-400'
                      }`}>
                        {((selectedTheme.investment.current / selectedTheme.investment.initial - 1) * 100).toFixed(0)}%
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Strategic Assessment */}
              {selectedTheme.strategic_assessment && (
                <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-500/30 rounded-xl p-5">
                  <h4 className="text-sm font-bold text-purple-300 mb-3">STRATEGIC ASSESSMENT</h4>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {selectedTheme.strategic_assessment}
                  </p>
                </div>
              )}

              {/* Risks & Opportunities */}
              <div className="grid md:grid-cols-2 gap-4">
                {selectedTheme.risks && selectedTheme.risks.length > 0 && (
                  <div className="bg-red-900/10 border border-red-500/30 rounded-xl p-4">
                    <h4 className="text-sm font-bold text-red-400 mb-3">⚠️ RISKS</h4>
                    <ul className="space-y-2">
                      {selectedTheme.risks.map((risk, rIdx) => (
                        <li key={rIdx} className="text-xs text-gray-300 flex items-start gap-2">
                          <span className="text-red-400 mt-0.5">●</span>
                          <span>{risk}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedTheme.opportunities && selectedTheme.opportunities.length > 0 && (
                  <div className="bg-green-900/10 border border-green-500/30 rounded-xl p-4">
                    <h4 className="text-sm font-bold text-green-400 mb-3">✨ OPPORTUNITIES</h4>
                    <ul className="space-y-2">
                      {selectedTheme.opportunities.map((opp, oIdx) => (
                        <li key={oIdx} className="text-xs text-gray-300 flex items-start gap-2">
                          <span className="text-green-400 mt-0.5">●</span>
                          <span>{opp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Summary Stats */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 border-2 border-purple-500/50 rounded-xl p-6">
        <h4 className="text-lg font-bold text-white mb-4">Theme Portfolio Summary</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-400">
              {themes.length}
            </div>
            <div className="text-xs text-gray-400 mt-1">Total Themes</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400">
              {themes.filter(t => getThemeMetrics(t)?.trajectory === 'accelerating' || getThemeMetrics(t)?.trajectory === 'growing').length}
            </div>
            <div className="text-xs text-gray-400 mt-1">Growing</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-400">
              {themes.filter(t => getThemeMetrics(t)?.trajectory === 'stable').length}
            </div>
            <div className="text-xs text-gray-400 mt-1">Stable</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-red-400">
              {themes.filter(t => getThemeMetrics(t)?.trajectory === 'declining').length}
            </div>
            <div className="text-xs text-gray-400 mt-1">Declining</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeTracker;