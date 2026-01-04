#  PHASE 2 — FRONTEND

## Projet Fil Rouge : **VetClinic Manager**

##  Objectif de la phase

Développer **l’interface utilisateur complète** de l’application VetClinic Manager, en respectant **le MVP**, l’UX minimale et une architecture React propre.

>  Règle clé : **aucune extension tant que le MVP Frontend n’est pas terminé et fonctionnel.**

---

##  1. Ce que doivent avoir AVANT de coder

(Validation obligatoire)

* ✔️ Diagramme de classes validé
* ✔️ User Stories rédigées et planifiées (Trello)
* ✔️ Maquettes Figma (écrans MVP)

 **Sans validation = pas de code.**

---

##  2. Stack Frontend imposée

* **React**
* **React Router**
* **Redux (ou Context API accepté si bien justifié)**
* **Axios / Fetch**
* CSS libre (CSS / SCSS / Tailwind / MUI…)

---

##  3. Architecture Frontend attendue

###  Structure minimale recommandée

```
src/
 ├── api/
 │    ├── auth.api.js
 │    ├── owners.api.js
 │    ├── animals.api.js
 │    ├── consultations.api.js
 │    └── documents.api.js
 │
 ├── pages/
 │    ├── Login.jsx
 │    ├── Owners/
 │    ├── Animals/
 │    ├── Consultations/
 │    └── Documents/
 │
 ├── components/
 │    ├── Navbar.jsx
 │    ├── ProtectedRoute.jsx
 │    └── Forms/
 │
 ├── store/ (Redux)
 │    ├── auth/
 │    ├── owners/
 │    ├── animals/
 │    └── consultations/
 │
 ├── services/
 │    ├── auth.service.js
 │
 ├── App.jsx
 └── main.jsx
```

 Objectif : **lisibilité, séparation des responsabilités, maintenabilité**.

---

##  4. Fonctionnalités Frontend — MVP (OBLIGATOIRES)

### 4.1 Authentification

* Page **Login**
* Redirection si non authentifié
* Déconnexion

---

###  4.2 Propriétaires

* Liste des propriétaires
* Ajouter / Modifier / Supprimer
* Recherche simple (nom / téléphone)

---

###  4.3 Animaux

* Liste des animaux
* Ajouter un animal (lié à un propriétaire)
* Modifier / Supprimer
* Page **détail animal**
  * infos
  * consultations associées

---

###  4.4 Consultations

* Créer une consultation pour un animal
* Modifier / Supprimer
* Liste des consultations par animal

---

###  4.5 Documents

* Upload document (PDF / image)
* Liste des documents par consultation
* Télécharger / Supprimer

---

###  4.6 Navigation & UX

* Navbar visible après connexion
* Accès rapide aux modules
* Feedback utilisateur :

  * chargement
  * succès
  * erreur

---

##  5. Règles de qualité Frontend (évaluées)

✔️ Composants réutilisables
✔️ Pas de logique API dans les composants
✔️ Gestion propre des erreurs
✔️ Formulaires validés
✔️ Code lisible et structuré

❌ Pas de hardcode des données

---

##  6. Découpage recommandé en Sprints

### 🟢 Sprint 1 – Setup & Auth

* Initialisation React
* Routing
* Login / Logout
* Protected routes

### 🟢 Sprint 2 – Propriétaires

* CRUD complet
* Recherche
* UI forms

### 🟢 Sprint 3 – Animaux

* CRUD
* Liaison propriétaire
* Détail animal

### 🟢 Sprint 4 – Consultations

* CRUD
* Historique par animal

### 🟢 Sprint 5 – Documents

* Upload
* Liste
* Download / delete

---

## 7. Trello – Colonnes obligatoires

```
 Backlog
 To Do ( en cours)
 In Progress
 Review / Test
 Done
```

> 1 carte = 1 user story
> Une carte ne passe en **Done** que si l’écran fonctionne réellement.

---

##  8. Livrables de la Phase 2

* Code frontend fonctionnel
* Connexion réelle à l’API
* README (installation + lancement)
* Démo complète du MVP

---
