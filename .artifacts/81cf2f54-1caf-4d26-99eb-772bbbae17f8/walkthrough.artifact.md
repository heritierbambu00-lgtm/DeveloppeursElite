# Walkthrough - Migration SMTP vers Nodemailer (Multi-destinataires)

J'ai remplacé l'implémentation PHP (obsolète pour ce projet) par une solution native Node.js utilisant **Nodemailer**, ce qui permet d'envoyer des emails groupés de manière fiable sur Vercel.

## Changements Effectués

### 1. Backend & API
- **Nouveau Script d'envoi** : Le fichier [send-email.js](file:///C:/Users/HERITIER/Desktop/JHJ/api/send-email.js) utilise désormais `nodemailer` avec un transporteur SMTP.
- **Support Multi-destinataires** : Le script accepte maintenant un tableau d'adresses email, permettant d'envoyer un signal à toute la direction ou à plusieurs clients simultanément.
- **Sécurité** : Utilisation stricte des variables d'environnement pour ne pas exposer vos mots de passe.

### 2. Dépendances
- Ajout de `nodemailer` au [package.json](file:///C:/Users/HERITIER/Desktop/JHJ/package.json).

### 3. Nettoyage
- Suppression des fichiers PHP inutilisables dans un environnement Node.js (`PHPMailer.php`, `SMTP.php`, `Exception.php`).

---

## Configuration Vercel Requise (IMPORTANT)

Pour que l'envoi fonctionne, vous devez ajouter ces **Variables d'Environnement** dans votre projet sur le tableau de bord Vercel :

| Nom de la variable | Valeur (Exemple) | Description |
| :--- | :--- | :--- |
| `SMTP_HOST` | `smtp.gmail.com` | Votre serveur mail sortant |
| `SMTP_PORT` | `465` | Port SSL (recommandé) ou 587 |
| `SMTP_USER` | `votre-email@gmail.com` | Identifiant de connexion |
| `SMTP_PASS` | `votre-mot-de-passe-app` | Mot de passe (ou mdp d'application) |
| `SMTP_SECURE` | `true` | Mettre à `true` si le port est 465, sinon `false` |

> [!TIP]
> Si vous utilisez **Gmail**, vous devez créer un "Mot de passe d'application" dans les paramètres de sécurité de votre compte Google pour que la connexion soit autorisée.

---

## Vérification du Déploiement
Le projet a été testé localement via `npm run build` et les modifications ont été envoyées sur GitHub. Le déploiement Vercel se mettra à jour automatiquement.
