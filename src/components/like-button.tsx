"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "./ui/button";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";

interface LikeButtonProps {
  postId: string;
}

export function LikeButton({ postId }: LikeButtonProps) {
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    async function getInitialLikes() {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      const { data, error, count } = await supabase
        .from("likes")
        .select("*", { count: "exact" })
        .eq("post_id", postId);

      if (error) {
        console.error("Error fetching likes:", error);
      } else {
        setLikes(count || 0);
        if (user && data?.some((like: any) => like.user_id === user.id)) {
          setIsLiked(true);
        }
      }
    }
    getInitialLikes();
  }, [postId, user]);

  async function handleLike() {
    if (!user) {
      router.push("/login");
      return;
    }

    if (isLiked) {
      // Unlike
      const { error } = await supabase
        .from("likes")
        .delete()
        .eq("post_id", postId)
        .eq("user_id", user.id);
      
      if (error) {
        console.error("Error unliking post:", error);
      } else {
        setLikes(likes - 1);
        setIsLiked(false);
      }
    } else {
      // Like
      const { error } = await supabase
        .from("likes")
        .insert({ post_id: postId, user_id: user.id });

      if (error) {
        console.error("Error liking post:", error);
      } else {
        setLikes(likes + 1);
        setIsLiked(true);
      }
    }
  }

  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" size="icon" onClick={handleLike}>
        <Heart className={`h-4 w-4 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
      </Button>
      <span>{likes} {likes === 1 ? "like" : "likes"}</span>
    </div>
  );
}
