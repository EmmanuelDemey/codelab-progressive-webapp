## PW9 - Service Worker - SW Toolbox

Pour terminer ce codelab, nous allon simplifier le fichier `sw-dynamic` via l'utilisation de la bibliothèque `sw-toolbox` pour gérer la mise en cache des images `*.jpg`.

* Dans le fichier `sw-toolbox`, importez le script `sw-toolbox.js`.

* Remplacez la gestion de l'événement `fetch` par l'utilisation de la bibliothèque précédemment importée. Vous devez utiliser la stratégie `networkFirst` pour toutes les images `jpg`.