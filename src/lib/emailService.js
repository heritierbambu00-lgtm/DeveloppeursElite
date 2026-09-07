const RESEND_API_KEY = import.meta.env.VITE_RESEND_API_KEY;

export const sendNotificationEmail = async (contactData, assignedMember) => {
  if (!RESEND_API_KEY) {
    console.error("Envoi d'email impossible : La clé VITE_RESEND_API_KEY n'est pas configurée.");
    return;
  }

  // Emails officiels DEVELITE TECH
  const memberEmails = {
    'CEO': 'jospinkavulivwadev@gmail.com',
    'COE': 'jospinkavulivwadev@gmail.com',
    'CTO': 'heritierbambu00@gmail.com',
    'COO': 'justinkombi017@gmail.com'
  };

  const toEmail = memberEmails[assignedMember] || 'heritierbambu00@gmail.com';

  try {
    console.log(`[Resend] Tentative d'envoi vers : ${toEmail}`);

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'DEVELITE AI <onboarding@resend.dev>',
        to: [toEmail], // On peut mettre plusieurs destinataires ici si besoin
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
              Assigné à : ${assignedMember} par DEVELITE AI • Aware Matrix
            </p>
          </div>
        `
      })
    });

    const result = await response.json();
    if (!response.ok) throw new Error(JSON.stringify(result));

    console.log("[Resend] Succès :", result);
    return result;
  } catch (error) {
    console.error("[Resend] Échec critique :", error.message);
    throw error;
  }
};
