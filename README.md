# NAO
Code source de l'application web permettant le contrôle du robot NAO. L'application a été développée dans le cadre du projet de seconde année à 3iL.

## Pré-requis

* NodeJS v6.X.X ou supérieur
* Php >= 5.4
* MySQL
	
## Installation

* Dossier d'installation (sur le Raspberry) : /var/www/htdocs/new

### Client

```
    $ cd /var/www/htdocs/new/client
    $ npm install
    $ npm run build

    $ cp -R dist/* ../
````

### Base de données

* Fichier de configuration : /var/www/htdocs/new/api/config.php
* Fichier \*.sql : /var/www/htdocs/new/api/model/db.sql

## Démarrage de l'application

```
    $ cd /var/www/htdocs/new/client
    $ npm start
```

Ouvrir la page localhost:8080 sur un navigateur puis modifier le fichier client/conf/webpack/dev.js pour y changer la variable représentant l'URL de l'application.

## Accès

* URL de l'application : IP/new
* Identifiant  : test
* Mot de passe : test
