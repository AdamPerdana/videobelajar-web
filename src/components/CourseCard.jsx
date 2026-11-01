import { Link } from 'react-router-dom';
import Gambar from './Gambar';
import TutorInfo from './TutorInfo';
import Rating from './Rating';
import { hargaRibuan } from '../utils/format';
import { sudahDimiliki } from '../data/account';
import { useAuth } from '../hooks/useAuth';

// Kartu kelas. Kelas yang sudah dimiliki langsung membuka ruang belajar, selain itu ke halaman detail.
export default function CourseCard({ kelas }) {
  const { sudahLogin } = useAuth();
  const tujuan = sudahLogin && sudahDimiliki(kelas.id) ? `/belajar/${kelas.id}` : `/kelas/${kelas.id}`;

  return (
    <Link
      to={tujuan}
      className="flex flex-col gap-4 p-4 sm:p-5 bg-white border border-borderField rounded-[10px] transition-shadow hover:shadow-md"
    >
      <Gambar nama={kelas.gambar} alt={kelas.judul} className="w-full h-[193px] rounded-[10px]" />

      <div className="flex flex-col gap-2">
        <h3 className="font-heading font-semibold text-lg leading-[1.2] text-textPrimary">{kelas.judul}</h3>
        <p className="line-clamp-2 text-base tracking-[0.2px] text-textSecondary">{kelas.deskripsi}</p>
      </div>

      <TutorInfo avatar={kelas.avatar} tutor={kelas.tutor} className="min-w-0" />

      <div className="flex items-center justify-between gap-2 mt-auto">
        <Rating nilai={kelas.rating} jumlah={kelas.jumlahReview} />
        <div className="flex items-baseline gap-2">
          {kelas.hargaCoret && (
            <span className="text-sm font-medium text-tertiary line-through">{hargaRibuan(kelas.hargaCoret)}</span>
          )}
          <span className="font-heading font-semibold text-xl sm:text-2xl leading-[1.2] text-brandGreen">
            {hargaRibuan(kelas.harga)}
          </span>
        </div>
      </div>
    </Link>
  );
}
