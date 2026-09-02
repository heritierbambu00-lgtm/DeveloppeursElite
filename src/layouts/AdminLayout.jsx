import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import Logo from '../components/Logo';

const AdminLayout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-paper flex">
      {/* Sidebar */}
      <aside className="w-64 bg-ink text-paper hidden lg:flex flex-col">
        <div className="p-8 flex items-center gap-3">
          <Logo className="w-8 h-8" />
          <span className="font-display font-bold text-lg tracking-tighter uppercase">DEVELITE</span>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1">
          <Link to="/admin" className="flex items-center gap-3 px-4 py-3 rounded-md bg-paper/10 text-paper font-medium transition-colors">
            <i className="fa-solid fa-gauge-high text-clay"></i>
            Dashboard
          </Link>
          <Link to="/admin/profile" className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-paper/5 text-paper/70 hover:text-paper transition-colors font-medium">
            <i className="fa-solid fa-user-gear"></i>
            Mon Profil
          </Link>
          <Link to="/admin/projects" className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-paper/5 text-paper/70 hover:text-paper transition-colors font-medium">
            <i className="fa-solid fa-folder-open"></i>
            Projets
          </Link>
        </nav>

        <div className="p-4 border-t border-paper/10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-md text-red-400 hover:bg-red-400/10 transition-colors font-medium"
          >
            <i className="fa-solid fa-right-from-bracket"></i>
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 bg-white border-b border-line flex items-center justify-between px-8">
          <h2 className="font-display font-bold text-xl tracking-tight">Console Administration</h2>

          <div className="flex items-center gap-4">
             <button className="lg:hidden text-ink text-2xl"><i className="fa-solid fa-bars"></i></button>
             <div className="w-8 h-8 rounded-full bg-clay/20 border border-clay grid place-items-center">
                <i className="fa-solid fa-user text-clay text-sm"></i>
             </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
