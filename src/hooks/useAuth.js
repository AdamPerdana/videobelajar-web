import { useContext } from 'react';
import { AuthContext } from '../context/authContext';

// Cara singkat membaca data login di komponen mana pun:
//   const { sudahLogin, pengguna, login, logout, perbarui } = useAuth();
export function useAuth() {
  const nilai = useContext(AuthContext);
  if (nilai === null) {
    throw new Error('useAuth harus dipakai di dalam <AuthProvider>');
  }
  return nilai;
}
