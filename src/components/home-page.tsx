"use client";

import { Hero } from "./hero";
import { Passion } from "./passion";
import { Blog } from "./blog";
import { Testimonials } from "./testimonials";

export function HomePage() {
  return (
    <div>
      <div className="relative h-screen flex items-center justify-center">
        <Hero />
      </div>
      <div className="container mx-auto px-4">
        <Passion />
        {/* <Blog /> */}
        {/* <Testimonials /> */}
      </div>
    </div>
  );
}

