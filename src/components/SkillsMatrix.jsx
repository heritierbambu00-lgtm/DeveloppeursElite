import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const SkillsMatrix = () => {
  const { t } = useLanguage();
  const [skills, setSkills] = useState([]);
// ... exists fetchSkills logic ...
  return (
    <section className="py-24 lg:py-32 overflow-hidden bg-paper dark:bg-luma-dark transition-colors duration-500">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 xl:px-10 2xl:max-w-[90rem]">
        <div className="mb-20 text-center lg:text-left">
           <p className="text-[11px] font-black uppercase tracking-[0.4em] text-clay mb-4">Protocol Matrix</p>
           <h2 className="font-display font-black text-4xl lg:text-6xl tracking-tighter uppercase italic leading-none dark:text-white">
              Nodes de <br/> <span className="text-clay">Maîtrise.</span>
           </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 lg:gap-12">
           {skills.map((skill, i) => (
             <motion.div
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ delay: i * 0.05 }}
               key={skill.id} className="group relative"
             >
                <div className="w-full aspect-square bg-white dark:bg-white/[0.03] border border-line dark:border-white/5 rounded-[2.5rem] flex flex-col items-center justify-center p-6 shadow-sm group-hover:border-clay group-hover:shadow-[0_20px_50px_-20px_rgba(158,122,255,0.2)] transition-all">
                   <div className="text-2xl mb-4 group-hover:scale-110 transition-transform">
                      <i className={`fa-solid ${skill.icon || 'fa-microchip'} text-clay/40 group-hover:text-clay transition-colors`}></i>
                   </div>
                   <h3 className="text-[11px] font-black uppercase tracking-widest text-center text-ink dark:text-white/80">{skill.name}</h3>
                   <div className="mt-4 w-full h-[2px] bg-line dark:bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        className="h-full bg-clay shadow-[0_0_10px_#9E7AFF]"
                      />
                   </div>
                   <span className="absolute -top-2 -right-2 bg-paper dark:bg-luma-dark border border-line dark:border-white/10 px-1.5 py-0.5 rounded text-[8px] font-black opacity-0 group-hover:opacity-100 transition-opacity dark:text-white">
                      {skill.level}%
                   </span>
                </div>
             </motion.div>
           ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsMatrix;
