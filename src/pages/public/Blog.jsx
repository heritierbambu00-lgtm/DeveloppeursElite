import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, Clock, ChevronRight } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    setLoading(true);
    const { data } = await supabase
      .from('posts')
      .select('*')
      .eq('status', 'published')
      .order('created_at', { ascending: false });

    setPosts(data || []);
    setFilteredPosts(data || []);
    setLoading(false);
  }

  useEffect(() => {
    const result = posts.filter(p =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPosts(result);
  }, [searchQuery, posts]);

  return (
    <div className="min-h-screen bg-paper font-body selection:bg-clay selection:text-paper">
      <Navbar />
      <main className="pt-32 pb-24">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 xl:px-10 2xl:max-w-[90rem]">
          <div className="mb-20 text-center">
            <p className="text-[11px] font-black uppercase tracking-[0.4em] text-clay mb-4">Intelligence Log</p>
            <h1 className="font-display font-black text-5xl lg:text-7xl tracking-tighter uppercase italic leading-none">Journal de la <span className="text-clay">Matrice.</span></h1>

            {/* SEARCH BAR */}
            <div className="max-w-2xl mx-auto mt-12 relative group">
               <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-line group-focus-within:text-clay transition-colors" size={20} />
               <input
                 type="text"
                 placeholder="Rechercher un signal..."
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 className="w-full bg-white border border-line rounded-3xl pl-16 pr-8 py-5 outline-none focus:border-clay/40 shadow-xl shadow-ink/5 transition-all text-sm lg:text-base font-bold"
               />
            </div>
          </div>

          {loading ? (
             <div className="flex justify-center py-20">
                <div className="w-10 h-10 border-4 border-clay border-t-transparent rounded-full animate-spin"></div>
             </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
              {filteredPosts.map(post => (
                <Link to={`/blog/${post.slug}`} key={post.id} className="group flex flex-col">
                  <motion.div
                    whileHover={{ y: -8 }}
                    className="flex flex-col h-full"
                  >
                    <div className="aspect-[16/10] bg-white rounded-[2.5rem] overflow-hidden mb-8 relative border border-line shadow-sm">
                       {post.image_url ? (
                         <img src={post.image_url} alt={post.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                       ) : (
                         <div className="w-full h-full bg-mist flex items-center justify-center">
                            <i className="fa-solid fa-newspaper text-clay/10 text-6xl"></i>
                         </div>
                       )}
                       <span className="absolute top-5 right-5 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest border border-line shadow-sm">
                          {post.category}
                       </span>
                    </div>

                    <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-smoke mb-4">
                       <Clock size={12} className="text-clay" />
                       <span>{new Date(post.created_at).toLocaleDateString()}</span>
                    </div>

                    <h2 className="font-display font-black text-2xl lg:text-3xl tracking-tighter text-ink mb-4 group-hover:text-clay transition-colors uppercase italic leading-none line-clamp-2">
                       {post.title}
                    </h2>

                    <p className="text-sm text-ink/60 leading-relaxed line-clamp-3 font-medium mb-10 flex-1">
                       {post.excerpt || post.content.substring(0, 150) + '...'}
                    </p>

                    <div className="pt-8 border-t border-line/50 flex items-center justify-between group">
                       <span className="text-[11px] font-black text-ink uppercase tracking-widest">Lire l'article</span>
                       <div className="w-10 h-10 rounded-full bg-ink/5 flex items-center justify-center group-hover:bg-clay group-hover:text-white transition-all duration-500">
                          <ChevronRight size={18} className="transition-transform group-hover:translate-x-0.5" />
                       </div>
                    </div>
                  </motion.div>
                </Link>
              ))}

              {filteredPosts.length === 0 && (
                 <div className="col-span-full py-20 text-center border-2 border-dashed border-line rounded-[3rem] opacity-30">
                    <h3 className="font-display font-black text-2xl uppercase italic">Aucun signal détecté.</h3>
                 </div>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
