import React from 'react';

const Hero = () => {
  return (
    <section className="text-center py-16 px-4">
      <div className="flex justify-center items-center gap-4 mb-6">
        <span className="text-elite-blue text-4xl font-mono">{"</>"}</span>
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white">
          Dev<span className="text-elite-blue">Elite</span>
        </h1>
        <span className="text-elite-blue text-4xl font-mono">{"</>"}</span>
      </div>

      <p className="text-lg md:text-xl font-medium tracking-widest uppercase mb-8 text-gray-300">
        ••• CODONS AUJOURD'HUI, INNOVONS DEMAIN •••
      </p>

      <div className="max-w-2xl mx-auto">
        <p className="text-xl md:text-2xl text-gray-400">
          Votre partenaire de confiance pour des <br />
          <span className="text-white font-semibold">solutions numériques sur mesure et performantes.</span>
        </p>
      </div>
    </section>
  );
};

export default Hero;
