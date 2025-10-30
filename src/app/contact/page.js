// src/app/contact/page.js
'use client';

import React, { useState } from 'react';
import UniversalHeader from '@/components/UniversalHeader';
import UnifiedFooter from '@/components/UnifiedFooter';
import { 
  Mail, 
  Send, 
  CheckCircle, 
  AlertCircle,
  Sparkles,
  Zap,
  Target,
  Users,
  Briefcase,
  Code
} from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    inquiryType: 'general',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        company: '',
        inquiryType: 'general',
        message: ''
      });
    } catch (error) {
      console.error('Contact form error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inquiryTypes = [
    { value: 'general', label: 'General Inquiry', icon: Mail },
    { value: 'advisory', label: 'AI Strategy & Advisory', icon: Target },
    { value: 'prototype', label: 'Rapid Prototyping', icon: Zap },
    { value: 'enterprise', label: 'Enterprise Solutions', icon: Briefcase },
    { value: 'partnership', label: 'Partnership Opportunities', icon: Users },
    { value: 'technical', label: 'Technical Question', icon: Code }
  ];

  const benefits = [
    {
      icon: <Sparkles className="w-5 h-5 text-purple-400" />,
      text: "Response within 24 business hours"
    },
    {
      icon: <Target className="w-5 h-5 text-blue-400" />,
      text: "Custom solutions tailored to your needs"
    },
    {
      icon: <Zap className="w-5 h-5 text-yellow-400" />,
      text: "Rapid prototyping and POC development"
    },
    {
      icon: <Users className="w-5 h-5 text-green-400" />,
      text: "Strategic advisory and hands-on execution"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-900">
      <UniversalHeader />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-900 py-20">
        <div className="relative mx-auto max-w-7xl px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Let's Build Something{' '}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Intelligent
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Whether you need strategic AI advisory, a working prototype, or a full-stack innovation app—we're here to help.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            
            {/* Left Column - Contact Form */}
            <div className="bg-slate-800 rounded-2xl border border-slate-700 p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Send us a message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="John Doe"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="john@company.com"
                  />
                </div>

                {/* Company */}
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                    Company / Organization
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="Acme Corp"
                  />
                </div>

                {/* Inquiry Type */}
                <div>
                  <label htmlFor="inquiryType" className="block text-sm font-medium text-gray-300 mb-2">
                    What can we help you with? *
                  </label>
                  <select
                    id="inquiryType"
                    name="inquiryType"
                    value={formData.inquiryType}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {inquiryTypes.map(type => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    rows={6}
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed resize-none"
                    placeholder="Tell us about your project or inquiry..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-white text-slate-900 font-semibold py-3 px-6 rounded-lg hover:bg-gray-200 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="h-5 w-5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-green-400 font-medium">Message sent successfully!</p>
                      <p className="text-green-300/70 text-sm mt-1">
                        We'll get back to you within 24 business hours.
                      </p>
                    </div>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-red-400 font-medium">Failed to send message</p>
                      <p className="text-red-300/70 text-sm mt-1">
                        Please try again or email us directly at hello@vuduvations.io
                      </p>
                    </div>
                  </div>
                )}
              </form>
            </div>

            {/* Right Column - Info & Benefits */}
            <div className="space-y-8">
              
              {/* What to Expect */}
              <div className="bg-slate-800 rounded-2xl border border-slate-700 p-8">
                <h3 className="text-xl font-bold text-white mb-6">What to expect</h3>
                <div className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        {benefit.icon}
                      </div>
                      <p className="text-gray-400">{benefit.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Direct Contact */}
              <div className="bg-slate-800 rounded-2xl border border-slate-700 p-8">
                <h3 className="text-xl font-bold text-white mb-4">Prefer email?</h3>
                <p className="text-gray-400 mb-6">
                  Reach us directly and we'll respond within 24 business hours.
                </p>
                <a
                  href="mailto:hello@vuduvations.io"
                  className="inline-flex items-center gap-2 text-white hover:text-gray-300 transition-colors font-medium"
                >
                  <Mail className="w-5 h-5" />
                  hello@vuduvations.io
                </a>
              </div>

              {/* Services Overview */}
              <div className="bg-slate-800 rounded-2xl border border-slate-700 p-8">
                <h3 className="text-xl font-bold text-white mb-4">How we can help</h3>
                <div className="space-y-3 text-sm text-gray-400">
                  <div className="flex items-start gap-2">
                    <span className="text-white mt-1">•</span>
                    <span><strong className="text-white">AI Strategy & Advisory:</strong> Navigate your AI transformation with experienced guidance</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-white mt-1">•</span>
                    <span><strong className="text-white">Rapid Prototyping:</strong> Test ideas quickly with working prototypes</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-white mt-1">•</span>
                    <span><strong className="text-white">Full-Stack Innovation:</strong> Custom AI applications from concept to production</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-white mt-1">•</span>
                    <span><strong className="text-white">White-Label Solutions:</strong> Partner with us to extend your service offerings</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-slate-900">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to explore the VuduSuite?
          </h2>
          <p className="text-gray-400 mb-8">
            Check out our AI-powered applications and see what's possible.
          </p>
          <a
            href="/#apps"
            className="inline-flex items-center justify-center bg-white text-slate-900 font-semibold py-3 px-8 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Explore VuduSuite
          </a>
        </div>
      </section>

      <UnifiedFooter />
    </div>
  );
}