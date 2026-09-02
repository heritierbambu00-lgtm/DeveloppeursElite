import React, { useState } from 'react';

const Services = () => {
  const [openAcc, setOpenAcc] = useState(0);

  const services = [
    {
      num_str: '01',
      title: 'Ingénierie Logicielle',
      description: 'Conception et développement d\'applications sur mesure, architectures cloud et solutions scalables.',
      tags: [{ icon: 'fa-code', text: 'React / Node' }, { icon: 'fa-mobile-screen', text: 'Mobile' }],
      image_url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80'
    },
    {
      num_str: '02',
      title: 'Intelligence Artificielle',
      description: 'Entraînement de modèles LLM, computer vision et analyse prédictive pour vos données.',
      tags: [{ icon: 'fa-brain', text: 'Deep Learning' }, { icon: 'fa-robot', text: 'Automation' }],
      image_url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=600&q=80'
    },
    {
      num_str: '03',
      title: 'Infrastructures & Réseaux',
      description: 'Déploiement de réseaux locaux, sécurisation des données et maintenance critique.',
      tags: [{ icon: 'fa-server', text: 'Cisco / Azure' }, { icon: 'fa-shield-halved', text: 'Cybersecurity' }],
      image_url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80'
    },
    {
      num_str: '04',
      title: 'Recherche & Développement',
      description: 'Exploration de solutions innovantes pour les problématiques locales africaines.',
      tags: [{ icon: 'fa-microscope', text: 'Prototypes' }, { icon: 'fa-lightbulb', text: 'Innovation' }],
      image_url: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=600&q=80'
    },
    {
      num_str: '05',
      title: 'Formation & Transmission',
      description: 'Mentorat et bootcamps intensifs pour la nouvelle génération d\'ingénieurs.',
      tags: [{ icon: 'fa-graduation-cap', text: 'Mentoring' }, { icon: 'fa-users', text: 'Bootcamps' }],
      image_url: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=600&q=80'
    }
  ];

  return (
    <section id="services" className="py-24 lg:py-32 bg-white border-y border-line">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 xl:px-10 2xl:max-w-[90rem]">
        <div className="max-w-2xl mb-14">
          <p className="rv text-[11px] font-semibold uppercase tracking-[0.3em] text-clay">(02) — Nos services</p>
          <h2 className="rv d1 mt-4 font-display font-bold tracking-tight text-4xl lg:text-5xl leading-[1.05]">
            Cinq pôles, une même exigence.
          </h2>
          <p className="rv d2 mt-5 text-[15px] leading-relaxed text-smoke">
            Du code à l'infrastructure, nous couvrons la chaîne complète — et nous formons celles et ceux qui la feront vivre demain.
          </p>
        </div>

        <div className="border-t border-line">
          {services.map((s, idx) => (
            <div key={idx} className="rv border-b border-line">
              <button
                className="w-full grid grid-cols-[3rem_1fr_2.5rem] sm:grid-cols-[4.5rem_1fr_3rem] items-center gap-3 py-6 sm:py-7 text-left group"
                onClick={() => setOpenAcc(openAcc === idx ? null : idx)}
                aria-expanded={openAcc === idx}
              >
                <span className="font-display font-semibold text-smoke group-hover:text-clay transition-colors">
                  {s.num_str}
                </span>
                <span className="font-display font-bold text-xl sm:text-2xl lg:text-[1.65rem] tracking-tight group-hover:text-clay transition-colors">
                  {s.title}
                </span>
                <span
                  className={`justify-self-end w-9 h-9 rounded-full border border-line grid place-items-center transition-all duration-500 ${
                    openAcc === idx ? 'rotate-45 bg-ink border-ink text-paper' : ''
                  }`}
                >
                  <i className="fa-solid fa-plus text-[13px]"></i>
                </span>
              </button>

              <div className={`acc-body ${openAcc === idx ? 'open' : ''}`}>
                <div>
                  <div className="grid md:grid-cols-12 gap-8 pb-9 md:pl-[4.5rem]">
                    <div className="md:col-span-7 min-w-0">
                      <p className="text-[15px] leading-relaxed text-ink/75">{s.description}</p>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {s.tags.map((t, i) => (
                          <span key={i} className="inline-flex items-center gap-1.5 text-[11.5px] font-semibold px-3 py-1.5 bg-paper border border-line rounded-full">
                            <i className={`fa-solid ${t.icon} text-clay text-[10px]`}></i>
                            <span>{t.text}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                    <figure className="curtain rv-mask md:col-span-5 rounded-md overflow-hidden border border-line min-w-0">
                      <img src={s.image_url} alt={s.title} className="w-full h-44 object-cover" />
                    </figure>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
