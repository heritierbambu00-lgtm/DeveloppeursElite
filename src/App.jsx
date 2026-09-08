import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Services from './components/Services';
import Team from './components/Team';
import Projects from './components/Projects';
import SkillsMatrix from './components/SkillsMatrix';
import Impact from './components/Impact';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import Loader from './components/Loader';
import PublicAIChatbot from './components/PublicAIChatbot';
import Blog from './pages/public/Blog';
import BlogPost from './pages/public/BlogPost';
import LoginPage from './pages/auth/LoginPage';
import AccessDenied from './pages/auth/AccessDenied';
import AdminLayout from './layouts/AdminLayout';
import MainDashboard from './pages/admin/MainDashboard';
import ProfileSettings from './pages/admin/ProfileSettings';
import ProjectManager from './pages/admin/ProjectManager';
import UserManagement from './pages/admin/UserManagement';
import Inbox from './pages/admin/Inbox';
import KanbanBoard from './pages/admin/KanbanBoard';
import NewProject from './pages/admin/NewProject';
import Analytics from './pages/admin/Analytics';
import TestimonialManager from './pages/admin/TestimonialManager';
import BlogManager from './pages/admin/BlogManager';
import AdminBlogPreview from './pages/admin/AdminBlogPreview';
import SkillsManager from './pages/admin/SkillsManager';
import ProtectedRoute from './components/auth/ProtectedRoute';

import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';

import { supabase } from './lib/supabaseClient';

// External Refresh Revelations for consistent animation triggering
const refreshReveals = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.05, rootMargin: '0px 0px 50px 0px' }
  );
  const elements = document.querySelectorAll('.rv, .curtain, .rv-mask, .mask');
  elements.forEach((el) => observer.observe(el));
};

