const RESEND_API_KEY = import.meta.env.VITE_RESEND_API_KEY;

/**
 * Envoie un email de notification à un membre de la direction via Resend
 */
export const sendNotificationEmail = async (contactData, assignedMember) => {
  if (!RESEND_API_KEY) {
    console.warn("Envoi d'email ignoré : RESEND_API_KEY manquante.");
    return;
  }

  // Emails réels fournis par l'utilisateur
  const memberEmails = {
    'CEO': 'jospinkavulivwadev@gmail.com',
    'COE': 'jospinkavulivwadev@gmail.com', // Gestion du typo COE
    'CTO': 'heritierbambu00@gmail.com',
    'COO': 'justinkombi017@gmail.com'
  };

  const toEmail = memberEmails[assignedMember] || memberEmails['CTO'];

  try {
    console.log(`Tentative d'envoi d'email à ${toEmail} pour le rôle ${assignedMember}...`);

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'DEVELITE <onboarding@resend.dev>',
        to: toEmail,
        subject: `[MATRICE] Nouveau message assigné : ${contactData.subject}`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; color: #181B20; background-color: #F6F3EC; border-radius: 10px;">
            <h2 style="color: #BC4B0E; border-bottom: 2px solid #DBD4C4; padding-bottom: 10px;">Alerte Matrice : Nouveau Contact</h2>
            <p style="margin-top: 20px;"><strong>Expéditeur :</strong> ${contactData.name}</p>
            <p><strong>Email :</strong> ${contactData.email}</p>
            <p><strong>Sujet :</strong> ${contactData.subject}</p>
            <div style="margin-top: 20px; padding: 15px; background-color: white; border: 1px solid #E5E0D3; border-radius: 8px;">
              <p style="margin-top: 0;"><strong>Message :</strong></p>
              <p style="font-style: italic; color: #2A2E35;">${contactData.message}</p>
            </div>
            <p style="font-size: 11px; color: #6C7280; margin-top: 30px; border-top: 1px solid #E5E0D3; pt: 10px;">
              Ce message a été trié et vous a été assigné par l'intelligence artificielle <strong>DEVELITE AI</strong>.
            </p>
          </div>
        `
      })
    });

    const data = await response.json();
    if (response.ok) {
      console.log("Email envoyé avec succès via Resend.");
    } else {
      console.error("Erreur Resend:", data);
    }
    return data;
  } catch (error) {
    console.error("Échec critique de l'envoi d'email:", error);
  }
};
