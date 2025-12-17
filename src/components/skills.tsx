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
  SiCplusplus,
  SiLinux,
  SiCisco,
  SiWireshark,
} from "react-icons/si";
import { TbRouter, TbCloudNetwork } from "react-icons/tb";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const skills = {
  "Web Development": [
    { name: "React", icon: FaReact, color: "#61DAFB" },
    { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF" },
    { name: "Node.js", icon: FaNodeJs, color: "#339933" },
    { name: "Express", icon: SiExpress, color: "#FFFFFF" },
    { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
  ],
  "Mobile Development": [
    { name: "React", icon: FaReact, color: "#61DAFB" },
    { name: "Java", icon: FaJava, color: "#007396" },
    { name: "Python", icon: FaPython, color: "#3776AB" },
  ],
  "Telecom & Networking": [
    { name: "C++", icon: SiCplusplus, color: "#00599C" },
    { name: "Linux", icon: SiLinux, color: "#FCC624" },
    { name: "Cisco", icon: SiCisco, color: "#1BA0D7" },
    { name: "Routing & Switching", icon: TbRouter, color: "#4CAF50" },
    { name: "Wireshark", icon: SiWireshark, color: "#1679A7" },
    { name: "Cloud Networking", icon: TbCloudNetwork, color: "#FF6B35" },
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
    <div className="py-1 md:py-6 relative">

      <h2 className="text-lg md:text-3xl font-bold text-center flex items-center justify-center gap-2 mb-1 md:mb-3">
        <BrainCircuit size={20} className="text-purple-500 md:w-[22px] md:h-[22px]" /> My Skills
      </h2>
      <p className="text-xs md:text-sm text-center text-muted-foreground mb-2 md:mb-6 max-w-2xl mx-auto px-4 hidden md:block">
        A diverse set of technologies and tools I use to bring ideas to life
      </p>

      <div className="relative mt-1 md:mt-6 grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
        <TooltipProvider>
          {Object.entries(skills).map(([skill, tech], index) => (
            <div
              key={skill}
              className="relative group p-2 md:p-4 rounded-lg border border-purple-500/20 bg-gradient-to-br from-purple-500/5 to-blue-500/5 backdrop-blur-sm overflow-hidden hover:scale-[1.02] hover:shadow-[0px_20px_40px_rgba(139,92,246,0.2)] transition-all duration-200"
            >
              {/* Animated border gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-lg" />

              <h3 className="relative text-sm md:text-xl font-bold mb-2 md:mb-4 bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
                {skill}
              </h3>
              <div className="relative mt-1 md:mt-3 flex flex-wrap gap-2 md:gap-4">
                {tech.map((t, techIndex) => (
                  <Tooltip key={t.name}>
                    <TooltipTrigger asChild>
                      <div
                        className="text-xl md:text-3xl cursor-pointer relative hover:scale-110 transition-transform duration-200"
                        style={{ color: t.color }}
                      >
                        <t.icon />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent className="bg-gradient-to-r from-purple-600 to-blue-600 border-none">
                      <p className="font-semibold text-xs">{t.name}</p>
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

