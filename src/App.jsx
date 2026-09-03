import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Services from './components/Services';
import Team from './components/Team';
import Projects from './components/Projects';
import Impact from './components/Impact';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import Loader from './components/Loader';
import LoginPage from './pages/auth/LoginPage';
import AccessDenied from './pages/auth/AccessDenied';
import AdminLayout from './layouts/AdminLayout';
import MainDashboard from './pages/admin/MainDashboard';
import ProfileSettings from './pages/admin/ProfileSettings';
import ProjectManager from './pages/admin/ProjectManager';
import UserManagement from './pages/admin/UserManagement';
import Inbox from './pages/admin/Inbox';
import ProtectedRoute from './components/auth/ProtectedRoute';

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

  useEffect(() => {
    if (!loading) {
      setTimeout(refreshReveals, 150);
    }
  }, [loading]);

  return (
    <div className="min-h-screen bg-paper selection:bg-clay selection:text-paper font-body text-ink antialiased">
      {loading && <Loader onFinish={() => setLoading(false)} />}
      <CustomCursor />
      <Navbar />
      <main id="accueil">
        <Hero />
        <Marquee />
        <section id="apropos" className="py-24 lg:py-32">
          <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 xl:px-10 2xl:max-w-[90rem] grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4 min-w-0">
              <p className="rv text-[11px] font-semibold uppercase tracking-[0.3em] text-clay">(01) — Le labo</p>
              <h2 className="rv d1 mt-4 font-display font-bold tracking-tight text-4xl lg:text-[2.9rem] leading-[1.06]">
                Innover pour l'Afrique, depuis Butembo.
              </h2>
            </div>
            <div className="lg:col-span-8 lg:pl-6 min-w-0">
              <p className="rv d1 font-display font-medium text-2xl sm:text-[1.75rem] leading-snug tracking-tight text-ink">
                DEVELITE TECH est un centre d'excellence technologique dédié à la résolution de défis complexes par le biais de l'ingénierie avancée.
              </p>
              <div className="rv d2 mt-10 bg-white rounded-r-lg p-7 sm:p-8 border border-line border-l-[3px] border-l-clay">
                <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-clay mb-3">Notre mission</p>
                <p className="text-[15.5px] leading-relaxed text-ink/80">
                  Bâtir les infrastructures numériques de demain et former une élite technique capable de porter les ambitions du continent avec une vision globale.
                </p>
              </div>
            </div>
          </div>
        </section>
        <Services />
        <Projects />
        <Team />
        <Impact />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
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
              <ProjectManager />
            </ProtectedRoute>
          } />
          <Route path="users" element={
            <ProtectedRoute allowedRoles={['CEO', 'CTO', 'admin']}>
              <UserManagement />
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
  );
}

export default App;
