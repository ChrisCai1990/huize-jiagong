import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Cases from "@/components/Cases";
import Team from "@/components/Team";
import GuideSection from "@/components/GuideSection";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Cases />
        <Team />
        <GuideSection />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
