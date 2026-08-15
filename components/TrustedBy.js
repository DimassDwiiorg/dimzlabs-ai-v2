"use client";

const names = ["Google", "Microsoft", "Notion", "Canva", "Figma"];

export default function TrustedBy() {
  return (
    <section className="border-y border-white/5 py-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <p className="text-center text-xs text-white/35">
          Trusted by creators and teams from
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
          {names.map((n) => (
            <span
              key={n}
              className="text-lg font-semibold tracking-tight text-white/25 grayscale transition hover:text-white/45"
            >
              {n}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
