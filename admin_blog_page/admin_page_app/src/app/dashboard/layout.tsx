// src/app/dashboard/layout.tsx
"use client"; // This needs to be a client component because of the logout button

import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <div className="flex min-h-screen">
      <aside className="fixed top-0 left-0 w-64 h-full bg-card border-r">
        <div className="p-4">
          <h2 className="font-bold text-xl mb-8 text-card-foreground">Admin Menu</h2>
          <nav>
            <ul className="space-y-2">
              <li>
                <Link href="/dashboard" className="block p-2 rounded-md hover:bg-accent">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/dashboard/manage-posts" className="block p-2 rounded-md hover:bg-accent">
                  Manage Posts
                </Link>
              </li>
              <li>
                <Link href="/dashboard/editor/new" className="block p-2 rounded-md hover:bg-accent">
                  Create New Post
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
      <div className="ml-64 flex-1 flex flex-col">
        <header className="p-4 flex justify-end items-center border-b gap-4">
            <ThemeToggle />
            <Button onClick={handleLogout} variant="outline">Logout</Button>
        </header>
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
