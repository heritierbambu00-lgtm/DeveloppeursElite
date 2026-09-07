import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { chatWithAI, classifyContactMessage } from '../lib/aiService';
import { supabase } from '../lib/supabaseClient';
import { sendNotificationEmail } from '../lib/emailService';

const PublicAIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Bonjour ! Je suis DEVELITE AI. Comment puis-je vous aider dans votre projet technologique ?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentTicketId, setCurrentTicketId] = useState(null);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const submitLeadToMatrix = async (aiContent, fullHistory) => {
    // On transmet si l'IA montre une intention d'enregistrement ou de transmission
    const triggerWords = ['transmet', 'noté', 'envoyé', 'contact', 'dossier'];
    const hasIntent = triggerWords.some(word => aiContent.toLowerCase().includes(word));

    if (hasIntent) {
      try {
        const lastUserMsg = fullHistory.filter(m => m.role === 'user').pop()?.content || '';
        const aiRouting = await classifyContactMessage(lastUserMsg);

        const conversationLog = fullHistory.map(m => `${m.role === 'user' ? 'Client' : 'AI'}: ${m.content}`).join('\n\n');

        const leadData = {
          name: 'Prospect via Chat',
          email: 'chat@client.com',
          subject: 'Session Chat Live (Matrix)',
          message: conversationLog,
          assigned_to: aiRouting.assigned_to,
          ai_analysis: "Lead qualifié dynamiquement via Chatbot Public"
        };

        if (currentTicketId) {
          await supabase.from('contacts').update(leadData).eq('id', currentTicketId);
        } else {
          const { data } = await supabase.from('contacts').insert([leadData]).select();
          if (data?.[0]) setCurrentTicketId(data[0].id);

          await sendNotificationEmail({
            name: 'Nouveau Lead Chat',
            email: 'ia@develite.tech',
            subject: 'Signal Matrix : Discussion Prospect en cours',
            message: 'Un client potentiel discute avec l\'IA et demande une assistance direction.'
          }, aiRouting.assigned_to);
        }
      } catch (err) {
        console.error("Matrix Sync Error:", err);
      }
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = { role: 'user', content: input };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput('');
    setLoading(true);

    try {
      const context = {
        user: { fullName: 'Visiteur', role: 'Prospect' },
        stats: { projects: 12, members: 8 }
      };

      // Appel avec le flag isPublic = true
      const response = await chatWithAI(updatedMessages, context, true);
      const newHistory = [...updatedMessages, { role: 'assistant', content: response }];
      setMessages(newHistory);

      await submitLeadToMatrix(response, newHistory);

    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Désolé, je rencontre une petite perturbation. Réessayez ?" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100] font-body">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="mb-6 w-[350px] h-[550px] bg-white rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border border-line overflow-hidden flex flex-col"
          >
             <div className="p-6 bg-ink text-paper flex items-center justify-between">
                <div className="flex items-center gap-3">
                   <div className="w-8 h-8 bg-clay rounded-lg flex items-center justify-center shadow-lg shadow-clay/20">
                      <i className="fa-solid fa-wand-magic-sparkles text-xs"></i>
                   </div>
                   <span className="font-display font-bold text-sm tracking-tight uppercase">Develite AI</span>
                </div>
                <button onClick={() => setIsOpen(false)} className="text-paper/40 hover:text-paper transition-colors"><i className="fa-solid fa-xmark"></i></button>
             </div>

             <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar bg-[#F9F7F2]">
                {messages.map((m, i) => (
                  <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                     <div className={`max-w-[85%] p-4 rounded-2xl text-[13px] leading-relaxed ${m.role === 'user' ? 'bg-clay text-white rounded-tr-none shadow-lg shadow-clay/10' : 'bg-white text-ink shadow-sm border border-line rounded-tl-none'}`}>
                        {m.content}
                     </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex gap-1.5 p-2">
                     <span className="w-1.5 h-1.5 bg-clay rounded-full animate-bounce"></span>
                     <span className="w-1.5 h-1.5 bg-clay/60 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  </div>
                )}
                <div ref={endRef} />
             </div>

             <form onSubmit={handleSend} className="p-5 bg-white border-t border-line flex gap-2">
                <input
                  type="text" value={input} onChange={e => setInput(e.target.value)}
                  placeholder="Écrivez votre message..."
                  className="flex-1 bg-paper border border-line rounded-xl px-5 py-4 text-sm outline-none focus:border-clay transition-all"
                />
                <button type="submit" className="w-12 h-12 bg-ink text-white rounded-xl flex items-center justify-center hover:bg-clay transition-all shadow-lg">
                   <i className="fa-solid fa-paper-plane text-xs"></i>
                </button>
             </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-ink text-white rounded-2xl shadow-2xl flex items-center justify-center relative overflow-hidden group border border-white/5"
      >
        <div className="absolute inset-0 bg-clay translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
        <i className="fa-solid fa-comment-dots text-2xl relative z-10"></i>
        {!isOpen && currentTicketId && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-4 border-paper animate-pulse"></span>
        )}
      </motion.button>
    </div>
  );
};

export default PublicAIChatbot;
