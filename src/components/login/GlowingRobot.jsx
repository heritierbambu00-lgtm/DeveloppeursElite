import React from 'react';
import { motion } from "framer-motion";

export default function GlowingRobot() {
  return (
    <div className="relative w-48 h-48 flex items-center justify-center">
      {/* Outer Glow */}
      <div className="absolute inset-0 bg-[#00ff88]/10 rounded-full blur-3xl animate-pulse" />

      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        className="relative z-10 w-32 h-32 bg-[#050810] border-4 border-[#00ff88]/30 rounded-[3rem] p-6 shadow-[0_0_40px_rgba(0,255,136,0.2)]"
      >
        <div className="flex justify-between mt-4">
          {/* Eyes */}
          <div className="w-6 h-6 bg-[#00ff88] rounded-full shadow-[0_0_20px_#00ff88]">
            <div className="w-2 h-2 bg-white rounded-full mt-1.5 ml-1.5" />
          </div>
          <div className="w-6 h-6 bg-[#00ff88] rounded-full shadow-[0_0_20px_#00ff88]">
            <div className="w-2 h-2 bg-white rounded-full mt-1.5 ml-1.5" />
          </div>
        </div>

        {/* Mouth */}
        <div className="mt-6 mx-auto w-12 h-1.5 bg-[#00ff88]/20 rounded-full overflow-hidden relative">
          <motion.div
            animate={{ x: [-20, 20, -20] }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            className="absolute top-0 left-0 w-8 h-full bg-[#00ff88] shadow-[0_0_15px_#00ff88]"
          />
        </div>
      </motion.div>

      {/* Robot Base/Neck Shadow */}
      <div className="absolute bottom-4 w-16 h-4 bg-black/40 rounded-full blur-md" />
    </div>
  );
}
