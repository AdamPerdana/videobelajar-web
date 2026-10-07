import React from 'react';
import { Link } from 'react-router-dom';
import Container from './Container';
import Logo from './Logo';
import Ikon from '../components/Ikon';

const kolom = [
  { judul: 'Kategori', isi: ['Digital & Teknologi', 'Pemasaran', 'Manajemen Bisnis', 'Pengembangan Diri', 'Desain'], tujuan: '/kategori' },
  { judul: 'Perusahaan', isi: ['Tentang Kami', 'FAQ', 'Kebijakan Privasi', 'Ketentuan Layanan', 'Bantuan'], tujuan: '#' },
  { judul: 'Komunitas', isi: ['Tips Sukses', 'Blog'], tujuan: '#' },
];

const sosial = ['linkedin', 'facebook', 'instagram', 'twitter'];

export default function Footer() {
  return (
    <footer className="bg-white border-t border-borderField">
      <Container className="py-10 md:py-[60px] flex flex-col gap-8">
        <div className="flex flex-col lg:flex-row lg:justify-between gap-10">
          <div className="flex flex-col gap-4 max-w-[352px]">
            <Logo className="self-start" />
            <p className="text-lg font-bold leading-[1.4] tracking-[0.2px] text-textPrimary">
              Gali Potensi Anda Melalui Pembelajaran Video di hariesok.id!
            </p>
            <p className="text-base tracking-[0.2px] text-textPrimary">Jl. Usman Effendi No. 50 Lowokwaru, Malang</p>
            <p className="text-base tracking-[0.2px] text-textPrimary">+62-877-7123-1234</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-12">
            {kolom.map((k) => (
              <div key={k.judul} className="flex flex-col gap-4">
                <h3 className="text-base font-bold tracking-[0.2px] text-textPrimary">{k.judul}</h3>
                <ul className="flex flex-col gap-3">
                  {k.isi.map((teks) => (
                    <li key={teks}>
                      {k.tujuan === '#' ? (
                        <a href="#" className="text-base font-medium tracking-[0.2px] text-textSecondary hover:text-brandGreen">{teks}</a>
                      ) : (
                        <Link to={k.tujuan} className="text-base font-medium tracking-[0.2px] text-textSecondary hover:text-brandGreen">{teks}</Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-4 pt-8 border-t border-borderField">
          <p className="text-base font-medium tracking-[0.2px] text-textSecondary">
            @2023 Gerobak Sayur All Rights Reserved.
          </p>
          <div className="flex items-center gap-4">
            {sosial.map((nama) => (
              <a
                key={nama}
                href="#"
                aria-label={nama}
                className="flex items-center justify-center w-9 h-9 rounded-full border border-textPrimary text-textPrimary hover:border-brandGreen hover:text-brandGreen"
              >
                <Ikon nama={nama} ukuran={16} />
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
