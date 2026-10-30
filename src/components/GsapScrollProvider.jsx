import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const GsapScrollProvider = () => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      // High-end cinematic scroll animations for home page and all sections
      const sections = document.querySelectorAll('section');
      sections.forEach((section) => {
        gsap.fromTo(
          section.querySelectorAll('.rv, h2, .card'),
          { y: 40, opacity: 0.7 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // Smooth parallax effect on scroll
      gsap.utils.toArray('.parallax-element').forEach((el) => {
        gsap.to(el, {
          y: -60,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      });
    });

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return null;
};

export default GsapScrollProvider;
