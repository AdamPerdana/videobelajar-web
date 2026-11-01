import React, { createContext, useContext, useEffect, useState } from 'react';
import { pengguna as penggunaContoh } from '../data/account';


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
  
  const [pengguna, setPengguna] = useState(muatAkun);
  
  const [baruKeluar, setBaruKeluar] = useState(false);

  useEffect(() => {
    try {
      if (pengguna) localStorage.setItem(KUNCI, JSON.stringify(pengguna));
      else localStorage.removeItem(KUNCI);
    } catch {
      
    }
  }, [pengguna]);

  
  useEffect(() => {
    if (!baruKeluar) return undefined;
    const timer = setTimeout(() => setBaruKeluar(false), 1000);
    return () => clearTimeout(timer);
  }, [baruKeluar]);

  const nilai = {
    sudahLogin: pengguna !== null,
    pengguna,
    baruKeluar,
    
    login: (data = {}) => {
      setBaruKeluar(false);
      setPengguna({ ...penggunaContoh, ...data });
    },
    logout: () => {
      setBaruKeluar(true);
      setPengguna(null);
    },
    
    lupakanKeluar: () => setBaruKeluar(false),
    perbarui: (data) => setPengguna((lama) => ({ ...lama, ...data })),
  };

  return <AuthContext.Provider value={nilai}>{children}</AuthContext.Provider>;
}


export function useAuth() {
  return useContext(AuthContext);
}
