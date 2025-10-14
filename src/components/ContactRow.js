// components/ContactRow.js

'use client';

import { useState } from 'react';
import { Mail, Github, Linkedin, Youtube } from "lucide-react";
import ContactModal from './ContactModal';

export default function ContactRow() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <section id="contact" className="mx-auto max-w-7xl px-4 py-12">
        <div className="rounded-2xl border p-6 md:p-8">
          <div className="mb-4 text-center">
            <h3 className="text-xl font-semibold">Let's Build Something Intelligent</h3>
            <p className="mt-1 text-sm text-muted-foreground">Advisory, prototypes, or full-stack innovation apps — say hello.</p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            >
              <Mail className="mr-2 h-4 w-4"/>
              Email
            </button>
            <a 
              href="https://github.com/VuduVations" 
              target="_blank" 
              rel="noreferrer" 
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
            >
              <Github className="mr-2 h-4 w-4"/>
              GitHub
            </a>
            <a 
              href="https://www.linkedin.com/company/vuduvations/" 
              target="_blank" 
              rel="noreferrer" 
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
            >
              <Linkedin className="mr-2 h-4 w-4"/>
              LinkedIn
            </a>
            <a 
              href="https://www.youtube.com/@vuduvations/featured" 
              target="_blank" 
              rel="noreferrer" 
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
            >
              <Youtube className="mr-2 h-4 w-4"/>
              YouTube
            </a>
          </div>
        </div>
      </section>

      {/* Contact Modal */}
      <ContactModal 
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        appName="General Inquiry"
        appIcon={<Mail className="w-8 h-8" />}
        benefits={[]}
        ctaText="Send Message"
      />
    </>
  );
}