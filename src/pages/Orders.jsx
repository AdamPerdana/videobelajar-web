import React, { useState } from 'react';
import AccountLayout from '../layouts/AccountLayout';
import Tabs from '../components/Tabs';
import SearchBox from '../components/SearchBox';
import SortDropdown from '../components/SortDropdown';
import Pagination from '../components/Pagination';
import StatusBadge from '../components/StatusBadge';
import Gambar from '../components/Gambar';
import { rupiah } from '../data/payment';
import { daftarPesanan, formatWaktu, labelStatusPesanan, tabPesanan, urutanPesanan } from '../data/account';

const perHalaman = 5;
const latarHijau = 'bg-brandGreen/[0.04]';

function KartuPesanan({ pesanan }) {
  const status = labelStatusPesanan[pesanan.status];

  return (
    <article className="overflow-hidden border border-borderField rounded-[10px]">
      <header className={`flex flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 sm:px-5 py-4 border-b border-borderField ${latarHijau}`}>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-1 text-base sm:text-lg tracking-[0.2px] text-textSecondary">
          <p>
            No. Invoice:{' '}
            {/* TODO: arahkan ke halaman detail invoice */}
            <a href="#" className="font-medium text-[#0980E2] underline">{pesanan.invoice}</a>
          </p>
          <p>Waktu Pembayaran: {formatWaktu(pesanan.waktu)}</p>
        </div>
        <StatusBadge warna={status.warna}>{status.teks}</StatusBadge>
      </header>

      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-9 px-4 sm:px-5 py-5">
        <div className="flex-1 min-w-0 flex items-center gap-4">
          <Gambar nama={pesanan.gambar} alt="" label={false} className="w-[52px] h-[52px] rounded-[10px]" />
          <p className="max-w-[420px] text-lg font-medium tracking-[0.2px] text-textPrimary">{pesanan.judul}</p>
        </div>
        <div className="sm:w-[215px] sm:pl-9 sm:border-l border-borderField">
          <p className="text-base tracking-[0.2px] text-textSecondary">Harga</p>
          <p className="text-lg font-bold tracking-[0.2px] text-textPrimary">{rupiah(pesanan.harga)}</p>
        </div>
      </div>

      <footer className={`flex items-center justify-between gap-9 px-4 sm:px-5 py-4 border-t border-borderField ${latarHijau}`}>
        <p className="flex-1 text-base tracking-[0.2px] text-textSecondary">Total Pembayaran</p>
        <p className="sm:w-[215px] sm:pl-9 text-lg font-bold tracking-[0.2px] text-brandGreen">{rupiah(pesanan.harga)}</p>
      </footer>
    </article>
  );
}

export default function Orders() {
  const [tab, setTab] = useState('semua');
  const [kataCari, setKataCari] = useState('');
  const [urutan, setUrutan] = useState('');
  const [halaman, setHalaman] = useState(1);

  let hasil = daftarPesanan.filter((p) => {
    if (tab !== 'semua' && p.status !== tab) return false;
    if (kataCari.trim() && !p.judul.toLowerCase().includes(kataCari.trim().toLowerCase())) return false;
    return true;
  });

  const urutanAktif = urutanPesanan.find((u) => u.id === urutan);
  if (urutanAktif) hasil = [...hasil].sort(urutanAktif.banding);

  const jumlahHalaman = Math.max(1, Math.ceil(hasil.length / perHalaman));
  const halamanAktif = Math.min(halaman, jumlahHalaman);
  const tampil = hasil.slice((halamanAktif - 1) * perHalaman, halamanAktif * perHalaman);

  // Setiap tab, pencarian, atau urutan berubah, kembali ke halaman 1
  const ubah = (setter) => (nilai) => {
    setter(nilai);
    setHalaman(1);
  };

  return (
    <AccountLayout judul="Daftar Pesanan" deskripsi="Informasi terperinci mengenai pembelian">
      <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-4">
        <Tabs daftar={tabPesanan} aktif={tab} onGanti={ubah(setTab)} />
        <div className="flex gap-4">
          <SearchBox nilai={kataCari} onUbah={ubah(setKataCari)} className="flex-1 xl:flex-none xl:w-[220px]" />
          <SortDropdown pilihan={urutanPesanan} nilai={urutan} onUbah={ubah(setUrutan)} />
        </div>
      </div>

      {tampil.length > 0 ? (
        <div className="flex flex-col gap-6">
          {tampil.map((p) => (
            <KartuPesanan key={p.id} pesanan={p} />
          ))}
        </div>
      ) : (
        <p className="py-16 text-center text-textSecondary">Tidak ada pesanan di sini.</p>
      )}

      <Pagination halaman={halamanAktif} jumlahHalaman={jumlahHalaman} onGanti={setHalaman} />
    </AccountLayout>
  );
}
