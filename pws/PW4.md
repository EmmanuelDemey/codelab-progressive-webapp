## PW4 - Service Worker

À partir de ce PW, nous allons utiliser la version HTTP de notre serveur. En effet, les service workers ne peuvent normalement être actifs que si ils sont servis via HTTPs. Mais Chrome, sans aucune configuration, les active en HTTP pour les serveurs en `localhost`.

Si vous désirez tout de même utiliser la version `HTTP2`, vous devez lancer **Chrome** avec les options suivantes :

```shell
/usr/bin/google-chrome --user-data-dir=~/tmp --ignore-certificate-errors --unsafely-treat-insecure-origin-as-secure=https://localhost:3003
```

Comme première mise en pratique, nous allons créer un service worker permettant de modifier les réponses de certaines requêtes. La solution que nous allons mettre en oeuvre n'est utile que pour ce PW, et sera supprimée dans le suivant.

* Enregistrez un Service Worker, que vous allez définir dans un fichier **sw.js**. Ce dernier sera situé dans le répertoire **server/app/assets**.

* Première exercice : pour chaque requête, retournez le code HTML suivant :

```html
<h1> Bonjour Devoxx ! </h1>
```

* Second exercice : pour toutes les requêtes envoyées pour récupérer des images **jpeg**,
retournez le fichier **cat.gif** du répertoire **server/app/assets/imgs**.