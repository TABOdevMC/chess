# ♟️ Chess — TABO

Application web d'échecs en français, jouable directement dans un navigateur. Le projet combine **chess.js**, **Stockfish**, **Firebase Authentication**, **Cloud Firestore** et **GitHub Pages**.

> Projet personnel de TABO. Le dépôt contient le site client et sa configuration Firebase côté navigateur.

## 🌐 Fonctionnalités

### ♟️ Jeu local

- Jouer contre un bot
- Jouer à 2 joueurs sur le même ordinateur
- Choix de la couleur
- Échiquier retournable
- Annulation des coups
- Historique des coups
- Détection des positions de fin de partie
- Export/copie du PGN

### 🤖 Bot

Le mode bot utilise Stockfish pour jouer contre le joueur.

Niveaux disponibles :

- Débutant
- Intermédiaire
- Avancé
- Expert
- Niveaux personnalisés selon la configuration de l'application

### 🌐 Multijoueur

Le multijoueur utilise Cloud Firestore pour synchroniser les parties.

Deux systèmes sont prévus :

1. **Duels** : création d'une partie puis partage d'un code à l'adversaire.
2. **Matchmaking** : recherche automatique d'un adversaire selon l'Elo.

Une partie en ligne stocke notamment :

- les joueurs Blancs/Noirs ;
- le FEN courant ;
- le PGN ;
- le tour actuel ;
- le statut de la partie ;
- le résultat et les informations de partie lorsque disponibles.

Les coups sont synchronisés en temps réel avec Firestore.

### 👤 Comptes

Les comptes sont gérés avec Firebase Authentication.

Fonctions :

- création de compte par e-mail et mot de passe ;
- connexion ;
- déconnexion ;
- pseudo ;
- profil joueur ;
- Elo ;
- statistiques de parties ;
- image de profil basée sur une pièce d'échecs.

### 🏆 Classement

Le classement récupère les utilisateurs depuis Firestore et peut afficher les joueurs selon leurs statistiques.

Les informations principales sont :

- Elo ;
- victoires ;
- défaites ;
- nulles ;
- nombre total de parties ;
- pseudo ;
- pièce de profil.

### 📊 Elo et statistiques

Un utilisateur possède un Elo initial et des statistiques de résultats dans `users/{uid}`.

Exemple de structure :

```text
users/{uid}
├── username: "TABO"
├── email: "..."
├── elo: 1000
├── admin: false
├── wins: 0
├── losses: 0
├── draws: 0
└── avatar: "n"
```

Les valeurs peuvent évoluer après les parties selon la logique de classement implémentée dans l'application.

### 🔐 Administration

Les droits administrateur sont stockés dans le document utilisateur :

```text
admin: true
```

Un utilisateur normal est créé avec :

```text
admin: false
```

Le système d'administration peut permettre notamment de :

- consulter les utilisateurs ;
- consulter les parties ;
- modifier l'Elo ;
- donner ou retirer les droits administrateur ;
- consulter les informations de jeu disponibles.

Les opérations sensibles doivent être protégées par les règles Firestore et par la vérification `admin` côté application.

### 🔎 Analyse

Le site possède un module d'analyse de parties avec Stockfish.

La classification des coups peut distinguer notamment :

- Gaffe ;
- Erreur ;
- Imprécision ;
- Bon ;
- Très bon ;
- Meilleur ;
- Excellent ! ;
- Brillant !! ;
- coup forcé ;
- coups théoriques lorsque disponibles.

Le PGN peut être chargé dans le module d'analyse afin d'étudier une partie coup par coup.

### 🧩 Problèmes

Le mode problèmes propose des positions tactiques avec :

- plusieurs exercices ;
- vérification des coups ;
- indice ;
- solution ;
- passage à l'exercice suivant ;
- difficultés différentes selon les positions disponibles.

### 📋 PGN

Le bouton d'export PGN **copie le PGN dans le presse-papiers** plutôt que de télécharger automatiquement un fichier.

Le PGN copié peut ensuite être collé dans le module d'analyse.

## 🔥 Architecture Firebase

Firebase est utilisé pour les fonctions nécessitant un backend.

### Authentication

Firebase Authentication gère les sessions et les comptes avec :

```text
E-mail / mot de passe
```

### Cloud Firestore

Collections principales :

```text
users/{uid}
```

Profils, Elo, statistiques, avatar et droits admin.

```text
games/{gameId}
```

Parties locales au serveur/multijoueur, FEN, PGN, joueurs et statut.

```text
matchmaking/{entryId}
```

Tickets de recherche d'adversaire pour le matchmaking.

```text
admin/{document}
```

Données réservées aux comptes administrateurs lorsque cette collection est utilisée.

## 🛡️ Règles Firestore

Le fichier [`firestore.rules`](firestore.rules) contient les règles du projet.

Principes actuels :

