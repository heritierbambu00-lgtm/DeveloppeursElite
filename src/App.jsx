import React, { useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Services from './components/Services';
import Team from './components/Team';
import Impact from './components/Impact';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';

function App() {
  const aboutRef = useRef(null);

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

    const elements = aboutRef.current?.querySelectorAll('.rv') || [];
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-paper selection:bg-clay selection:text-paper font-body text-ink antialiased">
      <CustomCursor />
      <Navbar />

      <main id="accueil">
        <Hero />
        <Marquee />

        {/* About Section */}
        <section id="apropos" ref={aboutRef} className="py-24 lg:py-32">
          <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 xl:px-10 2xl:max-w-[90rem] grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4 min-w-0">
              <p className="rv text-[11px] font-semibold uppercase tracking-[0.3em] text-clay">(01) — Le labo</p>
              <h2 className="rv mt-4 font-display font-bold tracking-tight text-4xl lg:text-[2.9rem] leading-[1.06]" style={{ transitionDelay: '0.08s' }}>
                Innover pour l'Afrique, depuis Butembo.
              </h2>
            </div>
            <div className="lg:col-span-8 lg:pl-6 min-w-0">
              <p className="rv font-display font-medium text-2xl sm:text-[1.75rem] leading-snug tracking-tight text-ink" style={{ transitionDelay: '0.16s' }}>
                DEVELITE TECH est un centre d'excellence technologique dédié à la résolution de défis complexes par le biais de l'ingénierie avancée.
              </p>
              <div className="rv mt-10 bg-white rounded-r-lg p-7 sm:p-8 border border-line border-l-[3px] border-l-clay" style={{ transitionDelay: '0.24s' }}>
                <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-clay mb-3">Notre mission</p>
                <p className="text-[15.5px] leading-relaxed text-ink/80">
                  Bâtir les infrastructures numériques de demain et former une élite technique capable de porter les ambitions du continent avec une vision globale.
                </p>
              </div>
            </div>
          </div>
        </section>

        <Services />
        <Team />
        <Impact />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

export default App;
