import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import CheckoutLayout from '../layouts/CheckoutLayout';
import CheckoutGrid from '../components/CheckoutGrid';
import CheckoutCard from '../components/CheckoutCard';
import PaymentMethodList from '../components/PaymentMethodList';
import OrderSummary from '../components/OrderSummary';
import Button from '../components/Button';
import { detailKelas } from '../data/courses';
import { cariMetode, pesanan } from '../data/payment';

export default function ChangeMethod() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  // Mulai dari metode yang sebelumnya dipilih (dari ?metode=...)
  const [metode, setMetode] = useState(cariMetode(params.get('metode')).id);
  const kelas = detailKelas;

  return (
    <CheckoutLayout langkah={1}>
      <CheckoutGrid kelas={kelas}>
        <CheckoutCard>
          {/* Label mengikuti desain Figma */}
          <OrderSummary
            judul="Ringkasan Belanja"
            baris={[
              { label: 'Total Harga (3 barang)', nilai: pesanan.hargaKelas },
              { label: 'Ongkos Kirim', nilai: pesanan.biayaAdmin },
            ]}
          />
        </CheckoutCard>

        <CheckoutCard className="flex flex-col gap-6">
          <h1 className="font-heading font-semibold text-xl leading-[1.2] text-textPrimary">Ubah Metode Pembayaran</h1>
          <PaymentMethodList terpilih={metode} onPilih={setMetode} />
          {/* Sesuai flow Figma: dari sini langsung ke halaman Pembayaran Berhasil.
              TODO: kirim metode yang dipilih (`metode`) dan cek status pembayaran ke API. */}
          <Button variant="primary" size="lg" fullWidth onClick={() => navigate('/pembayaran/berhasil')}>
            Bayar Sekarang
          </Button>
        </CheckoutCard>
      </CheckoutGrid>
    </CheckoutLayout>
  );
}
