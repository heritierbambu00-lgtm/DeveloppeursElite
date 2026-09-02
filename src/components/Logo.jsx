import React from 'react';

const Logo = ({ className = "w-8 h-8" }) => {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Structural Geometry - Deep Ink */}
      <rect x="15" y="15" width="50" height="70" rx="4" className="fill-ink" />
      <path
        d="M65 15H75C83.2843 15 90 21.7157 90 30V70C90 78.2843 83.2843 85 75 85H65V15Z"
        className="fill-clay"
      />

      {/* Precision Detail - Deep Ink Contrast on Clay */}
      <rect x="70" y="35" width="10" height="30" rx="1" className="fill-ink" />

      {/* Elite Core - Clay Accent on Ink */}
      <rect x="25" y="25" width="20" height="20" rx="2" className="fill-clay" />

      {/* Tech Line - Bottom Foundation */}
      <rect x="15" y="80" width="75" height="4" rx="2" className="fill-ink" />
    </svg>
  );
};

export default Logo;
