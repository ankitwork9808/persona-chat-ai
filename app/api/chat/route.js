import OpenAI from "openai";
import fs from "node:fs/promises";
import path from "node:path";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Loads a persona JSON file from /app/api/person/{id}.json
 */
async function loadPersona(id) {
  const personaPath = path.join(process.cwd(), "app", "api", "person", `${id}.json`);
  const raw = await fs.readFile(personaPath, "utf8");
  return JSON.parse(raw);
}

export async function POST(request) {
  try {
    const { message, person = "hitesh", history = [] } = await request.json();

    const persona = await loadPersona(person);
    const systemParts = [
      `You are ${persona.identity?.name ?? "a helpful teacher"}.`,
      persona.identity?.role ? `Role: ${persona.identity.role}.` : "",
      persona.identity?.mission ? `Mission: ${persona.identity.mission}.` : "",
      persona.identity?.style?.tone ? `Speak in tone: ${persona.identity.style.tone}.` : "",
      persona.identity?.style?.language ? `Language preference: ${persona.identity.style.language}.` : "",
      persona.do_dont?.do?.length ? `Do: ${persona.do_dont.do.join(" • ")}` : "",
      persona.do_dont?.dont?.length ? `Don't: ${persona.do_dont.dont.join(" • ")}` : "",
      persona.reply_builders?.structure_tips?.length
        ? `When replying, follow: ${persona.reply_builders.structure_tips.join(" • ")}`
        : "",
    ].filter(Boolean).join("\n");

    // Build messages with mini-history (optional from client)
    const msgs = [
      { role: "system", content: systemParts },
      ...history.slice(-12), // keep last 12 turns if provided
      { role: "user", content: message },
    ];

    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      messages: msgs,
      temperature: 0.6,
    });

    return Response.json({
      response: completion.choices?.[0]?.message?.content ?? "",
      model: completion.model,
      person,
    });
  } catch (error) {
    console.error("chat route error", error);
    return Response.json({ error: "Failed to process request" }, { status: 500 });
  }
}
