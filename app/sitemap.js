// Next.js otomatis generate ini jadi /sitemap.xml saat di-build/deploy.
// Ganti baseUrl dengan domain asli kamu.

export default function sitemap() {
  const baseUrl = "https://dimzlabs.my.id"; // GANTI dengan domain asli kamu

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    // Tambahin route publik lain di sini kalau ada, contoh:
    // {
    //   url: `${baseUrl}/tentang`,
    //   lastModified: new Date(),
    //   changeFrequency: "monthly",
    //   priority: 0.6,
    // },
  ];
}
