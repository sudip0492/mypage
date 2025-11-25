"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Briefcase, Github, ExternalLink } from "lucide-react";
import React from "react";

const projects = [
  {
    title: "AI-Powered Content Generator",
    description: "A web application that leverages generative AI to create high-quality marketing copy, blog posts, and other content. Built with Next.js, and a custom-trained GPT model.",
    tags: ["Next.js", "Python", "FastAPI", "PyTorch", "LangChain"],
    image: "/project1.png", // Placeholder image
    codeLink: "#",
    liveLink: "#",
  },
  {
    title: "Interactive Data Visualization Platform",
    description: "A platform for creating and sharing interactive data visualizations. Features a drag-and-drop interface and a wide range of chart types. Built with React and D3.js.",
    tags: ["React", "D3.js", "Node.js", "Express"],
    image: "/project2.png", // Placeholder image
    codeLink: "#",
    liveLink: "#",
  },
  {
    title: "E-commerce Store for a Local Business",
    description: "A fully functional e-commerce website for a local business, with a custom design system, product management, and a secure checkout process. Designed in Figma and built with Next.js.",
    tags: ["Figma", "Next.js", "Stripe", "PostgreSQL"],
    image: "/project3.png", // Placeholder image
    codeLink: "#",
    liveLink: "#",
  },
];

function ProjectCard({ project }: { project: typeof projects[0] }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative"
    >
      <Card
        className="h-full flex flex-col transition-all duration-300 hover:border-primary/50"
        style={{
          transform: "translateZ(50px)",
        }}
      >
        <CardHeader>
          <CardTitle>{project.title}</CardTitle>
          <CardDescription>{project.description}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <div className="aspect-video bg-gray-200 dark:bg-gray-800 rounded-md mb-4">
            {/* Placeholder for project image */}
          </div>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary">{tag}</Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <a href={project.codeLink} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" className="flex items-center gap-2">
              <Github size={16} /> View Code
            </Button>
          </a>
          <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
            <Button className="flex items-center gap-2">
              <ExternalLink size={16} /> Live Demo
            </Button>
          </a>
        </CardFooter>
      </Card>
    </motion.div>
  );
}


export function Projects() {
  return (
    <div className="py-20">
      <h2 className="text-3xl font-bold text-center flex items-center justify-center gap-2">
        <Briefcase size={30} /> My Projects
      </h2>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" style={{ perspective: "1000px" }}>
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </div>
  );
}
