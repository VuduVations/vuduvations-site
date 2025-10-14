// src/app/about/page.js
'use client';

import Navigation from '@/components/Navigation';
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Sparkles, Mail, Github, Linkedin, ArrowLeft } from "lucide-react";
import { useState } from "react";
import ContactRow from '@/components/ContactRow';

export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <Navigation />
      <Hero />
      <AboutContent />
      <ContactRow />
      <Footer />
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
          Vuduvations is where strategic thinking meets intelligent execution. An innovation studio that architects AI-powered systems for organizations navigating the gap between what they know and what's possible. Our tagline—<strong>Ideas to Vectors</strong>—reflects Vuduvations philosophy: every challenge has a measurable direction, and every opportunity can be mapped, measured, and accelerated through intelligent design.
        </p>
      </section>

      {/* The Independent Advantage */}
      <section>
        <h2 className="text-3xl font-bold mb-4">The Independent Advantage</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Enterprise agencies bring process. In-house teams bring institutional knowledge. Independent studios bring something different: <strong>speed, focus, and synthesis</strong>. Vuduvations operate at the intersection of strategic advisory and hands-on execution—designing systems that solve real problems without the overhead of traditional consulting or the constraints of vendor lock-in.
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
          Vuduvations specializes in <strong>bespoke AI solutions</strong> that turn insight into action:
        </p>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border p-6 bg-card">
            <h3 className="font-semibold text-lg mb-2">AI Discovery & Strategy</h3>
            <p className="text-sm text-muted-foreground">
              Multi-dimensional assessment frameworks that map opportunities, evaluate readiness, and project ROI for enterprises exploring AI adoption
            </p>
          </div>
          <div className="rounded-xl border p-6 bg-card">
            <h3 className="font-semibold text-lg mb-2">Intelligent Automation</h3>
            <p className="text-sm text-muted-foreground">
              Self-improving agent systems like our Reflexion ITIL demo, which iteratively refines change management documents through multi-agent critique
            </p>
          </div>
          <div className="rounded-xl border p-6 bg-card">
            <h3 className="font-semibold text-lg mb-2">Operational Intelligence</h3>
            <p className="text-sm text-muted-foreground">
              Real-time analysis tools that transform data streams into strategic decisions, like our Live Sales Call Analyzer with observable execution paths and cost tracking
            </p>
          </div>
          <div className="rounded-xl border p-6 bg-card">
            <h3 className="font-semibold text-lg mb-2">Custom Innovation Apps</h3>
            <p className="text-sm text-muted-foreground">
              From conversational AI that generated a 450% ROI for a local business to enterprise-grade consulting solutions for continuous improvement
            </p>
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
              Every idea has a vector—a measurable direction in semantic space. VuduVations designs systems that identify opportunities for <strong>human augmentation</strong>, where AI enhances capability instead of replacing it.
            </p>
          </div>
          <div className="rounded-xl border p-6 bg-card">
            <h3 className="text-xl font-semibold mb-2">Clarity</h3>
            <p className="text-sm text-muted-foreground">
              Insight should be visual, explorable, and actionable. Drawing on 10 years in management consulting, VuduVations apply structured problem-solving and analytical rigor to transform complex data into strategic clarity.
            </p>
          </div>
          <div className="rounded-xl border p-6 bg-card">
            <h3 className="text-xl font-semibold mb-2">Impact</h3>
            <p className="text-sm text-muted-foreground">
              From idea to implementation. The Vuduvations approach is that every project begins an execution mindset, focusing on measurable outcomes: improving efficiency, revealing opportunity, and delivering real-world results through intelligent automation.
            </p>
          </div>
        </div>
      </section>

      {/* The VuduSuite */}
      <section>
        <h2 className="text-3xl font-bold mb-4">The VuduSuite</h2>
        <p className="text-muted-foreground leading-relaxed">
          The studio's work is embodied in the <strong>VuduSuite</strong>—a collection of AI-powered applications that demonstrate our approach. Each tool is a working prototype and a proof of concept, designed to be functional, explorable, and instructive. From multi-agent strategy dashboards to self-improving document systems, the VuduSuite shows what's possible when you treat innovation as both discipline and craft.
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

function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="w-full border-t my-2"></div>
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Vuduvations. Built by a one-person studio.</p>
          <p className="text-[11px] text-muted-foreground">Born of Vudu</p>
        </div>
      </div>
    </footer>
  );
}