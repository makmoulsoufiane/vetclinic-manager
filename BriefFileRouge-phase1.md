#  Cahier des Charges — Application Web **VetClinic Manager**

---

## 1. Présentation Générale du Projet

La clinique vétérinaire souhaite disposer d’un système numérique centralisé permettant la gestion complète des informations relatives aux animaux pris en charge, à leurs propriétaires, aux consultations effectuées, ainsi qu'aux documents médicaux associés (ordonnances, rapports, examens, etc.).

L’application devra offrir une solution unique et fiable pour :

* Suivre le quotidien des consultations,
* Organiser les dossiers médicaux,
* Accéder rapidement à l’historique des visites,
* Consulter les documents associés aux patients animaux.
---

## 2. Enjeux et Problèmes Actuels

La clinique gère actuellement ses informations à l’aide :

* de supports papier dispersés,
* de documents numériques non structurés,
* de fichiers stockés sans classification ni traçabilité.

Ces pratiques entraînent :

* des pertes d’informations,
* un risque accru d’erreurs,
* une lenteur dans le traitement administratif,
* l’impossibilité d’établir des analyses fiables et régulières.

 L’application proposée devra centraliser ces données, sécuriser leur traitement, et améliorer la qualité de suivi médical.

---

## 3. Objectifs Fonctionnels (vision globale)

L’application devra permettre :

* La gestion structurée des **données administratives** (propriétaires, animaux),
* La gestion des **données médicales** (consultations, diagnostics),
* L’accès sécurisé via **authentification utilisateur** et **gestion de rôles**.

 Les fonctionnalités ne sont pas détaillées volontairement : elles seront définies par l’équipe dans la phase d’analyse.

---

## 4. Périmètre du Projet

### Inclus dans le périmètre :

* Développement complet Frontend + Backend
* API REST sécurisée
* Base de données
* Authentification et rôles utilisateurs
* Gestion minimale des modules principaux
* Upload de documents
* Administration basique des données cliniques

---

## 5. Contraintes Techniques

### 5.1 Architecture Applicative

* Architecture distribuée : **API REST Laravel** + **Client Web React**
* Échange de données au format JSON
* Hébergement web classique (local ou serveur mutualisé)

### 5.2 Technologies imposées

* Backend : **Laravel**
* Frontend : **React / React Router /Redux**
* Base de données
* Authentification 

### 5.3 Sécurité et rôles

* Connexions sécurisées
* Gestion d’accès par **rôles utilisateurs**

Exemples recommandés :

* **Admin**
* **Vétérinaire**

### 5.4 Stockage documentaire

* Stockage local (dossier `/public/uploads`)
* Formats acceptés : images, PDF
* Association d’un document à une entité (animal ou consultation)
* Journalisation (date de création et modification)

---

## 6. Structure Organisationnelle des Données (conceptuel)

⚠️ La modélisation détaillée (tables, clés étrangères, cardinalités) =>  UML.

---

## 7. Livrables attendus


### 7.1 Documentation d’analyse

* Diagrammes UML :

  * Cas d’utilisation
  * Diagramme de classes

### 7.2 Documentation technique

* Modèle conceptuel de données
* Schéma de l’architecture applicative
* Documentation API
* Scripts SQL (création + seed éventuellement)

### 7.3 Partie logicielle

* Application web fonctionnelle
* Code source versionné (Git obligatoire)
* Scripts d’installation


## 8. MVP (Version Minimale Requise — Obligatoire)

La version MVP devra impérativement contenir :

 Authentification + rôles
 CRUD Propriétaires
 CRUD Animaux
 CRUD Consultations
 Upload de documents liés à une consultation
 Interface utilisateur simple et fonctionnelle
 Base de données fonctionnelle et relations correctes

 Aucun module supplémentaire ne sera accepté en MVP.
Le but est de garantir une soutenance efficace et réalisable.

---

## 9. Critères d’évaluation

### Techniques

* Respect du périmètre MVP
* Bon fonctionnement de l’API
* Qualité du code (organisation, lisibilité)
* Sécurité minimale respectée
* Documentation claire
* testing/dockerisation

### Bonus possibles

* Statistiques (dashboard)
* Recherche avancée
* Filtres multi-critères
* Export PDF
* Tests automatisés

---

#  Cadre des Fonctionnalités — Projet **VetClinic Manager**

L’objectif de ce projet est de développer une application web simple et fonctionnelle permettant de gérer les informations d’une clinique vétérinaire.
Afin d’encadrer votre travail, les fonctionnalités sont réparties en deux parties :

* un **MVP (Minimum Viable Product)** qui est **obligatoire**,
* des **extensions** qui sont **facultatives**.

---

---

##  1. Fonctionnalités **MVP (Obligatoires)**

Les fonctionnalités MVP représentent le cœur du projet.
**Elles doivent être réalisées en priorité et présentées à la soutenance.**

Votre application devra obligatoirement permettre :

###  Authentification et rôles

* Connexion par email + mot de passe
* Déconnexion
* Deux types d’utilisateurs minimum :

  * Administrateur
  * Vétérinaire

 Cela permet de sécuriser l’accès aux données médicales.

---

###  Gestion des propriétaires

* Ajouter un propriétaire
* Modifier les informations
* Supprimer un propriétaire
* Afficher la liste
* Recherche simple (nom ou téléphone)

---

###  Gestion des animaux

* Enregistrer un animal associé à un propriétaire
* Modifier la fiche d’un animal
* Supprimer un animal
* Afficher la liste des animaux
* Voir le détail d’un animal
---

###  Gestion des consultations

* Enregistrer une consultation médicale pour un animal
* Modifier une consultation
* Supprimer une consultation
* Afficher l’historique des consultations d’un animal

---

### Gestion des documents médicaux (Upload)

* Ajouter un document à une consultation (PDF ou image)
* Afficher les documents liés à une consultation
* Télécharger un document
* Supprimer un document
---

### Interface utilisateur minimum

* Page de connexion
* Menu pour naviguer entre les modules
* Pages de listes + formulaires

---

##  2. Fonctionnalités **Extension (Facultatives)**

Ces fonctionnalités **ne doivent être développées que si le MVP est terminé**.
Elles amélioreront la note mais **ne remplacent pas** le MVP.

### Exemple d’extensions possibles :

* Recherche avancée (filtres)
* Dashboard avec statistiques
* Génération de PDF
* Export CSV
* Galerie d’images
* Historique des actions
* Rappels / notifications internes


---

##  4. Ce que l’on attend **avant de coder**

Avant de commencer le développement, vous devrez :

✔️ rédiger vos user stories
✔️ faire vos diagrammes UML (use case + classes )
✔️ faire vos maquettes Figma
✔️ planifier le découpage de votre travail (sprints)

Le code ne doit commencer qu’après validation de cette phase de conception.



