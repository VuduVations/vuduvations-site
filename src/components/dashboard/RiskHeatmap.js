'use client'
import React, { useState, useEffect } from 'react';
import { AlertTriangle, Shield, CheckCircle, XCircle, Info } from 'lucide-react';

const RiskHeatmap = ({ useCases }) => {
  const [animated, setAnimated] = useState(false);
  const [selectedRisk, setSelectedRisk] = useState(null);
  const [filterLevel, setFilterLevel] = useState('all');

  useEffect(() => {
    setTimeout(() => setAnimated(true), 700);
  }, []);

  // Extract and categorize risks
  const extractRisks = () => {
    const risks = [];
    
    useCases.forEach((useCase, idx) => {
      const complexity = useCase.complexity || 'Medium';
      const cost = useCase.estimated_cost || 0;
      const department = useCase.department || '';
      const title = useCase.title || 'Untitled Use Case';
      
      // Base technical risk (always exists)
      const baseRisks = [
        {
          id: `${idx}-tech`,
          useCaseName: title,
          category: 'Technical',
          description: `Implementation complexity: ${complexity}`,
          probability: complexity === 'High' ? 4 : complexity === 'Medium' ? 3 : 2,
          impact: complexity === 'High' ? 4 : cost > 500000 ? 4 : 3,
          mitigation: 'Phased rollout, proof of concept, expert consultation',
          status: 'identified'
        }
      ];
      
      // Budget risk (only for high-cost projects)
      if (cost > 500000) {
        baseRisks.push({
          id: `${idx}-budget`,
          useCaseName: title,
          category: 'Financial',
          description: 'Budget overrun risk',
          probability: 2,
          impact: 4,
          mitigation: 'Detailed cost tracking, contingency budget (15%), regular reviews',
          status: 'identified'
        });
      }
      
      // Data integration risk (expanded department list)
      if (['IT', 'Operations', 'Finance', 'Customer Service'].includes(department) ||
          title.toLowerCase().includes('integration') ||
          title.toLowerCase().includes('system')) {
        baseRisks.push({
          id: `${idx}-integration`,
          useCaseName: title,
          category: 'Integration',
          description: 'Legacy system integration challenges',
          probability: 3,
          impact: 3,
          mitigation: 'API-first approach, middleware solutions, thorough testing',
          status: 'identified'
        });
      }
      
      // Change management risk (always relevant)
      baseRisks.push({
        id: `${idx}-change`,
        useCaseName: title,
        category: 'Organizational',
        description: 'User adoption and change resistance',
        probability: 3,
        impact: 3,
        mitigation: 'Comprehensive training, change champions, early stakeholder engagement',
        status: 'identified'
      });
      
      // Data quality/security risk (enhanced detection)
      if (title.toLowerCase().includes('data') || 
          title.toLowerCase().includes('analytics') || 
          title.toLowerCase().includes('ai') ||
          title.toLowerCase().includes('predictive') ||
          title.toLowerCase().includes('intelligent') ||
          title.toLowerCase().includes('machine learning')) {
        baseRisks.push({
          id: `${idx}-data`,
          useCaseName: title,
          category: 'Data & Security',
          description: 'Data quality and privacy compliance',
          probability: 2,
          impact: 4,
          mitigation: 'Data governance framework, privacy impact assessment, security audit',
          status: 'identified'
        });
      }
      
      // Vendor dependency risk (if complexity is high)
      if (complexity === 'High') {
        baseRisks.push({
          id: `${idx}-vendor`,
          useCaseName: title,
          category: 'Vendor',
          description: 'Third-party vendor dependency',
          probability: 2,
          impact: 3,
          mitigation: 'Multi-vendor strategy, clear SLAs, exit strategy planning',
          status: 'identified'
        });
      }
      
      risks.push(...baseRisks);
    });
    
    return risks;
  };

  const allRisks = extractRisks();

  // Calculate risk score (1-25)
  const getRiskScore = (probability, impact) => probability * impact;

  // Get risk level
  const getRiskLevel = (score) => {
    if (score >= 12) return 'critical';
    if (score >= 9) return 'high';
    if (score >= 6) return 'medium';
    return 'low';
  };

  // Get risk color
  const getRiskColor = (level) => {
    switch (level) {
      case 'critical': return { bg: 'bg-red-500', text: 'text-red-400', border: 'border-red-500' };
      case 'high': return { bg: 'bg-orange-500', text: 'text-orange-400', border: 'border-orange-500' };
      case 'medium': return { bg: 'bg-yellow-500', text: 'text-yellow-400', border: 'border-yellow-500' };
      case 'low': return { bg: 'bg-green-500', text: 'text-green-400', border: 'border-green-500' };
      default: return { bg: 'bg-gray-500', text: 'text-gray-400', border: 'border-gray-500' };
    }
  };

  // Group risks by level
  const risksByLevel = allRisks.reduce((acc, risk) => {
    const score = getRiskScore(risk.probability, risk.impact);
    const level = getRiskLevel(score);
    if (!acc[level]) acc[level] = [];
    acc[level].push({ ...risk, score, level });
    return acc;
  }, {});

  // Filter risks
  const filteredRisks = filterLevel === 'all' 
    ? allRisks.map(r => ({ ...r, score: getRiskScore(r.probability, r.impact), level: getRiskLevel(getRiskScore(r.probability, r.impact)) }))
    : (risksByLevel[filterLevel] || []);

  // Heatmap grid (5x5)
  const renderHeatmapGrid = () => {
    const grid = [];
    for (let impact = 5; impact >= 1; impact--) {
      const row = [];
      for (let probability = 1; probability <= 5; probability++) {
        const cellRisks = allRisks.filter(
          r => Math.round(r.probability) === probability && Math.round(r.impact) === impact
        );
        const score = probability * impact;
        const level = getRiskLevel(score);
        const colors = getRiskColor(level);
        
        row.push(
          <div
            key={`${probability}-${impact}`}
            className={`relative aspect-square border-2 ${colors.border} rounded-lg transition-all cursor-pointer hover:scale-105 hover:shadow-2xl ${
              cellRisks.length > 0 ? colors.bg + ' opacity-70' : 'bg-slate-800/30 opacity-40'
            } ${animated ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
            style={{ transitionDelay: `${(probability + impact) * 50}ms` }}
            onClick={() => cellRisks.length > 0 && setSelectedRisk(cellRisks[0])}
          >
            {cellRisks.length > 0 && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-slate-900 rounded-full w-8 h-8 flex items-center justify-center font-bold text-white text-sm shadow-lg">
                  {cellRisks.length}
                </div>
              </div>
            )}
          </div>
        );
      }
      grid.push(
        <div key={impact} className="grid grid-cols-5 gap-2">
          {row}
        </div>
      );
    }
    return grid;
  };

  if (!useCases || useCases.length === 0) {
    return (
      <div className="bg-slate-900/50 border-2 border-slate-700 rounded-2xl p-12 text-center">
        <AlertTriangle className="w-16 h-16 text-slate-600 mx-auto mb-4" />
        <p className="text-slate-400">No risk data available</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 border-2 border-teal-500/50 rounded-2xl p-6 shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center shadow-lg">
            <AlertTriangle className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">Risk Assessment Matrix</h3>
            <p className="text-sm text-gray-400">Probability vs. Impact Analysis</p>
          </div>
        </div>

        {/* Filter buttons */}
        <div className="flex gap-2 bg-slate-800/50 rounded-lg p-1 border border-slate-700">
          {['all', 'critical', 'high', 'medium', 'low'].map(level => (
            <button
              key={level}
              onClick={() => setFilterLevel(level)}
              className={`px-3 py-2 rounded-md text-xs font-semibold transition-all capitalize ${
                filterLevel === level
                  ? 'bg-teal-600 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      {/* Risk Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-red-900/20 border-2 border-red-500/50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <XCircle className="w-5 h-5 text-red-400" />
            <span className="text-xs text-gray-400">Critical Risks</span>
          </div>
          <div className="text-3xl font-bold text-red-400">
            {risksByLevel.critical?.length || 0}
          </div>
          <p className="text-xs text-red-400 mt-1">Immediate attention</p>
        </div>

        <div className="bg-orange-900/20 border-2 border-orange-500/50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-5 h-5 text-orange-400" />
            <span className="text-xs text-gray-400">High Risks</span>
          </div>
          <div className="text-3xl font-bold text-orange-400">
            {risksByLevel.high?.length || 0}
          </div>
          <p className="text-xs text-orange-400 mt-1">Mitigation required</p>
        </div>

        <div className="bg-yellow-900/20 border-2 border-yellow-500/50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Info className="w-5 h-5 text-yellow-400" />
            <span className="text-xs text-gray-400">Medium Risks</span>
          </div>
          <div className="text-3xl font-bold text-yellow-400">
            {risksByLevel.medium?.length || 0}
          </div>
          <p className="text-xs text-yellow-400 mt-1">Monitor closely</p>
        </div>

        <div className="bg-green-900/20 border-2 border-green-500/50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <span className="text-xs text-gray-400">Low Risks</span>
          </div>
          <div className="text-3xl font-bold text-green-400">
            {risksByLevel.low?.length || 0}
          </div>
          <p className="text-xs text-green-400 mt-1">Manageable</p>
        </div>
      </div>

      {/* Main grid layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Heatmap Grid - Left Side (2/3 width) */}
        <div className="lg:col-span-2">
          <div className="bg-slate-800/30 rounded-xl p-6 border border-slate-700">
            <div className="mb-4">
              <h4 className="text-lg font-bold text-white mb-2">Risk Heat Map</h4>
              <p className="text-xs text-gray-400">Click cells to view risk details</p>
            </div>

            {/* Grid container */}
            <div className="relative">
              {/* Y-axis label */}
              <div className="absolute -left-16 top-1/2 -translate-y-1/2 -rotate-90 text-sm font-semibold text-gray-400">
                IMPACT →
              </div>

              {/* Y-axis ticks */}
              <div className="absolute -left-8 top-0 bottom-0 flex flex-col justify-between text-xs text-gray-500 py-1">
                <span>5</span>
                <span>4</span>
                <span>3</span>
                <span>2</span>
                <span>1</span>
              </div>

              {/* Grid */}
              <div className="space-y-2 ml-2">
                {renderHeatmapGrid()}
              </div>

              {/* X-axis ticks */}
              <div className="flex justify-between mt-2 ml-2 px-1">
                {[1, 2, 3, 4, 5].map(num => (
                  <div key={num} className="text-xs text-gray-500 flex-1 text-center">
                    {num}
                  </div>
                ))}
              </div>

              {/* X-axis label */}
              <div className="text-sm font-semibold text-gray-400 text-center mt-2">
                PROBABILITY →
              </div>
            </div>

            {/* Legend */}
            <div className="mt-6 pt-4 border-t border-slate-700 flex flex-wrap gap-4 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-500 rounded" />
                <span className="text-gray-400">Critical (12-25)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-orange-500 rounded" />
                <span className="text-gray-400">High (9-11)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-yellow-500 rounded" />
                <span className="text-gray-400">Medium (6-8)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded" />
                <span className="text-gray-400">Low (1-5)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Risk Details Sidebar - Right Side (1/3 width) */}
        <div className="lg:col-span-1">
          <div className="bg-slate-800/30 rounded-xl border border-slate-700" style={{ height: '950px', display: 'flex', flexDirection: 'column' }}>
            <div className="p-4 border-b border-slate-700">
              <h4 className="text-lg font-bold text-white">Risk Details</h4>
            </div>
            
            {/* Scrollable container */}
            <div className="overflow-y-auto custom-scrollbar p-4 space-y-3" style={{ flex: 1 }}>
              {filteredRisks.length > 0 ? (
                filteredRisks.map((risk, idx) => {
                  const colors = getRiskColor(risk.level);
                  return (
                    <div
                      key={risk.id}
                      className={`bg-slate-900/50 rounded-xl p-4 border-2 ${colors.border} cursor-pointer hover:shadow-xl transition-all ${
                        selectedRisk?.id === risk.id ? 'ring-2 ring-teal-500' : ''
                      } ${animated ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'}`}
                      style={{ transitionDelay: `${idx * 50 + 700}ms` }}
                      onClick={() => setSelectedRisk(risk)}
                    >
                      {/* Risk header */}
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1 min-w-0">
                          <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold mb-2 ${colors.bg} bg-opacity-20 ${colors.text}`}>
                            {risk.level.toUpperCase()}
                          </div>
                          <h5 className="font-bold text-white text-sm truncate">{risk.useCaseName}</h5>
                          <p className="text-xs text-gray-400">{risk.category} Risk</p>
                        </div>
                        <div className={`text-2xl font-bold ${colors.text} ml-2`}>
                          {risk.score}
                        </div>
                      </div>

                      {/* Risk description */}
                      <p className="text-xs text-gray-300 mb-3">{risk.description}</p>

                      {/* Probability & Impact */}
                      <div className="grid grid-cols-2 gap-2 mb-3">
                        <div className="bg-slate-900/50 rounded-lg p-2">
                          <div className="text-xs text-gray-400">Probability</div>
                          <div className="flex gap-1 mt-1">
                            {[...Array(5)].map((_, i) => (
                              <div
                                key={i}
                                className={`h-2 flex-1 rounded ${
                                  i < risk.probability ? colors.bg : 'bg-slate-700'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <div className="bg-slate-900/50 rounded-lg p-2">
                          <div className="text-xs text-gray-400">Impact</div>
                          <div className="flex gap-1 mt-1">
                            {[...Array(5)].map((_, i) => (
                              <div
                                key={i}
                                className={`h-2 flex-1 rounded ${
                                  i < risk.impact ? colors.bg : 'bg-slate-700'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Mitigation */}
                      <div className="bg-teal-900/20 border border-teal-500/30 rounded-lg p-2">
                        <div className="flex items-center gap-1 text-xs text-teal-400 font-bold mb-1">
                          <Shield className="w-3 h-3" />
                          Mitigation Strategy
                        </div>
                        <p className="text-xs text-gray-300">{risk.mitigation}</p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center text-gray-500 py-12">
                  <Info className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No risks in this category</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Risk Management Recommendations */}
      <div className="mt-6 bg-slate-800/50 rounded-xl p-4 border border-slate-700">
        <div className="flex items-center gap-2 text-sm font-bold text-teal-300 mb-2">
          <Shield className="w-5 h-5" />
          Risk Management Recommendations
        </div>
        <ul className="space-y-2 text-sm text-gray-300">
          {(risksByLevel.critical?.length || 0) > 0 && (
            <li className="flex items-start gap-2">
              <span className="text-red-400 mt-0.5">•</span>
              <span>
                <span className="text-red-400 font-bold">Critical Priority:</span> Address {risksByLevel.critical.length} critical risk(s) before project kickoff. Develop detailed mitigation plans with executive oversight.
              </span>
            </li>
          )}
          {(risksByLevel.high?.length || 0) > 0 && (
            <li className="flex items-start gap-2">
              <span className="text-orange-400 mt-0.5">•</span>
              <span>
                <span className="text-orange-400 font-bold">High Priority:</span> Implement mitigation strategies for {risksByLevel.high.length} high risk(s) during Phase 1. Assign risk owners and monitor weekly.
              </span>
            </li>
          )}
          <li className="flex items-start gap-2">
            <span className="text-teal-400 mt-0.5">•</span>
            <span>
              Establish monthly risk review process with steering committee. Update risk register after each phase completion.
            </span>
          </li>
        </ul>
      </div>

      <style jsx>{`
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #14B8A6 #1e293b;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #1e293b;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #14B8A6;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #0D9488;
        }
      `}</style>
    </div>
  );
};

export default RiskHeatmap;