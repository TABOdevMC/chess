# ♟️ Chess — site d'échecs français

Site web d'échecs jouable directement dans le navigateur et compatible avec **GitHub Pages**.

## Fonctionnalités

- 🤖 **Jouer contre Stockfish**
  - Débutant
  - Intermédiaire
  - Avancé
  - Expert
  - niveaux personnalisés de **100 à 3200 Elo**
- 👥 **2 joueurs sur le même ordinateur**
- 🔎 **Analyse de parties avec Stockfish**
  - Gaffe
  - Erreur
  - Imprécision
  - Bon
  - Très bon
  - Meilleur
  - Excellent (!)
  - Brillant (!!)
  - Forcé — seul coup légal
- 🧩 **Problèmes tactiques**
- 📥 **Export des parties en PGN**
- ♟️ Pièces et symboles graphiques en **SVG**
- 🔄 Échiquier retournable
- ↩️ Annulation des coups
- 🇫🇷 Interface en français
- 📱 Interface responsive pour ordinateur et mobile

## Technologies

- HTML / CSS / JavaScript
- [chess.js](https://github.com/jhlywa/chess.js)
- Stockfish
- GitHub Pages
- GitHub Actions pour certaines automatisations du projet

## Utilisation

Ouvrez le site dans un navigateur, choisissez un mode puis jouez.

### Jouer contre le bot

1. Choisissez votre couleur.
2. Sélectionnez le niveau du bot.
3. Cliquez sur **Démarrer**.
4. Pour un niveau précis, ouvrez **Plus de niveaux** et choisissez l'Elo souhaité.

### Analyser une partie

1. Ouvrez **Analyse**.
2. Collez une partie au format PGN.
3. Cliquez sur **Charger**.
4. Utilisez les commandes pour parcourir les coups et lancer l'analyse Stockfish.

### Exporter une partie

Après une partie, utilisez **Exporter PGN** pour enregistrer la partie au format `.pgn` et pouvoir la réutiliser dans un autre logiciel ou site d'échecs.

## Déploiement

Le projet est conçu pour fonctionner sur **GitHub Pages** sans serveur nécessaire.

## Licence

Projet personnel — voir le dépôt pour les conditions d'utilisation.