export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  const { contactData, toEmail } = req.body;
  const RESEND_API_KEY = process.env.VITE_RESEND_API_KEY;

  if (!RESEND_API_KEY) {
    return res.status(500).json({ error: 'Configuration serveur incomplète (Clé manquante)' });
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'DEVELITE AI <onboarding@resend.dev>',
        to: [toEmail],
        subject: `[MATRICE] Nouveau message de ${contactData.name}`,
        html: `
          <div style="font-family: sans-serif; background-color: #0B0813; padding: 40px; color: white; border-radius: 20px;">
            <h1 style="color: #9E7AFF; font-size: 24px;">Nouveau Signal Détecté</h1>
            <p style="color: rgba(255,255,255,0.6);">Un nouveau message vient d'être trié par la matrice.</p>
            <hr style="border: none; border-top: 1px solid rgba(255,255,255,0.1); margin: 20px 0;" />
            <p><strong>Expéditeur :</strong> ${contactData.name}</p>
            <p><strong>Email :</strong> ${contactData.email}</p>
            <p><strong>Sujet :</strong> ${contactData.subject}</p>
            <div style="background: rgba(255,255,255,0.05); padding: 20px; border-radius: 15px; margin-top: 20px;">
              <p style="margin: 0; color: rgba(255,255,255,0.8); font-style: italic;">"${contactData.message}"</p>
            </div>
            <p style="font-size: 10px; color: rgba(255,255,255,0.3); margin-top: 30px; text-transform: uppercase; letter-spacing: 2px;">
              DEVELITE TECH • Aware Matrix System
            </p>
          </div>
        `
      })
    });

    const result = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(result);
    }

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
