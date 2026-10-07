import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Container from '../layouts/Container';
import Gambar, { LatarGambar } from '../components/Gambar';
import Rating from '../components/Rating';
import Ikon from '../components/Ikon';
import Accordion from '../components/Accordion';
import CourseCard from '../components/CourseCard';
import CourseInfoCard from '../components/CourseInfoCard';
import { daftarKelas, detailKelas } from '../data/courses';
import { useAuth } from '../context/AuthContext';

const kartu = 'flex flex-col gap-5 p-5 sm:p-6 bg-white border border-borderField rounded-[10px]';
const judulBagian = 'font-heading font-semibold text-xl leading-[1.2] text-textPrimary';

// Kartu orang (tutor atau pemberi review)
function KartuOrang({ avatar, nama, keterangan, isi, rating }) {
  return (
    <div className="flex flex-col gap-4 p-4 sm:p-5 border border-borderField rounded-[10px]">
      <div className="flex items-center gap-2.5">
        <Gambar nama={avatar} alt="" label={false} className="w-10 h-10 rounded-[10px]" />
        <div>
          <p className="text-base font-medium tracking-[0.2px] text-textPrimary">{nama}</p>
          <p className="text-sm tracking-[0.2px] text-textSecondary">{keterangan}</p>
        </div>
      </div>
      <p className="text-base tracking-[0.2px] text-textPrimary">{isi}</p>
      {rating !== undefined && <Rating nilai={rating} />}
    </div>
  );
}

export default function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const kelas = detailKelas; // TODO: ambil detail kelas berdasarkan id dari API
  const kelasLain = daftarKelas.filter((k) => String(k.id) !== id).slice(-3);
  const { sudahLogin } = useAuth();
  const [tersalin, setTersalin] = useState(false);

  // Bagikan lewat menu bagikan milik HP kalau ada, kalau tidak salin tautannya
  const bagikan = async () => {
    const tautan = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: kelas.judul, url: tautan });
        return;
      }
      await navigator.clipboard.writeText(tautan);
      setTersalin(true);
      setTimeout(() => setTersalin(false), 2000);
    } catch {
      // Dibatalkan pengguna atau browser menolak, tidak perlu melakukan apa-apa
    }
  };

  return (
    <MainLayout>
      <Container className="py-7 md:py-9 flex flex-col gap-6 md:gap-9">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2.5 text-base font-medium tracking-[0.2px]">
          <Link to="/" className="text-textSecondary hover:text-brandGreen">Beranda</Link>
          <span className="text-textSecondary">/</span>
          <Link to="/kategori" className="text-textSecondary hover:text-brandGreen">{kelas.kategori}</Link>
          <span className="text-textSecondary">/</span>
          <span className="text-textPrimary">{kelas.judul}</span>
        </nav>

        {/* Hero */}
        <LatarGambar nama="hero-detail" cadangan="hero-home" className="rounded-[10px] min-h-[320px] md:min-h-[400px]">
          <div className="flex flex-col justify-center gap-6 min-h-[320px] md:min-h-[400px] px-5 py-10 md:px-[100px] text-white">
            <div className="flex flex-col gap-3 max-w-[880px]">
              <h1 className="font-heading font-semibold text-2xl sm:text-4xl lg:text-[40px] leading-[1.1]">
                {kelas.judul}
              </h1>
              <p className="max-w-[420px] text-base font-medium tracking-[0.2px]">{kelas.ringkas}</p>
            </div>
            <Rating nilai={kelas.rating} jumlah={kelas.jumlahReview} terang />
          </div>
        </LatarGambar>

        <div className="flex flex-col-reverse lg:flex-row lg:items-start gap-6 lg:gap-9">
          {/* Kolom kiri */}
          <div className="flex-1 min-w-0 flex flex-col gap-6 md:gap-9">
            <section className={kartu}>
              <h2 className={judulBagian}>Deskripsi</h2>
              <p className="text-base tracking-[0.2px] text-textSecondary">{kelas.deskripsi}</p>
            </section>

            <section className={kartu}>
              <h2 className={judulBagian}>Belajar bersama Tutor Profesional</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {kelas.tutor.map((t, i) => (
                  <KartuOrang
                    key={i}
                    avatar={t.avatar}
                    nama={t.nama}
                    keterangan={<>{t.jabatan} di <span className="font-bold">{t.perusahaan}</span></>}
                    isi={t.cerita}
                  />
                ))}
              </div>
            </section>

            <section className={kartu}>
              <h2 className={judulBagian}>Kamu akan Mempelajari</h2>
              <div className="flex flex-col gap-3">
                {kelas.silabus.map((bab, i) => (
                  <Accordion key={bab.judul} judul={bab.judul} varian="teks" awalTerbuka={i === 0}>
                    {bab.materi.map((m) => (
                      <div
                        key={m.judul}
                        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-5 py-4 border border-borderField rounded-[10px]"
                      >
                        <p className="text-base font-medium tracking-[0.2px] text-textPrimary">{m.judul}</p>
                        <div className="flex items-center gap-4 text-base tracking-[0.2px] text-textSecondary">
                          <span className="flex items-center gap-2"><Ikon nama="putar" ukuran={22} />{m.jenis}</span>
                          <span className="flex items-center gap-2"><Ikon nama="jam" ukuran={22} />{m.durasi}</span>
                        </div>
                      </div>
                    ))}
                  </Accordion>
                ))}
              </div>
            </section>

            <section className={kartu}>
              <h2 className={judulBagian}>Rating dan Review</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {kelas.review.map((r, i) => (
                  <KartuOrang key={i} avatar={r.avatar} nama={r.nama} keterangan={r.asal} isi={r.isi} rating={r.rating} />
                ))}
              </div>
            </section>
          </div>

          {/* Kolom kanan */}
          <div className="w-full lg:w-[366px] lg:shrink-0 lg:sticky lg:top-6">
            {/* Beli Sekarang: kalau belum login, otomatis dialihkan ke Login lalu kembali ke checkout.
                Bagikan Kelas mengikuti Figma: hanya tampil sebelum login. */}
            <CourseInfoCard
              kelas={kelas}
              onBeli={() => navigate(`/checkout/${id}`)}
              onBagikan={sudahLogin ? undefined : bagikan}
              labelBagikan={tersalin ? 'Tautan Tersalin' : 'Bagikan Kelas'}
            />
          </div>
        </div>

        {/* Kelas lain */}
        <section className="flex flex-col gap-6 md:gap-8">
          <div className="flex flex-col gap-2.5">
            <h2 className="font-heading font-semibold text-2xl sm:text-[32px] leading-[1.1] text-textPrimary">
              Video Pembelajaran Terkait Lainnya
            </h2>
            <p className="text-base font-medium tracking-[0.2px] text-textSecondary">
              Ekspansi Pengetahuan Anda dengan Rekomendasi Spesial Kami!
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {kelasLain.map((k) => (
              <CourseCard key={k.id} kelas={k} />
            ))}
          </div>
        </section>
      </Container>
    </MainLayout>
  );
}
