import React from 'react';
import { motion } from "framer-motion";

export default function HangingLamp() {
  return (
    <div className="relative flex flex-col items-center">
      {/* Cord */}
      <div className="w-[2px] h-32 bg-slate-700" />

      {/* Lamp Body */}
      <motion.div
        animate={{ rotate: [ -5, 5, -5 ] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        className="relative -mt-1 origin-top"
      >
        <svg
          width="120"
          height="80"
          viewBox="0 0 120 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[0_0_15px_rgba(0,174,239,0.3)]"
        >
          <path
            d="M60 0L110 70H10L60 0Z"
            fill="#1e293b"
            stroke="#334155"
            strokeWidth="2"
          />
          <circle cx="60" cy="70" r="15" fill="#00ff88" className="animate-pulse" />
        </svg>

        {/* Light Cone */}
        <div
          className="absolute top-[60px] left-1/2 -translate-x-1/2 w-[300px] h-[400px] pointer-events-none"
          style={{
            background: "radial-gradient(circle at top, rgba(0, 255, 136, 0.15) 0%, transparent 70%)",
            clipPath: "polygon(45% 0%, 55% 0%, 100% 100%, 0% 100%)"
          }}
        />
      </motion.div>
    </div>
  );
}
