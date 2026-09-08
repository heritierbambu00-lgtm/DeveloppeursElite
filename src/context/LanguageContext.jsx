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
    "nav.portfolio": "Portfolio",
    "menu.title": "MENU",
    "nav.admin": "Console",

    // Loader
    "loader.line1": "Ingénierie · Innovation · Excellence",
    "loader.loading": "Chargement ...",

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

    "section.services.badge": "(02) — Nos pôles",
    "section.services.title": "Cinq pôles, une même exigence.",
    "section.services.desc": "Du code à l'infrastructure, nous couvrons la chaîne complète — et nous formons celles et ceux qui la feront vivre demain.",
    "services.engineering": "Ingénierie Logicielle",
    "services.ai": "Intelligence Artificielle",
    "services.infra": "Infrastructures & Réseaux",
    "services.rd": "Recherche & Développement",
    "services.training": "Formation & Transmission",

    "section.projects.badge": "(03) — Réalisations",
    "section.projects.title": "Des solutions concrètes pour le futur.",
    "section.projects.desc": "Découvrez les projets nés au sein de DEVELITE TECH, allant de l'IA appliquée à la fintech.",
    "projects.empty": "Chargement des signaux...",
    "projects.empty_desc": "Aucun projet n'a été publié pour le moment.",
    "projects.casestudy": "Protocol Details",

    "section.blog.badge": "Latest Insights",
    "section.blog.title": "Journal de la",
    "section.blog.matrix": "Matrice.",
    "section.blog.btn": "Consulter tout le log",
    "section.blog.read": "Lire le signal",
    "section.blog.read_more": "Lire la suite",
    "section.blog.empty": "Initialisation du flux R&D...",
    "section.blog.wait": "En attente de publication de signaux.",

    "section.skills.badge": "(05) — Protocol Matrix",
    "section.skills.title": "Nodes de",
    "section.skills.highlight": "Maîtrise.",

    "section.team.badge": "(06) — Matrix Nodes",
    "section.team.title": "L'équipe",
    "section.team.desc": "Une équipe engagée qui fait avancer chaque projet — et qui bâtit les infrastructures de demain.",
    "team.join": "Rejoindre ?",
    "team.hiring": "Nous sommes à la recherche de talents.",
    "team.cta": "Initialiser Liaison",
    "team.loading": "Extraction des nodes...",
    "team.empty": "Aucun membre profilé pour le moment.",

    "section.impact.badge": "Notre cap",
    "section.impact.title": "Bâtir ici pour impacter le monde.",
    "section.impact.ici": "ICI — RDC",
    "section.impact.ici_text": "Notre point d'ancrage. Nous développons des solutions souveraines pour digitaliser l'économie et l'administration congolaise.",
    "section.impact.ensuite": "ENSUITE — AFRIQUE",
    "section.impact.ensuite_text": "Exporter notre savoir-faire pour répondre aux défis communs du continent : fintech, énergie et éducation.",
    "section.impact.enfin": "ENFIN — LE MONDE",
    "section.impact.enfin_text": "Prouver que l'excellence technique n'a pas de frontières en proposant des produits compétitifs sur le marché global.",
    "section.impact.footer": "DEVELITE TECH — Butembo, notre point de départ.",

    "section.contact.badge": "(07) — Liaison",
    "section.contact.title": "Parlons de votre projet.",
    "section.contact.desc": "Un logiciel à concevoir, un réseau à installer, une formation à organiser — ou simplement une idée à éprouver ? Écrivez-nous.",
    "contact.address": "Adresse",
    "contact.email": "Email",
    "contact.form.name": "Nom complet",
    "contact.form.mail": "Adresse email",
    "contact.form.subject": "Sujet",
    "contact.form.message": "Votre message",
    "contact.btn.send": "Envoyer le message",
    "contact.btn.sending": "Envoi en cours...",
    "contact.success": "Message bien reçu.",
    "contact.success_desc": "Merci pour votre confiance. Notre équipe vous répondra sous 24 heures.",
    "contact.btn.again": "Envoyer un autre message",

    // Dashboard General
    "dash.welcome": "Bonjour",
    "dash.matrix_state": "Voici l'état opérationnel de la matrice aujourd'hui.",
    "dash.logout": "Déconnexion",
    "dash.reduce": "Réduire",
    "dash.search": "Rechercher un signal...",
    "dash.notifications": "Alertes Matrice",
    "dash.new_project": "Nouveau Projet",
    "dash.view_pipeline": "Voir Pipeline",
    "dash.recent_projects": "Projets Récents",
    "dash.team_activity": "Activité Équipe",
    "dash.recent_signals": "Signaux Récents",
    "dash.all": "Tout voir",
    "dash.inbox": "Boîte mail",
    "dash.status": "Statut",
    "dash.actions": "Actions",

    // Footer
    "footer.tagline": "Construisons ensemble ce qui vient.",
    "footer.btn": "Démarrer liaison",
    "footer.desc": "Système d'ingénierie globale et de recherche en IA. Bâtir la matrice numérique du futur depuis Butembo.",
    "footer.nav": "Entreprise",
    "footer.protocols": "Protocoles",
    "footer.coord": "Coordination",
    "footer.copyright": "© 2026 DEVELITE TECH — Matrix Version 2.0.4.",
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
    "nav.portfolio": "Portfolio",
    "menu.title": "MENU",
    "nav.admin": "Console",

    // Loader
    "loader.line1": "Engineering · Innovation · Excellence",
    "loader.loading": "Loading ...",

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

    "section.services.badge": "(02) — Our Units",
    "section.services.title": "Five units, one standard.",
    "section.services.desc": "From code to infrastructure, we cover the full chain — and we train those who will sustain it tomorrow.",
    "services.engineering": "Software Engineering",
    "services.ai": "Artificial Intelligence",
    "services.infra": "Infra & Networks",
    "services.rd": "Research & Design",
    "services.training": "Training & Mentor",

    "section.projects.badge": "(03) — Portfolio",
    "section.projects.title": "Concrete solutions for the future.",
    "section.projects.desc": "Discover projects born within DEVELITE TECH, from applied AI to fintech.",
    "projects.empty": "Loading signals...",
    "projects.empty_desc": "No projects have been published yet.",
    "projects.casestudy": "Protocol Details",

    "section.blog.badge": "Latest Insights",
    "section.blog.title": "Matrix",
    "section.blog.matrix": "Journal.",
    "section.blog.btn": "Consult entire log",
    "section.blog.read": "Read signal",
    "section.blog.read_more": "Read more",
    "section.blog.empty": "Initialising R&D flow...",
    "section.blog.wait": "Awaiting signal publication.",

    "section.skills.badge": "(05) — Protocol Matrix",
    "section.skills.title": "Mastery",
    "section.skills.highlight": "Nodes.",

    "section.team.badge": "(06) — Matrix Nodes",
    "section.team.title": "The Team",
    "section.team.desc": "A committed team moving every project forward — and building the infrastructures of tomorrow.",
    "team.join": "Join Us?",
    "team.hiring": "We are always looking for new talents.",
    "team.cta": "Initialize Liaison",
    "team.loading": "Extracting nodes...",
    "team.empty": "No profiled members at the moment.",

    "section.impact.badge": "Our Goal",
    "section.impact.title": "Build here to impact the world.",
    "section.impact.ici": "HERE — DRC",
    "section.impact.ici_text": "Our anchor point. We develop sovereign solutions to digitize the Congolese economy and administration.",
    "section.impact.ensuite": "THEN — AFRICA",
    "section.impact.ensuite_text": "Export our know-how to meet the common challenges of the continent: fintech, energy and education.",
    "section.impact.enfin": "FINALLY — WORLD",
    "section.impact.enfin_text": "Prove that technical excellence has no borders by offering competitive products on the global market.",
    "section.impact.footer": "DEVELITE TECH — Butembo, our starting point.",

    // Contact Section
    "section.contact.badge": "(07) — Liaison",
    "section.contact.title": "Let's talk about your project.",
    "section.contact.desc": "A software to design, a network to install, a training to organize — or just an idea to test? Write to us.",
    "contact.address": "Location",
    "contact.email": "Email",
    "contact.form.name": "Full name",
    "contact.form.mail": "Email address",
    "contact.form.subject": "Subject",
    "contact.form.message": "Your message",
    "contact.btn.send": "Send Message",
    "contact.btn.sending": "Transmitting...",
    "contact.success": "Message received.",
    "contact.success_desc": "Thank you for your trust. Our team will reply within 24 hours.",
    "contact.btn.again": "Send another message",

    // Dashboard General
    "dash.welcome": "Welcome",
    "dash.matrix_state": "Current operational state of the matrix today.",
    "dash.logout": "Logout",
    "dash.reduce": "Collapse",
    "dash.search": "Search for a signal...",
    "dash.notifications": "Matrix Alerts",
    "dash.new_project": "New Project",
    "dash.view_pipeline": "View Pipeline",
    "dash.recent_projects": "Recent Projects",
    "dash.team_activity": "Team Activity",
    "dash.recent_signals": "Recent Signals",
    "dash.all": "See All",
    "dash.inbox": "Inbox",
    "dash.status": "Status",
    "dash.actions": "Actions",

    // Footer
    "footer.tagline": "Let's build what comes next together.",
    "footer.btn": "Start liaison",
    "footer.desc": "Global engineering system and AI research. Building the digital matrix of the future from Butembo.",
    "footer.nav": "Enterprise",
    "footer.protocols": "Protocols",
    "footer.coord": "Coordination",
    "footer.copyright": "© 2026 DEVELITE TECH — Matrix Version 2.0.4.",
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
