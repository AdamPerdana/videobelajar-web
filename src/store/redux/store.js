import { configureStore } from '@reduxjs/toolkit';
import kelasReducer from './kelasReducer';

// Gudang state global. Setiap reducer didaftarkan di sini dengan nama bagian state-nya:
// reducer `kelas` mengurus state.kelas.
export const store = configureStore({
  reducer: {
    kelas: kelasReducer,
  },
});
