import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { daftarUser } from '../services/api/userApi';
import {
  hanyaAngka,
  kumpulkanError,
  validasiEmail,
  validasiKonfirmasi,
  validasiNama,
  validasiNoHp,
  validasiPasswordBaru,
} from '../utils/validation';
import AuthLayout from '../layouts/AuthLayout';
import InputField from '../components/InputField';
import PhoneField from '../components/PhoneField';
import Button from '../components/Button';
import Divider from '../components/Divider';
import GoogleButton from '../components/GoogleButton';

// Halaman tujuan setelah berhasil daftar
const TUJUAN = '/';

export default function Register() {
  const navigate = useNavigate();
  const { sudahLogin, login } = useAuth();

  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    kodeNegara: '+62',
    noHp: '',
    password: '',
    konfirmasiPassword: '',
  });
  const [errors, setErrors] = useState({}); // error per kolom
  const [galat, setGalat] = useState(''); // error dari server
  const [memuat, setMemuat] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Nomor HP hanya boleh berisi angka
    const nilai = name === 'noHp' ? hanyaAngka(value) : value;

    setFormData((lama) => ({ ...lama, [name]: nilai }));
    setErrors((lama) => ({ ...lama, [name]: '' }));
    setGalat('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errorBaru = kumpulkanError({
      nama: validasiNama(formData.nama),
      email: validasiEmail(formData.email),
      noHp: validasiNoHp(formData.noHp),
      password: validasiPasswordBaru(formData.password),
      konfirmasiPassword: validasiKonfirmasi(formData.konfirmasiPassword, formData.password),
    });
    setErrors(errorBaru);
    if (Object.keys(errorBaru).length > 0) return;

    setMemuat(true);
    setGalat('');
    try {
      const user = await daftarUser({
        nama: formData.nama.trim(),
        email: formData.email.trim(),
        kodeNegara: formData.kodeNegara,
        noHp: formData.noHp,
        password: formData.password,
      });
      login(user);
      navigate(TUJUAN, { replace: true });
    } catch (err) {
      setGalat(err.message);
    } finally {
      setMemuat(false);
    }
  };

  if (sudahLogin) return <Navigate to={TUJUAN} replace />;

  return (
    <AuthLayout judul="Pendaftaran Akun" deskripsi="Yuk, daftarkan akunmu sekarang juga!">
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <InputField
            label="Nama Lengkap"
            name="nama"
            autoComplete="name"
            value={formData.nama}
            onChange={handleChange}
            error={errors.nama}
            required
          />

          <InputField
            label="E-Mail"
            type="email"
            name="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            required
          />

          <PhoneField
            label="No. Hp"
            name="noHp"
            kodeNegara={formData.kodeNegara}
            onKodeChange={(e) => setFormData((lama) => ({ ...lama, kodeNegara: e.target.value }))}
            value={formData.noHp}
            onChange={handleChange}
            error={errors.noHp}
            required
          />

          <InputField
            label="Kata Sandi"
            type="password"
            name="password"
            autoComplete="new-password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            required
          />

          <InputField
            label="Konfirmasi Kata Sandi"
            type="password"
            name="konfirmasiPassword"
            autoComplete="new-password"
            value={formData.konfirmasiPassword}
            onChange={handleChange}
            error={errors.konfirmasiPassword}
            required
          />

          <Link
            to="/lupa-password"
            className="self-end text-base font-medium tracking-[0.2px] text-textSecondary hover:text-brandGreen"
          >
            Lupa Password?
          </Link>
        </div>

        <div className="flex flex-col gap-4">
          {galat && (
            <p role="alert" className="text-sm text-error">
              {galat}
            </p>
          )}
          <Button type="submit" variant="primary" size="lg" fullWidth disabled={memuat}>
            {memuat ? 'Memproses...' : 'Daftar'}
          </Button>
          <Button variant="secondary" size="lg" fullWidth onClick={() => navigate('/login')}>
            Masuk
          </Button>
        </div>

        <Divider>atau</Divider>

        {/* TODO: sambungkan ke pendaftaran Google */}
        <GoogleButton>Daftar dengan Google</GoogleButton>
      </form>
    </AuthLayout>
  );
}
