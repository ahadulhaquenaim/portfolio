import { lazy, Suspense } from "react";
import { MotionConfig } from "framer-motion";
import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Experience from "./sections/Experience";
import Contact from "./sections/Contact";
import Certifications from "./sections/Certifications";
import Sports from "./sections/Sports";
import Footer from "./sections/Footer";
import { usePauseOffscreen } from "./lib/usePauseOffscreen";

// tsparticles is purely ambient — load it in its own chunk so it never delays
// first paint or competes with the hero intro.
const ParticleBg = lazy(() => import("./components/ParticleBg"));

export default function App() {
  usePauseOffscreen();

  return (
    <MotionConfig reducedMotion="user">
      <Suspense fallback={null}>
        <ParticleBg />
      </Suspense>
      <Navbar />
      <main className="relative">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Certifications />
        <Contact />
        <Sports />
      </main>
      <Footer />
    </MotionConfig>
  );
}
