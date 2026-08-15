import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import TrustedBy from "../components/TrustedBy";
import Features from "../components/Features";
import { ToolsShowcase, Footer } from "../components/ToolsAndFooter";

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <TrustedBy />
      <Features />
      <ToolsShowcase />
      <Footer />
    </main>
  );
}
