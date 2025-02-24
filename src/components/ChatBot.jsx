/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";
import { generateGeminiResponse, suggestedQuestions } from "../config/gemini";
import { checkRateLimit, sanitizeInput, validateContent } from "../utils/security";
import { TypeAnimation } from "react-type-animation";
import { useLocation } from "react-router-dom";

const formatMessage = (content) => {
  const paragraphs = content.split("\n");
  return paragraphs.map((paragraph, index) => {
    if (!paragraph.trim()) return null;

    // Handle bold text with **
    if (paragraph.includes("**")) {
      const parts = paragraph.split("**");
      return (
        <p key={index} className="mb-2">
          {parts.map((part, i) =>
            i % 2 === 0 ? (
              part
            ) : (
              <span key={i} className="font-bold">
                {part}
              </span>
            )
          )}
        </p>
      );
    }

    if (paragraph.trim().startsWith("- ") || paragraph.trim().startsWith("• ")) {
      return (
        <li key={index} className="ml-4 mb-1">
          {paragraph.trim().substring(2)}
        </li>
      );
    }
    if (paragraph.trim().endsWith(":")) {
      return (
        <h4 key={index} className="font-medium text-neutral-300 mt-2 mb-1">
          {paragraph}
        </h4>
      );
    }
    if (/^\d+\./.test(paragraph.trim())) {
      return (
        <li key={index} className="ml-4 mb-1">
          {paragraph.trim()}
        </li>
      );
    }
    return (
      <p key={index} className="mb-2">
        {paragraph}
      </p>
    );
  });
};

const WelcomeMessage = () => {
  return (
    <div className="space-y-3">
      <TypeAnimation sequence={["Hello! I'm Handra's AI Assistant, I can help you learn more about Handra!", 1000]} wrapper="p" speed={50} className="text-sm text-neutral-300" repeat={0} cursor={true} />
    </div>
  );
};

