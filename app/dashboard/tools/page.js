"use client";

import { useState } from "react";
import { Sparkles, Wand2, ImagePlus, Lock, Loader2 } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";

const TABS = [
  { id: "logo", name: "AI Logo Generator", icon: Sparkles },
  { id: "humanize", name: "Text Humanizer", icon: Wand2 },
  { id: "img2prompt", name: "Image to Prompt", icon: ImagePlus },
];

export default function ToolsPage() {
  const { user } = useAuth();
  const [tab, setTab] = useState("logo");

  return (
    <div className="px-8 py-7">
      <h1 className="text-lg font-semibold">AI Tools</h1>
      <p className="mt-1 text-sm text-white/45">
        Kumpulan tools AI tambahan di luar chat.
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs transition ${
              tab === t.id
                ? "bg-accent-500 text-white"
                : "border border-white/10 text-white/55 hover:bg-white/5"
            }`}
          >
            <t.icon size={12} />
            {t.name}
          </button>
        ))}
      </div>

      <div className="mt-6 max-w-2xl">
        {!user ? (
          <LockedPanel />
        ) : tab === "logo" ? (
          <LogoPanel />
        ) : tab === "humanize" ? (
          <HumanizePanel />
        ) : (
          <ImgToPromptPanel />
        )}
      </div>
    </div>
  );
}

function LockedPanel() {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-base-850 px-6 py-14 text-center">
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/5 text-white/40">
        <Lock size={18} />
      </span>
      <p className="text-sm text-white/60">
        Tools ini cuma bisa dipakai kalau kamu sudah login.
      </p>
      <a
        href="/signup"
        className="mt-2 rounded-lg bg-accent-500 px-4 py-2 text-xs font-medium text-white hover:bg-accent-600"
      >
        Buat Akun Gratis
      </a>
    </div>
  );
}

function LogoPanel() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [logos, setLogos] = useState([]);
  const [error, setError] = useState("");

  async function generate(e) {
    e.preventDefault();
    if (!name.trim()) return;
    setLoading(true);
    setError("");
    setLogos([]);
    try {
      const res = await fetch("/api/tools/logo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: name.trim(), limit: 12 }),
      });
      const data = await res.json();
      if (data.success) setLogos(data.data.logos);
      else setError(data.error || "Gagal generate logo.");
    } catch (err) {
      setError("Gagal terhubung ke layanan logo.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <form onSubmit={generate} className="flex gap-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nama brand kamu, contoh: StarLabs"
          className="flex-1 rounded-xl border border-white/10 bg-base-850 px-4 py-3 text-sm outline-none focus:border-accent-500"
        />
        <button
          disabled={loading}
          className="flex items-center gap-1.5 rounded-xl bg-accent-500 px-4 py-3 text-sm font-medium disabled:opacity-60"
        >
          {loading && <Loader2 size={14} className="animate-spin" />}
          Generate
        </button>
      </form>
      {error && <p className="mt-3 text-xs text-red-400">{error}</p>}
      {logos.length > 0 && (
        <div className="mt-5 grid grid-cols-3 gap-3 sm:grid-cols-4">
          {logos.map((l, i) => (
            <div
              key={i}
              className="aspect-square overflow-hidden rounded-xl border border-white/8 bg-base-850"
            >
              {l.image_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={l.image_url} alt={l.design_name || "logo"} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full items-center justify-center text-[10px] text-white/30">
                  No preview
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function HumanizePanel() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function run(e) {
    e.preventDefault();
    if (text.trim().length < 50) {
      setError("Teks minimal 50 karakter.");
      return;
    }
    setLoading(true);
    setError("");
    setResult("");
    try {
      const res = await fetch("/api/tools/humanize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: text.trim() }),
      });
      const data = await res.json();
      if (data.success) setResult(data.output);
      else setError(data.error || "Gagal memproses teks.");
    } catch (err) {
      setError("Gagal terhubung ke layanan humanizer.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={run} className="space-y-3">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={6}
        placeholder="Tempel teks hasil AI kamu di sini (minimal 50 karakter)..."
        className="w-full resize-none rounded-xl border border-white/10 bg-base-850 px-4 py-3 text-sm outline-none focus:border-accent-500"
      />
      <button
        disabled={loading}
        className="flex items-center gap-1.5 rounded-xl bg-accent-500 px-4 py-3 text-sm font-medium disabled:opacity-60"
      >
        {loading && <Loader2 size={14} className="animate-spin" />}
        Humanize
      </button>
      {error && <p className="text-xs text-red-400">{error}</p>}
      {result && (
        <div className="rounded-xl border border-white/8 bg-base-850 px-4 py-3 text-sm leading-relaxed text-white/85">
          {result}
        </div>
      )}
    </form>
  );
}

function ImgToPromptPanel() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function onFile(e) {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setPrompt("");
    setError("");
  }

  async function run(e) {
    e.preventDefault();
    if (!file) return;
    setLoading(true);
    setError("");
    try {
      const base64 = await fileToBase64(file);
      const res = await fetch("/api/tools/img-to-prompt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageData: base64, mimeType: file.type }),
      });
      const data = await res.json();
      if (data.sukses) setPrompt(data.prompt);
      else setError(data.pesan || "Gagal generate prompt.");
    } catch (err) {
      setError("Gagal memproses gambar.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={run} className="space-y-4">
      <label className="flex cursor-pointer flex-col items-center gap-2 rounded-xl border border-dashed border-white/15 px-6 py-8 text-center hover:border-accent-500/50">
        {preview ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={preview} alt="preview" className="max-h-40 rounded-lg object-contain" />
        ) : (
          <>
            <ImagePlus size={22} className="text-white/40" />
            <span className="text-xs text-white/40">Klik untuk upload gambar</span>
          </>
        )}
        <input type="file" accept="image/*" onChange={onFile} className="hidden" />
      </label>

      <button
        disabled={loading || !file}
        className="flex items-center gap-1.5 rounded-xl bg-accent-500 px-4 py-3 text-sm font-medium disabled:opacity-60"
      >
        {loading && <Loader2 size={14} className="animate-spin" />}
        Generate Prompt
      </button>
      {error && <p className="text-xs text-red-400">{error}</p>}
      {prompt && (
        <div className="rounded-xl border border-white/8 bg-base-850 px-4 py-3 text-sm leading-relaxed text-white/85">
          {prompt}
        </div>
      )}
    </form>
  );
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(",")[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
