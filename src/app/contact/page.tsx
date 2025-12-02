"use client";

import { useState } from "react";
import { Socials } from "@/components/socials";
import { Mail, Send, User, MessageSquare } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabaseClient";

export default function ContactPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const supabase = createClient();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setStatus("idle");

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    try {
      const { error } = await supabase
        .from("messages")
        .insert([{ name, email, message }]);

      if (error) throw error;

      setStatus("success");
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error("Error sending message:", error);
      setStatus("error");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold flex items-center gap-4 mb-4">
              <Mail className="text-primary h-10 w-10" /> Let's Connect!
            </h1>
            <p className="text-lg text-muted-foreground">
              Have a project in mind or just want to say hi? Fill out the form below or reach out via social media.
            </p>
          </div>
          
          <Socials />
        </div>

        <div className="bg-card p-8 rounded-xl border shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium flex items-center gap-2">
                <User size={16} /> Name
              </label>
              <Input id="name" name="name" required disabled={isLoading} />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
                <Mail size={16} /> Email
              </label>
              <Input id="email" name="email" type="email" required disabled={isLoading} />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium flex items-center gap-2">
                <MessageSquare size={16} /> Message
              </label>
              <Textarea 
                id="message" 
                name="message" 
                className="min-h-[150px]" 
                required 
                disabled={isLoading}
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                "Sending..."
              ) : (
                <>
                  Send Message <Send size={16} className="ml-2" />
                </>
              )}
            </Button>

            {status === "success" && (
              <div className="p-4 bg-green-500/10 text-green-500 rounded-md text-center">
                Message sent successfully! I'll get back to you soon.
              </div>
            )}
            
            {status === "error" && (
              <div className="p-4 bg-destructive/10 text-destructive rounded-md text-center">
                Failed to send message. Please try again later.
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
