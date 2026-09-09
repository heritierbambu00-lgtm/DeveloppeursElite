import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { sendReplyEmail } from '../../lib/emailService';

const Inbox = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [replyModal, setReplyModal] = useState({ isOpen: false, msg: null, text: '', sending: false });
  const [detailsModal, setDetailsModal] = useState({ isOpen: false, msg: null });

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
      setMessages(prev => prev.map(m => m.id === id ? { ...m, is_read: true } : m));
    } catch (error) {
      alert(error.message);
    }
  }

  async function deleteMessage(id) {
    if (!window.confirm("Supprimer définitivement cette transmission ?")) return;
    try {
      const { error } = await supabase.from('contacts').delete().eq('id', id);
      if (error) throw error;
      setMessages(prev => prev.filter(m => m.id !== id));
      if (detailsModal.isOpen) setDetailsModal({ isOpen: false, msg: null });
    } catch (error) {
      alert(`Erreur suppression: ${error.message}`);
    }
  }

  async function updateStatus(id, newStatus) {
    await supabase.from('contacts').update({ status: newStatus }).eq('id', id);
    fetchMessages();
  }

  async function updateValue(id, value) {
    await supabase.from('contacts').update({ estimated_value: value }).eq('id', id);
    fetchMessages();
  }

  const handleReply = async (e) => {
    e.preventDefault();
    setReplyModal(prev => ({ ...prev, sending: true }));
    try {
      await sendReplyEmail(replyModal.msg.email, replyModal.msg.name, replyModal.text);
      alert(`Réponse transmise avec succès.`);

      // Optionnel: marquer comme lu après réponse
      if (!replyModal.msg.is_read) {
        await markAsRead(replyModal.msg.id);
      }

      setReplyModal({ isOpen: false, msg: null, text: '', sending: false });
      fetchMessages();
    } catch (err) {
      alert(`ERREUR TRANSMISSION : ${err.message}. \nNote : Vérifiez la configuration de votre proxy API (/api/send-email) sur Vercel.`);
      setReplyModal(prev => ({ ...prev, sending: false }));
    }
  };

  const STATUS_COLORS = {
    'new': 'bg-luma-blue/10 text-luma-blue',
    'warm': 'bg-amber-500/10 text-amber-500',
    'hot': 'bg-red-500/10 text-red-500',
    'signed': 'bg-moss/10 text-moss',
    'rejected': 'bg-white/5 text-white/20'
  };

  return (
    <div className="max-w-6xl animate-in fade-in slide-in-from-bottom-2 duration-700">
      <div className="mb-8 lg:mb-10 flex justify-between items-end">
        <div>
          <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-luma-purple mb-2">Centre de Comm</h2>
          <h1 className="font-display font-black text-3xl lg:text-4xl text-white tracking-tight italic">Boîte de réception</h1>
        </div>
        <button onClick={fetchMessages} className="text-white/20 hover:text-white transition-all text-xs font-black uppercase tracking-widest flex items-center gap-2 mb-1">
           <i className="fa-solid fa-rotate"></i> Actualiser
        </button>
      </div>

      <div className="bg-luma-card backdrop-blur-xl border border-white/5 rounded-[2rem] overflow-hidden shadow-2xl">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead className="bg-white/[0.02] border-b border-white/5">
              <tr className="text-[10px] font-black uppercase tracking-widest text-white/30">
                <th className="px-8 py-5">Statut</th>
                <th className="px-8 py-5">Prospect</th>
                <th className="px-8 py-5">Pipeline CRM</th>
                <th className="px-8 py-5">Valeur Est.</th>
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
                  <tr key={msg.id} className={`${msg.is_read ? 'opacity-60' : 'bg-luma-purple/5'} hover:bg-white/[0.02] transition-colors group cursor-pointer`} onClick={() => setDetailsModal({isOpen: true, msg})}>
                    <td className="px-8 py-6">
                      {!msg.is_read && <div className="w-2 h-2 rounded-full bg-luma-purple shadow-[0_0_8px_#9E7AFF]"></div>}
                    </td>
                    <td className="px-8 py-6">
                      <p className="font-black text-sm text-white uppercase tracking-tight">{msg.name}</p>
                      <p className="text-[10px] text-white/30 font-bold tracking-widest uppercase">{msg.email}</p>
                    </td>
                    <td className="px-8 py-6">
                       <select
                         onClick={(e) => e.stopPropagation()}
                         value={msg.status || 'new'}
                         onChange={(e) => updateStatus(msg.id, e.target.value)}
                         className={`text-[9px] font-black uppercase px-3 py-1.5 rounded-full border border-white/5 outline-none cursor-pointer ${STATUS_COLORS[msg.status || 'new']}`}
                       >
                         <option value="new">Nouveau</option>
                         <option value="warm">Intéressé</option>
                         <option value="hot">Urgent / Chaud</option>
                         <option value="signed">Contrat Signé</option>
                         <option value="rejected">Classé</option>
                       </select>
                    </td>
                    <td className="px-8 py-6">
                       <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                          <span className="text-[10px] font-bold text-white/40">$</span>
                          <input
                            type="number"
                            defaultValue={msg.estimated_value}
                            onBlur={(e) => updateValue(msg.id, e.target.value)}
                            className="bg-transparent border-b border-white/5 w-20 text-xs font-black text-white outline-none focus:border-luma-purple transition-all"
                          />
                       </div>
                    </td>
                    <td className="px-8 py-6 text-right space-x-2" onClick={(e) => e.stopPropagation()}>
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

      {/* DETAILS MODAL */}
      {detailsModal.isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center px-6">
           <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setDetailsModal({isOpen: false, msg: null})}></div>
           <div className="relative bg-[#120E1E] border border-white/10 p-10 rounded-[3rem] w-full max-w-2xl shadow-2xl animate-in zoom-in-95 duration-300 overflow-hidden">
              <div className="flex justify-between items-start mb-8">
                 <div>
                    <h3 className="text-2xl font-display font-black text-white uppercase italic tracking-tighter leading-none mb-2">{detailsModal.msg.name}</h3>
                    <p className="text-luma-purple text-xs font-bold uppercase tracking-widest">{detailsModal.msg.email}</p>
                 </div>
                 <div className="text-right">
                    <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] mb-1">Signal capté le</p>
                    <p className="text-xs font-bold text-white/60">{new Date(detailsModal.msg.created_at).toLocaleString()}</p>
                 </div>
              </div>

              <div className="space-y-6 max-h-[400px] overflow-y-auto custom-scrollbar pr-4">
                 <div className="bg-white/[0.03] border border-white/5 p-6 rounded-2xl">
                    <p className="text-[10px] font-black uppercase text-luma-blue tracking-widest mb-4 border-b border-white/5 pb-2">Analyse de la Matrice</p>
                    <p className="text-sm text-white/80 leading-relaxed italic">"{detailsModal.msg.ai_analysis || 'Aucune analyse IA disponible.'}"</p>
                 </div>

                 <div className="bg-white/5 p-8 rounded-[2rem] border border-white/10">
                    <p className="text-[10px] font-black uppercase text-moss tracking-widest mb-6 border-b border-white/5 pb-2">Contenu de la Transmission</p>
                    <div className="text-sm text-white/60 leading-relaxed whitespace-pre-wrap font-medium">
                       {detailsModal.msg.message}
                    </div>
                 </div>
              </div>

              <div className="mt-10 flex gap-4">
                 <button onClick={() => { setReplyModal({ isOpen: true, msg: detailsModal.msg, text: '', sending: false }); setDetailsModal({isOpen:false, msg:null}); }}
                    className="flex-1 bg-white text-luma-dark p-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-luma-purple hover:text-white transition-all">
                    Ouvrir la réponse
                 </button>
                 <button onClick={() => deleteMessage(detailsModal.msg.id)}
                    className="w-14 h-14 border border-red-500/20 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all flex items-center justify-center">
                    <i className="fa-solid fa-trash-can"></i>
                 </button>
              </div>
           </div>
        </div>
      )}

      {/* REPLY MODAL */}
      {replyModal.isOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center px-6">
           <div className="absolute inset-0 bg-black/95 backdrop-blur-md" onClick={() => !replyModal.sending && setReplyModal(prev => ({...prev, isOpen: false}))}></div>
           <div className="relative bg-[#120E1E] border border-white/10 p-10 rounded-[2.5rem] w-full max-w-lg shadow-2xl animate-in zoom-in-95 duration-300">
              <h3 className="text-2xl font-display font-black text-white mb-2 uppercase italic">Répondre à {replyModal.msg.name}</h3>
              <p className="text-white/30 text-xs font-bold uppercase tracking-widest mb-8">Liaison via Proxy Matrix</p>

              <form onSubmit={handleReply} className="space-y-6">
                 <div className="bg-white/5 p-4 rounded-2xl border border-white/5 max-h-32 overflow-y-auto custom-scrollbar">
                    <p className="text-[10px] font-black text-white/20 uppercase mb-2">Rappel :</p>
                    <p className="text-[13px] text-white/50 italic leading-relaxed">"{replyModal.msg.message}"</p>
                 </div>

                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-luma-purple ml-2">Message de réponse</label>
                    <textarea
                      required autoFocus rows="6"
                      value={replyModal.text}
                      onChange={e => setReplyModal({...replyModal, text: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 p-6 rounded-[1.5rem] outline-none focus:border-luma-purple/40 text-white font-medium resize-none text-sm"
                      placeholder="Tapez votre réponse stratégique..."
                    ></textarea>
                 </div>

                 <button type="submit" disabled={replyModal.sending || !replyModal.text.trim()}
                    className="w-full bg-neon-purple text-white p-5 rounded-[1.5rem] font-black text-sm uppercase tracking-[0.2em] shadow-xl shadow-luma-purple/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-4">
                    {replyModal.sending ? (
                      <><i className="fa-solid fa-circle-notch fa-spin"></i> Transmission...</>
                    ) : (
                      <><i className="fa-solid fa-paper-plane"></i> Envoyer le signal</>
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
