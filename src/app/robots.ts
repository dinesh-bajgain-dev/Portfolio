import { MetadataRoute } from "next";
import seoMetadata from "@/data/seometadata.json";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = seoMetadata.siteUrl;

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/private/", "/mark.png"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
