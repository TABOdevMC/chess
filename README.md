# ♟️ Chess — TABO

Application web d'échecs en français, jouable directement dans un navigateur. Le projet combine **chess.js**, **Stockfish**, **Firebase Authentication**, **Cloud Firestore** et **GitHub Pages**.

## 🔎 Analyse — valeurs et classification

Le module d'analyse utilise les évaluations du moteur pour déterminer la qualité des coups. Les valeurs sont exprimées en **pions (centipawns / 100)** : par exemple `+1.50` signifie environ 1,5 pion d'avantage pour les Blancs.

### Seuils utilisés

| Catégorie | Perte d'évaluation indicative | Affichage |
|---|---:|---|
| **Forcé** | — | Forcé |
| **Brillant** | gain exceptionnel / sacrifice justifié | Brillant !! |
| **Excellent** | ≤ 0,15 | Excellent ! |
| **Meilleur** | ≤ 0,30 | Meilleur |
| **Très bon** | ≤ 0,50 | Très bon |
| **Bon** | ≤ 0,80 | Bon |
| **Imprécision** | ≤ 1,20 | Imprécision |
| **Erreur** | ≤ 2,00 | Erreur |
| **Gaffe** | > 2,00 | Gaffe |

> Ces seuils sont des valeurs de classification du projet et ne constituent pas une notation officielle de chess.com ou de Stockfish. Le résultat peut varier selon la profondeur, le temps de calcul, la position et la version du moteur.

### Comment lire l'évaluation

- `0.00` : position approximativement équilibrée.
- `+0.50` : avantage blanc d'environ un demi-pion.
- `-1.00` : avantage noir d'environ un pion.
- Une variation de l'évaluation après un coup sert à mesurer la perte d'évaluation du joueur qui vient de jouer.

### Ordre d'affichage

La classification est volontairement ordonnée ainsi :

**Forcé → Brillant → Excellent → Meilleur → Très bon → Bon → Imprécision → Erreur → Gaffe**

Ainsi, **Excellent** est affiché avant **Meilleur**, et **Meilleur** avant **Très bon**.

## 🤖 Niveaux du bot

Les niveaux affichés correspondent aux réglages de difficulté du projet :

| Niveau | Elo indicatif |
|---|---:|
| Débutant | 400 |
| Novice | 600 |
| Apprenti | 800 |
| Intermédiaire | 1000 |
| Confirmé | 1200 |
| Club | 1400 |
| Avancé | 1600 |
| Fort | 1800 |
| Expert | 2000 |
| Maître | 2200 |
| Maître fort | 2400 |
| Élite | 2600 |
| Grand maître | 2800 |
| Super GM | 3000 |

Les Elo sont **indicatifs** : ils servent à représenter la difficulté configurée du bot et ne constituent pas une mesure officielle de sa force réelle.

## 🌐 Fonctionnalités

### ♟️ Jeu local
- Jouer contre un bot
- Jouer à 2 joueurs sur le même ordinateur
- Choix de la couleur
- Échiquier retournable
- Annulation des coups
- Historique des coups
- Détection des positions de fin de partie
- Copie du PGN

### 🌐 Multijoueur
Deux systèmes :
1. **Duels** : création d'une partie et partage d'un code.
2. **Matchmaking** : recherche automatique d'un adversaire selon l'Elo.

Les parties utilisent Firestore pour synchroniser les coups, le FEN, le PGN, le tour et le statut.

### 👤 Comptes
- inscription par e-mail/mot de passe ;
- connexion/déconnexion ;
- pseudo ;
- Elo et statistiques ;
- avatar représentant une pièce d'échecs.

### 🏆 Classement
Classement des utilisateurs avec Elo, victoires, défaites, nulles, parties et avatar.

### 🔐 Administration
Le document `users/{uid}` contient notamment :

```text
admin: true/false
```

Les actions sensibles doivent être protégées par les règles Firestore.

### 🧩 Problèmes
Exercices tactiques avec vérification du coup, indice, solution et exercices multiples.

## 📋 PGN

Le bouton d'export **copie le PGN dans le presse-papiers**. Il ne télécharge pas automatiquement un fichier.

## 🔥 Firebase

Collections principales :

```text
users/{uid}
games/{gameId}
matchmaking/{entryId}
admin/{document}
```

Authentication utilise **E-mail / mot de passe** et Firestore stocke les profils, parties et tickets de matchmaking.

Après une modification de `firestore.rules`, les règles doivent être **publiées dans Firebase Console**.

## 🚀 Déploiement

Le projet est prévu pour GitHub Pages. Après une modification importante de JavaScript/CSS, un `Ctrl+F5` peut être nécessaire pour vider le cache du navigateur.

## 📁 Structure

```text
index.html
script.js
firebase-app.js
firebase-config.js
firestore.rules
stockfish.js
multiplayer.js
matchmaking.js
leaderboard.js
admin.js
puzzles-extra.js
theory.js
chesscom-style.css
visual-upgrade.css
```

## 🧩 Dépendances

- HTML5 / CSS3 / JavaScript
- chess.js
- Stockfish
- Firebase Authentication
- Cloud Firestore
- GitHub Pages

## 🐛 Dépannage

### `Missing or insufficient permissions`
Vérifier la connexion Firebase, l'existence du document `users/{uid}` et surtout que les dernières règles Firestore sont publiées.

### `Firebase is already defined`
Vérifier qu'une seule copie des bibliothèques Firebase est chargée.

### `isGameOver is not a function`
Selon la version de chess.js, l'API peut être `game_over()` ou `isGameOver()`. Le projet prévoit une compatibilité entre ces formes.

### Plusieurs pages apparaissent en même temps
Une seule page doit avoir la classe `active` et le CSS doit masquer `.page` par défaut.

## 🔒 Sécurité

Le JavaScript client n'est pas une frontière de sécurité. Les permissions importantes doivent être appliquées par Firestore Rules, notamment pour les comptes, l'Elo, les parties et l'administration.

## 📌 État

Projet personnel de TABO, en développement actif. Les fonctionnalités et seuils peuvent évoluer.
