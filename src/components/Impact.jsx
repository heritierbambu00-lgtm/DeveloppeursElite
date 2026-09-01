import React, { useEffect, useRef } from 'react';

const Impact = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current.querySelectorAll('.rv, .curtain');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-ink text-paper py-24 lg:py-32 overflow-hidden">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 xl:px-10 2xl:max-w-[90rem]">
        <div className="max-w-3xl">
          <p className="rv text-[11px] font-semibold uppercase tracking-[0.3em] text-clay">Notre cap</p>
          <h2 className="rv mt-4 font-display font-bold tracking-tight text-[clamp(2.2rem,5vw,3.9rem)] leading-[1.06]" style={{ transitionDelay: '0.08s' }}>
            Bâtir ici pour impacter <br /> <em className="not-italic text-clay">le monde entier.</em>
          </h2>
        </div>

        <div className="mt-14 grid md:grid-cols-3 gap-10 md:gap-8 border-t border-paper/15 pt-10">
          <div className="rv min-w-0" style={{ transitionDelay: '0.16s' }}>
            <p className="font-display font-bold text-clay text-sm tracking-[0.2em]">
              <i className="fa-solid fa-location-dot mr-2"></i>
              ICI — RDC
            </p>
            <p className="mt-4 text-[14.5px] leading-relaxed text-paper/70">
              Notre point d'ancrage. Nous développons des solutions souveraines pour digitaliser l'économie et l'administration congolaise.
            </p>
          </div>

          <div className="rv md:border-l md:border-paper/15 md:pl-8 min-w-0" style={{ transitionDelay: '0.24s' }}>
            <p className="font-display font-bold text-clay text-sm tracking-[0.2em]">
              <i className="fa-solid fa-earth-africa mr-2"></i>
              ENSUITE — AFRIQUE
            </p>
            <p className="mt-4 text-[14.5px] leading-relaxed text-paper/70">
              Exporter notre savoir-faire pour répondre aux défis communs du continent : fintech, énergie et éducation.
            </p>
          </div>

          <div className="rv md:border-l md:border-paper/15 md:pl-8 min-w-0" style={{ transitionDelay: '0.32s' }}>
            <p className="font-display font-bold text-clay text-sm tracking-[0.2em]">
              <i className="fa-solid fa-earth-americas mr-2"></i>
              ENFIN — LE MONDE
            </p>
            <p className="mt-4 text-[14.5px] leading-relaxed text-paper/70">
              Prouver que l'excellence technique n'a pas de frontières en proposant des produits compétitifs sur le marché global.
            </p>
          </div>
        </div>

        <figure className="rv curtain mt-16 rounded-lg overflow-hidden border border-paper/15" style={{ transitionDelay: '0.4s' }}>
          <img
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=80"
            alt="Global vision"
            className="w-full h-[240px] sm:h-[400px] object-cover opacity-80"
          />
        </figure>

        <p className="mt-3 text-[11px] uppercase tracking-[0.22em] text-paper/40">
          DEVELITE TECH — Butembo, notre point de départ.
        </p>
      </div>
    </section>
  );
};

export default Impact;
