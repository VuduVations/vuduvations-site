// src/app/consulting-analyzer/page.js

'use client'
import UniversalHeader from '@/components/UniversalHeader';
import UnifiedFooter from '@/components/UnifiedFooter';
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { 
  Briefcase, Brain, Zap, Shield, Clock, FileText, Eye, ArrowRight, 
  TrendingUp, Target, Users, CheckCircle, DollarSign, BarChart3, 
  Activity, AlertTriangle, Download, Play, Sparkles, Award
} from 'lucide-react'

// Sales Analyzer Footer Configuration
const salesAnalyzerFooterConfig = {
  name: "Sales Call Analyzer",
  icon: Briefcase,
  tagline: "AI-powered transcript analysis for sales conversations. Transparent, fast, and affordable intelligence.",
  color: "blue",
  trademark: "Sales Call Analyzer",
  subtitle: "AI-powered analysis. Real transparency. Professional results.",
  links: {
    product: [
      { label: "Overview", href: "/consulting-analyzer" },
      { label: "Features", href: "/consulting-analyzer#features" },
      { label: "How It Works", href: "/consulting-analyzer#how-it-works" },
      { label: "Live Demo", href: "/consulting-analyzer/demo" }
    ],
    resources: [
      { label: "Documentation", href: "/consulting-analyzer/docs" },
      { label: "API Reference", href: "/consulting-analyzer/docs/api" },
      { label: "Sample Transcripts", href: "/consulting-analyzer/demo#samples" },
      { label: "Use Cases", href: "/consulting-analyzer#use-cases" }
    ],
    company: [
      { label: "About VuduVations", href: "/" },
      { label: "Contact Sales", href: "#contact" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" }
    ]
  }
};

export default function SalesAnalyzerLanding() {
  return (
    <div className="relative min-h-screen bg-slate-900 text-white">
      {/* Universal site-wide header only */}
      <UniversalHeader />
      
      <Hero />
      <ProblemStatement />
      <Solution />
      <DeploymentOptions />
      <HowItWorks />
      <Results />
      <UseCases />
      <CTA />
      
      {/* Unified Footer with Sales Analyzer branding */}
      <UnifiedFooter productBranding={salesAnalyzerFooterConfig} />
    </div>
  )
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
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
                stroke="rgba(59, 130, 246, 0.1)"
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
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/20 border border-blue-400/30 px-4 py-2 text-sm text-blue-300 mb-6">
            <Brain className="h-4 w-4" /> 
            AI-Powered Sales Intelligence
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold tracking-tight mb-6"
        >
          Sales Intelligence That{' '}
          <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Shows Its Work
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 mx-auto max-w-3xl text-xl text-slate-300 leading-relaxed"
        >
          AI-powered analysis of your sales conversations with transparent output and strategic insights. 
          Choose your deployment: <strong className="text-white">Free (GPU-powered local)</strong> or <strong className="text-white">~$0.001 per analysis (cloud)</strong>.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-wrap justify-center items-center gap-4"
        >
          <Link 
            href="/consulting-analyzer/demo"
            className="inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-lg font-semibold transition-all text-lg shadow-lg"
          >
            Try Live Demo
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
          <Link 
            href="/consulting-analyzer/docs"
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
            <Zap className="w-5 h-5 text-blue-400" />
            <span>Dual Deployment Options</span>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-emerald-400" />
            <span>Free (Local) or ~$0.001 (Cloud)</span>
          </div>
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-purple-400" />
            <span>Transparent Output</span>
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
      title: "Manual Analysis Takes Hours",
      description: "Sales reps spend 2-3 hours after each enterprise call manually documenting pain points, stakeholders, and next steps. This cuts into selling time and delays follow-up.",
      stat: "3 hours/call"
    },
    {
      icon: <AlertTriangle className="w-8 h-8" />,
      title: "Black Box AI = Zero Trust",
      description: "Tools like Gong and Chorus.ai are black boxes. You don't know which AI made what decision, how much it cost, or why it came to its conclusions.",
      stat: "0% transparency"
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: "Expensive Per-Seat Pricing",
      description: "Enterprise conversation intelligence platforms cost $1,200-$1,800 per user per year. For a 50-person sales team, that's $90K annually.",
      stat: "$90K/year"
    }
  ]

  return (
    <section className="mx-auto max-w-7xl px-4 py-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Sales Intelligence is Broken
        </h2>
        <p className="text-xl text-slate-400 max-w-3xl mx-auto">
          Reps waste hours on post-call admin. AI tools are black boxes. And pricing is designed for enterprise budgets only.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {problems.map((problem, idx) => (
          <div key={idx} className="rounded-2xl border border-white/10 bg-slate-900/50 p-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="text-red-400">{problem.icon}</div>
              <div className="text-2xl font-bold text-red-400">{problem.stat}</div>
            </div>
            <h3 className="text-xl font-bold mb-3">{problem.title}</h3>
            <p className="text-slate-400">{problem.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function Solution() {
  const features = [
    {
      icon: <Activity className="w-6 h-6" />,
      title: "Transparent AI Analysis",
      description: "See the input and output of your analysis clearly. Know what the AI extracted and why, with no black-box mystery."
    },
    {
      icon: <DollarSign className="w-6 h-6" />,
      title: "Flexible Deployment Options",
      description: "Choose Local (free on your GPU with Mistral 7B) or Cloud (fast ~$0.001-$0.003 with Gemini 1.5 Flash). Both deliver the same comprehensive analysis."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Fast Analysis Pipeline",
      description: "Cloud deployment processes in under 2 minutes. Local deployment runs on your GPU for zero API costs and complete data privacy."
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: "Strategic Stakeholder Mapping",
      description: "Automatically identify key decision makers, their concerns, motivations, and influence levels across the buying committee."
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Actionable Next Steps",
      description: "Get prioritized recommendations with clear owners and timelines. No vague suggestions—concrete actions you can execute immediately."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Risk Factor Analysis",
      description: "Surface potential deal risks early with severity ratings and mitigation strategies. Stay ahead of blockers before they derail deals."
    }
  ]

  return (
    <section className="mx-auto max-w-7xl px-4 py-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          The Solution: Transparent AI Intelligence
        </h2>
        <p className="text-xl text-slate-400 max-w-3xl mx-auto">
          Transparency, speed, and affordability in one platform
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, idx) => (
          <div key={idx} className="rounded-2xl border border-blue-400/30 bg-slate-900/50 p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="text-blue-400">{feature.icon}</div>
              <h3 className="text-xl font-bold">{feature.title}</h3>
            </div>
            <p className="text-slate-400">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function DeploymentOptions() {
  const options = [
    {
      name: "Local Deployment",
      subtitle: "GPU-Powered • Free Forever",
      icon: <Shield className="w-12 h-12" />,
      color: "emerald",
      features: [
        "Runs on your GPU (T4, V100, A100)",
        "Mistral 7B Instruct (4-bit quantized)",
        "Zero API costs - completely free",
        "Complete data privacy - nothing leaves your server",
        "Ideal for: Sensitive data, unlimited usage, budget-conscious teams"
      ],
      specs: {
        cost: "$0.00",
        speed: "2-4 minutes per analysis",
        model: "Mistral 7B Instruct",
        deployment: "Colab, Kaggle, or your GPU server"
      }
    },
    {
      name: "Cloud Deployment",
      subtitle: "API-Powered • Ultra-Fast",
      icon: <Zap className="w-12 h-12" />,
      color: "blue",
      features: [
        "Powered by Gemini 1.5 Flash API",
        "Lightning-fast processing (<2 min)",
        "Pay only for what you use (~$0.001-$0.003)",
        "No infrastructure management needed",
        "Ideal for: Quick analyses, distributed teams, on-demand usage"
      ],
      specs: {
        cost: "~$0.001-$0.003",
        speed: "<2 minutes per analysis",
        model: "Gemini 1.5 Flash",
        deployment: "API integration ready"
      }
    }
  ]

  return (
    <section className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Choose Your Deployment
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Same powerful analysis, two flexible deployment options. Pick what works best for your use case.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {options.map((option, idx) => (
            <div key={idx} className={`rounded-2xl border-2 border-${option.color}-400/30 bg-slate-900/80 p-8 backdrop-blur-sm`}>
              {/* Header */}
              <div className="text-center mb-6">
                <div className={`inline-flex items-center justify-center w-20 h-20 bg-${option.color}-500/20 rounded-2xl mb-4`}>
                  <div className={`text-${option.color}-400`}>{option.icon}</div>
                </div>
                <h3 className="text-2xl font-bold mb-2">{option.name}</h3>
                <p className={`text-${option.color}-400 font-semibold`}>{option.subtitle}</p>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-6">
                {option.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-3">
                    <CheckCircle className={`w-5 h-5 text-${option.color}-400 flex-shrink-0 mt-0.5`} />
                    <span className="text-slate-300 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Specs */}
              <div className="bg-black/30 rounded-lg p-4 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-sm">Cost per analysis:</span>
                  <span className={`text-${option.color}-400 font-bold`}>{option.specs.cost}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-sm">Processing speed:</span>
                  <span className="text-white font-semibold text-sm">{option.specs.speed}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-sm">AI Model:</span>
                  <span className="text-white font-semibold text-sm">{option.specs.model}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-sm">Deployment:</span>
                  <span className="text-white font-semibold text-sm">{option.specs.deployment}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Comparison Note */}
        <div className="mt-12 bg-blue-500/10 border border-blue-400/30 rounded-xl p-6 text-center">
          <h4 className="text-lg font-bold text-white mb-2">Both Options Deliver Identical Analysis</h4>
          <p className="text-slate-300 text-sm">
            Whether you choose local or cloud, you'll get the same comprehensive analysis covering pain points, 
            stakeholder mapping, opportunities, risks, and actionable next steps. The only differences are speed, 
            cost, and where the processing happens.
          </p>
        </div>
      </div>
    </section>
  )
}

function HowItWorks() {
  const steps = [
    {
      number: "1",
      title: "Upload Transcript",
      description: "Paste your sales call transcript or use one of our sample scenarios (Healthcare, Finance, Retail)",
      icon: <FileText className="w-8 h-8" />
    },
    {
      number: "2",
      title: "AI Processes Transcript",
      description: "AI analyzes your transcript using advanced language models to extract key insights and strategic intelligence",
      icon: <Activity className="w-8 h-8" />
    },
    {
      number: "3",
      title: "Get Strategic Insights",
      description: "Receive pain points, opportunities, stakeholder maps, risk factors, and next steps with transparent output",
      icon: <Target className="w-8 h-8" />
    },
    {
      number: "4",
      title: "Export & Act",
      description: "Download reports, copy JSON, or integrate via API. View comprehensive analysis results with all extracted insights.",
      icon: <Download className="w-8 h-8" />
    }
  ]

  return (
    <section className="mx-auto max-w-7xl px-4 py-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          How It Works
        </h2>
        <p className="text-xl text-slate-400 max-w-3xl mx-auto">
          From transcript to actionable intelligence in under 2 minutes
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((step, idx) => (
          <div key={idx} className="relative">
            <div className="rounded-2xl border border-blue-400/30 bg-slate-900/50 p-8 h-full">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-500/20 border-2 border-blue-400 flex items-center justify-center text-xl font-bold text-blue-400">
                  {step.number}
                </div>
                <div className="text-blue-400">{step.icon}</div>
              </div>
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-slate-400">{step.description}</p>
            </div>
            {idx < steps.length - 1 && (
              <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-blue-400/30"></div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

function Results() {
  const metrics = [
    {
      value: "$0-$0.003",
      label: "Cost Per Analysis",
      description: "Free (local) or ultra-cheap (cloud)",
      icon: <DollarSign className="w-8 h-8 text-emerald-400" />
    },
    {
      value: "<4 min",
      label: "Analysis Time",
      description: "vs 2-3 hours manual work",
      icon: <Clock className="w-8 h-8 text-blue-400" />
    },
    {
      value: "Dual",
      label: "Deployment Options",
      description: "Local (GPU) or Cloud (API)",
      icon: <Zap className="w-8 h-8 text-purple-400" />
    },
    {
      value: "Clear",
      label: "Output Transparency",
      description: "See all extracted insights",
      icon: <Activity className="w-8 h-8 text-yellow-400" />
    }
  ]

  return (
    <section className="bg-gradient-to-br from-blue-900 via-slate-900 to-purple-900 py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Results That Speak for Themselves
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            AI-powered analysis delivers transparency and cost efficiency no black-box tool can match
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, idx) => (
            <div key={idx} className="rounded-2xl border border-white/20 bg-black/30 p-8 text-center">
              <div className="flex justify-center mb-4">{metric.icon}</div>
              <div className="text-4xl font-bold mb-2">{metric.value}</div>
              <div className="text-lg font-semibold text-slate-200 mb-2">{metric.label}</div>
              <div className="text-sm text-slate-400">{metric.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function UseCases() {
  const cases = [
    {
      title: "Enterprise SaaS Sales",
      description: "Complex multi-stakeholder deals with 6+ month sales cycles",
      example: "Healthcare SaaS company analyzing CIO + VP Ops call",
      impact: "Reduced post-call admin from 3 hours to 2 minutes"
    },
    {
      title: "Professional Services",
      description: "Consulting, legal, and financial advisory discovery calls",
      example: "Compliance firm analyzing SEC deadline pressure scenario",
      impact: "Identified $4M budget authority and 90-day timeline"
    },
    {
      title: "High-Velocity Sales",
      description: "Fast-moving deals requiring quick turnaround on insights",
      example: "Retail tech analyzing omnichannel transformation needs",
      impact: "Generated stakeholder map and risk factors in real-time"
    }
  ]

  return (
    <section className="mx-auto max-w-7xl px-4 py-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Built for Complex B2B Sales
        </h2>
        <p className="text-xl text-slate-400 max-w-3xl mx-auto">
          From enterprise SaaS to professional services, see how AI-powered analysis delivers insights
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {cases.map((useCase, idx) => (
          <div key={idx} className="rounded-2xl border border-white/10 bg-slate-900/50 p-8">
            <h3 className="text-xl font-bold mb-3 text-blue-400">{useCase.title}</h3>
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
    </section>
  )
}

function CTA() {
  return (
    <section className="bg-gradient-to-br from-blue-900 via-purple-900 to-blue-900 py-20">
      <div className="mx-auto max-w-4xl px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          See AI Intelligence You Can Actually Trust
        </h2>
        <p className="text-xl text-slate-200 mb-10 max-w-2xl mx-auto">
          Try the only sales intelligence platform with dual deployment options: free local processing or ultra-fast cloud API. 
          Transparent output, professional results, your choice of infrastructure.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link 
            href="/consulting-analyzer/demo"
            className="inline-flex items-center justify-center bg-white hover:bg-slate-100 text-blue-900 px-8 py-4 rounded-lg font-semibold transition-all text-lg shadow-lg"
          >
            Try Live Demo Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
          <Link 
            href="/consulting-analyzer/docs"
            className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-4 rounded-lg font-semibold transition-all text-lg"
          >
            Read Documentation
            <FileText className="ml-2 h-5 w-5" />
          </Link>
        </div>

        <p className="text-sm text-slate-400 mt-8">
          No signup required • Sample analysis available • Transparent results in every analysis
        </p>
      </div>
    </section>
  )
}