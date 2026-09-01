import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Services from './components/Services';
import Team from './components/Team';
import Contact from './components/Contact';
import CustomCursor from './components/CustomCursor';

function App() {
  return (
    <div className="min-h-screen bg-paper selection:bg-clay selection:text-paper font-body text-ink antialiased">
      <CustomCursor />
      <Navbar />

      <main id="accueil">
        <Hero />
        <Marquee />

        {/* About Section */}
        <section id="apropos" className="py-24 lg:py-32">
          <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 xl:px-10 2xl:max-w-[90rem] grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4 min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-clay">(01) — Le labo</p>
              <h2 className="mt-4 font-display font-bold tracking-tight text-4xl lg:text-[2.9rem] leading-[1.06]">
                Innover pour l'Afrique, depuis Butembo.
              </h2>
            </div>
            <div className="lg:col-span-8 lg:pl-6 min-w-0">
              <p className="font-display font-medium text-2xl sm:text-[1.75rem] leading-snug tracking-tight text-ink">
                DEVELITE TECH est un centre d'excellence technologique dédié à la résolution de défis complexes par le biais de l'ingénierie avancée.
              </p>
              <div className="mt-10 bg-white rounded-r-lg p-7 sm:p-8 border border-line border-l-[3px] border-l-clay">
                <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-clay mb-3">Notre mission</p>
                <p className="text-[15.5px] leading-relaxed text-ink/80">
                  Bâtir les infrastructures numériques de demain et former une élite technique capable de porter les ambitions du continent.
                </p>
              </div>
            </div>
          </div>
        </section>

        <Services />
        <Team />
        <Contact />
      </main>

      <footer className="bg-ink text-paper border-t border-paper/10 py-12">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 xl:px-10 2xl:max-w-[90rem] flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <svg width="30" height="30" viewBox="0 0 40 40">
              <rect x="1.5" y="1.5" width="17" height="17" fill="#F6F3EC" />
              <rect x="21.5" y="1.5" width="17" height="17" fill="#F6F3EC" />
              <rect x="1.5" y="21.5" width="17" height="17" fill="#F6F3EC" />
              <rect x="21.5" y="21.5" width="17" height="17" fill="#BC4B0E" />
            </svg>
            <span className="font-display font-bold text-lg">DEVELITE <span className="text-clay text-xs tracking-[0.3em] ml-1">TECH</span></span>
          </div>
          <p className="text-paper/50 text-sm">
            © 2026 DEVELITE TECH — Butembo, RDC.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
