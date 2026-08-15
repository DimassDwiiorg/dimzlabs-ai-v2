"use client";

// Guest (belum login) cuma boleh 5 prompt total ke model GPT.
// Disimpan di localStorage browser - cukup untuk mencegah pemakaian tanpa sengaja,
// bukan proteksi anti-abuse yang kuat (guest tidak punya akun untuk dilacak di server).
const KEY = "dimzlabs_guest_usage";
const MAX_GUEST_PROMPTS = 5;

export function getGuestUsage() {
  if (typeof window === "undefined") return 0;
  const raw = window.localStorage.getItem(KEY);
  return raw ? parseInt(raw, 10) || 0 : 0;
}

export function getGuestRemaining() {
  return Math.max(0, MAX_GUEST_PROMPTS - getGuestUsage());
}

export function canGuestChat() {
  return getGuestUsage() < MAX_GUEST_PROMPTS;
}

export function incrementGuestUsage() {
  if (typeof window === "undefined") return;
  const next = getGuestUsage() + 1;
  window.localStorage.setItem(KEY, String(next));
  return next;
}

export const GUEST_LIMIT = MAX_GUEST_PROMPTS;
