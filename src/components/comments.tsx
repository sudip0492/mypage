"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface CommentsProps {
  postId: string;
}

export function Comments({ postId }: CommentsProps) {
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState("");
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    async function getUser() {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    }
    getUser();
    fetchComments();
  }, [postId]);

  async function fetchComments() {
    const { data, error } = await supabase
      .from("comments")
      .select("id, content, created_at, profiles(username, avatar_url)")
      .eq("post_id", postId)
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Error fetching comments:", error);
    } else {
      setComments(data || []);
    }
  }

  async function handleCommentSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!user) {
      router.push("/login");
      return;
    }
    if (!newComment.trim()) return;

    const { error } = await supabase
      .from("comments")
      .insert({ post_id: postId, user_id: user.id, content: newComment });

    if (error) {
      console.error("Error posting comment:", error);
    } else {
      setNewComment("");
      fetchComments(); // Refresh comments
    }
  }

  return (
    <div className="mt-12">
      <h3 className="text-2xl font-bold mb-6">Comments</h3>
      
      {user ? (
        <form onSubmit={handleCommentSubmit} className="mb-8">
          <Textarea
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="mb-2"
          />
          <Button type="submit">Post Comment</Button>
        </form>
      ) : (
        <div className="mb-8 text-center p-4 border rounded-md">
          <p>
            <Link href="/login" className="underline font-semibold">Log in</Link> to post a comment.
          </p>
        </div>
      )}

      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-4">
            <Avatar>
              <AvatarImage src={(comment.profiles as any)?.avatar_url} />
              <AvatarFallback>{(comment.profiles as any)?.username?.charAt(0) || 'U'}</AvatarFallback>
            </Avatar>
            <div className="flex-grow">
              <div className="flex justify-between items-center">
                <p className="font-bold">{(comment.profiles as any)?.username || 'Anonymous'}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(comment.created_at).toLocaleDateString()}
                </p>
              </div>
              <p className="mt-1">{comment.content}</p>
            </div>
          </div>
        ))}
        {comments.length === 0 && (
          <p className="text-center text-muted-foreground">No comments yet. Be the first to comment!</p>
        )}
      </div>
    </div>
  );
}
