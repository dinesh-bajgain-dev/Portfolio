import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import skills from "@/data/skills.json";
import seoMetadata from "@/data/seometadata.json";
import {
  JsonLd,
  generateSkillsPageSchema,
  generateServiceSchema,
} from "@/components/seo/JsonLd";
import "./Skills.css";

export const metadata: Metadata = {
  title: seoMetadata.pages.skills.title,
  description: seoMetadata.pages.skills.description,
  keywords: seoMetadata.pages.skills.keywords,
  robots: { index: false, follow: false },
  alternates: {
    canonical: seoMetadata.pages.skills.canonical,
  },
  openGraph: {
    title: seoMetadata.pages.skills.title,
    description: seoMetadata.pages.skills.description,
    url: seoMetadata.siteUrl + seoMetadata.pages.skills.canonical,
    images: [
      {
        url: seoMetadata.ogImage,
        width: 1200,
        height: 630,
        alt: "Skills - Dinesh Bajgain",
      },
    ],
  },
  twitter: {
    title: seoMetadata.pages.skills.title,
    description: seoMetadata.pages.skills.description,
    images: [seoMetadata.ogImage],
  },
};

export default function Skills() {
  // Extract all skill names for schema
  const allSkillNames = Object.values(skills)
    .flat()
    .map((skill) => skill.name);

  const skillsPageSchema = generateSkillsPageSchema({
    siteUrl: seoMetadata.siteUrl,
    skills: allSkillNames,
  });

  const serviceSchema = generateServiceSchema({
    serviceName: "Full Stack Web Development",
    description:
      "Professional web development services using React, Next.js, Node.js, and modern technologies",
    provider: seoMetadata.siteAuthor,
    siteUrl: seoMetadata.siteUrl,
  });

  return (
    <>
      <JsonLd data={skillsPageSchema} />
      <JsonLd data={serviceSchema} />
      <section className="skills-section" id="skills">
        <div className="skills-container">
          <h1 className="skills-main-title">Technical Skills</h1>

          <div className="skills-grid">
            {Object.entries(skills).map(([category, items], index) => (
              <div
                key={index}
                className="skill-category-card"
                data-reveal
                style={{ transitionDelay: `${index * 0.08}s` }}
              >
                <div className="category-header">
                  <h2 className="category-title">{category}</h2>
                  <div className="category-accent"></div>
                </div>
                <div className="skills-items-grid">
                  {items.map((skill, idx) => (
                    <div key={idx} className="skill-item">
                      <div className="skill-icon-wrapper">
                        <Image
                          src={skill.icon}
                          alt={skill.name}
                          width={60}
                          height={60}
                          className="skill-icon-img"
                        />
                      </div>
                      <span className="skill-name">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
