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
    <div className="relative h-full flex items-center justify-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-3 md:px-4 w-full">
        <div className="flex flex-col justify-between h-full max-h-[calc(100vh-8rem)] py-6 md:py-8">
          {/* Name */}
          <div className="text-center flex-shrink-0 mb-6 md:mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight px-2 whitespace-nowrap">
              <span className="relative inline-block">
                {/* Glow layer - blurred duplicate */}
                <span
                  className="absolute inset-0 bg-gradient-to-br from-slate-400 via-amber-600 via-slate-300 to-yellow-600 text-transparent bg-clip-text animate-flowing-gradient bg-[length:200%_auto] blur-md opacity-50"
                  aria-hidden="true"
                >
                  Sudipta Maity
                </span>
                {/* Main text layer - gradient */}
                <span
                  className="relative bg-gradient-to-br from-slate-400 via-amber-600 via-slate-300 to-yellow-600 text-transparent bg-clip-text animate-flowing-gradient bg-[length:200%_auto]"
                >
                  Sudipta Maity
                </span>
              </span>
            </h1>
          </div>

          {/* Professional Info Section */}
          <div className="flex flex-col md:flex-row items-start justify-center gap-4 md:gap-8 max-w-6xl mx-auto flex-1 min-h-0">
            {/* Profile Image */}
            <div className="relative group flex-shrink-0 mx-auto md:mx-0">
              <div className="w-24 h-24 md:w-48 md:h-48 lg:w-52 lg:h-52 relative">
                <div className="relative w-full h-full rounded-full overflow-hidden border-[3px] md:border-[4px] animate-rgb-border">
                  <Image
                    src="/dp.jpeg"
                    alt="Sudipta Maity"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-full"
                  />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 max-w-2xl min-h-0 overflow-hidden">
              <div className="space-y-2 md:space-y-4">
                <p className="text-[10px] md:text-sm lg:text-base leading-relaxed text-muted-foreground">
                  I'm a <span className="text-white font-semibold">passionate and versatile creator</span>, blending the art of design with the precision of engineering.
                </p>
                <p className="text-[10px] md:text-sm lg:text-base leading-relaxed text-muted-foreground">
                  As a <span className="text-purple-400 font-semibold">Software Engineer</span>, I build robust and scalable applications. As a <span className="text-pink-400 font-semibold">Web & Mobile Developer</span>, I create seamless cross-platform experiences.
                </p>
                <p className="text-[10px] md:text-sm lg:text-base leading-relaxed text-muted-foreground">
                  At <span className="text-green-400 font-semibold">Tejas Networks</span>, I am a <span className="text-purple-400 font-semibold">Network Engineer</span> where I work on telecom network components with expertise in <span className="text-green-400 font-semibold">C++</span> and <span className="text-green-400 font-semibold">Linux</span>.
                </p>
                <div className="pt-2 md:pt-4 border-t border-white/10 hidden lg:block">
                  <p className="text-xs md:text-sm lg:text-base font-semibold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
                    My goal is to create work that is not only functional and beautiful but also pushes the boundaries of what's possible.
                  </p>
                </div>

                {/* Highlights Grid */}
                <div className="grid grid-cols-2 gap-2 md:gap-3 pt-3 md:pt-5">
                  {highlights.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-1 md:gap-1.5 p-1.5 md:p-2 rounded-lg bg-white/5 border border-white/10 hover:border-purple-500/50 hover:scale-105 transition-all duration-200"
                    >
                      <item.icon size={11} className={`${item.color} md:w-[14px] md:h-[14px]`} />
                      <span className="text-[8px] md:text-[10px] lg:text-xs font-medium">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Social Links at Bottom */}
          <div className="text-center flex-shrink-0 mt-6 md:mt-8">
            <Socials />
          </div>
        </div>
      </div>
    </div>
  );
}