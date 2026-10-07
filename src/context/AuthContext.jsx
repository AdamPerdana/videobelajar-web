import React, { createContext, useContext, useEffect, useState } from 'react';
import { pengguna as penggunaContoh } from '../data/account';

// Menyimpan status login untuk seluruh aplikasi.
// Untuk sekarang login hanya disimpan di browser (localStorage).
// TODO: ganti dengan login ke API (token), bagian lain aplikasi tidak perlu diubah.

const KUNCI = 'videobelajar-akun';
const AuthContext = createContext(null);

function muatAkun() {
  try {
    return JSON.parse(localStorage.getItem(KUNCI));
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  // null = belum login, selain itu berisi data pengguna
  const [pengguna, setPengguna] = useState(muatAkun);
  // true tepat setelah tombol Keluar ditekan, supaya diarahkan ke Beranda, bukan ke Login
  const [baruKeluar, setBaruKeluar] = useState(false);

  useEffect(() => {
    try {
      if (pengguna) localStorage.setItem(KUNCI, JSON.stringify(pengguna));
      else localStorage.removeItem(KUNCI);
    } catch {
      // Penyimpanan browser tidak tersedia, login hanya bertahan selama halaman terbuka
    }
  }, [pengguna]);

  // Tanda "baru keluar" hanya dibutuhkan sesaat untuk pengalihan ke Beranda
  useEffect(() => {
    if (!baruKeluar) return undefined;
    const timer = setTimeout(() => setBaruKeluar(false), 1000);
    return () => clearTimeout(timer);
  }, [baruKeluar]);

  const nilai = {
    sudahLogin: pengguna !== null,
    pengguna,
    baruKeluar,
    // data: bagian yang diketahui saat login/daftar (email, nama, noHp), sisanya dari data contoh
    login: (data = {}) => {
      setBaruKeluar(false);
      setPengguna({ ...penggunaContoh, ...data });
    },
    logout: () => {
      setBaruKeluar(true);
      setPengguna(null);
    },
    // Dipanggil setelah berpindah halaman, supaya pengalihan berikutnya kembali ke Login
    lupakanKeluar: () => setBaruKeluar(false),
    perbarui: (data) => setPengguna((lama) => ({ ...lama, ...data })),
  };

  return <AuthContext.Provider value={nilai}>{children}</AuthContext.Provider>;
}

// Pemakaian di komponen: const { sudahLogin, pengguna, login, logout } = useAuth();
export function useAuth() {
  return useContext(AuthContext);
}
