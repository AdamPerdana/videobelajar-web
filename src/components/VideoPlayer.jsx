import React, { useState } from 'react';
import Ikon from './Ikon';

// Kotak pemutar video.
// src       : alamat file video. Kalau kosong, tampil kotak gelap dengan tombol putar.
// onSelesai : dipanggil saat video habis ditonton (atau tombol putar ditekan kalau video belum ada)
export default function VideoPlayer({ src, onSelesai }) {
  const [ditekan, setDitekan] = useState(false);

  return (
    <div className="bg-[#171717]">
      <div className="relative mx-auto w-full max-w-[836px] aspect-[836/504] bg-[#3D3D3D]">
        {src ? (
          <video src={src} controls onEnded={onSelesai} className="absolute inset-0 w-full h-full" />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
            <button
              type="button"
              aria-label="Putar video"
              onClick={() => {
                setDitekan(true);
                onSelesai();
              }}
              className="flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white text-[#3D3D3D] cursor-pointer transition-transform hover:scale-105"
            >
              <Ikon nama="putarIsi" ukuran={56} />
            </button>
            {ditekan && (
              <p className="px-4 text-center text-sm text-white/70">
                Video belum dipasang. Modul ini ditandai selesai.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
