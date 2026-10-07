import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CheckoutLayout from '../layouts/CheckoutLayout';
import Gambar from '../components/Gambar';
import Button from '../components/Button';

const isi = {
  berhasil: { judul: 'Pembayaran Berhasil!', gambar: 'payment-success' },
  tertunda: { judul: 'Pembayaran Tertunda!', gambar: 'payment-pending' },
};

// Langkah 3: hasil pembayaran. Alamat: /pembayaran/berhasil atau /pembayaran/tertunda
export default function PaymentStatus() {
  const { status } = useParams();
  const navigate = useNavigate();
  const tertunda = status === 'tertunda';
  const data = tertunda ? isi.tertunda : isi.berhasil;

  return (
    <CheckoutLayout langkah={3} tertunda={tertunda}>
      <div className="flex flex-col items-center gap-9 w-full max-w-[608px] mx-auto px-5 py-10 sm:px-12 sm:py-16 bg-white border border-borderField rounded-[10px] text-center">
        <Gambar nama={data.gambar} alt="" fit="contain" className="w-full max-w-[400px] aspect-[5/4] rounded-[10px]" />

        <div className="flex flex-col gap-2.5">
          <h1 className="font-heading font-semibold text-2xl leading-[1.2] text-textPrimary">{data.judul}</h1>
          <p className="text-base sm:text-lg tracking-[0.2px] text-textSecondary">
            Silakan cek email kamu untuk informasi lebih lanjut. Hubungi kami jika ada kendala.
          </p>
        </div>

        <Button variant="primary" size="lg" onClick={() => navigate('/pesanan')}>
          Lihat Detail Pesanan
        </Button>
      </div>
    </CheckoutLayout>
  );
}
