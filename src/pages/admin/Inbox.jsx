import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';

const Inbox = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  async function fetchMessages() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function markAsRead(id) {
    try {
      const { error } = await supabase
        .from('contacts')
        .update({ is_read: true })
        .eq('id', id);
      if (error) throw error;
      fetchMessages();
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div className="max-w-5xl animate-in fade-in slide-in-from-bottom-2 duration-700">
      <div className="mb-8 lg:mb-10">
        <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-luma-purple mb-2">Centre d'appels</h2>
        <h1 className="font-display font-black text-3xl lg:text-4xl text-white tracking-tight">Boîte de réception</h1>
      </div>

      <div className="bg-luma-card backdrop-blur-xl border border-white/5 rounded-[2rem] overflow-hidden shadow-2xl">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead className="bg-white/[0.02] border-b border-white/5">
              <tr className="text-[10px] font-black uppercase tracking-widest text-white/30">
                <th className="px-8 py-5">Statut</th>
                <th className="px-8 py-5">Expéditeur</th>
                <th className="px-8 py-5">Sujet</th>
                <th className="px-8 py-5">Message</th>
                <th className="px-8 py-5">Date</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr><td colSpan="6" className="px-8 py-20 text-center text-white/10 italic tracking-widest uppercase text-xs">Extraction des communications...</td></tr>
              ) : messages.length === 0 ? (
                <tr><td colSpan="6" className="px-8 py-20 text-center text-white/20 italic">Aucune transmission détectée.</td></tr>
              ) : (
                messages.map((msg) => (
                  <tr key={msg.id} className={`${msg.is_read ? 'opacity-40' : 'bg-luma-purple/5'} hover:bg-white/[0.02] transition-colors group`}>
                    <td className="px-8 py-6">
                      {!msg.is_read && <div className="w-2.5 h-2.5 rounded-full bg-luma-purple shadow-[0_0_10px_#9E7AFF] animate-pulse"></div>}
                    </td>
                    <td className="px-8 py-6">
                      <p className="font-black text-sm text-white uppercase tracking-tight">{msg.name}</p>
                      <p className="text-[10px] text-white/30 font-bold tracking-widest">{msg.email}</p>
                    </td>
                    <td className="px-8 py-6">
                       <span className="text-xs font-black text-luma-blue uppercase tracking-tighter">{msg.subject}</span>
                    </td>
                    <td className="px-8 py-6 text-sm text-white/60 max-w-xs truncate font-medium">
                       {msg.message}
                    </td>
                    <td className="px-8 py-6 text-[10px] font-black text-white/20 uppercase">
                      {new Date(msg.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-8 py-6 text-right">
                      {!msg.is_read && (
                        <button
                          onClick={() => markAsRead(msg.id)}
                          className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest text-white hover:bg-luma-purple hover:border-luma-purple transition-all"
                        >
                          Marquer lu
                        </button>
                      )}
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

export default Inbox;
