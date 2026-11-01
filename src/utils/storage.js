// Pembungkus localStorage. localStorage bisa gagal (mode privat, penyimpanan penuh,
// atau data rusak), jadi semua akses dibungkus try/catch supaya aplikasi tidak crash.

export function bacaJson(kunci, bawaan = null) {
  try {
    const mentah = localStorage.getItem(kunci);
    return mentah === null ? bawaan : JSON.parse(mentah);
  } catch {
    return bawaan;
  }
}

export function simpanJson(kunci, nilai) {
  try {
    localStorage.setItem(kunci, JSON.stringify(nilai));
  } catch {
    // Gagal menyimpan bukan masalah besar: data hanya tidak bertahan setelah refresh.
  }
}

export function hapusKunci(kunci) {
  try {
    localStorage.removeItem(kunci);
  } catch {
    // Sama seperti di atas, aman diabaikan.
  }
}
