import React from 'react';
import { Monitor, Smartphone, Globe } from 'lucide-react';

const ServiceCard = ({ icon: Icon, title, description }) => (
  <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-2xl hover:border-elite-blue transition-colors group">
    <div className="bg-elite-blue/10 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:bg-elite-blue/20">
      <Icon className="text-elite-blue w-8 h-8" />
    </div>
    <h3 className="text-2xl font-bold mb-4 text-white uppercase">{title}</h3>
    <p className="text-gray-400 leading-relaxed">
      {description}
    </p>
  </div>
);

const Services = () => {
  const services = [
    {
      icon: Monitor,
      title: "Création des Applications Desktop",
      description: "Des applications desktop puissantes, sécurisées et intuitives pour optimiser vos processus et booster votre productivité."
    },
    {
      icon: Smartphone,
      title: "Création des Applications Mobiles",
      description: "Des applications mobiles modernes, rapides et ergonomiques pour Android et iOS qui approchent votre entreprise de vos utilisateurs."
    },
    {
      icon: Globe,
      title: "Création des Applications Web",
      description: "Des sites web modernes, responsives et optimisés pour offrir la meilleure expérience à vos visiteurs et renforcer votre présence en ligne."
    }
  ];

  return (
    <section className="py-20 px-4 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <ServiceCard key={index} {...service} />
        ))}
      </div>
    </section>
  );
};

export default Services;
