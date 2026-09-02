import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';

const MainDashboard = () => {
  const { profile } = useOutletContext();
  const [stats, setStats] = useState({
    projects: 0,
    messages: 0,
    team: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    const { count: pCount } = await supabase.from('projects').select('*', { count: 'exact', head: true });
    const { count: mCount } = await supabase.from('contacts').select('*', { count: 'exact', head: true });
    const { count: tCount } = await supabase.from('profiles').select('*', { count: 'exact', head: true });

    setStats({
      projects: pCount || 0,
      messages: mCount || 0,
      team: tCount || 0
    });
  };

  const widgets = [
    { label: 'Projets Actifs', value: stats.projects, icon: 'fa-box-archive', color: 'clay' },
    { label: 'Messages Clients', value: stats.messages, icon: 'fa-envelope-open', color: 'moss', roles: ['admin', 'manager'] },
    { label: 'Membres Équipe', value: stats.team, icon: 'fa-users', color: 'ink', roles: ['admin'] },
  ];

  return (
    <div className="space-y-10">
      <section>
        <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-clay mb-2">Tableau de bord</h2>
        <h1 className="font-display font-bold text-3xl sm:text-4xl tracking-tight text-ink">
          Bonjour, <span className="text-clay">{profile?.full_name?.split(' ')[0] || 'Membre'}</span>.
        </h1>
        <p className="text-smoke mt-2 max-w-xl">
          Voici une vue d'ensemble des activités de DEVELITE TECH.
          {profile?.user_role === 'admin' && " En tant qu'Administrateur, vous avez un accès total à la console."}
        </p>
      </section>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {widgets.map((w, i) => {
          if (w.roles && !w.roles.includes(profile?.user_role)) return null;

          return (
            <div key={i} className="bg-white p-8 rounded-xl border border-line shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                 <div>
                    <p className="text-[11px] font-bold uppercase tracking-widest text-smoke mb-4">{w.label}</p>
                    <p className="text-4xl font-display font-bold text-ink">{w.value < 10 ? `0${w.value}` : w.value}</p>
                 </div>
                 <div className={`w-12 h-12 rounded-lg bg-${w.color}/10 flex items-center justify-center text-${w.color}`}>
                    <i className={`fa-solid ${w.icon} text-xl`}></i>
                 </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
         <div className="bg-white rounded-xl border border-line shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-line flex justify-between items-center bg-paper/30">
               <h3 className="font-display font-bold text-ink">État du Système</h3>
               <span className="flex items-center gap-2 text-[10px] font-bold uppercase text-moss">
                  <span className="w-2 h-2 rounded-full bg-moss animate-pulse"></span>
                  Opérationnel
               </span>
            </div>
            <div className="p-8 space-y-6">
               <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-smoke">Base de données Supabase</span>
                  <span className="text-xs font-bold text-ink">Connecté</span>
               </div>
               <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-smoke">Stockage Cloud</span>
                  <span className="text-xs font-bold text-ink">Actif</span>
               </div>
               <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-smoke">Authentification</span>
                  <span className="text-xs font-bold text-ink">Sécurisé</span>
               </div>
            </div>
         </div>

         <div className="bg-ink text-paper rounded-xl p-8 flex flex-col justify-between">
            <div>
               <h3 className="font-display font-bold text-xl mb-4">Besoin d'aide ?</h3>
               <p className="text-paper/60 text-sm leading-relaxed">
                  Consultez la documentation interne de DEVELITE pour apprendre à gérer les déploiements Vercel et les buckets Supabase.
               </p>
            </div>
            <button className="mt-8 bg-paper text-ink font-bold text-[12px] uppercase tracking-widest px-6 py-3 rounded-lg hover:bg-clay hover:text-white transition-all w-fit">
               Documentation
            </button>
         </div>
      </div>
    </div>
  );
};

export default MainDashboard;
