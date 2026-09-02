import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

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
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateRole = async (userId, newRole) => {
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

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <section className="flex justify-between items-end">
        <div>
           <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-luma-purple mb-2">Administration</h2>
           <h1 className="font-display font-black text-4xl tracking-tight text-white">Gestion de l'Équipe</h1>
        </div>
        <button className="bg-neon-purple px-6 py-3 rounded-2xl text-sm font-bold shadow-lg shadow-luma-purple/20">Inviter un membre</button>
      </section>

      <div className="bg-luma-card backdrop-blur-xl border border-white/5 rounded-[2rem] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5 bg-white/2">
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-white/40">Membre</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-white/40">Rôle Actuel</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-white/40">Permissions</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-white/40 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr><td colSpan="4" className="px-8 py-20 text-center text-white/20">Initialisation de la matrice...</td></tr>
              ) : (
                users.map((u) => (
                  <tr key={u.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-white/5 overflow-hidden">
                           <img src={u.avatar_url || '/Heritier.jpg'} className="w-full h-full object-cover" alt="" />
                        </div>
                        <div>
                          <p className="font-bold text-sm text-white">{u.full_name}</p>
                          <p className="text-xs text-white/40 italic">{u.role}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                        u.user_role === 'admin' ? 'bg-luma-purple/20 text-luma-purple' :
                        u.user_role === 'manager' ? 'bg-luma-blue/20 text-luma-blue' :
                        'bg-white/10 text-white/40'
                      }`}>
                        {u.user_role}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                       <select
                         value={u.user_role}
                         onChange={(e) => updateRole(u.id, e.target.value)}
                         className="bg-white/5 border border-white/10 rounded-lg text-xs font-bold py-1.5 px-3 outline-none focus:border-luma-purple/40"
                       >
                          <option value="member">Member</option>
                          <option value="manager">Manager</option>
                          <option value="admin">Admin</option>
                       </select>
                    </td>
                    <td className="px-8 py-6 text-right">
                       <button className="text-white/20 hover:text-red-400 transition-colors">
                          <i className="fa-solid fa-ban"></i>
                       </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
