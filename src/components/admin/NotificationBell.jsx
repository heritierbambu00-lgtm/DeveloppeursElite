import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { motion, AnimatePresence } from 'framer-motion';

const NotificationBell = ({ profile }) => {
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    fetchNotifications();

    // Abonnement Realtime pour les nouvelles notifications
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'notifications' },
        (payload) => {
          if (!payload.new.assigned_to || payload.new.assigned_to === profile?.user_role) {
            setNotifications(prev => [payload.new, ...prev]);
            setUnreadCount(c => c + 1);
            // Play sound if possible
            new Audio('/notification.mp3').play().catch(() => {});
          }
        }
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [profile]);

  const fetchNotifications = async () => {
    const { data } = await supabase
      .from('notifications')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5);

    setNotifications(data || []);
    setUnreadCount(data?.filter(n => !n.is_read).length || 0);
  };

  const markAllAsRead = async () => {
    await supabase.from('notifications').update({ is_read: true }).eq('is_read', false);
    setUnreadCount(0);
    setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
  };

  return (
    <div className="relative">
      <button
        onClick={() => { setIsOpen(!isOpen); if (!isOpen) markAllAsRead(); }}
        className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-white/40 hover:text-luma-purple hover:bg-white/10 transition-all border border-white/5 shadow-lg"
      >
        <i className="fa-solid fa-bell text-lg"></i>
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-luma-purple text-white text-[9px] font-black rounded-full border-2 border-luma-dark flex items-center justify-center animate-bounce">
            {unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute right-0 mt-4 w-80 bg-[#120E1E] border border-white/10 rounded-[1.5rem] shadow-2xl z-50 overflow-hidden"
            >
              <div className="p-5 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
                <h3 className="text-xs font-black uppercase tracking-widest text-white/60">Alertes Matrice</h3>
                <span className="text-[10px] font-bold text-luma-purple">{unreadCount} nouveaux</span>
              </div>
              <div className="max-h-96 overflow-y-auto custom-scrollbar">
                {notifications.length === 0 ? (
                  <div className="p-10 text-center text-white/20 italic text-xs">Aucun signal détecté.</div>
                ) : (
                  notifications.map((n) => (
                    <div key={n.id} className={`p-4 border-b border-white/5 hover:bg-white/[0.03] transition-all cursor-pointer ${!n.is_read ? 'bg-luma-purple/5' : ''}`}>
                      <div className="flex gap-3">
                         <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${n.type === 'message' ? 'bg-luma-blue/10 text-luma-blue' : 'bg-luma-purple/10 text-luma-purple'}`}>
                            <i className={`fa-solid ${n.type === 'message' ? 'fa-envelope' : 'fa-bolt'}`}></i>
                         </div>
                         <div>
                            <p className="text-xs font-bold text-white tracking-tight leading-none mb-1">{n.title}</p>
                            <p className="text-[10px] text-white/40 line-clamp-2">{n.content}</p>
                            <p className="text-[8px] font-black text-white/10 uppercase mt-2">{new Date(n.created_at).toLocaleTimeString()}</p>
                         </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <button className="w-full p-4 text-[10px] font-black uppercase tracking-[0.2em] text-white/20 hover:text-white hover:bg-white/[0.03] transition-all">
                Voir tout le log
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationBell;
