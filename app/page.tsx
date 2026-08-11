import Navbar from "@/components/navbar";
import HeroSection from "@/components/hero-section";
import MapsSection from "@/components/maps-section";
// import KatalogSection from "@/components/katalog-section";
// 🟢 SESUDAH (Named Import dengan kurung kurawal)
import { KatalogSection } from "@/components/katalog-section";
import Footer from "@/components/footer";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <MapsSection />
        <KatalogSection />
      </main>
      <Footer />
    </div>
  );
}
