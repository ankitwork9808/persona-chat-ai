"use client";

import { useEffect, useState } from "react";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import ChatModal from "@/components/site/ChatModal";
import MentorCard from "@/components/site/MentorCard";
import Hero from "@/components/site/Hero";
import { mentors, MentorId } from "@/types/mentors";

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [activeMentor, setActiveMentor] = useState<MentorId>("hitesh");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<{id:string;role:"user"|"assistant";content:string}[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  const openChat = (id: MentorId) => {
    if(activeMentor != id) setMessages([]);
    setActiveMentor(id);
    setChatOpen(true);
  };

  async function handleSend() {
    const text = message.trim();
    if (!text) return;

    // show user bubble
    const userMsg = { id: crypto.randomUUID(), role: "user" as const, content: text };
    setMessages((m) => [...m, userMsg]);
    setMessage("");
    setIsTyping(true);

    // choose active mentor id: "hitesh" | "piyush"
    const person = activeMentor;

    // STREAMING
    const res = await fetch("/api/chat-stream", {
      method: "POST",
      body: JSON.stringify({
        message: text,
        person,
        history: messages.map(({ role, content }) => ({ role, content })),
      }),
    });

    const reader = res.body!.getReader();
    const decoder = new TextDecoder();
    let assistantId = crypto.randomUUID();
    let assistantContent = "";

    // prime an assistant bubble so it animates in
    setMessages((m) => [...m, { id: assistantId, role: "assistant", content: "" }]);

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      for (const line of chunk.split("\n")) {
        if (!line.startsWith("data:")) continue;
        const payload = line.replace("data:", "").trim();
        if (payload === "[DONE]") break;
        const { token } = JSON.parse(payload);
        assistantContent += token;
        setMessages((m) =>
          m.map((msg) => (msg.id === assistantId ? { ...msg, content: assistantContent } : msg))
        );
      }
    }

    setIsTyping(false);
  }
  return (
    <div className="min-h-screen relative overflow-hidden bg-[radial-gradient(1200px_600px_at_10%_-10%,rgba(234,179,8,.18),transparent_40%),radial-gradient(1000px_500px_at_110%_-10%,rgba(245,158,11,.18),transparent_40%),linear-gradient(180deg,#0b0b10_0%,#0c0d12_60%,#0a0a0f_100%)]">
   
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[length:20px_20px] pointer-events-none" />

      <Header />

      <ChatModal
        isOpen={chatOpen}
        mentor={mentors[activeMentor]}
        message={message}
        onChange={setMessage}
        onSend={handleSend}
        onClose={() => setChatOpen(false)}
        messages={messages}
        isTyping={isTyping}  
      />

      <main className="relative z-10 max-w-7xl mx-auto px-6 h-[calc(100vh-80px)] flex items-center">
        <div className="w-full grid lg:grid-cols-2 gap-12 items-center">
          <Hero loaded={isLoaded} />

          <div className="space-y-6">
            <MentorCard
              mentor={mentors.hitesh}
              onChat={openChat}
              accent="amber"
              delayMs={200}
              ctaPosition="right"
              social={{
                youtube: "https://www.youtube.com/@HiteshCodeLab",
                twitter: "https://x.com/Hiteshdotcom",
                linkedin: "https://www.linkedin.com/in/hiteshchoudhary/",
                github: "https://github.com/hiteshchoudhary",
              }}
            />
            <MentorCard
              mentor={mentors.piyush}
              onChat={openChat}
              accent="purple"
              ctaPosition="left"
              delayMs={400}
              social={{
                youtube: "https://www.youtube.com/@piyushgargdev",
                twitter: "https://x.com/piyushgarg_dev",
                linkedin: "https://www.linkedin.com/in/piyushgarg195/",
                github: "https://github.com/piyushgarg-dev",
              }}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
