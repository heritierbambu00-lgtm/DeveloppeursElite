import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Edit3, Eye, FileText, CheckCircle, XCircle } from 'lucide-react';

const BlogManager = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ title: '', content: '', excerpt: '', category: 'Tech', status: 'published' });

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    setLoading(true);
    const { data } = await supabase.from('posts').select('*').order('created_at', { ascending: false });
    setPosts(data || []);
    setLoading(false);
  }

  async function toggleStatus(id, currentStatus) {
    const newStatus = currentStatus === 'published' ? 'draft' : 'published';
    const { error } = await supabase.from('posts').update({ status: newStatus }).eq('id', id);
    if (!error) fetchPosts();
  }

  async function deletePost(id) {
    if (!window.confirm("Supprimer cet article ?")) return;
    const { error } = await supabase.from('posts').delete().eq('id', id);
    if (!error) fetchPosts();
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const { data: { user } } = await supabase.auth.getUser();

    const postData = { ...formData, author_id: user.id, slug: formData.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '') };

    const { error } = await supabase.from('posts').insert([postData]);
    if (!error) {
      setIsEditing(false);
      setFormData({ title: '', content: '', excerpt: '', category: 'Tech', status: 'published' });
      fetchPosts();
    } else {
      alert(error.message);
    }
  }

  return (
    <div className="animate-in fade-in duration-700">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-luma-blue mb-2">R&D Publication</h2>
          <h1 className="font-display font-black text-3xl lg:text-4xl text-white tracking-tight italic">Journal de la Matrice</h1>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="bg-luma-blue px-6 py-3 rounded-xl text-luma-dark font-black text-xs uppercase tracking-widest flex items-center gap-3 shadow-lg hover:scale-105 active:scale-95 transition-all"
        >
          {isEditing ? <Trash2 size={14}/> : <Plus size={14}/>}
          {isEditing ? 'Annuler' : 'Nouvel Article'}
        </button>
      </div>

      {isEditing && (
        <motion.form
          initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
          onSubmit={handleSubmit} className="bg-luma-card border border-white/10 p-8 lg:p-12 rounded-[2.5rem] mb-10 space-y-8 lg:space-y-10"
        >
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                 <label className="text-[9px] font-black uppercase tracking-widest text-white/30 ml-2">Titre du signal</label>
                 <input required className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-luma-blue/40 text-white font-bold"
                        value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
              </div>
              <div className="space-y-2">
                 <label className="text-[9px] font-black uppercase tracking-widest text-white/30 ml-2">Catégorie Matrix</label>
                 <input placeholder="ex: Intelligence Artificielle" className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-luma-blue/40 text-white font-bold"
                        value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} />
              </div>
           </div>

           <div className="space-y-2">
              <label className="text-[9px] font-black uppercase tracking-widest text-white/30 ml-2">Résumé (Excerpt)</label>
              <input className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-luma-blue/40 text-white font-medium"
                     value={formData.excerpt} onChange={e => setFormData({...formData, excerpt: e.target.value})} />
           </div>

           <div className="space-y-2">
              <label className="text-[9px] font-black uppercase tracking-widest text-white/30 ml-2">Flux de Données (Contenu)</label>
              <textarea required rows="10" className="w-full bg-white/5 border border-white/10 p-6 rounded-3xl outline-none focus:border-luma-blue/40 text-white resize-none font-medium text-sm leading-relaxed"
                        value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} />
           </div>

           <div className="flex justify-between items-center bg-white/5 p-6 rounded-2xl border border-white/5">
              <div className="flex items-center gap-4">
                 <span className="text-[10px] font-black uppercase text-white/40 tracking-widest">Status Initial</span>
                 <select className="bg-luma-dark border border-white/10 rounded-lg px-4 py-2 text-[10px] font-black uppercase text-white outline-none"
                        value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
                    <option value="published">Publier Directement</option>
                    <option value="draft">Brouillon Matrice</option>
                 </select>
              </div>
              <button type="submit" className="bg-white text-luma-dark px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-luma-blue transition-all shadow-xl">Initier la Diffusion</button>
           </div>
        </motion.form>
      )}

      <div className="grid grid-cols-1 gap-4">
        {posts.length === 0 && !loading && (
          <div className="py-20 text-center border border-white/5 border-dashed rounded-[2rem] opacity-30">Aucun signal archivé.</div>
        )}
        {posts.map(post => (
          <div key={post.id} className="bg-luma-card border border-white/5 p-6 rounded-2xl flex items-center justify-between group hover:border-white/10 transition-all shadow-xl">
             <div className="flex items-center gap-6">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${post.status === 'published' ? 'bg-moss/10 text-moss' : 'bg-white/5 text-white/20'}`}>
                   <FileText size={20}/>
                </div>
                <div>
                   <h3 className="font-bold text-white uppercase tracking-tight">{post.title}</h3>
                   <div className="flex items-center gap-4 mt-1.5">
                      <span className="text-[8px] font-black text-luma-blue uppercase tracking-widest bg-luma-blue/5 px-2 py-0.5 rounded border border-luma-blue/10">{post.category}</span>
                      <span className={`text-[8px] font-black uppercase tracking-[0.2em] ${post.status === 'published' ? 'text-moss' : 'text-white/20'}`}>
                         {post.status === 'published' ? 'En ligne' : 'Brouillon'}
                      </span>
                      <span className="text-[8px] font-black text-white/10 uppercase tracking-widest">{new Date(post.created_at).toLocaleDateString()}</span>
                   </div>
                </div>
             </div>
             <div className="flex gap-2">
                <button
                  onClick={() => toggleStatus(post.id, post.status)}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${post.status === 'published' ? 'bg-moss/10 text-moss hover:bg-moss hover:text-white' : 'bg-white/5 text-white/20 hover:bg-white/10'}`}
                  title={post.status === 'published' ? "Désactiver" : "Publier"}
                >
                   {post.status === 'published' ? <CheckCircle size={16}/> : <XCircle size={16}/>}
                </button>
                <Link to={`/blog/${post.slug}`} className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/20 hover:text-white transition-all">
                   <Eye size={16}/>
                </Link>
                <button onClick={() => deletePost(post.id)} className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/20 hover:text-red-400 transition-all">
                   <Trash2 size={16}/>
                </button>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogManager;
