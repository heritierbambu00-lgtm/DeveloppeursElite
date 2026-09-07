import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { motion } from 'framer-motion';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  async function fetchTestimonials() {
    const { data } = await supabase.from('testimonials').select('*').eq('is_visible', true).limit(3);
    setTestimonials(data || []);
  }

  if (testimonials.length === 0) return null;

  return (
    <section className="py-24 lg:py-32 bg-paper overflow-hidden">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 xl:px-10 2xl:max-w-[90rem]">
        <div className="flex flex-col lg:flex-row justify-between items-end gap-10 mb-20">
           <div className="max-w-2xl">
              <p className="rv text-[11px] font-semibold uppercase tracking-[0.3em] text-clay">(06) — Success Stories</p>
              <h2 className="rv mt-4 font-display font-bold tracking-tight text-4xl lg:text-6xl leading-none">
                Ce qu'ils disent de <br/> notre <span className="italic text-clay">expertise.</span>
              </h2>
           </div>
           <div className="flex gap-4">
              <div className="w-12 h-12 border border-line rounded-full grid place-items-center cursor-pointer hover:bg-ink hover:text-paper transition-all">
                 <i className="fa-solid fa-arrow-left"></i>
              </div>
              <div className="w-12 h-12 border border-line rounded-full grid place-items-center cursor-pointer hover:bg-ink hover:text-paper transition-all">
                 <i className="fa-solid fa-arrow-right"></i>
              </div>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {testimonials.map((t, i) => (
             <motion.div
               whileHover={{ y: -10 }}
               key={t.id}
               className="p-10 bg-white border border-line rounded-lg shadow-sm relative"
             >
                <div className="flex gap-1 text-clay mb-8">
                   {[...Array(t.rating)].map((_, j) => <i key={j} className="fa-solid fa-star text-[10px]"></i>)}
                </div>
                <p className="text-[17px] leading-relaxed text-ink/80 mb-10 italic">"{t.content}"</p>
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-paper rounded-full overflow-hidden border border-line shrink-0">
                      <img src={t.avatar_url || '/Heritier.jpg'} alt="" className="w-full h-full object-cover" />
                   </div>
                   <div>
                      <p className="font-bold text-[14px] uppercase tracking-wider">{t.client_name}</p>
                      <p className="text-[11px] font-semibold text-smoke uppercase tracking-[0.15em]">{t.client_role}</p>
                   </div>
                </div>
                <div className="absolute top-10 right-10 opacity-5">
                   <i className="fa-solid fa-quote-right text-6xl"></i>
                </div>
             </motion.div>
           ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
