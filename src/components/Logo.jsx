import React from 'react';

const Logo = ({ className = "w-8 h-8" }) => {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Precision Frame */}
      <rect x="5" y="5" width="90" height="90" rx="12" stroke="currentColor" strokeWidth="2" className="stroke-ink/10" />

      {/* The DE Core - Minimalist Geometric Fusion */}
      {/* D shape base */}
      <path
        d="M30 30V70H50C61.0457 70 70 61.0457 70 50C70 38.9543 61.0457 30 50 30H30Z"
        className="fill-ink"
      />

      {/* E accent - Precision Cut */}
      <path
        d="M30 42H55M30 50H62M30 58H55"
        stroke="white"
        strokeWidth="4"
        strokeLinecap="square"
      />

      {/* The Elite Spark - Strategic Clay Accent */}
      <rect
        x="65"
        y="65"
        width="15"
        height="15"
        rx="2"
        className="fill-clay"
      />

      {/* Tech Grid - Subtle background detail for premium feel */}
      <circle cx="20" cy="20" r="1.5" className="fill-ink/20" />
      <circle cx="80" cy="20" r="1.5" className="fill-ink/20" />
      <circle cx="20" cy="80" r="1.5" className="fill-ink/20" />
    </svg>
  );
};

export default Logo;
