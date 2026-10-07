import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CheckoutLayout from '../layouts/CheckoutLayout';
import PaymentMethodList from '../components/PaymentMethodList';
import OrderSummary from '../components/OrderSummary';
import CourseInfoCard from '../components/CourseInfoCard';
import Button from '../components/Button';
import { detailKelas } from '../data/courses';
import { metodeBawaan, pesanan } from '../data/payment';

const kartu = 'p-5 sm:p-6 bg-white border border-borderField rounded-[10px]';

// Langkah 1: pilih metode pembayaran
export default function Checkout() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [metode, setMetode] = useState(metodeBawaan);
  const kelas = detailKelas;

  return (
    <CheckoutLayout langkah={1}>
      <div className="flex flex-col-reverse lg:flex-row lg:items-start gap-6 lg:gap-9">
        <div className="flex-1 min-w-0 flex flex-col gap-6 md:gap-9">
          <section className={`${kartu} flex flex-col gap-5`}>
            <h1 className="font-heading font-semibold text-xl leading-[1.2] text-textPrimary">Metode Pembayaran</h1>
            <PaymentMethodList terpilih={metode} onPilih={setMetode} awalTerbuka />
          </section>

          <section className={`${kartu} flex flex-col gap-6`}>
            <OrderSummary
              baris={[
                { label: `Video Learning: ${kelas.judul}`, nilai: pesanan.hargaKelas },
                { label: 'Biaya Admin', nilai: pesanan.biayaAdmin },
              ]}
            />
            <Button variant="primary" size="lg" fullWidth onClick={() => navigate(`/bayar/${id}?metode=${metode}`)}>
              Beli Sekarang
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
