import { MotionConfig } from "framer-motion";
import ParticleBg from "./components/ParticleBg";
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

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <ParticleBg />
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
