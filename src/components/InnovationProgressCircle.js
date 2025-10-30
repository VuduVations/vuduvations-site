// frontend/src/components/cards/InnovationProgressCircle.js
import React from 'react';
import PropTypes from 'prop-types';

const Card = ({ title, children, className }) => (
  <div className={`bg-[#25293C] rounded-xl p-4 flex flex-col border border-gray-700/50 h-full ${className}`}>
    {title && <h3 className="font-semibold text-white text-sm uppercase tracking-wider mb-4">{title}</h3>}
    <div className="flex-grow flex flex-col justify-center">{children}</div>
  </div>
);

const InnovationProgressCircle = ({ id, score }) => (
  <Card title="Innovation Score (Circle)" className="h-full">
    <div id={id} className="relative w-32 h-32 mx-auto">
      <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
        <circle cx="50" cy="50" r="45" fill="none" stroke="#373B53" strokeWidth="10" />
        <circle cx="50" cy="50" r="45" fill="none" stroke="url(#progressGradient)" strokeWidth="10" strokeDasharray={283} strokeDashoffset={283 * (1 - (score / 100))} strokeLinecap="round" />
        <defs>
          <linearGradient id="progressGradient" gradientTransform="rotate(90)">
            <stop offset="5%" stopColor="#6B7280" />
            <stop offset="60%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#22C55E" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-3xl font-bold text-white">{score}</span>
        <span className="ml-1 text-gray-400 text-base">/ 100</span>
      </div>
    </div>
  </Card>
);

InnovationProgressCircle.propTypes = {
  id: PropTypes.string,
  score: PropTypes.number,
};

export default InnovationProgressCircle;