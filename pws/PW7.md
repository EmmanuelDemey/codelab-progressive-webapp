## PW7 - Service Worker - Background Sync

Nous allons maintenant mettre en place **Background Sync**, pour ajouter la possibilité de **Like** un article.

* Dans le service worker, écoutez l'événement **sync** afin d'exécuter une requête de type **GET** vers l'URL `/like` lorsqu'une synchronisation `like` est envoyée.

* Dans le fichier principal, lors du `click` sur le boutoun *Like*, n'envoyez plus la requête, mais enregistrez plutôt notre synchronisation `like`.

* Testez cette modification en activant et désactivant le réseau sur votre ordinateur. (Le mode **offline** des DevTools ne peut pas être utilisé pour ce test)

Vous pouvez à présent vérifier le nouveau score calculé par **LightHouse**.