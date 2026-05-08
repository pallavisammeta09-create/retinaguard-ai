import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import Hero from "@/components/site/Hero";
import Features from "@/components/site/Features";
import Workflow from "@/components/site/Workflow";
import AIDemo from "@/components/site/AIDemo";
import Explainable from "@/components/site/Explainable";
import VisionRisk from "@/components/site/VisionRisk";
import Pricing from "@/components/site/Pricing";
import Testimonials from "@/components/site/Testimonials";
import FAQ from "@/components/site/FAQ";
import Contact from "@/components/site/Contact";
import Compliance from "@/components/site/Compliance";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main>
      <Hero />
      <Features />
      <Workflow />
      <AIDemo />
      <Explainable />
      <VisionRisk />
      <Compliance />
      <Pricing />
      <Testimonials />
      <FAQ />
      <Contact />
    </main>
    <Footer />
  </div>
);

export default Index;
