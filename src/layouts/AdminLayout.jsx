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
    { label: 'Vue d\'ensemble', icon: 'fa-gauge-high', path: '/admin', roles: ['admin', 'manager', 'member'] },
    { label: 'Gestion Projets', icon: 'fa-folder-tree', path: '/admin/projects', roles: ['admin', 'manager'] },
    { label: 'Boîte de réception', icon: 'fa-envelope-open-text', path: '/admin/inbox', roles: ['admin', 'manager'] },
    { label: 'Équipe & Profils', icon: 'fa-users-gear', path: '/admin/profile', roles: ['admin', 'manager', 'member'] },
  ];

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex">
      {/* Dynamic Sidebar */}
      <aside className={`bg-ink text-paper transition-all duration-300 flex flex-col ${isSidebarOpen ? 'w-64' : 'w-20'}`}>
        <div className="h-16 flex items-center px-6 border-b border-paper/10">
          <Logo className="w-8 h-8 shrink-0" />
          {isSidebarOpen && (
            <span className="ml-3 font-display font-bold text-lg tracking-tighter uppercase overflow-hidden whitespace-nowrap">
              DEVELITE <span className="text-clay">TECH</span>
            </span>
          )}
        </div>

        <nav className="flex-1 py-6 px-3 space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            const hasAccess = item.roles.includes(profile?.user_role);

            if (!hasAccess && profile) return null;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                  isActive
                  ? 'bg-clay text-white shadow-lg shadow-clay/20'
                  : 'text-paper/60 hover:bg-paper/5 hover:text-paper'
                }`}
              >
                <i className={`fa-solid ${item.icon} text-[17px] w-5 text-center`}></i>
                {isSidebarOpen && <span className="font-medium text-[14px]">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-paper/10">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="w-full flex items-center justify-center gap-3 px-3 py-2 rounded-lg text-paper/40 hover:bg-paper/5 hover:text-paper transition-all"
          >
            <i className={`fa-solid ${isSidebarOpen ? 'fa-angles-left' : 'fa-angles-right'}`}></i>
          </button>

          <button
            onClick={handleLogout}
            className="mt-2 w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-400 hover:bg-red-400/10 transition-colors group"
          >
            <i className="fa-solid fa-power-off w-5 text-center"></i>
            {isSidebarOpen && <span className="font-semibold text-sm uppercase tracking-wider">Quitter</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-line flex items-center justify-between px-8 sticky top-0 z-10">
          <div>
             <h1 className="font-display font-bold text-lg text-ink hidden sm:block">
               {menuItems.find(m => m.path === location.pathname)?.label || 'Console'}
             </h1>
          </div>

          <div className="flex items-center gap-5">
             <div className="hidden sm:flex flex-col items-end">
                <p className="text-[13px] font-bold text-ink leading-none">{profile?.full_name || 'Chargement...'}</p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-clay mt-1">
                  {profile?.user_role === 'admin' ? 'Super Admin (CEO)' : profile?.user_role}
                </p>
             </div>
             <div className="w-10 h-10 rounded-lg border border-line bg-paper overflow-hidden">
                {profile?.avatar_url ? (
                  <img src={profile.avatar_url} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-clay/10 text-clay">
                     <i className="fa-solid fa-user"></i>
                  </div>
                )}
             </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 sm:p-10">
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            <Outlet context={{ profile }} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
