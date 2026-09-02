import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../components/Logo';

const AccessDenied = () => {
  return (
    <div className="min-h-screen bg-paper flex items-center justify-center px-6 text-center">
      <div className="max-w-md">
        <div className="flex justify-center mb-8">
           <Logo className="w-16 h-16 opacity-20 grayscale" />
        </div>
        <h1 className="font-display font-bold text-4xl tracking-tight text-ink mb-4">Accès Restreint</h1>
        <p className="text-smoke leading-relaxed mb-8">
          Votre compte ne dispose pas des autorisations nécessaires pour accéder à cette section.
          Veuillez contacter l'administrateur système de DEVELITE TECH si vous pensez qu'il s'agit d'une erreur.
        </p>
        <Link
          to="/admin"
          className="inline-flex items-center gap-3 bg-ink text-paper font-semibold text-sm px-8 py-3 rounded-md hover:bg-clay transition-colors duration-300"
        >
          Retour au Dashboard
        </Link>
      </div>
    </div>
  );
};

export default AccessDenied;
