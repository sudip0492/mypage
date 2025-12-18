"use client";

import { Hero } from "./hero";
import { About } from "./about";
import { Skills } from "./skills";
import { Contact } from "./contact";
import { type Post } from "@/types";

interface HomePageProps {
  posts: Post[];
}

export function HomePage({ posts }: HomePageProps) {
  return (
    <div className="w-full pt-20">
      <section id="home" className="min-h-[calc(100dvh-5rem)] flex items-start justify-center pt-6 md:pt-10 pb-32 md:pb-40">
        <Hero />
      </section>

      <section id="about" className="min-h-[calc(100dvh-5rem)] flex items-start justify-center px-3 md:px-6 pt-12 md:pt-16 pb-32 md:pb-40">
        <About />
      </section>

      <section id="skills" className="min-h-[calc(100dvh-5rem)] flex items-start justify-center px-3 md:px-6 pt-12 md:pt-16 pb-32 md:pb-40">
        <div className="w-full max-w-7xl">
          <Skills />
        </div>
      </section>

      <section id="contact" className="min-h-[calc(100dvh-5rem)] flex items-start justify-center px-3 md:px-6 pt-12 md:pt-16 pb-40 md:pb-48">
        <div className="w-full max-w-7xl">
          <Contact />
        </div>
      </section>
    </div>
  );
}

