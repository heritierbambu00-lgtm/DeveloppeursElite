import React from 'react';

const Logo = ({ className = "w-8 h-8" }) => {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Structural Base - Deep Ink */}
      <path
        d="M20 20H65C76.0457 20 85 28.9543 85 40C85 51.0457 76.0457 60 65 60H20V20Z"
        className="fill-ink"
      />

      {/* Decorative Elite Layer - Polished Clay */}
      <path
        d="M35 40H80C88.2843 40 95 46.7157 95 55C95 63.2843 88.2843 70 80 70H35V40Z"
        className="fill-clay"
        style={{ mixBlendMode: 'multiply', opacity: 0.9 }}
      />

      {/* Tech Geometry - Negative Space Accents */}
      <rect x="20" y="20" width="8" height="50" fill="white" className="opacity-10" />

      {/* Inner Precision Chevron */}
      <path
        d="M45 35L55 45L45 55"
        stroke="white"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Bottom Foundation Bar */}
      <rect x="20" y="75" width="40" height="5" rx="2.5" className="fill-ink" />
      <rect x="65" y="75" width="15" height="5" rx="2.5" className="fill-clay" />
    </svg>
  );
};

export default Logo;