- un utilisateur connecté peut lire les profils nécessaires au classement ;
- un utilisateur ne peut créer que son propre document utilisateur ;
- `admin` ne peut pas être changé par l'utilisateur lui-même ;
- les utilisateurs connectés peuvent lire les parties disponibles ;
- la modification d'une partie est réservée aux joueurs concernés ou aux admins ;
- un ticket de matchmaking est lié à son créateur ;
- les documents de la zone `admin` sont réservés aux admins.

**Après toute modification de `firestore.rules`, les règles doivent être publiées dans Firebase Console** pour être réellement appliquées à la base en production.

## ⚙️ Configuration Firebase

Pour installer le projet avec ton propre projet Firebase :

1. Créer un projet dans Firebase.
2. Ajouter une application Web.
3. Récupérer la configuration Firebase.
4. Configurer Authentication.
5. Activer le fournisseur **E-mail/Mot de passe**.
6. Créer Cloud Firestore.
7. Publier les règles Firestore.
8. Ajouter le domaine de déploiement aux domaines autorisés Authentication si nécessaire.

La configuration client est utilisée dans le navigateur. **La configuration Firebase Web n'est pas un secret permettant de sécuriser la base : les règles Firestore sont essentielles.**

## 🚀 Lancer le projet

Le projet est une application web statique.

Tu peux :

- ouvrir le projet via un serveur HTTP local ;
- le déployer sur GitHub Pages ;
- utiliser Firebase pour Authentication et Firestore.

Pour le développement local, il est préférable d'utiliser un serveur HTTP plutôt que d'ouvrir directement `index.html` avec `file://`.

## 🌍 Déploiement GitHub Pages

Le dépôt est conçu pour fonctionner sur GitHub Pages.

Après un push sur la branche configurée pour Pages :

1. GitHub construit/déploie le site selon la configuration du dépôt ;
2. ouvrir l'URL GitHub Pages ;
3. effectuer un rechargement forcé (`Ctrl+F5`) après une modification importante du JavaScript ou du CSS si le navigateur conserve un ancien fichier en cache.

## 📁 Organisation générale

Les fichiers principaux comprennent notamment :

```text
index.html              # interface principale
script.js               # logique générale du jeu
firebase-app.js         # initialisation Firebase
firebase-config.js      # configuration Firebase client
firestore.rules         # règles de sécurité Firestore
multiplayer.js          # parties en ligne
matchmaking.js          # recherche automatique d'adversaire
leaderboard.js          # classement Elo/statistiques
admin.js                # fonctions d'administration
puzzles-extra.js        # problèmes/tactiques
theory.js               # fonctions liées à la théorie
chesscom-style.css      # style principal
visual-upgrade.css      # améliorations visuelles
```

Les noms exacts et les fonctionnalités peuvent évoluer au fil du développement.

## 🧩 Dépendances principales

- **HTML5** — structure de l'application
- **CSS3** — interface et responsive design
- **JavaScript** — logique client
- **chess.js** — règles et état des parties d'échecs
- **Stockfish** — moteur d'analyse et adversaire
- **Firebase Authentication** — comptes
- **Cloud Firestore** — données et synchronisation
- **GitHub Pages** — hébergement du site

## 🐛 Dépannage

### `Missing or insufficient permissions`

Vérifier :

1. que l'utilisateur est connecté ;
2. que les règles Firestore ont été publiées ;
3. que le document `users/{uid}` existe ;
4. que `admin` contient bien un booléen (`true` ou `false`) ;
5. que les règles correspondent aux requêtes utilisées par l'application.

### `Firebase is already defined`

Cette alerte indique généralement que les scripts Firebase sont chargés plusieurs fois. Il faut éviter de charger plusieurs copies de :

```text
firebase-app-compat.js
firebase-auth-compat.js
firebase-firestore-compat.js
```

### `isGameOver is not a function`

La version de `chess.js` utilisée par le projet doit être cohérente avec le code. Certaines versions utilisent :

```javascript
game.game_over()
```

alors que d'autres API utilisent :

```javascript
game.isGameOver()
```

Il faut donc vérifier la version chargée avant de changer les appels dans les modules.

### Le site affiche plusieurs pages

Vérifier que les pages inactives sont masquées par le CSS et qu'une seule page possède la classe `active`.

## 🔒 Sécurité

Ne jamais considérer le code JavaScript du navigateur comme une protection suffisante.

Les autorisations importantes doivent être contrôlées dans Firestore Rules. En particulier :

- modification de l'Elo ;
- droits administrateur ;
- modification des parties d'autres joueurs ;
- accès aux données réservées aux admins.

## 📌 État du projet

Le projet est en développement actif. Les fonctionnalités peuvent être modifiées ou réorganisées sans préavis.

Les fonctionnalités multijoueur et matchmaking dépendent de la configuration Firebase et des règles Firestore actuellement déployées.

## 📄 Licence

Projet personnel — TABO.

Voir le dépôt pour les conditions d'utilisation et les éventuelles évolutions de licence.
