import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


export default function ProtectedRoute({ children }) {
  const { sudahLogin, baruKeluar } = useAuth();

 
  if (!sudahLogin && baruKeluar) return <Navigate to="/" replace />;

  if (!sudahLogin) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
