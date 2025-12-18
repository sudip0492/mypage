"use client";

import { Socials } from "./socials";
import { Code, Palette, Brain, Network } from "lucide-react";
import Image from 'next/image';

export function Hero() {
  const highlights = [
    { icon: Code, text: "Software Engineering", color: "text-blue-400" },
    { icon: Palette, text: "Web Development", color: "text-purple-400" },
    { icon: Brain, text: "Mobile Development", color: "text-pink-400" },
    { icon: Network, text: "Network Engineering", color: "text-green-400" },
  ];

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="max-w-7xl mx-auto px-3 md:px-6 w-full h-full">
        <div className="flex flex-col md:flex-row items-center md:justify-between gap-2 md:gap-8 lg:gap-12 h-full py-0">

          {/* Mobile: Horizontal Layout with Small Photo + Name */}
          <div className="flex md:hidden items-center gap-3 w-full mb-4 pr-3">
            {/* Name next to photo on mobile */}
            <h1 className="text-2xl font-extrabold leading-tight flex-1">
              <span className="relative inline-block">
                <span
                  className="absolute inset-0 bg-gradient-to-br from-slate-400 via-amber-600 via-slate-300 to-yellow-600 text-transparent bg-clip-text animate-flowing-gradient bg-[length:200%_auto] blur-md opacity-50"
                  aria-hidden="true"
                >
                  Sudipta Maity
                </span>
                <span
                  className="relative bg-gradient-to-br from-slate-400 via-amber-600 via-slate-300 to-yellow-600 text-transparent bg-clip-text animate-flowing-gradient bg-[length:200%_auto]"
                >
                  Sudipta Maity
                </span>
              </span>
            </h1>

            {/* Small Profile Image for Mobile - Moved to Right */}
            <div className="relative group flex-shrink-0">
              <div className="w-20 h-20 relative">
                <div className="relative w-full h-full rounded-full overflow-hidden border-[2px] animate-rgb-border shadow-lg">
                  <Image
                    src="/dp.jpeg"
                    alt="Sudipta Maity"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-full"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Desktop: Left Content */}
          <div className="flex-1 space-y-3 md:space-y-6 order-2 md:order-1 w-full">
            {/* Name - Hidden on Mobile */}
            <h1 className="hidden md:block text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight">
              <span className="relative inline-block">
                <span
                  className="absolute inset-0 bg-gradient-to-br from-slate-400 via-amber-600 via-slate-300 to-yellow-600 text-transparent bg-clip-text animate-flowing-gradient bg-[length:200%_auto] blur-md opacity-50"
                  aria-hidden="true"
                >
                  Sudipta Maity
                </span>
                <span
                  className="relative bg-gradient-to-br from-slate-400 via-amber-600 via-slate-300 to-yellow-600 text-transparent bg-clip-text animate-flowing-gradient bg-[length:200%_auto]"
                >
                  Sudipta Maity
                </span>
              </span>
            </h1>

            {/* Content */}
            <div className="space-y-2.5 md:space-y-4">
              <p className="text-[10px] leading-relaxed sm:text-xs md:text-base lg:text-lg md:leading-relaxed text-muted-foreground">
                I'm a <span className="text-white font-semibold">passionate and versatile creator</span>, blending the art of design with the precision of engineering.
              </p>
              <p className="text-[10px] leading-relaxed sm:text-xs md:text-base lg:text-lg md:leading-relaxed text-muted-foreground">
                As a <span className="text-purple-400 font-semibold">Software Engineer</span>, I build robust and scalable applications. As a <span className="text-pink-400 font-semibold">Web & Mobile Developer</span>, I create seamless cross-platform experiences.
              </p>
              <p className="text-[10px] leading-relaxed sm:text-xs md:text-base lg:text-lg md:leading-relaxed text-muted-foreground">
                At <span className="text-green-400 font-semibold">Tejas Networks</span>, I am a <span className="text-purple-400 font-semibold">Network Engineer</span> where I work on telecom network components with expertise in <span className="text-green-400 font-semibold">C++</span> and <span className="text-green-400 font-semibold">Linux</span>.
              </p>
              <div className="pt-2.5 md:pt-4 border-t border-white/10">
                <p className="text-[10px] leading-relaxed sm:text-xs md:text-base lg:text-lg font-semibold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
                  My goal is to create work that is not only functional and beautiful but also pushes the boundaries of what's possible.
                </p>
              </div>

              {/* Highlights Grid */}
              <div className="grid grid-cols-2 gap-1.5 md:gap-3 pt-2.5 md:pt-4">
                {highlights.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-1 md:gap-2 p-1.5 md:p-3 rounded-lg bg-white/5 border border-white/10 hover:border-purple-500/50 hover:scale-105 transition-all duration-200"
                  >
                    <item.icon size={12} className={`${item.color} flex-shrink-0 md:w-[18px] md:h-[18px]`} />
                    <span className="text-[9px] sm:text-[10px] md:text-sm font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-3 md:pt-6">
              <Socials />
            </div>
          </div>

          {/* Desktop: Right Side - Large Profile Image (Hidden on Mobile) */}
          <div className="hidden md:block relative group flex-shrink-0 order-1 md:order-2">
            <div className="w-80 h-80 lg:w-96 lg:h-96 xl:w-[26rem] xl:h-[26rem] relative">
              <div className="relative w-full h-full rounded-full overflow-hidden border-[5px] lg:border-[6px] animate-rgb-border shadow-2xl">
                <Image
                  src="/dp.jpeg"
                  alt="Sudipta Maity"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full"
                  priority
                />
              </div>
              {/* Glow effect behind image */}
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-3xl"></div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}