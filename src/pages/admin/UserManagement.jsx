import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';

const UserManagement = () => {
  const { profile: currentUser } = useOutletContext();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUserData, setNewUserData] = useState({ email: '', fullName: '', role: 'member' });
  const [isInviting, setIsInviting] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('user_role', { ascending: true });

      if (error) throw error;
      setUsers(data || []);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateRole = async (userId, newRole) => {
    if (currentUser.user_role !== 'CTO') return;
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ user_role: newRole })
        .eq('id', userId);

      if (error) throw error;
      fetchUsers();
    } catch (error) {
      alert(error.message);
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    setIsInviting(true);

    // Note: To invite a real user via email, you typically use supabase.auth.admin
    // which requires a service_role key. In a frontend app, we usually create a
    // 'pre-profile' or instruct the admin to use the Supabase dashboard for auth.

    alert(`Instruction : Pour inviter ${newUserData.email}, veuillez utiliser l'onglet 'Authentication' de votre console Supabase. Une fois son compte créé, son profil apparaîtra ici.`);

    setIsInviting(false);
    setIsModalOpen(false);
  };

  const isCTO = currentUser?.user_role === 'CTO';

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <section className="flex justify-between items-end">
        <div>
           <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-luma-purple mb-2">Administration Élite</h2>
           <h1 className="font-display font-black text-4xl tracking-tight text-white">Gestion de l'Équipe</h1>
        </div>
        {isCTO && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-neon-purple px-8 py-3 rounded-2xl text-sm font-black shadow-lg shadow-luma-purple/20 hover:scale-105 transition-all"
          >
            Ajouter personnel
          </button>
        )}
      </section>

      <div className="bg-luma-card backdrop-blur-xl border border-white/5 rounded-[2rem] overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.02]">
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-white/40">Membre Technologique</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-white/40">Titre / Rang</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-white/40">Privilèges Système</th>
                {isCTO && <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-white/40 text-right">Actions</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr><td colSpan="4" className="px-8 py-20 text-center text-white/10 italic">Lecture de la base de données...</td></tr>
              ) : (
                users.map((u) => (
                  <tr key={u.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl p-0.5 bg-gradient-to-br from-white/10 to-transparent">
                           <div className="w-full h-full rounded-[14px] overflow-hidden bg-luma-dark">
                              <img src={u.avatar_url || '/Heritier.jpg'} className="w-full h-full object-cover" alt="" />
                           </div>
                        </div>
                        <div>
                          <p className="font-black text-sm text-white uppercase tracking-tight">{u.full_name || 'Utilisateur Anonyme'}</p>
                          <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest mt-1">{u.role || 'Poste non défini'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`inline-block px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                        u.user_role === 'CEO' ? 'bg-clay/20 text-clay border border-clay/20' :
                        u.user_role === 'CTO' ? 'bg-luma-purple/20 text-luma-purple border border-luma-purple/20' :
                        u.user_role === 'COO' ? 'bg-luma-blue/20 text-luma-blue border border-luma-blue/20' :
                        'bg-white/5 text-white/40'
                      }`}>
                        {u.user_role}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                       {isCTO ? (
                         <select
                           value={u.user_role}
                           onChange={(e) => updateRole(u.id, e.target.value)}
                           className="bg-white/5 border border-white/10 rounded-xl text-[11px] font-black uppercase tracking-widest py-2 px-4 outline-none focus:border-luma-purple/40 text-white/60 hover:text-white transition-all cursor-pointer"
                         >
                            <option value="member">MEMBER</option>
                            <option value="manager">MANAGER</option>
                            <option value="COO">COO</option>
                            <option value="CTO">CTO</option>
                            <option value="CEO">CEO</option>
                         </select>
                       ) : (
                         <span className="text-[10px] font-bold text-white/20 italic uppercase tracking-widest">Lecture seule</span>
                       )}
                    </td>
                    {isCTO && (
                      <td className="px-8 py-6 text-right">
                         <button className="w-10 h-10 rounded-xl flex items-center justify-center text-white/20 hover:text-red-400 hover:bg-red-400/5 transition-all">
                            <i className="fa-solid fa-user-slash text-sm"></i>
                         </button>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ADD USER MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
           <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setIsModalOpen(false)}></div>
           <div className="relative bg-[#120E1E] border border-white/10 p-10 rounded-[3rem] w-full max-w-lg shadow-2xl animate-in zoom-in-95 duration-300">
              <h3 className="text-2xl font-display font-black text-white mb-2">Ajouter personnel</h3>
              <p className="text-white/40 text-sm mb-8">Veuillez renseigner les informations d'accès pour le nouveau membre de la matrice.</p>

              <form onSubmit={handleAddUser} className="space-y-6">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/20 ml-2">Email Professionnel</label>
                    <input
                      required type="email"
                      className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-luma-purple/40 text-white font-bold"
                      placeholder="nom@deve-lite.tech"
                    />
                 </div>

                 <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-white/20 ml-2">Rang Système</label>
                       <select className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-luma-purple/40 text-white font-bold appearance-none">
                          <option value="member">MEMBER</option>
                          <option value="manager">MANAGER</option>
                          <option value="COO">COO</option>
                       </select>
                    </div>
                    <div className="space-y-2 flex flex-col justify-end">
                       <button type="submit" className="w-full bg-white text-luma-dark p-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-luma-purple hover:text-white transition-all shadow-xl shadow-white/5">
                          Confirmer l'ajout
                       </button>
                    </div>
                 </div>
              </form>
           </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
