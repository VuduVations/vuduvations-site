'use client';

import { X } from 'lucide-react';

export default function ContactModal({ isOpen, onClose, appName, appIcon, benefits, ctaText }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900 rounded-xl max-w-2xl w-full p-8 border border-white/20 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-red-400 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          {appIcon}
          <h2 className="text-2xl font-bold text-white">{appName}</h2>
        </div>

        {/* Benefits */}
        {benefits && benefits.length > 0 && (
          <div className="space-y-3 mb-6">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="flex items-start gap-3 text-white">
                {benefit.icon}
                <span>{benefit.text}</span>
              </div>
            ))}
          </div>
        )}

        {/* Contact Form */}
        <form className="space-y-4" onSubmit={(e) => {
          e.preventDefault();
          alert('Form submitted! (This is a demo - no actual submission)');
          onClose();
        }}>
          <input
            type="text"
            placeholder="Your Name"
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400"
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400"
            required
          />
          <textarea
            placeholder="Tell us about your use case..."
            rows={4}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400"
            required
          />
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-3 rounded-lg transition-all"
          >
            {ctaText || 'Request Demo'}
          </button>
        </form>
      </div>
    </div>
  );
}
