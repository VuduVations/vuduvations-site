'use client'

import React, { useState } from 'react';
import { Calendar, DollarSign, TrendingUp, Target, CheckCircle, Clock, Layers } from 'lucide-react';

const RoadmapSection = ({ roadmap, roadmapData }) => {
  const [expandedPhase, setExpandedPhase] = useState(0);
  
  // Handle both roadmap and roadmapData props (for backward compatibility)
  const roadmapArray = roadmap || roadmapData || [];

  if (!roadmapArray || roadmapArray.length === 0) {
    return null;
  }

  const togglePhase = (index) => {
    setExpandedPhase(expandedPhase === index ? null : index);
  };

  return (
    <div className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 border-2 border-teal-500/50 rounded-2xl p-8 shadow-2xl">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg">
          <Calendar className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-white">Implementation Roadmap</h3>
          <p className="text-sm text-white/70">Phased approach to maximize value delivery</p>
        </div>
      </div>

      {/* Timeline Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {roadmapArray.map((phase, idx) => (
          <div
            key={idx}
            className="bg-slate-800/50 rounded-xl p-4 border-2 border-slate-700 hover:border-purple-500/50 transition-all cursor-pointer"
            onClick={() => togglePhase(idx)}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-purple-400 uppercase">Phase {idx + 1}</span>
              <Clock className="w-4 h-4 text-purple-400" />
            </div>
            <h4 className="text-sm font-bold text-white mb-2 line-clamp-2">{phase.phase}</h4>
            <div className="text-xs text-white/60">{phase.duration}</div>
          </div>
        ))}
      </div>

      {/* Detailed Phase Information */}
      <div className="space-y-6">
        {roadmapArray.map((phase, idx) => (
          <div
            key={idx}
            className={`bg-slate-800/60 rounded-xl border-2 transition-all duration-300 ${
              expandedPhase === idx
                ? 'border-purple-500 shadow-lg shadow-purple-500/20'
                : 'border-slate-700'
            }`}
          >
            {/* Phase Header */}
            <button
              onClick={() => togglePhase(idx)}
              className="w-full p-6 text-left"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white font-bold shadow-lg">
                    {idx + 1}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-1">{phase.phase}</h4>
                    <p className="text-sm text-white/60">{phase.duration}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-sm text-white/60">Investment</div>
                    <div className="text-lg font-bold text-red-400">
                      ${((phase.total_investment || 0) / 1000000).toFixed(2)}M
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-white/60">Savings</div>
                    <div className="text-lg font-bold text-green-400">
                      ${((phase.expected_savings || 0) / 1000000).toFixed(2)}M
                    </div>
                  </div>
                  <CheckCircle className={`w-6 h-6 transition-transform duration-300 ${
                    expandedPhase === idx ? 'text-purple-400 rotate-90' : 'text-slate-600'
                  }`} />
                </div>
              </div>
            </button>

            {/* Expanded Content */}
            {expandedPhase === idx && (
              <div className="px-6 pb-6 space-y-6 animate-fadeIn">
                {/* Use Cases */}
                {phase.use_cases && phase.use_cases.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Target className="w-5 h-5 text-teal-400" />
                      <div className="text-sm text-white font-semibold">Use Cases:</div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {phase.use_cases.map((useCase, ucIdx) => (
                        <div key={ucIdx} className="flex items-center gap-2 bg-slate-900/50 rounded-lg p-3">
                          <Layers className="w-4 h-4 text-purple-400 flex-shrink-0" />
                          <span className="text-sm text-white/80">{useCase}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Key Milestones */}
                {phase.key_milestones && phase.key_milestones.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <div className="text-sm text-white font-semibold">Key Milestones:</div>
                    </div>
                    <ul className="space-y-2">
                      {phase.key_milestones.map((milestone, mIdx) => (
                        <li key={mIdx} className="flex items-start gap-3 text-sm text-white/80">
                          <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <div className="w-2 h-2 rounded-full bg-green-400"></div>
                          </div>
                          <span className="flex-1">{milestone}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Financial Summary */}
                <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-xs text-white/60 mb-1">Investment</div>
                      <div className="text-xl font-bold text-red-400">
                        ${((phase.total_investment || 0) / 1000000).toFixed(2)}M
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-white/60 mb-1">Expected Savings</div>
                      <div className="text-xl font-bold text-green-400">
                        ${((phase.expected_savings || 0) / 1000000).toFixed(2)}M
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-white/60 mb-1">Net Benefit</div>
                      <div className="text-xl font-bold text-teal-400">
                        ${(((phase.expected_savings || 0) - (phase.total_investment || 0)) / 1000000).toFixed(2)}M
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Total Summary */}
      <div className="mt-8 bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-2 border-purple-500/50 rounded-xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-sm text-white/70 mb-2">Total Phases</div>
            <div className="text-3xl font-bold text-white">{roadmapArray.length}</div>
          </div>
          <div>
            <div className="text-sm text-white/70 mb-2">Total Investment</div>
            <div className="text-3xl font-bold text-red-400">
              ${(roadmapArray.reduce((sum, p) => sum + (p.total_investment || 0), 0) / 1000000).toFixed(2)}M
            </div>
          </div>
          <div>
            <div className="text-sm text-white/70 mb-2">Expected Savings</div>
            <div className="text-3xl font-bold text-green-400">
              ${(roadmapArray.reduce((sum, p) => sum + (p.expected_savings || 0), 0) / 1000000).toFixed(2)}M
            </div>
          </div>
          <div>
            <div className="text-sm text-white/70 mb-2">Net Benefit</div>
            <div className="text-3xl font-bold text-teal-400">
              ${((roadmapArray.reduce((sum, p) => sum + (p.expected_savings || 0), 0) - 
                  roadmapArray.reduce((sum, p) => sum + (p.total_investment || 0), 0)) / 1000000).toFixed(2)}M
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default RoadmapSection;