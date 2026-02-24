import { Metadata } from "next";
import Image from "next/image";
import about from "../../data/about.json";
import seoMetadata from "@/data/seometadata.json";
import { MapPin } from "lucide-react";

import { JsonLd, generateAboutPageSchema } from "@/components/seo/JsonLd";
import "./about.css";

export const metadata: Metadata = {
  title: seoMetadata.pages.about.title,
  description: seoMetadata.pages.about.description,
  keywords: seoMetadata.pages.about.keywords,
  alternates: {
    canonical: seoMetadata.pages.about.canonical,
  },
  openGraph: {
    title: seoMetadata.pages.about.title,
    description: seoMetadata.pages.about.description,
    url: seoMetadata.siteUrl + seoMetadata.pages.about.canonical,
    images: [
      {
        url: seoMetadata.ogImage,
        width: 1200,
        height: 630,
        alt: "About Dinesh Bajgain - Full Stack Developer",
      },
    ],
  },
  twitter: {
    title: seoMetadata.pages.about.title,
    description: seoMetadata.pages.about.description,
    images: [seoMetadata.ogImage],
  },
};

export default function AboutPage() {
  const aboutPageSchema = generateAboutPageSchema({
    siteUrl: seoMetadata.siteUrl,
    personName: about.name,
    jobTitle: about.role,
    description: seoMetadata.pages.about.description,
  });

  return (
    <main className="about-page" id="about">
      <JsonLd data={aboutPageSchema} />
      {/* Hero Section */}
      <section className="about-hero">
        <div className="hero-content">
          <span className="hero-greeting">Hello, I&apos;m</span>
          <h1 className="hero-name">{about.name}</h1>
          <p className="hero-role">{about.role}</p>
          <p className="hero-tagline">{about.tagline}</p>
          <div className="hero-location">
            <MapPin size={16} />
            <span>{about.location}</span>
          </div>
        </div>
      </section>
      {/* Your Story Section */}
      <section className="about-section story-section">
        <div className="section-container">
          <div className="section-header">
            <Image
              src="/profile.jpeg"
              alt="Dinesh Bajgain - Full Stack Developer and AI/ML Enthusiast from Nepal"
              width={28}
              height={28}
              className="section-icon-photo"
              title="Dinesh Bajgain"
            />
            <h1 className="section-title">My Story</h1>
          </div>
          <div className="story-content">
            <p className="story-text">{about.bio}</p>
            <p className="story-text">{about.detailedBio}</p>
          </div>
        </div>
      </section>
    </main>
  );
}
