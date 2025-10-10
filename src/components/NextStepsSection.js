'use client'
import React from 'react';
import { CheckCircle } from 'lucide-react';

const NextStepsSection = ({ steps }) => {
  return (
    <div className="bg-gradient-to-r from-cyan-900 to-blue-900 bg-opacity-30 border-2 border-cyan-500 rounded-2xl p-6">
      <h3 className="text-2xl font-bold text-cyan-300 mb-4 flex items-center gap-3">
        <CheckCircle className="w-6 h-6" />
        Recommended Next Steps
      </h3>
      <div className="space-y-3">
        {steps.map((step, idx) => (
          <div key={idx} className="flex items-start gap-3 bg-black bg-opacity-40 p-4 rounded-lg">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-600 flex items-center justify-center text-sm font-bold">
              {idx + 1}
            </span>
            <p className="text-gray-300 text-sm pt-1">{step}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NextStepsSection;