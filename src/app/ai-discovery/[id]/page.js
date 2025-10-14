// src/app/ai-discovery/[id]/page.js

'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import ResultsDashboard from '@/components/ResultsDashboard'
import ContactModal from '@/components/ContactModal'
import { Brain, Target, TrendingUp, BarChart3 } from 'lucide-react'

export default function DemoPage() {
  const params = useParams()
  const [demoData, setDemoData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)

  const aiDiscoveryBenefits = [
    { 
      text: "Complete multi-dimensional AI readiness assessment across your organization",
      icon: <Target className="w-5 h-5" />
    },
    { 
      text: "Executive-ready ROI projections and use case mapping with competitive positioning",
      icon: <TrendingUp className="w-5 h-5" />
    },
    { 
      text: "Strategic roadmap with implementation priorities and resource requirements",
      icon: <BarChart3 className="w-5 h-5" />
    },
    { 
      text: "Industry-specific insights from F500 consulting best practices",
      icon: <Brain className="w-5 h-5" />
    }
  ]

  useEffect(() => {
    async function loadDemo() {
      try {
        const response = await fetch(`/data/demos/${params.id}.json`)
        const data = await response.json()
        setDemoData(data)
      } catch (error) {
        console.error('Error loading demo:', error)
      } finally {
        setLoading(false)
      }
    }
    loadDemo()
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-teal-900 to-slate-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Loading...</h1>
        </div>
      </div>
    )
  }

  if (!demoData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-teal-900 to-slate-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Demo Not Found</h1>
          <Link href="/ai-discovery" className="text-teal-400 hover:text-teal-300">
            Back to All Demos
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-teal-900 to-slate-900 text-white">
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-6">
          <Link href="/ai-discovery" className="text-teal-400 hover:text-teal-300 mb-4 inline-block">
            ← Back to All Demos
          </Link>
        </div>

        <ResultsDashboard 
          analysisResults={demoData}
          formData={{
            company_name: demoData.company_name,
            industry: demoData.industry
          }}
        />

        {/* CTA Section with Modal Trigger */}
        <div className="mt-12 bg-slate-900/50 border border-teal-500/20 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready for Your Custom Analysis?</h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            This demo shows what's possible. Get a tailored AI discovery analysis for your company's specific challenges and opportunities.
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-lg font-semibold transition-all text-lg"
          >
            Request Custom Analysis
          </button>
        </div>
      </div>

      {/* Contact Modal */}
      <ContactModal 
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        appName="AI Discovery Dashboard"
        appIcon={<Brain className="w-8 h-8" />}
        benefits={aiDiscoveryBenefits}
        ctaText="Request Custom AI Analysis"
      />
    </div>
  )
}