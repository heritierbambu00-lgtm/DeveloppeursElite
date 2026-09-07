import React from 'react';

const Logo = ({ className = "w-8 h-8" }) => {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Structural Geometry - Deep Matrix */}
      <rect x="15" y="15" width="50" height="70" rx="6" className="fill-ink" />
      <path
        d="M65 15H75C83.2843 15 90 21.7157 90 30V70C90 78.2843 83.2843 85 75 85H65V15Z"
        className="fill-[#9E7AFF]"
      />

      {/* Precision Detail - Matrix Blue Contrast */}
      <rect x="70" y="35" width="10" height="30" rx="2" className="fill-[#53B1FD]" />

      {/* Elite Core - Glowing Purple */}
      <rect x="25" y="25" width="20" height="20" rx="4" className="fill-[#9E7AFF] opacity-80" />

      {/* Base Foundation */}
      <rect x="15" y="82" width="75" height="3" rx="1.5" className="fill-ink/20" />
    </svg>
  );
};

export default Logo;
