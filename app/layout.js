import "./globals.css";
import { AuthProvider } from "../context/AuthContext";

const siteUrl = "https://dimzlabs.my.id"; // GANTI dengan domain asli kamu setelah deploy

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "DimzLabs ai — Create. Automate. Elevate.",
    template: "%s | DimzLabs ai",
  },
  description:
    "DimzLabs ai membantu kamu menghasilkan ide, konten, dan solusi cerdas dengan kekuatan AI tercanggih.",
  keywords: [
    "DimzLabs ai",
    "DimzLabs",
    "dimzlabsai",
    "AI chatbot",
    "AI tools Indonesia",
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: "DimzLabs ai — Create. Automate. Elevate.",
    description:
      "DimzLabs ai membantu kamu menghasilkan ide, konten, dan solusi cerdas dengan kekuatan AI tercanggih.",
    url: siteUrl,
    siteName: "DimzLabs ai",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DimzLabs ai — Create. Automate. Elevate.",
    description:
      "DimzLabs ai membantu kamu menghasilkan ide, konten, dan solusi cerdas dengan kekuatan AI tercanggih.",
  },
  verification: {
    // Setelah verifikasi domain di Google Search Console via metode "HTML tag",
    // tempel isi content="..." dari sana ke sini
    google: "GANTI_DENGAN_KODE_VERIFIKASI_GOOGLE_SEARCH_CONSOLE",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="bg-base-950 text-white font-sans antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
