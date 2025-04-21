"use client";
import React from "react";
import { Sparkles, Bot, Rocket, MessageCircle } from "lucide-react";
import Link from "next/link";
import useAuth from "@/context/useAuth";
export const Hero = () => {
const {authStatus} = useAuth();
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-black via-gray-900 to-black text-white px-6 py-12 relative overflow-hidden">
      {/* Glows */}
      <div className="hidden lg:block absolute -top-10 -left-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse z-0" />
      <div className="hidden lg:block absolute -bottom-10 -right-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse z-0" />

      {/* Content */}
      <div className="relative z-10 text-center max-w-3xl">
        <div className="flex justify-center items-center gap-2 text-purple-300 mb-4 animate-fade-in">
          <Sparkles size={20} />
          <span className="uppercase tracking-wide text-sm">powered by Groq</span>
        </div>

        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text mb-6 leading-tight animate-fade-in">
          Welcome to Groqify
        </h1>

        <p className="text-white/70 text-lg leading-relaxed mb-8 animate-fade-in delay-100">
          Your blazing-fast AI assistant built with Groq LPU acceleration. Ask questions, get answers, brainstorm ideas, and explore knowledge at light speed.
        </p>

        <Link href="/about">
          <button className="px-6 py-3 bg-gradient-to-br from-purple-600 to-blue-500 text-white font-semibold rounded-xl shadow-lg hover:scale-105 transition-transform duration-200 animate-fade-in delay-200">
            <MessageCircle className="inline-block mr-2" size={18} />
            About Us
          </button>
        </Link>
      </div>

      {/* Features */}
      <div className="relative z-10 mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl px-4">
        {[
          {
            icon: <Bot size={28} />,
            title: "Lightning Fast",
            desc: "Groqify uses LPUs to deliver GPT-level responses at insane speeds.",
          },
          {
            icon: <Rocket size={28} />,
            title: "Always Ready",
            desc: "No delays, no lag. Just smooth, instant conversations whenever you need.",
          },
          {
            icon: <Sparkles size={28} />,
            title: "Polished & Smart",
            desc: "Styled with modern UI, Markdown support, and code rendering built-in.",
          },
        ].map((feature, idx) => (
          <div
            key={idx}
            className="p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl text-left transition-transform hover:-translate-y-1"
          >
            <div className="text-purple-300 mb-4">{feature.icon}</div>
            <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
            <p className="text-white/70 text-sm">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
