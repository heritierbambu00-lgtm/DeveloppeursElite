import React, { useEffect, useRef } from 'react';

const Hero = () => {
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

    const elements = sectionRef.current.querySelectorAll('.rv, .curtain, .rv-mask');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const stats = [
    { number: '25+', label: 'Projets livrés' },
    { number: '12', label: 'Experts Tech' },
    { number: '05', label: 'Produits R&D' },
    { number: '2025', label: 'Fondation' },
  ];

  return (
    <section ref={sectionRef} className="relative pt-[110px] lg:pt-[140px] pb-14 lg:pb-24 overflow-hidden">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 xl:px-10 2xl:max-w-[90rem]">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-16 items-center">
          <div className="lg:col-span-7 min-w-0">
            <h1 className="font-display font-bold tracking-tight leading-[1.04] text-[clamp(2.5rem,6.3vw,4.9rem)]">
              <span className="mask rv-mask">
                <span className="split block">Des solutions</span>
              </span>
              <span className="mask rv-mask">
                <span className="split block">numériques qui font</span>
              </span>
              <span className="mask rv-mask">
                <span className="split block">
                  <em className="not-italic text-clay">avancer</em> l'Afrique.
                </span>
              </span>
            </h1>

            <p className="rv mt-7 max-w-xl text-[15.5px] sm:text-base leading-relaxed text-ink/70 break-words" style={{ transitionDelay: '0.16s' }}>
              DEVELITE TECH conçoit des logiciels, entraîne des modèles d'IA, forme la nouvelle génération d'ingénieurs et bâtit les infrastructures numériques de la RDC et du monde.
            </p>

            <div className="rv mt-9 flex flex-wrap items-center gap-5" style={{ transitionDelay: '0.24s' }}>
              <a
                href="#produits"
                className="group inline-flex items-center gap-3 bg-ink text-paper font-semibold text-sm px-7 py-4 rounded-md hover:bg-clay transition-colors duration-300"
              >
                <span>Découvrir nos produits</span>
                <i className="fa-solid fa-arrow-right text-[12px] transition-transform duration-300 group-hover:translate-x-1"></i>
              </a>

              <a
                href="#contact"
                className="group inline-flex items-center gap-2.5 border border-ink/30 text-ink font-semibold text-sm px-6 py-3.5 rounded-md hover:border-clay hover:text-clay hover:bg-clay/5 transition-all duration-300"
              >
                <span>Discuter d'un projet</span>
                <i className="fa-solid fa-arrow-up-right text-[11px] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"></i>
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 relative rv min-w-0" style={{ transitionDelay: '0.16s' }}>
            <figure className="curtain rv-mask rounded-lg overflow-hidden border border-line shadow-[0_24px_60px_-30px_rgba(24,27,32,0.35)]">
              <div className="kenburns aspect-[3/4] overflow-hidden">
                <img
                  src="/Heritier.jpg"
                  alt="Héritier Bambu"
                  className="w-full h-full object-cover"
                />
              </div>
            </figure>

            <figcaption className="mt-3 flex items-center justify-between text-[11px] uppercase tracking-[0.22em] text-smoke">
              <span>Héritier Bambu — CEO & Lead Dev</span>
            </figcaption>

            <figure className="curtain rv-mask hidden sm:block absolute -left-8 xl:-left-12 2xl:-left-14 -bottom-10 w-48 lg:w-56 rounded-lg overflow-hidden border-4 border-paper shadow-[0_18px_40px_-20px_rgba(24,27,32,0.4)]">
              <img
                src="/justin.jpeg"
                alt="Justin Kombi"
                className="w-full h-auto object-cover"
              />
            </figure>

            <div className="absolute -top-8 -right-3 sm:-right-5 xl:-right-8 w-28 h-28 sm:w-32 sm:h-32 pointer-events-none" aria-hidden="true">
              <svg className="spin-badge w-full h-full" viewBox="0 0 120 120">
                <defs>
                  <path id="circ" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
                </defs>
                <circle cx="60" cy="60" r="59" fill="#F6F3EC" stroke="#DBD4C4" />
                <text fill="#181B20" fontSize="10" fontWeight="700" letterSpacing="2.6" fontFamily="Public Sans, sans-serif">
                  <textPath href="#circ">DEVELITE TECH • SOLUTIONS </textPath>
                </text>
              </svg>

              <span className="absolute inset-0 grid place-items-center overflow-hidden rounded-full p-6">
                <img src="/badge.jpg" alt="" className="w-full h-full object-contain rounded-full" />
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 xl:px-10 2xl:max-w-[90rem] mt-16 lg:mt-20">
        <div className="rv border-t border-line pt-8 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((st, i) => (
            <div key={i} className="min-w-0">
              <p className="font-display font-bold text-4xl sm:text-5xl tracking-tight">
                <span>{st.number}</span>
              </p>
              <p className="mt-2 text-[11px] uppercase tracking-[0.22em] text-smoke">{st.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
