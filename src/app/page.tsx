"use client";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion"; // Animation for smooth transitions

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center py-24 text-center">
        <motion.h1
          className="text-5xl font-extrabold leading-tight mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Welcome to GroqChat
        </motion.h1>
        <motion.p
          className="text-lg mb-6 max-w-xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          Unlock the power of intelligent conversations with our AI chatbot powered by the Groq API. Start chatting today!
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          <Link
            href="/chat"
            className="bg-gradient-to-r from-pink-500 to-yellow-400 text-white px-8 py-3 rounded-lg text-xl hover:scale-105 transition-transform"
          >
            Start Chatting
          </Link>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-800">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2
            className="text-3xl font-bold text-white mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            What We Offer
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-white">
            {/* Feature 1 */}
            <motion.div
              className="bg-gray-700 p-6 rounded-lg shadow-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.3 }}
            >
              <h3 className="text-2xl font-semibold mb-4">Real-time Conversations</h3>
              <p>
                Experience the magic of real-time responses from an AI chatbot powered by Groq. Fast and responsive, always.
              </p>
            </motion.div>
            {/* Feature 2 */}
            <motion.div
              className="bg-gray-700 p-6 rounded-lg shadow-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
            >
              <h3 className="text-2xl font-semibold mb-4">Smart Assistance</h3>
              <p>
                Get insightful and helpful answers to your questions, powered by the advanced Groq API.
              </p>
            </motion.div>
            {/* Feature 3 */}
            <motion.div
              className="bg-gray-700 p-6 rounded-lg shadow-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.7 }}
            >
              <h3 className="text-2xl font-semibold mb-4">Easy to Use</h3>
              <p>
                A simple and intuitive interface to start chatting with your AI assistant, no setup required.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-center text-white py-6">
        <p>© 2025 GroqChat - All Rights Reserved</p>
        <div className="mt-4">
          <Link href="/" className="hover:text-yellow-300 mx-3">
            Privacy Policy
          </Link>
          <Link href="/" className="hover:text-yellow-300 mx-3">
            Terms of Service
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default Home;
