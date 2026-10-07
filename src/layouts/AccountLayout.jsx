import React from 'react';
import { NavLink } from 'react-router-dom';
import MainLayout from './MainLayout';
import Container from './Container';
import Ikon from '../components/Ikon';
import { menuAkun } from '../data/account';

// Kerangka halaman akun: judul + menu di kiri, isi halaman di kartu kanan.
export default function AccountLayout({ judul, deskripsi, children }) {
  return (
    <MainLayout>
      <Container className="py-7 md:py-16">
        <div className="flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-9">
          <div className="w-full lg:w-[292px] lg:shrink-0 flex flex-col gap-6">
            <div className="flex flex-col gap-2.5">
              <h1 className="font-heading font-semibold text-xl leading-[1.2] text-textPrimary">{judul}</h1>
              <p className="text-base tracking-[0.2px] text-textSecondary">{deskripsi}</p>
            </div>

            <nav aria-label="Menu akun" className="flex flex-col gap-2 p-4 sm:p-6 bg-white border border-borderField rounded-[10px]">
              {menuAkun.map((item) => (
                <NavLink
                  key={item.tujuan}
                  to={item.tujuan}
                  className={({ isActive }) =>
                    `flex items-center gap-3 h-12 px-3 rounded border text-lg font-bold tracking-[0.2px] ${isActive ? 'bg-[#FFF7D7] border-logoYellow text-logoYellow' : 'border-transparent text-iconMuted hover:text-textSecondary'}`
                  }
                >
                  <Ikon nama={item.ikon} />
                  {item.label}
                </NavLink>
              ))}

            </nav>
          </div>

          <div className="flex-1 min-w-0 flex flex-col gap-6 p-4 sm:p-6 bg-white border border-borderField rounded-[10px]">
            {children}
          </div>
        </div>
      </Container>
    </MainLayout>
  );
}
