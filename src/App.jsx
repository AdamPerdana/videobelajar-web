import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import ProtectedRoute from './components/ProtectedRoute';
import GulirKeAtas from './components/GulirKeAtas';
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

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <GulirKeAtas />
        <Routes>
          {/* Halaman publik */}
          <Route path="/" element={<Home />} />
          <Route path="/kategori" element={<Catalog />} />
          <Route path="/kelas/:id" element={<CourseDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Semua rute di dalam sini hanya bisa dibuka setelah login */}
          <Route element={<ProtectedRoute />}>
            {/* Alur pembayaran */}
            <Route path="/checkout/:id" element={<Checkout />} />
            <Route path="/bayar/:id" element={<Payment />} />
            <Route path="/ubah-metode/:id" element={<ChangeMethod />} />
            <Route path="/pembayaran/:status" element={<PaymentStatus />} />

            {/* Akun */}
            <Route path="/profil" element={<Profile />} />
            <Route path="/kelas-saya" element={<MyCourses />} />
            <Route path="/pesanan" element={<Orders />} />

            {/* Ruang belajar */}
            <Route path="/belajar/:id" element={<Learn />} />
            <Route path="/sertifikat/:id" element={<Certificate />} />
          </Route>

          {/* Alamat yang tidak dikenal dikembalikan ke Beranda */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
