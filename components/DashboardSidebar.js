"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  MessageSquare,
  Wrench,
  History,
  Settings,
  LogOut,
  LogIn,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const items = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/chat", label: "AI Chat", icon: MessageSquare },
  { href: "/dashboard/tools", label: "AI Tools", icon: Wrench },
  { href: "/dashboard/chat?history=1", label: "History", icon: History },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, profile, logout } = useAuth();

  return (
    <aside className="flex h-screen w-60 shrink-0 flex-col justify-between border-r border-white/5 bg-base-900 px-4 py-5">
      <div>
        <Link href="/" className="px-1 text-lg font-semibold tracking-tight">
          DimzLabs <span className="text-accent-400">ai</span>
        </Link>

        <nav className="mt-8 space-y-1">
          {items.map((item) => {
            const active = pathname === item.href.split("?")[0];
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm transition ${
                  active
                    ? "bg-accent-500/15 text-accent-400"
                    : "text-white/55 hover:bg-white/5 hover:text-white"
                }`}
              >
                <item.icon size={16} />
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/dashboard/settings"
            className={`flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm transition ${
              pathname === "/dashboard/settings"
                ? "bg-accent-500/15 text-accent-400"
                : "text-white/55 hover:bg-white/5 hover:text-white"
            }`}
          >
            <Settings size={16} />
            Settings
          </Link>
        </nav>
      </div>

      {user ? (
        <div className="rounded-xl border border-white/5 p-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-accent-400 to-accent-600 text-xs font-semibold uppercase">
              {(profile?.username || user.email || "U")[0]}
            </div>
            <div className="min-w-0 leading-tight">
              <p className="truncate text-xs font-medium">
                {profile?.username || "Pengguna"}
              </p>
              <p className="text-[10px] text-white/40">{profile?.plan || "Free Plan"}</p>
            </div>
          </div>
          <button
            onClick={async () => {
              await logout();
              router.push("/");
            }}
            className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-lg border border-white/10 py-2 text-xs text-white/60 transition hover:bg-white/5"
          >
            <LogOut size={13} />
            Keluar
          </button>
        </div>
      ) : (
        <Link
          href="/login"
          className="flex items-center justify-center gap-1.5 rounded-lg bg-accent-500 py-2.5 text-xs font-medium text-white transition hover:bg-accent-600"
        >
          <LogIn size={13} />
          Masuk / Daftar
        </Link>
      )}
    </aside>
  );
}
