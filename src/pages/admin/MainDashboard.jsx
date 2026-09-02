import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import { chatWithAI } from '../../lib/aiService';

const MainDashboard = () => {
  const { profile } = useOutletContext();
  const [stats, setStats] = useState({ projects: 0, messages: 0, members: 0 });
  const [aiInsight, setAiInsight] = useState("Analyse de vos données en cours...");

  useEffect(() => {
    fetchStats();
    generateInsight();
  }, []);

  const fetchStats = async () => {
    const { count: pCount } = await supabase.from('projects').select('*', { count: 'exact', head: true });
    const { count: mCount } = await supabase.from('contacts').select('*', { count: 'exact', head: true });
    const { count: tCount } = await supabase.from('profiles').select('*', { count: 'exact', head: true });
    setStats({ projects: pCount || 0, messages: mCount || 0, members: tCount || 0 });
  };

  const generateInsight = async () => {
    const response = await chatWithAI("Génère une petite phrase d'insight positive (15 mots max) basée sur une entreprise tech en pleine croissance.");
    setAiInsight(response);
  };

  const statsCards = [
    { label: 'Projets Actifs', value: stats.projects, trend: '+18.4%', icon: 'fa-box', color: 'luma-purple' },
    { label: 'Messages Clients', value: stats.messages, trend: '+11.2%', icon: 'fa-envelope', color: 'luma-blue' },
    { label: 'Visites Web', value: '1,248', trend: '+22.6%', icon: 'fa-bolt', color: 'luma-pink' },
    { label: 'Satisfaction', value: '4.9/5', trend: 'Global', icon: 'fa-heart', color: 'luma-purple' },
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      {/* Welcome Heading */}
      <section>
        <h1 className="text-4xl font-display font-black tracking-tight text-white mb-2">
          Good morning, {profile?.full_name?.split(' ')[0] || 'Member'}! ✨
        </h1>
        <p className="text-white/40 font-medium">Votre console de gestion est prête pour une nouvelle journée d'innovation.</p>
      </section>

      {/* Glass Cards Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((s, i) => (
          <div key={i} className="bg-luma-card backdrop-blur-xl border border-white/5 p-6 rounded-[2rem] relative overflow-hidden group hover:border-white/10 transition-all">
             <div className="flex justify-between items-start relative z-10">
                <div className={`w-10 h-10 rounded-2xl bg-${s.color}/10 flex items-center justify-center text-${s.color}`}>
                   <i className={`fa-solid ${s.icon} text-lg`}></i>
                </div>
                <span className="text-[10px] font-bold text-moss bg-moss/10 px-2 py-1 rounded-full">{s.trend}</span>
             </div>
             <div className="mt-4 relative z-10">
                <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-1">{s.label}</p>
                <p className="text-3xl font-display font-black text-white">{s.value}</p>
             </div>
             {/* Subtle Glow Effect */}
             <div className={`absolute -bottom-10 -right-10 w-24 h-24 bg-${s.color} rounded-full blur-[60px] opacity-20 group-hover:opacity-40 transition-opacity`}></div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
         {/* Main Promo Area */}
         <div className="lg:col-span-8 bg-luma-card backdrop-blur-xl border border-white/5 rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row relative">
            <div className="p-10 flex-1 relative z-10 flex flex-col justify-center">
               <span className="text-[10px] font-black uppercase tracking-widest text-luma-purple mb-4 block">New Feature</span>
               <h2 className="text-5xl font-display font-black leading-none mb-6">Elevate Your <br/> <span className="text-luma-purple">Impact.</span></h2>
               <p className="text-white/40 text-sm leading-relaxed mb-8 max-w-xs">
                  Gérez vos projets et votre équipe avec une précision millimétrée grâce à nos outils avancés.
               </p>
               <div className="flex gap-4">
                  <button className="bg-white text-luma-dark px-6 py-3 rounded-2xl text-sm font-bold hover:bg-luma-purple hover:text-white transition-all">View Projects →</button>
                  <button className="bg-white/5 text-white px-6 py-3 rounded-2xl text-sm font-bold border border-white/10 hover:bg-white/10 transition-all">Manage Team</button>
               </div>
            </div>
            <div className="flex-1 min-h-[300px] relative">
               <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80" className="absolute inset-0 w-full h-full object-cover opacity-50" alt="" />
               <div className="absolute inset-0 bg-gradient-to-r from-[#120E1E] to-transparent"></div>
            </div>
         </div>

         {/* Right Sidebar Widgets */}
         <div className="lg:col-span-4 space-y-6">
            {/* AI Insight Card */}
            <div className="bg-luma-purple/10 border border-luma-purple/20 p-8 rounded-[2rem] relative overflow-hidden">
               <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-neon-purple rounded-lg flex items-center justify-center shadow-lg shadow-luma-purple/40">
                     <i className="fa-solid fa-sparkles text-white text-xs"></i>
                  </div>
                  <span className="font-display font-black text-sm tracking-tighter uppercase">Develite AI <span className="text-[10px] bg-luma-purple/20 text-luma-purple px-1.5 py-0.5 rounded-md ml-2">BETA</span></span>
               </div>
               <p className="text-xs text-white/60 uppercase tracking-widest font-bold mb-4 italic">Smart insights for your business</p>
               <p className="text-sm font-medium leading-relaxed mb-6">
                 "{aiInsight}"
               </p>
               <div className="flex items-center justify-between text-[10px] font-bold text-white/40 uppercase tracking-widest pt-4 border-t border-white/10">
                  <span>Efficiency Score</span>
                  <span className="text-luma-purple">98.2%</span>
               </div>
            </div>

            {/* Recommended Actions */}
            <div className="space-y-4">
               <p className="text-[11px] font-black uppercase tracking-[0.2em] text-white/20 pl-2">Recommended Actions</p>
               {[
                 { label: 'Review pending projects', icon: 'fa-star' },
                 { label: 'Check inbox analytics', icon: 'fa-chart-pie' },
                 { label: 'Update team roles', icon: 'fa-user-lock' }
               ].map((action, idx) => (
                 <button key={idx} className="w-full bg-white/5 border border-white/5 p-4 rounded-2xl flex items-center justify-between group hover:bg-white/10 hover:border-white/10 transition-all text-left">
                    <div className="flex items-center gap-3">
                       <i className={`fa-solid ${action.icon} text-white/20 group-hover:text-luma-purple`}></i>
                       <span className="text-sm font-bold text-white/60">{action.label}</span>
                    </div>
                    <i className="fa-solid fa-chevron-right text-[10px] text-white/20"></i>
                 </button>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
};

export default MainDashboard;
