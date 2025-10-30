// src/app/partners/page.js
'use client';

import UniversalHeader from '@/components/UniversalHeader';
import UnifiedFooter from '@/components/UnifiedFooter';
import React, { useState } from "react";
import { Sparkles, Cpu, Zap, Code, Cloud, Palette, Shield, Handshake, Target, Users, Briefcase } from "lucide-react";
import ContactModal from '@/components/ContactModal';

export default function PartnershipsPage() {
  const [showModal, setShowModal] = useState(false);

  const partnershipBenefits = [
    { 
      text: "Access to cutting-edge AI implementation expertise without building an in-house team",
      icon: <Sparkles className="w-5 h-5 text-purple-400" />
    },
    { 
      text: "White-label AI solutions for consulting firms and system integrators",
      icon: <Shield className="w-5 h-5 text-cyan-400" />
    },
    { 
      text: "Rapid prototyping and MVP development for venture studios and accelerators",
      icon: <Zap className="w-5 h-5 text-yellow-400" />
    },
    { 
      text: "Strategic AI advisory for enterprises navigating digital transformation",
      icon: <Target className="w-5 h-5 text-green-400" />
    }
  ];

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <UniversalHeader />

      <div className="mx-auto max-w-7xl px-4 py-16">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight md:text-6xl mb-4">
            Technology & <span className="bg-gradient-to-r from-foreground/90 to-foreground/60 bg-clip-text text-transparent">Partnerships</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Built on best-in-class AI infrastructure. Open to strategic collaborations.
          </p>
        </div>
     

        {/* Technology Stack Section */}
        <section className="mb-20">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold mb-3">Technology Ecosystem</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The VuduSuite is powered by industry-leading AI models, frameworks, and infrastructure
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* AI Models */}
            <div className="rounded-2xl border bg-card text-card-foreground shadow-sm p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-lg bg-blue-500/10">
                  <Cpu className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold">AI Models</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <div>
                    <div className="font-medium">Claude (Anthropic)</div>
                    <div className="text-sm text-muted-foreground">Advanced reasoning and analysis</div>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <div>
                    <div className="font-medium">GPT-4 (OpenAI)</div>
                    <div className="text-sm text-muted-foreground">Multi-tier intelligence routing</div>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <div>
                    <div className="font-medium">Gemini (Google)</div>
                    <div className="text-sm text-muted-foreground">Multimodal AI capabilities</div>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <div>
                    <div className="font-medium">Open Source Models</div>
                    <div className="text-sm text-muted-foreground">Llama, Mistral via HuggingFace</div>
                  </div>
                </li>
              </ul>
            </div>

            {/* Frameworks */}
            <div className="rounded-2xl border bg-card text-card-foreground shadow-sm p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-lg bg-purple-500/10">
                  <Code className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold">Frameworks</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <div>
                    <div className="font-medium">LangGraph</div>
                    <div className="text-sm text-muted-foreground">Multi-agent orchestration</div>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <div>
                    <div className="font-medium">LangChain</div>
                    <div className="text-sm text-muted-foreground">LLM application development</div>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <div>
                    <div className="font-medium">CrewAI</div>
                    <div className="text-sm text-muted-foreground">Collaborative AI agents</div>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <div>
                    <div className="font-medium">BeeAI</div>
                    <div className="text-sm text-muted-foreground">Agent framework</div>
                  </div>
                </li>
              </ul>
            </div>

            {/* Vector & Embeddings */}
            <div className="rounded-2xl border bg-card text-card-foreground shadow-sm p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-lg bg-pink-500/10">
                  <Palette className="h-6 w-6 text-pink-400" />
                </div>
                <h3 className="text-xl font-semibold">Vector & Embeddings</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <div>
                    <div className="font-medium">ChromaDB</div>
                    <div className="text-sm text-muted-foreground">Vector database</div>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <div>
                    <div className="font-medium">FAISS</div>
                    <div className="text-sm text-muted-foreground">Vector similarity search</div>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <div>
                    <div className="font-medium">HuggingFace</div>
                    <div className="text-sm text-muted-foreground">Model hub and embeddings</div>
                  </div>
                </li>
              </ul>
            </div>

            {/* Infrastructure */}
            <div className="rounded-2xl border bg-card text-card-foreground shadow-sm p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-lg bg-cyan-500/10">
                  <Cloud className="h-6 w-6 text-cyan-400" />
                </div>
                <h3 className="text-xl font-semibold">Infrastructure</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <div>
                    <div className="font-medium">Next.js / React</div>
                    <div className="text-sm text-muted-foreground">Modern web applications</div>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <div>
                    <div className="font-medium">Google Cloud Platform</div>
                    <div className="text-sm text-muted-foreground">Scalable cloud infrastructure</div>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <div>
                    <div className="font-medium">Vertex AI</div>
                    <div className="text-sm text-muted-foreground">Enterprise ML platform</div>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <div>
                    <div className="font-medium">Cloudflare</div>
                    <div className="text-sm text-muted-foreground">Edge computing and security</div>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <div>
                    <div className="font-medium">Tailwind / shadcn/ui</div>
                    <div className="text-sm text-muted-foreground">Beautiful, accessible design</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Partnership Opportunities */}
        <section className="mb-20">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold mb-3">Partnership Opportunities</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Strategic collaboration models for organizations seeking AI expertise
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Consulting Firms */}
            <div className="rounded-2xl border bg-card text-card-foreground shadow-sm p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <Briefcase className="h-8 w-8 text-orange-400" />
                <h3 className="text-2xl font-semibold">Consulting Firms</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                White-label AI solutions and strategic advisory for your enterprise clients. Extend your service offerings without building internal AI capabilities.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Custom AI strategy and implementation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>White-label delivery under your brand</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Fractional AI Leadership for your clients</span>
                </li>
              </ul>
            </div>

            {/* System Integrators */}
            <div className="rounded-2xl border bg-card text-card-foreground shadow-sm p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <Zap className="h-8 w-8 text-yellow-400" />
                <h3 className="text-2xl font-semibold">System Integrators</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Partner on enterprise AI implementations. Bring deep AI expertise to your large-scale transformation projects.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>AI architecture and implementation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Integration with existing enterprise systems</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Ongoing optimization and support</span>
                </li>
              </ul>
            </div>

            {/* Venture Studios */}
            <div className="rounded-2xl border bg-card text-card-foreground shadow-sm p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <Target className="h-8 w-8 text-green-400" />
                <h3 className="text-2xl font-semibold">Venture Studios</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Rapid prototyping and MVP development for your portfolio companies. Turn AI concepts into functional products quickly.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>0-to-1 product development</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Technical due diligence on AI ventures</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Fractional AI Leadership for early-stage companies</span>
                </li>
              </ul>
            </div>

            {/* Enterprises */}
            <div className="rounded-2xl border bg-card text-card-foreground shadow-sm p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <Users className="h-8 w-8 text-blue-400" />
                <h3 className="text-2xl font-semibold">Enterprise Teams</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Strategic AI advisory and custom application development. Navigate your AI transformation with experienced guidance.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>AI strategy and Governance</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Rapid PoC Development</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Vendor evaluation and technology selection</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="rounded-2xl border bg-gradient-to-r from-primary/10 to-primary/5 p-8 md:p-12 text-center">
          <Handshake className="h-12 w-12 mx-auto mb-4 text-purple-400" />
          <h2 className="text-3xl font-bold mb-4">Let's Explore a Partnership</h2>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            Whether you're looking to extend your service offerings, accelerate a portfolio company, 
            or transform your enterprise with AI—let's discuss how we can work together.
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8"
          >
            Discuss Partnership Opportunities
          </button>
        </section>

      </div>

      {/* Contact Modal */}
      <ContactModal 
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        appName="Partnership Inquiry"
        appIcon={<Handshake className="w-8 h-8 text-purple-400" />}
        benefits={partnershipBenefits}
        ctaText="Send Partnership Inquiry"
      />

      {/* Footer */}
      <UnifiedFooter />
    </div>
  );
}