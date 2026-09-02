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
    <div className="max-w-5xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-display font-bold text-3xl">Gestionnaire de projets</h1>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="bg-clay text-white px-5 py-2.5 rounded-md font-bold text-sm flex items-center gap-2 hover:bg-clayd transition-colors"
        >
          <i className={`fa-solid ${isAdding ? 'fa-xmark' : 'fa-plus'}`}></i>
          {isAdding ? 'Annuler' : 'Ajouter un projet'}
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleSubmit} className="bg-white border border-line p-8 rounded-lg mb-10 shadow-sm space-y-6">
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-widest text-smoke mb-2">Titre du projet</label>
              <input
                required
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full border border-line p-3 rounded-md outline-none focus:border-clay"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-widest text-smoke mb-2">Catégorie</label>
              <input
                placeholder="ex: Web App, Mobile, IA"
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full border border-line p-3 rounded-md outline-none focus:border-clay"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-widest text-smoke mb-2">Description courte</label>
            <textarea
              required
              rows="3"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full border border-line p-3 rounded-md outline-none focus:border-clay resize-none"
            ></textarea>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
             <div>
              <label className="block text-[11px] font-bold uppercase tracking-widest text-smoke mb-2">Statut</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value})}
                className="w-full border border-line p-3 rounded-md outline-none focus:border-clay"
              >
                <option>En cours</option>
                <option>Terminé</option>
                <option>Prototype</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-widest text-smoke mb-2">Couleur Statut</label>
              <select
                value={formData.status_color}
                onChange={(e) => setFormData({...formData, status_color: e.target.value})}
                className="w-full border border-line p-3 rounded-md outline-none focus:border-clay"
              >
                <option value="clay">Orange (Clay)</option>
                <option value="moss">Vert (Moss)</option>
                <option value="smoke">Gris (Smoke)</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-widest text-smoke mb-2">Image URL (Optionnel)</label>
              <input
                type="text"
                value={formData.image_url}
                onChange={(e) => setFormData({...formData, image_url: e.target.value})}
                className="w-full border border-line p-3 rounded-md outline-none focus:border-clay"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-ink text-paper px-8 py-3 rounded-md font-bold text-sm hover:bg-clay disabled:opacity-50 transition-colors"
          >
            Publier le projet
          </button>
        </form>
      )}

      <div className="grid sm:grid-cols-2 gap-6">
        {loading && !isAdding ? (
          <p>Chargement des projets...</p>
        ) : projects.length === 0 ? (
          <p className="text-smoke italic">Aucun projet pour le moment.</p>
        ) : (
          projects.map((pj) => (
            <div key={pj.id} className="bg-white border border-line p-6 rounded-lg shadow-sm flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className={`inline-block px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest mb-2 bg-${pj.status_color}/10 text-${pj.status_color}`}>
                    {pj.status}
                  </span>
                  <h3 className="font-display font-bold text-xl">{pj.title}</h3>
                </div>
                <button
                  onClick={() => deleteProject(pj.id)}
                  className="text-smoke hover:text-red-600 transition-colors"
                >
                  <i className="fa-solid fa-trash-can"></i>
                </button>
              </div>
              <p className="text-sm text-smoke flex-1">{pj.description}</p>
              <div className="mt-4 pt-4 border-t border-line text-[11px] text-smoke uppercase tracking-widest">
                Catégorie: {pj.category}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProjectManager;
