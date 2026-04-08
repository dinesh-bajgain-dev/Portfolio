import { Metadata } from "next";
import seoMetadata from "@/data/seometadata.json";
import projectsData from "@/data/projects.json";
import ProjectListClient from "./ProjectListClient";
import { JsonLd, generateProjectListSchema } from "@/components/seo/JsonLd";

type Project = {
  title: string;
  slug: string;
  description: string;
};

const projects = projectsData as unknown as Project[];

export const metadata: Metadata = {
  title: seoMetadata.pages.projects.title,
  description: seoMetadata.pages.projects.description,
  keywords: seoMetadata.pages.projects.keywords,
  robots: { index: false, follow: false },
  alternates: {
    canonical: seoMetadata.pages.projects.canonical,
  },
  openGraph: {
    title: seoMetadata.pages.projects.title,
    description: seoMetadata.pages.projects.description,
    url: seoMetadata.siteUrl + seoMetadata.pages.projects.canonical,
    images: [
      {
        url: seoMetadata.ogImage,
        width: 1200,
        height: 630,
        alt: "Projects - Dinesh Bajgain",
      },
    ],
  },
  twitter: {
    title: seoMetadata.pages.projects.title,
    description: seoMetadata.pages.projects.description,
    images: [seoMetadata.ogImage],
  },
};

export default function ProjectPage() {
  const projectListSchema = generateProjectListSchema({
    projects: projects.map((p) => ({
      title: p.title,
      slug: p.slug,
      description: p.description,
    })),
    siteUrl: seoMetadata.siteUrl,
  });

  return (
    <>
      <JsonLd data={projectListSchema} />
      <ProjectListClient />
    </>
  );
}
