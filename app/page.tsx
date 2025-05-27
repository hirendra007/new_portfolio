'use client';

import Hero from "./Sections/hero";
import About from "./Sections/about";
import Skills from "./Sections/skills";
import Projects from "./Sections/projects";
import Contact from "./Sections/contact";
import Navbar from "./components/navbar";
import ParticlesCanvas from "./components/animations/ParticlesCanvas";

export default function Home() {
  return (
    <div className="relative max-w-screen overflow-hidden">
      <ParticlesCanvas />
      <Navbar />
      <main className="flex flex-col">
        <section id="top" className="w-screen h-screen">
          <Hero />
        </section>
        <section id="about" className="w-screen h-screen">
          <About />
        </section>
        <section id="skills" className="w-screen ">
          <Skills />
        </section>
        <section id="projects" className="w-screen min-h-screen">
          <Projects/>
        </section>
        <section id="contact" className="w-screen min-h-screen">
          <Contact />
        </section>
      </main>

      <footer className="py-10 text-center  text-white/90 bg-black bottom-0 w-full">
        © {new Date().getFullYear()} Hirendra — Built with Next.JS, GSAP & Framer-Motion
      </footer>
    </div>
  );
}
