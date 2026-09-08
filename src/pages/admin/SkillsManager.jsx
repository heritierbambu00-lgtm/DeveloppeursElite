import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { motion } from 'framer-motion';
import { Plus, Trash2, Cpu } from 'lucide-react';

const SkillsManager = () => {
  const [skills, setSkills] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({ name: '', category: 'Software', level: 85 });

  useEffect(() => {
    fetchSkills();
  }, []);

  async function fetchSkills() {
    const { data } = await supabase.from('skills').select('*').order('category', { ascending: true });
    setSkills(data || []);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const { error } = await supabase.from('skills').insert([formData]);
    if (!error) {
      setIsAdding(false);
      setFormData({ name: '', category: 'Software', level: 85 });
      fetchSkills();
    }
  }

  return (
    <div className="animate-in fade-in duration-700">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-moss mb-2">Protocol Deck</h2>
          <h1 className="font-display font-black text-3xl lg:text-4xl text-white tracking-tight italic">Matrice de Compétences</h1>
        </div>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="bg-moss px-6 py-3 rounded-xl text-white font-black text-xs uppercase tracking-widest flex items-center gap-3 shadow-lg"
        >
          {isAdding ? <Trash2 size={14}/> : <Plus size={14}/>}
          {isAdding ? 'Annuler' : 'Ajouter un Node'}
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleSubmit} className="bg-luma-card border border-white/10 p-8 rounded-[2rem] mb-10 space-y-6">
           <div className="grid grid-cols-3 gap-6">
              <input required placeholder="Nom (ex: React)" className="bg-white/5 border border-white/10 p-4 rounded-xl outline-none text-white font-bold"
                     value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              <select className="bg-white/5 border border-white/10 p-4 rounded-xl outline-none text-white font-bold"
                     value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                 <option value="Software">Software Engineering</option>
                 <option value="AI">Artificial Intelligence</option>
                 <option value="Network">Infrastructure</option>
              </select>
              <input type="number" min="0" max="100" className="bg-white/5 border border-white/10 p-4 rounded-xl outline-none text-white font-bold"
                     value={formData.level} onChange={e => setFormData({...formData, level: parseInt(e.target.value)})} />
           </div>
           <button type="submit" className="w-full bg-white text-luma-dark py-4 rounded-xl font-black uppercase tracking-widest">Injecter le Node</button>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map(skill => (
          <div key={skill.id} className="bg-luma-card border border-white/5 p-6 rounded-2xl flex flex-col gap-4">
             <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                   <div className="w-8 h-8 rounded-lg bg-moss/10 text-moss flex items-center justify-center">
                      <Cpu size={16}/>
                   </div>
                   <h3 className="font-bold text-white uppercase tracking-tight text-sm">{skill.name}</h3>
                </div>
                <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">{skill.category}</span>
             </div>
             <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-moss" style={{ width: `${skill.level}%` }}></div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsManager;
