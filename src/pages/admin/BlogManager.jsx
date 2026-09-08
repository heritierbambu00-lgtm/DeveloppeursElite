import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Edit3, Eye, FileText } from 'lucide-react';

const BlogManager = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ title: '', content: '', excerpt: '', category: 'Tech', status: 'draft' });

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    setLoading(true);
    const { data } = await supabase.from('posts').select('*').order('created_at', { ascending: false });
    setPosts(data || []);
    setLoading(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const { data: { user } } = await supabase.auth.getUser();

    const postData = { ...formData, author_id: user.id, slug: formData.title.toLowerCase().replace(/ /g, '-') };

    const { error } = await supabase.from('posts').insert([postData]);
    if (!error) {
      setIsEditing(false);
      setFormData({ title: '', content: '', excerpt: '', category: 'Tech', status: 'draft' });
      fetchPosts();
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
          className="bg-luma-blue px-6 py-3 rounded-xl text-luma-dark font-black text-xs uppercase tracking-widest flex items-center gap-3 shadow-lg"
        >
          {isEditing ? <Trash2 size={14}/> : <Plus size={14}/>}
          {isEditing ? 'Annuler' : 'Nouvel Article'}
        </button>
      </div>

      {isEditing && (
        <motion.form
          initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
          onSubmit={handleSubmit} className="bg-luma-card border border-white/10 p-8 rounded-[2rem] mb-10 space-y-6"
        >
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input required placeholder="Titre de l'article" className="bg-white/5 border border-white/10 p-4 rounded-xl outline-none text-white font-bold"
                     value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
              <input placeholder="Catégorie (ex: IA, Web3, Infrastructure)" className="bg-white/5 border border-white/10 p-4 rounded-xl outline-none text-white font-bold"
                     value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} />
           </div>
           <textarea required rows="8" placeholder="Contenu de l'article (Markdown supporté)..." className="w-full bg-white/5 border border-white/10 p-4 rounded-xl outline-none text-white resize-none font-medium text-sm"
                     value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} />
           <button type="submit" className="w-full bg-white text-luma-dark py-4 rounded-xl font-black uppercase tracking-widest hover:bg-luma-blue transition-all">Initialiser la Publication</button>
        </motion.form>
      )}

      <div className="grid grid-cols-1 gap-4">
        {posts.map(post => (
          <div key={post.id} className="bg-luma-card border border-white/5 p-6 rounded-2xl flex items-center justify-between group hover:border-white/10 transition-all">
             <div className="flex items-center gap-6">
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-luma-blue">
                   <FileText size={20}/>
                </div>
                <div>
                   <h3 className="font-bold text-white uppercase tracking-tight">{post.title}</h3>
                   <p className="text-[10px] text-white/30 uppercase tracking-widest font-black mt-1">
                      {post.category} • {post.status} • {new Date(post.created_at).toLocaleDateString()}
                   </p>
                </div>
             </div>
             <div className="flex gap-2">
                <button className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-white/20 hover:text-white transition-all"><Eye size={16}/></button>
                <button className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-white/20 hover:text-red-400 transition-all"><Trash2 size={16}/></button>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogManager;
