/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, User, Send } from "lucide-react";
import { generateGeminiResponse, suggestedQuestions } from "../config/gemini";
import { checkRateLimit, sanitizeInput, validateContent } from "../utils/security";

const formatMessage = (content) => {
  // Split content into paragraphs
  const paragraphs = content.split("\n");

  return paragraphs.map((paragraph, index) => {
    // Skip empty paragraphs
    if (!paragraph.trim()) return null;

    // Check if it's a list item
    if (paragraph.trim().startsWith("- ") || paragraph.trim().startsWith("• ")) {
      return (
        <li key={index} className="ml-4 mb-1">
          {paragraph.trim().substring(2)}
        </li>
      );
    }

    // Check if it's a heading (ends with ':')
    if (paragraph.trim().endsWith(":")) {
      return (
        <h4 key={index} className="font-medium text-gray-900 dark:text-white mt-2 mb-1">
          {paragraph}
        </h4>
      );
    }

    // Check if it's a numbered list item
    if (/^\d+\./.test(paragraph.trim())) {
      return (
        <li key={index} className="ml-4 mb-1">
          {paragraph.trim()}
        </li>
      );
    }

    // Regular paragraph
    return (
      <p key={index} className="mb-2">
        {paragraph}
      </p>
    );
  });
};

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleQuestionClick = async (question) => {
    setIsLoading(true);
    try {
      const response = await generateGeminiResponse(question);
      setChatHistory([
        ...chatHistory,
        {
          type: "user",
          content: question,
        },
        {
          type: "bot",
          content: response,
        },
      ]);
    } catch (error) {
      console.error("Error getting response:", error);
      setChatHistory([
        ...chatHistory,
        {
          type: "user",
          content: question,
        },
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

    // Security checks
    if (!checkRateLimit()) {
      setChatHistory((prev) => [
        ...prev,
        {
          type: "bot",
          content: "Too many requests. Please wait a moment before trying again.",
        },
      ]);
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
      return;
    }

    try {
      setIsLoading(true);
      const response = await generateGeminiResponse(sanitizedInput);

      // Validate response
      if (!validateContent(response)) {
        throw new Error("Invalid response content");
      }

      setChatHistory((prev) => [...prev, { type: "user", content: sanitizedInput }, { type: "bot", content: response }]);
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

  return (
    <div className="fixed bottom-4 md:right-4 left-4 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="mb-4 w-[280px] md:w-[320px] rounded-lg bg-black/10 backdrop-blur-xl border border-white/10 shadow-xl">
            <div className="flex items-center justify-between border-b border-white/10 p-3">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-neutral-300" />
                <div>
                  <h3 className="text-xs md:text-sm font-medium text-neutral-200">Handra's Assistant</h3>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="rounded p-1 text-neutral-400 hover:bg-white/5">
                <X size={14} />
              </button>
            </div>

            <div className="flex h-[350px] md:h-[400px] flex-col">
              <div className="flex-1 overflow-y-auto p-3">
                <div className="space-y-3">
                  {chatHistory.length === 0 && (
                    <div className="mb-3 rounded bg-slate-100 p-2 dark:bg-slate-800">
                      <p className="text-xs text-slate-700 dark:text-slate-300">Hello! I&apos;m Handra&apos;s personal assistant. You can ask me anything about him.</p>
                    </div>
                  )}

                  {chatHistory.map((message, index) => (
                    <div key={index} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                      <div className={`prose prose-sm max-w-[85%] rounded-md px-3 py-2 text-xs ${message.type === "user" ? "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300" : "bg-blue-500 text-white dark:prose-invert"}`}>{message.type === "user" ? message.content : <div className="[&>h4]:text-white [&>ul]:list-disc [&>ol]:list-decimal">{formatMessage(message.content)}</div>}</div>
                    </div>
                  ))}

                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="max-w-[85%] rounded-md bg-blue-500 px-3 py-2">
                        <div className="flex items-center space-x-1">
                          <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-white"></div>
                          <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-white" style={{ animationDelay: "0.2s" }}></div>
                          <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-white" style={{ animationDelay: "0.4s" }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {chatHistory.length === 0 && (
                  <div className="mt-3 space-y-2">
                    <p className="text-xs text-slate-500 dark:text-slate-400">Try asking:</p>
                    {suggestedQuestions.map((question, index) => (
                      <button key={index} onClick={() => handleQuestionClick(question)} className="w-full rounded bg-slate-50 p-2 text-left text-xs text-slate-700 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700">
                        {question}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <form onSubmit={handleUserInput} className="border-t border-white/10 p-3">
                <div className="flex space-x-2">
                  <input type="text" value={userInput} onChange={(e) => setUserInput(e.target.value)} placeholder="Ask about Handra..." disabled={isLoading} className="flex-1 rounded bg-white/5 border border-white/10 px-2 py-1.5 text-xs text-neutral-200 placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-400 disabled:opacity-50" />
                  <button type="submit" disabled={isLoading} className="flex items-center justify-center rounded bg-neutral-800 px-2 py-1.5 text-neutral-200 hover:bg-neutral-700 disabled:opacity-50">
                    <Send size={12} />
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setIsOpen(!isOpen)} className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-black/20 backdrop-blur-xl border border-white/10 text-neutral-200 hover:bg-black/30 transition-all duration-300">
        <MessageCircle size={16} className="md:w-5 md:h-5" />
      </motion.button>
    </div>
  );
}
