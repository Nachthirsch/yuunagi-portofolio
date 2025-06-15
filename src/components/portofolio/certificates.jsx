// Certificates Component
import { motion } from "framer-motion";
import { HiAcademicCap, HiCode, HiExternalLink, HiOutlineCloudUpload, HiOutlineMap, HiViewList } from "react-icons/hi";
import { PiNetworkLight } from "react-icons/pi";
import { SiCanva } from "react-icons/si";
// Import Swiper components and styles
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useRef, useState } from "react";
import { MdOutlineViewCarousel } from "react-icons/md";

const CertificatesSection = () => {
  const swiperRef = useRef(null);
  const [viewMode, setViewMode] = useState("slider");

  const toggleViewMode = () => {
    setViewMode(viewMode === "slider" ? "list" : "slider");
  };

  return (
    <section className="py-20 px-4 sm:px-8 md:px-16 bg-gray-50 font-light">
      <div className="max-w-6xl mx-auto">
        {/* Header - Minimalist Style */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-baseline gap-6">
              <HiAcademicCap className="text-gray-400 text-lg mt-1 flex-shrink-0" />
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-gray-900 tracking-wide">Certificates & Badges</h2>
            </div>

            {/* View Mode Toggle Button */}
            <button
              onClick={toggleViewMode}
              className="text-sm font-medium transition-colors duration-200
                text-gray-700 hover:text-gray-900"
              aria-label={`Switch to ${viewMode === "slider" ? "list" : "slider"} view`}
            >
              {viewMode === "slider" ? (
                <span className="flex items-center gap-2">
                  <HiViewList className="text-base" />
                  <span className="hidden sm:block">List View</span>
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <MdOutlineViewCarousel className="text-base" />
                  <span className="hidden sm:block">Slider View</span>
                </span>
              )}
            </button>
          </div>
          <div className="w-full h-px bg-gradient-to-r from-gray-300 via-gray-200 to-transparent" />
        </motion.div>

        {viewMode === "slider" ? (
          // Certificate Slider - Clean Implementation
          <div className="relative">
            {/* Custom Navigation Buttons */}
            <div className="absolute top-1/2 -translate-y-1/2 -left-4 z-20">
              <button
                onClick={() => swiperRef.current?.slidePrev()}
                className="p-3 bg-white/80 backdrop-blur-sm text-gray-700 rounded-sm shadow-sm
                  hover:bg-white hover:shadow-md transition-all duration-200"
                aria-label="Previous slide"
              >
                <IoIosArrowBack className="text-lg" />
              </button>
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 -right-4 z-20">
              <button
                onClick={() => swiperRef.current?.slideNext()}
                className="p-3 bg-white/80 backdrop-blur-sm text-gray-700 rounded-sm shadow-sm
                  hover:bg-white hover:shadow-md transition-all duration-200"
                aria-label="Next slide"
              >
                <IoIosArrowForward className="text-lg" />
              </button>
            </div>

            {/* Swiper Component */}
            <Swiper
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={40}
              slidesPerView={1}
              loop={false}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              pagination={{
                clickable: true,
                el: ".custom-pagination",
              }}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 32,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 40,
                },
              }}
              className="certificates-swiper"
            >
              {certificates.map((cert, index) => (
                <SwiperSlide key={index}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="p-6 hover:bg-gray-100/50 transition-colors duration-300 rounded-sm
                      h-full flex flex-col group"
                  >
                    {/* Icon and Header */}
                    <div className="flex items-start gap-4 mb-6">
                      <div
                        className="p-3 bg-gray-100 text-gray-600 rounded-sm flex-shrink-0
                        group-hover:bg-gray-200 transition-colors duration-300"
                      >
                        <cert.icon className="text-xl" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-medium text-gray-900 leading-tight mb-3">{cert.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">{cert.issuer}</p>
                        <p className="text-xs text-gray-500 uppercase tracking-wider">{cert.date}</p>
                      </div>
                    </div>

                    {/* Credential Link */}
                    <div className="mt-auto pt-6">
                      {cert.credential && (
                        <a
                          href={cert.credential}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm font-medium
                            text-gray-700 hover:text-gray-900 transition-colors duration-200"
                        >
                          <HiExternalLink className="text-base flex-shrink-0" />
                          <span>View Credential</span>
                        </a>
                      )}
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom Pagination */}
            <div className="custom-pagination flex justify-center mt-12 space-x-2"></div>
          </div>
        ) : (
          // List View - Editorial Style
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="space-y-12">
            {certificates.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start group 
                  hover:bg-gray-100/50 transition-colors duration-300 p-6 -m-6 rounded-sm"
              >
                {/* Icon */}
                <div className="md:col-span-1 flex md:justify-center">
                  <div
                    className="p-3 bg-gray-100 text-gray-600 rounded-sm
                    group-hover:bg-gray-200 transition-colors duration-300"
                  >
                    <cert.icon className="text-xl" />
                  </div>
                </div>

                {/* Content */}
                <div className="md:col-span-2 space-y-2">
                  <h3 className="text-lg font-medium text-gray-900">{cert.title}</h3>
                  <p className="text-sm text-gray-600">{cert.issuer}</p>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">{cert.date}</p>
                </div>

                {/* Link */}
                <div className="md:col-span-1 flex md:justify-end">
                  {cert.credential && (
                    <a
                      href={cert.credential}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium
                        text-gray-700 hover:text-gray-900 transition-colors duration-200"
                      aria-label={`View credential for ${cert.title}`}
                    >
                      <HiExternalLink className="text-base" />
                      <span className="hidden sm:block">View Credential</span>
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Minimal Custom Styles */}
      <style jsx global>{`
        .certificates-swiper {
          padding-bottom: 60px;
          overflow: visible;
        }

        .certificates-swiper .swiper-slide {
          height: auto;
        }

        .custom-pagination .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #d1d5db;
          opacity: 0.5;
          margin: 0 4px;
          transition: all 0.3s ease;
        }

        .custom-pagination .swiper-pagination-bullet-active {
          opacity: 1;
          background: #6b7280;
          transform: scale(1.2);
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default CertificatesSection;

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
