// src/app/reflexion-itil/docs/page.js
'use client'

import Link from 'next/link'
import UniversalHeader from '@/components/UniversalHeader'
import UnifiedFooter from '@/components/UnifiedFooter'
import { Book, Shield, BarChart3, TrendingUp, AlertTriangle, Target, CheckCircle, Activity, Clock, Users, Zap, ArrowRight, Play, FileText, RefreshCw } from 'lucide-react'

// Reflexion ITIL Footer Configuration
const reflexionFooterConfig = {
  name: "Reflexion ITIL",
  icon: RefreshCw,
  tagline: "Reflexion-based AI using Llama 3.2 3B that iteratively analyzes, critiques, and perfects your change requests.",
  color: "purple",
  trademark: "Reflexion ITIL",
  subtitle: "Self-improving AI. ITIL compliance. 5-10 minute analysis.",
  links: {
    product: [
      { label: "Overview", href: "/reflexion-itil" },
      { label: "Features", href: "/reflexion-itil#features" },
      { label: "How It Works", href: "/reflexion-itil#how-it-works" },
      { label: "Live Demo", href: "/reflexion-itil/demo" }
    ],
    resources: [
      { label: "Documentation", href: "/reflexion-itil/docs" },
      { label: "Sample RFCs", href: "/reflexion-itil/demo#samples" },
      { label: "Use Cases", href: "/reflexion-itil#use-cases" },
      { label: "Screenshots", href: "/reflexion-itil#screenshots" }
    ],
    company: [
      { label: "About VuduVations", href: "/" },
      { label: "Contact Sales", href: "#contact" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" }
    ]
  }
};

export default function ReflexionITILDocs() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <UniversalHeader />
      <div className="p-6 pt-24">
        <div className="max-w-4xl mx-auto">
        
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link 
            href="/reflexion-itil"
            className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors mb-6"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Reflexion ITIL
          </Link>
          
          <div className="flex items-center gap-3 mb-2">
            <Book className="w-10 h-10 text-purple-400" />
            <h1 className="text-4xl font-bold">Understanding Reflexion ITIL</h1>
          </div>
          <p className="text-xl text-slate-200">
            Learn how the iterative AI refinement system evaluates and improves RFC quality
          </p>
        </div>

        {/* Quick Overview */}
        <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-xl p-8 border border-purple-400/30 mb-8">
          <h2 className="text-2xl font-bold mb-4">What is Reflexion ITIL?</h2>
          <p className="text-white text-lg mb-4">
            Reflexion ITIL is a <strong>self-improving RFC analysis system</strong> that uses iterative AI refinement to progressively enhance documentation quality through three cycles of analysis, critique, and improvement.
          </p>
          <div className="grid md:grid-cols-2 gap-4 mt-6">
            <div className="bg-black/30 p-4 rounded-lg flex items-start gap-3">
              <Activity className="w-6 h-6 text-pink-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-pink-400 mb-1">Iterative Refinement</h3>
                <p className="text-sm text-slate-200">3 cycles of analysis → critique → improvement</p>
              </div>
            </div>
            <div className="bg-black/30 p-4 rounded-lg flex items-start gap-3">
              <BarChart3 className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-purple-400 mb-1">Quality Scoring</h3>
                <p className="text-sm text-slate-200">6 dimensions scored 0-10 with progressive improvement</p>
              </div>
            </div>
            <div className="bg-black/30 p-4 rounded-lg flex items-start gap-3">
              <Shield className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-cyan-400 mb-1">ITIL Compliance</h3>
                <p className="text-sm text-slate-200">Full alignment with ITIL change management standards</p>
              </div>
            </div>
            <div className="bg-black/30 p-4 rounded-lg flex items-start gap-3">
              <Target className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-emerald-400 mb-1">CAB-Ready Output</h3>
                <p className="text-sm text-slate-200">Production-ready RFCs with approval probability metrics</p>
              </div>
            </div>
          </div>
        </div>

        {/* Understanding the Scores */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <BarChart3 className="w-8 h-8 text-pink-400" />
            Understanding the Quality Scores
          </h2>
          <p className="text-slate-200 mb-6">
            Each RFC is evaluated across <strong>6 key dimensions</strong> using a 0-10 scale. Scores typically improve from 6-8 in Iteration 1 to 9+ in Iteration 3 through reflexive refinement.
          </p>

          {/* Overall Quality */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 mb-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-pink-500/20 rounded-full flex items-center justify-center flex-shrink-0 border-2 border-pink-400">
                <BarChart3 className="w-6 h-6 text-pink-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-3 text-pink-400">Overall Quality</h3>
                <p className="text-slate-200 mb-4">
                  Composite score representing the RFC's completeness, clarity, and readiness for Change Advisory Board (CAB) approval.
                </p>
                
                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  <div className="bg-black/30 p-4 rounded-lg border-l-4 border-red-500">
                    <h4 className="font-bold text-red-400 mb-1">0-6: Needs Work</h4>
                    <p className="text-sm text-slate-200">Critical gaps in documentation, requires significant revision</p>
                  </div>
                  <div className="bg-black/30 p-4 rounded-lg border-l-4 border-yellow-500">
                    <h4 className="font-bold text-yellow-400 mb-1">7-8: Good</h4>
                    <p className="text-sm text-slate-200">Solid foundation, some improvements needed</p>
                  </div>
                  <div className="bg-black/30 p-4 rounded-lg border-l-4 border-emerald-500">
                    <h4 className="font-bold text-emerald-400 mb-1">9-10: Excellent</h4>
                    <p className="text-sm text-slate-200">Production-ready, CAB-approved quality</p>
                  </div>
                </div>

                <div className="bg-pink-500/10 border-l-4 border-pink-400 p-4 rounded">
                  <p className="text-sm text-slate-200">
                    <strong className="text-pink-400">What drives this score:</strong> Completeness of sections, clarity of objectives, quality of testing documentation, rollback plan detail, and risk assessment thoroughness.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ITIL Compliance */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 mb-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0 border-2 border-purple-400">
                <Shield className="w-6 h-6 text-purple-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-3 text-purple-400">ITIL Compliance</h3>
                <p className="text-slate-200 mb-4">
                  Measures adherence to ITIL (Information Technology Infrastructure Library) change management framework standards.
                </p>
                
                <div className="bg-black/30 p-4 rounded-lg mb-4">
                  <h4 className="font-bold text-purple-300 mb-3">ITIL Requirements Checked:</h4>
                  <div className="grid md:grid-cols-2 gap-2">
                    <div className="flex items-center gap-2 text-sm text-slate-200">
                      <CheckCircle className="w-4 h-4 text-purple-400" />
                      Change request documentation
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-200">
                      <CheckCircle className="w-4 h-4 text-purple-400" />
                      Impact assessment
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-200">
                      <CheckCircle className="w-4 h-4 text-purple-400" />
                      Risk analysis & mitigation
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-200">
                      <CheckCircle className="w-4 h-4 text-purple-400" />
                      Testing & validation evidence
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-200">
                      <CheckCircle className="w-4 h-4 text-purple-400" />
                      Rollback procedures
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-200">
                      <CheckCircle className="w-4 h-4 text-purple-400" />
                      Communication plan
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-200">
                      <CheckCircle className="w-4 h-4 text-purple-400" />
                      CI/CMDB documentation
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-200">
                      <CheckCircle className="w-4 h-4 text-purple-400" />
                      Stakeholder approvals
                    </div>
                  </div>
                </div>

                <div className="bg-purple-500/10 border-l-4 border-purple-400 p-4 rounded">
                  <p className="text-sm text-slate-200">
                    <strong className="text-purple-400">Target:</strong> Score 9.0+ for Iteration 3 indicates full ITIL compliance and CAB readiness.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Risk Level */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 mb-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0 border-2 border-red-400">
                <AlertTriangle className="w-6 h-6 text-red-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-3 text-red-400">Risk Level</h3>
                <p className="text-slate-200 mb-4">
                  Assessment of deployment risk based on scope, complexity, and potential business impact. <strong>Lower scores are better.</strong>
                </p>
                
                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  <div className="bg-black/30 p-4 rounded-lg border-l-4 border-emerald-500">
                    <h4 className="font-bold text-emerald-400 mb-1">0-3: Low Risk</h4>
                    <p className="text-sm text-slate-200">Well-tested, clear rollback, minimal impact</p>
                  </div>
                  <div className="bg-black/30 p-4 rounded-lg border-l-4 border-yellow-500">
                    <h4 className="font-bold text-yellow-400 mb-1">4-6: Medium Risk</h4>
                    <p className="text-sm text-slate-200">Some concerns, requires careful monitoring</p>
                  </div>
                  <div className="bg-black/30 p-4 rounded-lg border-l-4 border-red-500">
                    <h4 className="font-bold text-red-400 mb-1">7-10: High Risk</h4>
                    <p className="text-sm text-slate-200">Significant concerns, needs mitigation plans</p>
                  </div>
                </div>

                <div className="bg-red-500/10 border-l-4 border-red-400 p-4 rounded">
                  <p className="text-sm text-slate-200">
                    <strong className="text-red-400">Reflexion Impact:</strong> Risk scores typically decrease 30-50% from Iteration 1 to 3 as mitigation plans are strengthened.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Business Value */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 mb-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 border-2 border-green-400">
                <Target className="w-6 h-6 text-green-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-3 text-green-400">Business Value</h3>
                <p className="text-slate-200 mb-4">
                  Assessment of the RFC's strategic importance, ROI potential, and alignment with business objectives.
                </p>
                
                <div className="bg-black/30 p-4 rounded-lg mb-4">
                  <h4 className="font-bold text-green-300 mb-3">Factors Evaluated:</h4>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2 text-sm text-slate-200">
                      <div className="w-1 h-1 bg-green-400 rounded-full mt-2" />
                      <span><strong>Financial Impact:</strong> Cost savings, revenue generation, or efficiency gains</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm text-slate-200">
                      <div className="w-1 h-1 bg-green-400 rounded-full mt-2" />
                      <span><strong>Strategic Alignment:</strong> Supports company goals and initiatives</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm text-slate-200">
                      <div className="w-1 h-1 bg-green-400 rounded-full mt-2" />
                      <span><strong>Customer Impact:</strong> Improves user experience or service quality</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm text-slate-200">
                      <div className="w-1 h-1 bg-green-400 rounded-full mt-2" />
                      <span><strong>Competitive Advantage:</strong> Differentiates from competitors</span>
                    </div>
                  </div>
                </div>

                <div className="bg-green-500/10 border-l-4 border-green-400 p-4 rounded">
                  <p className="text-sm text-slate-200">
                    <strong className="text-green-400">High-Value RFCs:</strong> Score 9.0+ indicates clear business justification with quantified benefits and executive support.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Technical Readiness */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 mb-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0 border-2 border-purple-400">
                <Zap className="w-6 h-6 text-purple-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-3 text-purple-400">Technical Readiness</h3>
                <p className="text-slate-200 mb-4">
                  Measures the maturity of technical implementation, testing coverage, and infrastructure preparedness.
                </p>
                
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-black/30 p-4 rounded-lg">
                    <h4 className="font-bold text-purple-300 mb-2 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Testing Coverage
                    </h4>
                    <p className="text-sm text-slate-200">Unit, integration, performance, and load testing completed</p>
                  </div>
                  <div className="bg-black/30 p-4 rounded-lg">
                    <h4 className="font-bold text-purple-300 mb-2 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Documentation
                    </h4>
                    <p className="text-sm text-slate-200">Technical specs, deployment guides, runbooks prepared</p>
                  </div>
                  <div className="bg-black/30 p-4 rounded-lg">
                    <h4 className="font-bold text-purple-300 mb-2 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Environment Prep
                    </h4>
                    <p className="text-sm text-slate-200">Infrastructure provisioned, dependencies configured</p>
                  </div>
                  <div className="bg-black/30 p-4 rounded-lg">
                    <h4 className="font-bold text-purple-300 mb-2 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Rollback Plan
                    </h4>
                    <p className="text-sm text-slate-200">Tested procedures to revert changes if needed</p>
                  </div>
                </div>

                <div className="bg-purple-500/10 border-l-4 border-purple-400 p-4 rounded">
                  <p className="text-sm text-slate-200">
                    <strong className="text-purple-400">Production Ready:</strong> Score 9.0+ indicates all technical prerequisites met and team prepared for deployment.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Stakeholder Confidence */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 mb-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-pink-500/20 rounded-full flex items-center justify-center flex-shrink-0 border-2 border-pink-400">
                <Users className="w-6 h-6 text-pink-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-3 text-pink-400">Stakeholder Confidence</h3>
                <p className="text-slate-200 mb-4">
                  Reflects communication quality, stakeholder alignment, and perceived likelihood of successful deployment.
                </p>
                
                <div className="bg-black/30 p-4 rounded-lg mb-4">
                  <h4 className="font-bold text-pink-300 mb-3">Building Confidence:</h4>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-pink-500/20 rounded flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-bold text-pink-400">1</span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-pink-300 mb-1">Clear Communication</p>
                        <p className="text-sm text-slate-200">Executive summary, stakeholder matrix, communication plan</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-pink-500/20 rounded flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-bold text-pink-400">2</span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-pink-300 mb-1">Risk Transparency</p>
                        <p className="text-sm text-slate-200">Honest assessment of risks with concrete mitigation plans</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-pink-500/20 rounded flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-bold text-pink-400">3</span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-pink-300 mb-1">Track Record</p>
                        <p className="text-sm text-slate-200">Evidence of similar successful changes, lessons learned applied</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-pink-500/10 border-l-4 border-pink-400 p-4 rounded">
                  <p className="text-sm text-slate-200">
                    <strong className="text-pink-400">High Confidence:</strong> Score 8.5+ indicates strong stakeholder buy-in and CAB approval likelihood above 85%.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Change Categories */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <Shield className="w-8 h-8 text-cyan-400" />
            Change Categories Assessment
          </h2>
          <p className="text-slate-200 mb-6">
            Beyond the 6 quality scores, each RFC is evaluated across <strong>4 ITIL change management categories</strong> to ensure comprehensive compliance.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Technical */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-purple-400/30">
              <h3 className="text-xl font-bold mb-3 text-purple-400 flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Technical
              </h3>
              <p className="text-slate-200 mb-4 text-sm">
                Implementation details, architecture decisions, technology choices, and technical feasibility.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-slate-200">
                  <div className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
                  Architecture documentation
                </div>
                <div className="flex items-center gap-2 text-slate-200">
                  <div className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
                  Technical dependencies mapped
                </div>
                <div className="flex items-center gap-2 text-slate-200">
                  <div className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
                  Performance impact assessed
                </div>
              </div>
            </div>

            {/* Procedural */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-pink-400/30">
              <h3 className="text-xl font-bold mb-3 text-pink-400 flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Procedural
              </h3>
              <p className="text-slate-200 mb-4 text-sm">
                Process adherence, approval workflows, change control procedures, and governance compliance.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-slate-200">
                  <div className="w-1.5 h-1.5 bg-pink-400 rounded-full" />
                  Change control followed
                </div>
                <div className="flex items-center gap-2 text-slate-200">
                  <div className="w-1.5 h-1.5 bg-pink-400 rounded-full" />
                  Approval signatures obtained
                </div>
                <div className="flex items-center gap-2 text-slate-200">
                  <div className="w-1.5 h-1.5 bg-pink-400 rounded-full" />
                  CAB presentation prepared
                </div>
              </div>
            </div>

            {/* Compliance */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-cyan-400/30">
              <h3 className="text-xl font-bold mb-3 text-cyan-400 flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Compliance
              </h3>
              <p className="text-slate-200 mb-4 text-sm">
                Regulatory requirements, security standards, audit trails, and policy adherence.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-slate-200">
                  <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                  Security review completed
                </div>
                <div className="flex items-center gap-2 text-slate-200">
                  <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                  Compliance checklist verified
                </div>
                <div className="flex items-center gap-2 text-slate-200">
                  <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                  Audit trail documented
                </div>
              </div>
            </div>

            {/* Communication */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-emerald-400/30">
              <h3 className="text-xl font-bold mb-3 text-emerald-400 flex items-center gap-2">
                <Users className="w-5 h-5" />
                Communication
              </h3>
              <p className="text-slate-200 mb-4 text-sm">
                Stakeholder engagement, notification plans, training materials, and documentation quality.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-slate-200">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                  Stakeholder matrix defined
                </div>
                <div className="flex items-center gap-2 text-slate-200">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                  Communication plan ready
                </div>
                <div className="flex items-center gap-2 text-slate-200">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                  Training completed
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-lg p-6 border border-purple-400/30">
            <p className="text-slate-200">
              <strong className="text-purple-400">Scoring:</strong> Each category is scored 0-10, with <span className="text-purple-300 font-semibold">EXCELLENT (9.0+)</span>, <span className="text-pink-300 font-semibold">GOOD (7.0-8.9)</span>, or needs work (&lt;7.0). Iteration 3 typically achieves EXCELLENT across all categories.
            </p>
          </div>
        </div>

        {/* CAB Approval Probability */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <Target className="w-8 h-8 text-emerald-400" />
            CAB Approval Probability
          </h2>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 mb-6">
            <p className="text-slate-200 mb-6">
              The <strong className="text-emerald-400">Change Advisory Board (CAB) Approval Probability</strong> is calculated based on all quality dimensions and represents the likelihood of RFC approval on first submission.
            </p>

            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="bg-gradient-to-br from-red-900/30 to-red-900/20 p-5 rounded-lg border border-red-400/30">
                <div className="text-3xl font-bold text-red-400 mb-2">&lt;70%</div>
                <div className="font-semibold text-red-300 mb-2">Low Probability</div>
                <p className="text-sm text-slate-200">Significant improvements needed. RFC likely to be rejected or deferred for revision.</p>
              </div>

              <div className="bg-gradient-to-br from-yellow-900/30 to-yellow-900/20 p-5 rounded-lg border border-yellow-400/30">
                <div className="text-3xl font-bold text-yellow-400 mb-2">70-85%</div>
                <div className="font-semibold text-yellow-300 mb-2">Medium Probability</div>
                <p className="text-sm text-slate-200">Good foundation. Minor clarifications or additional testing may be requested.</p>
              </div>

              <div className="bg-gradient-to-br from-emerald-900/30 to-emerald-900/20 p-5 rounded-lg border border-emerald-400/30">
                <div className="text-3xl font-bold text-emerald-400 mb-2">86%+</div>
                <div className="font-semibold text-emerald-300 mb-2">High Probability</div>
                <p className="text-sm text-slate-200">Excellent quality. Very likely to be approved, ready for production deployment.</p>
              </div>
            </div>

            <div className="bg-emerald-500/10 border-l-4 border-emerald-400 p-4 rounded">
              <p className="text-sm text-slate-200">
                <strong className="text-emerald-400">Typical Progression:</strong> CAB approval probability improves substantially across iterations, with Iteration 3 typically showing high approval readiness.
              </p>
            </div>
          </div>
        </div>

        {/* The Reflexion Process */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <Activity className="w-8 h-8 text-pink-400" />
            How Reflexion Works
          </h2>

          <div className="space-y-6">
            {/* Iteration 1 */}
            <div className="bg-gradient-to-br from-slate-800/50 via-slate-900/50 to-purple-900/30 rounded-xl p-6 border border-purple-400/20">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-pink-500/20 rounded-full flex items-center justify-center flex-shrink-0 border-2 border-pink-400">
                  <span className="text-2xl font-bold text-pink-400">1</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-3">Iteration 1: Initial Analysis</h3>
                  <p className="text-slate-200 mb-4">
                    The system performs a comprehensive first-pass analysis of your RFC, scoring all dimensions and identifying critical gaps.
                  </p>
                  
                  <div className="bg-black/30 p-4 rounded-lg mb-4">
                    <h4 className="font-bold text-pink-300 mb-2">Typical Findings:</h4>
                    <div className="space-y-1 text-sm text-slate-200">
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                        <span>5-10 critical issues identified requiring immediate attention</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                        <span>Missing or incomplete sections flagged</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                        <span>Gaps in testing documentation or rollback procedures</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm">
                    <div className="bg-pink-500/20 px-3 py-1 rounded-full">
                      <span className="text-pink-300 font-semibold">Quality: 6.8-7.8 / 10</span>
                    </div>
                    <div className="bg-yellow-500/20 px-3 py-1 rounded-full">
                      <span className="text-yellow-300 font-semibold">CAB Probability: 70-75%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Iteration 2 */}
            <div className="bg-gradient-to-br from-slate-800/50 via-slate-900/50 to-purple-900/30 rounded-xl p-6 border border-purple-400/20">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0 border-2 border-purple-400">
                  <span className="text-2xl font-bold text-purple-400">2</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-3">Iteration 2: Refinement</h3>
                  <p className="text-slate-200 mb-4">
                    After addressing Iteration 1 issues, the evaluation step re-analyzes the RFC, identifying remaining gaps and suggesting deeper improvements.
                  </p>
                  
                  <div className="bg-black/30 p-4 rounded-lg mb-4">
                    <h4 className="font-bold text-purple-300 mb-2">Refinement Focus:</h4>
                    <div className="space-y-1 text-sm text-slate-200">
                      <div className="flex items-start gap-2">
                        <TrendingUp className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                        <span>Critical issues resolved, 2-5 medium priority improvements suggested</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <TrendingUp className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                        <span>Enhanced rollback procedures and testing evidence</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <TrendingUp className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                        <span>Improved stakeholder communication and business justification</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm">
                    <div className="bg-purple-500/20 px-3 py-1 rounded-full">
                      <span className="text-purple-300 font-semibold">Quality: 8.1-8.7 / 10</span>
                    </div>
                    <div className="bg-emerald-500/20 px-3 py-1 rounded-full">
                      <span className="text-emerald-300 font-semibold">CAB Probability: 82-87%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Iteration 3 */}
            <div className="bg-gradient-to-br from-emerald-900/20 via-emerald-900/20 to-green-900/20 rounded-xl p-6 border border-emerald-400/40">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center flex-shrink-0 border-2 border-emerald-400">
                  <CheckCircle className="w-6 h-6 text-emerald-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-3 text-emerald-400">Iteration 3: Production Ready</h3>
                  <p className="text-slate-200 mb-4">
                    Final validation ensures all requirements are met. The RFC is now CAB-approved quality with comprehensive documentation and minimal outstanding concerns.
                  </p>
                  
                  <div className="bg-black/30 p-4 rounded-lg mb-4">
                    <h4 className="font-bold text-emerald-300 mb-2">Production Readiness:</h4>
                    <div className="grid md:grid-cols-2 gap-2 text-sm text-slate-200">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                        <span>All critical issues resolved</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                        <span>ITIL compliance verified</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                        <span>Testing complete and documented</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                        <span>Rollback plan tested</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                        <span>Stakeholder approvals obtained</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                        <span>Executive summary ready</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm">
                    <div className="bg-emerald-500/20 px-3 py-1 rounded-full">
                      <span className="text-emerald-300 font-semibold">Quality: 9.0-9.3 / 10</span>
                    </div>
                    <div className="bg-green-500/20 px-3 py-1 rounded-full">
                      <span className="text-green-300 font-semibold">High Approval Probability</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-lg p-6 border border-purple-400/30">
            <div className="flex items-start gap-3">
              <Clock className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-purple-300 mb-2">Processing Time</h4>
                <p className="text-slate-200 text-sm">
                  The complete reflexion cycle takes approximately <strong className="text-purple-300">5-10 minutes</strong> to process all three iterations, delivering a production-ready RFC that would traditionally require hours of manual review and revision.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Common Questions */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Common Questions</h2>
          
          <div className="space-y-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-bold mb-3 text-purple-400">Why three iterations?</h3>
              <p className="text-slate-200">
                Three iterations provide the optimal balance between quality improvement and processing time. Research shows diminishing returns after the third iteration, with most RFCs achieving 9.0+ quality scores by Iteration 3.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-bold mb-3 text-pink-400">Can I skip iterations if my RFC is already good?</h3>
              <p className="text-slate-200">
                The reflexion process always runs all three iterations. Even well-written RFCs benefit from the critique phase, often identifying subtle improvements in risk mitigation, stakeholder communication, or ITIL compliance that aren't immediately obvious.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-bold mb-3 text-cyan-400">What if my RFC doesn't reach 9.0+ by Iteration 3?</h3>
              <p className="text-slate-200 mb-3">
                This indicates significant fundamental issues that require manual attention. The system will flag specific areas needing work:
              </p>
              <ul className="space-y-1 text-sm text-slate-200">
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-cyan-400 rounded-full mt-2" />
                  <span>Insufficient testing documentation</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-cyan-400 rounded-full mt-2" />
                  <span>Unclear business justification or ROI</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-cyan-400 rounded-full mt-2" />
                  <span>Missing critical ITIL requirements</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-cyan-400 rounded-full mt-2" />
                  <span>Incomplete rollback procedures</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-bold mb-3 text-emerald-400">How accurate is the CAB Approval Probability?</h3>
              <p className="text-slate-200">
                The CAB approval probability is calculated based on all six quality dimensions and ITIL compliance checks. RFCs scoring 9.0+ across dimensions typically indicate high approval readiness. As you use the system, the probability calibration can be refined based on your organization's actual CAB outcomes, creating a feedback loop that improves prediction accuracy over time.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-bold mb-3 text-yellow-400">What AI models power Reflexion ITIL?</h3>
              <p className="text-slate-200 mb-4">
                Reflexion ITIL is powered by <strong className="text-yellow-300">Llama 3.2 3B</strong>, Meta's state-of-the-art open-source language model with 3 billion parameters. We use local inference rather than API calls, which provides three key advantages:
              </p>
              <div className="space-y-2 text-sm text-slate-200 mb-4">
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2" />
                  <span><strong>Zero Cost:</strong> $0 per RFC analysis (vs $0.15-0.30 for API-based tools)</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2" />
                  <span><strong>Complete Privacy:</strong> Your RFC data never leaves your infrastructure</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2" />
                  <span><strong>No Rate Limits:</strong> Process unlimited RFCs without API quotas</span>
                </div>
              </div>
              <p className="text-slate-200 text-sm">
                The system implements the Reflexion pattern through three sequential steps: Actor (generates RFC), Evaluator (critiques output), and Self-Reflection (suggests improvements). This iterative approach achieves 9.0+ quality scores while maintaining complete data privacy and zero ongoing costs.
              </p>
            </div>
          </div>
        </div>

        {/* What's Next */}
        <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-xl p-8 border border-purple-400/30 mb-8">
          <h2 className="text-3xl font-bold mb-6">Ready to Try Reflexion ITIL?</h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            <Link 
              href="/reflexion-itil/demo"
              className="bg-gradient-to-br from-pink-600/20 to-purple-600/20 p-5 rounded-lg border-2 border-pink-400/50 hover:border-pink-400 transition-all group"
            >
              <div className="flex items-center gap-3 mb-2">
                <Play className="w-6 h-6 text-pink-400" />
                <h3 className="text-lg font-bold text-pink-400">Run a Demo</h3>
              </div>
              <p className="text-sm text-slate-200">Try one of our 3 sample RFC scenarios and watch quality improve across iterations.</p>
              <div className="flex items-center gap-2 text-pink-400 text-sm font-semibold mt-3">
                Start Demo <ArrowRight className="w-4 h-4" />
              </div>
            </Link>

            <Link 
              href="/reflexion-itil/demo"
              className="bg-white/10 p-5 rounded-lg border border-white/20 hover:border-purple-400/50 transition-all group"
            >
              <div className="flex items-center gap-3 mb-2">
                <FileText className="w-6 h-6 text-purple-400" />
                <h3 className="text-lg font-bold group-hover:text-purple-400 transition-colors">Upload Your RFC</h3>
              </div>
              <p className="text-sm text-slate-200">Get a full reflexion analysis of your own RFC documentation.</p>
              <div className="flex items-center gap-2 text-purple-400 text-sm font-semibold mt-3">
                Go to Demo <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          </div>
        </div>
        </div> 
      </div>
      
      {/* Unified Footer with Reflexion ITIL branding */}
      <UnifiedFooter productBranding={reflexionFooterConfig} />
    </div> 
  )
}