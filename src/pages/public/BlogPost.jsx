import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, User, Clock, Share2 } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

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
    <div className="min-h-screen bg-paper flex flex-col items-center justify-center p-6 text-center">
       <h1 className="text-4xl font-black mb-4">Signal Perdu.</h1>
       <p className="text-smoke mb-8">Cet article n'existe pas ou a été retiré de la matrice.</p>
       <Link to="/blog" className="bg-ink text-white px-8 py-3 rounded-xl font-bold uppercase tracking-widest">Retour au journal</Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-paper font-body selection:bg-clay selection:text-paper">
      <Navbar />

      <article className="pt-24 lg:pt-32">
        {/* Premium Matrix Header */}
        <header className="relative bg-ink py-20 lg:py-32 overflow-hidden text-left">
           <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="absolute top-0 right-0 w-96 h-96 bg-clay blur-[120px] rounded-full"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-moss blur-[120px] rounded-full"></div>
           </div>

           <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 xl:px-10 2xl:max-w-[90rem] relative z-10">
              <Link to="/blog" className="inline-flex items-center text-paper/40 hover:text-white mb-12 font-black text-[10px] uppercase tracking-[0.4em] transition-all group">
                <ArrowLeft size={16} className="mr-3 group-hover:-translate-x-2 transition-transform" />
                Retour au journal
              </Link>

              <div className="max-w-4xl">
                 <div className="flex flex-wrap items-center gap-6 mb-10">
                    <span className="px-4 py-1.5 bg-clay/20 border border-clay/30 rounded-full text-clay text-[10px] font-black uppercase tracking-widest">
                       {post.category}
                    </span>
                    <div className="flex items-center text-paper/30 text-[10px] font-black uppercase tracking-widest gap-2">
                       <Calendar size={14} className="text-clay" />
                       {new Date(post.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </div>
                 </div>

                 <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-black text-white tracking-tighter uppercase italic leading-[1] mb-12">
                   {post.title}
                 </h1>

                 <div className="flex items-center gap-6 pt-10 border-t border-white/5">
                    <div className="w-12 h-12 bg-white/5 rounded-full border border-white/10 flex items-center justify-center text-clay">
                       <User size={24} />
                    </div>
                    <div>
                       <p className="text-white font-black text-xs uppercase tracking-widest">DEVELITE INTEL</p>
                       <p className="text-paper/20 text-[9px] font-black uppercase tracking-[0.3em]">Protocol Node 0.2</p>
                    </div>
                 </div>
              </div>
           </div>
        </header>

        {/* Hero Image */}
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 xl:px-10 2xl:max-w-[90rem] -mt-16 lg:-mt-24 relative z-20 mb-20">
           <div className="aspect-[21/9] w-full rounded-[3rem] lg:rounded-[4rem] overflow-hidden shadow-2xl border border-white/10 bg-mist">
              {post.image_url ? (
                <img src={post.image_url} alt={post.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-mist opacity-10">
                   <i className="fa-solid fa-newspaper text-9xl text-clay"></i>
                </div>
              )}
           </div>
        </div>

        {/* Content Body */}
        <div className="mx-auto w-full max-w-3xl px-6 pb-24">
           <div className="prose prose-xl prose-slate max-w-none">
              <p className="text-xl lg:text-2xl font-bold text-smoke italic leading-relaxed mb-16 border-l-4 border-clay pl-8">
                {post.excerpt}
              </p>

              <div className="text-[17px] lg:text-[19px] text-ink/80 leading-[1.8] space-y-10 font-medium whitespace-pre-wrap">
                {post.content}
              </div>
           </div>

           {/* Footer sharing */}
           <div className="mt-20 pt-12 border-t border-line flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="flex items-center gap-4">
                 <span className="text-[10px] font-black uppercase tracking-widest text-smoke">Diffuser le signal</span>
                 <div className="flex gap-2">
                    {[1, 2, 3].map(i => (
                      <button key={i} className="w-10 h-10 rounded-xl bg-white border border-line flex items-center justify-center text-smoke hover:bg-clay hover:text-white transition-all">
                        <Share2 size={16} />
                      </button>
                    ))}
                 </div>
              </div>
              <Link to="/blog" className="font-black text-xs uppercase tracking-[0.2em] text-clay hover:text-ink transition-colors flex items-center gap-3 group">
                 Retour au journal <div className="h-[2px] w-8 bg-clay group-hover:w-12 transition-all"></div>
              </Link>
           </div>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default BlogPost;
