import React, { useState, useRef, useEffect } from 'react';
import { chatWithAI } from '../../lib/aiService';

const AISidebar = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Bonjour ! Je suis DEVELITE AI. Comment puis-je vous assister dans vos projets aujourd\'hui ?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const apiKey = import.meta.env.VITE_GROQ_API_KEY;
    if (!apiKey) {
      setMessages(prev => [...prev, { role: 'user', content: input }, { role: 'assistant', content: "⚠️ Configuration manquante : La clé VITE_GROQ_API_KEY n'est pas définie dans votre fichier .env ou sur Vercel." }]);
      setInput('');
      return;
    }

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    const response = await chatWithAI(input);
    setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    setIsTyping(false);
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 lg:hidden"
          onClick={onClose}
        ></div>
      )}

      {/* Sidebar Area */}
      <aside
        className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-[#120E1E]/95 backdrop-blur-2xl border-l border-white/5 z-40 transition-transform duration-500 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="h-20 flex items-center justify-between px-8 border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-neon-purple rounded-lg flex items-center justify-center shadow-lg shadow-luma-purple/40">
                <i className="fa-solid fa-sparkles text-white text-xs"></i>
              </div>
              <span className="font-display font-black text-sm tracking-tighter uppercase">Develite AI <span className="text-[10px] bg-luma-purple/20 text-luma-purple px-1.5 py-0.5 rounded-md ml-2">BETA</span></span>
            </div>
            <button onClick={onClose} className="text-white/40 hover:text-white transition-colors">
              <i className="fa-solid fa-xmark text-xl"></i>
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user'
                    ? 'bg-luma-purple text-white rounded-tr-none'
                    : 'bg-white/5 text-white/80 border border-white/5 rounded-tl-none'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white/5 border border-white/5 p-4 rounded-2xl rounded-tl-none flex gap-1">
                  <span className="w-1.5 h-1.5 bg-white/20 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-white/20 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 bg-white/20 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-8 border-t border-white/5 bg-white/[0.02]">
            <form onSubmit={handleSend} className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Posez votre question à l'IA..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-6 pr-14 text-sm outline-none focus:border-luma-purple/40 focus:bg-white/10 transition-all text-white placeholder:text-white/20"
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-neon-purple rounded-xl flex items-center justify-center text-white shadow-lg shadow-luma-purple/20 hover:scale-105 transition-all disabled:opacity-50 disabled:scale-100"
              >
                <i className="fa-solid fa-paper-plane text-xs"></i>
              </button>
            </form>
            <p className="mt-4 text-[10px] text-center text-white/20 font-bold uppercase tracking-widest">
              Propulsé par Groq Matrice Llama 3.1
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default AISidebar;
