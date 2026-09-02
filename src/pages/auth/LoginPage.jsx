import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import Logo from '../../components/Logo';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      navigate('/admin');
    }
  };

  return (
    <div className="min-h-screen bg-paper flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-white border border-line p-8 sm:p-10 rounded-lg shadow-[0_24px_60px_-40px_rgba(24,27,32,0.35)]">
        <div className="flex flex-col items-center mb-8">
          <Logo className="w-14 h-14 mb-4" />
          <h1 className="font-display font-bold text-2xl tracking-tight text-ink">Espace Membre</h1>
          <p className="text-sm text-smoke mt-2 text-center">
            Connectez-vous pour gérer votre profil et vos projets DEVELITE.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-[12px] font-bold uppercase tracking-[0.14em] text-smoke mb-2">Email professionnel</label>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="votre@email.com"
              className="w-full rounded-md border border-line bg-paper px-4 py-3 text-[14.5px] focus:border-clay focus:ring-2 focus:ring-clay/20 outline-none transition"
            />
          </div>

          <div>
            <label className="block text-[12px] font-bold uppercase tracking-[0.14em] text-smoke mb-2">Mot de passe</label>
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-md border border-line bg-paper px-4 py-3 text-[14.5px] focus:border-clay focus:ring-2 focus:ring-clay/20 outline-none transition"
            />
          </div>

          {error && <p className="text-red-600 text-xs font-semibold">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-3 bg-ink text-paper font-semibold text-sm px-8 py-4 rounded-md hover:bg-clay transition-colors duration-300 disabled:opacity-70"
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>

        <p className="mt-8 text-center text-[11px] uppercase tracking-widest text-smoke">
          Excellence Technologique • Butembo
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
