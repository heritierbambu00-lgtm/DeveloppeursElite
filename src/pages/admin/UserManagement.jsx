import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';

const UserManagement = () => {
  const { profile: currentUser } = useOutletContext();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  // Full Form State
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    jobTitle: '',
    bio: '',
    icon: 'fa-code',
    systemRole: 'member'
  });

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
    setIsCreating(true);

    try {
      // 1. Create Auth User
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (authError) throw authError;

      if (authData.user) {
        // 2. Create Profile entry
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([{
            id: authData.user.id,
            full_name: formData.fullName,
            role: formData.jobTitle,
            bio: formData.bio,
            icon: formData.icon,
            user_role: formData.systemRole
          }]);

        if (profileError) throw profileError;

        alert(`Membre ${formData.fullName} ajouté avec succès !`);
        setIsModalOpen(false);
        setFormData({ email: '', password: '', fullName: '', jobTitle: '', bio: '', icon: 'fa-code', systemRole: 'member' });
        fetchUsers();
      }
    } catch (error) {
      alert(`Erreur: ${error.message}`);
    } finally {
      setIsCreating(false);
    }
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
                        'bg-white/10 text-white/40'
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

      {/* ADD USER MODAL - FULL FORM */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
           <div className="absolute inset-0 bg-black/80 backdrop-blur-lg" onClick={() => !isCreating && setIsModalOpen(false)}></div>
           <div className="relative bg-[#120E1E] border border-white/10 p-10 rounded-[3rem] w-full max-w-2xl shadow-2xl animate-in zoom-in-95 duration-300 overflow-y-auto max-h-[90vh] custom-scrollbar">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h3 className="text-3xl font-display font-black text-white mb-2 tracking-tight uppercase italic">Ajouter personnel</h3>
                  <p className="text-white/40 text-sm">Initialisation d'une nouvelle unité dans la matrice DEVELITE.</p>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="text-white/20 hover:text-white transition-colors">
                  <i className="fa-solid fa-xmark text-2xl"></i>
                </button>
              </div>

              <form onSubmit={handleAddUser} className="grid md:grid-cols-2 gap-8">
                 {/* Auth Section */}
                 <div className="space-y-6">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-luma-purple border-b border-white/5 pb-2">Identifiants d'accès</p>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-white/20 ml-2">Email Professionnel</label>
                       <input
                         required type="email"
                         value={formData.email}
                         onChange={e => setFormData({...formData, email: e.target.value})}
                         className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-luma-purple/40 text-white font-bold"
                         placeholder="nom@deve-lite.tech"
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-white/20 ml-2">Mot de passe</label>
                       <input
                         required type="password"
                         value={formData.password}
                         onChange={e => setFormData({...formData, password: e.target.value})}
                         className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-luma-purple/40 text-white font-bold"
                         placeholder="••••••••"
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-white/20 ml-2">Rang Système</label>
                       <select
                         value={formData.systemRole}
                         onChange={e => setFormData({...formData, systemRole: e.target.value})}
                         className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-luma-purple/40 text-white font-bold appearance-none cursor-pointer"
                       >
                          <option value="member">MEMBER</option>
                          <option value="manager">MANAGER</option>
                          <option value="COO">COO</option>
                       </select>
                    </div>
                 </div>

                 {/* Profile Section */}
                 <div className="space-y-6">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-luma-blue border-b border-white/5 pb-2">Fiche d'identité</p>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-white/20 ml-2">Nom Complet</label>
                       <input
                         required type="text"
                         value={formData.fullName}
                         onChange={e => setFormData({...formData, fullName: e.target.value})}
                         className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-luma-blue/40 text-white font-bold"
                         placeholder="Jean Dupont"
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-white/20 ml-2">Titre / Poste</label>
                       <input
                         required type="text"
                         value={formData.jobTitle}
                         onChange={e => setFormData({...formData, jobTitle: e.target.value})}
                         className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-luma-blue/40 text-white font-bold"
                         placeholder="Full-Stack Dev"
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-white/20 ml-2">Icône Favoris</label>
                       <input
                         type="text"
                         value={formData.icon}
                         onChange={e => setFormData({...formData, icon: e.target.value})}
                         className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-luma-blue/40 text-white font-bold"
                         placeholder="fa-code"
                       />
                    </div>
                 </div>

                 {/* Full width Bio */}
                 <div className="md:col-span-2 space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/20 ml-2">Biographie Technique</label>
                    <textarea
                      rows="3"
                      value={formData.bio}
                      onChange={e => setFormData({...formData, bio: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-luma-purple/40 text-white font-medium resize-none"
                      placeholder="Décrivez l'expertise de cette unité..."
                    ></textarea>
                 </div>

                 <div className="md:col-span-2 pt-4">
                    <button
                      type="submit"
                      disabled={isCreating}
                      className="w-full bg-neon-purple text-white p-5 rounded-[1.5rem] font-black text-sm uppercase tracking-[0.2em] shadow-2xl shadow-luma-purple/30 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-4"
                    >
                       {isCreating ? (
                         <>
                           <i className="fa-solid fa-circle-notch fa-spin"></i>
                           Synchronisation...
                         </>
                       ) : (
                         <>
                           <i className="fa-solid fa-user-plus"></i>
                           Finaliser l'ajout du personnel
                         </>
                       )}
                    </button>
                 </div>
              </form>
           </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
