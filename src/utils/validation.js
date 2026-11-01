// Aturan validasi form. Setiap fungsi mengembalikan pesan error (string),
// atau '' kalau datanya valid. Dipakai bersama oleh Login, Register, dan Profile.

const POLA_EMAIL = /^\S+@\S+\.\S+$/;

export function validasiNama(nama) {
  return nama.trim() ? '' : 'Nama lengkap wajib diisi';
}

export function validasiEmail(email) {
  if (!email.trim()) return 'E-Mail wajib diisi';
  if (!POLA_EMAIL.test(email)) return 'Format E-Mail tidak valid';
  return '';
}

export function validasiNoHp(noHp) {
  if (!noHp) return 'No. Hp wajib diisi';
  if (noHp.length < 8 || noHp.length > 13) return 'No. Hp harus 8-13 angka';
  return '';
}

export function validasiPassword(password) {
  if (!password) return 'Kata sandi wajib diisi';
  return '';
}

// Khusus pendaftaran: kata sandi baru harus minimal 8 karakter
export function validasiPasswordBaru(password) {
  if (!password) return 'Kata sandi wajib diisi';
  if (password.length < 8) return 'Kata sandi minimal 8 karakter';
  return '';
}

export function validasiKonfirmasi(konfirmasi, password) {
  if (!konfirmasi) return 'Konfirmasi kata sandi wajib diisi';
  if (konfirmasi !== password) return 'Konfirmasi kata sandi tidak sama';
  return '';
}

// Menerima objek { namaField: pesanError } dan membuang field yang valid (''),
// jadi hasilnya hanya berisi field yang bermasalah.
export function kumpulkanError(hasil) {
  return Object.fromEntries(Object.entries(hasil).filter(([, pesan]) => pesan));
}

// Hanya sisakan angka (untuk input nomor HP)
export function hanyaAngka(teks) {
  return teks.replace(/\D/g, '');
}
