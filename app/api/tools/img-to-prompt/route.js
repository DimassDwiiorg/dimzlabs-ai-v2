import { NextResponse } from "next/server";
import { imageToPrompt } from "../../../../lib/providers/imgToPromptProvider";

export const runtime = "nodejs";

export async function POST(req) {
  try {
    const { imageData, mimeType } = await req.json();
    if (!imageData) {
      return NextResponse.json(
        { sukses: false, pesan: "Gambar tidak ditemukan." },
        { status: 400 }
      );
    }

    const prompt = await imageToPrompt(imageData, mimeType);

    return NextResponse.json({ sukses: true, prompt });
  } catch (err) {
    return NextResponse.json(
      { sukses: false, pesan: err.message || "Gagal memproses gambar." },
      { status: 500 }
    );
  }
}
