import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  const { toEmail, subject, html, contactData } = req.body;

  // Configuration du transporteur SMTP via les variables d'environnement Vercel
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '465'),
    secure: process.env.SMTP_SECURE === 'true', // true pour le port 465, false pour les autres
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const finalSubject = subject || `[MATRICE] Nouveau message de ${contactData?.name || 'Contact'}`;
  const finalHtml = html || `<h2>Nouveau message reçu. Consultez votre dashboard.</h2>`;

  try {
    // Vérification de la liste des destinataires
    // On supporte soit une chaîne (un seul email), soit un tableau (plusieurs emails)
    const recipients = Array.isArray(toEmail) ? toEmail.join(', ') : toEmail;

    const mailOptions = {
      from: `"DEVELITE TECH" <${process.env.SMTP_USER}>`,
      to: recipients,
      subject: finalSubject,
      html: finalHtml,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("[SMTP Success]", info.messageId);
    return res.status(200).json({ success: true, messageId: info.messageId });
  } catch (error) {
    console.error("[SMTP Error]", error);
    return res.status(500).json({
      error: 'Échec de l\'envoi via SMTP',
      details: error.message
    });
  }
}
