import { Metadata } from "next";
import experienceData from "@/data/experience.json";
import seoMetadata from "@/data/seometadata.json";
import { JsonLd } from "@/components/seo/JsonLd";
import "./experience.css";

export const metadata: Metadata = {
  title: seoMetadata.pages.experience.title,
  description: seoMetadata.pages.experience.description,
  keywords: seoMetadata.pages.experience.keywords,
  alternates: {
    canonical: seoMetadata.pages.experience.canonical,
  },
  openGraph: {
    title: seoMetadata.pages.experience.title,
    description: seoMetadata.pages.experience.description,
    url: seoMetadata.siteUrl + seoMetadata.pages.experience.canonical,
    images: [
      {
        url: seoMetadata.ogImage,
        width: 1200,
        height: 630,
        alt: "Experience - Dinesh Bajgain",
      },
    ],
  },
  twitter: {
    title: seoMetadata.pages.experience.title,
    description: seoMetadata.pages.experience.description,
    images: [seoMetadata.ogImage],
  },
};

interface Experience {
  id: number;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string | null;
  current: boolean;
  description: string;
  responsibilities: string[];
  technologies: string[];
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

function getDateRange(experience: Experience): string {
  const start = formatDate(experience.startDate);
  const end = experience.current ? "Present" : formatDate(experience.endDate!);
  return `${start} - ${end}`;
}

export default function ExperiencePage() {
  const experiences: Experience[] = experienceData;

  // Generate structured data for work experience
  const experienceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: "Work Experience - Dinesh Bajgain",
    description: seoMetadata.pages.experience.description,
    url: `${seoMetadata.siteUrl}/experience`,
    mainEntity: {
      "@type": "Person",
      "@id": `${seoMetadata.siteUrl}/#person`,
      name: "Dinesh Bajgain",
      hasOccupation: experiences.map((exp) => ({
        "@type": "Occupation",
        name: exp.position,
        occupationLocation: {
          "@type": "AdministrativeArea",
          name: exp.location,
        },
        description: exp.description,
        skills: exp.technologies.join(", "),
        estimatedSalary: {
          "@type": "MonetaryAmountDistribution",
          currency: "NPR",
        },
      })),
    },
  };

  return (
    <main className="experience-main">
      <JsonLd data={experienceSchema} />
      <section className="experience-section" id="experience">
        <div className="experience-content">
          <h1 className="experience-title">Work Experience</h1>

          <div className="experience-timeline">
            {experiences.map((exp) => (
              <div key={exp.id} className="timeline-item">
                <div className="timeline-marker">
                  <div className="timeline-dot"></div>
                  <div className="timeline-line"></div>
                </div>

                <div className="experience-card">
                  <div className="card-header">
                    <div className="card-title-section">
                      <h2 className="position-title">{exp.position}</h2>
                      <p className="company-info">
                        {exp.company}, {exp.location}
                      </p>
                    </div>
                    <div className="date-badge">{getDateRange(exp)}</div>
                  </div>

                  {exp.description && (
                    <p className="experience-description">{exp.description}</p>
                  )}

                  {exp.responsibilities.length > 0 && (
                    <ul className="responsibilities-list">
                      {exp.responsibilities.map((responsibility, idx) => (
                        <li key={idx} className="responsibility-item">
                          {responsibility}
                        </li>
                      ))}
                    </ul>
                  )}

                  {exp.technologies.length > 0 && (
                    <div className="technologies-section">
                      {exp.technologies.map((tech, idx) => (
                        <span key={idx} className="tech-tag">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
