import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Edit3, Eye, FileText, CheckCircle, XCircle, Image as ImageIcon, X, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const BlogManager = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isPending, setIsPending] = useState(false);

  // Image handling
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    category: 'Tech',
    status: 'published'
  });

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    setLoading(true);
    const { data } = await supabase.from('posts').select('*').order('created_at', { ascending: false });
    setPosts(data || []);
    setLoading(false);
  }

  function handleImageChange(e) {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
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
    setIsPending(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Non authentifié.");

      let image_url = "";

      // Real Image Upload logic
      if (file) {
        const fileName = `blog-${Date.now()}-${file.name}`;
        const { error: uploadError } = await supabase.storage
          .from("project-images")
          .upload(fileName, file);

        if (uploadError) {
          const { error: fallbackError } = await supabase.storage
            .from("avatars")
            .upload(`blog/${fileName}`, file);
          if (fallbackError) throw fallbackError;

          const { data: { publicUrl } } = supabase.storage.from("avatars").getPublicUrl(`blog/${fileName}`);
          image_url = publicUrl;
        } else {
          const { data: { publicUrl } } = supabase.storage.from("project-images").getPublicUrl(fileName);
          image_url = publicUrl;
        }
      }

      const slug = formData.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
      const postData = { ...formData, author_id: user.id, slug, image_url };

      const { error } = await supabase.from('posts').insert([postData]);

      if (error) throw error;

      setIsEditing(false);
      setFile(null);
      setPreview(null);
      setFormData({ title: '', content: '', excerpt: '', category: 'Tech', status: 'published' });
      fetchPosts();
    } catch (err) {
      alert(`Erreur Matrix : ${err.message}`);
    } finally {
      setIsPending(false);
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
          onSubmit={handleSubmit} className="bg-luma-card border border-white/10 p-8 lg:p-12 rounded-[2.5rem] mb-10 space-y-8 lg:space-y-10 shadow-2xl"
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

           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase tracking-widest text-white/30 ml-2">Résumé (Excerpt)</label>
                <input className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-luma-blue/40 text-white font-medium"
                       value={formData.excerpt} onChange={e => setFormData({...formData, excerpt: e.target.value})} />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase tracking-widest text-white/30 ml-2">Image de couverture</label>
                <div className="relative group/upload">
                  <input type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer z-20" />
                  <div className="w-full h-[56px] bg-white/5 border border-white/10 rounded-2xl px-6 flex items-center justify-center text-white/20 group-hover/upload:border-luma-blue transition-all font-black text-[9px] uppercase tracking-widest">
                    <ImageIcon size={18} className="mr-3 shrink-0" />
                    <span className="truncate">{file ? file.name : "Choisir un visuel"}</span>
                  </div>
                </div>
              </div>
           </div>

           {preview && (
              <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 group shadow-xl max-w-lg mx-auto">
                <img src={preview} alt="Aperçu" className="w-full h-full object-cover" />
                <button type="button" onClick={() => {setPreview(null); setFile(null);}} className="absolute top-4 right-4 w-10 h-10 bg-black/60 rounded-full flex items-center justify-center text-white"><X size={20}/></button>
              </div>
           )}

           <div className="space-y-2">
              <label className="text-[9px] font-black uppercase tracking-widest text-white/30 ml-2">Flux de Données (Contenu complet)</label>
              <textarea required rows="8" className="w-full bg-white/5 border border-white/10 p-6 rounded-3xl outline-none focus:border-luma-blue/40 text-white resize-none font-medium text-sm leading-relaxed"
                        value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} />
           </div>

           <div className="flex justify-between items-center bg-white/5 p-6 rounded-2xl border border-white/5">
              <div className="flex items-center gap-4">
                 <span className="text-[10px] font-black uppercase text-white/40 tracking-widest">Diffusion</span>
                 <select className="bg-luma-dark border border-white/10 rounded-lg px-4 py-2 text-[10px] font-black uppercase text-white outline-none"
                        value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
                    <option value="published">Publier Directement</option>
                    <option value="draft">Brouillon</option>
                 </select>
              </div>
              <button disabled={isPending} type="submit" className="bg-white text-luma-dark px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-luma-blue transition-all shadow-xl disabled:opacity-50 flex items-center gap-3">
                 {isPending ? <Loader2 size={16} className="animate-spin"/> : <CheckCircle size={16}/>}
                 Initialiser la Publication
              </button>
           </div>
        </motion.form>
      )}

      <div className="grid grid-cols-1 gap-4">
        {posts.map(post => (
          <div key={post.id} className="bg-luma-card border border-white/5 p-6 rounded-2xl flex items-center justify-between group hover:border-white/10 transition-all shadow-xl">
             <div className="flex items-center gap-6">
                <div className="w-16 h-10 rounded-lg overflow-hidden border border-white/5 bg-white/5">
                   {post.image_url ? (
                     <img src={post.image_url} className="w-full h-full object-cover" alt="" />
                   ) : (
                     <div className="w-full h-full flex items-center justify-center text-white/10"><FileText size={16}/></div>
                   )}
                </div>
                <div>
                   <h3 className="font-bold text-white uppercase tracking-tight">{post.title}</h3>
                   <div className="flex items-center gap-4 mt-1.5">
                      <span className="text-[8px] font-black text-luma-blue uppercase tracking-widest bg-luma-blue/5 px-2 py-0.5 rounded border border-luma-blue/10">{post.category}</span>
                      <span className={`text-[8px] font-black uppercase tracking-[0.2em] ${post.status === 'published' ? 'text-moss' : 'text-white/20'}`}>
                         {post.status === 'published' ? 'En ligne' : 'Brouillon'}
                      </span>
                   </div>
                </div>
             </div>
             <div className="flex gap-2">
                <button onClick={() => toggleStatus(post.id, post.status)} className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${post.status === 'published' ? 'bg-moss/10 text-moss hover:bg-moss hover:text-white' : 'bg-white/5 text-white/20 hover:bg-white/10'}`}>
                   {post.status === 'published' ? <CheckCircle size={16}/> : <XCircle size={16}/>}
                </button>
                <Link to={`/admin/blog/${post.slug}`} className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/20 hover:text-white transition-all">
                   <Eye size={16}/>
                </Link>
                <button onClick={() => deletePost(post.id)} className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/20 hover:text-red-400 transition-all"><Trash2 size={16}/></button>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogManager;
