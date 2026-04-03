"use client";

import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { createPortal } from "react-dom";
import "./ProjectModal.css";

type RepoInfo = {
  owner: string;
  repo: string;
};

type ReadmeCacheValue = {
  content: string;
};

const readmeCache = new Map<string, ReadmeCacheValue>();

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

function decodeBase64Utf8(base64Content: string): string {
  const binaryString = atob(base64Content);
  const bytes = Uint8Array.from(binaryString, (char) => char.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

export default function ProjectModal({
  project,
  isOpen,
  onClose,
}: ProjectModalProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [readmeContent, setReadmeContent] = useState<string | null>(null);
  const [isReadmeLoading, setIsReadmeLoading] = useState(false);
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
      setIsReadmeLoading(false);
      return;
    }

    const repoInfo = parseGitHubRepo(project.codeUrl);
    if (!repoInfo) {
      setReadmeContent(null);
      setReadmeError("README source is unavailable for this project.");
      setIsReadmeLoading(false);
      return;
    }

    const cacheKey = `${repoInfo.owner}/${repoInfo.repo}`;
    const cachedReadme = readmeCache.get(cacheKey);
    if (cachedReadme) {
      setReadmeContent(cachedReadme.content);
      setReadmeError(null);
      setIsReadmeLoading(false);
      return;
    }

    const controller = new AbortController();

    const loadReadme = async () => {
      setIsReadmeLoading(true);
      setReadmeError(null);

      try {
        const response = await fetch(
          `https://api.github.com/repos/${repoInfo.owner}/${repoInfo.repo}/readme`,
          {
            headers: {
              Accept: "application/vnd.github+json",
            },
            signal: controller.signal,
          },
        );

        if (!response.ok) {
          throw new Error("Unable to fetch README from GitHub.");
        }

        const data = await response.json();
        const content =
          typeof data.content === "string"
            ? decodeBase64Utf8(data.content)
            : "";

        if (!content.trim()) {
          throw new Error("README file is empty.");
        }

        readmeCache.set(cacheKey, {
          content,
        });

        setReadmeContent(content);
        setReadmeError(null);
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          setReadmeContent(null);
          setReadmeError("Could not load README details right now.");
        }
      } finally {
        setIsReadmeLoading(false);
      }
    };

    void loadReadme();

    return () => {
      controller.abort();
    };
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
            {isReadmeLoading && (
              <p className="modal-readme-status">
                Loading detailed README info...
              </p>
            )}
            {!isReadmeLoading && readmeError && (
              <p className="modal-readme-status modal-readme-status-error">
                {readmeError}
              </p>
            )}
            {!isReadmeLoading && readmeContent && (
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
