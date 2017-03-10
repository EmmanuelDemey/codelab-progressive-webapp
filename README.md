# Codelab Progressive Webapp

## Prérequis

Pour faire ce codelab, vous avez besoin des outils suivants : 

* GIT
* NodeJS 7.x
* Google Chrome
* Un IDE

## PW1 - Auditer votre application

Avant d'implémenter les fonctionnalités permettant de rendre une application compatible **Progressive Webapp**, il est intéressant
tout d'abord de faire un petit audit de l'existant. Nous allons éviter de le faire à la main, mais nous allons plutôt utiliser l'outil
**Lighthouse**, développé par l'équipe Chrome. 

Cet outil peut soit être utilisé via une extension Chrome, ou en ligne de commande via un module **NPM**. Nous allons utiliser cette dernière 
solution. 

* Installez le module `lighthouse` via `NPM`

```shell
npm i -g lighthouse
```

Vous pouvez maintenant auditer l'application que nous vous proposons. 

* Lancez l'application

```shell
npm install
node server.js
```

* Lancez **LightHouse**

```shell
lighthouse http://localhost:3003/
```

L'outil doit normalement vous retourner un rapport d'audit directement dans la console. 
Nous allons essayer de corriger tous ces problèmes lors ce codelab. Un rapport HTML doit 
normalement être généré. 

* Notez la note initiale retournée par **LightHouse**. Elle doit normalement être égale à 34%.


## PW2 - Manifest

Pour valider votre manifest, et si vous avez une connexion, vous pouvez utiliser le site `https://manifest-validator.appspot.com/`.

Pour tester votre Manifest, vous pouvez utiliser les **DevTools* de Chrome, et notamment l'onglet **Application**. Vous pourrez également depuis
le même panel, tester l'installation de votre application sur le bureau de votre ordinateur. 

![Chrome DevTools - Add tp Home Screen](images/addtohomescreen.png)

Vous pouvez à présent vérifier le nouveau score calculé par **LightHouse**

## PW3 - Mise en place de Http2

La première optimisation que nous allons mettre en place est l'utilisation d'HTTP2 sur notre 
serveur. Le serveur que nous vous proposons est un serveur Express (NodeJS), mais ne supporte
pour l'instant que HTTP. 

Nous allons donc intégrer le module `NodeJS` **spdy**  afin de gérer cette nouvelle version du protocole. 
Nous vous conseillons de faire les modifications en deux étapes : 

- Rendre accessible votre site que en HTTP2
- Utilisation la fonctionnalité de **Server Push** pour envoyer les ressources statiques de votre site à votre client

### Site accessible en HTTP2

* Générer les différents certificats

```shell
openssl genrsa -des3 -passout pass:x -out server.pass.key 2048
openssl rsa -passin pass:x -in server.pass.key -out server.key
rm server.pass.key
openssl req -new -key server.key -out server.csr
openssl x509 -req -sha256 -days 365 -in server.csr -signkey
```

* Dans le fichier server.js, stocker le contenu des fichier `server.key` et `server.crt` dans  deux variables. 

* Installer le module `spdy`

* Instancier votre serveur grâce au module précédemment téléchargé. 

```javascript
require('spdy').createServer(options, app).listen(port);
```

La variable `app` correspond à à votre instance `express` et `options` à un objet de configuration dans lequel vous allez utiliser 
les certificats récupérés précédemment. 

```javascript
const options = {
    key: fs.readFileSync('./server.key'),
    cert: fs.readFileSync('./server.crt')
};
```

Pour vérifier que votre serveur utilise à présent `http2`, vous pouvez vérifier dans les `DevTools` de Chrome. Dans le protocole utilisé pour chaque requête, vous devriez voir `https`

![Chrome DevTools](images/chromedevtools.png)

Vous pouvez également vérifier l'onglet **Security** pour vérifier que votre certificat a bien été pris en compte. 

### ServerPush

La dernière optimisation que nous allons mettre en place est l'utilisation de la fonctionnalité de ServerPush. Cette 
fonctionnalité permet au serveur d'envoyer des ressources statiques avant que le navigateur le demande. Cette fonctionnalité
sera utilisée pour servir les ressources statiques de notre application, situées dans le répertoire `app/assets`. 

* Supprimer l'utilisation du middleware Express `static` qui nous sera à présent inutile. 
* Dans le handler principal de votre serveur, utilisez la méthode `push` de la réponse HTTP afin de retourner le contenu d'un fichier. 
La signature de cette méthode ressemble à : 

```
res.push('url vers votre ressource statique utilisée dans l'html', {
    response: {
        'content-type': 'content-type associé à la ressource statique manipulée'
    }
})
.end(contenu de votre ressources statique)
```

Vous devez servir ainsi les fichiers suivants : 
* le script javascript (`application/javascript`)
* la feuille de style (`text/css`)
* les fonts (`font/woff` et `font/woff2`)
* les images principales (`image/svg+xml`)

Si vous vérifier de nouveau l'onglet **Network** de la console Chrome, certaines requêtes 
doivent à présent être initiées par un **Push** du serveur.

Votre serveur utilise à présent le procole `http2` pour servir votre application. 

Vous pouvez à présent vérifier le nouveau score calculé par **LightHouse**

## PW4 - Service Worker

