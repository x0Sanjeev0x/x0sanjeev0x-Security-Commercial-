
import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

const LoadingScreen: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [rotation, setRotation] = useState(0);
  const requestRef = useRef<number>(null);
  
  // Refs for animation state to avoid closure staleness and unnecessary re-renders
  const progressRef = useRef(0);
  const rotationRef = useRef(0);
  const currentSpeedRef = useRef(0);

  const animate = () => {
    // Simulate loading (0 to 100) - increment by 0.15 as per snippet
    if (progressRef.current < 100) {
      progressRef.current += 0.15;
      setProgress(progressRef.current);
    }

    // Target speed based on loading: 0.5 baseline + (loading / 100) * 6
    const targetSpeed = 0.5 + (progressRef.current / 100) * 6;

    // Smooth speed interpolation: factor 0.05
    currentSpeedRef.current += (targetSpeed - currentSpeedRef.current) * 0.05;

    // Increment rotation by current smoothed speed
    rotationRef.current += currentSpeedRef.current;
    setRotation(rotationRef.current);

    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    // Start animation loop immediately
    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
      className="fixed inset-0 z-[1000] flex flex-col items-center justify-center overflow-hidden select-none"
      style={{
        background: 'linear-gradient(#f2b45a, #e28a2d)'
      }}
    >
      {/* Background Texture Overlay for Premium Feel */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />

      {/* Main Scene Container */}
      <div className="relative w-full h-[450px] flex items-center justify-center">
        {/* Static Silhouette Elements */}
        <svg
          width="320"
          height="320"
          viewBox="0 0 320 320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute z-10 drop-shadow-2xl"
        >
          {/* Ground Line */}
          <line x1="80" y1="280" x2="240" y2="280" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round" />
          
          {/* Ground Foliage Silhouettes */}
          <path d="M100 280 C100 275 105 272 110 275 C115 270 125 270 130 280" fill="#1A1A1A" />
          <path d="M195 280 C200 272 210 272 215 280" fill="#1A1A1A" />

          {/* Tower Silhouette (X-Braced Structure) */}
          <g transform="translate(160, 280)">
            <path d="M-18 0 L-5 -160 L5 -160 L18 0" stroke="#1A1A1A" strokeWidth="4.5" fill="none" strokeLinejoin="round" />
            <line x1="-14" y1="-55" x2="14" y2="-55" stroke="#1A1A1A" strokeWidth="3" />
            <line x1="-10" y1="-110" x2="10" y2="-110" stroke="#1A1A1A" strokeWidth="3" />
            {/* Structural Cross Bracing */}
            <line x1="-14" y1="-55" x2="10" y2="-110" stroke="#1A1A1A" strokeWidth="1.2" />
            <line x1="14" y1="-55" x2="-10" y2="-110" stroke="#1A1A1A" strokeWidth="1.2" />
            <line x1="-18" y1="0" x2="14" y2="-55" stroke="#1A1A1A" strokeWidth="1.2" />
            <line x1="18" y1="0" x2="-14" y2="-55" stroke="#1A1A1A" strokeWidth="1.2" />
          </g>

          {/* Top Gearbox Arm and Tail Vane */}
          <g transform="translate(160, 120)">
            <line x1="0" y1="0" x2="45" y2="0" stroke="#1A1A1A" strokeWidth="4.5" strokeLinecap="round" />
            <path d="M0 0 L-35 -4 L-55 -18 V12 L-35 4 Z" fill="#1A1A1A" />
            {/* Mechanical Hub Center */}
            <circle cx="45" cy="0" r="3.5" fill="#1A1A1A" />
          </g>
        </svg>

        {/* The Wheel - Implements CSS and Interpolated JS Animation Theory */}
        <div
          className="absolute shadow-[0_20px_50px_rgba(0,0,0,0.3)] border-4 border-[#1A1A1A]"
          style={{
            width: '140px',
            height: '140px',
            // Positioned exactly on the hub: SVG 160+45 = 205. Centering 140px div on 205.
            left: 'calc(50% + 45px - 70px)',
            top: 'calc(50% - 40px - 70px)', // Centered on hub y=120 (approx offset from screen center)
            borderRadius: '50%',
            background: 'repeating-conic-gradient(#2b2b2b 0deg 20deg, transparent 20deg 40deg)',
            transform: `rotate(${rotation}deg)`,
            zIndex: 20,
            transformOrigin: 'center'
          }}
        />

        {/* Dynamic Shadow */}
        <div 
          className="absolute w-24 h-4 bg-black/10 blur-xl rounded-full"
          style={{ top: 'calc(50% + 120px)' }}
        />
      </div>

      {/* Branding Section */}
      <div className="text-center relative z-30 -mt-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          <h1 className="text-4xl md:text-6xl font-black tracking-[0.25em] text-[#1A1A1A] drop-shadow-sm">
            XOSANJEEVOX
          </h1>
          
          <div className="relative mt-4 w-full max-w-[300px] h-[3px] bg-[#1A1A1A]/10 rounded-full overflow-hidden">
            <motion.div 
              className="absolute left-0 top-0 h-full bg-[#1A1A1A]"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="mt-10 flex flex-col items-center">
            <p className="text-[10px] md:text-[12px] tracking-[0.8em] font-black text-[#1A1A1A] uppercase opacity-80">
              ENTERPRISE SECURITY PROTOCOL
            </p>
            
            {/* Numerical Progress Indicator */}
            <div className="mt-4 font-mono text-xs font-bold text-[#1A1A1A]/60 flex items-center gap-2">
              <span className="w-10 text-right">{Math.floor(progress)}%</span>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <motion.div 
                    key={i}
                    animate={{ opacity: (progress / 20) > i ? 1 : 0.1 }}
                    className="w-1 h-1 bg-[#1A1A1A] rounded-full"
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Booting Sequence Visualizer */}
      <div className="absolute bottom-10 left-10 right-10 flex justify-between items-end">
        <div className="flex flex-col gap-1">
          <p className="text-[8px] font-mono text-black/40 uppercase tracking-widest">Initialization Stream</p>
          <div className="flex gap-1">
            {[...Array(20)].map((_, i) => (
              <motion.div 
                key={i}
                animate={{ height: [2, Math.random() * 12 + 2, 2] }}
                transition={{ duration: 0.5 + Math.random(), repeat: Infinity }}
                className="w-1 bg-[#1A1A1A]/20 rounded-full"
              />
            ))}
          </div>
        </div>
        <p className="text-[8px] font-mono text-black/40 uppercase tracking-widest">Ref: AES-256-GCM</p>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
