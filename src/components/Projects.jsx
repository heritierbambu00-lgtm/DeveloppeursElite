import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const Projects = () => {
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
    <section id="produits" className="py-24 lg:py-32">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 xl:px-10 2xl:max-w-[90rem]">
        <div className="max-w-2xl mb-16">
          <p className="rv text-[11px] font-semibold uppercase tracking-[0.3em] text-clay">(03) — Nos projets & produits</p>
          <h2 className="rv d1 mt-4 font-display font-bold tracking-tight text-4xl lg:text-5xl leading-[1.05]">
            Des solutions concrètes pour le futur.
          </h2>
          <p className="rv d2 mt-5 text-[15px] leading-relaxed text-smoke">
            Découvrez les projets nés au sein de DEVELITE TECH, allant de l'IA appliquée à la fintech.
          </p>
        </div>

        {loading ? (
           <p className="text-smoke italic">Chargement des projets...</p>
        ) : projects.length === 0 ? (
           <div className="bg-paper border border-line border-dashed p-12 rounded-lg text-center">
              <i className="fa-solid fa-folder-open text-4xl text-line mb-4 block"></i>
              <p className="text-smoke">Aucun projet n'a été publié pour le moment.</p>
           </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((pj) => (
              <article key={pj.id} className="rv group rounded-lg border border-line bg-paper overflow-hidden flex flex-col transition-transform duration-500 hover:-translate-y-1.5">
                <figure className="relative curtain overflow-hidden aspect-[4/3]">
                  {pj.image_url ? (
                    <img
                      src={pj.image_url}
                      alt={pj.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-mist flex items-center justify-center">
                       <i className="fa-solid fa-code text-4xl text-clay/20"></i>
                    </div>
                  )}
                  <span className={`absolute top-4 left-4 inline-flex items-center gap-2 bg-paper/90 backdrop-blur-sm border border-line text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full`}>
                    <span className={`w-1.5 h-1.5 rounded-full bg-${pj.status_color}`}></span>
                    {pj.status}
                  </span>
                </figure>

                <div className="p-7 flex-1 flex flex-col">
                  <p className="text-[10px] uppercase tracking-widest text-smoke mb-2">{pj.category}</p>
                  <h3 className="font-display font-bold text-2xl tracking-tight mb-3">{pj.title}</h3>
                  <p className="text-sm leading-relaxed text-smoke flex-1">{pj.description}</p>

                  <div className="mt-6 flex items-center justify-between">
                     <span className="text-[11px] font-bold text-clay uppercase tracking-widest">En savoir plus</span>
                     <i className="fa-solid fa-arrow-right-long text-clay text-sm group-hover:translate-x-1 transition-transform"></i>
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
