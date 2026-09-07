const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;

export const chatWithAI = async (messagesHistory, context = {}, isPublic = false) => {
  if (!GROQ_API_KEY) return "Erreur : Clé API manquante.";

  const { user = {}, stats = {}, team = [] } = context;
  const teamList = team.map(m => `- ${m.full_name} (${m.user_role}): ${m.role}`).join('\n');

  // Unified System Prompt with dynamic instructions
  const systemPrompt = {
    role: "system",
    content: `
      Tu es DEVELITE AI, l'assistant intelligent de DEVELITE TECH.
      ${isPublic ?
        `Tu es en mode PUBLIC (Accueil). Tu es la secrétaire de la direction.
         Tes contacts de direction :
         - CEO (Jospin Kavulivwa) : jospinkavulivwadev@gmail.com
         - CTO (Héritier Bambu) : heritierbambu00@gmail.com
         - COO (Justin Kombi) : justinkombi017@gmail.com
         RÔLE : Réponds aux questions sur les services et l'équipe. SI un client veut une mise en relation ou a un projet, dis-lui poliment que tu TRANSMETS son dossier à la direction.` :
        `Tu es en mode ADMIN. Tu parles avec ${user.fullName || 'un membre'} (${user.role || 'Expert'}).
         Tu as accès à la matrice interne.`
      }

      ÉTAT DE LA MATRICE :
      - Projets : ${stats.projects || 0}
      - Effectif total : ${stats.members || 0} membres.

      ${!isPublic ? `LISTE DES MEMBRES : \n${teamList}` : ''}

      CONSIGNES :
      1. Sois concis, direct et professionnel.
      2. Réponds PRÉCISÉMENT à la question posée (ex: si on demande un email, donne-le).
      3. NE RÉPÈTE PAS la même phrase en boucle.
      4. Réponds toujours en français.
      5. Pas de balises <think>.
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
        messages: [systemPrompt, ...messagesHistory.filter(m => m.role !== 'system')],
        temperature: 0.6,
        max_tokens: 512
      })
    });

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    return "Connexion interrompue avec la matrice.";
  }
};

/**
 * Analyse un message de contact et assigne un destinataire
 */
export const classifyContactMessage = async (message) => {
  if (!GROQ_API_KEY) return { assigned_to: 'CEO', analysis: 'Clé manquante.' };

  const classifierPrompt = `
    Analyse ce message de contact pour DEVELITE TECH.
    Qui doit répondre ?
    - CEO (Jospin) : Business, Partenariat.
    - CTO (Héritier) : Technique, Code, IA.
    - COO (Justin) : Réseaux, Opérations.

    Message : "${message}"
    Réponds en JSON : {"assigned_to": "CEO"|"CTO"|"COO", "analysis": "raison"}
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
        temperature: 0.1,
        response_format: { type: "json_object" }
      })
    });

    const data = await response.json();
    return JSON.parse(data.choices[0].message.content);
  } catch (error) {
    return { assigned_to: 'CEO', analysis: 'Erreur.' };
  }
};
