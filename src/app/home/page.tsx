import Image from "next/image";
import Footer from "@/components/layouts/Footer";
import ScrollReveal from "@/components/ui/ScrollReveal";
import "./home.css";
import AboutPage from "../about/page";
import Skills from "../skills/page";
import ProjectPage from "../project/page";
import ExperiencePage from "../experience/page";
import ContactPage from "../contact/page";

export default function HomePage() {
  return (
    <main className="spa-main">
      {/* Scroll reveal observer — renders nothing, attaches IntersectionObserver */}
      <ScrollReveal />

      {/* ========== HERO SECTION ========== */}
      <section className="hero-section" id="home">
        <div className="hero-left">
          {/* Terminal role badge */}
          <div className="hero-badge">
            <span className="hero-badge-dot" aria-hidden="true" />
            <span>Full-Stack Developer</span>
          </div>

          {/* Name — each word masked for slide-up reveal */}
          <h1 className="hero-title" aria-label="Dinesh Bajgain">
            <span className="hero-title-word">
              <span className="hero-title-line">Dinesh</span>
            </span>
            <span className="hero-title-word">
              <span className="hero-title-line">Bajgain</span>
            </span>
          </h1>

          {/* Accent divider */}
          <div className="hero-divider" aria-hidden="true">
            <span className="hero-divider-line" />
          </div>

          {/* Specialties */}
          <p className="hero-specialties">
            <span className="hero-specialty">Full Stack</span>
            <span className="hero-dot" aria-hidden="true">·</span>
            <span className="hero-specialty">AI | ML Enthusiast</span>
            <span className="hero-dot" aria-hidden="true">·</span>
            <span className="hero-specialty">Chill Guy</span>
          </p>

          {/* CTAs */}
          <div className="hero-cta">
            <a href="/#projects" className="hero-btn-primary">View Work</a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-btn-secondary"
            >
              Resume
            </a>
          </div>

          {/* Availability indicator */}
          <div className="hero-availability">
            <span className="availability-dot" aria-hidden="true" />
            <span>Available for opportunities</span>
          </div>
        </div>

        {/* Portrait */}
        <div className="hero-portrait-container">
          <Image
            src="/portrait.png"
            alt="Portrait of Dinesh Bajgain"
            className="hero-portrait"
            width={400}
            height={600}
            priority
            fetchPriority="high"
            sizes="50vw"
          />
        </div>
      </section>

      {/* ========== ABOUT SECTION ========== */}
      <AboutPage />

      {/* ========== SKILLS SECTION ========== */}
      <Skills />

      {/* ========== PROJECTS SECTION (Carousel with Modal) ========== */}
      <ProjectPage />

      {/* ========== EXPERIENCE SECTION ========== */}
      <ExperiencePage />

      {/* ========== CONTACT SECTION ========== */}
      <ContactPage />

      {/* ========== FOOTER ========== */}
      <Footer />
    </main>
  );
}
