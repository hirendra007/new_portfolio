"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

type Particle = {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
};

export default function ParticlesCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const particlesRef = useRef<Particle[]>([]);
  const { theme } = useTheme();
  const animationFrameRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const densityRef = useRef(50); // Number of particles

  // Set up the canvas and particles
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setDimensions({ width, height });
      
      // Adjust particle density based on screen size
      densityRef.current = width < 768 ? 30 : 50;
      
      if (canvasRef.current) {
        canvasRef.current.width = width;
        canvasRef.current.height = height;
      }
      
      // Reset particles when resizing
      initParticles();
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Initialize particles
  const initParticles = () => {
    const particles: Particle[] = [];
    for (let i = 0; i < densityRef.current; i++) {
      particles.push({
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }
    particlesRef.current = particles;
  };

  // Update animation based on theme
  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return;
    
    initParticles();
    startAnimation();
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [dimensions, theme]);

  const startAnimation = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const animate = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);
      
      // Set color based on theme
      const particleColor = "rgba(255, 255, 255,";
      
      // Update and draw particles
      particlesRef.current.forEach((particle, index) => {
        // Move particles
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Bounce off edges
        if (particle.x > dimensions.width || particle.x < 0) {
          particle.speedX = -particle.speedX;
        }
        if (particle.y > dimensions.height || particle.y < 0) {
          particle.speedY = -particle.speedY;
        }
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `${particleColor} ${particle.opacity})`;
        ctx.fill();
        
        // Connect particles when close enough
        connectParticles(particle, index, ctx, particleColor);
        
        // Slight attraction to mouse
        attractToMouse(particle);
      });
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    animate();
  };

  // Connect particles with lines when they're close
  const connectParticles = (
    particle: Particle, 
    index: number, 
    ctx: CanvasRenderingContext2D, 
    particleColor: string
  ) => {
    const maxDistance = 100;
    
    for (let i = index + 1; i < particlesRef.current.length; i++) {
      const p2 = particlesRef.current[i];
      const dx = particle.x - p2.x;
      const dy = particle.y - p2.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < maxDistance) {
        // Fade the line based on distance
        const opacity = 1 - (distance / maxDistance);
        ctx.beginPath();
        ctx.strokeStyle = `${particleColor} ${opacity * 0.2})`;
        ctx.lineWidth = 0.5;
        ctx.moveTo(particle.x, particle.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }
    }
  };

  // Add subtle attraction to mouse position
  const attractToMouse = (particle: Particle) => {
    const mouseX = mouseRef.current.x;
    const mouseY = mouseRef.current.y;
    const dx = mouseX - particle.x;
    const dy = mouseY - particle.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance < 200) {
      const force = 0.03;
      const angle = Math.atan2(dy, dx);
      particle.speedX += Math.cos(angle) * force;
      particle.speedY += Math.sin(angle) * force;
      
      // Limit speed
      const maxSpeed = 1;
      const speed = Math.sqrt(particle.speedX * particle.speedX + particle.speedY * particle.speedY);
      if (speed > maxSpeed) {
        particle.speedX = (particle.speedX / speed) * maxSpeed;
        particle.speedY = (particle.speedY / speed) * maxSpeed;
      }
    }
  };

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 20 }}
    />
  );
}