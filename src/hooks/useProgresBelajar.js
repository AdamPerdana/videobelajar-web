import { useEffect, useState } from 'react';
import { bacaJson, simpanJson } from '../utils/storage';

const PROGRES_KOSONG = { selesai: [], hasil: {}, review: null };

// Progres belajar satu kelas, disimpan di localStorage supaya tidak hilang saat refresh.
// Bentuk data: { selesai: [id modul], hasil: { [id tes]: hasil }, review: { bintang, teks } | null }
export function useProgresBelajar(idKelas) {
  const kunci = `videobelajar-progres-${idKelas}`;
  const [progres, setProgres] = useState(() => ({ ...PROGRES_KOSONG, ...bacaJson(kunci, {}) }));

  useEffect(() => {
    simpanJson(kunci, progres);
  }, [kunci, progres]);

  // Menambah id ke daftar selesai hanya kalau belum ada
  const tandaiSelesai = (itemId) => {
    setProgres((lama) => (lama.selesai.includes(itemId) ? lama : { ...lama, selesai: [...lama.selesai, itemId] }));
  };

  // Simpan hasil tes; kalau lulus, modul tes itu otomatis ditandai selesai
  const simpanHasilTes = (itemId, hasil, lulus) => {
    setProgres((lama) => ({
      ...lama,
      hasil: { ...lama.hasil, [itemId]: hasil },
      selesai: lulus && !lama.selesai.includes(itemId) ? [...lama.selesai, itemId] : lama.selesai,
    }));
  };

  const simpanReview = (review) => setProgres((lama) => ({ ...lama, review }));

  return { progres, tandaiSelesai, simpanHasilTes, simpanReview };
}