A partir de ce PW, nous allons utiliser la version HTTP de notre serveur. En effet, 
les service worker ne peuvent normalement être actifs que si ils sont servis via HTTPs. Mais 
Chrome, sans aucune configuration, les active en HTTP pour les serveurs en `localhost`.

Comme première mise en pratique, nous allons créer un service worker permettant de modifier les réponses de certaines requêtes. La solution que nous allons
mettre en oeuvre n'est utile que pour ce PW, et sera supprimée dans le suivant. 

* Enregistrez un Service Worker, que vous allez définir dans un fichier **sw.js**, qui sera situé dans le répertoire **server/app/assets**.

* Première exercice, pour chaque requête, retournez le code HTML suivant : 

```html
<h1> Bonjour Devoxx </h1>
```

* Second exercice, pour toutes les requêtes envvoyées pour récupérer des images **jpeg**, 
retourner le fichier **cat.gif** qui est présent dans le répertoire **server/app/assets/imgs**.

Vous pouvez à présent vérifier le nouveau score calculé par **LightHouse**

## PW5 - Service Worker - AppShell

Nous allons à présent mettre en place notre premier service worker 
afin de mettre en cache l'AppShell de notre application. 

* En JavaScript, ajoutez la classe `off` à l'élément `#wrapper` si l'utiliseur est hors ligne. 

* Dans la phase `install`, mettre dans un cache **codelab-1**, les fichiers de votre application nécessaire pour faire l'AppShell ('/', le fichier javascript, la feuille de style, les font et les images principals)

* Implémentez le `fetch` event pour retourner la version qui est en cache, et si elle n'existe pas, exécutez réélement la requête. 

* Dans la phase `activate`, veuillez supprimer les caches qui ne sont plus utiliser (dont le nom est différent que celui utilisé dans la version actuelle de votre service worker)

* Testez votre application. Après plusieurs rafraichissement, dans l'onglet `network`, vos ressources statiques seront servies par le service worker, et non plus via le réseau. 

Pour émuler le mode offline, vous pouvez le faire via les **DevTools** de Chrome. 
* Cliquez sur l'onglet **Network**
* Activez / Désactivez l'option **Offline**

Pour pouvoir débugger le **cache** de votre navigateur, vous pouvez utiliser les **DevTools**
de Chrome, et notamment la partie **Cache** de l'onglet **Application**

![Cache - Chrome DevTools](images/cachedevtools.png)

Vous pouvez à présent vérifier le nouveau score calculé par **LightHouse**

## PW6 - Service Worker - IndexedDB

Nous allons à finaliser la partie offline de notre application. Nous allons faire cette partie en deux étapes : 

* Sauvegarde des données dans un base **IndexedDB** via la librairie **localforage**
* Mise en cache des images des articles. 

* Incluez la librairie **localforage** dans votre fichier `index.html`
* Dans votre fichier `script.js`, lors de la récupération des données, sauvegardez les dans la base **IndexedDB**.
* Si l'utilisateur n'a pas de réseau, récupérez les données depuis cette base. 
* Dans le Service Worker, lors d'une requête pour récupérer une image avec l'extension `jpg`, faite d'abord une requête, et si elle tombe en erreur, retournez une version mise en cache.

Vous pouvez à présent vérifier le nouveau score calculé par **LightHouse**

## PW7 - Service Worker - Background Sync

Nous allons à présent mettre en place **Background Sync**, pour fonctionnalite de **Like** d'un article. 

* Dans le service worker, écoutez l'événement **sync** afin d'exécuter une requête de type **GET** vers l'URL `/like' lorsqu`'une synchronisation `like` est envoyée.

* Dans le fichier principal, lors du `click` sur le boutoun *Like*, n'envoyez plus la requête, mais enregistrez plutôt notre synchronisation `like`.

* Testez cette modification en activant et désactivant le réseau sur votre ordinateur. 

Vous pouvez à présent vérifier le nouveau score calculé par **LightHouse**

## PW8 - Service Worker - SW Precache

* Créez un script `sw-dynamic.js` dans lequel vous allez mettre une partie de la configuration du service worker implémentée précédemment.
    * L'événement `fetch` gérant les images `*.jpg`
    * L'événement `sync` de la Background Sync API

* Nous allons ecrire un script NodeJS, permettant de générer, via **sw-precache**, la gestion des ressources statiques constituant notre AppShell. Pour cela, vous pouvez créer un fichier script.js

* Configurer **sw-precache** afin de respecter les prérequis suivants : 
    * Le service worker généré remplacera le fichier `sw.js`
    * Via la propriété `importScripts`, il devra importer le fichier `sw-dynamic.js`
    * Grâce aux propriétés `staticFileGlobs` et `stripPrefixMulti`, vous devez mettre en cache les mêmes ressources que dans l'ancienne version : la page principale, les JavaScript, les CSS, les fonts et les images SVG. 

N'hésitez pas à vérifier le contenu du fichier `sw.js` généré, afin de s'assurer que les fichiers mis en cache sont corrects. 

## PW9 - Service Worker - SW Toolbox

Pour terminer ce codelab, nous allon simplier le fichier `sw-dynamic` via l'utilisation de la librairie `sw-toolbox` pour gérer la mise en cache des images `*.jpg`.

* Dans le fichier `sw-toolbox`, importez le script `sw-toolbox.js`.

* Remplacez la gestion de l'événement `fetch` par l'utilisation de la librairie précédemment importée. Vous devez utiliser la stratégie `networkFirst` pour toutes les images `jpg`.