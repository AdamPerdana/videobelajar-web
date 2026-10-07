import React, { useState } from 'react';
import Ikon from '../components/Ikon';
import { pilihanBidang, pilihanHarga, pilihanDurasi } from '../data/courses';

// Satu kelompok filter yang bisa dibuka-tutup
function KelompokFilter({ ikon, judul, children }) {
  const [terbuka, setTerbuka] = useState(true);

  return (
    <div className="flex flex-col gap-4 p-4 bg-white border border-borderField rounded-[10px]">
      <button
        type="button"
        onClick={() => setTerbuka(!terbuka)}
        aria-expanded={terbuka}
        className="flex items-center justify-between gap-3 w-full text-brandGreen cursor-pointer"
      >
        <span className="flex items-center gap-3 text-base font-medium tracking-[0.2px]">
          <Ikon nama={ikon} ukuran={22} />
          {judul}
        </span>
        <Ikon nama="panahBawah" className={`transition-transform ${terbuka ? 'rotate-180' : ''}`} />
      </button>

      {terbuka && <div className="flex flex-col gap-3">{children}</div>}
    </div>
  );
}

function Pilihan({ jenis, nama, label, dipilih, onChange }) {
  return (
    <label className="flex items-center gap-3 text-base tracking-[0.2px] text-textSecondary cursor-pointer">
      <input
        type={jenis}
        name={nama}
        checked={dipilih}
        onChange={onChange}
        className={`w-[18px] h-[18px] accent-brandGreen cursor-pointer ${jenis === 'radio' ? 'rounded-full' : 'rounded'}`}
      />
      {label}
    </label>
  );
}

// Panel filter di halaman Kategori.
// filter: { bidang: [], harga: [], durasi: '' }
export default function Sidebar({ filter, onUbah, onReset }) {
  // Tambah atau buang satu nilai dari daftar pilihan (checkbox)
  const ganti = (kunci, nilai) => {
    const lama = filter[kunci];
    const baru = lama.includes(nilai) ? lama.filter((n) => n !== nilai) : [...lama, nilai];
    onUbah({ ...filter, [kunci]: baru });
  };

  return (
    <aside className="flex flex-col gap-4 p-4 sm:p-5 bg-white border border-borderField rounded-[10px]">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold tracking-[0.2px] text-textSecondary">Filter</h2>
        <button type="button" onClick={onReset} className="text-base font-medium tracking-[0.2px] text-tertiary cursor-pointer hover:underline">
          Reset
        </button>
      </div>

      <KelompokFilter ikon="buku" judul="Bidang Studi">
        {pilihanBidang.map((b) => (
          <Pilihan key={b} jenis="checkbox" label={b} dipilih={filter.bidang.includes(b)} onChange={() => ganti('bidang', b)} />
        ))}
      </KelompokFilter>

      <KelompokFilter ikon="tas" judul="Harga">
        {pilihanHarga.map((h) => (
          <Pilihan key={h.id} jenis="checkbox" label={h.label} dipilih={filter.harga.includes(h.id)} onChange={() => ganti('harga', h.id)} />
        ))}
      </KelompokFilter>

      <KelompokFilter ikon="jam" judul="Durasi">
        {pilihanDurasi.map((d) => (
          <Pilihan
            key={d.id}
            jenis="radio"
            nama="durasi"
            label={d.label}
            dipilih={filter.durasi === d.id}
            onChange={() => onUbah({ ...filter, durasi: d.id })}
          />
        ))}
      </KelompokFilter>
    </aside>
  );
}
