import Starfield from '@/components/Starfield';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Releases from '@/components/Releases';
import Listen from '@/components/Listen';
import Newsletter from '@/components/Newsletter';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { useScrollReveal } from '@/hooks/useScrollReveal';

function App() {
  useScrollReveal();

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-void-950">
      <Starfield />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Releases />
        <Listen />
        <Newsletter />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
