import React from 'react';
import Logo from './Logo';

const Footer = () => {
  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 xl:px-10 2xl:max-w-[90rem] pt-20 pb-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-paper/15 pb-12">
          <h2 className="font-display font-bold tracking-tight text-[clamp(2rem,4.6vw,3.4rem)] leading-[1.05] max-w-2xl">
            Construisons ensemble<br />ce qui vient.
          </h2>

          <a href="#contact" className="group inline-flex items-center gap-3 bg-paper text-ink font-semibold text-sm px-7 py-4 rounded-md hover:bg-clay hover:text-paper transition-colors duration-300 shrink-0 self-start lg:self-auto">
            Démarrer une conversation
            <i className="fa-solid fa-arrow-right text-[12px] transition-transform duration-300 group-hover:translate-x-1"></i>
          </a>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 py-12">
          <div className="min-w-0">
            <div className="flex items-center gap-3">
              <Logo className="w-8 h-8" />
              <span className="leading-none min-w-0">
                <span className="block font-display font-bold text-[14px] truncate uppercase tracking-tighter">DEVELITE</span>
                <span className="block text-[9px] font-semibold tracking-[0.42em] text-clay mt-0.5 uppercase">TECH</span>
              </span>
            </div>

            <p className="mt-5 text-[13px] leading-relaxed text-paper/55 max-w-xs">
              Société d'ingénierie logicielle et de recherche en intelligence artificielle basée à Butembo, RDC.
            </p>

            <div className="mt-6 flex gap-3 flex-wrap">
              {['facebook-f', 'linkedin-in', 'x-twitter', 'whatsapp'].map((icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-full border border-paper/20 grid place-items-center text-paper/70 hover:bg-clay hover:border-clay hover:text-paper transition-colors">
                  <i className={`fa-brands fa-${icon} text-[13px]`}></i>
                </a>
              ))}
            </div>
          </div>

          <div className="min-w-0">
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-paper/40 mb-4">Entreprise</p>
            <ul className="space-y-2.5 text-[13.5px] text-paper/75">
              <li><a href="#apropos" className="hover:text-paper transition-colors">Le labo</a></li>
              <li><a href="#equipe" className="hover:text-paper transition-colors">Équipe</a></li>
              <li><a href="#services" className="hover:text-paper transition-colors">Services</a></li>
              <li><a href="#contact" className="hover:text-paper transition-colors">Contact</a></li>
            </ul>
          </div>

          <div className="min-w-0">
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-paper/40 mb-4">Spécialités</p>
            <ul className="space-y-2.5 text-[13.5px] text-paper/75">
              <li>Ingénierie Logicielle</li>
              <li>Intelligence Artificielle</li>
              <li>Infrastructures Cloud</li>
              <li>Recherche & Développement</li>
            </ul>
          </div>

          <div className="min-w-0">
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-paper/40 mb-4">Contact</p>
            <ul className="space-y-2.5 text-[13.5px] text-paper/75">
              <li className="flex items-center gap-2">
                <i className="fa-solid fa-envelope text-clay w-4"></i>
                contact@deve-lite.tech
              </li>
              <li className="flex items-center gap-2">
                <i className="fa-solid fa-location-dot text-clay w-4"></i>
                Butembo, Nord-Kivu, RDC
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-paper/15 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[12px] text-paper/45">
          <p>© 2026 DEVELITE TECH — Excellence Technologique.</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-paper transition-colors">Mentions légales</a>
            <a href="#" className="hover:text-paper transition-colors">Confidentialité</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
