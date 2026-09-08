import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, Clock, ChevronRight, Tag } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTag, setActiveTag] = useState(null);

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
    let result = posts;

    // Filter by search
    if (searchQuery) {
      result = result.filter(p =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.excerpt?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by tags
    if (activeTag) {
      result = result.filter(p => p.tags && p.tags.includes(activeTag));
    }

    setFilteredPosts(result);
  }, [searchQuery, activeTag, posts]);

  // Extract all unique tags
  const allTags = Array.from(new Set(posts.flatMap(p => p.tags || [])));

  return (
    <div className="min-h-screen bg-paper font-body selection:bg-clay selection:text-paper">
      <Navbar />

      <main className="pt-32 pb-24">
        {/* HERO SECTION - Style DevElite */}
        <section className="container mx-auto px-6 mb-20 text-center">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-clay/5 border border-clay/10 text-clay mb-8 backdrop-blur-sm mx-auto">
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Intelligence Log</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-black text-ink mb-8 tracking-tighter uppercase leading-none italic">
            Journal de la <span className="text-clay">Matrice.</span>
          </h1>

          <p className="text-lg lg:text-xl text-smoke max-w-2xl mx-auto leading-relaxed font-medium mb-12">
            Exploration des frontières de l'ingénierie logicielle et de l'intelligence artificielle par le labo DEVELITE.
          </p>

          {/* SEARCH & FILTERS */}
          <div className="max-w-4xl mx-auto space-y-8">
             <div className="relative group">
                <div className="absolute inset-y-0 left-6 flex items-center text-line group-focus-within:text-clay transition-colors">
                   <Search size={22} />
                </div>
                <input
                  type="text"
                  placeholder="Rechercher un signal dans la base..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border border-line rounded-[2rem] pl-16 pr-8 py-5 outline-none focus:border-clay/40 shadow-2xl shadow-ink/5 transition-all text-sm lg:text-base font-bold text-ink"
                />
             </div>

             {allTags.length > 0 && (
               <div className="flex flex-wrap justify-center gap-3">
                  <button
                    onClick={() => setActiveTag(null)}
                    className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all ${!activeTag ? "bg-ink text-white border-ink shadow-lg" : "bg-white text-smoke border-line hover:border-clay/30"}`}
                  >
                    Tous les flux
                  </button>
                  {allTags.map(tag => (
                    <button
                      key={tag}
                      onClick={() => setActiveTag(tag)}
                      className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all ${activeTag === tag ? "bg-clay text-white border-clay shadow-lg" : "bg-white text-smoke border-line hover:border-clay/30"}`}
                    >
                      #{tag}
                    </button>
                  ))}
               </div>
             )}
          </div>
        </section>

        {/* POSTS GRID */}
        <section className="container mx-auto px-6">
          {loading ? (
             <div className="flex justify-center py-20">
                <div className="w-12 h-12 border-4 border-clay border-t-transparent rounded-full animate-spin"></div>
             </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
              {filteredPosts.map((post) => (
                <Link to={`/blog/${post.slug}`} key={post.id} className="group flex flex-col bg-white rounded-[3rem] p-5 pb-10 border border-line shadow-sm hover:shadow-2xl transition-all duration-500">
                  <div className="aspect-[16/10] bg-paper rounded-[2.5rem] overflow-hidden mb-8 relative border border-line">
                     {post.image_url ? (
                       <img src={post.image_url} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                     ) : (
                       <div className="w-full h-full bg-mist flex items-center justify-center text-clay/20">
                          <Tag size={48} />
                       </div>
                     )}
                     <div className="absolute top-5 right-5 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest border border-line shadow-sm">
                        {post.category}
                     </div>
                  </div>

                  <div className="px-4 flex-1 flex flex-col">
                     <h3 className="text-2xl font-display font-black text-ink mb-4 group-hover:text-clay transition-colors uppercase leading-tight line-clamp-2 italic">{post.title}</h3>
                     <p className="text-smoke text-[14.5px] font-medium line-clamp-3 leading-relaxed mb-10 flex-1">
                        {post.excerpt}
                     </p>

                     <div className="flex items-center justify-between border-t border-line pt-8 text-[10px] font-black uppercase tracking-widest text-smoke">
                        <div className="flex items-center">
                           <Clock size={14} className="mr-2 text-clay" />
                           <span>{new Date(post.created_at).toLocaleDateString()}</span>
                        </div>
                        <span className="text-clay flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                          Lire le signal <ChevronRight size={14} />
                        </span>
                     </div>
                  </div>
                </Link>
              ))}

              {filteredPosts.length === 0 && (
                <div className="col-span-full py-24 text-center border-2 border-dashed border-line rounded-[3rem] opacity-30">
                   <h4 className="text-xl font-black text-ink uppercase tracking-widest italic">Aucune correspondance dans la matrice.</h4>
                </div>
              )}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
