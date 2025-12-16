"use client";

import { BrainCircuit } from "lucide-react";
import {
  FaReact,
  FaNodeJs,
  FaFigma,
  FaPython,
  FaJava,
  FaDocker,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiTailwindcss,
  SiAdobephotoshop,
  SiAdobeillustrator,
} from "react-icons/si";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const skills = {
  "Web Developer": [
    { name: "React", icon: FaReact, color: "#61DAFB" },
    { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF" },
    { name: "Node.js", icon: FaNodeJs, color: "#339933" },
    { name: "Express", icon: SiExpress, color: "#FFFFFF" },
    { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
  ],
  "Mobile Developer": [
    { name: "React", icon: FaReact, color: "#61DAFB" },
    { name: "Java", icon: FaJava, color: "#007396" },
    { name: "Python", icon: FaPython, color: "#3776AB" },
  ],
  "Database & Backend": [
    { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
    { name: "PostgreSQL", icon: SiPostgresql, color: "#336791" },
    { name: "Docker", icon: FaDocker, color: "#2496ED" },
    { name: "Node.js", icon: FaNodeJs, color: "#339933" },
  ],
  "Design Tools": [
    { name: "Figma", icon: FaFigma, color: "#F24E1E" },
    { name: "Photoshop", icon: SiAdobephotoshop, color: "#31A8FF" },
    { name: "Illustrator", icon: SiAdobeillustrator, color: "#FF9A00" },
  ],
};

export function Skills() {
  return (
    <div className="py-2 md:py-8 relative">

      <h2 className="text-2xl md:text-4xl font-bold text-center flex items-center justify-center gap-2 mb-2 md:mb-4">
        <BrainCircuit size={24} className="text-purple-500" /> My Skills
      </h2>
      <p className="text-xs md:text-base text-center text-muted-foreground mb-4 md:mb-12 max-w-2xl mx-auto px-4">
        A diverse set of technologies and tools I use to bring ideas to life
      </p>

      <div className="relative mt-2 md:mt-8 grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-8">
        <TooltipProvider>
          {Object.entries(skills).map(([skill, tech], index) => (
            <div
              key={skill}
              className="relative group p-3 md:p-6 rounded-xl border border-purple-500/20 bg-gradient-to-br from-purple-500/5 to-blue-500/5 backdrop-blur-sm overflow-hidden hover:scale-[1.02] hover:shadow-[0px_20px_40px_rgba(139,92,246,0.2)] transition-all duration-200"
            >
              {/* Animated border gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-xl" />

              <h3 className="relative text-base md:text-2xl font-bold mb-3 md:mb-6 bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
                {skill}
              </h3>
              <div className="relative mt-2 md:mt-4 flex flex-wrap gap-3 md:gap-6">
                {tech.map((t, techIndex) => (
                  <Tooltip key={t.name}>
                    <TooltipTrigger asChild>
                      <div
                        className="text-3xl md:text-5xl cursor-pointer relative hover:scale-110 transition-transform duration-200"
                        style={{ color: t.color }}
                      >
                        <t.icon />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent className="bg-gradient-to-r from-purple-600 to-blue-600 border-none">
                      <p className="font-semibold">{t.name}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </div>
          ))}
        </TooltipProvider>
      </div>
    </div>
  );
}

