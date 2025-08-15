"use client";

import { Github, Youtube } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-gradient-to-r from-black/40 via-black/30 to-black/40 border-b border-white/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 backdrop-blur border border-white/10 hover:bg-white/10 transition-all duration-300">
            <img
              src="https://www.chaicode.com/chaicode-white.svg"
              alt="Chai aur Code"
              className="h-7 w-auto brightness-110"
            />
          </div>
          <div className="h-6 w-px bg-gradient-to-b from-transparent via-white/30 to-transparent" />
          <span className="text-white/70 text-sm font-medium">Learn. Build. Ship.</span>
        </div>

        <nav className="hidden md:flex items-center gap-2">
          <a
            href="https://www.youtube.com/@ankitchaudhary6724"
            className="flex items-center gap-2 px-4 py-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 backdrop-blur transition-all duration-300 border border-transparent hover:border-white/20"
          >
            <Youtube className="w-4 h-4" />
            <span className="font-medium">YouTube</span>
          </a>
          <a
            href="#"
            className="flex items-center gap-2 px-4 py-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 backdrop-blur transition-all duration-300 border border-transparent hover:border-white/20"
          >
            <Github className="w-4 h-4" />
            <span className="font-medium">GitHub</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
