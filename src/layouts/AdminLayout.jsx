import React, { useEffect, useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import Logo from '../components/Logo';

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [profile, setProfile] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      setProfile(data);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  const menuItems = [
    { label: 'Home', icon: 'fa-house', path: '/admin', roles: ['admin', 'manager', 'member'] },
    { label: 'Projets', icon: 'fa-shapes', path: '/admin/projects', roles: ['admin', 'manager'] },
    { label: 'Messages', icon: 'fa-comment-dots', path: '/admin/inbox', roles: ['admin', 'manager'] },
    { label: 'Équipe', icon: 'fa-user-group', path: '/admin/users', roles: ['admin'] },
    { label: 'Paramètres', icon: 'fa-gear', path: '/admin/profile', roles: ['admin', 'manager', 'member'] },
  ];

  return (
    <div className="min-h-screen bg-luma-dark text-white flex font-body">
      {/* Lumaora Sidebar */}
      <aside className={`bg-[#120E1E] border-r border-white/5 transition-all duration-500 flex flex-col z-20 ${isSidebarOpen ? 'w-64' : 'w-20'}`}>
        <div className="h-20 flex items-center px-6">
          <div className="flex items-center gap-3">
             <div className="p-2 bg-neon-purple rounded-lg shadow-[0_0_15px_rgba(158,122,255,0.4)]">
                <Logo className="w-6 h-6 fill-white" />
             </div>
             {isSidebarOpen && (
               <span className="font-display font-black text-lg tracking-tighter uppercase italic">
                 LUMA<span className="text-luma-purple">ORA</span>
               </span>
             )}
          </div>
        </div>

        <nav className="flex-1 py-6 px-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            const hasAccess = item.roles.includes(profile?.user_role);

            if (!hasAccess && profile) return null;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group relative ${
                  isActive
                  ? 'bg-white/10 text-luma-purple'
                  : 'text-white/40 hover:bg-white/5 hover:text-white'
                }`}
              >
                <i className={`fa-solid ${item.icon} text-lg w-6 text-center`}></i>
                {isSidebarOpen && <span className="font-semibold text-sm">{item.label}</span>}
                {isActive && (
                  <div className="absolute left-0 w-1 h-6 bg-luma-purple rounded-r-full shadow-[0_0_10px_#9E7AFF]"></div>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-4">
           <div className="bg-luma-purple/10 rounded-2xl p-6 border border-luma-purple/20">
              {isSidebarOpen ? (
                <>
                  <p className="text-[10px] font-bold text-luma-purple uppercase tracking-widest mb-2">Upgrade Pro</p>
                  <p className="text-xs text-white/60 mb-4 leading-relaxed">Unlock advanced insights and AI automations.</p>
                  <button className="w-full bg-neon-purple py-2 rounded-xl text-xs font-bold shadow-lg shadow-luma-purple/20">Get Pro</button>
                </>
              ) : (
                <div className="text-center"><i className="fa-solid fa-crown text-luma-purple"></i></div>
              )}
           </div>
        </div>

        <div className="p-4 border-t border-white/5">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-white/40 hover:text-red-400 hover:bg-red-400/5 transition-all"
          >
            <i className="fa-solid fa-arrow-right-from-bracket w-6"></i>
            {isSidebarOpen && <span className="text-sm font-bold">Déconnexion</span>}
          </button>
        </div>
      </aside>

      {/* Main View Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-luma-gradient">
        <header className="h-20 flex items-center justify-between px-10 sticky top-0 z-10 backdrop-blur-md bg-luma-dark/50">
          <div className="flex-1 max-w-xl">
             <div className="relative group">
                <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-luma-purple transition-colors"></i>
                <input
                  type="text"
                  placeholder="Rechercher projets, ordres, clients..."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-2.5 pl-12 pr-4 text-sm outline-none focus:border-luma-purple/40 focus:bg-white/10 transition-all"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-white/20 bg-white/5 px-1.5 py-0.5 rounded-md">⌘K</div>
             </div>
          </div>

          <div className="flex items-center gap-6">
             <button className="relative text-white/40 hover:text-white transition-colors">
                <i className="fa-solid fa-bell text-xl"></i>
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-luma-dark"></span>
             </button>
             <button className="text-white/40 hover:text-white transition-colors">
                <i className="fa-solid fa-message text-xl"></i>
             </button>

             <div className="flex items-center gap-4 pl-6 border-l border-white/10">
                <div className="text-right hidden sm:block">
                   <p className="text-sm font-bold">{profile?.full_name?.split(' ')[0] || 'User'}</p>
                   <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{profile?.user_role}</p>
                </div>
                <div className="w-10 h-10 rounded-2xl p-0.5 bg-neon-purple shadow-lg shadow-luma-purple/20">
                   <div className="w-full h-full rounded-[14px] overflow-hidden bg-luma-dark">
                      <img src={profile?.avatar_url || '/Heritier.jpg'} alt="Profile" className="w-full h-full object-cover" />
                   </div>
                </div>
             </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-10">
          <Outlet context={{ profile }} />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
