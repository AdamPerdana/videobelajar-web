import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AccountLayout from '../layouts/AccountLayout';
import Tabs from '../components/Tabs';
import SearchBox from '../components/SearchBox';
import Pagination from '../components/Pagination';
import StatusBadge from '../components/StatusBadge';
import Gambar from '../components/Gambar';
import TutorInfo from '../components/TutorInfo';
import Ikon from '../components/Ikon';
import Button from '../components/Button';
import { kelasSaya, tabKelasSaya } from '../data/account';
import { bagiHalaman, cocokKataCari } from '../utils/list';

const PER_HALAMAN = 3;
const LATAR_HIJAU = 'bg-brandGreen/[0.04]';

// Kelas dianggap selesai kalau semua modul sudah dikerjakan
const adalahSelesai = (kelas) => kelas.modulSelesai >= kelas.jumlahModul;

function KartuKelas({ kelas }) {
  const navigate = useNavigate();
  const selesai = adalahSelesai(kelas);
  const persen = Math.round((kelas.modulSelesai / kelas.jumlahModul) * 100);
  const bukaDetail = () => navigate(`/kelas/${kelas.id}`);
  const bukaBelajar = () => navigate(`/belajar/${kelas.id}`);

  return (
    <article className="overflow-hidden border border-borderField rounded-[10px]">
      <header className={`flex items-center justify-between gap-4 px-4 sm:px-5 py-4 border-b border-borderField ${LATAR_HIJAU}`}>
        <p className="text-base sm:text-lg font-medium tracking-[0.2px] text-textPrimary">
          {kelas.modulSelesai} / {kelas.jumlahModul} Modul Terselesaikan
        </p>
        <StatusBadge warna={selesai ? 'hijau' : 'kuning'}>{selesai ? 'Selesai' : 'Sedang Berjalan'}</StatusBadge>
      </header>

      <div className="flex flex-col sm:flex-row gap-4 sm:gap-9 px-4 sm:px-5 py-5">
        <Gambar nama={kelas.gambar} alt={kelas.judul} className="w-full sm:w-[176px] h-[176px] rounded-[10px]" />

        <div className="flex-1 min-w-0 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h2 className="font-heading font-semibold text-xl leading-[1.2] text-textPrimary">{kelas.judul}</h2>
            <p className="text-base tracking-[0.2px] text-textSecondary">{kelas.deskripsi}</p>
          </div>

          <TutorInfo avatar={kelas.avatar} tutor={kelas.tutor} />

          <div className="flex items-center gap-4 text-base tracking-[0.2px] text-textSecondary">
            <span className="flex items-center gap-2"><Ikon nama="modul" ukuran={22} />{kelas.jumlahModul} Modul</span>
            <span className="flex items-center gap-2"><Ikon nama="jam" ukuran={22} />{kelas.durasiMenit} Menit</span>
          </div>
        </div>
      </div>

      <footer className={`flex flex-col md:flex-row md:items-center gap-4 md:gap-9 px-4 sm:px-5 py-4 border-t border-borderField ${LATAR_HIJAU}`}>
        <div className="flex-1 flex items-center gap-3">
          <p className="text-base tracking-[0.2px] text-textSecondary whitespace-nowrap">
            Progres Kelas: <span className="font-bold text-textPrimary">{persen}%</span>
          </p>
          <div
            role="progressbar"
            aria-label="Progres kelas"
            aria-valuenow={persen}
            aria-valuemin={0}
            aria-valuemax={100}
            className="flex-1 max-w-[360px] h-1 rounded-full bg-tertiary/30"
          >
            <div className="h-full rounded-full bg-tertiary" style={{ width: `${persen}%` }} />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          {selesai ? (
            <>
              <Button variant="outlinePrimary" size="lg" onClick={() => navigate(`/sertifikat/${kelas.id}`)}>
                Unduh Sertifikat
              </Button>
              <Button variant="primary" size="lg" onClick={bukaDetail}>
                Lihat Detail Kelas
              </Button>
            </>
          ) : (
            <Button variant="primary" size="lg" onClick={bukaBelajar}>
              Lanjutkan Pembelajaran
            </Button>
          )}
        </div>
      </footer>
    </article>
  );
}

export default function MyCourses() {
  const [tab, setTab] = useState('semua');
  const [kataCari, setKataCari] = useState('');
  const [halaman, setHalaman] = useState(1);

  const hasil = kelasSaya.filter((k) => {
    if (tab === 'selesai' && !adalahSelesai(k)) return false;
    if (tab === 'berjalan' && adalahSelesai(k)) return false;
    return cocokKataCari(k.judul, kataCari);
  });

  const { tampil, halamanAktif, jumlahHalaman } = bagiHalaman(hasil, halaman, PER_HALAMAN);

  return (
    <AccountLayout judul="Daftar Kelas" deskripsi="Akses Materi Belajar dan Mulailah Meningkatkan Pengetahuan Anda!">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <Tabs
          daftar={tabKelasSaya}
          aktif={tab}
          onGanti={(nilai) => {
            setTab(nilai);
            setHalaman(1);
          }}
        />
        <SearchBox
          nilai={kataCari}
          onUbah={(teks) => {
            setKataCari(teks);
            setHalaman(1);
          }}
          className="md:w-[220px]"
        />
      </div>

      {tampil.length > 0 ? (
        <div className="flex flex-col gap-6">
          {tampil.map((k) => (
            <KartuKelas key={k.id} kelas={k} />
          ))}
        </div>
      ) : (
        <p className="py-16 text-center text-textSecondary">Tidak ada kelas di sini.</p>
      )}

      <Pagination halaman={halamanAktif} jumlahHalaman={jumlahHalaman} onGanti={setHalaman} />
    </AccountLayout>
  );
}
