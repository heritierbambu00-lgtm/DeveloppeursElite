import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useLanguage } from '../context/LanguageContext';

const Team = () => {
  const { t } = useLanguage();
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeam();
  }, []);

  async function fetchTeam() {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('updated_at', { ascending: true });

      if (error) throw error;
      setTeamMembers(data || []);
    } catch (error) {
      console.error('Error fetching team:', error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="equipe" className="py-24 lg:py-32 bg-white dark:bg-luma-dark border-y border-line dark:border-white/5 transition-colors duration-500">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 xl:px-10 2xl:max-w-[90rem]">
        <div className="max-w-2xl mb-14">
          <p className="rv text-[11px] font-semibold uppercase tracking-[0.3em] text-clay">{t('section.team.badge')}</p>
          <h2 className="rv d1 mt-4 font-display font-bold tracking-tight text-4xl lg:text-5xl leading-[1.05] dark:text-white uppercase italic">
            {t('section.team.title')}
          </h2>
          <p className="rv mt-5 text-[15px] leading-relaxed text-smoke dark:text-white/40 font-medium italic">
             {t('section.team.desc')}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 lg:gap-x-12">
          {loading ? (
            <p className="text-smoke dark:text-white/20 italic tracking-widest uppercase text-xs">{t('team.loading')}</p>
          ) : teamMembers.length === 0 ? (
            <p className="text-smoke dark:text-white/20 italic">{t('team.empty')}</p>
          ) : (
            teamMembers.map((tm, i) => (
              <article key={tm.id} className="rv group min-w-0" style={{ transitionDelay: `${i * 0.1}s` }}>
                <figure className="relative rounded-[2.5rem] overflow-hidden border border-line dark:border-white/5 shadow-lg">
                  <img
                    src={tm.avatar_url || '/Heritier.jpg'}
                    alt={tm.full_name}
                    className="w-full aspect-[4/5] object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </figure>

                <div className="mt-6 px-2">
                  <h3 className="font-display font-black text-xl tracking-tight dark:text-white uppercase italic">{tm.full_name}</h3>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-clay mt-2 flex items-center gap-2">
                    <i className={`fa-solid ${tm.icon || 'fa-code'} text-[8px]`}></i>
                    <span>{language === 'en' ? (tm.role_en || tm.role) : tm.role}</span>
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-smoke dark:text-white/40 font-medium line-clamp-2">
                    {language === 'en' ? (tm.bio_en || tm.bio) : tm.bio}
                  </p>
                </div>
              </article>
            ))
          )}

          <article className="rv rounded-[2.5rem] bg-paper dark:bg-white/[0.03] border border-line dark:border-white/10 border-dashed p-10 flex flex-col justify-center items-center text-center group hover:bg-clay/5 transition-all">
             <div className="w-16 h-16 rounded-full bg-mist dark:bg-white/5 grid place-items-center mb-6 group-hover:scale-110 transition-transform">
                <i className="fa-solid fa-plus text-clay text-xl"></i>
             </div>
             <h3 className="font-display font-black text-lg dark:text-white uppercase">{t('team.join')}</h3>
             <p className="mt-2 text-xs text-smoke dark:text-white/30 font-medium">{t('team.hiring')}</p>
             <a href="#contact" className="mt-6 u-link text-xs font-black text-clay uppercase tracking-[0.2em]">{t('team.cta')}</a>
          </article>
        </div>
      </div>
    </section>
  );
};

export default Team;
