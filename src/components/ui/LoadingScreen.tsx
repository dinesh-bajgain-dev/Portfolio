"use client";

import { useState, useEffect } from "react";
import "./LoadingScreen.css";

interface LoadingScreenProps {
  onComplete?: () => void;
  minDuration?: number;
}

export default function LoadingScreen({
  onComplete,
  minDuration = 2000,
}: LoadingScreenProps) {
  const [isExiting, setIsExiting] = useState(false);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => {
        setShowLoader(false);
        onComplete?.();
      }, 700);
    }, minDuration);

    return () => clearTimeout(exitTimer);
  }, [minDuration, onComplete]);

  if (!showLoader) return null;

  return (
    <div className={`loading-screen ${isExiting ? "exiting" : ""}`}>
      <div className="loading-content">
        {/* Progress ring */}
        <div className="loading-ring" aria-hidden="true" />

        {/* Name */}
        <h1 className="loading-headline">Dinesh Bajgain</h1>

        {/* Terminal prompt */}
        <div className="loading-prompt" aria-label="Loading portfolio">
          <span className="loading-prompt-text">&gt; Initializing portfolio_v2026</span>
          <span className="loading-cursor" aria-hidden="true" />
        </div>
      </div>

      {/* Aurora background */}
      <div className="loading-bg-aurora" aria-hidden="true" />
    </div>
  );
}
