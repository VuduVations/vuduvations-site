// src/app/ai-discovery/page.js

'use client'
import UniversalHeader from '@/components/UniversalHeader';
import UnifiedFooter from '@/components/UnifiedFooter';
import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Brain, Target, TrendingUp, BarChart3, Sparkles, ArrowRight, 
  Zap, Award, Clock, AlertTriangle, Users, DollarSign,
  CheckCircle, ExternalLink, Play, Download, FileText, Eye,
  Layers, Globe, Shield, Activity, Lightbulb, TrendingDown, FlaskConical
} from 'lucide-react'

// AI Discovery Footer Configuration
const aiDiscoveryFooterConfig = {
  name: "AI Discovery Platform",
  icon: Brain,
  tagline: "Strategic AI readiness assessments using consulting-grade methodology. Know what's possible before you build.",
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

export default function AIDiscoveryLanding() {
  return (
    <div className="relative min-h-screen bg-slate-900 text-white">
      {/* Universal site-wide header only */}
      <UniversalHeader />
      
      <Hero />
      <ProblemStatement />
      <Solution />
      <HowItWorks />
      <Results />
      <UseCases />
      <CTA />
      
      {/* Unified Footer with AI Discovery branding */}
      <UnifiedFooter productBranding={aiDiscoveryFooterConfig} />
    </div>
  )
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900">
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
                stroke="rgba(16, 185, 129, 0.1)"
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
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 px-4 py-2 text-sm text-emerald-300 mb-6">
            <Brain className="h-4 w-4" /> 
            Consulting-Grade Methodology
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold tracking-tight mb-6"
        >
          Know What AI Can Do{' '}
          <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
            Before You Build It
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 mx-auto max-w-3xl text-xl text-slate-300 leading-relaxed"
        >
          Strategic AI readiness assessment using consulting-grade methodology—delivered 
          in hours, not weeks. <strong className="text-white">6-agent system</strong> maps opportunities, calculates ROI, 
          and builds your implementation roadmap.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-wrap justify-center items-center gap-4"
        >
          <Link 
            href="/ai-discovery/demos"
            className="inline-flex items-center justify-center bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 py-4 rounded-lg font-semibold transition-all text-lg shadow-lg"
          >
            View Industry Demos
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
          <Link 
            href="/ai-discovery/docs"
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
            <Brain className="w-5 h-5 text-emerald-400" />
            <span>6-Agent System</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-teal-400" />
            <span>Hours, Not Weeks</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-green-400" />
            <span>Consulting-Grade Quality</span>
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
      title: "Consulting Takes 4-8 Weeks",
      description: "Traditional consulting firms charge $150K-$500K for AI strategy projects that take 4-8 weeks. By the time you get recommendations, market conditions have shifted.",
      stat: "8 weeks"
    },
    {
      icon: <AlertTriangle className="w-8 h-8" />,
      title: "Build First, Discover Problems Later",
      description: "Most companies start building AI solutions before understanding if they're solving the right problems. This leads to expensive pivots, abandoned projects, and organizational skepticism.",
      stat: "67% failure rate"
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: "No Clear ROI Visibility",
      description: "IT teams struggle to get budget approval because they can't quantify AI impact. Finance wants numbers. Engineering wants to build. The disconnect kills momentum.",
      stat: "$0 approved"
    }
  ]

  return (
    <section className="mx-auto max-w-7xl px-4 py-20">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">The AI Strategy Problem</h2>
        <p className="text-xl text-slate-400 max-w-3xl mx-auto">
          You need to know what AI can do for your business before investing in development. 
          But getting those answers is expensive, slow, and often inconclusive.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {problems.map((problem, idx) => (
          <div key={idx} className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700">
            <div className="text-red-400 mb-4">{problem.icon}</div>
            <h3 className="text-xl font-bold mb-3 text-white">{problem.title}</h3>
            <p className="text-slate-300 mb-4">{problem.description}</p>
            <div className="text-3xl font-bold text-red-400">{problem.stat}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

function Solution() {
  return (
    <section className="bg-gradient-to-br from-emerald-900/30 to-teal-900/30 py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 px-4 py-2 text-sm text-emerald-300 mb-6">
              <Sparkles className="h-4 w-4" />
              The Solution
            </div>
            <h2 className="text-4xl font-bold mb-6">
              Strategy Consulting Intelligence,
              <span className="block text-emerald-400 mt-2">Delivered in Hours</span>
            </h2>
            <p className="text-xl text-slate-300 mb-6">
              AI Discovery Platform uses a <strong className="text-white">6-agent system</strong> trained on F500 
              consulting methodologies to analyze your business, identify AI opportunities, calculate ROI, 
              and build implementation roadmaps—all in hours instead of weeks.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-1" />
                <div>
                  <div className="font-semibold text-white mb-1">Multi-Dimensional Analysis</div>
                  <div className="text-slate-400">Process maturity, data readiness, technical feasibility, organizational change management</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-1" />
                <div>
                  <div className="font-semibold text-white mb-1">Executive-Ready Deliverables</div>
                  <div className="text-slate-400">ROI projections, risk assessments, implementation timelines, resource requirements</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-1" />
                <div>
                  <div className="font-semibold text-white mb-1">Industry-Specific Insights</div>
                  <div className="text-slate-400">Healthcare, finance, manufacturing, retail, SaaS—benchmarked against peer performance</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
            <h3 className="text-2xl font-bold mb-6 text-center">vs Traditional Consulting</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-emerald-500/10 rounded-lg border border-emerald-500/30">
                <span className="text-slate-300">Delivery Time</span>
                <div className="flex items-center gap-4">
                  <span className="text-emerald-400 font-bold">4 hours</span>
                  <span className="text-slate-500">vs</span>
                  <span className="text-slate-400">4-8 weeks</span>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-emerald-500/10 rounded-lg border border-emerald-500/30">
                <span className="text-slate-300">Cost</span>
                <div className="flex items-center gap-4">
                  <span className="text-emerald-400 font-bold">$15K-$50K</span>
                  <span className="text-slate-500">vs</span>
                  <span className="text-slate-400">$150K-$500K</span>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-emerald-500/10 rounded-lg border border-emerald-500/30">
                <span className="text-slate-300">Revision Speed</span>
                <div className="flex items-center gap-4">
                  <span className="text-emerald-400 font-bold">Real-time</span>
                  <span className="text-slate-500">vs</span>
                  <span className="text-slate-400">2-3 weeks</span>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-emerald-500/10 rounded-lg border border-emerald-500/30">
                <span className="text-slate-300">Companies Analyzed</span>
                <div className="flex items-center gap-4">
                  <span className="text-emerald-400 font-bold">Unlimited</span>
                  <span className="text-slate-500">vs</span>
                  <span className="text-slate-400">1 at a time</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function HowItWorks() {
  const steps = [
    {
      number: "1",
      title: "Discovery Agent",
      description: "Analyzes your business model, identifies pain points, and maps process inefficiencies where AI can add value",
      icon: <Target className="w-6 h-6" />,
      color: "emerald"
    },
    {
      number: "2",
      title: "Assessment Agent",
      description: "Evaluates data readiness, technical infrastructure, team capabilities, and organizational change requirements",
      icon: <Shield className="w-6 h-6" />,
      color: "teal"
    },
    {
      number: "3",
      title: "ROI Agent",
      description: "Calculates financial impact, implementation costs, timeline to value, and payback period for each opportunity",
      icon: <DollarSign className="w-6 h-6" />,
      color: "green"
    },
    {
      number: "4",
      title: "Roadmap Agent",
      description: "Builds phased implementation plan with quick wins, resource allocation, and dependency management",
      icon: <Layers className="w-6 h-6" />,
      color: "emerald"
    },
    {
      number: "5",
      title: "Risk Agent",
      description: "Identifies technical, organizational, and market risks with mitigation strategies and contingency planning",
      icon: <AlertTriangle className="w-6 h-6" />,
      color: "yellow"
    },
    {
      number: "6",
      title: "Implementation Agent",
      description: "Provides vendor recommendations, build vs buy analysis, team structure, and success metrics definition",
      icon: <Activity className="w-6 h-6" />,
      color: "emerald"
    }
  ]

  return (
    <section id="how-it-works" className="mx-auto max-w-7xl px-4 py-20">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">How the 6-Agent System Works</h2>
        <p className="text-xl text-slate-400 max-w-3xl mx-auto">
          Each agent specializes in a different dimension of AI readiness. Together, they deliver 
          comprehensive strategic intelligence comparable to top-tier consulting firms.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {steps.map((step, idx) => (
          <div key={idx} className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 hover:border-emerald-500/50 transition-all">
            <div className="flex items-center gap-4 mb-4">
              <div className={`w-12 h-12 rounded-lg bg-${step.color}-500/20 flex items-center justify-center text-${step.color}-400 text-xl font-bold`}>
                {step.number}
              </div>
              <div className={`text-${step.color}-400`}>
                {step.icon}
              </div>
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">{step.title}</h3>
            <p className="text-slate-300">{step.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-gradient-to-br from-emerald-900/30 to-teal-900/30 rounded-xl p-8 border border-emerald-500/30">
        <div className="flex items-start gap-4">
          <Lightbulb className="w-8 h-8 text-emerald-400 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-xl font-bold mb-2 text-white">The Result: Executive Decision Package</h3>
            <p className="text-slate-300">
              You receive a comprehensive report with prioritized AI opportunities, ROI projections, implementation 
              roadmaps, risk mitigation strategies, and vendor recommendations. Everything your executive team needs 
              to make informed decisions and secure budget approval.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function Results() {
  const metrics = [
    { value: "2-6 hours", label: "Typical Delivery Time", icon: <Clock className="w-6 h-6" />, color: "emerald" },
    { value: "Industry-Validated", label: "ROI Models", icon: <Target className="w-6 h-6" />, color: "green" },
    { value: "7+", label: "Opportunities Per Analysis", icon: <Lightbulb className="w-6 h-6" />, color: "yellow" },
    { value: "Multi-Million", label: "Impact Potential", icon: <TrendingUp className="w-6 h-6" />, color: "teal" }
  ]

  return (
    <section className="bg-slate-800/30 py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Results Speak Louder</h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Our AI Discovery Platform delivers consistent, high-quality strategic analysis across industries. 
            Here's what you can expect.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {metrics.map((metric, idx) => (
            <div key={idx} className="text-center">
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-${metric.color}-500/20 text-${metric.color}-400 mb-4`}>
                {metric.icon}
              </div>
              <div className="text-4xl font-bold mb-2 text-white">{metric.value}</div>
              <div className="text-slate-400">{metric.label}</div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 text-xs font-semibold border border-blue-500/20">
                <FlaskConical className="h-3 w-3" />
                Demo Output
              </span>
            </div>
            <div className="text-emerald-400 text-2xl font-bold mb-2">Manufacturing</div>
            <div className="text-slate-400 mb-4">$250M Industrial Company</div>
            <div className="flex items-center gap-2 text-green-400 text-xl font-bold mb-2">
              <TrendingUp className="w-5 h-5" />
              111% ROI
            </div>
            <p className="text-slate-300 text-sm">
              Identified 7 use cases including predictive maintenance, quality defect detection, 
              and supply chain optimization. Projected $2.8M annual impact.
            </p>
          </div>

          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 text-xs font-semibold border border-blue-500/20">
                <FlaskConical className="h-3 w-3" />
                Demo Output
              </span>
            </div>
            <div className="text-teal-400 text-2xl font-bold mb-2">Healthcare</div>
            <div className="text-slate-400 mb-4">$180M Hospital System</div>
            <div className="flex items-center gap-2 text-green-400 text-xl font-bold mb-2">
              <TrendingUp className="w-5 h-5" />
              98% ROI
            </div>
            <p className="text-slate-300 text-sm">
              Mapped patient flow optimization, staff scheduling AI, and billing automation. 
              Recommended phased 18-month rollout with $1.9M impact.
            </p>
          </div>

          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 text-xs font-semibold border border-blue-500/20">
                <FlaskConical className="h-3 w-3" />
                Demo Output
              </span>
            </div>
            <div className="text-green-400 text-2xl font-bold mb-2">Financial Services</div>
            <div className="text-slate-400 mb-4">$420M Bank</div>
            <div className="flex items-center gap-2 text-green-400 text-xl font-bold mb-2">
              <TrendingUp className="w-5 h-5" />
              105% ROI
            </div>
            <p className="text-slate-300 text-sm">
              Prioritized loan processing automation, fraud detection enhancement, and compliance 
              reporting. Clear 24-month roadmap with $4.2M projected value.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function UseCases() {
  const industries = [
    {
      name: "Manufacturing",
      icon: <Activity className="w-8 h-8" />,
      examples: ["Predictive maintenance", "Quality defect detection", "Supply chain optimization", "Production planning"]
    },
    {
      name: "Healthcare",
      icon: <Users className="w-8 h-8" />,
      examples: ["Patient flow optimization", "Staff scheduling", "Billing automation", "Clinical documentation"]
    },
    {
      name: "Financial Services",
      icon: <DollarSign className="w-8 h-8" />,
      examples: ["Loan processing", "Fraud detection", "Compliance reporting", "Customer service automation"]
    },
    {
      name: "Retail & E-commerce",
      icon: <BarChart3 className="w-8 h-8" />,
      examples: ["Inventory optimization", "Dynamic pricing", "Customer service chatbots", "Cart abandonment reduction"]
    },
    {
      name: "SaaS & Technology",
      icon: <Zap className="w-8 h-8" />,
      examples: ["Churn prediction", "Lead scoring", "Support ticket routing", "Feature usage analysis"]
    },
    {
      name: "Logistics",
      icon: <Globe className="w-8 h-8" />,
      examples: ["Route optimization", "Delivery prediction", "Warehouse automation", "Invoice reconciliation"]
    }
  ]

  return (
    <section id="use-cases" className="mx-auto max-w-7xl px-4 py-20">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">Industry Use Cases</h2>
        <p className="text-xl text-slate-400 max-w-3xl mx-auto">
          Our 6-agent system leverages industry best practices and frameworks. Here are common 
          AI opportunities we identify in each sector.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {industries.map((industry, idx) => (
          <div key={idx} className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 hover:border-emerald-500/50 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="text-emerald-400">
                {industry.icon}
              </div>
              <h3 className="text-xl font-bold text-white">{industry.name}</h3>
            </div>
            <ul className="space-y-2">
              {industry.examples.map((example, i) => (
                <li key={i} className="flex items-start gap-2 text-slate-300">
                  <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-1" />
                  <span className="text-sm">{example}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link 
          href="/ai-discovery/demos"
          className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 text-lg font-semibold"
        >
          View Full Industry Demo Reports
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </section>
  )
}

function CTA() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20">
      <div className="bg-gradient-to-br from-emerald-900/50 to-teal-900/50 rounded-2xl p-12 border border-emerald-500/30 text-center">
        <h2 className="text-4xl font-bold mb-4">Ready to Discover Your AI Opportunities?</h2>
        <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
          Get consulting-grade strategic intelligence—delivered in hours 
          instead of weeks, at a fraction of the cost.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link 
            href="/ai-discovery/demos"
            className="inline-flex items-center justify-center bg-white hover:bg-slate-100 text-emerald-900 px-8 py-4 rounded-lg font-semibold transition-all text-lg shadow-lg"
          >
            View Industry Demos
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
          <Link 
            href="/ai-discovery/docs"
            className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-4 rounded-lg font-semibold transition-all text-lg"
          >
            Read Documentation
            <FileText className="ml-2 h-5 w-5" />
          </Link>
        </div>

        <p className="text-sm text-slate-400 mt-8">
          No credit card required • View 6 complete industry analyses • Executive-ready reports
        </p>
      </div>
    </section>
  )
}