export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  const { toEmail, subject, html, contactData } = req.body;
  const apiKey = process.env.VITE_RESEND_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'Configuration serveur : Clé API manquante sur Vercel' });
  }

  const finalSubject = subject || `[MATRICE] Nouveau message de ${contactData?.name || 'Contact'}`;
  const finalHtml = html || `<h2>Nouveau message reçu. Consultez votre dashboard.</h2>`;

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'DEVELITE TECH <onboarding@resend.dev>',
        to: Array.isArray(toEmail) ? toEmail : [toEmail],
        subject: finalSubject,
        html: finalHtml
      })
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("[Resend Error]", result);
      // Renvoyer l'erreur spécifique de Resend pour le débogage
      return res.status(response.status).json({
        error: result.message || 'Erreur inconnue de Resend',
        details: result
      });
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error("[Server Error]", error);
    return res.status(500).json({ error: error.message });
  }
}
