// Next.js otomatis generate ini jadi /robots.txt saat di-build/deploy.
// Ganti baseUrl dengan domain asli kamu.

export default function robots() {
  const baseUrl = "https://dimzlabs.my.id"; // GANTI dengan domain asli kamu

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Halaman yang butuh login / bukan buat publik nggak perlu dirayapi Google
      disallow: ["/dashboard", "/api/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
