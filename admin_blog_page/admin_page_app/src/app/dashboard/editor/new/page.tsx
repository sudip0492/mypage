// src/app/dashboard/editor/new/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function NewPostPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState(""); // Content is now a Markdown string
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async (publish: boolean = false) => {
    setIsSaving(true);

    if (!title || !content) {
      alert("Title and content are required.");
      setIsSaving(false);
      return;
    }

    const postData = {
      title,
      content, // Send Markdown string directly
      excerpt,
      cover_image: coverImage,
      status: publish ? "published" : "draft",
    };

    const response = await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });

    if (response.ok) {
      const newPost = await response.json();
      alert(publish ? "Post published successfully!" : "Draft saved successfully!");
      router.push(`/dashboard/editor/${newPost.id}`);
    } else {
      let errorMsg = response.statusText;
      try {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const errorData = await response.json();
          errorMsg = errorData.error || errorMsg;
        }
      } catch (e) { /* Ignore */ }
      alert(`Error saving post: ${errorMsg}`);
    }

    setIsSaving(false);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Create New Post</h1>

      <div className="space-y-6">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Post Title"
          />
        </div>
        <div>
          <Label htmlFor="excerpt">Excerpt</Label>
          <Textarea
            id="excerpt"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="A brief summary of your post..."
            rows={3}
          />
        </div>
        <div>
          <Label htmlFor="coverImage">Cover Image URL</Label>
          <Input
            id="coverImage"
            value={coverImage || ""}
            onChange={(e) => setCoverImage(e.target.value)}
            placeholder="https://example.com/cover.jpg"
          />
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
          <Button
            variant="outline"
            onClick={() => handleSave(false)}
            disabled={isSaving}
          >
            {isSaving ? "Saving Draft..." : "Save Draft"}
          </Button>
          <Button onClick={() => handleSave(true)} disabled={isSaving}>
            {isSaving ? "Publishing..." : "Publish"}
          </Button>
        </div>
      </div>
    </div>
  );
}
