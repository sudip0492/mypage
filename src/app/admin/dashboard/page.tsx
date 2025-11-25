"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { ADMIN_EMAIL } from "@/lib/constants";
import Link from "next/link";
import { PlusCircle, Newspaper } from "lucide-react";

export default function AdminDashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function getUser() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
      } else if (user.email !== ADMIN_EMAIL) {
        router.push("/"); // Redirect non-admins to home
      } else {
        setUser(user);
      }
      setLoading(false);
    }
    getUser();
  }, [router]);

  async function handleLogout() {
    setLoading(true);
    await supabase.auth.signOut();
    router.push("/login");
    setLoading(false);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-theme(spacing.16))]">
        Loading...
      </div>
    );
  }

  if (!user) {
    return null; // Should redirect
  }

  return (
    <div className="container mx-auto px-4 py-20 text-center">
      <h1 className="text-3xl font-bold">Welcome, Admin!</h1>
      <p className="mt-4">Here you can manage your blog posts.</p>
      <div className="mt-8 flex justify-center gap-4">
        <Link href="/admin/create-post" passHref>
          <Button>
            <PlusCircle size={18} className="mr-2" />
            Create New Post
          </Button>
        </Link>
        <Link href="/admin/manage-posts" passHref>
          <Button variant="outline">
            <Newspaper size={18} className="mr-2" />
            Manage Posts
          </Button>
        </Link>
      </div>
      <Button onClick={handleLogout} className="mt-8">
        Logout
      </Button>
    </div>
  );
}
