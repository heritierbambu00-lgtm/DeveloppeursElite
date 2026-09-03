import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';

const COODashboard = ({ profile }) => {
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

  return (
    <div className="bg-[#1A2624] min-h-full -m-10 p-10 text-white font-sans animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Good evening, {profile?.full_name?.split(' ')[0]}! 👋</h1>
          <p className="text-white/40 text-sm mt-1">Here's what's happening with your workspace today.</p>
        </div>
        <div className="flex items-center gap-6">
           <div className="relative group">
              <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-white/20"></i>
              <input type="text" placeholder="Search anything..." className="bg-white/5 border border-white/10 rounded-2xl py-2.5 pl-12 pr-4 text-sm outline-none w-64 focus:border-[#F8B3B3]/40 transition-all" />
           </div>
           <div className="flex items-center gap-4">
              <button className="text-white/40 hover:text-white"><i className="fa-solid fa-bell text-xl"></i></button>
              <button className="text-white/40 hover:text-white"><i className="fa-solid fa-sun text-xl"></i></button>
           </div>
        </div>
      </div>

      {/* RE-POSITIONED ACTION BUTTONS (TOP) */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 mb-10">
         {[
           { label: 'Create Campaign', icon: 'fa-plus', path: '#' },
           { label: 'Add Client', icon: 'fa-user-plus', path: '/admin/inbox' },
           { label: 'New Project', icon: 'fa-folder', path: '/admin/projects' },
           { label: 'Send Invoice', icon: 'fa-file-invoice-dollar', path: '#' },
           { label: 'Generate Report', icon: 'fa-chart-pie', path: '#' }
         ].map((action, i) => (
           <Link key={i} to={action.path} className="bg-white border border-slate-200 p-6 rounded-[2rem] shadow-sm hover:shadow-md hover:scale-[1.02] transition-all text-[#1A2624] flex flex-col items-center group">
              <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center mb-4 text-[#F8B3B3] group-hover:bg-[#F8B3B3] group-hover:text-white transition-colors">
                 <i className={`fa-solid ${action.icon} text-lg`}></i>
              </div>
              <p className="text-[10px] font-black uppercase tracking-tighter text-center">{action.label}</p>
           </Link>
         ))}
      </div>

      {/* Main Metric Cards */}
      <div className="grid lg:grid-cols-12 gap-8 mb-10">
        {/* Total Revenue */}
        <div className="lg:col-span-4 bg-[#243331] border border-white/5 p-8 rounded-[3rem] shadow-xl relative overflow-hidden group">
           <div className="flex justify-between items-center mb-8">
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white/40 border border-white/10">
                 <i className="fa-solid fa-chart-line text-xl"></i>
              </div>
              <div className="text-[10px] font-black text-white/20 uppercase border border-white/10 px-3 py-1.5 rounded-xl tracking-widest">This Month</div>
           </div>
           <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-2">Total Revenue</p>
           <p className="text-5xl font-black mb-6 tracking-tighter">$48,750</p>
           <p className="text-xs text-emerald-400 font-bold flex items-center gap-2 mb-10">
              <i className="fa-solid fa-arrow-up"></i> 16.2% from last month
           </p>
           <div className="h-28 flex items-end w-full mb-8">
              <svg viewBox="0 0 400 100" className="w-full h-full opacity-80">
                 <path d="M0,80 Q50,20 100,70 T200,40 T300,90 T400,30" fill="none" stroke="#F8B3B3" strokeWidth="4" />
                 <circle cx="200" cy="40" r="5" fill="#F8B3B3" stroke="#243331" strokeWidth="2" />
              </svg>
           </div>
           <button className="w-full bg-white text-[#1A2624] py-4 rounded-[1.5rem] font-black text-xs uppercase tracking-widest hover:bg-[#F8B3B3] hover:text-white transition-all">View Report →</button>
        </div>

        {/* Spring Campaign Card */}
        <div className="lg:col-span-4 bg-white p-10 rounded-[3rem] shadow-xl flex flex-col justify-between text-[#1A2624] relative overflow-hidden">
           <div>
              <div className="flex justify-between items-center mb-6">
                 <p className="text-[11px] font-black uppercase text-slate-300 tracking-widest">Currently Running</p>
                 <i className="fa-solid fa-ellipsis-vertical text-slate-200"></i>
              </div>
              <h2 className="text-4xl font-black leading-none mb-10 tracking-tight">Spring Collection <br/> Campaign 🌸</h2>
              <div className="space-y-6">
                 <div className="flex justify-between items-center border-b border-slate-50 pb-4">
                    <div className="flex items-center gap-3">
                       <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400"><i className="fa-solid fa-wallet text-xs"></i></div>
                       <span className="text-xs font-bold text-slate-400">Budget</span>
                    </div>
                    <span className="text-sm font-black tracking-tight">$12,000</span>
                 </div>
                 <div className="flex justify-between items-center border-b border-slate-50 pb-4">
                    <div className="flex items-center gap-3">
                       <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400"><i className="fa-solid fa-spinner text-xs"></i></div>
                       <span className="text-xs font-bold text-slate-400">Progress</span>
                    </div>
                    <span className="text-sm font-black tracking-tight">68%</span>
                 </div>
                 <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                       <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400"><i className="fa-solid fa-users text-xs"></i></div>
                       <span className="text-xs font-bold text-slate-400">Reach</span>
                    </div>
                    <span className="text-sm font-black tracking-tight">32.5K</span>
                 </div>
              </div>
           </div>
           <button className="text-[11px] font-black text-slate-300 uppercase tracking-widest hover:text-[#1A2624] mt-10 transition-colors">View Campaign →</button>
           <div className="absolute right-[-40px] bottom-[-40px] opacity-[0.03] rotate-[-15deg] pointer-events-none">
              <i className="fa-solid fa-leaf text-[250px] text-[#243331]"></i>
           </div>
        </div>

        {/* Calendar Card */}
        <div className="lg:col-span-4 bg-white p-8 rounded-[3rem] shadow-xl text-[#1A2624]">
           <div className="flex justify-between items-center mb-8 px-2">
              <h3 className="font-black text-lg">May 2025</h3>
              <div className="flex gap-4">
                 <button className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 hover:bg-slate-100 transition-all"><i className="fa-solid fa-chevron-left text-[10px]"></i></button>
                 <button className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 hover:bg-slate-100 transition-all"><i className="fa-solid fa-chevron-right text-[10px]"></i></button>
              </div>
           </div>
           <div className="grid grid-cols-7 text-center text-[11px] font-black text-slate-300 mb-6 uppercase">
              <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
           </div>
           <div className="grid grid-cols-7 text-center text-xs font-black mb-10">
              {['12','13','14','15','16','17','18'].map(d => (
                <span key={d} className={`w-8 h-8 flex items-center justify-center mx-auto rounded-full transition-all ${d === '15' ? 'bg-[#1A2624] text-white shadow-lg' : 'hover:bg-slate-50 cursor-pointer'}`}>{d}</span>
              ))}
           </div>
           <div className="space-y-4">
              {[
                { time: '10:00 AM', title: 'Client Meeting', sub: 'Zoom Meeting', icon: 'fa-video', color: 'bg-[#F9FAFB]' },
                { time: '01:30 PM', title: 'Design Review', sub: 'Conference Room 2', icon: 'fa-pen-ruler', color: 'bg-[#F9FAFB]' }
              ].map((ev, i) => (
                <div key={i} className="flex gap-4 group cursor-pointer">
                   <span className="text-[10px] font-black text-slate-300 w-16 pt-3">{ev.time}</span>
                   <div className={`flex-1 ${ev.color} p-4 rounded-2xl border border-slate-100 group-hover:border-slate-200 transition-all`}>
                      <div className="flex justify-between items-start">
                         <div>
                            <p className="text-[11px] font-black leading-none">{ev.title}</p>
                            <p className="text-[9px] font-bold text-slate-400 mt-1.5">{ev.sub}</p>
                         </div>
                         <i className={`fa-solid ${ev.icon} text-[11px] text-slate-200 group-hover:text-luma-purple transition-colors`}></i>
                      </div>
                   </div>
                </div>
              ))}
           </div>
           <button className="w-full mt-6 text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] hover:text-[#1A2624] transition-colors">View Full Calendar →</button>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
         <div className="bg-white border border-slate-200 p-8 rounded-[2.5rem] shadow-sm text-[#1A2624]">
            <div className="flex justify-between items-center mb-8">
               <h3 className="font-black">Projects Overview</h3>
               <Link to="/admin/projects" className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-luma-purple transition-colors">View All Projects</Link>
            </div>
            <div className="space-y-8">
               {[
                 { name: 'Website Redesign', val: '72%', color: 'bg-luma-purple' },
                 { name: 'Brand Identity', val: '45%', color: 'bg-pink-400' },
                 { name: 'Marketing Campaign', val: '90%', color: 'bg-amber-400' }
               ].map((p, i) => (
                 <div key={i} className="space-y-3">
                    <div className="flex justify-between text-xs font-black">
                       <span className="tracking-tight">{p.name}</span>
                       <span className="text-slate-400">{p.val}</span>
                    </div>
                    <div className="h-2 bg-slate-50 rounded-full overflow-hidden">
                       <div className={`${p.color} h-full rounded-full`} style={{ width: p.val }}></div>
                    </div>
                 </div>
               ))}
            </div>
         </div>

         <div className="bg-white border border-slate-200 p-8 rounded-[2.5rem] shadow-sm text-[#1A2624]">
            <div className="flex justify-between items-center mb-8">
               <h3 className="font-black">Finance Snapshot</h3>
               <button className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-luma-purple transition-colors">View Details</button>
            </div>
            <div className="text-center py-6">
               <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-600 px-4 py-1.5 rounded-full text-[10px] font-black mb-6 uppercase border border-emerald-100">+$6,240</div>
               <p className="text-5xl font-black tracking-tighter">$24,680</p>
               <p className="text-[11px] font-bold text-slate-300 uppercase tracking-[0.2em] mt-2">Total Profit</p>
            </div>
            <div className="h-24 flex items-end justify-center mt-6">
               <svg viewBox="0 0 200 60" className="w-full h-full opacity-50">
                  <path d="M0,50 Q40,10 80,45 T160,20 T200,40 V60 H0 Z" fill="#F1F5F9" stroke="#E2E8F0" strokeWidth="2" />
               </svg>
            </div>
         </div>

         <div className="bg-white border border-slate-200 p-8 rounded-[2.5rem] shadow-sm text-[#1A2624]">
            <div className="flex justify-between items-center mb-8">
               <h3 className="font-black">Team Activity</h3>
               <Link to="/admin/users" className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-luma-purple transition-colors">View All</Link>
            </div>
            <div className="space-y-6">
               {teamMembers.length > 0 ? teamMembers.map((tm) => (
                 <div key={tm.id} className="flex items-center gap-4 group cursor-pointer">
                    <div className="w-11 h-11 rounded-2xl overflow-hidden border-2 border-white shadow-md group-hover:scale-105 transition-transform">
                       <img src={tm.avatar_url || '/Heritier.jpg'} className="w-full h-full object-cover" alt="" />
                    </div>
                    <div className="flex-1">
                       <p className="text-xs font-black tracking-tight">{tm.full_name}</p>
                       <p className="text-[10px] text-slate-400 font-bold uppercase truncate">{tm.role}</p>
                    </div>
                    <span className="text-[9px] font-black text-slate-200 uppercase">Active</span>
                 </div>
               )) : <p className="text-xs text-slate-300 italic">No activity detected.</p>}
            </div>
         </div>
      </div>
    </div>
  );
};

export default COODashboard;
