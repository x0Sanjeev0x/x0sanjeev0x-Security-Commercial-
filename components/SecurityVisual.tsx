
import React from 'react';
import { motion } from 'framer-motion';

const SecurityVisual: React.FC = () => {
  return (
    <div className="relative w-full h-[400px] md:h-[600px] flex items-center justify-center perspective">
      <motion.div 
        initial={{ rotateY: 15, rotateX: 10, opacity: 0 }}
        animate={{ rotateY: 25, rotateX: 15, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="relative preserve-3d"
      >
        {/* Layered Sheets */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute top-0 left-0 w-64 h-80 md:w-80 md:h-96 rounded-2xl border border-black/10 shadow-2xl bg-white/40 backdrop-blur-md"
            style={{
              transform: `translateZ(${i * -60}px) translateY(${i * -20}px) translateX(${i * 20}px)`,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 + i * 0.2, duration: 1 }}
          >
            <div className="p-6 h-full flex flex-col justify-between">
              <div className="h-2 w-1/2 bg-black/5 rounded" />
              <div className="space-y-3">
                <div className="h-1 w-full bg-black/5 rounded" />
                <div className="h-1 w-full bg-black/5 rounded" />
                <div className="h-1 w-3/4 bg-black/5 rounded" />
              </div>
            </div>
          </motion.div>
        ))}

        {/* The Monitoring Lens */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-32 h-32 md:w-48 md:h-48 rounded-full bg-black border-[12px] border-white/80 shadow-[0_0_50px_rgba(0,0,0,0.3)] flex items-center justify-center overflow-hidden"
          style={{ transform: 'translateZ(100px)' }}
          animate={{
            boxShadow: [
              "0 0 50px rgba(0,0,0,0.3)",
              "0 0 70px rgba(245, 158, 11, 0.2)",
              "0 0 50px rgba(0,0,0,0.3)"
            ]
          }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
          <div className="w-16 h-16 md:w-24 md:h-24 rounded-full border border-amber-500/50 flex items-center justify-center">
             <div className="w-4 h-4 md:w-6 md:h-6 rounded-full bg-amber-500 animate-pulse" />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SecurityVisual;
