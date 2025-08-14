"use client";

import { Button } from "@/components/ui/button";
import ShinyText from "@/components/ShinyText";
import { Youtube } from "lucide-react";
import { ReactNode } from "react";

export default function Hero({ loaded }: { loaded: boolean }) {
  return (
    <div className="space-y-8">
      <div className="inline-flex items-center gap-2 border border-white/10 bg-white/5 backdrop-blur rounded-full px-4 py-2 text-white/80 text-sm">
        🍵 Trusted by 1.5M+ learners
      </div>

      <div className="text-cyan-400 text-sm font-medium tracking-wider uppercase">
        <ShinyText text="Two teachers. One mission." speed={3} className="text-cyan-400" />
      </div>

      <div className="space-y-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
          <div
            className={`bg-gradient-to-r from-[#eab308] via-[#f59e0b] via-[#fbbf24] via-purple-500 to-blue-500 bg-clip-text text-transparent transition-all duration-1000 ${
              loaded ? "blur-0" : "blur-sm opacity-0"
            }`}
          >
            Hitesh & Piyush
          </div>
        </h1>
        <h2 className="text-2xl md:text-3xl font-semibold text-white/90 leading-relaxed">
          Shipping real skills, not just syntax.
        </h2>
      </div>

      <p className="text-white/70 text-lg leading-relaxed max-w-lg">
        Practical, project-first learning in Hindi & English — web dev, GenAI, backend & system design.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button className="bg-gradient-to-r from-[#eab308] to-[#f59e0b] text-black font-semibold px-8 py-3 rounded-xl hover:shadow-[0_10px_30px_-12px_rgba(245,158,11,.6)] transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-2">
          <Youtube className="w-5 h-5" />
          Watch Live → YouTube
        </Button>
        <Button
          variant="outline"
          className="border border-cyan-400/30 bg-cyan-400/10 backdrop-blur text-cyan-400 hover:bg-cyan-400/20 hover:border-cyan-400/50 px-8 py-3 rounded-xl transition-all duration-300 hover:-translate-y-0.5"
        >
          Join Cohorts
        </Button>
      </div>
    </div>
  );
}
