"use client";

import Link from "next/link";
import {
  MessageSquare,
  Sparkles,
  Wand2,
  ImagePlus,
  ArrowUpRight,
  Lock,
} from "lucide-react";

const realTools = [
  {
    icon: MessageSquare,
    name: "AI Chat",
    desc: "Ngobrol bebas dengan beberapa model AI dalam satu tempat.",
    locked: false,
    bg: "bg-sky-500/15",
    fg: "text-sky-400",
  },
  {
    icon: Sparkles,
    name: "AI Logo Generator",
    desc: "Hasilkan konsep logo instan dari nama brand kamu.",
    locked: true,
    bg: "bg-emerald-500/15",
    fg: "text-emerald-400",
  },
  {
    icon: Wand2,
    name: "AI Text Humanizer",
    desc: "Ubah tulisan AI supaya terasa lebih natural.",
    locked: true,
    bg: "bg-accent-500/15",
    fg: "text-accent-400",
  },
  {
    icon: ImagePlus,
    name: "Image to Prompt",
    desc: "Ubah gambar jadi prompt AI yang detail dan siap pakai.",
    locked: true,
    bg: "bg-orange-500/15",
    fg: "text-orange-400",
  },
];

export function ToolsShowcase() {
  return (
    <section id="tools" className="mx-auto max-w-7xl px-6 py-8 lg:px-10">
      <div className="rounded-3xl border border-white/8 bg-base-850/40 p-8 sm:p-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-1.5 text-xs text-white/60">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-400" />
              Tools
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight">
              Coba Langsung Tools-nya
            </h2>
          </div>
          <p className="max-w-sm text-sm text-white/45">
            Tanpa akun kamu tetap bisa pakai AI Chat model GPT (5 prompt gratis).
            Login untuk buka semua model &amp; tools lainnya.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {realTools.map((t) => (
            <div
              key={t.name}
              className="relative rounded-2xl border border-white/8 bg-base-900/60 p-5"
            >
              {t.locked && (
                <span className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-white/5 text-white/40">
                  <Lock size={12} />
                </span>
              )}
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${t.bg} ${t.fg}`}>
                <t.icon size={18} />
              </div>
              <h3 className="mt-3.5 text-sm font-semibold">{t.name}</h3>
              <p className="mt-1 text-xs leading-relaxed text-white/40">
                {t.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/dashboard/chat"
            className="inline-flex items-center gap-1.5 rounded-xl bg-accent-500 px-5 py-3 text-sm font-medium text-white transition hover:bg-accent-600"
          >
            Coba AI Chat Gratis
            <ArrowUpRight size={16} />
          </Link>
          <Link
            href="/signup"
            className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 px-5 py-3 text-sm font-medium text-white/85 transition hover:bg-white/5"
          >
            Buat Akun Gratis
          </Link>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
      <div className="flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 text-xs text-white/35 sm:flex-row">
        <p>© {new Date().getFullYear()} DimzLabs ai. All rights reserved.</p>
        <p>Built with Next.js &amp; Firebase</p>
      </div>
    </footer>
  );
}
