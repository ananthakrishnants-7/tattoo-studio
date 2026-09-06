import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PortfolioPreview from "@/components/PortfolioPreview";
import ArtistsPreview from "@/components/ArtistsPreview";
import StudioSection from "@/components/StudioSection";
import BookingCTA from "@/components/BookingCTA";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <PortfolioPreview />
      <ArtistsPreview />
      <StudioSection />
      <BookingCTA />
      <ContactSection />
      <Footer />
    </main>
  );
}