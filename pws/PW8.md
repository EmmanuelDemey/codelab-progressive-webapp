## PW8 - Service Worker - SW Precache

* Créez un script `sw-dynamic.js` dans lequel vous allez mettre une partie de la configuration du service worker implémenté précédemment.
    * L'événement `fetch` gérant les images `*.jpg`
    * L'événement `sync` de la Background Sync API

* Nous allons écrire un script NodeJS, permettant de générer, via **sw-precache**, la gestion des ressources statiques constituant notre AppShell. Pour cela, vous pouvez créer un fichier JavaScript.

* Configurez **sw-precache** afin de respecter les prérequis suivants :
    * Le service worker généré remplacera le fichier `sw.js`
    * Via la propriété `importScripts`, il devra importer le fichier `sw-dynamic.js`
    * Grâce aux propriétés `staticFileGlobs` et `stripPrefixMulti`, vous devez mettre en cache les mêmes ressources que dans l'ancienne version : la page principale, les scripts JavaScript, les CSS, les polices et les images SVG.

* Vous pouvez à présent exécuter votre script via la commande `node votrefichier.js`

N'hésitez pas à vérifier le contenu du fichier `sw.js` généré, afin de vous assurer que les fichiers mis en cache sont corrects.