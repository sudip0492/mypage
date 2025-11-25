import { Socials } from "@/components/socials";
import { Mail } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-20 text-center">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold flex items-center justify-center gap-4 mb-8">
        <Mail size={40} /> Let's Connect!
      </h1>
      <p className="text-lg md:text-xl text-muted-foreground mb-12">
        The best way to reach me is through my social media channels.
      </p>
      <div className="max-w-md mx-auto">
        <Socials />
      </div>
    </div>
  );
}
