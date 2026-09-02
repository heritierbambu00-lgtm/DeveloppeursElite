import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [session, setSession] = useState(null);

  useEffect(() => {
    let mounted = true;

    const checkAuth = async () => {
      try {
        const { data: { session: currentSession } } = await supabase.auth.getSession();

        if (!mounted) return;
        setSession(currentSession);

        if (currentSession) {
          // Fetch profile
          const { data: profile, error } = await supabase
            .from('profiles')
            .select('user_role')
            .eq('id', currentSession.user.id)
            .single();

          if (!mounted) return;

          // Si on ne trouve pas de profil, on crée un profil par défaut ou on autorise l'accès de base
          const userRole = profile?.user_role || 'member';

          if (allowedRoles.length === 0 || allowedRoles.includes(userRole)) {
            setAuthorized(true);
          } else {
            setAuthorized(false);
          }
        }
      } catch (err) {
        console.error("Auth Check Error:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (mounted) {
        setSession(session);
        checkAuth();
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [allowedRoles]);

  if (loading) {
    return (
      <div className="min-h-screen bg-luma-dark flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
           <div className="w-10 h-10 border-4 border-luma-purple border-t-transparent rounded-full animate-spin"></div>
           <p className="text-white/20 text-xs font-bold uppercase tracking-widest">Séquence d'accès...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  if (!authorized) {
    return <Navigate to="/denied" replace />;
  }

  return children;
};

export default ProtectedRoute;
