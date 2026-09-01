import React, { useEffect, useRef } from 'react';

const Team = () => {
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

    const elements = sectionRef.current.querySelectorAll('.rv');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const teamMembers = [
    {
      name: 'Héritier Bambu',
      role: 'CEO & Software Architect',
      image: '/Heritier.jpg',
      bio: 'Expert en ingénierie logicielle et systèmes distribués.',
      icon: 'fa-code'
    },
    {
      name: 'Justin Kombi',
      role: 'Co-Founder & Lead Network',
      image: '/justin.jpeg',
      bio: 'Spécialiste en infrastructures réseaux et sécurité informatique.',
      icon: 'fa-server'
    }
  ];

  return (
    <section id="equipe" ref={sectionRef} className="py-24 lg:py-32 bg-white border-y border-line">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 xl:px-10 2xl:max-w-[90rem]">
        <div className="max-w-2xl mb-14">
          <p className="rv text-[11px] font-semibold uppercase tracking-[0.3em] text-clay">(06) — L'équipe</p>
          <h2 className="rv mt-4 font-display font-bold tracking-tight text-4xl lg:text-5xl leading-[1.05]">
            Des passionnés aux commandes.
          </h2>
          <p className="rv mt-5 text-[15px] leading-relaxed text-smoke">
            Une équipe engagée qui fait avancer chaque projet — et qui bâtit les infrastructures de demain.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
          {teamMembers.map((tm, i) => (
            <article key={i} className="rv group min-w-0" style={{ transitionDelay: `${i * 0.1}s` }}>
              <figure className="relative rounded-lg overflow-hidden border border-line">
                <img
                  src={tm.image}
                  alt={tm.name}
                  className="w-full aspect-[4/5] object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-[1.03]"
                />
              </figure>

              <div className="mt-4">
                <h3 className="font-display font-bold text-lg tracking-tight">{tm.name}</h3>
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-clay mt-1">
                  <i className={`fa-solid ${tm.icon} mr-1.5`}></i>
                  <span>{tm.role}</span>
                </p>
                <p className="mt-2 text-[13px] leading-relaxed text-smoke">{tm.bio}</p>
              </div>
            </article>
          ))}

          <article className="rv rounded-lg bg-paper border border-line border-dashed p-8 flex flex-col justify-center items-center text-center">
             <div className="w-16 h-16 rounded-full bg-mist grid place-items-center mb-4">
                <i className="fa-solid fa-plus text-clay text-xl"></i>
             </div>
             <h3 className="font-display font-bold text-lg">Rejoindre l'aventure ?</h3>
             <p className="mt-2 text-xs text-smoke">Nous sommes toujours à la recherche de talents.</p>
             <a href="#contact" className="mt-4 u-link text-xs font-bold text-clay uppercase tracking-widest">Postuler</a>
          </article>
        </div>
      </div>
    </section>
  );
};

export default Team;
