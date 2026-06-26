import React from "react";
import { Metadata } from "next";
import {
  Mail,
  Send,
  MapPin,
  Linkedin,
  Github,
  Instagram,
  Facebook,
  Twitter,
} from "lucide-react";
import seoMetadata from "@/data/seometadata.json";
import { JsonLd, generateContactPageSchema } from "@/components/seo/JsonLd";
import "./contact.css";

export const metadata: Metadata = {
  title: seoMetadata.pages.contact.title,
  description: seoMetadata.pages.contact.description,
  keywords: seoMetadata.pages.contact.keywords,
  robots: { index: false, follow: false },
  alternates: {
    canonical: seoMetadata.pages.contact.canonical,
  },
  openGraph: {
    title: seoMetadata.pages.contact.title,
    description: seoMetadata.pages.contact.description,
    url: seoMetadata.siteUrl + seoMetadata.pages.contact.canonical,
    images: [
      {
        url: seoMetadata.ogImage,
        width: 1200,
        height: 630,
        alt: "Contact Dinesh Bajgain",
      },
    ],
  },
  twitter: {
    title: seoMetadata.pages.contact.title,
    description: seoMetadata.pages.contact.description,
    images: [seoMetadata.ogImage],
  },
};

export default function ContactPage() {
  const contactPageSchema = generateContactPageSchema({
    siteUrl: seoMetadata.siteUrl,
  });

  return (
    <main className="contact-main">
      <JsonLd data={contactPageSchema} />
      <section className="contact-section" id="contact">
        <div className="contact-container">
          {/* Header */}
          <div className="contact-header">
            <span className="contact-greeting">Get in Touch</span>
            <h1 className="contact-title">Let&apos;s Work Together</h1>
            <p className="contact-subtitle">
              Have a project in mind or just want to connect? Let’s talk.
            </p>
          </div>

          <div className="contact-content">
            {/* Contact Form */}
            <div className="contact-form-wrapper" data-reveal="fade-right">
              <form
                className="contact-form"
                action="https://formspree.io/f/mgooyajl"
                method="POST"
              >
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    placeholder="What's this about?"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="Tell me about your project..."
                    required
                  />
                </div>
                <button type="submit" className="btn-submit">
                  <Send size={16} />
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="contact-info" data-reveal="fade-left" style={{ transitionDelay: "0.15s" }}>
              <a
                href="mailto:dinesh.bazgain@gmail.com"
                className="info-card clickable"
              >
                <Mail className="info-icon" size={40} />
                <div className="info-content">
                  <h3>Email</h3>
                  <span>dinesh.bazgain@gmail.com</span>
                </div>
              </a>
              <div className="info-card">
                <MapPin className="info-icon" size={40} />
                <div className="info-content">
                  <h3>Location</h3>
                  <span>Available for remote work worldwide</span>
                </div>
              </div>

              <div className="social-links">
                <a
                  href="https://github.com/dinesh-bajgain-dev"
                  target="_blank"
                  rel="noopener noreferrer me"
                  className="social-link"
                  aria-label="Dinesh Bajgain GitHub Profile"
                >
                  <Github size={28} strokeWidth={1} />
                  <span className="sr-only">Dinesh Bajgain GitHub</span>
                </a>

                <a
                  href="https://www.linkedin.com/in/dinesh-bajgain"
                  target="_blank"
                  rel="noopener noreferrer me"
                  className="social-link"
                  aria-label="Dinesh Bajgain LinkedIn Profile"
                >
                  <Linkedin size={28} strokeWidth={1} />
                  <span className="sr-only">Dinesh Bajgain LinkedIn</span>
                </a>

                <a
                  href="https://x.com/dinesh__bajgain"
                  target="_blank"
                  rel="noopener noreferrer me"
                  className="social-link"
                  aria-label="Dinesh Bajgain Twitter Profile"
                >
                  <Twitter size={28} strokeWidth={1} />
                  <span className="sr-only">Dinesh Bajgain Twitter</span>
                </a>

                <a
                  href="https://instagram.com/mr.bajgain"
                  target="_blank"
                  rel="noopener noreferrer me"
                  className="social-link"
                  aria-label="Dinesh Bajgain Instagram Profile"
                >
                  <Instagram size={28} strokeWidth={1} />
                  <span className="sr-only">Dinesh Bajgain Instagram</span>
                </a>

                <a
                  href="https://facebook.com/mr.bajgain"
                  target="_blank"
                  rel="noopener noreferrer me"
                  className="social-link"
                  aria-label="Dinesh Bajgain Facebook Profile"
                >
                  <Facebook size={28} strokeWidth={1} />
                  <span className="sr-only">Dinesh Bajgain Facebook</span>
                </a>
              </div>

              <p className="response-note">
                I typically respond within 24-48 hours
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
