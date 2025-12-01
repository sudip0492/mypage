// src/components/admin/manage-posts-client.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabaseClient";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Post {
  id: string;
  title: string;
  slug: string;
  status: string;
  created_at: string;
  published_at: string | null;
}

interface ManagePostsClientProps {
  initialPosts: Post[];
}

export default function ManagePostsClient({ initialPosts }: ManagePostsClientProps) {
  const router = useRouter();
  const supabase = createClient();
  const [posts, setPosts] = useState<Post[]>(initialPosts);

  const handleDelete = async (postId: string) => {
    if (!confirm("Are you sure you want to delete this post?")) {
      return;
    }

    const response = await fetch(`/api/posts/${postId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setPosts(posts.filter((post) => post.id !== postId));
      alert("Post deleted successfully!");
    } else {
      let errorMsg = response.statusText;
      try {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const errorData = await response.json();
          errorMsg = errorData.error || errorMsg;
        }
      } catch (e) {
        // Ignore JSON parse error if body is empty
      }
      alert(`Error deleting post: ${errorMsg}`);
      console.error("Error deleting post:", errorMsg);
    }
  };

  const handleChangeStatus = async (postId: string, currentStatus: string) => {
    const newStatus = currentStatus === "published" ? "draft" : "published";
    if (!confirm(`Are you sure you want to change this post's status to "${newStatus}"?`)) {
      return;
    }

    const { data: currentPost, error: fetchError } = await supabase
      .from("posts")
      .select("*")
      .eq("id", postId)
      .single();

    if (fetchError || !currentPost) {
      alert(`Error fetching post details: ${fetchError?.message || "Post not found"}`);
      console.error("Error fetching post details:", fetchError);
      return;
    }

    const response = await fetch(`/api/posts/${postId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...currentPost,
        status: newStatus,
        published_at: newStatus === "published" ? new Date().toISOString() : null,
      }),
    });

    if (response.ok) {
      setPosts(
        posts.map((post) =>
          post.id === postId ? { ...post, status: newStatus, published_at: newStatus === "published" ? new Date().toISOString() : null } : post
        )
      );
      alert(`Post status changed to "${newStatus}" successfully!`);
    } else {
      let errorMsg = response.statusText;
      try {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const errorData = await response.json();
          errorMsg = errorData.error || errorMsg;
        }
      } catch (e) {
        // Ignore JSON parse error if body is empty
      }
      alert(`Error updating post status: ${errorMsg}`);
      console.error("Error updating post status:", errorMsg);
    }
  };

  return (
    <div className="container mx-auto px-4 py-20 max-w-5xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Manage Posts</h1>
        <Link href="/admin/editor/new" passHref>
          <Button>Create New Post</Button>
        </Link>
      </div>

      {posts.length === 0 ? (
        <p className="text-center text-muted-foreground">No posts found.</p>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Your Blog Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead>Published At</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {posts.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell className="font-medium">{post.title}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          post.status === "published"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {post.status}
                      </span>
                    </TableCell>
                    <TableCell>{new Date(post.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>{post.published_at ? new Date(post.published_at).toLocaleDateString() : "N/A"}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" className="mr-2"
                         onClick={() => handleChangeStatus(post.id, post.status)}>
                        {post.status === "published" ? "Unpublish" : "Publish"}
                      </Button>
                      <Link href={`/admin/editor/${post.id}`} passHref>
                        <Button variant="outline" size="sm" className="mr-2">
                          Edit
                        </Button>
                      </Link>
                      <Button variant="destructive" size="sm" onClick={() => handleDelete(post.id)}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
