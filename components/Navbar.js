"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const links = [
  { href: "#home", label: "Home" },
  { href: "#features", label: "Features" },
  { href: "#tools", label: "Tools" },
  { href: "#pricing", label: "Pricing" },
];

export default function Navbar() {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-base-950/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          DimzLabs <span className="text-accent-400">ai</span>
        </Link>

        <div className="hidden items-center gap-8 text-sm text-white/70 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:text-white">
              {l.label}
            </a>
          ))}
        </div>

        <Link
          href={user ? "/dashboard" : "/dashboard/chat"}
          className="inline-flex items-center gap-1.5 rounded-lg bg-accent-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-accent-600"
        >
          {user ? "Dashboard" : "Get Started"}
          <ArrowUpRight size={15} />
        </Link>
      </nav>
    </header>
  );
}
