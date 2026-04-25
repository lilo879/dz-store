# 🛍️ DZ STORE — Guide de démarrage

## Structure du projet
```
dz-store/
├── index.html          ← Page HTML principale
├── package.json        ← Dépendances
├── vite.config.js      ← Config Vite
└── src/
    ├── main.jsx        ← Point d'entrée React
    └── App.jsx         ← Tout le code du site
```

---

## 🚀 Comment lancer le projet

### Étape 1 — Installer Node.js
Si tu n'as pas encore Node.js :
→ Va sur https://nodejs.org et télécharge la version **LTS** (recommandée)
→ Installe-le normalement (next, next, finish)
→ Redémarre ton terminal/VS Code après l'installation

### Étape 2 — Ouvrir le dossier
```
Mets le dossier "dz-store" quelque part sur ton PC (ex: Bureau)
Ouvre un terminal dans ce dossier :
  - Windows : clic droit dans le dossier → "Ouvrir dans le terminal"
  - Ou ouvre VS Code → File → Open Folder → choisis dz-store
```

### Étape 3 — Installer les dépendances
```bash
npm install
```
(Ça va créer un dossier `node_modules` — c'est normal, attends juste)

### Étape 4 — Lancer le site en local
```bash
npm run dev
```
→ Ouvre ton navigateur sur **http://localhost:5173**
→ Ton site est en direct ! Chaque modification dans App.jsx se met à jour instantanément.

---

## 🌐 Mettre en ligne gratuitement (pour partager l'URL)

### Option 1 — Netlify Drop (le plus simple, 0 config)
1. Lance `npm run build` → ça crée un dossier `dist/`
2. Va sur https://netlify.com → crée un compte gratuit
3. Glisse-dépose le dossier `dist/` sur la page Netlify
4. Tu obtiens une URL publique genre https://dzstore-xxx.netlify.app

### Option 2 — Vercel (recommandé si tu veux mettre à jour facilement)
1. Va sur https://vercel.com → crée un compte (avec GitHub si possible)
2. Installe Vercel CLI : `npm install -g vercel`
3. Dans le dossier du projet : `vercel`
4. Suis les instructions → URL publique créée

---

## ⚙️ Personnaliser

### Changer le mot de passe staff
Dans `src/App.jsx`, ligne du haut :
```js
const STAFF_PASSWORD = "dzstore2025"; // ← change ici
```

### Changer le webhook Discord
```js
const DISCORD_WEBHOOK = "ton-nouveau-webhook-ici";
```

### Modifier les produits
Dans le tableau `INITIAL_PRODUCTS`, change `price`, `stock`, `name`, etc.

---

## 🔧 Fonctionnalités

- ✅ Catalogue complet avec filtres, tri, recherche
- ✅ Panier + favoris
- ✅ Système de commande → envoie au Discord webhook
- ✅ Formulaire : Nom, Téléphone (+213), Email, Wilaya, Adresse
- ✅ Codes promo (% ou montant fixe)
- ✅ Gestion des stocks (affichage rupture / dernières pièces)
- ✅ Panel Staff protégé par mot de passe (bouton ⚙️ en haut à droite)
  - Modifier prix & stocks en temps réel
  - Créer / activer / supprimer des codes promo
- ✅ Mode sombre / clair
