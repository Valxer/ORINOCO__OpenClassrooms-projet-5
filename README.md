# Projet5 - Orinoco | Orinoursons
Projet 5 de la formation Develeoppeur Web d'OpenClassrooms, il consiste à développer la partie front-end d'un premier MVP pour un site de e-commerce
## Objectifs
1. Créer du contenu dynamique en utilisant javascript
2. Utiliser une API et les requêtes pour implémenter du contenu et valider une transaction.
3. Réutiliser les connaissances des projets précédents pour faire un site responsive et optimisé
## Livrables
+ Un site avec 4 types de page :
	* Un acceuil avec tous les produits
	* Une page produit spécifique à chaque produit
	* Une page panier pour accéder à sa commande, la modifier, la supprimmer ou la valider
	* Une page validation qui confirme la prise en compte de la commande et remercie le client de son achat 
+ Un plan de test qui décrit toutes les fonctions ou méthodes utilisées ainsi que les erreurs possibles sur ces fonctions
## Installation
1. Cloner le repository sur votre ordinateur avec ``git clone https://github.com/Valxer/KevinLeVanPhung_5_24052021.git``
2. Ouvrez le dossier avec VSCode et ouvrez un terminal 
    * Tapez ``cd Back/ && npm install`` pour installer les dépendances du Back-end du site.
	* Tapez ``node server`` pour lancer le serveur de l'API. Par défaut il devrait se lancer sur le port 3000, si ce n'est pas le cas les requêtes à l'API du site ne seront pas fonctionnelles.
3. Ouvrez un autre onglet de terminal 
	* Tapez ``cd Front/ && npm install`` pour installer les dépendances du Front-end du site
## Production et accès au site	
1. Taper ``npm run build`` pour mettre le site en production.
4. Un nouveau dossier appelé dist a été créé dans le dossier Front. 
A l'intérieur il y a un fichier index.html. 
Faites clic-droit > Open with Live Server pour accéder au site.
