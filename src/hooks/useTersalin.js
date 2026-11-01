import { useEffect, useRef, useState } from 'react';

// Menyalin teks ke clipboard dan menyalakan `tersalin` selama beberapa saat
// (untuk mengubah label tombol jadi "Tersalin"). Dipakai di Payment dan CourseDetail.
export function useTersalin(durasi = 2000) {
  const [tersalin, setTersalin] = useState(false);
  const timer = useRef(null);

  // Bersihkan timer kalau komponen ditutup sebelum waktunya habis
  useEffect(() => () => clearTimeout(timer.current), []);

  const salin = async (teks) => {
    try {
      await navigator.clipboard.writeText(teks);
    } catch {
      return; // Clipboard tidak tersedia / ditolak browser: label tidak berubah
    }
    setTersalin(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setTersalin(false), durasi);
  };

  return { tersalin, salin };
}
