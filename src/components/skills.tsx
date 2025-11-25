"use client";

import { motion } from "framer-motion";
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
  SiKubernetes,
  SiTensorflow,
  SiPytorch,
  SiLangchain,
  SiHuggingface,
} from "react-icons/si";
import { CgCPlusPlus } from "react-icons/cg";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const skills = {
  "Full Stack Web Developer": [
    { name: "React", icon: FaReact, color: "#61DAFB" },
    { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF" },
    { name: "Node.js", icon: FaNodeJs, color: "#339933" },
    { name: "Express", icon: SiExpress, color: "#FFFFFF" },
    { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
    { name: "PostgreSQL", icon: SiPostgresql, color: "#336791" },
    { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
  ],
  "Graphic Designer": [
    { name: "Figma", icon: FaFigma, color: "#F24E1E" },
    { name: "Photoshop", icon: SiAdobephotoshop, color: "#31A8FF" },
    { name: "Illustrator", icon: SiAdobeillustrator, color: "#FF9A00" },
  ],
  "Software Engineer": [
    { name: "Python", icon: FaPython, color: "#3776AB" },
    { name: "Java", icon: FaJava, color: "#007396" },
    { name: "C++", icon: CgCPlusPlus, color: "#00599C" },
    { name: "Docker", icon: FaDocker, color: "#2496ED" },
    { name: "Kubernetes", icon: SiKubernetes, color: "#326CE5" },
  ],
  "GenAI Engineer": [
    { name: "Python", icon: FaPython, color: "#3776AB" },
    { name: "TensorFlow", icon: SiTensorflow, color: "#FF6F00" },
    { name: "PyTorch", icon: SiPytorch, color: "#EE4C2C" },
    { name: "LangChain", icon: SiLangchain, color: "#F29100" },
    { name: "Hugging Face", icon: SiHuggingface, color: "#FFD21E" },
  ],
};

export function Skills() {
  return (
    <div className="py-20">
      <h2 className="text-3xl font-bold text-center flex items-center justify-center gap-2">
        <BrainCircuit size={30} /> My Skills
      </h2>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <TooltipProvider>
          {Object.entries(skills).map(([skill, tech]) => (
            <motion.div
              key={skill}
              className="p-6 rounded-lg border"
              whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.1)" }}
            >
              <h3 className="text-xl font-bold">{skill}</h3>
              <div className="mt-4 flex flex-wrap gap-4">
                {tech.map((t) => (
                  <Tooltip key={t.name}>
                    <TooltipTrigger asChild>
                      <div
                        className="text-4xl transition-transform transform hover:scale-110"
                        style={{ color: t.color }}
                      >
                        <t.icon />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{t.name}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </motion.div>
          ))}
        </TooltipProvider>
      </div>
    </div>
  );
}

