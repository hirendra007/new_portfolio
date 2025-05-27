'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MaskContainer } from "@/components/ui/svg-mask-effect";

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const maskContainerRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<gsap.core.Timeline>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (!sectionRef.current || !headingRef.current || !maskContainerRef.current) return

    // Reset initial states
    gsap.set([headingRef.current, maskContainerRef.current], {
      opacity: 0,
      y: 50
    })

    // Create animation timeline
    timelineRef.current = gsap.timeline({
      scrollTrigger: {
        trigger: "#about",
        start: 'top bottom',
        end:'top 20%',
        scrub: true,
      }
    })

    // Animate elements
    timelineRef.current
      .fromTo(headingRef.current,
        { 
          x: -150, 
          opacity: 0, 
        },
        { 
          x: 0, 
          opacity: 1, 
          duration: 1.2, 
          ease: 'power1.Out' 
        },
        0
      )
      .fromTo(maskContainerRef.current,
        { 
          x: 150, 
          opacity: 0,
        },
        { 
          x: 0, 
          opacity: 1,

          duration: 1.4, 
          ease: 'power1.Out'
        },
        0.1
      )


    return () => {
      timelineRef.current?.kill()
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen py-24 px-6 flex items-center bg-black overflow-visible"
    >      
      <div className="relative z-10 max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center h-full">
        <div>
          <h2
            ref={headingRef}
            className="about-title text-4xl md:text-5xl font-techno md:mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent drop-shadow-[0_5px_15px_rgba(99,14,224,0.6)]"
          >
            About Me
          </h2>
        </div>

        <div ref={maskContainerRef} className="mask relative h-[30rem] justify-items-center items-center overflow-visible md:w-[30rem]">
          <MaskContainer
            revealText={
              <p className=" p-2.5 font-techno text-[1 rem] text-white ">
                I'm a student at VIT Chennai with a strong passion for full-stack development. 
              I love creating seamless digital experiences from front-end interfaces to powerful 
              back-end systems. Whether it's building dynamic web apps or managing robust APIs 
              and databases, I enjoy every layer of the stack. I'm especially excited about 
              combining my full-stack skills with IoT to build smarter, interactive systems. 
              I'm also diving into AI and machine learning to bring intelligence into my projects.
              </p>
            }
            className="h-full w-full rounded-lg overflow-visible"
            revealSize={300}
  // Add your SVG path here
          >
            <p className="text-lg leading-relaxed p-8 text-black  backdrop-blur-sm border border-white/10 rounded-xl">
              When I'm not working on tech projects, I'm usually in the gym training as a powerlifter. I enjoy challenging myself physically—it keeps me focused and motivated. I also have a big interest in anime; it's something I genuinely enjoy watching in my free time. Between lifting and getting lost in a good series, I like keeping a balance between discipline and downtime.
            </p>
          </MaskContainer>
        </div>
      </div>
    </section>
  )
}