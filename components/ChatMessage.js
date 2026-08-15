"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Sparkles, User } from "lucide-react";

export default function ChatMessage({ role, content, modelLabel }) {
  const isUser = role === "user";

  return (
    <div className={`flex gap-3 ${isUser ? "flex-row-reverse" : ""}`}>
      <div
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
          isUser
            ? "bg-white/10 text-white/70"
            : "bg-gradient-to-br from-accent-400 to-accent-600 text-white"
        }`}
      >
        {isUser ? <User size={14} /> : <Sparkles size={14} />}
      </div>

      <div className={`max-w-[80%] ${isUser ? "items-end" : "items-start"} flex flex-col`}>
        {!isUser && modelLabel && (
          <span className="mb-1 text-[11px] font-medium text-white/35">{modelLabel}</span>
        )}
        <div
          className={`rounded-2xl px-4 py-3 ${
            isUser
              ? "bg-accent-500 text-white"
              : "border border-white/8 bg-base-850 text-white"
          }`}
        >
          {isUser ? (
            <p className="text-sm leading-relaxed">{content}</p>
          ) : (
            <div className="prose-ai">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
