import OpenAI from "openai";
import fs from "node:fs/promises";
import path from "node:path";
import { personaToSystem } from "@/lib/persona-to-system";

export const runtime = "nodejs"; 

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function loadRawPersona(id) {
  const personaPath = path.join(process.cwd(), "app", "api", "person", `${id}.json`);
  const raw = await fs.readFile(personaPath, "utf8");
  return raw;
}

export async function POST(request) {
  try {
    const { message, person = "hitesh", history = [] } = await request.json();
    const persona = await loadRawPersona(person);

    const systemParts = `You are to roleplay as this persona. 
Here is the complete persona JSON:
${persona}

Follow the identity, style, and knowledge strictly. 
If you don't know something, say so. 
Some information might be outdated or incorrect.`//personaToSystem(persona)
    console.log(systemParts)
    const msgs = [
      { role: "system", content: systemParts },
      ...history.slice(-12),
      { role: "user", content: message },
    ];

    const stream = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      messages: msgs,
      temperature: 0.7,
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
