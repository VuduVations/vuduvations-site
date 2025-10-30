// src/app/earnings-analyzer/components/UploadModal.js
'use client'

import { CheckCircle } from 'lucide-react'

export default function UploadModal({ showUploadModal, setShowUploadModal }) {
  if (!showUploadModal) return null

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-6">
      <div className="bg-gradient-to-br from-slate-900 to-blue-900 rounded-xl p-8 max-w-2xl w-full border border-white/20">
        <h3 className="text-2xl font-bold mb-4">Strategy Consulting-Grade Analysis</h3>
        <p className="text-gray-300 mb-6">
          Get the same level of strategic earnings analysis that firms like McKinsey, Bain, 
          and BCG provide to Fortune 500 companiesâ€”delivered in minutes, not weeks. 
          Simply provide the company ticker or upload earnings transcripts.
        </p>
        
        <div className="bg-blue-500/10 border border-blue-400/30 rounded-lg p-6 mb-6">
          <h4 className="font-bold text-blue-300 mb-3">What You&apos;ll Receive:</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
              Multi-quarter sentiment analysis with trend tracking
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
              Business segment performance breakdown with financial evidence
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
              Strategic theme extraction and competitive positioning
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
              Risk assessment and opportunity identification
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
              Investment-grade insights with bullish/bearish factor analysis
            </li>
          </ul>
        </div>

        <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-400/30 rounded-lg p-4 mb-6">
          <div className="text-sm font-semibold text-purple-300 mb-2">
            Perfect For:
          </div>
          <div className="text-xs text-gray-300">
            Investment professionals â€¢ Financial advisors â€¢ Equity analysts â€¢ Portfolio managers â€¢ Serious investors
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => setShowUploadModal(false)}
            className="flex-1 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg font-semibold transition-all"
          >
            Close
          </button>
          
          <a href="mailto:hello@vuduvations.io?subject=Custom Earnings Analysis Request&body=Hi,%0D%0A%0D%0AI'm interested in getting a custom earnings analysis.%0D%0A%0D%0ACompany/Ticker:%0D%0AQuarters Needed:%0D%0A%0D%0AThanks!"
            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-all text-center"
          >
            Request Analysis
          </a>
        </div>
      </div>
    </div>
  )
}