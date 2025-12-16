"use client";

import { Hero } from "./hero";
import { type Post } from "@/types";

interface HomePageProps {
  posts: Post[];
}

export function HomePage({ posts }: HomePageProps) {
  return (
    <div className="h-screen w-screen overflow-hidden flex items-center justify-center">
      <Hero />
    </div>
  );
}

