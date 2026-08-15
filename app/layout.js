import "./globals.css";
import { AuthProvider } from "../context/AuthContext";

export const metadata = {
  title: "DimzLabs ai — Create. Automate. Elevate.",
  description:
    "DimzLabs ai membantu kamu menghasilkan ide, konten, dan solusi cerdas dengan kekuatan AI tercanggih.",
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
