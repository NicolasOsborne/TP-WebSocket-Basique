# Nicolas OSBORNE

# Applications en temps réel - TP Long Polling

## Contexte

Ce TP est réalisé dans le cadre du module "Applications en Temps Réel" en M2 Ingénierie du Web à l'ESGI, dispensé par Laurent BELLON.

## Objectif du TP

Ce projet implémente un système minimaliste de chat permettant l'échange de messages simples entre un serveur et un client à l'aide d'une connexion WebSocket basique.
Le serveur a pour rôle de recevoir les messages des clients et de les retransmettre à tous les autres clients connectés (un "broadcast" simple).

## Technologies utilisées

- Node.js et Express
- HTML, CSS et Vanilla JS

## Lancer l'application

- S'assurer d'avoir Node.js d'installé

- Installer les dépendances :

```bash
cd server
npm install
```

- Lancer l'application :

```bash
node server.js
```

- Accéder à l'application à l'addresse http://localhost:8080

## Étapes d'implémentation

### Côté serveur

Le serveur a été configuré à l'aide d'Express pour gérer deux types de requêtes simultanément à l'aide de WebSocket (`ws`), pour gérer les communications en temps réel sur le même port `8080`.

Le serveur WebScocket écoute à la fois les événements de connexion et de message. Lorsqu'un client envoie un message, le service utilise `wss.clients` pour itérer sur toutes les connexions actives et leur retransmettre le message par "broadcast".
Les messages sont envoyés et reçus sous forme d'objets JSON avec le username et le message.

### Côté client

Pour une meilleure expérience utilisateur, le client différencie les messages envoyés par cet utilisateur ou les autres (en comparant le username du client local qui a été définit), et en les affichant avec des classes CSS différentes (`my-message` et `other-message`).

## Défis

Au départ, le nom d'utilisateur était lu et stocké au chargement de la page, ce qui signifie qu'après avoir changé son nom, le message apparaissait comme étant envoyé par un autre utilisateur (avec un nom d'ulisateur vide).
En séparant l'action de saisie du nom et la connexion initiale, la variable `myUsername` a pu être mise à jour correctement, et les champs de saisie du chat sont désactivés jusqu'à ce qu'un nom a été choisi.
