"use client";

import { Button } from "./ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Home, User, Briefcase, Mail, BrainCircuit, Newspaper } from "lucide-react";

export function Header() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/about", label: "About", icon: User },
    { href: "/skills", label: "Skills", icon: BrainCircuit },
    { href: "/projects", label: "Projects", icon: Briefcase },
    { href: "/blog", label: "Blog", icon: Newspaper },
    { href: "/contact", label: "Contact", icon: Mail },
  ];

  return (
    <header className="p-4 flex justify-between items-center fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md">
      <Link href="/" className="text-2xl font-bold">
        <img src="/dp.jpeg" alt="Sudipta Maity" className="h-8 w-8 rounded-full object-cover" />
      </Link>
      <nav className="flex gap-2 md:gap-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} passHref>
              <motion.div whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.9 }}>
                <Button 
                  variant={isActive ? "secondary" : "ghost"} 
                  className={`flex items-center gap-2 px-3 md:px-4 ${isActive ? "bg-accent text-accent-foreground" : ""}`}
                >
                  <item.icon size={20} />
                  <span className="hidden md:inline">{item.label}</span>
                </Button>
              </motion.div>
            </Link>
          );
        })}
      </nav>
    </header>
  );
}

