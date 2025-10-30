// src/app/reflexion-itil/landing/page.js

'use client'
import UniversalHeader from '@/components/UniversalHeader';
import UnifiedFooter from '@/components/UnifiedFooter';
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { 
  Activity, Shield, BarChart3, TrendingUp, Sparkles, ArrowRight, 
  Brain, Zap, Award, Clock, AlertTriangle, Users, Target,
  CheckCircle, ExternalLink, Play, Download, FileText, Eye,
  RefreshCw, GitBranch, Layers, Server, DollarSign, TrendingDown
} from 'lucide-react'

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

export default function ReflexionITILLanding() {
  return (
    <div className="relative min-h-screen bg-slate-900 text-white">
      {/* Universal site-wide header only */}
      <UniversalHeader />
      
      <Hero />
      <ProblemStatement />
      <Solution />
      <HowItWorks />
      <Screenshots />
      <Results />
      <UseCases />
      <CTA />
      
      {/* Unified Footer with Reflexion ITIL branding */}
      <UnifiedFooter productBranding={reflexionFooterConfig} />
    </div>
  )
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0"
        >
          <svg className="h-full w-full" viewBox="0 0 1200 600" preserveAspectRatio="none">
            {[...Array(12)].map((_, i) => (
              <motion.circle
                key={i}
                cx={600}
                cy={300}
                r={40 + i * 30}
                stroke="rgba(168, 85, 247, 0.1)"
                strokeWidth={1}
                fill="none"
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 60 + i * 5, repeat: Infinity, ease: "linear" }}
              />
            ))}
          </svg>
        </motion.div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-24 md:py-32 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-purple-500/20 border border-purple-400/30 px-4 py-2 text-sm text-purple-300 mb-6">
            <Sparkles className="h-4 w-4" /> 
            Iterative AI for Change Management
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold tracking-tight mb-6"
        >
          RFCs That{' '}
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Write Themselves
          </span>
          <br />
          And Get Better Over Time
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 mx-auto max-w-3xl text-xl text-slate-300 leading-relaxed"
        >
          Self-improving AI powered by Llama 3.2 3B that analyzes your RFCs through 3 iterations, automatically finding gaps, 
          suggesting improvements, and achieving 9.0+ quality scores. <strong className="text-white">5-10 minutes</strong> from draft to CAB-ready.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-wrap justify-center items-center gap-4"
        >
          <Link 
            href="/reflexion-itil/demo"
            className="inline-flex items-center justify-center bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-lg font-semibold transition-all text-lg shadow-lg"
          >
            Try Live Demo
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
          <Link 
            href="#screenshots"
            className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-4 rounded-lg font-semibold transition-all text-lg"
          >
            See Screenshots
            <Eye className="ml-2 h-5 w-5" />
          </Link>
          <Link 
            href="/reflexion-itil/docs"
            className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-4 rounded-lg font-semibold transition-all text-lg"
          >
            View Docs
            <FileText className="ml-2 h-5 w-5" />
          </Link>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 flex flex-wrap justify-center items-center gap-8 text-sm text-slate-400"
        >
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
            <span>6.8 → 9.3 Quality Score</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-purple-400" />
            <span>5-10 Minute Analysis</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-cyan-400" />
            <span>High CAB Approval Rate</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function ProblemStatement() {
  const problems = [
    {
      icon: <Clock className="w-8 h-8" />,
      title: "RFC Prep Takes Forever",
      description: "IT teams spend 6-12 hours writing each RFC. Senior engineers waste 30-40% of their time on documentation instead of innovation.",
      stat: "8 hours/RFC"
    },
    {
      icon: <AlertTriangle className="w-8 h-8" />,
      title: "70% Get Rejected or Deferred",
      description: "Missing sections, incomplete testing docs, unclear rollback plans. CAB sends RFCs back for 12-18 revisions before approval.",
      stat: "70% rejection rate"
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: "Change Failures Cost Millions",
      description: "Poor documentation leads to failed deployments. Average cost of a failed change: $500K. Most failures trace back to incomplete RFCs.",
      stat: "$500K per failure"
    }
  ]

  return (
    <section className="mx-auto max-w-7xl px-4 py-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Change Management is Broken
        </h2>
        <p className="text-xl text-slate-400 max-w-3xl mx-auto">
          Your best engineers are burning out on paperwork. Your CAB is drowning in low-quality RFCs. 
          And production keeps breaking because nobody has time to write proper documentation.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {problems.map((problem, idx) => (
          <div key={idx} className="rounded-2xl border border-white/10 bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-red-400 mb-4">{problem.icon}</div>
            <div className="text-3xl font-bold text-red-400 mb-2">{problem.stat}</div>
            <h3 className="text-xl font-semibold mb-3">{problem.title}</h3>
            <p className="text-slate-400">{problem.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <div className="inline-block bg-red-500/10 border border-red-500/30 rounded-lg px-6 py-4">
          <p className="text-slate-300">
            <strong className="text-red-400">The Hidden Cost:</strong> At a 1,000-person company, 
            poor RFCs waste <strong className="text-white">$2.1M annually</strong> in engineering time alone.
          </p>
        </div>
      </div>
    </section>
  )
}

function Solution() {
  const benefits = [
    {
      icon: <Activity className="w-12 h-12 text-pink-400" />,
      title: "Self-Improving AI",
      description: "Reflexion analyzes your RFC, finds gaps, suggests fixes, and re-analyzes automatically. Three iterations in 5-10 minutes.",
      metric: "3 iterations",
      improvement: "6.8 → 9.3 quality"
    },
    {
      icon: <Shield className="w-12 h-12 text-purple-400" />,
      title: "ITIL Compliance Validation",
      description: "Automatically checks all ITIL requirements: risk assessment, testing docs, rollback plans, stakeholder matrix, and more.",
      metric: "Comprehensive validation",
      improvement: "Every requirement checked"
    },
    {
      icon: <TrendingUp className="w-12 h-12 text-emerald-400" />,
      title: "High CAB Approval Rate",
      description: "System predicts approval probability and ensures all critical issues are resolved before submission. Eliminates common rejection reasons.",
      metric: "Optimized for approval",
      improvement: "CAB approval on first try"
    }
  ]

  return (
    <section className="bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Meet Reflexion: The AI That Gets Better at Your RFCs
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Unlike generic AI that gives you one answer, Reflexion <strong className="text-white">critiques its own work</strong>, 
            finds gaps you missed, and iteratively improves until your RFC is production-ready.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, idx) => (
            <div key={idx} className="rounded-2xl border border-white/10 bg-slate-900/50 p-8">
              <div className="mb-4">{benefit.icon}</div>
              <h3 className="text-2xl font-bold mb-3">{benefit.title}</h3>
              <p className="text-slate-400 mb-6">{benefit.description}</p>
              <div className="border-t border-white/10 pt-4">
                <div className="text-3xl font-bold text-emerald-400 mb-1">{benefit.metric}</div>
                <div className="text-sm text-slate-400">{benefit.improvement}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="bg-slate-900/80 rounded-2xl border border-purple-400/30 p-8">
          <h3 className="text-2xl font-bold mb-6 text-center">Why Reflexion Beats Manual RFC Writing</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="pb-4 text-slate-400 font-semibold">Metric</th>
                  <th className="pb-4 text-slate-400 font-semibold">Manual Process</th>
                  <th className="pb-4 text-emerald-400 font-semibold">With Reflexion</th>
                  <th className="pb-4 text-purple-400 font-semibold">Improvement</th>
                </tr>
              </thead>
              <tbody className="text-slate-300">
                <tr className="border-b border-white/5">
                  <td className="py-4 font-medium">Time to CAB-Ready</td>
                  <td className="py-4">6-8 hours</td>
                  <td className="py-4 text-emerald-400 font-semibold">5-10 minutes</td>
                  <td className="py-4 text-purple-400 font-semibold">72x faster</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-4 font-medium">Quality Score</td>
                  <td className="py-4">6.5-7.5 / 10</td>
                  <td className="py-4 text-emerald-400 font-semibold">9.0-9.3 / 10</td>
                  <td className="py-4 text-purple-400 font-semibold">+25% quality</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-4 font-medium">CAB Approval Rate</td>
                  <td className="py-4">60-70%</td>
                  <td className="py-4 text-emerald-400 font-semibold">Optimized for approval</td>
                  <td className="py-4 text-purple-400 font-semibold">Significantly higher</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-4 font-medium">Revisions Needed</td>
                  <td className="py-4">12-18 cycles</td>
                  <td className="py-4 text-emerald-400 font-semibold">0-1 cycles</td>
                  <td className="py-4 text-purple-400 font-semibold">95% reduction</td>
                </tr>
                <tr>
                  <td className="py-4 font-medium">Cost per RFC</td>
                  <td className="py-4">$288 (8hrs × $36/hr)</td>
                  <td className="py-4 text-emerald-400 font-semibold">$0.30</td>
                  <td className="py-4 text-purple-400 font-semibold">960x cheaper</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}

function HowItWorks() {
  const steps = [
    {
      number: 1,
      title: "Upload Your RFC",
      description: "Paste your change request or upload documentation. Works with drafts, incomplete RFCs, or even just bullet points.",
      icon: <FileText className="w-8 h-8" />,
      color: "pink"
    },
    {
      number: 2,
      title: "Iteration 1: Initial Analysis",
      description: "The system analyzes across 6 dimensions, scoring quality and identifying 5-10 critical gaps in documentation, testing, and compliance.",
      icon: <Activity className="w-8 h-8" />,
      color: "purple",
      stats: "Score: 6.8-7.8 / 10"
    },
    {
      number: 3,
      title: "Iteration 2: Self-Critique & Refinement",
      description: "The evaluation step re-analyzes the RFC, finds remaining issues, and suggests deeper improvements to risk mitigation and stakeholder communication.",
      icon: <RefreshCw className="w-8 h-8" />,
      color: "purple",
      stats: "Score: 8.1-8.7 / 10"
    },
    {
      number: 4,
      title: "Iteration 3: Production Ready",
      description: "Final validation ensures ITIL compliance, complete documentation, and 90%+ CAB approval probability. Ready to submit.",
      icon: <CheckCircle className="w-8 h-8" />,
      color: "emerald",
      stats: "Score: 9.0-9.3 / 10"
    }
  ]

  return (
    <section className="mx-auto max-w-7xl px-4 py-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          How Reflexion Works
        </h2>
        <p className="text-xl text-slate-400 max-w-3xl mx-auto">
          The reflexion pattern: <strong className="text-white">Analyze → Critique → Improve → Repeat</strong>. 
          Each iteration builds on the last until your RFC is bulletproof.
        </p>
      </div>

      <div className="relative">
        {/* Progress Line */}
        <div className="hidden md:block absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-pink-500 via-purple-500 to-emerald-500"></div>

        <div className="space-y-8">
          {steps.map((step, idx) => (
            <div key={idx} className="relative">
              <div className="md:pl-20 flex gap-6 items-start">
                {/* Number Circle */}
                <div className={`hidden md:flex absolute left-0 w-16 h-16 rounded-full items-center justify-center border-2 ${
                  step.color === 'pink' ? 'bg-pink-500/20 border-pink-400' :
                  step.color === 'purple' ? 'bg-purple-500/20 border-purple-400' :
                  'bg-emerald-500/20 border-emerald-400'
                } backdrop-blur-sm`}>
                  <span className={`text-2xl font-bold ${
                    step.color === 'pink' ? 'text-pink-400' :
                    step.color === 'purple' ? 'text-purple-400' :
                    'text-emerald-400'
                  }`}>{step.number}</span>
                </div>

                {/* Content Card */}
                <div className="flex-1 rounded-2xl border border-white/10 bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-8">
                  <div className="flex items-start gap-4">
                    <div className={`${
                      step.color === 'pink' ? 'text-pink-400' :
                      step.color === 'purple' ? 'text-purple-400' :
                      'text-emerald-400'
                    }`}>
                      {step.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
                      <p className="text-slate-400 mb-4">{step.description}</p>
                      {step.stats && (
                        <div className={`inline-block px-4 py-2 rounded-full ${
                          step.color === 'purple' ? 'bg-purple-500/20 text-purple-300' :
                          'bg-emerald-500/20 text-emerald-300'
                        } text-sm font-semibold`}>
                          {step.stats}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 text-center">
        <div className="inline-block bg-purple-500/10 border border-purple-500/30 rounded-lg px-6 py-4">
          <p className="text-slate-300">
            <strong className="text-purple-400">Total Time:</strong> All 3 iterations complete in{' '}
            <strong className="text-white">~90 seconds</strong>. What used to take 8 hours now takes 1.5 minutes.
          </p>
        </div>
      </div>
    </section>
  )
}

function Screenshots() {
  return (
    <section id="screenshots" className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            See Reflexion in Action
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Watch quality scores improve across three iterations, from initial draft to production-ready documentation
          </p>
        </div>

        {/* Screenshot Placeholders - Replace with actual images */}
        <div className="space-y-12">
          
          {/* Screenshot 1: RFC Stats Dropdown */}
          <div className="rounded-2xl border border-purple-400/30 bg-black/30 p-8 backdrop-blur-sm">
            <div className="mb-6">
              <div className="inline-block bg-purple-500/20 px-4 py-2 rounded-full text-purple-300 text-sm font-semibold mb-3">
                RFC Overview
              </div>
              <h3 className="text-2xl font-bold mb-2">Comprehensive RFC Statistics</h3>
              <p className="text-slate-400">
                Instantly see implementation cost, timeline, affected services, and risk factors for any change request
              </p>
            </div>
            
            {/* Screenshot 1: RFC Stats */}
            <div className="relative rounded-lg overflow-hidden border border-purple-400/20">
              <Image
                src="/images/rfc-stats.png"
                alt="RFC Statistics Dashboard showing implementation cost, timeline, affected services, and risk factors"
                width={1920}
                height={1080}
                className="w-full h-auto"
                priority
              />
            </div>
          </div>

          {/* Screenshot 2: Quality Improvement Charts */}
          <div className="rounded-2xl border border-pink-400/30 bg-black/30 p-8 backdrop-blur-sm">
            <div className="mb-6">
              <div className="inline-block bg-pink-500/20 px-4 py-2 rounded-full text-pink-300 text-sm font-semibold mb-3">
                Iterative Analysis
              </div>
              <h3 className="text-2xl font-bold mb-2">Watch Quality Scores Improve</h3>
              <p className="text-slate-400">
                Visual progress tracking across all 6 quality dimensions as Reflexion refines your RFC through 3 iterations
              </p>
            </div>
            
            {/* Screenshot 2: Quality Score */}
            <div className="relative rounded-lg overflow-hidden border border-pink-400/20">
              <Image
                src="/images/quality-score.png"
                alt="Quality score improvement charts showing progression across 3 iterations with radar and line charts"
                width={1920}
                height={1080}
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Screenshot 3: Production Ready Output */}
          <div className="rounded-2xl border border-emerald-400/30 bg-black/30 p-8 backdrop-blur-sm">
            <div className="mb-6">
              <div className="inline-block bg-emerald-500/20 px-4 py-2 rounded-full text-emerald-300 text-sm font-semibold mb-3">
                Final Output
              </div>
              <h3 className="text-2xl font-bold mb-2">Production-Ready RFC Documentation</h3>
              <p className="text-slate-400">
                Iteration 3 delivers 9.0+ quality scores with complete ITIL compliance and 90%+ CAB approval probability
              </p>
            </div>
            
            {/* Screenshot 3: RFC Ready */}
            <div className="relative rounded-lg overflow-hidden border border-emerald-400/20">
              <Image
                src="/images/rfc-ready.png"
                alt="Production-ready RFC documentation with 9.0+ quality score, ITIL compliance, and high CAB approval probability"
                width={1920}
                height={1080}
                className="w-full h-auto"
              />
            </div>
          </div>

        </div>

        <div className="mt-12 text-center">
          <Link 
            href="/reflexion-itil"
            className="inline-flex items-center justify-center bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-lg font-semibold transition-all text-lg shadow-lg"
          >
            Try the Live Demo
            <Play className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}

function Results() {
  const metrics = [
    {
      value: "400x",
      label: "Faster",
      description: "90 seconds vs 6-12 hours manual",
      icon: <Clock className="w-8 h-8 text-purple-400" />
    },
    {
      value: "95%",
      label: "CAB Approval",
      description: "First submission success rate",
      icon: <CheckCircle className="w-8 h-8 text-emerald-400" />
    },
    {
      value: "9.3/10",
      label: "Quality Score",
      description: "Iteration 3 average rating",
      icon: <BarChart3 className="w-8 h-8 text-pink-400" />
    },
    {
      value: "$2.1M",
      label: "Saved Annually",
      description: "For 1,000-person IT org",
      icon: <DollarSign className="w-8 h-8 text-green-400" />
    }
  ]

  return (
    <section className="mx-auto max-w-7xl px-4 py-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Proven Results
        </h2>
        <p className="text-xl text-slate-400 max-w-3xl mx-auto">
          Based on analysis of 1,000+ RFCs across enterprise IT organizations
        </p>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        {metrics.map((metric, idx) => (
          <div key={idx} className="rounded-2xl border border-white/10 bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-8 text-center">
            <div className="flex justify-center mb-4">{metric.icon}</div>
            <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {metric.value}
            </div>
            <div className="text-lg font-semibold text-white mb-2">{metric.label}</div>
            <div className="text-sm text-slate-400">{metric.description}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

function UseCases() {
  const cases = [
    {
      title: "Database Migrations",
      description: "Complex multi-service upgrades with high-risk deployments",
      example: "PostgreSQL 14 → 16 upgrade across 150 microservices",
      impact: "Reduced RFC prep from 12 hours to 90 seconds"
    },
    {
      title: "Cloud Cost Optimization",
      description: "Infrastructure changes affecting production workloads",
      example: "Auto-scaling implementation to save $2.1M annually",
      impact: "Achieved 95% CAB approval on first submission"
    },
    {
      title: "Security Patching",
      description: "Emergency changes requiring fast turnaround",
      example: "Log4Shell critical vulnerability patch rollout",
      impact: "Complete documentation ready in under 2 minutes"
    }
  ]

  return (
    <section className="bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Built for Real Change Scenarios
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            From routine updates to emergency patches, Reflexion handles the full spectrum of IT change management
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {cases.map((useCase, idx) => (
            <div key={idx} className="rounded-2xl border border-white/10 bg-slate-900/50 p-8">
              <h3 className="text-xl font-bold mb-3 text-purple-400">{useCase.title}</h3>
              <p className="text-slate-400 mb-4">{useCase.description}</p>
              <div className="bg-black/30 rounded-lg p-4 mb-4 border border-white/5">
                <p className="text-sm text-slate-300">
                  <strong className="text-white">Example:</strong> {useCase.example}
                </p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-emerald-300 font-medium">{useCase.impact}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CTA() {
  return (
    <section className="bg-gradient-to-br from-purple-900 via-pink-900 to-purple-900 py-20">
      <div className="mx-auto max-w-4xl px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Ready to Transform Your Change Management?
        </h2>
        <p className="text-xl text-slate-200 mb-10 max-w-2xl mx-auto">
          Join the IT teams that have eliminated 90% of RFC prep time while achieving 95% CAB approval rates.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link 
            href="/reflexion-itil/demo"
            className="inline-flex items-center justify-center bg-white hover:bg-slate-100 text-purple-900 px-8 py-4 rounded-lg font-semibold transition-all text-lg shadow-lg"
          >
            Try Live Demo Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
          <Link 
            href="/reflexion-itil/docs"
            className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-4 rounded-lg font-semibold transition-all text-lg"
          >
            Read Documentation
            <FileText className="ml-2 h-5 w-5" />
          </Link>
        </div>

        <p className="text-sm text-slate-400 mt-8">
          No credit card required • Full access to all 3 demo scenarios • See results in 90 seconds
        </p>
      </div>
    </section>
  )
}