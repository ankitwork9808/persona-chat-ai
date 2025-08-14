"use client";

import { useEffect, useRef } from "react";
import { X, Send } from "lucide-react";
import type { Mentor } from "@/types/mentors";

type Props = {
  isOpen: boolean;
  mentor: Mentor;
  message: string;
  onChange: (v: string) => void;
  onSend: () => void;
  onClose: () => void;
};

export default function ChatModal({
  isOpen,
  mentor,
  message,
  onChange,
  onSend,
  onClose,
}: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center md:justify-end md:items-stretch">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-[#0b0b10] border-l border-white/10 shadow-2xl w-full md:w-[520px] h-full flex flex-col animate-in slide-in-from-right duration-300">
        
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <img src={mentor.avatar} alt={mentor.name} className="w-10 h-10 rounded-full" />
            <div>
              <h3 className="text-white font-semibold">{mentor.name}</h3>
              <p className="text-xs font-bold text-lime-600">Online now</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close chat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 p-4 space-y-4 overflow-y-auto">
          <div className="bg-white/10 border border-white/10 rounded-2xl p-4 max-w-[85%]">
            <div className="flex items-center gap-2 mb-2">
              <img src={mentor.avatar} alt={mentor.name} className="w-6 h-6 rounded-full" />
              <span className="text-white text-sm font-medium">{mentor.name}</span>
              <span className="text-white/40 text-xs">now</span>
            </div>
            <p className="text-white">{mentor.greeting}</p>
          </div>
        </div>

        <div className="p-4 border-t border-white/10">
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={message}
              onChange={(e) => onChange(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && onSend()}
              placeholder="Type your message..."
              className="flex-1 bg-white/5 text-white placeholder-white/40 px-3 py-2 rounded-xl border border-white/10 focus:border-[#eab308] focus:outline-none transition-colors"
            />
            <button
              onClick={onSend}
              className="bg-gradient-to-b from-[#eab308] to-amber-500 text-black p-2 rounded-xl transition-all hover:shadow-[0_10px_30px_-12px_rgba(245,158,11,.45)]"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
