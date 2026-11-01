import { useState } from 'react';
import Ikon from './Ikon';

// Ikon tiap jenis modul
const ikonJenis = { video: 'putar', rangkuman: 'buku', pretest: 'ujian', quiz: 'ujian', ujian: 'ujian' };

// Teks kecil di bawah judul modul: jumlah soal untuk tes, durasi untuk lainnya
function keterangan(item) {
  return item.jumlahSoal ? `${item.jumlahSoal} Pertanyaan` : `${item.durasi} Menit`;
}

// Daftar modul belajar per bagian (bisa dibuka-tutup) beserta tombol review.
export default function ModuleList({ bagian, aktifId, selesai, onPilih, onReview, reviewTerkirim }) {
  const bagianAktif = bagian.find((b) => b.item.some((i) => i.id === aktifId));
  // Bagian mana saja yang sedang terbuka: { [idBagian]: true/false }
  const [terbuka, setTerbuka] = useState({ [bagianAktif?.id]: true });

  // Saat modul aktif pindah ke bagian lain, bagian itu otomatis dibuka.
  // Ini cara resmi React untuk menyesuaikan state ketika data berubah: bandingkan dengan
  // nilai sebelumnya dan ubah state langsung saat render (tanpa useEffect, yang membuat render dua kali).
  const [bagianTerakhir, setBagianTerakhir] = useState(bagianAktif?.id);
  if (bagianAktif && bagianAktif.id !== bagianTerakhir) {
    setBagianTerakhir(bagianAktif.id);
    setTerbuka((lama) => ({ ...lama, [bagianAktif.id]: true }));
  }

  return (
    <>
      <h2 className="shrink-0 px-5 sm:px-7 py-5 border-b border-borderField font-heading font-semibold text-lg text-textPrimary">
        Daftar Modul
      </h2>

      <div className="flex-1 lg:min-h-0 lg:overflow-y-auto flex flex-col gap-5 px-5 sm:px-9 py-6">
        {bagian.map((b) => (
          <section key={b.id} className="flex flex-col gap-3">
            <button
              type="button"
              aria-expanded={!!terbuka[b.id]}
              onClick={() => setTerbuka({ ...terbuka, [b.id]: !terbuka[b.id] })}
              className="flex items-center justify-between gap-3 w-full text-left cursor-pointer"
            >
              <span className="font-heading font-semibold text-lg leading-[1.2] text-textPrimary">{b.judul}</span>
              <Ikon nama="panahBawah" className={`text-textPrimary transition-transform ${terbuka[b.id] ? 'rotate-180' : ''}`} />
            </button>

            {terbuka[b.id] &&
              b.item.map((item) => {
                const aktif = item.id === aktifId;
                const sudah = selesai.includes(item.id);
                const terang = aktif || sudah;

                return (
                  <button
                    key={item.id}
                    type="button"
                    aria-current={aktif ? 'true' : undefined}
                    onClick={() => onPilih(item.id)}
                    className={`flex items-start gap-2.5 w-full p-4 sm:p-5 border rounded-[10px] text-left cursor-pointer transition-colors ${aktif ? 'border-brandGreen bg-brandGreen/[0.06]' : 'border-borderField hover:border-brandGreen'}`}
                  >
                    {sudah ? (
                      <Ikon nama="centangBulat" ukuran={22} className="text-brandGreen" />
                    ) : (
                      <Ikon nama={ikonJenis[item.jenis]} ukuran={22} className={terang ? 'text-textPrimary' : 'text-textSecondary'} />
                    )}
                    <span className="flex flex-col gap-1">
                      <span className={`text-base font-medium tracking-[0.2px] ${terang ? 'text-textPrimary' : 'text-textSecondary'}`}>
                        {item.judul}
                        {sudah && <span className="sr-only"> (selesai)</span>}
                      </span>
                      <span className={`text-sm tracking-[0.2px] ${terang ? 'text-textPrimary' : 'text-textSecondary'}`}>
                        {keterangan(item)}
                      </span>
                    </span>
                  </button>
                );
              })}
          </section>
        ))}
      </div>

      <button
        type="button"
        onClick={onReview}
        className="shrink-0 flex items-center gap-2.5 h-14 px-5 sm:px-9 bg-logoYellow text-base font-bold tracking-[0.2px] text-white cursor-pointer hover:brightness-95"
      >
        <Ikon nama="bintangGaris" ukuran={22} />
        {reviewTerkirim ? 'Review Terkirim, Ubah Review' : 'Beri Review & Rating'}
      </button>
    </>
  );
}
