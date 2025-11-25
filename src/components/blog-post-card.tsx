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

interface BlogPostCardProps {
  post: {
    id: string;
    title: string;
    content: string; // Tiptap JSON string
    created_at: string;
    slug: string;
  };
}

export function BlogPostCard({ post }: BlogPostCardProps) {
  // Extract a plain text summary from Tiptap JSON content
  const getSummary = (jsonContent: string) => {
    try {
      const content = JSON.parse(jsonContent);
      let summary = "";
      content.content.forEach((node: any) => {
        if (node.type === "paragraph" && node.content) {
          summary += node.content.map((textNode: any) => textNode.text).join(" ") + " ";
        }
      });
      return summary.substring(0, 150) + "..."; // Truncate for summary
    } catch (e) {
      return "No content summary available.";
    }
  };

  return (
    <motion.div whileHover={{ scale: 1.05, y: -5 }}>
      <Card className="h-full flex flex-col">
        <CardHeader>
          <CardTitle>{post.title}</CardTitle>
          <CardDescription>
            Posted on {new Date(post.created_at).toLocaleDateString()}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <p>{getSummary(post.content)}</p>
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
