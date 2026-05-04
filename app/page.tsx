import { Navbar } from "./components/ui/navbar";
import { UnifiedSection } from "./components/sections/unified-section";
import { Footer } from "./components/sections/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      <Navbar />
      <UnifiedSection />
      <Footer />
    </main>
  );
}
