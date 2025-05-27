// Skills.tsx
'use client'
import { useState, useRef, useEffect } from 'react'
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import {
  ChevronLeft,
  ChevronRight
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const skillsData = {
  languages: [
    {
      icon: <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" alt="JavaScript" className="w-7 h-7" />,
      title: 'JavaScript'
    },
    {
      icon: <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" alt="TypeScript" className="w-7 h-7" />,
      title: 'TypeScript'
    },
    {
      icon: <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt="Python" className="w-7 h-7" />,
      title: 'Python'
    },
    {
      icon: <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" alt="C++" className="w-7 h-7" />,
      title: 'C/C++'
    },
    {
      icon: <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" alt="Java" className="w-7 h-7" />,
      title: 'Java'
    },
    {
      icon: <Image src="/Embedded C.svg" alt="Embedded C" className="w-7 h-7" />,
      title: 'Embedded C'
    }
  ],
  frontend: [
    {
      icon: <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" className="w-7 h-7" />,
      title: 'React.js'
    },
    {
      icon: <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" alt="Next.js" className="w-7 h-7 invert dark:invert-0" />,
      title: 'Next.js'
    },
    {
      icon: <Image src="/tailwind.svg" alt="Tailwind" className="w-7 h-7" />,
      title: 'Tailwind CSS'
    },
    {
      icon: <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React Native" className="w-7 h-7" />,
      title: 'React Native'
    },
    {
      icon: <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/svelte/svelte-original.svg" alt="Svelte" className="w-7 h-7" />,
      title: 'Svelte'
    }
  ],
  backend: [
    {
      icon: <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" alt="Node.js" className="w-7 h-7" />,
      title: 'Node.js'
    },
    {
      icon: <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" alt="Express.js" className="w-7 h-7 invert dark:invert-0" />,
      title: 'Express.js'
    },
    {
      icon: <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" alt="MongoDB" className="w-7 h-7" />,
      title: 'MongoDB'
    },
    {
      icon: <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" alt="PostgreSQL" className="w-7 h-7" />,
      title: 'PostgreSQL'
    },
    {
      icon: <Image src="/OpenAPI.svg" alt="API" className="w-7 h-7" />,
      title: 'OpenAPI'
    }
  ],
  tools: [
    {
      icon: <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" alt="Git" className="w-7 h-7" />,
      title: 'Git'
    },
    {
      icon: <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" alt="GitHub" className="w-7 h-7 invert dark:invert-0" />,
      title: 'GitHub'
    },
    {
      icon: <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" alt="VSCode" className="w-7 h-7" />,
      title: 'VSCode'
    },
    {
      icon: <Image src="/Postman.svg" alt="Postman" className="w-7 h-7 rounded-md" />,
      title: 'Postman'
    },
    {
      icon: <Image src="/Arduino.svg" alt="Arduino IDE" className="w-7 h-7 rounded-md" />,
      title: 'Arduino IDE'
    },
    {
      icon: <Image src="https://upload.wikimedia.org/wikipedia/commons/d/d0/Google_Colaboratory_SVG_Logo.svg" alt="Google Colab" className="w-7 h-7 rounded-md" />,
      title: 'Google Colab'
    },
    {
      icon: <Image src="/Kaggle.svg" alt="Kaggle" className="w-7 h-7 rounded-md" />,
      title: 'Kaggle'
    }
  ]
}



type Category = keyof typeof skillsData

export default function Skills() {
    const sectionRef = useRef<HTMLDivElement>(null)
  const categories = Object.keys(skillsData) as Category[]
  const [selected, setSelected] = useState<Category>('languages')
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<gsap.core.Timeline>(null)

  useEffect(() => {
  timelineRef.current = gsap.timeline({
      scrollTrigger: {
        trigger: "#skill",
        start: 'top 70%',
        end:'top 20%',
        scrub: true,
     markers:false
      }
    })
  
   timelineRef.current
    .fromTo(".skill-title",
            { 
              y: -100, 
              opacity: 0, 
            },
            { 
              y: 0, 
              opacity: 1, 
              duration: 1, 
              ease: 'power1.out' 
            },
            0
          )
    .fromTo(".skill-sub",
            { 
              y: -50, 
              opacity: 0, 

            },
            { 
              y: 0, 
              opacity: 1, 
              duration: 1.2, 
              ease: 'power1.out' 
            },
            0.2
          )
    .fromTo(".skill-grid",
            { 
              y: 20, 
              opacity: 0, 
            },
            { 
              y:0,
              opacity: 1, 
              duration: 1.5, 
              ease: 'power1.out' 
            },
            0.3
          )
    return () => {
      timelineRef.current?.kill()
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -300,
        behavior: 'smooth'
      })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 300,
        behavior: 'smooth'
      })
    }
  }

  return (
    <section id='skill'  ref={sectionRef} className="relative w-full min-h-screen py-20 px-4 sm:px-6 bg-black text-white overflow-hidden">
      <div className="max-w-6xl justify-items-center mx-auto">
        <div className="skill-title text-center mb-16">
          <h2 className="text-4xl md:text-6xl -tracking-wider bg-clip-text text-transparent bg-gradient-to-b from-white via-gray-200 to-gray-300">
            Technical Arsenal
          </h2>
        </div>

        {/* Category Tabs */}
        <div className="skill-sub flex flex-wrap justify-center gap-2 sm:gap-6 mb-8">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelected(cat)}
              className={
                `capitalize pb-2 border-b-2 transition-all text-sm sm:text-base ` +
                (selected === cat
                  ? 'border-primary text-white'
                  : 'border-transparent text-gray-400 hover:text-white hover:border-gray-600')
              }
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills Grid Container */}
        <div className="skill-grid relative w-full md:w-7/9">
          {/* Navigation Buttons */}
          <button 
            onClick={scrollLeft}
            className="absolute -left-2 md:-left-10 top-1/2 -translate-y-1/2 z-10 bg-none md:bg-gray-900/50 hover:bg-gray-800 md:p-2 md:rounded-full block"
            aria-label="Scroll left"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button 
            onClick={scrollRight}
            className="absolute -right-2 md:-right-10 top-1/2 -translate-y-1/2 z-10 bg-none md:bg-gray-900/50 hover:bg-gray-800 md:p-2 md:rounded-full block "
            aria-label="Scroll right"
          >
            <ChevronRight size={24} />
          </button>

          {/* Skills Grid with horizontal scroll */}
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto hide-scroll-bar overscroll-x-contain w-full px-2 sm:px-0"
          >
            <AnimatePresence mode="wait">
              {skillsData[selected].map(skill => (
                <motion.div
                  key={skill.title}
                  className="skill-card snap-center flex-none w-1/2 sm:w-1/3 lg:w-1/4 px-2 py-4"
                >
                  <Card className="bg-gray-900/50 border-gray-800 hover:border-white backdrop-blur-sm p-4 h-full">
                    <CardHeader className="flex flex-col items-center">
                      <motion.div 
                        className="text-white rounded-lg" 
                        initial={{opacity:0}} 
                        exit={{ opacity: 0, scale: 0, rotate: 360, transition: { duration: 0.5 } }}
                        animate={{ opacity: 1, scale: 1, transition: { duration: 0.5 } }}
                      >
                        {skill.icon}
                      </motion.div>
                      <CardTitle className="text-sm font-medium md:text-lg -tracking-wider bg-clip-text text-transparent bg-gradient-to-b from-white via-gray-200 to-gray-300">
                        <motion.div 
                          className="text-white rounded-lg" 
                          initial={{opacity:0}} 
                          animate={{opacity: 1, scale: 1, transition: { duration: 0.5 }}} 
                          exit={{ opacity: 0, scale: 0, transition: { duration: 0.5 } }}
                        >
                          {skill.title}
                        </motion.div>
                      </CardTitle>
                    </CardHeader>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <style jsx>{`
        .hide-scroll-bar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scroll-bar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  )
}