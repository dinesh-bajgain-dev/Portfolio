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
  robots: { index: false, follow: false },
  alternates: {
    canonical: seoMetadata.pages.about.canonical,
  },
  openGraph: {
    title: seoMetadata.pages.about.title,
    description: seoMetadata.pages.about.description,
    url: seoMetadata.siteUrl + seoMetadata.pages.about.canonical,
    images: [
      {
        url: `${seoMetadata.siteUrl}${seoMetadata.portraitImage}`,
        width: 4000,
        height: 6000,
        alt: "Portrait of Dinesh Bajgain - Full Stack Developer and AI/ML Enthusiast",
      },
      {
        url: `${seoMetadata.siteUrl}/profile.jpeg`,
        width: 600,
        height: 600,
        alt: "Profile picture of Dinesh Bajgain",
      },
    ],
  },
  twitter: {
    title: seoMetadata.pages.about.title,
    description: seoMetadata.pages.about.description,
    images: [
      `${seoMetadata.siteUrl}${seoMetadata.portraitImage}`,
      `${seoMetadata.siteUrl}/profile.jpeg`,
    ],
  },
};

export default function AboutPage() {
  const aboutPageSchema = generateAboutPageSchema({
    siteUrl: seoMetadata.siteUrl,
    personName: about.name,
    jobTitle: about.role,
    description: seoMetadata.pages.about.description,
  });
  const profilePageSchema = seoMetadata.structuredData.profilePage;

  return (
    <main className="about-page" id="about">
      <JsonLd data={aboutPageSchema} />
      <JsonLd data={profilePageSchema} />
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
              fetchPriority="high"
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
