import React, { createContext, useContext, useState, useEffect } from "react";

const LanguageContext = createContext(undefined);

export const translations = {
  fr: {
    // Navigation
    "nav.home": "Accueil",
    "nav.services": "Services",
    "nav.projects": "Projets",
    "nav.about": "Ecosystème",
    "nav.blog": "Journal",
    "nav.contact": "Liaison",
    "nav.cta": "Lancer un Projet",
    "nav.start": "Démarrer un projet",
    "menu.title": "MENU",

    // Hero Section
    "hero.title": "BÂTIR L'AVENIR",
    "hero.subtitle": "par l'ingénierie",
    "hero.highlight": "quantique.",
    "hero.desc": "DEVELITE TECH est un centre d'excellence dédié à l'ingénierie logicielle avancée et à l'intelligence artificielle appliquée. Nous forgeons les infrastructures de demain.",
    "hero.btn.solutions": "Accéder aux solutions",
    "hero.btn.project": "Initialiser un projet",
    "hero.node": "Node d'Identité 01",
    "hero.founder": "Héritier Bambu — CTO & Fondateur",

    // Stats
    "stats.projects": "Matrice de Projets",
    "stats.nodes": "Nodes d'Ingénierie",
    "stats.rd": "Protocoles R&D",
    "stats.init": "Initialisation",

    // Sections
    "section.about.badge": "(01) — System Node",
    "section.about.title": "L'excellence technologique sans compromis.",
    "section.about.p1": "DEVELITE TECH est un hub d'ingénierie avancée, fusionnant code de haute précision et vision stratégique.",
    "section.about.mission.label": "Notre Mission",
    "section.about.mission.text": "\"Forger les outils numériques qui propulsent l'Afrique dans l'ère de l'intelligence artificielle et de l'ingénierie globale.\"",

    "section.blog.badge": "Latest Insights",
    "section.blog.title": "Journal de la",
    "section.blog.matrix": "Matrice.",
    "section.blog.btn": "Consulter tout le log",
    "section.blog.read": "Lire le signal",
    "section.blog.empty": "Initialisation du flux R&D...",
    "section.blog.wait": "En attente de publication de signaux.",

    // Dashboard General
    "dash.welcome": "Bonjour",
    "dash.matrix_state": "Voici l'état opérationnel de la matrice aujourd'hui.",
    "dash.logout": "Déconnexion",
    "dash.reduce": "Réduire",
    "dash.search": "Rechercher un signal...",
  },
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.services": "Services",
    "nav.projects": "Portfolio",
    "nav.about": "Ecosystem",
    "nav.blog": "Journal",
    "nav.contact": "Liaison",
    "nav.cta": "Launch Project",
    "nav.start": "Start a project",
    "menu.title": "MENU",

    // Hero Section
    "hero.title": "BUILDING FUTURE",
    "hero.subtitle": "through quantum",
    "hero.highlight": "engineering.",
    "hero.desc": "DEVELITE TECH is a center of excellence dedicated to advanced software engineering and applied artificial intelligence. We forge tomorrow's infrastructures.",
    "hero.btn.solutions": "Access Solutions",
    "hero.btn.project": "Initialize Project",
    "hero.node": "Identity Node 01",
    "hero.founder": "Heritier Bambu — CTO & Founder",

    // Stats
    "stats.projects": "Project Matrix",
    "stats.nodes": "Engineering Nodes",
    "stats.rd": "R&D Protocols",
    "stats.init": "Initialization",

    // Sections
    "section.about.badge": "(01) — System Node",
    "section.about.title": "Technological excellence without compromise.",
    "section.about.p1": "DEVELITE TECH is an advanced engineering hub, merging high-precision code with strategic vision.",
    "section.about.mission.label": "Our Mission",
    "section.about.mission.text": "\"Forging the digital tools that propel Africa into the era of artificial intelligence and global engineering.\"",

    "section.blog.badge": "Latest Insights",
    "section.blog.title": "Matrix",
    "section.blog.matrix": "Journal.",
    "section.blog.btn": "Consult entire log",
    "section.blog.read": "Read signal",
    "section.blog.empty": "Initialising R&D flow...",
    "section.blog.wait": "Awaiting signal publication.",

    // Dashboard General
    "dash.welcome": "Welcome",
    "dash.matrix_state": "Current operational state of the matrix today.",
    "dash.logout": "Logout",
    "dash.reduce": "Collapse",
    "dash.search": "Search for a signal...",
  }
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("fr");

  useEffect(() => {
    const saved = localStorage.getItem("language");
    if (saved && (saved === "fr" || saved === "en")) {
      setLanguage(saved);
      document.documentElement.lang = saved;
    }
  }, []);

  const handleSetLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
    document.documentElement.lang = lang;
  };

  const t = (key) => {
    return (translations[language])[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
