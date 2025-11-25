"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Edit, Trash, PlusCircle, Newspaper } from "lucide-react";
import { ADMIN_EMAIL } from "@/lib/constants";

export default function ManagePostsPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    async function checkUserAndFetchPosts() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }
      if (user.email !== ADMIN_EMAIL) {
        router.push("/");
        return;
      }
      setUser(user);

      const { data, error } = await supabase
        .from("posts")
        .select("id, title, created_at, slug")
        .eq("author_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching posts:", error);
      } else {
        setPosts(data || []);
      }
      setLoading(false);
    }
    checkUserAndFetchPosts();
  }, [router]);

  async function handleDelete(postId: string) {
    if (!confirm("Are you sure you want to delete this post?")) {
      return;
    }
    setLoading(true);
    const { error } = await supabase.from("posts").delete().eq("id", postId);

    if (error) {
      console.error("Error deleting post:", error);
    } else {
      setPosts(posts.filter((post) => post.id !== postId));
    }
    setLoading(false);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-theme(spacing.16))]">
        Loading posts...
      </div>
    );
  }

  if (!user) {
    return null; // Should redirect to login
  }

  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-3xl font-bold text-center flex items-center justify-center gap-2">
        <Newspaper size={30} /> Manage Your Blog Posts
      </h1>
      <div className="flex justify-end mb-8">
        <Link href="/admin/create-post" passHref>
          <Button>
            <PlusCircle size={18} className="mr-2" />
            Create New Post
          </Button>
        </Link>
      </div>

      {posts.length === 0 ? (
        <p className="text-center text-lg text-muted-foreground">You haven't created any posts yet. Start by creating one!</p>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell className="font-medium">{post.title}</TableCell>
                  <TableCell>{new Date(post.created_at).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right flex justify-end gap-2">
                    <Link href={`/admin/edit-post/${post.id}`} passHref>
                      <Button variant="outline" size="icon">
                        <Edit size={18} />
                      </Button>
                    </Link>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => handleDelete(post.id)}
                    >
                      <Trash size={18} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
