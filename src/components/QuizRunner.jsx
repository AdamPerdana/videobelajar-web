import React, { useState } from 'react';
import Gambar from './Gambar';
import Ikon from './Ikon';
import Button from './Button';
import Modal from './Modal';
import { aturanTes, ambilSoal } from '../data/learning';

const isi = 'px-4 md:px-10 xl:pl-[120px] xl:pr-12 py-8 md:py-10';
const judul = 'font-heading font-semibold text-xl sm:text-2xl leading-[1.2] text-textPrimary';
const teks = 'text-base sm:text-lg tracking-[0.2px] text-textSecondary';

// "23 September 2022, 10:20 AM"
function formatTanggal(waktu) {
  const d = new Date(waktu);
  const tanggal = d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  const jam = d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  return `${tanggal}, ${jam}`;
}

// ---------- Tahap 1: aturan ----------
function Aturan({ aturan, onMulai }) {
  return (
    <>
      <Gambar nama="banner-rules" alt="" className="w-full h-[200px] md:h-[360px]" />
      <div className={`${isi} flex flex-col gap-6 max-w-[1000px]`}>
        <div className="flex flex-col gap-3">
          <h1 className={judul}>Aturan</h1>
          <p className={teks}>{aturan.pembuka}</p>
        </div>
        <p className={teks}>
          {aturan.syarat.map((baris) => (
            <span key={baris} className="block">{baris}</span>
          ))}
        </p>
        <p className={teks}>{aturan.penutup}</p>
        <div>
          <Button variant="primary" size="lg" onClick={onMulai}>
            {aturan.tombolMulai}
          </Button>
        </div>
      </div>
    </>
  );
}

