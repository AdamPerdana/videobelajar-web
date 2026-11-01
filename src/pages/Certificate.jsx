import { Link, useParams } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Container from '../layouts/Container';
import Gambar from '../components/Gambar';
import TutorInfo from '../components/TutorInfo';
import Rating from '../components/Rating';
import Ikon from '../components/Ikon';
import Button from '../components/Button';
import { gambar } from '../assets/images';
import { sertifikat } from '../data/learning';

export default function Certificate() {
  const { id } = useParams();
  const fileSertifikat = gambar(sertifikat.gambar);

  // Mengunduh gambar sertifikat lewat tautan <a download> sementara
  const unduh = () => {
    if (!fileSertifikat) return;
    const tautan = document.createElement('a');
    tautan.href = fileSertifikat;
    tautan.download = 'sertifikat-videobelajar';
    tautan.click();
  };

  return (
    <MainLayout>
      <Container className="py-7 md:py-9 flex flex-col gap-6 md:gap-9">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2.5 text-base font-medium tracking-[0.2px]">
          <Link to="/" className="text-textSecondary hover:text-brandGreen">Beranda</Link>
          <span className="text-textSecondary">/</span>
          <Link to="/kategori" className="text-textSecondary hover:text-brandGreen">{sertifikat.kategori}</Link>
          <span className="text-textSecondary">/</span>
          <Link to={`/kelas/${id}`} className="max-w-[90px] truncate text-textSecondary hover:text-brandGreen">{sertifikat.judulKelas}</Link>
          <span className="text-textSecondary">/</span>
          <span className="text-textPrimary">Sertifikat</span>
        </nav>

        <section className="flex flex-col gap-6 md:gap-9 p-5 sm:p-6 bg-white border border-borderField rounded-[10px]">
          <div className="flex justify-center rounded-[10px] bg-brandGreen/[0.06]">
            <Gambar nama={sertifikat.gambar} alt="Sertifikat kelulusan" fit="contain" className="w-full max-w-[510px] aspect-[510/360]" />
          </div>

          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5">
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <h1 className="font-heading font-semibold text-xl leading-[1.2] text-textPrimary">{sertifikat.judul}</h1>
                <p className="text-base tracking-[0.2px] text-textSecondary">{sertifikat.deskripsi}</p>
              </div>
              <TutorInfo avatar={sertifikat.tutor.avatar} tutor={sertifikat.tutor} />
              <Rating nilai={sertifikat.rating} jumlah={sertifikat.jumlahReview} />
            </div>

            <div className="shrink-0">
              <Button variant="outlinePrimary" size="lg" disabled={!fileSertifikat} onClick={unduh}>
                <Ikon nama="unduh" ukuran={20} />
                Download Sertifikat
              </Button>
            </div>
          </div>
        </section>
      </Container>
    </MainLayout>
  );
}
