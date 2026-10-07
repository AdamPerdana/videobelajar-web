// DATA CONTOH untuk alur pembayaran. Nanti diganti data dari API.

export const kelompokMetode = [
  {
    id: 'bank',
    judul: 'Transfer Bank',
    metode: [
      { id: 'bca', jenis: 'bank', singkat: 'BCA', nama: 'Bank BCA', gambar: 'bank-bca', caraBayar: 'Virtual Account BCA' },
      { id: 'bni', jenis: 'bank', singkat: 'BNI', nama: 'Bank BNI', gambar: 'bank-bni', caraBayar: 'Virtual Account BNI' },
      { id: 'bri', jenis: 'bank', singkat: 'BRI', nama: 'Bank BRI', gambar: 'bank-bri', caraBayar: 'Virtual Account BRI' },
      { id: 'mandiri', jenis: 'bank', singkat: 'Mandiri', nama: 'Bank Mandiri', gambar: 'bank-mandiri', caraBayar: 'Virtual Account Mandiri' },
    ],
  },
  {
    id: 'ewallet',
    judul: 'E-Wallet',
    metode: [
      { id: 'dana', jenis: 'ewallet', singkat: 'Dana', nama: 'Dana', gambar: 'ewallet-dana', caraBayar: 'Dana' },
      { id: 'ovo', jenis: 'ewallet', singkat: 'OVO', nama: 'OVO', gambar: 'ewallet-ovo', caraBayar: 'OVO' },
      { id: 'linkaja', jenis: 'ewallet', singkat: 'LinkAja', nama: 'LinkAja', gambar: 'ewallet-linkaja', caraBayar: 'LinkAja' },
      { id: 'shopeepay', jenis: 'ewallet', singkat: 'Shopee Pay', nama: 'Shopee Pay', gambar: 'ewallet-shopeepay', caraBayar: 'Shopee Pay' },
    ],
  },
  {
    id: 'kartu',
    judul: 'Kartu Kredit/Debit',
    metode: [
      {
        id: 'kartu',
        jenis: 'kartu',
        singkat: 'Kartu',
        nama: 'Kartu Kredit/Debit',
        gambar: 'card-mastercard',
        gambarBanyak: ['card-mastercard', 'card-visa', 'card-jcb'],
        caraBayar: 'Kartu Kredit/Debit',
      },
    ],
  },
];

export const metodeBawaan = 'bca';

export function cariMetode(id) {
  for (const kelompok of kelompokMetode) {
    const ketemu = kelompok.metode.find((m) => m.id === id);
    if (ketemu) return ketemu;
  }
  return cariMetode(metodeBawaan);
}

// Angka mengikuti desain Figma
export const pesanan = {
  hargaKelas: 767500,
  biayaAdmin: 7000,
};

export const nomorPembayaran = '11739 081234567890';

// Lama waktu bayar dalam detik (00:50:55 seperti di desain)
export const batasWaktuBayar = 50 * 60 + 55;

// Tata cara BCA: teksnya persis dari desain Figma
const tataCaraBca = [
  {
    judul: 'ATM BCA',
    langkah: [
      'Masukkan kartu ATM dan PIN BCA Anda',
      'Di menu utama, pilih "Transaksi Lainnya". Pilih "Transfer". Pilih "Ke BCA Virtual Account"',
      'Masukkan nomor Virtual Account',
      'Pastikan data Virtual Account Anda benar, kemudian masukkan angka yang perlu Anda bayarkan, kemudian pilih "Benar"',
      'Cek dan perhatikan konfirmasi pembayaran dari layar ATM, jika sudah benar pilih "Ya", atau pilih "Tidak" jika data di layar masih salah',
      'Transaksi Anda sudah selesai. Pilih "Tidak" untuk tidak melanjutkan transaksi lain',
    ],
  },
  {
    judul: 'Mobile Banking BCA',
    langkah: [
      'Buka Aplikasi BCA Mobile',
      'Pilih "m-BCA", kemudian pilih "m-Transfer"',
      'Pilih "BCA Virtual Account"',
      'Masukkan nomor Virtual Account, lalu pilih "OK"',
      'Klik tombol "Send" yang berada di sudut kanan atas aplikasi untuk melakukan transfer',
      'Klik "OK" untuk melanjutkan pembayaran',
      'Masukkan PIN Anda untuk meng-otorisasi transaksi',
      'Transaksi Anda telah selesai',
    ],
  },
  {
    judul: 'Internet Banking BCA',
    langkah: [
      'Login ke KlikBCA Individual',
      'Pilih "Transfer", kemudian pilih "Transfer ke BCA Virtual Account"',
      'Masukkan nomor Virtual Account',
      'Pilih "Lanjutkan" untuk melanjutkan pembayaran',
      'Masukkan "RESPON KEYBCA APPLI 1" yang muncul pada Token BCA Anda, lalu klik tombol "Kirim"',
      'Pembayaran telah selesai',
    ],
  },
];

// Tata cara untuk metode lain: teks umum (belum ada di desain), silakan disesuaikan
function tataCaraBankLain(bank) {
  return [
    {
      judul: `ATM ${bank}`,
      langkah: [
        `Masukkan kartu ATM dan PIN ${bank} Anda`,
        'Pilih menu transfer atau pembayaran ke Virtual Account',
        'Masukkan nomor Virtual Account',
        'Pastikan nama dan jumlah tagihan sudah benar, lalu konfirmasi',
        'Simpan struk sebagai bukti pembayaran',
      ],
    },
    {
      judul: `Mobile Banking ${bank}`,
      langkah: [
        `Buka aplikasi mobile banking ${bank} dan login`,
        'Pilih menu transfer atau pembayaran ke Virtual Account',
        'Masukkan nomor Virtual Account',
        'Pastikan nama dan jumlah tagihan sudah benar',
        'Masukkan PIN Anda untuk menyelesaikan transaksi',
      ],
    },
    {
      judul: `Internet Banking ${bank}`,
      langkah: [
        `Login ke internet banking ${bank}`,
        'Pilih menu transfer atau pembayaran ke Virtual Account',
        'Masukkan nomor Virtual Account',
        'Pastikan nama dan jumlah tagihan sudah benar, lalu lanjutkan',
        'Masukkan kode token atau OTP untuk menyelesaikan transaksi',
      ],
    },
  ];
}

// Mengembalikan daftar tata cara sesuai metode yang dipilih
export function tataCaraUntuk(metode) {
  if (metode.id === 'bca') return tataCaraBca;
  if (metode.jenis === 'bank') return tataCaraBankLain(metode.singkat);

  if (metode.jenis === 'ewallet') {
    return [
      {
        judul: `Aplikasi ${metode.nama}`,
        langkah: [
          `Buka aplikasi ${metode.nama} di HP Anda`,
          'Pilih menu Bayar atau Kirim',
          'Masukkan nomor pembayaran yang tertera di atas',
          'Pastikan jumlah tagihan sudah benar',
          'Masukkan PIN Anda untuk menyelesaikan pembayaran',
        ],
      },
    ];
  }

  return [
    {
      judul: 'Kartu Kredit/Debit',
      langkah: [
        'Masukkan nomor kartu, masa berlaku, dan kode CVV',
        'Pastikan jumlah tagihan sudah benar',
        'Masukkan kode OTP yang dikirim bank ke nomor HP Anda',
        'Pembayaran selesai',
      ],
    },
  ];
}

// 767500 -> "Rp 767.500"
export function rupiah(nilai) {
  return `Rp ${nilai.toLocaleString('id-ID')}`;
}
