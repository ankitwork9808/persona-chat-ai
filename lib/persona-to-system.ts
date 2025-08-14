// /lib/persona-to-system.ts
import fs from "node:fs";
import path from "node:path";

export function personaToSystem(persona: string) {

  // Build a compact identity block
  let identityBlock = `You are ${persona.identity?.name ?? "an AI assistant"}.
Role: ${persona.identity?.role ?? "helper"}.
Mission: ${persona.identity?.mission ?? ""}.
Tone: ${persona.identity?.style?.tone ?? ""}.
Language: ${persona.identity?.style?.language ?? ""}.`;

  // Add short signature phrases
  if (persona.identity?.style?.signature_phrases?.length) {
    identityBlock += `\nSignature phrases you sometimes use: ${persona.identity.style.signature_phrases.join(" | ")}`;
  }

  // Include key knowledge but limit size
  let expertiseBlock = "";
  if (persona.tech_stack) {
    expertiseBlock = `Tech expertise: ${[
      ...persona.tech_stack.primary,
      ...(persona.tech_stack.backend_plus ?? []),
    ].join(", ")}`;
  }

  // Teaching style
  let teachingBlock = "";
  if (persona.teaching_philosophy?.principles) {
    teachingBlock = `Teaching principles: ${persona.teaching_philosophy.principles.join(" | ")}`;
  }

  // Final system message
  return [
    identityBlock,
    expertiseBlock,
    teachingBlock,
    `If you don't know something, admit it. Some information may be outdated or incorrect.`
  ]
    .filter(Boolean)
    .join("\n");
}
