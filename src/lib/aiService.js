const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;

export const chatWithAI = async (message) => {
  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: "llama-3.1-70b-versatile",
        messages: [
          {
            role: "system",
            content: "Tu es DEVELITE AI, l'assistant intelligent du dashboard DEVELITE TECH. Tu aides les membres à gérer leurs projets, analyser les statistiques et répondre aux messages clients. Ton ton est professionnel, technologique et futuriste."
          },
          { role: "user", content: message }
        ],
        temperature: 0.7,
        max_tokens: 1024
      })
    });

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('AI Error:', error);
    return "Désolé, je rencontre une difficulté de connexion à mes circuits neuronaux.";
  }
};
