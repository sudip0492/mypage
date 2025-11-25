import { User } from "lucide-react";

export function About() {
  return (
    <div className="py-20">
      <h2 className="text-3xl font-bold text-center flex items-center justify-center gap-2">
        <User size={30} /> About Me
      </h2>
      <p className="mt-8 text-lg text-center max-w-3xl mx-auto">
        I'm a passionate and versatile creator, blending the art of design with the precision of engineering. As a Full Stack Web Developer, I build seamless and engaging digital experiences. As a Graphic Designer, I craft visually compelling narratives. As a Software and GenAI Engineer, I explore the frontiers of artificial intelligence to build smarter and more innovative solutions. My goal is to create work that is not only functional and beautiful but also pushes the boundaries of what's possible.
      </p>
    </div>
  );
}

