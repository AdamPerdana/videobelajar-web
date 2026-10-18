import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Container from '../layouts/Container';
import { LatarGambar } from '../components/Gambar';
import Button from '../components/Button';
import CourseCard from '../components/CourseCard';
import Tabs from '../components/Tabs';
import Modal from '../components/Modal';
import CourseFormModal from '../components/CourseFormModal';
import { daftarKelas, tabKategori } from '../data/courses';

export default function Home() {
  const navigate = useNavigate();
  const [tabAktif, setTabAktif] = useState('semua');
  const [email, setEmail] = useState('');
  const [terkirim, setTerkirim] = useState(false);

  // READ: data kelas disimpan di state (array object), awalnya dari daftarKelas
  const [kelasList, setKelasList] = useState(daftarKelas);
  // null = modal tertutup | 'tambah' = form tambah | object kelas = form ubah
  const [formAktif, setFormAktif] = useState(null);
  const [kelasHapus, setKelasHapus] = useState(null);

  const kelasTampil =
    tabAktif === 'semua' ? kelasList : kelasList.filter((k) => k.kategori === tabAktif);

  // CREATE
  const tambahKelas = (dataBaru) => {
    const idBaru = kelasList.reduce((maks, k) => Math.max(maks, k.id), 0) + 1;
    setKelasList([...kelasList, { ...dataBaru, id: idBaru, rating: 0, jumlahReview: 0 }]);
    setFormAktif(null);
  };

  // UPDATE
  const ubahKelas = (id, dataBaru) => {
    setKelasList(kelasList.map((k) => (k.id === id ? { ...k, ...dataBaru } : k)));
    setFormAktif(null);
  };

  // DELETE
  const hapusKelas = (id) => {
    setKelasList(kelasList.filter((k) => k.id !== id));
    setKelasHapus(null);
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) return;
    // TODO: kirim email ke API newsletter
    console.log('Subscribe:', email);
    setTerkirim(true);
    setEmail('');
  };

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
            <div className="flex flex-col gap-2.5">
              <h2 className="font-heading font-semibold text-2xl sm:text-[32px] leading-[1.1] text-textPrimary">
                Koleksi Video Pembelajaran Unggulan
              </h2>
              <p className="text-base font-medium tracking-[0.2px] text-textSecondary">
                Jelajahi Dunia Pengetahuan Melalui Pilihan Kami!
              </p>
            </div>
            <Button variant="primary" size="lg" onClick={() => setFormAktif('tambah')}>
              + Tambah Kelas
            </Button>
          </div>

          <Tabs daftar={tabKategori} aktif={tabAktif} onGanti={setTabAktif} />

          {kelasTampil.length > 0 ? (
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
            <p className="py-10 text-center text-textSecondary">Belum ada kelas di kategori ini.</p>
          )}
        </section>

        {/* Newsletter */}
        <LatarGambar nama="newsletter-bg" className="rounded-[10px] min-h-[400px]">
          <div className="flex flex-col items-center justify-center gap-10 min-h-[400px] px-5 py-10 text-center">
            <div className="flex flex-col gap-1 max-w-[525px]">
              <p className="text-lg font-medium tracking-[0.2px] text-white/70">NEWSLETTER</p>
              <h2 className="font-heading font-semibold text-2xl sm:text-[32px] leading-[1.1] text-white">
                Mau Belajar Lebih Banyak?
              </h2>
              <p className="pt-1.5 text-base tracking-[0.2px] text-white">
                Daftarkan dirimu untuk mendapatkan informasi terbaru dan penawaran spesial dari program-program
                terbaik hariesok.id
              </p>
            </div>

            <form
              onSubmit={handleSubscribe}
              className="flex items-center gap-2 w-full max-w-[525px] p-2 pl-5 sm:pl-8 bg-white rounded-[10px]"
            >
              <input
                type="email"
                aria-label="Email"
                placeholder="Masukkan Emailmu"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setTerkirim(false);
                }}
                className="flex-1 min-w-0 h-[42px] bg-transparent outline-none text-base tracking-[0.2px] text-textPrimary placeholder:text-textSecondary"
              />
              <Button type="submit" variant="warning" size="lg">
                Subscribe
              </Button>
            </form>

            {terkirim && (
              <p role="status" className="-mt-6 text-sm text-white">
                Terima kasih, email kamu sudah terdaftar.
              </p>
            )}
          </div>
        </LatarGambar>
      </Container>

      {/* Form tambah / ubah */}
      {formAktif && (
        <CourseFormModal
          kelasAwal={formAktif === 'tambah' ? null : formAktif}
          onTutup={() => setFormAktif(null)}
          onSimpan={(data) => (formAktif === 'tambah' ? tambahKelas(data) : ubahKelas(formAktif.id, data))}
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
              <Button variant="warning" size="lg" onClick={() => hapusKelas(kelasHapus.id)}>
                Ya, Hapus
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </MainLayout>
  );
}
