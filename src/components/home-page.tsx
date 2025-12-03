"use client";

import { Hero } from "./hero";
import { Passion } from "./passion";
import { Blog } from "./blog";
import { type Post } from "@/types";

interface HomePageProps {
  posts: Post[];
}

export function HomePage({ posts }: HomePageProps) {
  return (
    <div>
      <div className="relative h-screen flex items-center justify-center">
        <Hero />
      </div>
      <div className="container mx-auto px-4">
        <Passion />
        <Blog posts={posts} />
      </div>
    </div>
  );
}

