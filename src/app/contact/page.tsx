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
    <div className="h-full w-full flex items-center justify-center overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-3 md:px-4 max-h-full overflow-y-auto pb-20 md:pb-16 py-2 md:py-8">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-12">
        <div className="space-y-3 md:space-y-8">
          <div>
            <h1 className="text-xl md:text-5xl font-bold flex items-center gap-2 md:gap-3 mb-2 md:mb-4">
              <Mail className="text-primary h-5 w-5 md:h-10 md:w-10" /> Let's Connect!
            </h1>
            <p className="text-xs md:text-lg text-muted-foreground">
              Have a project in mind or just want to say hi? Fill out the form below or reach out via social media.
            </p>
          </div>

          <Socials />
        </div>

        <div className="bg-card p-3 md:p-8 rounded-xl border shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-3 md:space-y-6">
            <div className="space-y-1 md:space-y-2">
              <label htmlFor="name" className="text-xs md:text-sm font-medium flex items-center gap-2">
                <User size={14} /> Name
              </label>
              <Input id="name" name="name" required disabled={isLoading} className="text-sm" />
            </div>

            <div className="space-y-1 md:space-y-2">
              <label htmlFor="email" className="text-xs md:text-sm font-medium flex items-center gap-2">
                <Mail size={14} /> Email
              </label>
              <Input id="email" name="email" type="email" required disabled={isLoading} className="text-sm" />
            </div>

            <div className="space-y-1 md:space-y-2">
              <label htmlFor="message" className="text-xs md:text-sm font-medium flex items-center gap-2">
                <MessageSquare size={14} /> Message
              </label>
              <Textarea
                id="message"
                name="message"
                className="min-h-[100px] md:min-h-[150px] text-sm"
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
              <div className="p-2 md:p-4 bg-green-500/10 text-green-500 rounded-md text-center text-xs md:text-sm">
                Message sent successfully! I'll get back to you soon.
              </div>
            )}

            {status === "error" && (
              <div className="p-2 md:p-4 bg-destructive/10 text-destructive rounded-md text-center text-xs md:text-sm">
                Failed to send message. Please try again later.
              </div>
            )}
          </form>
        </div>
      </div>
      </div>
    </div>
  );
}
