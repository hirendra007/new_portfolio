"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CursorEffect() {
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  
  // Use motion values for smooth cursor movement
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Add spring physics for natural, smooth movement
  const springConfig = { damping: 25, stiffness: 300 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Don't show custom cursor on touch devices
    const isTouchDevice = () => {
      return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    };
    
    if (isTouchDevice()) return;
    
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
      setIsVisible(true);
    };
    
    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);
    
    // Check if mouse is over clickable elements
    const handleElementMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable =
  target.tagName.toLowerCase() === 'a' ||
  target.tagName.toLowerCase() === 'button' ||
  !!target.closest('a') ||
  !!target.closest('button') ||
  target.getAttribute('role') === 'button' ||
  window.getComputedStyle(target).cursor === 'pointer';

setIsPointer(isClickable);

    };
    
    document.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseover', handleElementMouseEnter);
    
    return () => {
      document.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleElementMouseEnter);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="fixed rounded-full pointer-events-none z-50 mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          width: isPointer ? "50px" : "32px",
          height: isPointer ? "50px" : "32px",
          backgroundColor: "#fff",
          opacity: isVisible ? 1 : 0,
          transition: "width 0.2s, height 0.2s, opacity 0.2s"
        }}
      />
      
      {/* Optional smaller dot in center */}
      {isPointer && (
        <motion.div
          className="fixed rounded-full pointer-events-none z-50 bg-white mix-blend-difference"
          style={{
            x: cursorXSpring,
            y: cursorYSpring,
            width: "8px",
            height: "8px",
            marginLeft: "21px",
            marginTop: "21px",
            opacity: isVisible ? 1 : 0
          }}
        />
      )}
    </>
  );
}