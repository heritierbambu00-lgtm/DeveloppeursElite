import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';

const COODashboard = ({ profile }) => {
  const [stats, setStats] = useState({ projects: 0, messages: 0, members: 0 });
  const [teamMembers, setTeamMembers] = useState([]);
  const [recentProjects, setRecentProjects] = useState([]);

  // Date Logic
  const today = new Date();
  const currentMonth = today.toLocaleString('fr-FR', { month: 'long' });
  const currentYear = today.getFullYear();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { count: pCount } = await supabase.from('projects').select('*', { count: 'exact', head: true });
      const { count: mCount } = await supabase.from('contacts').select('*', { count: 'exact', head: true });
      const { data: team } = await supabase
        .from('profiles')
        .select('*')
        .order('updated_at', { ascending: false })
        .limit(4);

      setStats({ projects: pCount || 0, messages: mCount || 0, members: team?.length || 0 });
      setTeamMembers(team || []);

      const { data: projects } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(3);
      setRecentProjects(projects || []);
    } catch (error) {
      console.error("COO Fetch Error:", error);
    }
  };

  const getWeekDays = () => {
    const days = [];
    for (let i = -3; i <= 3; i++) {
      const d = new Date();
      d.setDate(today.getDate() + i);
      days.push({
        num: d.getDate(),
        isToday: d.getDate() === today.getDate() && d.getMonth() === today.getMonth()
      });
    }
    return days;
  };

  return (
    <div className="bg-[#1A2624] min-h-full -m-6 lg:-m-10 p-6 lg:p-10 text-white font-sans animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 mb-10">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">Bonjour, {profile?.full_name?.split(' ')[0]}! 👋</h1>
          <p className="text-white/40 text-sm mt-1">Voici l'état opérationnel de la matrice aujourd'hui.</p>
        </div>
        <div className="flex items-center gap-4 lg:gap-6">
           <div className="hidden sm:block relative group flex-1 md:flex-none">
              <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-white/20"></i>
              <input type="text" placeholder="Rechercher..." className="bg-white/5 border border-white/10 rounded-2xl py-2.5 pl-12 pr-4 text-sm outline-none w-full md:w-64 focus:border-[#F8B3B3]/40 transition-all" />
           </div>
           <div className="flex items-center gap-4 text-white/40">
              <i className="fa-solid fa-bell text-xl hover:text-white cursor-pointer transition-colors"></i>
              <i className="fa-solid fa-sun text-xl hover:text-white cursor-pointer transition-colors"></i>
           </div>
        </div>
      </div>

      {/* ACTION BUTTONS - Fully Responsive */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4 lg:gap-6 mb-10">
         {[
           { label: 'Créer Campagne', icon: 'fa-plus', path: '#' },
           { label: 'Gestion Contacts', icon: 'fa-user-plus', path: '/admin/inbox' },
           { label: 'Nouveau Projet', icon: 'fa-folder', path: '/admin/projects' },
           { label: 'Facturation', icon: 'fa-file-invoice-dollar', path: '#' },
           { label: 'Rapport Global', icon: 'fa-chart-pie', path: '#' }
         ].map((action, i) => (
           <Link key={i} to={action.path} className="bg-white border border-slate-200 p-6 rounded-[2rem] shadow-sm hover:shadow-md hover:scale-[1.02] transition-all text-[#1A2624] flex flex-col items-center group">
              <div className="w-10 lg:w-12 h-10 lg:h-12 bg-slate-50 rounded-2xl flex items-center justify-center mb-4 text-[#F8B3B3] group-hover:bg-[#F8B3B3] group-hover:text-white transition-colors">
                 <i className={`fa-solid ${action.icon} text-lg`}></i>
              </div>
              <p className="text-[10px] font-black uppercase tracking-tighter text-center">{action.label}</p>
           </Link>
         ))}
      </div>

      {/* Main Metric Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 mb-10">
        {/* Total Revenue */}
        <div className="lg:col-span-12 xl:col-span-4 bg-[#243331] border border-white/5 p-6 lg:p-8 rounded-[3rem] shadow-xl relative overflow-hidden group">
           <div className="flex justify-between items-center mb-6">
              <div className="w-10 lg:w-12 h-10 lg:h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white/40 border border-white/10">
                 <i className="fa-solid fa-chart-line text-lg"></i>
              </div>
              <div className="text-[10px] font-black text-white/20 uppercase border border-white/10 px-3 py-1.5 rounded-xl tracking-widest">Période : {currentMonth}</div>
           </div>
           <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-2">Chiffre d'Affaires</p>
           <p className="text-4xl lg:text-5xl font-black mb-6 tracking-tighter">0.00 $</p>
           <p className="text-xs text-white/20 font-bold flex items-center gap-2 mb-8 italic">
              <i className="fa-solid fa-sync fa-spin text-[10px]"></i> En attente de synchronisation
           </p>
           <div className="h-20 lg:h-28 flex items-end w-full mb-6">
              <svg viewBox="0 0 400 100" className="w-full h-full opacity-20">
                 <path d="M0,90 L400,90" fill="none" stroke="#F8B3B3" strokeWidth="2" strokeDasharray="4 4" />
              </svg>
           </div>
           <button className="w-full bg-white/10 text-white/40 py-4 rounded-[1.5rem] font-black text-[10px] lg:text-xs uppercase tracking-widest cursor-not-allowed">Aucun rapport disponible</button>
        </div>

        {/* Campaign Card */}
        <div className="lg:col-span-6 xl:col-span-4 bg-white p-6 lg:p-10 rounded-[3rem] shadow-xl flex flex-col justify-between text-[#1A2624] relative overflow-hidden">
           <div>
              <div className="flex justify-between items-center mb-6">
                 <p className="text-[10px] lg:text-[11px] font-black uppercase text-slate-300 tracking-widest">Flux Opérationnel</p>
                 <i className="fa-solid fa-ellipsis-vertical text-slate-200"></i>
              </div>
              <h2 className="text-3xl lg:text-4xl font-black leading-none mb-8 lg:mb-10 tracking-tight italic">Optimisation <br/> Continue ⚡</h2>
              <div className="space-y-4 lg:space-y-6">
                 {[
                   { label: 'Statut Système', val: 'Optimal', icon: 'fa-circle-nodes', color: 'text-emerald-500' },
                   { label: 'Nodes Actifs', val: `${stats.members} Unités`, icon: 'fa-microchip' },
                   { label: 'Intégrité', val: '100%', icon: 'fa-database' }
                 ].map((item, i) => (
                   <div key={i} className="flex justify-between items-center border-b border-slate-50 pb-4 last:border-0 last:pb-0">
                      <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400"><i className={`fa-solid ${item.icon} text-xs`}></i></div>
                         <span className="text-xs font-bold text-slate-400">{item.label}</span>
                      </div>
                      <span className={`text-[10px] lg:text-sm font-black ${item.color || ''}`}>{item.val}</span>
                   </div>
                 ))}
              </div>
           </div>
           <div className="absolute right-[-40px] bottom-[-40px] opacity-[0.03] rotate-[-15deg] pointer-events-none">
              <i className="fa-solid fa-leaf text-[200px] lg:text-[250px] text-[#243331]"></i>
           </div>
        </div>

        {/* Calendar Card */}
        <div className="lg:col-span-6 xl:col-span-4 bg-white p-6 lg:p-8 rounded-[3rem] shadow-xl text-[#1A2624]">
           <div className="flex justify-between items-center mb-6">
              <h3 className="font-black text-lg capitalize">{currentMonth} {currentYear}</h3>
              <div className="flex gap-2 lg:gap-4">
                 <button className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-300"><i className="fa-solid fa-chevron-left text-[10px]"></i></button>
                 <button className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-300"><i className="fa-solid fa-chevron-right text-[10px]"></i></button>
              </div>
           </div>
           <div className="grid grid-cols-7 text-center text-[10px] font-black text-slate-300 mb-6 uppercase">
              {['Lun','Mar','Mer','Jeu','Ven','Sam','Dim'].map(day => <span key={day}>{day}</span>)}
           </div>
           <div className="grid grid-cols-7 text-center text-xs font-black mb-8 lg:mb-10">
              {getWeekDays().map((d, i) => (
                <span key={i} className={`w-8 h-8 flex items-center justify-center mx-auto rounded-full transition-all ${d.isToday ? 'bg-[#1A2624] text-white shadow-lg' : 'text-slate-400'}`}>
                  {d.num}
                </span>
              ))}
           </div>
           <div className="space-y-4">
              <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest border-b border-slate-50 pb-2 mb-4">Aujourd'hui</p>
              <div className="p-6 rounded-[2rem] bg-slate-50 border border-slate-100 border-dashed text-center">
                 <p className="text-[10px] lg:text-xs font-bold text-slate-400 italic">Aucun événement programmé</p>
              </div>
           </div>
        </div>
      </div>

      {/* Bottom Grid - Responsive */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
         <div className="bg-white border border-slate-200 p-6 lg:p-8 rounded-[2.5rem] shadow-sm text-[#1A2624]">
            <div className="flex justify-between items-center mb-8">
               <h3 className="font-black">Projets</h3>
               <Link to="/admin/projects" className="text-[9px] lg:text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-luma-purple">Tout voir</Link>
            </div>
            <div className="space-y-6 lg:space-y-8">
               {recentProjects.length > 0 ? recentProjects.map((p, i) => (
                 <div key={i} className="space-y-2 lg:space-y-3">
                    <div className="flex justify-between text-[11px] lg:text-xs font-black">
                       <span className="truncate max-w-[150px]">{p.title}</span>
                       <span className="text-slate-400 text-[10px]">100%</span>
                    </div>
                    <div className="h-1.5 lg:h-2 bg-slate-50 rounded-full overflow-hidden">
                       <div className="bg-luma-purple h-full rounded-full w-full"></div>
                    </div>
                 </div>
               )) : <p className="text-xs text-slate-300 italic text-center py-4">Aucun projet actif.</p>}
            </div>
         </div>

         <div className="bg-white border border-slate-200 p-6 lg:p-8 rounded-[2.5rem] shadow-sm text-[#1A2624]">
            <div className="flex justify-between items-center mb-8">
               <h3 className="font-black">Finance</h3>
               <button className="text-[10px] font-black text-slate-400 uppercase tracking-widest cursor-not-allowed">Détails</button>
            </div>
            <div className="text-center py-4 lg:py-6">
               <div className="inline-flex items-center gap-2 bg-slate-50 text-slate-300 px-4 py-1.5 rounded-full text-[9px] lg:text-[10px] font-black mb-6 uppercase border border-slate-100">Synchronisation...</div>
               <p className="text-4xl lg:text-5xl font-black tracking-tighter opacity-10">0.00 $</p>
               <p className="text-[10px] font-bold text-slate-200 uppercase tracking-[0.2em] mt-2">Bénéfice Net</p>
            </div>
         </div>

         <div className="bg-white border border-slate-200 p-6 lg:p-8 rounded-[2.5rem] shadow-sm text-[#1A2624] md:col-span-2 lg:col-span-1">
            <div className="flex justify-between items-center mb-8">
               <h3 className="font-black">Équipe</h3>
               <Link to="/admin/users" className="text-[9px] lg:text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-luma-purple">Voir Tout</Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-1 gap-4 lg:gap-6">
               {teamMembers.length > 0 ? teamMembers.map((tm) => (
                 <div key={tm.id} className="flex items-center gap-3 lg:gap-4 group cursor-pointer">
                    <div className="w-10 h-10 lg:w-11 lg:h-11 rounded-2xl overflow-hidden border-2 border-white shadow-sm shrink-0">
                       <img src={tm.avatar_url || '/Heritier.jpg'} className="w-full h-full object-cover" alt="" />
                    </div>
                    <div className="flex-1 min-w-0">
                       <p className="text-[11px] lg:text-xs font-black tracking-tight truncate">{tm.full_name}</p>
                       <p className="text-[9px] text-slate-400 font-bold uppercase truncate">{tm.role}</p>
                    </div>
                 </div>
               )) : <p className="text-xs text-slate-300 italic w-full text-center">Lecture de la matrice...</p>}
            </div>
         </div>
      </div>
    </div>
  );
};

export default COODashboard;
