import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, User, Clock, Share2, Heart, MessageSquare, Send } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState({ name: '', text: '' });

  useEffect(() => {
    fetchPost();
  }, [slug]);

  async function fetchPost() {
    setLoading(true);
    const { data } = await supabase
      .from('posts')
      .select('*')
      .eq('slug', slug)
      .single();

    setPost(data);
    setLoading(false);
  }

  if (loading) return (
    <div className="min-h-screen bg-paper flex items-center justify-center">
       <div className="w-12 h-12 border-4 border-clay border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  if (!post) return (
    <div className="min-h-screen bg-paper flex flex-col items-center justify-center p-6 text-center font-body">
       <h1 className="text-4xl font-black mb-4">Signal Perdu.</h1>
       <p className="text-smoke mb-8 font-bold">Cet article n'existe pas ou a été retiré de la matrice.</p>
       <Link to="/blog" className="bg-ink text-white px-8 py-4 rounded-2xl font-black uppercase tracking-[0.2em] transition-all hover:bg-clay">Retour au journal</Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-white font-body selection:bg-clay selection:text-paper overflow-x-hidden">
      <Navbar />

      <main>
        {/* PREMIUM HEADER - Exactly as DevElite */}
        <header className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 bg-luma-dark overflow-hidden text-left">
           <div className="absolute inset-0 opacity-20 pointer-events-none">
              <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-luma-purple rounded-full blur-[120px]"></div>
              <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-luma-blue rounded-full blur-[100px]"></div>
           </div>

           <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 xl:px-10 2xl:max-w-[90rem] relative z-10">
              <Link to="/blog" className="inline-flex items-center text-white/40 hover:text-white mb-12 font-black text-[10px] uppercase tracking-[0.4em] transition-all group">
                <ArrowLeft size={16} className="mr-3 group-hover:-translate-x-2 transition-transform" />
                Retour au journal
              </Link>

              <div className="max-w-4xl">
                 <div className="flex items-center space-x-4 mb-8">
                    <span className="px-5 py-2 bg-white/5 border border-white/10 rounded-full text-luma-blue text-[10px] font-black uppercase tracking-widest">
                       {post.category}
                    </span>
                    <div className="flex items-center text-white/40 text-[10px] font-black uppercase tracking-widest gap-2">
                       <Calendar size={14} className="text-luma-blue" />
                       {new Date(post.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </div>
                 </div>

                 <h1 className="text-4xl md:text-6xl lg:text-8xl font-display font-black text-white tracking-tighter uppercase leading-[0.95] mb-12 italic">
                   {post.title}
                 </h1>

                 <div className="flex items-center space-x-6 border-t border-white/5 pt-10">
                    <div className="flex items-center space-x-4">
                       <div className="w-14 h-14 bg-luma-purple rounded-full flex items-center justify-center text-white font-black text-xl shadow-lg shadow-luma-purple/20">
                          {profile?.full_name?.charAt(0) || 'D'}
                       </div>
                       <div>
                          <div className="text-white font-black text-xs uppercase tracking-[0.2em]">DEVELITE INTELLIGENCE</div>
                          <div className="text-white/20 text-[9px] font-black uppercase tracking-[0.3em]">Expert Technique • Matrice</div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </header>

        {/* HERO IMAGE OVERLAP */}
        <div className="container mx-auto px-6 -mt-16 lg:-mt-24 relative z-20 mb-20">
           <div className="aspect-[21/9] w-full rounded-[3rem] lg:rounded-[4rem] overflow-hidden shadow-2xl border border-white/10 bg-slate-100 max-w-7xl mx-auto">
              {post.image_url ? (
                <img src={post.image_url} alt={post.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                   <i className="fa-solid fa-file-waveform text-9xl text-white/5"></i>
                </div>
              )}
           </div>
        </div>

        {/* CONTENT BODY */}
        <div className="container mx-auto px-6">
           <div className="max-w-3xl mx-auto">
              <div className="prose prose-xl prose-slate max-w-none">
                 <p className="text-2xl lg:text-4xl font-bold text-ink/40 italic leading-relaxed mb-16 border-l-4 border-luma-purple pl-8">
                   {post.excerpt}
                 </p>

                 <div className="text-lg lg:text-2xl text-ink leading-relaxed space-y-10 font-medium whitespace-pre-wrap">
                   {post.content}
                 </div>
              </div>

              {/* LIKE BUTTON */}
              <div className="mt-16 flex items-center justify-between">
                 <button className="flex items-center space-x-3 px-8 py-4 rounded-2xl border transition-all bg-paper border-line text-ink/40 hover:border-red-200 hover:text-red-500 hover:bg-red-50 group">
                    <Heart size={22} className="group-hover:fill-red-500 transition-all" />
                    <span className="font-black text-xs uppercase tracking-widest">J'aime ce signal</span>
                 </button>
              </div>

              {/* DISCUSSION SPACE */}
              <div className="mt-32 pt-20 border-t border-line">
                 <div className="flex items-center space-x-4 mb-12">
                    <div className="w-14 h-14 bg-ink/5 rounded-2xl flex items-center justify-center text-ink">
                       <MessageSquare size={28} />
                    </div>
                    <h3 className="text-3xl font-display font-black text-ink uppercase tracking-tight italic">Espace Discussion</h3>
                 </div>

                 <div className="grid lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-1">
                       <form className="space-y-6">
                          <input
                            type="text" placeholder="Votre Nom" required
                            className="w-full bg-paper border border-line rounded-2xl px-6 py-5 outline-none focus:border-clay transition-all font-bold text-sm"
                            value={comment.name} onChange={e => setComment({...comment, name: e.target.value})}
                          />
                          <textarea
                            placeholder="Votre avis ou question sur ce signal..." required
                            className="w-full bg-paper border border-line rounded-2xl px-6 py-5 outline-none focus:border-clay transition-all font-medium text-sm min-h-[150px] resize-none"
                            value={comment.text} onChange={e => setComment({...comment, text: e.target.value})}
                          ></textarea>
                          <button className="w-full bg-ink text-white py-5 rounded-2xl font-black uppercase text-[10px] tracking-[0.3em] hover:bg-clay transition-all flex items-center justify-center gap-4 shadow-xl active:scale-95">
                             <Send size={16} /> Envoyer le Signal
                          </button>
                       </form>
                    </div>
                    <div className="lg:col-span-2">
                       <div className="py-20 text-center bg-paper rounded-[3rem] border-2 border-dashed border-line">
                          <p className="text-smoke font-black uppercase text-xs tracking-widest">Initialisation de la zone de dialogue...</p>
                          <p className="text-smoke/40 text-[10px] mt-2 font-medium">Soyez le premier à réagir.</p>
                       </div>
                    </div>
                 </div>
              </div>

              {/* FOOTER ARTICLE */}
              <div className="mt-32 pt-16 border-t border-line flex flex-col md:flex-row justify-between items-center gap-10">
                 <div className="flex items-center space-x-6">
                    <span className="text-[10px] font-black uppercase tracking-widest text-smoke">Diffuser l'Excellence</span>
                    <div className="flex space-x-3">
                       {[1, 2, 3].map(i => (
                         <button key={i} className="w-12 h-12 rounded-2xl bg-paper border border-line flex items-center justify-center text-ink/40 hover:bg-luma-purple hover:text-white transition-all shadow-sm">
                           <Share2 size={20} />
                         </button>
                       ))}
                    </div>
                 </div>
                 <Link to="/blog" className="font-display font-black text-sm uppercase tracking-tighter text-ink hover:text-luma-purple transition-all group flex items-center gap-4 italic">
                    Retour aux articles <div className="w-12 h-[2px] bg-ink group-hover:bg-luma-purple group-hover:w-16 transition-all" />
                 </Link>
              </div>
           </div>
        </div>
      </main>

      <div className="mt-24">
        <Footer />
      </div>
    </div>
  );
};

export default BlogPost;
