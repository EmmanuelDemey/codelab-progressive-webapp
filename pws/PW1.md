
## PW1 - Auditez votre application

Avant d'implémenter les fonctionnalités permettant de rendre une application compatible **Progressive Webapp**, il est intéressant tout d'abord de faire un  petit audit de l'existant. 
Nous allons éviter de le faire à la main, et plutôt utiliser l'outil **Lighthouse**, développé par l'équipe Chrome.

Cet outil est disponible directement dans les dernières versions de Chrome mais également en ligne de commande via un module **NPM**. 
Nous allons utiliser la première solution.

### Utilisation via Chrome

* Lancez l'application

```shell
npm install
node server.js
```

* Ouvrir l'application dans Chrome : http://localhost:3003/
* Ouvrir les Chrome Devtools via F12
* Accéder à l'onglet **Audits**
* Lancer un audit

![Chrome DevTools - Launch audit](/images/chrome-devtools-launch-audit.png)

L'outil devrait vous rendre un rapport d'audit complet directement sur Chrome. 
Lors de ce codelab, nous allons essayer de corriger tous les problèmes remontés.

* Notez le score initiale retournée par **LightHouse** dans Chrome. 
Elle devrait être égale à 45%.

### Utilisation via NPM (solution alternative)

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

* Notez la note initiale retournée par **LightHouse**. 
Elle devrait être égale à 45%.
