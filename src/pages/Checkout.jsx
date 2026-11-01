import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CheckoutLayout from '../layouts/CheckoutLayout';
import CheckoutGrid from '../components/CheckoutGrid';
import CheckoutCard from '../components/CheckoutCard';
import PaymentMethodList from '../components/PaymentMethodList';
import OrderSummary from '../components/OrderSummary';
import Button from '../components/Button';
import { detailKelas } from '../data/courses';
import { barisRingkasan, metodeBawaan } from '../data/payment';

// Langkah 1 dari 3: pilih metode pembayaran
export default function Checkout() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [metode, setMetode] = useState(metodeBawaan);
  const kelas = detailKelas;

  return (
    <CheckoutLayout langkah={1}>
      <CheckoutGrid kelas={kelas}>
        <CheckoutCard className="flex flex-col gap-5">
          <h1 className="font-heading font-semibold text-xl leading-[1.2] text-textPrimary">Metode Pembayaran</h1>
          <PaymentMethodList terpilih={metode} onPilih={setMetode} awalTerbuka />
        </CheckoutCard>

        <CheckoutCard className="flex flex-col gap-6">
          <OrderSummary baris={barisRingkasan(kelas.judul)} />
          {/* Metode yang dipilih dikirim ke halaman berikutnya lewat query string (?metode=bca) */}
          <Button variant="primary" size="lg" fullWidth onClick={() => navigate(`/bayar/${id}?metode=${metode}`)}>
            Beli Sekarang
          </Button>
        </CheckoutCard>
      </CheckoutGrid>
    </CheckoutLayout>
  );
}
