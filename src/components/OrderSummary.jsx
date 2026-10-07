import React from 'react';
import { rupiah } from '../data/payment';

// Rincian biaya + total.
// baris: [{ label: 'Biaya Admin', nilai: 7000 }, ...]
export default function OrderSummary({ judul = 'Ringkasan Pesanan', baris }) {
  const total = baris.reduce((jumlah, b) => jumlah + b.nilai, 0);

  return (
    <div className="flex flex-col gap-5">
      <h2 className="font-heading font-semibold text-xl leading-[1.2] text-textPrimary">{judul}</h2>

      <dl className="flex flex-col gap-5">
        {baris.map((b) => (
          <div key={b.label} className="flex items-start justify-between gap-6">
            <dt className="max-w-[480px] text-lg tracking-[0.2px] text-textSecondary">{b.label}</dt>
            <dd className="text-lg font-medium tracking-[0.2px] text-textSecondary whitespace-nowrap">{rupiah(b.nilai)}</dd>
          </div>
        ))}
      </dl>

      <div className="flex items-center justify-between gap-6 pt-5 border-t border-borderField">
        <span className="text-lg font-bold tracking-[0.2px] text-textPrimary">Total Pembayaran</span>
        <span className="font-heading font-semibold text-xl text-brandGreen whitespace-nowrap">{rupiah(total)}</span>
      </div>
    </div>
  );
}
