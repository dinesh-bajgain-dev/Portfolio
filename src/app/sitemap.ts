import { MetadataRoute } from "next";
import projectsData from "@/data/projects.json";
import seoMetadata from "@/data/seometadata.json";

type Project = {
  slug: string;
  title: string;
  description?: string;
  tags?: string[];
};

// Page priority configuration - add new pages here to customize their priority
const PAGE_PRIORITIES: Record<
  string,
  {
    priority: number;
    changeFrequency: MetadataRoute.Sitemap[0]["changeFrequency"];
  }
> = {
  "/": {
    priority: 1.0,
    changeFrequency: "weekly",
  },
  "/about": {
    priority: 0.9,
    changeFrequency: "monthly",
  },
  "/project": {
    priority: 0.9,
    changeFrequency: "weekly",
  },
  "/skills": {
    priority: 0.8,
    changeFrequency: "monthly",
  },
  "/experience": {
    priority: 0.8,
    changeFrequency: "monthly",
  },
  "/contact": {
    priority: 0.7,
    changeFrequency: "yearly",
  },
};

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = seoMetadata.siteUrl;
  const currentDate = new Date().toISOString().split("T")[0];

  // Include canonical route URLs only (avoid fragment URLs like #about)
  const staticPages: MetadataRoute.Sitemap = Object.entries(
    PAGE_PRIORITIES,
  ).map(([path, config]) => ({
    url: path === "/" ? baseUrl : `${baseUrl}${path}`,
    lastModified: currentDate,
    changeFrequency: config.changeFrequency,
    priority: config.priority,
    images:
      path === "/"
        ? [
            `${baseUrl}${seoMetadata.ogImage}`,
            `${baseUrl}${seoMetadata.portraitImage}`,
          ]
        : [`${baseUrl}${seoMetadata.ogImage}`],
  }));

  // Dynamic project pages with individual priorities
  const projects = projectsData as Project[];
  const projectPages: MetadataRoute.Sitemap = projects.map(
    (project, index) => ({
      url: `${baseUrl}/project/${project.slug}`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      // Higher priority for first few projects (featured)
      priority: index < 3 ? 0.7 : 0.6,
      images: [`${baseUrl}${seoMetadata.ogImage}`],
    }),
  );

  return [...staticPages, ...projectPages];
}
