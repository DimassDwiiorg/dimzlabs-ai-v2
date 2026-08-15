"use client";

import { useAuth } from "../../../context/AuthContext";

export default function SettingsPage() {
  const { user, profile } = useAuth();

  return (
    <div className="px-8 py-7">
      <h1 className="text-lg font-semibold">Settings</h1>

      {user ? (
        <div className="mt-5 max-w-md space-y-4 rounded-2xl border border-white/8 bg-base-850/60 p-6">
          <Field label="Username" value={profile?.username || "-"} />
          <Field label="Email" value={user.email} />
          <Field label="Plan" value={profile?.plan || "Free Plan"} />
        </div>
      ) : (
        <p className="mt-5 text-sm text-white/45">
          Masuk untuk melihat dan mengatur akun kamu.
        </p>
      )}
    </div>
  );
}

function Field({ label, value }) {
  return (
    <div>
      <p className="text-xs text-white/40">{label}</p>
      <p className="mt-1 text-sm">{value}</p>
    </div>
  );
}
