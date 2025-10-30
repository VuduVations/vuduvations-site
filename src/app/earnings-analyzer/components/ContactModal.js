'use client'

import { X } from 'lucide-react'

export default function ContactModal({ isOpen, onClose, appName, appIcon, benefits, ctaText }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-800 rounded-xl border border-blue-400/30 max-w-2xl w-full p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            {appIcon}
            <h2 className="text-2xl font-bold text-white">{appName}</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4 mb-6">
          {benefits.map((benefit, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <div className="text-blue-400">{benefit.icon}</div>
              <p className="text-gray-300">{benefit.text}</p>
            </div>
          ))}
        </div>

        <div className="bg-blue-500/10 border border-blue-400/30 rounded-lg p-6">
          <h3 className="text-lg font-bold text-white mb-3">{ctaText}</h3>
          <p className="text-gray-300 mb-4">
            Contact us at: <span className="text-blue-400">demo@vuduvations.io</span>
          </p>
          <button
            onClick={onClose}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

