import OpenAI from "openai";
import fs from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs"; 

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

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
    ].filter(Boolean).join("\n");

    const msgs = [
      { role: "system", content: systemParts },
      ...history.slice(-12),
      { role: "user", content: message },
    ];

    const stream = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      messages: msgs,
      temperature: 0.6,
      stream: true,
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const part of stream) {
            const delta = part?.choices?.[0]?.delta?.content ?? "";
            if (delta) {
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ token: delta })}\n\n`));
            }
          }
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        } catch (err) {
          controller.error(err);
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("chat-stream route error", error);
    return Response.json({ error: "Failed to process request" }, { status: 500 });
  }
}
