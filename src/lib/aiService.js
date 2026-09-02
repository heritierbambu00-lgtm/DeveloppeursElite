const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;

export const chatWithAI = async (message) => {
  if (!GROQ_API_KEY) {
    console.error("GROQ_API_KEY est manquante dans les variables d'environnement.");
    return "Erreur de configuration : La clé API Groq est manquante.";
  }

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-20b", // Nouveau standard recommandé, plus concis
        messages: [
          {
            role: "system",
            content: "Tu es DEVELITE AI. Réponds de façon ultra-courte, directe et professionnelle. Pas de salutations inutiles, pas de blabla, et SURTOUT pas de balises <think> ou de réflexions internes. Juste la réponse brute."
          },
          { role: "user", content: message }
        ],
        temperature: 0.7,
        max_tokens: 1024
      })
    });

    const data = await response.json();

    if (data.error) {
      console.error('Groq API Error:', data.error);
      return `Erreur Groq: ${data.error.message}`;
    }

    return data.choices[0].message.content;
  } catch (error) {
    console.error('AI Connection Error:', error);
    return "Impossible de contacter DEVELITE AI. Vérifiez votre connexion internet ou la validité de la clé API.";
  }
};
