// src/components/UseCaseCard.js
'use client'
import React from 'react';
import { TrendingUp, DollarSign, Sparkles, Clock, Building2, Target } from 'lucide-react';

const UseCaseCard = ({ useCase }) => {
  // Calculate payback in months
  const paybackMonths = useCase.estimated_savings > 0 
    ? Math.round((useCase.estimated_cost / useCase.estimated_savings) * 12)
    : 0;

  // Get priority color
  const getPriorityColor = (priority) => {
    const p = (priority || 'medium').toLowerCase();
    if (p === 'high') return 'from-red-500/20 to-pink-500/20 border-red-500/50 text-red-400';
    if (p === 'low') return 'from-green-500/20 to-emerald-500/20 border-green-500/50 text-green-400';
    return 'from-amber-500/20 to-yellow-500/20 border-amber-500/50 text-amber-400';
  };

  // Get ROI color
  const getRoiColor = (roi) => {
    if (roi >= 100) return 'text-purple-400 from-purple-500/20 to-pink-500/20 border-purple-500/50';
    if (roi >= 80) return 'text-teal-400 from-teal-500/20 to-cyan-500/20 border-teal-500/50';
    if (roi >= 60) return 'text-green-400 from-green-500/20 to-emerald-500/20 border-green-500/50';
    return 'text-amber-400 from-amber-500/20 to-yellow-500/20 border-amber-500/50';
  };

  const roi = useCase.estimated_roi || 0;
  const roiColorClass = getRoiColor(roi);

  return (
    <div className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 border-2 border-teal-500/50 rounded-2xl p-6 shadow-2xl hover:shadow-teal-500/20 transition-all duration-300 hover:border-teal-400">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
            <Target className="w-5 h-5 text-teal-400" />
            {useCase.title || 'AI Use Case'}
          </h3>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-bold border-2 bg-gradient-to-r ${getPriorityColor(useCase.priority)}`}>
          {useCase.priority || 'Medium'}
        </span>
      </div>

      {/* Description */}
      <p className="text-gray-300 text-sm mb-6 leading-relaxed">
        {useCase.description}
      </p>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {/* ROI Metric */}
        <div className={`bg-gradient-to-br ${roiColorClass} border-2 rounded-xl p-4 text-center`}>
          <TrendingUp className="w-5 h-5 mx-auto mb-2" />
          <div className="text-xs text-gray-400 mb-1">ROI</div>
          <div className="text-2xl font-bold">
            {roi.toFixed(0)}%
          </div>
        </div>

        {/* Investment Metric */}
        <div className="bg-gradient-to-br from-red-500/20 to-pink-500/20 border-2 border-red-500/50 rounded-xl p-4 text-center">
          <DollarSign className="w-5 h-5 text-red-400 mx-auto mb-2" />
          <div className="text-xs text-gray-400 mb-1">Investment</div>
          <div className="text-2xl font-bold text-red-400">
            ${(useCase.estimated_cost / 1000000).toFixed(1)}M
          </div>
        </div>

        {/* Annual Savings Metric */}
        <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-2 border-green-500/50 rounded-xl p-4 text-center">
          <Sparkles className="w-5 h-5 text-green-400 mx-auto mb-2" />
          <div className="text-xs text-gray-400 mb-1">Annual Savings</div>
          <div className="text-2xl font-bold text-green-400">
            ${(useCase.estimated_savings / 1000000).toFixed(1)}M
          </div>
        </div>

        {/* Payback Period Metric */}
        <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-2 border-blue-500/50 rounded-xl p-4 text-center">
          <Clock className="w-5 h-5 text-blue-400 mx-auto mb-2" />
          <div className="text-xs text-gray-400 mb-1">Payback</div>
          <div className="text-2xl font-bold text-blue-400">
            {paybackMonths}mo
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4 pb-4 border-b border-slate-700">
        <div className="flex items-center gap-2 text-sm">
          <Clock className="w-4 h-4 text-teal-400" />
          <span className="text-gray-400">Timeline:</span>
          <span className="text-white font-semibold">
            {useCase.implementation_time || '6-12 months'}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Building2 className="w-4 h-4 text-purple-400" />
          <span className="text-gray-400">Department:</span>
          <span className="text-white font-semibold">
            {useCase.department || 'Operations'}
          </span>
        </div>
      </div>

      {/* Key Benefits Section */}
      {useCase.key_benefits && useCase.key_benefits.length > 0 && (
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <h4 className="text-sm font-bold text-teal-300 mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            KEY BENEFITS:
          </h4>
          <ul className="space-y-2">
            {useCase.key_benefits.map((benefit, idx) => (
              <li key={idx} className="text-sm text-gray-300 flex items-start gap-2">
                <span className="text-green-400 mt-0.5">✓</span>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UseCaseCard;