import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Gambar from './Gambar';
import Ikon from './Ikon';
import { useAuth } from '../context/AuthContext';
import { menuAkun } from '../data/account';

// Foto profil di navbar. Diklik -> menu Profil Saya, Kelas Saya, Pesanan Saya, Keluar.
export default function UserMenu() {
  const [terbuka, setTerbuka] = useState(false);
  const { pengguna, logout } = useAuth();

  const baris = 'flex items-center gap-3 w-full h-12 px-4 text-base font-medium tracking-[0.2px] text-left cursor-pointer hover:bg-fieldAddon';

  return (
    <div className="relative">
      <button
        type="button"
        aria-label="Menu akun"
        aria-haspopup="menu"
        aria-expanded={terbuka}
        onClick={() => setTerbuka(!terbuka)}
        className="block cursor-pointer"
      >
        <Gambar nama={pengguna?.foto} cadangan="avatar-user" alt="" label={false} className="w-10 h-10 sm:w-11 sm:h-11 rounded-[10px]" />
      </button>

      {terbuka && (
        <>
          {/* Lapisan tak terlihat: klik di luar menu untuk menutup */}
          <div className="fixed inset-0 z-30" onClick={() => setTerbuka(false)} />
          <div
            role="menu"
            className="absolute right-0 z-40 mt-3 w-[200px] overflow-hidden bg-white border border-borderField rounded-[10px] shadow-xl"
          >
            {menuAkun.map((item) => (
              <Link
                key={item.tujuan}
                to={item.tujuan}
                role="menuitem"
                onClick={() => setTerbuka(false)}
                className={`${baris} text-textSecondary border-b border-borderField`}
              >
                {item.label}
              </Link>
            ))}
            <button
              type="button"
              role="menuitem"
              onClick={() => {
                setTerbuka(false);
                logout();
              }}
              className={`${baris} text-tertiary`}
            >
              Keluar
              <Ikon nama="keluar" ukuran={20} />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
