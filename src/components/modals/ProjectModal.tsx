"use client";

import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { createPortal } from "react-dom";
import readmesData from "@/data/readmes.json";
import "./ProjectModal.css";

type RepoInfo = {
  owner: string;
  repo: string;
};

type Project = {
  title: string;
  description: string;
  features: string[];
  demo: string;
  subTitle: string;
  slug: string;
  external: string | null;
  tags: string[];
  period: string;
  codeUrl: string | null;
  liveUrl: string | null;
};

type ProjectModalProps = {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
};

function parseGitHubRepo(repoUrl: string | null): RepoInfo | null {
  if (!repoUrl) return null;

  try {
    const parsed = new URL(repoUrl);
    if (parsed.hostname !== "github.com") {
      return null;
    }

    const pathParts = parsed.pathname.split("/").filter(Boolean);
    if (pathParts.length < 2) {
      return null;
    }

    const owner = pathParts[0];
    const repo = pathParts[1].replace(/\.git$/, "");
    return { owner, repo };
  } catch {
    return null;
  }
}

export default function ProjectModal({
  project,
  isOpen,
  onClose,
}: ProjectModalProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [readmeContent, setReadmeContent] = useState<string | null>(null);
  const [readmeError, setReadmeError] = useState<string | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!project || !isOpen) {
      setReadmeContent(null);
      setReadmeError(null);
      return;
    }

    const repoInfo = parseGitHubRepo(project.codeUrl);
    if (!repoInfo) {
      setReadmeContent(null);
      setReadmeError("README source is unavailable for this project.");
      return;
    }

    const cacheKey = `${repoInfo.owner}/${repoInfo.repo}`;
    const readme = (readmesData as Record<string, string | undefined>)[
      cacheKey
    ];

    if (readme) {
      setReadmeContent(readme);
      setReadmeError(null);
    } else {
      setReadmeContent(null);
      setReadmeError("README details for this project are not available.");
    }
  }, [isOpen, project]);

  if (!isOpen || !project || !isMounted) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-content">
        <button
          className="modal-close"
          onClick={onClose}
          aria-label="Close modal"
        >
          <X size={24} />
        </button>

        <div className="modal-body">
          <div className="modal-section">
            {readmeError && (
              <p className="modal-readme-status modal-readme-status-error">
                {readmeError}
              </p>
            )}
            {readmeContent && (
              <div className="modal-readme-markdown">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {readmeContent}
                </ReactMarkdown>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
