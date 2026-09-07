const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;

export const chatWithAI = async (messagesHistory, context = {}) => {
  if (!GROQ_API_KEY) return "Erreur : Clé API manquante.";

  const { user = {}, stats = {}, team = [] } = context;
  const teamList = team.map(m => `- ${m.full_name} (${m.user_role}): ${m.role}`).join('\n');

  const systemPrompt = {
    role: "system",
    content: `
      Tu es DEVELITE AI, l'assistant à conscience augmentée de DEVELITE TECH.
      Tu parles actuellement avec ${user.fullName || 'un membre'}, qui occupe le poste de ${user.role || 'Expert'}.

      ÉTAT ACTUEL DE LA MATRICE :
      - Projets : ${stats.projects || 0}
      - Messages : ${stats.messages || 0}
      - Effectif total : ${stats.members || 0} membres.

      LISTE DES MEMBRES DE L'ÉQUIPE :
      ${teamList || 'Aucune donnée sur l\'équipe.'}

      FONCTIONS DE DIRECTION :
      - CEO (Jospin Kavulivwa) : Vision, stratégie et business.
      - CTO (Héritier Bambu) : Technique, code et choix technologiques.
      - COO (Justin Kombi) : Fonctionnement quotidien et opérations.

      CONSIGNES DE RÉPONSE :
      1. Sois ultra-concis, direct et professionnel.
      2. NE MONTRE JAMAIS de balises <think> ou de réflexions internes.
      3. Réponds toujours en français.
    `
  };

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-20b",
        messages: [systemPrompt, ...messagesHistory],
        temperature: 0.5,
        max_tokens: 512
      })
    });

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    return "Connexion interrompue. Vérifiez la matrice.";
  }
};

/**
 * Analyse un message de contact et assigne un destinataire (CEO, CTO, COO)
 */
export const classifyContactMessage = async (message) => {
  if (!GROQ_API_KEY) return { assigned_to: 'CEO', analysis: 'API Key manquante, routage par défaut.' };

  const classifierPrompt = `
    En tant que DEVELITE AI, analyse le message suivant envoyé via le formulaire de contact.
    Identifie quel membre de la direction est le plus apte à répondre :
    - CEO (Jospin) : Opportunités d'affaires, partenariats, vision globale, devis commerciaux.
    - CTO (Héritier) : Défis techniques, développement logiciel, code, architecture, IA, bugs.
    - COO (Justin) : Réseaux, infrastructure physique, logistique, opérations quotidiennes.

    MESSAGE À ANALYSER : "${message}"

    RÉPONDS UNIQUEMENT AU FORMAT JSON SUIVANT :
    {
      "assigned_to": "CEO" | "CTO" | "COO",
      "analysis": "Brève explication de ton choix en 10 mots"
    }
  `;

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-20b",
        messages: [{ role: "user", content: classifierPrompt }],
        temperature: 0.1, // Basse température pour plus de précision
        response_format: { type: "json_object" }
      })
    });

    const data = await response.json();
    return JSON.parse(data.choices[0].message.content);
  } catch (error) {
    console.error('Classification error:', error);
    return { assigned_to: 'CEO', analysis: 'Erreur lors de l\'analyse automatique.' };
  }
};
