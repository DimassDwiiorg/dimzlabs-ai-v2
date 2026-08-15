"use client";

import Link from "next/link";
import { useState } from "react";
import { Bell, Send, MessageSquare, Sparkles, Wand2, ImagePlus } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

const chips = ["All", "Chat", "Logo", "Writing", "Image"];

const tools = [
  {
    icon: MessageSquare,
    name: "AI Chat",
    desc: "Chat cerdas dengan beberapa model AI sekaligus.",
    href: "/dashboard/chat",
    bg: "bg-sky-500/15",
    fg: "text-sky-400",
    locked: false,
  },
  {
    icon: Sparkles,
    name: "AI Logo Generator",
    desc: "Hasilkan konsep logo instan dari nama brand.",
    href: "/dashboard/tools",
    bg: "bg-emerald-500/15",
    fg: "text-emerald-400",
    locked: true,
  },
  {
    icon: Wand2,
    name: "Text Humanizer",
    desc: "Bikin tulisan AI terasa lebih natural.",
    href: "/dashboard/tools",
    bg: "bg-accent-500/15",
    fg: "text-accent-400",
    locked: true,
  },
  {
    icon: ImagePlus,
    name: "Image to Prompt",
    desc: "Ubah gambar jadi prompt AI yang siap pakai.",
    href: "/dashboard/tools",
    bg: "bg-orange-500/15",
    fg: "text-orange-400",
    locked: true,
  },
];

export default function DashboardHome() {
  const { user, profile } = useAuth();
  const router = useRouter();
  const [prompt, setPrompt] = useState("");

  function handleAsk(e) {
    e.preventDefault();
    if (!prompt.trim()) return;
    router.push(`/dashboard/chat?q=${encodeURIComponent(prompt.trim())}`);
  }

  return (
    <div className="px-8 py-7">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">
            Welcome back, {profile?.username || (user ? "Pengguna" : "Tamu")} 👋
          </h1>
          <p className="mt-1 text-sm text-white/45">What will you create today?</p>
        </div>
        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/50">
          <Bell size={16} />
        </span>
      </div>

      <form
        onSubmit={handleAsk}
        className="mt-6 flex items-center gap-3 rounded-2xl border border-white/10 bg-base-850 px-5 py-4"
      >
        <input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask anything or type your task..."
          className="flex-1 bg-transparent text-sm outline-none placeholder:text-white/30"
        />
        <button
          type="submit"
          className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent-500 transition hover:bg-accent-600"
        >
          <Send size={15} />
        </button>
      </form>

      <div className="mt-4 flex flex-wrap gap-2">
        {chips.map((c, i) => (
          <span
            key={c}
            className={`rounded-full px-3 py-1.5 text-xs ${
              i === 0
                ? "bg-accent-500 text-white"
                : "border border-white/10 text-white/50"
            }`}
          >
            {c}
          </span>
        ))}
      </div>

      {!user && (
        <div className="mt-6 rounded-xl border border-accent-500/30 bg-accent-500/10 px-5 py-3.5 text-sm text-white/70">
          Kamu sedang pakai mode tamu — AI Chat model GPT dibatasi 5 prompt, dan tools lain terkunci.{" "}
          <Link href="/signup" className="font-medium text-accent-400 hover:underline">
            Buat akun gratis
          </Link>{" "}
          untuk membuka semuanya.
        </div>
      )}

      <div className="mt-8 flex items-center justify-between">
        <p className="text-sm font-medium text-white/70">Popular Tools</p>
      </div>

      <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {tools.map((t) => (
          <Link
            key={t.name}
            href={t.href}
            className="relative rounded-2xl border border-white/8 bg-base-850/60 p-5 transition hover:border-white/20"
          >
            {t.locked && !user && (
              <span className="absolute right-4 top-4 rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-white/40">
                🔒 Login
              </span>
            )}
            <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${t.bg} ${t.fg}`}>
              <t.icon size={18} />
            </div>
            <h3 className="mt-3.5 text-sm font-semibold">{t.name}</h3>
            <p className="mt-1 text-xs leading-relaxed text-white/40">{t.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
