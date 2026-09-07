/**
 * Envoie un email de notification via le proxy sécurisé Vercel
 */
export const sendNotificationEmail = async (contactData, assignedMember) => {
  const memberEmails = {
    'CEO': 'jospinkavulivwadev@gmail.com',
    'COE': 'jospinkavulivwadev@gmail.com',
    'CTO': 'heritierbambu00@gmail.com',
    'COO': 'justinkombi017@gmail.com'
  };

  const toEmail = memberEmails[assignedMember] || 'heritierbambu00@gmail.com';

  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contactData, toEmail })
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Échec de l'envoi");
    return result;
  } catch (error) {
    console.error("[Email] Erreur notification:", error.message);
    throw error;
  }
};

/**
 * Envoie une réponse directe à un client
 */
export const sendReplyEmail = async (clientEmail, clientName, replyMessage) => {
  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        toEmail: clientEmail,
        subject: `Re: Votre demande à DEVELITE TECH`,
        html: `
          <div style="font-family: sans-serif; background-color: #F6F3EC; padding: 40px; color: #181B20; border-radius: 20px;">
            <h2 style="color: #BC4B0E;">DEVELITE TECH</h2>
            <p>Bonjour ${clientName},</p>
            <p style="line-height: 1.6;">${replyMessage}</p>
            <hr style="border: none; border-top: 1px solid #DBD4C4; margin: 30px 0;" />
            <p style="font-size: 12px; color: #6C7280;">
              L'équipe DEVELITE TECH vous remercie de votre confiance.
            </p>
          </div>
        `
      })
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Échec de l'envoi de la réponse");
    return result;
  } catch (error) {
    console.error("[Email] Erreur réponse:", error.message);
    throw error;
  }
};
