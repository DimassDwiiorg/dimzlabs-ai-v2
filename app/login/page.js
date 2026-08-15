"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogIn } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login({ email, password });
      router.push("/dashboard");
    } catch (err) {
      setError(friendlyError(err.code));
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16">
      <div className="w-full max-w-sm">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          DimzLabs <span className="text-accent-400">ai</span>
        </Link>

        <h1 className="mt-8 text-2xl font-bold">Masuk ke akun kamu</h1>
        <p className="mt-1.5 text-sm text-white/45">
          Belum punya akun?{" "}
          <Link href="/signup" className="text-accent-400 hover:underline">
            Daftar di sini
          </Link>
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label className="mb-1.5 block text-xs text-white/50">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-base-850 px-4 py-3 text-sm outline-none transition focus:border-accent-500"
              placeholder="kamu@email.com"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs text-white/50">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-base-850 px-4 py-3 text-sm outline-none transition focus:border-accent-500"
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-xs text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent-500 px-4 py-3 text-sm font-medium text-white transition hover:bg-accent-600 disabled:opacity-60"
          >
            <LogIn size={15} />
            {loading ? "Memproses..." : "Masuk"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-white/35">
          <Link href="/dashboard/chat" className="hover:text-white/60">
            Lanjut sebagai tamu (guest) →
          </Link>
        </p>
      </div>
    </main>
  );
}

function friendlyError(code) {
  const map = {
    "auth/invalid-credential": "Email atau password salah.",
    "auth/user-not-found": "Akun tidak ditemukan.",
    "auth/wrong-password": "Password salah.",
    "auth/invalid-email": "Format email tidak valid.",
    "auth/too-many-requests": "Terlalu banyak percobaan, coba lagi nanti.",
  };
  return map[code] || "Terjadi kesalahan, silakan coba lagi.";
}
