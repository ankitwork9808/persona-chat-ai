"use client";

import { Button } from "@/components/ui/button";
import { GithubIcon, LinkedinIcon, TwitterIcon, YoutubeIcon } from "lucide-react";
import type { Mentor, MentorId } from "@/types/mentors";

type Props = {
  mentor: Mentor;
  onChat: (id: MentorId) => void;
  social?: {
    youtube?: string;
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
  accent?: "amber" | "purple";
  delayMs?: number;
  ctaPosition?: "left" | "right";
};

export default function MentorCard({
  mentor,
  onChat,
  social,
  accent = "amber",
  delayMs = 0,
  ctaPosition = "right"
}: Props) {
  const accentClasses =
    accent === "amber"
      ? "hover:border-[#eab308]/30 hover:-translate-y-1 hover:shadow-[0_20px_40px_-12px_rgba(234,179,8,.2)]"
      : "hover:border-purple-400/30 hover:-translate-y-1 hover:shadow-[0_20px_40px_-12px_rgba(168,85,247,.2)]";

  const CTA = (
    <Button
      onClick={() => onChat(mentor.id)}
      className={
        accent === "amber"
          ? "w-1/2 bg-gradient-to-r from-[#eab308] to-[#f59e0b] text-black font-semibold rounded-xl hover:shadow-[0_10px_30px_-12px_rgba(245,158,11,.6)] transition-all duration-300 cursor-pointer"
          : "w-1/2 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-xl hover:shadow-[0_10px_30px_-12px_rgba(168,85,247,.6)] transition-all duration-300 cursor-pointer"
      }
    >
      Chat with {mentor.name.split(" ")[0]}
    </Button>
  );

  const Socials = (
    <div className="flex gap-2 mb-4">
      {social?.youtube && (
        <a href={social.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube">
          <YoutubeIcon className="w-5 h-5 text-red-500 hover:text-red-400 cursor-pointer" />
        </a>
      )}
      {social?.twitter && (
        <a href={social.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter / X">
          <TwitterIcon className="w-5 h-5 text-blue-400 hover:text-blue-300 cursor-pointer" />
        </a>
      )}
      {social?.linkedin && (
        <a href={social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <LinkedinIcon className="w-5 h-5 text-blue-600 hover:text-blue-500 cursor-pointer" />
        </a>
      )}
      {social?.github && (
        <a href={social.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <GithubIcon className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
        </a>
      )}
    </div>
  );

  const first = ctaPosition === "left" ? CTA : Socials;
  const second = ctaPosition === "left" ? Socials : CTA;

  return (
    <div
      className="group relative transition-all duration-700 translate-x-0 opacity-100"
      style={{ transitionDelay: `${delayMs}ms` }}
    >
      <div className={`rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur p-6 ${accentClasses} transition-all duration-300`}>
       
        <div className="flex items-center gap-4 mb-4">
          <div className="relative">
            <img
              src={mentor.avatar}
              alt={mentor.name}
              className={`w-16 h-16 rounded-full border-2 ${
                accent === "amber"
                  ? "border-[#eab308]/30 group-hover:border-[#eab308]/60"
                  : "border-purple-400/30 group-hover:border-purple-400/60"
              } transition-colors`}
            />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-black animate-pulse" />
          </div>
          <div className="text-left">
            <h3 className="text-white font-semibold text-lg">{mentor.name}</h3>
            <div className="flex gap-2 mt-1">
              <span
                className="px-2 py-1 text-xs rounded-full border"
                style={{
                  color: mentor.colorBadge ?? "#eab308",
                  background: `${(mentor.colorBadge ?? "#eab308")}33`,
                  borderColor: `${(mentor.colorBadge ?? "#eab308")}4d`,
                }}
              >
                Educator
              </span>
              <span className="px-2 py-1 bg-cyan-400/20 text-cyan-400 text-xs rounded-full border border-cyan-400/30">
                Full-Stack
              </span>
            </div>
          </div>
        </div>

        <p className="text-white/70 text-sm mb-4 leading-relaxed">{mentor.role}</p>

        <div className="flex items-center justify-between gap-2">
          {first}
          {second}
        </div>
      </div>
    </div>
  );
}
