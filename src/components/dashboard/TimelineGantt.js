'use client'
import React, { useState, useEffect } from 'react';
import { Calendar, CheckCircle2, Circle, Clock, TrendingUp, Target } from 'lucide-react';

const TimelineGantt = ({ roadmap, useCases = [] }) => {
  const [animated, setAnimated] = useState(false);
  const [hoveredPhase, setHoveredPhase] = useState(null);

  useEffect(() => {
    setTimeout(() => setAnimated(true), 500);
  }, []);

  if (!roadmap || roadmap.length === 0) {
    return (
      <div className="bg-slate-900/50 border-2 border-slate-700 rounded-2xl p-12 text-center">
        <Calendar className="w-16 h-16 text-slate-600 mx-auto mb-4" />
        <p className="text-slate-400">No roadmap data available</p>
      </div>
    );
  }

  // Phase colors
  const phaseColors = [
    { bg: 'from-teal-500 to-cyan-500', border: 'border-teal-500', text: 'text-teal-400', ring: 'ring-teal-500/50' },
    { bg: 'from-purple-500 to-pink-500', border: 'border-purple-500', text: 'text-purple-400', ring: 'ring-purple-500/50' },
    { bg: 'from-orange-500 to-red-500', border: 'border-orange-500', text: 'text-orange-400', ring: 'ring-orange-500/50' },
    { bg: 'from-blue-500 to-indigo-500', border: 'border-blue-500', text: 'text-blue-400', ring: 'ring-blue-500/50' }
  ];

  // Parse duration to months
  const parseDuration = (duration) => {
    const match = duration?.match(/(\d+)/);
    return match ? parseInt(match[1]) : 6;
  };

  // Calculate cumulative timeline
  let cumulativeMonths = 0;
  const timelineData = roadmap.map((phase, idx) => {
    const durationMonths = parseDuration(phase.duration);
    const startMonth = cumulativeMonths;
    const endMonth = cumulativeMonths + durationMonths;
    cumulativeMonths = endMonth;

    return {
      ...phase,
      startMonth,
      endMonth,
      durationMonths,
      colorScheme: phaseColors[idx % phaseColors.length]
    };
  });

  const totalMonths = cumulativeMonths;

  // ✅ FIXED: Get use case details for tooltips
  const getUseCaseDetails = (useCaseNames) => {
    return useCaseNames.map(name => {
      const useCase = useCases.find(uc => uc.title === name);
      return useCase ? {
        name: useCase.title,
        roi: useCase.estimated_roi || useCase.roi || 0,
        cost: useCase.estimated_cost || useCase.cost || 0,
        savings: useCase.estimated_savings || useCase.savings || 0
      } : { name, roi: 0, cost: 0, savings: 0 };
    });
  };

  return (
    <div className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 border-2 border-teal-500/50 rounded-2xl p-6 shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center shadow-lg">
            <Calendar className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">Implementation Roadmap</h3>
            <p className="text-sm text-gray-400">Phased Deployment Timeline</p>
          </div>
        </div>

        {/* Timeline summary */}
        <div className="flex items-center gap-6 bg-slate-800/50 rounded-xl px-6 py-3 border border-slate-700">
          <div>
            <div className="text-xs text-gray-400">Total Duration</div>
            <div className="text-2xl font-bold text-white">{totalMonths}mo</div>
          </div>
          <div className="w-px h-10 bg-slate-700" />
          <div>
            <div className="text-xs text-gray-400">Phases</div>
            <div className="text-2xl font-bold text-teal-400">{roadmap.length}</div>
          </div>
        </div>
      </div>

      {/* Timeline visualization */}
      <div className="mb-8">
        {/* Month markers */}
        <div className="flex items-center mb-2 px-4">
          {[...Array(Math.ceil(totalMonths / 3))].map((_, idx) => (
            <div 
              key={idx} 
              className="flex-1 text-xs text-gray-500 text-center"
            >
              M{idx * 3 + 1}
            </div>
          ))}
        </div>

        {/* Timeline bars */}
        <div className="space-y-4">
          {timelineData.map((phase, idx) => {
            const widthPercent = (phase.durationMonths / totalMonths) * 100;
            const leftPercent = (phase.startMonth / totalMonths) * 100;

            return (
              <div 
                key={idx}
                className={`transition-all duration-700 ${
                  animated ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
                }`}
                style={{ transitionDelay: `${idx * 150}ms` }}
                onMouseEnter={() => setHoveredPhase(idx)}
                onMouseLeave={() => setHoveredPhase(null)}
              >
                {/* Phase container */}
                <div className="relative bg-slate-800/30 rounded-xl p-4 border border-slate-700 hover:border-teal-500/50 transition-colors">
                  {/* Phase header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${phase.colorScheme.bg} flex items-center justify-center shadow-lg ${
                        hoveredPhase === idx ? 'scale-110' : ''
                      } transition-transform`}>
                        <span className="text-white font-bold text-sm">
                          {idx + 1}
                        </span>
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-white">{phase.phase}</h4>
                        <p className="text-xs text-gray-400">{phase.duration}</p>
                      </div>
                    </div>

                    {/* Use case count */}
                    <div className="flex items-center gap-2 bg-slate-700/50 rounded-lg px-3 py-1">
                      <Target className="w-4 h-4 text-teal-400" />
                      <span className="text-sm font-semibold text-white">
                        {phase.use_cases?.length || 0} use cases
                      </span>
                    </div>
                  </div>

                  {/* Timeline bar */}
                  <div className="relative h-12 bg-slate-900/50 rounded-lg mb-3 overflow-hidden">
                    {/* Background grid */}
                    <div className="absolute inset-0 flex">
                      {[...Array(Math.ceil(totalMonths / 3))].map((_, i) => (
                        <div 
                          key={i} 
                          className="flex-1 border-r border-slate-700/30"
                        />
                      ))}
                    </div>

                    {/* Active phase bar */}
                    <div
                      className={`absolute top-1 bottom-1 rounded-md bg-gradient-to-r ${phase.colorScheme.bg} shadow-lg ${
                        hoveredPhase === idx ? 'ring-4' : 'ring-2'
                      } ${phase.colorScheme.ring} transition-all cursor-pointer`}
                      style={{
                        left: `${leftPercent}%`,
                        width: `${widthPercent}%`
                      }}
                    >
                      {/* Progress shimmer effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                    </div>

                    {/* Start/End markers */}
                    <div className="absolute inset-0 flex items-center">
                      <div 
                        className="absolute w-px h-full bg-teal-500/50"
                        style={{ left: `${leftPercent}%` }}
                      />
                      <div 
                        className="absolute w-px h-full bg-teal-500/50"
                        style={{ left: `${leftPercent + widthPercent}%` }}
                      />
                    </div>
                  </div>

                  {/* Use cases list */}
                  {hoveredPhase === idx && (
                    <div className="bg-slate-900/80 rounded-lg p-3 border border-slate-700 animate-fadeIn">
                      <div className="text-xs font-bold text-gray-400 mb-2">USE CASES:</div>
                      <div className="space-y-2">
                        {getUseCaseDetails(phase.use_cases || []).map((uc, ucIdx) => (
                          <div 
                            key={ucIdx}
                            className="flex items-center justify-between text-xs bg-slate-800/50 rounded-lg p-2"
                          >
                            <div className="flex items-center gap-2">
                              <CheckCircle2 className="w-3 h-3 text-teal-400" />
                              <span className="text-gray-300">{uc.name}</span>
                            </div>
                            {uc.roi > 0 && (
                              <span className="text-teal-400 font-bold">
                                {uc.roi}% ROI
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Key milestones */}
                  {!hoveredPhase && phase.key_milestones && phase.key_milestones.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {phase.key_milestones.slice(0, 4).map((milestone, mIdx) => (
                        <div 
                          key={mIdx}
                          className="flex items-start gap-2 text-xs"
                        >
                          <Circle className={`w-3 h-3 mt-0.5 ${phase.colorScheme.text} flex-shrink-0`} />
                          <span className="text-gray-400">{milestone}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend & Key Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Timeline legend */}
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <div className="text-xs font-bold text-gray-400 mb-3">TIMELINE GUIDE</div>
          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-4 h-2 bg-gradient-to-r from-teal-500 to-cyan-500 rounded" />
              <span className="text-gray-300">Active Phase</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-teal-400" />
              <span className="text-gray-300">Hover for details</span>
            </div>
          </div>
        </div>

        {/* Total investment - ✅ FIXED */}
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <div className="text-xs font-bold text-gray-400 mb-1">TOTAL INVESTMENT</div>
          <div className="text-2xl font-bold text-purple-400 mb-1">
            ${(useCases.reduce((sum, uc) => sum + (uc.estimated_cost || uc.cost || 0), 0) / 1000000).toFixed(2)}M
          </div>
          <div className="text-xs text-gray-400">Across all phases</div>
        </div>

        {/* Expected ROI - ✅ FIXED */}
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <div className="text-xs font-bold text-gray-400 mb-1">EXPECTED ROI</div>
          <div className="text-2xl font-bold text-green-400 mb-1">
            {useCases.length > 0 
              ? (useCases.reduce((sum, uc) => sum + (uc.estimated_roi || uc.roi || 0), 0) / useCases.length).toFixed(0)
              : 0}%
          </div>
          <div className="text-xs text-gray-400">Average across use cases</div>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default TimelineGantt;