import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

// Pembungkus rute yang hanya boleh dibuka setelah login (lihat App.jsx).
// <Outlet /> = tempat halaman anak ditampilkan kalau pengguna sudah login.
export default function ProtectedRoute() {
  const { sudahLogin, baruKeluar } = useAuth();

  if (sudahLogin) return <Outlet />;

  // Baru saja logout -> ke Beranda. Belum pernah login -> ke halaman Login.
  return <Navigate to={baruKeluar ? '/' : '/login'} replace />;
}
