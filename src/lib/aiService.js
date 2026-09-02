const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;

export const chatWithAI = async (message, context = {}) => {
  if (!GROQ_API_KEY) return "Erreur : Clé API manquante.";

  const { user = {}, stats = {} } = context;

  // Prompt système enrichi avec le contexte utilisateur et les données réelles
  const systemPrompt = `
    Tu es DEVELITE AI, l'assistant à conscience augmentée de DEVELITE TECH.
    Tu parles actuellement avec ${user.fullName || 'un membre'}, qui occupe le poste de ${user.role || 'Expert'}.

    ÉTAT ACTUEL DE LA MATRICE :
    - Projets en cours : ${stats.projects || 0}
    - Messages en attente : ${stats.messages || 0}
    - Effectif total : ${stats.members || 0} membres.

    CONSIGNES DE RÉPONSE :
    1. Sois ultra-concis et direct.
    2. Adopte un ton professionnel, technologique et visionnaire.
    3. NE MONTRE JAMAIS de balises <think> ou de réflexions internes.
    4. Réponds toujours en français.
    5. Utilise les fonctions de direction (CEO: Vision/Stratégie, CTO: Technique/Code, COO: Opérations) pour personnaliser tes conseils si nécessaire.
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
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message }
        ],
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
