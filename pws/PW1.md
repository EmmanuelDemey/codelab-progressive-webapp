
## PW1 - Auditez votre application

Avant d'implémenter les fonctionnalités permettant de rendre une application compatible **Progressive Webapp**, il est intéressant
tout d'abord de faire un petit audit de l'existant. Nous allons éviter de le faire à la main, et plutôt utiliser l'outil
**Lighthouse**, développé par l'équipe Chrome.

Cet outil peut soit être utilisé via une extension Chrome, soit en ligne de commande via un module **NPM**. Nous allons utiliser cette dernière
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

L'outil doit normalement retourner un rapport d'audit directement dans la console.
Si tout se passe bien, un rapport HTML est généré.
Lors ce codelab, nous allons essayer de corriger tous les problèmes remontés.

* Vous pouvez également lancer **LightHouse** depuis les **DevTools** de Chrome.