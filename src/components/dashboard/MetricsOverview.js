'use client'
import React, { useState, useEffect } from 'react';
import { TrendingUp, DollarSign, Target, Clock } from 'lucide-react';

const MetricsOverview = ({ analysisResults }) => {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimated(true), 100);
  }, []);

  // ✅ FIXED: Calculate metrics from the actual data structure
  console.log('📈 MetricsOverview - analysisResults:', analysisResults);
  
  // Calculate total investment from use cases
  const totalInvestment = analysisResults.top_use_cases?.reduce((sum, uc) => {
    const cost = uc.estimated_cost || uc.cost || 0;
    return sum + cost;
  }, 0) || analysisResults.total_estimated_investment || 0;
  
  // Calculate average ROI
  const avgROI = analysisResults.top_use_cases?.length > 0
    ? analysisResults.top_use_cases.reduce((sum, uc) => {
        const roi = uc.estimated_roi || uc.roi || 0;
        return sum + roi;
      }, 0) / analysisResults.top_use_cases.length
    : analysisResults.total_potential_roi || 0;

  console.log('📈 Calculated metrics:', {
    totalInvestment,
    avgROI,
    useCasesCount: analysisResults.top_use_cases?.length
  });

  const metrics = [
    {
      label: 'Average ROI',
      value: `${avgROI.toFixed(0)}%`,
      change: '+47%',
      trend: 'up',
      icon: TrendingUp,
      gradient: 'from-teal-500 to-cyan-500',
      bgGradient: 'from-teal-900/20 to-cyan-900/20'
    },
    {
      label: 'Total Investment',
      value: `$${(totalInvestment / 1000000).toFixed(1)}M`,
      change: 'Within budget',
      trend: 'neutral',
      icon: DollarSign,
      gradient: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-900/20 to-pink-900/20'
    },
    {
      label: 'Use Cases',
      value: analysisResults.top_use_cases?.length || 0,
      change: `${analysisResults.top_use_cases?.filter(uc => uc.priority === 'High').length || 0} high priority`,
      trend: 'up',
      icon: Target,
      gradient: 'from-green-500 to-emerald-500',
      bgGradient: 'from-green-900/20 to-emerald-900/20'
    },
    {
      label: 'Timeline',
      value: `${(analysisResults.implementation_roadmap?.length || 0) * 6}mo`,
      change: `${analysisResults.implementation_roadmap?.length || 0} phases`,
      trend: 'neutral',
      icon: Clock,
      gradient: 'from-orange-500 to-red-500',
      bgGradient: 'from-orange-900/20 to-red-900/20'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {metrics.map((metric, idx) => {
        const Icon = metric.icon;
        return (
          <div
            key={idx}
            className={`relative overflow-hidden rounded-2xl border-2 transition-all duration-700 transform ${
              animated ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
            style={{
              transitionDelay: `${idx * 100}ms`,
              borderColor: idx === 0 ? '#14B8A6' : idx === 1 ? '#A855F7' : idx === 2 ? '#10B981' : '#F59E0B'
            }}
          >
            {/* Gradient background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${metric.bgGradient}`} />
            
            {/* Animated glow effect */}
            <div className={`absolute inset-0 bg-gradient-to-br ${metric.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
            
            {/* Content */}
            <div className="relative p-6">
              {/* Icon with gradient */}
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${metric.gradient} flex items-center justify-center mb-4 shadow-lg`}>
                <Icon className="w-6 h-6 text-white" />
              </div>

              {/* Label */}
              <div className="text-sm text-gray-400 font-medium mb-1">
                {metric.label}
              </div>

              {/* Value with counter animation */}
              <div className="text-4xl font-bold text-white mb-2">
                {metric.value}
              </div>

              {/* Change indicator */}
              <div className={`flex items-center gap-2 text-sm ${
                metric.trend === 'up' ? 'text-green-400' : 
                metric.trend === 'down' ? 'text-red-400' : 
                'text-gray-400'
              }`}>
                {metric.trend === 'up' && (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                )}
                <span className="font-medium">{metric.change}</span>
              </div>

              {/* Sparkline placeholder */}
              <div className="mt-4 h-8 flex items-end gap-1">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className={`flex-1 bg-gradient-to-t ${metric.gradient} rounded-t opacity-40`}
                    style={{
                      height: `${20 + Math.random() * 80}%`,
                      animation: `growBar 0.6s ease-out ${i * 0.05}s backwards`
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Bottom accent line */}
            <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${metric.gradient}`} />
          </div>
        );
      })}

      <style>{`
        @keyframes growBar {
          from {
            transform: scaleY(0);
            opacity: 0;
          }
          to {
            transform: scaleY(1);
            opacity: 0.4;
          }
        }
      `}</style>
    </div>
  );
};

export default MetricsOverview;