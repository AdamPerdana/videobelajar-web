import { createSlice } from '@reduxjs/toolkit';

// Reducer = aturan cara mengubah state. State awalnya array kosong,
// nanti diisi data dari API (lihat Home.jsx).
// createSlice membuat reducer sekaligus action-nya; di dalamnya boleh "mengubah" state
// langsung (state.push) karena Redux Toolkit mengubahnya jadi salinan baru di belakang layar.
const kelasSlice = createSlice({
  name: 'kelas',
  initialState: [],
  reducers: {
    // Ganti seluruh daftar dengan data hasil Get API
    setKelas: (state, action) => action.payload,

    // Tambah satu kelas baru (data dari balasan Add API, sudah ada id-nya)
    tambahKelas: (state, action) => {
      state.push(action.payload);
    },

    // Ganti satu kelas dengan versi barunya (data dari balasan Edit API)
    ubahKelas: (state, action) => state.map((k) => (k.id === action.payload.id ? action.payload : k)),

    // Buang kelas dengan id tertentu
    hapusKelas: (state, action) => state.filter((k) => k.id !== action.payload),
  },
});

export const { setKelas, tambahKelas, ubahKelas, hapusKelas } = kelasSlice.actions;

// Selector: cara membaca bagian state ini di komponen -> useSelector(pilihKelas)
export const pilihKelas = (state) => state.kelas;

export default kelasSlice.reducer;
