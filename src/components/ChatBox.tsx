"use client";
import React, { useState, useRef, useEffect } from "react";
import { Sparkles, User } from "lucide-react";
import generateComplition from "@/lib/groq";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Highlight, themes } from "prism-react-renderer";

type Message = {
  role: "user" | "assistant";
  content?: string;
};

export const ChatBox = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [streamedMessages, setStreamedMessages] = useState<{ [index: number]: string }>({});
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]); // removed streamedMessages to prevent force scroll

  const typeMessage = (message: string, index: number, callback: () => void) => {
    let i = -1;
    setStreamedMessages((prev) => ({ ...prev, [index]: "" }));
    const interval = setInterval(() => {
      setStreamedMessages((prev) => ({
        ...prev,
        [index]: prev[index] + message[i],
      }));
      i++;
      if (i >= message.length - 1) {
        clearInterval(interval);
        callback();
      }
    }, 2);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsTyping(true);

    try {
      const response = await generateComplition(input);

      if (response) {
        const assistantIndex = newMessages.length;
        setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

        typeMessage(response, assistantIndex, () => {
          setMessages((prev) =>
            prev.map((msg, i) =>
              i === assistantIndex ? { ...msg, content: response } : msg
            )
          );
          setIsTyping(false);
        });
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "I'm sorry, I couldn't generate a response. Please try again.",
          },
        ]);
        setIsTyping(false);
      }
    } catch (error) {
      console.error("Error generating response:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "An error occurred while generating a response. Please try again.",
        },
      ]);
      setIsTyping(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black text-white px-2 sm:px-4 py-4 sm:py-6 overflow-hidden">
      <div className="hidden lg:block absolute -top-10 -left-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse z-0" />
      <div className="hidden lg:block absolute -bottom-10 -right-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse z-0" />

      <div className="relative z-10 w-full max-w-full sm:max-w-screen-sm lg:max-w-screen-lg grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-4 sm:gap-6 items-start">
        <div className="hidden lg:flex flex-col justify-center items-start p-6 text-left text-white/80 space-y-4">
          <h2 className="text-3xl font-bold">Welcome 👋</h2>
          <p className="text-sm text-white/60 leading-relaxed">
            Ask anything. Get smart replies. Powered by GPT. Your assistant is here to help you explore, learn, and build ideas.
          </p>
        </div>

        <div className="flex flex-col w-full min-h-[70vh] lg:h-[80vh] bg-white/5 backdrop-blur-lg border border-white/10 shadow-xl rounded-xl p-3 sm:p-4 overflow-hidden">
          <div className="flex-1 overflow-y-auto pr-1 sm:pr-2 space-y-4 custom-scroll">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex items-start gap-2 sm:gap-3 animate-fade-in ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "assistant" && (
                  <div className="p-2 bg-purple-600/20 rounded-full">
                    <Sparkles size={20} className="text-purple-300" />
                  </div>
                )}

                <div
                  className={`max-w-[80%] p-3 sm:p-4 rounded-2xl text-sm leading-relaxed shadow-md backdrop-blur-md break-words ${msg.role === "user"
                      ? "bg-gradient-to-br from-purple-600 to-blue-500 text-white"
                      : "bg-white/10 border border-white/10 text-white/90"
                    }`}
                >
                  {msg.role === "user" ? (
                    <div>{msg.content}</div>
                  ) : (
                    <div className="markdown-content">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          code({ node, className, children, ...props }) {
                            const match = /language-(\w+)/.exec(className || "");
                            const code = String(children).replace(/\n$/, "");

                            if (match) {
                              return (
                                <Highlight
                                  theme={themes.nightOwl}
                                  code={code}
                                  language={match[1]}
                                >
                                  {({ style, tokens, getLineProps, getTokenProps }) => (
                                    <pre
                                      style={style}
                                      className="rounded-md my-2 p-4 overflow-x-auto text-sm"
                                    >
                                      {tokens.map((line, i) => (
                                        <div key={i} {...getLineProps({ line, key: i })}>
                                          {line.map((token, key) => (
                                            <span key={key} {...getTokenProps({ token, key })} />
                                          ))}
                                        </div>
                                      ))}
                                    </pre>
                                  )}
                                </Highlight>
                              );
                            }

                            return (
                              <code
                                className="bg-white/20 py-0.5 px-1 rounded text-xs break-words"
                                {...props}
                              >
                                {children}
                              </code>
                            );
                          },
                          a: ({ node, ...props }) => (
                            <a
                              {...props}
                              className="text-purple-300 hover:underline"
                              target="_blank"
                              rel="noopener noreferrer"
                            />
                          ),
                          ul: ({ node, ...props }) => (
                            <ul className="list-disc pl-5 space-y-1 my-2" {...props} />
                          ),
                          ol: ({ node, ...props }) => (
                            <ol className="list-decimal pl-5 space-y-1 my-2" {...props} />
                          ),
                          h1: ({ node, ...props }) => (
                            <h1 className="text-xl font-bold my-3" {...props} />
                          ),
                          h2: ({ node, ...props }) => (
                            <h2 className="text-lg font-bold my-2" {...props} />
                          ),
                          h3: ({ node, ...props }) => (
                            <h3 className="text-md font-bold my-2" {...props} />
                          ),
                          p: ({ node, ...props }) => (
                            <p className="my-2" {...props} />
                          ),
                          blockquote: ({ node, ...props }) => (
                            <blockquote className="border-l-2 border-purple-400 pl-3 italic my-2" {...props} />
                          ),
                          table: ({ node, ...props }) => (
                            <div className="overflow-x-auto my-2">
                              <table className="min-w-full border-collapse" {...props} />
                            </div>
                          ),
                          th: ({ node, ...props }) => (
                            <th className="border border-white/20 px-2 py-1 bg-white/10" {...props} />
                          ),
                          td: ({ node, ...props }) => (
                            <td className="border border-white/20 px-2 py-1" {...props} />
                          ),
                        }}
                      >
                        {streamedMessages[index] || msg.content || ""}
                      </ReactMarkdown>
                    </div>
                  )}
                </div>

                {msg.role === "user" && (
                  <div className="p-2 bg-blue-500/20 rounded-full">
                    <User size={20} className="text-blue-300" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="flex gap-1 p-2 animate-pulse text-purple-300">
                  <span className="w-2 h-2 bg-purple-300 rounded-full" />
                  <span className="w-2 h-2 bg-purple-300 rounded-full" />
                  <span className="w-2 h-2 bg-purple-300 rounded-full" />
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          <div className="mt-3 sm:mt-4 flex items-center gap-2 sm:gap-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
              placeholder="Type your message..."
              className="w-full px-3 py-2 sm:px-4 bg-white/10 text-white rounded-lg outline-none focus:ring-2 focus:ring-purple-400"
            />
            <button
              onClick={sendMessage}
              className="px-3 sm:px-4 py-2 bg-gradient-to-br from-purple-600 to-blue-500 rounded-lg text-white font-semibold"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
