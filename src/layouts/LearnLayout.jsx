import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Ikon from '../components/Ikon';
import UserMenu from '../components/UserMenu';
import Button from '../components/Button';

// Kerangka ruang belajar: bar atas (judul + progres), isi, daftar modul di kanan,
// dan bar hijau di bawah untuk pindah ke modul sebelum/sesudahnya.
export default function LearnLayout({
  judul,
  kembaliKe,
  jumlahSelesai,
  jumlahModul,
  onAmbilSertifikat,
  sidebar,
  sebelumnya,     // { judul, onKlik } atau null
  berikutnya,     // { judul, onKlik } atau null
  children,
}) {
  const [popTerbuka, setPopTerbuka] = useState(false);
  const semuaSelesai = jumlahSelesai >= jumlahModul;
  const persen = Math.round((jumlahSelesai / jumlahModul) * 100);

  return (
    <div className="min-h-screen lg:h-screen flex flex-col bg-white font-sans text-textPrimary">
      <header className="relative z-30 shrink-0 bg-white border-b border-borderField">
        <div className="flex items-center justify-between gap-4 h-16 sm:h-20 px-4 md:px-10 xl:px-[120px]">
          <Link to={kembaliKe} className="flex items-center gap-3 min-w-0 text-textPrimary">
            <Ikon nama="panahKiriPanjang" className="text-textSecondary" />
            <span className="truncate text-base sm:text-lg font-medium tracking-[0.2px]">{judul}</span>
          </Link>

          <div className="flex items-center gap-4 sm:gap-9 shrink-0">
            <div className="relative">
              {semuaSelesai ? (
                <button
                  type="button"
                  aria-expanded={popTerbuka}
                  onClick={() => setPopTerbuka(!popTerbuka)}
                  className="flex items-center gap-2 h-[42px] px-3 sm:px-5 border border-brandGreen rounded-[10px] text-base font-bold tracking-[0.2px] text-brandGreen cursor-pointer"
                >
                  <Ikon nama="piala" ukuran={22} className="text-logoYellow" />
                  <span className="hidden sm:inline">Ambil Sertifikat</span>
                  <Ikon nama="panahBawah" />
                </button>
              ) : (
                <button
                  type="button"
                  aria-expanded={popTerbuka}
                  aria-label={`Progres: ${jumlahSelesai} dari ${jumlahModul} modul selesai`}
                  onClick={() => setPopTerbuka(!popTerbuka)}
                  className="flex items-center gap-4 h-[42px] cursor-pointer"
                >
                  <span className="hidden sm:block w-[146px] h-2.5 rounded-full bg-[#FFF7D7]">
                    <span className="block h-full rounded-full bg-logoYellow" style={{ width: `${persen}%` }} />
                  </span>
                  <span className="flex items-center gap-1 text-base font-medium tracking-[0.2px] text-brandGreen">
                    {jumlahSelesai}/{jumlahModul}
                    <Ikon nama="panahBawah" />
                  </span>
                </button>
              )}

              {popTerbuka && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setPopTerbuka(false)} />
                  <div className="absolute right-0 z-20 mt-4 w-[280px] sm:w-[400px] flex flex-col gap-4 p-5 sm:p-6 bg-white border border-borderField rounded-[10px] shadow-xl">
                    <p className="pb-4 border-b border-borderField font-heading font-semibold text-lg leading-[1.2] text-textPrimary">
                      {semuaSelesai ? 'Modul sudah selesai' : `${persen}% Modul Telah Selesai`}
                    </p>
                    <p className="text-base tracking-[0.2px] text-textSecondary">
                      {semuaSelesai
                        ? `${jumlahSelesai} dari ${jumlahModul} modul telah selesai, silahkan download sertifikat`
                        : 'Selesaikan Semua Modul Untuk Mendapatkan Sertifikat'}
                    </p>
                    <Button variant="primary" size="lg" fullWidth disabled={!semuaSelesai} onClick={onAmbilSertifikat}>
                      Ambil Sertifikat
                    </Button>
                  </div>
                </>
              )}
            </div>

            <UserMenu />
          </div>
        </div>
      </header>

      <div className="flex-1 lg:min-h-0 flex flex-col lg:flex-row">
        <main className="flex-1 min-w-0 lg:overflow-y-auto">{children}</main>
        <aside className="lg:w-[384px] lg:shrink-0 lg:min-h-0 flex flex-col border-t lg:border-t-0 lg:border-l border-borderField">
          {sidebar}
        </aside>
      </div>

      <nav aria-label="Pindah modul" className="sticky bottom-0 z-20 shrink-0 flex items-center justify-between gap-4 h-14 px-4 md:px-10 bg-brandGreen text-white">
        {sebelumnya ? (
          <button type="button" onClick={sebelumnya.onKlik} className="flex items-center gap-2 min-w-0 text-base font-bold tracking-[0.2px] cursor-pointer hover:opacity-90">
            <Ikon nama="panahKiri" ukuran={28} />
            <span className="truncate max-w-[34vw]">{sebelumnya.judul}</span>
          </button>
        ) : (
          <span />
        )}
        {berikutnya ? (
          <button type="button" onClick={berikutnya.onKlik} className="flex items-center gap-2 min-w-0 text-base font-bold tracking-[0.2px] cursor-pointer hover:opacity-90">
            <span className="truncate max-w-[34vw]">{berikutnya.judul}</span>
            <Ikon nama="panahKanan" ukuran={28} />
          </button>
        ) : (
          <span />
        )}
      </nav>
    </div>
  );
}
