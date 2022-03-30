# Shipwars

Jeu de la bataille navale avec des armes différentes. Projet de fin de semestre 2 de CIR2.
Par Aurélien Rogé, Guillaume Leroy, Marco Fordelone, Théophile Demeulier et Théo Vangheluwe.

## Comment redéployer le projet ?

1. **Cloner** le projet depuis cette branche
2. **Créer** une base de données nommée batnav
3. **Exécuter 

## Installation

Step 1: Télécharger/cloner.
```
git clone https://github.com/AurelienRoge/ShipWars
```
Step 2: Installer les dependances.
```
npm install
```

Step 3: Lancer/créer votre base de données en utilisant un outil tel que XAMPP (ou autre)
Step 3.5 : Créer la base de données :

Par défaut le SQL fonctionne avec une base de données avec ces paramètres :
user / mdp : par défaut
nom de la base : "batnav"
nom du tableau : "tab"

le tableau a 3 colonnes : User / MDP / NbVic 

Step 4: Lancer le serveur.
```
node server.js
```
Step 5: Ouvrir http://yourhost:4200/ dans votre navigateur pour jouer et accéder au site.
