// components/Footer.tsx
"use client";
import React from "react";
import Link from "next/link";
import { Github,Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full border-t border-white/10 bg-black/50 text-white py-6 mt-12">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-sm text-white/70">
          &copy; {new Date().getFullYear()} <span className="font-semibold text-white">Groqify</span>. All rights reserved.
        </div>

        <div className="flex space-x-4">
          <Link
            href="https://github.com/jaisinghrajput"
            className="hover:text-purple-400 transition"
            target="_blank"
          >
            <Github size={20} />
          </Link>
          <Link
            href="mailto:jaisinghmitrc+groqify@gmail.com"
            className="hover:text-pink-400 transition"
          >
            <Mail size={20} />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
