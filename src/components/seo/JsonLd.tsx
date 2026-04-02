import React from "react";

type JsonLdProps = {
  data: Record<string, unknown>;
};

/**
 * Reusable JSON-LD structured data component for SEO
 */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  );
}

/**
 * Generate Article/BlogPosting schema for project pages
 */
export function generateProjectSchema({
  title,
  description,
  slug,
  tags,
  codeRepository,
  liveUrl,
  datePublished,
  dateModified,
  authorName = "Dinesh Bajgain",
  siteUrl = "https://www.dinesh-bajgain.com.np",
}: {
  title: string;
  description: string;
  slug: string;
  tags?: string[];
  codeRepository?: string;
  liveUrl?: string;
  datePublished?: string;
  dateModified?: string;
  authorName?: string;
  siteUrl?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: title,
    description: description,
    url: `${siteUrl}/project/${slug}`,
    isPartOf: {
      "@type": "WebSite",
      url: siteUrl,
    },
    author: {
      "@type": "Person",
      name: authorName,
      url: siteUrl,
    },
    dateCreated: datePublished || new Date().toISOString(),
    dateModified: dateModified || new Date().toISOString(),
    programmingLanguage: tags || [],
    codeRepository: codeRepository || `${siteUrl}/project/${slug}`,
    sameAs: liveUrl ? [liveUrl] : undefined,
    applicationCategory: "WebApplication",
  };
}

/**
 * Generate Service schema for skills page
 */
export function generateServiceSchema({
  serviceName,
  description,
  provider,
  siteUrl = "https://www.dinesh-bajgain.com.np",
}: {
  serviceName: string;
  description: string;
  provider: string;
  siteUrl?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: serviceName,
    name: serviceName,
    description: description,
    provider: {
      "@type": "Person",
      name: provider,
      url: siteUrl,
    },
    areaServed: {
      "@type": "Place",
      name: "Worldwide",
    },
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: `${siteUrl}/contact`,
    },
  };
}

/**
 * Generate ItemList schema for projects collection
 */
export function generateProjectListSchema({
  projects,
  siteUrl = "https://www.dinesh-bajgain.com.np",
}: {
  projects: Array<{ title: string; slug: string; description: string }>;
  siteUrl?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Portfolio Projects",
    description:
      "Collection of web development and AI/ML projects by Dinesh Bajgain",
    numberOfItems: projects.length,
    itemListElement: projects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: project.title,
      description: project.description,
      url: `${siteUrl}/project/${project.slug}`,
    })),
  };
}

/**
 * Generate ContactPage schema
 */
export function generateContactPageSchema({
  siteUrl = "https://www.dinesh-bajgain.com.np",
  email = "dinesh.bazgain@gmail.com",
}: {
  siteUrl?: string;
  email?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Dinesh Bajgain",
    description:
      "Get in touch with Dinesh Bajgain for freelance projects, remote work, or collaboration.",
    url: `${siteUrl}/contact`,
    mainEntity: {
      "@type": "Person",
      name: "Dinesh Bajgain",
      email: `mailto:${email}`,
      url: siteUrl,
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        email: email,
        availableLanguage: ["English", "Nepali"],
      },
    },
  };
}

/**
 * Generate AboutPage schema
 */
export function generateAboutPageSchema({
  siteUrl = "https://www.dinesh-bajgain.com.np",
  personName = "Dinesh Bajgain",
  jobTitle = "Full Stack Developer & AI/ML Enthusiast",
  description,
}: {
  siteUrl?: string;
  personName?: string;
  jobTitle?: string;
  description?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: `About ${personName}`,
    description: description || `Learn about ${personName} - ${jobTitle}`,
    url: `${siteUrl}/about`,
    mainEntity: {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: personName,
      jobTitle: jobTitle,
      url: siteUrl,
    },
  };
}

/**
 * Generate CollectionPage schema for skills
 */
export function generateSkillsPageSchema({
  siteUrl = "https://www.dinesh-bajgain.com.np",
  skills,
}: {
  siteUrl?: string;
  skills: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Technical Skills - Dinesh Bajgain",
    description: "Comprehensive list of technical skills and expertise",
    url: `${siteUrl}/skills`,
    mainEntity: {
      "@type": "ItemList",
      name: "Technical Skills",
      numberOfItems: skills.length,
      itemListElement: skills.map((skill, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: skill,
      })),
    },
  };
}

/**
 * Generate HowTo schema for portfolio (good for rich snippets)
 */
export function generateHowToHireSchema({
  siteUrl = "https://www.dinesh-bajgain.com.np",
}: {
  siteUrl?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Hire Dinesh Bajgain",
    description: "Steps to engage Dinesh Bajgain for your development project",
    step: [
      {
        "@type": "HowToStep",
        name: "View Portfolio",
        text: "Browse through the projects to understand expertise and quality",
        url: `${siteUrl}/project`,
      },
      {
        "@type": "HowToStep",
        name: "Review Skills",
        text: "Check the technical skills to ensure alignment with your project needs",
        url: `${siteUrl}/skills`,
      },
      {
        "@type": "HowToStep",
        name: "Get in Touch",
        text: "Send a message through the contact form to discuss your project",
        url: `${siteUrl}/contact`,
      },
    ],
    totalTime: "PT5M",
  };
}
