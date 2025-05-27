'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { initGsap } from '../lib/gsap'
import { FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa'
import { motion } from 'framer-motion';

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    initGsap()
    const ctx = gsap.context(() => {
      const el = ref.current!
      gsap.fromTo(
        el.querySelectorAll('p'),
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          stagger: 0.2,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
          },
        }
      )

      gsap.fromTo(
        el.querySelector('.title'),
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1.4,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
          },
        }
      )
    }, ref)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={ref}
      id="top"
      className="relative min-h-screen flex flex-col bg-black justify-center items-center text-center px-4 text-white"
    >
      {/* Name Tag */}
      <span className="title fixed top-8 z-10 left-6 text-lg uppercase text-white tracking-wider">
        Hirendra
      </span>

      {/* Main Headings */}
      <motion.p className="text-5xl uppercase lg:text-9xl tracking-widest font-techno bg-gradient-to-r from-[#ffffff] to-[#9b9b9b] bg-clip-text text-transparent"
      initial={{opacity:0}}
      whileInView={{opacity:1,transition:{duration:0.5}}}>
        Hirendra B
      </motion.p>
      <motion.p className="font-techno mt-6 text-2xl opacity-80 bg-gradient-to-r from-[#ffffff] to-[#888888] bg-clip-text text-transparent"
      initial={{opacity:0}}
      whileInView={{opacity:1,transition:{duration:0.5}}}>
        Student • Full Stack Developer & AI Enthusiast • Pushing Pixels & Code
      </motion.p>

      {/* Bounce Arrow */}
      <motion.span className="absolute bottom-10 animate-bounce text-2xl text-white"
      initial={{opacity:0}}
      whileInView={{opacity:1,transition:{duration:0.5}}}>▼</motion.span>

      {/* Social Links */}
      <motion.div className="absolute bottom-10 left-7 flex gap-4 z-20"
      initial={{opacity:0}}
      whileInView={{opacity:1,transition:{duration:0.5}}}>
        <a
          href="https://www.linkedin.com/in/hirendrabalaji/"
          target="_top"
          rel="noopener noreferrer"
          className="hover:scale-110 transition-transform duration-200"
        >
          <FaLinkedin size={24} />
        </a>
        <a
          href="https://www.instagram.com/hirendra______279/"
          target="_top"
          rel="noopener noreferrer"
          className="hover:scale-110 transition-transform duration-200"
        >
          <FaInstagram size={24} />
        </a>
        <a
          href="https://github.com/hirendra007"
          target="_top"
          rel="noopener noreferrer"
          className="hover:scale-110 transition-transform duration-200"
        >
          <FaGithub size={24} />
        </a>
      </motion.div>
    </section>
  )
}
