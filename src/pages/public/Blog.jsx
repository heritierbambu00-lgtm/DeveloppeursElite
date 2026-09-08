import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const Blog = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    const { data } = await supabase.from('posts').select('*').order('created_at', { ascending: false });
    setPosts(data || []);
  }

  return (
    <div className="min-h-screen bg-paper font-body selection:bg-clay selection:text-paper">
      <Navbar />
      <main className="pt-32 pb-24">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 xl:px-10 2xl:max-w-[90rem]">
          <div className="mb-20 text-center">
            <p className="text-[11px] font-black uppercase tracking-[0.4em] text-clay mb-4">Intelligence Log</p>
            <h1 className="font-display font-black text-5xl lg:text-7xl tracking-tighter uppercase italic">Journal de la <span className="text-clay">Matrice</span></h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {posts.map(post => (
              <motion.article
                whileHover={{ y: -10 }}
                key={post.id} className="group cursor-pointer"
              >
                <div className="aspect-video rounded-3xl overflow-hidden border border-line mb-6 relative">
                   <div className="absolute inset-0 bg-ink/20 group-hover:bg-transparent transition-all"></div>
                   <div className="w-full h-full bg-mist flex items-center justify-center">
                      <i className="fa-solid fa-newspaper text-clay/20 text-5xl"></i>
                   </div>
                   <span className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border border-line">
                      {post.category}
                   </span>
                </div>
                <p className="text-[10px] font-black text-smoke uppercase tracking-[0.2em] mb-3">{new Date(post.created_at).toLocaleDateString()}</p>
                <h2 className="font-display font-bold text-2xl tracking-tight mb-4 group-hover:text-clay transition-colors">{post.title}</h2>
                <p className="text-sm text-ink/60 leading-relaxed line-clamp-3 mb-6">{post.excerpt || post.content.substring(0, 150) + '...'}</p>
                <div className="h-[1px] w-full bg-line/50 group-hover:bg-clay transition-all"></div>
              </motion.article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
