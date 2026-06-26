"use client";

import React, { useState } from "react";
import { Github, ExternalLink } from "lucide-react";
import ProjectModal from "@/components/modals/ProjectModal";
import "./project.css";

import projectsData from "@/data/projects.json";

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

const projects = projectsData as Project[];

interface ProjectListClientProps {
  isCarousel?: boolean;
}

export default function ProjectListClient({
  isCarousel = false,
}: ProjectListClientProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 200);
  };

  // Carousel mode - horizontal scroll for SPA
  if (isCarousel) {
    return (
      <>
        <section className="projects-carousel-section" id="projects">
          <h2 className="projects-carousel-title">Projects</h2>
          <div className="projects-carousel">
            {projects.map((project, index) => (
              <div
                key={project.slug}
                className="project-card carousel-card"
                data-reveal
                style={{ transitionDelay: `${index * 0.06}s` }}
              >
                <div className="project-card-header">
                  <div className="project-card-title-section">
                    <h3 className="project-card-title">{project.title}</h3>
                  </div>
                  <button
                    className="project-details-button"
                    onClick={() => openModal(project)}
                    aria-label={`View details for ${project.title}`}
                  >
                    <span className="details-indicator"></span>
                    Details
                  </button>
                </div>

                <div className="project-card-content">
                  <ul className="project-features">
                    {project.features.slice(0, 3).map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                    ))}
                  </ul>

                  <div className="project-tags">
                    {project.tags.map((tag, idx) => (
                      <span key={idx} className="project-tag">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="project-card-actions">
                    {project.codeUrl && (
                      <a
                        href={project.codeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-action-button project-action-code"
                      >
                        <Github size={16} />
                        Code
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-action-button project-action-demo"
                      >
                        <ExternalLink size={16} />
                        Live
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <ProjectModal
          project={selectedProject}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      </>
    );
  }

  // Grid mode - original layout for /project page
  const shouldScroll = projects.length > 3;

  return (
    <main className="project-page">
      <section className="projects-section" id="projects">
        <div className="projects-container">
          <div className="projects-header">
            <h2 className="projects-title">Projects</h2>
          </div>

          <div className="projects-grid-wrapper">
            <div
              className={`projects-grid ${shouldScroll ? "scrollable" : "centered"}`}
            >
              {projects.map((project) => (
                <div key={project.slug} className="project-card">
                  <div className="project-card-header">
                    <div className="project-card-title-section">
                      <h3 className="project-card-title">{project.title}</h3>
                    </div>
                    <button
                      className="project-details-button"
                      onClick={() => openModal(project)}
                      aria-label={`View details for ${project.title}`}
                    >
                      <span className="details-indicator"></span>
                      Details
                    </button>
                  </div>

                  <div className="project-card-content">
                    <ul className="project-features">
                      {project.features.map((feature, idx) => (
                        <li key={idx}>{feature}</li>
                      ))}
                    </ul>

                    <div className="project-tags">
                      {project.tags.map((tag, idx) => (
                        <span key={idx} className="project-tag">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="project-card-actions">
                      {project.codeUrl && (
                        <a
                          href={project.codeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-action-button project-action-code"
                        >
                          <Github size={16} />
                          View Code
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-action-button project-action-demo"
                        >
                          <ExternalLink size={16} />
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </main>
  );
}
