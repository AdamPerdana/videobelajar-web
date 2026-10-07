import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import LearnLayout from '../layouts/LearnLayout';
import ModuleList from '../components/ModuleList';
import VideoPlayer from '../components/VideoPlayer';
import QuizRunner from '../components/QuizRunner';
import Modal from '../components/Modal';
import Gambar from '../components/Gambar';
import Rating from '../components/Rating';
import Ikon from '../components/Ikon';
import Button from '../components/Button';
import { bagianModul, kelasBelajar } from '../data/learning';

const semuaItem = bagianModul.flatMap((b) => b.item);
const progresKosong = { selesai: [], hasil: {}, review: null };
const isi = 'px-4 md:px-10 xl:pl-[120px] xl:pr-12 py-8 md:py-10';

// Progres belajar disimpan di browser (localStorage) supaya tidak hilang saat halaman dimuat ulang.
// TODO: ganti dengan data dari API.
function muatProgres(kunci) {
  try {
    return { ...progresKosong, ...JSON.parse(localStorage.getItem(kunci)) };
  } catch {
    return progresKosong;
  }
}

// Jendela "Tulis Review Terbaikmu!"
function ModalReview({ awal, onTutup, onKirim }) {
  const [bintang, setBintang] = useState(awal?.bintang || 0);
  const [teks, setTeks] = useState(awal?.teks || '');

  return (
    <Modal judul="Tulis review" onTutup={onTutup}>
      <div className="flex flex-col items-center gap-6">
        <div className="flex flex-col gap-2.5">
          <h2 className="text-lg font-bold tracking-[0.2px] text-textPrimary">Tulis Review Terbaikmu!</h2>
          <p className="text-base tracking-[0.2px] text-textSecondary">Bagaimana pengalaman belajarmu di kelas ini?</p>
        </div>

        <div role="radiogroup" aria-label="Rating" className="flex gap-1">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              role="radio"
              aria-checked={bintang === n}
              aria-label={`${n} bintang`}
              onClick={() => setBintang(n)}
              className={`cursor-pointer ${n <= bintang ? 'text-star' : 'text-[#D9DBE0]'}`}
            >
              <Ikon nama="bintang" ukuran={34} />
            </button>
          ))}
        </div>

        <textarea
          aria-label="Review"
          placeholder="Masukkan Review"
          rows={3}
          value={teks}
          onChange={(e) => setTeks(e.target.value)}
          className="w-full px-4 py-3 border border-borderField rounded-[10px] outline-none resize-none text-base tracking-[0.2px] text-textPrimary placeholder:text-textSecondary focus:border-brandGreen"
        />

        <div className="grid grid-cols-2 gap-4 w-full">
          <Button variant="outlinePrimary" size="lg" fullWidth onClick={onTutup}>
            Batal
          </Button>
          <Button variant="primary" size="lg" fullWidth disabled={bintang === 0} onClick={() => onKirim({ bintang, teks })}>
            Selesai
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default function Learn() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const kunci = `videobelajar-progres-${id}`;

  const [progres, setProgres] = useState(() => muatProgres(kunci));
  const [reviewTerbuka, setReviewTerbuka] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(kunci, JSON.stringify(progres));
    } catch {
      // Penyimpanan browser tidak tersedia, progres hanya bertahan selama halaman terbuka
    }
  }, [kunci, progres]);

  // Modul yang dibuka diambil dari alamat (?m=...). Kalau belum ada, mulai dari modul
  // pertama yang belum selesai.
  const aktif =
    semuaItem.find((i) => i.id === params.get('m')) ||
    semuaItem.find((i) => !progres.selesai.includes(i.id)) ||
    semuaItem[0];

  useEffect(() => {
    if (params.get('m') !== aktif.id) setParams({ m: aktif.id }, { replace: true });
  }, [aktif.id, params, setParams]);

  const buka = (itemId) => {
    setParams({ m: itemId });
    document.querySelector('main')?.scrollTo(0, 0);
    window.scrollTo(0, 0);
  };

  const tandaiSelesai = (itemId) => {
    setProgres((lama) =>
      lama.selesai.includes(itemId) ? lama : { ...lama, selesai: [...lama.selesai, itemId] }
    );
  };

  const simpanHasilTes = (itemId, hasil, lulus) => {
    setProgres((lama) => ({
      ...lama,
      hasil: { ...lama.hasil, [itemId]: hasil },
      selesai: lulus && !lama.selesai.includes(itemId) ? [...lama.selesai, itemId] : lama.selesai,
    }));
  };

  const urutan = semuaItem.findIndex((i) => i.id === aktif.id);
  const itemSebelum = semuaItem[urutan - 1];
  const itemSesudah = semuaItem[urutan + 1];
  const adalahTes = ['pretest', 'quiz', 'ujian'].includes(aktif.jenis);
  const { materi } = kelasBelajar;

  return (
    <LearnLayout
      judul={kelasBelajar.judul}
      kembaliKe="/kelas-saya"
      jumlahSelesai={progres.selesai.length}
      jumlahModul={semuaItem.length}
      onAmbilSertifikat={() => navigate(`/sertifikat/${id}`)}
      sebelumnya={itemSebelum ? { judul: itemSebelum.judul, onKlik: () => buka(itemSebelum.id) } : null}
      berikutnya={itemSesudah ? { judul: itemSesudah.judul, onKlik: () => buka(itemSesudah.id) } : null}
      sidebar={
        <ModuleList
          bagian={bagianModul}
          aktifId={aktif.id}
          selesai={progres.selesai}
          onPilih={buka}
          onReview={() => setReviewTerbuka(true)}
          reviewTerkirim={!!progres.review}
        />
      }
    >
      {adalahTes ? (
        // key membuat tes dimulai dari awal setiap pindah ke item tes lain
        <QuizRunner
          key={aktif.id}
          item={aktif}
          hasil={progres.hasil[aktif.id]}
          onSelesai={(hasil, lulus) => simpanHasilTes(aktif.id, hasil, lulus)}
        />
      ) : (
        <>
          <VideoPlayer key={aktif.id} src={aktif.video} onSelesai={() => tandaiSelesai(aktif.id)} />

          {aktif.jenis === 'video' ? (
            <div className={`${isi} flex flex-col gap-6`}>
              <div className="flex flex-col gap-3">
                <h1 className="font-heading font-semibold text-xl sm:text-2xl leading-[1.2] text-textPrimary">{materi.judul}</h1>
                <p className="text-base sm:text-lg tracking-[0.2px] text-textSecondary">{materi.deskripsi}</p>
              </div>
              <div className="flex items-center gap-2.5">
                <Gambar nama={materi.tutor.avatar} alt="" label={false} className="w-10 h-10 rounded-[10px]" />
                <div>
                  <p className="text-base font-medium tracking-[0.2px] text-textPrimary">{materi.tutor.nama}</p>
                  <p className="text-sm tracking-[0.2px] text-textSecondary">
                    {materi.tutor.jabatan} di <span className="font-bold">{materi.tutor.perusahaan}</span>
                  </p>
                </div>
              </div>
              <Rating nilai={materi.rating} jumlah={materi.jumlahReview} />
            </div>
          ) : (
            <div className={`${isi} flex flex-col gap-6`}>
              <div className="flex flex-col gap-3">
                <h1 className="font-heading font-semibold text-xl sm:text-2xl leading-[1.2] text-textPrimary">Download Rangkuman Modul</h1>
                <p className="text-base tracking-[0.2px] text-textSecondary">
                  Silakan download rangkuman modul dari materi yang telah kamu pelajari
                </p>
              </div>
              <div>
                {/* TODO: sambungkan ke file rangkuman yang sebenarnya */}
                <Button variant="outlinePrimary" size="lg" onClick={() => tandaiSelesai(aktif.id)}>
                  <Ikon nama="unduh" ukuran={20} />
                  Download Rangkuman
                </Button>
              </div>
            </div>
          )}
        </>
      )}

      {reviewTerbuka && (
        <ModalReview
          awal={progres.review}
          onTutup={() => setReviewTerbuka(false)}
          onKirim={(review) => {
            // TODO: kirim review ke API
            setProgres((lama) => ({ ...lama, review }));
            setReviewTerbuka(false);
          }}
        />
      )}
    </LearnLayout>
  );
}
