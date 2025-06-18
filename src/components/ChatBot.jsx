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
      <TypeAnimation sequence={["Hello! I'm Handra's AI Assistant, I can help you learn more about Handra!", 1000]} wrapper="p" speed={50} className="text-sm text-gray-700" repeat={0} cursor={true} />
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
          <motion.div ref={chatRef} initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 10 }} transition={{ type: "spring", stiffness: 300, damping: 30 }} className="mb-4 w-[300px] md:w-[380px] rounded-md bg-gray-50/95 shadow-md backdrop-blur-sm overflow-hidden">
            {/* Chat Header - Minimalist Style */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200/50">
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="flex items-center space-x-3">
                <div className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-pulse" />
                <h3 className="text-xs font-light text-gray-700">AI Assistant</h3>
                <div className="flex items-center space-x-1">
                  <h3 className="text-[10px] font-light text-gray-500 flex items-center gap-1">
                    Gemini
                    <img src="https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304ff6292a690345.svg" alt="Gemini AI" className="w-3 h-3 ml-1 object-contain" />
                  </h3>
                </div>
              </motion.div>

              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} onClick={() => setIsOpen(false)} className="rounded-full p-1 text-gray-400 hover:bg-gray-100">
                <X size={14} />
              </motion.button>
            </div>

            {/* Chat Body */}
            <div className="flex h-[340px] md:h-[382px] flex-col">
              <style jsx>{`
                .hide-scrollbar {
                  -ms-overflow-style: none;
                  scrollbar-width: none;
                }
                .hide-scrollbar::-webkit-scrollbar {
                  display: none;
                }
              `}</style>

              {/* Messages Container */}
              <div className="flex-1 overflow-y-scroll overflow-x-hidden p-4 hide-scrollbar bg-gray-50">
                <div className="space-y-4">
                  {/* Welcome Message */}
                  {chatHistory.length === 0 && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="p-3 rounded-md bg-gray-100/80">
                      <WelcomeMessage />
                    </motion.div>
                  )}

                  {/* Chat Messages */}
                  {chatHistory.map((message, index) => (
                    <motion.div key={index} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-[85%] rounded-md px-3 py-2 text-sm 
                                      ${message.type === "user" ? "bg-gray-200 text-gray-800" : "bg-gray-100 text-gray-700"}`}
                      >
                        {message.type === "user" ? message.content : <div className="prose prose-sm prose-gray">{formatMessage(message.content)}</div>}
                      </div>
                    </motion.div>
                  ))}

                  {/* Loading Animation */}
                  {isLoading && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex space-x-1.5 justify-start">
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="w-1.5 h-1.5 rounded-full bg-gray-400"
                          style={{
                            animation: `bounce 0.8s ease-in-out ${i * 0.2}s infinite`,
                          }}
                        />
                      ))}
                    </motion.div>
                  )}
                </div>

                {/* Suggested Questions */}
                {chatHistory.length === 0 && (
                  <div className="mt-5 space-y-2">
                    <p className="text-xs text-gray-500 ml-1">Suggested questions:</p>
                    {suggestedQuestions.map((question, index) => (
                      <motion.button key={index} onClick={() => handleQuestionClick(question)} initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + index * 0.1 }} whileHover={{ x: 2 }} className="w-full rounded-md bg-gray-100/80 p-2.5 text-left text-xs text-gray-700 hover:bg-gray-200/50 transition-colors">
                        {question}
                      </motion.button>
                    ))}
                  </div>
                )}
              </div>

              {/* Input Form - Minimalist Style */}
              <form onSubmit={handleUserInput} className="p-3 border-t border-gray-200/50 bg-gray-50">
                <div className="flex space-x-2">
                  <input type="text" value={userInput} onChange={(e) => setUserInput(e.target.value)} placeholder="Ask anything about Handra..." disabled={isLoading} className="flex-1 rounded-md bg-gray-100 px-3 py-2 text-xs text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-300 disabled:opacity-50" />
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" disabled={isLoading} className="flex items-center justify-center rounded-md bg-gray-200 px-3 py-2 text-gray-700 hover:bg-gray-300 disabled:opacity-50 transition-colors">
                    <Send size={14} />
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Button - Minimalist Style */}
      <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleToggleChat} className="group relative flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 shadow-sm hover:bg-gray-200 transition-all duration-200">
        <MessageCircle size={18} className="text-gray-700" />

        {/* Simple pulse effect */}
        <span className="absolute inset-0 rounded-full bg-gray-200 animate-ping opacity-25" style={{ animationDuration: "3s" }}></span>
      </motion.button>

      <style>
        {`
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-3px); }
          }
        `}
      </style>
    </div>
  );
}
