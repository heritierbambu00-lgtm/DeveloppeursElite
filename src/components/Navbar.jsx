import React, { useState, useEffect } from 'react';
import Logo from './Logo';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

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
    { num: '01', label: 'Le labo', href: '#apropos' },
    { num: '02', label: 'Services', href: '#services' },
    { num: '03', label: 'Produits', href: '#produits' },
    { num: '04', label: 'Projets', href: '#projets' },
    { num: '05', label: 'Partenaires', href: '#partenaires' },
    { num: '06', label: 'Équipe', href: '#equipe' },
    { num: '07', label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled || open
            ? 'bg-paper/95 backdrop-blur border-b border-line shadow-[0_1px_0_0_rgba(24,27,32,0.03)]'
            : 'bg-transparent'
        }`}
      >
        <nav className="mx-auto w-full max-w-7xl px-5 sm:px-8 xl:px-10 2xl:max-w-[90rem] h-[72px] flex items-center justify-between gap-4">
          <a href="#accueil" className="flex items-center gap-3 group min-w-0" aria-label="DEVELITE TECH — accueil">
            <Logo className="w-9 h-9 transition-transform duration-300 group-hover:rotate-12 shrink-0" />
            <span className="leading-none min-w-0">
              <span className="block font-display font-bold text-[15px] tracking-tight truncate max-w-[11rem] xl:max-w-[16rem]">
                DEVELITE
              </span>
              <span className="block text-[10px] font-semibold tracking-[0.42em] text-clay mt-0.5">TECH</span>
            </span>
          </a>

          <div className="hidden lg:flex items-center gap-6 xl:gap-8 text-[13.5px] font-medium text-ink/80 min-w-0">
            {navLinks.slice(0, 7).map((link) => (
              <a key={link.num} href={link.href} className="u-link hover:text-ink">
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#contact"
              className="group hidden sm:inline-flex items-center gap-2.5 bg-ink text-paper text-[13px] font-semibold px-5 py-2.5 rounded-md hover:bg-clay transition-colors duration-300"
            >
              Nous contacter
              <i className="fa-solid fa-arrow-right text-[11px] transition-transform duration-300 group-hover:translate-x-1"></i>
            </a>

            <button
              className="lg:hidden w-11 h-11 grid place-items-center rounded-md border border-line bg-white/70"
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-label="Ouvrir le menu"
            >
              <span className="relative w-5 h-5 grid place-items-center">
                <i
                  className={`fa-solid fa-bars absolute text-[17px] transition-all duration-300 ${
                    open ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'
                  }`}
                ></i>
                <i
                  className={`fa-solid fa-xmark absolute text-[20px] transition-all duration-300 ${
                    open ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'
                  }`}
                ></i>
              </span>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed inset-x-0 top-[72px] bottom-0 bg-paper z-40 overflow-y-auto overscroll-contain transition-all duration-500 ${
          open ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
        aria-hidden={!open}
      >
        <div className="px-6 pt-8 pb-24 flex flex-col min-h-full">
          {navLinks.map((link, i) => (
            <a
              key={link.num}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`flex items-baseline gap-5 py-4 border-b border-line font-display font-bold text-[26px] tracking-tight transition-all duration-500`}
              style={{
                transitionDelay: `${i * 70}ms`,
                opacity: open ? 1 : 0,
                transform: open ? 'translateY(0)' : 'translateY(16px)',
              }}
            >
              <span className="text-xs font-body font-semibold text-clay">{link.num}</span>
              <span>{link.label}</span>
            </a>
          ))}

          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className={`mt-8 inline-flex items-center justify-center gap-3 bg-ink text-paper font-semibold text-sm px-6 py-4 rounded-md transition-opacity duration-500 ${
              open ? 'opacity-100' : 'opacity-0'
            }`}
          >
            Nous contacter <i className="fa-solid fa-arrow-right text-[12px]"></i>
          </a>

          <p className="mt-6 text-xs uppercase tracking-[0.3em] text-smoke">Butembo, RDC - Depuis 2025</p>
        </div>
      </div>
    </>
  );
};

export default Navbar;
