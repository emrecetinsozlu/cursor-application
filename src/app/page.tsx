import {
  FloatingBackground,
  Hero,
  BenefitsGrid,
  Footer,
} from "@/components/home";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <FloatingBackground />
      <Hero />
      <BenefitsGrid />
      <Footer />
    </div>
  );
}
