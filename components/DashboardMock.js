"use client";

import {
  LayoutDashboard,
  MessageSquare,
  LayoutTemplate,
  Wrench,
  FolderKanban,
  History,
  Settings,
  Menu,
  Bell,
  ChevronsUp,
  Send,
  PenLine,
  ImageIcon,
  Code2,
} from "lucide-react";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: MessageSquare, label: "AI Chat" },
  { icon: LayoutTemplate, label: "Templates" },
  { icon: Wrench, label: "AI Tools" },
  { icon: FolderKanban, label: "Projects" },
  { icon: History, label: "History" },
  { icon: Settings, label: "Settings" },
];

const chips = ["All", "Writing", "Design", "Code", "Marketing", "Business"];

const tools = [
  { icon: PenLine, name: "AI Writer", desc: "Buat konten menarik dalam hitungan detik.", bg: "bg-accent-500/15", fg: "text-accent-400" },
  { icon: ImageIcon, name: "AI Image", desc: "Hasilkan gambar kreatif berkualitas tinggi.", bg: "bg-emerald-500/15", fg: "text-emerald-400" },
  { icon: Code2, name: "AI Code", desc: "Buat, perbaiki, dan jelaskan kode dengan mudah.", bg: "bg-orange-500/15", fg: "text-orange-400" },
  { icon: MessageSquare, name: "AI Chat", desc: "Chat cerdas dengan AI untuk berbagai kebutuhan.", bg: "bg-sky-500/15", fg: "text-sky-400" },
];

export default function DashboardMock() {
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-white/10 bg-base-850 shadow-glow">
      {/* top bar */}
      <div className="flex items-center justify-between border-b border-white/5 px-5 py-3.5">
        <div className="flex items-center gap-2 text-sm font-semibold">
          DimzLabs <span className="text-accent-400">ai</span>
          <Menu size={15} className="ml-2 text-white/40" />
        </div>
        <div className="flex items-center gap-3 text-white/50">
          <span className="hidden rounded-md border border-white/10 px-2.5 py-1 text-[11px] sm:inline">
            ⚡ Upgrade
          </span>
          <Bell size={16} />
        </div>
      </div>

      <div className="flex">
        {/* sidebar */}
        <aside className="hidden w-44 shrink-0 flex-col justify-between border-r border-white/5 px-3 py-4 sm:flex">
          <div className="space-y-1">
            {sidebarItems.map((item) => (
              <div
                key={item.label}
                className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] ${
                  item.active
                    ? "bg-accent-500/15 text-accent-400"
                    : "text-white/55"
                }`}
              >
                <item.icon size={15} />
                {item.label}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-white/5 px-2.5 py-2">
            <div className="h-6 w-6 rounded-full bg-gradient-to-br from-accent-400 to-accent-600" />
            <div className="leading-tight">
              <p className="text-[11px] font-medium">DimzLabs</p>
              <p className="text-[10px] text-white/40">Pro Plan</p>
            </div>
          </div>
        </aside>

        {/* main */}
        <div className="flex-1 px-5 py-4">
          <h3 className="text-[15px] font-semibold">Welcome back, DimzLabs 👋</h3>
          <p className="mt-0.5 text-[12px] text-white/45">What will you create today?</p>

          <div className="mt-3 flex items-center gap-2 rounded-xl border border-white/10 bg-base-900 px-3.5 py-2.5">
            <span className="flex-1 truncate text-[12px] text-white/35">
              Ask anything or type your task...
            </span>
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent-500">
              <Send size={13} />
            </span>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {chips.map((c, i) => (
              <span
                key={c}
                className={`rounded-full px-2.5 py-1 text-[11px] ${
                  i === 0
                    ? "bg-accent-500 text-white"
                    : "border border-white/10 text-white/50"
                }`}
              >
                {c}
              </span>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between">
            <p className="text-[12px] font-medium text-white/70">Popular Tools</p>
            <span className="text-[11px] text-accent-400">View all &gt;</span>
          </div>

          <div className="mt-2.5 grid grid-cols-2 gap-2.5 lg:grid-cols-4">
            {tools.map((t) => (
              <div
                key={t.name}
                className="rounded-xl border border-white/5 bg-base-900/70 p-3"
              >
                <div className={`flex h-7 w-7 items-center justify-center rounded-lg ${t.bg} ${t.fg}`}>
                  <t.icon size={14} />
                </div>
                <p className="mt-2 text-[12px] font-medium">{t.name}</p>
                <p className="mt-0.5 line-clamp-2 text-[10.5px] leading-snug text-white/40">
                  {t.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
