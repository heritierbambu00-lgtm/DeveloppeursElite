import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

const MainDashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });
  }, []);

  return (
    <div className="max-w-5xl">
      <div className="mb-10">
        <h1 className="font-display font-bold text-3xl tracking-tight text-ink">
          Bienvenue, {user?.email?.split('@')[0] || 'Membre'}
        </h1>
        <p className="text-smoke mt-2">Voici ce qui se passe chez DEVELITE TECH aujourd'hui.</p>
      </div>

      <div className="grid sm:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-lg border border-line shadow-sm">
          <p className="text-[11px] font-bold uppercase tracking-widest text-smoke mb-2">Projets Actifs</p>
          <p className="text-3xl font-display font-bold text-ink">08</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-line shadow-sm">
          <p className="text-[11px] font-bold uppercase tracking-widest text-smoke mb-2">Visites (24h)</p>
          <p className="text-3xl font-display font-bold text-ink">1.2k</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-line shadow-sm">
          <p className="text-[11px] font-bold uppercase tracking-widest text-smoke mb-2">Demandes Contact</p>
          <p className="text-3xl font-display font-bold text-ink">03</p>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-line shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-line bg-paper/50 flex justify-between items-center">
          <h3 className="font-display font-bold text-lg">Activités récentes</h3>
          <button className="text-[11px] font-bold text-clay uppercase tracking-widest hover:text-clayd">Voir tout</button>
        </div>
        <div className="p-6">
          <ul className="space-y-4">
            <li className="flex items-center gap-4 text-sm pb-4 border-b border-line last:border-0 last:pb-0">
               <div className="w-2 h-2 rounded-full bg-clay"></div>
               <span className="flex-1 font-medium text-ink">Mise à jour du design système effectuée</span>
               <span className="text-smoke text-[11px]">Il y a 2h</span>
            </li>
            <li className="flex items-center gap-4 text-sm pb-4 border-b border-line last:border-0 last:pb-0">
               <div className="w-2 h-2 rounded-full bg-moss"></div>
               <span className="flex-1 font-medium text-ink">Nouveau projet "AgroTech" ajouté par Justin</span>
               <span className="text-smoke text-[11px]">Hier</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;
