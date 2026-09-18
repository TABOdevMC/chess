# ♟️ Chess — site d'échecs français

Site web d'échecs jouable directement dans le navigateur, compatible avec **GitHub Pages** et Firebase.

## ✨ Fonctionnalités

### 🤖 Jouer contre Stockfish

- Débutant
- Intermédiaire
- Avancé
- Expert
- Niveaux personnalisés de **100 à 3200 Elo**
- Réglage de la force du bot
- Pièces SVG

### 👥 Modes de jeu

- **2 joueurs sur le même ordinateur**
- **Multijoueur en ligne** avec Firebase / Firestore
- Création d'une partie avec un code
- Rejoindre une partie avec un code
- Synchronisation des coups en temps réel

### 🔐 Comptes

- Inscription par e-mail et mot de passe
- Connexion / déconnexion
- Profil joueur
- **Elo initial : 1000**
- Statistiques de victoires, défaites et nulles
- Données des joueurs stockées dans Firestore

### 🛠️ Administration

Les comptes possèdent un champ `admin` dans `users/{uid}` :

```text
admin: true
```

Le menu **⚙ Admin** est disponible uniquement aux comptes autorisés.

L'administration permet notamment de :

- voir le nombre d'utilisateurs
- voir le nombre de parties
- voir les parties en cours
- consulter les joueurs
- **modifier l'Elo d'un joueur** entre 100 et 3200
- donner ou retirer les droits administrateur
- consulter les parties récentes

### 🔎 Analyse de parties

Analyse avec Stockfish et classification des coups :

- Gaffe
- Erreur
- Imprécision
- Bon
- Très bon
- Meilleur
- Excellent `!`
- Brillant `!!`
- Forcé — seul coup légal
- Coups théoriques lorsqu'ils sont disponibles
- Analyse de tous les coups de la partie

### 🧩 Problèmes

- Plusieurs problèmes tactiques
- Différentes difficultés
- Vérification des coups légaux
- Indice
- Solution
- Passage au problème suivant

### 📥 PGN

- Export d'une partie au format **PGN**
- Copie du PGN dans le presse-papiers
- Réutilisation du PGN dans le module d'analyse

### 🎨 Interface

- Interface française
- Design sombre moderne
- Interface responsive ordinateur / mobile
- Échiquier retournable
- Annulation des coups
- Animations et effets visuels
- Symboles graphiques pour les analyses

## 🔥 Firebase

Le projet utilise Firebase pour les fonctionnalités en ligne :

- **Firebase Authentication** pour les comptes
- **Cloud Firestore** pour les profils et parties
- Elo et statistiques dans `users`
- Parties dans `games`

Configuration requise dans Firebase :

1. Activer **Authentication → E-mail/Mot de passe**.
2. Créer une base **Cloud Firestore**.
3. Configurer les règles Firestore du projet.
4. Ajouter le domaine GitHub Pages aux domaines autorisés Authentication.

> La configuration Firebase du projet est destinée au client web. Les règles Firestore restent indispensables pour protéger les données et les permissions administrateur.

## 🧰 Technologies

- HTML5
- CSS3
- JavaScript
- [chess.js](https://github.com/jhlywa/chess.js)
- Stockfish
- Firebase Authentication
- Cloud Firestore
- GitHub Pages
- GitHub Actions

## 🚀 Utilisation

Ouvrez le site dans un navigateur puis choisissez un mode.

### Jouer contre le bot

1. Choisissez votre couleur.
2. Sélectionnez Débutant, Intermédiaire, Avancé ou Expert.
3. Pour une force précise, ouvrez **Plus de niveaux**.
4. Choisissez l'Elo du bot entre **100 et 3200**.
5. Démarrez la partie.

### Jouer en ligne

1. Créez un compte.
2. Ouvrez **En ligne**.
3. Créez une partie.
4. Partagez le code à votre adversaire.
5. L'autre joueur entre le code pour rejoindre la partie.

### Modifier un joueur en tant qu'administrateur

1. Connectez-vous avec un compte ayant `admin: true` dans Firestore.
2. Ouvrez **⚙ Admin**.
3. Sélectionnez un joueur.
4. Modifiez son Elo puis cliquez sur **Elo**.
5. Utilisez **Rendre admin** / **Retirer admin** pour gérer ses droits.

## 🌐 Déploiement

Le projet est conçu pour fonctionner sur **GitHub Pages**.

Aucun serveur dédié n'est nécessaire pour le site : les fonctionnalités de comptes et de multijoueur utilisent Firebase.

## 📁 Données principales

```text
users/{uid}
├── username
├── email
├── elo
├── admin
├── wins
├── losses
└── draws

games/{gameId}
├── white
├── black
├── fen
├── pgn
├── turn
├── status
└── result
```

## 📄 Licence

Projet personnel — voir le dépôt pour les conditions d'utilisation.