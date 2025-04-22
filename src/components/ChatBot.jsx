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
          <motion.div 
            ref={chatRef} 
            initial={{ opacity: 0, scale: 0.8, y: 20 }} 
            animate={{ opacity: 1, scale: 1, y: 0 }} 
            exit={{ opacity: 0, scale: 0.8, y: 20 }} 
            transition={{ type: "spring", stiffness: 300, damping: 30 }} 
            className="mb-4 w-[300px] md:w-[380px] rounded-2xl bg-neutral-900/90 shadow-[6px_6px_0px_rgba(0,0,0,0.8)] border-4 border-black backdrop-blur-xl rotate-[0.5deg] overflow-hidden"
          >
            {/* Chat Header - Neobrutalism Style */}
            <div className="flex items-center justify-between p-3 border-b-3 border-black bg-neutral-800">
              <motion.div 
                initial={{ opacity: 0, x: -20 }} 
                animate={{ opacity: 1, x: 0 }} 
                transition={{ delay: 0.2 }} 
                className="flex items-center space-x-3"
              >
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse border-1 border-black" />
                <h3 className="text-sm font-extrabold text-neutral-300 text-shadow-small">AI Assistant</h3>
                <div className="flex items-center space-x-1">
                  <h3 className="text-xs font-medium text-neutral-400 flex items-center gap-1">
                    Powered by
                    <img src="https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304ff6292a690345.svg" alt="Gemini AI" className="w-4 h-4 ml-1 object-contain" />
                  </h3>
                </div>
              </motion.div>
              
              <motion.button 
                whileHover={{ rotate: 90, scale: 1.1 }} 
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }} 
                onClick={() => setIsOpen(false)} 
                className="rounded-full p-2 text-neutral-400 hover:bg-neutral-700 border-1 border-black"
              >
                <X size={14} />
              </motion.button>
            </div>
            
            {/* Chat Body */}
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
              
              {/* Messages Container */}
              <div className="flex-1 overflow-y-scroll overflow-x-hidden p-4 hide-scrollbar bg-neutral-900">
                <div className="space-y-4">
                  {/* Welcome Message */}
                  {chatHistory.length === 0 && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      transition={{ delay: 0.3 }} 
                      className="p-4 rounded-lg bg-neutral-800/40 border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,0.8)] -rotate-1"
                    >
                      <WelcomeMessage />
                    </motion.div>
                  )}
                  
                  {/* Chat Messages */}
                  {chatHistory.map((message, index) => (
                    <motion.div 
                      key={index} 
                      initial={{ opacity: 0, y: 10 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div className={`max-w-[85%] rounded-lg border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,0.8)] px-4 py-3 text-sm 
                                      ${message.type === "user" 
                                        ? "bg-neutral-700 text-white rotate-1" 
                                        : "bg-neutral-800/60 text-neutral-300 -rotate-1"}`}
                      >
                        {message.type === "user" 
                          ? message.content 
                          : <div className="prose prose-sm prose-invert">
                              {formatMessage(message.content)}
                            </div>
                        }
                      </div>
                    </motion.div>
                  ))}
                  
                  {/* Loading Animation */}
                  {isLoading && (
                    <motion.div 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }} 
                      className="flex space-x-2 justify-start"
                    >
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="w-2 h-2 rounded-full bg-neutral-500 border-1 border-black"
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
                    <p className="text-xs font-extrabold text-neutral-400 ml-2 text-shadow-small">Suggested questions:</p>
                    {suggestedQuestions.map((question, index) => (
                      <motion.button 
                        key={index} 
                        onClick={() => handleQuestionClick(question)} 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + (index * 0.1) }}
                        whileHover={{ x: 3 }}
                        className="w-full rounded-lg bg-neutral-800/30 border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,0.8)] p-3 text-left text-sm text-neutral-300 hover:bg-neutral-700/50 transition-colors"
                      >
                        {question}
                      </motion.button>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Input Form - Neobrutalism Style */}
              <form onSubmit={handleUserInput} className="p-3 border-t-3 border-black bg-neutral-800">
                <div className="flex space-x-2">
                  <input 
                    type="text" 
                    value={userInput} 
                    onChange={(e) => setUserInput(e.target.value)} 
                    placeholder="Ask anything about Handra..." 
                    disabled={isLoading} 
                    className="flex-1 rounded-lg bg-neutral-900 px-4 py-2.5 text-sm text-neutral-300 placeholder-neutral-500 focus:outline-none border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,0.8)] disabled:opacity-50" 
                  />
                  <motion.button 
                    whileHover={{ scale: 1.05, rotate: 3 }} 
                    whileTap={{ scale: 0.95 }} 
                    type="submit" 
                    disabled={isLoading} 
                    className="flex items-center justify-center rounded-lg bg-neutral-700 px-4 py-2.5 text-white hover:bg-neutral-600 disabled:opacity-50 transition-colors border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,0.8)]"
                  >
                    <Send size={16} />
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Chat Button - Neobrutalism Style */}
      <motion.button 
        whileHover={{ scale: 1.1, rotate: 5 }} 
        whileTap={{ scale: 0.9 }} 
        onClick={handleToggleChat} 
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-neutral-800 border-3 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.8)] hover:shadow-[5px_5px_0px_rgba(0,0,0,0.8)] transition-all duration-300"
      >
        {/* Button pulse effect */}
        <motion.div 
          className="absolute -inset-1 rounded-full border-2 border-black opacity-0 group-hover:opacity-100" 
          animate={{ scale: [1, 1.1, 1], opacity: [0, 0.5, 0] }} 
          transition={{ duration: 2, repeat: Infinity }} 
        />
        
        {/* Decorative corner */}
        <div className="absolute top-0 right-0 w-5 h-5 bg-neutral-700 opacity-20"
             style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}></div>
             
        <MessageCircle size={22} className="text-white" />
      </motion.button>
      
      {/* Styles for neobrutalism */}
      <style>
        {`
          .border-3 {
            border-width: 3px;
          }
          .border-1 {
            border-width: 1px;
          }
          .text-shadow-small {
            text-shadow: 1px 1px 0px rgba(0,0,0,0.8);
          }
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
          }
        `}
      </style>
    </div>
  );
}
