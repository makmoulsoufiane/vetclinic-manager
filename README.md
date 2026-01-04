# VetClinic Manager - Frontend

Application de gestion pour clinique vétérinaire.

## 🚀 Installation

```bash
# Installer les dépendances
npm install

# Lancer l'application (dev + fake API)
npm run dev:all

# Ou séparément:
npm run dev      # Frontend only (port 5173)
npm run api      # Fake API only (port 8000)
```

## 🔑 Comptes de test

**Admin:**
- Email: `admin@vetclinic.com`
- Password: `admin123`

**Vétérinaire:**
- Email: `vet@vetclinic.com`
- Password: `vet123`

## 📁 Structure

```
src/
├── api/          # Services API
├── components/   # Composants réutilisables
├── pages/        # Pages de l'application
└── App.jsx       # Configuration routes
```

## 🛠️ Technologies

- **React** - UI Library
- **React Router** - Navigation
- **Axios** - HTTP Client
- **Tailwind CSS** - Styling
- **JSON Server** - Fake REST API
- **Vite** - Build tool

## 📝 MVP Features

✅ Authentification
✅ Gestion Propriétaires
✅ Gestion Animaux
✅ Gestion Consultations
✅ Upload Documents

## 🎨 Composants disponibles

- `<Button />` - Boutons stylisés
- `<Input />` - Champs de formulaire
- `<Card />` - Cartes conteneurs
- `<Table />` - Tableaux de données
- `<Loading />` - Indicateur de chargement
