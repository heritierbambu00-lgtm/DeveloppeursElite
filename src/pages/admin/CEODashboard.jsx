import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';

const CEODashboard = ({ profile }) => {
  const [stats, setStats] = useState({ projects: 0, messages: 0, members: 0 });
  const [teamMembers, setTeamMembers] = useState([]);
  const [recentProjects, setRecentProjects] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { count: pCount } = await supabase.from('projects').select('*', { count: 'exact', head: true });
      const { count: mCount } = await supabase.from('contacts').select('*', { count: 'exact', head: true });
      const { count: tCount } = await supabase.from('profiles').select('*', { count: 'exact', head: true });

      setStats({
        projects: pCount || 0,
        messages: mCount || 0,
        members: tCount || 0
      });

      const { data: team } = await supabase
        .from('profiles')
        .select('*')
        .order('updated_at', { ascending: false })
        .limit(4);
      setTeamMembers(team || []);

      const { data: projects } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(4);
      setRecentProjects(projects || []);
    } catch (error) {
      console.error("CEO Fetch Error:", error);
    }
  };

  return (
    <div className="bg-[#F3F4F6] min-h-full -m-6 lg:-m-10 p-6 lg:p-10 text-slate-900 font-sans animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 mb-8 lg:mb-10">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-slate-900">Good morning, {profile?.full_name?.split(' ')[0]} 👋</h1>
          <p className="text-slate-500 text-sm mt-1">L'état actuel de votre espace de travail DEVELITE.</p>
        </div>
        <div className="flex items-center gap-3 bg-white border border-slate-200 px-4 py-2.5 rounded-xl shadow-sm cursor-pointer hover:bg-slate-50 transition-all w-fit">
          <i className="fa-solid fa-calendar-days text-luma-purple"></i>
          <span className="text-sm font-semibold">{new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
          <i className="fa-solid fa-chevron-down text-[10px] text-slate-400"></i>
        </div>
      </div>

      {/* Top 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8 lg:mb-10">
        {[
          { label: 'Projets Totaux', value: stats.projects, trend: 'Actif', icon: 'fa-folder-open', color: 'bg-luma-purple' },
          { label: 'Messages Clients', value: stats.messages, trend: 'Nouveau', icon: 'fa-envelope-open-text', color: 'bg-teal-500' },
          { label: 'Effectif Équipe', value: stats.members, trend: 'Stable', icon: 'fa-users', color: 'bg-amber-500' },
          { label: 'Croissance', value: '+12%', trend: 'Global', icon: 'fa-chart-line', color: 'bg-pink-500' }
        ].map((card, i) => (
          <div key={i} className="bg-white border border-slate-200 p-6 rounded-[2rem] shadow-sm hover:shadow-md transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className={`w-10 h-10 lg:w-12 lg:h-12 ${card.color} rounded-2xl flex items-center justify-center text-white shadow-lg shadow-current/20`}>
                <i className={`fa-solid ${card.icon} text-base lg:text-lg`}></i>
              </div>
              <div className="text-right">
                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">{card.label}</p>
                <p className="text-xl lg:text-2xl font-bold mt-1">{card.value}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400">
               <span className="text-emerald-500 flex items-center gap-1">
                 <i className="fa-solid fa-check-circle"></i> {card.trend}
               </span>
               <span>données temps réel</span>
            </div>
          </div>
        ))}
      </div>

      {/* Middle Row - Overview & Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-8 lg:mb-10">
         <div className="lg:col-span-2 bg-white border border-slate-200 p-6 lg:p-8 rounded-[2.5rem] shadow-sm relative overflow-hidden">
            <div className="flex justify-between items-center mb-8 relative z-10">
               <h3 className="text-lg font-bold">Aperçu de l'Activité</h3>
               <div className="flex items-center gap-3 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 text-[11px] font-bold">
                  <span>Cette Semaine</span>
                  <i className="fa-solid fa-chevron-down text-slate-400"></i>
               </div>
            </div>
            <div className="h-48 lg:h-64 flex items-end gap-1 relative z-10">
               <svg viewBox="0 0 800 200" className="w-full h-full" preserveAspectRatio="none">
                  <path
                    d="M0,150 Q100,120 200,160 T400,100 T600,130 T800,80"
                    fill="none"
                    stroke="#9E7AFF"
                    strokeWidth="4"
                    className="drop-shadow-[0_10px_10px_rgba(158,122,255,0.3)]"
                  />
                  <circle cx="200" cy="160" r="6" fill="#9E7AFF" />
                  <circle cx="400" cy="100" r="6" fill="#9E7AFF" stroke="white" strokeWidth="2" />
               </svg>
            </div>
         </div>

         <div className="bg-white border border-slate-200 p-6 lg:p-8 rounded-[2.5rem] shadow-sm">
            <div className="flex justify-between items-center mb-8">
               <h3 className="text-lg font-bold">Status des Projets</h3>
               <i className="fa-solid fa-ellipsis text-slate-300"></i>
            </div>
            <div className="flex justify-center mb-8">
               <div className="w-32 lg:w-40 h-32 lg:h-40 rounded-full border-[10px] lg:border-[12px] border-slate-50 relative flex items-center justify-center">
                  <div className="text-center">
                     <p className="text-2xl lg:text-3xl font-bold">{stats.projects}</p>
                     <p className="text-[9px] lg:text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Projets</p>
                  </div>
                  <div className="absolute inset-[-10px] lg:inset-[-12px] rounded-full border-[10px] lg:border-[12px] border-luma-purple border-t-transparent border-r-transparent border-b-transparent rotate-[45deg]"></div>
               </div>
            </div>
            <div className="space-y-3">
               {[
                 { label: 'Terminés', val: '0', color: 'bg-luma-purple' },
                 { label: 'En cours', val: stats.projects, color: 'bg-teal-500' },
                 { label: 'Revue', val: '0', color: 'bg-amber-500' }
               ].map((item, i) => (
                 <div key={i} className="flex justify-between items-center text-[11px] lg:text-xs font-semibold">
                    <div className="flex items-center gap-2">
                       <div className={`w-2 h-2 rounded-full ${item.color}`}></div>
                       <span className="text-slate-500">{item.label}</span>
                    </div>
                    <span>{item.val}</span>
                 </div>
               ))}
            </div>
         </div>
      </div>

      {/* Bottom Row - Lists */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
         {/* Recent Projects */}
         <div className="bg-white border border-slate-200 p-6 lg:p-8 rounded-[2.5rem] shadow-sm">
            <div className="flex justify-between items-center mb-6">
               <h3 className="text-lg font-bold">Projets Récents</h3>
               <Link to="/admin/projects" className="text-xs font-bold text-luma-purple hover:underline">Voir Tout</Link>
            </div>
            <div className="space-y-5">
               {recentProjects.length > 0 ? recentProjects.map((pj) => (
                 <div key={pj.id} className="flex items-center gap-4 group">
                    <div className={`w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-luma-purple border border-slate-100 group-hover:bg-luma-purple group-hover:text-white transition-all`}>
                       <i className="fa-solid fa-shapes text-sm"></i>
                    </div>
                    <div className="flex-1 min-w-0">
                       <p className="text-sm font-bold truncate">{pj.title}</p>
                       <p className="text-[10px] font-bold text-slate-400 uppercase">{pj.category}</p>
                    </div>
                    <div className="w-16 lg:w-20 bg-slate-100 h-1 rounded-full overflow-hidden">
                       <div className="bg-luma-purple h-full w-[100%]" />
                    </div>
                 </div>
               )) : <p className="text-xs text-slate-400 italic">Aucun projet récent.</p>}
            </div>
         </div>

         {/* Team Activity */}
         <div className="bg-white border border-slate-200 p-6 lg:p-8 rounded-[2.5rem] shadow-sm">
            <div className="flex justify-between items-center mb-6">
               <h3 className="text-lg font-bold">Activité Équipe</h3>
               <Link to="/admin/users" className="text-xs font-bold text-luma-purple hover:underline">Membres</Link>
            </div>
            <div className="space-y-5">
               {teamMembers.length > 0 ? teamMembers.map((tm) => (
                 <div key={tm.id} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm">
                       <img src={tm.avatar_url || '/Heritier.jpg'} className="w-full h-full object-cover" alt="" />
                    </div>
                    <div className="flex-1">
                       <p className="text-sm font-bold">{tm.full_name}</p>
                       <p className="text-[10px] text-slate-400 font-medium">{tm.role}</p>
                    </div>
                    <span className="text-[10px] font-bold text-slate-300">Actif</span>
                 </div>
               )) : <p className="text-xs text-slate-400 italic">Aucun membre.</p>}
            </div>
         </div>

         {/* Upcoming Events */}
         <div className="bg-white border border-slate-200 p-6 lg:p-8 rounded-[2.5rem] shadow-sm md:col-span-2 lg:col-span-1">
            <div className="flex justify-between items-center mb-6">
               <h3 className="text-lg font-bold">Messages récents</h3>
               <Link to="/admin/inbox" className="text-xs font-bold text-luma-purple hover:underline">Boîte mail</Link>
            </div>
            <div className="space-y-6">
               <p className="text-xs text-slate-400 italic text-center py-4">Consultez la boîte de réception pour voir les demandes clients.</p>
               <Link
                 to="/admin/inbox"
                 className="flex items-center justify-center gap-3 w-full bg-slate-50 border border-slate-200 py-3.5 rounded-2xl text-xs font-bold hover:bg-slate-100 transition-all shadow-sm"
               >
                  <i className="fa-solid fa-envelope"></i> Accéder aux messages
               </Link>
            </div>
         </div>
      </div>
    </div>
  );
};

export default CEODashboard;
