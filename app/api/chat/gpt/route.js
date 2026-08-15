import { NextResponse } from "next/server";
import { chatGPT } from "../../../../lib/providers/gptProvider";

export const runtime = "nodejs";

export async function POST(req) {
  try {
    const { message, history = [], sessionId } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Pesan tidak boleh kosong." }, { status: 400 });
    }

    const messages = [
      ...history.slice(-10).map((m) => ({ role: m.role, content: m.content })),
      { role: "user", content: message },
    ];

    const reply = await chatGPT(messages);

    return NextResponse.json({
      success: true,
      sessionId,
      reply: reply || "Maaf, model tidak memberikan jawaban. Coba lagi ya.",
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: "Gagal menghubungi model GPT. Coba lagi sebentar lagi." },
      { status: 500 }
    );
  }
}
