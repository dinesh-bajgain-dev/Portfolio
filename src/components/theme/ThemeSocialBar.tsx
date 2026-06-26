"use client";

import React, { useEffect, useState } from "react";
import {
  Github,
  Linkedin,
  Instagram,
  Facebook,
  Sun,
  Moon,
  Twitter,
} from "lucide-react";
import { useTheme } from "next-themes";
import "../../app/home/home.css";

type ThemeSocialBarProps = {
  hideOnMobileMenu?: boolean;
};

const ThemeSocialBar = ({ hideOnMobileMenu = false }: ThemeSocialBarProps) => {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "light" ? "dark" : "light");
  };

  if (!mounted) {
    return null; // Avoid hydration mismatch
  }

  return (
    <div
      className={`theme-social-bar ${
        hideOnMobileMenu ? "hide-on-mobile-menu" : ""
      }`}
    >
      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="social-icon-btn"
        aria-label="Toggle Theme"
      >
        {resolvedTheme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      {/* Separator */}
      <div className="social-separator"></div>

      {/* Social Links */}
      <div className="social-links-row">
        <a
          href="https://github.com/dinesh-bajgain-dev"
          target="_blank"
          rel="noopener noreferrer me"
          className="social-icon-link"
          aria-label="Dinesh Bajgain GitHub Profile"
        >
          <Github size={20} />
          <span className="sr-only">Dinesh Bajgain GitHub</span>
        </a>

        <a
          href="https://instagram.com/mr.bajgain"
          target="_blank"
          rel="noopener noreferrer me"
          className="social-icon-link"
          aria-label="Dinesh Bajgain Instagram Profile"
        >
          <Instagram size={20} />
          <span className="sr-only">Dinesh Bajgain Instagram</span>
        </a>

        <a
          href="https://www.linkedin.com/in/dinesh-bajgain"
          target="_blank"
          rel="noopener noreferrer me"
          className="social-icon-link"
          aria-label="Dinesh Bajgain LinkedIn Profile"
        >
          <Linkedin size={20} />
          <span className="sr-only">Dinesh Bajgain LinkedIn</span>
        </a>

        <a
          href="https://facebook.com/mr.bajgain"
          target="_blank"
          rel="noopener noreferrer me"
          className="social-icon-link"
          aria-label="Dinesh Bajgain Facebook Profile"
        >
          <Facebook size={20} />
          <span className="sr-only">Dinesh Bajgain Facebook</span>
        </a>

        <a
          href="https://x.com/dinesh__bajgain"
          target="_blank"
          rel="noopener noreferrer me"
          className="social-icon-link"
          aria-label="Dinesh Bajgain Twitter Profile"
        >
          <Twitter size={20} />
          <span className="sr-only">Dinesh Bajgain Twitter</span>
        </a>
      </div>
    </div>
  );
};

export default ThemeSocialBar;
