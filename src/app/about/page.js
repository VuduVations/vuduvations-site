// src/app/about/page.js
'use client';

import UniversalHeader from '@/components/UniversalHeader';
import UnifiedFooter from '@/components/UnifiedFooter';
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Sparkles, Mail, Github, Linkedin, ArrowLeft, Zap, FlaskConical, Rocket } from "lucide-react";
import { useState } from "react";
import ContactRow from '@/components/ContactRow';

export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <UniversalHeader />
      <Hero />
      <AboutContent />
      <ContactRow />
      <UnifiedFooter />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
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
                r={40 + i * 22}
                stroke="rgba(255,255,255,0.08)"
                strokeWidth={1}
                fill="none"
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 60 + i * 4, repeat: Infinity, ease: "linear" }}
              />
            ))}
          </svg>
        </motion.div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-14 md:py-20">
        <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-6xl text-center">
          About <span className="bg-gradient-to-r from-foreground/90 to-foreground/60 bg-clip-text text-transparent">Vuduvations</span>
        </h1>
        <p className="mt-5 mx-auto max-w-2xl text-lg text-muted-foreground text-center">
          An independent innovation studio for the AI era
        </p>
      </div>
    </section>
  );
}

function AboutContent() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 space-y-16">
      {/* Opening */}
      <section className="prose prose-lg dark:prose-invert mx-auto">
        <p className="text-xl leading-relaxed">
          Vuduvations is where strategic thinking meets intelligent execution. An innovation studio that architects AI-powered systems for organizations navigating the gap between what they know and what's possible. Our tagline—<strong>Ideas to Vectors</strong>—reflects Vuduvations' philosophy: every challenge has a measurable direction, and every opportunity can be mapped, measured, and accelerated through intelligent design.
        </p>
      </section>

      {/* The Independent Advantage */}
      <section>
        <h2 className="text-3xl font-bold mb-4">The Independent Advantage</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Enterprise agencies bring process. In-house teams bring institutional knowledge. Independent studios bring something different: <strong>speed, focus, and synthesis</strong>. Vuduvations operates at the intersection of strategic advisory and hands-on execution—designing systems that solve real problems without the overhead of traditional consulting or the constraints of vendor lock-in.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          This model works because the AI landscape rewards adaptability. The tools, frameworks, and best practices are evolving faster than procurement cycles. Organizations need partners who can move at the speed of innovation while maintaining the discipline of enterprise-grade delivery.
        </p>
      </section>

      {/* Why Vuduvations Exists */}
      <section>
        <h2 className="text-3xl font-bold mb-4">Why Vuduvations Exists</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Vuduvations was founded by Sean Halverson, a technology architect who spent his first decade in management consulting, designing managed services deals and governance frameworks for Fortune 500 clients like Best Buy, Neiman Marcus, and Catholic Health Systems. That work revealed a pattern: large organizations excel at structure but struggle with velocity. The next decade was spent exploring that gap—advising blockchain ventures, founding a venture-backed startup, and building AI systems—learning how innovation actually moves. The studio exists at the intersection of those two experiences.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">
          The studio was born from a simple question: <em>What if you could combine the analytical rigor of management consulting with the execution speed of a startup?</em>
        </p>
        <p className="text-muted-foreground leading-relaxed">
          That question led to Vuduvations. Sean brings the discipline of consulting frameworks and the battle scars of founding a venture-backed startup (Stoked Delivery DAO LLC, which secured $1M in seed funding). This dual experience—boardroom strategy and builder's execution—shapes every system Vuduvations designs.
        </p>
      </section>

      {/* What Vuduvations Builds */}
      <section>
        <h2 className="text-3xl font-bold mb-4">What Vuduvations Builds</h2>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Vuduvations specializes in <strong>bespoke AI solutions</strong> with production-ready architectures:
        </p>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border p-6 bg-card">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-lg">AI Discovery & Strategy</h3>
              <span className="inline-block text-xs text-blue-400 font-medium px-2 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">
                Multi-Agent
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              Production-ready multi-agent system providing multi-dimensional assessment frameworks that map opportunities, evaluate readiness, and project ROI for enterprises exploring AI adoption.
            </p>
            <span className="inline-block text-xs text-purple-400 font-medium">
              Phase 1: Demo Mode
            </span>
          </div>
          <div className="rounded-xl border p-6 bg-card">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-lg">Intelligent Automation</h3>
              <span className="inline-block text-xs text-blue-400 font-medium px-2 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">
                LangGraph
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              Production-ready LangGraph systems like our Reflexion ITIL demo, which iteratively refines change management documents through multi-agent critique using the Reflexion pattern.
            </p>
            <span className="inline-block text-xs text-purple-400 font-medium">
              Phase 1: Demo Mode
            </span>
          </div>
          <div className="rounded-xl border p-6 bg-card">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-lg">Operational Intelligence</h3>
              <span className="inline-block text-xs text-green-400 font-medium px-2 py-1 rounded-full bg-green-500/10 border border-green-500/20 flex items-center gap-1">
                <Zap className="h-3 w-3" />
                LangGraph
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              Real-time analysis tools that transform data streams into strategic decisions, like our Live Sales Call Analyzer with observable execution paths and cost tracking.
            </p>
            <span className="inline-block text-xs text-green-400 font-medium">
              Live Backend Connected
            </span>
          </div>
          <div className="rounded-xl border p-6 bg-card">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-lg">Financial Intelligence</h3>
              <span className="inline-block text-xs text-blue-400 font-medium px-2 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">
                LangGraph
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              Production-ready LangGraph multi-agent system for earnings analysis—from conversational AI that generated a 450% ROI for a local business to enterprise-grade consulting solutions.
            </p>
            <span className="inline-block text-xs text-purple-400 font-medium">
              Phase 1: Demo Mode
            </span>
          </div>
        </div>
      </section>

      {/* Current Phase - Transparency */}
      <section className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 border border-blue-500/20 rounded-xl p-8">
        <div className="flex items-start gap-4 mb-4">
          <div className="rounded-lg bg-blue-500/20 p-3">
            <Rocket className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-2">Phase 1: Building Critical Mass</h2>
            <p className="text-sm text-blue-400 font-medium">Production-Ready Architecture • Demo Mode Operation</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <p className="text-muted-foreground leading-relaxed">
            All VuduVations tools are architected with <strong className="text-foreground">production-grade AI backend designs</strong>:
          </p>
          
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-3">
              <span className="text-purple-400 font-mono text-lg">→</span>
              <span><strong className="text-foreground">LangGraph multi-agent architectures</strong> (Reflexion ITIL, Sales Call Analyzer, Earnings Intelligence)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-purple-400 font-mono text-lg">→</span>
              <span><strong className="text-foreground">Multi-agent system design</strong> (AI Discovery Dashboard)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-purple-400 font-mono text-lg">→</span>
              <span><strong className="text-foreground">Observable execution paths</strong> with cost tracking and multi-tier routing</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-purple-400 font-mono text-lg">→</span>
              <span><strong className="text-foreground">Enterprise-grade architecture</strong> ready for scale</span>
            </li>
          </ul>

          <p className="text-muted-foreground leading-relaxed pt-4">
            During Phase 1, we're focused on <strong className="text-foreground">building critical mass</strong> and gathering 
            feedback from early users. Most tools display <strong className="text-foreground">high-fidelity simulated results</strong> to 
            demonstrate functionality while managing API costs during the audience-building phase. Our <strong className="text-green-400">Live Sales Call Analyzer</strong> runs 
            with full backend connectivity as proof of our production architecture.
          </p>

          <div className="bg-background/50 rounded-lg p-4 mt-6 border border-purple-500/20">
            <div className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-purple-400 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-purple-400 mb-2">Phase 2: Full Activation & Monetization</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Full backend activation across all tools with authentication, usage tracking, and tiered pricing. 
                  Custom implementations and enterprise deployments available now for organizations ready to deploy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Cards */}
      <section>
        <h2 className="text-3xl font-bold mb-6 text-left">The Vuduvations Philosophy</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border p-6 bg-card">
            <h3 className="text-xl font-semibold mb-2">Intelligence</h3>
            <p className="text-sm text-muted-foreground">
              Every idea has a vector—a measurable direction in semantic space. Vuduvations designs systems that identify opportunities for <strong>human augmentation</strong>, where AI enhances capability instead of replacing it.
            </p>
          </div>
          <div className="rounded-xl border p-6 bg-card">
            <h3 className="text-xl font-semibold mb-2">Clarity</h3>
            <p className="text-sm text-muted-foreground">
              Insight should be visual, explorable, and actionable. Drawing on 10+ years in management consulting, Vuduvations applies structured problem-solving and analytical rigor to transform complex data into strategic clarity.
            </p>
          </div>
          <div className="rounded-xl border p-6 bg-card">
            <h3 className="text-xl font-semibold mb-2">Impact</h3>
            <p className="text-sm text-muted-foreground">
              From idea to implementation. The Vuduvations approach is that every project begins with an execution mindset, focusing on measurable outcomes: improving efficiency, revealing opportunity, and delivering real-world results through intelligent automation.
            </p>
          </div>
        </div>
      </section>

      {/* The VuduSuite */}
      <section>
        <h2 className="text-3xl font-bold mb-4">The VuduSuite</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          The studio's work is embodied in the <strong>VuduSuite</strong>—a collection of AI-powered applications that demonstrate our approach. Each tool is built with production-ready backends and designed to be functional, explorable, and instructive.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          From multi-agent strategy dashboards to self-improving document systems, the VuduSuite shows what's possible when you treat innovation as both discipline and craft. Currently in Phase 1 (audience building), most tools operate in demo mode while we gather feedback and prepare for full monetization in Phase 2.
        </p>
        <div className="mt-6">
          <Link href="/#apps" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-6">
            Explore the VuduSuite
          </Link>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="text-center py-8">
        <h2 className="text-3xl font-bold mb-4">Let's Build Something Intelligent</h2>
        <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-6">
          Vuduvations works with organizations and leaders who see AI not as a destination but as a capability—one that requires both strategic vision and tactical execution. Whether you need advisory on AI strategy, a working prototype to test an idea, or a full-stack innovation app to solve a specific problem, Vuduvations is here to help.
        </p>
        <p className="text-sm font-medium text-muted-foreground mb-8">
          Advisory • Prototypes • Full-Stack Innovation
        </p>
      </section>
    </div>
  );
}