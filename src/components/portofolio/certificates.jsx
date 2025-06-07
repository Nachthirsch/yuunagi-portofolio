import { motion, AnimatePresence } from "framer-motion";
import { HiAcademicCap, HiCode, HiExternalLink, HiOutlineCloudUpload, HiOutlineMap } from "react-icons/hi";
import { PiNetworkLight } from "react-icons/pi";
import { SiCanva } from "react-icons/si";
import { X } from "lucide-react";
import { useState, useCallback } from "react";

const CertificatesSection = () => {
  const [selectedCert, setSelectedCert] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCertClick = useCallback((cert) => {
    setSelectedCert(cert);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setTimeout(() => {
      setSelectedCert(null);
    }, 200);
  }, []);

  const handleBackdropClick = useCallback(
    (e) => {
      if (e.target === e.currentTarget) {
        handleCloseModal();
      }
    },
    [handleCloseModal]
  );

  return (
    <section className="h-screen flex flex-col justify-center px-4 sm:px-6 md:px-12 py-16 bg-neutral-900 font-Hanken tracking-wider overflow-hidden">
      <div className="max-w-6xl mx-auto w-full">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="mb-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">CERTIFICATES</h2>
          <p className="text-neutral-300 text-base sm:text-lg">Professional certifications and achievements</p>
        </motion.div>

        {/* Content area - More compact */}
        <div className="h-[calc(100vh-300px)] overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
            {/* Certificates Column */}
            <div className="flex flex-col h-full lg:col-span-2">
              <h3 className="text-base font-medium text-neutral-200 mb-4 border-b border-neutral-700 pb-2 flex-shrink-0">All Certificates</h3>
              <div className="flex-1 overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 overflow-y-auto h-full pr-2 scrollbar-thin scrollbar-track-neutral-800 scrollbar-thumb-neutral-600">
                  {certificates.map((cert, index) => (
                    <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.05 }} viewport={{ once: true }} className="group cursor-pointer py-2 px-3 rounded-lg hover:bg-neutral-800/20 transition-all duration-300" onClick={() => handleCertClick(cert)}>
                      {/* Compact View */}
                      <div className="flex flex-col gap-1">
                        <div className="flex items-start gap-2 mb-1">
                          <cert.icon className="text-neutral-400 text-sm flex-shrink-0 mt-0.5" />
                          <h4 className="text-white font-medium text-sm group-hover:text-neutral-100 transition-colors line-clamp-2 leading-tight">{cert.title}</h4>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-neutral-300 text-xs">{cert.issuer}</span>
                          <span className="text-neutral-400 text-xs font-mono">{cert.date}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Click Modal with Backdrop */}
      <AnimatePresence mode="wait">
        {selectedCert && isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.3,
              ease: [0.4, 0.0, 0.2, 1],
            }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={handleBackdropClick}
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.4,
                ease: "easeInOut",
              }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />

            {/* Modal */}
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.8,
                y: 50,
                rotateX: -15,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
                rotateX: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.9,
                y: -20,
                rotateX: 5,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 25,
                mass: 0.8,
                duration: 0.5,
              }}
              className="relative bg-neutral-800/95 backdrop-blur-sm border border-neutral-600 rounded-lg p-6 max-w-lg w-full mx-4 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{
                  delay: 0.1,
                  duration: 0.2,
                  ease: "easeOut",
                }}
                whileHover={{
                  scale: 1.1,
                  rotate: 90,
                  transition: { duration: 0.2 },
                }}
                whileTap={{ scale: 0.9 }}
                onClick={handleCloseModal}
                className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-200 transition-colors duration-200"
              >
                <X size={20} />
              </motion.button>

              {/* Modal Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.1,
                  duration: 0.4,
                  ease: "easeOut",
                }}
                className="mb-4 pr-8"
              >
                <div className="flex items-start gap-3 mb-3">
                  <selectedCert.icon className="text-neutral-400 text-xl flex-shrink-0 mt-1" />
                  <h4 className="text-white font-medium text-lg leading-tight">{selectedCert.title}</h4>
                </div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-neutral-200 text-sm">{selectedCert.issuer}</span>
                </div>
                <span className="text-neutral-400 text-sm font-mono">{selectedCert.date}</span>
              </motion.div>

              {/* Modal Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.2,
                  duration: 0.4,
                  ease: "easeOut",
                }}
                className="border-t border-neutral-700 pt-4"
              >
                {/* View Credential Link */}
                {selectedCert.credential && (
                  <div className="flex items-center gap-4 pt-2">
                    <motion.a
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.3,
                        duration: 0.3,
                        ease: "easeOut",
                      }}
                      href={selectedCert.credential}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-neutral-400 hover:text-neutral-200 transition-colors text-sm"
                    >
                      <HiExternalLink size={16} />
                      View Credential
                    </motion.a>
                  </div>
                )}
              </motion.div>

              {/* Close hint */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  delay: 0.4,
                  duration: 0.3,
                  ease: "easeOut",
                }}
                className="mt-4 pt-3 border-t border-neutral-700/50"
              >
                <p className="text-neutral-500 text-xs text-center">Click outside or X to close</p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default CertificatesSection;

