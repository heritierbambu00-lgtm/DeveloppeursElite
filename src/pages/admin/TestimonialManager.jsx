import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';

const TestimonialManager = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({ client_name: '', client_role: '', content: '', rating: 5 });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  async function fetchTestimonials() {
    setLoading(true);
    const { data } = await supabase.from('testimonials').select('*').order('created_at', { ascending: false });
    setTestimonials(data || []);
    setLoading(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const { error } = await supabase.from('testimonials').insert([formData]);
    if (!error) {
      setIsAdding(false);
      setFormData({ client_name: '', client_role: '', content: '', rating: 5 });
      fetchTestimonials();
    }
  }

  async function toggleVisibility(id, current) {
    await supabase.from('testimonials').update({ is_visible: !current }).eq('id', id);
    fetchTestimonials();
  }

  return (
    <div className="animate-in fade-in duration-700">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-moss mb-2">Social Proof</h2>
          <h1 className="font-display font-black text-3xl lg:text-4xl text-white tracking-tight italic">Témoignages Clients</h1>
        </div>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="bg-moss px-6 py-3 rounded-xl text-white font-black text-xs uppercase tracking-widest flex items-center gap-3 shadow-lg"
        >
          <i className={`fa-solid ${isAdding ? 'fa-xmark' : 'fa-plus'}`}></i>
          {isAdding ? 'Annuler' : 'Ajouter un avis'}
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleSubmit} className="bg-luma-card border border-white/10 p-8 rounded-[2rem] mb-10 space-y-6">
           <div className="grid grid-cols-2 gap-6">
              <input required placeholder="Nom du client" className="bg-white/5 border border-white/10 p-4 rounded-xl outline-none text-white font-bold"
                     value={formData.client_name} onChange={e => setFormData({...formData, client_name: e.target.value})} />
              <input placeholder="Rôle (ex: CEO de Tech Corp)" className="bg-white/5 border border-white/10 p-4 rounded-xl outline-none text-white font-bold"
                     value={formData.client_role} onChange={e => setFormData({...formData, client_role: e.target.value})} />
           </div>
           <textarea required rows="4" placeholder="Le témoignage..." className="w-full bg-white/5 border border-white/10 p-4 rounded-xl outline-none text-white resize-none"
                     value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} />
           <button type="submit" className="w-full bg-white text-luma-dark py-4 rounded-xl font-black uppercase tracking-widest">Enregistrer</button>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map(t => (
          <div key={t.id} className={`bg-luma-card border border-white/5 p-8 rounded-[2rem] relative group ${!t.is_visible ? 'opacity-40' : ''}`}>
             <div className="flex justify-between items-start mb-6">
                <div className="flex gap-1 text-moss">
                   {[...Array(t.rating)].map((_, i) => <i key={i} className="fa-solid fa-star text-[10px]"></i>)}
                </div>
                <button onClick={() => toggleVisibility(t.id, t.is_visible)} className="text-white/20 hover:text-white transition-colors">
                   <i className={`fa-solid ${t.is_visible ? 'fa-eye' : 'fa-eye-slash'}`}></i>
                </button>
             </div>
             <p className="text-sm text-white/60 italic mb-6 leading-relaxed">"{t.content}"</p>
             <div>
                <p className="font-black text-white uppercase tracking-tight">{t.client_name}</p>
                <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">{t.client_role}</p>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialManager;
