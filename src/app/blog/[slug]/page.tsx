import { notFound } from "next/navigation";
import { CalendarDays } from "lucide-react";
import { getPostBySlug } from "@/lib/blog";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { TiptapRender } from "@/components/tiptap-render"; // Import the TiptapRender component

export const revalidate = 3600; // Revalidate at most every hour

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-20 max-w-4xl">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <div className="flex items-center justify-between text-muted-foreground text-sm mb-8">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <CalendarDays size={16} />
            <span>
              {post.published_at
                ? new Date(post.published_at).toLocaleDateString('en-US')
                : "N/A"}
            </span>
          </div>
        </div>
      </div>
      <article className="prose dark:prose-invert max-w-none">
        {post.content ? (
          typeof post.content === 'object' ? (
            <TiptapRender content={post.content} />
          ) : (
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content}
            </ReactMarkdown>
          )
        ) : (
          <p>This post has no content.</p>
        )}
      </article>
    </div>
  );
}
