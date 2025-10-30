// src/app/page.js
'use client';

import UniversalHeader from '../components/UniversalHeader';
import UnifiedFooter from '../components/UnifiedFooter';
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Sparkles, ArrowRight, Github, Linkedin, Mail, ExternalLink, Menu, Zap, FlaskConical } from "lucide-react";
import { useState } from "react";
import ContactRow from '../components/ContactRow';

export default function VuduVationsHome() {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <UniversalHeader />
      <Hero />
      <ProductionStatusBanner />
      <Philosophy />
      <ProjectHighlights />
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
            {[...Array(18)].map((_, i) => (
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

      <div className="mx-auto max-w-7xl px-4 py-24 md:py-32 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm text-muted-foreground">
          <Sparkles className="h-4 w-4" /> VuduVations — Independent Innovation Studio
        </div>
        <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-6xl">
          Where Ideas Become <span className="bg-gradient-to-r from-foreground/90 to-foreground/60 bg-clip-text text-transparent">Vectors</span>
        </h1>
        <p className="mt-5 mx-auto max-w-2xl text-lg text-muted-foreground">
          Operating at the intersection of strategic advisory and hands-on execution—designing systems that solve real problems without the overhead of traditional consulting or the constraints of vendor lock-in.
        </p>
        <div className="mt-8 flex flex-wrap justify-center items-center gap-4">
          <Link href="#apps" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8">
            Explore the Apps
            
          </Link>
          <Link href="/partners" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8">
            Partners

          </Link>
        </div>
      </div>
    </section>
  );
}

function ProductionStatusBanner() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="rounded-xl border border-blue-500/20 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 p-6 backdrop-blur-sm"
      >
        <div className="flex items-start gap-4">
          <div className="rounded-lg bg-blue-500/20 p-2 mt-1">
            <Zap className="h-5 w-5 text-blue-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-blue-400 mb-2 flex items-center gap-2">
              Production-Ready Architecture, Demo Mode Operation
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              All VuduVations tools are built with <strong className="text-foreground">production-grade AI backends</strong> — 
              3 LangGraph multi-agent systems and 1 CrewAI orchestration. During our audience-building phase (Phase 1), 
              most tools display <strong className="text-foreground">high-fidelity simulated results</strong> to manage API costs 
              while we gather feedback and build critical mass.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-400"></div>
                <span className="text-muted-foreground">
                  <strong className="text-green-400">Live Sales Call Analyzer</strong> — Full backend connectivity
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-blue-400"></div>
                <span className="text-muted-foreground">
                  <strong className="text-blue-400">Other Tools</strong> — Production-ready backends in demo mode
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-purple-400"></div>
                <span className="text-muted-foreground">
                  <strong className="text-purple-400">Phase 2</strong> — Full activation with monetization
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function Philosophy() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <div className="grid gap-8 md:grid-cols-3">
        <div className="rounded-2xl border bg-card text-card-foreground shadow-sm">
          <div className="p-6 space-y-1.5">
            <h3 className="text-2xl font-semibold leading-none tracking-tight">Intelligence</h3>
            <p className="text-sm text-muted-foreground">Every idea has a vector — a measurable direction in semantic space.</p>
          </div>
          <div className="p-6 pt-0">
            <p className="text-sm text-muted-foreground">
              I design systems that identify opportunities for human augmentation — where augmented intelligence enhances human capability instead of replacing it.
            </p>
          </div>
        </div>
        
        <div className="rounded-2xl border bg-card text-card-foreground shadow-sm">
          <div className="p-6 space-y-1.5">
            <h3 className="text-2xl font-semibold leading-none tracking-tight">Clarity</h3>
            <p className="text-sm text-muted-foreground">Insight should be visual, explorable, and actionable.</p>
          </div>
          <div className="p-6 pt-0">
            <p className="text-sm text-muted-foreground">
              Drawing on over 15 years in management consulting, I apply structured problem-solving, analytical rigor, and strategic clarity to every system I build. Each app embodies the discipline of consulting best practices — transforming complex data into clear, strategic insight that drives intelligent decisions.
            </p>
          </div>
        </div>
        
        <div className="rounded-2xl border bg-card text-card-foreground shadow-sm">
          <div className="p-6 space-y-1.5">
            <h3 className="text-2xl font-semibold leading-none tracking-tight">Impact</h3>
            <p className="text-sm text-muted-foreground">From idea to implementation.</p>
            <p className="text-xs italic text-muted-foreground mt-1">Strategic execution through intelligent design.</p>
          </div>
          <div className="p-6 pt-0">
            <p className="text-sm text-muted-foreground">
              Building on a foundation of operational excellence and consulting discipline, I approach every project with an execution mindset — turning strategy into action. Each build focuses on measurable outcomes: improving efficiency, revealing opportunity, and delivering real-world results through intelligent automation and design.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectHighlights() {
  const projects = [
    {
      title: "AI Discovery Dashboard",
      blurb: "Interactive AI strategy analysis for enterprises. Production-ready CrewAI multi-agent system with multi-dimensional assessment, executive dashboards, use case mapping, and ROI projections.",
      href: "/ai-discovery",
      meta: "Active • v2.0",
      status: "demo",
      tags: ["CrewAI", "Multi-Agent", "Strategy"],
      backend: "Production-Ready"
    },
    {
      title: "Reflexion ITIL Agent",
      blurb: "Self-improving AI for ITIL Change Management. Powered by Llama 3.2 3B using the Reflexion pattern to iteratively analyze, critique, and refine RFC documents through automated quality scoring.",
      href: "/reflexion-itil",
      meta: "Active • v3.0",
      status: "demo",
      tags: ["Llama 3.2 3B", "Reflexion", "ITIL"],
      backend: "Production-Ready"
    },
    {
      title: "Live Sales Call Analyzer",
      blurb: "Real-time LangGraph multi-tier intelligence for sales transcript analysis. Observable execution path with cost tracking and conditional routing across GPT-4 and Claude tiers. Fully connected backend demonstrating production architecture.",
      href: "/consulting-analyzer",
      meta: "Active • v1.0",
      status: "live",
      tags: ["LangGraph", "Multi-Tier", "Consulting"],
      backend: "Live Backend"
    },
    {
      title: "Earnings Intelligence Platform",
      blurb: "Bloomberg-inspired intelligence at zero API cost. Powered by Llama 3.1 8B for professional multi-quarter analysis with sentiment tracking, strategic insights, and transparent scoring—all processing locally.",
      href: "/earnings-analyzer",
      meta: "Active • v1.0",
      status: "demo",
      tags: ["Llama 3.1 8B", "Whisper Medium", "Zero API Costs", "Private", "Sentiment Analysis", "Theme Extraction", "Local LLM" ],
      backend: "Production-Ready"
    },
  ];

  return (
    <section id="apps" className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold tracking-tight">VuduSuite Applications</h2>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
        {projects.map((p, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="rounded-2xl border bg-card text-card-foreground shadow-sm hover:shadow-lg transition-shadow"
          >
            <div className="p-6 space-y-1.5">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold leading-none tracking-tight">{p.title}</h3>
                <div className="flex items-center gap-2">
                  {p.status === "live" ? (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-500/10 text-green-500 text-xs font-semibold border border-green-500/20">
                      <Zap className="h-3 w-3" />
                      Live
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-semibold border border-blue-500/20">
                      <FlaskConical className="h-3 w-3" />
                      Demo
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-muted-foreground">{p.meta}</span>
                <span className="text-xs text-muted-foreground">•</span>
                <span className="text-xs font-medium text-purple-400">{p.backend}</span>
              </div>
              <p className="text-sm text-muted-foreground pt-2">{p.blurb}</p>
              <div className="flex flex-wrap gap-2 pt-2">
                {p.tags.map((tag, idx) => (
                  <span key={idx} className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="p-6 pt-0">
              {p.href === "#" ? (
                <button disabled className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                  Coming Soon
                </button>
              ) : (
                <Link href={p.href} className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                  Open
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}