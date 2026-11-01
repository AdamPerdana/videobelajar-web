import axios from 'axios';

// Daftar kelas ada di project MockAPI yang terpisah dari data pengguna,
// jadi alamatnya memakai variabel .env sendiri (lihat .env.example).
const api = axios.create({ baseURL: import.meta.env.VITE_API_KELAS_URL, timeout: 10000 });

// Nama resource di MockAPI. Ditulis `Kelas` (K besar) karena begitulah nama resource-nya di dashboard,
// dan alamat MockAPI membedakan huruf besar dan kecil.
const SUMBER = '/Kelas';

// Get: ambil semua kelas. Resource yang masih kosong membalas 404,
// itu artinya "belum ada kelas", bukan error.
export async function getKelas() {
  try {
    const { data } = await api.get(SUMBER);
    // Kalau alamat API salah / belum terbaca, server bisa membalas halaman HTML (berupa teks),
    // bukan daftar. Dicegah di sini supaya tidak sampai masuk ke Redux dan merusak tampilan.
    if (!Array.isArray(data)) throw new Error('Balasan server bukan daftar kelas');
    return data;
  } catch (galat) {
    if (galat.response?.status === 404) return [];
    throw new Error('Gagal memuat daftar kelas. Cek koneksi atau VITE_API_KELAS_URL di file .env', { cause: galat });
  }
}

// Add: kirim kelas baru (POST). Server membalas dengan data lengkap beserta id-nya.
export async function addKelas(data) {
  try {
    const { data: kelasBaru } = await api.post(SUMBER, data);
    return kelasBaru;
  } catch (galat) {
    throw new Error('Gagal menambah kelas. Coba lagi sebentar.', { cause: galat });
  }
}

// Edit: ubah kelas yang sudah ada (PUT). Data lama digabung dulu supaya field yang
// tidak diubah (rating, jumlah review, dst.) tidak hilang.
export async function editKelas(kelasLama, perubahan) {
  try {
    const { data } = await api.put(`${SUMBER}/${kelasLama.id}`, { ...kelasLama, ...perubahan });
    return data;
  } catch (galat) {
    throw new Error('Gagal menyimpan perubahan kelas. Coba lagi sebentar.', { cause: galat });
  }
}

// Delete: hapus kelas berdasarkan id.
export async function deleteKelas(id) {
  try {
    await api.delete(`${SUMBER}/${id}`);
  } catch (galat) {
    throw new Error('Gagal menghapus kelas. Coba lagi sebentar.', { cause: galat });
  }
}
