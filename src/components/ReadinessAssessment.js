// src/components/ReadinessAssessment.js
'use client'
import React, { useState } from 'react';
import { 
  Database,
  Cpu,
  Users,
  TrendingUp,
  DollarSign,
  CheckCircle2,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Star,
  Award
} from 'lucide-react';

const ReadinessAssessment = ({ readinessData }) => {
  const [expandedDimensions, setExpandedDimensions] = useState({});

  if (!readinessData) return null;

  const { overall_score, dimensions } = readinessData;

  // Toggle dimension expansion
  const toggleDimension = (dimensionName) => {
    setExpandedDimensions(prev => ({
      ...prev,
      [dimensionName]: !prev[dimensionName]
    }));
  };

  // Get level color and styling
  const getLevelInfo = (level) => {
    switch(level?.toLowerCase()) {
      case 'advanced':
        return {
          color: 'text-emerald-400',
          bg: 'from-emerald-500/20 to-green-500/20',
          border: 'border-emerald-500/50',
          icon: <Award className="w-5 h-5" />,
          description: 'Industry-leading capability'
        };
      case 'intermediate':
        return {
          color: 'text-blue-400',
          bg: 'from-blue-500/20 to-cyan-500/20',
          border: 'border-blue-500/50',
          icon: <Star className="w-5 h-5" />,
          description: 'Solid foundation in place'
        };
      case 'developing':
        return {
          color: 'text-yellow-400',
          bg: 'from-yellow-500/20 to-amber-500/20',
          border: 'border-yellow-500/50',
          icon: <TrendingUp className="w-5 h-5" />,
          description: 'Building capabilities'
        };
      case 'basic':
        return {
          color: 'text-orange-400',
          bg: 'from-orange-500/20 to-red-500/20',
          border: 'border-orange-500/50',
          icon: <AlertCircle className="w-5 h-5" />,
          description: 'Significant gaps exist'
        };
      default:
        return {
          color: 'text-gray-400',
          bg: 'from-gray-500/20 to-slate-500/20',
          border: 'border-gray-500/50',
          icon: <AlertCircle className="w-5 h-5" />,
          description: 'Not assessed'
        };
    }
  };

  // Get score color
  const getScoreColor = (score) => {
    if (score >= 80) return 'text-emerald-400';
    if (score >= 60) return 'text-blue-400';
    if (score >= 40) return 'text-yellow-400';
    return 'text-orange-400';
  };

  // Get dimension icon
  const getDimensionIcon = (name) => {
    const nameL = name.toLowerCase();
    if (nameL.includes('data')) return <Database className="w-5 h-5" />;
    if (nameL.includes('technical') || nameL.includes('capability')) return <Cpu className="w-5 h-5" />;
    if (nameL.includes('organizational') || nameL.includes('readiness')) return <Users className="w-5 h-5" />;
    if (nameL.includes('process')) return <TrendingUp className="w-5 h-5" />;
    if (nameL.includes('financial')) return <DollarSign className="w-5 h-5" />;
    return <CheckCircle2 className="w-5 h-5" />;
  };

  // Calculate average score
  const avgScore = dimensions?.length > 0
    ? dimensions.reduce((sum, d) => sum + d.score, 0) / dimensions.length
    : 0;

  return (
    <div className="space-y-6">
      {/* Overall Score Card */}
      <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 border-2 border-purple-500 rounded-2xl p-8 text-center shadow-2xl">
        <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-slate-900 border-4 border-purple-500 mb-4">
          <div className={`text-5xl font-bold ${getScoreColor(overall_score || avgScore)}`}>
            {(overall_score || avgScore).toFixed(0)}
          </div>
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Overall AI Readiness Score</h3>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Comprehensive assessment across {dimensions?.length || 0} critical dimensions of AI capability and organizational preparedness.
        </p>
      </div>

      {/* Dimension Summary Grid */}
      <div className="grid md:grid-cols-3 gap-4">
        {dimensions && dimensions.map((dimension, idx) => {
          const levelInfo = getLevelInfo(dimension.level);
          const icon = getDimensionIcon(dimension.name);
          
          return (
            <div
              key={idx}
              className={`bg-gradient-to-br ${levelInfo.bg} border-2 ${levelInfo.border} rounded-xl p-5 hover:scale-105 transition-all cursor-pointer`}
              onClick={() => toggleDimension(dimension.name)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`p-2 rounded-lg ${levelInfo.color} bg-slate-900/50`}>
                  {icon}
                </div>
                <div className="text-right">
                  <div className={`text-3xl font-bold ${getScoreColor(dimension.score)}`}>
                    {dimension.score}
                  </div>
                  <div className="text-xs text-gray-400">/ 100</div>
                </div>
              </div>

              <h4 className="text-lg font-bold text-white mb-2">{dimension.name}</h4>
              
              <div className={`inline-flex items-center gap-1 px-2 py-1 rounded ${levelInfo.color} bg-slate-900/50 text-xs font-semibold mb-2`}>
                {levelInfo.icon}
                <span>{dimension.level}</span>
              </div>

              <p className="text-xs text-gray-400">
                {levelInfo.description}
              </p>

              {/* Progress Bar */}
              <div className="mt-3 h-2 bg-slate-900/50 rounded-full overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${levelInfo.bg} transition-all duration-500`}
                  style={{ width: `${dimension.score}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed Dimension Analysis */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <CheckCircle2 className="w-6 h-6 text-teal-400" />
          Detailed Capability Assessment
        </h3>

        {dimensions && dimensions.map((dimension, idx) => {
          const isExpanded = expandedDimensions[dimension.name];
          const levelInfo = getLevelInfo(dimension.level);
          const icon = getDimensionIcon(dimension.name);

          return (
            <div
              key={idx}
              className={`bg-gradient-to-br ${levelInfo.bg} border-2 ${levelInfo.border} rounded-xl overflow-hidden transition-all`}
            >
              {/* Dimension Header */}
              <button
                onClick={() => toggleDimension(dimension.name)}
                className="w-full p-5 flex items-center justify-between hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className={`p-3 rounded-lg ${levelInfo.color} bg-slate-900/50`}>
                    {icon}
                  </div>
                  <div className="text-left flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h4 className="text-xl font-bold text-white">{dimension.name}</h4>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${levelInfo.color} bg-slate-900/50`}>
                        {dimension.level}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span>Score: <span className={`font-bold ${getScoreColor(dimension.score)}`}>{dimension.score}/100</span></span>
                      <span>•</span>
                      <span>{dimension.strengths?.length || 0} Strengths</span>
                      <span>•</span>
                      <span>{dimension.gaps?.length || 0} Gaps</span>
                    </div>
                  </div>
                </div>
                {isExpanded ? (
                  <ChevronUp className="w-6 h-6 text-gray-400" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-gray-400" />
                )}
              </button>

              {/* Expanded Content */}
              {isExpanded && (
                <div className="px-5 pb-5 space-y-4">
                  {/* Strengths */}
                  {dimension.strengths && dimension.strengths.length > 0 && (
                    <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
                      <h5 className="text-sm font-bold text-green-400 mb-3 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4" />
                        STRENGTHS
                      </h5>
                      <ul className="space-y-2">
                        {dimension.strengths.map((strength, sIdx) => (
                          <li key={sIdx} className="text-sm text-gray-300 flex items-start gap-2">
                            <span className="text-green-400 mt-1">âœ"</span>
                            <span>{strength}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Gaps */}
                  {dimension.gaps && dimension.gaps.length > 0 && (
                    <div className="bg-orange-900/20 border border-orange-500/30 rounded-lg p-4">
                      <h5 className="text-sm font-bold text-orange-400 mb-3 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" />
                        GAPS & CHALLENGES
                      </h5>
                      <ul className="space-y-2">
                        {dimension.gaps.map((gap, gIdx) => (
                          <li key={gIdx} className="text-sm text-gray-300 flex items-start gap-2">
                            <span className="text-orange-400 mt-1">âš </span>
                            <span>{gap}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Recommendations */}
                  {dimension.recommendations && dimension.recommendations.length > 0 && (
                    <div className="bg-teal-900/20 border border-teal-500/30 rounded-lg p-4">
                      <h5 className="text-sm font-bold text-teal-400 mb-3 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4" />
                        RECOMMENDATIONS
                      </h5>
                      <ul className="space-y-2">
                        {dimension.recommendations.map((rec, rIdx) => (
                          <li key={rIdx} className="text-sm text-gray-300 flex items-start gap-2">
                            <span className="text-teal-400 mt-1">â–¸</span>
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Readiness Summary */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 border-2 border-purple-500/50 rounded-xl p-6">
        <h3 className="text-lg font-bold text-white mb-4">Readiness Summary</h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Overall Assessment */}
          <div>
            <h4 className="text-sm font-bold text-purple-300 mb-3">OVERALL ASSESSMENT</h4>
            <div className="space-y-2 text-sm text-gray-300">
              <p>
                Your organization demonstrates a <span className={`font-bold ${getScoreColor(overall_score || avgScore)}`}>
                  {overall_score || avgScore >= 70 ? 'strong' : overall_score || avgScore >= 50 ? 'moderate' : 'developing'}
                </span> level of AI readiness with an overall score of <span className="font-bold text-white">{(overall_score || avgScore).toFixed(0)}/100</span>.
              </p>
              <p>
                You have <span className="text-emerald-400 font-semibold">
                  {dimensions?.filter(d => d.level?.toLowerCase() === 'advanced').length || 0} advanced
                </span> and <span className="text-blue-400 font-semibold">
                  {dimensions?.filter(d => d.level?.toLowerCase() === 'intermediate').length || 0} intermediate
                </span> capabilities, with <span className="text-yellow-400 font-semibold">
                  {dimensions?.filter(d => d.level?.toLowerCase() === 'developing' || d.level?.toLowerCase() === 'basic').length || 0} areas
                </span> requiring focused development.
              </p>
            </div>
          </div>

          {/* Priority Actions */}
          <div>
            <h4 className="text-sm font-bold text-teal-300 mb-3">PRIORITY ACTIONS</h4>
            <div className="space-y-2">
              {dimensions && [...dimensions]
                .sort((a, b) => a.score - b.score)
                .slice(0, 3)
                .map((dim, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-sm">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center font-bold text-xs">
                      {idx + 1}
                    </span>
                    <span className="text-gray-300">
                      Strengthen <span className="text-white font-semibold">{dim.name}</span>
                    </span>
                    <span className={`ml-auto font-bold ${getScoreColor(dim.score)}`}>
                      {dim.score}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Score Distribution */}
        <div className="mt-6 pt-6 border-t border-slate-700">
          <h4 className="text-sm font-bold text-white mb-4">SCORE DISTRIBUTION</h4>
          <div className="grid grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-400">
                {dimensions?.filter(d => d.score >= 80).length || 0}
              </div>
              <div className="text-xs text-gray-400">Advanced (80+)</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">
                {dimensions?.filter(d => d.score >= 60 && d.score < 80).length || 0}
              </div>
              <div className="text-xs text-gray-400">Intermediate (60-79)</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">
                {dimensions?.filter(d => d.score >= 40 && d.score < 60).length || 0}
              </div>
              <div className="text-xs text-gray-400">Developing (40-59)</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400">
                {dimensions?.filter(d => d.score < 40).length || 0}
              </div>
              <div className="text-xs text-gray-400">Basic (&lt;40)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadinessAssessment;