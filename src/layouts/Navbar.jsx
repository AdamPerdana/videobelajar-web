import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Container from './Container';
import Logo from './Logo';
import Ikon from '../components/Ikon';

// Navbar: logo di kiri, isi bebas di kanan (menu, stepper, atau kosong).
// menuHp: kalau diisi, di layar HP isi kanan diganti ikon garis tiga,
//         dan menuHp tampil sebagai daftar selebar layar saat ikon ditekan.
export default function Navbar({ children, menuHp }) {
  const [terbuka, setTerbuka] = useState(false);

  return (
    <header className="relative z-30 bg-white border-b border-borderField">
      <Container>
        <nav className="flex items-center justify-between gap-4 sm:gap-9 h-16 sm:h-20">
          <Link to="/" aria-label="videobelajar, ke Beranda" onClick={() => setTerbuka(false)}>
            <Logo />
          </Link>

          <div className={menuHp ? 'hidden sm:block' : ''}>{children}</div>

          {menuHp && (
            <button
              type="button"
              aria-label={terbuka ? 'Tutup menu' : 'Buka menu'}
              aria-expanded={terbuka}
              onClick={() => setTerbuka(!terbuka)}
              className="sm:hidden flex items-center justify-center w-10 h-10 -mr-2 text-textSecondary cursor-pointer"
            >
              <Ikon nama={terbuka ? 'tutup' : 'menu'} />
            </button>
          )}
        </nav>
      </Container>

      {/* Menu HP: menutupi isi halaman di bawah navbar. Klik salah satu baris -> menu tertutup. */}
      {menuHp && terbuka && (
        <div
          className="sm:hidden absolute inset-x-0 top-full bg-white border-t border-borderField shadow-lg"
          onClick={() => setTerbuka(false)}
        >
          {menuHp}
        </div>
      )}
    </header>
  );
}
