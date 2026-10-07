import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Pembungkus halaman yang butuh login.
// Kalau belum login, pengguna dialihkan ke /login.
export default function ProtectedRoute({ children }) {
  const { sudahLogin, baruKeluar } = useAuth();

  // Baru saja menekan Keluar: kembali ke Beranda
  if (!sudahLogin && baruKeluar) return <Navigate to="/" replace />;

  if (!sudahLogin) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
