"use client";

import { PenLine, ImageIcon, Code2, MessageSquare } from "lucide-react";

const features = [
  {
    icon: PenLine,
    title: "AI Writer",
    desc: "Buat artikel, copywriting, deskripsi produk, dan banyak lagi.",
    bg: "bg-accent-500/15",
    fg: "text-accent-400",
  },
  {
    icon: ImageIcon,
    title: "AI Image Generator",
    desc: "Ubah ide menjadi gambar berkualitas tinggi.",
    bg: "bg-emerald-500/15",
    fg: "text-emerald-400",
  },
  {
    icon: Code2,
    title: "AI Code Assistant",
    desc: "Tulis kode lebih cepat dan efisien dengan bantuan AI.",
    bg: "bg-orange-500/15",
    fg: "text-orange-400",
  },
  {
    icon: MessageSquare,
    title: "Smart AI Chat",
    desc: "Dapatkan jawaban, ide, dan solusi kapan saja.",
    bg: "bg-sky-500/15",
    fg: "text-sky-400",
  },
];

export default function Features() {
  return (
    <section id="features" className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.6fr] lg:items-center">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-1.5 text-xs text-white/60">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-400" />
            Features
          </span>
          <h2 className="mt-5 text-4xl font-bold leading-tight tracking-tight">
            Powerful AI Tools
            <br />
            For <span className="text-accent-400">Every Need</span>
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-white/8 bg-base-850/60 p-6 transition hover:border-white/15"
            >
              <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${f.bg} ${f.fg}`}>
                <f.icon size={20} />
              </div>
              <h3 className="mt-4 text-base font-semibold">{f.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-white/45">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
