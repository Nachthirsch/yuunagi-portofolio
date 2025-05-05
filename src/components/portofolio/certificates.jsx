// Certificates Component
import { motion } from "framer-motion";
import { HiAcademicCap, HiCode, HiExternalLink, HiOutlineCloudUpload, HiOutlineMap, HiViewList } from "react-icons/hi";
import { PiNetworkLight } from "react-icons/pi";
import { SiCanva } from "react-icons/si";
// Import Swiper components and styles
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { useRef, useState } from 'react';
import { MdOutlineViewCarousel } from "react-icons/md";

const CertificatesSection = () => {
  const swiperRef = useRef(null);
  const [viewMode, setViewMode] = useState('slider'); // 'slider' or 'list'

  const toggleViewMode = () => {
    setViewMode(viewMode === 'slider' ? 'list' : 'slider');
  };

  return (
    <section className="py-16 px-4 sm:px-8 md:px-16 bg-neutral-900 font-Hanken tracking-wider">
      <div className="max-w-6xl mx-auto">
        {/* Header - Enhanced Neobrutalism Style with Original Color Theme */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6 }} 
          className="mb-8 sm:mb-16 relative"
        >
          <div className="absolute -left-5 -top-5 w-20 h-20 bg-neutral-400 opacity-20 rotate-12 z-0"></div>
          <div className="absolute -left-2 -top-2 w-12 h-12 bg-neutral-500 opacity-20 -rotate-6 z-0"></div>
          
          <div className="flex items-center justify-between">
            <h2 className="text-2xl sm:text-3xl font-extrabold uppercase text-neutral-300 tracking-wider flex items-center gap-3 relative z-10">
              <div className="p-3 bg-neutral-800 border-3 border-black shadow-[5px_5px_0px_rgba(0,0,0,0.8)] rotate-2">
                <HiAcademicCap className="text-neutral-300 text-2xl" />
              </div>
              <span className="text-shadow-neo relative">
                Certificates & Badges
                <span className="absolute -bottom-1 left-0 w-full h-1 bg-neutral-400"></span>
              </span>
            </h2>
            
            {/* View Mode Toggle Button */}
            <button 
              onClick={toggleViewMode}
              className="flex items-center gap-2 py-2 px-4 bg-neutral-800 border-3 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.8)] hover:-translate-y-1 transition-all duration-200 rotate-1"
              aria-label={`Switch to ${viewMode === 'slider' ? 'list' : 'slider'} view`}
            >
              {viewMode === 'slider' ? (
                <>
                  <HiViewList className="text-lg text-neutral-300" />
                  <span className="text-sm font-bold text-neutral-300 hidden sm:block">List View</span>
                </>
              ) : (
                <>
                  <MdOutlineViewCarousel className="text-lg text-neutral-300" />
                  <span className="text-sm font-bold text-neutral-300 hidden sm:block">Slider View</span>
                </>
              )}
            </button>
          </div>
          
          <motion.div 
            className="w-32 h-3 bg-neutral-300 mt-5 -rotate-1 border-3 border-black shadow-[5px_5px_0px_rgba(0,0,0,0.8)]" 
            initial={{ width: 0 }} 
            whileInView={{ width: "10rem" }} 
            transition={{ duration: 0.8, delay: 0.3 }} 
          />
        </motion.div>

        {viewMode === 'slider' ? (
          // Certificate Slider - Swiper Implementation with Neo-brutalism Navigation
          <div className="relative cert-slider-container">
            {/* Custom Navigation Buttons */}
            <div className="slider-navigation flex justify-between absolute top-1/2 -translate-y-1/2 w-full z-30 px-2 sm:px-6 pointer-events-none">
              <button 
                onClick={() => swiperRef.current?.slidePrev()} 
                className="nav-btn-prev bg-neutral-800 p-2 sm:p-3 border-3 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.8)] hover:-translate-y-1 transition-all duration-200 rotate-2 pointer-events-auto"
                aria-label="Previous slide"
              >
                <IoIosArrowBack className="text-lg sm:text-xl text-neutral-300" />
              </button>
              <button 
                onClick={() => swiperRef.current?.slideNext()} 
                className="nav-btn-next bg-neutral-800 p-2 sm:p-3 border-3 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.8)] hover:-translate-y-1 transition-all duration-200 -rotate-2 pointer-events-auto"
                aria-label="Next slide"
              >
                <IoIosArrowForward className="text-lg sm:text-xl text-neutral-300" />
              </button>
            </div>

            {/* Swiper Component */}
            <Swiper
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              centeredSlides={false}
              loop={true}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
                el: '.cert-pagination',
                bulletClass: 'swiper-pagination-bullet cert-bullet',
                bulletActiveClass: 'swiper-pagination-bullet-active cert-bullet-active',
              }}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
              }}
              className="cert-swiper pb-14"
            >
              {certificates.map((cert, index) => (
                <SwiperSlide key={index} className="py-4">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }} 
                    whileInView={{ opacity: 1, y: 0 }} 
                    transition={{ duration: 0.5, delay: index * 0.1 }} 
                    whileHover={{ y: -8, transition: { duration: 0.2 } }}
                    className={`group relative bg-neutral-800 ${index % 3 === 0 ? 'rotate-2' : index % 3 === 1 ? '-rotate-2' : 'rotate-0'} 
                      border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,0.8)] 
                      h-[220px] hover:h-auto overflow-hidden 
                      hover:z-20 transition-all duration-300`}
                  >
                    {/* Overlay Background for Extended Content */}
                    <div className="absolute inset-0 bg-neutral-800/95 opacity-0 group-hover:opacity-100 transition-opacity" />

                    {/* Diagonal decorative corner */}
                    <div className={`absolute top-0 right-0 w-16 h-16 bg-neutral-700 opacity-60 -z-0`} style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }}></div>
                    
                    <div className={`flex gap-5 h-full relative z-10 p-6 ${index % 3 === 0 ? '-rotate-2' : index % 3 === 1 ? 'rotate-2' : 'rotate-0'}`}>
                      {/* Icon Column - Enhanced Neobrutalism Style */}
                      <div className="shrink-0">
                        <div className={`p-4 bg-neutral-700 border-3 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.8)] -rotate-3`}>
                          <cert.icon className="text-2xl text-neutral-300" />
                        </div>
                      </div>

                      {/* Content Column */}
                      <div className="flex flex-col h-full w-full">
                        {/* Title Section */}
                        <div className="flex-grow">
                          <h3 className="text-lg font-extrabold text-neutral-300 line-clamp-2 group-hover:line-clamp-none transition-all uppercase text-shadow-small">
                            {cert.title}
                          </h3>
                          <p className="text-sm text-neutral-400 mt-2 line-clamp-1 group-hover:line-clamp-none transition-all font-bold">
                            {cert.issuer}
                          </p>
                          <p className="text-xs text-neutral-500 mt-3 inline-block px-3 py-1 border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,0.8)] bg-neutral-700 font-bold rotate-1">
                            {cert.date}
                          </p>
                        </div>

                        {/* Credential Link - Enhanced Neobrutalism Style */}
                        <div className="mt-auto pt-5 border-t-3 border-black opacity-0 group-hover:opacity-100 transition-opacity">
                          {cert.credential && (
                            <a 
                              href={cert.credential} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="inline-flex items-center text-sm font-bold text-neutral-300 
                                px-4 py-2 mt-2
                                bg-neutral-700 border-3 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.8)]
                                hover:-translate-y-1 hover:translate-x-1 hover:shadow-[5px_5px_0px_rgba(0,0,0,0.8)]
                                transition-all duration-200 rotate-1"
                            >
                              View Credential
                              <HiExternalLink className="ml-2 text-lg" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom Pagination */}
            <div className="cert-pagination flex justify-center mt-8 space-x-2"></div>
          </div>
        ) : (
          // List View - Simplified table-like layout
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 0.5 }}
            className="cert-list-container"
          >
            <div className="border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,0.8)] bg-neutral-800 overflow-hidden">
              {/* Table Header */}
              <div className="grid grid-cols-12 gap-4 p-4 border-b-3 border-black bg-neutral-700">
                <div className="col-span-7 sm:col-span-8">
                  <h3 className="text-sm sm:text-base font-extrabold text-neutral-200 uppercase">Certificate Title</h3>
                </div>
                <div className="col-span-3 sm:col-span-2 text-center">
                  <h3 className="text-sm sm:text-base font-extrabold text-neutral-200 uppercase">Date</h3>
                </div>
                <div className="col-span-2 text-center">
                  <h3 className="text-sm sm:text-base font-extrabold text-neutral-200 uppercase">Link</h3>
                </div>
              </div>
              
              {/* Certificate List */}
              <div className="max-h-[500px] overflow-y-auto cert-list-scrollbar">
                {certificates.map((cert, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className={`grid grid-cols-12 gap-4 p-4 items-center border-b-2 border-neutral-700 hover:bg-neutral-700/30 transition-colors duration-200 ${index % 2 === 0 ? 'bg-neutral-800' : 'bg-neutral-800/70'}`}
                  >
                    <div className="col-span-7 sm:col-span-8 flex items-center gap-3">
                      <div className="hidden sm:block p-2 bg-neutral-700 border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,0.8)]">
                        <cert.icon className="text-sm text-neutral-300" />
                      </div>
                      <h3 className="text-sm font-bold text-neutral-300 line-clamp-1">
                        {cert.title}
                      </h3>
                    </div>
                    <div className="col-span-3 sm:col-span-2 text-center">
                      <p className="text-xs text-neutral-400 inline-block px-2 py-1 border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,0.8)] bg-neutral-700 font-bold">
                        {cert.date}
                      </p>
                    </div>
                    <div className="col-span-2 text-center">
                      {cert.credential && (
                        <a 
                          href={cert.credential} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="inline-flex items-center justify-center text-neutral-300 
                            p-2
                            bg-neutral-700 border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,0.8)]
                            hover:-translate-y-1 hover:shadow-[4px_4px_0px_rgba(0,0,0,0.8)]
                            transition-all duration-200"
                          aria-label={`View credential for ${cert.title}`}
                        >
                          <HiExternalLink className="text-base" />
                        </a>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Styles for neobrutalism */}
      <style jsx global>{`
        .text-shadow-neo {
          text-shadow: 4px 4px 0px rgba(0,0,0,0.8);
        }
        .text-shadow-small {
          text-shadow: 3px 3px 0px rgba(0,0,0,0.8);
        }
        .border-3 {
          border-width: 3px;
        }
        
        /* Swiper Custom Styles */
        .cert-swiper {
          padding-top: 10px;
          padding-bottom: 40px;
          overflow: visible;
        }
        
        .cert-bullet {
          width: 12px;
          height: 12px;
          display: inline-block;
          border-radius: 0;
          background: #404040;
          border: 2px solid black;
          margin: 0 4px;
          cursor: pointer;
          opacity: 0.7;
          transition: all 0.3s;
          transform: rotate(45deg);
        }
        
        .cert-bullet-active {
          opacity: 1;
          background: #737373;
          transform: rotate(45deg) scale(1.2);
          border: 2px solid black;
          box-shadow: 2px 2px 0px rgba(0,0,0,0.8);
        }
        
        /* Certificate List Scrollbar */
        .cert-list-scrollbar::-webkit-scrollbar {
          width: 10px;
        }
        
        .cert-list-scrollbar::-webkit-scrollbar-track {
          background: #262626;
          border-left: 2px solid black;
        }
        
        .cert-list-scrollbar::-webkit-scrollbar-thumb {
          background: #404040;
          border: 2px solid black;
          box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.1);
        }
        
        .cert-list-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #525252;
        }
        
        /* For webkit browsers like Chrome/Safari */
        .swiper-wrapper {
          transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1) !important;
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
