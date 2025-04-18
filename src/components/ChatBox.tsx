"use client";
import React, { useState, useRef, useEffect } from "react";
import { Sparkles, User } from "lucide-react";

type Message = {
    role: "user" | "assistant";
    content: string;
};

export const ChatBox = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const chatEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage: Message = { role: "user", content: input };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsTyping(true);

        // Start a new empty assistant message
        setMessages((prev) => [...prev, { role: "assistant", content: "" }]);
    };


    return (
        <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black text-white px-4 py-6 overflow-hidden">
            {/* Background glow blobs */}
            <div className="hidden lg:block absolute -top-10 -left-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse z-0" />
            <div className="hidden lg:block absolute -bottom-10 -right-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse z-0" />

            {/* Layout */}
            <div className="relative z-10 w-full max-w-screen-lg grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-6 items-start">
                {/* Welcome sidebar (lg screens only) */}
                <div className="hidden lg:flex flex-col justify-center items-start p-8 text-left text-white/80 space-y-4">
                    <h2 className="text-4xl font-bold">Welcome 👋</h2>
                    <p className="text-sm text-white/60 leading-relaxed">
                        Ask anything. Get smart replies. Powered by GPT. Your assistant is
                        here to help you explore, learn, and build ideas.
                    </p>
                </div>

                {/* Chat UI */}
                <div className="flex flex-col w-full h-[80vh] bg-white/5 backdrop-blur-lg border border-white/10 shadow-xl rounded-2xl p-4 overflow-hidden">
                    {/* Chat window */}
                    <div className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scroll">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`flex items-start gap-3 animate-fade-in ${msg.role === "user" ? "justify-end" : "justify-start"
                                    }`}
                            >
                                {msg.role === "assistant" && (
                                    <div className="p-2 bg-purple-600/20 rounded-full">
                                        <Sparkles size={20} className="text-purple-300" />
                                    </div>
                                )}

                                <div
                                    className={`max-w-[75%] p-4 rounded-2xl text-sm leading-relaxed shadow-md backdrop-blur-md ${msg.role === "user"
                                            ? "bg-gradient-to-br from-purple-600 to-blue-500 text-white"
                                            : "bg-white/10 border border-white/10 text-white/90"
                                        }`}
                                >
                                    {msg.content}
                                </div>

                                {msg.role === "user" && (
                                    <div className="p-2 bg-blue-500/20 rounded-full">
                                        <User size={20} className="text-blue-300" />
                                    </div>
                                )}
                            </div>
                        ))}

                        {/* Typing indicator */}
                        {isTyping && (
                            <div className="flex gap-2 items-center animate-pulse text-purple-300">
                                <span className="w-2 h-2 bg-purple-300 rounded-full" />
                                <span className="w-2 h-2 bg-purple-300 rounded-full" />
                                <span className="w-2 h-2 bg-purple-300 rounded-full" />
                            </div>
                        )}
                        <div ref={chatEndRef} />
                    </div>

                    {/* Input field */}
                    <div className="mt-4 flex items-center gap-3">
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                            placeholder="Type your message..."
                            className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        <button
                            onClick={sendMessage}
                            className="px-5 py-3 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 rounded-xl text-white font-medium transition"
                        >
                            Send
                        </button>
                    </div>
                </div>
            </div>

            {/* Custom styles */}
            <style jsx>{`
        .custom-scroll::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scroll::-webkit-scrollbar-thumb {
          background-color: rgba(255, 255, 255, 0.2);
          border-radius: 8px;
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-in-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
        </div>
    );
};
