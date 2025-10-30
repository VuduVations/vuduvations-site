'use client'

import React from 'react';
import { CheckCircle, Clock, ArrowRight, Target } from 'lucide-react';

const NextStepsSection = ({ steps }) => {
  if (!steps || steps.length === 0) {
    return null;
  }

  return (
    <div className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 border-2 border-teal-500/50 rounded-2xl p-8 shadow-2xl">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center shadow-lg">
          <Target className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-white">Next Steps</h3>
          <p className="text-sm text-white/70">Recommended action plan for implementation</p>
        </div>
      </div>

      {/* Steps Timeline */}
      <div className="space-y-4">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className="group relative bg-slate-800/60 rounded-xl p-6 border-2 border-slate-700 hover:border-teal-500/60 transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/20"
          >
            {/* Step Number Badge */}
            <div className="absolute -left-4 top-6 w-8 h-8 rounded-full bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center text-white font-bold text-sm shadow-lg">
              {idx + 1}
            </div>

            {/* Timeline Badge */}
            <div className="flex items-start justify-between mb-3">
              <div className="ml-6">
                <h4 className="text-lg font-bold text-white mb-1 group-hover:text-teal-400 transition-colors">
                  {step.step}
                </h4>
                <div className="flex items-center gap-2 text-sm text-teal-400 font-semibold">
                  <Clock className="w-4 h-4" />
                  {step.timeline}
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-slate-600 group-hover:text-teal-400 transition-colors" />
            </div>

            {/* Description */}
            <p className="ml-6 text-white/80 leading-relaxed">
              {step.description}
            </p>

            {/* Progress Line (except for last item) */}
            {idx < steps.length - 1 && (
              <div className="absolute left-0 top-full w-0.5 h-4 bg-gradient-to-b from-slate-700 to-transparent ml-[-4px]"></div>
            )}
          </div>
        ))}
      </div>

      {/* CTA Footer */}
      <div className="mt-8 pt-6 border-t border-slate-700">
        <div className="flex items-center gap-3 text-sm text-white/70">
          <CheckCircle className="w-5 h-5 text-teal-400" />
          <span>
            Following these steps will ensure a smooth implementation with measurable results at each milestone
          </span>
        </div>
      </div>
    </div>
  );
};

export default NextStepsSection;