// Data struktur untuk sertifikat
const certificates = [
  {
    title: "ReactJS for Front-end Website Developer",
    issuer: "Hacktiv8",
    date: "Dec 2024",
    icon: HiCode,
    credential: "https://media.licdn.com/dms/image/v2/D562DAQHePggYbWlqoA/profile-treasury-image-shrink_800_800/profile-treasury-image-shrink_800_800/0/1737448452738?e=1738818000&v=beta&t=t-ZuoMQbsO2fJd4svUjT08tnuoT-P36bUU0cy2-ncT0",
  },
  {
    title: "Fullstack Development: Membuat Weather App with Hacktiv8",
    issuer: "Udemy",
    date: "Oct 2024",
    icon: HiCode,
    credential: "https://www.linkedin.com/in/handra-putratama-tanjung/details/certifications/1729663108791/single-media-viewer/?profileId=ACoAADfROqcBdgHN9POm8lFkj1bxhQBA6PbhaSE",
  },
  {
    title: "Web Development Fundamentals",
    issuer: "IBM",
    date: "Oct 2024",
    icon: HiCode,
    credential: "https://www.credly.com/badges/30014ae2-6bea-4169-ac48-334afe722250/linked_in_profile",
  },
  {
    title: "Pelatihan dan Pendampingan Pembuatan Konten Produk Berbasis Teknologi Tepat Guna dengan Apilkasi Canva untuk Pemasaran Secara Digital bagi KWT Pancasona",
    issuer: "PPM UBSI",
    date: "Jul 2024",
    icon: SiCanva,
    credential: "https://drive.google.com/file/d/1ddzVFaYc4hPPXh-W7tMdgLuiPKpNb6t7/view?usp=sharing",
  },
  {
    title: "AWS Academy Graduate - AWS Academy Cloud Architecting",
    issuer: "Amazon Web Services (AWS)",
    date: "Mar 2024",
    icon: HiOutlineCloudUpload,
    credential: "https://www.credly.com/badges/c1b8558f-9439-41af-8802-211d248924f9/linked_in_profile",
  },
  {
    title: "AWS Academy Graduate - AWS Academy Cloud Foundations",
    issuer: "Amazon Web Services (AWS)",
    date: "Feb 2024",
    icon: HiOutlineCloudUpload,
    credential: "https://www.credly.com/badges/bebc1612-fc72-4fbc-bbee-8aaa305733b1/linked_in_profile",
  },
  {
    title: "Network Security",
    issuer: "Cisco Networking Academy",
    date: "Jan 2024",
    icon: PiNetworkLight,
    credential: "https://lykan.bsi.ac.id/sertifikat_lsp/network/17210529.pdf",
  },
  {
    title: "IT BootCamp Software Development",
    issuer: "Fakultas Teknik & Informatika Universitas Bina Sarana Indonesia",
    date: "June 2023",
    icon: HiCode,
    credential: "https://says.bsi.ac.id/e_sertifikat_lykan-MzE3MTE1MTExNTU=.html",
  },
  {
    title: "Pelatihan Pengolahan Pemuktakhiran Data Geospasial dan Muatan",
    issuer: "Badan Pusat Statistik",
    date: "Apr 2022",
    icon: HiOutlineMap,
    credential: "https://drive.google.com/file/d/1deOnGdrgQg1ZIjpOh2AJnQfXsA_4MCnV/view?usp=sharing",
  },
];
