// Certificates Component
import { motion } from "framer-motion";
import { HiAcademicCap, HiCode, HiExternalLink, HiOutlineCloudUpload, HiOutlineMap } from "react-icons/hi";
import { PiNetworkLight } from "react-icons/pi";
import { SiCanva } from "react-icons/si";

const CertificatesSection = () => {
  return (
    <section className="py-12 sm:py-16 px-4 sm:px-8 md:px-16 bg-neutral-900 font-Hanken tracking-wider">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-300 tracking-wider flex items-center gap-3">
            <HiAcademicCap className="text-neutral-400" />
            Certificates & Badges
          </h2>
          <motion.div className="w-20 h-0.5 bg-neutral-300 mt-3" initial={{ width: 0 }} whileInView={{ width: "5rem" }} transition={{ duration: 0.8, delay: 0.3 }} />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} className="group relative bg-neutral-800/20 rounded-lg p-6 border border-neutral-700/30 hover:border-neutral-600/50 transition-all h-[200px] hover:h-auto hover:min-h-[200px] hover:z-10 hover:shadow-xl">
              {/* Overlay Background for Extended Content */}
              <div className="absolute inset-0 bg-neutral-800/95 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />

              <div className="flex gap-4 h-full relative z-10">
                {/* Icon Column */}
                <div className="shrink-0">
                  <div className="p-2 bg-neutral-700/30 rounded-lg">
                    <cert.icon className="text-xl text-neutral-300" />
                  </div>
                </div>

                {/* Content Column */}
                <div className="flex flex-col h-full w-full">
                  {/* Title Section */}
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold text-neutral-300 line-clamp-2 group-hover:line-clamp-none transition-all">{cert.title}</h3>
                    <p className="text-sm text-neutral-400 mt-1 line-clamp-1 group-hover:line-clamp-none transition-all">{cert.issuer}</p>
                    <p className="text-xs text-neutral-500 mt-1">{cert.date}</p>
                  </div>

                  {/* Credential Link - Always at Bottom */}
                  <div className="mt-auto pt-3">
                    {cert.credential && (
                      <a href={cert.credential} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm text-neutral-400 hover:text-neutral-300 transition-colors">
                        View Credential
                        <HiExternalLink className="ml-1" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificatesSection;

// Image Section Component

// Data struktur untuk sertifikat
const certificates = [
  {
    title: "IT BootCamp Software Development",
    issuer: "Fakultas Teknik & Informatik Universitas Bina Sarana Indonesia",
    date: "June 2023",
    icon: HiCode,
    credential: "https://says.bsi.ac.id/e_sertifikat_lykan-MzE3MTE1MTExNTU=.html",
  },
  {
    title: "Network Security",
    issuer: "Cisco Networking Academy",
    date: "Jan 2024",
    icon: PiNetworkLight,
    credential: "https://lykan.bsi.ac.id/sertifikat_lsp/network/17210529.pdf",
  },
  {
    title: "AWS Academy Graduate - AWS Academy Cloud Foundations",
    issuer: "Amazon Web Services (AWS)",
    date: "Feb 2024",
    icon: HiOutlineCloudUpload,
    credential: "https://www.credly.com/badges/bebc1612-fc72-4fbc-bbee-8aaa305733b1/linked_in_profile",
  },
  {
    title: "AWS Academy Graduate - AWS Academy Cloud Architecting",
    issuer: "Amazon Web Services (AWS)",
    date: "Mar 2024",
    icon: HiOutlineCloudUpload,
    credential: "https://www.credly.com/badges/c1b8558f-9439-41af-8802-211d248924f9/linked_in_profile",
  },
  {
    title: "Web Development Fundamentals",
    issuer: "IBM",
    date: "Oct 2024",
    icon: HiCode,
    credential: "https://www.credly.com/badges/30014ae2-6bea-4169-ac48-334afe722250/linked_in_profile",
  },
  {
    title: "Fullstack Development: Membuat Weather App with Hacktiv8",
    issuer: "Udemy",
    date: "Oct 2024",
    icon: HiCode,
    credential: "https://www.linkedin.com/in/handra-putratama-tanjung/details/certifications/1729663108791/single-media-viewer/?profileId=ACoAADfROqcBdgHN9POm8lFkj1bxhQBA6PbhaSE",
  },
  {
    title: "Pelatihan Pengolahan Pemuktakhiran Data Geospasial dan Muatan",
    issuer: "Badan Pusat Statistik",
    date: "Apr 2022",
    icon: HiOutlineMap,
    credential: "https://drive.google.com/file/d/1deOnGdrgQg1ZIjpOh2AJnQfXsA_4MCnV/view?usp=sharing",
  },
  {
    title: "Pelatihan dan Pendampingan Pembuatan Konten Produk Berbasis Teknologi Tepat Guna dengan Apilkasi Canva untuk Pemasaran Secara Digital bagi KWT Pancasona",
    issuer: "PPM UBSI",
    date: "Jul 2024",
    icon: SiCanva,
    credential: "https://drive.google.com/file/d/1ddzVFaYc4hPPXh-W7tMdgLuiPKpNb6t7/view?usp=sharing",
  },
  {
    title: "ReactJS for Front-end Website Developer",
    issuer: "Hacktiv8",
    date: "Dec 2024",
    icon: HiCode,
    credential: "https://media.licdn.com/dms/image/v2/D562DAQHePggYbWlqoA/profile-treasury-image-shrink_800_800/profile-treasury-image-shrink_800_800/0/1737448452738?e=1738818000&v=beta&t=t-ZuoMQbsO2fJd4svUjT08tnuoT-P36bUU0cy2-ncT0",
  },
  // Tambahkan sertifikat lainnya di sini
];
