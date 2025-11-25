"use client";

import {
  FaFacebook,
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
};

export function Socials() {
  return (
    <div className="flex justify-center gap-6 my-4">
      {Object.entries(socialLinks).map(([key, value]) => {
        const Icon = socialIcons[key as keyof typeof socialIcons];
        return (
          <motion.a
            key={key}
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            className="text-3xl text-gray-500 hover:text-primary transition-colors"
            whileHover={{ scale: 1.2, y: -2 }}
          >
            <Icon />
          </motion.a>
        );
      })}
    </div>
  );
}
