"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import DashboardMock from "./DashboardMock";

export default function Hero() {
  return (
    <section id="home" className="mx-auto max-w-7xl px-6 pb-20 pt-16 lg:px-10 lg:pt-24">
      <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr]">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-1.5 text-xs text-white/60">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-400" />
            AI for Everyone, Built for Tomorrow.
          </span>

          <h1 className="mt-6 text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
            DimzLabs <span className="text-accent-400">ai</span>
            <br />
            Create. Automate.
            <span className="text-accent-400">.</span>
            <br />
            Elevate<span className="text-accent-400">.</span>
          </h1>

          <p className="mt-6 max-w-md text-base leading-relaxed text-white/50">
            DimzLabs ai membantu kamu menghasilkan ide, konten, dan solusi
            cerdas dengan kekuatan AI tercanggih.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/signup"
              className="inline-flex items-center gap-1.5 rounded-xl bg-accent-500 px-5 py-3 text-sm font-medium text-white transition hover:bg-accent-600"
            >
              Start Creating Now
              <ArrowUpRight size={16} />
            </Link>
            <a
              href="#features"
              className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 px-5 py-3 text-sm font-medium text-white/85 transition hover:bg-white/5"
            >
              Explore Features
            </a>
          </div>
        </div>

        <DashboardMock />
      </div>
    </section>
  );
}
