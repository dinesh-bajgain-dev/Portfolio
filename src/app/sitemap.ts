import { MetadataRoute } from "next";
import projectsData from "@/data/projects.json";
import seoMetadata from "@/data/seometadata.json";

type Project = {
  slug: string;
  title: string;
  description?: string;
  tags?: string[];
};

// Important images that should be indexed by search engines
const SITE_IMAGES = {
  portrait: {
    loc: "/portrait.png",
    title: "Dinesh Bajgain - Full Stack Developer & AI/ML Enthusiast Portrait",
    caption:
      "Professional portrait of Dinesh Bajgain, Full Stack Developer and AI/ML Enthusiast from Lalitpur, Nepal",
  },
  ogImage: {
    loc: "/og-image.png",
    title: "Dinesh Bajgain Portfolio - Full Stack Developer & AI/ML",
    caption:
      "Open Graph image for Dinesh Bajgain's developer portfolio website",
  },
  profile: {
    loc: "/profile.jpeg",
    title: "Dinesh Bajgain Profile Photo",
    caption:
      "Profile photo of Dinesh Bajgain, Software Engineer specializing in React, Next.js, Node.js, Python, and Machine Learning",
  },
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
  const currentDate = new Date().toISOString();

  // Include canonical route URLs only (avoid fragment URLs like #about)
  const staticPages: MetadataRoute.Sitemap = Object.entries(
    PAGE_PRIORITIES,
  ).map(([path, config]) => ({
    url: path === "/" ? baseUrl : `${baseUrl}${path}`,
    lastModified: currentDate,
    changeFrequency: config.changeFrequency,
    priority: config.priority,
  }));

  // Explicitly include critical images so crawlers can discover them quickly
  const imagePages: MetadataRoute.Sitemap = Object.values(SITE_IMAGES).map(
    (img) => ({
      url: `${baseUrl}${img.loc}`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.6,
    }),
  );

  // Dynamic project pages with individual priorities
  const projects = projectsData as Project[];
  const projectPages: MetadataRoute.Sitemap = projects.map(
    (project, index) => ({
      url: `${baseUrl}/project/${project.slug}`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      // Higher priority for first few projects (featured)
      priority: index < 3 ? 0.7 : 0.6,
    }),
  );

  return [...staticPages, ...projectPages, ...imagePages];
}