export default function ChatBot() {
  const location = useLocation();

  // Add check for admin path
  if (location.pathname.startsWith("/admin")) {
    return null;
  }

  const [isOpen, setIsOpen] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatRef = useRef(null);

  // Add ESC key handler
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);

  // Add click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (chatRef.current && !chatRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleQuestionClick = async (question) => {
    setIsLoading(true);
    try {
      const response = await generateGeminiResponse(question);
      setChatHistory([...chatHistory, { type: "user", content: question }, { type: "bot", content: response }]);
    } catch (error) {
      console.error("Error getting response:", error);
      setChatHistory([
        ...chatHistory,
        { type: "user", content: question },
        {
          type: "bot",
          content: "I apologize, but I'm having trouble generating a response right now. Please try again later.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUserInput = async (e) => {
    e.preventDefault();
    if (!userInput.trim() || isLoading) return;

    if (!checkRateLimit()) {
      setChatHistory((prev) => [
        ...prev,
        {
          type: "bot",
          content: "Too many requests. Please wait a moment before trying again.",
        },
      ]);
      setUserInput(""); // Reset input field
      return;
    }

    const sanitizedInput = sanitizeInput(userInput);
    if (!validateContent(sanitizedInput)) {
      setChatHistory((prev) => [
        ...prev,
        {
          type: "bot",
          content: "Invalid input detected. Please try again with appropriate content.",
        },
      ]);
      setUserInput(""); // Reset input field
      return;
    }

    try {
      setIsLoading(true);
      const response = await generateGeminiResponse(sanitizedInput);
      if (!validateContent(response)) {
        throw new Error("Invalid response content");
      }
      setChatHistory((prev) => [...prev, { type: "user", content: sanitizedInput }, { type: "bot", content: response }]);
      setUserInput(""); // Reset input field after successful send
    } catch (error) {
      console.error("Error:", error);
      setChatHistory((prev) => [
        ...prev,
        {
          type: "bot",
          content: "An error occurred. Please try again later.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-4 left-4 md:left-8 z-20">
      <AnimatePresence>
        {isOpen && (
          <motion.div ref={chatRef} initial={{ opacity: 0, scale: 0.8, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.8, y: 20 }} transition={{ type: "spring", stiffness: 300, damping: 30 }} className="mb-4 w-[300px] md:w-[380px] rounded-3xl bg-neutral-900/70 shadow-2xl border border-neutral-700/30 backdrop-blur-xl">
            <div className="flex items-center justify-between p-4 border-b border-neutral-700/30">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="flex items-center space-x-3">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <h3 className="text-sm font-medium text-neutral-300">AI Assistant</h3>
                <div className="flex items-center space-x-1">
                  <h3 className="text-xs font-medium text-neutral-300 flex items-center gap-1">
                    Powered by
                    <img src="https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304ff6292a690345.svg" alt="Gemini AI" className="w-4 h-4 ml-1 object-contain" />
                  </h3>
                </div>
              </motion.div>
              <motion.button whileHover={{ rotate: 90 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} onClick={() => setIsOpen(false)} className="rounded-full p-2 text-neutral-400 hover:bg-neutral-800/50">
                <X size={14} />
              </motion.button>
            </div>
            <div className="flex h-[340px] md:h-[382px] flex-col">
              <style jsx>{`
                .hide-scrollbar {
                  -ms-overflow-style: none; /* IE and Edge */
                  scrollbar-width: none; /* Firefox */
                }
                .hide-scrollbar::-webkit-scrollbar {
                  display: none; /* Chrome, Safari and Opera */
                }
              `}</style>
              <div className="flex-1 h-20 overflow-y-scroll overflow-x-hidden p-4 hide-scrollbar">
                <div className="space-y-4">
                  {chatHistory.length === 0 && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="p-4 rounded-lg bg-neutral-800/20">
                      <WelcomeMessage />
                    </motion.div>
                  )}
                  {chatHistory.map((message, index) => (
                    <motion.div key={index} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-[85%] rounded-lg px-4 py-3 text-sm ${message.type === "user" ? "bg-neutral-500/20 text-white" : "bg-neutral-800/20 text-neutral-300"}`}>{message.type === "user" ? message.content : <div className="prose prose-sm prose-invert">{formatMessage(message.content)}</div>}</div>
                    </motion.div>
                  ))}
                  {isLoading && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex space-x-2 justify-start">
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="w-2 h-2 rounded-full bg-neutral-500"
                          style={{
                            animation: `bounce 0.8s ease-in-out ${i * 0.2}s infinite`,
                          }}
                        />
                      ))}
                    </motion.div>
                  )}
                </div>
                {chatHistory.length === 0 && (
                  <div className="mt-4 space-y-2">
                    <p className="text-xs font-medium text-neutral-400">Suggested questions:</p>
                    {suggestedQuestions.map((question, index) => (
                      <button key={index} onClick={() => handleQuestionClick(question)} className="w-full rounded-lg bg-neutral-800/20 p-3 text-left text-sm text-neutral-300 hover:bg-neutral-700/50 transition-colors">
                        {question}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <form onSubmit={handleUserInput} className="p-4 border-t border-neutral-700/30">
                <div className="flex space-x-2">
                  <input type="text" value={userInput} onChange={(e) => setUserInput(e.target.value)} placeholder="Ask anything about Handra..." disabled={isLoading} className="flex-1 rounded-lg bg-neutral-800/20 px-4 py-2 text-sm text-neutral-300 placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500/50 disabled:opacity-50" />
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} type="submit" disabled={isLoading} className="flex items-center justify-center rounded-lg bg-neutral-600 px-4 py-2 text-white hover:bg-neutral-700 disabled:opacity-50 transition-colors">
                    <Send size={16} />
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={handleToggleChat} className="group relative flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-neutral-300 to-neutral-900 shadow-lg hover:shadow-xl transition-all duration-300">
        <motion.div className="absolute -inset-1 rounded-full border border-black-400/50 opacity-0 group-hover:opacity-100" animate={{ scale: [1, 1.1, 1], opacity: [0, 1, 0] }} transition={{ duration: 2, repeat: Infinity }} />
        <MessageCircle size={20} className="text-white" />
      </motion.button>
    </div>
  );
}
