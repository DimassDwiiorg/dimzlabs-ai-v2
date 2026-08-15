# DimzLabs ai

Web app AI chatbot + tools multi-model, dibangun pakai **Next.js 14 (App Router)**,
**Tailwind CSS**, dan **Firebase (Auth + Firestore)**. Siap di-deploy ke Vercel.

## Yang sudah ada

- Landing page yang meniru layout di gambar referensi (hero, dashboard mock, trusted-by, features).
- Login & Signup (email, username, password) pakai Firebase Authentication.
- Dashboard dengan sidebar (Dashboard, AI Chat, AI Tools, History, Settings).
- **AI Chat** dengan 2 model:
  - `GPT-4o Mini` — bisa dipakai tanpa login (guest), dibatasi **5 prompt**.
  - `Claude Sonnet` — terkunci (🔒), wajib login.
  - Setelah login, kedua model kebuka dan kuota GPT tidak lagi dibatasi.
  - Jawaban dirender pakai Markdown (bold, list, code block, dst) supaya rapi
    seperti tampilan Claude/ChatGPT/Gemini.
  - Riwayat chat pengguna yang login disimpan ke Firestore per `sessionId`.
- **AI Tools** (semuanya wajib login):
  - AI Logo Generator
  - AI Text Humanizer
  - Image to Prompt

## Satu hal yang saya skip

Salah satu file yang kamu upload (`worm-boongan.txt`) berisi endpoint untuk
**WormGPT** — model yang memang dipasarkan tanpa filter keamanan untuk bikin
malware, phishing, dan penipuan. Saya nggak masukkan model itu ke project ini.
Kalau kamu mau, sisa 4 tools yang ada (GPT, Claude/Honcho, Logo, Humanizer,
Image-to-Prompt) semuanya sudah saya integrasikan penuh.

Perlu diketahui juga: beberapa API di sini (chatgpt.org, design.com, zerogpt,
aiconvert.online) adalah endpoint internal pihak ketiga yang dipanggil langsung
(bukan API resmi/berbayar mereka) — jadi bisa saja berubah/diblokir sewaktu-waktu
tanpa pemberitahuan. Kalau salah satu berhenti berfungsi, servernya yang berubah,
bukan kode di project ini yang salah.

## 1. Setup lokal

```bash
npm install
cp .env.local.example .env.local
```

## 2. Setup Firebase

1. Buka [Firebase Console](https://console.firebase.google.com) → **Add project** (gratis, plan Spark).
2. Di project itu, buka **Build → Authentication → Get started → Email/Password** → aktifkan.
3. Buka **Build → Firestore Database → Create database** → mode production (atau test, lalu atur rules di bawah).
4. Buka **Project settings → General → Your apps → Web (</>)** → daftarkan app → copy config-nya.
5. Tempel nilai config itu ke `.env.local`:

```
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
```

6. Di Firestore **Rules**, pakai minimal seperti ini supaya user cuma bisa
   baca/tulis datanya sendiri:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      match /sessions/{sessionId}/messages/{messageId} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
    }
  }
}
```

## 3. Jalankan lokal

```bash
npm run dev
```

Buka `http://localhost:3000`.

## 4. Deploy ke Vercel

**Lewat GitHub (disarankan):**
1. Push folder ini ke repo GitHub baru.
2. Buka [vercel.com/new](https://vercel.com/new) → import repo itu.
3. Di step **Environment Variables**, isi 6 variabel `NEXT_PUBLIC_FIREBASE_*` yang sama
   seperti di `.env.local`.
4. Klik **Deploy**. Next.js otomatis terdeteksi, tidak perlu ubah build settings.

**Lewat CLI:**
```bash
npm i -g vercel
vercel login
vercel
# isi env vars saat diminta, atau lewat: vercel env add
vercel --prod
```

Setelah deploy, buka **Firebase Console → Authentication → Settings → Authorized domains**
dan tambahkan domain Vercel kamu (mis. `dimzlabs-ai.vercel.app`), supaya login/signup
tidak diblokir oleh Firebase.

## Struktur folder singkat

```
app/
  page.js                 → landing page
  login/, signup/         → auth pages
  dashboard/
    layout.js              → shell + sidebar
    page.js                 → dashboard home
    chat/page.js             → AI Chat (GPT + Claude)
    tools/page.js            → Logo, Humanizer, Image-to-Prompt
  api/
    chat/gpt/route.js
    chat/claude/route.js
    tools/logo/route.js
    tools/humanize/route.js
    tools/img-to-prompt/route.js
lib/
  firebase.js              → init Firebase client
  guestLimit.js            → batas 5 prompt guest (localStorage)
  providers/                → wrapper ke tiap AI/endpoint pihak ketiga
context/AuthContext.js     → state login + Firestore user profile
```

## Batasan yang perlu kamu tahu

- Limit 5 prompt untuk guest disimpan di `localStorage` browser — cukup untuk
  UX normal, tapi bukan proteksi anti-abuse yang kuat (guest bisa clear
  localStorage). Untuk proteksi lebih ketat, itu perlu rate-limit berbasis IP
  di server (misalnya lewat Vercel KV/Upstash).
- Endpoint scraping pihak ketiga bisa berubah struktur responsnya kapan saja
  karena bukan API resmi.
