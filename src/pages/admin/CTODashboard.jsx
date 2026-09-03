import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';

const CTODashboard = ({ profile }) => {
  const [stats, setStats] = useState({ projects: 0, messages: 0, members: 0 });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    const { count: pCount } = await supabase.from('projects').select('*', { count: 'exact', head: true });
    const { count: mCount } = await supabase.from('contacts').select('*', { count: 'exact', head: true });
    const { count: tCount } = await supabase.from('profiles').select('*', { count: 'exact', head: true });
    setStats({ projects: pCount || 0, messages: mCount || 0, members: tCount || 0 });
  };

  const statsCards = [
    { label: 'Projets Actifs', value: stats.projects, trend: '+18.4%', icon: 'fa-shapes', color: 'luma-purple' },
    { label: 'Messages Clients', value: stats.messages, trend: '+11.2%', icon: 'fa-comment-dots', color: 'luma-blue' },
    { label: 'Visites Web', value: '1,248', trend: '+22.6%', icon: 'fa-bolt-lightning', color: 'luma-pink' },
    { label: 'Satisfaction', value: '4.9/5', trend: 'Global', icon: 'fa-heart-pulse', color: 'luma-purple' },
  ];

  return (
    <div className="space-y-6 lg:space-y-10 animate-in fade-in duration-700">
      {/* Welcome Heading */}
      <section>
        <h1 className="text-3xl lg:text-4xl font-display font-black tracking-tight text-white mb-2">
          Good morning, {profile?.full_name?.split(' ')[0] || 'Héritier'}! ✨
        </h1>
        <p className="text-white/40 font-medium text-sm lg:text-base">Votre console de gestion est prête pour une nouvelle journée d'innovation.</p>
      </section>

      {/* Glass Cards Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {statsCards.map((s, i) => (
          <div key={i} className="bg-luma-card backdrop-blur-xl border border-white/5 p-6 lg:p-8 rounded-[2rem] relative overflow-hidden group hover:border-white/10 transition-all">
             <div className="flex justify-between items-start relative z-10">
                <div className={`w-10 lg:w-12 h-10 lg:h-12 rounded-2xl bg-${s.color}/10 flex items-center justify-center text-${s.color} border border-${s.color}/20 shadow-inner`}>
                   <i className={`fa-solid ${s.icon} text-lg`}></i>
                </div>
                <span className="text-[9px] lg:text-[10px] font-black text-moss bg-moss/10 px-2 lg:px-3 py-1 rounded-full uppercase tracking-widest">{s.trend}</span>
             </div>
             <div className="mt-4 lg:mt-6 relative z-10">
                <p className="text-white/40 text-[10px] lg:text-xs font-bold uppercase tracking-widest mb-1">{s.label}</p>
                <p className="text-2xl lg:text-4xl font-display font-black text-white">{s.value}</p>
             </div>
             <div className={`absolute -bottom-10 -right-10 w-32 h-32 bg-${s.color} rounded-full blur-[70px] opacity-10 group-hover:opacity-30 transition-opacity duration-500`}></div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
         <div className="lg:col-span-12 bg-luma-card backdrop-blur-xl border border-white/5 rounded-[2.5rem] lg:rounded-[3rem] overflow-hidden flex flex-col md:flex-row relative group">
            <div className="p-8 lg:p-16 flex-1 relative z-10 flex flex-col justify-center">
               <span className="text-[10px] lg:text-[11px] font-black uppercase tracking-[0.3em] text-luma-purple mb-4 lg:mb-6 block">Develite Ecosystem</span>
               <h2 className="text-4xl lg:text-6xl font-display font-black leading-none mb-6 lg:mb-8 tracking-tighter">Elevate Your <br/> <span className="text-luma-purple">Impact.</span></h2>
               <p className="text-white/40 text-sm lg:text-lg leading-relaxed mb-8 lg:mb-10 max-w-md font-medium">
                  Centralisez vos opérations technologiques et pilotez votre croissance avec DEVELITE AI.
               </p>
               <div className="flex flex-wrap gap-4 lg:gap-5">
                  <Link to="/admin/projects" className="bg-white text-luma-dark px-8 lg:px-10 py-3 lg:py-4 rounded-xl lg:rounded-2xl text-xs lg:text-sm font-black hover:bg-luma-purple hover:text-white transition-all shadow-xl shadow-white/5 active:scale-95">View Projects →</Link>
                  <Link to="/admin/users" className="bg-white/5 text-white px-8 lg:px-10 py-3 lg:py-4 rounded-xl lg:rounded-2xl text-xs lg:text-sm font-black border border-white/10 hover:bg-white/10 transition-all active:scale-95">Manage Team</Link>
               </div>
            </div>
            <div className="flex-1 min-h-[300px] lg:min-h-[400px] relative overflow-hidden">
               <img
                 src="https://images.unsplash.com/photo-1635776062127-d379bfcbb9c8?auto=format&fit=crop&w=1200&q=80"
                 className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-1000"
                 alt=""
               />
               <div className="absolute inset-0 bg-gradient-to-r from-[#120E1E] via-[#120E1E]/80 to-transparent"></div>
               <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-luma-purple/20 rounded-full blur-3xl animate-pulse"></div>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {[
            { label: 'Matrice de Sécurité', status: 'Stable', icon: 'fa-shield-halved', color: 'luma-blue' },
            { label: 'Node Distribution', status: 'Active', icon: 'fa-network-wired', color: 'luma-purple' },
            { label: 'Quantum Analytics', status: 'Optimal', icon: 'fa-microchip', color: 'luma-pink' }
          ].map((card, i) => (
            <div key={i} className="bg-white/[0.03] border border-white/5 p-6 rounded-[2rem] flex items-center gap-5 hover:bg-white/[0.05] transition-all cursor-pointer group">
              <div className={`w-10 lg:w-12 h-10 lg:h-12 rounded-xl bg-${card.color}/10 flex items-center justify-center text-${card.color} border border-${card.color}/10`}>
                 <i className={`fa-solid ${card.icon}`}></i>
              </div>
              <div>
                <p className="text-white font-bold text-sm tracking-tight">{card.label}</p>
                <p className="text-[9px] lg:text-[10px] font-black uppercase tracking-widest text-white/30 group-hover:text-luma-purple transition-colors">{card.status}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CTODashboard;
