import React, { useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import Container from '../layouts/Container';
import Sidebar from '../layouts/Sidebar';
import CourseCard from '../components/CourseCard';
import Pagination from '../components/Pagination';
import SearchBox from '../components/SearchBox';
import SortDropdown from '../components/SortDropdown';
import { daftarKelas, pilihanHarga, pilihanDurasi, pilihanUrutan } from '../data/courses';

const filterKosong = { bidang: [], harga: [], durasi: '' };
const perHalaman = 6;

export default function Catalog() {
  const [filter, setFilter] = useState(filterKosong);
  const [urutan, setUrutan] = useState('');
  const [kataCari, setKataCari] = useState('');
  const [halaman, setHalaman] = useState(1);

  // 1. Saring
  let hasil = daftarKelas.filter((kelas) => {
    if (filter.bidang.length > 0 && !filter.bidang.includes(kelas.kategori)) return false;

    if (filter.harga.length > 0) {
      const cocokHarga = pilihanHarga.some((h) => filter.harga.includes(h.id) && h.cocok(kelas.harga));
      if (!cocokHarga) return false;
    }

    if (filter.durasi) {
      const pilihan = pilihanDurasi.find((d) => d.id === filter.durasi);
      if (!pilihan.cocok(kelas.durasi)) return false;
    }

    if (kataCari.trim() && !kelas.judul.toLowerCase().includes(kataCari.trim().toLowerCase())) return false;

    return true;
  });

  // 2. Urutkan
  const urutanAktif = pilihanUrutan.find((u) => u.id === urutan);
  if (urutanAktif) hasil = [...hasil].sort(urutanAktif.banding);

  // 3. Potong per halaman
  const jumlahHalaman = Math.max(1, Math.ceil(hasil.length / perHalaman));
  const halamanAktif = Math.min(halaman, jumlahHalaman);
  const kelasTampil = hasil.slice((halamanAktif - 1) * perHalaman, halamanAktif * perHalaman);

  // Setiap filter berubah, kembali ke halaman 1
  const ubahFilter = (baru) => {
    setFilter(baru);
    setHalaman(1);
  };

  const reset = () => {
    setFilter(filterKosong);
    setUrutan('');
    setKataCari('');
    setHalaman(1);
  };

  return (
    <MainLayout>
      <Container className="py-7 md:py-16 flex flex-col gap-6 md:gap-9">
        <div className="flex flex-col gap-2.5">
          <h1 className="font-heading font-semibold text-2xl sm:text-[32px] leading-[1.1] text-textPrimary">
            Koleksi Video Pembelajaran Unggulan
          </h1>
          <p className="text-base font-medium tracking-[0.2px] text-textSecondary">
            Jelajahi Dunia Pengetahuan Melalui Pilihan Kami!
          </p>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-10">
          <div className="w-full lg:w-[366px] lg:shrink-0">
            <Sidebar filter={filter} onUbah={ubahFilter} onReset={reset} />
          </div>

          <div className="flex-1 min-w-0 flex flex-col gap-6 md:gap-8">
            <div className="flex flex-wrap justify-end gap-4">
              <SortDropdown
                pilihan={pilihanUrutan}
                nilai={urutan}
                onUbah={(id) => {
                  setUrutan(id);
                  setHalaman(1);
                }}
              />
              <SearchBox
                nilai={kataCari}
                onUbah={(teks) => {
                  setKataCari(teks);
                  setHalaman(1);
                }}
                className="flex-1 sm:flex-none sm:w-[220px]"
              />
            </div>

            {kelasTampil.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
                {kelasTampil.map((kelas) => (
                  <CourseCard key={kelas.id} kelas={kelas} />
                ))}
              </div>
            ) : (
              <div className="py-16 text-center">
                <p className="text-textSecondary">Tidak ada kelas yang cocok dengan filter ini.</p>
                <button type="button" onClick={reset} className="mt-2 font-medium text-tertiary cursor-pointer hover:underline">
                  Reset filter
                </button>
              </div>
            )}

            <Pagination halaman={halamanAktif} jumlahHalaman={jumlahHalaman} onGanti={setHalaman} />
          </div>
        </div>
      </Container>
    </MainLayout>
  );
}
