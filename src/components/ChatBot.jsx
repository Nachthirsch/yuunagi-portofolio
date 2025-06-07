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
    <div className="fixed bottom-6 left-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div ref={chatRef} initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} transition={{ type: "spring", stiffness: 400, damping: 30 }} className="mb-4 w-[320px] md:w-[380px] rounded-lg bg-neutral-800/95 backdrop-blur-sm border border-neutral-600 shadow-xl overflow-hidden">
            {/* Chat Header - Minimalist */}
            <div className="flex items-center justify-between p-4 border-b border-neutral-700">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="flex items-center space-x-3">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <h3 className="text-sm font-medium text-white">AI Assistant</h3>
              </motion.div>

              <div className="flex items-center gap-3">
                <div className="flex items-center text-xs text-neutral-400">
                  <img src="https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304ff6292a690345.svg" alt="Gemini" className="w-3 h-3 mr-1" />
                  Gemini
                </div>
                <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setIsOpen(false)} className="text-neutral-400 hover:text-white transition-colors">
                  <X size={16} />
                </motion.button>
              </div>
            </div>

            {/* Chat Body */}
            <div className="flex h-[360px] flex-col">
              {/* Messages Container */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-track-neutral-800 scrollbar-thumb-neutral-600">
                {/* Welcome Message */}
                {chatHistory.length === 0 && (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="p-3 rounded-lg bg-neutral-700/30 border border-neutral-600">
                    <WelcomeMessage />
                  </motion.div>
                )}

                {/* Chat Messages */}
                {chatHistory.map((message, index) => (
                  <motion.div key={index} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[85%] rounded-lg px-3 py-2 text-sm 
                                    ${message.type === "user" ? "bg-neutral-700 text-white" : "bg-neutral-700/50 text-neutral-200 border border-neutral-600"}`}
                    >
                      {message.type === "user" ? message.content : <div className="prose prose-sm prose-invert max-w-none">{formatMessage(message.content)}</div>}
                    </div>
                  </motion.div>
                ))}

                {/* Loading Animation */}
                {isLoading && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                    <div className="bg-neutral-700/50 border border-neutral-600 rounded-lg px-3 py-2">
                      <div className="flex space-x-1">
                        {[1, 2, 3].map((i) => (
                          <motion.div
                            key={i}
                            className="w-2 h-2 rounded-full bg-neutral-400"
                            animate={{
                              scale: [1, 1.2, 1],
                              opacity: [0.5, 1, 0.5],
                            }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              delay: i * 0.2,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Suggested Questions */}
                {chatHistory.length === 0 && (
                  <div className="space-y-2">
                    <p className="text-xs text-neutral-400 font-medium">Suggested questions:</p>
                    {suggestedQuestions.map((question, index) => (
                      <motion.button key={index} onClick={() => handleQuestionClick(question)} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + index * 0.1 }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full text-left p-3 rounded-lg bg-neutral-700/20 border border-neutral-700 hover:bg-neutral-700/40 hover:border-neutral-600 transition-all duration-200 text-sm text-neutral-300">
                        {question}
                      </motion.button>
                    ))}
                  </div>
                )}
              </div>

              {/* Input Form - Minimalist */}
              <form onSubmit={handleUserInput} className="p-4 border-t border-neutral-700">
                <div className="flex space-x-2">
                  <input type="text" value={userInput} onChange={(e) => setUserInput(e.target.value)} placeholder="Ask anything about Handra..." disabled={isLoading} className="flex-1 rounded-lg bg-neutral-700/50 border border-neutral-600 px-3 py-2 text-sm text-white placeholder-neutral-400 focus:outline-none focus:border-neutral-500 disabled:opacity-50 transition-colors" />
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} type="submit" disabled={isLoading} className="px-4 py-2 rounded-lg bg-neutral-600 hover:bg-neutral-500 disabled:opacity-50 text-white transition-colors">
                    <Send size={16} />
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Button - Clean positioning */}
      <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={handleToggleChat} className="flex h-14 w-14 items-center justify-center rounded-full bg-neutral-800 border border-neutral-600 shadow-lg hover:bg-neutral-700 transition-colors">
        <MessageCircle size={22} className="text-white" />
      </motion.button>
    </div>
  );
}