// ---------- Tahap 2: mengerjakan soal ----------
function Soal({ aturan, soal, onSelesai }) {
  const [nomor, setNomor] = useState(0);            // soal yang sedang dibuka (mulai dari 0)
  const [jawaban, setJawaban] = useState({});       // { nomorSoal: urutanPilihan }
  const [konfirmasi, setKonfirmasi] = useState(false);

  const sekarang = soal[nomor];
  const terakhir = nomor === soal.length - 1;
  const jumlahDijawab = Object.keys(jawaban).length;
  const semuaDijawab = jumlahDijawab === soal.length;

  const kirim = () => {
    const benar = soal.filter((s, i) => jawaban[i] === s.benar).length;
    onSelesai({ benar, jumlah: soal.length, waktu: new Date().toISOString() });
  };

  return (
    <div className="flex flex-col xl:flex-row xl:min-h-full">
      {/* Daftar nomor soal */}
      <div className="xl:w-[320px] xl:shrink-0 flex flex-col gap-5 px-4 md:px-9 py-6 border-b xl:border-b-0 xl:border-r border-borderField">
        <h2 className="font-heading font-semibold text-lg text-textPrimary">List Soal</h2>
        <div className="grid grid-cols-5 gap-3 sm:gap-4 max-w-[320px]">
          {soal.map((s, i) => {
            const dibuka = i === nomor;
            const dijawab = jawaban[i] !== undefined;
            return (
              <button
                key={s.id}
                type="button"
                aria-label={`Soal ${i + 1}${dijawab ? ', sudah dijawab' : ''}`}
                aria-current={dibuka ? 'true' : undefined}
                onClick={() => setNomor(i)}
                className={`relative overflow-hidden flex items-center justify-center aspect-square rounded border text-base font-bold cursor-pointer ${dibuka ? 'border-tertiary bg-tertiary/10 text-textPrimary' : 'border-borderField bg-white text-textPrimary hover:border-brandGreen'}`}
              >
                {i + 1}
                {/* Sudut kuning = soal sudah dijawab */}
                {dijawab && (
                  <span className="absolute -top-2.5 -right-2.5 w-5 h-5 rotate-45 bg-logoYellow" />
                )}
              </button>
            );
          })}
        </div>
        <p className="max-w-[320px] px-4 py-3 rounded border border-[#0980E2] bg-[#E7F4FD] text-base tracking-[0.2px] text-[#0980E2]">
          Selesaikan semua soal untuk mengakhiri {aturan.namaKecil}
        </p>
      </div>

      {/* Soal dan pilihan jawaban */}
      <div className="flex-1 min-w-0 flex flex-col gap-8 px-4 md:px-10 xl:px-16 py-8 md:py-10">
        <div className="flex flex-col gap-3">
          <h1 className={judul}>Pertanyaan {nomor + 1}</h1>
          <p className={teks}>{sekarang.pertanyaan}</p>
        </div>

        <div role="radiogroup" aria-label={`Pilihan jawaban soal ${nomor + 1}`} className="flex flex-col gap-2.5">
          {sekarang.pilihan.map((pilihan, i) => {
            const dipilih = jawaban[nomor] === i;
            return (
              <button
                key={pilihan}
                type="button"
                role="radio"
                aria-checked={dipilih}
                onClick={() => setJawaban({ ...jawaban, [nomor]: i })}
                className={`flex items-center gap-3.5 w-full px-5 py-4 border rounded text-left text-base tracking-[0.2px] cursor-pointer transition-colors ${dipilih ? 'border-brandGreen text-brandGreen' : 'border-borderField text-textPrimary hover:border-brandGreen'}`}
              >
                <span className={`shrink-0 flex items-center justify-center w-[18px] h-[18px] rounded-full border ${dipilih ? 'border-brandGreen' : 'border-brandGreen bg-brandGreen-light'}`}>
                  {dipilih && <span className="w-2.5 h-2.5 rounded-full bg-brandGreen" />}
                </span>
                {pilihan}
              </button>
            );
          })}
        </div>

        <div className="mt-auto flex flex-col gap-2">
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outlinePrimary" size="lg" fullWidth disabled={nomor === 0} onClick={() => setNomor(nomor - 1)}>
              <Ikon nama="panahKiriPanjang" ukuran={20} />
              Sebelumnya
            </Button>
            {terakhir ? (
              <Button variant="warning" size="lg" fullWidth disabled={!semuaDijawab} onClick={() => setKonfirmasi(true)}>
                Selesaikan
                <Ikon nama="panahKananPanjang" ukuran={20} />
              </Button>
            ) : (
              <Button variant="primary" size="lg" fullWidth onClick={() => setNomor(nomor + 1)}>
                Selanjutnya
                <Ikon nama="panahKananPanjang" ukuran={20} />
              </Button>
            )}
          </div>
          {terakhir && !semuaDijawab && (
            <p className="text-sm text-right text-textSecondary">
              {soal.length - jumlahDijawab} soal belum dijawab.
            </p>
          )}
        </div>
      </div>

      {konfirmasi && (
        <Modal judul={`Selesaikan ${aturan.nama}`} onTutup={() => setKonfirmasi(false)}>
          <div className="flex flex-col items-center gap-6">
            <Gambar nama="modal-confirm" alt="" fit="contain" className="w-full max-w-[280px] aspect-[280/230] rounded-[10px]" />
            <div className="flex flex-col gap-2.5">
              <h2 className="text-lg font-bold tracking-[0.2px] text-textPrimary">Selesaikan {aturan.nama}</h2>
              <p className="text-base tracking-[0.2px] text-textSecondary">
                Apakah kamu yakin untuk menyelesaikan {aturan.namaKecil} ini?
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 w-full">
              <Button variant="outlinePrimary" size="lg" fullWidth onClick={() => setKonfirmasi(false)}>
                Batal
              </Button>
              <Button variant="primary" size="lg" fullWidth onClick={kirim}>
                Selesai
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ---------- Tahap 3: hasil ----------
function Hasil({ aturan, hasil, onUlangi }) {
  const nilai = Math.round((hasil.benar / hasil.jumlah) * 100);
  const lulus = aturan.nilaiLulus === null || nilai >= aturan.nilaiLulus;
  const sel = 'flex flex-col gap-1 px-4 py-4';
  const angka = 'font-heading font-semibold text-2xl leading-[1.2]';

  return (
    <>
      <Gambar nama={lulus ? 'banner-congrats' : 'banner-try-again'} alt="" className="w-full h-[200px] md:h-[360px]" />
      <div className={`${isi} flex flex-col gap-6 max-w-[1000px]`}>
        <div className="flex flex-col gap-2">
          <h1 className={judul}>Tanggal {aturan.nama}:</h1>
          <p className="text-base tracking-[0.2px] text-textSecondary">{formatTanggal(hasil.waktu)}</p>
        </div>

        <dl className="grid grid-cols-2 sm:grid-cols-4 border border-borderField">
          <div className={`${sel} text-white ${lulus ? 'bg-[#38D189]' : 'bg-error'}`}>
            <dt className="text-base font-bold tracking-[0.2px]">Nilai</dt>
            <dd className={angka}>{nilai}</dd>
          </div>
          <div className={`${sel} border-l border-borderField`}>
            <dt className="text-base font-bold tracking-[0.2px] text-textSecondary">Soal</dt>
            <dd className={`${angka} text-textPrimary`}>{hasil.jumlah}</dd>
          </div>
          <div className={`${sel} border-t sm:border-t-0 sm:border-l border-borderField`}>
            <dt className="text-base font-bold tracking-[0.2px] text-textSecondary">Benar</dt>
            <dd className={`${angka} flex items-center gap-2 text-textPrimary`}>
              <Ikon nama="centangBulat" ukuran={22} className="text-[#38D189]" />
              {hasil.benar}
            </dd>
          </div>
          <div className={`${sel} border-t border-l sm:border-t-0 border-borderField`}>
            <dt className="text-base font-bold tracking-[0.2px] text-textSecondary">Salah</dt>
            <dd className={`${angka} flex items-center gap-2 text-textPrimary`}>
              <Ikon nama="silangBulat" ukuran={22} className="text-error" />
              {hasil.jumlah - hasil.benar}
            </dd>
          </div>
        </dl>

        {lulus ? (
          <div className="flex flex-col gap-4">
            <h2 className={judul}>Selesai!</h2>
            {aturan.hasilLulus.map((baris) => (
              <p key={baris} className="text-base tracking-[0.2px] text-textSecondary">{baris}</p>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <h2 className={judul}>Sedikit Lagi!</h2>
            <p className="text-base tracking-[0.2px] text-textSecondary">
              Kamu sudah menyelesaikan {aturan.namaKecil} dengan baik namun nilaimu belum cukup untuk melanjutkan materi.
            </p>
            <p className="text-base tracking-[0.2px] text-textSecondary">
              Pelajari kembali modul sebelumnya dan kerjakan kembali {aturan.namaKecil} ini!
            </p>
            <div>
              <Button variant="outlinePrimary" size="lg" onClick={onUlangi}>
                <Ikon nama="ulang" ukuran={20} />
                Ulangi {aturan.nama}
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

// Satu tes utuh (pretest, quiz, atau ujian akhir): aturan -> soal -> hasil.
// hasil     : hasil tes sebelumnya kalau sudah pernah dikerjakan
// onSelesai : dipanggil dengan { benar, jumlah, waktu } dan status lulus
export default function QuizRunner({ item, hasil, onSelesai }) {
  const aturan = aturanTes[item.jenis];
  const [tahap, setTahap] = useState(hasil ? 'hasil' : 'aturan');
  const [soal] = useState(() => ambilSoal(item.jumlahSoal));

  if (tahap === 'aturan') return <Aturan aturan={aturan} onMulai={() => setTahap('soal')} />;

  if (tahap === 'soal') {
    return (
      <Soal
        aturan={aturan}
        soal={soal}
        onSelesai={(hasilBaru) => {
          const nilai = Math.round((hasilBaru.benar / hasilBaru.jumlah) * 100);
          const lulus = aturan.nilaiLulus === null || nilai >= aturan.nilaiLulus;
          onSelesai(hasilBaru, lulus);
          setTahap('hasil');
        }}
      />
    );
  }

  // Sesuai flow Figma: "Ulangi" kembali ke halaman Aturan dulu
  return <Hasil aturan={aturan} hasil={hasil} onUlangi={() => setTahap('aturan')} />;
}
