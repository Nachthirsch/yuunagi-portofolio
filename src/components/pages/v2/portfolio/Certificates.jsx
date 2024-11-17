import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { HiCode, HiOutlineCloudUpload, HiOutlineMap } from "react-icons/hi";
import { PiNetworkLight } from "react-icons/pi";
import { SiCanva } from "react-icons/si";

const SectionHeader = ({ subtitle, title, highlightedWord }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="text-center mb-24"
    >
      <span className="text-sm uppercase tracking-[0.3em] text-neutral-500 mb-4 block">
        {subtitle}
      </span>
      <h2 className="text-5xl font-light text-neutral-800 mb-6">
        {title} <span className="font-semibold">{highlightedWord}</span>
      </h2>
      <div className="w-24 h-[1px] mx-auto bg-gradient-to-r from-transparent via-neutral-300 to-transparent" />
    </motion.div>
  );
};

const CertificateCard = ({ cert, index }) => (
  <motion.div
    key={index}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    className="group"
  >
    <div className="relative bg-white rounded-lg p-6 
                    border border-neutral-100 hover:border-neutral-200
                    transition-all duration-300 h-[260px] flex flex-col">
      {/* Category Tag */}
      <div className="flex items-center gap-2 mb-4">
        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${cert.color}`} />
        <span className="text-xs font-medium text-neutral-500">
          {cert.category}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1">
        <h3 className="text-lg font-medium text-neutral-800 mb-3 line-clamp-2">
          {cert.title}
        </h3>
        <p className="text-sm text-neutral-600 mb-1">{cert.issuer}</p>
        <p className="text-xs text-neutral-400">{cert.date}</p>
      </div>

      {/* Credential Link */}
      {cert.credential && (
        <motion.a
          href={cert.credential}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mt-4 text-sm
                   text-neutral-500 hover:text-neutral-800 transition-colors"
          whileHover={{ x: 5 }}
        >
          View Credential
          <ExternalLink size={14} />
        </motion.a>
      )}
    </div>
  </motion.div>
);

const Certificates = () => {
  const certificates = [
    {
      title: "IT BootCamp Software Development",
      issuer: "Fakultas Teknik & Informatik Universitas Bina Sarana Indonesia",
      date: "June 2023",
      icon: HiCode,
      category: "Development",
      color: "from-blue-500 to-cyan-500",
      credential: "https://says.bsi.ac.id/e_sertifikat_lykan-MzE3MTE1MTExNTU=.html",
    },
    {
      title: "Network Security",
      issuer: "Cisco Networking Academy",
      date: "Jan 2024",
      icon: PiNetworkLight,
      category: "Networking",
      color: "from-green-500 to-emerald-500",
      credential: "https://lykan.bsi.ac.id/sertifikat_lsp/network/17210529.pdf",
    },
    {
      title: "AWS Academy Graduate - AWS Academy Cloud Foundations",
      issuer: "Amazon Web Services (AWS)",
      date: "Feb 2024",
      icon: HiOutlineCloudUpload,
      category: "Cloud",
      color: "from-orange-500 to-amber-500",
      credential: "https://www.credly.com/badges/bebc1612-fc72-4fbc-bbee-8aaa305733b1/linked_in_profile",
    },
    {
      title: "AWS Academy Graduate - AWS Academy Cloud Architecting",
      issuer: "Amazon Web Services (AWS)",
      date: "Mar 2024",
      icon: HiOutlineCloudUpload,
      category: "Cloud",
      color: "from-orange-500 to-amber-500",
      credential: "https://www.credly.com/badges/c1b8558f-9439-41af-8802-211d248924f9/linked_in_profile",
    },
    {
      title: "Web Development Fundamentals",
      issuer: "IBM",
      date: "Oct 2024",
      icon: HiCode,
      category: "Development",
      color: "from-blue-500 to-cyan-500",
      credential: "https://www.credly.com/badges/30014ae2-6bea-4169-ac48-334afe722250/linked_in_profile",
    },
    {
      title: "Fullstack Development: Membuat Weather App with Hacktiv8",
      issuer: "Udemy",
      date: "Oct 2024",
      icon: HiCode,
      category: "Development",
      color: "from-blue-500 to-cyan-500",
      credential: "https://www.linkedin.com/in/handra-putratama-tanjung/details/certifications/1729663108791/single-media-viewer/?profileId=ACoAADfROqcBdgHN9POm8lFkj1bxhQBA6PbhaSE",
    },
    {
      title: "Pelatihan Pengolahan Pemuktakhiran Data Geospasial dan Muatan",
      issuer: "Badan Pusat Statistik",
      date: "Apr 2022",
      icon: HiOutlineMap,
      category: "GIS",
      color: "from-purple-500 to-violet-500",
      credential: "https://drive.google.com/file/d/1deOnGdrgQg1ZIjpOh2AJnQfXsA_4MCnV/view?usp=sharing",
    },
    {
      title: "Pelatihan dan pendampingan Pembuatan Konten Produk Berbasis Teknologi Tepat Guna dengan Apilkasi Canva untuk Pemasaran Secara Digital bagi KWT Pancasona",
      issuer: "PPM UBSI",
      date: "Jul 2024",
      icon: SiCanva,
      category: "Design",
      color: "from-pink-500 to-rose-500",
      credential: "https://drive.google.com/file/d/1ddzVFaYc4hPPXh-W7tMdgLuiPKpNb6t7/view?usp=sharing",
    },
  ];

  return (
    <section className="py-24 px-4 sm:px-8 md:px-16 bg-white">
      <div className="max-w-6xl mx-auto">
        <SectionHeader 
          subtitle="Achievements"
          title="Badges &"
          highlightedWord="Certifications"
        />

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert, index) => (
            <CertificateCard key={index} cert={cert} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certificates;
