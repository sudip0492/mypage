import { supabase } from "@/lib/supabase";
import { TiptapRender } from "@/components/tiptap-render";
import { notFound } from "next/navigation";
import { CalendarDays, User } from "lucide-react";
import { LikeButton } from "@/components/like-button";
import { Comments } from "@/components/comments";

export const revalidate = 0; // Revalidate every time

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const { data: post, error } = await supabase
    .from("posts")
    .select("id, title, content, created_at, slug, author_id, profiles(username)")
    .eq("slug", params.slug)
    .single();

  if (error || !post) {
    console.error("Error fetching post:", error);
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-20 max-w-4xl">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <div className="flex items-center justify-between text-muted-foreground text-sm mb-8">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <CalendarDays size={16} />
            <span>{new Date(post.created_at).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <User size={16} />
            <span>{post.profiles ? (post.profiles as any).username : "Unknown"}</span>
          </div>
        </div>
        <LikeButton postId={post.id} />
      </div>
      <article className="prose dark:prose-invert max-w-none">
        <TiptapRender content={post.content} />
      </article>
      <Comments postId={post.id} />
    </div>
  );
}
