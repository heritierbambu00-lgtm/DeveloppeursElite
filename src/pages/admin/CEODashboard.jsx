import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

const CEODashboard = ({ profile }) => {
  const [stats, setStats] = useState({ projects: 0, messages: 0, members: 0 });
  const [recentProjects, setRecentProjects] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { count: pCount } = await supabase.from('projects').select('*', { count: 'exact', head: true });
      const { count: mCount } = await supabase.from('contacts').select('*', { count: 'exact', head: true });
      const { count: tCount } = await supabase.from('profiles').select('*', { count: 'exact', head: true });

      setStats({ projects: pCount || 0, messages: mCount || 0, members: tCount || 0 });

      const { data: projects } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);
      setRecentProjects(projects || []);
    } catch (error) {
      console.error("CEO Fetch Error:", error);
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      {/* Header CEO */}
      <section>
        <h2 className="text-[11px] font-black uppercase tracking-[0.4em] text-luma-purple mb-2">Direction Générale</h2>
        <h1 className="text-5xl font-display font-black tracking-tighter text-white">
          Vision Matrice, <span className="text-luma-purple">{profile?.full_name?.split(' ')[0]}</span>.
        </h1>
        <p className="text-white/40 mt-4 text-lg max-w-2xl font-medium leading-relaxed">
          Pilotez la stratégie de DEVELITE TECH. Surveillez la croissance de l'écosystème et l'engagement client en temps réel.
        </p>
      </section>

      {/* CEO Business Metrics */}
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="bg-luma-card backdrop-blur-xl border border-white/10 p-10 rounded-[3rem] relative overflow-hidden group">
           <div className="relative z-10">
              <p className="text-[10px] font-black uppercase tracking-widest text-luma-blue mb-6 border-b border-luma-blue/20 pb-2 w-fit">Expansion Écosystème</p>
              <p className="text-5xl font-display font-black text-white mb-2">{stats.projects < 10 ? `0${stats.projects}` : stats.projects}</p>
              <p className="text-white/40 text-sm font-bold uppercase tracking-widest">Solutions Déployées</p>
           </div>
           <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:opacity-20 transition-opacity">
              <i className="fa-solid fa-chart-line text-6xl"></i>
           </div>
        </div>

        <div className="bg-luma-card backdrop-blur-xl border border-white/10 p-10 rounded-[3rem] relative overflow-hidden group">
           <div className="relative z-10">
              <p className="text-[10px] font-black uppercase tracking-widest text-luma-pink mb-6 border-b border-luma-pink/20 pb-2 w-fit">Engagement Marché</p>
              <p className="text-5xl font-display font-black text-white mb-2">{stats.messages < 10 ? `0${stats.messages}` : stats.messages}</p>
              <p className="text-white/40 text-sm font-bold uppercase tracking-widest">Requêtes Clients</p>
           </div>
           <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:opacity-20 transition-opacity">
              <i className="fa-solid fa-handshake-angle text-6xl"></i>
           </div>
        </div>

        <div className="bg-luma-card backdrop-blur-xl border border-white/10 p-10 rounded-[3rem] relative overflow-hidden group">
           <div className="relative z-10">
              <p className="text-[10px] font-black uppercase tracking-widest text-luma-purple mb-6 border-b border-luma-purple/20 pb-2 w-fit">Capital Humain</p>
              <p className="text-5xl font-display font-black text-white mb-2">{stats.members < 10 ? `0${stats.members}` : stats.members}</p>
              <p className="text-white/40 text-sm font-bold uppercase tracking-widest">Membres Actifs</p>
           </div>
           <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:opacity-20 transition-opacity">
              <i className="fa-solid fa-users-rays text-6xl"></i>
           </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Strategic Roadmap */}
        <div className="lg:col-span-8 bg-white/[0.02] border border-white/5 p-10 rounded-[3rem] space-y-8">
           <div className="flex justify-between items-center">
              <h3 className="text-xl font-display font-black uppercase tracking-tight italic">Roadmap Stratégique</h3>
              <span className="text-[10px] font-black text-moss bg-moss/10 px-3 py-1 rounded-full uppercase tracking-widest border border-moss/20">Optimal</span>
           </div>

           <div className="space-y-6">
              {recentProjects.length > 0 ? (
                recentProjects.map((pj) => (
                  <div key={pj.id} className="flex items-center gap-6 p-6 rounded-[2rem] bg-white/5 border border-white/5 hover:bg-white/10 transition-all group">
                     <div className={`w-14 h-14 rounded-2xl bg-${pj.status_color}/10 flex items-center justify-center text-${pj.status_color} border border-${pj.status_color}/20`}>
                        <i className="fa-solid fa-layer-group"></i>
                     </div>
                     <div className="flex-1">
                        <p className="text-xs font-black uppercase text-white/30 tracking-widest">{pj.category}</p>
                        <p className="text-lg font-bold text-white group-hover:text-luma-purple transition-colors">{pj.title}</p>
                     </div>
                     <div className="text-right">
                        <span className={`text-[9px] font-black uppercase px-2.5 py-1 rounded-md bg-${pj.status_color}/20 text-${pj.status_color}`}>{pj.status}</span>
                     </div>
                  </div>
                ))
              ) : (
                <p className="text-white/20 italic">Initialisation du flux de données stratégiques...</p>
              )}
           </div>
        </div>

        {/* Vision Widget */}
        <div className="lg:col-span-4 space-y-8">
           <div className="bg-neon-purple p-10 rounded-[3rem] shadow-2xl shadow-luma-purple/20 flex flex-col justify-between min-h-[350px]">
              <div>
                 <i className="fa-solid fa-eye text-3xl mb-6"></i>
                 <h3 className="text-2xl font-display font-black text-white leading-tight uppercase tracking-tighter italic">Vision <br/>2026</h3>
                 <p className="mt-4 text-white/80 text-sm font-medium leading-relaxed">
                    Devenir le leader incontesté de l'ingénierie logicielle en RDC et étendre l'influence de DEVELITE TECH sur le marché panafricain.
                 </p>
              </div>
              <button className="bg-white text-luma-dark font-black text-[10px] uppercase tracking-widest py-3 px-6 rounded-xl w-fit hover:scale-105 transition-transform active:scale-95">Mettre à jour Vision</button>
           </div>

           <div className="bg-luma-card border border-white/5 p-8 rounded-[2rem] flex items-center gap-5">
              <div className="w-12 h-12 rounded-xl bg-luma-blue/10 flex items-center justify-center text-luma-blue border border-luma-blue/10">
                 <i className="fa-solid fa-shield-check"></i>
              </div>
              <div>
                <p className="text-white font-bold text-sm tracking-tight">Compliance Score</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-white/30 italic">Matrix Secure • 100%</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default CEODashboard;
