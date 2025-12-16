"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Socials } from "./socials";

const ROLES = ["Software Developer", "Web Developer", "Mobile Developer"];

export function Hero() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (step === 0) {
      timeout = setTimeout(() => setStep(1), 2000);
    } else {
      if (step < ROLES.length) {
        timeout = setTimeout(() => setStep((prev) => prev + 1), 1000);
      } else {
        timeout = setTimeout(() => setStep(0), 3000);
      }
    }
    return () => clearTimeout(timeout);
  }, [step]);

  return (
    <div className="relative p-4 md:p-8">
      <div className="relative flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold mb-4 leading-tight px-2">
          <span className="relative inline-block">
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text animate-gradient-x">
              Sudipta Maity
            </span>
          </span>
        </h1>

        <div className="h-32 md:h-24 mb-8 flex items-center justify-center w-full max-w-4xl px-2">
          <AnimatePresence mode="wait">
            {step === 0 ? (
              <motion.span
                key="greeting"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-lg sm:text-xl md:text-3xl lg:text-4xl font-bold text-white drop-shadow-[0_0_25px_rgba(139,92,246,0.6)] px-4"
              >
                Hi, Welcome to My Page!
              </motion.span>
            ) : (
              <div className="flex flex-wrap justify-center gap-2 md:gap-3 px-4">
                {ROLES.slice(0, step).map((role, index) => (
                  <motion.div
                    key={role}
                    initial={{ opacity: 0, scale: 0.5, rotateX: -90 }}
                    animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                      delay: index * 0.1,
                    }}
                  >
                    <Badge
                      variant="secondary"
                      className="text-sm sm:text-base md:text-lg lg:text-xl py-1.5 px-3 md:py-2 md:px-4 shadow-lg border border-purple-500/30 whitespace-nowrap bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm hover:from-blue-500/20 hover:to-purple-500/20 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/20"
                    >
                      {role}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Social Links */}
        <div className="mt-8">
          <Socials />
        </div>
      </div>
    </div>
  );
}