import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

// Tidak menampilkan apa-apa. Setiap pindah halaman: gulir ke paling atas
// dan hapus status "baru keluar" (lihat AuthProvider).
export default function GulirKeAtas() {
  const { pathname } = useLocation();
  const { lupakanKeluar } = useAuth();

  useEffect(() => {
    window.scrollTo(0, 0);
    lupakanKeluar();
  }, [pathname, lupakanKeluar]);

  return null;
}
