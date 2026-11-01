import { useCallback, useEffect, useMemo, useState } from 'react';
import { AuthContext } from './authContext';
import { pengguna as penggunaContoh } from '../data/account';
import { bacaJson, hapusKunci, simpanJson } from '../utils/storage';

const KUNCI = 'videobelajar-akun';

// Berapa lama (ms) status "baru saja keluar" dipertahankan
const DURASI_BARU_KELUAR = 1000;

export function AuthProvider({ children }) {
  // Fungsi dikirim ke useState (bukan hasilnya) supaya localStorage hanya dibaca sekali
  const [pengguna, setPengguna] = useState(() => bacaJson(KUNCI));

  // true sesaat setelah logout. Dipakai ProtectedRoute: kalau pengguna keluar dari halaman
  // yang dilindungi, ia dikirim ke Beranda ('/'), bukan ke halaman Login.
  const [baruKeluar, setBaruKeluar] = useState(false);

  // Simpan ke localStorage setiap data pengguna berubah, supaya login bertahan setelah refresh
  useEffect(() => {
    if (pengguna) simpanJson(KUNCI, pengguna);
    else hapusKunci(KUNCI);
  }, [pengguna]);

  // Status "baru keluar" hanya berlaku sebentar
  useEffect(() => {
    if (!baruKeluar) return undefined;
    const timer = setTimeout(() => setBaruKeluar(false), DURASI_BARU_KELUAR);
    return () => clearTimeout(timer);
  }, [baruKeluar]);

  // useCallback: fungsi tidak dibuat ulang tiap render, jadi aman dipakai di dependency useEffect
  const login = useCallback((data = {}) => {
    setBaruKeluar(false);
    setPengguna({ ...penggunaContoh, ...data });
  }, []);

  const logout = useCallback(() => {
    setBaruKeluar(true);
    setPengguna(null);
  }, []);

  const lupakanKeluar = useCallback(() => setBaruKeluar(false), []);

  // Gabungkan perubahan ke data pengguna yang sudah ada (mis. ganti nama atau foto)
  const perbarui = useCallback((data) => setPengguna((lama) => ({ ...lama, ...data })), []);

  // useMemo: objek nilai context hanya dibuat ulang kalau isinya benar-benar berubah,
  // sehingga komponen yang memakai useAuth tidak render ulang tanpa perlu.
  const nilai = useMemo(
    () => ({ sudahLogin: pengguna !== null, pengguna, baruKeluar, login, logout, lupakanKeluar, perbarui }),
    [pengguna, baruKeluar, login, logout, lupakanKeluar, perbarui]
  );

  return <AuthContext.Provider value={nilai}>{children}</AuthContext.Provider>;
}
