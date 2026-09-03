import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

const COODashboard = ({ profile }) => {
  const [stats, setStats] = useState({ projects: 0, messages: 0, members: 0 });
  const [teamMembers, setTeamMembers] = useState([]);

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
    } catch (error) {
      console.error("COO Fetch Error:", error);
    }
  };

  return (
    <div className="bg-[#1A2624] min-h-full -m-10 p-10 text-white font-sans animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Good evening, {profile?.full_name?.split(' ')[0]}! 👋</h1>
          <p className="text-white/40 text-sm mt-1">Here's what's happening with your business today.</p>
        </div>
        <div className="flex items-center gap-6">
           <div className="relative group">
              <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-white/20"></i>
              <input type="text" placeholder="Search anything..." className="bg-white/5 border border-white/10 rounded-2xl py-2.5 pl-12 pr-4 text-sm outline-none w-64 focus:border-[#F8B3B3]/40" />
           </div>
           <div className="flex items-center gap-4">
              <i className="fa-solid fa-bell text-white/40"></i>
              <i className="fa-solid fa-sun text-white/40"></i>
           </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 mb-8">
        {/* Left Big Card - Revenue */}
        <div className="lg:col-span-4 bg-[#243331] border border-white/5 p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden group">
           <div className="flex justify-between items-center mb-6">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/40">
                 <i className="fa-solid fa-chart-line"></i>
              </div>
              <div className="text-[10px] font-bold text-white/20 uppercase border border-white/10 px-2 py-1 rounded-lg">This Month</div>
           </div>
           <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-1">Total Revenue</p>
           <p className="text-4xl font-black mb-4">$48,750</p>
           <p className="text-xs text-emerald-400 font-bold mb-8 flex items-center gap-1">
              <i className="fa-solid fa-arrow-up"></i> 16.2% from last month
           </p>
           {/* Chart Visual Simulation */}
           <div className="h-24 flex items-end gap-1 mb-8">
              <svg viewBox="0 0 400 100" className="w-full">
                 <path d="M0,80 Q100,20 200,60 T400,30" fill="none" stroke="#F8B3B3" strokeWidth="3" />
                 <circle cx="200" cy="60" r="4" fill="#F8B3B3" />
              </svg>
           </div>
           <button className="w-full bg-white text-[#1A2624] py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-[#F8B3B3] transition-all">View Report →</button>
        </div>

        {/* Middle Card - Collection */}
        <div className="lg:col-span-4 bg-white p-8 rounded-[2.5rem] shadow-xl flex flex-col justify-between text-[#1A2624] relative overflow-hidden">
           <div>
              <div className="flex justify-between items-center mb-4">
                 <p className="text-[10px] font-black uppercase text-slate-400">Currently Running</p>
                 <i className="fa-solid fa-ellipsis text-slate-300"></i>
              </div>
              <h2 className="text-3xl font-black leading-tight mb-8">Spring Collection <br/> Campaign 🌸</h2>
              <div className="space-y-6">
                 <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                    <span className="text-xs font-bold text-slate-400">Budget</span>
                    <span className="text-sm font-black">$12,000</span>
                 </div>
                 <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                    <span className="text-xs font-bold text-slate-400">Progress</span>
                    <span className="text-sm font-black">68%</span>
                 </div>
                 <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-400">Reach</span>
                    <span className="text-sm font-black">32.5K</span>
                 </div>
              </div>
           </div>
           <button className="text-xs font-bold text-slate-400 hover:text-[#1A2624] mt-8">View Campaign →</button>
           {/* Flower Decoration */}
           <div className="absolute right-[-20px] bottom-[-20px] opacity-10 rotate-[-15deg]">
              <i className="fa-solid fa-leaf text-[200px] text-[#243331]"></i>
           </div>
        </div>

        {/* Right Card - Calendar */}
        <div className="lg:col-span-4 bg-white p-8 rounded-[2.5rem] shadow-xl text-[#1A2624]">
           <div className="flex justify-between items-center mb-6">
              <h3 className="font-black">May 2025</h3>
              <div className="flex gap-2">
                 <i className="fa-solid fa-chevron-left text-xs text-slate-300"></i>
                 <i className="fa-solid fa-chevron-right text-xs text-slate-300"></i>
              </div>
           </div>
           <div className="grid grid-cols-7 text-center text-[10px] font-black text-slate-300 mb-4 uppercase tracking-tighter">
              <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
           </div>
           <div className="grid grid-cols-7 text-center text-xs font-black mb-8">
              <span>12</span><span>13</span><span>14</span><span className="bg-[#1A2624] text-white w-6 h-6 rounded-full flex items-center justify-center mx-auto">15</span><span>16</span><span>17</span><span>18</span>
           </div>
           <div className="space-y-4">
              {[
                { time: '10:00 AM', title: 'Client Meeting', sub: 'Zoom Meeting', icon: 'fa-video', color: 'bg-slate-50' },
                { time: '01:30 PM', title: 'Design Review', sub: 'Main Conference Room', icon: 'fa-pen-ruler', color: 'bg-slate-50' }
              ].map((ev, i) => (
                <div key={i} className="flex gap-4">
                   <span className="text-[10px] font-black text-slate-300 w-16">{ev.time}</span>
                   <div className={`flex-1 ${ev.color} p-3 rounded-2xl border border-slate-100`}>
                      <div className="flex justify-between items-start">
                         <div>
                            <p className="text-xs font-black leading-none">{ev.title}</p>
                            <p className="text-[9px] font-bold text-slate-400 mt-1">{ev.sub}</p>
                         </div>
                         <i className={`fa-solid ${ev.icon} text-[10px] text-slate-300`}></i>
                      </div>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </div>

      {/* Action Buttons Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 mb-8">
         {[
           { label: 'Create Campaign', icon: 'fa-plus' },
           { label: 'Add Client', icon: 'fa-user-plus' },
           { label: 'New Project', icon: 'fa-folder' },
           { label: 'Send Invoice', icon: 'fa-file-invoice-dollar' },
           { label: 'Generate Report', icon: 'fa-chart-pie' }
         ].map((action, i) => (
           <button key={i} className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm hover:shadow-md hover:scale-[1.02] transition-all text-[#1A2624]">
              <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center mx-auto mb-3 text-[#F8B3B3]">
                 <i className={`fa-solid ${action.icon}`}></i>
              </div>
              <p className="text-[10px] font-black uppercase tracking-tighter text-center">{action.label}</p>
           </button>
         ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
         {/* Projects Overview */}
         <div className="bg-white border border-slate-200 p-8 rounded-[2.5rem] shadow-sm text-[#1A2624]">
            <div className="flex justify-between items-center mb-8">
               <h3 className="font-black">Projects Overview</h3>
               <button className="text-[10px] font-black text-slate-400 uppercase hover:underline">View All Projects</button>
            </div>
            <div className="space-y-6">
               {[
                 { name: 'Website Redesign', val: '72%', color: 'bg-luma-purple' },
                 { name: 'Brand Identity', val: '45%', color: 'bg-pink-400' },
                 { name: 'Marketing Campaign', val: '90%', color: 'bg-amber-400' }
               ].map((p, i) => (
                 <div key={i} className="space-y-2">
                    <div className="flex justify-between text-xs font-black">
                       <span>{p.name}</span>
                       <span className="text-slate-400">{p.val}</span>
                    </div>
                    <div className="h-1.5 bg-slate-50 rounded-full overflow-hidden">
                       <div className={`${p.color} h-full`} style={{ width: p.val }}></div>
                    </div>
                 </div>
               ))}
            </div>
         </div>

         {/* Finance Snapshot */}
         <div className="bg-white border border-slate-200 p-8 rounded-[2.5rem] shadow-sm text-[#1A2624]">
            <div className="flex justify-between items-center mb-8">
               <h3 className="font-black">Finance Snapshot</h3>
               <button className="text-[10px] font-black text-slate-400 uppercase hover:underline">View Details</button>
            </div>
            <div className="text-center py-4">
               <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-[10px] font-black mb-4 uppercase">+$6,240</div>
               <p className="text-4xl font-black">$24,680</p>
               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Total Profit</p>
            </div>
            {/* Visual Wave Simulation */}
            <div className="h-20 flex items-end justify-center mt-6">
               <svg viewBox="0 0 200 60" className="w-full">
                  <path d="M0,50 Q50,20 100,45 T200,30 V60 H0 Z" fill="#F1F5F9" />
               </svg>
            </div>
         </div>

         {/* Team Activity */}
         <div className="bg-white border border-slate-200 p-8 rounded-[2.5rem] shadow-sm text-[#1A2624]">
            <div className="flex justify-between items-center mb-6">
               <h3 className="font-black">Team Activity</h3>
               <button className="text-[10px] font-black text-slate-400 uppercase hover:underline">View All</button>
            </div>
            <div className="space-y-6">
               {teamMembers.map((tm) => (
                 <div key={tm.id} className="flex items-center gap-4">
                    <img src={tm.avatar_url || '/Heritier.jpg'} className="w-9 h-9 rounded-full object-cover border-2 border-white shadow-sm" alt="" />
                    <div className="flex-1">
                       <p className="text-xs font-black">{tm.full_name}</p>
                       <p className="text-[9px] text-slate-400 font-bold uppercase">{tm.role}</p>
                    </div>
                    <span className="text-[9px] font-black text-slate-300">2m ago</span>
                 </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
};

export default COODashboard;