const LandingPage = () => {
  const [loading, setLoading] = useState(true);
  const [latestPosts, setLatestPosts] = useState([]);
  const { t } = useLanguage();

  useEffect(() => {
    async function fetchData() {
      try {
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .eq('status', 'published')
          .order('created_at', { ascending: false })
          .limit(3);

        if (error) {
          console.warn("Table 'posts' non trouvée ou vide. Ignoré.");
        } else if (data) {
          setLatestPosts(data);
        }
      } catch (err) {
        console.error("Erreur Matrix Data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (!loading) {
      setTimeout(refreshReveals, 150);
    }
  }, [loading]);

  return (
    <div className="min-h-screen bg-paper dark:bg-luma-dark selection:bg-clay selection:text-paper font-body text-ink dark:text-white antialiased transition-colors duration-500">
      {loading && <Loader onFinish={() => setLoading(false)} />}
      <CustomCursor />
      <Navbar />
      <main id="accueil">
        <Hero />
        <Marquee />
        <section id="apropos" className="py-24 lg:py-32 bg-paper dark:bg-luma-dark relative overflow-hidden transition-colors duration-500">
          <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 xl:px-10 2xl:max-w-[90rem] grid lg:grid-cols-12 gap-12 relative z-10">
            <div className="lg:col-span-4 min-w-0">
              <p className="rv text-[11px] font-black uppercase tracking-[0.4em] text-clay">{t('section.about.badge')}</p>
              <h2 className="rv d1 mt-6 font-display font-black tracking-tight text-4xl lg:text-[3.2rem] leading-[0.98] uppercase italic dark:text-white">
                {t('section.about.title')}
              </h2>
            </div>
            <div className="lg:col-span-8 lg:pl-10 min-w-0">
              <p className="rv d1 font-display font-bold text-2xl sm:text-[1.85rem] leading-tight tracking-tight text-ink dark:text-white uppercase">
                {t('section.about.p1')}
              </p>
              <div className="rv d2 mt-12 bg-white/[0.4] dark:bg-white/[0.03] backdrop-blur-xl rounded-3xl p-8 lg:p-10 border border-white/60 dark:border-white/5 shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-clay"></div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-clay mb-4">{t('section.about.mission.label')}</p>
                <p className="text-[17px] leading-relaxed text-ink/80 dark:text-white/80 font-medium italic text-balance">
                  {t('section.about.mission.text')}
                </p>
              </div>
            </div>
          </div>

          {/* Background Ambient Glow */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-clay/5 blur-[120px] rounded-full"></div>
        </section>
        <Services />
        <Projects />
        <SkillsMatrix />
        <Team />
        <Impact />

        {/* BLOG SUMMARY SECTION */}
        <section className="py-32 bg-white dark:bg-luma-dark text-left transition-colors duration-500">
           <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 xl:px-10 2xl:max-w-[90rem]">
              <div className="flex justify-between items-end mb-16 gap-6">
                 <div>
                    <div className="text-clay font-black text-[10px] uppercase tracking-[0.4em] mb-4">{t('section.blog.badge')}</div>
                    <h2 className="text-4xl md:text-6xl font-black text-ink dark:text-white tracking-tighter uppercase leading-none">{t('section.blog.title')} <br/> <span className="text-clay">{t('section.blog.matrix')}</span></h2>
                 </div>
                 <Link to="/blog" className="font-black text-xs uppercase tracking-widest text-ink dark:text-white hover:text-clay transition-colors border-b-2 border-clay/10 pb-1">
                    {t('nav.blog')}
                 </Link>
              </div>

              {latestPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 text-left">
                   {latestPosts.map((post) => (
                     <Link to={`/blog/${post.slug}`} key={post.id} className="group flex flex-col">
                        <div className="aspect-[16/10] bg-paper dark:bg-white/5 rounded-[2.5rem] overflow-hidden mb-8 relative border border-line dark:border-white/10">
                           {post.image_url ? (
                             <img src={post.image_url} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                           ) : (
                             <div className="w-full h-full bg-mist dark:bg-white/5" />
                           )}
                           <div className="absolute top-4 right-4 bg-white/90 dark:bg-luma-dark/90 backdrop-blur-md px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border border-line dark:border-white/10 shadow-sm dark:text-white">
                              {post.category}
                           </div>
                        </div>
                        <h3 className="text-2xl font-black text-ink dark:text-white mb-4 group-hover:text-clay transition-colors uppercase leading-tight line-clamp-2 italic">{post.title}</h3>
                        <p className="text-ink/60 dark:text-white/60 text-[14.5px] font-medium line-clamp-2 leading-relaxed mb-6">
                           {post.excerpt}
                        </p>
                        <div className="flex items-center text-[10px] font-black uppercase tracking-widest text-smoke dark:text-white/20">
                           <span>{new Date(post.created_at).toLocaleDateString()}</span>
                           <div className="mx-3 w-1 h-1 bg-line dark:bg-white/10 rounded-full" />
                           <span className="text-clay">{t('section.blog.read')}</span>
                        </div>
                     </Link>
                   ))}
                </div>
              ) : (
                <div className="py-24 text-center border-2 border-dashed border-line dark:border-white/10 rounded-[3rem] opacity-30">
                   <h4 className="text-xl font-black text-ink dark:text-white uppercase tracking-widest italic leading-none mb-2">{t('section.blog.empty')}</h4>
                   <p className="text-sm font-bold text-smoke dark:text-white/40 uppercase tracking-widest">{t('section.blog.wait')}</p>
                </div>
              )}
           </div>
        </section>

        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <PublicAIChatbot />
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/denied" element={<AccessDenied />} />

            <Route path="/admin" element={
              <ProtectedRoute allowedRoles={['CEO', 'CTO', 'COO', 'admin', 'manager', 'member']}>
                <AdminLayout />
              </ProtectedRoute>
            }>
              <Route index element={<MainDashboard />} />
              <Route path="profile" element={<ProfileSettings />} />
              <Route path="projects" element={
                <ProtectedRoute allowedRoles={['CEO', 'CTO', 'COO', 'admin', 'manager']}>
                  <KanbanBoard />
                </ProtectedRoute>
              } />
              <Route path="projects/new" element={
                <ProtectedRoute allowedRoles={['CEO', 'CTO', 'COO', 'admin', 'manager']}>
                  <NewProject />
                </ProtectedRoute>
              } />
              <Route path="users" element={
                <ProtectedRoute allowedRoles={['CEO', 'CTO', 'admin']}>
                  <UserManagement />
                </ProtectedRoute>
              } />
              <Route path="analytics" element={
                <ProtectedRoute allowedRoles={['CEO', 'CTO', 'COO', 'admin']}>
                  <Analytics />
                </ProtectedRoute>
              } />
              <Route path="testimonials" element={
                <ProtectedRoute allowedRoles={['CEO', 'CTO', 'admin']}>
                  <TestimonialManager />
                </ProtectedRoute>
              } />
              <Route path="blog" element={
                <ProtectedRoute allowedRoles={['CEO', 'CTO', 'admin']}>
                  <BlogManager />
                </ProtectedRoute>
              } />
              <Route path="blog/:slug" element={
                <ProtectedRoute allowedRoles={['CEO', 'CTO', 'COO', 'admin']}>
                  <AdminBlogPreview />
                </ProtectedRoute>
              } />
              <Route path="skills" element={
                <ProtectedRoute allowedRoles={['CEO', 'CTO', 'COO', 'admin']}>
                  <SkillsManager />
                </ProtectedRoute>
              } />
              <Route path="inbox" element={
                <ProtectedRoute allowedRoles={['CEO', 'CTO', 'COO', 'admin', 'manager']}>
                  <Inbox />
                </ProtectedRoute>
              } />
            </Route>
          </Routes>
        </Router>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
