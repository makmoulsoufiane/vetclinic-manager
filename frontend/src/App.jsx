import React from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import OwnersList from "./pages/Owners/OwnersList";
import OwnersForm from "./pages/Owners/OwnersForm";
import AnimalsList from "./pages/Animals/AnimalsList";
import AnimalsForm from "./pages/Animals/AnimalsForm";
import AnimalDetail from "./pages/Animals/AnimalDetail";
import ConsultationsList from "./pages/Consultations/ConsultationsList";
import ConsultationsForm from "./pages/Consultations/ConsultationsForm";
import DocumentsList from "./pages/Documents/DocumentsList";
import DocumentsForm from "./pages/Documents/DocumentsForm";
import VeterinariansPage from "./pages/Admin/VeterinariansPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<ProtectedRoute><Navbar /><Dashboard /></ProtectedRoute>} />

        <Route path="/owners" element={<ProtectedRoute><Navbar /><OwnersList /></ProtectedRoute>} />
        <Route path="/owners/new" element={<ProtectedRoute><Navbar /><OwnersForm /></ProtectedRoute>} />
        <Route path="/owners/edit/:id" element={<ProtectedRoute><Navbar /><OwnersForm /></ProtectedRoute>} />

        <Route path="/animals" element={<ProtectedRoute><Navbar /><AnimalsList /></ProtectedRoute>} />
        <Route path="/animals/new" element={<ProtectedRoute><Navbar /><AnimalsForm /></ProtectedRoute>} />
        <Route path="/animals/edit/:id" element={<ProtectedRoute><Navbar /><AnimalsForm /></ProtectedRoute>} />
        <Route path="/animals/:id" element={<ProtectedRoute><Navbar /><AnimalDetail /></ProtectedRoute>} />

        <Route path="/consultations" element={<ProtectedRoute><Navbar /><ConsultationsList /></ProtectedRoute>} />
        <Route path="/consultations/new" element={<ProtectedRoute><Navbar /><ConsultationsForm /></ProtectedRoute>} />
        <Route path="/consultations/new/:animalId" element={<ProtectedRoute><Navbar /><ConsultationsForm /></ProtectedRoute>} />
        <Route path="/consultations/edit/:id" element={<ProtectedRoute><Navbar /><ConsultationsForm /></ProtectedRoute>} />

        <Route path="/documents/:consultationId" element={<ProtectedRoute><Navbar /><DocumentsList /></ProtectedRoute>} />
        <Route path="/documents/new/:consultationId" element={<ProtectedRoute><Navbar /><DocumentsForm /></ProtectedRoute>} />
        <Route
          path="/admin/veterinarians"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Navbar />
              <VeterinariansPage />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

export default App
