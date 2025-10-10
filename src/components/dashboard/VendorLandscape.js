'use client'
import React, { useState, useEffect } from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, ResponsiveContainer, Tooltip } from 'recharts';
import { Building2, Star, TrendingUp, Shield, Zap, DollarSign } from 'lucide-react';

const VendorLandscape = ({ vendors = [], industry }) => {
  const [animated, setAnimated] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [comparisonMode, setComparisonMode] = useState('all');

  useEffect(() => {
    setTimeout(() => setAnimated(true), 800);
  }, []);

  // If no vendors provided, generate based on industry
  const getDefaultVendors = () => {
    const vendorDatabase = {
      'Healthcare': [
        { name: 'Epic AI', score: { innovation: 85, reliability: 95, cost: 65, support: 90, integration: 88, security: 98 } },
        { name: 'Cura AI', score: { innovation: 90, reliability: 85, cost: 75, support: 80, integration: 82, security: 95 } },
        { name: 'Tempus', score: { innovation: 95, reliability: 80, cost: 60, support: 75, integration: 78, security: 92 } },
        { name: 'Augmedix', score: { innovation: 80, reliability: 88, cost: 82, support: 85, integration: 85, security: 90 } },
        { name: 'XpertDox', score: { innovation: 88, reliability: 82, cost: 70, support: 78, integration: 80, security: 93 } }
      ],
      'Manufacturing': [
        { name: 'Siemens MindSphere', score: { innovation: 92, reliability: 95, cost: 60, support: 88, integration: 90, security: 96 } },
        { name: 'IBM Watson IoT', score: { innovation: 90, reliability: 90, cost: 65, support: 85, integration: 92, security: 95 } },
        { name: 'GE Digital Predix', score: { innovation: 88, reliability: 92, cost: 62, support: 80, integration: 88, security: 94 } },
        { name: 'C3.AI', score: { innovation: 95, reliability: 85, cost: 70, support: 82, integration: 85, security: 90 } },
        { name: 'Rockwell', score: { innovation: 85, reliability: 93, cost: 68, support: 90, integration: 87, security: 92 } }
      ],
      'E-commerce': [
        { name: 'Dynamic Yield', score: { innovation: 92, reliability: 88, cost: 75, support: 85, integration: 90, security: 88 } },
        { name: 'Bloomreach', score: { innovation: 90, reliability: 85, cost: 78, support: 82, integration: 88, security: 86 } },
        { name: 'Algolia', score: { innovation: 88, reliability: 92, cost: 80, support: 90, integration: 95, security: 90 } },
        { name: 'Nosto', score: { innovation: 85, reliability: 87, cost: 82, support: 88, integration: 85, security: 85 } },
        { name: 'Insider', score: { innovation: 93, reliability: 86, cost: 72, support: 80, integration: 87, security: 88 } }
      ],
      'default': [
        { name: 'Vendor A', score: { innovation: 85, reliability: 88, cost: 75, support: 82, integration: 85, security: 90 } },
        { name: 'Vendor B', score: { innovation: 90, reliability: 85, cost: 70, support: 85, integration: 88, security: 88 } },
        { name: 'Vendor C', score: { innovation: 88, reliability: 90, cost: 78, support: 88, integration: 90, security: 92 } },
        { name: 'Vendor D', score: { innovation: 82, reliability: 92, cost: 82, support: 90, integration: 87, security: 95 } },
        { name: 'Vendor E', score: { innovation: 92, reliability: 80, cost: 68, support: 78, integration: 82, security: 86 } }
      ]
    };

    // Find matching industry or use default
    const industryKey = Object.keys(vendorDatabase).find(key => 
      industry?.toLowerCase().includes(key.toLowerCase())
    ) || 'default';

    return vendorDatabase[industryKey];
  };

  const vendorList = vendors.length > 0 ? vendors : getDefaultVendors();

  // Prepare radar chart data
  const dimensions = [
    { key: 'innovation', label: 'Innovation', icon: Zap },
    { key: 'reliability', label: 'Reliability', icon: Shield },
    { key: 'cost', label: 'Cost-Effectiveness', icon: DollarSign },
    { key: 'support', label: 'Support', icon: Star },
    { key: 'integration', label: 'Integration', icon: TrendingUp },
    { key: 'security', label: 'Security', icon: Shield }
  ];

  const radarData = dimensions.map(dim => {
    const dataPoint = { dimension: dim.label };
    vendorList.forEach(vendor => {
      dataPoint[vendor.name] = vendor.score[dim.key];
    });
    return dataPoint;
  });

  // Vendor colors
  const vendorColors = ['#14B8A6', '#A855F7', '#F59E0B', '#10B981', '#EF4444'];

  // Calculate overall scores
  const vendorScores = vendorList.map((vendor, idx) => {
    const avgScore = Object.values(vendor.score).reduce((sum, val) => sum + val, 0) / Object.values(vendor.score).length;
    return {
      ...vendor,
      avgScore: avgScore.toFixed(1),
      color: vendorColors[idx % vendorColors.length]
    };
  }).sort((a, b) => b.avgScore - a.avgScore);

  // Get filtered vendors for radar
  const getFilteredVendors = () => {
    if (comparisonMode === 'all') return vendorList.map(v => v.name);
    if (comparisonMode === 'top3') return vendorScores.slice(0, 3).map(v => v.name);
    if (selectedVendor) return [selectedVendor];
    return vendorList.map(v => v.name);
  };

  const activeVendors = getFilteredVendors();

  // Custom tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900 border-2 border-teal-500 rounded-xl p-4 shadow-2xl">
          <div className="font-bold text-white mb-2">{payload[0].payload.dimension}</div>
          <div className="space-y-1">
            {payload.map((entry, idx) => (
              <div key={idx} className="flex items-center justify-between gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: entry.color }}
                  />
                  <span className="text-gray-300">{entry.name}</span>
                </div>
                <span className="font-bold text-white">{entry.value}/100</span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  if (!vendorList || vendorList.length === 0) {
    return (
      <div className="bg-slate-900/50 border-2 border-slate-700 rounded-2xl p-12 text-center">
        <Building2 className="w-16 h-16 text-slate-600 mx-auto mb-4" />
        <p className="text-slate-400">No vendor data available</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 border-2 border-teal-500/50 rounded-2xl p-6 shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center shadow-lg">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">Vendor Landscape Analysis</h3>
            <p className="text-sm text-gray-400">Multi-Dimensional Capability Assessment</p>
          </div>
        </div>

        {/* Comparison mode toggles */}
        <div className="flex gap-2 bg-slate-800/50 rounded-lg p-1 border border-slate-700">
          <button
            onClick={() => { setComparisonMode('all'); setSelectedVendor(null); }}
            className={`px-3 py-2 rounded-md text-xs font-semibold transition-all ${
              comparisonMode === 'all'
                ? 'bg-teal-600 text-white shadow-lg'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            All Vendors
          </button>
          <button
            onClick={() => { setComparisonMode('top3'); setSelectedVendor(null); }}
            className={`px-3 py-2 rounded-md text-xs font-semibold transition-all ${
              comparisonMode === 'top3'
                ? 'bg-teal-600 text-white shadow-lg'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Top 3
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Radar Chart */}
        <div className="lg:col-span-2">
          <div className="bg-slate-800/30 rounded-xl p-6 border border-slate-700">
            <div className={`transition-all duration-1000 ${animated ? 'opacity-100' : 'opacity-0'}`}>
              <ResponsiveContainer width="100%" height={500}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#475569" />
                  <PolarAngleAxis 
                    dataKey="dimension"
                    tick={{ fill: '#94A3B8', fontSize: 12 }}
                  />
                  <PolarRadiusAxis 
                    angle={90}
                    domain={[0, 100]}
                    tick={{ fill: '#94A3B8', fontSize: 10 }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  
                  {vendorList.map((vendor, idx) => (
                    activeVendors.includes(vendor.name) && (
                      <Radar
                        key={vendor.name}
                        name={vendor.name}
                        dataKey={vendor.name}
                        stroke={vendorColors[idx % vendorColors.length]}
                        fill={vendorColors[idx % vendorColors.length]}
                        fillOpacity={selectedVendor === vendor.name ? 0.6 : 0.15}
                        strokeWidth={selectedVendor === vendor.name ? 3 : 2}
                        animationDuration={1500}
                        animationBegin={idx * 200}
                      />
                    )
                  ))}
                  
                  <Legend 
                    wrapperStyle={{ paddingTop: '20px' }}
                    onClick={(e) => {
                      setSelectedVendor(selectedVendor === e.value ? null : e.value);
                      setComparisonMode('single');
                    }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* Dimension Legend */}
            <div className="mt-6 pt-4 border-t border-slate-700">
              <div className="text-xs font-bold text-gray-400 mb-3">EVALUATION DIMENSIONS</div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {dimensions.map((dim, idx) => {
                  const Icon = dim.icon;
                  return (
                    <div key={dim.key} className="flex items-center gap-2 text-xs">
                      <Icon className="w-4 h-4 text-teal-400" />
                      <span className="text-gray-300">{dim.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Vendor Rankings */}
        <div className="space-y-3 max-h-[600px] overflow-y-auto custom-scrollbar">
          <div className="text-sm font-bold text-gray-400 mb-3">VENDOR RANKINGS</div>
          
          {vendorScores.map((vendor, idx) => (
            <div
              key={vendor.name}
              className={`bg-slate-800/50 rounded-xl p-4 border-2 cursor-pointer transition-all ${
                selectedVendor === vendor.name
                  ? 'border-teal-500 shadow-xl'
                  : 'border-slate-700 hover:border-teal-500/50'
              } ${animated ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'}`}
              style={{ 
                transitionDelay: `${idx * 100 + 800}ms`,
                borderLeftColor: vendor.color,
                borderLeftWidth: '4px'
              }}
              onClick={() => {
                setSelectedVendor(selectedVendor === vendor.name ? null : vendor.name);
                setComparisonMode('single');
              }}
            >
              {/* Rank badge */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white shadow-lg"
                    style={{ backgroundColor: vendor.color }}
                  >
                    #{idx + 1}
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">{vendor.name}</h4>
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                      <span>{vendor.avgScore}/100</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Score bars */}
              <div className="space-y-2">
                {dimensions.map(dim => (
                  <div key={dim.key} className="flex items-center gap-2">
                    <span className="text-xs text-gray-400 w-24 truncate">{dim.label}</span>
                    <div className="flex-1 h-2 bg-slate-900/50 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-1000"
                        style={{
                          width: `${vendor.score[dim.key]}%`,
                          backgroundColor: vendor.color,
                          transitionDelay: `${idx * 100 + 1200}ms`
                        }}
                      />
                    </div>
                    <span className="text-xs text-gray-500 w-8 text-right">
                      {vendor.score[dim.key]}
                    </span>
                  </div>
                ))}
              </div>

              {/* Strengths */}
              <div className="mt-3 pt-3 border-t border-slate-700">
                <div className="text-xs font-bold text-teal-300 mb-1">Key Strengths:</div>
                <div className="flex flex-wrap gap-1">
                  {Object.entries(vendor.score)
                    .sort(([, a], [, b]) => b - a)
                    .slice(0, 3)
                    .map(([key]) => {
                      const dim = dimensions.find(d => d.key === key);
                      return (
                        <span 
                          key={key}
                          className="text-xs px-2 py-1 rounded-full bg-teal-900/30 text-teal-400 border border-teal-500/30"
                        >
                          {dim?.label}
                        </span>
                      );
                    })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Comparison Summary */}
      <div className="mt-6 bg-slate-800/50 rounded-xl p-4 border border-slate-700">
        <div className="flex items-center gap-2 text-sm font-bold text-teal-300 mb-2">
          <TrendingUp className="w-5 h-5" />
          Vendor Selection Recommendations
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-300">
          <div>
            <span className="text-teal-400 font-bold">Best Overall: </span>
            <span>{vendorScores[0].name} ({vendorScores[0].avgScore}/100)</span>
          </div>
          <div>
            <span className="text-purple-400 font-bold">Most Innovative: </span>
            <span>
              {vendorScores.sort((a, b) => b.score.innovation - a.score.innovation)[0].name}
            </span>
          </div>
          <div>
            <span className="text-green-400 font-bold">Best Value: </span>
            <span>
              {vendorScores.sort((a, b) => b.score.cost - a.score.cost)[0].name}
            </span>
          </div>
        </div>
      </div>

      <style jsx>{`
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

export default VendorLandscape;