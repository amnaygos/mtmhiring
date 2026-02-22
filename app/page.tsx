import { Hero } from "./components/sections/hero";
import { WhyMTM } from "./components/sections/why-mtm";
import { RoleDetails } from "./components/sections/role-details";
import { ApplicationForm } from "./components/sections/application-form";
import { Relocation } from "./components/sections/relocation";
import { Footer } from "./components/sections/footer";
import { Navbar } from "./components/ui/navbar";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      <Navbar />
      <Hero />
      <ApplicationForm />
      <WhyMTM />
      <RoleDetails />
      <Relocation />
      <Footer />
    </main>
  );
}
