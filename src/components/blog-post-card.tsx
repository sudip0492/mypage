"use client";

"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

import Image from "next/image"; // Import next/image

interface BlogPostCardProps {
  post: {
    id: string;
    title: string;
    slug: string;
    excerpt?: string;
    cover_image?: string;
    published_at: string;
  };
}

export function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <motion.div whileHover={{ scale: 1.05, y: -5 }}>
      <Card className="h-full flex flex-col">
        <CardHeader>
          <CardTitle>{post.title}</CardTitle>
          <CardDescription>
            Posted on {post.published_at ? new Date(post.published_at).toLocaleDateString() : "N/A"}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          {post.cover_image && (
            <div className="relative w-full h-48 mb-4 rounded-md overflow-hidden">
              <Image
                src={post.cover_image}
                alt={post.title}
                fill
                style={{ objectFit: "cover" }}
                className="rounded-md"
              />
            </div>
          )}
          <p>{post.excerpt || "No excerpt available."}</p>
        </CardContent>
        <CardFooter>
          <Link href={`/blog/${post.slug}`} passHref>
            <Button>Read More</Button>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
