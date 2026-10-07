import React from 'react';
import Ikon from './Ikon';

// Lima bintang + teks "3.5 (86)". Bintang terisi sesuai nilai (boleh setengah).
export default function Rating({ nilai, jumlah, terang = false }) {
  const persen = Math.max(0, Math.min(100, (nilai / 5) * 100));
  const lima = [1, 2, 3, 4, 5];

  return (
    <div className="flex items-center gap-2">
      <div className="relative inline-flex" role="img" aria-label={`Rating ${nilai} dari 5`}>
        <div className={`flex ${terang ? 'text-white/40' : 'text-[#D9DBE0]'}`}>
          {lima.map((n) => <Ikon key={n} nama="bintang" ukuran={18} />)}
        </div>
        <div className="absolute inset-y-0 left-0 flex overflow-hidden text-star" style={{ width: `${persen}%` }}>
          {lima.map((n) => <Ikon key={n} nama="bintang" ukuran={18} />)}
        </div>
      </div>
      <span className={`text-sm font-medium tracking-[0.2px] ${terang ? 'text-white' : 'text-textSecondary'} ${jumlah !== undefined ? 'underline' : ''}`}>
        {nilai}
        {jumlah !== undefined && ` (${jumlah})`}
      </span>
    </div>
  );
}
