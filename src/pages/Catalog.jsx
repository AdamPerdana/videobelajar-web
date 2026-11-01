import { useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import Container from '../layouts/Container';
import Sidebar from '../layouts/Sidebar';
import CourseCard from '../components/CourseCard';
import Pagination from '../components/Pagination';
import SearchBox from '../components/SearchBox';
import SortDropdown from '../components/SortDropdown';
import SectionHeading from '../components/SectionHeading';
import { daftarKelas, pilihanHarga, pilihanDurasi, pilihanUrutan } from '../data/courses';
import { bagiHalaman, cocokKataCari } from '../utils/list';

const FILTER_KOSONG = { bidang: [], harga: [], durasi: '' };
const PER_HALAMAN = 6;

// Apakah sebuah kelas lolos semua filter yang sedang aktif?
function lolosFilter(kelas, filter, kataCari) {
  if (filter.bidang.length > 0 && !filter.bidang.includes(kelas.kategori)) return false;

  if (filter.harga.length > 0) {
    const cocokHarga = pilihanHarga.some((h) => filter.harga.includes(h.id) && h.cocok(kelas.harga));
    if (!cocokHarga) return false;
  }

  if (filter.durasi) {
    const pilihan = pilihanDurasi.find((d) => d.id === filter.durasi);
    if (!pilihan.cocok(kelas.durasi)) return false;
  }

  return cocokKataCari(kelas.judul, kataCari);
}

export default function Catalog() {
  const [filter, setFilter] = useState(FILTER_KOSONG);
  const [urutan, setUrutan] = useState('');
  const [kataCari, setKataCari] = useState('');
  const [halaman, setHalaman] = useState(1);

  // Hasil (filter -> urutkan -> bagi halaman) dihitung langsung dari state di setiap render,
  // tidak perlu disimpan di state sendiri.
  const terfilter = daftarKelas.filter((kelas) => lolosFilter(kelas, filter, kataCari));
  const urutanAktif = pilihanUrutan.find((u) => u.id === urutan);
  const hasil = urutanAktif ? [...terfilter].sort(urutanAktif.banding) : terfilter;
  const { tampil: kelasTampil, halamanAktif, jumlahHalaman } = bagiHalaman(hasil, halaman, PER_HALAMAN);

  // Setiap filter / urutan / pencarian berubah, kembali ke halaman pertama
  const ubahFilter = (baru) => {
    setFilter(baru);
    setHalaman(1);
  };

  const reset = () => {
    setFilter(FILTER_KOSONG);
    setUrutan('');
    setKataCari('');
    setHalaman(1);
  };

  return (
    <MainLayout>
      <Container className="py-7 md:py-16 flex flex-col gap-6 md:gap-9">
        <SectionHeading
          as="h1"
          judul="Koleksi Video Pembelajaran Unggulan"
          deskripsi="Jelajahi Dunia Pengetahuan Melalui Pilihan Kami!"
        />

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
