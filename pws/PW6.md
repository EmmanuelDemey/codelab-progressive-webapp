## PW6 - Service Worker - IndexedDB

Nous allons maintenant finaliser la partie offline de notre application, et ce en deux étapes :

* Sauvegarde des données dans une base **IndexedDB**, via la bibliothèque **localforage**
* Mise en cache des images des articles.

* Incluez la bibliothèque **localforage** dans votre fichier `index.html`
* Dans votre fichier `script.js`, lors de la récupération des données, sauvegardez-les dans la base **IndexedDB**.
* Si l'utilisateur n'a pas de réseau, récupérez les données depuis cette base.
* Dans le Service Worker, lors d'une requête pour récupérer une image avec l'extension `jpg`, faites d'abord une requête; si elle tombe en erreur, retournez une version mise en cache.

Vous pouvez à présent vérifier le nouveau score calculé par **LightHouse**.