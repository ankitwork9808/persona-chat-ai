"use client";

import { useEffect, useRef } from "react";
import { X, Send } from "lucide-react";
import type { Mentor } from "@/types/mentors";
import { motion, AnimatePresence } from "framer-motion";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

type Props = {
  isOpen: boolean;
  mentor: Mentor;
  message: string;
  onChange: (v: string) => void;
  onSend: () => void;
  onClose: () => void;
  messages?: ChatMessage[];
  isTyping?: boolean;
};

export default function ChatModal({
  isOpen,
  mentor,
  message,
  onChange,
  onSend,
  onClose,
  messages = [],
  isTyping = false,
}: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center md:justify-end md:items-stretch">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ x: 60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 60, opacity: 0 }}
        transition={{ type: "spring", stiffness: 220, damping: 24 }}
        className="relative bg-[#0b0b10] border-l border-white/10 w-full md:w-[520px] h-full flex flex-col"
      >
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={mentor.avatar} alt={mentor.name} className="w-10 h-10 rounded-full" />
            <div>
              <div className="text-white font-medium leading-tight">{mentor.name}</div>
              <div className="text-white/50 text-xs">{mentor.greeting}</div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-white/10 text-white/80 hover:text-white transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto scroll-smooth px-4 py-5 space-y-4">
          <AnimatePresence initial={false}>
            {messages.map((m) => (
              <motion.div
                key={m.id}
                initial={m.role === "assistant" ? { y: 8, opacity: 0 } : { scale: 0.98, opacity: 0 }}
                animate={{ y: 0, scale: 1, opacity: 1 }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                    m.role === "user"
                      ? "bg-white/10 text-white rounded-br-sm"
                      : "bg-white/5 text-white/90 border border-white/10 rounded-bl-sm"
                  }`}
                >
                  {m.content}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          <AnimatePresence>
            {isTyping && (
              <motion.div
                key="typing"
                initial={{ y: 6, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 6, opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="flex justify-start"
              >
                <div className="max-w-[70%] rounded-2xl px-4 py-3 bg-white/5 border border-white/10 text-white/70">
                  <div className="flex items-center gap-2">
                    <span className="text-xs">{mentor.name.split(" ")[0]} is typing</span>
                    <span className="inline-flex gap-1 items-end">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/60 animate-bounce [animation-delay:-.2s]"></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-white/60 animate-bounce [animation-delay:-.1s]"></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-white/60 animate-bounce"></span>
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              value={message}
              onChange={(e) => onChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  onSend();
                }
              }}
              placeholder={`Ask ${mentor.name.split(" ")[0]} anything…`}
              className="flex-1 bg-white/5 text-white placeholder:text-white/40 rounded-xl px-4 py-3 border border-white/10 focus:border-[#eab308] focus:outline-none transition-colors"
            />
            <button
              onClick={onSend}
              className="bg-gradient-to-b from-[#eab308] to-amber-500 text-black font-medium rounded-xl p-3 shadow-[0_10px_30px_-12px_rgba(245,158,11,.35)] hover:shadow-[0_10px_30px_-12px_rgba(245,158,11,.55)] active:scale-95 transition-all disabled:opacity-50"
              aria-label="Send"
              disabled={!message.trim()}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
