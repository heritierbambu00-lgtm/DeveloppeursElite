import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

const MemberDashboard = ({ profile }) => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchMyProjects();
  }, []);

  const fetchMyProjects = async () => {
    const { data } = await supabase.from('projects').select('*').limit(3);
    setProjects(data || []);
  };

  return (
    <div className="bg-[#F6F8FF] min-h-full -m-6 lg:-m-10 p-6 lg:p-10 text-[#1F1D2C] font-sans animate-in fade-in duration-700 overflow-x-hidden">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 mb-10">
        <div className="flex items-center gap-4">
           <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-200 shrink-0">
              <i className="fa-solid fa-bolt-lightning"></i>
           </div>
           <div>
              <h1 className="text-2xl lg:text-3xl font-black tracking-tight">Bonjour, {profile?.full_name?.split(' ')[0]}! 👋</h1>
              <p className="text-slate-400 text-sm font-bold">Continuons à bâtir l'avenir aujourd'hui.</p>
           </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-4 lg:gap-6">
           <div className="relative w-full sm:w-auto">
              <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"></i>
              <input type="text" placeholder="Rechercher..." className="bg-white border border-slate-100 rounded-2xl py-2.5 pl-12 pr-4 text-sm outline-none w-full sm:w-64 shadow-sm" />
           </div>
           <button className="bg-indigo-600 text-white px-6 py-3 rounded-2xl text-xs font-black shadow-xl shadow-indigo-100 flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all w-full sm:w-auto shrink-0">
              <i className="fa-solid fa-plus"></i> Nouveau Projet
           </button>
        </div>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-10">
        {[
          { label: 'Active Projects', value: '12', trend: '+2 this week', icon: 'fa-box-open', color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { label: 'Tasks Done', value: '76%', trend: '+8% this week', icon: 'fa-check-double', color: 'text-emerald-500', bg: 'bg-emerald-50' },
          { label: 'Focus Time', value: '18h 40m', trend: '+2h this week', icon: 'fa-clock', color: 'text-blue-500', bg: 'bg-blue-50' },
          { label: 'Team Availability', value: '82%', trend: 'Matrice Active', icon: 'fa-user-clock', color: 'text-amber-500', bg: 'bg-amber-50' }
        ].map((card, i) => (
          <div key={i} className="bg-white p-6 lg:p-8 rounded-[2rem] lg:rounded-[2.5rem] shadow-sm border border-slate-50 group hover:shadow-md transition-all">
             <div className="flex justify-between items-start mb-6">
                <div className={`w-10 lg:w-12 h-10 lg:h-12 ${card.bg} rounded-2xl flex items-center justify-center ${card.color}`}>
                   <i className={`fa-solid ${card.icon} text-base lg:text-lg`}></i>
                </div>
                <div className="text-right">
                   <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest leading-none">{card.label}</p>
                   <p className="text-2xl lg:text-3xl font-black mt-2 leading-none">{card.value}</p>
                </div>
             </div>
             <div className="flex items-center gap-2 text-[10px] font-black text-slate-300 uppercase tracking-widest">
                <i className="fa-solid fa-arrow-trend-up text-emerald-400"></i>
                <span>{card.trend}</span>
             </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
         {/* Main Workspace Card */}
         <div className="lg:col-span-8 space-y-6 lg:space-y-8">
            <div className="bg-[#121124] p-8 lg:p-12 rounded-[2.5rem] lg:rounded-[3rem] text-white relative overflow-hidden group shadow-2xl">
               <div className="relative z-10 max-w-sm">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400 mb-6 block">Workspace Overview</p>
                  <h2 className="text-3xl lg:text-4xl font-black leading-tight mb-8 lg:mb-10 tracking-tight italic">All your projects, <br/>smartly organized.</h2>

                  <div className="mb-8 lg:mb-10">
                     <p className="text-[10px] font-black uppercase text-white/30 mb-2">Current Project</p>
                     <p className="text-xl lg:text-2xl font-bold mb-4">Elysian Website Redesign</p>
                     <div className="flex items-center gap-4">
                        <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                           <div className="bg-indigo-500 h-full w-[68%]" />
                        </div>
                        <span className="text-xs font-black text-white/40">68%</span>
                     </div>
                  </div>

                  <button className="bg-indigo-600 text-white px-8 lg:px-10 py-3.5 lg:py-4 rounded-xl lg:rounded-[1.5rem] text-xs lg:text-sm font-black shadow-2xl shadow-indigo-900/50 hover:bg-indigo-500 transition-all flex items-center gap-3">
                     Open Workspace <i className="fa-solid fa-arrow-right"></i>
                  </button>
               </div>

               {/* Design Illustration Decoration - Responsive scale */}
               <div className="hidden md:block absolute right-0 top-0 h-full w-1/2 overflow-hidden opacity-40">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-white/10 rounded-full animate-[spin_20s_linear_infinite]" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-white/5 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
               </div>
            </div>

            {/* Quick Actions */}
            <div>
               <p className="text-[10px] lg:text-[11px] font-black uppercase tracking-[0.2em] text-slate-300 mb-6 pl-2">Quick Actions</p>
               <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 lg:gap-6">
                  {[
                    { label: 'Create Project', icon: 'fa-plus', color: 'text-indigo-600', bg: 'bg-indigo-50' },
                    { label: 'Upload File', icon: 'fa-arrow-up-from-bracket', color: 'text-emerald-500', bg: 'bg-emerald-50' },
                    { label: 'Start Timer', icon: 'fa-clock', color: 'text-amber-500', bg: 'bg-amber-50' },
                    { label: 'New Note', icon: 'fa-file-lines', color: 'text-blue-500', bg: 'bg-blue-50' }
                  ].map((action, i) => (
                    <button key={i} className="bg-white p-5 lg:p-6 rounded-[2rem] shadow-sm border border-slate-50 flex flex-col items-center hover:shadow-md transition-all group">
                       <div className={`w-10 lg:w-12 h-10 lg:h-12 ${action.bg} ${action.color} rounded-2xl flex items-center justify-center mb-3 lg:mb-4 group-hover:scale-110 transition-transform`}>
                          <i className={`fa-solid ${action.icon} text-base lg:text-lg`}></i>
                       </div>
                       <p className="text-[9px] lg:text-[10px] font-black uppercase tracking-tighter text-slate-600 text-center">{action.label}</p>
                    </button>
                  ))}
               </div>
            </div>
         </div>

         {/* Right Sidebar Widgets */}
         <div className="lg:col-span-4 space-y-6 lg:space-y-8">
            {/* AI Copilot Widget */}
            <div className="bg-white p-8 lg:p-10 rounded-[2.5rem] lg:rounded-[3rem] shadow-xl border border-slate-50 relative overflow-hidden">
               <div className="flex items-center gap-3 mb-8">
                  <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-100">
                     <i className="fa-solid fa-sparkles text-white text-xs"></i>
                  </div>
                  <span className="font-black text-sm uppercase tracking-tighter italic">AI Copilot <span className="text-[10px] text-indigo-400 bg-indigo-50 px-1.5 py-0.5 rounded-md ml-1 font-black">BETA</span></span>
               </div>
               <p className="text-sm font-bold mb-8 leading-relaxed">Salut {profile?.full_name?.split(' ')[0]}, comment puis-je t'aider ?</p>
               <div className="space-y-3 mb-8">
                  {[
                    'Summarize updates',
                    'Generate ideas'
                  ].map((hint, i) => (
                    <button key={i} className="w-full text-left p-3.5 rounded-xl lg:rounded-2xl bg-slate-50 border border-slate-100 text-[10px] lg:text-xs font-bold text-slate-500 flex items-center gap-3 hover:bg-indigo-50 transition-all">
                       <i className="fa-solid fa-plus-circle text-slate-200"></i>
                       {hint}
                    </button>
                  ))}
               </div>
               <div className="relative">
                  <input type="text" placeholder="Ask anything..." className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3.5 lg:py-4 px-5 lg:px-6 text-sm outline-none focus:border-indigo-200" />
                  <button className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 lg:w-10 lg:h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                     <i className="fa-solid fa-paper-plane text-[10px]"></i>
                  </button>
               </div>
            </div>

            {/* Progress Circle - Responsive */}
            <div className="bg-white p-8 rounded-[2.5rem] lg:rounded-[3rem] shadow-sm border border-slate-50">
               <div className="flex justify-between items-center mb-8">
                  <h3 className="font-black">Your Progress</h3>
                  <i className="fa-solid fa-chevron-down text-slate-300 text-[10px]"></i>
               </div>
               <div className="flex justify-center mb-8 relative">
                  <div className="w-36 lg:w-48 h-36 lg:h-48 rounded-full border-[10px] lg:border-[15px] border-slate-50 flex items-center justify-center">
                     <div className="text-center">
                        <p className="text-3xl lg:text-4xl font-black">78%</p>
                        <p className="text-[9px] lg:text-[10px] font-black text-slate-300 uppercase tracking-widest">Efficiency</p>
                     </div>
                  </div>
                  <div className="absolute inset-0 rounded-full border-[10px] lg:border-[15px] border-indigo-600 border-t-transparent border-r-transparent" />
               </div>
               <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'Completed', val: '28 tasks', color: 'bg-indigo-600' },
                    { label: 'In Progress', val: '12 tasks', color: 'bg-teal-500' }
                  ].map((item, i) => (
                    <div key={i}>
                       <div className="flex items-center gap-2 mb-1">
                          <div className={`w-1.5 h-1.5 rounded-full ${item.color}`} />
                          <span className="text-[9px] lg:text-[10px] font-black uppercase text-slate-300 tracking-widest">{item.label}</span>
                       </div>
                       <p className="text-[11px] lg:text-xs font-bold text-slate-600">{item.val}</p>
                    </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default MemberDashboard;
