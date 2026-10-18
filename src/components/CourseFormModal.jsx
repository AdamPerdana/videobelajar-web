import React, { useState } from 'react';
import Modal from './Modal';
import Button from './Button';
import InputField from './InputField';
import Gambar from './Gambar';

const pilihanKategori = ['Pemasaran', 'Desain', 'Pengembangan Diri', 'Bisnis Manajemen', 'Digital & Teknologi'];
const pilihanGambar = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// Form tambah / ubah kelas. Dipakai dua mode:
// - kelasAwal = null  -> Create (tambah kelas baru)
// - kelasAwal = {...} -> Update (ubah kelas yang dipilih)
export default function CourseFormModal({ kelasAwal, onSimpan, onTutup }) {
  const modeUbah = Boolean(kelasAwal);

  const [form, setForm] = useState({
    judul: kelasAwal?.judul ?? '',
    deskripsi: kelasAwal?.deskripsi ?? '',
    kategori: kelasAwal?.kategori ?? pilihanKategori[0],
    harga: kelasAwal?.harga ?? '',
    hargaCoret: kelasAwal?.hargaCoret ?? '',
    durasi: kelasAwal?.durasi ?? '',
    tutorNama: kelasAwal?.tutor.nama ?? '',
    tutorJabatan: kelasAwal?.tutor.jabatan ?? '',
    tutorPerusahaan: kelasAwal?.tutor.perusahaan ?? '',
    nomorGambar: Number(kelasAwal?.gambar?.split('-')[1]) || 1,
  });
  const [error, setError] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((lama) => ({ ...lama, [name]: value }));
    setError((lama) => ({ ...lama, [name]: '' }));
  };

  const validasi = () => {
    const baru = {};
    if (!form.judul.trim()) baru.judul = 'Judul wajib diisi';
    if (!form.deskripsi.trim()) baru.deskripsi = 'Deskripsi wajib diisi';
    if (form.harga === '' || Number(form.harga) <= 0) baru.harga = 'Harga harus lebih dari 0';
    if (form.hargaCoret !== '' && Number(form.hargaCoret) <= Number(form.harga)) {
      baru.hargaCoret = 'Harga coret harus lebih besar dari harga';
    }
    if (form.durasi === '' || Number(form.durasi) <= 0) baru.durasi = 'Durasi harus lebih dari 0';
    if (!form.tutorNama.trim()) baru.tutorNama = 'Nama tutor wajib diisi';
    if (!form.tutorJabatan.trim()) baru.tutorJabatan = 'Jabatan wajib diisi';
    if (!form.tutorPerusahaan.trim()) baru.tutorPerusahaan = 'Perusahaan wajib diisi';
    return baru;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const baru = validasi();
    if (Object.keys(baru).length > 0) {
      setError(baru);
      return;
    }

    onSimpan({
      judul: form.judul.trim(),
      deskripsi: form.deskripsi.trim(),
      kategori: form.kategori,
      harga: Number(form.harga),
      hargaCoret: form.hargaCoret === '' ? null : Number(form.hargaCoret),
      durasi: Number(form.durasi),
      tutor: {
        nama: form.tutorNama.trim(),
        jabatan: form.tutorJabatan.trim(),
        perusahaan: form.tutorPerusahaan.trim(),
      },
      gambar: `course-${form.nomorGambar}`,
      avatar: `tutor-${form.nomorGambar}`,
    });
  };

  const gayaSelect =
    'w-full h-12 px-2.5 text-base tracking-[0.2px] text-textPrimary bg-white rounded-md border border-borderField outline-none focus:border-brandGreen focus:ring-2 focus:ring-brandGreen/20';

  return (
    <Modal judul={modeUbah ? 'Ubah Kelas' : 'Tambah Kelas'} onTutup={onTutup}>
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4 text-left">
        <h2 className="font-heading font-semibold text-2xl text-textPrimary text-center">
          {modeUbah ? 'Ubah Kelas' : 'Tambah Kelas'}
        </h2>

        <InputField label="Judul" name="judul" required value={form.judul} onChange={handleChange} error={error.judul} />

        <div className="flex flex-col w-full">
          <label htmlFor="deskripsi" className="pb-1 text-base tracking-[0.2px] text-textSecondary">
            Deskripsi <span className="font-heading text-error">*</span>
          </label>
          <textarea
            id="deskripsi"
            name="deskripsi"
            rows={3}
            value={form.deskripsi}
            onChange={handleChange}
            className={`${gayaSelect} h-auto py-2 ${error.deskripsi ? 'border-error' : ''}`}
          />
          {error.deskripsi && <span className="pt-1 text-xs font-medium text-error">{error.deskripsi}</span>}
        </div>

        <div className="flex flex-col w-full">
          <label htmlFor="kategori" className="pb-1 text-base tracking-[0.2px] text-textSecondary">
            Kategori
          </label>
          <select id="kategori" name="kategori" value={form.kategori} onChange={handleChange} className={gayaSelect}>
            {pilihanKategori.map((k) => (
              <option key={k} value={k}>
                {k}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <InputField label="Harga (ribu Rp)" name="harga" type="number" required value={form.harga} onChange={handleChange} error={error.harga} />
          <InputField label="Harga coret" name="hargaCoret" type="number" value={form.hargaCoret} onChange={handleChange} error={error.hargaCoret} />
          <InputField label="Durasi (jam)" name="durasi" type="number" required value={form.durasi} onChange={handleChange} error={error.durasi} />
        </div>

        <InputField label="Nama tutor" name="tutorNama" required value={form.tutorNama} onChange={handleChange} error={error.tutorNama} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField label="Jabatan tutor" name="tutorJabatan" required value={form.tutorJabatan} onChange={handleChange} error={error.tutorJabatan} />
          <InputField label="Perusahaan" name="tutorPerusahaan" required value={form.tutorPerusahaan} onChange={handleChange} error={error.tutorPerusahaan} />
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-base tracking-[0.2px] text-textSecondary">Gambar kelas</span>
          <div className="flex flex-wrap gap-2">
            {pilihanGambar.map((n) => (
              <button
                key={n}
                type="button"
                aria-label={`Gambar ${n}`}
                aria-pressed={form.nomorGambar === n}
                onClick={() => setForm((lama) => ({ ...lama, nomorGambar: n }))}
                className={`rounded-[10px] border-2 cursor-pointer ${form.nomorGambar === n ? 'border-brandGreen' : 'border-transparent'}`}
              >
                <Gambar nama={`course-${n}`} label={false} className="w-16 h-12 rounded-[8px]" />
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Button variant="outline" size="lg" onClick={onTutup}>
            Batal
          </Button>
          <Button type="submit" variant="primary" size="lg">
            {modeUbah ? 'Simpan Perubahan' : 'Tambah Kelas'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
