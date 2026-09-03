import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';

const ProjectManager = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    status: 'En cours',
    status_color: 'clay',
    image_url: ''
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();

      const { error } = await supabase
        .from('projects')
        .insert([{ ...formData, created_by: user.id }]);

      if (error) throw error;

      setIsAdding(false);
      setFormData({ title: '', description: '', category: '', status: 'En cours', status_color: 'clay', image_url: '' });
      fetchProjects();
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function deleteProject(id) {
    if (!window.confirm('Voulez-vous vraiment supprimer ce projet ?')) return;
    try {
      const { error } = await supabase.from('projects').delete().eq('id', id);
      if (error) throw error;
      fetchProjects();
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div className="max-w-5xl animate-in fade-in slide-in-from-bottom-2 duration-700">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 lg:mb-10">
        <div>
          <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-luma-purple mb-2">Workspace</h2>
          <h1 className="font-display font-black text-3xl lg:text-4xl text-white tracking-tight">Gestionnaire de projets</h1>
        </div>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="bg-neon-purple px-6 py-3 rounded-xl text-white font-black text-xs uppercase tracking-widest flex items-center gap-3 shadow-lg shadow-luma-purple/20 hover:scale-105 active:scale-95 transition-all w-full sm:w-auto justify-center"
        >
          <i className={`fa-solid ${isAdding ? 'fa-xmark' : 'fa-plus'}`}></i>
          {isAdding ? 'Annuler' : 'Ajouter un projet'}
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleSubmit} className="bg-luma-card backdrop-blur-xl border border-white/10 p-8 rounded-[2rem] mb-10 shadow-2xl space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Titre du projet</label>
              <input
                required
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-luma-purple/40 text-white font-bold transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Catégorie</label>
              <input
                placeholder="ex: Web App, Mobile, IA"
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-luma-purple/40 text-white font-bold transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Description courte</label>
            <textarea
              required
              rows="3"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-luma-purple/40 text-white font-medium transition-all resize-none"
            ></textarea>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
             <div className="space-y-2">
              <label className="block text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Statut</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value})}
                className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-luma-purple/40 text-white font-bold appearance-none cursor-pointer"
              >
                <option value="En cours">En cours</option>
                <option value="Terminé">Terminé</option>
                <option value="Prototype">Prototype</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Couleur Statut</label>
              <select
                value={formData.status_color}
                onChange={(e) => setFormData({...formData, status_color: e.target.value})}
                className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-luma-purple/40 text-white font-bold appearance-none cursor-pointer"
              >
                <option value="clay">Orange (Clay)</option>
                <option value="moss">Vert (Moss)</option>
                <option value="smoke">Gris (Smoke)</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Image URL</label>
              <input
                type="text"
                value={formData.image_url}
                onChange={(e) => setFormData({...formData, image_url: e.target.value})}
                className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-luma-purple/40 text-white font-bold transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-luma-dark py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-luma-purple hover:text-white transition-all shadow-xl shadow-white/5"
          >
            {loading ? 'Publication...' : 'Publier le projet'}
          </button>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {loading && !isAdding ? (
          <p className="text-white/20 italic">Récupération des données...</p>
        ) : projects.length === 0 ? (
          <div className="col-span-full bg-white/5 border border-white/5 border-dashed p-16 rounded-[2rem] text-center">
             <i className="fa-solid fa-folder-open text-4xl text-white/10 mb-4 block"></i>
             <p className="text-white/40 font-bold uppercase text-xs tracking-widest">Aucun projet dans la matrice.</p>
          </div>
        ) : (
          projects.map((pj) => (
            <div key={pj.id} className="bg-luma-card backdrop-blur-xl border border-white/5 p-8 rounded-[2rem] shadow-xl flex flex-col group hover:border-white/10 transition-all">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className={`inline-block px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest mb-3 bg-${pj.status_color === 'clay' ? 'clay/20 text-clay' : pj.status_color === 'moss' ? 'moss/20 text-moss' : 'white/10 text-white/40'} border border-current/10`}>
                    {pj.status}
                  </span>
                  <h3 className="font-display font-black text-2xl text-white tracking-tight uppercase italic">{pj.title}</h3>
                </div>
                <button
                  onClick={() => deleteProject(pj.id)}
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white/10 hover:text-red-400 hover:bg-red-400/5 transition-all"
                >
                  <i className="fa-solid fa-trash-can text-sm"></i>
                </button>
              </div>
              <p className="text-sm text-white/40 leading-relaxed font-medium flex-1">{pj.description}</p>
              <div className="mt-6 pt-6 border-t border-white/5 flex justify-between items-center">
                <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Catégorie: {pj.category}</span>
                <i className="fa-solid fa-arrow-right-long text-white/10 group-hover:text-luma-purple group-hover:translate-x-1 transition-all"></i>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProjectManager;
