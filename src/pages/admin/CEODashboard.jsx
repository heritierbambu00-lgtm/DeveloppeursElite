import React, { useEffect, useState } from 'react';
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
    <div className="bg-[#F9FAFB] min-h-full -m-10 p-10 text-slate-900 font-sans animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Good morning, {profile?.full_name?.split(' ')[0]} 👋</h1>
          <p className="text-slate-500 text-sm mt-1">Here's what's happening with your workspace today.</p>
        </div>
        <div className="flex items-center gap-3 bg-white border border-slate-200 px-4 py-2 rounded-xl shadow-sm cursor-pointer hover:bg-slate-50 transition-all">
          <i className="fa-solid fa-calendar-days text-luma-purple"></i>
          <span className="text-sm font-semibold">May 18 - May 24, 2024</span>
          <i className="fa-solid fa-chevron-down text-[10px] text-slate-400"></i>
        </div>
      </div>

      {/* Top 4 Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Total Projects', value: stats.projects, trend: '12%', icon: 'fa-folder-open', color: 'bg-luma-purple' },
          { label: 'Tasks Completed', value: '78%', trend: '8%', icon: 'fa-square-check', color: 'bg-teal-500' },
          { label: 'Team Productivity', value: '92%', trend: '5%', icon: 'fa-users', color: 'bg-amber-500' },
          { label: 'Total Revenue', value: '$48,750', trend: '16%', icon: 'fa-dollar-sign', color: 'bg-pink-500' }
        ].map((card, i) => (
          <div key={i} className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm hover:shadow-md transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className={`w-12 h-12 ${card.color} rounded-2xl flex items-center justify-center text-white shadow-lg shadow-current/20`}>
                <i className={`fa-solid ${card.icon} text-lg`}></i>
              </div>
              <div className="text-right">
                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">{card.label}</p>
                <p className="text-2xl font-bold mt-1">{card.value}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400">
               <span className="text-emerald-500 flex items-center gap-1">
                 <i className="fa-solid fa-arrow-up"></i> {card.trend}
               </span>
               <span>from last week</span>
            </div>
          </div>
        ))}
      </div>

      {/* Middle Row - Overview & Chart */}
      <div className="grid lg:grid-cols-3 gap-8 mb-8">
         <div className="lg:col-span-2 bg-white border border-slate-200 p-8 rounded-[2.5rem] shadow-sm relative overflow-hidden">
            <div className="flex justify-between items-center mb-8 relative z-10">
               <h3 className="text-lg font-bold">Project Overview</h3>
               <div className="flex items-center gap-3 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 text-[11px] font-bold">
                  <span>This Week</span>
                  <i className="fa-solid fa-chevron-down text-slate-400"></i>
               </div>
            </div>
            {/* SVG Visual Graph Placeholder */}
            <div className="h-64 flex items-end gap-1 relative z-10">
               <svg viewBox="0 0 800 200" className="w-full h-full">
                  <path
                    d="M0,150 Q100,120 200,160 T400,100 T600,130 T800,80"
                    fill="none"
                    stroke="#9E7AFF"
                    strokeWidth="4"
                    className="drop-shadow-[0_10px_10px_rgba(158,122,255,0.3)]"
                  />
                  {/* Decorative dots */}
                  <circle cx="200" cy="160" r="6" fill="#9E7AFF" />
                  <circle cx="400" cy="100" r="6" fill="#9E7AFF" stroke="white" strokeWidth="2" />
               </svg>
            </div>
         </div>

         <div className="bg-white border border-slate-200 p-8 rounded-[2.5rem] shadow-sm">
            <div className="flex justify-between items-center mb-8">
               <h3 className="text-lg font-bold">Tasks by Status</h3>
               <i className="fa-solid fa-ellipsis text-slate-300"></i>
            </div>
            <div className="flex justify-center mb-8">
               <div className="w-40 h-40 rounded-full border-[12px] border-slate-50 relative flex items-center justify-center">
                  <div className="text-center">
                     <p className="text-3xl font-bold">120</p>
                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Tasks</p>
                  </div>
                  {/* Segmented Borders (CSS Simulation) */}
                  <div className="absolute inset-[-12px] rounded-full border-[12px] border-luma-purple border-t-transparent border-r-transparent border-b-transparent rotate-[45deg]"></div>
               </div>
            </div>
            <div className="space-y-3">
               {[
                 { label: 'Completed', val: '45 (37.5%)', color: 'bg-luma-purple' },
                 { label: 'In Progress', val: '35 (29.2%)', color: 'bg-teal-500' },
                 { label: 'Review', val: '20 (16.7%)', color: 'bg-amber-500' }
               ].map((item, i) => (
                 <div key={i} className="flex justify-between items-center text-xs font-semibold">
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
      <div className="grid lg:grid-cols-3 gap-8">
         {/* Recent Projects */}
         <div className="bg-white border border-slate-200 p-8 rounded-[2.5rem] shadow-sm">
            <div className="flex justify-between items-center mb-6">
               <h3 className="text-lg font-bold">Recent Projects</h3>
               <button className="text-xs font-bold text-luma-purple hover:underline">View All</button>
            </div>
            <div className="space-y-5">
               {recentProjects.map((pj) => (
                 <div key={pj.id} className="flex items-center gap-4 group">
                    <div className={`w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-luma-purple border border-slate-100 group-hover:bg-luma-purple group-hover:text-white transition-all`}>
                       <i className="fa-solid fa-shapes text-sm"></i>
                    </div>
                    <div className="flex-1 min-w-0">
                       <p className="text-sm font-bold truncate">{pj.title}</p>
                       <p className="text-[10px] font-bold text-slate-400 uppercase">{pj.category}</p>
                    </div>
                    <div className="w-20 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                       <div className="bg-luma-purple h-full w-[75%]" />
                    </div>
                 </div>
               ))}
            </div>
         </div>

         {/* Team Activity */}
         <div className="bg-white border border-slate-200 p-8 rounded-[2.5rem] shadow-sm">
            <div className="flex justify-between items-center mb-6">
               <h3 className="text-lg font-bold">Team Activity</h3>
               <button className="text-xs font-bold text-luma-purple hover:underline">View All</button>
            </div>
            <div className="space-y-5">
               {teamMembers.map((tm) => (
                 <div key={tm.id} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm">
                       <img src={tm.avatar_url || '/Heritier.jpg'} className="w-full h-full object-cover" alt="" />
                    </div>
                    <div className="flex-1">
                       <p className="text-sm font-bold">{tm.full_name}</p>
                       <p className="text-[10px] text-slate-400 font-medium">Updated their technical profile</p>
                    </div>
                    <span className="text-[10px] font-bold text-slate-300">2m ago</span>
                 </div>
               ))}
            </div>
         </div>

         {/* Upcoming Events */}
         <div className="bg-white border border-slate-200 p-8 rounded-[2.5rem] shadow-sm">
            <div className="flex justify-between items-center mb-6">
               <h3 className="text-lg font-bold">Upcoming Events</h3>
               <button className="text-xs font-bold text-luma-purple hover:underline">View Calendar</button>
            </div>
            <div className="space-y-6">
               {[
                 { day: '20', month: 'MAY', title: 'Project Review Meeting', time: '10:00 AM - 11:00 AM', avatars: ['/Heritier.jpg', '/justin.jpeg', '/Jospin.jpeg'] },
                 { day: '22', month: 'MAY', title: 'Design System Update', time: '2:00 PM - 3:30 PM', avatars: ['/justin.jpeg', '/Jospin.jpeg'] },
               ].map((event, i) => (
                 <div key={i} className="flex gap-4">
                    <div className="flex flex-col items-center justify-center w-12 h-14 bg-slate-50 rounded-2xl border border-slate-100">
                       <span className="text-sm font-black leading-none">{event.day}</span>
                       <span className="text-[9px] font-black text-slate-400">{event.month}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                       <p className="text-sm font-bold truncate leading-none">{event.title}</p>
                       <p className="text-[10px] font-bold text-slate-400 mt-1">{event.time}</p>
                       <div className="flex -space-x-2 mt-2">
                          {event.avatars.map((av, j) => (
                            <img key={j} src={av} className="w-5 h-5 rounded-full border-2 border-white object-cover shadow-sm" alt="" />
                          ))}
                          <div className="w-5 h-5 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[8px] font-black">+3</div>
                       </div>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
};

export default CEODashboard;
