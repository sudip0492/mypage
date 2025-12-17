"use client";

import { Hero } from "./hero";
import { type Post } from "@/types";

interface HomePageProps {
  posts: Post[];
}

export function HomePage({ posts }: HomePageProps) {
  return (
    <div className="h-full w-full overflow-hidden">
      <Hero />
    </div>
  );
}

