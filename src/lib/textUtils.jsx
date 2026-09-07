import React from 'react';

/**
 * Transforme les emails et numéros de téléphone en liens cliquables
 */
export const formatMessageWithLinks = (text) => {
  if (!text) return text;

  // Regex pour Emails
  const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi;

  // Regex pour Numéros de téléphone (format international ou local simple)
  const phoneRegex = /(\+?[0-9]{1,4}[\s-]?[0-9]{2,4}[\s-]?[0-9]{2,4}[\s-]?[0-9]{2,4})/g;

  // Découpage du texte pour insérer les composants React
  const parts = text.split(/(\s+)/);

  return parts.map((part, index) => {
    // Test Email
    if (part.match(emailRegex)) {
      return (
        <a
          key={index}
          href={`mailto:${part}`}
          className="text-blue-400 hover:text-blue-300 underline font-bold transition-colors"
        >
          {part}
        </a>
      );
    }

    // Test Téléphone (on vérifie la longueur pour éviter de transformer n'importe quel chiffre)
    if (part.match(phoneRegex) && part.replace(/[\s-+]/g, '').length >= 8) {
      return (
        <a
          key={index}
          href={`tel:${part.replace(/\s/g, '')}`}
          className="text-blue-400 hover:text-blue-300 underline font-bold transition-colors"
        >
          {part}
        </a>
      );
    }

    return part;
  });
};
