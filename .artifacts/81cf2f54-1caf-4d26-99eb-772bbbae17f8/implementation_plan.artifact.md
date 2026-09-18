# Plan d'implémentation - Envoi d'emails groupés via SMTP (Nodemailer)

Ce plan remplace l'usage de PHPMailer (PHP) par Nodemailer (Node.js), compatible avec Vercel, pour permettre l'envoi d'emails à plusieurs destinataires via un serveur SMTP.

## Revue Utilisateur Requise

> [!IMPORTANT]
> Pour que cela fonctionne, vous devrez configurer les variables d'environnement suivantes sur **Vercel** :
> - `SMTP_HOST` : Votre serveur SMTP (ex: `smtp.gmail.com`)
> - `SMTP_PORT` : Le port (ex: `465` pour SSL ou `587` pour TLS)
> - `SMTP_USER` : Votre adresse email
> - `SMTP_PASS` : Votre mot de passe (ou mot de passe d'application pour Gmail)

## Changements Proposés

### [Infrastructure] Dépendances

#### [MODIFY] [package.json](file:///C:/Users/HERITIER/Desktop/JHJ/package.json)
- Ajouter `nodemailer` à la liste des dépendances.

### [Backend] API d'envoi

#### [MODIFY] [api/send-email.js](file:///C:/Users/HERITIER/Desktop/JHJ/api/send-email.js)
- Remplacer l'intégration Resend par **Nodemailer**.
- Configurer le transporteur SMTP dynamique via les variables d'environnement.
- Gérer l'envoi à une liste de destinataires (array) ou un destinataire unique.

### [Nettoyage] Suppression des fichiers obsolètes

#### [DELETE] Fichiers PHP
- Supprimer `PHPMailer.php`, `SMTP.php` et `Exception.php` car ils ne sont pas compatibles avec l'architecture Node.js/Vercel du projet.

## Plan de Vérification

### Tests Automatisés
- Simulation d'un appel POST sur `/api/send-email` avec une liste d'adresses.

### Vérification Manuelle
- Envoyer un message via le formulaire de contact et vérifier la réception sur les emails assignés.
- Tester la réponse groupée depuis la console admin si applicable.

---
**Approuvez-vous ce plan pour passer à une solution SMTP professionnelle et multi-destinataires ?**
