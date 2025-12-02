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
import { motion } from "framer-motion";
import { Rss } from "lucide-react";
import { type Post } from "@/types";
import Link from "next/link";

interface BlogProps {
  posts: Post[];
}

export function Blog({ posts }: BlogProps) {
  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <div className="py-20">
      <h2 className="text-3xl font-bold text-center flex items-center justify-center gap-2">
        <Rss size={30} /> From My Blog
      </h2>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.slice(0, 3).map((post) => (
          <motion.div
            key={post.id}
            whileHover={{ scale: 1.05, y: -5 }}
          >
            <Card className="h-full flex flex-col">
              <CardHeader>
                <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {new Date(post.published_at).toLocaleDateString()}
                </p>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription className="line-clamp-3">
                  {post.excerpt || "No excerpt available."}
                </CardDescription>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                {/* Tags are currently not in the Post type, hiding for now or we can add if available in DB */}
                <div className="flex flex-wrap gap-2">
                   {/* Placeholder for tags if we add them to DB later */}
                </div>
                <Link href={`/blog/${post.slug}`}>
                  <Button variant="link">Read More</Button>
                </Link>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
