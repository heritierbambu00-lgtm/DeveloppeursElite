const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;

export const chatWithAI = async (messagesHistory, context = {}) => {
  if (!GROQ_API_KEY) return "Erreur : Clé API manquante.";

  const { user = {}, stats = {}, team = [] } = context;

  // Format team list for AI
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
      - CEO (Chief Executive Officer) : Vision, stratégie et business.
      - CTO (Chief Technology Officer) : Technique, code et choix technologiques.
      - COO (Chief Operating Officer) : Fonctionnement quotidien et opérations.

      CONSIGNES DE RÉPONSE :
      1. Sois ultra-concis, direct et professionnel.
      2. Réponds précisément aux questions sur l'équipe (ex: "Qui est le deuxième ?").
      3. NE MONTRE JAMAIS de balises <think> ou de réflexions internes.
      4. Réponds toujours en français.
      5. Pour les questions hors site, réponds normalement avec ton expertise technique.
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
    return "Connexion interrompue. Vérifiez la validité de la matrice (API Key).";
  }
};
