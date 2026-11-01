import { createContext } from 'react';

// Wadah (context) untuk data login. Sengaja dipisah dari AuthProvider.jsx
// supaya file komponen hanya berisi komponen (syarat Fast Refresh milik Vite/React).
export const AuthContext = createContext(null);
