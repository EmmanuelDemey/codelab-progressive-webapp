# Codelab Progressive Webapp

## TP1 - Auditer votre application

## TP2 - Mise en place de Http2

La première optimisation que nous allons mettre en place est l'utilisation d'HTTP2 sur notre 
serveur. Le serveur que nous vous proposons est un serveur Express (NodeJS), mais ne supporte
pour l'instant que HTTP. 

Nous allons donc intégrer le module `NodeJS` *spdy*  afin de gérer cette nouvelle version du protocole. 
Nous vous conseillons de faire les modifications en deux étapes : 

- Rendre accessible votre site que en HTTP2
- Utilisation la fonctionnalité de *Server Push* pour envoyer les ressources statiques de votre site à votre client

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

Vous devez servir ainsi les deux fichiers `script.js` et `style.css` 

Votre serveur utilisera à présent le procole `http2` pour servir votre application. 
