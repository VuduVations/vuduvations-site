'use client';

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Sparkles, ArrowRight, Github, Linkedin, Mail, ExternalLink, Menu } from "lucide-react";
import { useState } from "react";

export default function VuduvationsHome() {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <Navigation />
      <Hero />
      <Philosophy />
      <ProjectHighlights />
      <BlogTeasers />
      <ContactRow />
      <Footer />
    </div>
  );
}

function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-semibold text-lg">
            <Sparkles className="h-5 w-5" />
            <span>Vuduvations</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="#apps" className="text-sm font-medium hover:text-foreground/80 transition-colors">
              Apps
            </Link>
            <Link href="#blog" className="text-sm font-medium hover:text-foreground/80 transition-colors">
              Blog
            </Link>
            <Link href="#partners" className="text-sm font-medium hover:text-foreground/80 transition-colors">
              Partners
            </Link>
            <Link href="#contact" className="text-sm font-medium hover:text-foreground/80 transition-colors">
              Contact
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-3 border-t">
            <Link
              href="#apps"
              className="block text-sm font-medium hover:text-foreground/80 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Apps
            </Link>
            <Link
              href="#blog"
              className="block text-sm font-medium hover:text-foreground/80 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Blog
            </Link>
            <Link
              href="#partners"
              className="block text-sm font-medium hover:text-foreground/80 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Partners
            </Link>
            <Link
              href="#contact"
              className="block text-sm font-medium hover:text-foreground/80 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        )}
      </div>
    </nav>
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
          <Sparkles className="h-4 w-4" /> Vuduvations — Independent Innovation Studio
        </div>
        <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-6xl">
          Where Ideas Become <span className="bg-gradient-to-r from-foreground/90 to-foreground/60 bg-clip-text text-transparent">Vectors</span>
        </h1>
        <p className="mt-5 mx-auto max-w-2xl text-lg text-muted-foreground">
          I build AI-powered applications that map, measure, and accelerate innovation. Explore the VuduSuite — a collective of tools that turns data into direction and direction into discovery.
        </p>
        <div className="mt-8 flex flex-wrap justify-center items-center gap-4">
          <Link href="#apps" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8">
            Explore the Apps
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
          <Link href="#partners" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 px-8">
            Partner with Me
          </Link>
        </div>
      </div>
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
      blurb: "Interactive AI strategy analysis for enterprises. Multi-dimensional assessment of AI opportunities with executive dashboards, use case mapping, and ROI projections.",
      href: "/ai-discovery",
      meta: "Active • v2.0",
      tags: ["CrewAI", "Multi-Agent", "Strategy"]
    },
    {
      title: "Reflexion ITIL Agent",
      blurb: "Self-improving AI for ITIL Change Management. Uses the Reflexion pattern to iteratively refine RFC documents through multi-agent critique and quality scoring.",
      href: "/reflexion-itil",
      meta: "Active • v3.0",
      tags: ["LangGraph", "Reflexion", "ITIL"]
    },
    {
      title: "Coming Soon",
      blurb: "Building intelligent systems that augment human capability. Next project in development — stay tuned.",
      href: "#",
      meta: "In Development",
      tags: ["AI", "Innovation"]
    },
  ];

  return (
    <section id="apps" className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold tracking-tight">VuduSuite Applications</h2>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <div key={i} className="rounded-2xl border bg-card text-card-foreground shadow-sm hover:shadow-lg transition-shadow">
            <div className="p-6 space-y-1.5">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold leading-none tracking-tight">{p.title}</h3>
                <span className="text-xs font-medium text-muted-foreground">{p.meta}</span>
              </div>
              <p className="text-sm text-muted-foreground">{p.blurb}</p>
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
          </div>
        ))}
      </div>
    </section>
  );
}

function BlogTeasers() {
  const posts = [
    {
      title: "Building in Public: The VuduSuite",
      excerpt: "Reflections on building AI applications as a solo founder. Lessons from consulting, design decisions, and the discipline of shipping.",
      href: "#",
      meta: "Coming Soon • Insight"
    },
    {
      title: "Vector Thinking: Ideas as Embeddings",
      excerpt: "How semantic space reveals innovation opportunities. A framework for measuring the distance between what is and what could be.",
      href: "#",
      meta: "Coming Soon • Framework"
    },
    {
      title: "Lab Notes: Reflexion Pattern",
      excerpt: "Behind-the-scenes on building self-improving AI agents. Implementation details, challenges, and insights from the ITIL demo.",
      href: "#",
      meta: "Coming Soon • Technical"
    },
  ];

  return (
    <section id="blog" className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold tracking-tight">From the Lab</h2>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((p, i) => (
          <div key={i} className="rounded-2xl border bg-card text-card-foreground shadow-sm">
            <div className="p-6 space-y-1.5">
              <h3 className="text-lg font-semibold leading-none tracking-tight">{p.title}</h3>
              <p className="text-xs text-muted-foreground">{p.meta}</p>
            </div>
            <div className="p-6 pt-0">
              <p className="mb-4 text-sm text-muted-foreground">{p.excerpt}</p>
              {p.href !== "#" ? (
                <Link href={p.href} className="inline-flex items-center text-sm font-medium hover:underline">
                  Read more
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              ) : (
                <span className="text-sm text-muted-foreground">Coming soon</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ContactRow() {
  return (
    <section id="contact" className="mx-auto max-w-7xl px-4 py-12">
      <div className="rounded-2xl border p-6 md:p-8">
        <div className="mb-4 text-center">
          <h3 className="text-xl font-semibold">Let's Build Something Intelligent</h3>
          <p className="mt-1 text-sm text-muted-foreground">Advisory, prototypes, or full-stack innovation apps — say hello.</p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a href="mailto:botvoodoo@gmail.com" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
            <Mail className="mr-2 h-4 w-4"/>
            Email
          </a>
          <a href="https://github.com/VuduVations" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
            <Github className="mr-2 h-4 w-4"/>
            GitHub
          </a>
          <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
            <Linkedin className="mr-2 h-4 w-4"/>
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="w-full border-t my-2"></div>
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Vuduvations. Built by a one-person studio.</p>
          <p className="text-[11px] text-muted-foreground">Design motif: semantic orbits · Code, data, and clarity.</p>
        </div>
      </div>
    </footer>
  );
}
