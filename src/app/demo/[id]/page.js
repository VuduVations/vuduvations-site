'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import ResultsDashboard from '@/components/ResultsDashboard'

export default function DemoPage() {
  const params = useParams()
  const [demoData, setDemoData] = useState(null)
  const [loading, setLoading] = useState(true)

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
          <Link href="/demo" className="text-teal-400 hover:text-teal-300">
            Back to Demos
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-teal-900 to-slate-900 text-white">
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-6">
          <Link href="/demo" className="text-teal-400 hover:text-teal-300 mb-4 inline-block">
            Back to All Demos
          </Link>
        </div>

        <ResultsDashboard 
          analysisResults={demoData}
          formData={{
            company_name: demoData.company_name,
            industry: demoData.industry
          }}
        />

        <div className="mt-12 bg-slate-900/50 border border-teal-500/20 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready for Your Custom Analysis?</h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            This demo shows what's possible. Get a tailored AI discovery analysis for your company.
          </p>
          <Link 
            href="/#services"
            className="inline-block bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 rounded-lg font-semibold transition-all"
          >
            View Services & Pricing
          </Link>
        </div>
      </div>
    </div>
  )
}