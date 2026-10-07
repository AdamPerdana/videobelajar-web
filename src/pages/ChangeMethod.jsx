import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import CheckoutLayout from '../layouts/CheckoutLayout';
import PaymentMethodList from '../components/PaymentMethodList';
import OrderSummary from '../components/OrderSummary';
import CourseInfoCard from '../components/CourseInfoCard';
import Button from '../components/Button';
import { detailKelas } from '../data/courses';
import { cariMetode, pesanan } from '../data/payment';

const kartu = 'p-5 sm:p-6 bg-white border border-borderField rounded-[10px]';

// Ubah metode pembayaran (dari halaman Bayar)
export default function ChangeMethod() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [metode, setMetode] = useState(cariMetode(params.get('metode')).id);
  const kelas = detailKelas;

  return (
    <CheckoutLayout langkah={1}>
      <div className="flex flex-col-reverse lg:flex-row lg:items-start gap-6 lg:gap-9">
        <div className="flex-1 min-w-0 flex flex-col gap-6 md:gap-9">
          <section className={kartu}>
            {/* Label mengikuti desain Figma */}
            <OrderSummary
              judul="Ringkasan Belanja"
              baris={[
                { label: 'Total Harga (3 barang)', nilai: pesanan.hargaKelas },
                { label: 'Ongkos Kirim', nilai: pesanan.biayaAdmin },
              ]}
            />
          </section>

          <section className={`${kartu} flex flex-col gap-6`}>
            <h1 className="font-heading font-semibold text-xl leading-[1.2] text-textPrimary">Ubah Metode Pembayaran</h1>
            <PaymentMethodList terpilih={metode} onPilih={setMetode} />
            {/* Sesuai flow Figma: dari sini langsung ke halaman Pembayaran Berhasil.
                TODO: kirim metode yang dipilih ("metode") dan cek status pembayaran ke API. */}
            <Button variant="primary" size="lg" fullWidth onClick={() => navigate('/pembayaran/berhasil')}>
              Bayar Sekarang
            </Button>
          </section>
        </div>

        <div className="w-full lg:w-[366px] lg:shrink-0">
          <CourseInfoCard kelas={kelas} denganGambar />
        </div>
      </div>
    </CheckoutLayout>
  );
}
