import React, { useState, useRef, useEffect } from 'react';
import { chatWithAI } from '../../lib/aiService';
import { supabase } from '../../lib/supabaseClient';

const AISidebar = ({ isOpen, onClose, profile }) => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: `Systèmes activés. Bonjour ${profile?.full_name?.split(' ')[0] || ''}, comment puis-je assister la direction aujourd'hui ?` }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsCreating] = useState(false);
  const messagesEndRef = useRef(null);

  // Voice Recognition Setup
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const rec = new SpeechRecognition();
        rec.continuous = false;
        rec.interimResults = false;
        rec.lang = 'fr-FR';

        rec.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          setInput(transcript);
          setIsCreating(false);
          // Auto-send voice command
          processMessage(transcript);
        };

        rec.onerror = () => setIsCreating(false);
        rec.onend = () => setIsCreating(false);

        setRecognition(rec);
      }
    }
  }, [profile]);

  const speak = (text) => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      // Cancel previous speech
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'fr-FR';
      utterance.rate = 1.1;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  const toggleListening = () => {
    if (isListening) {
      recognition?.stop();
    } else {
      setIsCreating(true);
      recognition?.start();
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const processMessage = async (text) => {
    if (!text.trim()) return;

    const userMessage = { role: 'user', content: text };
    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput('');
    setIsTyping(true);

    try {
      const { count: pCount } = await supabase.from('projects').select('*', { count: 'exact', head: true });
      const { count: mCount } = await supabase.from('contacts').select('*', { count: 'exact', head: true });
      const { data: teamData } = await supabase.from('profiles').select('full_name, user_role, role').order('updated_at', { ascending: true });

      const context = {
        user: { fullName: profile?.full_name, role: profile?.user_role },
        stats: { projects: pCount, messages: mCount, members: teamData?.length || 0 },
        team: teamData || []
      };

      const aiResponse = await chatWithAI(updatedMessages, context);
      setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
      // Vocal response
      speak(aiResponse);
    } catch (err) {
      const errorMsg = "Désolé, j'ai perdu le fil de notre conversation. Une erreur technique est survenue.";
      setMessages(prev => [...prev, { role: 'assistant', content: errorMsg }]);
      speak(errorMsg);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSend = (e) => {
    e.preventDefault();
    processMessage(input);
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 lg:z-30" onClick={onClose}></div>
      )}

      <aside className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-[#0B0813] border-l border-white/10 z-[100] transition-transform duration-500 ease-out shadow-2xl ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full bg-[#0B0813]">
          <div className="h-20 flex items-center justify-between px-8 border-b border-white/5 bg-white/[0.02]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-neon-purple rounded-lg flex items-center justify-center shadow-lg shadow-luma-purple/40 animate-pulse">
                <i className="fa-solid fa-wand-magic-sparkles text-white text-xs"></i>
              </div>
              <span className="font-display font-black text-sm tracking-tighter uppercase text-white">DEVELITE AI <span className="text-[9px] bg-white/10 text-white/40 px-1.5 py-0.5 rounded-md ml-2 tracking-widest">AWARE</span></span>
            </div>
            <button onClick={onClose} className="text-white/40 hover:text-white transition-colors"><i className="fa-solid fa-xmark text-xl"></i></button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 custom-scrollbar text-white">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[90%] p-4 rounded-2xl text-[13.5px] leading-relaxed font-medium ${msg.role === 'user' ? 'bg-luma-purple text-white shadow-xl shadow-luma-purple/10 rounded-tr-none' : 'bg-white/5 text-white/80 border border-white/5 rounded-tl-none'}`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white/5 border border-white/5 p-4 rounded-2xl rounded-tl-none flex gap-1.5">
                  <span className="w-1.5 h-1.5 bg-luma-purple rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-luma-purple/60 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 bg-luma-purple/30 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-6 sm:p-8 border-t border-white/5 bg-white/[0.01]">
            <form onSubmit={handleSend} className="flex gap-3">
              <div className="relative flex-1">
                <input
                  type="text" value={input} onChange={(e) => setInput(e.target.value)}
                  placeholder={`Message Develite AI...`}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-6 pr-12 text-sm outline-none focus:border-luma-purple/40 focus:bg-white/10 transition-all text-white placeholder:text-white/20"
                />
                <button
                  type="button"
                  onClick={toggleListening}
                  className={`absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg flex items-center justify-center transition-all ${isListening ? 'bg-red-500 text-white animate-pulse' : 'text-white/20 hover:text-white'}`}
                >
                  <i className={`fa-solid ${isListening ? 'fa-microphone' : 'fa-microphone-lines'}`}></i>
                </button>
              </div>
              <button type="submit" disabled={!input.trim() || isTyping} className="w-12 h-12 bg-neon-purple rounded-2xl flex items-center justify-center text-white shadow-lg hover:scale-105 transition-all disabled:opacity-50 shrink-0">
                <i className="fa-solid fa-paper-plane text-sm"></i>
              </button>
            </form>
            <p className="mt-4 text-[9px] text-center text-white/10 font-bold uppercase tracking-widest leading-none">
              Commandes Vocales : Français (FR)
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default AISidebar;
