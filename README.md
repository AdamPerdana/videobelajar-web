# videobelajar

Platform video belajar (latihan bootcamp) dibuat dengan React + Vite + Tailwind CSS v4.
Data pengguna dan foto profil memakai MockAPI lewat Axios.

## Menjalankan

```bash
npm install
cp .env.example .env     # lalu isi VITE_API_URL (akun) dan VITE_API_KELAS_URL (kelas) dengan alamat MockAPI kamu
npm run dev              # buka alamat yang tampil di terminal
```

Perintah lain: `npm run build` (build produksi), `npm run lint` (cek kualitas kode).

## Struktur folder

```
src/
├── assets/        Gambar + images.js (memanggil gambar lewat nama)
├── components/    Komponen kecil yang dipakai ulang (Button, Modal, CourseCard, ...)
├── context/       AuthProvider: menyimpan data login
├── data/          Data contoh (kelas, pesanan, modul, metode pembayaran)
├── hooks/         Hook buatan sendiri (useAuth, useTersalin, useProgresBelajar)
├── layouts/       Kerangka halaman (Navbar, Footer, MainLayout, ...)
├── pages/         Satu file per halaman / rute
├── services/api/  Pemanggilan API (userApi.js untuk akun, courseApi.js untuk kelas)
├── store/redux/  State global Redux: store.js dan kelasReducer.js (daftar kelas)
├── utils/         Fungsi bantu murni (format, validasi, daftar, storage)
├── App.jsx        Daftar rute
├── App.css        Tailwind + warna dan font dari Figma (@theme)
└── main.jsx       Titik masuk aplikasi
```

## Catatan

- Rute yang butuh login dibungkus `ProtectedRoute` di `App.jsx`.
- Warna dan font diatur di `@theme` pada `src/App.css` (Tailwind v4, tidak memakai `tailwind.config.js`).
- Kata sandi di MockAPI disimpan apa adanya karena ini hanya latihan. Aplikasi sungguhan
  harus memverifikasi login di server dan menyimpan kata sandi dalam bentuk hash.
