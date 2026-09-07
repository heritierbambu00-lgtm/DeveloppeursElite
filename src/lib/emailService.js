/**
 * Envoie un email de notification via le proxy sécurisé Vercel
 */
export const sendNotificationEmail = async (contactData, assignedMember) => {
  // Emails officiels DEVELITE TECH
  const memberEmails = {
    'CEO': 'jospinkavulivwadev@gmail.com',
    'COE': 'jospinkavulivwadev@gmail.com',
    'CTO': 'heritierbambu00@gmail.com',
    'COO': 'justinkombi017@gmail.com'
  };

  const toEmail = memberEmails[assignedMember] || 'heritierbambu00@gmail.com';

  try {
    console.log(`[Email] Transmission via proxy sécurisé vers : ${toEmail}`);

    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contactData,
        toEmail
      })
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.error || JSON.stringify(result));

    console.log("[Email] Transmission réussie.");
    return result;
  } catch (error) {
    console.error("[Email] Échec de la transmission :", error.message);
    throw error;
  }
};
