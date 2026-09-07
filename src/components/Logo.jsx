import React from 'react';

const Logo = ({ className = "w-8 h-8" }) => {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Structural Base - Black Matrix Core */}
      <rect x="15" y="15" width="50" height="70" rx="6" className="fill-ink" />

      {/* Energy Stream - Elite Purple */}
      <path
        d="M65 15H75C83.2843 15 90 21.7157 90 30V70C90 78.2843 83.2843 85 75 85H65V15Z"
        className="fill-[#9E7AFF]"
      />

      {/* Logic Processor - Matrix Blue */}
      <rect x="70" y="35" width="10" height="30" rx="2" className="fill-[#53B1FD]" />

      {/* Dynamic Spark - NEW Orange Accent */}
      <rect x="25" y="25" width="20" height="20" rx="4" className="fill-[#FF4D00]" />

      {/* Internal Glow Effect */}
      <rect x="30" y="30" width="10" height="10" rx="2" fill="white" opacity="0.3" />

      {/* Foundation Line */}
      <rect x="15" y="82" width="75" height="3" rx="1.5" className="fill-ink" />
    </svg>
  );
};

export default Logo;
