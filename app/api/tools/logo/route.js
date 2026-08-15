import { NextResponse } from "next/server";
import { generateLogos } from "../../../../lib/providers/logoProvider";

export const runtime = "nodejs";

export async function POST(req) {
  try {
    const { prompt, limit = 20 } = await req.json();
    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json({ success: false, error: "Nama brand tidak boleh kosong." }, { status: 400 });
    }

    const logos = await generateLogos(prompt, { limit: Math.min(limit, 40) });

    return NextResponse.json({
      success: true,
      data: { prompt, total: logos.length, logos },
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: "Gagal generate logo. Coba lagi sebentar lagi." },
      { status: 500 }
    );
  }
}
