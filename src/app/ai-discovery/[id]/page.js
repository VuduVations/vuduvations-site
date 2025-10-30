// src/app/ai-discovery/[id]/page.js
'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import UniversalHeader from '@/components/UniversalHeader'
import UnifiedFooter from '@/components/UnifiedFooter'
import ResultsDashboard from '@/components/ResultsDashboard'
import ContactModal from '@/components/ContactModal'
import RiskMatrix from '@/components/RiskMatrix'
import ReadinessAssessment from '@/components/ReadinessAssessment'
import RoadmapSection from '@/components/RoadmapSection'
import { Brain, Target, TrendingUp, BarChart3, ArrowLeft, Download, Shield, Calendar, Award } from 'lucide-react'

// AI Discovery Footer Configuration
const aiDiscoveryFooterConfig = {
  name: "AI Discovery Platform",
  icon: Brain,
  tagline: "Strategic AI readiness assessments from F500 consulting methodology. Know what's possible before you build.",
  color: "emerald",
  trademark: "AI Discovery Platform",
  subtitle: "6-agent intelligence. Executive-ready insights. Implementation roadmaps.",
  links: {
    product: [
      { label: "Overview", href: "/ai-discovery" },
      { label: "Features", href: "/ai-discovery#features" },
      { label: "How It Works", href: "/ai-discovery#how-it-works" },
      { label: "Industry Demos", href: "/ai-discovery/demos" }
    ],
    resources: [
      { label: "Documentation", href: "/ai-discovery/docs" },
      { label: "Sample Reports", href: "/ai-discovery/demos" },
      { label: "Use Cases", href: "/ai-discovery#use-cases" },
      { label: "ROI Calculator", href: "/ai-discovery#roi" }
    ],
    company: [
      { label: "About VuduVations", href: "/" },
      { label: "Contact Sales", href: "#contact" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" }
    ]
  }
};

export default function DemoPage() {
  const params = useParams()
  const [demoData, setDemoData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')

  const aiDiscoveryBenefits = [
    { 
      text: "Complete multi-dimensional AI readiness assessment across your organization",
      icon: <Target className="w-5 h-5 text-emerald-400" />
    },
    { 
      text: "Executive-ready ROI projections and use case mapping with competitive positioning",
      icon: <TrendingUp className="w-5 h-5 text-emerald-400" />
    },
    { 
      text: "Strategic roadmap with implementation priorities and resource requirements",
      icon: <BarChart3 className="w-5 h-5 text-emerald-400" />
    },
    { 
      text: "Industry-specific insights from F500 consulting best practices",
      icon: <Brain className="w-5 h-5 text-emerald-400" />
    }
  ]

  useEffect(() => {
    async function loadDemo() {
      if (!params.id) {
        console.error('❌ No demo ID in URL params')
        setLoading(false)
        return
      }

      const url = `/data/demos/${params.id}.json`
      console.log('🔍 Fetching demo from:', url)

      try {
        const response = await fetch(url)
        console.log('📊 Response status:', response.status)
        console.log('📊 Content-Type:', response.headers.get('content-type'))

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        console.log('✅ Demo data loaded:', data.company_name)
        setDemoData(data)
      } catch (error) {
        console.error('❌ Error loading demo:', error)
        console.error('❌ Full error:', error.message)
      } finally {
        setLoading(false)
      }
    }
    loadDemo()
  }, [params.id])

  // Transform demo data to match ResultsDashboard expected format
  const getTransformedAnalysisResults = () => {
    if (!demoData) return null;
    
    return {
      // Transform use_cases to top_use_cases
      top_use_cases: demoData.use_cases || demoData.top_use_cases || [],
      
      // Keep all other fields
      executive_summary: demoData.executive_summary?.summary || demoData.executive_summary || '',
      implementation_roadmap: demoData.implementation_roadmap || [],
      next_steps: demoData.next_steps || [],
      analysis_date: demoData.analysis_date || new Date().toISOString().split('T')[0],
      
      // Financial summary
      financial_summary: {
        total_investment: demoData.executive_summary?.total_investment || 0,
        total_annual_savings: demoData.executive_summary?.total_annual_savings || 0,
        average_roi: demoData.executive_summary?.average_roi || 0,
        total_use_cases: demoData.executive_summary?.total_use_cases || demoData.use_cases?.length || 0
      },
      
      // Metadata
      metadata: demoData.metadata || {
        analysis_duration_seconds: 0,
        model: 'GPT-4o',
        framework: 'Crewai'
      }
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 text-white">
        <UniversalHeader />
        <div className="flex items-center justify-center min-h-[60vh] pt-24">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mb-4"></div>
            <h1 className="text-2xl font-bold">Loading Analysis...</h1>
          </div>
        </div>
      </div>
    )
  }

  if (!demoData) {
    return (
      <div className="min-h-screen bg-slate-900 text-white">
        <UniversalHeader />
        <div className="flex items-center justify-center min-h-[60vh] pt-24">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Demo Not Found</h1>
            <p className="text-slate-400 mb-6">The requested analysis could not be found.</p>
            <Link 
              href="/ai-discovery/demos" 
              className="text-emerald-400 hover:text-emerald-300 font-semibold"
            >
              Back to All Demos
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <UniversalHeader />
      
      <div className="max-w-7xl mx-auto p-6 pt-24">
        {/* Back Link */}
        <div className="mb-6">
          <Link 
            href="/ai-discovery/demos" 
            className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to All Demos
          </Link>
        </div>

        {/* Company Header */}
        <div className="mb-6 bg-gradient-to-r from-slate-800 to-slate-900 border-2 border-emerald-500 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">{demoData.company_name}</h1>
              <p className="text-slate-400 mt-1">{demoData.industry}</p>
              {demoData.revenue && (
                <p className="text-sm text-slate-500 mt-1">{demoData.revenue}</p>
              )}
            </div>
            <button 
              onClick={() => window.print()}
              className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-lg transition-all shadow-lg border border-slate-600"
            >
              <Download className="w-5 h-5" />
              <span className="font-semibold">Export PDF</span>
            </button>
          </div>
          
          {/* Quick Stats */}
          {demoData.executive_summary && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="bg-slate-900/50 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-emerald-400">
                  {demoData.use_cases?.length || 0}
                </div>
                <div className="text-xs text-slate-400 mt-1">Use Cases</div>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-green-400">
                  {typeof demoData.executive_summary === 'object' 
                    ? (demoData.executive_summary.average_roi || 'TBD')
                    : 'TBD'
                  }%
                </div>
                <div className="text-xs text-slate-400 mt-1">Avg ROI</div>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-red-400">
                  ${typeof demoData.executive_summary === 'object'
                    ? ((demoData.executive_summary.total_investment || 0) / 1000000).toFixed(1)
                    : '0.0'
                  }M
                </div>
                <div className="text-xs text-slate-400 mt-1">Investment</div>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-teal-400">
                  ${typeof demoData.executive_summary === 'object'
                    ? ((demoData.executive_summary.total_annual_savings || 0) / 1000000).toFixed(1)
                    : '0.0'
                  }M
                </div>
                <div className="text-xs text-slate-400 mt-1">Annual Savings</div>
              </div>
            </div>
          )}
        </div>

        {/* Tab Navigation */}
        <div className="mb-8 bg-slate-800/50 border border-slate-700 rounded-xl p-2">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex-1 min-w-[120px] flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold transition-all ${
                activeTab === 'overview'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg'
                  : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
              }`}
            >
              <Brain className="w-4 h-4" />
              <span className="hidden md:inline">Executive Summary</span>
              <span className="md:hidden">Summary</span>
            </button>
            
            {demoData.readiness_assessment && (
              <button
                onClick={() => setActiveTab('readiness')}
                className={`flex-1 min-w-[120px] flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold transition-all ${
                  activeTab === 'readiness'
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg'
                    : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                }`}
              >
                <Award className="w-4 h-4" />
                <span className="hidden md:inline">Readiness</span>
              </button>
            )}
            
            <button
              onClick={() => setActiveTab('use_cases')}
              className={`flex-1 min-w-[120px] flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold transition-all ${
                activeTab === 'use_cases'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg'
                  : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
              }`}
            >
              <Target className="w-4 h-4" />
              <span className="hidden md:inline">Use Cases</span>
            </button>
            
            {demoData.risk_matrix && (
              <button
                onClick={() => setActiveTab('risks')}
                className={`flex-1 min-w-[120px] flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold transition-all ${
                  activeTab === 'risks'
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg'
                    : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                }`}
              >
                <Shield className="w-4 h-4" />
                <span className="hidden md:inline">Risk Matrix</span>
                <span className="md:hidden">Risks</span>
              </button>
            )}
            
            {demoData.implementation_roadmap && (
              <button
                onClick={() => setActiveTab('roadmap')}
                className={`flex-1 min-w-[120px] flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold transition-all ${
                  activeTab === 'roadmap'
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg'
                    : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span className="hidden md:inline">Implementation</span>
                <span className="md:hidden">Roadmap</span>
              </button>
            )}
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-8">
          {activeTab === 'overview' && (
            <section className="space-y-6">
              <div className="bg-gradient-to-br from-emerald-900/40 to-teal-900/40 border-2 border-emerald-500 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-4">Executive Summary</h2>
                <p className="text-slate-300 leading-relaxed">
                  {typeof demoData.executive_summary === 'string' 
                    ? demoData.executive_summary
                    : demoData.executive_summary?.summary || 
                      `Comprehensive AI discovery analysis for ${demoData.company_name} identifying ${demoData.use_cases?.length || 0} high-impact use cases.`
                  }
                </p>
              </div>
            </section>
          )}

          {activeTab === 'readiness' && demoData.readiness_assessment && (
            <section>
              <ReadinessAssessment readinessData={demoData.readiness_assessment} />
            </section>
          )}

          {activeTab === 'use_cases' && (
            <section>
              <ResultsDashboard 
                analysisResults={getTransformedAnalysisResults()}
                formData={{
                  company_name: demoData.company_name,
                  industry: demoData.industry
                }}
              />
            </section>
          )}

          {activeTab === 'risks' && demoData.risk_matrix && (
            <section>
              <RiskMatrix 
                riskData={demoData.risk_matrix}
                useCases={demoData.use_cases}
              />
            </section>
          )}

          {activeTab === 'roadmap' && demoData.implementation_roadmap && (
            <section>
              <RoadmapSection roadmapData={demoData.implementation_roadmap} />
            </section>
          )}
        </div>

        {/* CTA Section */}
        <div className="mt-12 rounded-2xl border-2 border-emerald-500 bg-gradient-to-br from-emerald-900/40 to-teal-900/40 shadow-xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-4 text-white">Ready for Your Custom Analysis?</h2>
          <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
            This demo showcases our complete AI Discovery capabilities. Get a tailored analysis for your company's specific challenges and opportunities.
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center justify-center rounded-lg text-sm font-semibold transition-all bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white h-11 px-8 shadow-lg hover:shadow-emerald-500/50"
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

      {/* Unified Footer */}
      <UnifiedFooter productBranding={aiDiscoveryFooterConfig} />
    </div>
  )
}