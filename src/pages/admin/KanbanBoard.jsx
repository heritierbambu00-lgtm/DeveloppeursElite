import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { motion, AnimatePresence } from 'framer-motion';

const COLUMNS = [
  { id: 'En cours', title: 'Développement', color: 'border-luma-blue' },
  { id: 'Prototype', title: 'Idée / Design', color: 'border-clay' },
  { id: 'Revue', title: 'Validation', color: 'border-luma-pink' },
  { id: 'Terminé', title: 'Livré / Archive', color: 'border-moss' }
];

const KanbanBoard = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    setLoading(true);
    const { data } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
    setProjects(data || []);
    setLoading(false);
  }

  const updateStatus = async (id, newStatus) => {
    const { error } = await supabase.from('projects').update({ status: newStatus }).eq('id', id);
    if (!error) {
      setProjects(prev => prev.map(p => p.id === id ? { ...p, status: newStatus } : p));
      // Notify matrix
      await supabase.from('notifications').insert([{
         type: 'project',
         title: 'Mise à jour projet',
         content: `Projet déplacé vers ${newStatus}`
      }]);
    }
  };

  return (
    <div className="animate-in fade-in duration-700">
      <div className="mb-10">
        <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-luma-purple mb-2">Workspace</h2>
        <h1 className="font-display font-black text-3xl lg:text-4xl text-white tracking-tight italic">Pipeline Opérationnelle</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {COLUMNS.map(col => (
          <div key={col.id} className="space-y-6">
            <div className={`p-4 bg-white/[0.03] border-b-2 ${col.color} rounded-t-2xl flex justify-between items-center`}>
               <span className="text-[10px] font-black uppercase tracking-widest text-white/60">{col.title}</span>
               <span className="bg-white/5 px-2 py-0.5 rounded text-[10px] font-bold">{projects.filter(p => p.status === col.id).length}</span>
            </div>

            <div className="space-y-4 min-h-[500px]">
              <AnimatePresence>
                {projects.filter(p => p.status === col.id).map(p => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    key={p.id}
                    className="bg-luma-card border border-white/5 p-6 rounded-2xl shadow-xl hover:border-white/10 transition-all group"
                  >
                    <h3 className="font-black text-sm text-white mb-2 uppercase tracking-tight">{p.title}</h3>
                    <p className="text-[10px] text-white/40 line-clamp-2 mb-4 leading-relaxed">{p.description}</p>

                    <div className="flex justify-between items-center mt-4">
                       <span className="text-[8px] font-black text-white/20 uppercase bg-white/5 px-2 py-1 rounded">{p.category}</span>
                       <div className="flex gap-1">
                          {COLUMNS.filter(c => c.id !== p.status).map(c => (
                            <button
                              key={c.id}
                              onClick={() => updateStatus(p.id, c.id)}
                              className="w-6 h-6 rounded-lg bg-white/5 hover:bg-luma-purple transition-all flex items-center justify-center text-[10px] text-white/20 hover:text-white"
                              title={`Déplacer vers ${c.title}`}
                            >
                               <i className="fa-solid fa-arrow-right-long"></i>
                            </button>
                          ))}
                       </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {projects.filter(p => p.status === col.id).length === 0 && !loading && (
                <div className="h-32 border border-white/5 border-dashed rounded-2xl flex items-center justify-center text-[10px] font-bold text-white/10 uppercase tracking-widest">Vide</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
