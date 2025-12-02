import { User } from "lucide-react";
import Image from 'next/image';

export function About() {
  return (
    <div className="py-20">
      <h2 className="text-3xl font-bold text-center flex items-center justify-center gap-2">
        <User size={30} /> About Me
      </h2>
      <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-10 max-w-5xl mx-auto">
        <div className="w-48 h-48 md:w-60 md:h-60 relative">
          <Image
            src="/dp.jpeg"
            alt="Sudipta Maity"
            layout="fill"
            objectFit="cover"
            className="rounded-full"
          />
        </div>
        <p className="text-lg text-left max-w-3xl">
          I'm a passionate and versatile creator, blending the art of design with the precision of engineering. As a Full Stack Web Developer, I build seamless and engaging digital experiences. As a Graphic Designer, I craft visually compelling narratives. As a Software and GenAI Engineer, I explore the frontiers of artificial intelligence to build smarter and more innovative solutions. My goal is to create work that is not only functional and beautiful but also pushes the boundaries of what's possible.
        </p>
      </div>
    </div>
  );
}
