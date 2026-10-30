import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const GsapScrollProvider = () => {
  useEffect(() => {
    // Select all sections and animated elements for high-end scroll reveals
    const sections = document.querySelectorAll('section');

    const ctx = gsap.context(() => {
      sections.forEach((section) => {
        gsap.fromTo(
          section.querySelectorAll('.rv, h2, p, .card, .group'),
          {
            y: 50,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // Parallax effect on banners / heroes
      gsap.utils.toArray('.parallax-element').forEach((el) => {
        gsap.to(el, {
          y: -80,
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
