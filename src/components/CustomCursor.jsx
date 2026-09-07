import React, { useEffect, useRef } from 'react';

const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (target.closest('a, button, [role="button"], select, input, textarea, .clickable')) {
        dot.classList.add('grow');
        ring.classList.add('grow');
      } else {
        dot.classList.remove('grow');
        ring.classList.remove('grow');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    let dotX = mouseX;
    let dotY = mouseY;
    let ringX = mouseX;
    let ringY = mouseY;

    const animate = () => {
      // Smooth interpolation
      dotX += (mouseX - dotX) * 0.2;
      dotY += (mouseY - dotY) * 0.2;

      ringX += (mouseX - ringX) * 0.1;
      ringY += (mouseY - ringY) * 0.1;

      if (dot) {
        dot.style.transform = `translate(${dotX - dot.offsetWidth / 2}px, ${dotY - dot.offsetHeight / 2}px)`;
      }
      if (ring) {
        ring.style.transform = `translate(${ringX - ring.offsetWidth / 2}px, ${ringY - ring.offsetHeight / 2}px)`;
      }

      requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);
    document.documentElement.classList.add('has-cursor');

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animId);
      document.documentElement.classList.remove('has-cursor');
    };
  }, []);

  return (
    <>
      <div id="afr-cursor" ref={dotRef} aria-hidden="true"></div>
      <div id="afr-cursor-ring" ref={ringRef} aria-hidden="true"></div>
    </>
  );
};

export default CustomCursor;
