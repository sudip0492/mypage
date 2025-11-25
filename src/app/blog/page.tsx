import { Construction } from "lucide-react";

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-20 text-center">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold flex items-center justify-center gap-4 mb-8">
        <Construction size={40} /> Under Development
      </h1>
      <p className="text-lg md:text-xl text-muted-foreground">
        This page is currently under construction. Please check back later!
      </p>
    </div>
  );
}
