// src/app/dashboard/editor/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface EditPostPageProps {
  params: {
    id: string;
  };
}

export default function EditPostPage({ params }: EditPostPageProps) {
  const router = useRouter();
  const supabase = createClient();
  const { id } = params;

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState<any>(""); // Content is now a Markdown string
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [status, setStatus] = useState<"draft" | "published">("draft");
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  useEffect(() => {
    async function fetchPost() {
      if (!id) return;

      setLoading(true);
      const { data: post, error } = await supabase
        .from("posts")
        .select("*")
        .eq("id", id)
        .single();

      if (error || !post) {
        alert("Error fetching post or post not found.");
        router.push("/dashboard/manage-posts");
        return;
      }

      setTitle(post.title || "");
      setSlug(post.slug || "");
      setExcerpt(post.excerpt || "");
      setContent(post.content); // Assuming post.content is now Markdown
      setCoverImage(post.cover_image || null);
      setStatus(post.status as "draft" | "published");
      setLoading(false);
    }

    fetchPost();
  }, [id, router, supabase]);

  const handleSave = async (publish: boolean) => {
    setIsSaving(true);

    if (!title || !slug || !content) {
      alert("Title, slug, and content are required.");
      setIsSaving(false);
      return;
    }

    const newStatus = publish ? "published" : "draft";
    const postData = {
      title,
      slug,
      content, // Send Markdown string directly
      excerpt,
      cover_image: coverImage,
      status: newStatus,
    };

    const response = await fetch(`/api/posts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postData),
    });

    if (response.ok) {
      setStatus(newStatus);
      alert("Post saved successfully!");
    } else {
      let errorMsg = response.statusText;
      try {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const errorData = await response.json();
          errorMsg = errorData.error || errorMsg;
        }
      } catch (e) { /* Ignore JSON parse error */ }
      alert(`Error saving post: ${errorMsg}`);
    }
    setIsSaving(false);
  };

  if (loading) {
    return <div className="text-center p-8">Loading post...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Edit Post</h1>
      <div className="space-y-6">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="slug">Slug</Label>
          <Input id="slug" value={slug} onChange={(e) => setSlug(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="excerpt">Excerpt</Label>
          <Textarea id="excerpt" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="coverImage">Cover Image URL</Label>
          <Input id="coverImage" value={coverImage || ""} onChange={(e) => setCoverImage(e.target.value)} />
        </div>
        
        <div>
          <Label htmlFor="content">Content</Label>
          <Textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your post content using Markdown. You can add images using ![alt text](image_url)."
            rows={20}
            className="font-mono"
          />
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <Button variant="outline" onClick={() => handleSave(false)} disabled={isSaving}>
            {isSaving ? "Saving..." : "Save Draft"}
          </Button>
          <Button onClick={() => handleSave(true)} disabled={isSaving}>
            {isSaving ? "Publishing..." : "Publish"}
          </Button>
        </div>
      </div>
    </div>
  );
}
