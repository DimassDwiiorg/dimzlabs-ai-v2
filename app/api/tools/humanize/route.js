import { NextResponse } from "next/server";
import { humanizeText } from "../../../../lib/providers/humanizeProvider";

export const runtime = "nodejs";

export async function POST(req) {
  try {
    const { text } = await req.json();
    if (!text || text.trim().length < 50) {
      return NextResponse.json(
        { success: false, error: "Teks minimal 50 karakter." },
        { status: 400 }
      );
    }

    const data = await humanizeText(text.trim());

    if (!data.success) {
      return NextResponse.json(
        { success: false, error: data.message || "Gagal memproses teks." },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true, output: data.data.output });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: "Gagal menghubungi layanan humanizer." },
      { status: 500 }
    );
  }
}
