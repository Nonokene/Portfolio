# Portfolio — Développeur Web & Mobile

Ce petit site est un portfolio modifiable destiné à un développeur web et mobile. Il est rendu dynamique par le fichier `data/portfolio.json` : modifiez ce fichier pour mettre à jour le contenu.

Fichiers importants
- `index.html` — page principale
- `css/style.css` — styles
- `js/main.js` — logique de chargement et interactions
- `data/portfolio.json` — contenu modifiable (nom, projets, compétences, contact)

Lancer localement
- Avec Python 3 (PowerShell):
```powershell
python -m http.server 5500; Start-Process http://localhost:5500
```
- Ou installez l'extension "Live Server" de VS Code et ouvrez `index.html` via Live Server.

Modifications recommandées
- Mettez votre nom et titre dans `data/portfolio.json`.
- Ajoutez vos projets et liens (GitHub, store) dans le tableau `projects` et `mobile`.
- Si vous avez un CV PDF, placez-le à la racine et renseignez le chemin dans `resume`.

Déploiement
- Déployez sur Netlify, Vercel, GitHub Pages ou tout service static hosting. Assurez-vous que `data/portfolio.json` est servi correctement.

Besoin d'aide
- Dites-moi si vous voulez: adapter le design, ajouter des animations, un CMS (Netlify CMS), ou une intégration backend pour le formulaire de contact.

Configuration du formulaire de contact

- Option A — Formspree (recommandé, simple):
	1. Allez sur https://formspree.io et créez un formulaire gratuit (votre email sera demandé).
	2. Formspree vous donne un endpoint du type `https://formspree.io/f/xxxxx`. Copiez-le.
	3. Ouvrez `index.html` et remplacez la valeur de `data-formspree-endpoint` sur la balise `<form id="contact-form" ...>` par votre endpoint.
	4. Déployez et testez le formulaire ; Formspree enverra les messages vers votre email.

- Option B — EmailJS (si vous voulez envoyer sans backend et personnaliser le template):
	1. Créez un compte sur https://www.emailjs.com et ajoutez un service email (Gmail, etc.).
	2. Créez un template et récupérez votre `service_id`, `template_id` et `user_id`.
	3. Chargez le SDK EmailJS dans `index.html` (ex: `<script src="https://cdn.emailjs.com/sdk/3.2.0/email.min.js"></script>` avant `js/main.js`) et initialisez-le :
		 ```html
		 <script>emailjs.init('YOUR_USER_ID');</script>
		 ```
	4. Ajoutez les attributs `data-emailjs-service`, `data-emailjs-template` (et optionnellement `data-emailjs-user`) sur le formulaire `<form id="contact-form" ...>`.
	5. `js/main.js` détecte automatiquement EmailJS si le SDK est chargé et utilisera `emailjs.sendForm(...)`.

Remarques
- Le site doit être servi depuis un serveur (même local) pour que l'envoi via fetch fonctionne correctement (pas en ouvrant le fichier `file://`).
- Si vous voulez que je configure votre Formspree endpoint ou que j'ajoute l'intégration EmailJS directement (nécessite vos IDs), donnez-moi l'endpoint ou les IDs et je m'en occupe.
