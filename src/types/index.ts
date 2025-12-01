// src/types/index.ts
export type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  cover_image?: string;
  published_at: string;
  content?: any; // jsonb type from Supabase
  html?: string;
  status?: string;
  author_id?: string;
  created_at?: string;
  updated_at?: string;
};
