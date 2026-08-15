"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { Send, Lock, MessageSquare, Sparkles } from "lucide-react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useAuth } from "../../../context/AuthContext";
import { db } from "../../../lib/firebase";
import ChatMessage from "../../../components/ChatMessage";
import {
  canGuestChat,
  incrementGuestUsage,
  getGuestRemaining,
  GUEST_LIMIT,
} from "../../../lib/guestLimit";

const MODELS = [
  {
    id: "gpt",
    name: "GPT-4o Mini",
    icon: MessageSquare,
    endpoint: "/api/chat/gpt",
    guestAllowed: true,
  },
  {
    id: "claude",
    name: "Claude Sonnet",
    icon: Sparkles,
    endpoint: "/api/chat/claude",
    guestAllowed: false,
  },
];

export default function ChatPage() {
  return (
    <Suspense fallback={null}>
      <ChatPageInner />
    </Suspense>
  );
}

function ChatPageInner() {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const [modelId, setModelId] = useState("gpt");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [guestRemaining, setGuestRemaining] = useState(GUEST_LIMIT);
  const [sessionId] = useState(() => uuidv4());
  const bottomRef = useRef(null);
  const autoSent = useRef(false);

  const model = MODELS.find((m) => m.id === modelId) || MODELS[0];
  const locked = !user && !model.guestAllowed;
  const guestBlocked = !user && model.guestAllowed && !canGuestChat();

  useEffect(() => {
    setGuestRemaining(getGuestRemaining());
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    const q = searchParams.get("q");
    if (q && !autoSent.current) {
      autoSent.current = true;
      setInput(q);
      setTimeout(() => sendMessage(q), 150);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  async function sendMessage(text) {
    const content = (text ?? input).trim();
    if (!content || loading) return;
    if (locked || guestBlocked) return;

    const userMsg = { role: "user", content };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(model.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: content, history: messages, sessionId }),
      });
      const data = await res.json();
      const reply = data.reply || data.error || "Maaf, terjadi kesalahan saat memproses jawaban.";

      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);

      if (!user) {
        incrementGuestUsage();
        setGuestRemaining(getGuestRemaining());
      } else {
        persistMessage(userMsg);
        persistMessage({ role: "assistant", content: reply });
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Maaf, koneksi ke AI gagal. Coba lagi ya." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  async function persistMessage(msg) {
    if (!user) return;
    try {
      await addDoc(
        collection(db, "users", user.uid, "sessions", sessionId, "messages"),
        { ...msg, createdAt: serverTimestamp() }
      );
    } catch (e) {
      // Riwayat gagal disimpan tidak menghentikan chat berjalan
      console.error("Gagal menyimpan riwayat:", e);
    }
  }

  return (
    <div className="flex h-screen flex-col">
      {/* header + model tabs */}
      <div className="border-b border-white/5 px-8 py-4">
        <h1 className="text-lg font-semibold">AI Chat</h1>
        <div className="mt-3 flex flex-wrap gap-2">
          {MODELS.map((m) => {
            const isLockedForGuest = !user && !m.guestAllowed;
            return (
              <button
                key={m.id}
                onClick={() => setModelId(m.id)}
                className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs transition ${
                  modelId === m.id
                    ? "bg-accent-500 text-white"
                    : "border border-white/10 text-white/55 hover:bg-white/5"
                }`}
              >
                <m.icon size={12} />
                {m.name}
                {isLockedForGuest && <Lock size={11} className="ml-0.5" />}
              </button>
            );
          })}
        </div>
        {!user && (
          <p className="mt-2.5 text-xs text-white/35">
            Mode tamu: sisa {guestRemaining}/{GUEST_LIMIT} prompt gratis untuk GPT-4o Mini.{" "}
            <a href="/signup" className="text-accent-400 hover:underline">
              Login untuk buka semua model
            </a>
            .
          </p>
        )}
      </div>

      {/* messages */}
      <div className="flex-1 overflow-y-auto px-8 py-6">
        {messages.length === 0 && (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-400 to-accent-600">
              <Sparkles size={20} />
            </div>
            <p className="mt-4 text-sm text-white/40">
              Mulai obrolan dengan {model.name}
            </p>
          </div>
        )}

        <div className="mx-auto max-w-3xl space-y-6">
          {messages.map((m, i) => (
            <ChatMessage
              key={i}
              role={m.role}
              content={m.content}
              modelLabel={m.role === "assistant" ? model.name : null}
            />
          ))}
          {loading && (
            <ChatMessage role="assistant" content="Mengetik..." modelLabel={model.name} />
          )}
          <div ref={bottomRef} />
        </div>
      </div>

      {/* input */}
      <div className="border-t border-white/5 px-8 py-5">
        <div className="mx-auto max-w-3xl">
          {locked ? (
            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-base-850 px-5 py-4">
              <span className="flex items-center gap-2 text-sm text-white/50">
                <Lock size={14} />
                Model ini butuh login untuk digunakan.
              </span>
              <a
                href="/login"
                className="rounded-lg bg-accent-500 px-4 py-2 text-xs font-medium text-white hover:bg-accent-600"
              >
                Masuk / Daftar
              </a>
            </div>
          ) : guestBlocked ? (
            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-base-850 px-5 py-4">
              <span className="text-sm text-white/50">
                Kuota tamu kamu sudah habis ({GUEST_LIMIT}/{GUEST_LIMIT}).
              </span>
              <a
                href="/signup"
                className="rounded-lg bg-accent-500 px-4 py-2 text-xs font-medium text-white hover:bg-accent-600"
              >
                Buat Akun Gratis
              </a>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage();
              }}
              className="flex items-center gap-3 rounded-2xl border border-white/10 bg-base-850 px-4 py-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={`Tanya ${model.name}...`}
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-white/30"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent-500 transition hover:bg-accent-600 disabled:opacity-50"
              >
                <Send size={15} />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
