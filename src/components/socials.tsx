"use client";

import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import socialLinks from "@/lib/social_links.json";
import { motion } from "framer-motion";

const socialIcons = {
  facebook: FaFacebook,
  instagram: FaInstagram,
  linkedin: FaLinkedin,
  x: FaXTwitter,
  github: FaGithub,
};

const socialColors: { [key: string]: string } = {
  facebook: "text-blue-600",
  instagram: "text-pink-500",
  linkedin: "text-blue-700",
  x: "text-gray-300",
  github: "text-gray-400",
};

export function Socials() {
  return (
    <div className="flex justify-center gap-6 my-4">
      {Object.entries(socialLinks).map(([key, value]) => {
        const Icon = socialIcons[key as keyof typeof socialIcons];
        const colorClass = socialColors[key] || "text-gray-500"; // Fallback to gray if color not defined
        return (
          <motion.a
            key={key}
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            className={`text-3xl ${colorClass} hover:opacity-80 transition-opacity`}
            whileHover={{ scale: 1.2, y: -2 }}
          >
            <Icon />
          </motion.a>
        );
      })}
    </div>
  );
}
