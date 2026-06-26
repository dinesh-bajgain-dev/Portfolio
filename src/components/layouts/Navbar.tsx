"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import Link from "next/link";
import "./navbar.css";
import ThemeSocialBar from "@/components/theme/ThemeSocialBar";
import { NAV_ITEMS } from "@/data/navigation";

interface NavbarProps {
  onNavClick?: (id: string) => void;
  onMenuToggle?: (isOpen: boolean) => void;
  orientation?: "horizontal" | "vertical";
  className?: string;
}

const Navbar = ({
  onNavClick,
  onMenuToggle,
  orientation = "vertical",
  className = "",
}: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);
  const router = useRouter();
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    const scrollContainer = document.querySelector(".page-content");
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll, { passive: true });
      return () => scrollContainer.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const toggleMenu = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    if (onMenuToggle) onMenuToggle(newState);
  };

  const toggleTheme = () => {
    setTheme(resolvedTheme === "light" ? "dark" : "light");
  };

  const navLinks =
    orientation === "vertical"
      ? NAV_ITEMS
      : NAV_ITEMS.filter((item) => !item.disabled && item.id);

  // Render Vertical Layout (Sidebar)
  if (orientation === "vertical") {
    return (
      <>
        {/* Mobile Hamburger (Visible only on mobile via CSS) */}
        <button
          className="navbar-vertical-toggle"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={32} /> : <Menu size={32} />}
        </button>

        {/* Vertical Nav (Always visible on desktop, toggled on mobile) */}
        <nav
          ref={navRef}
          className={`navbar-vertical ${className} ${isOpen ? "open" : ""}`}
        >
          {navLinks.map((item) => (
            <span
              key={item.id}
              onClick={
                item.disabled
                  ? undefined
                  : () => {
                      if (onNavClick) onNavClick(item.id);
                      setIsOpen(false); // Close menu on click
                      if (onMenuToggle) onMenuToggle(false);
                    }
              }
              className="nav-link"
            >
              <span className="nav-link-items">{item.label}</span>
              {/* <span className="nav-link-arrow">
                <svg
                  width="1.2em"
                  height="1.2em"
                  viewBox="0 -6.5 38 38"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  style={{ transform: "scaleX(-1)" }}
                >
                  <path
                    d="M187.812138,38.5802109 L198.325224,49.0042713 L198.41312,49.0858421 C198.764883,49.4346574 198.96954,49.8946897 199,50.4382227 L198.998248,50.6209428 C198.97273,51.0514917 198.80819,51.4628128 198.48394,51.8313977 L198.36126,51.9580208 L187.812138,62.4197891 C187.031988,63.1934036 185.770571,63.1934036 184.990421,62.4197891 C184.205605,61.6415481 184.205605,60.3762573 184.990358,59.5980789 L192.274264,52.3739093 L162.99947,52.3746291 C161.897068,52.3746291 161,51.4850764 161,50.3835318 C161,49.2819872 161.897068,48.3924345 162.999445,48.3924345 L192.039203,48.3917152 L184.990421,41.4019837 C184.205605,40.6237427 184.205605,39.3584519 184.990421,38.5802109 C185.770571,37.8065964 187.031988,37.8065964 187.812138, 38.5802109 Z"
                    fill="currentColor"
                    transform="translate(-161, -38)"
                  />
                </svg>
              </span> */}
            </span>
          ))}
        </nav>
      </>
    );
  }

  // Render Horizontal / Top Navbar
  if (orientation === "horizontal") {
    return (
      <nav
        ref={navRef}
        className={`site-top-navbar ${className} ${isOpen ? "mobile-menu-open" : ""} ${scrolled ? "scrolled" : ""}`}
      >
        <div className="site-navbar-inner">
          <div className="site-navbar-logo">
            <div
              className="navbar-logo-image"
              onClick={() => router.push("/")}
              role="img"
              aria-label="Logo"
            />
          </div>
          <div className="site-navbar-left">
            <div className="navbar-links">
              {navLinks.map((link) =>
                link.isButton ? (
                  <a
                    key={link.id}
                    href={link.href}
                    className="navbar-button"
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link key={link.id} href={link.href} className="navbar-link">
                    {link.label}
                  </Link>
                ),
              )}
            </div>
          </div>

          <div className="site-navbar-right">
            <ThemeSocialBar />
          </div>

          {/* Mobile theme toggle - visible only on mobile next to hamburger */}
          {mounted && (
            <button
              className="mobile-theme-toggle"
              onClick={toggleTheme}
              aria-label="Toggle Theme"
            >
              {resolvedTheme === "dark" ? (
                <Sun size={24} />
              ) : (
                <Moon size={24} />
              )}
            </button>
          )}

          <button
            className="navbar-toggle"
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={32} /> : <Menu size={32} />}
          </button>

          {/* Mobile menu backdrop */}
          {isOpen && (
            <div
              className="navbar-mobile-backdrop"
              onClick={toggleMenu}
              aria-hidden="true"
            />
          )}

          <div className={`navbar-mobile-menu ${isOpen ? "open" : ""}`}>
            {navLinks.map((link, index) =>
              link.isButton ? (
                <a
                  key={link.id}
                  href={link.href}
                  className="navbar-mobile-button"
                  onClick={toggleMenu}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.id}
                  href={link.href}
                  className="navbar-mobile-link"
                  onClick={toggleMenu}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {link.label}
                </Link>
              ),
            )}
          </div>
        </div>
      </nav>
    );
  }
};

export default Navbar;
