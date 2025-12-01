// src/app/blog/page.tsx
import { BlogPostCard } from "@/components/blog-post-card";
import { getPublishedPosts } from "@/lib/blog";
import { type Post } from "@/types";

export const revalidate = 3600; // Revalidate at most every hour

export default async function BlogPage() {
  try {
    const posts = await getPublishedPosts();

    return (
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-12">
          Blog
        </h1>
        {posts && posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <BlogPostCard key={post.id} post={post as Post} />
            ))}
          </div>
        ) : (
          <div className="text-center text-lg text-muted-foreground">
            No published posts yet.
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error("BlogPage: Error rendering page:", error);
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8">
          Error
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground">
          Something went wrong while loading blog posts.
        </p>
      </div>
    );
  }
}