"use client";

import { User, Code, Palette, Brain, Sparkles } from "lucide-react";
import Image from 'next/image';

export function About() {
  const highlights = [
    { icon: Code, text: "Software Development", color: "text-blue-400" },
    { icon: Palette, text: "Web Development", color: "text-purple-400" },
    { icon: Brain, text: "Mobile Development", color: "text-pink-400" },
    { icon: Sparkles, text: "Creative Design", color: "text-cyan-400" },
  ];

  return (
    <div className="py-2 md:py-4 pb-12 md:pb-16 relative">

      <h2 className="text-xl md:text-3xl font-bold text-center flex items-center justify-center gap-2 mb-1 md:mb-2">
        <User size={22} className="text-blue-500" /> About Me
      </h2>
      <p className="text-center text-xs md:text-sm text-muted-foreground mb-3 md:mb-6 max-w-2xl mx-auto px-4">
        Passionate creator at the intersection of code, design, and innovation
      </p>

      <div className="relative mt-2 md:mt-4 flex flex-col md:flex-row items-start justify-center gap-4 md:gap-12 max-w-6xl mx-auto px-4">
        {/* Profile Image */}
        <div className="relative group flex-shrink-0 mx-auto md:mx-0">
          <div className="w-32 h-32 md:w-64 md:h-64 relative">
            {/* Static ring */}
            <div className="absolute -inset-1 md:-inset-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full opacity-75 blur-lg" />
            {/* Image container */}
            <div className="relative w-full h-full rounded-full overflow-hidden ring-2 md:ring-4 ring-purple-500/50 group-hover:ring-purple-500 transition-all duration-300">
              <Image
                src="/dp.jpeg"
                alt="Sudipta Maity"
                layout="fill"
                objectFit="cover"
                className="rounded-full group-hover:scale-110 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Floating badges */}
          {highlights.map((item, index) => (
            <div
              key={index}
              className={`absolute ${
                index === 0 ? "top-0 right-0" :
                index === 1 ? "bottom-0 right-0" :
                index === 2 ? "bottom-0 left-0" :
                "top-0 left-0"
              } hidden md:block`}
            >
              <div className={`p-2 bg-black/80 backdrop-blur-sm rounded-full border border-purple-500/30 ${item.color} hover:scale-110 transition-transform duration-200`}>
                <item.icon size={16} />
              </div>
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 max-w-2xl">
          <div className="space-y-2 md:space-y-4">
            <p className="text-xs md:text-base leading-relaxed text-muted-foreground">
              I'm a <span className="text-blue-400 font-semibold">passionate and versatile creator</span>, blending the art of design with the precision of engineering.
            </p>
            <p className="text-xs md:text-base leading-relaxed text-muted-foreground">
              As a <span className="text-purple-400 font-semibold">Software Developer</span>, I build robust and scalable applications. As a <span className="text-pink-400 font-semibold">Web & Mobile Developer</span>, I create seamless cross-platform experiences.
            </p>
            <p className="text-xs md:text-base leading-relaxed text-muted-foreground">
              With expertise in both frontend and backend technologies, I transform ideas into elegant, functional solutions that users love.
            </p>
            <div className="pt-2 md:pt-4 border-t border-white/10">
              <p className="text-sm md:text-lg font-semibold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
                My goal is to create work that is not only functional and beautiful but also pushes the boundaries of what's possible.
              </p>
            </div>

            {/* Highlights Grid */}
            <div className="grid grid-cols-2 gap-2 md:gap-3 pt-2 md:pt-4">
              {highlights.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-1.5 md:gap-2 p-1.5 md:p-2 rounded-lg bg-white/5 border border-white/10 hover:border-purple-500/50 hover:scale-105 transition-all duration-200"
                >
                  <item.icon size={14} className={`${item.color} md:w-[18px] md:h-[18px]`} />
                  <span className="text-[10px] md:text-sm font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
