import axios from 'axios';

// Semua panggilan API (MockAPI) untuk akun dan foto profil ada di sini.
// URL dasar diambil dari file .env (VITE_API_URL), tidak ditulis langsung di kode.
//   resource "users": akun (register, login, ubah profil)
//   resource "foto" : foto profil, satu baris per akun { userId, avatar }
const api = axios.create({ baseURL: import.meta.env.VITE_API_URL, timeout: 10000 });

// Kata sandi tidak boleh ikut disimpan di state / localStorage
function tanpaPassword(user) {
  const salinan = { ...user };
  delete salinan.password;
  return salinan;
}

// GET /users?email=...
// Filter MockAPI itu pencarian sebagian, jadi hasilnya dicocokkan lagi secara persis.
// Kalau tidak ada yang cocok MockAPI membalas 404, itu kita anggap daftar kosong.
async function cariByEmail(email) {
  try {
    const { data } = await api.get('/users', { params: { email } });
    return data.filter((u) => u.email?.toLowerCase() === email.toLowerCase());
  } catch (galat) {
    if (galat.response?.status === 404) return [];
    throw new Error('Tidak bisa terhubung ke server. Cek koneksi atau URL di file .env', { cause: galat });
  }
}

// GET /foto?userId=...  -> foto milik akun ini, atau null kalau belum punya
async function cariFoto(userId) {
  try {
    const { data } = await api.get('/foto', { params: { userId } });
    return data.find((f) => String(f.userId) === String(userId)) || null;
  } catch {
    // Belum punya foto (404) atau resource "foto" belum dibuat: login tetap jalan tanpa foto
    return null;
  }
}

// LOGIN: GET lalu cocokkan kata sandi, sekalian ambil foto profilnya
export async function masukUser(email, password) {
  const hasil = await cariByEmail(email);
  const user = hasil.find((u) => u.password === password);
  if (!user) throw new Error('E-Mail atau kata sandi salah');
  const foto = await cariFoto(user.id);
  return { ...tanpaPassword(user), foto: foto?.avatar ?? null, fotoId: foto?.id ?? null };
}

// REGISTER: cek email belum dipakai, lalu POST (ADD)
export async function daftarUser(data) {
  const sudahAda = await cariByEmail(data.email);
  if (sudahAda.length > 0) throw new Error('E-Mail sudah terdaftar');
  try {
    const { data: userBaru } = await api.post('/users', data);
    return { ...tanpaPassword(userBaru), foto: null, fotoId: null };
  } catch (galat) {
    throw new Error('Pendaftaran gagal. Coba lagi sebentar.', { cause: galat });
  }
}

// UPDATE profil: PUT /users/:id
// Data lama diambil dulu lalu digabung, supaya kolom lain (misalnya kata sandi)
// tidak ikut hilang kalau PUT menimpa seluruh data.
export async function ubahUser(id, perubahan) {
  let lama;
  try {
    ({ data: lama } = await api.get(`/users/${id}`));
  } catch (galat) {
    throw new Error('Akun tidak ditemukan. Coba keluar lalu masuk lagi.', { cause: galat });
  }

  if (perubahan.email && perubahan.email.toLowerCase() !== lama.email.toLowerCase()) {
    const dipakai = await cariByEmail(perubahan.email);
    if (dipakai.length > 0) throw new Error('E-Mail sudah dipakai akun lain');
  }

  try {
    const { data } = await api.put(`/users/${id}`, { ...lama, ...perubahan });
    return tanpaPassword(data);
  } catch (galat) {
    throw new Error('Gagal menyimpan perubahan. Coba lagi sebentar.', { cause: galat });
  }
}

// ADD / UPDATE foto: POST /foto kalau belum punya, PUT /foto/:id kalau sudah
export async function simpanFoto(userId, avatar, fotoId) {
  try {
    const { data } = fotoId
      ? await api.put(`/foto/${fotoId}`, { userId, avatar })
      : await api.post('/foto', { userId, avatar });
    return { foto: data.avatar, fotoId: data.id };
  } catch (galat) {
    throw new Error('Gagal menyimpan foto. Pastikan resource "foto" sudah dibuat di MockAPI.', { cause: galat });
  }
}

// DELETE foto: DELETE /foto/:id
export async function hapusFoto(fotoId) {
  try {
    await api.delete(`/foto/${fotoId}`);
  } catch (galat) {
    throw new Error('Gagal menghapus foto. Coba lagi sebentar.', { cause: galat });
  }
}
