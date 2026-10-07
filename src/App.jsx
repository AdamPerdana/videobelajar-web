import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import CourseDetail from './pages/CourseDetail';
import Checkout from './pages/Checkout';
import Payment from './pages/Payment';
import ChangeMethod from './pages/ChangeMethod';
import PaymentStatus from './pages/PaymentStatus';
import Profile from './pages/Profile';
import MyCourses from './pages/MyCourses';
import Orders from './pages/Orders';
import Learn from './pages/Learn';
import Certificate from './pages/Certificate';
import Login from './pages/Login';
import Register from './pages/Register';

// Setiap pindah halaman: gulir kembali ke atas, dan lupakan tanda "baru keluar"
function GulirKeAtas() {
  const { pathname } = useLocation();
  const { lupakanKeluar } = useAuth();
  useEffect(() => {
    window.scrollTo(0, 0);
    lupakanKeluar();
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
      <GulirKeAtas />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/kategori" element={<Catalog />} />
        <Route path="/kelas/:id" element={<CourseDetail />} />

        {/* Halaman di dalam ProtectedRoute hanya bisa dibuka setelah login */}
        {/* Alur pembayaran */}
        <Route path="/checkout/:id" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
        <Route path="/bayar/:id" element={<ProtectedRoute><Payment /></ProtectedRoute>} />
        <Route path="/ubah-metode/:id" element={<ProtectedRoute><ChangeMethod /></ProtectedRoute>} />
        <Route path="/pembayaran/:status" element={<ProtectedRoute><PaymentStatus /></ProtectedRoute>} />

        {/* Akun */}
        <Route path="/profil" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/kelas-saya" element={<ProtectedRoute><MyCourses /></ProtectedRoute>} />
        <Route path="/pesanan" element={<ProtectedRoute><Orders /></ProtectedRoute>} />

        {/* Ruang belajar */}
        <Route path="/belajar/:id" element={<ProtectedRoute><Learn /></ProtectedRoute>} />
        <Route path="/sertifikat/:id" element={<ProtectedRoute><Certificate /></ProtectedRoute>} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Alamat yang tidak dikenal dikembalikan ke Beranda */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  );
}
