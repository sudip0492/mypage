import { TypeAnimation } from "react-type-animation";
import { Socials } from "./socials";

export function Hero() {
  return (
    <div className="p-8">
      <div className="flex flex-col items-center justify-center text-center">
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-extrabold mb-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
          Sudipta Maity
        </h1>
        <TypeAnimation
          sequence={[
            "Hello, Welcome to My Page!",
            1000,
            "I am a Full Stack Web Developer.",
            1000,
            "I am a Graphic Designer.",
            1000,
            "I am a Software Engineer.",
            1000,
            "I am a GenAI Engineer.",
            1000,
          ]}
          wrapper="p"
          speed={50}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-8"
          repeat={Infinity}
        />
        <Socials />
      </div>
    </div>
  );
}

