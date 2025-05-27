'use client'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { initGsap } from '../lib/gsap'
import { Menu } from 'lucide-react'

interface NavItem { label: string; href: string }
const items: NavItem[] = [
    { label: 'Top', href: '#top' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
    const tlRef = useRef<HTMLUListElement>(null)
    const [open, setOpen] = useState(false)

    useEffect(() => {
        initGsap()
        gsap.registerPlugin(ScrollTrigger)

        /** ----- helper: tween path to N-th dot ----- */
        const movePathTo = (index: number) => {
            const ratio = index / (items.length - 1)         // 0 → 1
            gsap.to('#desktop-path', {
                scaleY: ratio,                                  // grow to that fractional height
                transformOrigin: 'top center',
                duration: 0.2,                                  // little transition
                ease: 'power1.out',
            })
        }



        items.forEach((item, i) => {
            const isTop = item.href === '#top'
            ScrollTrigger.create({
                trigger: 'body',                 // watch the whole document
                start: isTop ? 'top top' : 'top center',
                end: isTop ? '+=1' : 'bottom center',
                onEnter: () => { if (isTop) { highlight(0); movePathTo(0) } },
                onEnterBack: () => { if (isTop) { highlight(0); movePathTo(0) } },
            })
            ScrollTrigger.create({
                trigger: item.href,
                start: isTop ? 'top top' : 'top center',
                end: isTop ? 'top top' : 'bottom center',
                onEnter: () => { highlight(i); movePathTo(i) },
                onEnterBack: () => { highlight(i); movePathTo(i) },
            })
        })

        /** highlight current fixed dot */
        function highlight(index: number) {
            gsap.utils.toArray<HTMLElement>('.timeline-dot')
                .forEach((d, j) => d.classList.toggle('bg-white', j === index))
        }
    }, [])

    /* ------------ JSX (unchanged except for IDs) ------------ */
    return (
        <>
            {/* desktop */}
            <div className="hidden lg:block fixed right-[4%] bottom-20 z-10 ">
                <div className="relative flex flex-col items-center">
                    <span id="desktop-path"
                        className="absolute top-4 w-px bg-white h-8/10 scale-y-0"
                    />
                    <ul ref={tlRef} className="timeline timeline-vertical">
                        {items.map(it => (
                            <li key={it.label} className="flex flex-col items-center group">
                                <div className="timeline-middle">
                                    <span className="timeline-dot block h-4 w-4 rounded-full bg-border transition-colors" />
                                </div>
                                <Link href={it.href}
                                    className="timeline-end whitespace-nowrap px-3 py-1 text-xl font-semibold translate-x-4 group-hover:opacity-100 font-techno bg-gradient-to-r from-[#d4d4d4] to-[#888888] bg-clip-text text-transparent hover:from-[#ffffff] hover:to-[#c0c0c0] transition">
                                    {it.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            {/* mobile full-screen menu */}
            <div className="lg:hidden fixed top-4 right-4 z-50 max-w-screen">
                <button
                    onClick={() => setOpen(true)}
                    className="text-xs uppercase tracking-widest m-3 my-4"
                >
                    <Menu className='text-white'></Menu>
                </button>

                {open && (
                    <div
                        className={`fixed inset-0 bg-black text-white z-10 max-w-screen overflow-hidden transition-all duration-1000 ease-in-out transform ${open ? 'opacity-100 scale-100' : 'opacity-0 scale-55'
                            }`}
                    >
                       

                        {/* Menu Content */}
                        <div className="relative z-10 flex flex-col justify-between px-6 py-8 h-full">
                            {/* Header */}
                            <div className="flex justify-between items-center">
                                <span className="text-lg uppercase tracking-wider">Hirendra</span>
                                <button
                                    onClick={() => setOpen(false)}
                                    className="text-xs uppercase tracking-widest"
                                >
                                    Close ✕
                                </button>
                            </div>

                            {/* Nav Links */}
                            <nav className="flex-1 mt-10 flex flex-col justify-center items-center gap-6">
                                {items.map((it, index) => (
                                    <Link
                                        key={index}
                                        href={it.href}
                                        onClick={() => setOpen(false)}
                                        className="text-2xl font-techno bg-gradient-to-r from-[#d4d4d4] to-[#888888] bg-clip-text text-transparent hover:from-[#ffffff] hover:to-[#c0c0c0] transition"
                                    >
                                        {it.label}
                                    </Link>
                                ))}
                            </nav>

                            {/* Footer */}
                            <footer className="py-10 text-center opacity-70 text-sm">
                                © {new Date().getFullYear()} Hirendra — Built with Next.js & GSAP
                            </footer>
                        </div>
                    </div>
                )}
            </div>

        </>
    )
}
