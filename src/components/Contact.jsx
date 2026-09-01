import React from 'react';
import { Phone, MessageSquare, Rocket } from 'lucide-react';

const Contact = () => {
  return (
    <section className="bg-slate-900 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div className="flex items-center gap-6 bg-slate-800/50 p-6 rounded-2xl">
            <div className="bg-elite-blue p-4 rounded-full">
              <MessageSquare className="text-white w-8 h-8" />
            </div>
            <div>
              <p className="text-sm text-gray-400 uppercase tracking-widest font-bold">Pour plus d'informations</p>
              <h2 className="text-3xl font-black text-elite-blue">CONTACTEZ-NOUS !</h2>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-elite-blue/5 p-6 rounded-2xl border border-elite-blue/20">
            <div className="bg-white/10 p-3 rounded-full">
              <Rocket className="text-elite-blue w-6 h-6" />
            </div>
            <p className="text-gray-300 italic">
              "Votre projet est unique, notre mission est de le réaliser avec excellence."
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            "0997372697",
            "0814 313 997",
            "0976 130 590"
          ].map((num, i) => (
            <div key={i} className="flex items-center justify-center gap-3 bg-slate-800 py-4 rounded-xl border border-transparent hover:border-elite-blue transition-all cursor-pointer">
              <Phone className="text-elite-blue w-5 h-5 fill-elite-blue" />
              <span className="text-xl font-bold">{num}</span>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button className="bg-elite-blue hover:bg-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-all flex items-center gap-3 mx-auto uppercase tracking-tighter">
            Contactez-nous dès maintenant et donnons vie à vos idées !
            <Rocket className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Contact;
