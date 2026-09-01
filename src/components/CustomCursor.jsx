import React, { useEffect, useRef } from 'react';

const CustomCursor = () => {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let cx = mx;
    let cy = my;

    const handleMouseMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      cursor.classList.add('on');
    };

    const handleMouseLeave = () => {
      cursor.classList.remove('on');
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (target.closest('a, button, [role="button"], select, input, textarea')) {
        cursor.classList.add('grow');
      } else {
        cursor.classList.remove('grow');
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseover', handleMouseOver);

    const render = () => {
      cx += (mx - cx) * 0.2;
      cy += (my - cy) * 0.2;

      if (cursor) {
        cursor.style.transform = `translate(${cx - cursor.offsetWidth / 2}px, ${cy - cursor.offsetHeight / 2}px)`;
      }
      requestAnimationFrame(render);
    };

    const animId = requestAnimationFrame(render);
    document.documentElement.classList.add('has-cursor');

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animId);
      document.documentElement.classList.remove('has-cursor');
    };
  }, []);

  return <div id="afr-cursor" ref={cursorRef} aria-hidden="true"></div>;
};

export default CustomCursor;
