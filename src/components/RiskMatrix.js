// src/components/RiskMatrix.js
'use client'
import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Shield, 
  TrendingDown, 
  TrendingUp,
  Minus,
  CheckCircle2,
  DollarSign,
  ChevronDown,
  ChevronUp,
  Info,
  X
} from 'lucide-react';

const RiskMatrix = ({ riskData, useCases }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedRisks, setExpandedRisks] = useState({});
  const [selectedCell, setSelectedCell] = useState(null);

  // Get all risks from all use cases
  const getAllRisks = () => {
    if (!useCases) return [];
    return useCases.flatMap(uc => 
      (uc.risk_assessment?.risk_factors || []).map(risk => ({
        ...risk,
        useCase: uc.title,
        useCaseId: uc.id
      }))
    );
  };

  const allRisks = getAllRisks();
  
  // Filter risks by category
  const filteredRisks = selectedCategory === 'all' 
    ? allRisks 
    : allRisks.filter(r => r.category === selectedCategory);

  // Get severity color
  const getSeverityColor = (severity) => {
    if (severity >= 7) return {
      bg: 'from-red-500/20 to-red-600/20',
      border: 'border-red-500/50',
      text: 'text-red-400',
      dot: 'bg-red-500',
      label: 'Critical'
    };
    if (severity >= 5) return {
      bg: 'from-orange-500/20 to-amber-600/20',
      border: 'border-orange-500/50',
      text: 'text-orange-400',
      dot: 'bg-orange-500',
      label: 'High'
    };
    if (severity >= 3) return {
      bg: 'from-yellow-500/20 to-amber-500/20',
      border: 'border-yellow-500/50',
      text: 'text-yellow-400',
      dot: 'bg-yellow-500',
      label: 'Medium'
    };
    return {
      bg: 'from-green-500/20 to-emerald-500/20',
      border: 'border-green-500/50',
      text: 'text-green-400',
      dot: 'bg-green-500',
      label: 'Low'
    };
  };

  // Get residual risk color
  const getResidualColor = (residual) => {
    if (residual === 'high') return 'text-red-400 bg-red-500/20 border-red-500/50';
    if (residual === 'medium') return 'text-amber-400 bg-amber-500/20 border-amber-500/50';
    return 'text-green-400 bg-green-500/20 border-green-500/50';
  };

  // Get trend icon
  const getTrendIcon = (initial, residual) => {
    const initialMap = { high: 3, medium: 2, low: 1 };
    const initialVal = initialMap[initial] || 2;
    const residualVal = initialMap[residual] || 2;
    
    if (residualVal < initialVal) return <TrendingDown className="w-4 h-4 text-green-400" />;
    if (residualVal > initialVal) return <TrendingUp className="w-4 h-4 text-red-400" />;
    return <Minus className="w-4 h-4 text-gray-400" />;
  };

  // Toggle risk expansion
  const toggleRisk = (riskIndex) => {
    setExpandedRisks(prev => ({
      ...prev,
      [riskIndex]: !prev[riskIndex]
    }));
  };

  // Calculate risk statistics
  const riskStats = riskData?.summary || {
    total_risks_identified: allRisks.length,
    high_severity: allRisks.filter(r => r.severity >= 7).length,
    medium_severity: allRisks.filter(r => r.severity >= 3 && r.severity < 7).length,
    low_severity: allRisks.filter(r => r.severity < 3).length,
    total_mitigation_investment: allRisks.reduce((sum, r) => sum + (r.mitigation_cost || 0), 0)
  };

  // Get risks for a specific probability/impact cell
  const getRisksForCell = (probability, impact) => {
    return filteredRisks.filter(risk => {
      const riskProb = (risk.probability || '').toLowerCase();
      const riskImpact = (risk.impact || '').toLowerCase();
      return riskProb === probability && riskImpact === impact;
    });
  };

  return (
    <div className="space-y-6">
      {/* Risk Overview Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-purple-500/50 rounded-xl p-4 text-center hover:border-purple-400 transition-all">
          <AlertTriangle className="w-6 h-6 text-purple-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-white">{riskStats.total_risks_identified}</div>
          <div className="text-xs text-gray-400">Total Risks</div>
        </div>

        <div className="bg-gradient-to-br from-red-500/20 to-red-600/20 border-2 border-red-500/50 rounded-xl p-4 text-center hover:border-red-400 transition-all">
          <div className="text-2xl font-bold text-red-400">{riskStats.high_severity}</div>
          <div className="text-xs text-gray-400">Critical/High</div>
        </div>

        <div className="bg-gradient-to-br from-yellow-500/20 to-amber-500/20 border-2 border-yellow-500/50 rounded-xl p-4 text-center hover:border-yellow-400 transition-all">
          <div className="text-2xl font-bold text-yellow-400">{riskStats.medium_severity}</div>
          <div className="text-xs text-gray-400">Medium</div>
        </div>

        <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-2 border-green-500/50 rounded-xl p-4 text-center hover:border-green-400 transition-all">
          <div className="text-2xl font-bold text-green-400">{riskStats.low_severity}</div>
          <div className="text-xs text-gray-400">Low</div>
        </div>

        <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-2 border-blue-500/50 rounded-xl p-4 text-center hover:border-blue-400 transition-all">
          <DollarSign className="w-6 h-6 text-blue-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-blue-400">
            ${(riskStats.total_mitigation_investment / 1000000).toFixed(1)}M
          </div>
          <div className="text-xs text-gray-400">Mitigation Budget</div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
        <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
          <Shield className="w-4 h-4 text-teal-400" />
          FILTER BY CATEGORY:
        </h3>
        <div className="flex flex-wrap gap-2">
          {['all', 'Technical', 'Organizational', 'Financial', 'Operational', 'Data Quality', 'Compliance', 'Market'].map(cat => {
            const count = cat === 'all' 
              ? allRisks.length 
              : allRisks.filter(r => r.category === cat).length;
            
            if (count === 0 && cat !== 'all') return null;

            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-lg'
                    : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                }`}
              >
                {cat === 'all' ? 'All Risks' : cat} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Risk Heat Map Grid */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-purple-400" />
          RISK HEAT MAP (Probability × Impact)
        </h3>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="p-2 text-xs text-gray-400 text-left w-24">Probability</th>
                <th className="p-2 text-xs text-gray-400 text-center">Low Impact</th>
                <th className="p-2 text-xs text-gray-400 text-center">Medium Impact</th>
                <th className="p-2 text-xs text-gray-400 text-center">High Impact</th>
                <th className="p-2 text-xs text-gray-400 text-center">Critical Impact</th>
              </tr>
            </thead>
            <tbody>
              {['high', 'medium', 'low'].map((probability) => (
                <tr key={probability}>
                  <td className="p-2 text-sm font-semibold text-white capitalize">
                    {probability}
                  </td>
                  {['low', 'medium', 'high', 'critical'].map((impact) => {
                    const cellRisks = getRisksForCell(probability, impact);
                    const severityScore = 
                      probability === 'high' ? (impact === 'critical' ? 9 : impact === 'high' ? 8 : impact === 'medium' ? 6 : 4) :
                      probability === 'medium' ? (impact === 'critical' ? 7 : impact === 'high' ? 6 : impact === 'medium' ? 4 : 2) :
                      (impact === 'critical' ? 5 : impact === 'high' ? 4 : impact === 'medium' ? 2 : 1);
                    
                    const colors = getSeverityColor(severityScore);
                    
                    return (
                      <td 
                        key={impact}
                        onClick={() => cellRisks.length > 0 && setSelectedCell({ probability, impact, risks: cellRisks })}
                        className={`p-2 border border-slate-700 cursor-pointer transition-all hover:border-white/30 ${
                          cellRisks.length > 0 ? 'hover:scale-105' : ''
                        }`}
                      >
                        <div className={`bg-gradient-to-br ${colors.bg} border-2 ${colors.border} rounded-lg p-4 text-center min-h-[80px] flex flex-col items-center justify-center`}>
                          <div className={`text-2xl font-bold ${colors.text}`}>
                            {cellRisks.length}
                          </div>
                          <div className="text-xs text-gray-400 mt-1">
                            {cellRisks.length === 1 ? 'Risk' : 'Risks'}
                          </div>
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Legend */}
        <div className="mt-4 flex items-center justify-center gap-6 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-gray-400">Low (1-2)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <span className="text-gray-400">Medium (3-4)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-500"></div>
            <span className="text-gray-400">High (5-6)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className="text-gray-400">Critical (7+)</span>
          </div>
        </div>
      </div>

      {/* Selected Cell Modal */}
      {selectedCell && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border-2 border-purple-500 rounded-2xl max-w-3xl w-full max-h-[80vh] overflow-y-auto">
            <div className="sticky top-0 bg-slate-900 border-b border-slate-700 p-6 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-white capitalize">
                  {selectedCell.probability} Probability × {selectedCell.impact} Impact
                </h3>
                <p className="text-sm text-gray-400 mt-1">
                  {selectedCell.risks.length} {selectedCell.risks.length === 1 ? 'Risk' : 'Risks'} in this cell
                </p>
              </div>
              <button
                onClick={() => setSelectedCell(null)}
                className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              {selectedCell.risks.map((risk, idx) => {
                const colors = getSeverityColor(risk.severity);
                return (
                  <div key={idx} className={`bg-gradient-to-br ${colors.bg} border-2 ${colors.border} rounded-xl p-4`}>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-xs font-bold px-2 py-1 rounded ${colors.text} bg-slate-900/50`}>
                            {risk.category}
                          </span>
                          <span className={`text-xs font-bold px-2 py-1 rounded ${colors.text} bg-slate-900/50`}>
                            Severity: {risk.severity}/10
                          </span>
                        </div>
                        <h4 className={`font-semibold ${colors.text} text-sm`}>
                          {risk.risk}
                        </h4>
                      </div>
                    </div>
                    
                    <div className="text-xs text-gray-300 mb-3">
                      <span className="font-semibold">Use Case:</span> {risk.useCase}
                    </div>
                    
                    <div className="bg-slate-900/50 rounded-lg p-3 mb-3">
                      <div className="text-xs font-bold text-teal-400 mb-1">MITIGATION STRATEGY:</div>
                      <div className="text-xs text-gray-300">{risk.mitigation}</div>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-4">
                        <div>
                          <span className="text-gray-400">Cost:</span>
                          <span className="text-white font-semibold ml-1">
                            ${(risk.mitigation_cost / 1000).toFixed(0)}K
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-gray-400">Residual:</span>
                          <span className={`font-semibold px-2 py-0.5 rounded ${getResidualColor(risk.residual_risk)}`}>
                            {risk.residual_risk}
                          </span>
                        </div>
                      </div>
                      {getTrendIcon(risk.probability, risk.residual_risk)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Detailed Risk List */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5 text-teal-400" />
          DETAILED RISK ASSESSMENT
        </h3>

        <div className="space-y-3">
          {filteredRisks.map((risk, idx) => {
            const colors = getSeverityColor(risk.severity);
            const isExpanded = expandedRisks[idx];

            return (
              <div key={idx} className={`bg-gradient-to-br ${colors.bg} border-2 ${colors.border} rounded-xl overflow-hidden transition-all`}>
                <button
                  onClick={() => toggleRisk(idx)}
                  className="w-full p-4 flex items-center justify-between hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-3 flex-1 text-left">
                    <div className={`w-2 h-2 rounded-full ${colors.dot}`}></div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded ${colors.text} bg-slate-900/50`}>
                          {risk.category}
                        </span>
                        <span className={`text-xs px-2 py-0.5 rounded ${getResidualColor(risk.residual_risk)}`}>
                          Residual: {risk.residual_risk}
                        </span>
                      </div>
                      <h4 className={`font-semibold ${colors.text} text-sm`}>
                        {risk.risk}
                      </h4>
                      <p className="text-xs text-gray-400 mt-1">
                        {risk.useCase}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className={`text-lg font-bold ${colors.text}`}>
                        {risk.severity}/10
                      </div>
                      <div className="text-xs text-gray-400">Severity</div>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className={`w-5 h-5 ${colors.text}`} />
                    ) : (
                      <ChevronDown className={`w-5 h-5 ${colors.text}`} />
                    )}
                  </div>
                </button>

                {isExpanded && (
                  <div className="p-4 pt-0 space-y-3 border-t border-white/10">
                    <div className="grid md:grid-cols-2 gap-3">
                      <div className="bg-slate-900/50 rounded-lg p-3">
                        <div className="text-xs font-bold text-purple-400 mb-1">PROBABILITY:</div>
                        <div className="text-sm text-white capitalize">{risk.probability || 'Not specified'}</div>
                      </div>
                      <div className="bg-slate-900/50 rounded-lg p-3">
                        <div className="text-xs font-bold text-pink-400 mb-1">IMPACT:</div>
                        <div className="text-sm text-white capitalize">{risk.impact || 'Not specified'}</div>
                      </div>
                    </div>

                    <div className="bg-slate-900/50 rounded-lg p-3">
                      <div className="text-xs font-bold text-teal-400 mb-2">MITIGATION STRATEGY:</div>
                      <div className="text-sm text-gray-300">{risk.mitigation}</div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-3">
                      <div className="bg-slate-900/50 rounded-lg p-3 text-center">
                        <DollarSign className="w-4 h-4 text-blue-400 mx-auto mb-1" />
                        <div className="text-xs text-gray-400 mb-1">Mitigation Cost</div>
                        <div className="text-sm font-bold text-blue-400">
                          ${(risk.mitigation_cost / 1000).toFixed(0)}K
                        </div>
                      </div>
                      <div className="bg-slate-900/50 rounded-lg p-3 text-center">
                        <Shield className="w-4 h-4 text-green-400 mx-auto mb-1" />
                        <div className="text-xs text-gray-400 mb-1">Residual Risk</div>
                        <div className={`text-sm font-bold capitalize ${
                          risk.residual_risk === 'high' ? 'text-red-400' :
                          risk.residual_risk === 'medium' ? 'text-amber-400' :
                          'text-green-400'
                        }`}>
                          {risk.residual_risk}
                        </div>
                      </div>
                      <div className="bg-slate-900/50 rounded-lg p-3 text-center">
                        <div className="mb-1">
                          {getTrendIcon(risk.probability, risk.residual_risk)}
                        </div>
                        <div className="text-xs text-gray-400 mb-1">Risk Trend</div>
                        <div className="text-xs font-semibold text-white">
                          {risk.probability} → {risk.residual_risk}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Mitigation Strategy Summary */}
      {riskData?.mitigation_strategy && (
        <div className="bg-gradient-to-br from-teal-900/40 to-cyan-900/40 border-2 border-teal-500 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-teal-400" />
            MITIGATION STRATEGY ROADMAP
          </h3>

          <div className="grid md:grid-cols-3 gap-4">
            {['phase_1_priorities', 'phase_2_priorities', 'phase_3_priorities'].map((phase, idx) => (
              <div key={phase} className="bg-slate-900/50 rounded-lg p-4">
                <div className="text-sm font-bold text-teal-300 mb-3">
                  Phase {idx + 1}
                </div>
                <ul className="space-y-2">
                  {(riskData.mitigation_strategy[phase] || []).map((priority, pIdx) => (
                    <li key={pIdx} className="text-xs text-gray-300 flex items-start gap-2">
                      <CheckCircle2 className="w-3 h-3 text-teal-400 mt-0.5 flex-shrink-0" />
                      <span>{priority}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RiskMatrix;