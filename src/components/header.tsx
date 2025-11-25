"use client";

import { Button } from "./ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { Home, User, Briefcase, Mail, BrainCircuit, Newspaper, Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu";

export function Header() {
  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/about", label: "About", icon: User },
    { href: "/skills", label: "Skills", icon: BrainCircuit },
    { href: "/projects", label: "Projects", icon: Briefcase },
    { href: "/blog", label: "Blog", icon: Newspaper },
    { href: "/contact", label: "Contact", icon: Mail },
  ];

  return (
    <header className="p-4 flex justify-between items-center sticky top-0 bg-background/80 backdrop-blur-md z-20">
      <Link href="/" className="text-2xl font-bold">
        <img src="/dp.jpeg" alt="Sudipta Maity" className="h-8 w-8 rounded-full object-cover" />
      </Link>
      <nav className="hidden md:flex gap-4">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} passHref>
            <motion.div whileHover={{ scale: 1.1, y: -2 }}>
              <Button variant="ghost" className="flex items-center gap-2">
                <item.icon size={18} />
                {item.label}
              </Button>
            </motion.div>
          </Link>
        ))}
      </nav>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {navItems.map((item) => (
              <DropdownMenuItem key={item.href} asChild>
                <Link href={item.href} className="flex items-center gap-2">
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

