
import React, { useState, useEffect } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Tightened spring config for "Normal" (instant/fast) speed while maintaining smooth tech feel
  const springConfig = { damping: 40, stiffness: 800 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.closest('button, a, input, select, [role="button"]');
      setIsHovering(!!isInteractive);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible, mouseX, mouseY]);

  if (!isVisible) return null;

  return (
    <motion.div
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        x: cursorX,
        y: cursorY,
        pointerEvents: 'none',
        zIndex: 9999,
        // Aligning the 'tip' of the SVG (at 20,20 in 100x100 viewbox) with the mouse coordinates
        translateX: '-20%',
        translateY: '-20%',
      }}
    >
      <motion.div
        animate={{
          scale: isHovering ? 1.15 : 1,
          rotate: isHovering ? 10 : 0,
        }}
        className="relative flex items-center justify-center"
      >
        {/* Outer Glow - Reduced for normal size */}
        <div className="absolute inset-0 bg-amber-500/30 blur-lg rounded-full w-8 h-8 -translate-x-1/4 -translate-y-1/4 opacity-40" />

        {/* Robotic Fantasy Shape (SVG) - Reduced to 32px for "Normal" size */}
        <svg
          width="32"
          height="32"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]"
        >
          {/* Main Body (Fantasy Gold Metallic) */}
          <path
            d="M20 20 L80 50 L50 60 L40 90 Z"
            fill="url(#goldGradient)"
            stroke="#D97706"
            strokeWidth="2"
          />
          {/* Secondary Layer (Robotic Detail) */}
          <path
            d="M35 45 L55 55 L45 65 Z"
            fill="#B45309"
            opacity="0.8"
          />
          {/* Glowing Gem/Core */}
          <circle cx="45" cy="55" r="4" fill="#FDE68A">
            <animate
              attributeName="opacity"
              values="0.5;1;0.5"
              dur="2s"
              repeatCount="indefinite"
            />
          </circle>

          {/* Defining Gradients */}
          <defs>
            <linearGradient id="goldGradient" x1="20" y1="20" x2="80" y2="90" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FDE68A" />
              <stop offset="50%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#B45309" />
            </linearGradient>
          </defs>
        </svg>

        {/* Minimal Trail Effect */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.05, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeOut"
          }}
          className="absolute inset-0 border border-amber-400/50 rounded-lg transform rotate-45 w-4 h-4"
        />
      </motion.div>
    </motion.div>
  );
};

export default CustomCursor;
