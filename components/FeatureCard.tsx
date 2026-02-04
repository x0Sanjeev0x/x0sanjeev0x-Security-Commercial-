
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -10 }}
      transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
      className="relative p-8 rounded-[2.5rem] bg-[#0A0A0A] border border-white/5 overflow-hidden group transition-all duration-700"
    >
      {/* Volumetric Ink/Smoke Bloom Effect */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <AnimatePresence>
          {isHovered && (
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Layered ink droplets for volumetric feel */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, opacity: 0, rotate: i * 45 }}
                  animate={{ 
                    scale: 2.2 + i * 0.4, 
                    opacity: 0.15 - i * 0.03,
                    rotate: i * 90 + 20
                  }}
                  exit={{ 
                    opacity: 0,
                    scale: 3,
                    transition: { duration: 1.2, ease: "easeIn" }
                  }}
                  transition={{ 
                    duration: 2.5 + i * 0.5, 
                    ease: [0.1, 0.4, 0.2, 1], // Smooth slow expansion
                    delay: i * 0.1
                  }}
                  style={{
                    filter: 'url(#ink-bleed)',
                    background: i === 0 
                      ? 'radial-gradient(circle, rgba(255, 255, 255, 0.4) 0%, transparent 70%)' 
                      : 'radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, transparent 60%)',
                  }}
                  className="absolute w-[150%] h-[150%] rounded-full opacity-0"
                />
              ))}
              
              {/* Core central bloom */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1.5, opacity: 0.08 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 3, ease: "easeOut" }}
                className="absolute w-full h-full bg-white blur-[80px] rounded-full"
              />
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col h-full">
        <div className="mb-8 p-4 w-fit rounded-2xl bg-white/5 text-amber-500 group-hover:bg-amber-500 group-hover:text-black group-hover:shadow-[0_0_30px_rgba(245,158,11,0.3)] transition-all duration-700">
          {icon}
        </div>
        
        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-amber-400 transition-colors duration-700">
          {title}
        </h3>
        
        <p className="text-gray-400 text-base leading-relaxed group-hover:text-gray-200 transition-colors duration-700">
          {description}
        </p>

        {/* Subtle decorative line that reveals on hover */}
        <motion.div 
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          className="mt-auto pt-6 border-b border-amber-500/20 origin-left"
        />
      </div>

      {/* Animated Border Accent */}
      <div 
        className={`absolute inset-0 border-[1.5px] rounded-[2.5rem] transition-all duration-1000 pointer-events-none ${
          isHovered 
            ? 'border-amber-500/30 shadow-[0_0_40px_rgba(255,255,255,0.03)]' 
            : 'border-white/5'
        }`} 
      />
    </motion.div>
  );
};

export default FeatureCard;
