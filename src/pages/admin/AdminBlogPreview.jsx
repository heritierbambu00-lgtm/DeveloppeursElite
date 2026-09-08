import React, { useState, useEffect } from 'react';
import { useParams, Link, useOutletContext } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import { motion } from 'framer-motion';
import { ArrowLeft, Edit3, Share2, Eye, Shield, Cpu, Activity, Globe } from 'lucide-react';

const AdminBlogPreview = () => {
  const { slug } = useParams();
  const { profile } = useOutletContext();
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
    <div className="h-full flex items-center justify-center">
       <div className="w-10 h-10 border-4 border-luma-purple border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  if (!post) return (
    <div className="h-full flex flex-col items-center justify-center p-6 text-center">
       <h1 className="text-2xl font-black text-white uppercase italic mb-4">Signal Introuvable</h1>
       <Link to="/admin/blog" className="text-luma-purple font-bold uppercase tracking-widest text-xs">Retour au manager</Link>
    </div>
  );

  const isCTO = profile?.user_role === 'CTO';
  const isCEO = profile?.user_role === 'CEO';
  const isCOO = profile?.user_role === 'COO';

  return (
    <div className="h-full flex flex-col lg:flex-row gap-8 animate-in fade-in duration-700">
      {/* Article Content */}
      <div className="flex-1 space-y-8">
        <div className="flex items-center justify-between">
           <Link to="/admin/blog" className="inline-flex items-center text-white/20 hover:text-luma-purple font-black text-[10px] uppercase tracking-[0.4em] transition-all group">
             <ArrowLeft size={16} className="mr-3 group-hover:-translate-x-1 transition-transform" />
             Manager Flux
           </Link>
           <div className="flex gap-4">
              <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border ${post.status === 'published' ? 'bg-moss/10 border-moss/20 text-moss' : 'bg-white/5 border-white/10 text-white/20'}`}>
                {post.status}
              </span>
           </div>
        </div>

        <div className="bg-luma-card border border-white/5 p-8 lg:p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
           <div className="absolute top-0 right-0 p-8 opacity-5">
              <LogoIcon className="w-32 h-32" />
           </div>

           <header className="mb-10 relative z-10">
              <h1 className="text-3xl lg:text-5xl font-display font-black text-white tracking-tighter uppercase italic leading-[1.1] mb-6">
                {post.title}
              </h1>
              <p className="text-sm lg:text-lg text-white/40 font-medium italic border-l-2 border-luma-purple pl-6">
                {post.excerpt}
              </p>
           </header>

           {post.image_url && (
             <div className="aspect-video rounded-3xl overflow-hidden border border-white/10 mb-12 shadow-xl">
                <img src={post.image_url} alt="" className="w-full h-full object-cover" />
             </div>
           )}

           <div className="text-white/60 leading-relaxed space-y-8 font-medium whitespace-pre-wrap text-sm lg:text-base">
              {post.content}
           </div>
        </div>
      </div>

      {/* Role-Based Sidebar Panels */}
      <div className="w-full lg:w-80 space-y-6">
        {/* SHARED: Publication Node */}
        <div className="bg-white/5 border border-white/10 p-6 rounded-[2rem] shadow-lg">
           <h3 className="text-[10px] font-black uppercase text-luma-purple tracking-[0.3em] mb-4 flex items-center gap-2">
              <Activity size={14} /> Matrix Info
           </h3>
           <div className="space-y-4">
              <div className="flex justify-between items-center">
                 <span className="text-[10px] text-white/30 font-bold uppercase">Signal ID</span>
                 <span className="text-[10px] text-white font-mono uppercase">{post.id.split('-')[0]}</span>
              </div>
              <div className="flex justify-between items-center">
                 <span className="text-[10px] text-white/30 font-bold uppercase">Timestamp</span>
                 <span className="text-[10px] text-white font-bold">{new Date(post.created_at).toLocaleDateString()}</span>
              </div>
           </div>
        </div>

        {/* CTO SPECIFIC: Tech & SEO */}
        {isCTO && (
          <div className="bg-luma-purple/10 border border-luma-purple/20 p-6 rounded-[2rem] shadow-xl animate-in slide-in-from-right-4 duration-500">
             <h3 className="text-[10px] font-black uppercase text-luma-purple tracking-[0.3em] mb-6 flex items-center gap-2">
                <Cpu size={14} /> CTO Protocol
             </h3>
             <div className="space-y-6">
                <div>
                   <p className="text-[9px] font-black text-luma-purple/60 uppercase mb-2">Meta Title</p>
                   <p className="text-[10px] text-white font-bold leading-tight line-clamp-2">{post.title}</p>
                </div>
                <div>
                   <p className="text-[9px] font-black text-luma-purple/60 uppercase mb-2">URL Structure</p>
                   <p className="text-[10px] text-white font-mono break-all">/blog/{post.slug}</p>
                </div>
                <button className="w-full bg-luma-purple text-white py-3 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 hover:shadow-lg transition-all active:scale-95">
                   <Edit3 size={14} /> Inject Changes
                </button>
             </div>
          </div>
        )}

        {/* CEO SPECIFIC: Impact & Distribution */}
        {isCEO && (
          <div className="bg-moss/10 border border-moss/20 p-6 rounded-[2rem] shadow-xl animate-in slide-in-from-right-4 duration-500">
             <h3 className="text-[10px] font-black uppercase text-moss tracking-[0.3em] mb-6 flex items-center gap-2">
                <Shield size={14} /> CEO Vision
             </h3>
             <div className="space-y-6">
                <div>
                   <p className="text-[9px] font-black text-moss/60 uppercase mb-2">Impact Target</p>
                   <p className="text-[10px] text-white font-bold uppercase tracking-widest">Global Market</p>
                </div>
                <div>
                   <p className="text-[9px] font-black text-moss/60 uppercase mb-2">Strategy Node</p>
                   <p className="text-[10px] text-white font-medium italic leading-relaxed">"Ce signal renforce le positionnement de leader de DEVELITE."</p>
                </div>
                <button className="w-full bg-white text-luma-dark py-3 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-moss hover:text-white transition-all active:scale-95">
                   <Share2 size={14} /> Diffuser le Signal
                </button>
             </div>
          </div>
        )}

        {/* COO SPECIFIC: Operational Log */}
        {isCOO && (
          <div className="bg-luma-blue/10 border border-luma-blue/20 p-6 rounded-[2rem] shadow-xl animate-in slide-in-from-right-4 duration-500">
             <h3 className="text-[10px] font-black uppercase text-luma-blue tracking-[0.3em] mb-6 flex items-center gap-2">
                <Globe size={14} /> COO Operations
             </h3>
             <div className="space-y-6">
                <div className="flex justify-between items-center">
                   <span className="text-[10px] text-white/30 font-bold uppercase">Visibility</span>
                   <span className="text-[10px] text-luma-blue font-black uppercase tracking-widest">{post.status}</span>
                </div>
                <div>
                   <p className="text-[9px] font-black text-luma-blue/60 uppercase mb-2">Last Sync</p>
                   <p className="text-[10px] text-white font-bold">{new Date().toLocaleString()}</p>
                </div>
                <div className="pt-4 border-t border-white/5">
                   <p className="text-[9px] font-black text-white/20 uppercase text-center italic">Node Health: Optimal</p>
                </div>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

const LogoIcon = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="15" y="15" width="50" height="70" rx="6" fill="currentColor" />
    <path d="M65 15H75C83.2843 15 90 21.7157 90 30V70C90 78.2843 83.2843 85 75 85H65V15Z" fill="currentColor" />
  </svg>
);

export default AdminBlogPreview;
