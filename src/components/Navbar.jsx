import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '../context/LanguageContext';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.classList.add('menu-lock');
    } else {
      document.body.classList.remove('menu-lock');
    }
  }, [open]);

  const navLinks = [
    { num: '01', label: t('nav.about'), href: '#apropos' },
    { num: '02', label: t('nav.services'), href: '#services' },
    { num: '03', label: t('nav.projects'), href: '#produits' },
    { num: '04', label: t('nav.blog'), href: '/blog' },
    { num: '05', label: t('nav.about'), href: '#partenaires' },
    { num: '06', label: t('nav.about'), href: '#equipe' },
    { num: '07', label: t('nav.contact'), href: '#contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled || open
            ? 'bg-paper/80 dark:bg-luma-dark/80 backdrop-blur-2xl border-b border-ink/5 dark:border-white/5 py-4'
            : 'bg-transparent py-6'
        }`}
      >
        <nav className="mx-auto w-full max-w-7xl px-6 sm:px-8 xl:px-10 h-[60px] flex items-center justify-between gap-8">
          <a href="#accueil" className="flex items-center gap-4 group min-w-0" aria-label="DEVELITE TECH">
            <div className="relative">
              <Logo className="w-10 h-10 transition-all duration-500 group-hover:scale-110" />
              <div className="absolute -inset-1 bg-clay/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <div className="leading-none min-w-0">
              <span className="block font-display font-black text-lg tracking-tighter uppercase text-ink dark:text-white group-hover:text-clay transition-colors">
                DEVELITE
              </span>
              <span className="block text-[9px] font-black tracking-[0.6em] text-ink/30 dark:text-white/20 mt-1 uppercase">Tech Matrix</span>
            </div>
          </a>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-8 xl:gap-10 text-[11px] font-black uppercase tracking-[0.2em] text-ink/40 dark:text-white/40">
            {navLinks.map((link) => (
              <a key={link.num} href={link.href} className="hover:text-clay dark:hover:text-clay transition-colors relative group py-2">
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-clay transition-all duration-500 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <div className="hidden lg:flex items-center gap-4">
              <ThemeToggle />
              <LanguageSwitcher />
            </div>

            <Link
              to="/login"
              className="w-12 h-12 hidden sm:flex items-center justify-center rounded-2xl bg-ink/5 dark:bg-white/5 text-ink dark:text-white hover:bg-clay hover:text-white transition-all duration-500 shadow-sm"
              title="Matrix Access"
            >
              <i className="fa-solid fa-terminal text-sm"></i>
            </Link>

            <a
              href="#contact"
              className="hidden md:flex items-center gap-3 bg-ink dark:bg-clay text-white text-[10px] font-black uppercase tracking-[0.2em] px-8 py-4 rounded-2xl hover:bg-clayd hover:shadow-[0_0_20px_rgba(158,122,255,0.4)] transition-all duration-500"
            >
              {t('nav.contact')}
            </a>

            <button
              className="lg:hidden w-12 h-12 grid place-items-center rounded-2xl bg-white dark:bg-white/5 border border-ink/5 dark:border-white/10 shadow-sm"
              onClick={() => setOpen(!open)}
              aria-expanded={open}
            >
              <div className="w-5 flex flex-col gap-1.5">
                <span className={`h-0.5 bg-ink dark:bg-white transition-all duration-300 ${open ? 'rotate-45 translate-y-2 w-5' : 'w-5'}`}></span>
                <span className={`h-0.5 bg-ink dark:bg-white transition-all duration-300 ${open ? 'opacity-0' : 'w-3'}`}></span>
                <span className={`h-0.5 bg-ink dark:bg-white transition-all duration-300 ${open ? '-rotate-45 -translate-y-2 w-5' : 'w-5'}`}></span>
              </div>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu - Neo Matrix Style */}
      <div
        className={`lg:hidden fixed inset-0 bg-[#0B0813] z-40 transition-all duration-700 ${
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="px-10 pt-32 pb-24 flex flex-col h-full justify-center">
          <div className="space-y-8">
            {navLinks.map((link, i) => (
              <a
                key={link.num}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block group"
                style={{
                  transitionDelay: `${i * 50}ms`,
                  opacity: open ? 1 : 0,
                  transform: open ? 'translateX(0)' : 'translateX(-20px)',
                  transition: 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)'
                }}
              >
                <div className="flex items-center gap-6">
                   <span className="text-xs font-black text-clay/40 font-display">0{i+1}</span>
                   <span className="font-display font-black text-4xl uppercase tracking-tighter text-white group-hover:text-clay transition-colors italic">
                     {link.label}
                   </span>
                </div>
              </a>
            ))}
          </div>

          <div className="mt-20 pt-10 border-t border-white/5 space-y-8" style={{ opacity: open ? 1 : 0, transitionDelay: '400ms' }}>
             <div className="flex items-center gap-6">
                <ThemeToggle />
                <LanguageSwitcher />
             </div>
             <Link to="/login" onClick={() => setOpen(false)} className="flex items-center gap-4 text-white/40 font-black uppercase text-xs tracking-widest hover:text-clay transition-colors">
                <i className="fa-solid fa-lock text-clay"></i> Protocol Access
             </Link>
             <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.4em]">Matrix Version 2.0.4 • 2025</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
