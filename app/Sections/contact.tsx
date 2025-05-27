"use client";

import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Instagram, Linkedin, Github as GitIcon } from 'lucide-react';
import { SiLeetcode } from 'react-icons/si';

gsap.registerPlugin(ScrollTrigger);

const socials = [
  { icon: <Instagram size={40} />, url: 'https://www.instagram.com/hirendra______279/' },
  { icon: <Linkedin size={40} />, url: 'https://www.linkedin.com/in/hirendrabalaji/' },
  { icon: <GitIcon size={40} />, url: 'https://github.com/hirendra007' },
  { icon: <SiLeetcode size={40} />, url: 'https://leetcode.com/u/hirendrabalaji3/' },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const title = sectionRef.current?.querySelector('h2');
      const formEl = sectionRef.current?.querySelector('.contact-form');
      const socialEl = sectionRef.current?.querySelector('.social-links');

      if (title) {
        gsap.from(title, {
          scrollTrigger: {
            trigger: title,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
            markers: false
          },
          opacity: 0,
          y: -40,
          duration: 1,
          ease: 'power3.out',
        });
      }
      if (formEl) {
        gsap.from(formEl, {
          scrollTrigger: {
            trigger: formEl,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
            markers: false
          },
          opacity: 0,
          x: -100,
          duration: 1,
          ease: 'power3.out',
        });
      }
      if (socialEl) {
        gsap.from(socialEl, {
          scrollTrigger: {
            trigger: socialEl,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
            markers: false
          },
          opacity: 0,
          x: 100,
          duration: 1,
          ease: 'power3.out',
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formRef.current) return;
    setStatus('sending');
    const formData = new FormData(formRef.current);
    try {
      const res = await fetch('https://formspree.io/f/manogken', {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      });
      if (res.ok) setStatus('success'); else throw new Error();
    } catch {
      setStatus('error');
    }
  }

  if (!isMounted) return null;

  return (
    <section id="contact" ref={sectionRef} className="min-h-screen py-24 bg-black text-white px-6 relative overflow-hidden">

      <div className="relative max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <motion.div className="contact-form bg-neutral-900 p-8 rounded-2xl shadow-2xl"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0, transition: { duration: 0.5 } }}>
          <h2 className="text-4xl font-semibold mb-4">
            Let&apos;s Collaborate
          </h2>
          <p className="mb-6 opacity-70">
            Have an idea or just want to say hi? Drop me a message and let&apos;s build something amazing.
          </p>
          <AnimatePresence>
            {status === 'success' && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mb-4 text-green-400">
                Thanks for your message! I&apos;ll get back to you soon.
              </motion.p>
            )}
            {status === 'error' && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mb-4 text-red-400">
                Oops! Something went wrong. Please try again.
              </motion.p>
            )}
          </AnimatePresence>
          <form ref={formRef} onSubmit={handleSubmit} className="grid gap-4">
            <motion.input
              type="text"
              name="name"
              placeholder="Name"
              required
              className="border border-neutral-700 rounded-xl p-4 bg-neutral-800 text-white placeholder-gray-400 focus:border-primary focus:outline-none"
              whileFocus={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            />
            <motion.input
              type="email"
              name="email"
              placeholder="Email"
              required
              className="border border-neutral-700 rounded-xl p-4 bg-neutral-800 text-white placeholder-gray-400 focus:border-primary focus:outline-none"
              whileFocus={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            />
            <motion.textarea
              name="message"
              rows={5}
              placeholder="Message"
              required
              className="border border-neutral-700 rounded-xl p-4 bg-neutral-800 text-white placeholder-gray-400 focus:border-primary focus:outline-none resize-none"
              whileFocus={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            />
            <motion.button
              type="submit"
              disabled={status === 'sending'}
              className="bg-primary text-white py-3 rounded-2xl shadow-xl hover:scale-105 transition-transform disabled:opacity-50"
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              {status === 'sending' ? 'Sending...' : 'Send Message'}
            </motion.button>
          </form>
        </motion.div>
        <div className="social-links flex flex-col items-center space-y-6">
          <motion.h3 className="text-2xl font-semibold mb-4"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0, transition: { duration: 0.5 } }}
          >
            Let&apos;s Connect
          </motion.h3>

          {/* Social Icons */}
          <div className="flex space-x-6">
            {socials.map((item, i) => (
              <motion.a
                key={i}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0, transition: { duration: 0.5 } }}
                whileHover={{ scale: 1.2, rotate: 10 }}
                transition={{ type: 'spring', stiffness: 200 }}
              >
                {item.icon}
              </motion.a>
            ))}
          </div>

          {/* Gmail */}
          <motion.p
           
            className="mt-6 text-neutral-300 underline  hover:text-white transition-colors"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0, transition: { duration: 0.5 } }}
          >
            hirendrabalaji3@gmail.com
          </motion.p>

          {/* CV Download Button */}
          <motion.a
            href="/cv/hirendra-resume.pdf"
            download
            className="mt-4 inline-block px-6 py-3 rounded-xl bg-primary text-white font-medium shadow-lg hover:scale-105 hover:bg-primary/80 transition-all"
            initial={{ x: 20 }}
            whileInView={{  x: 0, transition: { duration: 0.5 } }}
            whileHover={{ scale: 1.05 }}
          >
            Download CV
          </motion.a>
        </div>

      </div>
    </section>
  );
}