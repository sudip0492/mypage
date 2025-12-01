// src/lib/blog.ts
import { createClientWithAuth } from "@/lib/supabase/server";
import { type Post } from "@/types";

export async function getPublishedPosts(): Promise<Post[]> {
  console.log("getPublishedPosts: Initializing Supabase client...");
  const supabase = createClientWithAuth();

  console.log("getPublishedPosts: Fetching posts from Supabase...");
  const { data: posts, error } = await supabase
    .from("posts")
    .select("id, title, slug, excerpt, cover_image, published_at")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (error) {
    console.error("getPublishedPosts: Error fetching posts:", error);
    // In a real app, you might want to throw the error or return a different shape of data.
    return [];
  }

  console.log(`getPublishedPosts: Successfully fetched ${posts.length} posts.`);
  return posts as Post[];
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  console.log(`getPostBySlug: Initializing Supabase client for slug: ${slug}`);
  const supabase = createClientWithAuth();

  console.log(`getPostBySlug: Fetching post with slug: ${slug}`);
  const { data: post, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (error) {
    console.error(`getPostBySlug: Error fetching post with slug ${slug}:`, error);
    return null;
  }

  if (!post) {
    console.log(`getPostBySlug: No post found with slug: ${slug}`);
    return null;
  }

  console.log(`getPostBySlug: Successfully fetched post with slug: ${slug}`);
  return post as Post;
}
