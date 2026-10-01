import React from 'react';

const Logo = ({ className = "w-8 h-8" }) => {
  return (
    <img
      src="/logo.jpeg"
      alt="Develite Tech Logo"
      className={`object-contain ${className}`}
    />
  );
};
export default Logo;
