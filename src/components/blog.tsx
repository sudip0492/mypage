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

const posts = [
  {
    title: "The Rise of Generative AI",
    description: "A look into the recent advancements in generative AI and what it means for the future of technology and creativity.",
    tags: ["AI", "Machine Learning", "Technology"],
    date: "November 25, 2025",
  },
  {
    title: "Designing for Emotion",
    description: "Exploring the principles of emotional design and how to create user experiences that are not only functional but also delightful.",
    tags: ["UI/UX", "Design", "Psychology"],
    date: "November 18, 2025",
  },
  {
    title: "A Deep Dive into React Server Components",
    description: "An in-depth guide to understanding and using React Server Components to build faster and more efficient web applications.",
    tags: ["React", "Web Development", "Next.js"],
    date: "November 11, 2025",
  },
];

export function Blog() {
  return (
    <div className="py-20">
      <h2 className="text-3xl font-bold text-center flex items-center justify-center gap-2">
        <Rss size={30} /> From My Blog
      </h2>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <motion.div
            key={post.title}
            whileHover={{ scale: 1.05, y: -5 }}
          >
            <Card className="h-full flex flex-col">
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
                <p className="text-sm text-muted-foreground">{post.date}</p>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription>{post.description}</CardDescription>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                    <Badge key={tag} variant="outline">{tag}</Badge>
                    ))}
                </div>
                <Button variant="link">Read More</Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
