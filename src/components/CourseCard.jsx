import React from 'react';
import { Link } from 'react-router-dom';
import Gambar from './Gambar';
import Rating from './Rating';
import { hargaRibuan } from '../data/courses';
import { sudahDimiliki } from '../data/account';
import { useAuth } from '../context/AuthContext';

// Kartu kelas. Diklik -> halaman detail kelas.
// Kalau sudah login dan kelasnya sudah dibeli -> langsung ke ruang belajar.
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

      <div className="flex items-center gap-2.5">
        <Gambar nama={kelas.avatar} alt="" label={false} className="w-10 h-10 rounded-[10px]" />
        <div className="min-w-0">
          <p className="text-base font-medium tracking-[0.2px] text-textPrimary">{kelas.tutor.nama}</p>
          <p className="text-sm tracking-[0.2px] text-textSecondary">
            {kelas.tutor.jabatan} di <span className="font-bold">{kelas.tutor.perusahaan}</span>
          </p>
        </div>
      </div>

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
