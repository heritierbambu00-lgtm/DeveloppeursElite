import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-paper dark:bg-luma-dark text-ink dark:text-white border-t border-line dark:border-white/5 transition-colors duration-500">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 xl:px-10 2xl:max-w-[90rem] pt-20 pb-10">
        <div className="rv flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-line dark:border-white/5 pb-12">
          <h2 className="font-display font-black tracking-tight text-[clamp(2rem,4.6vw,3.4rem)] leading-[1.05] max-w-2xl uppercase italic">
            Construisons ensemble<br />ce qui vient.
          </h2>

          <a href="#contact" className="group inline-flex items-center gap-4 bg-ink dark:bg-clay text-white font-black text-xs uppercase tracking-[0.2em] px-8 py-5 rounded-2xl hover:bg-clayd transition-all duration-300 shrink-0 self-start lg:self-auto">
            Démarrer liaison
            <i className="fa-solid fa-arrow-right text-[11px] transition-transform duration-300 group-hover:translate-x-1"></i>
          </a>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 py-16 lg:py-24">
          <div className="rv d1 min-w-0">
            <div className="flex items-center gap-3">
              <Logo className="w-9 h-9" />
              <div className="leading-none min-w-0">
                <span className="block font-display font-black text-lg truncate uppercase tracking-tighter">DEVELITE</span>
                <span className="block text-[9px] font-black tracking-[0.42em] text-clay mt-1 uppercase">TECH</span>
              </div>
            </div>

            <p className="mt-8 text-sm leading-relaxed text-ink/60 dark:text-white/40 font-medium max-w-xs italic">
               Système d'ingénierie globale et de recherche en IA. Bâtir la matrice numérique du futur depuis Butembo.
            </p>

            <div className="mt-10 flex gap-4 flex-wrap">
              {['facebook-f', 'linkedin-in', 'x-twitter', 'whatsapp'].map((icon, i) => (
                <a key={i} href="#" className="w-11 h-11 rounded-2xl border border-line dark:border-white/10 grid place-items-center text-ink/70 dark:text-white/30 hover:bg-clay hover:border-clay hover:text-white transition-all">
                  <i className={`fa-brands fa-${icon} text-sm`}></i>
                </a>
              ))}
            </div>
          </div>

          <div className="rv d2 min-w-0">
            <p className="text-[11px] font-black uppercase tracking-[0.3em] text-ink/30 dark:text-white/20 mb-6">Entreprise</p>
            <ul className="space-y-4 text-sm font-bold text-ink/70 dark:text-white/50 uppercase tracking-widest">
              <li><a href="#apropos" className="hover:text-clay transition-colors">{t('nav.about')}</a></li>
              <li><a href="#equipe" className="hover:text-clay transition-colors">Nodes</a></li>
              <li><a href="#services" className="hover:text-clay transition-colors">Services</a></li>
              <li><a href="#contact" className="hover:text-clay transition-colors">Liaison</a></li>
              <li className="pt-4 border-t border-line dark:border-white/5 mt-4">
                <Link to="/login" className="text-clay font-black hover:text-ink dark:hover:text-white transition-colors flex items-center gap-3 italic">
                  <i className="fa-solid fa-terminal text-[10px]"></i>
                  Espace Membre
                </Link>
              </li>
            </ul>
          </div>

          <div className="rv d3 min-w-0">
            <p className="text-[11px] font-black uppercase tracking-[0.3em] text-ink/30 dark:text-white/20 mb-6">Protocoles</p>
            <ul className="space-y-4 text-sm font-bold text-ink/70 dark:text-white/50 uppercase tracking-widest">
              <li>Ingénierie Logicielle</li>
              <li>Intelligence Artificielle</li>
              <li>Infrastructures Cloud</li>
              <li>Recherche & R&D</li>
            </ul>
          </div>

          <div className="rv d4 min-w-0">
            <p className="text-[11px] font-black uppercase tracking-[0.3em] text-ink/30 dark:text-white/20 mb-6">Coordination</p>
            <ul className="space-y-6 text-sm font-bold text-ink/70 dark:text-white/60">
              <li className="flex flex-col gap-1">
                <span className="text-[9px] font-black text-clay uppercase">Signal Email</span>
                <span className="tracking-tight italic font-black text-base">contact@deve-lite.tech</span>
              </li>
              <li className="flex flex-col gap-1">
                <span className="text-[9px] font-black text-clay uppercase">Node de localisation</span>
                <span className="tracking-tight italic font-black text-base">Butembo, Nord-Kivu, RDC</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="rv d4 border-t border-line dark:border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-black uppercase tracking-[0.3em] text-ink/30 dark:text-white/20">
          <p>© 2026 DEVELITE TECH — Matrix Version 2.0.4.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-clay transition-colors">Mentions légales</a>
            <a href="#" className="hover:text-clay transition-colors">Confidentialité</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
