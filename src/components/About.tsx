// app/about/page.tsx or wherever your route is
"use client";
import React from "react";
import { Sparkles } from "lucide-react";

const AboutPage = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white px-6 py-12 flex items-center justify-center">
      {/* Blurred Gradient Background Effects */}
      <div className="hidden lg:block absolute -top-10 -left-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse z-0" />
      <div className="hidden lg:block absolute -bottom-10 -right-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse z-0" />

      {/* Main Content */}
      <div className="relative z-10 max-w-3xl w-full text-center space-y-6">
        <div className="flex justify-center mb-4">
          <Sparkles size={32} className="text-purple-400 animate-fade-in" />
        </div>

        <h1 className="text-4xl lg:text-5xl font-bold text-white animate-fade-up">
          About Groqify
        </h1>

        <p className="text-white/70 text-lg leading-relaxed animate-fade-up delay-100">
          Groqify is a smart, modern AI chat application powered by the lightning-fast Groq LPU and designed for developers, learners, and creators. Ask questions, explore ideas, and get instant intelligent responses.
        </p>

        <p className="text-white/60 text-md animate-fade-up delay-200">
          Built with ❤️ using Next.js, Tailwind CSS, and the Groq API. Whether you're coding, writing, or researching — Groqify is your sleek assistant.
        </p>

        <div className="mt-6 animate-fade-up delay-300">
          <a
            href="/chat"
            className="inline-block px-6 py-3 text-sm font-medium bg-gradient-to-br from-purple-600 to-blue-500 text-white rounded-xl hover:opacity-90 transition"
          >
            Start Chatting
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
