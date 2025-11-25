"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { TextEditor } from "@/components/text-editor";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Edit } from "lucide-react";
import { ADMIN_EMAIL } from "@/lib/constants";

// For slug generation
function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
}

const formSchema = z.object({
  title: z.string().min(10, { message: "Title must be at least 10 characters." }),
  slug: z.string().min(5, { message: "Slug must be at least 5 characters." }),
  content: z.any().refine((val) => Object.keys(val).length > 0, { message: "Content cannot be empty." }),
});

export default function EditPostPage({ params }: { params: { id: string } }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      slug: "",
      content: {},
    },
  });

  useEffect(() => {
    async function fetchPost() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }
      if (user.email !== ADMIN_EMAIL) {
        router.push("/");
        return;
      }

      const { data: post, error } = await supabase
        .from("posts")
        .select("id, title, content, slug, author_id")
        .eq("id", params.id)
        .single();

      if (error || !post) {
        console.error("Error fetching post:", error);
        setError("Post not found.");
        setLoading(false);
        return;
      }

      form.reset({
        title: post.title,
        slug: post.slug,
        content: JSON.parse(post.content),
      });
      setLoading(false);
    }
    fetchPost();
  }, [params.id, router, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setError(null);

    const { data: { user } } = await supabase.auth.getUser();

    if (!user || user.email !== ADMIN_EMAIL) {
      setError("You do not have permission to edit a post.");
      setLoading(false);
      return;
    }

    const { error } = await supabase.from("posts").update({
      title: values.title,
      slug: values.slug,
      content: JSON.stringify(values.content),
    }).eq("id", params.id);

    if (error) {
      setError(error.message);
    } else {
      router.push("/admin/manage-posts"); // Redirect after successful post
    }
    setLoading(false);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-theme(spacing.16))]">
        Loading post...
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold text-red-500">{error}</h1>
        <Button onClick={() => router.push("/admin/manage-posts")} className="mt-8">
            Go Back to Manage Posts
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-3xl font-bold text-center flex items-center justify-center gap-2">
        <Edit size={30} /> Edit Blog Post
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-8 max-w-3xl mx-auto">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Your amazing blog post title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input placeholder="your-amazing-blog-post-title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <TextEditor content={JSON.stringify(field.value)} onUpdate={(json) => field.onChange(json)} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <Button type="submit" disabled={loading}>
            {loading ? "Updating..." : "Update Post"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
