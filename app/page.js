import Navbar from '@/components/site/Navbar';
import Hero from '@/components/site/Hero';
import Problems from '@/components/site/Problems';
import ServicesMatrix from '@/components/site/ServicesMatrix';
import TargetClients from '@/components/site/TargetClients';
import Benefits from '@/components/site/Benefits';
import Technologies from '@/components/site/Technologies';
import FinalCTA from '@/components/site/FinalCTA';
import ConversionBridge from '@/components/site/ConversionBridge';
import Footer from '@/components/site/Footer';

export default function Home() {
  return (
    <div className="relative bg-background">
      <Navbar />
      <main>
        <Hero />
        <Problems />
        <ServicesMatrix />
        <TargetClients />
        <Benefits />
        <Technologies />
        <FinalCTA />
        <ConversionBridge />
      </main>
      <Footer />
    </div>
  );
}
