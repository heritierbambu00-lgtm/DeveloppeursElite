import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { sendReplyEmail } from '../../lib/emailService';

const Inbox = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [replyModal, setReplyModal] = useState({ isOpen: false, msg: null, text: '', sending: false });

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
      console.error(error.message);
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

  async function deleteMessage(id) {
    if (!window.confirm("Supprimer définitivement cette transmission ?")) return;
    try {
      const { error } = await supabase.from('contacts').delete().eq('id', id);
      if (error) throw error;
      fetchMessages();
    } catch (error) {
      alert(error.message);
    }
  }

  const handleReply = async (e) => {
    e.preventDefault();
    setReplyModal(prev => ({ ...prev, sending: true }));
    try {
      await sendReplyEmail(replyModal.msg.email, replyModal.msg.name, replyModal.text);
      alert(`Réponse envoyée avec succès à ${replyModal.msg.name}`);
      setReplyModal({ isOpen: false, msg: null, text: '', sending: false });
      // Mark as read after replying
      markAsRead(replyModal.msg.id);
    } catch (error) {
      alert(`Erreur d'envoi : ${error.message}`);
      setReplyModal(prev => ({ ...prev, sending: false }));
    }
  };

  return (
    <div className="max-w-6xl animate-in fade-in slide-in-from-bottom-2 duration-700">
      <div className="mb-8 lg:mb-10">
        <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-luma-purple mb-2">Centre de Comm</h2>
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
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr><td colSpan="5" className="px-8 py-20 text-center text-white/10 italic tracking-widest uppercase text-xs">Extraction des signaux...</td></tr>
              ) : messages.length === 0 ? (
                <tr><td colSpan="5" className="px-8 py-20 text-center text-white/20 italic">Silence radio. Aucun message.</td></tr>
              ) : (
                messages.map((msg) => (
                  <tr key={msg.id} className={`${msg.is_read ? 'opacity-40' : 'bg-luma-purple/5'} hover:bg-white/[0.02] transition-colors group`}>
                    <td className="px-8 py-6">
                      {!msg.is_read && <div className="w-2 h-2 rounded-full bg-luma-purple shadow-[0_0_8px_#9E7AFF]"></div>}
                    </td>
                    <td className="px-8 py-6">
                      <p className="font-black text-sm text-white uppercase tracking-tight">{msg.name}</p>
                      <p className="text-[10px] text-white/30 font-bold tracking-widest">{msg.email}</p>
                    </td>
                    <td className="px-8 py-6">
                       <span className="text-[10px] font-black text-luma-blue uppercase tracking-tighter bg-luma-blue/10 px-2 py-1 rounded border border-luma-blue/20">{msg.subject}</span>
                    </td>
                    <td className="px-8 py-6 text-sm text-white/60 max-w-xs truncate font-medium">
                       {msg.message}
                    </td>
                    <td className="px-8 py-6 text-right space-x-2">
                       {!msg.is_read && (
                         <button onClick={() => markAsRead(msg.id)} className="w-9 h-9 rounded-xl bg-white/5 text-white/40 hover:text-luma-purple transition-all" title="Lu">
                           <i className="fa-solid fa-check text-xs"></i>
                         </button>
                       )}
                       <button onClick={() => setReplyModal({ isOpen: true, msg, text: '', sending: false })} className="w-9 h-9 rounded-xl bg-white/5 text-white/40 hover:text-emerald-400 transition-all" title="Répondre">
                         <i className="fa-solid fa-reply text-xs"></i>
                       </button>
                       <button onClick={() => deleteMessage(msg.id)} className="w-9 h-9 rounded-xl bg-white/5 text-white/40 hover:text-red-500 transition-all" title="Supprimer">
                         <i className="fa-solid fa-trash-can text-xs"></i>
                       </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* REPLY MODAL */}
      {replyModal.isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center px-6">
           <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => !replyModal.sending && setReplyModal(prev => ({...prev, isOpen: false}))}></div>
           <div className="relative bg-[#120E1E] border border-white/10 p-10 rounded-[2.5rem] w-full max-w-lg shadow-2xl animate-in zoom-in-95 duration-300">
              <h3 className="text-2xl font-display font-black text-white mb-2 uppercase italic">Répondre à {replyModal.msg.name}</h3>
              <p className="text-white/30 text-xs font-bold uppercase tracking-widest mb-8">Liaison directe via Resend Matrice</p>

              <form onSubmit={handleReply} className="space-y-6">
                 <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                    <p className="text-[10px] font-black text-white/20 uppercase mb-2">Message Reçu :</p>
                    <p className="text-sm text-white/60 italic">"{replyModal.msg.message}"</p>
                 </div>

                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-luma-purple ml-2">Votre Réponse</label>
                    <textarea
                      required autoFocus rows="5"
                      value={replyModal.text}
                      onChange={e => setReplyModal({...replyModal, text: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 p-5 rounded-[1.5rem] outline-none focus:border-luma-purple/40 text-white font-medium resize-none text-sm"
                      placeholder="Tapez votre réponse ici..."
                    ></textarea>
                 </div>

                 <button type="submit" disabled={replyModal.sending || !replyModal.text.trim()}
                    className="w-full bg-neon-purple text-white p-5 rounded-[1.5rem] font-black text-sm uppercase tracking-[0.2em] shadow-xl shadow-luma-purple/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-4">
                    {replyModal.sending ? (
                      <><i className="fa-solid fa-circle-notch fa-spin"></i> Transmission...</>
                    ) : (
                      <><i className="fa-solid fa-paper-plane"></i> Envoyer la réponse</>
                    )}
                 </button>
              </form>
           </div>
        </div>
      )}
    </div>
  );
};

export default Inbox;
