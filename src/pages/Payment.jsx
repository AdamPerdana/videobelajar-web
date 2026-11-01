import { Fragment, useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import CheckoutLayout from '../layouts/CheckoutLayout';
import CheckoutGrid from '../components/CheckoutGrid';
import CheckoutCard from '../components/CheckoutCard';
import Accordion from '../components/Accordion';
import Gambar from '../components/Gambar';
import OrderSummary from '../components/OrderSummary';
import Button from '../components/Button';
import { useTersalin } from '../hooks/useTersalin';
import { detailKelas } from '../data/courses';
import { barisRingkasan, batasWaktuBayar, cariMetode, nomorPembayaran, tataCaraUntuk } from '../data/payment';

// 5 -> "05"
const duaAngka = (n) => String(n).padStart(2, '0');

// Penghitung mundur "jam : menit : detik". `sisa` dalam detik.
function HitungMundur({ sisa }) {
  const bagian = [Math.floor(sisa / 3600), Math.floor((sisa % 3600) / 60), sisa % 60];

  return (
    <div className="bg-timerBg" role="timer" aria-label="Sisa waktu pembayaran">
      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 px-5 py-3">
        <span className="text-base sm:text-lg font-medium tracking-[0.2px] text-textSecondary">
          Selesaikan pemesanan dalam
        </span>
        <span className="flex items-center gap-2">
          {bagian.map((nilai, i) => (
            <Fragment key={i}>
              {i > 0 && <span className="font-bold text-textSecondary">:</span>}
              <span className="flex items-center justify-center w-8 h-8 rounded bg-tertiary text-base font-bold text-white tabular-nums">
                {duaAngka(nilai)}
              </span>
            </Fragment>
          ))}
        </span>
      </div>
    </div>
  );
}

// Langkah 2 dari 3: bayar
export default function Payment() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const metode = cariMetode(params.get('metode'));
  const kelas = detailKelas;

  const [sisa, setSisa] = useState(batasWaktuBayar);
  const { tersalin, salin } = useTersalin();

  // Kurangi sisa waktu tiap detik; timer dibersihkan saat halaman ditutup
  useEffect(() => {
    const timer = setInterval(() => setSisa((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(timer);
  }, []);

  // Waktu habis -> pembayaran dianggap tertunda
  useEffect(() => {
    if (sisa === 0) navigate('/pembayaran/tertunda', { replace: true });
  }, [sisa, navigate]);

  return (
    <CheckoutLayout langkah={2} bawahNavbar={<HitungMundur sisa={sisa} />}>
      <CheckoutGrid kelas={kelas}>
        <CheckoutCard className="flex flex-col gap-6">
          <h1 className="font-heading font-semibold text-xl leading-[1.2] text-textPrimary">Metode Pembayaran</h1>

          <div className="flex flex-col items-center gap-3 px-5 py-8 border border-borderField rounded-[10px] text-center">
            <Gambar
              nama={`${metode.gambar}-besar`}
              cadangan={metode.gambar}
              alt={metode.nama}
              fit="contain"
              className="h-12 min-w-[120px] rounded"
            />
            <p className="text-lg font-medium tracking-[0.2px] text-textPrimary">Bayar Melalui {metode.caraBayar}</p>
            <p className="flex items-center gap-3">
              <span className="text-lg font-medium tracking-[0.2px] text-textSecondary">{nomorPembayaran}</span>
              <button
                type="button"
                onClick={() => salin(nomorPembayaran.replace(/\s/g, ''))}
                className="text-base font-bold tracking-[0.2px] text-tertiary cursor-pointer hover:underline"
              >
                {tersalin ? 'Tersalin' : 'Salin'}
              </button>
            </p>
          </div>

          <OrderSummary baris={barisRingkasan(kelas.judul)} />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Button variant="outlinePrimary" size="lg" fullWidth onClick={() => navigate(`/ubah-metode/${id}?metode=${metode.id}`)}>
              Ganti Metode Pembayaran
            </Button>
            {/* TODO: cek status pembayaran ke API sebelum pindah halaman */}
            <Button variant="primary" size="lg" fullWidth onClick={() => navigate('/pembayaran/berhasil')}>
              Bayar Sekarang
            </Button>
          </div>
        </CheckoutCard>

        <CheckoutCard className="flex flex-col gap-5">
          <h2 className="font-heading font-semibold text-xl leading-[1.2] text-textPrimary">Tata Cara Pembayaran</h2>
          <div className="flex flex-col gap-3">
            {tataCaraUntuk(metode).map((cara) => (
              <Accordion key={cara.judul} judul={cara.judul} varian="kartu" awalTerbuka>
                <ol className="flex flex-col gap-0.5 max-w-[520px] pl-7 list-decimal text-lg tracking-[0.2px] text-textSecondary">
                  {cara.langkah.map((teks) => (
                    <li key={teks}>{teks}</li>
                  ))}
                </ol>
              </Accordion>
            ))}
          </div>
        </CheckoutCard>
      </CheckoutGrid>
    </CheckoutLayout>
  );
}
