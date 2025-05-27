"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { Github, Link2, X } from "lucide-react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GradualSpacing } from "@/components/ui/gradualSpacing";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const [active, setActive] = useState<(typeof projects)[number] | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();
  const cardRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(null);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useOutsideClick(ref as React.RefObject<HTMLElement>, () => setActive(null));


  useEffect(() => {
    // Cards animation via GSAP ScrollTrigger
    gsap.fromTo(
        ".project-title",
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          scrollTrigger: {
            trigger: "#projects",
            start: "top bottom",
            end:"center center",
            toggleActions: "play none none reverse",
            scrub:true,
            markers:false
          },
          duration: 1,
          ease: "power3.out",
        }
      );
    
    cardRefs.current.forEach((card, i) => {
      if (card) {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none reverse",
            scrub:true,
            markers:false
          },
          opacity: 0,
          y: -100,
          duration: 0.8,
          ease: "power3.out",
          delay: i * 0.1,
        });
      }
    });
  }, []);

  return (
    <section className="bg-black text-white p-12">
      <div className="project-title overflow-hidden absolute">
        <GradualSpacing text="Projects" />
      </div>
      <div className="max-w-4xl mx-auto px-4 mt-50 space-y-6">
        {/* Modal Overlay */}
        <AnimatePresence>
          {active && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.1 } }}
              exit={{ opacity: 0, transition: { duration: 0.1 } }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            />
          )}
        </AnimatePresence>

        {/* Modal Content */}
        <AnimatePresence>
          {active && (
            <div className="fixed inset-0 grid place-items-center z-50 p-4">
              <motion.div
                layoutId={`card-${active.title}-${id}`}
                ref={ref}
                className="w-full max-w-2xl bg-neutral-900 rounded-xl overflow-hidden shadow-xl"
              >
                <div className="relative">
                  <Image
                    src={active.image}
                    alt={active.title}
                    width={800}
                    height={400}
                    className="w-full h-48 object-cover"
                  />
                  <button
                    onClick={() => setActive(null)}
                    className="absolute top-2 right-2 p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-2xl font-bold">{active.title}</h3>
                      <p className="text-neutral-300 mt-1">{active.description}</p>
                    </div>
                    <div className="flex gap-2">
                      {active.github && (
                        <a
                          href={active.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-neutral-800 rounded-lg hover:bg-neutral-700 transition-colors"
                        >
                          <Github className="w-5 h-5" />
                        </a>
                      )}
                      {active.demo && (
                        <a
                          href={active.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-neutral-800 rounded-lg hover:bg-neutral-700 transition-colors"
                        >
                          <Link2 className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Tech Stack</h4>
                      <div className="flex flex-wrap gap-2">
                        {active.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 bg-neutral-800 rounded-full text-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">How It Works</h4>
                      <p className="text-neutral-300">{active.howItWorks}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Project Cards */}
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            layoutId={`card-${project.title}-${id}`}
            onClick={() => setActive(project)}
            ref={(el) => {
              if (el) cardRefs.current[index] = el;
            }}
            className="bg-neutral-900 text-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer"
          >
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/3">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="p-6 md:w-2/3 space-y-4">
                <div>
                  <h3 className="text-xl font-semibold">
                    {index + 1}. {project.title}
                  </h3>
                  <p className="text-neutral-300 mt-2">{project.description}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-neutral-800 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

const projects = [
  {
    title: "Focus Monitor",
    description: "AI-powered productivity tracking system with screen monitoring",
    image: "/images/focus-monitor.png",
    github: "https://github.com/hirendra007/FocusMonitor",
    demo: "https://focus-monitor.vercel.app",
    techStack: ["React", "TensorFlow.js", "Node.js", "MongoDB", "FaceApi.js"],
    howItWorks:
      "Uses computer vision to track user attention and productivity patterns. Captures screen activity and provides detailed analytics through a dashboard.",
  },
  {
    title: "Smart Helmet System",
    description: "IoT-enabled safety helmet for industrial workers",
    image: "/images/smart-helmet-system.jpg",
    github: "https://github.com/hirendra007/Smart-Helmet-System",
    demo: "#",
    techStack: ["React Native", "Python", "Raspberry Pi", "IoT", "MQTT"],
    howItWorks:
      "Monitors environmental conditions and worker vitals in real-time. Alerts system through LoRaWAN communication when dangerous conditions are detected.",
  },
  {
    title: "Portfolio Website",
    description: "Modern developer portfolio with interactive 3D elements",
    image: "/images/portfolio.png",
    github: "#",
    demo: "#",
    techStack: ["Next.js", "GSAP", "Framer Motion", "Tailwind CSS"],
    howItWorks:
    "Combines smooth animations with 3D WebGL elements to create an immersive portfolio experience. Optimized for performance and SEO.",
  },
  {
    title: "Weather App",
    description: "Real-time weather forecasting with historical data analysis",
    image: "/images/weather.png",
    github: "https://github.com/hirendra007/Weather-App",
    demo: "https://weather-app-eight-tan-70.vercel.app",
    techStack: ["React.js", "JavaScript", "CSS", "OpenWeather API"],
    howItWorks:
      "Integrates with multiple weather APIs to provide hyper-local forecasts. Features interactive maps and historical weather pattern visualization.",
  },
];
