import { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import LearnLayout from '../layouts/LearnLayout';
import ModuleList from '../components/ModuleList';
import VideoPlayer from '../components/VideoPlayer';
import QuizRunner from '../components/QuizRunner';
import ReviewModal from '../components/ReviewModal';
import TutorInfo from '../components/TutorInfo';
import Rating from '../components/Rating';
import Ikon from '../components/Ikon';
import Button from '../components/Button';
import { useProgresBelajar } from '../hooks/useProgresBelajar';
import { bagianModul, kelasBelajar } from '../data/learning';

// Semua modul dari semua bagian dijadikan satu daftar datar, urut dari awal sampai akhir
const SEMUA_ITEM = bagianModul.flatMap((b) => b.item);
const JENIS_TES = ['pretest', 'quiz', 'ujian'];

const ISI = 'px-4 md:px-10 xl:pl-[120px] xl:pr-12 py-8 md:py-10';
const JUDUL = 'font-heading font-semibold text-xl sm:text-2xl leading-[1.2] text-textPrimary';

// Keterangan di bawah video: judul, deskripsi, tutor, dan rating
function MateriVideo() {
  const { materi } = kelasBelajar;

  return (
    <div className={`${ISI} flex flex-col gap-6`}>
      <div className="flex flex-col gap-3">
        <h1 className={JUDUL}>{materi.judul}</h1>
        <p className="text-base sm:text-lg tracking-[0.2px] text-textSecondary">{materi.deskripsi}</p>
      </div>
      <TutorInfo avatar={materi.tutor.avatar} tutor={materi.tutor} />
      <Rating nilai={materi.rating} jumlah={materi.jumlahReview} />
    </div>
  );
}

// Tampilan modul "Rangkuman": tombol unduh yang sekaligus menandai modul selesai
function MateriRangkuman({ onUnduh }) {
  return (
    <div className={`${ISI} flex flex-col gap-6`}>
      <div className="flex flex-col gap-3">
        <h1 className={JUDUL}>Download Rangkuman Modul</h1>
        <p className="text-base tracking-[0.2px] text-textSecondary">
          Silakan download rangkuman modul dari materi yang telah kamu pelajari
        </p>
      </div>
      <div>
        {/* TODO: sambungkan ke file rangkuman yang sebenarnya */}
        <Button variant="outlinePrimary" size="lg" onClick={onUnduh}>
          <Ikon nama="unduh" ukuran={20} />
          Download Rangkuman
        </Button>
      </div>
    </div>
  );
}

function RuangBelajar({ id }) {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const { progres, tandaiSelesai, simpanHasilTes, simpanReview } = useProgresBelajar(id);
  const [reviewTerbuka, setReviewTerbuka] = useState(false);

  // Modul yang sedang dibuka: ikut alamat (?m=...), kalau tidak ada / tidak valid pakai
  // modul pertama yang belum selesai, dan kalau semua selesai pakai modul pertama.
  const aktif =
    SEMUA_ITEM.find((i) => i.id === params.get('m')) ||
    SEMUA_ITEM.find((i) => !progres.selesai.includes(i.id)) ||
    SEMUA_ITEM[0];

  // Samakan alamat dengan modul yang sedang dibuka
  useEffect(() => {
    if (params.get('m') !== aktif.id) setParams({ m: aktif.id }, { replace: true });
  }, [aktif.id, params, setParams]);

  const buka = (itemId) => {
    setParams({ m: itemId });
    document.querySelector('main')?.scrollTo(0, 0);
    window.scrollTo(0, 0);
  };

  const urutan = SEMUA_ITEM.findIndex((i) => i.id === aktif.id);
  const itemSebelum = SEMUA_ITEM[urutan - 1];
  const itemSesudah = SEMUA_ITEM[urutan + 1];
  const adalahTes = JENIS_TES.includes(aktif.jenis);

  return (
    <LearnLayout
      judul={kelasBelajar.judul}
      kembaliKe="/kelas-saya"
      jumlahSelesai={progres.selesai.length}
      jumlahModul={SEMUA_ITEM.length}
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
        // key = id modul, supaya setiap pindah tes, tampilannya mulai dari awal
        <QuizRunner
          key={aktif.id}
          item={aktif}
          hasil={progres.hasil[aktif.id]}
          onSelesai={(hasil, lulus) => simpanHasilTes(aktif.id, hasil, lulus)}
        />
      ) : (
        <>
          <VideoPlayer key={aktif.id} src={aktif.video} onSelesai={() => tandaiSelesai(aktif.id)} />
          {aktif.jenis === 'video' ? <MateriVideo /> : <MateriRangkuman onUnduh={() => tandaiSelesai(aktif.id)} />}
        </>
      )}

      {reviewTerbuka && (
        <ReviewModal
          awal={progres.review}
          onTutup={() => setReviewTerbuka(false)}
          onKirim={(review) => {
            simpanReview(review);
            setReviewTerbuka(false);
          }}
        />
      )}
    </LearnLayout>
  );
}

export default function Learn() {
  const { id } = useParams();
  // key={id}: kalau pindah ke kelas lain, RuangBelajar dibuat baru sehingga progres
  // kelas sebelumnya tidak ikut terbawa. (Teknik "reset state dengan key".)
  return <RuangBelajar key={id} id={id} />;
}
