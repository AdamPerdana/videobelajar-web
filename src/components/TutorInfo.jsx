import OrangInfo from './OrangInfo';

// Info tutor: "Jenna Ortega / Senior Accountant di Gojek".
// `tutor` berbentuk { nama, jabatan, perusahaan }.
export default function TutorInfo({ avatar, tutor, className }) {
  return (
    <OrangInfo
      avatar={avatar}
      nama={tutor.nama}
      className={className}
      keterangan={
        <>
          {tutor.jabatan} di <span className="font-bold">{tutor.perusahaan}</span>
        </>
      }
    />
  );
}
