import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import UserMenu from '../components/UserMenu';
import Ikon from '../components/Ikon';
import { useAuth } from '../context/AuthContext';
import { menuAkun } from '../data/account';

const tombol = 'inline-flex items-center justify-center h-[42px] px-[26px] rounded-[10px] text-base font-bold tracking-[0.2px] transition-colors';
const tombolLogin = `${tombol} bg-brandGreen text-white hover:bg-brandGreen-hover`;
const tombolRegister = `${tombol} bg-white border border-brandGreen text-brandGreen hover:bg-brandGreen-light`;

// Satu baris di menu HP
const barisHp = 'flex items-center gap-2 w-full h-[54px] px-5 border-b border-borderField text-base font-medium tracking-[0.2px] text-left';

// Kerangka halaman utama: navbar, isi, footer.
// Layar lebar: Kategori + foto profil (sudah login) atau tombol Login/Register (belum login).
// Layar HP   : ikon garis tiga yang membuka daftar menu.
export default function MainLayout({ children }) {
  const { sudahLogin, logout } = useAuth();

  const menuHp = (
    <>
      <Link to="/kategori" className={`${barisHp} text-textSecondary`}>Kategori</Link>

      {sudahLogin ? (
        <>
          {menuAkun.map((item) => (
            <Link key={item.tujuan} to={item.tujuan} className={`${barisHp} text-textSecondary`}>
              {item.label}
            </Link>
          ))}
          <button type="button" onClick={logout} className={`${barisHp} text-tertiary cursor-pointer`}>
            Keluar
            <Ikon nama="keluar" ukuran={22} />
          </button>
        </>
      ) : (
        <div className="grid grid-cols-2 gap-3 p-5">
          <Link to="/login" className={tombolLogin}>Login</Link>
          <Link to="/register" className={tombolRegister}>Register</Link>
        </div>
      )}
    </>
  );

  return (
    <div className="min-h-screen flex flex-col bg-cream font-sans text-textPrimary">
      <Navbar menuHp={menuHp}>
        <div className="flex items-center gap-9">
          <NavLink
            to="/kategori"
            className={({ isActive }) =>
              `text-base font-medium tracking-[0.2px] hover:text-brandGreen ${isActive ? 'text-brandGreen' : 'text-textSecondary'}`
            }
          >
            Kategori
          </NavLink>

          {sudahLogin ? (
            <UserMenu />
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/login" className={tombolLogin}>Login</Link>
              <Link to="/register" className={tombolRegister}>Register</Link>
            </div>
          )}
        </div>
      </Navbar>

      <main className="flex-1">{children}</main>

      <Footer />
    </div>
  );
}
