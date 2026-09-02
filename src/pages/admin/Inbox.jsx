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
    <div className="max-w-5xl">
      <h1 className="font-display font-bold text-3xl mb-8">Boîte de réception</h1>

      <div className="bg-white border border-line rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-paper/50 border-b border-line text-[11px] font-bold uppercase tracking-widest text-smoke">
              <tr>
                <th className="px-6 py-4">Statut</th>
                <th className="px-6 py-4">Expéditeur</th>
                <th className="px-6 py-4">Sujet</th>
                <th className="px-6 py-4">Message</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {loading ? (
                <tr><td colSpan="6" className="px-6 py-10 text-center text-smoke">Chargement des messages...</td></tr>
              ) : messages.length === 0 ? (
                <tr><td colSpan="6" className="px-6 py-10 text-center text-smoke">Aucun message reçu.</td></tr>
              ) : (
                messages.map((msg) => (
                  <tr key={msg.id} className={msg.is_read ? 'opacity-60' : 'bg-clay/5'}>
                    <td className="px-6 py-4">
                      {!msg.is_read && <span className="w-2 h-2 rounded-full bg-clay block"></span>}
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-ink text-sm">{msg.name}</p>
                      <p className="text-xs text-smoke">{msg.email}</p>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">{msg.subject}</td>
                    <td className="px-6 py-4 text-sm text-smoke max-w-xs truncate">{msg.message}</td>
                    <td className="px-6 py-4 text-xs text-smoke">
                      {new Date(msg.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      {!msg.is_read && (
                        <button
                          onClick={() => markAsRead(msg.id)}
                          className="text-xs font-bold text-clay uppercase hover:underline"
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
