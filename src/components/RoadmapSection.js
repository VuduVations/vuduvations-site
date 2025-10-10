'use client'
import React from 'react';
import { Clock, Target } from 'lucide-react';

const RoadmapSection = ({ roadmap }) => {
  return (
    <div className="bg-gradient-to-r from-purple-900 to-indigo-900 bg-opacity-30 border-2 border-purple-500 rounded-2xl p-6">
      <h3 className="text-2xl font-bold text-purple-300 mb-6 flex items-center gap-3">
        <Clock className="w-6 h-6" />
        Implementation Roadmap
      </h3>
      
      <div className="space-y-4">
        {roadmap.map((phase, idx) => (
          <div
            key={idx}
            className="bg-black bg-opacity-40 rounded-lg p-5 border-l-4 border-purple-500"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-bold text-purple-400">
                    Phase {phase.phase_number}
                  </span>
                  <h4 className="text-xl font-bold text-white">{phase.phase_name}</h4>
                </div>
                <p className="text-purple-300 text-sm mt-1">{phase.duration}</p>
              </div>
            </div>

            <div className="mb-3">
              <div className="text-sm text-gray-400 mb-2">Use Cases:</div>
              <div className="flex flex-wrap gap-2">
                {phase.use_cases.map((uc, ucIdx) => (
                  <span
                    key={ucIdx}
                    className="px-3 py-1 bg-purple-900 bg-opacity-50 rounded-full text-sm text-purple-200"
                  >
                    {uc}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <div className="text-sm text-gray-400 mb-2">Key Milestones:</div>
              <ul className="space-y-1">
                {phase.key_milestones.map((milestone, mIdx) => (
                  <li key={mIdx} className="flex items-start gap-2 text-sm text-gray-300">
                    <Target className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                    {milestone}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoadmapSection;