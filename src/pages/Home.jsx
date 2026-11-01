import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Container from '../layouts/Container';
import { LatarGambar } from '../components/Gambar';
import Button from '../components/Button';
import CourseCard from '../components/CourseCard';
import Tabs from '../components/Tabs';
import Modal from '../components/Modal';
import CourseFormModal from '../components/CourseFormModal';
import SectionHeading from '../components/SectionHeading';
import Newsletter from '../components/Newsletter';
import { tabKategori } from '../data/courses';
import { addKelas, deleteKelas, editKelas, getKelas } from '../services/api/courseApi';
import { hapusKelas, pilihKelas, setKelas, tambahKelas, ubahKelas } from '../store/redux/kelasReducer';

// Nilai khusus untuk `formAktif` saat form dibuka dalam mode "tambah"
const MODE_TAMBAH = 'tambah';

export default function Home() {
  const navigate = useNavigate();
  const [tabAktif, setTabAktif] = useState('semua');

  const dispatch = useDispatch();
  // Daftar kelas dibaca dari Redux (state global), bukan lagi dari state lokal
  const kelasList = useSelector(pilihKelas);

  const [memuat, setMemuat] = useState(true); // true selama data pertama kali diambil dari API
  const [galat, setGalat] = useState(''); // pesan error dari API
  const [percobaan, setPercobaan] = useState(0); // dinaikkan oleh tombol "Coba lagi" untuk mengambil ulang
  const [sedangProses, setSedangProses] = useState(false); // true selama tambah/ubah/hapus berjalan

  // Form tambah/ubah: null = tertutup, MODE_TAMBAH = tambah, objek kelas = ubah kelas itu
  const [formAktif, setFormAktif] = useState(null);
  // Kelas yang sedang menunggu konfirmasi hapus (null = tidak ada)
  const [kelasHapus, setKelasHapus] = useState(null);

  // Get: ambil daftar kelas dari API lalu simpan ke Redux
  useEffect(() => {
    let dibatalkan = false; // mencegah update state kalau halaman sudah ditutup

    async function muat() {
      setMemuat(true);
      setGalat('');
      try {
        const data = await getKelas();
        if (!dibatalkan) dispatch(setKelas(data));
      } catch (err) {
        if (!dibatalkan) setGalat(err.message);
      } finally {
        if (!dibatalkan) setMemuat(false);
      }
    }
    muat();

    return () => {
      dibatalkan = true;
    };
  }, [dispatch, percobaan]);

  const kelasTampil =
    tabAktif === 'semua' ? kelasList : kelasList.filter((k) => k.kategori === tabAktif);

  // Add / Edit / Delete selalu begini: panggil API dulu, kalau berhasil baru ubah Redux
  // (jadi tampilan hanya berubah kalau server benar-benar menyimpannya).
  // `aksi` = fungsi yang memanggil API dan Redux, `tutup` = menutup jendela yang sedang terbuka.
  const jalankan = async (aksi, tutup) => {
    if (sedangProses) return;
    setSedangProses(true);
    setGalat('');
    try {
      await aksi();
      tutup();
    } catch (err) {
      setGalat(err.message);
    } finally {
      setSedangProses(false);
    }
  };

  const simpanKelas = (data) =>
    jalankan(async () => {
      if (formAktif === MODE_TAMBAH) {
        const kelasBaru = await addKelas({ ...data, rating: 0, jumlahReview: 0 });
        dispatch(tambahKelas(kelasBaru));
      } else {
        const kelasBaru = await editKelas(formAktif, data);
        dispatch(ubahKelas(kelasBaru));
      }
    }, () => setFormAktif(null));

  const konfirmasiHapus = () =>
    jalankan(async () => {
      await deleteKelas(kelasHapus.id);
      dispatch(hapusKelas(kelasHapus.id));
    }, () => setKelasHapus(null));

  return (
    <MainLayout>
      <Container className="py-7 md:py-16 flex flex-col gap-10 md:gap-16">
        {/* Hero */}
        <LatarGambar nama="hero-home" className="rounded-[10px] min-h-[400px]">
          <div className="flex flex-col items-center justify-center gap-6 min-h-[400px] px-5 py-10 md:px-[140px] text-center text-white">
            <div className="flex flex-col gap-3">
              <h1 className="font-heading font-bold text-2xl sm:text-4xl lg:text-5xl leading-[1.1]">
                Revolusi Pembelajaran: Temukan Ilmu Baru melalui Platform Video Interaktif!
              </h1>
              <p className="text-sm sm:text-base font-medium tracking-[0.2px]">
                Temukan ilmu baru yang menarik dan mendalam melalui koleksi video pembelajaran berkualitas tinggi.
                Tidak hanya itu, Anda juga dapat berpartisipasi dalam latihan interaktif yang akan meningkatkan
                pemahaman Anda.
              </p>
            </div>
            <Button variant="primary" size="lg" onClick={() => navigate('/kategori')}>
              Temukan Video Course untuk Dipelajari!
            </Button>
          </div>
        </LatarGambar>

        {/* Koleksi kelas */}
        <section className="flex flex-col gap-6 md:gap-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <SectionHeading
              judul="Koleksi Video Pembelajaran Unggulan"
              deskripsi="Jelajahi Dunia Pengetahuan Melalui Pilihan Kami!"
            />
            <Button variant="primary" size="lg" onClick={() => setFormAktif(MODE_TAMBAH)}>
              + Tambah Kelas
            </Button>
          </div>

          <Tabs daftar={tabKategori} aktif={tabAktif} onGanti={setTabAktif} />

          {memuat && <p className="py-10 text-center text-textSecondary">Memuat kelas...</p>}

          {galat && (
            <p role="alert" className="text-center text-error">
              {galat}{' '}
              {!sedangProses && kelasList.length === 0 && (
                <button
                  type="button"
                  onClick={() => setPercobaan((n) => n + 1)}
                  className="font-medium text-tertiary cursor-pointer hover:underline"
                >
                  Coba lagi
                </button>
              )}
            </p>
          )}

          {!memuat && (kelasTampil.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {kelasTampil.map((kelas) => (
                <div key={kelas.id} className="flex flex-col gap-3">
                  <CourseCard kelas={kelas} />
                  {/* Tombol di luar kartu supaya tidak ikut menjadi link */}
                  <div className="flex gap-3">
                    <Button variant="outlinePrimary" size="md" fullWidth onClick={() => setFormAktif(kelas)}>
                      Ubah
                    </Button>
                    <Button variant="outline" size="md" fullWidth onClick={() => setKelasHapus(kelas)}>
                      Hapus
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            !galat && <p className="py-10 text-center text-textSecondary">Belum ada kelas di kategori ini.</p>
          ))}
        </section>

        <Newsletter />
      </Container>

      {/* Form tambah / ubah */}
      {formAktif && (
        <CourseFormModal
          kelasAwal={formAktif === MODE_TAMBAH ? null : formAktif}
          onTutup={() => setFormAktif(null)}
          onSimpan={simpanKelas}
        />
      )}

      {/* Konfirmasi hapus */}
      {kelasHapus && (
        <Modal judul="Hapus Kelas" onTutup={() => setKelasHapus(null)}>
          <div className="flex flex-col gap-6">
            <h2 className="font-heading font-semibold text-2xl text-textPrimary">Hapus kelas ini?</h2>
            <p className="text-base text-textSecondary">
              Kelas &ldquo;{kelasHapus.judul}&rdquo; akan dihapus dari daftar.
            </p>
            <div className="flex justify-center gap-3">
              <Button variant="outline" size="lg" onClick={() => setKelasHapus(null)}>
                Batal
              </Button>
              <Button variant="warning" size="lg" onClick={konfirmasiHapus}>
                Ya, Hapus
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </MainLayout>
  );
}
