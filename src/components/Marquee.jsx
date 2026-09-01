import React from 'react';

const Marquee = () => {
  const items = [
    'Ingénierie Logicielle',
    'Intelligence Artificielle',
    'Recherche & Développement',
    'Formation Numérique',
    'Fintech & Mobile Money',
    'Infrastructures',
  ];

  return (
    <div className="marq bg-ink text-paper overflow-hidden -rotate-[0.6deg] scale-[1.01] border-y border-ink my-6 relative z-10" aria-hidden="true">
      <div className="marq-track py-3.5 font-display font-semibold uppercase tracking-[0.14em] text-[13px] sm:text-sm">
        <div className="flex shrink-0 items-center">
          {items.map((item, i) => (
            <span key={i} className="flex items-center">
              <span className="px-6">{item}</span>
              <i className="fa-solid fa-asterisk text-clay text-[10px]"></i>
            </span>
          ))}
        </div>
        {/* Duplicate for infinite effect */}
        <div className="flex shrink-0 items-center">
          {items.map((item, i) => (
            <span key={`dup-${i}`} className="flex items-center">
              <span className="px-6">{item}</span>
              <i className="fa-solid fa-asterisk text-clay text-[10px]"></i>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Marquee;
