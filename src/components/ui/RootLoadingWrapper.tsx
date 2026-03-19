"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import LoadingScreen from "./LoadingScreen";

interface RootLoadingWrapperProps {
  children: React.ReactNode;
}

function isCrawlerUserAgent(userAgent: string): boolean {
  return /bot|crawler|spider|bingpreview|googleweblight/i.test(userAgent);
}

export default function RootLoadingWrapper({
  children,
}: RootLoadingWrapperProps) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    // Skip splash/loading for crawlers so main content is indexable immediately.
    const userAgent = navigator.userAgent || "";
    const isCrawler = isCrawlerUserAgent(userAgent);

    // Only show loading screen for the root path "/" on first visit
    if (!isCrawler && (pathname === "/" || pathname === "")) {
      const hasVisited = sessionStorage.getItem("hasVisitedRoot");
      if (!hasVisited) {
        setIsLoading(true);
      }
    }
  }, [pathname]);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    sessionStorage.setItem("hasVisitedRoot", "true");
  };

  // Don't render anything until client-side to avoid hydration mismatch
  if (!isClient) {
    return <>{children}</>;
  }

  // Only show loading screen for root path on first visit
  if (isLoading && (pathname === "/" || pathname === "")) {
    return (
      <>
        <LoadingScreen onComplete={handleLoadingComplete} minDuration={2500} />
        <div style={{ visibility: "hidden", position: "absolute" }}>
          {children}
        </div>
      </>
    );
  }

  return <>{children}</>;
}
