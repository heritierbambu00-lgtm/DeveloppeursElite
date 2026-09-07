const RESEND_API_KEY = import.meta.env.VITE_RESEND_API_KEY;

/**
 * Envoie un email de notification à un membre de la direction via Resend
 */
export const sendNotificationEmail = async (contactData, assignedMember) => {
  if (!RESEND_API_KEY) {
    console.error("RESEND_API_KEY manquante.");
    return;
  }

  // Emails des membres (à adapter avec vos vraies adresses)
  const memberEmails = {
    'CEO': 'jospinkav@gmail.com', // Jospin
    'CTO': 'heritierbambu00@gmail.com', // Héritier
    'COO': 'justin.kombi@example.com'  // Justin (à corriger si besoin)
  };

  const toEmail = memberEmails[assignedMember] || memberEmails['CEO'];

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'DEVELITE <onboarding@resend.dev>', // Note: Nécessite un domaine vérifié pour personnaliser
        to: toEmail,
        subject: `[MATRICE] Nouveau message assigné : ${contactData.subject}`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; color: #181B20;">
            <h2 style="color: #BC4B0E;">Alerte Matrice : Nouveau Contact</h2>
            <p><strong>Expéditeur :</strong> ${contactData.name} (${contactData.email})</p>
            <p><strong>Sujet :</strong> ${contactData.subject}</p>
            <p><strong>Message :</strong></p>
            <blockquote style="border-left: 4px solid #DBD4C4; padding-left: 15px; font-style: italic;">
              ${contactData.message}
            </blockquote>
            <hr style="border: none; border-top: 1px solid #E5E0D3; margin: 20px 0;" />
            <p style="font-size: 12px; color: #6C7280;">
              Ce message vous a été automatiquement assigné par <strong>DEVELITE AI</strong>.
            </p>
          </div>
        `
      })
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Email sending error:", error);
  }
};
