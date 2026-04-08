export interface NavItem {
  id: string;
  label: string;
  href: string;
  disabled?: boolean;
  isButton?: boolean;
  external?: boolean;
}

// SPA Navigation - all sections are on the home page with hash links
export const NAV_ITEMS: NavItem[] = [
  { id: "home", label: "Home", href: "/#home" },
  { id: "about", label: "About", href: "/#about" },
  { id: "skills", label: "Skills", href: "/#skills" },
  { id: "projects", label: "Projects", href: "/#projects" },
  { id: "experience", label: "Experience", href: "/#experience" },
  { id: "contact", label: "Contact", href: "/#contact" },
  {
    id: "resume",
    label: "Resume",
    href: "/resume.pdf",
    isButton: true,
    external: true,
  },
];
