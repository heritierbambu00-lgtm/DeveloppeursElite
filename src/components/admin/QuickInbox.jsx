import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { sendReplyEmail } from '../../lib/emailService';

const QuickInbox = () => {
  const [messages, setMessages] = useState([]);
  const [replyModal, setReplyModal] = useState({ isOpen: false, msg: null, text: '', sending: false });

  useEffect(() => {
    fetchRecent();
  }, []);

  async function fetchRecent() {
    const { data } = await supabase.from('contacts').select('*').order('created_at', { ascending: false }).limit(3);
    setMessages(data || []);
  }

  const deleteMsg = async (id) => {
    if (!window.confirm("Supprimer ce signal ?")) return;
    await supabase.from('contacts').delete().eq('id', id);
    fetchRecent();
  };

  const handleReply = async (e) => {
    e.preventDefault();
    setReplyModal(prev => ({ ...prev, sending: true }));
    try {
      await sendReplyEmail(replyModal.msg.email, replyModal.msg.name, replyModal.text);
      alert(`Réponse transmise.`);
      setReplyModal({ isOpen: false, msg: null, text: '', sending: false });
      fetchRecent();
    } catch (err) {
      alert(`ECHEC : ${err.message}. Note : Vous devez vérifier votre domaine sur Resend.com pour répondre aux clients externes.`);
      setReplyModal(prev => ({ ...prev, sending: false }));
    }
  };

  return (
    <div className="space-y-4">
      {messages.length === 0 ? (
        <p className="text-xs text-white/20 italic text-center py-4">Aucune communication active.</p>
      ) : (
        messages.map(m => (
          <div key={m.id} className="bg-white/5 border border-white/5 p-4 rounded-2xl flex justify-between items-center group hover:bg-white/[0.08] transition-all">
             <div className="min-w-0 flex-1 mr-4">
                <p className="text-xs font-black text-white truncate uppercase tracking-tighter">{m.name}</p>
                <p className="text-[10px] text-white/40 truncate">{m.message}</p>
             </div>
             <div className="flex gap-2 shrink-0">
                <button onClick={() => setReplyModal({ isOpen: true, msg: m, text: '', sending: false })} className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-all">
                   <i className="fa-solid fa-reply text-[10px]"></i>
                </button>
                <button onClick={() => deleteMsg(m.id)} className="w-8 h-8 rounded-lg bg-red-500/10 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all">
                   <i className="fa-solid fa-trash-can text-[10px]"></i>
                </button>
             </div>
          </div>
        ))
      )}

      {/* MINI MODAL */}
      {replyModal.isOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center px-4">
           <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={() => !replyModal.sending && setReplyModal({isOpen:false})}></div>
           <div className="relative bg-[#120E1E] border border-white/10 p-8 rounded-[2rem] w-full max-w-sm shadow-2xl">
              <h4 className="text-white font-black uppercase text-sm mb-6 italic">Réponse Élite</h4>
              <textarea
                required autoFocus rows="4" value={replyModal.text}
                onChange={e => setReplyModal({...replyModal, text: e.target.value})}
                className="w-full bg-white/5 border border-white/10 p-4 rounded-xl outline-none text-white text-xs mb-6 resize-none"
                placeholder="Message à envoyer..."
              ></textarea>
              <button onClick={handleReply} disabled={replyModal.sending} className="w-full bg-neon-purple py-3 rounded-xl text-white font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-3">
                 {replyModal.sending ? <i className="fa-solid fa-circle-notch fa-spin"></i> : <><i className="fa-solid fa-paper-plane"></i> Transmettre</>}
              </button>
           </div>
        </div>
      )}
    </div>
  );
};

export default QuickInbox;
