import Image from "next/image";
import experienceData from "@/data/experience.json";
import Footer from "@/components/layouts/Footer";
import "./home.css";
import AboutPage from "../about/page";
import Skills from "../skills/page";
import ProjectPage from "../project/page";
import ExperiencePage from "../experience/page";
import ContactPage from "../contact/page";

// Types
interface Experience {
  id: number;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string | null;
  current: boolean;
  description: string;
  responsibilities: string[];
  technologies: string[];
}

// Helpers
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

function getDateRange(experience: Experience): string {
  const start = formatDate(experience.startDate);
  const end = experience.current ? "Present" : formatDate(experience.endDate!);
  return `${start} - ${end}`;
}

// Sort experiences by startDate descending (newest first - FIFO)
function sortExperiencesByDate(experiences: Experience[]): Experience[] {
  return [...experiences].sort((a, b) => {
    return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
  });
}

export default function HomePage() {
  const experiences = sortExperiencesByDate(experienceData as Experience[]);

  return (
    <main className="spa-main">
      {/* ========== HERO SECTION ========== */}
      <section className="hero-section" id="home">
        <div className="left-container">
          <div className="hero-intro minimal">
            <h1 className="hero-title">Dinesh Bajgain</h1>
            <div className="hero-accent" aria-hidden="true" />
          </div>

          {/* Portrait at bottom */}
          <div className="hero-portrait-container">
            <Image
              src="/portrait.png"
              alt="Portrait of Dinesh Bajgain"
              className="hero-portrait"
              width={400}
              height={400}
              priority
              fetchPriority="high"
            />
          </div>
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
