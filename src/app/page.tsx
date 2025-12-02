import { HomePage } from "@/components/home-page";
import { getPublishedPosts } from "@/lib/blog";

export const revalidate = 3600; // Revalidate every hour

export default async function Home() {
  const posts = await getPublishedPosts();
  
  return (
    <HomePage posts={posts} />
  );
}
