"use client";

import { Button } from "./ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import { Home, User, Briefcase, Mail, BrainCircuit, Newspaper } from "lucide-react";
import { ScrollProgress } from "./scroll-progress";

export function Header() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const headerBackground = useTransform(
    scrollY,
    [0, 100],
    ["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.3)"]
  );

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/about", label: "About", icon: User },
    { href: "/skills", label: "Skills", icon: BrainCircuit },
    { href: "/projects", label: "Projects", icon: Briefcase },
    { href: "/blog", label: "Blog", icon: Newspaper },
    { href: "/contact", label: "Contact", icon: Mail },
  ];

  return (
    <>
      <ScrollProgress />
      <motion.header
        style={{ backgroundColor: headerBackground }}
        className="p-4 flex justify-between items-center fixed top-0 left-0 right-0 z-50 backdrop-blur-sm"
      >
        <Link href="/" className="relative group">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src="/dp.jpeg"
              alt="Sudipta Maity"
              className="h-10 w-10 rounded-full object-cover ring-2 ring-purple-500/50 group-hover:ring-purple-500 transition-all"
            />
          </motion.div>
        </Link>
        <nav className="flex gap-2 md:gap-3">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href} passHref>
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
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
                </motion.div>
              </Link>
            );
          })}
        </nav>
      </motion.header>
    </>
  );
}

