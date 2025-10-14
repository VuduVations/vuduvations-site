// components/ContactModal.js
// Reusable contact modal component for all VuduSuite apps

import { useState } from 'react';
import { X, CheckCircle, Mail, User, MessageSquare, Sparkles } from 'lucide-react';

export default function ContactModal({ 
  isOpen, 
  onClose, 
  appName = "Custom Analysis",
  appIcon = null,
  benefits = [],
  ctaText = "Get Started"
}) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Create mailto link with form data
    const subject = encodeURIComponent(`${appName} - Custom Analysis Request`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}\n\n---\nRequested via: ${appName}`
    );
    
    // Open mailto link
    window.location.href = `mailto:hello@vuduvations.io?subject=${subject}&body=${body}`;

    // Show success state
    setTimeout(() => {
      setIsSubmitted(true);
      setIsSubmitting(false);
      
      // Reset and close after delay
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: '', email: '', message: '' });
        onClose();
      }, 2000);
    }, 500);
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 rounded-2xl border border-white/20 shadow-2xl max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors z-10"
        >
          <X className="w-5 h-5 text-white" />
        </button>

        {/* Header */}
        <div className="p-8 pb-6 text-center border-b border-white/10">
          <div className="flex items-center justify-center gap-3 mb-4">
            {appIcon && (
              <div className="text-blue-400">
                {appIcon}
              </div>
            )}
            <h2 className="text-3xl font-bold text-white">
              {appName}
            </h2>
          </div>
          <p className="text-gray-300 text-lg">
            Get a custom analysis tailored to your specific needs
          </p>
        </div>

        {/* Benefits Section */}
        {benefits.length > 0 && (
          <div className="p-8 pb-6">
            <h3 className="text-xl font-semibold text-white mb-4">What You'll Get:</h3>
            <div className="space-y-3">
              {benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-start gap-3 bg-white/5 p-4 rounded-lg border border-white/10">
                  <div className="text-green-400 mt-0.5 flex-shrink-0">
                    {benefit.icon || <CheckCircle className="w-5 h-5" />}
                  </div>
                  <p className="text-gray-200">{benefit.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Contact Form */}
        <div className="p-8 pt-6">
          {!isSubmitted ? (
            <div onSubmit={handleSubmit} className="space-y-4">
              {/* Name Field */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full pl-11 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Your name"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full pl-11 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="your.email@company.com"
                  />
                </div>
              </div>

              {/* Message Field */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Message (Optional)
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full pl-11 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="Tell us about your specific needs..."
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting || !formData.name || !formData.email}
                className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all flex items-center justify-center gap-2 ${
                  isSubmitting || !formData.name || !formData.email
                    ? 'bg-gradient-to-r from-blue-700 to-purple-700 cursor-not-allowed opacity-50'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                } text-white`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Mail className="w-5 h-5" />
                    {ctaText}
                  </>
                )}
              </button>

              <p className="text-xs text-gray-400 text-center">
                By submitting, you agree to be contacted about custom analysis services.
              </p>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 mb-4">
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
              <p className="text-gray-300">
                We'll get back to you shortly about your custom analysis.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
