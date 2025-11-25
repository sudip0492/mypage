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
import { Post } from "lucide-react";
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

export default function CreatePostPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function checkAdmin() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
      } else if (user.email !== ADMIN_EMAIL) {
        router.push("/");
      } else {
        setLoading(false);
      }
    }
    checkAdmin();
  }, [router]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      slug: "",
      content: {},
    },
  });

  // Automatically generate slug from title
  const title = form.watch("title");
  if (title && form.getValues("slug") === "") {
    form.setValue("slug", slugify(title));
  }


  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setError(null);

    const { data: { user } } = await supabase.auth.getUser();

    if (!user || user.email !== ADMIN_EMAIL) {
      setError("You do not have permission to create a post.");
      setLoading(false);
      return;
    }

    const { error } = await supabase.from("posts").insert({
      title: values.title,
      slug: values.slug,
      content: JSON.stringify(values.content), // Store Tiptap's JSON output
      author_id: user.id,
    });

    if (error) {
      setError(error.message);
    } else {
      router.push("/admin/dashboard"); // Redirect after successful post
    }
    setLoading(false);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-theme(spacing.16))]">
        Loading...
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-3xl font-bold text-center flex items-center justify-center gap-2">
        <Post size={30} /> Create New Blog Post
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
                  <TextEditor content={""} onUpdate={(json) => field.onChange(json)} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <Button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Post"}
          </Button>
        </form>
      </Form>
    </div>
  );
}