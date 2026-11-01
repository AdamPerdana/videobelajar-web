import axios from 'axios';

// Alamat dasar MockAPI diambil dari file .env (lihat .env.example), bukan ditulis di kode.
const api = axios.create({ baseURL: import.meta.env.VITE_API_URL, timeout: 10000 });

// Data pengguna yang disimpan di aplikasi tidak boleh membawa kata sandi
function tanpaPassword(user) {
  const salinan = { ...user };
  delete salinan.password;
  return salinan;
}

// MockAPI mencari dengan "mengandung" (bukan sama persis), jadi hasilnya disaring lagi.
// Resource yang masih kosong membalas 404, itu artinya "belum ada data", bukan error.
async function cariByEmail(email) {
  try {
    const { data } = await api.get('/users', { params: { email } });
    return data.filter((u) => u.email?.toLowerCase() === email.toLowerCase());
  } catch (galat) {
    if (galat.response?.status === 404) return [];
    throw new Error('Tidak bisa terhubung ke server. Cek koneksi atau URL di file .env', { cause: galat });
  }
}

// Foto profil disimpan di resource terpisah: /foto. Kalau gagal, anggap belum punya foto.
async function cariFoto(userId) {
  try {
    const { data } = await api.get('/foto', { params: { userId } });
    return data.find((f) => String(f.userId) === String(userId)) || null;
  } catch {
    return null;
  }
}

// Login = ambil (GET) user dengan email itu, lalu cocokkan kata sandinya.
export async function masukUser(email, password) {
  const hasil = await cariByEmail(email);
  const user = hasil.find((u) => u.password === password);
  if (!user) throw new Error('E-Mail atau kata sandi salah');

  const foto = await cariFoto(user.id);
  return { ...tanpaPassword(user), foto: foto?.avatar ?? null, fotoId: foto?.id ?? null };
}

// Register = kirim (POST) user baru, setelah memastikan email belum dipakai.
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

// Simpan profil = ubah (PUT) user. Data lama diambil dulu supaya field yang tidak diubah
// (termasuk kata sandi) tidak hilang, karena PUT menimpa seluruh data.
export async function ubahUser(id, perubahan) {
  let lama;
  try {
    ({ data: lama } = await api.get(`/users/${id}`));
  } catch (galat) {
    throw new Error('Akun tidak ditemukan. Coba keluar lalu masuk lagi.', { cause: galat });
  }

  // Kalau email diganti, pastikan belum dipakai akun lain
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

// Pilih foto: kalau sudah punya data foto -> ubah (PUT), kalau belum -> buat baru (POST).
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

// Hapus foto = DELETE data foto di MockAPI.
export async function hapusFoto(fotoId) {
  try {
    await api.delete(`/foto/${fotoId}`);
  } catch (galat) {
    throw new Error('Gagal menghapus foto. Coba lagi sebentar.', { cause: galat });
  }
}
