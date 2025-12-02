import { Heart } from "lucide-react";

export function Passion() {
  return (
    <div className="py-20">
      <h2 className="text-3xl font-bold text-center flex items-center justify-center gap-2">
        <Heart size={30} fill="red" color="red" /> My Passion
      </h2>
      <p className="mt-8 text-lg text-center max-w-3xl mx-auto">
        I am driven by a deep passion for creation and innovation. Whether it's crafting an elegant piece of code, designing a stunning user interface, or exploring the creative potential of generative AI, I am constantly seeking new ways to build and innovate. I believe that the best solutions are found at the intersection of different disciplines, and I am passionate about combining my skills in technology and design to create truly unique and impactful work.
      </p>
    </div>
  );
}

