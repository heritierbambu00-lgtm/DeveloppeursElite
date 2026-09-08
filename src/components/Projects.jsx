import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import Logo from './Logo';
import { useLanguage } from '../context/LanguageContext';

const Projects = () => {
  const { t } = useLanguage();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error('Error fetching projects:', error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="produits" className="py-24 lg:py-32 bg-paper dark:bg-luma-dark transition-colors duration-500">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 xl:px-10 2xl:max-w-[90rem]">
        <div className="max-w-2xl mb-16">
          <p className="rv text-[11px] font-semibold uppercase tracking-[0.3em] text-clay">{t('section.projects.badge')}</p>
          <h2 className="rv d1 mt-4 font-display font-bold tracking-tight text-4xl lg:text-5xl leading-[1.05] dark:text-white uppercase italic">
            {t('section.projects.title')}
          </h2>
          <p className="rv d2 mt-5 text-[15px] leading-relaxed text-smoke dark:text-white/40 font-medium italic">
            {t('section.projects.desc')}
          </p>
        </div>

        {loading ? (
           <p className="text-smoke italic dark:text-white/20 uppercase tracking-widest text-xs">{t('projects.empty')}</p>
        ) : projects.length === 0 ? (
           <div className="bg-paper dark:bg-white/5 border border-line dark:border-white/10 border-dashed p-12 rounded-[2.5rem] text-center">
              <i className="fa-solid fa-folder-open text-4xl text-line dark:text-white/10 mb-4 block"></i>
              <p className="text-smoke dark:text-white/40 font-bold uppercase text-xs tracking-widest">{t('projects.empty_desc')}</p>
           </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {projects.map((pj) => (
              <article key={pj.id} className="rv group rounded-[2.5rem] border border-line dark:border-white/5 bg-white dark:bg-white/[0.03] overflow-hidden flex flex-col transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_80px_-40px_rgba(158,122,255,0.25)]">
                <figure className="relative overflow-hidden aspect-[1.1/1]">
                  {pj.image_url ? (
                    <img
                      src={pj.image_url}
                      alt={pj.title}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
                       <Logo className="w-16 h-16 opacity-10" />
                    </div>
                  )}
                  <span className={`absolute top-6 left-6 inline-flex items-center gap-2 bg-white/90 dark:bg-luma-dark/90 backdrop-blur-md border border-line/50 dark:border-white/10 text-[9px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-xl shadow-sm dark:text-white`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-clay animate-pulse"></span>
                    {pj.status}
                  </span>
                </figure>

                <div className="p-8 lg:p-10 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                     <p className="text-[10px] font-black uppercase tracking-[0.3em] text-smoke dark:text-white/40">{pj.category}</p>
                     <i className="fa-solid fa-code text-[10px] text-clay/40"></i>
                  </div>
                  <h3 className="font-display font-black text-2xl tracking-tighter text-ink dark:text-white mb-4 group-hover:text-clay transition-colors uppercase leading-tight line-clamp-2 italic">{pj.title}</h3>
                  <p className="text-[14.5px] leading-relaxed text-ink/60 dark:text-white/60 font-medium flex-1 line-clamp-3">{pj.description}</p>

                  <div className="mt-8 pt-8 border-t border-line/50 dark:border-white/10 flex items-center justify-between group">
                     <span className="text-[11px] font-black text-ink dark:text-white uppercase tracking-[0.1em]">{t('projects.casestudy')}</span>
                     <div className="w-10 h-10 rounded-full bg-ink/5 dark:bg-white/5 flex items-center justify-center group-hover:bg-clay group-hover:text-white transition-all duration-500">
                        <i className="fa-solid fa-arrow-right-long text-sm transition-transform group-hover:translate-x-0.5"></i>
                     </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
