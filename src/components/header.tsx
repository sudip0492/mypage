"use client";

import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, User, Briefcase, Mail, BrainCircuit, Newspaper } from "lucide-react";

export function Header() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState("home");

  const navItems = [
    { href: "#home", id: "home", label: "Home", icon: Home },
    { href: "#about", id: "about", label: "About", icon: User },
    { href: "#skills", id: "skills", label: "Skills", icon: BrainCircuit },
    { href: "#contact", id: "contact", label: "Contact", icon: Mail },
  ];

  useEffect(() => {
    // Only enable scroll tracking on home page
    if (pathname !== "/") return;

    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.id)).filter(Boolean);
      const scrollPosition = window.scrollY + 100; // Offset for header

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Call once on mount

    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Only handle smooth scroll on home page
    if (pathname === "/" && href.startsWith("#")) {
      e.preventDefault();
      const targetId = href.substring(1);
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      <header className="p-4 flex justify-between items-center fixed top-0 left-0 right-0 z-50 backdrop-blur-sm bg-black/30">
        <Link href="/" className="relative group">
          <div className="transition-transform duration-300 hover:scale-110">
            <img
              src="/dp.jpeg"
              alt="Sudipta Maity"
              className="h-10 w-10 rounded-full object-cover ring-2 ring-purple-500/50 group-hover:ring-purple-500 transition-all"
            />
          </div>
        </Link>
        <nav className="flex gap-2 md:gap-3">
          {navItems.map((item) => {
            const isActive = pathname === "/" ? activeSection === item.id : false;
            return (
              <a key={item.id} href={pathname === "/" ? item.href : "/"} onClick={(e) => handleClick(e, item.href)}>
                <div className="transition-transform duration-200 hover:scale-105 hover:-translate-y-0.5 active:scale-95">
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    className={`
                      flex items-center gap-2 px-3 md:px-4 transition-all duration-300
                      ${isActive
                        ? "bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 border border-purple-500/50"
                        : "hover:bg-white/10"
                      }
                    `}
                  >
                    <item.icon size={18} />
                    <span className="hidden md:inline">{item.label}</span>
                  </Button>
                </div>
              </a>
            );
          })}
        </nav>
      </header>
    </>
  );
}

