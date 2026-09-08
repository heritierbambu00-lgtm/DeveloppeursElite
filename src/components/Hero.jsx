import React from 'react';
import Logo from './Logo';
import { useLanguage } from '../context/LanguageContext';

const Hero = () => {
  const { t } = useLanguage();
  const stats = [
    { number: '25+', label: t('stats.projects') },
    { number: '12', label: t('stats.nodes') },
    { number: '05', label: t('stats.rd') },
    { number: '2025', label: t('stats.init') },
  ];

  return (
    <section className="relative pt-20 lg:pt-28 pb-14 lg:pb-24 overflow-hidden bg-paper dark:bg-luma-dark transition-colors duration-500">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 xl:px-10 2xl:max-w-[90rem]">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-16 items-center">
          <div className="lg:col-span-7 min-w-0 text-center lg:text-left">
            <h1 className="font-display font-black tracking-tighter leading-[1.02] text-[clamp(2.5rem,6.8vw,5.5rem)] text-ink dark:text-white">
              <span className="mask rv-mask">
                <span className="split block"><span className="ln uppercase">{t('hero.title')}</span></span>
              </span>
              <span className="mask rv-mask">
                <span className="split block"><span className="ln">{t('hero.subtitle')}</span></span>
              </span>
              <span className="mask rv-mask">
                <span className="split block">
                  <span className="ln italic text-clay text-glow">{t('hero.highlight')}</span>
                </span>
              </span>
            </h1>

            <p className="rv d2 mt-8 max-w-xl text-[16px] sm:text-lg leading-relaxed text-ink/60 dark:text-white/60 font-medium mx-auto lg:mx-0">
              {t('hero.desc')}
            </p>

            <div className="rv d3 mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-6">
              <a
                href="#produits"
                className="group relative inline-flex items-center gap-3 bg-ink dark:bg-white text-white dark:text-luma-dark font-black text-xs uppercase tracking-[0.2em] px-8 py-5 rounded-2xl overflow-hidden transition-all hover:shadow-[0_0_30px_rgba(158,122,255,0.3)] active:scale-95"
              >
                <div className="absolute inset-0 bg-clay translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                <span className="relative z-10">{t('hero.btn.solutions')}</span>
                <i className="fa-solid fa-bolt-lightning relative z-10 text-[10px] transition-transform duration-500 group-hover:rotate-12"></i>
              </a>

              <a
                href="#contact"
                className="group inline-flex items-center gap-3 border border-ink/10 dark:border-white/10 text-ink dark:text-white font-black text-xs uppercase tracking-[0.2em] px-8 py-5 rounded-2xl hover:border-clay hover:text-clay transition-all active:scale-95"
              >
                <span>{t('hero.btn.project')}</span>
                <i className="fa-solid fa-arrow-right text-[10px] transition-transform duration-500 group-hover:translate-x-1"></i>
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 relative rv d2 min-w-0">
            {/* Background Logo Decoration */}
            <div className="absolute -left-24 -top-24 opacity-[0.04] dark:opacity-[0.02] scale-150 pointer-events-none -z-10">
               <Logo className="w-96 h-96" />
            </div>

            {/* Main Logo Frame */}
            <div className="relative">
              <figure className="curtain rv-mask rounded-[3rem] overflow-hidden border border-white/40 dark:border-white/5 shadow-2xl bg-white/[0.05] backdrop-blur-3xl aspect-[4/5] flex items-center justify-center">
                <Logo className="w-full h-full scale-110 drop-shadow-[0_0_50px_rgba(158,122,255,0.15)]" />
              </figure>

              {/* Decorative Matrix Frame */}
              <div className="absolute -inset-4 border border-clay/10 rounded-[3.5rem] pointer-events-none -z-10 animate-pulse"></div>
            </div>

            <figcaption className="mt-6 flex items-center justify-between px-2">
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-clay">{t('hero.node')}</span>
                <span className="text-sm font-bold text-ink dark:text-white uppercase tracking-tight">{t('hero.founder')}</span>
              </div>
            </figcaption>

            {/* Tech Hexagon Badge - MAXIMIZED CLARITY */}
            <div className="absolute -top-10 -right-4 w-36 h-36 pointer-events-none group" aria-hidden="true">
               <div className="w-full h-full relative animate-[spin_12s_linear_infinite]">
                  <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-clay/30 stroke-[1]">
                    <polygon points="50,1 95,25 95,75 50,99 5,75 5,25" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Logo className="w-20 h-20 drop-shadow-[0_0_15px_rgba(255,77,0,0.4)]" />
                  </div>
               </div>
               <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                  <div className="w-28 h-28 rounded-full border border-clay/10 animate-ping"></div>
               </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 xl:px-10 2xl:max-w-[90rem] mt-20 lg:mt-24">
        <div className="rv d1 border-t border-ink/5 dark:border-white/5 pt-12 grid grid-cols-2 lg:grid-cols-4 gap-12">
          {stats.map((st, i) => (
            <div key={i} className="min-w-0">
              <p className="font-display font-black text-5xl sm:text-6xl tracking-tighter text-ink dark:text-white">
                <span className="bg-gradient-to-r from-ink dark:from-white to-clay bg-clip-text text-transparent">{st.number}</span>
              </p>
              <p className="mt-3 text-[10px] font-black uppercase tracking-[0.4em] text-ink/30 dark:text-white/30">{st.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
